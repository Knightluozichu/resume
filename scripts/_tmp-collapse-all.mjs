import fs from 'fs';
import path from 'path';
function walk(dir, out=[]) {
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    const p=path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.mdx')) out.push(p);
  }
  return out;
}
function collapseFile(fp) {
  const src = fs.readFileSync(fp, 'utf8');
  const lines = src.split('\n');
  const out = [];
  let i = 0, collapsed = 0;
  const openRe = /^<Term def="[^"]*">$/;
  while (i < lines.length) {
    const line = lines[i];
    if (openRe.test(line.trim())) {
      let j = i + 1;
      const textLines = [];
      let closeLine = null;
      while (j < lines.length) {
        const t = lines[j];
        if (t.trim().startsWith('</Term>')) { closeLine = t; break; }
        if (t.includes('<')) { closeLine = null; break; }
        textLines.push(t.trim());
        j++;
      }
      if (closeLine) {
        const punct = closeLine.trim().replace('</Term>', '');
        out.push(line.trim() + textLines.join('') + '</Term>' + punct);
        collapsed++;
        i = j + 1;
        continue;
      }
    }
    out.push(line);
    i++;
  }
  if (collapsed > 0) fs.writeFileSync(fp, out.join('\n'), 'utf8');
  return collapsed;
}
const files = walk('content');
let total = 0, filesChanged = 0;
for (const fp of files) {
  const c = collapseFile(fp);
  if (c > 0) { total += c; filesChanged++; }
}
console.log(`折叠多行Term: ${total} 个, 涉及 ${filesChanged} 文件`);
