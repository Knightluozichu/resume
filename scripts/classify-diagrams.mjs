import { readFileSync, writeFileSync } from "fs";

const files = readFileSync("/tmp/all_diagrams.txt", "utf8").trim().split("\n");

const categories = {
  officialLab: [],    // Uses shared OfficialLab component (text card)
  svgTextOnly: [],    // SVG with only text elements (text card)
  svgReal: [],        // SVG with real visual elements (lines, paths, shapes)
  other: [],          // Other patterns
};

for (const file of files) {
  const content = readFileSync(file, "utf8");
  
  // Category 1: Uses OfficialLab or similar shared lab component
  if (/OfficialLab|official-lab|official-.*-lab/.test(content) && !/<svg|viewBox/.test(content)) {
    categories.officialLab.push(file);
    continue;
  }
  
  // Category 2 & 3: SVG-based
  if (/<svg|viewBox/.test(content)) {
    // Check for real visual elements (not just text and rect-as-card)
    const hasLine = /<line[\s>]/.test(content);
    const hasPath = /<path[\s>]/.test(content);
    const hasCircle = /<circle[\s>]/.test(content);
    const hasEllipse = /<ellipse[\s>]/.test(content);
    const hasPolygon = /<polygon[\s>]/.test(content);
    const hasPolyline = /<polyline[\s>]/.test(content);
    const hasMarker = /marker-end|marker-start|<marker/.test(content);
    const hasArrow = /arrow|Arrow/.test(content);
    
    // Rect alone might be a card background, but if combined with lines/paths it's a real diagram
    const hasRect = /<rect[\s>]/.test(content);
    
    // A "real" diagram has connecting elements (lines, paths, arrows)
    const hasConnections = hasLine || hasPath || hasCircle || hasEllipse || hasPolygon || hasPolyline || hasMarker || hasArrow;
    
    if (hasConnections) {
      categories.svgReal.push(file);
    } else {
      // Only has text and maybe rect (card backgrounds) - it's a text card
      categories.svgTextOnly.push(file);
    }
    continue;
  }
  
  // Category 4: Everything else
  categories.other.push(file);
}

console.log("=== Diagram Classification ===");
console.log(`OfficialLab (text card): ${categories.officialLab.length}`);
console.log(`SVG text-only (text card): ${categories.svgTextOnly.length}`);
console.log(`SVG real diagram: ${categories.svgReal.length}`);
console.log(`Other: ${categories.other.length}`);
console.log(`Total: ${files.length}`);

// Show books affected by text cards
const textCardFiles = [...categories.officialLab, ...categories.svgTextOnly];
const books = new Set(textCardFiles.map(f => f.split("/")[2]));
console.log(`\nBooks with text-card diagrams: ${books.size}`);

// Show sample of "other" to understand what they are
console.log("\n=== Sample 'other' files ===");
for (const f of categories.other.slice(0, 10)) {
  console.log(f);
}

// Show sample of svgTextOnly
console.log("\n=== Sample SVG text-only files ===");
for (const f of categories.svgTextOnly.slice(0, 10)) {
  console.log(f);
}

writeFileSync("/tmp/diagram_classification.json", JSON.stringify(categories, null, 2));
