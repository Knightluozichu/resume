import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const lenses = [
  ["Perception", "what the observer can see and use"],
  ["Physics", "light, material, camera, motion"],
  ["Mathematics", "space, functions, integrals, probability"],
  ["Algorithms", "sample, reconstruct, solve, query"],
  ["Systems", "platform, GPU, interaction, latency"],
] as const;

export function CgpLearningMapDiagram() {
  return <Frame caption="第三版用五个视角解释同一个图形系统，而不是只沿渲染管线排列。"><div role="img" aria-label="感知、物理、数学、算法与系统五视角学习地图" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{lenses.map(([title, detail], index) => <div key={title} className="min-h-32 border border-border bg-bg/45 p-3"><span className="grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span><strong className="mt-3 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span></div>)}</div></Frame>;
}

const owners = [
  ["Intro", "1, 5, 21", "perception + interaction"], ["2D", "2, 4, 10, 12", "platform + affine"],
  ["3D", "3, 6, 7, 11, 13, 16", "math + camera + platform"], ["Raster", "15, 17-20, 38", "image signal + hardware"],
  ["Model", "8, 9, 14, 22-25", "shape representations"], ["Light", "26-28, 33", "light + material + color"],
  ["Render", "29-32, 36-37", "transport + visibility"], ["Advanced", "34-35", "expression + motion"],
] as const;

export function CgpChapterOwnershipDiagram() {
  return <Frame caption="38 章唯一分配到 8 个正文页；地图和复习页不替代正文。"><div role="img" aria-label="官方38章到八个正文主题的唯一责任映射" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{owners.map(([name, chapters, scope]) => <div key={name} className="min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{name}</strong><span className="mt-2 block text-xs font-semibold text-accent">Ch {chapters}</span><span className="mt-2 block text-xs text-secondary">{scope}</span></div>)}</div></Frame>;
}

const evidence = [["Principle", "state assumptions"], ["Representation", "data + spaces"], ["Algorithm", "math + implementation"], ["Failure", "edge cases + error"], ["Evidence", "reference + budget"]] as const;

export function CgpEvidenceLoopDiagram() {
  return <Frame caption="每章都要从原理走到可复查证据，再由失败结果反向修正表示与算法。"><div role="img" aria-label="原理、表示、算法、失败与证据闭环" className="grid gap-2 md:grid-cols-5">{evidence.map(([title, detail], index) => <div key={title} className="relative min-h-24 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < evidence.length - 1 && <span className="absolute -right-2 top-9 z-10 text-accent" aria-hidden="true">→</span>}</div>)}</div></Frame>;
}
