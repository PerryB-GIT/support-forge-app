const express = require('express');
const path = require('path');
const open = require('open');
const chalk = require('chalk');
const { mcpServers, bundles, skills } = require('../modules/catalog');
const { saveConfig } = require('../utils/config');
const { installModule, installSkill } = require('../wizard/installer');
const { checkPrerequisites } = require('../utils/prerequisites');

const PORT = 3847;

async function startWebUI() {
  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/api/modules', (req, res) => {
    res.json({
      mcpServers: Object.values(mcpServers),
      bundles: Object.values(bundles),
      skills: Object.values(skills)
    });
  });

  app.get('/api/prerequisites', async (req, res) => {
    const prereqs = await checkPrerequisites();
    res.json(prereqs);
  });

  app.post('/api/install', async (req, res) => {
    const { modules, credentials, installSkillsFlag } = req.body;

    const results = { modules: [], skills: [], config: null };

    for (const moduleId of modules) {
      const module = mcpServers[moduleId];
      if (module) {
        const result = await installModule(module, credentials);
        results.modules.push({ id: moduleId, ...result });
      }
    }

    if (installSkillsFlag) {
      for (const skill of Object.values(skills)) {
        const result = await installSkill(skill);
        results.skills.push({ id: skill.id, ...result });
      }
    }

    const selectedModules = modules.map(id => mcpServers[id]).filter(Boolean);
    results.config = await saveConfig(selectedModules, credentials);

    res.json(results);
  });

  app.get('/', (req, res) => {
    res.send(getHtmlTemplate());
  });

  const server = app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(chalk.green(`\n✨ Web UI running at ${chalk.bold(url)}\n`));
    console.log(chalk.gray('Press Ctrl+C to stop\n'));
    open(url);
  });

  process.on('SIGINT', () => {
    console.log(chalk.gray('\nShutting down...'));
    server.close();
    process.exit(0);
  });
}

function getHtmlTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SF Setup | Support Forge</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      /* Support Forge Brand - exact colors from globals.css */
      --forge-black: #0a0a0f;
      --forge-purple: #8B5CF6;
      --forge-purple-light: #A78BFA;
      --forge-silver: #C0C0C0;
      --forge-silver-dark: #9CA3AF;

      --bg-dark: #050508;
      --bg-surface: #0f0f14;
      --bg-elevated: #18181f;

      --accent: #8B5CF6;
      --accent-hover: #A78BFA;
      --accent-glow: rgba(139, 92, 246, 0.3);

      --text-primary: #f9fafb;
      --text-secondary: #C0C0C0;
      --text-muted: #9CA3AF;

      --border-subtle: #2a2a35;
      --border-default: #404050;

      --success: #10b981;
      --warning: #f59e0b;
      --error: #ef4444;

      --logo-cyan: #22D3EE;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-dark);
      color: var(--text-primary);
      min-height: 100vh;
    }

    ::selection {
      background: var(--forge-purple);
      color: var(--bg-dark);
    }

    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: var(--bg-surface); }
    ::-webkit-scrollbar-thumb { background: var(--border-subtle); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--forge-purple); }

    /* Header - matches support-forge.com */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: rgba(5, 5, 8, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-subtle);
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 24px;
    }

    .header-inner {
      max-width: 1280px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--forge-purple) 0%, var(--logo-cyan) 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--accent);
    }

    .header-badge {
      font-size: 0.75rem;
      color: var(--text-muted);
      background: var(--bg-surface);
      padding: 4px 10px;
      border-radius: 12px;
      border: 1px solid var(--border-subtle);
    }

    /* Main */
    .main {
      padding-top: 64px;
      min-height: 100vh;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 48px 24px;
    }

    /* Hero */
    .hero {
      text-align: center;
      margin-bottom: 48px;
    }

    .hero h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 16px;
      background: linear-gradient(135deg, var(--text-primary) 0%, var(--forge-silver) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero p {
      color: var(--text-secondary);
      font-size: 1.1rem;
      max-width: 520px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Progress Steps */
    .progress-track {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 48px;
    }

    .progress-step {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .progress-step.active {
      border-color: var(--accent);
      box-shadow: 0 0 20px var(--accent-glow);
    }

    .progress-step.completed {
      border-color: var(--success);
    }

    .step-num {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: var(--bg-elevated);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .progress-step.active .step-num {
      background: var(--accent);
      color: white;
    }

    .progress-step.completed .step-num {
      background: var(--success);
      color: white;
    }

    .step-label {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-muted);
    }

    .progress-step.active .step-label {
      color: var(--text-primary);
    }

    .step-connector {
      width: 40px;
      height: 2px;
      background: var(--border-subtle);
      align-self: center;
    }

    /* Section Titles */
    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 20px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-title svg {
      color: var(--accent);
    }

    /* Bundle Cards */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 40px;
    }

    .card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .card:hover {
      border-color: var(--border-default);
      transform: translateY(-2px);
    }

    .card.selected {
      border-color: var(--accent);
      box-shadow: 0 0 30px var(--accent-glow);
    }

    .card-check {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 22px;
      height: 22px;
      border-radius: 6px;
      border: 2px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .card.selected .card-check {
      background: var(--accent);
      border-color: var(--accent);
    }

    .card-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      background: linear-gradient(135deg, var(--accent) 0%, var(--forge-purple-light) 100%);
    }

    .card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 6px;
      color: var(--text-primary);
    }

    .card-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .card-meta {
      margin-top: 12px;
      font-size: 0.75rem;
      color: var(--accent);
      font-weight: 500;
    }

    /* Module Grid */
    .module-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
      margin-bottom: 40px;
    }

    .module-item {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 14px 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .module-item:hover {
      border-color: var(--border-default);
    }

    .module-item.selected {
      border-color: var(--accent);
      background: rgba(139, 92, 246, 0.08);
    }

    .module-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: var(--bg-elevated);
    }

    .module-icon.cloud { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
    .module-icon.business { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .module-icon.creative { background: linear-gradient(135deg, #ec4899, #be185d); }
    .module-icon.ai { background: linear-gradient(135deg, #06b6d4, #0891b2); }
    .module-icon.analytics { background: linear-gradient(135deg, var(--accent), #6d28d9); }
    .module-icon.productivity { background: linear-gradient(135deg, #10b981, #047857); }
    .module-icon.system { background: linear-gradient(135deg, #6b7280, #374151); }
    .module-icon.integration { background: linear-gradient(135deg, var(--accent), var(--logo-cyan)); }
    .module-icon.development { background: linear-gradient(135deg, #171717, #404040); }

    .module-info {
      flex: 1;
      min-width: 0;
    }

    .module-name {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 2px;
      color: var(--text-primary);
    }

    .module-desc {
      font-size: 0.75rem;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .module-check {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 2px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .module-item.selected .module-check {
      background: var(--accent);
      border-color: var(--accent);
    }

    /* Buttons */
    .btn-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid var(--border-subtle);
    }

    .btn {
      padding: 12px 28px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: none;
      font-family: 'Inter', sans-serif;
    }

    .btn-primary {
      background: var(--accent);
      color: white;
    }

    .btn-primary:hover {
      background: var(--accent-hover);
      box-shadow: 0 0 20px var(--accent-glow);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: var(--bg-surface);
      color: var(--text-secondary);
      border: 1px solid var(--border-subtle);
    }

    .btn-secondary:hover {
      background: var(--bg-elevated);
      color: var(--text-primary);
      border-color: var(--border-default);
    }

    /* Form */
    .form-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
    }

    .form-section h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--text-primary);
    }

    .form-section .hint {
      color: var(--warning);
      font-size: 0.85rem;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-group {
      margin-bottom: 18px;
    }

    .form-group:last-child {
      margin-bottom: 0;
    }

    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .form-group input {
      width: 100%;
      padding: 12px 14px;
      background: var(--bg-dark);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      color: var(--text-primary);
      font-size: 0.95rem;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .form-group input::placeholder {
      color: var(--text-muted);
    }

    .form-group .help {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 6px;
    }

    /* Log */
    .log-container {
      background: var(--forge-black);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 20px;
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      max-height: 450px;
      overflow-y: auto;
    }

    .log-entry {
      padding: 10px 0;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .log-entry:last-child {
      border-bottom: none;
    }

    .log-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .log-success .log-icon { background: rgba(16, 185, 129, 0.15); color: var(--success); }
    .log-error .log-icon { background: rgba(239, 68, 68, 0.15); color: var(--error); }
    .log-info .log-icon { background: rgba(139, 92, 246, 0.15); color: var(--accent); }

    .log-success { color: var(--success); }
    .log-error { color: var(--error); }
    .log-info { color: var(--forge-purple-light); }

    /* Responsive */
    @media (max-width: 768px) {
      .header { padding: 0 16px; }
      .container { padding: 32px 16px; }
      .hero h1 { font-size: 1.75rem; }
      .progress-track { flex-direction: column; align-items: stretch; }
      .step-connector { width: 2px; height: 16px; margin-left: 13px; }
      .card-grid, .module-grid { grid-template-columns: 1fr; }
      .btn-group { flex-direction: column; gap: 12px; }
      .btn { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <div class="logo-group">
        <div class="logo-icon" style="background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); border-radius: 8px; padding: 0;">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <!-- Adobe-style SF Logo -->
            <rect width="36" height="36" rx="8" fill="url(#sfBgGrad)"/>
            <text x="18" y="25" text-anchor="middle" font-family="'Arial Black', 'Helvetica Neue', sans-serif" font-size="16" font-weight="900" fill="white">SF</text>
            <defs>
              <linearGradient id="sfBgGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#A78BFA"/>
                <stop offset="50%" stop-color="#8B5CF6"/>
                <stop offset="100%" stop-color="#6D28D9"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="logo-text">Support<span style="color: var(--forge-purple-light)">Forge</span></span>
      </div>
      <div class="header-badge">Setup v1.0.0</div>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <div class="hero">
        <h1>Configure Your AI Workspace</h1>
        <p>Select MCP servers, integrations, and tools to supercharge Claude Code for your workflow.</p>
      </div>

      <div class="progress-track">
        <div class="progress-step active" id="step1">
          <div class="step-num">1</div>
          <span class="step-label">Select Tools</span>
        </div>
        <div class="step-connector"></div>
        <div class="progress-step" id="step2">
          <div class="step-num">2</div>
          <span class="step-label">Configure</span>
        </div>
        <div class="step-connector"></div>
        <div class="progress-step" id="step3">
          <div class="step-num">3</div>
          <span class="step-label">Install</span>
        </div>
      </div>

      <!-- Page 1 -->
      <div id="page1" class="page">
        <div class="section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Quick Start Bundles
        </div>
        <div class="card-grid" id="bundles"></div>

        <div class="section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          Individual Modules
        </div>
        <div class="module-grid" id="modules"></div>

        <div class="btn-group">
          <div></div>
          <button class="btn btn-primary" onclick="nextStep()">
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <!-- Page 2 -->
      <div id="page2" class="page" style="display: none;">
        <div class="section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          Service Credentials
        </div>
        <div id="credentials-forms"></div>

        <div class="btn-group">
          <button class="btn btn-secondary" onclick="prevStep()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <button class="btn btn-primary" onclick="startInstall()">
            Install
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          </button>
        </div>
      </div>

      <!-- Page 3 -->
      <div id="page3" class="page" style="display: none;">
        <div class="section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          Installation Progress
        </div>
        <div class="log-container" id="log"></div>
      </div>
    </div>
  </main>

  <script>
    let modules = [];
    let bundles = [];
    let selectedModules = new Set();
    let credentials = {};
    let currentStep = 1;

    const categoryIcons = {
      cloud: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>',
      business: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
      creative: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a4.5 4.5 0 000 9 4.5 4.5 0 010 9"/></svg>',
      ai: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
      analytics: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>',
      productivity: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      system: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      integration: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
      development: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>'
    };

    async function init() {
      const res = await fetch('/api/modules');
      const data = await res.json();
      modules = data.mcpServers;
      bundles = data.bundles;
      renderBundles();
      renderModules();
    }

    function renderBundles() {
      const container = document.getElementById('bundles');
      container.innerHTML = bundles.map(b => \`
        <div class="card \${isBundleSelected(b.id) ? 'selected' : ''}" onclick="selectBundle('\${b.id}')">
          <div class="card-check">\${isBundleSelected(b.id) ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>
          <div class="card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div class="card-title">\${b.name}\${b.recommended ? ' ★' : ''}</div>
          <div class="card-desc">\${b.description}</div>
          <div class="card-meta">\${b.modules.length} tools</div>
        </div>
      \`).join('');
    }

    function isBundleSelected(bundleId) {
      const bundle = bundles.find(b => b.id === bundleId);
      if (!bundle) return false;
      return bundle.modules.every(id => {
        const mod = modules.find(m => m.id === id);
        return mod && selectedModules.has(mod.id);
      });
    }

    function renderModules() {
      const container = document.getElementById('modules');
      container.innerHTML = modules.map(m => \`
        <div class="module-item \${selectedModules.has(m.id) ? 'selected' : ''}" onclick="toggleModule('\${m.id}')">
          <div class="module-icon \${m.category}">\${categoryIcons[m.category] || categoryIcons.system}</div>
          <div class="module-info">
            <div class="module-name">\${m.name}</div>
            <div class="module-desc">\${m.description}</div>
          </div>
          <div class="module-check">\${selectedModules.has(m.id) ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>
        </div>
      \`).join('');
    }

    function selectBundle(bundleId) {
      const bundle = bundles.find(b => b.id === bundleId);
      if (!bundle) return;
      const allSelected = isBundleSelected(bundleId);
      bundle.modules.forEach(id => {
        const mod = modules.find(m => m.id === id);
        if (mod) {
          if (allSelected) selectedModules.delete(mod.id);
          else selectedModules.add(mod.id);
        }
      });
      renderBundles();
      renderModules();
    }

    function toggleModule(moduleId) {
      if (selectedModules.has(moduleId)) selectedModules.delete(moduleId);
      else selectedModules.add(moduleId);
      renderBundles();
      renderModules();
    }

    function nextStep() {
      if (selectedModules.size === 0) { alert('Please select at least one module'); return; }
      currentStep = 2;
      updateSteps();
      document.getElementById('page1').style.display = 'none';
      document.getElementById('page2').style.display = 'block';
      renderCredentialForms();
    }

    function prevStep() {
      currentStep = 1;
      updateSteps();
      document.getElementById('page2').style.display = 'none';
      document.getElementById('page1').style.display = 'block';
    }

    function updateSteps() {
      document.querySelectorAll('.progress-step').forEach((el, i) => {
        el.classList.remove('active', 'completed');
        if (i + 1 < currentStep) el.classList.add('completed');
        if (i + 1 === currentStep) el.classList.add('active');
      });
    }

    function renderCredentialForms() {
      const container = document.getElementById('credentials-forms');
      const authModules = modules.filter(m => selectedModules.has(m.id) && m.requiresAuth);

      if (authModules.length === 0) {
        container.innerHTML = '<div class="form-section"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>No Credentials Required</h3><p style="color: var(--text-muted);">Selected modules don\\'t require API keys. Click Install to continue.</p></div>';
        return;
      }

      container.innerHTML = authModules.map(m => \`
        <div class="form-section">
          <h3><span style="display:inline-flex;width:28px;height:28px;border-radius:6px;align-items:center;justify-content:center;background:var(--bg-elevated);">\${categoryIcons[m.category] || categoryIcons.system}</span>\${m.name}</h3>
          \${m.preInstallNote ? \`<div class="hint"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\${m.preInstallNote}</div>\` : ''}
          \${m.authFields.map(field => \`
            <div class="form-group">
              <label>\${field.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase())}</label>
              <input type="\${/SECRET|PASSWORD|TOKEN|KEY/i.test(field) ? 'password' : 'text'}" placeholder="Enter value" onchange="credentials['\${field}'] = this.value">
              <div class="help">Required for \${m.name}</div>
            </div>
          \`).join('')}
        </div>
      \`).join('');
    }

    async function startInstall() {
      currentStep = 3;
      updateSteps();
      document.getElementById('page2').style.display = 'none';
      document.getElementById('page3').style.display = 'block';

      const log = document.getElementById('log');
      log.innerHTML = '<div class="log-entry log-info"><div class="log-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>Starting installation...</div>';

      try {
        const res = await fetch('/api/install', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ modules: Array.from(selectedModules), credentials, installSkillsFlag: true })
        });
        const results = await res.json();

        results.modules.forEach(r => {
          log.innerHTML += \`<div class="log-entry \${r.success ? 'log-success' : 'log-error'}"><div class="log-icon">\${r.success ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}</div>\${r.id} — \${r.success ? 'Ready' : 'Failed'}</div>\`;
        });

        if (results.config?.success) {
          log.innerHTML += '<div class="log-entry log-success"><div class="log-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>Configuration saved</div>';
        }

        log.innerHTML += '<div class="log-entry log-info" style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border-subtle);"><div class="log-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>Installation complete! Restart Claude Code to load your new tools.</div>';
      } catch (err) {
        log.innerHTML += \`<div class="log-entry log-error"><div class="log-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>Error: \${err.message}</div>\`;
      }
    }

    init();
  </script>
</body>
</html>`;
}

module.exports = { startWebUI };
