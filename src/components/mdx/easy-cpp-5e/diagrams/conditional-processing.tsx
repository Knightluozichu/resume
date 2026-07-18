const truthRows = [
  { score: "-1", lower: "false", upper: "true", valid: "false" },
  { score: "0", lower: "true", upper: "true", valid: "true" },
  { score: "100", lower: "true", upper: "true", valid: "true" },
  { score: "101", lower: "true", upper: "false", valid: "false" },
] as const;

export function EcpConditionalTruthMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4 sm:p-5">
        <table aria-label="分数合法条件 score 大于等于 0 且小于等于 100 的边界真值表" className="w-full min-w-[620px] border-collapse text-left text-xs">
          <thead><tr className="border-b border-border text-secondary"><th className="p-3">score</th><th className="p-3">score &gt;= 0</th><th className="p-3">score &lt;= 100</th><th className="p-3">&& result</th></tr></thead>
          <tbody>{truthRows.map((row) => <tr key={row.score} className="border-b border-border/70 last:border-0"><th className="p-3 text-accent">{row.score}</th><td className="p-3 text-primary">{row.lower}</td><td className="p-3 text-primary">{row.upper}</td><td className="p-3 font-semibold text-primary">{row.valid}</td></tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">逻辑与把两个边界条件交集成合法域；边界外只需一项为假即可短路拒绝。</figcaption>
    </figure>
  );
}

const branches = [
  { test: "score < 0 || score > 100", yes: "invalid", no: "continue" },
  { test: "score >= 90", yes: "A", no: "continue" },
  { test: "score >= 60", yes: "pass", no: "retry" },
] as const;

export function EcpConditionalBranchFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="分数从非法检查、高分检查到及格检查的 else-if 决策流程" className="space-y-3">
          {branches.map((branch, index) => <section key={branch.test} className="grid gap-2 border border-violet-500/30 bg-violet-500/10 p-4 sm:grid-cols-[1fr_140px_140px]"><code className="text-xs text-accent">0{index + 1} · {branch.test}</code><span className="border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs text-primary">YES → {branch.yes}</span><span className="border border-rose-500/30 bg-rose-500/10 p-2 text-xs text-primary">NO → {branch.no}</span></section>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">else-if 链按顺序选择第一个命中项；前面的失败事实会缩小后续分支的输入集合。</figcaption>
    </figure>
  );
}

const boundaryRows = [
  { value: "-1", expected: "invalid", purpose: "lower outside" },
  { value: "0 / 59", expected: "retry", purpose: "lower + before 60" },
  { value: "60 / 89", expected: "pass", purpose: "at 60 + before 90" },
  { value: "90 / 100", expected: "A", purpose: "at 90 + upper" },
  { value: "101", expected: "invalid", purpose: "upper outside" },
] as const;

export function EcpConditionalBoundaryLab() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="分数分类的边界测试实验清单" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {boundaryRows.map((row) => <section key={row.value} className="min-h-40 border border-amber-500/30 bg-amber-500/10 p-3"><code className="text-sm text-accent">{row.value}</code><strong className="mt-3 block text-xs text-primary">{row.expected}</strong><span className="mt-3 block text-xs text-secondary">{row.purpose}</span></section>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">测试阈值前、阈值与阈值后，能直接验证比较符号和分支顺序。</figcaption>
    </figure>
  );
}
