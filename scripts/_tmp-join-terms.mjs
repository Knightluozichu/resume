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
// 匹配整行是 <Term ...>...</Term>标点 的行
const termLineRe = /^<Term\b[^>]*>.*<\/Term>[、，,。；;：:！？!?…]*$/;
const files = walk('content');
let totalJoined = 0, filesChanged = 0;
for (const fp of files) {
  const lines = fs.readFileSync(fp, 'utf8').split('\n');
  const out = [];
  let i = 0, joined = 0;
  while (i < lines.length) {
    if (termLineRe.test(lines[i].trim())) {
      // 合并连续的 Term 行
      let merged = lines[i].trim();
      let j = i + 1;
      while (j < lines.length && termLineRe.test(lines[j].trim())) {
        merged += lines[j].trim();
        j++; joined++;
      }
      out.push(merged);
      i = j;
      continue;
    }
    out.push(lines[i]);
    i++;
  }
  if (joined > 0) { fs.writeFileSync(fp, out.join('\n'), 'utf8'); totalJoined += joined; filesChanged++; }
}
console.log(`合并连续Term行: ${totalJoined} 行, 涉及 ${filesChanged} 文件`);
