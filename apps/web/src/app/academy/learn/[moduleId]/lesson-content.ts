// Academy lesson content - separated for easier management
export const lessonContent: Record<string, { videoUrl?: string; content: string }> = {
  "0.1": {
    content: `
# Welcome to AI Launchpad

Welcome to the AI Launchpad Academy! This course will transform how you work with AI.

## What You'll Learn

In this course, you'll master:
- **Claude Code** - Your AI-powered coding assistant
- **MCP Servers** - Connect AI to your tools
- **Custom Skills** - Build specialized AI capabilities
- **Automation** - Create powerful workflows with n8n and Zapier
- **Cloud Deployment** - Deploy AI solutions professionally
- **Security** - Keep your AI implementations safe

## The LAUNCH Method

We use the LAUNCH method to guide your learning:
- **L**andscape - Assess your AI readiness
- **A**rchitect - Design your AI stack
- **U**nlock - Connect powerful integrations
- **N**etwork - Build your skill library
- **C**onfigure - Set up automation
- **H**arden - Secure and document

Let's get started!
    `,
  },
  "0.2": {
    content: `
# Your Learning Environment

Before diving into the content, let's set up your learning environment.

## What You'll Need

1. **A Computer** - Windows, Mac, or Linux
2. **VS Code** - Our recommended code editor
3. **Node.js** - JavaScript runtime (v18+)
4. **Git** - Version control
5. **A Terminal** - Command line access

## Recommended Setup

### VS Code Extensions
- Claude Code extension
- ESLint
- Prettier
- GitLens

### Browser Extensions
- Claude.ai sidebar (optional)
- JSON Viewer

## Course Materials

All downloadable resources are available in the Resources section of your dashboard.

Download the **Course Workbook** to track your progress and take notes.
    `,
  },
  "0.3": {
    content: `
# Prerequisites Check

Before we dive into the technical content, let's make sure you have everything ready.

## System Requirements

### Hardware
- **Computer**: Any modern laptop or desktop (2020 or newer recommended)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: At least 20GB free space for tools and projects
- **Internet**: Stable broadband connection

### Operating System
- **Windows 10/11** with WSL2 (recommended for Windows users)
- **macOS** 12 or later
- **Linux** Ubuntu 20.04+ or equivalent

## Required Accounts

You'll need accounts with these services (free tiers work fine):

1. **Anthropic** - For Claude API access
2. **GitHub** - For code hosting and version control
3. **Google Cloud** - For optional AI services
4. **AWS** - For deployment (optional)

## API Keys You'll Need

During this course, you'll obtain:
- Claude API key (from Anthropic Console)
- GitHub personal access token
- Google Cloud service account key
- Various MCP authentication tokens

## Security Checklist

Before handling API keys:
- [ ] I have a password manager
- [ ] I understand environment variables
- [ ] I know not to commit secrets to Git
- [ ] I have 2FA enabled on critical accounts

## Ready to Continue?

If you have all the above ready (or close to it), you're set for the next module!
    `,
  },
  "1.1": {
    content: `
# The AI Readiness Audit

Every successful AI implementation starts with understanding where you are today.

## The 5-Pillar Assessment

We evaluate AI readiness across five key dimensions:

### 1. Process Maturity
- Are your workflows documented?
- Do you have repeatable procedures?
- Where are the manual bottlenecks?

### 2. Data Infrastructure
- Where does your data live?
- How do systems communicate?
- What integrations already exist?

### 3. Team Capability
- Who will maintain AI tools?
- What's the technical skill level?
- Is there appetite for change?

### 4. Security Posture
- How are credentials managed?
- What compliance requirements exist?
- Are there data handling restrictions?

### 5. Budget & Timeline
- What's the investment capacity?
- Are there quick-win opportunities?
- What's the expected ROI timeline?

## Your Readiness Score

Rate each pillar from 1-5:
- **1**: Non-existent
- **2**: Ad-hoc / Inconsistent
- **3**: Defined but manual
- **4**: Automated in parts
- **5**: Fully optimized

**Total Score Interpretation:**
- **5-10**: Foundation building needed
- **11-17**: Ready for pilot projects
- **18-22**: Ready for department rollout
- **23-25**: Ready for enterprise scale

## Action Items

Based on your audit:
1. Identify your lowest-scoring pillar
2. Document 3 specific improvement opportunities
3. Note 2 quick wins that could show value immediately

Complete the AI Readiness Audit worksheet in your course materials before proceeding.
    `,
  },
  "1.2": {
    content: `
# Account Setup Marathon

Time to create and configure all the accounts you'll need for this course.

## Anthropic Account

1. Go to console.anthropic.com
2. Sign up with your email
3. Verify your email address
4. Navigate to **API Keys**
5. Create a new key named "ai-launchpad"
6. **Copy and save this key securely** - you won't see it again!

### Setting Up API Credits
- New accounts get free credits
- Add a payment method for continued access
- Set usage limits to avoid surprises

## GitHub Account

1. Go to github.com and sign up
2. Enable Two-Factor Authentication (2FA)
3. Create a Personal Access Token:
   - Settings > Developer settings > Personal access tokens
   - Generate new token (classic)
   - Select scopes: repo, workflow, read:org
   - Save the token securely

## Google Cloud Account

1. Go to console.cloud.google.com
2. Create a new project called "ai-launchpad"
3. Enable required APIs:
   - Cloud AI Platform
   - Cloud Functions
   - Cloud Storage
4. Create a service account:
   - IAM & Admin > Service Accounts
   - Create service account
   - Download JSON key file

## AWS Account (Optional)

1. Go to aws.amazon.com
2. Create an account (requires credit card)
3. Set up IAM user:
   - Create user with programmatic access
   - Attach AdministratorAccess (for learning)
   - Save Access Key ID and Secret

## Storing Your Credentials

Create a secure credentials file in your home directory.

**Important**: NEVER commit credential files to Git!

## Verification Checklist

- [ ] Anthropic API key works (test in console)
- [ ] GitHub token has correct permissions
- [ ] Google Cloud project is active
- [ ] Credentials are stored securely (not in plaintext!)
    `,
  },
  "1.3": {
    content: `
# Understanding the Launchpad Stack

Let's visualize the complete AI Launchpad architecture you'll be building.

## The Stack Overview

Your AI implementation has four main layers:

**Layer 4: Your Applications**
Websites, Apps, Internal Tools

**Layer 3: Automation Layer**
n8n, Zapier, Make

**Layer 2: Claude Code**
Your AI Development Interface
(Skills, MCP Servers, Plugins)

**Layer 1: External Services**
Google, GitHub, AWS, APIs, Databases

## Layer Breakdown

### Layer 1: External Services
The foundation - your existing tools and data:
- Google Workspace (Docs, Sheets, Calendar)
- GitHub (Code repositories)
- Databases (PostgreSQL, MongoDB)
- Third-party APIs

### Layer 2: Claude Code + Extensions
Your AI command center:
- **Claude Code**: The interface between you and AI
- **MCP Servers**: Bridges to external services
- **Skills**: Custom capabilities you create
- **Plugins**: Community-built enhancements

### Layer 3: Automation
Orchestration and workflows:
- **n8n**: Self-hosted workflow automation
- **Zapier**: Cloud-based integrations
- Scheduled tasks and triggers

### Layer 4: Applications
Where value is delivered:
- Client-facing websites
- Internal dashboards
- Automated reports
- AI-powered features

## Data Flow Example

**Scenario**: Client submits a support request

1. Form submission hits your website
2. Webhook triggers n8n workflow
3. n8n calls Claude via MCP
4. Claude analyzes the request
5. Response is drafted automatically
6. Notification sent to your team
7. Ticket created in your system

## Key Principles

1. **Modularity**: Each layer can be upgraded independently
2. **Security**: Credentials flow through secure channels only
3. **Scalability**: Add more MCP servers as needs grow
4. **Observability**: Log everything for debugging

## Your Architecture

By course end, you'll have:
- 5+ MCP servers connected
- 3+ custom skills deployed
- 2+ automation workflows running
- 1 capstone agent project

Let's start building!
    `,
  },

  "2.1": {
    content: `
# Installing Claude Code

Claude Code is your AI-powered development assistant. Let's get it set up.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- A terminal application
- Your Anthropic API key ready

## Installation Steps

### Step 1: Install Claude Code
npm install -g @anthropic-ai/claude-code

### Step 2: Verify Installation
claude --version

### Step 3: Configure API Key
Set your API key as an environment variable in your shell profile.

### Step 4: First Run
Launch Claude Code by typing: claude

## Configuration File
Claude Code creates settings at ~/.claude/

## Troubleshooting
- Command not found: Ensure Node.js bin is in PATH
- Invalid API key: Check at console.anthropic.com
    `,
  },
  "2.2": {
    content: `
# Your First Claude Code Session

Let's explore Claude Code's interface and run your first commands.

## Starting Claude Code
cd your-project
claude

## Basic Commands
- /help - See available commands
- /clear - Reset conversation
- /exit - End session

## Best Practices

### Be Specific
Bad: "Fix the bug"
Good: "Fix the null reference error in userService.js line 42"

### Provide Context
Bad: "Update the API"
Good: "Update the /users endpoint to include pagination"

### Break Down Complex Tasks
Do incremental changes instead of massive rewrites.
    `,
  },
  "2.3": {
    content: `
# Prompting for Business Tasks

Learn effective prompting for real business scenarios.

## The Prompt Framework
Context > Task > Constraints > Output Format

## Examples
- Code Review: Review for security vulnerabilities
- Documentation: Generate API docs in OpenAPI format
- Refactoring: Optimize queries while maintaining API contracts

## Prompt Patterns
- The Clarifier: Ask Claude to restate understanding
- The Expert: Ask Claude to act as a senior developer
- The Iterator: Request multiple approaches with pros/cons
    `,
  },
  "2.4": {
    content: `
# Configuring Claude Code Settings

Customize Claude Code to match your workflow.

## Settings File
Located at ~/.claude/settings.json

## Key Settings
- Model Selection: sonnet, opus, or haiku
- MCP Servers: Connect external services
- Plugins: Community enhancements
- Hooks: Custom scripts

## Project-Specific Settings
Create CLAUDE.md in your project root with project info, coding standards, and common commands.
    `,
  },
  "2.5": {
    content: `
# Advanced Claude Code Features

## Multi-File Operations
- Batch edits across files
- Project-wide search

## Using Agents
- Plan: Architecture and planning
- Explore: Codebase discovery
- Bash: System commands

## Git Integration
Stage files, write commits, create branches, open PRs.

## Skills and Plugins
Built-in: /commit, /pr, /deploy
Community plugins for enhanced features.

## What's Next?
In the next module, we connect external services with MCP servers.
    `,
  },

  "3.1": {
    content: `
# What Are MCP Servers?

Model Context Protocol (MCP) servers are bridges that connect Claude to external services.

## The Problem MCP Solves

Without MCP, Claude can only:
- Read files you paste in
- Generate text responses
- Suggest code changes

With MCP, Claude can:
- Access live data from APIs
- Read and write to external services
- Execute actions in connected systems

## How MCP Works

1. **You install an MCP server** (small program)
2. **Server connects to a service** (GitHub, Google, etc.)
3. **Claude communicates via the server**
4. **Actions are performed** with proper authentication

## MCP Architecture

Your Computer:
- Claude Code <-> MCP Server <-> External API

## Available MCP Servers

### Official Servers
- GitHub - Repository management
- Google Drive - File access
- Slack - Messaging
- PostgreSQL - Database queries

### Community Servers
- Notion - Note management
- Linear - Issue tracking
- Figma - Design access
- And many more!

## Security Model

- Each server has specific permissions
- API keys stored locally (never sent to Claude)
- You control what Claude can access
- All actions are auditable

## When to Use MCP

Good use cases:
- Automating repetitive tasks
- Connecting development workflows
- Building AI-powered features

Not ideal for:
- One-off simple queries
- Highly sensitive operations
- Tasks requiring human judgment
    `,
  },
  "3.2": {
    content: `
# Installing Your First MCP Server

Let's install the GitHub MCP server to connect Claude to your repositories.

## Prerequisites

- GitHub account with repositories
- Personal Access Token (from Module 1)
- Claude Code installed

## Installation Steps

### Step 1: Update Settings

Open ~/.claude/settings.json and add:

{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}

### Step 2: Restart Claude Code

Close and reopen Claude Code for changes to take effect.

### Step 3: Verify Connection

Ask Claude:
"List my GitHub repositories"

If successful, you'll see your repos listed.

## Common Installation Issues

### Server Not Starting
- Check JSON syntax in settings
- Verify npx is in your PATH
- Check for error messages on startup

### Authentication Failed
- Verify token has correct scopes
- Check token hasn't expired
- Regenerate token if needed

### Timeout Errors
- Check internet connection
- Verify GitHub API status
- Try increasing timeout in settings

## Testing the Connection

Try these commands:
1. "List my recent GitHub activity"
2. "Show open issues in [repo-name]"
3. "What branches exist in [repo-name]?"

## What You Can Do Now

With GitHub MCP, Claude can:
- List and search repositories
- Read file contents
- View issues and PRs
- Check workflow status
- And much more!
    `,
  },
  "3.3": {
    content: `
# Connecting Google Services

Connect Claude to Google Drive, Sheets, and Calendar for powerful automation.

## Available Google MCP Servers

- **Google Drive** - File management
- **Google Sheets** - Spreadsheet operations
- **Google Calendar** - Event management
- **Gmail** - Email (limited)

## Setting Up Google Drive MCP

### Step 1: Create OAuth Credentials

1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Download the credentials JSON

### Step 2: Configure MCP Server

Add to settings.json:

{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@anthropic/server-gdrive"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/path/to/credentials.json"
      }
    }
  }
}

### Step 3: Authorize Access

First run will open browser for authorization.
Grant access to the requested scopes.

## Google Sheets Integration

Perfect for:
- Reading data for analysis
- Updating spreadsheets automatically
- Creating reports

Example prompts:
- "Read the sales data from my Q1 spreadsheet"
- "Add a new row to the inventory sheet"
- "Create a summary of expenses"

## Google Calendar Integration

Useful for:
- Checking availability
- Creating events
- Managing schedules

Example prompts:
- "What meetings do I have tomorrow?"
- "Schedule a call with John for next Tuesday"
- "Find a free slot this week for a 1-hour meeting"

## Security Considerations

- Use service accounts for automation
- Limit scopes to what's needed
- Regularly audit access
- Revoke unused credentials
    `,
  },
  "3.4": {
    content: `
# Connecting GitHub

Deep dive into GitHub MCP capabilities for development workflows.

## Full GitHub Integration

Beyond basic repo listing, you can:
- Create and manage issues
- Work with pull requests
- Manage branches
- Access workflow runs
- Search code

## Advanced Configuration

{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxx",
        "GITHUB_DEFAULT_ORG": "your-org"
      }
    }
  }
}

## Issue Management

Example workflows:
- "Create an issue for the login bug we discussed"
- "List all issues assigned to me"
- "Close issue #42 with a comment"

## Pull Request Workflows

- "Show me open PRs in my repos"
- "Create a PR from feature-branch to main"
- "Add reviewers to PR #15"

## Code Search

- "Find all files using deprecated API"
- "Search for security vulnerabilities"
- "List all TODO comments"

## CI/CD Integration

- "Show recent workflow runs"
- "What failed in the last build?"
- "Re-run the test workflow"

## Best Practices

1. Use fine-grained tokens with minimal permissions
2. Set up separate tokens for different projects
3. Rotate tokens regularly
4. Monitor usage through GitHub settings
    `,
  },
  "3.5": {
    content: `
# Troubleshooting MCP Connections

Common issues and how to resolve them.

## Diagnostic Steps

### 1. Check Server Status

Look for startup messages when launching Claude Code.
Errors will appear in the console.

### 2. Verify Configuration

Common JSON issues:
- Missing commas
- Incorrect quotes
- Invalid paths

Use a JSON validator before saving settings.

### 3. Test Authentication

Try a simple operation first.
If auth fails, check credentials.

## Common Error Messages

### "Server not found"
- Verify the command path is correct
- Ensure npx/node is in PATH
- Try running the command manually

### "Authentication failed"
- Check API key/token
- Verify required scopes
- Check if token expired

### "Timeout"
- Network issues
- Server overloaded
- Increase timeout setting

### "Permission denied"
- Token missing required scopes
- Rate limited
- Resource access restricted

## Debugging Tools

### Enable Verbose Logging

{
  "mcpServers": {
    "github": {
      "env": {
        "DEBUG": "mcp:*"
      }
    }
  }
}

### Check Server Logs

Look in ~/.claude/logs/ for detailed logs.

## Getting Help

1. Check MCP server documentation
2. Search GitHub issues for the server
3. Join the Claude Code community
4. File a bug report with logs

## Maintenance

- Update servers regularly
- Monitor for deprecation notices
- Test after Claude Code updates
- Keep credentials secure and rotated
    `,
  },

  "4.1": {
    content: `
# Understanding Skills

Skills are custom capabilities you can add to Claude Code.

## What Are Skills?

Skills extend Claude's abilities with:
- Specialized knowledge
- Custom workflows
- Domain-specific tools
- Automated processes

## Types of Skills

### Built-in Skills
- /commit - Smart commit helper
- /pr - Pull request assistant
- /deploy - Deployment automation

### Plugin Skills
Installed via plugin marketplace:
- Document generation
- Code analysis
- Testing helpers

### Custom Skills
Skills you create yourself:
- Company-specific workflows
- Project templates
- Industry tools

## How Skills Work

1. Trigger: User invokes skill (/skillname)
2. Load: Skill instructions loaded
3. Execute: Claude follows skill workflow
4. Complete: Results returned

## Skill Anatomy

A skill contains:
- Name and description
- Trigger conditions
- Step-by-step instructions
- Required tools/permissions
    `,
  },
  "4.2": {
    content: `
# Installing the Superpowers Plugin

The Superpowers plugin adds powerful capabilities to Claude Code.

## What's Included

- Enhanced debugging workflows
- Test-driven development helpers
- Code review assistance
- Git workflow optimization

## Installation

### Step 1: Enable in Settings

{
  "enabledPlugins": {
    "superpowers@superpowers-marketplace": true
  }
}

### Step 2: Restart Claude Code

Close and reopen for changes to take effect.

### Step 3: Verify Installation

Type /help to see new skills available.

## Key Skills Added

### /superpowers:test-driven-development
Guides you through TDD workflow.

### /superpowers:systematic-debugging
Step-by-step debugging process.

### /superpowers:receiving-code-review
Handle code review feedback properly.

## Usage Tips

- Read skill descriptions before using
- Follow the workflow steps
- Don't skip verification steps
- Iterate based on results
    `,
  },
  "4.3": {
    content: `
# Installing Industry Skills

Add domain-specific capabilities for your industry.

## Available Industry Skills

### Document Skills
- PDF generation and manipulation
- Spreadsheet automation
- Presentation creation

### Development Skills
- API documentation
- Test generation
- Code analysis

### Business Skills
- Report generation
- Email drafting
- Meeting summaries

## Installation Process

1. Browse skill marketplace
2. Review skill capabilities
3. Enable in settings
4. Restart Claude Code

## Configuration

{
  "enabledPlugins": {
    "document-skills@anthropic-agent-skills": true
  }
}

## Using Industry Skills

Invoke with /skill-name or let Claude suggest when relevant.

Example:
/document-skills:pdf to work with PDFs
/document-skills:xlsx for spreadsheets
    `,
  },
  "4.4": {
    content: `
# Creating Your First Custom Skill

Build a skill tailored to your specific needs.

## Skill Structure

Create a SKILL.md file:

# Skill Name

## Description
What this skill does.

## Trigger
When to use this skill.

## Steps
1. First step
2. Second step
3. Third step

## Tools Required
- Tool 1
- Tool 2

## Example Usage

## When to Create Custom Skills

- Repetitive multi-step tasks
- Company-specific workflows
- Project templates
- Quality checklists

## Best Practices

1. Keep skills focused
2. Include clear steps
3. Document requirements
4. Test thoroughly

## Sharing Skills

- Store in your project repo
- Share with team via git
- Publish to marketplace (optional)
    `,
  },
  "5.1": {
    content: `
# Automation Strategy

Plan your automation approach before building.

## The Automation Pyramid

Level 1: Manual Tasks (eliminate these first)
Level 2: Triggered Automations (on events)
Level 3: Scheduled Automations (on time)
Level 4: Intelligent Automations (AI-powered)

## Identifying Automation Opportunities

Good candidates:
- Repetitive tasks
- Data transformations
- Notifications
- Report generation

Poor candidates:
- One-time tasks
- Tasks requiring judgment
- Highly variable processes

## ROI Calculation

Time saved per execution x Frequency - Setup time = ROI

## Choosing Tools

### n8n (Self-hosted)
- Full control
- No usage limits
- Requires hosting

### Zapier (Cloud)
- Easy setup
- Limited free tier
- Many integrations

### Make (Cloud)
- Visual builder
- Good pricing
- Complex workflows

## Starting Small

1. Pick one simple automation
2. Build and test thoroughly
3. Monitor for a week
4. Expand gradually
    `,
  },
  "5.2": {
    content: `
# n8n Installation & Setup

Set up your self-hosted automation engine.

## Installation Options

### Docker (Recommended)

docker run -d --name n8n -p 5678:5678 n8nio/n8n

### npm Global Install

npm install n8n -g
n8n start

## First Run

1. Open http://localhost:5678
2. Create admin account
3. Explore the interface

## Key Concepts

### Nodes
Individual steps in your workflow.

### Triggers
What starts the workflow:
- Webhooks
- Schedules
- Manual

### Connections
Data flow between nodes.

## Your First Workflow

1. Add a Schedule Trigger
2. Add an HTTP Request node
3. Add a notification node
4. Activate and test

## Connecting to Claude

Use HTTP Request node to call Claude API.
Or use the n8n MCP server for direct integration.
    `,
  },
  "5.3": {
    content: `
# Building n8n Workflows

Create powerful automations with n8n.

## Workflow Patterns

### Data Pipeline
Trigger > Fetch > Transform > Store

### Notification System
Trigger > Filter > Format > Send

### Integration Sync
Schedule > Fetch A > Compare > Update B

## Working with Data

### Expressions
Access data with: {{ $json.fieldName }}

### Transformations
Use the Set node to reshape data.

### Filtering
Use IF node for conditional logic.

## Error Handling

- Enable error workflow
- Add retry logic
- Log failures
- Send alerts

## Best Practices

1. Name nodes clearly
2. Add notes for complex logic
3. Test with sample data
4. Version control your workflows

## Advanced Features

- Sub-workflows
- Loops and batching
- Wait/delay nodes
- Custom code nodes
    `,
  },
  "5.4": {
    content: `
# Zapier Essentials

Quick cloud-based automation setup.

## Zapier Concepts

### Zaps
Complete automation workflows.

### Triggers
Events that start zaps.

### Actions
Steps that happen after trigger.

### Filters
Conditions for continuing.

## Common Zapier Integrations

- Google Workspace
- Slack
- Salesforce
- HubSpot
- Trello
- And 5000+ more

## Building Your First Zap

1. Choose trigger app
2. Select trigger event
3. Connect account
4. Add action app
5. Map fields
6. Test and enable

## Free Tier Limitations

- 100 tasks/month
- 5 zaps
- 15 min update time
- Single-step zaps only

## When to Use Zapier

- Quick setup needed
- Standard integrations
- No hosting available
- Team collaboration
    `,
  },
  "5.5": {
    content: `
# Connecting Automations to Claude

Integrate AI into your workflows.

## Methods of Integration

### 1. API Calls
Direct HTTP requests to Claude API.

### 2. MCP Servers
Use n8n or Zapier MCP servers.

### 3. Webhooks
Claude triggers external workflows.

## n8n + Claude

Add HTTP Request node:
- URL: https://api.anthropic.com/v1/messages
- Method: POST
- Headers: Authorization, Content-Type
- Body: Your prompt

## Zapier + Claude

Use Webhooks by Zapier:
- Custom request to Claude API
- Process response in subsequent steps

## Use Cases

### Content Generation
Trigger > Claude generates > Post to platform

### Data Analysis
Data arrives > Claude analyzes > Report generated

### Customer Response
Message received > Claude drafts > Human reviews

## Best Practices

1. Set appropriate timeouts
2. Handle API errors gracefully
3. Implement rate limiting
4. Log all AI interactions
    `,
  },
  "6.1": {
    content: `
# AWS Fundamentals for AI

Essential AWS knowledge for AI deployments.

## Key Services

### Compute
- EC2 - Virtual servers
- Lambda - Serverless functions
- ECS - Container orchestration

### Storage
- S3 - Object storage
- EBS - Block storage
- EFS - File storage

### Networking
- VPC - Virtual networks
- CloudFront - CDN
- Route 53 - DNS

## For AI Workloads

### Hosting Options
- EC2 for persistent servers
- Lambda for event-driven
- Amplify for web apps

### Data Storage
- S3 for training data
- RDS for structured data
- DynamoDB for fast access

## Cost Management

- Use free tier wisely
- Set billing alerts
- Review unused resources
- Use spot instances when possible

## Security Basics

- Use IAM roles, not root
- Enable MFA
- Encrypt at rest
- Use security groups
    `,
  },
  "6.2": {
    content: `
# Deploying with AWS Amplify

Host your AI-powered applications.

## What is Amplify?

Managed hosting platform for:
- Static sites
- Server-side rendered apps
- Full-stack applications

## Setup Steps

### 1. Connect Repository
Link your GitHub/GitLab/Bitbucket repo.

### 2. Configure Build
Amplify detects framework automatically.

### 3. Deploy
Push to branch triggers deployment.

## Build Settings

amplify.yml example:
version: 1
frontend:
  phases:
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'

## Environment Variables

- Add secrets in Amplify Console
- Reference in code as process.env
- Different values per environment

## Custom Domains

1. Add domain in Amplify
2. Update DNS records
3. SSL auto-configured

## Monitoring

- View build logs
- Check access logs
- Set up notifications
    `,
  },
  "6.3": {
    content: `
# Google Cloud for AI Workloads

Leverage Google's AI infrastructure.

## Key Services

### AI/ML
- Vertex AI - ML platform
- Cloud AI APIs - Pre-built models
- BigQuery ML - SQL-based ML

### Compute
- Cloud Run - Serverless containers
- GKE - Kubernetes
- Compute Engine - VMs

### Storage
- Cloud Storage - Objects
- Firestore - NoSQL
- Cloud SQL - Managed databases

## Getting Started

1. Create project
2. Enable billing
3. Enable APIs
4. Create service account

## Best Practices

- Use service accounts, not user keys
- Enable API only when needed
- Set up budget alerts
- Use regions close to users

## Integration with Claude

- Store data in Cloud Storage
- Process with Claude API
- Log to BigQuery
- Serve via Cloud Run
    `,
  },
  "6.4": {
    content: `
# Cost Management & Optimization

Keep cloud costs under control.

## Cost Monitoring

### AWS
- Cost Explorer
- Budgets and alerts
- Cost allocation tags

### Google Cloud
- Cost Management
- Budget alerts
- Billing reports

## Optimization Strategies

### Right-sizing
- Monitor actual usage
- Downsize over-provisioned
- Use auto-scaling

### Reserved Capacity
- Commit to 1-3 years
- Save 30-70%
- Good for steady workloads

### Spot/Preemptible
- 60-90% cheaper
- Can be interrupted
- Good for batch jobs

## AI-Specific Costs

### API Usage
- Track token consumption
- Cache responses
- Use cheaper models when possible

### Data Storage
- Clean old data
- Use appropriate tiers
- Compress when possible

## Monthly Review

1. Review cost breakdown
2. Identify top spenders
3. Find optimization opportunities
4. Implement changes
5. Monitor impact
    `,
  },
  "7.1": {
    content: `
# Credential Security

Protect your API keys and tokens.

## Security Principles

1. Never commit secrets to git
2. Rotate credentials regularly
3. Use least privilege
4. Audit access

## Storage Methods

### Environment Variables
Best for local development.
export API_KEY="secret"

### Secret Managers
AWS Secrets Manager
Google Secret Manager
HashiCorp Vault

### .env Files
For development only.
Add to .gitignore!

## Credential Rotation

Schedule regular rotation:
- API keys: Every 90 days
- Tokens: Per session or daily
- Passwords: Every 60-90 days

## Detection and Prevention

### Pre-commit Hooks
Scan for secrets before commit.

### CI/CD Scanning
Check in pipelines.

### Monitoring
Alert on leaked credentials.

## If Credentials Leak

1. Revoke immediately
2. Generate new credentials
3. Check for unauthorized access
4. Update all uses
5. Review how it happened
    `,
  },
  "7.2": {
    content: `
# Access Control & Auditing

Control who can do what.

## Access Control Models

### Role-Based (RBAC)
Assign permissions to roles.
Assign roles to users.

### Attribute-Based (ABAC)
Permissions based on attributes.
More flexible, more complex.

## Implementation

### For APIs
- API keys with scopes
- OAuth 2.0 tokens
- JWT with claims

### For Services
- IAM roles
- Service accounts
- Managed identities

## Auditing

### What to Log
- Who accessed
- What was accessed
- When
- Outcome

### Log Storage
- Centralized logging
- Tamper-proof storage
- Retention policies

### Review Process
- Regular log review
- Anomaly detection
- Alert on suspicious activity

## Best Practices

1. Principle of least privilege
2. Regular access reviews
3. Prompt deprovisioning
4. Multi-factor authentication
    `,
  },
  "7.3": {
    content: `
# Responsible AI Principles

Use AI ethically and effectively.

## Core Principles

### Transparency
- Be clear when AI is used
- Explain AI decisions
- Document limitations

### Accuracy
- Validate AI outputs
- Monitor for errors
- Have human oversight

### Privacy
- Minimize data collection
- Anonymize when possible
- Respect data rights

### Fairness
- Check for bias
- Test across demographics
- Monitor outcomes

## In Practice

### Human in the Loop
- AI suggests, human decides
- Critical decisions reviewed
- Escalation paths defined

### Output Validation
- Verify factual claims
- Check for hallucinations
- Test edge cases

### Feedback Loops
- Collect user feedback
- Monitor quality over time
- Iterate improvements

## Documentation

Document:
- AI use cases
- Training data sources
- Model limitations
- Monitoring approach
    `,
  },
  "7.4": {
    content: `
# Documentation & Handoff

Ensure others can maintain your AI implementation.

## What to Document

### Architecture
- System diagram
- Component overview
- Data flows

### Configuration
- Settings explained
- Environment variables
- Dependencies

### Operations
- Monitoring setup
- Alert responses
- Troubleshooting guide

### Maintenance
- Update procedures
- Backup/restore
- Security patches

## Documentation Standards

### Format
- Markdown for text
- Diagrams as code
- Screenshots sparingly

### Location
- README in repo
- Wiki for details
- Runbooks for ops

### Updates
- Review quarterly
- Update with changes
- Version documentation

## Handoff Checklist

- All credentials transferred
- Access provisioned
- Documentation reviewed
- Walkthrough completed
- Contact info shared
- Transition period defined
    `,
  },
  "8.1": {
    content: `
# Capstone Project Overview

Build a complete AI agent workflow.

## Project: Client Onboarding Agent

You'll create an automated system that:
1. Receives new client information
2. Creates necessary accounts
3. Sends welcome materials
4. Schedules kickoff meeting

## Components

### Trigger
Webhook or form submission.

### Data Processing
Claude analyzes and structures data.

### Actions
- Create CRM record
- Generate welcome email
- Schedule calendar event

### Notifications
Alert team of new client.

## Success Criteria

- End-to-end automation works
- Error handling implemented
- Documentation complete
- Monitoring in place

## Timeline

Lesson 8.2: Build the agent (40 min)
Lesson 8.3: Test and refine (10 min)
Lesson 8.4: Review and certification (5 min)
    `,
  },
  "8.2": {
    content: `
# Building the Client Onboarding Agent

Step-by-step implementation.

## Step 1: Set Up Trigger

Create a webhook endpoint.
Configure to receive client data.

## Step 2: Data Processing

Use Claude to:
- Validate input data
- Extract key information
- Format for downstream systems

## Step 3: Create CRM Record

Connect to your CRM (or simulate).
Create new contact/account.

## Step 4: Generate Welcome Email

Use Claude to:
- Personalize greeting
- Include relevant materials
- Set next steps

## Step 5: Schedule Meeting

Connect to calendar.
Find available slot.
Create event with details.

## Step 6: Notify Team

Send Slack/email notification.
Include client summary.

## Step 7: Error Handling

Handle:
- Invalid input
- API failures
- Duplicate clients

Log all outcomes.

## Step 8: Testing

Test with sample data.
Verify all steps complete.
Check error paths.
    `,
  },
  "8.3": {
    content: `
# Testing & Refinement

Ensure your agent works reliably.

## Test Cases

### Happy Path
Normal client submission.
All systems available.
Expected outcome.

### Edge Cases
- Missing fields
- Invalid email
- Duplicate submission
- Special characters

### Error Cases
- API timeout
- Auth failure
- System down

## Testing Process

1. Create test data
2. Run workflow
3. Verify outcomes
4. Check logs
5. Document results

## Refinement Areas

### Performance
- Optimize slow steps
- Add caching
- Parallel processing

### Reliability
- Add retries
- Improve error messages
- Better fallbacks

### User Experience
- Clearer notifications
- Better status updates
- Helpful error messages

## Monitoring Setup

- Set up logging
- Create dashboards
- Configure alerts
- Schedule reviews
    `,
  },
  "8.4": {
    content: `
# Certification & Next Steps

Congratulations on completing the AI Launchpad Academy!

## What You've Learned

### Module 0: Setup
Environment and prerequisites.

### Module 1: Foundations
AI readiness and account setup.

### Module 2: Claude Code
Installation and advanced features.

### Module 3: MCP Servers
Connecting external services.

### Module 4: Skills
Custom capabilities and plugins.

### Module 5: Automation
n8n and Zapier workflows.

### Module 6: Cloud
AWS and Google Cloud deployment.

### Module 7: Security
Credentials and responsible AI.

### Module 8: Capstone
End-to-end agent workflow.

## Next Steps

### Immediate
- Deploy your capstone project
- Share with your team
- Identify next automation

### Short Term
- Explore more MCP servers
- Create custom skills
- Build more workflows

### Long Term
- Contribute to community
- Mentor others
- Stay updated on AI advances

## Certification

Complete the final quiz to earn your AI Launchpad Certificate.

Welcome to the community of AI practitioners!
    `,
  },
};
