import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

export function GilRadiosityDiagram() {
  const stages = [
    ["Continuous", "B(x) = E(x) + ρ∫KB"],
    ["Basis", "B(x) ≈ Σ Bi Ni(x)"],
    ["Transfer", "Fij: geometry + visibility"],
    ["Solve", "(I-RF)B = E"],
  ] as const;
  return <Frame caption="经典辐射度把连续 diffuse transport 投影到表面基函数，再由 form-factor 矩阵求解系数。"><div role="img" aria-label="连续辐射度方程经过基函数形状因子离散为线性系统" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{stages.map(([title,formula],i)=><section key={title} className="min-h-28 border border-border bg-bg/40 p-3"><span className="text-xs font-bold text-accent">0{i+1}</span><strong className="ml-2 text-sm text-primary">{title}</strong><code className="mt-4 block text-xs text-success">{formula}</code></section>)}</div></Frame>;
}

const methods = [
  ["Gather", "sample j ~ pᵢⱼ", "estimate Σ FᵢⱼBⱼ for receiver i"],
  ["Shoot", "choose source j", "distribute residual energy to receivers"],
  ["Random walk", "transition by F", "sample Neumann-series transport paths"],
  ["Density", "store hit points", "reconstruct irradiance with kernel"],
] as const;

export function GilStochasticRelaxationDiagram() {
  return <Frame caption="随机辐射度不必存完整 O(n²) 矩阵：可随机 gather、shoot、walk 或以命中密度重建能量。"><div role="img" aria-label="随机聚集随机发射随机游走和密度估计四种辐射度求解方式" className="overflow-x-auto"><div className="min-w-[680px] border border-border"><div className="grid grid-cols-[1fr_1.2fr_1.8fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Estimator</span><span>Random choice</span><span>Update target</span></div>{methods.map(([name,choice,target],i)=><div key={name} className={`grid min-h-12 grid-cols-[1fr_1.2fr_1.8fr] items-center gap-3 px-3 py-2 text-xs ${i%2?"bg-bg/40":"bg-elevated"}`}><strong className="text-accent">{name}</strong><code className="text-primary">{choice}</code><span className="text-secondary">{target}</span></div>)}</div></div></Frame>;
}

const controls = [
  ["Variance", "p follows transfer × energy", "avoid rare huge weights"],
  ["Refinement", "split where gradient / visibility changes", "reduce basis bias"],
  ["Clustering", "aggregate far interactions", "reduce pair complexity"],
  ["Convergence", "ρ(RF)<1 + finite moments", "stable mean / residual"],
] as const;

export function GilRadiosityHierarchyDiagram() {
  return <Frame caption="随机化降低矩阵成本，层次细化控制离散偏差，聚类控制远场复杂度；三者解决的不是同一种误差。"><div role="img" aria-label="随机辐射度的方差细化聚类收敛控制矩阵" className="grid gap-3 sm:grid-cols-2">{controls.map(([name,rule,result])=><section key={name} className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">{name}</strong><code className="mt-2 block text-xs text-accent">{rule}</code><p className="mb-0 mt-3 text-xs text-secondary">{result}</p></section>)}</div></Frame>;
}
