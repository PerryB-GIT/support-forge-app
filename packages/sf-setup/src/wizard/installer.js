const { execSync, exec } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

async function installModule(module, credentials = {}) {
  const spinner = ora(`Installing ${module.name}...`).start();

  try {
    // Check platform compatibility
    if (module.platform && module.platform !== process.platform) {
      spinner.warn(`${module.name} - Skipped (not compatible with ${process.platform})`);
      return { success: false, skipped: true };
    }

    // Run the install command (typically npx to verify package exists)
    // Most MCP servers don't need pre-install, they run via npx
    spinner.text = `Verifying ${module.name} package...`;

    // For packages that need explicit install
    if (module.installCommand && module.installCommand.startsWith('npm install')) {
      execSync(module.installCommand, {
        stdio: 'pipe',
        encoding: 'utf8'
      });
    }

    // Run post-install if needed (like playwright install chromium)
    if (module.postInstall) {
      spinner.text = `Running post-install for ${module.name}...`;
      execSync(module.postInstall, {
        stdio: 'pipe',
        encoding: 'utf8'
      });
    }

    spinner.succeed(`${module.name} - Ready`);
    return { success: true };

  } catch (error) {
    spinner.fail(`${module.name} - Failed`);
    console.log(chalk.red(`  Error: ${error.message}`));
    return { success: false, error: error.message };
  }
}

async function installSkill(skill) {
  const spinner = ora(`Installing ${skill.name}...`).start();

  try {
    // Skills are installed via claude CLI
    // For now, just verify claude is available
    try {
      execSync('claude --version', { stdio: 'pipe' });
    } catch {
      spinner.warn(`${skill.name} - Claude CLI not found, skipping skill install`);
      return { success: false, skipped: true };
    }

    // Run the plugin install command
    spinner.text = `Installing ${skill.name} plugin...`;

    try {
      execSync(skill.installCommand, {
        stdio: 'pipe',
        encoding: 'utf8',
        timeout: 60000
      });
      spinner.succeed(`${skill.name} - Installed`);
      return { success: true };
    } catch (installError) {
      // Plugin might already be installed or command format differs
      spinner.warn(`${skill.name} - May need manual install: ${skill.installCommand}`);
      return { success: false, manual: true };
    }

  } catch (error) {
    spinner.fail(`${skill.name} - Failed`);
    console.log(chalk.red(`  Error: ${error.message}`));
    return { success: false, error: error.message };
  }
}

async function installClaudeCode() {
  const spinner = ora('Checking Claude Code CLI...').start();

  try {
    const version = execSync('claude --version', { encoding: 'utf8' }).trim();
    spinner.succeed(`Claude Code CLI v${version} already installed`);
    return { success: true, alreadyInstalled: true };
  } catch {
    spinner.text = 'Installing Claude Code CLI...';

    try {
      execSync('npm install -g @anthropic-ai/claude-code', {
        stdio: 'pipe',
        encoding: 'utf8'
      });
      spinner.succeed('Claude Code CLI installed');
      return { success: true };
    } catch (error) {
      spinner.fail('Failed to install Claude Code CLI');
      console.log(chalk.yellow('\nTry installing manually:'));
      console.log(chalk.white('  npm install -g @anthropic-ai/claude-code\n'));
      return { success: false, error: error.message };
    }
  }
}

module.exports = {
  installModule,
  installSkill,
  installClaudeCode
};
