const expressionNodes = [
  { node: "price", role: "double operand", result: "12.5" },
  { node: "count", role: "int operand", result: "3 -> double" },
  { node: "price * count", role: "subexpression", result: "37.5" },
  { node: "+ fee", role: "outer expression", result: "42.5" },
] as const;

export function EcpExpressionsEvaluationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="价格乘数量再加费用时操作数类型、转换、子表达式和结果的计算结构" className="grid gap-2 sm:grid-cols-4">
          {expressionNodes.map((item, index) => (
            <section key={item.node} className="min-h-44 border border-sky-500/30 bg-sky-500/10 p-4">
              <span className="text-xs text-secondary">node 0{index + 1}</span>
              <code className="mt-2 block break-words text-xs text-accent">{item.node}</code>
              <strong className="mt-4 block text-xs text-primary">{item.role}</strong>
              <span className="mt-2 block text-xs text-secondary">结果：{item.result}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        外层赋值只接收已经算出的值；每个子表达式先按自己的操作数与转换规则确定类型和结果。
      </figcaption>
    </figure>
  );
}

const groupings = [
  { source: "2 + 3 * 4", tree: "2 + (3 * 4)", result: "14", reason: "* 优先级更高" },
  { source: "(2 + 3) * 4", tree: "(2 + 3) * 4", result: "20", reason: "括号覆盖默认分组" },
  { source: "10 - 3 - 2", tree: "(10 - 3) - 2", result: "5", reason: "同层减法左结合" },
] as const;

export function EcpExpressionsPrecedenceFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="三个算术表达式从源代码到默认分组和结果的优先级对照" className="grid gap-3 lg:grid-cols-3">
          {groupings.map((row, index) => (
            <section key={row.source} className="min-h-52 border border-violet-500/30 bg-violet-500/10 p-4">
              <span className="text-xs text-secondary">case 0{index + 1}</span>
              <code className="mt-2 block text-xs text-accent">{row.source}</code>
              <span className="my-3 block text-center text-accent" aria-hidden="true">↓</span>
              <code className="block text-xs text-primary">{row.tree} = {row.result}</code>
              <span className="mt-3 block text-xs text-secondary">{row.reason}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        括号与优先级决定语法分组；把业务子结果命名，通常比依赖读者背整张优先级表更清楚。
      </figcaption>
    </figure>
  );
}

const conversionTrials = [
  { code: "double x = 7 / 2", observed: "3.0", lost: "fraction before assignment" },
  { code: "double x = 7.0 / 2", observed: "3.5", lost: "none" },
  { code: "int x = static_cast<int>(3.9)", observed: "3", lost: "fraction by explicit truncation" },
] as const;

export function EcpExpressionsConversionLab() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="整数除法、浮点除法和显式截断三个转换实验的结果与信息损失" className="grid gap-3 lg:grid-cols-3">
          {conversionTrials.map((trial, index) => (
            <section key={trial.code} className="min-h-52 border border-amber-500/30 bg-amber-500/10 p-4">
              <span className="text-xs text-secondary">trial 0{index + 1}</span>
              <code className="mt-3 block break-words text-xs text-accent">{trial.code}</code>
              <strong className="mt-4 block text-sm text-primary">observed: {trial.observed}</strong>
              <span className="mt-4 block border-t border-border pt-3 text-xs text-secondary">loss: {trial.lost}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        转换发生的时机比最终变量类型更重要；用最小实验记录信息在哪一步消失。
      </figcaption>
    </figure>
  );
}
