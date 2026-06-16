#!/usr/bin/env node
// Fix MDX v3 brace issues in c-primer-plus chapters
// - Replace { and } with &#123; and &#125; inside single-backtick code spans
// - Fix << and >> in headings/titles
// - Set draft: false on all 11 files

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

function fixSpanContent(content) {
  if (content.includes('{') || content.includes('}')) {
    return content.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
  }
  return null; // no change
}

// Also fixes << >> that appear inside single-backtick spans, since they can
// cause issues too (though the root cause is braces)
function fixRawAngleBrackets(content) {
  if (/<<|>>/.test(content)) {
    return content.replace(/<</g, '&lt;&lt;').replace(/>>/g, '&gt;&gt;');
  }
  return null;
}

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

    // Track triple-backtick fenced code blocks
    if (stripped.startsWith('```')) {
      inFence = !inFence;
      resultLines.push(line);
      continue;
    }

    if (inFence) {
      resultLines.push(line);
      continue;
    }

    // Replace single-backtick spans: `...` where backtick is NOT part of a pair
    // (?<!\`) — negative lookbehind: previous char is NOT a backtick
    // `([^`]+)` — backtick, capture inner content (no backticks), backtick
    // (?!`) — negative lookahead: next char is NOT a backtick
    const fixed = line.replaceAll(
      /(?<!`)`([^`]+)`(?!`)/g,
      (match, inner) => {
        const newInner = fixSpanContent(inner);
        if (newInner !== null) {
          changes++;
          return '`' + newInner + '`';
        }
        return match;
      }
    );
    resultLines.push(fixed);
  }

  content = resultLines.join('\n');

  // Fix headings/titles with << and >> (outside code spans/fences)
  // These were already handled by our single-backtick pass for inline code,
  // but bare << >> in headings also break MDX
  content = content.replace(
    /^## 位移：<< 与 >>$/m,
    '## 位移：左移和右移'
  );

  // Fix "第一步：左移 <<" → "第一步：左移" pattern
  content = content.replace(
    /^(第[一二三四五六七八九十]+步：左移)\s*<</m,
    '$1'
  );
  // Fix "第二步：无符号右移 >>" → "第二步：无符号右移" pattern
  content = content.replace(
    /^(第[一二三四五六七八九十]+步：无符号右移)\s*>>/m,
    '$1'
  );

  // Set draft: false
  const draftBefore = content.match(/^draft:\s*true/m);
  if (draftBefore) {
    content = content.replace(/^draft:\s*true/m, 'draft: false');
    changes++;
  }

  if (content !== original) {
    writeFileSync(fullPath, content, 'utf-8');
    console.log(`[FIXED] ${filepath} — ${changes} change(s)`);
    return true;
  }
  console.log(`[OK]    ${filepath} — no changes needed`);
  return false;
}

let totalFixed = 0;
for (const file of FILES) {
  if (fixFile(file)) totalFixed++;
}
console.log(`\nDone. ${totalFixed}/${FILES.length} files modified.`);
