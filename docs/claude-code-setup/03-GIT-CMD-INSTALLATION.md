# Claude Code Installation via Git CMD

**Support Forge Client Resource**
*Step-by-Step Guide Using Windows Command Prompt with Git*

---

## Overview

This guide walks through installing Claude Code using **Git CMD** (the Windows Command Prompt with Git commands available). This is the simplest approach for Windows users who prefer traditional command-line interfaces over PowerShell or WSL.

## Prerequisites

Before starting, ensure you have:
- ✅ Git for Windows installed ([Download](https://git-scm.com/download/windows))
- ✅ A Claude Pro, Max, or Team (Premium) subscription
- ✅ Administrator access on your computer

---

## Step-by-Step Installation

### Step 1: Open Git CMD

1. Press `Windows + S` (search)
2. Type: `Git CMD`
3. Right-click on "Git CMD" and select **"Run as administrator"**

You should see a command prompt with your username:
```
C:\Users\YourName>
```

### Step 2: Verify Git is Working

```cmd
git --version
```

**Expected output:**
```
git version 2.47.1.windows.2
```

If you see an error, Git isn't installed properly. Return to the installation guide.

### Step 3: Check Node.js (Optional)

```cmd
node --version
```

**If Node.js is installed:**
```
v22.12.0
```

**If not installed:**
```
'node' is not recognized as an internal or external command
```

> Note: Claude Code no longer requires Node.js for installation, but it's useful for development.

### Step 4: Install Claude Code

Run the official installer command:

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

**What this does:**
1. Downloads the installer script from claude.ai
2. Runs the installer
3. Cleans up the temporary file

**Expected output:**
```
Downloading Claude Code...
Installing Claude Code...
Claude Code installed successfully!
Installation complete. Run 'claude' to get started.
```

### Step 5: Verify Installation

Close and reopen Git CMD (important for PATH updates), then:

```cmd
claude --version
```

**Expected output:**
```
claude-code version X.X.X
```

### Step 6: Run Health Check

```cmd
claude doctor
```

This verifies all components are working:
```
Checking environment...
  ✓ Operating system: Windows 10
  ✓ Shell: cmd.exe
  ✓ Git: 2.47.1
  ✓ Node.js: 22.12.0 (optional)
  ✓ Authentication: Not logged in

All checks passed! Run 'claude' to authenticate.
```

---

## Authentication

### Step 7: Navigate to Your Project

```cmd
cd C:\Users\YourName\Projects\my-project
```

Or create a test folder:
```cmd
mkdir C:\ClaudeTest
cd C:\ClaudeTest
```

### Step 8: Start Claude Code

```cmd
claude
```

### Step 9: Authenticate

1. **Browser opens automatically** with Anthropic login page
2. **Sign in** with your Claude Pro/Max credentials
3. **Click "Allow"** to authorize Claude Code
4. **Return to terminal** - you should see:

```
Authentication successful!
Welcome to Claude Code.

What would you like to do?
>
```

---

## Common Commands Reference

Once authenticated, here are essential commands:

| Command | Description |
|---------|-------------|
| `claude` | Start Claude Code in current directory |
| `claude "do something"` | Start with a specific task |
| `claude --version` | Check installed version |
| `claude doctor` | Health check |
| `claude update` | Update to latest version |
| `claude logout` | Sign out |
| `claude --help` | Show all commands |

---

## Troubleshooting

### "curl is not recognized"

Git CMD should include curl. If not:

1. Reinstall Git for Windows with all components
2. Or download curl separately: https://curl.se/windows/

### "claude is not recognized" after installation

The PATH wasn't updated. Fix:

```cmd
:: Close and reopen Git CMD, then try again
claude --version

:: If still not working, add to PATH manually:
set PATH=%PATH%;%USERPROFILE%\.claude\bin
```

### "Authentication failed"

1. Ensure your subscription is active at https://claude.ai
2. Try logging out and back in:
   ```cmd
   claude logout
   claude
   ```
3. Check firewall isn't blocking claude.ai

### "SSL certificate problem"

Corporate networks may intercept HTTPS. Fix:

```cmd
git config --global http.sslVerify false
```

⚠️ Only use this on trusted networks.

### Slow Installation

If the installer hangs:
1. Check internet connection
2. Disable VPN temporarily
3. Try PowerShell method instead:
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```

---

## Using Claude Code in Git CMD

### Basic Workflow

```cmd
:: Navigate to project
cd C:\Users\YourName\Projects\website

:: Start Claude
claude

:: Claude will analyze your project and wait for input
:: Type your request:
> explain what this project does

:: Or give specific tasks:
> fix the TypeScript errors in src/components

:: Exit Claude
> /exit
```

### Starting with a Task

```cmd
:: Start Claude with an immediate task
claude "create a README.md for this project"

:: Fix errors in a file
claude "fix the bug in server.js where users can't log in"

:: Explain code
claude "explain how the authentication flow works"
```

### Configuration

```cmd
:: Set preferred editor
claude config set editor code

:: View all settings
claude config list

:: Reset to defaults
claude config reset
```

---

## Git Integration

Claude Code works seamlessly with Git:

```cmd
:: In your git repository
cd C:\Users\YourName\Projects\my-repo

:: Start Claude
claude

:: Ask Claude to help with git
> commit my changes with a descriptive message
> create a new branch for this feature
> explain the recent commits
```

---

## Next Steps

- **[Quick Start Usage Guide](./04-QUICK-START-USAGE.md)** - Learn advanced Claude Code features
- **[Project Setup](./05-PROJECT-SETUP.md)** - Configure Claude for your specific project

---

## Quick Reference Card

Print this for easy reference:

```
╔═══════════════════════════════════════════════════════════════╗
║  CLAUDE CODE - GIT CMD QUICK REFERENCE                       ║
╠═══════════════════════════════════════════════════════════════╣
║  INSTALL:                                                     ║
║  curl -fsSL https://claude.ai/install.cmd -o i.cmd && i.cmd   ║
║                                                               ║
║  DAILY USE:                                                   ║
║  cd C:\path\to\project                                        ║
║  claude                                                       ║
║                                                               ║
║  COMMANDS:                                                    ║
║  claude --version    Check version                            ║
║  claude doctor       Health check                             ║
║  claude update       Update CLI                               ║
║  claude logout       Sign out                                 ║
║                                                               ║
║  INSIDE CLAUDE:                                               ║
║  /help              Show commands                             ║
║  /exit              Exit Claude                               ║
║  /clear             Clear conversation                        ║
║                                                               ║
║  SUPPORT: support@support-forge.com                           ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*Support Forge - AI Strategy That Moves the Needle*
*Questions? Contact support@support-forge.com*
