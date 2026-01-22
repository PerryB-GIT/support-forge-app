# Claude Code Installation Guide for Windows

**Support Forge Client Resource**
*Complete Windows Setup from Zero to Claude Code*

---

## Prerequisites Overview

Before installing Claude Code, your Windows system needs:

| Component | Version Required | Purpose |
|-----------|------------------|---------|
| **Git for Windows** | Latest | Terminal environment & version control |
| **Node.js** | 18+ (LTS recommended) | JavaScript runtime |
| **Python** | 3.10+ | Various tooling support |
| **WSL** (Optional) | WSL 2 | Linux development environment |
| **Docker** (Optional) | Latest | Container support |

> **Quick Path**: If you just want Claude Code working fast, you only NEED Git for Windows. The other tools are recommended for a complete development environment.

---

## Quick Install (Experienced Users)

If you're comfortable with command line, run our automated installer:

```powershell
# In PowerShell (Run as Administrator)
Set-ExecutionPolicy Bypass -Scope Process -Force
irm https://support-forge.com/claude-setup.ps1 | iex
```

**OR** proceed with manual installation below.

---

## Step-by-Step Manual Installation

### Step 1: Install Git for Windows

Git for Windows provides Git Bash, which Claude Code uses on Windows.

1. **Download Git**
   - Visit: https://git-scm.com/download/windows
   - Click "Click here to download" for latest version

2. **Run Installer**
   - Launch `Git-*-64-bit.exe`
   - Click through with defaults, except:
     - ✅ "Add Git Bash Profile to Windows Terminal"
     - ✅ "Add a Git Bash Profile to Windows Terminal"
     - Select "Use Windows' default console window" (or Windows Terminal)

3. **Verify Installation**
   ```cmd
   git --version
   ```
   Should output: `git version 2.x.x`

### Step 2: Install Node.js

1. **Download Node.js LTS**
   - Visit: https://nodejs.org
   - Click the LTS version (not Current)

2. **Run Installer**
   - Launch `node-vXX.XX.X-x64.msi`
   - ✅ Accept license
   - ✅ Keep default install path
   - ✅ "Add to PATH" should be checked
   - ✅ "Automatically install necessary tools" - YES

3. **Verify Installation**
   ```cmd
   node --version
   npm --version
   ```
   Should output: `v22.x.x` and `10.x.x` (or similar)

### Step 3: Install Python (Recommended)

1. **Download Python**
   - Visit: https://python.org/downloads
   - Click "Download Python 3.x.x"

2. **Run Installer**
   - ✅ **IMPORTANT**: Check "Add python.exe to PATH"
   - Click "Install Now"

3. **Verify Installation**
   ```cmd
   python --version
   pip --version
   ```
   Should output: `Python 3.x.x` and `pip 2x.x`

### Step 4: Install WSL 2 (Optional but Recommended)

WSL provides a full Linux environment on Windows.

1. **Open PowerShell as Administrator**
   - Right-click Start → "Terminal (Admin)" or "PowerShell (Admin)"

2. **Install WSL**
   ```powershell
   wsl --install
   ```

3. **Restart Computer**
   - Required to complete installation

4. **Set Up Ubuntu** (after restart)
   - Ubuntu will launch automatically
   - Create username and password when prompted

5. **Verify Installation**
   ```powershell
   wsl --version
   ```

### Step 5: Install Docker Desktop (Optional)

1. **Download Docker Desktop**
   - Visit: https://docker.com/products/docker-desktop
   - Click "Download for Windows"

2. **Run Installer**
   - Launch `Docker Desktop Installer.exe`
   - ✅ Enable WSL 2 integration

3. **Start Docker**
   - Launch Docker Desktop from Start Menu
   - Wait for "Docker is running" status

4. **Verify Installation**
   ```cmd
   docker --version
   docker run hello-world
   ```

---

## Installing Claude Code

Now that prerequisites are ready, install Claude Code:

### Method 1: Git Bash (Recommended)

1. **Open Git Bash**
   - Start Menu → Git Bash
   - Or right-click in any folder → "Git Bash Here"

2. **Run Installer**
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```

3. **Verify Installation**
   ```bash
   claude --version
   ```

### Method 2: PowerShell

1. **Open PowerShell**
   - Start Menu → PowerShell (or Windows Terminal)

2. **Run Installer**
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```

3. **Verify Installation**
   ```powershell
   claude --version
   ```

### Method 3: Windows CMD

1. **Open Command Prompt**
   - Start Menu → cmd

2. **Run Installer**
   ```cmd
   curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
   ```

### Method 4: WinGet (Windows Package Manager)

```powershell
winget install Anthropic.ClaudeCode
```

---

## First-Time Authentication

After installation, authenticate with your Claude subscription:

1. **Navigate to a project folder**
   ```bash
   cd ~/my-project
   # or
   cd C:\Users\YourName\Projects\my-project
   ```

2. **Start Claude Code**
   ```bash
   claude
   ```

3. **Authenticate**
   - A browser window opens automatically
   - Sign in with your Claude Pro/Max/Team account
   - Click "Allow" to authorize Claude Code
   - Return to terminal - you should see "Authenticated successfully"

4. **Verify Health**
   ```bash
   claude doctor
   ```
   This checks all components are working correctly.

---

## Configuration & Customization

### Set Default Editor
```bash
claude config set editor code    # VS Code
claude config set editor cursor  # Cursor
claude config set editor vim     # Vim
```

### Configure Git Integration
```bash
claude config set git.autoCommit true
claude config set git.showDiff true
```

### View All Settings
```bash
claude config list
```

---

## Common First-Use Commands

```bash
# Start Claude in current directory
claude

# Start with a specific task
claude "fix the TypeScript errors in this project"

# Get help
claude --help

# Check installation health
claude doctor

# Update Claude Code
claude update
```

---

## Troubleshooting

### "claude is not recognized"
- Close and reopen terminal
- Check PATH: `echo %PATH%` (cmd) or `echo $PATH` (bash)
- Reinstall Claude Code

### "Authentication failed"
- Ensure subscription is active (see Guide 01)
- Try `claude logout` then restart `claude`
- Check https://claude.ai is accessible

### "Git Bash not found"
For portable Git installations, set the path:
```powershell
# In PowerShell, before running claude
$env:CLAUDE_CODE_GIT_BASH_PATH="C:\Program Files\Git\bin\bash.exe"
```

### Slow Performance
- Ensure Windows Defender exclusion for project folders
- Use WSL 2 for better filesystem performance
- Close unnecessary background applications

---

## Next Steps

→ **[03-QUICK-START-USAGE.md](./03-QUICK-START-USAGE.md)** - Learn essential Claude Code commands
→ **[04-PROJECT-SETUP.md](./04-PROJECT-SETUP.md)** - Set up your first project with Claude

---

*Support Forge - AI Strategy That Moves the Needle*
*Questions? Contact support@support-forge.com*
