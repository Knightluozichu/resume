#!/usr/bin/env node
// Fix all MDX files missing sourceUrl in frontmatter (pre-existing build blockers)

import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const BASE = '/Users/luozichu/Repositories/learn/remuse/content';
const files = execSync('grep -rl "^draft:" ' + BASE + ' --include="*.mdx"', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

let fixed = 0;
for (const f of files) {
  const content = readFileSync(f, 'utf-8');
  if (!/^sourceUrl:/.test(content)) {
    // Add sourceUrl: "" after the draft: line
    const newContent = content.replace(/^(draft:.*)$/m, '$1\nsourceUrl: ""');
    writeFileSync(f, newContent, 'utf-8');
    console.log(`[FIXED] ${f.replace(BASE + '/', '')}`);
    fixed++;
  }
}
console.log(`\nFixed ${fixed} files.`);
