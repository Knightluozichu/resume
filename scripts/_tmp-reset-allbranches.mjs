import ts from 'typescript';
import fs from 'fs';
import { execSync } from 'child_process';
const RESET_BTN = `<span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>`;
function processFile(fp) {
  let src = fs.readFileSync(fp, 'utf8');
  if (!/function resetExperiment/.test(src)) return { skip: 'no-reset-fn' };
  const sf = ts.createSourceFile(fp, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const insertPositions = [];
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name &&
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const body = node.body;
      if (body && ts.isBlock(body)) {
        for (const stmt of body.statements) {
          if (ts.isReturnStatement(stmt) && stmt.expression) {
            let expr = stmt.expression;
            if (ts.isParenthesizedExpression(expr)) expr = expr.expression;
            if (ts.isJsxElement(expr)) {
              const jsxText = expr.getText();
              if (!jsxText.includes('resetExperiment')) {
                insertPositions.push(expr.openingElement.end);
              }
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  if (insertPositions.length === 0) return { skip: 'no-branch-needs' };
  insertPositions.sort((a,b) => b - a);
  let out = src;
  for (const pos of insertPositions) out = out.slice(0, pos) + '\n      ' + RESET_BTN + out.slice(pos);
  fs.writeFileSync(fp, out, 'utf8');
  return { ok: true, branches: insertPositions.length };
}
const files = execSync('find src/components/mdx -path "*/diagrams/official*lab*.tsx"', {encoding:'utf8'}).trim().split('\n').filter(Boolean);
let ok=0, skip=0, totalBranches=0;
for (const fp of files) {
  const r = processFile(fp);
  if (r.ok) { ok++; totalBranches += r.branches; } else skip++;
}
console.log(`补充分支reset: ${ok} 文件, ${totalBranches} 个分支 | 跳过: ${skip}`);
