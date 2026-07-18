import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const families = [
  ["Reuse smooth fields", "final gathering · irradiance cache", "surface records / interpolation"],
  ["Connect path ends", "bidirectional tracing · multipass", "camera/light subpaths"],
  ["Explore path space", "Metropolis light transport", "mutations / Markov chain"],
  ["Reuse emitted samples", "photon map · instant radiosity · lightcuts", "points / VPL hierarchy"],
] as const;

export function GilAdvancedTechniquesDiagram() {
  return <Frame caption="混合算法按复用对象分类：平滑场、双端子路径、路径空间邻域，或从光源生成的点/虚拟光源集合。"><div role="img" aria-label="第七章混合算法的四类复用对象和重建方式" className="grid gap-3 sm:grid-cols-2">{families.map(([title,methods,state],i)=><section key={title} className="min-h-36 border border-border bg-bg/40 p-4"><span className="text-xs font-bold text-accent">FAMILY {i+1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><p className="my-3 text-xs leading-5 text-secondary">{methods}</p><code className="text-xs text-success">{state}</code></section>)}</div></Frame>;
}

export function GilBidirectionalMltDiagram() {
  return <Frame caption="BDPT 枚举同一路径的连接策略并用 MIS 合并；MLT 则以接受/拒绝 mutation 在高贡献路径邻域相关采样。"><div role="img" aria-label="双向路径连接和MLT路径变异的算法对照" className="grid gap-4 md:grid-cols-2"><section className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">Bidirectional tracing</strong><div className="my-4 flex items-center justify-between gap-2 text-xs"><span className="border border-warning/50 p-2 text-warning">light subpath</span><span>↔ connect (s,t) ↔</span><span className="border border-success/50 p-2 text-success">camera subpath</span></div><code className="text-xs text-accent">Σ wₛₜ Cₛₜ / pₛₜ</code></section><section className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">Metropolis light transport</strong><div className="my-4 flex items-center justify-between gap-2 text-xs"><span className="border border-warning/50 p-2 text-warning">path X</span><span>→ mutate / accept →</span><span className="border border-success/50 p-2 text-success">path Y</span></div><code className="text-xs text-accent">a = min(1, f(Y)T(Y→X)/f(X)T(X→Y))</code></section></div></Frame>;
}

const reuse = [
  ["Irradiance cache", "position + normal + radius", "interpolation leak"],
  ["Photon mapping", "position + flux + direction", "kernel bias"],
  ["Instant radiosity", "virtual point lights", "singularity / clamping"],
  ["Lightcuts", "VPL hierarchy + bounds", "cut error bound"],
] as const;

export function GilReuseHierarchyDiagram() {
  return <Frame caption="四种复用方法存储的数据和失败形态不同；只有声明 reconstruction 与 error control，组合才不会重复或漏能量。"><div role="img" aria-label="辐照度缓存光子映射即时辐射度和Lightcuts的状态与误差矩阵" className="overflow-x-auto"><div className="min-w-[680px] border border-border"><div className="grid grid-cols-[1.1fr_1.5fr_1.3fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Method</span><span>Stored state</span><span>Main failure</span></div>{reuse.map(([name,state,failure],i)=><div key={name} className={`grid min-h-12 grid-cols-[1.1fr_1.5fr_1.3fr] items-center gap-3 px-3 py-2 text-xs ${i%2?"bg-bg/40":"bg-elevated"}`}><strong className="text-accent">{name}</strong><code className="text-primary">{state}</code><span className="text-secondary">{failure}</span></div>)}</div></div></Frame>;
}
