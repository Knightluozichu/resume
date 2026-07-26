import ts from 'typescript';
import fs from 'fs';
import { execSync } from 'child_process';

function processFile(fp) {
  const src = fs.readFileSync(fp, 'utf8');
  if (/重置实验|resetExperiment/.test(src)) return { skip: 'has-reset' };
  const sf = ts.createSourceFile(fp, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const edits = [];
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name &&
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const useStateInfos = [];
      let lastReturn = null;
      function walk(n) {
        if (ts.isVariableDeclaration(n) && n.initializer && ts.isCallExpression(n.initializer) &&
            n.initializer.expression.getText() === 'useState' &&
            ts.isArrayBindingPattern(n.name) && n.name.elements.length === 2) {
          const setter = n.name.elements[1].getText();
          const init = n.initializer.arguments[0] ? n.initializer.arguments[0].getText() : '';
          useStateInfos.push({ setter, init, end: n.parent.parent.end });
        }
        if (ts.isReturnStatement(n)) lastReturn = n;
        ts.forEachChild(n, walk);
      }
      walk(node);
      if (useStateInfos.length > 0 && lastReturn && lastReturn.expression) {
        const lastUseStateEnd = Math.max(...useStateInfos.map(u => u.end));
        let expr = lastReturn.expression;
        if (ts.isParenthesizedExpression(expr)) expr = expr.expression;
        let btnPos = -1;
        if (ts.isJsxElement(expr)) btnPos = expr.openingElement.end;
        if (btnPos > 0) edits.push({ fnPos: lastUseStateEnd, btnPos, setters: useStateInfos });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  if (edits.length === 0) return { skip: 'no-edit' };
  let out = src;
  const allInserts = [];
  for (const e of edits) {
    const resetBody = e.setters.map(s => `    ${s.setter}(${s.init});`).join('\n');
    allInserts.push({ pos: e.fnPos, text: `\n  function resetExperiment() {\n${resetBody}\n  }\n` });
    allInserts.push({ pos: e.btnPos, text: `\n      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-9 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>` });
  }
  allInserts.sort((a,b) => b.pos - a.pos);
  for (const ins of allInserts) out = out.slice(0, ins.pos) + ins.text + out.slice(ins.pos);
  fs.writeFileSync(fp, out, 'utf8');
  return { ok: true, components: edits.length };
}

const files = execSync('find src/components/mdx -path "*/diagrams/official*lab*.tsx"', {encoding:'utf8'}).trim().split('\n').filter(Boolean);
let ok=0, hasReset=0, noEdit=0;
for (const fp of files) {
  const r = processFile(fp);
  if (r.ok) ok++;
  else if (r.skip === 'has-reset') hasReset++;
  else noEdit++;
}
console.log(`TS-codemod 已加reset: ${ok} | 已有reset: ${hasReset} | 无法编辑: ${noEdit} | 总: ${files.length}`);
