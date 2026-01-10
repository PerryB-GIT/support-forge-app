#!/usr/bin/env node

/**
 * Quick test script for SF Setup
 * Run with: node src/test.js
 */

const chalk = require('chalk');

async function runTests() {
  console.log(chalk.bold.cyan('\n🧪 SF Setup - Test Suite\n'));

  let passed = 0;
  let failed = 0;

  // Test 1: Module catalog loads
  try {
    const { mcpServers, bundles, skills } = require('./modules/catalog');
    const moduleCount = Object.keys(mcpServers).length;
    const bundleCount = Object.keys(bundles).length;

    if (moduleCount > 0 && bundleCount > 0) {
      console.log(chalk.green(`✓ Module catalog: ${moduleCount} servers, ${bundleCount} bundles`));
      passed++;
    } else {
      throw new Error('Empty catalog');
    }
  } catch (err) {
    console.log(chalk.red(`✗ Module catalog: ${err.message}`));
    failed++;
  }

  // Test 2: Banner displays
  try {
    const { showBanner } = require('./utils/banner');
    showBanner();
    console.log(chalk.green('✓ Banner displays correctly'));
    passed++;
  } catch (err) {
    console.log(chalk.red(`✗ Banner: ${err.message}`));
    failed++;
  }

  // Test 3: Prerequisites checker works
  try {
    const { checkPrerequisites } = require('./utils/prerequisites');
    const result = await checkPrerequisites();
    console.log(chalk.green(`✓ Prerequisites: ${result.installed.length} found, ${result.missing.length} missing`));
    passed++;
  } catch (err) {
    console.log(chalk.red(`✗ Prerequisites: ${err.message}`));
    failed++;
  }

  // Test 4: Config path is valid
  try {
    const { getClaudeConfigPath } = require('./utils/config');
    const configPath = getClaudeConfigPath();
    if (configPath.includes('.claude')) {
      console.log(chalk.green(`✓ Config path: ${configPath}`));
      passed++;
    } else {
      throw new Error('Invalid path');
    }
  } catch (err) {
    console.log(chalk.red(`✗ Config path: ${err.message}`));
    failed++;
  }

  // Summary
  console.log(chalk.bold(`\n📊 Results: ${passed} passed, ${failed} failed\n`));

  if (failed === 0) {
    console.log(chalk.green.bold('✨ All tests passed!\n'));
    console.log(chalk.gray('Ready to build:'));
    console.log(chalk.white('  npm run build    # Creates dist/sf-setup.exe\n'));
  } else {
    console.log(chalk.red.bold('Some tests failed. Please fix before building.\n'));
    process.exit(1);
  }
}

runTests().catch(console.error);
