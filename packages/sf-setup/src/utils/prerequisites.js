const { execSync } = require('child_process');

const prerequisites = [
  {
    name: 'Node.js',
    command: 'node --version',
    minVersion: '16.0.0',
    installUrl: 'https://nodejs.org/',
    required: true
  },
  {
    name: 'npm',
    command: 'npm --version',
    minVersion: '7.0.0',
    installUrl: 'https://nodejs.org/',
    required: true
  },
  {
    name: 'Git',
    command: 'git --version',
    installUrl: 'https://git-scm.com/',
    required: false
  },
  {
    name: 'Python',
    command: process.platform === 'win32' ? 'python --version' : 'python3 --version',
    installUrl: 'https://python.org/',
    required: false
  }
];

function parseVersion(versionString) {
  const match = versionString.match(/(\d+)\.(\d+)\.(\d+)/);
  if (match) {
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2]),
      patch: parseInt(match[3])
    };
  }
  return null;
}

function compareVersions(current, minimum) {
  const curr = parseVersion(current);
  const min = parseVersion(minimum);

  if (!curr || !min) return true; // Can't parse, assume OK

  if (curr.major > min.major) return true;
  if (curr.major < min.major) return false;
  if (curr.minor > min.minor) return true;
  if (curr.minor < min.minor) return false;
  return curr.patch >= min.patch;
}

async function checkPrerequisites() {
  const results = {
    ready: true,
    missing: [],
    installed: []
  };

  for (const prereq of prerequisites) {
    try {
      const output = execSync(prereq.command, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      }).trim();

      // Check version if minimum specified
      if (prereq.minVersion) {
        if (!compareVersions(output, prereq.minVersion)) {
          if (prereq.required) {
            results.ready = false;
          }
          results.missing.push({
            ...prereq,
            currentVersion: output,
            reason: `Version ${output} is below minimum ${prereq.minVersion}`
          });
          continue;
        }
      }

      results.installed.push({
        name: prereq.name,
        version: output
      });

    } catch (error) {
      if (prereq.required) {
        results.ready = false;
      }
      results.missing.push({
        ...prereq,
        reason: 'Not installed'
      });
    }
  }

  return results;
}

module.exports = { checkPrerequisites };
