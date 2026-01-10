const chalk = require('chalk');

// MCP Server definitions
const mcpServers = {
  // Anthropic Official MCP Servers
  memory: {
    id: 'memory',
    name: 'Memory',
    description: 'Persistent memory using knowledge graph for long-term context',
    category: 'anthropic',
    requiresAuth: false,
    installCommand: 'npx -y @modelcontextprotocol/server-memory',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-memory']
    }
  },
  fetch: {
    id: 'fetch',
    name: 'Fetch',
    description: 'Web content fetching and conversion for efficient LLM usage',
    category: 'anthropic',
    requiresAuth: false,
    installCommand: 'npx -y @modelcontextprotocol/server-fetch',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-fetch']
    }
  },
  sequentialThinking: {
    id: 'sequential-thinking',
    name: 'Sequential Thinking',
    description: 'Dynamic problem-solving through thought sequences',
    category: 'anthropic',
    requiresAuth: false,
    installCommand: 'npx -y @modelcontextprotocol/server-sequential-thinking',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-sequential-thinking']
    }
  },
  braveSearch: {
    id: 'brave-search',
    name: 'Brave Search',
    description: 'Web and local search using Brave Search API',
    category: 'anthropic',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['BRAVE_API_KEY'],
    preInstallNote: 'Get your API key at https://brave.com/search/api/',
    installCommand: 'npx -y @modelcontextprotocol/server-brave-search',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-brave-search'],
      env: {
        BRAVE_API_KEY: ''
      }
    }
  },
  puppeteerMcp: {
    id: 'puppeteer-mcp',
    name: 'Puppeteer',
    description: 'Browser automation for web scraping and interaction',
    category: 'anthropic',
    requiresAuth: false,
    installCommand: 'npx -y @modelcontextprotocol/server-puppeteer',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-puppeteer']
    }
  },
  time: {
    id: 'time',
    name: 'Time',
    description: 'Time and timezone conversion capabilities',
    category: 'anthropic',
    requiresAuth: false,
    installCommand: 'npx -y @modelcontextprotocol/server-time',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-time']
    }
  },
  gitMcp: {
    id: 'git-mcp',
    name: 'Git',
    description: 'Git repository operations (read, search, analyze)',
    category: 'anthropic',
    requiresAuth: false,
    installCommand: 'npx -y @modelcontextprotocol/server-git',
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-git']
    }
  },

  // Cloud & DevOps
  aws: {
    id: 'aws',
    name: 'AWS API',
    description: 'Interact with AWS services (S3, Lambda, EC2, etc.)',
    category: 'cloud',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'],
    installCommand: 'npx -y @anthropic-ai/mcp-server-aws',
    preInstallNote: 'Sign up for AWS free tier at https://aws.amazon.com/free/',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-aws'],
      env: {
        AWS_ACCESS_KEY_ID: '${AWS_ACCESS_KEY_ID}',
        AWS_SECRET_ACCESS_KEY: '${AWS_SECRET_ACCESS_KEY}',
        AWS_REGION: '${AWS_REGION}'
      }
    }
  },
  kubernetes: {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Manage Kubernetes clusters and deployments',
    category: 'cloud',
    requiresAuth: true,
    authType: 'kubeconfig',
    authFields: ['KUBECONFIG_PATH'],
    installCommand: 'npx -y kubernetes-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'kubernetes-mcp-server']
    }
  },

  // Business & CRM
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM, contacts, deals, marketing automation',
    category: 'business',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['HUBSPOT_ACCESS_TOKEN'],
    preInstallNote: 'Get your HubSpot API key at https://app.hubspot.com/api-key',
    installCommand: 'npx -y hubspot-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'hubspot-mcp-server'],
      env: {
        HUBSPOT_ACCESS_TOKEN: '${HUBSPOT_ACCESS_TOKEN}'
      }
    }
  },
  salesforce: {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'CRM, leads, opportunities, accounts, and reports',
    category: 'business',
    requiresAuth: true,
    authType: 'oauth',
    authFields: ['SALESFORCE_INSTANCE_URL', 'SALESFORCE_ACCESS_TOKEN'],
    preInstallNote: 'Get credentials at https://developer.salesforce.com/',
    installCommand: 'npx -y salesforce-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'salesforce-mcp-server'],
      env: {
        SALESFORCE_INSTANCE_URL: '${SALESFORCE_INSTANCE_URL}',
        SALESFORCE_ACCESS_TOKEN: '${SALESFORCE_ACCESS_TOKEN}'
      }
    }
  },
  googleAdmin: {
    id: 'google-admin',
    name: 'Google Workspace Admin',
    description: 'Manage users, groups, devices in Google Workspace',
    category: 'business',
    requiresAuth: true,
    authType: 'oauth',
    authFields: ['GOOGLE_ADMIN_CLIENT_ID', 'GOOGLE_ADMIN_CLIENT_SECRET', 'GOOGLE_ADMIN_REFRESH_TOKEN'],
    preInstallNote: 'Set up OAuth at https://console.cloud.google.com/',
    installCommand: 'npx -y google-admin-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'google-admin-mcp-server'],
      env: {
        GOOGLE_ADMIN_CLIENT_ID: '${GOOGLE_ADMIN_CLIENT_ID}',
        GOOGLE_ADMIN_CLIENT_SECRET: '${GOOGLE_ADMIN_CLIENT_SECRET}',
        GOOGLE_ADMIN_REFRESH_TOKEN: '${GOOGLE_ADMIN_REFRESH_TOKEN}'
      }
    }
  },
  quickbooks: {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Accounting, invoices, expenses, and financial reports',
    category: 'business',
    requiresAuth: true,
    authType: 'oauth',
    authFields: ['QUICKBOOKS_CLIENT_ID', 'QUICKBOOKS_CLIENT_SECRET', 'QUICKBOOKS_REALM_ID'],
    preInstallNote: 'Get API access at https://developer.intuit.com/',
    installCommand: 'npx -y quickbooks-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'quickbooks-mcp-server'],
      env: {
        QUICKBOOKS_CLIENT_ID: '${QUICKBOOKS_CLIENT_ID}',
        QUICKBOOKS_CLIENT_SECRET: '${QUICKBOOKS_CLIENT_SECRET}',
        QUICKBOOKS_REALM_ID: '${QUICKBOOKS_REALM_ID}'
      }
    }
  },
  slack: {
    id: 'slack',
    name: 'Slack',
    description: 'Send messages, manage channels, read conversations',
    category: 'business',
    requiresAuth: true,
    authType: 'token',
    authFields: ['SLACK_BOT_TOKEN'],
    preInstallNote: 'Create a Slack app at https://api.slack.com/apps',
    installCommand: 'npx -y @anthropic-ai/mcp-server-slack',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-slack'],
      env: {
        SLACK_BOT_TOKEN: '${SLACK_BOT_TOKEN}'
      }
    }
  },

  // Design & Creative
  figma: {
    id: 'figma',
    name: 'Figma',
    description: 'Access Figma designs, export assets, read design tokens',
    category: 'creative',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['FIGMA_ACCESS_TOKEN'],
    installCommand: 'npx -y @anthropic-ai/mcp-server-figma',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-figma'],
      env: {
        FIGMA_ACCESS_TOKEN: '${FIGMA_ACCESS_TOKEN}'
      }
    }
  },
  canva: {
    id: 'canva',
    name: 'Canva',
    description: 'Create designs, access templates, export graphics',
    category: 'creative',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['CANVA_API_KEY'],
    preInstallNote: 'Get API access at https://www.canva.com/developers/',
    installCommand: 'npx -y canva-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'canva-mcp-server'],
      env: {
        CANVA_API_KEY: '${CANVA_API_KEY}'
      }
    }
  },
  adobeCreative: {
    id: 'adobe-creative',
    name: 'Adobe Creative Cloud',
    description: 'Photoshop, Illustrator actions and asset management',
    category: 'creative',
    requiresAuth: true,
    authType: 'oauth',
    authFields: ['ADOBE_CLIENT_ID', 'ADOBE_CLIENT_SECRET'],
    preInstallNote: 'Get API access at https://developer.adobe.com/',
    installCommand: 'npx -y adobe-creative-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'adobe-creative-mcp-server'],
      env: {
        ADOBE_CLIENT_ID: '${ADOBE_CLIENT_ID}',
        ADOBE_CLIENT_SECRET: '${ADOBE_CLIENT_SECRET}'
      }
    }
  },

  // AI Services
  openai: {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT models, DALL-E, Whisper, embeddings',
    category: 'ai',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['OPENAI_API_KEY'],
    preInstallNote: 'Get your API key at https://platform.openai.com/api-keys',
    installCommand: 'npx -y openai-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'openai-mcp-server'],
      env: {
        OPENAI_API_KEY: '${OPENAI_API_KEY}'
      }
    }
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Gemini Pro, Vision, embeddings, and multimodal',
    category: 'ai',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['GOOGLE_AI_API_KEY'],
    preInstallNote: 'Get your API key at https://ai.google.dev/',
    installCommand: 'npx -y gemini-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'gemini-mcp-server'],
      env: {
        GOOGLE_AI_API_KEY: '${GOOGLE_AI_API_KEY}'
      }
    }
  },
  vertexAi: {
    id: 'vertex-ai',
    name: 'Google Vertex AI',
    description: 'Enterprise AI platform, custom models, MLOps',
    category: 'ai',
    requiresAuth: true,
    authType: 'service-account',
    authFields: ['GOOGLE_PROJECT_ID', 'GOOGLE_APPLICATION_CREDENTIALS'],
    preInstallNote: 'Set up at https://console.cloud.google.com/vertex-ai',
    installCommand: 'npx -y vertex-ai-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'vertex-ai-mcp-server'],
      env: {
        GOOGLE_PROJECT_ID: '${GOOGLE_PROJECT_ID}',
        GOOGLE_APPLICATION_CREDENTIALS: '${GOOGLE_APPLICATION_CREDENTIALS}'
      }
    }
  },
  huggingface: {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Access thousands of ML models and datasets',
    category: 'ai',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['HUGGINGFACE_TOKEN'],
    preInstallNote: 'Get your token at https://huggingface.co/settings/tokens',
    installCommand: 'npx -y huggingface-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'huggingface-mcp-server'],
      env: {
        HUGGINGFACE_TOKEN: '${HUGGINGFACE_TOKEN}'
      }
    }
  },
  replicate: {
    id: 'replicate',
    name: 'Replicate',
    description: 'Run open-source ML models in the cloud',
    category: 'ai',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['REPLICATE_API_TOKEN'],
    preInstallNote: 'Get your token at https://replicate.com/account/api-tokens',
    installCommand: 'npx -y replicate-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'replicate-mcp-server'],
      env: {
        REPLICATE_API_TOKEN: '${REPLICATE_API_TOKEN}'
      }
    }
  },

  // Analytics
  tableau: {
    id: 'tableau',
    name: 'Tableau',
    description: 'Query Tableau dashboards and data sources',
    category: 'analytics',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['TABLEAU_SERVER', 'TABLEAU_TOKEN_NAME', 'TABLEAU_TOKEN_VALUE'],
    installCommand: 'npx -y tableau-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'tableau-mcp-server'],
      env: {
        TABLEAU_SERVER: '${TABLEAU_SERVER}',
        TABLEAU_TOKEN_NAME: '${TABLEAU_TOKEN_NAME}',
        TABLEAU_TOKEN_VALUE: '${TABLEAU_TOKEN_VALUE}'
      }
    }
  },
  fathom: {
    id: 'fathom',
    name: 'Fathom Analytics',
    description: 'Privacy-focused website analytics',
    category: 'analytics',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['FATHOM_API_KEY'],
    installCommand: 'npx -y fathom-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'fathom-mcp-server'],
      env: {
        FATHOM_API_KEY: '${FATHOM_API_KEY}'
      }
    }
  },
  googleAnalytics: {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'GA4 reporting, real-time data, audience insights',
    category: 'analytics',
    requiresAuth: true,
    authType: 'oauth',
    authFields: ['GA_PROPERTY_ID', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    preInstallNote: 'Set up at https://console.cloud.google.com/',
    installCommand: 'npx -y google-analytics-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'google-analytics-mcp-server'],
      env: {
        GA_PROPERTY_ID: '${GA_PROPERTY_ID}',
        GOOGLE_CLIENT_ID: '${GOOGLE_CLIENT_ID}',
        GOOGLE_CLIENT_SECRET: '${GOOGLE_CLIENT_SECRET}'
      }
    }
  },

  // Productivity
  calendly: {
    id: 'calendly',
    name: 'Calendly',
    description: 'Manage scheduling and calendar events',
    category: 'productivity',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['CALENDLY_API_KEY'],
    installCommand: 'npx -y calendly-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'calendly-mcp-server'],
      env: {
        CALENDLY_API_KEY: '${CALENDLY_API_KEY}'
      }
    }
  },
  wordpress: {
    id: 'wordpress',
    name: 'WordPress',
    description: 'Manage WordPress sites, posts, and media',
    category: 'productivity',
    requiresAuth: true,
    authType: 'credentials',
    authFields: ['WORDPRESS_URL', 'WORDPRESS_USERNAME', 'WORDPRESS_APP_PASSWORD'],
    installCommand: 'npx -y wordpress-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'wordpress-mcp-server'],
      env: {
        WORDPRESS_URL: '${WORDPRESS_URL}',
        WORDPRESS_USERNAME: '${WORDPRESS_USERNAME}',
        WORDPRESS_APP_PASSWORD: '${WORDPRESS_APP_PASSWORD}'
      }
    }
  },
  notion: {
    id: 'notion',
    name: 'Notion',
    description: 'Read and write Notion pages, databases, and blocks',
    category: 'productivity',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['NOTION_API_KEY'],
    preInstallNote: 'Create integration at https://www.notion.so/my-integrations',
    installCommand: 'npx -y @anthropic-ai/mcp-server-notion',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-notion'],
      env: {
        NOTION_API_KEY: '${NOTION_API_KEY}'
      }
    }
  },
  airtable: {
    id: 'airtable',
    name: 'Airtable',
    description: 'Read and write Airtable bases, tables, and records',
    category: 'productivity',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['AIRTABLE_API_KEY'],
    preInstallNote: 'Get your API key at https://airtable.com/account',
    installCommand: 'npx -y airtable-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'airtable-mcp-server'],
      env: {
        AIRTABLE_API_KEY: '${AIRTABLE_API_KEY}'
      }
    }
  },

  // System Tools
  filesystem: {
    id: 'filesystem',
    name: 'Filesystem',
    description: 'Read/write files with configurable access paths',
    category: 'system',
    requiresAuth: false,
    authFields: ['ALLOWED_PATHS'],
    installCommand: 'npx -y @anthropic-ai/mcp-server-filesystem',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-filesystem', '${ALLOWED_PATHS}']
    }
  },
  desktopCommander: {
    id: 'desktop-commander',
    name: 'Desktop Commander',
    description: 'Execute system commands and scripts',
    category: 'system',
    requiresAuth: false,
    installCommand: 'npx -y desktop-commander-mcp',
    config: {
      command: 'npx',
      args: ['-y', 'desktop-commander-mcp']
    }
  },
  windowsMcp: {
    id: 'windows-mcp',
    name: 'Windows MCP',
    description: 'Windows-specific system operations',
    category: 'system',
    requiresAuth: false,
    platform: 'win32',
    installCommand: 'npx -y windows-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'windows-mcp-server']
    }
  },
  playwright: {
    id: 'playwright',
    name: 'Playwright',
    description: 'Browser automation and web scraping',
    category: 'system',
    requiresAuth: false,
    installCommand: 'npx -y @anthropic-ai/mcp-server-playwright',
    postInstall: 'npx playwright install chromium',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-playwright']
    }
  },
  docker: {
    id: 'docker',
    name: 'Docker',
    description: 'Manage Docker containers, images, and compose',
    category: 'system',
    requiresAuth: false,
    installCommand: 'npx -y docker-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'docker-mcp-server']
    }
  },

  // Zapier Integration
  zapier: {
    id: 'zapier',
    name: 'Zapier MCP',
    description: 'Connect to 6,000+ apps via Zapier (Google Sheets, Calendar, Drive, Gmail, etc.)',
    category: 'integration',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['ZAPIER_MCP_API_KEY'],
    installCommand: 'npx -y @anthropic-ai/mcp-server-zapier',
    preInstallNote: 'Get your Zapier MCP API key at https://actions.zapier.com/mcp/',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-zapier'],
      env: {
        ZAPIER_MCP_API_KEY: '${ZAPIER_MCP_API_KEY}'
      }
    }
  },

  // Development
  github: {
    id: 'github',
    name: 'GitHub',
    description: 'Manage repos, issues, PRs, and actions',
    category: 'development',
    requiresAuth: true,
    authType: 'token',
    authFields: ['GITHUB_TOKEN'],
    installCommand: 'npx -y @anthropic-ai/mcp-server-github',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-github'],
      env: {
        GITHUB_TOKEN: '${GITHUB_TOKEN}'
      }
    }
  },
  gitlab: {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Manage GitLab projects, merge requests, issues',
    category: 'development',
    requiresAuth: true,
    authType: 'token',
    authFields: ['GITLAB_TOKEN', 'GITLAB_URL'],
    preInstallNote: 'Create a personal access token in GitLab settings',
    installCommand: 'npx -y gitlab-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'gitlab-mcp-server'],
      env: {
        GITLAB_TOKEN: '${GITLAB_TOKEN}',
        GITLAB_URL: '${GITLAB_URL}'
      }
    }
  },
  linear: {
    id: 'linear',
    name: 'Linear',
    description: 'Issue tracking, projects, and team workflows',
    category: 'development',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['LINEAR_API_KEY'],
    preInstallNote: 'Get your API key at https://linear.app/settings/api',
    installCommand: 'npx -y linear-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'linear-mcp-server'],
      env: {
        LINEAR_API_KEY: '${LINEAR_API_KEY}'
      }
    }
  },
  jira: {
    id: 'jira',
    name: 'Jira',
    description: 'Manage Jira issues, projects, sprints, and boards',
    category: 'development',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['JIRA_URL', 'JIRA_EMAIL', 'JIRA_API_TOKEN'],
    preInstallNote: 'Create API token at https://id.atlassian.com/manage-profile/security/api-tokens',
    installCommand: 'npx -y jira-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'jira-mcp-server'],
      env: {
        JIRA_URL: '${JIRA_URL}',
        JIRA_EMAIL: '${JIRA_EMAIL}',
        JIRA_API_TOKEN: '${JIRA_API_TOKEN}'
      }
    }
  },
  supabase: {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database, auth, storage, and edge functions',
    category: 'development',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['SUPABASE_URL', 'SUPABASE_KEY'],
    preInstallNote: 'Get credentials at https://app.supabase.com/project/_/settings/api',
    installCommand: 'npx -y supabase-mcp-server',
    config: {
      command: 'npx',
      args: ['-y', 'supabase-mcp-server'],
      env: {
        SUPABASE_URL: '${SUPABASE_URL}',
        SUPABASE_KEY: '${SUPABASE_KEY}'
      }
    }
  },
  postgres: {
    id: 'postgres',
    name: 'PostgreSQL',
    description: 'Query and manage PostgreSQL databases',
    category: 'development',
    requiresAuth: true,
    authType: 'connection-string',
    authFields: ['POSTGRES_CONNECTION_STRING'],
    installCommand: 'npx -y @anthropic-ai/mcp-server-postgres',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-postgres', '${POSTGRES_CONNECTION_STRING}']
    }
  }
};

// Pre-configured bundles
const bundles = {
  anthropicEssentials: {
    id: 'anthropic-essentials',
    name: 'Anthropic Essentials',
    description: 'Official Anthropic MCP servers for Claude',
    modules: ['memory', 'fetch', 'sequential-thinking', 'brave-search', 'puppeteer-mcp', 'time', 'git-mcp', 'filesystem', 'github', 'slack', 'notion'],
    recommended: true
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Essential tools for getting started',
    modules: ['filesystem', 'github', 'playwright', 'memory', 'fetch']
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Full productivity stack for business users',
    modules: ['filesystem', 'github', 'zapier', 'wordpress', 'playwright', 'desktop-commander', 'notion', 'slack', 'memory', 'fetch', 'sequential-thinking']
  },
  devops: {
    id: 'devops',
    name: 'DevOps',
    description: 'Cloud and infrastructure management',
    modules: ['aws', 'kubernetes', 'github', 'gitlab', 'docker', 'filesystem', 'desktop-commander', 'postgres', 'git-mcp']
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing & Creative',
    description: 'Content, analytics, design, and social tools',
    modules: ['wordpress', 'figma', 'canva', 'fathom', 'google-analytics', 'zapier', 'filesystem', 'hubspot']
  },
  sales: {
    id: 'sales',
    name: 'Sales & CRM',
    description: 'CRM, scheduling, and business tools',
    modules: ['hubspot', 'salesforce', 'calendly', 'slack', 'zapier', 'google-admin', 'notion']
  },
  aiPowerUser: {
    id: 'ai-power-user',
    name: 'AI Power User',
    description: 'Multiple AI services for maximum flexibility',
    modules: ['openai', 'gemini', 'vertex-ai', 'huggingface', 'replicate', 'filesystem', 'github', 'memory', 'sequential-thinking']
  },
  agentBuilder: {
    id: 'agent-builder',
    name: 'Agent Builder',
    description: 'Tools for building and deploying AI agents',
    modules: ['github', 'filesystem', 'desktop-commander', 'docker', 'postgres', 'supabase', 'openai', 'playwright', 'memory', 'sequential-thinking', 'puppeteer-mcp']
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Everything - all available modules',
    modules: Object.keys(mcpServers)
  }
};

// Skills and plugins
const skills = {
  superclaude: {
    id: 'superclaude',
    name: 'SuperClaude Commands',
    description: 'Extended slash commands for project management, analysis, and more',
    category: 'productivity',
    installCommand: 'claude plugins install superclaude',
    commands: ['/sc:pm', '/sc:analyze', '/sc:implement', '/sc:research']
  },
  documentSkills: {
    id: 'document-skills',
    name: 'Document Skills',
    description: 'PDF, DOCX, XLSX, and presentation handling',
    category: 'productivity',
    installCommand: 'claude plugins install document-skills'
  },
  superpowers: {
    id: 'superpowers',
    name: 'Superpowers',
    description: 'TDD, debugging, code review, and planning workflows',
    category: 'development',
    installCommand: 'claude plugins install superpowers'
  },
  mcpBuilder: {
    id: 'mcp-builder',
    name: 'MCP Builder',
    description: 'Tools for creating custom MCP servers',
    category: 'development',
    installCommand: 'claude plugins install mcp-builder'
  },
  agentDesigner: {
    id: 'agent-designer',
    name: 'Agent Designer',
    description: 'Visual agent workflow design and testing',
    category: 'development',
    installCommand: 'claude plugins install agent-designer'
  },
  promptEngineer: {
    id: 'prompt-engineer',
    name: 'Prompt Engineer',
    description: 'Prompt optimization, testing, and versioning',
    category: 'development',
    installCommand: 'claude plugins install prompt-engineer'
  },
  codeReviewer: {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'Automated code review with best practices',
    category: 'development',
    installCommand: 'claude plugins install code-reviewer'
  },
  apiTester: {
    id: 'api-tester',
    name: 'API Tester',
    description: 'REST and GraphQL API testing and documentation',
    category: 'development',
    installCommand: 'claude plugins install api-tester'
  },
  dataAnalyst: {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Data visualization, statistics, and reporting',
    category: 'analytics',
    installCommand: 'claude plugins install data-analyst'
  },
  contentWriter: {
    id: 'content-writer',
    name: 'Content Writer',
    description: 'SEO-optimized content, blog posts, and copy',
    category: 'marketing',
    installCommand: 'claude plugins install content-writer'
  }
};

// List all modules
async function listModules() {
  console.log(chalk.bold.cyan('\n📦 Available Modules\n'));

  // MCP Servers by category
  const categories = {
    anthropic: 'Anthropic Official',
    cloud: 'Cloud & DevOps',
    business: 'Business & CRM',
    creative: 'Design & Creative',
    ai: 'AI Services',
    analytics: 'Analytics',
    productivity: 'Productivity',
    system: 'System Tools',
    integration: 'Integrations',
    development: 'Development'
  };

  for (const [catId, catName] of Object.entries(categories)) {
    const servers = Object.values(mcpServers).filter(s => s.category === catId);
    if (servers.length > 0) {
      console.log(chalk.yellow(`\n${catName}:`));
      for (const server of servers) {
        const auth = server.requiresAuth ? chalk.gray(' (requires auth)') : '';
        console.log(`  ${chalk.green(server.id.padEnd(20))} ${server.description}${auth}`);
      }
    }
  }

  // Bundles
  console.log(chalk.bold.cyan('\n\n🎁 Pre-configured Bundles\n'));
  for (const bundle of Object.values(bundles)) {
    const rec = bundle.recommended ? chalk.green(' ★ Recommended') : '';
    console.log(`  ${chalk.green(bundle.id.padEnd(15))} ${bundle.description}${rec}`);
    console.log(chalk.gray(`                    Includes: ${bundle.modules.join(', ')}`));
  }

  // Skills
  console.log(chalk.bold.cyan('\n\n🎯 Skills & Plugins\n'));
  for (const skill of Object.values(skills)) {
    console.log(`  ${chalk.green(skill.id.padEnd(20))} ${skill.description}`);
  }

  console.log('');
}

module.exports = {
  mcpServers,
  bundles,
  skills,
  listModules
};
