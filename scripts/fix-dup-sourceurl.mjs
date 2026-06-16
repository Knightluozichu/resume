#!/usr/bin/env node
// Remove duplicate sourceUrl lines from MDX frontmatter
// Keep the first occurrence with a real URL, delete later empty duplicates

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const BASE = '/Users/luozichu/Repositories/learn/remuse/content';
const files = execSync('grep -rl "sourceUrl:" ' + BASE + ' --include="*.mdx"', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let fixed = 0;
for (const f of files) {
  const content = readFileSync(f, 'utf-8');
  const lines = content.split('\n');
  const newLines = [];
  let seenSourceUrl = false;
  let hasDup = false;
  
  for (const line of lines) {
    if (line.trimStart().startsWith('sourceUrl:')) {
      if (seenSourceUrl) {
        hasDup = true;
        continue; // skip duplicate
      }
      seenSourceUrl = true;
    }
    newLines.push(line);
  }
  
  if (hasDup) {
    writeFileSync(f, newLines.join('\n'), 'utf-8');
    console.log(`[FIXED] ${f.replace(BASE + '/', '')} - removed duplicate sourceUrl`);
    fixed++;
  }
}
console.log(`\nFixed ${fixed} files with duplicate sourceUrl.`);
