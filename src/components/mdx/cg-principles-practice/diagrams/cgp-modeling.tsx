import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const reps = [["Boundary / mesh", "surface + adjacency", "raster / local edit"], ["Parametric", "C(t), S(u,v)", "evaluate + derivatives"], ["Implicit / SDF", "f(x)=0", "inside + distance + root"], ["Sampled field", "grid / voxel", "regular lookup + filtering"], ["Constructive", "CSG / hierarchy", "history + Boolean composition"]] as const;

export function CgpModelingDiagram() {
  return <Frame caption="表示选择由 query、误差、编辑和存储决定，不存在统一的先进顺序。"><div role="img" aria-label="边界参数隐式采样和构造形状表示比较" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{reps.map(([name, data, query]) => <div key={name} className="min-h-32 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{name}</strong><p className="mb-0 mt-2 text-xs text-success">Data: {data}</p><p className="mb-0 mt-2 border-t border-border pt-2 text-xs text-secondary">Query: {query}</p></div>)}</div></Frame>;
}

const curveSurface = [["Controls", "points + knots + topology"], ["Evaluate", "de Casteljau / de Boor / subdivision"], ["Derivatives", "tangent + normal + continuity"], ["Refine", "adaptive parameter / control mesh"], ["Discretize", "shared-edge tessellation + error"]] as const;

export function CgpCurveSurfaceDiagram() {
  return <Frame caption="曲线曲面从控制数据求值和微分，再按误差一致离散。"><div role="img" aria-label="样条和细分曲面从控制到离散的流程" className="grid gap-2 md:grid-cols-5">{curveSurface.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="grid size-7 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">{index + 1}</span><strong className="mt-3 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < curveSurface.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const meshLife = [["Acquire / create", "author / scan / extract"], ["Validate", "topology + orientation + seams"], ["Repair", "semantic tolerance + provenance"], ["Simplify / LOD", "error + constraints + transitions"], ["Layout", "indices + cache + compression"], ["Render / query", "visibility + shading + collision"]] as const;

export function CgpMeshLifecycleDiagram() {
  return <Frame caption="Mesh 是有语义和误差账本的生命周期数据，不只是 vertex/index arrays。"><div role="img" aria-label="网格创建验证修复简化布局和运行查询生命周期" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{meshLife.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < meshLife.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-10 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}
