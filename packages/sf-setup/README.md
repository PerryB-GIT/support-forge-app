# SF Setup - Support Forge AI Installer

One-click Claude Code setup with MCP servers, skills, and integrations.

## Quick Start

```bash
# Run directly (no install needed)
npx @support-forge/setup

# Or with GUI
npx @support-forge/setup --gui

# Quick install with bundle
npx @support-forge/setup --bundle starter
```

## Features

- **Modular Selection**: Pick exactly the MCP servers you need
- **Pre-configured Bundles**: Starter, Professional, DevOps, Marketing, Enterprise
- **Guided Credential Wizard**: Step-by-step authentication for each service
- **Cross-Platform**: Windows, macOS, Linux
- **CLI + Web UI**: Terminal for devs, browser interface for everyone else

## Available Modules

### Cloud & DevOps
- AWS API - S3, Lambda, EC2, and more
- Kubernetes - Cluster management

### Design
- Figma - Access designs and export assets

### Analytics
- Tableau - Dashboard queries
- Fathom - Privacy-focused analytics

### Productivity
- Calendly - Scheduling
- WordPress - Site management

### System Tools
- Filesystem - File read/write
- Desktop Commander - System commands
- Playwright - Browser automation
- Windows MCP - Windows-specific tools

### Integrations
- Zapier - Connect to 6,000+ apps (Google Sheets, Calendar, Gmail, etc.)
- GitHub - Repos, issues, PRs

## Commands

```bash
# Main setup wizard
sf-setup

# Launch web UI
sf-setup --gui

# Quick setup with bundle
sf-setup --bundle professional

# Check installation health
sf doctor

# Add a module later
sf add figma

# Check for updates
sf update

# List all available modules
sf-setup list
```

## Bundles

| Bundle | Description | Modules |
|--------|-------------|---------|
| Starter | Essential tools | filesystem, github, playwright |
| Professional | Full productivity stack | filesystem, github, zapier, wordpress, playwright, desktop-commander |
| DevOps | Cloud & infrastructure | aws, kubernetes, github, filesystem, desktop-commander |
| Marketing | Content & analytics | wordpress, figma, fathom, zapier, filesystem |
| Enterprise | Everything | All available modules |

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run locally
npm start

# Build Windows executable
npm run build

# Build for all platforms
npm run build:all
```

## Building the .exe

```bash
npm run build
# Creates dist/sf-setup.exe
```

The executable can be copied to any Windows machine and run without Node.js installed.

## Support

- Website: https://support-forge.com/setup
- Docs: https://support-forge.com/docs
- Issues: https://github.com/support-forge/sf-setup/issues

---

Built by [Support Forge](https://support-forge.com) 🚀
