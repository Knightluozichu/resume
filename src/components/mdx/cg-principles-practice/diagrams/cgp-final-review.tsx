import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const domains = [["Observer", "1,5,21", "problem + perception + interaction"], ["2D", "2,4,10,12", "scene + transforms + library"], ["3D", "3,6,7,11,13,16", "geometry + hierarchy + camera"], ["Samples", "15,17-20,38", "raster + image + signal + GPU"], ["Shape", "8,9,14,22-25", "represent + convert + mesh"], ["Appearance", "26-28,33", "light + material + color + shader"], ["Transport", "29-32,36-37", "estimate + visibility + structure"], ["Time/style", "34-35", "expression + motion"]] as const;

export function CgpFinalReviewDiagram() {
  return <Frame caption="官方 38 章归入八个能力域，每域都必须连接输入、表示、算法和证据。"><div role="img" aria-label="第三版38章八域全书能力矩阵" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{domains.map(([name, chapters, scope]) => <div key={name} className="min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{name}</strong><span className="mt-2 block text-xs font-semibold text-accent">Ch {chapters}</span><span className="mt-2 block text-xs text-secondary">{scope}</span></div>)}</div></Frame>;
}

const failures = [["Missing / misplaced", "lifetime → hierarchy → camera → clip → visibility"], ["Crack / shape error", "frame → topology → seam → interpolation → conversion"], ["Wrong energy / hue", "units → BSDF → PDF → linear RGB → display"], ["Alias / flicker", "frequency → footprint → filter → motion → display"], ["Noise / leak", "visibility → structure → path support → variance/history"], ["Lag / instability", "input → control → dt/solver → render → present"]] as const;

export function CgpFailureTreeDiagram() {
  return <Frame caption="按症状选择 producer 链，寻找最早错误中间量。"><div role="img" aria-label="六类图形故障的跨章定位树" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{failures.map(([symptom, path], index) => <div key={symptom} className="grid min-h-28 grid-cols-[2.25rem_1fr] gap-3 border border-border bg-bg/45 p-3"><span className="grid size-9 place-items-center rounded-full bg-warning/15 text-sm font-bold text-warning">{index + 1}</span><div><strong className="text-sm text-primary">{symptom}</strong><p className="mb-0 mt-2 text-xs leading-5 text-secondary">Trace: {path}</p></div></div>)}</div></Frame>;
}

const gates = [["Correctness", "analytic + invariants"], ["Visual/perceptual", "reference + user task"], ["Temporal/interaction", "fixed paths + timestamps"], ["Numerical", "degenerate + convergence"], ["Systems", "P50/P95/P99 + memory"], ["Portability", "device matrix + fallback"]] as const;

export function CgpCapstoneGateDiagram() {
  return <Frame caption="综合项目必须同时越过六类门槛，不能只用一张最终截图验收。"><div role="img" aria-label="正确视觉时域数值系统和可移植六维验收门槛" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{gates.map(([name, evidence], index) => <div key={name} className="min-h-24 border border-border bg-bg/45 p-3"><span className="text-xs font-bold text-accent">G{index + 1}</span><strong className="mt-2 block text-sm text-primary">{name}</strong><span className="mt-2 block text-xs text-success">Evidence: {evidence}</span></div>)}</div></Frame>;
}
