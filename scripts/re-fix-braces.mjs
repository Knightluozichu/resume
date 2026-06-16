#!/usr/bin/env node
// Re-fix MDX braces after sourceUrl scripts possibly overwrote previous fixes
// For c-primer-plus files only

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = '/Users/luozichu/Repositories/learn/remuse/content/c-primer-plus';
const FILES = [
  'c-basics/introducing-c.mdx',
  'c-basics/data-and-c.mdx',
  'c-basics/operators-expressions.mdx',
  'c-control-io/control-branching.mdx',
  'c-control-io/control-loops.mdx',
  'c-func-array-ptr/functions.mdx',
  'c-advanced/file-io.mdx',
  'c-advanced/structures.mdx',
  'c-advanced/bit-fiddling.mdx',
  'c-advanced/preprocessor.mdx',
  'c-advanced/storage-linkage-memory.mdx',
];

function fixFile(filepath) {
  const fullPath = join(BASE, filepath);
  let content = readFileSync(fullPath, 'utf-8');
  const original = content;
  let changes = 0;

  const lines = content.split('\n');
  const resultLines = [];
  let inFence = false;

  for (const line of lines) {
    const stripped = line.trimStart();

    if (stripped.startsWith('```')) {
      inFence = !inFence;
      resultLines.push(line);
      continue;
    }
    if (inFence) { resultLines.push(line); continue; }

    const fixed = line.replaceAll(
      /(?<!`)`([^`]+)`(?!`)/g,
      (match, inner) => {
        if (inner.includes('{') || inner.includes('}')) {
          changes++;
          return '`' + inner.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;') + '`';
        }
        return match;
      }
    );
    resultLines.push(fixed);
  }

  content = resultLines.join('\n');

  if (content !== original) {
    writeFileSync(fullPath, content, 'utf-8');
    console.log(`[FIXED] ${filepath} — ${changes} brace(s)`);
    return true;
  }
  console.log(`[OK]    ${filepath}`);
  return false;
}

let totalFixed = 0;
for (const file of FILES) {
  if (fixFile(file)) totalFixed++;
}
console.log(`\nDone. ${totalFixed}/${FILES.length} files modified.`);
