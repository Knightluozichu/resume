/**
 * 批量删除文字卡图组件 + 上架所有书籍
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync, readdirSync, rmdirSync } from "fs";
import { join } from "path";

const ROOT = "/Users/luozichu/Repositories/learn/remuse";

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

// ============ Step 1: Classify all diagram files ============
console.log("=== Step 1: Classifying diagram files ===");

const diagramsDir = join(ROOT, "src/components/mdx");
const allDiagramFiles = findFiles(diagramsDir, ".tsx").filter(f => f.includes("/diagrams/"));

const textCardFiles = [];
const realDiagramFiles = [];

for (const file of allDiagramFiles) {
  const content = readFileSync(file, "utf8");
  const hasLine = /<line[\s>]/.test(content);
  const hasRealPath = /<path[\s\S]*?d=/.test(content);
  const hasCircle = /<circle[\s>]/.test(content);
  const hasEllipse = /<ellipse[\s>]/.test(content);
  const hasPolygon = /<polygon[\s>]/.test(content);
  const hasPolyline = /<polyline[\s>]/.test(content);
  const hasMarker = /marker-end|marker-start|<marker/.test(content);
  const hasArrow = /arrow|Arrow/.test(content);
  const hasRealVisual = hasLine || hasRealPath || hasCircle || hasEllipse || hasPolygon || hasPolyline || hasMarker || hasArrow;
  if (hasRealVisual) {
    realDiagramFiles.push(file);
  } else {
    textCardFiles.push(file);
  }
}

console.log(`Text card files (to delete): ${textCardFiles.length}`);
console.log(`Real diagram files (to keep): ${realDiagramFiles.length}`);

// ============ Step 2: Build export map ============
console.log("\n=== Step 2: Building export map ===");

const textCardExports = new Map();

for (const file of textCardFiles) {
  const content = readFileSync(file, "utf8");
  const relPath = file.replace(join(ROOT, "src/components/mdx/"), "").replace(/\.tsx$/, "");
  const exportNames = [];
  for (const m of content.matchAll(/export\s+function\s+(\w+)/g)) exportNames.push(m[1]);
  for (const m of content.matchAll(/export\s+const\s+(\w+)/g)) exportNames.push(m[1]);
  if (exportNames.length > 0) textCardExports.set(relPath, exportNames);
}

// Check real diagram files for mixed exports (Lab = text card within real diagram file)
const mixedFileTextCardExports = new Map();

for (const file of realDiagramFiles) {
  const content = readFileSync(file, "utf8");
  const relPath = file.replace(join(ROOT, "src/components/mdx/"), "").replace(/\.tsx$/, "");
  const labExports = [];
  for (const m of content.matchAll(/export\s+function\s+(\w+)/g)) {
    const name = m[1];
    const funcStart = content.indexOf(m[0]);
    const funcBody = content.slice(funcStart, funcStart + 500);
    if (/OfficialCaseLab|OfficialLab|CaseLab/.test(funcBody) && !/<svg|viewBox/.test(funcBody)) {
      labExports.push(name);
    }
  }
  if (labExports.length > 0) mixedFileTextCardExports.set(relPath, labExports);
}

console.log(`Pure text card files: ${textCardExports.size}`);
console.log(`Mixed files with text card exports: ${mixedFileTextCardExports.size}`);

// ============ Step 3: Process MDX files ============
console.log("\n=== Step 3: Processing MDX files ===");

const contentDir = join(ROOT, "content");
const allMdxFiles = findFiles(contentDir, ".mdx");
console.log(`Total MDX files: ${allMdxFiles.length}`);

let mdxModified = 0;
let importsRemoved = 0;
let usagesRemoved = 0;

const importRegex = /import\s*\{([^}]+)\}\s*from\s*"@\/components\/mdx\/([^"]+\/diagrams\/[^"]+)";?\n?/g;
const multiBlankRegex = new RegExp("\\n{4,}", "g");

for (const mdxFile of allMdxFiles) {
  let content = readFileSync(mdxFile, "utf8");
  let modified = false;

  const importsToProcess = [];
  let match;
  importRegex.lastIndex = 0;
  while ((match = importRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const importedNames = match[1].split(",").map(s => s.trim()).filter(Boolean);
    const importPath = match[2];

    let namesToRemove = [];
    if (textCardExports.has(importPath)) {
      namesToRemove = importedNames;
    } else if (mixedFileTextCardExports.has(importPath)) {
      const textCardNames = mixedFileTextCardExports.get(importPath);
      namesToRemove = importedNames.filter(n => textCardNames.includes(n));
    }
    if (namesToRemove.length > 0) {
      importsToProcess.push({ fullMatch, importedNames, namesToRemove, importPath });
    }
  }

  if (importsToProcess.length === 0) continue;

  for (const { fullMatch, importedNames, namesToRemove, importPath } of importsToProcess) {
    const namesToKeep = importedNames.filter(n => !namesToRemove.includes(n));

    if (namesToKeep.length === 0) {
      content = content.replace(fullMatch, "");
      importsRemoved++;
    } else {
      const newImport = `import { ${namesToKeep.join(", ")} } from "@/components/mdx/${importPath}";\n`;
      content = content.replace(fullMatch, newImport);
    }

    for (const name of namesToRemove) {
      // Self-closing: <Name /> or <Name prop="..." />
      const selfClosing = new RegExp("[ \\t]*<" + name + "\\b[^>]*/>\\n?", "g");
      const before1 = content.length;
      content = content.replace(selfClosing, "");
      if (content.length !== before1) usagesRemoved++;

      // Open/close: <Name>...</Name> or <Name prop>...</Name>
      const openClose = new RegExp("[ \\t]*<" + name + "\\b[^>]*>[\\s\\S]*?</" + name + ">\\n?", "g");
      const before2 = content.length;
      content = content.replace(openClose, "");
      if (content.length !== before2) usagesRemoved++;
    }
    modified = true;
  }

  if (modified) {
    content = content.replace(multiBlankRegex, "\n\n\n");
    writeFileSync(mdxFile, content);
    mdxModified++;
  }
}

console.log(`MDX files modified: ${mdxModified}`);
console.log(`Import lines removed: ${importsRemoved}`);
console.log(`JSX usages removed: ${usagesRemoved}`);

// ============ Step 4: Delete text card component files ============
console.log("\n=== Step 4: Deleting text card files ===");

let deleted = 0;
for (const file of textCardFiles) {
  try {
    unlinkSync(file);
    deleted++;
  } catch (e) {
    console.error(`Failed to delete: ${file}`, e.message);
  }
}
console.log(`Deleted ${deleted} text card files`);

// Clean up empty diagrams directories
const bookDirs = readdirSync(diagramsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => join(diagramsDir, d.name));

let emptyDirsRemoved = 0;
for (const bookDir of bookDirs) {
  const diagramsSubDir = join(bookDir, "diagrams");
  if (existsSync(diagramsSubDir)) {
    const remaining = readdirSync(diagramsSubDir);
    if (remaining.length === 0) {
      rmdirSync(diagramsSubDir);
      emptyDirsRemoved++;
    }
  }
}
console.log(`Empty diagrams dirs removed: ${emptyDirsRemoved}`);

// ============ Step 5: Undraft all books ============
console.log("\n=== Step 5: Undrafting all books ===");

let undrafted = 0;
for (const mdxFile of allMdxFiles) {
  let content = readFileSync(mdxFile, "utf8");
  if (/^draft:\s*true/m.test(content)) {
    content = content.replace(/^draft:\s*true/m, "draft: false");
    writeFileSync(mdxFile, content);
    undrafted++;
  }
}
console.log(`Undrafted ${undrafted} MDX files`);

// ============ Summary ============
console.log("\n=== SUMMARY ===");
console.log(`Text card files deleted: ${deleted}`);
console.log(`Real diagram files kept: ${realDiagramFiles.length}`);
console.log(`MDX files cleaned: ${mdxModified}`);
console.log(`Books undrafted: ${undrafted}`);
