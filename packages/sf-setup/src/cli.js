#!/usr/bin/env node

const chalk = require('chalk');
const ora = require('ora');
const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function runDoctor() {
  console.log(chalk.bold.cyan('\n🏥 SF Setup Doctor\n'));
  console.log(chalk.gray('Checking your Claude Code installation...\n'));

  const checks = [
    { name: 'Node.js', check: checkNode },
    { name: 'npm', check: checkNpm },
    { name: 'Python', check: checkPython },
    { name: 'Git', check: checkGit },
    { name: 'Claude Code CLI', check: checkClaudeCode },
    { name: 'Claude Config Directory', check: checkClaudeConfig },
    { name: 'MCP Configuration', check: checkMcpConfig },
  ];

  let passed = 0;
  let failed = 0;

  for (const { name, check } of checks) {
    const spinner = ora(name).start();
    try {
      const result = await check();
      if (result.ok) {
        spinner.succeed(chalk.green(`${name}: ${result.message}`));
        passed++;
      } else {
        spinner.fail(chalk.red(`${name}: ${result.message}`));
        failed++;
      }
    } catch (err) {
      spinner.fail(chalk.red(`${name}: Error - ${err.message}`));
      failed++;
    }
  }

  console.log('\n' + chalk.bold('Summary:'));
  console.log(chalk.green(`  ✓ ${passed} passed`));
  if (failed > 0) {
    console.log(chalk.red(`  ✗ ${failed} failed`));
    console.log(chalk.yellow('\nRun `sf-setup` to fix issues or reinstall components.\n'));
  } else {
    console.log(chalk.green('\n✨ All checks passed! Your setup is healthy.\n'));
  }
}

function checkNode() {
  try {
    const version = execSync('node --version', { encoding: 'utf8' }).trim();
    const major = parseInt(version.slice(1).split('.')[0]);
    if (major >= 16) {
      return { ok: true, message: `${version} (OK)` };
    }
    return { ok: false, message: `${version} (requires v16+)` };
  } catch {
    return { ok: false, message: 'Not installed' };
  }
}

function checkNpm() {
  try {
    const version = execSync('npm --version', { encoding: 'utf8' }).trim();
    return { ok: true, message: `v${version}` };
  } catch {
    return { ok: false, message: 'Not installed' };
  }
}

function checkPython() {
  try {
    // Try python3 first, then python
    let version;
    try {
      version = execSync('python3 --version', { encoding: 'utf8' }).trim();
    } catch {
      version = execSync('python --version', { encoding: 'utf8' }).trim();
    }
    return { ok: true, message: version };
  } catch {
    return { ok: false, message: 'Not installed (some MCP servers require Python)' };
  }
}

function checkGit() {
  try {
    const version = execSync('git --version', { encoding: 'utf8' }).trim();
    return { ok: true, message: version.replace('git version ', 'v') };
  } catch {
    return { ok: false, message: 'Not installed' };
  }
}

function checkClaudeCode() {
  try {
    const version = execSync('claude --version', { encoding: 'utf8' }).trim();
    return { ok: true, message: `v${version}` };
  } catch {
    return { ok: false, message: 'Not installed - run `npm install -g @anthropic-ai/claude-code`' };
  }
}

function checkClaudeConfig() {
  const configDir = path.join(os.homedir(), '.claude');
  if (fs.existsSync(configDir)) {
    return { ok: true, message: configDir };
  }
  return { ok: false, message: 'Directory not found (~/.claude)' };
}

function checkMcpConfig() {
  const configPaths = [
    path.join(os.homedir(), '.claude', 'settings.json'),
    path.join(os.homedir(), '.claude', '.mcp.json'),
  ];

  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const serverCount = config.mcpServers ? Object.keys(config.mcpServers).length : 0;
        return { ok: true, message: `${serverCount} MCP server(s) configured` };
      } catch {
        return { ok: false, message: 'Config file exists but has invalid JSON' };
      }
    }
  }
  return { ok: false, message: 'No MCP configuration found' };
}

module.exports = { runDoctor };

// Run directly if called as script
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args[0] === 'doctor') {
    runDoctor();
  }
}
