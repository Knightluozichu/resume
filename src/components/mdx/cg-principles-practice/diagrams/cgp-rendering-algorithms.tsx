import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const transport = [["Represent", "geometry + lights + BSDF"], ["Sample", "paths + directions + PDF"], ["Visibility", "depth/ray/occlusion query"], ["Accumulate", "weighted contributions"], ["Estimate", "image + variance/error"], ["Validate", "reference + convergence + cost"]] as const;

export function CgpRenderingAlgorithmsDiagram() {
  return <Frame caption="渲染器把场景表示转为随机或确定样本，经可见性查询累积成图像估计。"><div role="img" aria-label="光传输从表示采样可见性累积估计到验证的流程" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{transport.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="text-xs font-bold text-accent">0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < transport.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const methods = [["Radiosity", "diffuse finite elements", "basis/form factors", "discretization + solve"], ["Path tracing", "camera random walks", "general BSDF paths", "variance"], ["BDPT / MLT", "connect/mutate paths", "difficult path families", "complex weights"], ["Photon mapping", "light photons + density", "caustics / reuse", "radius bias"], ["Raster approx", "limited local paths", "real-time direct", "missing transport"]] as const;

export function CgpTransportMethodsDiagram() {
  return <Frame caption="求解方法选择不同 basis/path samples，并以不同 bias、variance、memory 和路径覆盖换成本。"><div role="img" aria-label="Radiosity路径追踪双向Metropolis光子映射和光栅近似比较" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{methods.map(([name, rep, use, risk]) => <div key={name} className="min-h-36 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{name}</strong><p className="mb-0 mt-2 text-xs text-secondary">Rep: {rep}</p><p className="mb-0 mt-2 text-xs text-success">Use: {use}</p><p className="mb-0 mt-2 text-xs text-warning">Risk: {risk}</p></div>)}</div></Frame>;
}

const funnel = [["Scene objects", "N primitives / instances"], ["Conservative cull", "frustum / backface / sectors"], ["Spatial nodes", "BVH / kd / grid / octree"], ["Candidates", "bounds / depth / overlap"], ["Exact visibility", "nearest hit / sample coverage"], ["Contribution", "shade / composite / reject"]] as const;

export function CgpVisibilityStructureDiagram() {
  return <Frame caption="空间结构和剔除只减少候选；最终 visibility 必须保持保守或精确语义。"><div role="img" aria-label="场景对象经剔除空间结构候选到精确可见性的漏斗" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{funnel.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < funnel.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-10 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}
