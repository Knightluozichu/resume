const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { join } = require("path");

const ciDir = "src/components/mdx/coding-interviews/diagrams";
const files = readdirSync(ciDir).filter(f => f.endsWith(".tsx"));
let fixed = 0;

for (const file of files) {
  const filePath = join(ciDir, file);
  let content = readFileSync(filePath, "utf8");
  if (!content.includes("CodingInterviewLab")) continue;

  // Remove export functions that reference CodingInterviewLab
  let changed = true;
  while (changed) {
    changed = false;
    const funcRegex = /export\s+function\s+(\w+)/g;
    let m;
    while ((m = funcRegex.exec(content)) !== null) {
      const funcStart = m.index;
      const braceStart = content.indexOf("{", funcStart);
      if (braceStart === -1) continue;
      let depth = 0, funcEnd = braceStart;
      for (let i = braceStart; i < content.length; i++) {
        if (content[i] === "{") depth++;
        else if (content[i] === "}") { depth--; if (depth === 0) { funcEnd = i; break; } }
      }
      const funcBody = content.slice(funcStart, funcEnd + 1);
      if (funcBody.includes("CodingInterviewLab")) {
        let removeStart = funcStart;
        while (removeStart > 0 && (content[removeStart - 1] === "\n" || content[removeStart - 1] === " " || content[removeStart - 1] === "\t")) removeStart--;
        if (removeStart > 0) removeStart++;
        let removeEnd = funcEnd + 1;
        while (removeEnd < content.length && content[removeEnd] === "\n") removeEnd++;
        content = content.slice(0, removeStart) + content.slice(removeEnd);
        changed = true;
        break;
      }
    }
  }

  // Remove orphaned const declarations no longer referenced
  const constRegex = /const\s+(\w+)\s*=/g;
  let cm;
  const constsToRemove = [];
  while ((cm = constRegex.exec(content)) !== null) {
    const name = cm[1];
    const allOccurrences = content.split(name).length - 1;
    if (allOccurrences <= 1) constsToRemove.push(name);
  }

  for (const constName of constsToRemove) {
    const declIdx = content.indexOf("const " + constName);
    if (declIdx === -1) continue;
    let i = content.indexOf("=", declIdx);
    if (i === -1) continue;
    i++;
    while (i < content.length && /\s/.test(content[i])) i++;
    let endIdx = i;
    if (content[i] === "[") {
      let d = 0;
      for (let j = i; j < content.length; j++) {
        if (content[j] === "[") d++;
        else if (content[j] === "]") { d--; if (d === 0) { endIdx = j; break; } }
      }
    } else if (content[i] === "{") {
      let d = 0;
      for (let j = i; j < content.length; j++) {
        if (content[j] === "{") d++;
        else if (content[j] === "}") { d--; if (d === 0) { endIdx = j; break; } }
      }
    } else {
      endIdx = content.indexOf(";", i);
      if (endIdx === -1) endIdx = content.indexOf("\n", i);
    }
    let removeEnd = endIdx + 1;
    const after = content.slice(removeEnd, removeEnd + 15);
    if (/^\s*as\s+const/.test(after)) {
      const sc = content.indexOf(";", removeEnd);
      if (sc !== -1 && sc - removeEnd < 15) removeEnd = sc + 1;
    } else if (content[removeEnd] === ";") {
      removeEnd++;
    }
    while (removeEnd < content.length && content[removeEnd] === "\n") removeEnd++;
    let removeStart = declIdx;
    while (removeStart > 0 && (content[removeStart - 1] === "\n" || content[removeStart - 1] === " ")) removeStart--;
    if (removeStart > 0) removeStart++;
    content = content.slice(0, removeStart) + content.slice(removeEnd);
  }

  content = content.replace(/\n{3,}/g, "\n\n");
  writeFileSync(filePath, content);
  fixed++;
}

console.log("Fixed " + fixed + " coding-interviews files");
