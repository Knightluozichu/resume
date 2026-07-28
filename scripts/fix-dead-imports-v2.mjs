/**
 * Precisely fix files that import deleted modules.
 * Uses brace-counting to remove only the exact export functions that reference deleted imports.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync } from "fs";
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

/**
 * Remove an export function by name from content using brace counting.
 * Returns the content with the function removed.
 */
function removeExportFunction(content, funcName) {
  // Find "export function FuncName"
  const patterns = [
    `export function ${funcName}(`,
    `export function ${funcName} (`,
  ];
  
  let startIdx = -1;
  for (const pat of patterns) {
    startIdx = content.indexOf(pat);
    if (startIdx !== -1) break;
  }
  if (startIdx === -1) return content;
  
  // Find the opening brace of the function body
  let braceStart = content.indexOf("{", startIdx);
  if (braceStart === -1) return content;
  
  // Count braces to find the end
  let depth = 0;
  let endIdx = braceStart;
  for (let i = braceStart; i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }
  
  // Include trailing newline
  let removeEnd = endIdx + 1;
  while (removeEnd < content.length && (content[removeEnd] === "\n" || content[removeEnd] === "\r")) {
    removeEnd++;
  }
  
  // Also remove leading whitespace/newlines before the function
  let removeStart = startIdx;
  while (removeStart > 0 && (content[removeStart - 1] === "\n" || content[removeStart - 1] === "\r" || content[removeStart - 1] === " " || content[removeStart - 1] === "\t")) {
    removeStart--;
  }
  // Keep one newline
  if (removeStart > 0) removeStart++;
  
  return content.slice(0, removeStart) + content.slice(removeEnd);
}

/**
 * Remove a const declaration (like `const officialCases = [...]`)
 */
function removeConstDeclaration(content, constName) {
  const pattern = `const ${constName}`;
  let startIdx = content.indexOf(pattern);
  if (startIdx === -1) return content;
  
  // Make sure it's at the start of a line (or after whitespace)
  // Find the end - could be array [...], object {...}, or simple value
  let i = content.indexOf("=", startIdx);
  if (i === -1) return content;
  i++; // skip =
  
  // Skip whitespace
  while (i < content.length && /\s/.test(content[i])) i++;
  
  let endIdx;
  if (content[i] === "[") {
    // Array - count brackets
    let depth = 0;
    for (let j = i; j < content.length; j++) {
      if (content[j] === "[") depth++;
      else if (content[j] === "]") { depth--; if (depth === 0) { endIdx = j; break; } }
    }
  } else if (content[i] === "{") {
    // Object - count braces
    let depth = 0;
    for (let j = i; j < content.length; j++) {
      if (content[j] === "{") depth++;
      else if (content[j] === "}") { depth--; if (depth === 0) { endIdx = j; break; } }
    }
  } else {
    // Simple value - find semicolon or newline
    endIdx = content.indexOf(";", i);
    if (endIdx === -1) endIdx = content.indexOf("\n", i);
  }
  
  if (endIdx === undefined) return content;
  
  // Check for "as const" after the closing bracket
  let removeEnd = endIdx + 1;
  const after = content.slice(removeEnd, removeEnd + 20);
  if (after.match(/^\s*as\s+const/)) {
    const asConstEnd = content.indexOf(";", removeEnd);
    if (asConstEnd !== -1 && asConstEnd - removeEnd < 20) removeEnd = asConstEnd + 1;
  } else if (content[removeEnd] === ";") {
    removeEnd++;
  }
  
  // Include trailing newlines
  while (removeEnd < content.length && (content[removeEnd] === "\n" || content[removeEnd] === "\r")) {
    removeEnd++;
  }
  
  // Remove leading whitespace
  let removeStart = startIdx;
  while (removeStart > 0 && (content[removeStart - 1] === "\n" || content[removeStart - 1] === " " || content[removeStart - 1] === "\t")) {
    removeStart--;
  }
  if (removeStart > 0) removeStart++;
  
  return content.slice(0, removeStart) + content.slice(removeEnd);
}

// Process all tsx files
const allTsx = findFiles(MDX_DIR, ".tsx");
let fixedCount = 0;
let deletedCount = 0;

for (const file of allTsx) {
  let content = readFileSync(file, "utf8");
  let modified = false;
  
  // Find relative imports that reference non-existent files
  const importRegex = /import\s*\{([^}]*)\}\s*from\s*"(\.[^"]+)";?\n?/g;
  let match;
  const deadImports = [];
  
  while ((match = importRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const importedNames = match[1].split(",").map(s => s.trim()).filter(Boolean);
    const relPath = match[2];
    
    const dir = dirname(file);
    const resolvedPath = resolve(dir, relPath);
    const exists = existsSync(resolvedPath + ".tsx") || existsSync(resolvedPath + ".ts") || 
                   existsSync(resolvedPath + "/index.tsx") || existsSync(resolvedPath + "/index.ts");
    
    if (!exists) {
      deadImports.push({ fullMatch, importedNames });
    }
  }
  
  if (deadImports.length === 0) continue;
  
  // Remove dead imports
  for (const { fullMatch, importedNames } of deadImports) {
    content = content.replace(fullMatch, "");
    modified = true;
    
    // Find and remove export functions that reference these imported names
    for (const name of importedNames) {
      // Find all export functions that use this name in their body
      const funcPattern = /export\s+function\s+(\w+)/g;
      let funcMatch;
      const funcsToRemove = [];
      
      while ((funcMatch = funcPattern.exec(content)) !== null) {
        const funcName = funcMatch[1];
        const funcStart = funcMatch.index;
        // Get function body (find matching brace)
        const braceStart = content.indexOf("{", funcStart);
        if (braceStart === -1) continue;
        let depth = 0;
        let funcEnd = braceStart;
        for (let i = braceStart; i < content.length; i++) {
          if (content[i] === "{") depth++;
          else if (content[i] === "}") { depth--; if (depth === 0) { funcEnd = i; break; } }
        }
        const funcBody = content.slice(funcStart, funcEnd + 1);
        if (funcBody.includes(name)) {
          funcsToRemove.push(funcName);
        }
      }
      
      for (const funcName of funcsToRemove) {
        content = removeExportFunction(content, funcName);
      }
      
      // Also remove const declarations that reference this name (like officialCases)
      // Find consts that are only used by the removed functions
      const constPattern = /const\s+(\w+)\s*=/g;
      let constMatch;
      const constsToCheck = [];
      while ((constMatch = constPattern.exec(content)) !== null) {
        constsToCheck.push(constMatch[1]);
      }
      
      for (const constName of constsToCheck) {
        // Check if this const is still referenced anywhere in the remaining content
        const usageRegex = new RegExp(`\\b${constName}\\b`, "g");
        const usages = content.match(usageRegex);
        // If only 1 usage (the declaration itself), remove it
        if (usages && usages.length <= 1) {
          content = removeConstDeclaration(content, constName);
        }
      }
    }
  }
  
  if (modified) {
    // Clean up multiple blank lines
    content = content.replace(/\n{3,}/g, "\n\n");
    
    // Check if file still has exports
    if (!/export\s+(function|const|type|interface|default)/.test(content)) {
      unlinkSync(file);
      deletedCount++;
    } else {
      writeFileSync(file, content);
      fixedCount++;
    }
  }
}

console.log(`Fixed: ${fixedCount}, Deleted (no exports left): ${deletedCount}`);
