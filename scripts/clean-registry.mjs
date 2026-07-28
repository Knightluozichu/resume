/**
 * Clean chapter-component-registry.ts:
 * Remove entries that import from deleted text-card diagram files.
 * For entries importing from surviving files, remove exports that no longer exist.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = "/Users/luozichu/Repositories/learn/remuse";
const registryPath = join(ROOT, "src/components/mdx/chapter-component-registry.ts");

let content = readFileSync(registryPath, "utf8");

// Parse all loader entries
// Pattern: "chapter/path": async () => { ... import("...") ... return { ... } },
// We need to find each entry and check if the imported file exists

const lines = content.split("\n");
const outputLines = [];
let i = 0;
let removedEntries = 0;
let keptEntries = 0;

while (i < lines.length) {
  const line = lines[i];
  
  // Detect start of a loader entry: a key like "book/chapter/page": async () => {
  // or "book/chapter/page":\n    async () => {
  const entryStartMatch = line.match(/^\s*"([^"]+)":\s*(async\s*\(\)\s*=>\s*\{|$)/);
  
  if (entryStartMatch) {
    // Collect the entire entry (until we find the closing },)
    const entryLines = [line];
    let braceDepth = 0;
    let started = false;
    let j = i;
    
    // Count braces to find the end of this entry
    for (; j < lines.length; j++) {
      if (j > i) entryLines.push(lines[j]);
      for (const ch of lines[j]) {
        if (ch === '{') { braceDepth++; started = true; }
        if (ch === '}') braceDepth--;
      }
      if (started && braceDepth <= 0) break;
    }
    
    const entryText = entryLines.join("\n");
    
    // Extract the import path
    const importMatch = entryText.match(/import\("@\/components\/mdx\/([^"]+)"\)/);
    
    if (importMatch) {
      const importPath = importMatch[1]; // e.g. "advanced-algorithm-engineering/diagrams/introduction"
      const filePath = join(ROOT, "src/components/mdx", importPath + ".tsx");
      
      if (!existsSync(filePath)) {
        // File deleted - skip this entry entirely
        removedEntries++;
        i = j + 1;
        continue;
      } else {
        // File exists - check which exports still exist
        const fileContent = readFileSync(filePath, "utf8");
        
        // Find all module0.XXX references in the entry
        const exportRefs = entryText.matchAll(/module\d+\.(\w+)/g);
        let hasInvalidExport = false;
        const invalidExports = [];
        
        for (const ref of exportRefs) {
          const exportName = ref[1];
          // Check if this export exists in the file
          if (!fileContent.includes(`export function ${exportName}`) && 
              !fileContent.includes(`export const ${exportName}`)) {
            hasInvalidExport = true;
            invalidExports.push(exportName);
          }
        }
        
        if (hasInvalidExport) {
          // Remove lines with invalid exports from the entry
          const filteredEntryLines = entryLines.filter(line => {
            for (const exp of invalidExports) {
              if (line.includes(`.${exp}`) || line.includes(`${exp}:`)) return false;
            }
            return true;
          });
          outputLines.push(...filteredEntryLines);
        } else {
          outputLines.push(...entryLines);
        }
        keptEntries++;
      }
    } else {
      // No import found, keep as-is
      outputLines.push(...entryLines);
      keptEntries++;
    }
    
    i = j + 1;
  } else {
    outputLines.push(line);
    i++;
  }
}

const result = outputLines.join("\n");
writeFileSync(registryPath, result);

console.log(`Registry cleaned:`);
console.log(`  Removed entries: ${removedEntries}`);
console.log(`  Kept entries: ${keptEntries}`);
console.log(`  Original lines: ${lines.length}`);
console.log(`  New lines: ${outputLines.length}`);
