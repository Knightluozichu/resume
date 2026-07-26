import fs from 'fs';
function collapseFile(fp, dryRun) {
  const src = fs.readFileSync(fp, 'utf8');
  const lines = src.split('\n');
  const out = [];
  let i = 0, collapsed = 0;
  const openRe = /^<Term def="[^"]*">$/;   // 开标签独占一行
  while (i < lines.length) {
    const line = lines[i];
    if (openRe.test(line.trim())) {
      // 收集直到 </Term>
      let j = i + 1;
      const textLines = [];
      let closeLine = null;
      while (j < lines.length) {
        const t = lines[j];
        if (t.trim().startsWith('</Term>')) { closeLine = t; break; }
        if (t.includes('<')) { closeLine = null; break; } // 含标签，不折叠
        textLines.push(t.trim());
        j++;
      }
      if (closeLine) {
        const closeTrim = closeLine.trim();
        const punct = closeTrim.replace('</Term>', ''); // </Term>后的标点
        const text = textLines.join('');
        out.push(line.trim().replace(/>$/, '>' ) + text + '</Term>' + punct);
        collapsed++;
        i = j + 1;
        continue;
      }
    }
    out.push(line);
    i++;
  }
  if (collapsed > 0 && !dryRun) fs.writeFileSync(fp, out.join('\n'), 'utf8');
  return collapsed;
}
const fp = process.argv[2];
const dryRun = process.argv.includes('--dry');
console.log('折叠Term数:', collapseFile(fp, dryRun));
