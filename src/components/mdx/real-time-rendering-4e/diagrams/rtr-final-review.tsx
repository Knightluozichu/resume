import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const layers = [
  ["Frame & hardware", "Ch1-3, 23", "pipeline, GPU, memory, present"],
  ["Space & geometry", "Ch4, 16-17", "transforms, meshes, curves"],
  ["Appearance & sampling", "Ch5-6, 8-10, 12-15", "light, material, texture, volume, style"],
  ["Visibility & transport", "Ch7, 11, 26", "shadows, GI, ray tracing"],
  ["Queries & real-time", "Ch18-22, 24-25", "optimization, XR, intersection, collision"],
] as const;

export function RtrFinalReviewDiagram() {
  return (
    <Frame caption="官方 26 章归入五层，但每层都通过数据与时间依赖相互连接。">
      <div role="img" aria-label="Real-Time Rendering 第四版 26 章五层能力地图" className="grid gap-2">
        {layers.map(([title, chapters, detail], index) => (
          <div key={title} className="grid min-h-16 grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 border border-border bg-bg/45 p-3 sm:grid-cols-[2rem_10rem_8rem_1fr]">
            <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
            <strong className="text-sm text-primary">{title}</strong>
            <span className="text-xs font-semibold text-warning">{chapters}</span>
            <span className="col-start-2 text-xs text-secondary sm:col-start-auto">{detail}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const failures = [
  ["Wrong image / geometry", "space → topology → resource → visibility → intersection"],
  ["Wrong energy / material", "encoding → units → BRDF → shadow → GI → display"],
  ["Flicker / ghost / swim", "footprint → LOD → motion → history → filter / bias"],
  ["Hitch / latency", "CPU → GPU queues → build / stream → present → display"],
] as const;

export function RtrFailureTreeDiagram() {
  return (
    <Frame caption="先按症状选择证据链，再寻找最早错误生产者。">
      <div role="img" aria-label="实时渲染正确性、外观、时域和性能故障树" className="grid gap-3 md:grid-cols-2">
        {failures.map(([symptom, path], index) => (
          <div key={symptom} className="grid min-h-28 grid-cols-[2.25rem_1fr] gap-3 border border-border bg-bg/45 p-3">
            <span className="grid size-9 place-items-center rounded-full bg-warning/15 text-sm font-bold text-warning">{index + 1}</span>
            <div>
              <strong className="text-sm text-primary">{symptom}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">Trace: {path}</p>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const gates = [
  ["Correctness", "analytic + reference", "space, energy, visibility, contacts"],
  ["Visual quality", "error + failure scenes", "detail, bias, leaks, reconstruction"],
  ["Temporal", "fixed camera/object paths", "flicker, lag, disocclusion, stability"],
  ["Performance", "P50 / P95 / P99", "CPU, GPU, present, build, stream"],
  ["Resources", "device captures", "memory, bandwidth, power, residency"],
  ["Fallback", "feature matrix", "quality tiers, unsupported and over-budget"],
] as const;

export function RtrAcceptanceDiagram() {
  return (
    <Frame caption="任何实时特性都要同时越过六个门槛，不能只用平均帧率或单帧截图验收。">
      <div role="img" aria-label="实时渲染六维验收矩阵" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {gates.map(([name, evidence, scope]) => (
          <div key={name} className="min-h-32 border border-border bg-bg/45 p-3">
            <strong className="text-sm text-primary">{name}</strong>
            <p className="mb-0 mt-2 text-xs text-success">Evidence: {evidence}</p>
            <p className="mb-0 mt-2 border-t border-border pt-2 text-xs text-secondary">Covers: {scope}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}
