# Building Setup.exe Installer

**Support Forge - Developer Documentation**
*Creating a Single-Click Windows Installer for Claude Code*

---

## Overview

This guide explains how to package the PowerShell installer into a single `.exe` file that clients can double-click to install all Claude Code prerequisites.

## Packaging Options

### Option 1: PS2EXE (Recommended - Free)

**PS2EXE** converts PowerShell scripts directly into standalone executables.

#### Installation
```powershell
Install-Module -Name ps2exe -Scope CurrentUser
```

#### Build Command
```powershell
# Navigate to the tools directory
cd C:\Users\Jakeb\support-forge-app\tools\claude-code-setup

# Convert to EXE with admin requirement
Invoke-PS2EXE `
    -InputFile ".\Install-ClaudeCodePrereqs.ps1" `
    -OutputFile ".\ClaudeCodeSetup.exe" `
    -Title "Claude Code Setup - Support Forge" `
    -Company "Support Forge" `
    -Product "Claude Code Prerequisites Installer" `
    -Version "1.0.0" `
    -Description "Installs Git, Node.js, Python, WSL, Docker and Claude Code" `
    -RequireAdmin `
    -NoConsole:$false `
    -IconFile ".\icon.ico"
```

#### Build Parameters Explained
| Parameter | Purpose |
|-----------|---------|
| `-RequireAdmin` | Forces UAC elevation prompt |
| `-NoConsole:$false` | Shows console window for progress |
| `-IconFile` | Custom icon (optional) |

---

### Option 2: NSIS (Advanced - Free)

**NSIS** (Nullsoft Scriptable Install System) creates professional Windows installers.

#### Benefits
- Progress bars and dialogs
- Component selection UI
- Uninstaller included
- Professional appearance

#### Example NSIS Script
```nsis
; ClaudeCodeSetup.nsi
!include "MUI2.nsh"

Name "Claude Code Setup"
OutFile "ClaudeCodeSetup.exe"
InstallDir "$TEMP\ClaudeCodeSetup"
RequestExecutionLevel admin

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_COMPONENTS
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_LANGUAGE "English"

Section "Git for Windows" SEC_GIT
    SetOutPath $INSTDIR
    File "Git-2.47.1.2-64-bit.exe"
    ExecWait '"$INSTDIR\Git-2.47.1.2-64-bit.exe" /VERYSILENT /NORESTART'
SectionEnd

Section "Node.js" SEC_NODE
    SetOutPath $INSTDIR
    File "node-v22.12.0-x64.msi"
    ExecWait 'msiexec /i "$INSTDIR\node-v22.12.0-x64.msi" /qn /norestart'
SectionEnd

Section "Python 3" SEC_PYTHON
    SetOutPath $INSTDIR
    File "python-3.12.8-amd64.exe"
    ExecWait '"$INSTDIR\python-3.12.8-amd64.exe" /quiet PrependPath=1'
SectionEnd

Section "Claude Code" SEC_CLAUDE
    nsExec::ExecToLog 'powershell -Command "irm https://claude.ai/install.ps1 | iex"'
SectionEnd
```

#### Build with NSIS
```cmd
makensis ClaudeCodeSetup.nsi
```

---

### Option 3: Inno Setup (Advanced - Free)

**Inno Setup** is another professional installer builder.

#### Example Script
```iss
[Setup]
AppName=Claude Code Prerequisites
AppVersion=1.0
DefaultDirName={tmp}\ClaudeCodeSetup
PrivilegesRequired=admin
OutputBaseFilename=ClaudeCodeSetup

[Files]
Source: "Install-ClaudeCodePrereqs.ps1"; DestDir: "{tmp}"

[Run]
Filename: "powershell.exe"; \
    Parameters: "-ExecutionPolicy Bypass -File ""{tmp}\Install-ClaudeCodePrereqs.ps1"""; \
    Flags: runhidden waituntilterminated
```

---

### Option 4: Self-Extracting Archive (Simple)

Use 7-Zip to create a self-extracting archive:

1. **Create archive with scripts**
   ```cmd
   7z a -sfx7z.sfx ClaudeCodeSetup.exe Install-ClaudeCodePrereqs.ps1 Setup-ClaudeCode.bat
   ```

2. **Configure auto-run**
   Create `config.txt`:
   ```
   ;!@Install@!UTF-8!
   Title="Claude Code Setup"
   BeginPrompt="Install Claude Code and prerequisites?"
   RunProgram="Setup-ClaudeCode.bat"
   ;!@InstallEnd@!
   ```

---

## Recommended Approach

For Support Forge clients, we recommend **Option 1 (PS2EXE)** because:
- Simple to build and maintain
- No external dependencies bundled (downloads latest versions)
- Small file size (~1MB)
- Easy to update

## Build Workflow

### Automated Build Script

```powershell
# build-installer.ps1
# Run this to rebuild the setup.exe

# Ensure PS2EXE is installed
if (-not (Get-Module -ListAvailable -Name ps2exe)) {
    Install-Module -Name ps2exe -Scope CurrentUser -Force
}

# Build the executable
$buildParams = @{
    InputFile    = ".\Install-ClaudeCodePrereqs.ps1"
    OutputFile   = ".\dist\ClaudeCodeSetup.exe"
    Title        = "Claude Code Setup"
    Company      = "Support Forge"
    Product      = "Claude Code Prerequisites Installer"
    Version      = "1.0.0"
    Description  = "Installs development tools and Claude Code CLI"
    RequireAdmin = $true
    NoConsole    = $false
}

# Create output directory
New-Item -ItemType Directory -Path ".\dist" -Force | Out-Null

# Build
Invoke-PS2EXE @buildParams

Write-Host "Build complete: .\dist\ClaudeCodeSetup.exe" -ForegroundColor Green
```

---

## Distribution

### Hosting the Installer

1. **On support-forge.com**
   - Upload to: `https://support-forge.com/downloads/ClaudeCodeSetup.exe`
   - Add download page at: `/downloads/claude-code`

2. **Client Email Template**
   ```
   Subject: Claude Code Setup - Your Development Environment

   Hi [Client Name],

   Here's your one-click installer for Claude Code:

   Download: https://support-forge.com/downloads/ClaudeCodeSetup.exe

   Just double-click and follow the prompts. You'll need:
   - Admin access on your computer
   - Your Claude Pro/Max account credentials
   - About 15 minutes for full installation

   Questions? Reply to this email or book a setup call.

   Best,
   Support Forge Team
   ```

### Version Management

Maintain version history:
- `ClaudeCodeSetup-v1.0.0.exe`
- `ClaudeCodeSetup-v1.1.0.exe`
- `ClaudeCodeSetup-latest.exe` (symlink to current)

---

## Testing Checklist

Before releasing to clients:

- [ ] Test on clean Windows 10 VM
- [ ] Test on clean Windows 11 VM
- [ ] Verify Git installs correctly
- [ ] Verify Node.js installs correctly
- [ ] Verify Python installs correctly
- [ ] Verify WSL prompt appears
- [ ] Verify Claude Code installs
- [ ] Test `claude doctor` passes
- [ ] Verify PATH is correct after restart
- [ ] Test with Windows Defender enabled
- [ ] Test with common antivirus (Norton, McAfee)

---

## Code Signing (Optional but Recommended)

To avoid "Unknown Publisher" warnings:

1. **Purchase Code Signing Certificate**
   - DigiCert: ~$500/year
   - Sectigo: ~$300/year
   - SignPath (free for open source)

2. **Sign the Executable**
   ```powershell
   signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com ClaudeCodeSetup.exe
   ```

---

*Support Forge - AI Strategy That Moves the Needle*
