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
  while (i < lines.length) {
    const t = lines[i].trim();
    // 情况1: 单行开标签 <Term def="...">
    if (/^<Term def="[^"]*">$/.test(t)) {
      let j = i + 1; const textLines = []; let closeLine = null;
      while (j < lines.length) {
        const tt = lines[j];
        if (tt.trim().startsWith('</Term>')) { closeLine = tt; break; }
        if (tt.includes('<')) { closeLine = null; break; }
        textLines.push(tt.trim()); j++;
      }
      if (closeLine) {
        const punct = closeLine.trim().replace('</Term>', '');
        out.push(t + textLines.join('') + '</Term>' + punct);
        collapsed++; i = j + 1; continue;
      }
    }
    // 情况2: 多行开标签 <Term 独占一行
    if (t === '<Term') {
      let j = i + 1; const openParts = ['<Term']; let openEnd = -1;
      while (j < lines.length) {
        const tt = lines[j].trim();
        openParts.push(tt);
        if (tt === '>' || tt.endsWith('>')) { openEnd = j; break; }
        j++;
      }
      if (openEnd > 0) {
        // 收集文本直到 </Term>
        let k = openEnd + 1; const textLines = []; let closeLine = null;
        while (k < lines.length) {
          const tt = lines[k];
          if (tt.trim().startsWith('</Term>')) { closeLine = tt; break; }
          if (tt.includes('<')) { closeLine = null; break; }
          textLines.push(tt.trim()); k++;
        }
        if (closeLine) {
          const openTag = openParts.join(' ').replace(/\s+>/, '>').replace(/>\s+/, '>');
          const punct = closeLine.trim().replace('</Term>', '');
          out.push(openTag + textLines.join('') + '</Term>' + punct);
          collapsed++; i = k + 1; continue;
        }
      }
    }
    out.push(lines[i]); i++;
  }
  if (collapsed > 0) fs.writeFileSync(fp, out.join('\n'), 'utf8');
  return collapsed;
}
const files = walk('content');
let total = 0, filesChanged = 0;
for (const fp of files) { const c = collapseFile(fp); if (c > 0) { total += c; filesChanged++; } }
console.log(`v2折叠Term: ${total} 个, 涉及 ${filesChanged} 文件`);
