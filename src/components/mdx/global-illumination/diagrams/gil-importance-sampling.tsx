import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

export function GilImportanceSamplingDiagram() {
  const stages = [
    ["Domain", "x ∈ D", "被积域与测度"],
    ["Sampler", "X ~ p(x)", "样本与 PDF"],
    ["Weight", "f(X) / p(X)", "无偏贡献"],
    ["Reduce", "Σ / N", "估计值与误差"],
  ] as const;
  return <Frame caption="Monte Carlo 的正确性来自样本分布和 1/p 权重配对；采样位置本身不等于估计器。"><div role="img" aria-label="蒙特卡洛积分从定义域采样到加权平均的估计器结构" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{stages.map(([title, formula, body], i) => <section key={title} className="min-h-32 border border-border bg-bg/40 p-3"><span className="text-xs font-bold text-accent">0{i + 1}</span><strong className="ml-2 text-sm text-primary">{title}</strong><code className="mt-3 block border-l-2 border-success pl-2 text-sm text-success">{formula}</code><p className="mb-0 mt-3 text-xs text-secondary">{body}</p></section>)}</div></Frame>;
}

export function GilSamplingTransformDiagram() {
  return <Frame caption="反演法把均匀随机数经 CDF 变成目标变量；拒绝法则在容易采样的包络下接受或丢弃候选点。"><div role="img" aria-label="反演采样和拒绝采样的生成流程比较" className="grid gap-4 md:grid-cols-2"><section className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">Inverse CDF</strong><div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs"><code className="border border-border bg-elevated p-2 text-accent">u~U[0,1)</code><span>→</span><code className="border border-border bg-elevated p-2 text-warning">F⁻¹(u)</code><span>→</span><code className="border border-border bg-elevated p-2 text-success">x~p</code></div><p className="mb-0 mt-4 text-xs leading-5 text-secondary">适合 CDF 可积且可逆；分段离散分布可用 table / binary search。</p></section><section className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">Rejection sampling</strong><div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs"><code className="border border-border bg-elevated p-2 text-accent">x~q</code><span>→</span><code className="border border-border bg-elevated p-2 text-warning">u≤p/Mq?</code><span>→</span><code className="border border-border bg-elevated p-2 text-success">accept</code></div><p className="mb-0 mt-4 text-xs leading-5 text-secondary">不要求反函数，但包络常数 M 过大会使接受率下降。</p></section></div></Frame>;
}

const tools = [
  ["Importance", "让 p 跟随 |f|", "降低单样本幅度差"],
  ["Stratification", "每个子域固定配额", "覆盖低频结构"],
  ["Quasi-MC", "低差异确定序列", "减少空间空洞/团簇"],
  ["Russian roulette", "随机终止并补权", "控制路径成本"],
] as const;

export function GilVarianceToolkitDiagram() {
  return <Frame caption="方差缩减方法作用于不同原因：分布不匹配、覆盖不均、序列差异和无限递归成本。"><div role="img" aria-label="重要性采样分层低差异序列和俄罗斯轮盘的方差成本矩阵" className="overflow-x-auto"><div className="min-w-[620px] border border-border"><div className="grid grid-cols-[1fr_1.2fr_1.5fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Tool</span><span>操作</span><span>主要修复</span></div>{tools.map(([name, action, target], i) => <div key={name} className={`grid min-h-12 grid-cols-[1fr_1.2fr_1.5fr] items-center gap-3 px-3 py-2 text-xs ${i % 2 ? "bg-bg/40" : "bg-elevated"}`}><strong className="text-accent">{name}</strong><span className="text-primary">{action}</span><span className="text-secondary">{target}</span></div>)}</div></div></Frame>;
}
