const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const axios = require('axios');
const pkg = require('../../package.json');

async function checkForUpdates() {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org/@support-forge/setup/latest`,
      { timeout: 5000 }
    );

    const latestVersion = response.data.version;
    const currentVersion = pkg.version;

    if (latestVersion !== currentVersion) {
      return {
        updateAvailable: true,
        currentVersion,
        latestVersion
      };
    }

    return { updateAvailable: false, currentVersion };
  } catch {
    // Network error or package not published yet
    return { updateAvailable: false, error: true };
  }
}

async function runUpdate() {
  console.log(chalk.cyan('\n🔄 Checking for updates...\n'));

  const spinner = ora('Checking npm registry...').start();

  try {
    const updateInfo = await checkForUpdates();

    if (updateInfo.error) {
      spinner.warn('Could not check for updates (network error)');
      return;
    }

    if (!updateInfo.updateAvailable) {
      spinner.succeed(`You're on the latest version (v${updateInfo.currentVersion})`);
      return;
    }

    spinner.info(`Update available: v${updateInfo.currentVersion} → v${updateInfo.latestVersion}`);

    const inquirer = require('inquirer');
    const { doUpdate } = await inquirer.prompt([{
      type: 'confirm',
      name: 'doUpdate',
      message: 'Install update now?',
      default: true
    }]);

    if (!doUpdate) {
      console.log(chalk.gray('\nUpdate skipped. Run `sf update` anytime to update.\n'));
      return;
    }

    const updateSpinner = ora('Installing update...').start();

    try {
      execSync('npm install -g @support-forge/setup@latest', {
        stdio: 'pipe',
        encoding: 'utf8'
      });

      updateSpinner.succeed(`Updated to v${updateInfo.latestVersion}`);
      console.log(chalk.green('\n✨ Update complete!\n'));

    } catch (error) {
      updateSpinner.fail('Update failed');
      console.log(chalk.yellow('\nTry updating manually:'));
      console.log(chalk.white('  npm install -g @support-forge/setup@latest\n'));
    }

  } catch (error) {
    spinner.fail('Update check failed');
    console.log(chalk.red(`  Error: ${error.message}\n`));
  }
}

async function notifyIfUpdateAvailable() {
  // Silent check for updates, just notify if available
  try {
    const updateInfo = await checkForUpdates();
    if (updateInfo.updateAvailable) {
      console.log(chalk.yellow(`\n📦 Update available: v${updateInfo.latestVersion}`));
      console.log(chalk.gray('   Run `sf update` to install\n'));
    }
  } catch {
    // Silent fail
  }
}

module.exports = {
  checkForUpdates,
  runUpdate,
  notifyIfUpdateAvailable
};
