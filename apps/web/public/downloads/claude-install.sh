#!/bin/bash
#
# Claude Code Installer for macOS
# Support Forge - support@support-forge.com
# https://support-forge.com/client-setup/
#
# Usage: curl -fsSL https://support-forge.com/downloads/claude-install.sh | bash
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Print banner
echo ""
echo -e "${PURPLE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║                                                           ║${NC}"
echo -e "${PURPLE}║       ${NC}Claude Code Installer for macOS${PURPLE}                   ║${NC}"
echo -e "${PURPLE}║       ${NC}Provided by Support Forge${PURPLE}                         ║${NC}"
echo -e "${PURPLE}║                                                           ║${NC}"
echo -e "${PURPLE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Helper functions
print_step() {
    echo -e "${PURPLE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if running on macOS
if [[ "$(uname)" != "Darwin" ]]; then
    print_error "This installer is for macOS only."
    print_warning "For Windows, use: curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd"
    exit 1
fi

print_step "Checking system requirements..."

# Check macOS version
macos_version=$(sw_vers -productVersion)
macos_major=$(echo "$macos_version" | cut -d. -f1)
if [[ "$macos_major" -lt 12 ]]; then
    print_warning "macOS 12 (Monterey) or later recommended. You have: $macos_version"
else
    print_success "macOS version: $macos_version"
fi

# Check for Xcode Command Line Tools
if ! xcode-select -p &> /dev/null; then
    print_step "Installing Xcode Command Line Tools..."
    xcode-select --install
    echo ""
    print_warning "Please complete the Xcode Command Line Tools installation popup,"
    print_warning "then run this script again."
    exit 1
else
    print_success "Xcode Command Line Tools installed"
fi

# Check for Homebrew
print_step "Checking for Homebrew..."
if ! command -v brew &> /dev/null; then
    print_step "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == "arm64" ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    print_success "Homebrew installed"
else
    print_success "Homebrew already installed: $(brew --version | head -1)"
fi

# Check for Node.js
print_step "Checking for Node.js..."
if ! command -v node &> /dev/null; then
    print_step "Installing Node.js LTS via Homebrew..."
    brew install node@22
    brew link node@22
    print_success "Node.js installed"
else
    node_version=$(node --version)
    node_major=$(echo "$node_version" | cut -d. -f1 | tr -d 'v')
    if [[ "$node_major" -lt 18 ]]; then
        print_warning "Node.js $node_version detected. Version 18+ recommended."
        print_step "Upgrading Node.js..."
        brew upgrade node || brew install node@22
    else
        print_success "Node.js already installed: $node_version"
    fi
fi

# Check for npm
if command -v npm &> /dev/null; then
    print_success "npm already installed: $(npm --version)"
else
    print_error "npm not found. Please reinstall Node.js."
    exit 1
fi

# Check for Git
print_step "Checking for Git..."
if ! command -v git &> /dev/null; then
    print_step "Installing Git via Homebrew..."
    brew install git
    print_success "Git installed"
else
    print_success "Git already installed: $(git --version)"
fi

# Install Claude Code CLI
print_step "Installing Claude Code CLI..."
echo ""

# Use the official Anthropic installer
if curl -fsSL https://claude.ai/install.sh | sh; then
    print_success "Claude Code CLI installed successfully!"
else
    print_error "Failed to install Claude Code CLI"
    print_warning "Try manual installation: npm install -g @anthropic-ai/claude-code"
    exit 1
fi

# Verify installation
echo ""
print_step "Verifying installation..."

# Refresh PATH
export PATH="$HOME/.claude/bin:$PATH"

if command -v claude &> /dev/null; then
    claude_version=$(claude --version 2>/dev/null || echo "unknown")
    print_success "Claude Code installed: $claude_version"
else
    print_warning "Claude command not found in PATH"
    print_warning "Try opening a new terminal window, or run:"
    echo "    export PATH=\"\$HOME/.claude/bin:\$PATH\""
fi

# Print summary
echo ""
echo -e "${PURPLE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║${NC}                  ${GREEN}Installation Complete!${NC}                   ${PURPLE}║${NC}"
echo -e "${PURPLE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo ""
echo "  1. Open a new terminal window (to refresh PATH)"
echo ""
echo "  2. Navigate to your project:"
echo -e "     ${YELLOW}cd /path/to/your/project${NC}"
echo ""
echo "  3. Start Claude Code:"
echo -e "     ${YELLOW}claude${NC}"
echo ""
echo "  4. Sign in with your Claude Pro/Max account when prompted"
echo ""
echo -e "${PURPLE}Helpful commands:${NC}"
echo "  claude --version    Check installed version"
echo "  claude doctor       Run health check"
echo "  claude update       Update to latest version"
echo "  claude --help       Show all options"
echo ""
echo -e "${PURPLE}Need help?${NC}"
echo "  Email: support@support-forge.com"
echo "  Guide: https://support-forge.com/client-setup/"
echo ""
