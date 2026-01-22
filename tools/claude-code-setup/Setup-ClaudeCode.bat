@echo off
:: ============================================================================
:: Support Forge - Claude Code Setup Launcher
:: ============================================================================
:: Double-click this file to install Claude Code and all prerequisites.
:: Automatically requests Administrator privileges.
:: ============================================================================

title Support Forge - Claude Code Setup

:: Check for admin privileges
net session >nul 2>&1
if %errorLevel% NEQ 0 (
    echo Requesting Administrator privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo.
echo  ==============================================================
echo   SUPPORT FORGE - Claude Code Setup
echo   AI Strategy That Moves the Needle
echo  ==============================================================
echo.

:: Set working directory to script location
cd /d "%~dp0"

:: Check if PowerShell script exists locally
if exist "Install-ClaudeCodePrereqs.ps1" (
    echo Running local installer...
    powershell -ExecutionPolicy Bypass -File "Install-ClaudeCodePrereqs.ps1"
) else (
    echo Downloading and running installer from Support Forge...
    powershell -ExecutionPolicy Bypass -Command "irm https://support-forge.com/claude-setup.ps1 | iex"
)

echo.
echo  ==============================================================
echo   Installation Complete!
echo  ==============================================================
echo.
echo  Press any key to exit...
pause > nul
