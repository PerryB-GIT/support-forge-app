# ============================================================================
# Support Forge - Claude Code Prerequisites Installer
# ============================================================================
# This script installs all prerequisites for Claude Code on Windows:
#   - Git for Windows (includes Git Bash)
#   - Node.js LTS
#   - Python 3
#   - WSL 2 (optional)
#   - Docker Desktop (optional)
#   - Claude Code CLI
#
# Run as Administrator:
#   Set-ExecutionPolicy Bypass -Scope Process -Force
#   .\Install-ClaudeCodePrereqs.ps1
#
# Or run directly from web:
#   irm https://support-forge.com/claude-setup.ps1 | iex
# ============================================================================

#Requires -RunAsAdministrator

param(
    [switch]$SkipWSL,
    [switch]$SkipDocker,
    [switch]$SkipPython,
    [switch]$Silent,
    [switch]$SkipClaudeCode
)

# ============================================================================
# Configuration
# ============================================================================
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$script:LogFile = "$env:TEMP\claude-setup-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
$script:DownloadDir = "$env:TEMP\claude-setup-downloads"

# Version requirements
$NodeMinVersion = [Version]"18.0.0"
$PythonMinVersion = [Version]"3.10.0"
$GitMinVersion = [Version]"2.30.0"

# Download URLs (updated Jan 2026)
$GitDownloadUrl = "https://github.com/git-for-windows/git/releases/download/v2.52.0.windows.1/Git-2.52.0-64-bit.exe"
$NodeDownloadUrl = "https://nodejs.org/dist/v24.13.0/node-v24.13.0-x64.msi"
$PythonDownloadUrl = "https://www.python.org/ftp/python/3.13.2/python-3.13.2-amd64.exe"
$DockerDownloadUrl = "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"

# ============================================================================
# Utility Functions
# ============================================================================

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$Level] $Message"
    Add-Content -Path $script:LogFile -Value $logMessage

    if (-not $Silent) {
        switch ($Level) {
            "ERROR"   { Write-Host $Message -ForegroundColor Red }
            "WARNING" { Write-Host $Message -ForegroundColor Yellow }
            "SUCCESS" { Write-Host $Message -ForegroundColor Green }
            default   { Write-Host $Message -ForegroundColor Cyan }
        }
    }
}

function Write-Banner {
    $banner = @"

    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║     SUPPORT FORGE - Claude Code Setup Assistant               ║
    ║     AI Strategy That Moves the Needle                         ║
    ║                                                               ║
    ║     Installing prerequisites for Claude Code CLI              ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝

"@
    Write-Host $banner -ForegroundColor Magenta
}

function Test-AdminPrivileges {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-InstalledVersion {
    param([string]$Command, [string]$VersionArg = "--version")
    try {
        $output = & $Command $VersionArg 2>&1 | Out-String
        if ($output -match '(\d+\.\d+\.\d+)') {
            return [Version]$Matches[1]
        }
    } catch {
        return $null
    }
    return $null
}

function Invoke-Download {
    param([string]$Url, [string]$OutFile)
    Write-Log "Downloading: $Url"
    try {
        Invoke-WebRequest -Uri $Url -OutFile $OutFile -UseBasicParsing
        return $true
    } catch {
        Write-Log "Download failed: $_" "ERROR"
        return $false
    }
}

function Add-ToPath {
    param([string]$PathToAdd)
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    if ($currentPath -notlike "*$PathToAdd*") {
        [Environment]::SetEnvironmentVariable("Path", "$currentPath;$PathToAdd", "Machine")
        $env:Path = "$env:Path;$PathToAdd"
        Write-Log "Added to PATH: $PathToAdd" "SUCCESS"
    }
}

# ============================================================================
# Installation Functions
# ============================================================================

function Install-Git {
    Write-Log "`n>>> Checking Git for Windows..." "INFO"

    $gitVersion = Get-InstalledVersion "git"
    if ($gitVersion -and $gitVersion -ge $GitMinVersion) {
        Write-Log "Git $gitVersion already installed (>= $GitMinVersion required)" "SUCCESS"
        return $true
    }

    Write-Log "Installing Git for Windows..."
    $installer = "$script:DownloadDir\Git-Setup.exe"

    if (-not (Invoke-Download $GitDownloadUrl $installer)) {
        return $false
    }

    # Silent install with recommended options
    $gitArgs = @(
        "/VERYSILENT",
        "/NORESTART",
        "/NOCANCEL",
        "/SP-",
        "/CLOSEAPPLICATIONS",
        "/RESTARTAPPLICATIONS",
        "/COMPONENTS=icons,ext\reg\shellhere,assoc,assoc_sh"
    )

    Write-Log "Running Git installer (this may take a few minutes)..."
    Start-Process -FilePath $installer -ArgumentList $gitArgs -Wait -NoNewWindow

    # Refresh environment
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    $gitVersion = Get-InstalledVersion "git"
    if ($gitVersion) {
        Write-Log "Git $gitVersion installed successfully!" "SUCCESS"
        return $true
    }

    Write-Log "Git installation may require a restart to complete" "WARNING"
    return $true
}

function Install-NodeJS {
    Write-Log "`n>>> Checking Node.js..." "INFO"

    $nodeVersion = Get-InstalledVersion "node"
    if ($nodeVersion -and $nodeVersion -ge $NodeMinVersion) {
        Write-Log "Node.js $nodeVersion already installed (>= $NodeMinVersion required)" "SUCCESS"
        return $true
    }

    Write-Log "Installing Node.js LTS..."
    $installer = "$script:DownloadDir\node-setup.msi"

    if (-not (Invoke-Download $NodeDownloadUrl $installer)) {
        return $false
    }

    Write-Log "Running Node.js installer..."
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $installer, "/qn", "/norestart" -Wait -NoNewWindow

    # Refresh environment
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    $nodeVersion = Get-InstalledVersion "node"
    if ($nodeVersion) {
        Write-Log "Node.js $nodeVersion installed successfully!" "SUCCESS"
        return $true
    }

    Write-Log "Node.js installation completed - restart terminal to use" "WARNING"
    return $true
}

function Install-Python {
    if ($SkipPython) {
        Write-Log "`n>>> Skipping Python installation (--SkipPython)" "INFO"
        return $true
    }

    Write-Log "`n>>> Checking Python..." "INFO"

    $pythonVersion = Get-InstalledVersion "python"
    if ($pythonVersion -and $pythonVersion -ge $PythonMinVersion) {
        Write-Log "Python $pythonVersion already installed (>= $PythonMinVersion required)" "SUCCESS"
        return $true
    }

    Write-Log "Installing Python 3..."
    $installer = "$script:DownloadDir\python-setup.exe"

    if (-not (Invoke-Download $PythonDownloadUrl $installer)) {
        return $false
    }

    # Install with PATH option enabled
    Write-Log "Running Python installer..."
    Start-Process -FilePath $installer -ArgumentList "/quiet", "InstallAllUsers=1", "PrependPath=1", "Include_test=0" -Wait -NoNewWindow

    # Refresh environment
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    $pythonVersion = Get-InstalledVersion "python"
    if ($pythonVersion) {
        Write-Log "Python $pythonVersion installed successfully!" "SUCCESS"
        return $true
    }

    Write-Log "Python installation completed - restart terminal to use" "WARNING"
    return $true
}

function Install-WSL {
    if ($SkipWSL) {
        Write-Log "`n>>> Skipping WSL installation (--SkipWSL)" "INFO"
        return $true
    }

    Write-Log "`n>>> Checking WSL..." "INFO"

    try {
        $wslOutput = wsl --version 2>&1 | Out-String
        if ($wslOutput -match "WSL version") {
            Write-Log "WSL is already installed" "SUCCESS"
            return $true
        }
    } catch {
        # WSL not installed
    }

    Write-Log "Installing WSL 2 (this may take several minutes)..."
    Write-Log "Note: A system restart may be required after installation" "WARNING"

    try {
        # Enable required Windows features
        dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
        dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

        # Install WSL
        wsl --install --no-launch

        Write-Log "WSL 2 installation initiated - RESTART REQUIRED to complete" "SUCCESS"
        return $true
    } catch {
        Write-Log "WSL installation failed: $_" "ERROR"
        Write-Log "You can install WSL manually: wsl --install" "INFO"
        return $false
    }
}

function Install-Docker {
    if ($SkipDocker) {
        Write-Log "`n>>> Skipping Docker installation (--SkipDocker)" "INFO"
        return $true
    }

    Write-Log "`n>>> Checking Docker..." "INFO"

    $dockerVersion = Get-InstalledVersion "docker"
    if ($dockerVersion) {
        Write-Log "Docker $dockerVersion already installed" "SUCCESS"
        return $true
    }

    Write-Log "Installing Docker Desktop..."
    Write-Log "Note: Docker Desktop requires WSL 2 to be installed first" "INFO"

    $installer = "$script:DownloadDir\DockerDesktopInstaller.exe"

    if (-not (Invoke-Download $DockerDownloadUrl $installer)) {
        return $false
    }

    Write-Log "Running Docker Desktop installer..."
    Start-Process -FilePath $installer -ArgumentList "install", "--quiet", "--accept-license" -Wait -NoNewWindow

    Write-Log "Docker Desktop installed - launch from Start Menu to complete setup" "SUCCESS"
    return $true
}

function Install-ClaudeCode {
    if ($SkipClaudeCode) {
        Write-Log "`n>>> Skipping Claude Code installation (--SkipClaudeCode)" "INFO"
        return $true
    }

    Write-Log "`n>>> Installing Claude Code CLI..." "INFO"

    # Check if already installed
    try {
        $claudeOutput = claude --version 2>&1 | Out-String
        if ($claudeOutput -match '\d+\.\d+') {
            Write-Log "Claude Code is already installed" "SUCCESS"
            return $true
        }
    } catch {
        # Not installed
    }

    Write-Log "Downloading and installing Claude Code..."

    try {
        # Use PowerShell installer
        Invoke-Expression (Invoke-WebRequest -Uri "https://claude.ai/install.ps1" -UseBasicParsing).Content
        Write-Log "Claude Code installed successfully!" "SUCCESS"
        return $true
    } catch {
        Write-Log "Claude Code installation failed: $_" "ERROR"
        Write-Log "Try manually: irm https://claude.ai/install.ps1 | iex" "INFO"
        return $false
    }
}

# ============================================================================
# Main Execution
# ============================================================================

function Main {
    # Setup
    if (-not (Test-Path $script:DownloadDir)) {
        New-Item -ItemType Directory -Path $script:DownloadDir -Force | Out-Null
    }

    Write-Banner
    Write-Log "Starting Claude Code prerequisites installation..."
    Write-Log "Log file: $script:LogFile"
    Write-Log ""

    # Check admin
    if (-not (Test-AdminPrivileges)) {
        Write-Log "This script requires Administrator privileges." "ERROR"
        Write-Log "Please run PowerShell as Administrator and try again." "ERROR"
        exit 1
    }

    # Track results
    $results = @{}

    # Install components
    $results["Git"] = Install-Git
    $results["Node.js"] = Install-NodeJS
    $results["Python"] = Install-Python
    $results["WSL"] = Install-WSL
    $results["Docker"] = Install-Docker
    $results["Claude Code"] = Install-ClaudeCode

    # Summary
    Write-Log "`n" "INFO"
    Write-Log "═══════════════════════════════════════════════════════════════" "INFO"
    Write-Log "                    INSTALLATION SUMMARY" "INFO"
    Write-Log "═══════════════════════════════════════════════════════════════" "INFO"

    foreach ($component in $results.Keys) {
        $status = if ($results[$component]) { "OK" } else { "FAILED" }
        $color = if ($results[$component]) { "SUCCESS" } else { "ERROR" }
        Write-Log "  $component : $status" $color
    }

    Write-Log "═══════════════════════════════════════════════════════════════" "INFO"
    Write-Log ""

    # Post-install instructions
    $needsRestart = $false
    if (-not $SkipWSL) {
        Write-Log ">>> IMPORTANT: If WSL was installed, you must RESTART your computer." "WARNING"
        $needsRestart = $true
    }

    Write-Log ""
    Write-Log ">>> NEXT STEPS:" "INFO"
    Write-Log "   1. Close and reopen your terminal (or restart if prompted)" "INFO"
    Write-Log "   2. Navigate to your project folder: cd C:\\path\\to\\project" "INFO"
    Write-Log "   3. Start Claude Code: claude" "INFO"
    Write-Log "   4. Authenticate with your Claude Pro/Max account" "INFO"
    Write-Log ""
    Write-Log ">>> VERIFICATION COMMANDS:" "INFO"
    Write-Log "   git --version      # Should show 2.x.x" "INFO"
    Write-Log "   node --version     # Should show 22.x.x" "INFO"
    Write-Log "   python --version   # Should show 3.x.x" "INFO"
    Write-Log "   claude --version   # Should show version number" "INFO"
    Write-Log "   claude doctor      # Full health check" "INFO"
    Write-Log ""
    Write-Log ">>> SUPPORT:" "INFO"
    Write-Log "   Email: support@support-forge.com" "INFO"
    Write-Log "   Docs:  https://support-forge.com/docs/claude-setup" "INFO"
    Write-Log ""
    Write-Log "Installation log saved to: $script:LogFile" "INFO"

    # Cleanup downloads
    if (Test-Path $script:DownloadDir) {
        Remove-Item -Path $script:DownloadDir -Recurse -Force -ErrorAction SilentlyContinue
    }

    # Prompt for restart if needed
    if ($needsRestart -and -not $Silent) {
        Write-Log ""
        $restart = Read-Host "Restart now to complete installation? (y/n)"
        if ($restart -eq "y") {
            Restart-Computer -Force
        }
    }
}

# Run main
Main
