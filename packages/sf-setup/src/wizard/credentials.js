const inquirer = require('inquirer');
const chalk = require('chalk');
const open = require('open');

// Auth field descriptions and help text
const authFieldInfo = {
  AWS_ACCESS_KEY_ID: {
    message: 'AWS Access Key ID',
    help: 'Found in AWS Console → IAM → Security credentials',
    signupUrl: 'https://aws.amazon.com/free/'
  },
  AWS_SECRET_ACCESS_KEY: {
    message: 'AWS Secret Access Key',
    help: 'Shown once when creating access key',
    type: 'password'
  },
  AWS_REGION: {
    message: 'AWS Region',
    help: 'e.g., us-east-1, eu-west-1',
    default: 'us-east-1'
  },
  FIGMA_ACCESS_TOKEN: {
    message: 'Figma Access Token',
    help: 'Figma → Settings → Personal access tokens',
    signupUrl: 'https://www.figma.com/',
    type: 'password'
  },
  GITHUB_TOKEN: {
    message: 'GitHub Personal Access Token',
    help: 'GitHub → Settings → Developer settings → Personal access tokens',
    signupUrl: 'https://github.com/settings/tokens',
    type: 'password'
  },
  ZAPIER_MCP_API_KEY: {
    message: 'Zapier MCP API Key',
    help: 'Get your key at Zapier MCP Actions page',
    signupUrl: 'https://actions.zapier.com/mcp/',
    type: 'password'
  },
  WORDPRESS_URL: {
    message: 'WordPress Site URL',
    help: 'e.g., https://yoursite.com'
  },
  WORDPRESS_USERNAME: {
    message: 'WordPress Username',
    help: 'Your WordPress admin username'
  },
  WORDPRESS_APP_PASSWORD: {
    message: 'WordPress Application Password',
    help: 'WordPress → Users → Profile → Application Passwords',
    type: 'password'
  },
  CALENDLY_API_KEY: {
    message: 'Calendly API Key',
    help: 'Calendly → Integrations → API & Webhooks',
    signupUrl: 'https://calendly.com/',
    type: 'password'
  },
  TABLEAU_SERVER: {
    message: 'Tableau Server URL',
    help: 'Your Tableau server or Tableau Online URL'
  },
  TABLEAU_TOKEN_NAME: {
    message: 'Tableau Token Name',
    help: 'Personal Access Token name from Tableau settings'
  },
  TABLEAU_TOKEN_VALUE: {
    message: 'Tableau Token Value',
    help: 'Personal Access Token value',
    type: 'password'
  },
  FATHOM_API_KEY: {
    message: 'Fathom API Key',
    help: 'Fathom → Settings → API',
    signupUrl: 'https://usefathom.com/',
    type: 'password'
  },
  KUBECONFIG_PATH: {
    message: 'Kubeconfig Path',
    help: 'Path to your kubeconfig file (default: ~/.kube/config)',
    default: '~/.kube/config'
  },
  ALLOWED_PATHS: {
    message: 'Allowed File Paths',
    help: 'Comma-separated paths the filesystem server can access',
    default: '~,~/Documents,~/Projects'
  }
};

async function runCredentialWizard(modules) {
  const credentials = {};

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    const progress = chalk.gray(`[${i + 1}/${modules.length}]`);

    console.log(chalk.bold.cyan(`\n${progress} Configure ${module.name}\n`));
    console.log(chalk.gray(module.description));

    // Show pre-install note (like signup URL)
    if (module.preInstallNote) {
      console.log(chalk.yellow(`\n⚠️  ${module.preInstallNote}`));

      const { openSignup } = await inquirer.prompt([{
        type: 'confirm',
        name: 'openSignup',
        message: 'Open signup page in browser?',
        default: false
      }]);

      if (openSignup && authFieldInfo[module.authFields[0]]?.signupUrl) {
        await open(authFieldInfo[module.authFields[0]].signupUrl);
        console.log(chalk.gray('Browser opened. Come back here when ready.\n'));

        await inquirer.prompt([{
          type: 'input',
          name: 'continue',
          message: 'Press Enter when ready to continue...'
        }]);
      }
    }

    // Skip option
    const { configure } = await inquirer.prompt([{
      type: 'confirm',
      name: 'configure',
      message: `Configure ${module.name} now?`,
      default: true
    }]);

    if (!configure) {
      console.log(chalk.gray(`Skipping ${module.name}. You can add it later with: sf add ${module.id}\n`));
      continue;
    }

    // Collect credentials for each auth field
    for (const field of module.authFields) {
      const fieldInfo = authFieldInfo[field] || { message: field };

      console.log(chalk.gray(`\n${fieldInfo.help || ''}`));

      if (fieldInfo.signupUrl && !module.preInstallNote) {
        const { openHelp } = await inquirer.prompt([{
          type: 'confirm',
          name: 'openHelp',
          message: 'Need help? Open documentation in browser?',
          default: false
        }]);

        if (openHelp) {
          await open(fieldInfo.signupUrl);
        }
      }

      const { value } = await inquirer.prompt([{
        type: fieldInfo.type === 'password' ? 'password' : 'input',
        name: 'value',
        message: `${fieldInfo.message}:`,
        default: fieldInfo.default,
        mask: fieldInfo.type === 'password' ? '*' : undefined,
        validate: (input) => {
          if (!input && !fieldInfo.default) {
            return 'This field is required';
          }
          return true;
        }
      }]);

      credentials[field] = value || fieldInfo.default;
    }

    console.log(chalk.green(`\n✓ ${module.name} configured`));
  }

  return credentials;
}

async function addModule(moduleId) {
  const { mcpServers } = require('../modules/catalog');
  const module = mcpServers[moduleId] || Object.values(mcpServers).find(s => s.id === moduleId);

  if (!module) {
    console.log(chalk.red(`Unknown module: ${moduleId}`));
    console.log(chalk.gray('Run `sf-setup list` to see available modules'));
    process.exit(1);
  }

  console.log(chalk.cyan(`\n📦 Adding ${module.name}...\n`));

  let credentials = {};
  if (module.requiresAuth) {
    credentials = await runCredentialWizard([module]);
  }

  const { installModule } = require('./installer');
  await installModule(module, credentials);

  const { saveConfig } = require('../utils/config');
  await saveConfig([module], credentials, true); // append mode

  console.log(chalk.green(`\n✓ ${module.name} added successfully!\n`));
  console.log(chalk.gray('Restart Claude Code to load the new MCP server.\n'));
}

module.exports = { runCredentialWizard, addModule };
