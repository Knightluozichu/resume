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
const punctRe=/^[、，,。；;：:！？!?…·]+$/;
const files=walk('content');
let totalFixed=0, filesChanged=0;
for (const fp of files) {
  const lines=fs.readFileSync(fp,'utf8').split('\n');
  const out=[];
  let inCode=false;
  let fixed=0;
  for (const line of lines) {
    if (/^\s*```/.test(line)) { inCode=!inCode; out.push(line); continue; }
    if (inCode) { out.push(line); continue; }
    if (punctRe.test(line.trim())) {
      // 合并到上一非空行
      let j=out.length-1;
      while (j>=0 && out[j].trim()==='') j--;
      if (j>=0) { out[j]=out[j].replace(/\s*$/, line.trim()); fixed++; continue; }
      // 没有上一行，丢弃该标点行
      fixed++; continue;
    }
    out.push(line);
  }
  if (fixed>0) { fs.writeFileSync(fp, out.join('\n'), 'utf8'); totalFixed+=fixed; filesChanged++; }
}
console.log(`孤立标点已合并: ${totalFixed} 处, 涉及 ${filesChanged} 文件`);
