# Claude Code Quick Start Usage Guide

**Support Forge Client Resource**
*Essential Commands and Workflows for Daily Use*

---

## Starting Claude Code

### Basic Start
```bash
cd /path/to/your/project
claude
```

### Start with a Task
```bash
claude "describe what you want to do"
```

### Examples
```bash
claude "fix the login bug in auth.js"
claude "add a dark mode toggle to the settings page"
claude "write unit tests for the UserService class"
claude "explain how the payment processing works"
```

---

## Essential Slash Commands

Use these inside a Claude Code session:

| Command | Description |
|---------|-------------|
| `/help` | Show all available commands |
| `/clear` | Clear conversation history |
| `/compact` | Summarize conversation to save context |
| `/exit` | Exit Claude Code |
| `/config` | Open configuration menu |
| `/doctor` | Run health diagnostics |
| `/memory` | Manage project memory/context |

---

## File Operations

### Reading Files
Claude reads files automatically when needed. You can also specify:
```
> read the package.json file
> show me src/components/Header.tsx
> what's in the .env.example file?
```

### Editing Files
```
> add error handling to the login function
> update the API endpoint from v1 to v2
> fix the typo in line 45 of server.js
```

### Creating Files
```
> create a new component called UserProfile
> add a README.md with setup instructions
> generate a Dockerfile for this project
```

---

## Common Workflows

### Bug Fixing
```
> I'm getting error "Cannot read property 'map' of undefined" in ProductList.tsx
```
Claude will:
1. Analyze the error
2. Find the relevant code
3. Identify the root cause
4. Propose and apply a fix

### Code Review
```
> review the changes in my last 3 commits
> check this file for security issues
> suggest improvements for the database queries
```

### Learning/Explaining
```
> explain how the authentication middleware works
> what does this regex do: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
> walk me through the order checkout flow
```

### Refactoring
```
> convert this class component to a functional component
> extract the validation logic into a separate utility
> rename all instances of 'userId' to 'customerId'
```

---

## Git Integration

Claude can help with Git operations:

```
> commit my changes with a good message
> what files have I changed?
> create a new branch called feature/user-dashboard
> show me the diff for the last commit
```

---

## Project Memory

Claude remembers context about your project between sessions.

### Adding Memory
```
> remember that we use Tailwind CSS for styling
> remember the database is PostgreSQL on port 5433
> remember to always run tests before commits
```

### Viewing Memory
```
> /memory
```

### Clearing Memory
```
> /memory clear
```

---

## Configuration

### View Current Settings
```bash
claude config list
```

### Common Settings
```bash
# Set default editor
claude config set editor code     # VS Code
claude config set editor cursor   # Cursor
claude config set editor vim      # Vim

# Enable/disable features
claude config set git.autoCommit true
claude config set git.showDiff true
```

---

## Tips for Best Results

### Be Specific
```
# Good
> add form validation to the signup form that checks email format and password length of at least 8 characters

# Less effective
> add validation
```

### Provide Context
```
# Good
> in the React component at src/pages/Dashboard.tsx, add a loading spinner while data is being fetched from the /api/stats endpoint

# Less effective
> add a loading spinner
```

### Iterate
```
> add a search bar to the header
> make the search bar use debouncing with 300ms delay
> add keyboard shortcuts - Enter to search, Escape to clear
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + C` | Cancel current operation |
| `Ctrl + D` | Exit Claude Code |
| `↑` / `↓` | Navigate command history |
| `Tab` | Autocomplete |

---

## Cost Management

Claude Code uses your subscription quota. To optimize:

1. **Be concise** - Shorter prompts use less context
2. **Use `/compact`** - Summarize long conversations
3. **Focus sessions** - Exit and restart for new topics
4. **Check usage** - Visit claude.ai/settings/usage

---

## Getting Help

### In-Session Help
```
> /help
> how do I...
> explain this feature...
```

### External Resources
- Claude Code Docs: https://docs.anthropic.com/claude-code
- Support Forge: support@support-forge.com
- Book a call: https://calendly.com/support-forge

---

*Support Forge - AI Strategy That Moves the Needle*
