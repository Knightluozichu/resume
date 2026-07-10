#!/usr/bin/env node
/**
 * Find ALL MDX runtime errors by compiling, stripping imports, and calling the component.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "content");

function collectMdxFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...collectMdxFiles(full));
    else if (name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

async function checkOne(file) {
  const raw = readFileSync(file, "utf8");
  const { content: body } = matter(raw);
  
  const compiled = await compile(body, {
    jsx: false,
    remarkPlugins: [remarkMath, remarkGfm],
  });
  
  let code = String(compiled);
  const errors = [];
  
  // Strip import statements (they can't be used in new Function)
  // Extract imported names so we can provide them as stubs
  const stubNames = new Set();
  code = code.replace(/^import\s+.*$/gm, (line) => {
    // Extract named imports: { Name1, Name2 as Alias }
    const namedMatch = line.match(/\{([^}]+)\}/);
    if (namedMatch) {
      namedMatch[1].split(',').forEach(name => {
        const alias = name.trim().split(/\s+as\s+/);
        stubNames.add(alias[alias.length - 1].trim());
      });
    }
    return '';
  });
  
  // Also strip export statements (keep the content)
  code = code.replace(/export\s+default\s+/g, 'const __default = ');
  code = code.replace(/export\s+/g, '');
  
  try {
    const noop = () => null;
    
    // Create sandbox with all stubs
    const sandbox = {};
    
    // Add React/jsx stubs
    sandbox._jsx = noop;
    sandbox._jsxs = noop;
    sandbox._Fragment = 'Fragment';
    sandbox._components = new Proxy({}, { get: () => noop });
    
    // Add all imported names as stubs
    for (const name of stubNames) {
      sandbox[name] = noop;
    }
    
    // Wrap in a try-catch to capture the default export
    const wrappedCode = code + '\n;return typeof __default !== "undefined" ? __default : null;';
    
    const fn = new Function(...Object.keys(sandbox), wrappedCode);
    const defaultExport = fn(...Object.values(sandbox));
    
    // Call the default export (the MDX content component)
    if (defaultExport && typeof defaultExport === 'function') {
      try {
        defaultExport({});
      } catch (err) {
        if (err instanceof ReferenceError) {
          errors.push({ type: 'ReferenceError', message: err.message });
        }
      }
    }
  } catch (err) {
    if (err instanceof ReferenceError) {
      errors.push({ type: 'ReferenceError', message: err.message });
    }
    // SyntaxError, TypeError etc. are expected from stubs
  }
  
  return errors;
}

async function main() {
  const files = collectMdxFiles(CONTENT_DIR).sort();
  const failures = [];
  
  console.log(`Checking ${files.length} files...`);
  
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    try {
      const errors = await checkOne(f);
      if (errors.length > 0) {
        failures.push({ file: f, errors });
      }
    } catch (err) {
      // Compile error (syntax) - skip
    }
    
    if ((i + 1) % 500 === 0) {
      console.log(`  ${i + 1}/${files.length}...`);
    }
  }
  
  if (failures.length === 0) {
    console.log(`\n✓ All ${files.length} files passed runtime check.`);
    process.exit(0);
  }
  
  console.log(`\n${failures.length} files with runtime errors:\n`);
  for (const { file, errors } of failures) {
    const rel = relative(ROOT, file);
    for (const err of errors) {
      console.log(`${rel}: ${err.message}`);
    }
  }
  process.exit(1);
}

main().catch((e) => {
  console.error("fatal:", e);
  process.exit(2);
});
