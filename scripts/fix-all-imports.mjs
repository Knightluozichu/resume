/**
 * Comprehensive fix: scan ALL surviving .tsx files under src/components/mdx/
 * Remove imports referencing deleted modules and exports that depend on them.
 * Then re-clean the registry.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";

const ROOT = "/Users/luozichu/Repositories/learn/remuse";
const MDX_DIR = join(ROOT, "src/components/mdx");

function findFiles(dir, ext) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(full, ext));
    else if (entry.name.endsWith(ext)) results.push(full);
  }
  return results;
}

// Step 1: Fix all surviving tsx files that import deleted modules
console.log("=== Step 1: Fix surviving tsx files ===");
const allTsx = findFiles(MDX_DIR, ".tsx");
let fixedFiles = 0;

for (const file of allTsx) {
  let content = readFileSync(file, "utf8");
  let modified = false;
  
  // Find all relative imports
  const importRegex = /import\s*\{([^}]*)\}\s*from\s*"(\.[^"]+)";?\n?/g;
  let match;
  const importsToRemove = [];
  
  while ((match = importRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const importedNames = match[1].split(",").map(s => s.trim()).filter(Boolean);
    const relPath = match[2];
    
    // Resolve the import path
    const dir = dirname(file);
    let resolvedPath = resolve(dir, relPath);
    
    // Check if file exists (with .tsx or .ts extension)
    const exists = existsSync(resolvedPath + ".tsx") || existsSync(resolvedPath + ".ts") || existsSync(resolvedPath + "/index.tsx") || existsSync(resolvedPath + "/index.ts");
    
    if (!exists) {
      importsToRemove.push({ fullMatch, importedNames });
    }
  }
  
  if (importsToRemove.length === 0) continue;
  
  // Remove dead imports and their dependent exports
  for (const { fullMatch, importedNames } of importsToRemove) {
    content = content.replace(fullMatch, "");
    
    // Remove exported functions that use any of the imported names
    for (const name of importedNames) {
      // Remove single-line: export function X() { return <Name .../>; }
      const singleLine = new RegExp("export function \\w+\\([^)]*\\)\\s*\\{[^}]*" + name + "[^}]*\\}\\n?", "g");
      content = content.replace(singleLine, "");
      
      // Remove multi-line export functions that reference this name
      // Pattern: export function Xxx() {\n  return (\n    <Name .../>\n  );\n}
      const multiLine = new RegExp("export function \\w+\\([^)]*\\)\\s*\\{[\\s\\S]*?" + name + "[\\s\\S]*?\\n\\}\\n?", "g");
      content = content.replace(multiLine, "");
      
      // Remove type references
      const typeRef = new RegExp("export type \\{[^}]*" + name + "[^}]*\\}[^;]*;\\n?", "g");
      content = content.replace(typeRef, "");
    }
    
    modified = true;
  }
  
  if (modified) {
    // Clean up multiple blank lines
    content = content.replace(/\n{3,}/g, "\n\n");
    // If file is now essentially empty (no exports), mark for deletion
    if (!/export\s+(function|const|type|interface)/.test(content)) {
      // File has no exports left - delete it
      const { unlinkSync } = await import("fs");
      unlinkSync(file);
      fixedFiles++;
    } else {
      writeFileSync(file, content);
      fixedFiles++;
    }
  }
}

console.log(`Fixed/deleted ${fixedFiles} files`);

// Step 2: Re-clean registry
console.log("\n=== Step 2: Re-cleaning registry ===");
const registryPath = join(MDX_DIR, "chapter-component-registry.ts");
let registry = readFileSync(registryPath, "utf8");

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
    
    // Check ALL imports in this entry
    const allImports = [...entryText.matchAll(/import\("@\/components\/mdx\/([^"]+)"\)/g)];
    let allExist = true;
    
    for (const imp of allImports) {
      const importPath = imp[1];
      const filePath = join(MDX_DIR, importPath + ".tsx");
      const filePathTs = join(MDX_DIR, importPath + ".ts");
      if (!existsSync(filePath) && !existsSync(filePathTs)) {
        allExist = false;
        break;
      }
    }
    
    if (!allExist) {
      removed++;
      i = j + 1;
      continue;
    }
    
    // Also verify exports still exist in the target files
    let hasInvalidExport = false;
    for (const imp of allImports) {
      const importPath = imp[1];
      const filePath = join(MDX_DIR, importPath + ".tsx");
      if (!existsSync(filePath)) continue;
      const fileContent = readFileSync(filePath, "utf8");
      
      // Find module references for this import
      const moduleNum = entryText.indexOf(imp[0]) > -1 ? 
        entryText.slice(0, entryText.indexOf(imp[0])).match(/module(\d+)\s*=/g)?.length || 0 : 0;
      
      const exportRefs = [...entryText.matchAll(new RegExp("module\\d+\\.(\\w+)", "g"))];
      for (const ref of exportRefs) {
        const exportName = ref[1];
        if (!fileContent.includes(`export function ${exportName}`) && 
            !fileContent.includes(`export const ${exportName}`) &&
            !fileContent.includes(`export type ${exportName}`)) {
          hasInvalidExport = true;
          break;
        }
      }
      if (hasInvalidExport) break;
    }
    
    if (hasInvalidExport) {
      removed++;
      i = j + 1;
      continue;
    }
    
    outputLines.push(...entryLines);
    i = j + 1;
  } else {
    outputLines.push(line);
    i++;
  }
}

writeFileSync(registryPath, outputLines.join("\n"));
console.log(`Registry: removed ${removed} entries, kept ${outputLines.length} lines`);
