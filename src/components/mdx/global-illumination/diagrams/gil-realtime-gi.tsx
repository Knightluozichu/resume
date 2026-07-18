import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const stack = [
  ["Scene truth", "geometry · emitters · material measurements"],
  ["Transport truth", "surfaces · media · subsurface paths"],
  ["Perceptual truth", "exposure · tone mapping · observer"],
  ["Speed", "reuse · precompute · compression · hardware"],
] as const;

export function GilRealtimeGiDiagram() {
  return <Frame caption="第 8 章的“ultimate realism and speed”同时要求场景、传输、显示/感知和计算速度成立，不等于一份实时 GI 技术名录。"><div role="img" aria-label="真实感与速度由场景传输感知和计算四层组成" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{stack.map(([title,body],i)=><section key={title} className="min-h-32 border border-border bg-bg/40 p-3"><span className="text-xs font-bold text-accent">LAYER {i+1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><p className="mb-0 mt-4 text-xs leading-5 text-secondary">{body}</p></section>)}</div></Frame>;
}

export function GilMediaSubsurfaceDiagram() {
  return <Frame caption="参与介质在体积内吸收、外散射、内散射；次表面散射则让能量跨越不同表面位置再离开。"><div role="img" aria-label="表面BSDF参与介质RTE和次表面BSSRDF传输域对照" className="grid gap-4 md:grid-cols-3"><section className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">Surface BSDF</strong><code className="mt-3 block text-xs text-accent">(x, ωᵢ) → (x, ωₒ)</code><p className="mb-0 mt-3 text-xs text-secondary">同一表面点改变方向</p></section><section className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">Participating medium</strong><code className="mt-3 block text-xs text-warning">dL/ds = emission + in - out</code><p className="mb-0 mt-3 text-xs text-secondary">路径沿体积连续变化</p></section><section className="border border-border bg-bg/40 p-4"><strong className="text-sm text-primary">BSSRDF</strong><code className="mt-3 block text-xs text-success">(xᵢ,ωᵢ) → (xₒ,ωₒ)</code><p className="mb-0 mt-3 text-xs text-secondary">进入点和离开点不同</p></section></div></Frame>;
}

const timeline = [
  ["Offline solve", "sample full transport", "dynamic but expensive"],
  ["Precompute", "project transfer in basis", "static geometry/material"],
  ["Runtime", "dot / matrix products", "changing distant lighting"],
  ["Display", "tone map + encode", "device / observer limits"],
] as const;

export function GilPrtPipelineDiagram() {
  return <Frame caption="PRT 把昂贵 transfer 对固定场景的部分预计算成低维算子，运行时只组合可变 lighting coefficients。"><div role="img" aria-label="预计算辐射传输从离线求解投影到运行时矩阵和显示" className="grid gap-2">{timeline.map(([title,op,limit],i)=><div key={title} className="grid min-h-12 grid-cols-[2rem_1fr_1.3fr_1.3fr] items-center gap-3 border border-border bg-bg/40 px-3 py-2 text-xs"><span className="grid size-8 place-items-center rounded-full bg-accent/15 font-bold text-accent">{i+1}</span><strong className="text-primary">{title}</strong><code className="text-success">{op}</code><span className="text-secondary">{limit}</span></div>)}</div></Frame>;
}
