const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const { mcpServers, bundles, skills } = require('../modules/catalog');
const { runCredentialWizard } = require('./credentials');
const { installModule, installSkill } = require('./installer');
const { checkPrerequisites } = require('../utils/prerequisites');
const { saveConfig } = require('../utils/config');

async function runSetupWizard(options = {}) {
  console.log(chalk.cyan('\nWelcome to Support Forge AI Setup!\n'));
  console.log(chalk.gray('This wizard will help you install and configure Claude Code'));
  console.log(chalk.gray('with MCP servers, skills, and integrations.\n'));

  // Check prerequisites first
  const prereqSpinner = ora('Checking prerequisites...').start();
  const prereqs = await checkPrerequisites();

  if (!prereqs.ready) {
    prereqSpinner.fail('Missing prerequisites');
    console.log(chalk.yellow('\nPlease install the following before continuing:\n'));
    for (const missing of prereqs.missing) {
      console.log(chalk.red(`  ✗ ${missing.name}: ${missing.installUrl}`));
    }
    console.log('');

    const { continueAnyway } = await inquirer.prompt([{
      type: 'confirm',
      name: 'continueAnyway',
      message: 'Continue anyway? (some features may not work)',
      default: false
    }]);

    if (!continueAnyway) {
      console.log(chalk.gray('\nRun sf-setup again after installing prerequisites.\n'));
      process.exit(0);
    }
  } else {
    prereqSpinner.succeed('All prerequisites found');
  }

  // Quick setup with bundle
  if (options.quick || options.bundle) {
    const bundleName = options.bundle || 'starter';
    const bundle = bundles[bundleName];
    if (!bundle) {
      console.log(chalk.red(`Unknown bundle: ${bundleName}`));
      console.log(chalk.gray(`Available: ${Object.keys(bundles).join(', ')}`));
      process.exit(1);
    }
    return await installBundle(bundle);
  }

  // Interactive setup
  const { setupType } = await inquirer.prompt([{
    type: 'list',
    name: 'setupType',
    message: 'How would you like to set up?',
    choices: [
      { name: '🎁 Choose a pre-configured bundle', value: 'bundle' },
      { name: '🔧 Pick individual modules', value: 'custom' },
      { name: '📋 View all available options first', value: 'list' }
    ]
  }]);

  if (setupType === 'list') {
    const { listModules } = require('../modules/catalog');
    await listModules();
    return runSetupWizard(options);
  }

  let selectedModules = [];

  if (setupType === 'bundle') {
    const { bundleChoice } = await inquirer.prompt([{
      type: 'list',
      name: 'bundleChoice',
      message: 'Choose a bundle:',
      choices: Object.values(bundles).map(b => ({
        name: `${b.name} - ${b.description}${b.recommended ? chalk.green(' ★') : ''}`,
        value: b.id
      }))
    }]);

    const bundle = bundles[bundleChoice];
    selectedModules = bundle.modules.map(id => {
      // Handle both hyphenated and camelCase keys
      return mcpServers[id] || mcpServers[id.replace(/-/g, '')] ||
             Object.values(mcpServers).find(s => s.id === id);
    }).filter(Boolean);

    console.log(chalk.cyan(`\n${bundle.name} bundle includes:`));
    selectedModules.forEach(m => console.log(chalk.gray(`  • ${m.name}`)));
    console.log('');
  } else {
    // Custom module selection
    const moduleChoices = Object.values(mcpServers).map(m => ({
      name: `${m.name} - ${m.description}`,
      value: m.id,
      checked: false
    }));

    const { modules } = await inquirer.prompt([{
      type: 'checkbox',
      name: 'modules',
      message: 'Select MCP servers to install:',
      choices: moduleChoices,
      pageSize: 15
    }]);

    selectedModules = modules.map(id => mcpServers[id]).filter(Boolean);
  }

  if (selectedModules.length === 0) {
    console.log(chalk.yellow('No modules selected. Exiting.\n'));
    process.exit(0);
  }

  // Skills selection
  const { installSkills } = await inquirer.prompt([{
    type: 'confirm',
    name: 'installSkills',
    message: 'Also install recommended skills (SuperClaude, Document Skills, Superpowers)?',
    default: true
  }]);

  // Credential wizard for auth-required modules
  const authModules = selectedModules.filter(m => m.requiresAuth);
  let credentials = {};

  if (authModules.length > 0) {
    console.log(chalk.cyan('\n🔐 Credential Setup\n'));
    console.log(chalk.gray('Now let\'s configure credentials for each service.\n'));

    credentials = await runCredentialWizard(authModules);
  }

  // Confirmation
  console.log(chalk.cyan('\n📋 Installation Summary\n'));
  console.log(chalk.bold('MCP Servers:'));
  selectedModules.forEach(m => console.log(chalk.green(`  ✓ ${m.name}`)));

  if (installSkills) {
    console.log(chalk.bold('\nSkills:'));
    Object.values(skills).forEach(s => console.log(chalk.green(`  ✓ ${s.name}`)));
  }

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: 'Proceed with installation?',
    default: true
  }]);

  if (!confirm) {
    console.log(chalk.gray('\nSetup cancelled.\n'));
    process.exit(0);
  }

  // Run installation
  console.log(chalk.cyan('\n🚀 Installing...\n'));

  for (const module of selectedModules) {
    await installModule(module, credentials);
  }

  if (installSkills) {
    for (const skill of Object.values(skills)) {
      await installSkill(skill);
    }
  }

  // Save configuration
  await saveConfig(selectedModules, credentials);

  // Done!
  console.log(chalk.bold.green('\n✨ Setup complete!\n'));
  console.log(chalk.gray('Next steps:'));
  console.log(chalk.white('  1. Restart Claude Code to load new MCP servers'));
  console.log(chalk.white('  2. Run `sf doctor` to verify installation'));
  console.log(chalk.white('  3. Try a command like /sc:help to see available skills'));
  console.log('');
  console.log(chalk.cyan('Need help? Visit https://support-forge.com/docs\n'));
}

async function installBundle(bundle) {
  console.log(chalk.cyan(`\n🎁 Installing ${bundle.name} bundle...\n`));

  const modules = bundle.modules.map(id => {
    return mcpServers[id] || mcpServers[id.replace(/-/g, '')] ||
           Object.values(mcpServers).find(s => s.id === id);
  }).filter(Boolean);

  const authModules = modules.filter(m => m.requiresAuth);
  let credentials = {};

  if (authModules.length > 0) {
    console.log(chalk.gray('This bundle requires credentials for some services.\n'));
    credentials = await runCredentialWizard(authModules);
  }

  for (const module of modules) {
    await installModule(module, credentials);
  }

  await saveConfig(modules, credentials);

  console.log(chalk.bold.green('\n✨ Bundle installed!\n'));
}

module.exports = { runSetupWizard };
