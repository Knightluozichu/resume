#!/usr/bin/env node
const { spawnSync } = require('child_process');
const os = require('os');
const isWindows = os.platform() === 'win32';
const ALLOWED_COMMANDS = new Set(['node', 'npm', 'pnpm', 'yarn', 'vercel']);
function log(msg) { console.error(msg); }
function commandExists(cmd) {
  if (!ALLOWED_COMMANDS.has(cmd)) throw new Error(`Command not in whitelist: ${cmd}`);
  try {
    if (isWindows) { return spawnSync('where', [cmd], { stdio: 'ignore' }).status === 0; }
    else { return spawnSync('sh', ['-c', `command -v "$1"`, '--', cmd], { stdio: 'ignore' }).status === 0; }
  } catch { return false; }
}
function getCommandOutput(cmd, args) {
  try {
    const result = spawnSync(cmd, args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'], shell: isWindows });
    return result.status === 0 ? (result.stdout || '').trim() : null;
  } catch { return null; }
}
function main() {
  log('Vercel CLI Installation');
  if (!commandExists('node')) { log('Error: Node.js not installed'); process.exit(1); }
  log(`Node.js: ${getCommandOutput('node', ['-v'])}`);
  if (commandExists('vercel')) {
    log(`Vercel CLI already installed: ${getCommandOutput('vercel', ['--version'])}`);
    console.log(JSON.stringify({ status: 'already_installed' }));
    process.exit(0);
  }
  const pkgManager = commandExists('pnpm') ? 'pnpm' : commandExists('yarn') ? 'yarn' : 'npm';
  log(`Installing with ${pkgManager}...`);
  const commands = { pnpm: ['pnpm', ['add', '-g', 'vercel']], yarn: ['yarn', ['global', 'add', 'vercel']], npm: ['npm', ['install', '-g', 'vercel']] };
  const [cmd, args] = commands[pkgManager];
  const result = spawnSync(cmd, args, { stdio: 'inherit', shell: isWindows });
  if (result.status !== 0) { log('Installation failed'); process.exit(1); }
  if (commandExists('vercel')) {
    log(`Installed: ${getCommandOutput('vercel', ['--version'])}`);
    console.log(JSON.stringify({ status: 'success' }));
  } else { log('Error: vercel not found after install'); process.exit(1); }
}
main();
