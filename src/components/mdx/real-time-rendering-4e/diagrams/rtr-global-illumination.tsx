import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const transport = [
  ["Emitter", "Le / sampled light"],
  ["Visibility", "shadow ray / cached approximation"],
  ["Surface transport", "BRDF + direct / indirect bounce"],
  ["Estimator", "samples / PDF / reuse / filter"],
] as const;

export function RtrGlobalIlluminationDiagram() {
  return (
    <Frame caption="GI 是 emission、visibility、surface transport 与 estimator 的联合问题。">
      <div role="img" aria-label="全局光照传输与估计路径" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {transport.map(([title, detail], index) => (
          <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3">
            <span className="text-xs font-bold text-accent">0{index + 1}</span>
            <strong className="mt-2 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>
            {index < transport.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}
          </div>
        ))}
      </div>
    </Frame>
  );
}

const giMethods = [
  ["Lightmap", "static surface cache", "high stable quality", "UV + static changes"],
  ["Probe / DDGI", "sparse spatial cache", "dynamic low frequency", "leaks + update lag"],
  ["Screen-space", "visible frame buffers", "cheap near-field detail", "off-screen missing"],
  ["Voxel / SDF", "coarse spatial field", "wide coverage", "memory + thin geometry"],
  ["Ray traced", "geometry path samples", "visibility + high detail", "variance + traversal"],
  ["Hybrid", "confidence-weighted layers", "coverage and detail", "transition consistency"],
] as const;

export function RtrGiMethodsDiagram() {
  return (
    <Frame caption="实时 GI 方法由缓存的信息、更新频率、覆盖范围和 fallback 决定。">
      <div role="img" aria-label="六类实时全局光照方法比较" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {giMethods.map(([name, data, strength, risk]) => (
          <div key={name} className="min-h-36 border border-border bg-bg/45 p-3">
            <strong className="text-sm text-primary">{name}</strong>
            <p className="mb-0 mt-2 text-xs text-secondary">Data: {data}</p>
            <p className="mb-0 mt-2 text-xs text-success">Use: {strength}</p>
            <p className="mb-0 mt-2 text-xs text-warning">Risk: {risk}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const rayStages = [
  ["Generate", "origin / direction / mask / payload"],
  ["TLAS", "instance bounds + transforms"],
  ["BLAS", "geometry bounds + primitives"],
  ["Hit / miss", "material + visibility + environment"],
  ["Reuse", "temporal / spatial / reservoir"],
  ["Denoise", "variance + edge-aware filter"],
] as const;

export function RtrRayTracingDiagram() {
  return (
    <Frame caption="硬件 traversal 只是中段；scene build、shading、复用和降噪同样属于实时光追。">
      <div role="img" aria-label="实时光线追踪从射线生成到降噪的完整数据流" className="grid gap-2 md:grid-cols-3 lg:grid-cols-6">
        {rayStages.map(([title, detail], index) => (
          <div key={title} className="relative min-h-32 border border-border bg-bg/45 p-3">
            <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">{index + 1}</span>
            <strong className="mt-3 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>
            {index < rayStages.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}
          </div>
        ))}
      </div>
    </Frame>
  );
}
