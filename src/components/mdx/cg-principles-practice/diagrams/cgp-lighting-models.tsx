import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const chain = [["Light", "spectrum + radiance"], ["Geometry", "direction + visibility"], ["Material", "BSDF / volume response"], ["Color", "XYZ + working RGB"], ["Shader", "sample + approximate"], ["Display", "tone + gamut + transfer"]] as const;

export function CgpLightingModelsDiagram() {
  return <Frame caption="物理光经几何和材质成为辐亮度，再由颜色与显示管线形成观察信号。"><div role="img" aria-label="光几何材质颜色着色器显示完整数据链" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{chain.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="text-xs font-bold text-accent">0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < chain.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const scattering = [["Surface reflection", "BRDF", "coating / rough interface"], ["Surface transmission", "BTDF", "refraction / absorption"], ["Subsurface", "BSSRDF / diffusion", "skin / wax / milk"], ["Volume", "phase + extinction", "fog / smoke"], ["Object / layered", "mixture + geometry", "fiber / flake / layers"]] as const;

export function CgpScatteringDiagram() {
  return <Frame caption="材质接口要区分反射、透射、次表面、体积和层状对象级散射。"><div role="img" aria-label="五类材质散射模型与典型对象" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{scattering.map(([name, model, use]) => <div key={name} className="min-h-32 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{name}</strong><p className="mb-0 mt-2 text-xs text-success">Model: {model}</p><p className="mb-0 mt-2 border-t border-border pt-2 text-xs text-secondary">Use: {use}</p></div>)}</div></Frame>;
}

const shader = [["Vertex / primitive", "geometry + attributes", "per vertex / primitive"], ["Interpolation", "perspective varyings", "per covered sample"], ["Fragment / sample", "material + light", "pixel/sample/VRS"], ["Scene-linear output", "radiance + alpha", "before display transform"], ["Post / display", "tone + gamut + encode", "per output pixel"]] as const;

export function CgpShaderColorDiagram() {
  return <Frame caption="每个 shader stage 都要声明输入空间、插值、执行频率与输出颜色语义。"><div role="img" aria-label="顶点插值片段场景线性输出和显示着色流程" className="grid gap-2 md:grid-cols-5">{shader.map(([title, data, frequency], index) => <div key={title} className="relative min-h-32 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{title}</strong><p className="mb-0 mt-2 text-xs text-secondary">Data: {data}</p><p className="mb-0 mt-2 text-xs text-warning">Frequency: {frequency}</p>{index < shader.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}
