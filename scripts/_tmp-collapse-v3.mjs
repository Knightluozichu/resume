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
const PUNCT = '、，,。；;：:！？!?…';
function collapseFile(fp) {
  const src = fs.readFileSync(fp, 'utf8');
  const lines = src.split('\n');
  const out = [];
  let i = 0, changed = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    // 检测 Term 开标签行（非闭合、非已含闭合的单行Term）
    if (/^<Term\b/.test(t) && !t.startsWith('</Term>') && !t.includes('</Term>')) {
      // 收集开标签（可能跨行）
      let j = i; const openParts = [];
      let openComplete = false;
      while (j < lines.length) {
        openParts.push(lines[j].trim());
        if (lines[j].trim().endsWith('>')) { openComplete = true; break; }
        j++;
      }
      if (openComplete) {
        // 收集文本直到 </Term>
        let k = j + 1; const textLines = []; let closeLine = null;
        while (k < lines.length) {
          const tt = lines[k];
          if (tt.trim().startsWith('</Term>')) { closeLine = tt; break; }
          if (tt.includes('<')) { closeLine = null; break; }
          textLines.push(tt.trim()); k++;
        }
        if (closeLine) {
          let openTag = openParts.join(' ');
          openTag = openTag.replace(/\s*>\s*$/, '>');
          let punct = closeLine.trim().replace('</Term>', '');
          out.push(openTag + textLines.join('') + '</Term>' + punct);
          changed++; i = k + 1; continue;
        }
      }
    }
    out.push(lines[i]); i++;
  }
  // 第二遍：行首标点移到上一行末
  const out2 = [];
  for (let idx = 0; idx < out.length; idx++) {
    let line = out[idx];
    const m = line.match(new RegExp(`^([${PUNCT}]+)(\\S.*)$`));
    if (m && out2.length > 0) {
      // 找上一非空行
      let p = out2.length - 1;
      while (p >= 0 && out2[p].trim() === '') p--;
      if (p >= 0) {
        out2[p] = out2[p].replace(/\s*$/, m[1]);
        line = m[2];
        changed++;
      }
    }
    out2.push(line);
  }
  if (changed > 0) fs.writeFileSync(fp, out2.join('\n'), 'utf8');
  return changed;
}
const files = walk('content');
let total = 0, filesChanged = 0;
for (const fp of files) { const c = collapseFile(fp); if (c > 0) { total += c; filesChanged++; } }
console.log(`v3处理: ${total} 处, 涉及 ${filesChanged} 文件`);
