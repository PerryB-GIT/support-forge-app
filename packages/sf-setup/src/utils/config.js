const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const ora = require('ora');

function getClaudeConfigPath() {
  const claudeDir = path.join(os.homedir(), '.claude');
  return path.join(claudeDir, 'settings.json');
}

function ensureClaudeDir() {
  const claudeDir = path.join(os.homedir(), '.claude');
  if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir, { recursive: true });
  }
  return claudeDir;
}

async function saveConfig(modules, credentials, append = false) {
  const spinner = ora('Saving configuration...').start();

  try {
    const configPath = getClaudeConfigPath();
    ensureClaudeDir();

    // Load existing config or create new
    let config = { mcpServers: {} };
    if (fs.existsSync(configPath)) {
      try {
        const existing = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (append) {
          config = existing;
        } else {
          // Preserve non-MCP settings
          config = { ...existing, mcpServers: {} };
        }
      } catch {
        // Invalid JSON, start fresh but back up
        const backupPath = `${configPath}.backup.${Date.now()}`;
        fs.copyFileSync(configPath, backupPath);
        spinner.warn(`Backed up invalid config to ${backupPath}`);
      }
    }

    // Add MCP server configurations
    for (const module of modules) {
      if (!module.config) continue;

      const serverConfig = JSON.parse(JSON.stringify(module.config));

      // Replace credential placeholders with actual values
      if (serverConfig.env) {
        for (const [key, value] of Object.entries(serverConfig.env)) {
          if (typeof value === 'string' && value.startsWith('${') && value.endsWith('}')) {
            const credKey = value.slice(2, -1);
            serverConfig.env[key] = credentials[credKey] || '';
          }
        }
      }

      // Handle args with placeholders
      if (serverConfig.args) {
        serverConfig.args = serverConfig.args.map(arg => {
          if (typeof arg === 'string' && arg.startsWith('${') && arg.endsWith('}')) {
            const credKey = arg.slice(2, -1);
            const value = credentials[credKey] || '';
            // For paths, split by comma into multiple args
            if (credKey === 'ALLOWED_PATHS') {
              return value.split(',').map(p => p.trim());
            }
            return value;
          }
          return arg;
        }).flat();
      }

      config.mcpServers[module.id] = serverConfig;
    }

    // Write config
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    spinner.succeed(`Configuration saved to ${configPath}`);

    // Also save credentials to a secure local store (for sf doctor/update)
    await saveCredentialStore(credentials);

    return { success: true, path: configPath };

  } catch (error) {
    spinner.fail('Failed to save configuration');
    console.log(chalk.red(`  Error: ${error.message}`));
    return { success: false, error: error.message };
  }
}

async function saveCredentialStore(credentials) {
  // Save encrypted/obfuscated credential references
  // In production, use proper secret storage (keychain, credential manager)
  const storePath = path.join(os.homedir(), '.claude', '.sf-credentials.json');

  // Only save which credentials are configured, not the values
  const credentialMeta = {};
  for (const key of Object.keys(credentials)) {
    if (credentials[key]) {
      credentialMeta[key] = {
        configured: true,
        lastUpdated: new Date().toISOString()
      };
    }
  }

  fs.writeFileSync(storePath, JSON.stringify(credentialMeta, null, 2));
}

function loadConfig() {
  const configPath = getClaudeConfigPath();
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch {
      return null;
    }
  }
  return null;
}

function getInstalledModules() {
  const config = loadConfig();
  if (!config || !config.mcpServers) {
    return [];
  }
  return Object.keys(config.mcpServers);
}

module.exports = {
  saveConfig,
  loadConfig,
  getInstalledModules,
  getClaudeConfigPath,
  ensureClaudeDir
};
