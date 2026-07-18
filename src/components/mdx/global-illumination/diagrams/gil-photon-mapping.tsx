import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

export function GilPhotonMappingDiagram() {
  const stages = [
    ["Emit", "select light · sample position/direction · flux/PDF"],
    ["Trace", "scatter · roulette · classify path history"],
    ["Store", "position · incoming direction · flux · kd-tree"],
    ["Render", "camera trace · nearest photons · density estimate"],
  ] as const;
  return <Frame caption="经典 photon mapping 是两遍法：先从光源追踪并存储能量命中，再从相机查询局部密度重建。"><div role="img" aria-label="光子从发射追踪存储到相机密度查询的两遍流程" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{stages.map(([title,body],i)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-3"><span className="text-xs font-bold text-accent">0{i+1}</span><strong className="ml-2 text-sm text-primary">{title}</strong><p className="mb-0 mt-4 text-xs leading-5 text-secondary">{body}</p></section>)}</div></Frame>;
}

const maps = [
  ["Direct", "L-D", "通常不用 map，NEE 更直接"],
  ["Caustic map", "L-S+-D", "高密度、小半径，直接显示焦散"],
  ["Global map", "L-{D|S}+", "粗略多次间接场，常辅助 gather"],
  ["Volume map", "medium events", "三维 kernel 与 phase function"],
] as const;

export function GilPhotonMapSplitDiagram() {
  return <Frame caption="按路径历史拆 map 能控制密度和责任：direct 不重复，caustic 专门重建，global 支持间接照明。"><div role="img" aria-label="直接光焦散全局和体积光子图按路径分类" className="overflow-x-auto"><div className="min-w-[660px] border border-border"><div className="grid grid-cols-[1fr_1fr_1.8fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Partition</span><span>Path class</span><span>Use</span></div>{maps.map(([name,path,use],i)=><div key={name} className={`grid min-h-12 grid-cols-[1fr_1fr_1.8fr] items-center gap-3 px-3 py-2 text-xs ${i%2?"bg-bg/40":"bg-elevated"}`}><strong className="text-accent">{name}</strong><code className="text-primary">{path}</code><span className="text-secondary">{use}</span></div>)}</div></div></Frame>;
}

export function GilPhotonRadiusDiagram() {
  const states = [
    ["Large radius", "many photons", "low variance", "blur / leak bias"],
    ["Small radius", "few photons", "high variance", "better locality"],
    ["Consistent schedule", "h→0, Nh²→∞", "variance→0", "bias→0"],
  ] as const;
  return <Frame caption="半径不是画质滑杆：一致性要求邻域收缩的同时，邻域内有效 photon 数仍增长。"><div role="img" aria-label="光子查询大半径小半径和一致收缩的偏差方差比较" className="grid gap-3 md:grid-cols-3">{states.map(([title,count,variance,bias])=><section key={title} className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">{title}</strong><code className="mt-3 block text-xs text-accent">{count}</code><p className="mb-1 mt-3 text-xs text-success">{variance}</p><p className="m-0 text-xs text-warning">{bias}</p></section>)}</div></Frame>;
}
