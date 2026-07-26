import fs from 'fs';
import { execSync } from 'child_process';
const files = execSync('find src/components/mdx -path "*/diagrams/*.tsx"', {encoding:'utf8'}).trim().split('\n').filter(Boolean);
let total=0, filesChanged=0;
for (const fp of files) {
  let src = fs.readFileSync(fp, 'utf8');
  let changed = false;
  const out = src.replace(/fontSize="([0-9]+(?:\.[0-9]+)?)"/g, (m, size) => {
    const n = parseFloat(size);
    if (n < 11) { changed = true; total++; return 'fontSize="11"'; }
    return m;
  });
  if (changed) { fs.writeFileSync(fp, out, 'utf8'); filesChanged++; }
}
console.log(`字号<11 已提升到11: ${total} 处, 涉及 ${filesChanged} 文件`);
