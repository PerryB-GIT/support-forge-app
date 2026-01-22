# Claude Code Setup Guide

**Support Forge Client Documentation**
*Everything You Need to Get Started with Claude Code*

---

## What is Claude Code?

Claude Code is Anthropic's official AI-powered coding assistant that runs directly in your terminal. It can:

- 🔧 Fix bugs and errors in your code
- ✨ Write new features and components
- 📖 Explain complex code logic
- 🔄 Refactor and improve existing code
- 📝 Generate documentation
- 🧪 Write tests
- 🔀 Help with Git operations

---

## Documentation Index

### Getting Started (Start Here)

| Guide | Description | Time |
|-------|-------------|------|
| [01-SUBSCRIPTION-GUIDE.md](./01-SUBSCRIPTION-GUIDE.md) | Set up Claude Pro or Max subscription | 5 min |
| [02-INSTALLATION-GUIDE.md](./02-INSTALLATION-GUIDE.md) | Install all prerequisites + Claude Code | 15-30 min |
| [03-GIT-CMD-INSTALLATION.md](./03-GIT-CMD-INSTALLATION.md) | Windows CMD-specific installation steps | 10 min |
| [04-QUICK-START-USAGE.md](./04-QUICK-START-USAGE.md) | Essential commands and daily workflows | 10 min |

### Quick Reference

**Minimum Requirements:**
- Windows 10/11 with Git for Windows
- Claude Pro ($20/mo), Max ($100-200/mo), or Team Premium ($150/seat)

**One-Line Install (after Git is installed):**
```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

**Start Using:**
```cmd
cd C:\path\to\your\project
claude
```

---

## Automated Installer

For Windows users, we provide a one-click installer that sets up everything:

### Option A: Download & Run
1. Download: `ClaudeCodeSetup.exe` from your Support Forge client portal
2. Double-click to run
3. Follow the prompts

### Option B: PowerShell Command
```powershell
# Run as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
irm https://support-forge.com/claude-setup.ps1 | iex
```

The installer will set up:
- ✅ Git for Windows (includes Git Bash)
- ✅ Node.js LTS
- ✅ Python 3
- ✅ WSL 2 (optional)
- ✅ Docker Desktop (optional)
- ✅ Claude Code CLI

---

## Support

### Self-Service
- Check our guides in this folder
- Run `claude doctor` to diagnose issues
- Visit https://docs.anthropic.com/claude-code

### Contact Support Forge
- **Email**: support@support-forge.com
- **Schedule a Call**: https://calendly.com/support-forge
- **Response Time**: Within 24 hours for clients

### Common Issues Quick Fixes

| Issue | Solution |
|-------|----------|
| "claude is not recognized" | Restart terminal, or reinstall |
| "Authentication failed" | Check subscription is active, run `claude logout` then `claude` |
| Slow performance | Add project folder to Windows Defender exclusions |
| Git Bash not found | Set `CLAUDE_CODE_GIT_BASH_PATH` environment variable |

---

## Folder Structure

```
docs/claude-code-setup/
├── README.md                    # This file
├── 01-SUBSCRIPTION-GUIDE.md     # Account setup
├── 02-INSTALLATION-GUIDE.md     # Full installation walkthrough
├── 03-GIT-CMD-INSTALLATION.md   # Git CMD specific steps
└── 04-QUICK-START-USAGE.md      # Daily usage guide

tools/claude-code-setup/
├── Install-ClaudeCodePrereqs.ps1  # PowerShell installer script
├── Setup-ClaudeCode.bat           # Batch file launcher
└── BUILD-SETUP-EXE.md             # How to build the .exe
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 2026 | Initial release |

---

*Support Forge - AI Strategy That Moves the Needle*
*https://support-forge.com*
