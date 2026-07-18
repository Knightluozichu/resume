import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const cameraPath = [["Model", "local geometry"], ["Hierarchy", "world composition"], ["View", "camera frame"], ["Clip", "homogeneous + clipping"], ["NDC / viewport", "divide + pixel/depth"], ["Visibility", "nearest covered surface"]] as const;

export function Cgp3dGraphicsDiagram() {
  return <Frame caption="Dürer 的成像几何扩展为 model、camera、clip、viewport 与 visibility 完整链。"><div role="img" aria-label="三维模型到相机投影和可见性的完整路径" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{cameraPath.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="text-xs font-bold text-accent">0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < cameraPath.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const hierarchy = [["Shoulder", "world = root · local", "rigid pose"], ["Elbow", "world = shoulder · local", "inherits parent basis"], ["Hand", "world = elbow · local", "draw + bounds"], ["Tool", "world = hand · local", "attachment frame"]] as const;

export function CgpHierarchyDiagram() {
  return <Frame caption="层次模型逐级组合 local transform；parent scale/shear 会改变所有后代 frame。"><div role="img" aria-label="肩肘手工具的层次变换树" className="grid gap-3 md:grid-cols-4">{hierarchy.map(([name, equation, note], index) => <div key={name} className="relative min-h-32 border border-border bg-bg/45 p-3"><span className="grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span><strong className="mt-3 block text-sm text-primary">{name}</strong><span className="mt-2 block text-xs text-warning">{equation}</span><span className="mt-2 block text-xs text-secondary">{note}</span>{index < hierarchy.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const platforms = [["Thin API", "resources + pipelines + commands", "maximum responsibility"], ["Render framework", "materials + passes + assets", "render-focused reuse"], ["Scene toolkit", "hierarchy + camera + selection", "domain data model"], ["Engine", "editor + animation + physics + build", "product workflow"], ["Display platform", "browser / mobile / UI", "integration + power constraints"]] as const;

export function CgpCameraPlatformDiagram() {
  return <Frame caption="平台抽象越厚，提供的系统越多；控制、可观测性与应用责任也随之变化。"><div role="img" aria-label="薄图形API到完整引擎和显示平台的抽象层比较" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{platforms.map(([name, owns, tradeoff]) => <div key={name} className="min-h-32 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{name}</strong><p className="mb-0 mt-2 text-xs text-success">Owns: {owns}</p><p className="mb-0 mt-2 border-t border-border pt-2 text-xs text-secondary">Tradeoff: {tradeoff}</p></div>)}</div></Frame>;
}
