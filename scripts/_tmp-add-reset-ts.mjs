import ts from 'typescript';
import fs from 'fs';

function processFile(fp, dryRun) {
  const src = fs.readFileSync(fp, 'utf8');
  if (/重置实验|resetExperiment/.test(src)) return { skip: 'has-reset' };
  const sf = ts.createSourceFile(fp, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  // 收集每个导出函数组件的 useState 与最后一个 return
  const edits = []; // {fnEnd(insert reset fn), btnPos(insert button), setters:[{setter,init}]}
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name &&
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const useStateInfos = [];
      let lastReturn = null;
      function walk(n) {
        // useState 变量声明: const [x, setX] = useState(...)
        if (ts.isVariableDeclaration(n) && n.initializer && ts.isCallExpression(n.initializer) &&
            n.initializer.expression.getText() === 'useState' &&
            ts.isArrayBindingPattern(n.name) && n.name.elements.length === 2) {
          const setter = n.name.elements[1].getText();
          const init = n.initializer.arguments[0] ? n.initializer.arguments[0].getText() : '';
          useStateInfos.push({ setter, init, end: n.parent.parent.end }); // VariableStatement end
        }
        if (ts.isReturnStatement(n)) lastReturn = n;
        ts.forEachChild(n, walk);
      }
      walk(node);
      if (useStateInfos.length > 0 && lastReturn && lastReturn.expression) {
        const lastUseStateEnd = Math.max(...useStateInfos.map(u => u.end));
        // 找 return 的根 JSX 元素的开标签结束位置
        let expr = lastReturn.expression;
        if (ts.isParenthesizedExpression(expr)) expr = expr.expression;
        let btnPos = -1;
        if (ts.isJsxElement(expr)) btnPos = expr.openingElement.end;
        else if (ts.isJsxSelfClosingElement(expr)) btnPos = -1; // 自闭合无法插子节点
        if (btnPos > 0) edits.push({ fnPos: lastUseStateEnd, btnPos, setters: useStateInfos });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);

  if (edits.length === 0) return { skip: 'no-edit' };

  // 从后往前插入（避免位置偏移）
  let out = src;
  const allInserts = [];
  for (const e of edits) {
    const resetBody = e.setters.map(s => `    ${s.setter}(${s.init});`).join('\n');
    const resetFn = `\n  function resetExperiment() {\n${resetBody}\n  }\n`;
    allInserts.push({ pos: e.fnPos, text: resetFn });
    const resetBtn = `\n      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-9 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>`;
    allInserts.push({ pos: e.btnPos, text: resetBtn });
  }
  allInserts.sort((a,b) => b.pos - a.pos);
  for (const ins of allInserts) out = out.slice(0, ins.pos) + ins.text + out.slice(ins.pos);
  if (!dryRun) fs.writeFileSync(fp, out, 'utf8');
  return { ok: true, components: edits.length };
}

const fp = process.argv[2];
const dryRun = process.argv.includes('--dry');
console.log(JSON.stringify(processFile(fp, dryRun)));
