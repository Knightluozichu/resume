import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

export function GilBiasUnbiasedDiagram() {
  return <Frame caption="Radiance 从光源正向传播，importance 从传感器反向传播；最终测量只来自两者在可连接路径上的配对。"><div role="img" aria-label="辐亮度正向方程和重要度伴随方程在路径空间汇合" className="grid gap-4 md:grid-cols-[1fr_auto_1fr]"><section className="border border-border bg-bg/40 p-4"><span className="text-xs font-bold text-warning">FORWARD</span><strong className="mt-2 block text-sm text-primary">Radiance equation</strong><code className="mt-3 block text-warning">L = Le + KL</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">emitter → scatter → scene</p></section><div className="grid place-items-center text-2xl text-accent">⇄</div><section className="border border-border bg-bg/40 p-4"><span className="text-xs font-bold text-success">ADJOINT</span><strong className="mt-2 block text-sm text-primary">Importance equation</strong><code className="mt-3 block text-success">W = We + K*W</code><p className="mb-0 mt-3 text-xs leading-5 text-secondary">sensor → sensitivity → scene</p></section><div className="md:col-span-3 border border-accent/40 bg-accent/5 p-3 text-center text-sm text-primary">Measurement = ⟨We, L⟩ = ⟨W, Le⟩ = path contributions</div></div></Frame>;
}

const strategies = [
  ["Camera tracing", "sensor", "BSDF continuation", "indirect diffuse / glossy"],
  ["Light tracing", "emitter", "importance connection", "caustic / light transport"],
  ["Bidirectional", "both ends", "connect subpaths", "mixed difficult paths"],
  ["Finite element", "surface basis", "matrix / relaxation", "diffuse exchange"],
] as const;

export function GilPathStrategyDiagram() {
  return <Frame caption="光传输策略的差异不是“公式不同”，而是从哪一端生成顶点、怎样连接、在哪里存储与重建贡献。"><div role="img" aria-label="相机追踪光线追踪双向追踪和有限元策略矩阵" className="overflow-x-auto"><div className="min-w-[700px] border border-border"><div className="grid grid-cols-[1.1fr_.8fr_1.2fr_1.5fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Strategy</span><span>Start</span><span>Operation</span><span>Strong case</span></div>{strategies.map(([name,start,op,strong],i)=><div key={name} className={`grid min-h-12 grid-cols-[1.1fr_.8fr_1.2fr_1.5fr] items-center gap-3 px-3 py-2 text-xs ${i%2?"bg-bg/40":"bg-elevated"}`}><strong className="text-accent">{name}</strong><code className="text-primary">{start}</code><span className="text-secondary">{op}</span><span className="text-success">{strong}</span></div>)}</div></div></Frame>;
}

const errors = [
  ["Bias", "E[Î]-I", "kernel radius · cache · truncation"],
  ["Variance", "E[(Î-EÎ)²]", "rare paths · PDF mismatch"],
  ["Consistency", "Î→I", "parameter schedule with N"],
  ["Work", "time + memory", "trace · store · connect · rebuild"],
] as const;

export function GilEstimatorTradeoffDiagram() {
  return <Frame caption="策略验收必须同时报告偏差、方差、一致性和工作量；“无偏”从来不是单独的胜负判据。"><div role="img" aria-label="光传输估计器的偏差方差一致性工作量四维比较" className="grid gap-3 sm:grid-cols-2">{errors.map(([name,formula,cause])=><section key={name} className="border border-border bg-bg/40 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-primary">{name}</strong><code className="text-xs text-accent">{formula}</code></div><p className="mb-0 mt-3 text-xs text-secondary">{cause}</p></section>)}</div></Frame>;
}
