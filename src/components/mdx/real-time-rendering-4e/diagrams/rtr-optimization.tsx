import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const optimizationLoop = [
  ["Measure", "CPU / GPU / present timeline + percentiles"],
  ["Hypothesize", "draw / vertex / pixel / memory / wait bound"],
  ["Scale one axis", "controlled workload + identical output"],
  ["Verify", "time slope + counters + regression"],
] as const;

export function RtrOptimizationDiagram() {
  return (
    <Frame caption="优化是测量、假设、单维度实验和回归组成的循环，不是固定技巧顺序。">
      <div role="img" aria-label="渲染性能诊断与验证循环" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {optimizationLoop.map(([title, detail], index) => (
          <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3">
            <span className="text-xs font-bold text-accent">0{index + 1}</span>
            <strong className="mt-2 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>
            {index < optimizationLoop.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}
          </div>
        ))}
      </div>
    </Frame>
  );
}

const queryPath = [
  ["Objects / primitives", "bounds + motion + masks"],
  ["Acceleration", "BVH / grid / hierarchy / sort"],
  ["Broad candidates", "conservative possible pairs"],
  ["Exact test", "ray / SAT / GJK / primitive"],
  ["Result", "visible / hit / contact / TOI"],
] as const;

export function RtrAccelerationDiagram() {
  return (
    <Frame caption="空间结构只减少候选；最终可见性、命中和接触仍由稳健窄相位决定。">
      <div role="img" aria-label="空间加速、宽相位和精确相交查询漏斗" className="grid gap-2 md:grid-cols-5">
        {queryPath.map(([title, detail], index) => (
          <div key={title} className="relative min-h-32 border border-border bg-bg/45 p-3">
            <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">{index + 1}</span>
            <strong className="mt-3 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>
            {index < queryPath.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
        <span className="border-l-4 border-success bg-success/10 p-2 text-primary">Conservative broad phase</span>
        <span className="border-l-4 border-warning bg-warning/10 p-2 text-primary">Watertight / scale-aware tests</span>
        <span className="border-l-4 border-accent bg-accent/10 p-2 text-primary">Update cost + query cost</span>
      </div>
    </Frame>
  );
}

const systems = [
  ["Efficient shading", "GPU-driven / forward+ / VRS", "pixels, memory, queues"],
  ["VR / AR", "prediction / stereo / foveation", "motion-to-photon, pose error"],
  ["Collision", "broad/narrow / CCD / solver", "misses, TOI, penetration"],
  ["Future feature", "ray / neural / virtualized data", "reference, power, fallback"],
] as const;

export function RtrRealtimeSystemsDiagram() {
  return (
    <Frame caption="实时特性最终都要回到工作量、正确性、延迟、平台和回退五项门槛。">
      <div role="img" aria-label="高效着色、XR、碰撞与未来技术的统一验收维度" className="grid gap-3 md:grid-cols-2">
        {systems.map(([title, method, evidence], index) => (
          <div key={title} className="grid min-h-28 grid-cols-[2.25rem_1fr] gap-3 border border-border bg-bg/45 p-3">
            <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
            <div>
              <strong className="text-sm text-primary">{title}</strong>
              <p className="mb-0 mt-1 text-xs text-secondary">Method: {method}</p>
              <p className="mb-0 mt-2 border-t border-border pt-2 text-xs text-warning">Evidence: {evidence}</p>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
