import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const samplingPath = [
  ["Coordinates", "UV / direction / position"],
  ["Footprint", "gradients + LOD + anisotropy"],
  ["Fetch", "address + cache + decompress"],
  ["Decode", "linear color / numeric data"],
] as const;

export function RtrTexturingDiagram() {
  return (
    <Frame caption="纹理采样必须同时追踪坐标、足迹、存取和数据解码。">
      <div role="img" aria-label="完整纹理采样管线" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {samplingPath.map(([title, detail], index) => (
          <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3">
            <span className="text-xs font-bold text-accent">0{index + 1}</span>
            <strong className="mt-2 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>
            {index < samplingPath.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function RtrTextureFootprintDiagram() {
  return (
    <Frame caption="一个斜视像素映射为纹理域椭圆；各向同性 mip 会扩成圆并丢失短轴细节。">
      <div role="img" aria-label="屏幕像素到纹理域椭圆足迹和过滤策略" className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="grid aspect-[4/3] place-items-center border border-border bg-bg/45 p-4">
          <div className="grid size-20 place-items-center border-2 border-accent bg-accent/10 text-center text-xs font-semibold text-primary">screen<br />pixel</div>
        </div>
        <div className="text-center text-2xl font-bold text-accent">→ J →</div>
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border border-border bg-bg/45 p-4">
          <div className="h-16 w-4/5 rotate-[-18deg] rounded-[50%] border-2 border-warning bg-warning/10" />
          <span className="absolute bottom-3 text-xs text-secondary">texture-space footprint</span>
        </div>
        <div className="grid gap-2 text-xs md:col-span-3 sm:grid-cols-3">
          <span className="border-l-4 border-success bg-success/10 p-2 text-primary">Magnify: reconstruction</span>
          <span className="border-l-4 border-warning bg-warning/10 p-2 text-primary">Minify: prefilter + mip</span>
          <span className="border-l-4 border-accent bg-accent/10 p-2 text-primary">High ratio: anisotropic samples</span>
        </div>
      </div>
    </Frame>
  );
}

const frameInputs = ["HDR color", "linear depth", "normal / material", "motion vector"] as const;
const effects = ["SSAO / SSR", "DoF / motion blur", "bloom / tone map", "TAA / upscale"] as const;

export function RtrImageSpaceDiagram() {
  return (
    <Frame caption="图像空间效果复用当前 buffers，并以重投影和有效性测试连接历史。">
      <div role="img" aria-label="图像空间输入、效果和历史重投影数据流" className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="grid gap-2">
          <strong className="text-sm text-primary">Current buffers</strong>
          {frameInputs.map((item) => <span key={item} className="border border-border bg-bg/45 p-2 text-xs text-secondary">{item}</span>)}
        </div>
        <div className="grid place-items-center text-xl text-accent">→</div>
        <div className="grid gap-2">
          <strong className="text-sm text-primary">Screen-space passes</strong>
          {effects.map((item) => <span key={item} className="border border-border bg-bg/45 p-2 text-xs text-secondary">{item}</span>)}
        </div>
        <div className="grid place-items-center text-xl text-accent">↔</div>
        <div className="grid content-center gap-2 border border-border bg-bg/45 p-3">
          <strong className="text-sm text-primary">History</strong>
          <span className="text-xs text-secondary">reproject by motion</span>
          <span className="text-xs text-warning">reject: depth / normal / bounds</span>
          <span className="text-xs text-accent">clamp + confidence + blend</span>
        </div>
      </div>
    </Frame>
  );
}
