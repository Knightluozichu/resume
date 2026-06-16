import { readFileSync, writeFileSync } from "fs";
import { globSync } from "fs";

// Simple glob since we can't rely on external packages
import { execSync } from "child_process";
const files = execSync("find content/big-nerd-ranch-guide -name '*.mdx'")
  .toString().trim().split("\n").filter(Boolean);

let total = 0;

for (const path of files) {
  let text = readFileSync(path, "utf8");
  const orig = text;

  // Fix 1: Replace inner ASCII double quotes in Term def="" attributes
  // Match: def="TEXT">  where TEXT may contain " characters used as Chinese quotes
  text = text.replace(/<Term\s+def="([^"]*(?:""[^"]*)*)">/g, (match, content) => {
    // Find the closing quote position - look for last " before >
    const lastQuote = content.lastIndexOf('"');
    if (lastQuote === -1) return match; // No inner quotes
    
    const inner = content.substring(0, lastQuote);
    const closing = content.substring(lastQuote + 1); // after the closing quote
    
    if (inner.indexOf('"') === -1) return match; // No inner quotes to fix
    
    // Replace inner "text" pairs with guillemets
    const fixed = inner.replace(/"([^"]+?)"/g, '\u00AB$1\u00BB');
    return `<Term def="${fixed}"${closing ? ' ' + closing : ''}>`;
  });

  // Fix 2: < character followed by Chinese text that looks like a tag
  // e.g. (<10ms), <br/>, <uses-permission .../>
  // Already handled by code blocks being in ``` fences

  if (text !== orig) {
    writeFileSync(path, text);
    total++;
    console.log("fix:", path.split("/").slice(-2).join("/"));
  }
}

console.log("Total fixed:", total);
