// MCP Server definitions for the Build Your Own configurator
export interface McpServer {
  id: string;
  name: string;
  description: string;
  category: string;
  requiresAuth: boolean;
  authType?: string;
  authFields?: string[];
  preInstallNote?: string;
  config: {
    command: string;
    args: string[];
    env?: Record<string, string>;
  };
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  modules: string[];
  recommended?: boolean;
  icon: string;
  color: string;
}

export const mcpServers: Record<string, McpServer> = {
  // Anthropic Official MCP Servers
  memory: {
    id: 'memory',
    name: 'Memory',
    description: 'Persistent memory using knowledge graph for long-term context',
    category: 'anthropic',
    requiresAuth: false,
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
    config: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-brave-search'],
      env: { BRAVE_API_KEY: '' }
    }
  },
  puppeteerMcp: {
    id: 'puppeteer-mcp',
    name: 'Puppeteer',
    description: 'Browser automation for web scraping and interaction',
    category: 'anthropic',
    requiresAuth: false,
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
    config: {
      command: 'npx',
      args: ['-y', 'hubspot-mcp-server'],
      env: { HUBSPOT_ACCESS_TOKEN: '${HUBSPOT_ACCESS_TOKEN}' }
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
    config: {
      command: 'npx',
      args: ['-y', 'salesforce-mcp-server'],
      env: {
        SALESFORCE_INSTANCE_URL: '${SALESFORCE_INSTANCE_URL}',
        SALESFORCE_ACCESS_TOKEN: '${SALESFORCE_ACCESS_TOKEN}'
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
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-slack'],
      env: { SLACK_BOT_TOKEN: '${SLACK_BOT_TOKEN}' }
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
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-figma'],
      env: { FIGMA_ACCESS_TOKEN: '${FIGMA_ACCESS_TOKEN}' }
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
    config: {
      command: 'npx',
      args: ['-y', 'canva-mcp-server'],
      env: { CANVA_API_KEY: '${CANVA_API_KEY}' }
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
    config: {
      command: 'npx',
      args: ['-y', 'openai-mcp-server'],
      env: { OPENAI_API_KEY: '${OPENAI_API_KEY}' }
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
    config: {
      command: 'npx',
      args: ['-y', 'gemini-mcp-server'],
      env: { GOOGLE_AI_API_KEY: '${GOOGLE_AI_API_KEY}' }
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
    config: {
      command: 'npx',
      args: ['-y', 'huggingface-mcp-server'],
      env: { HUGGINGFACE_TOKEN: '${HUGGINGFACE_TOKEN}' }
    }
  },

  // Analytics
  googleAnalytics: {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'GA4 reporting, real-time data, audience insights',
    category: 'analytics',
    requiresAuth: true,
    authType: 'oauth',
    authFields: ['GA_PROPERTY_ID', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    preInstallNote: 'Set up at https://console.cloud.google.com/',
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
  fathom: {
    id: 'fathom',
    name: 'Fathom Analytics',
    description: 'Privacy-focused website analytics',
    category: 'analytics',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['FATHOM_API_KEY'],
    config: {
      command: 'npx',
      args: ['-y', 'fathom-mcp-server'],
      env: { FATHOM_API_KEY: '${FATHOM_API_KEY}' }
    }
  },

  // Productivity
  notion: {
    id: 'notion',
    name: 'Notion',
    description: 'Read and write Notion pages, databases, and blocks',
    category: 'productivity',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['NOTION_API_KEY'],
    preInstallNote: 'Create integration at https://www.notion.so/my-integrations',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-notion'],
      env: { NOTION_API_KEY: '${NOTION_API_KEY}' }
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
    config: {
      command: 'npx',
      args: ['-y', 'airtable-mcp-server'],
      env: { AIRTABLE_API_KEY: '${AIRTABLE_API_KEY}' }
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
  calendly: {
    id: 'calendly',
    name: 'Calendly',
    description: 'Manage scheduling and calendar events',
    category: 'productivity',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['CALENDLY_API_KEY'],
    config: {
      command: 'npx',
      args: ['-y', 'calendly-mcp-server'],
      env: { CALENDLY_API_KEY: '${CALENDLY_API_KEY}' }
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
    config: {
      command: 'npx',
      args: ['-y', 'desktop-commander-mcp']
    }
  },
  playwright: {
    id: 'playwright',
    name: 'Playwright',
    description: 'Browser automation and web scraping',
    category: 'system',
    requiresAuth: false,
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
    config: {
      command: 'npx',
      args: ['-y', 'docker-mcp-server']
    }
  },

  // Integrations
  zapier: {
    id: 'zapier',
    name: 'Zapier MCP',
    description: 'Connect to 6,000+ apps via Zapier',
    category: 'integration',
    requiresAuth: true,
    authType: 'api-key',
    authFields: ['ZAPIER_MCP_API_KEY'],
    preInstallNote: 'Get your Zapier MCP API key at https://actions.zapier.com/mcp/',
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-zapier'],
      env: { ZAPIER_MCP_API_KEY: '${ZAPIER_MCP_API_KEY}' }
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
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-github'],
      env: { GITHUB_TOKEN: '${GITHUB_TOKEN}' }
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
    config: {
      command: 'npx',
      args: ['-y', 'linear-mcp-server'],
      env: { LINEAR_API_KEY: '${LINEAR_API_KEY}' }
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
    config: {
      command: 'npx',
      args: ['-y', '@anthropic-ai/mcp-server-postgres', '${POSTGRES_CONNECTION_STRING}']
    }
  }
};

export const bundles: Record<string, Bundle> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Essential tools for getting started with Claude Code',
    modules: ['filesystem', 'github', 'playwright', 'memory', 'fetch'],
    icon: '🚀',
    color: 'from-blue-500 to-cyan-500'
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Full productivity stack for business users',
    modules: ['filesystem', 'github', 'zapier', 'wordpress', 'playwright', 'desktop-commander', 'notion', 'slack', 'memory', 'fetch', 'sequential-thinking'],
    recommended: true,
    icon: '💼',
    color: 'from-purple-500 to-indigo-500'
  },
  devops: {
    id: 'devops',
    name: 'DevOps',
    description: 'Cloud and infrastructure management',
    modules: ['aws', 'kubernetes', 'github', 'gitlab', 'docker', 'filesystem', 'desktop-commander', 'postgres', 'git-mcp'],
    icon: '⚙️',
    color: 'from-orange-500 to-red-500'
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing & Creative',
    description: 'Content, analytics, design, and social tools',
    modules: ['wordpress', 'figma', 'canva', 'fathom', 'google-analytics', 'zapier', 'filesystem', 'hubspot'],
    icon: '🎨',
    color: 'from-pink-500 to-rose-500'
  },
  sales: {
    id: 'sales',
    name: 'Sales & CRM',
    description: 'CRM, scheduling, and business tools',
    modules: ['hubspot', 'salesforce', 'calendly', 'slack', 'zapier', 'notion'],
    icon: '📈',
    color: 'from-green-500 to-emerald-500'
  },
  aiPowerUser: {
    id: 'ai-power-user',
    name: 'AI Power User',
    description: 'Multiple AI services for maximum flexibility',
    modules: ['openai', 'gemini', 'huggingface', 'filesystem', 'github', 'memory', 'sequential-thinking'],
    icon: '🤖',
    color: 'from-violet-500 to-purple-500'
  },
  agentBuilder: {
    id: 'agent-builder',
    name: 'Agent Builder',
    description: 'Tools for building and deploying AI agents',
    modules: ['github', 'filesystem', 'desktop-commander', 'docker', 'postgres', 'supabase', 'openai', 'playwright', 'memory', 'sequential-thinking', 'puppeteer-mcp'],
    icon: '🛠️',
    color: 'from-amber-500 to-yellow-500'
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Everything - all available modules',
    modules: Object.keys(mcpServers),
    icon: '🏢',
    color: 'from-slate-600 to-slate-800'
  }
};

export const categories: Record<string, string> = {
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
