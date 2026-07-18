const loopStates = [
  { phase: "initialize", state: "i = 0", check: "once" },
  { phase: "condition", state: "i < 5?", check: "before each round" },
  { phase: "body", state: "print i", check: "only when true" },
  { phase: "advance", state: "++i", check: "toward termination" },
] as const;

export function EcpRepetitionStateFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="for 循环从初始化、条件、循环体到推进并返回条件的状态流程" className="grid gap-2 sm:grid-cols-4">{loopStates.map((row,index)=><section key={row.phase} className="min-h-44 border border-sky-500/30 bg-sky-500/10 p-4"><span className="text-xs text-secondary">0{index+1}</span><strong className="mt-2 block text-sm text-primary">{row.phase}</strong><code className="mt-3 block text-xs text-accent">{row.state}</code><span className="mt-3 block text-xs text-secondary">{row.check}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">推进动作必须让状态靠近条件为假；从 advance 返回 condition 形成循环，而不是无条件复制代码。</figcaption></figure>
  );
}

const choices = [
  { question: "次数或范围已知？", yes: "for", example: "0..n-1" },
  { question: "执行前先判断？", yes: "while", example: "read while valid" },
  { question: "至少执行一次？", yes: "do-while", example: "show menu first" },
] as const;

export function EcpRepetitionChoiceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="根据已知次数、前测条件和至少执行一次需求选择循环结构" className="grid gap-3 lg:grid-cols-3">{choices.map((row,index)=><section key={row.yes} className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-4"><span className="text-xs text-secondary">decision 0{index+1}</span><strong className="mt-2 block text-sm text-primary">{row.question}</strong><code className="mt-4 block text-lg text-accent">{row.yes}</code><span className="mt-3 block text-xs text-secondary">{row.example}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">三种循环能力可互相改写，选择依据是让次数、检查时机和终止契约最直接。</figcaption></figure>
  );
}

const trials = [
  { mutation: "n = 0", expected: "0 rounds", risk: "assumes body runs" },
  { mutation: "i < n -> i <= n", expected: "n + 1 rounds", risk: "off by one" },
  { mutation: "remove ++i", expected: "never terminates", risk: "state frozen" },
  { mutation: "continue before ++i", expected: "path skips advance", risk: "conditional hang" },
] as const;

export function EcpRepetitionTerminationLab() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="四个循环终止与边界故障实验的预测表" className="grid gap-3 sm:grid-cols-2">{trials.map((trial,index)=><section key={trial.mutation} className="min-h-44 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.mutation}</code><strong className="mt-3 block text-xs text-primary">{trial.expected}</strong><span className="mt-3 block text-xs text-secondary">risk: {trial.risk}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">先写次数和末状态预测，再制造单变量故障；终止性与边界错误会表现为不同轨迹。</figcaption></figure>
  );
}
