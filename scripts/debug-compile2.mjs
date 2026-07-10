import { compile } from "@mdx-js/mdx";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { readFileSync } from "node:fs";

const file = process.argv[2] || "content/concrete-mathematics/01-sums/cm-sums.mdx";
const raw = readFileSync(file, "utf8");
const { content: body } = matter(raw);

const compiled = await compile(body, {
  jsx: false,
  remarkPlugins: [remarkMath, remarkGfm],
});

const code = String(compiled);

// Find all bare identifier references that could cause ReferenceError
// Look for patterns like: , identifier, or , identifier] or , identifier)
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Look for bare identifiers that are NOT string literals
  // Pattern: , identifier, or , identifier] or , identifier) or "text ", identifier
  const matches = line.matchAll(/[\[,]"?\s*(?:text\}?\s*\+\s*)?([a-zA-Z_]\w*)\s*[\],]/g);
  for (const m of matches) {
    const ident = m[1];
    // Skip common safe identifiers
    if (['_jsx', '_jsxs', '_components', '_Fragment', 'undefined', 'null', 'props', 'MDXLayout', '_createMdxContent'].includes(ident)) continue;
    console.log(`Line ${i + 1}: possible bare identifier "${ident}"`);
    console.log(`  ${line.trim().substring(0, 120)}`);
  }
}

// Also search for patterns like: children: ["text ", identifier,
const childPattern = /children:\s*\[.*?([a-zA-Z_]\w*)/g;
let m;
while ((m = childPattern.exec(code)) !== null) {
  const ident = m[1];
  if (['_jsx', '_jsxs', '_components', '_Fragment', 'undefined', 'null', 'props'].includes(ident)) continue;
  // Check if it's inside a string
  const before = code.slice(0, m.index + m[0].length);
  const lastQuote = before.lastIndexOf('"');
  const lastBracket = before.lastIndexOf('[');
  if (lastBracket > lastQuote) {
    console.log(`Bare identifier in children: "${ident}"`);
  }
}
