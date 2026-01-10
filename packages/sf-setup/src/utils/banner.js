const chalk = require('chalk');
const pkg = require('../../package.json');

function showBanner() {
  const purple = chalk.hex('#6366f1');
  const darkPurple = chalk.hex('#8B5CF6');

  console.log('');
  console.log(purple('  ███████╗███████╗    ███████╗███████╗████████╗██╗   ██╗██████╗ '));
  console.log(purple('  ██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗'));
  console.log(darkPurple('  ███████╗█████╗      ███████╗█████╗     ██║   ██║   ██║██████╔╝'));
  console.log(darkPurple('  ╚════██║██╔══╝      ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ '));
  console.log(purple('  ███████║██║         ███████║███████╗   ██║   ╚██████╔╝██║     '));
  console.log(purple('  ╚══════╝╚═╝         ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     '));
  console.log('');
  console.log(chalk.gray(`  Support Forge AI Setup v${pkg.version}`));
  console.log(chalk.gray('  https://support-forge.com/setup'));
  console.log('');
}

function showCompactBanner() {
  const purple = chalk.hex('#6366f1');
  console.log('');
  console.log(purple.bold('  🚀 SF Setup') + chalk.gray(` v${pkg.version}`));
  console.log('');
}

module.exports = { showBanner, showCompactBanner };
