import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const chain = [["Geometry", "continuous primitives / rays"], ["Coverage", "sample positions + visibility"], ["Image", "channels + alpha + encoding"], ["Filter", "convolution + reconstruction"], ["Texture", "surface footprint + mip"], ["GPU", "parallel work + locality"]] as const;

export function CgpRasterGraphicsDiagram() {
  return <Frame caption="六章共同描述从连续几何到离散图像、再到纹理和硬件执行的采样链。"><div role="img" aria-label="几何覆盖图像过滤纹理和GPU的完整采样链" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{chain.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="text-xs font-bold text-accent">0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < chain.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const sampling = [["Continuous signal", "geometry / radiance / texture"], ["Prefilter", "remove unresolved frequencies"], ["Samples", "spatial + temporal measurements"], ["Reconstruct", "kernel + finite support"], ["Output", "display / next sampling stage"]] as const;

export function CgpSamplingDiagram() {
  return <Frame caption="抗锯齿不是事后模糊：在采样前限制频率，在输出时按明确 kernel 重建。"><div role="img" aria-label="连续信号预滤波采样重建与输出流程" className="grid gap-2 md:grid-cols-5">{sampling.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="grid size-7 place-items-center rounded-full bg-warning/15 text-xs font-bold text-warning">{index + 1}</span><strong className="mt-3 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < sampling.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div><div className="mt-3 grid gap-2 text-xs sm:grid-cols-3"><span className="border-l-4 border-success bg-success/10 p-2 text-primary">space: edge / texture</span><span className="border-l-4 border-warning bg-warning/10 p-2 text-primary">time: motion / flicker</span><span className="border-l-4 border-accent bg-accent/10 p-2 text-primary">semantics: color / alpha / normal</span></div></Frame>;
}

const gpu = [["Command front end", "work + state"], ["Raster / setup", "primitive → coverage"], ["Shader groups", "SIMT arithmetic"], ["Texture / cache", "filtered reads + locality"], ["Depth / blend", "visibility + output"], ["Memory / display", "bandwidth + present"]] as const;

export function CgpGpuDataflowDiagram() {
  return <Frame caption="现代 GPU 以专用单元、shader groups、cache 与 memory controllers 协作追求吞吐。"><div role="img" aria-label="现代GPU命令光栅着色纹理深度内存数据流" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{gpu.map(([name, role], index) => <div key={name} className="relative min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{name}</strong><span className="mt-2 block text-xs text-secondary">{role}</span>{index < gpu.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-10 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}
