/**
 * Fix coding-interviews diagram files that import from deleted ./official-lab
 * Remove the import and any Lab exports that use OfficialCaseLab
 * Keep real SVG diagram exports
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const ROOT = "/Users/luozichu/Repositories/learn/remuse";
const ciDiagrams = join(ROOT, "src/components/mdx/coding-interviews/diagrams");

const files = readdirSync(ciDiagrams).filter(f => f.endsWith(".tsx"));
let fixed = 0;

for (const file of files) {
  const filePath = join(ciDiagrams, file);
  let content = readFileSync(filePath, "utf8");
  
  if (!content.includes("./official-lab")) continue;
  
  // Remove the official-lab import line
  content = content.replace(/import\s*\{[^}]*\}\s*from\s*"\.\/official-lab";?\n?/g, "");
  
  // Remove exported functions that use OfficialCaseLab (text card Lab components)
  // Pattern: export function XxxLab() { return <OfficialCaseLab ... />; }
  // These can be single-line or multi-line
  content = content.replace(/export function \w+\([^)]*\)\s*\{[^}]*OfficialCaseLab[^}]*\}\n?/g, "");
  
  // Also handle multi-line Lab functions
  content = content.replace(/export function (\w+Lab)\(\)\s*\{[\s\S]*?return\s*\(\s*<OfficialCaseLab[\s\S]*?\/>\s*\);?\s*\}\n?/g, "");
  
  // Remove any remaining references to OfficialCaseLab type
  content = content.replace(/import\s*\{[^}]*OfficialCaseLab[^}]*\}\s*from\s*[^;]+;\n?/g, "");
  
  // Clean up multiple blank lines
  content = content.replace(/\n{3,}/g, "\n\n");
  
  writeFileSync(filePath, content);
  fixed++;
}

console.log(`Fixed ${fixed} coding-interviews diagram files`);

// Also fix the registry for global-illumination and real-time-rendering-4e
const registryPath = join(ROOT, "src/components/mdx/chapter-component-registry.ts");
let registry = readFileSync(registryPath, "utf8");

// Remove entries that reference non-existent modules
const lines = registry.split("\n");
const outputLines = [];
let i = 0;
let removed = 0;

while (i < lines.length) {
  const line = lines[i];
  const entryStartMatch = line.match(/^\s*"([^"]+)":\s*(async\s*\(\)\s*=>\s*\{|$)/);
  
  if (entryStartMatch) {
    const entryLines = [line];
    let braceDepth = 0;
    let started = false;
    let j = i;
    
    for (; j < lines.length; j++) {
      if (j > i) entryLines.push(lines[j]);
      for (const ch of lines[j]) {
        if (ch === '{') { braceDepth++; started = true; }
        if (ch === '}') braceDepth--;
      }
      if (started && braceDepth <= 0) break;
    }
    
    const entryText = entryLines.join("\n");
    const importMatch = entryText.match(/import\("@\/components\/mdx\/([^"]+)"\)/);
    
    if (importMatch) {
      const importPath = importMatch[1];
      const filePath = join(ROOT, "src/components/mdx", importPath + ".tsx");
      if (!existsSync(filePath)) {
        removed++;
        i = j + 1;
        continue;
      }
    }
    
    outputLines.push(...entryLines);
    i = j + 1;
  } else {
    outputLines.push(line);
    i++;
  }
}

writeFileSync(registryPath, outputLines.join("\n"));
console.log(`Registry: removed ${removed} more entries`);
