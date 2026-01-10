#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { startWebUI } = require('./ui/server');
const { runSetupWizard } = require('./wizard/setup');
const { showBanner } = require('./utils/banner');
const { checkPrerequisites } = require('./utils/prerequisites');
const pkg = require('../package.json');

program
  .name('sf-setup')
  .description('Support Forge AI Setup - Claude Code installer with MCP servers, skills, and integrations')
  .version(pkg.version);

program
  .option('-g, --gui', 'Launch graphical web interface')
  .option('-q, --quick', 'Quick setup with recommended defaults')
  .option('-b, --bundle <name>', 'Install a pre-configured bundle (starter, professional, devops, marketing)')
  .option('--no-color', 'Disable colored output')
  .action(async (options) => {
    showBanner();

    if (options.gui) {
      console.log(chalk.cyan('\nLaunching web interface...\n'));
      await startWebUI();
      return;
    }

    // CLI mode
    await runSetupWizard(options);
  });

program
  .command('doctor')
  .description('Check installation health and diagnose issues')
  .action(async () => {
    const { runDoctor } = require('./cli');
    await runDoctor();
  });

program
  .command('add <module>')
  .description('Add a new module to existing installation')
  .action(async (module) => {
    const { addModule } = require('./wizard/modules');
    await addModule(module);
  });

program
  .command('update')
  .description('Check for and install updates')
  .action(async () => {
    const { runUpdate } = require('./utils/updater');
    await runUpdate();
  });

program
  .command('list')
  .description('List available modules and bundles')
  .action(async () => {
    const { listModules } = require('./modules/catalog');
    await listModules();
  });

program.parse();
