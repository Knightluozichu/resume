#!/usr/bin/env node
// Convert { /* ... */ } JSX comments to <!-- ... --> HTML comments
// Uses multiline regex (DOTALL) to handle comments spanning multiple lines

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

for (const file of FILES) {
  const path = join(BASE, file);
  let content = readFileSync(path, 'utf-8');
  const original = content;
  // Replace { /* ... */ } with <!-- ... --> (multiline)
  content = content.replace(/\{\/\*([\s\S]*?)\*\/\}/g, '<!-- $1-->');
  if (content !== original) {
    writeFileSync(path, content, 'utf-8');
    console.log(`[FIXED] ${file}`);
  } else {
    console.log(`[OK]    ${file}`);
  }
}
