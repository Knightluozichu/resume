import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const spaces = [
  ["Model", "local geometry"],
  ["World", "shared scene"],
  ["View", "camera frame"],
  ["Clip", "homogeneous"],
  ["NDC", "divide by w"],
  ["Viewport", "pixels + depth"],
] as const;

export function RtrTransformsDiagram() {
  return (
    <Frame caption="变换链中 clip coordinates 与 NDC 由透视除法明确分隔。">
      <div role="img" aria-label="模型空间到屏幕空间的完整变换链" className="grid gap-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {spaces.map(([name, detail], index) => (
            <div key={name} className="relative min-h-20 border border-border bg-bg/45 p-3 text-center">
              <strong className="block text-sm text-primary">{name}</strong>
              <span className="mt-2 block text-xs text-secondary">{detail}</span>
              {index < spaces.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-7 z-10 text-accent">→</span>}
            </div>
          ))}
        </div>
        <div className="grid gap-2 text-xs sm:grid-cols-5">
          {["M", "V", "P", "perspective divide", "viewport transform"].map((label) => (
            <div key={label} className="border-t-2 border-accent/60 pt-2 text-center font-semibold text-accent">{label}</div>
          ))}
        </div>
        <div className="grid gap-2 text-xs sm:grid-cols-3">
          <p className="m-0 border-l-4 border-success bg-success/10 p-3 text-primary"><b>Point</b><br />(x, y, z, 1), translation applies</p>
          <p className="m-0 border-l-4 border-warning bg-warning/10 p-3 text-primary"><b>Direction</b><br />(x, y, z, 0), no translation</p>
          <p className="m-0 border-l-4 border-accent bg-accent/10 p-3 text-primary"><b>Normal</b><br />(M⁻¹)ᵀn, then normalize</p>
        </div>
      </div>
    </Frame>
  );
}

const meshChecks = [
  ["Topology", "indices, adjacency, winding, manifold/boundary"],
  ["Attributes", "normal, tangent, UV seams, skin weights"],
  ["Simplification", "edge collapse + geometric/attribute constraints"],
  ["Runtime LOD", "projected error + hysteresis + stable transitions"],
] as const;

export function RtrMeshTopologyDiagram() {
  return (
    <Frame caption="多边形表面从拓扑与属性一致性进入受屏幕误差约束的 LOD。">
      <div role="img" aria-label="网格拓扑、属性、简化与运行时 LOD 验收图" className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="grid gap-2">
          {meshChecks.slice(0, 2).map(([title, text]) => (
            <div key={title} className="min-h-24 border border-border bg-bg/45 p-3">
              <strong className="text-sm text-primary">{title}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{text}</p>
            </div>
          ))}
        </div>
        <div className="grid place-items-center text-2xl font-bold text-accent" aria-hidden="true">→</div>
        <div className="grid gap-2">
          {meshChecks.slice(2).map(([title, text]) => (
            <div key={title} className="min-h-24 border border-border bg-bg/45 p-3">
              <strong className="text-sm text-primary">{title}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-3 text-center text-xs text-secondary sm:col-span-3">
          Shared position ≠ shared vertex: hard normals, UV seams and material boundaries may require splits.
        </div>
      </div>
    </Frame>
  );
}

const representations = [
  ["Bézier", "4 controls / cubic segment", "de Casteljau, convex hull"],
  ["B-spline / NURBS", "local support + knots", "long curves, weighted conics"],
  ["Subdivision", "control cage → limit surface", "Catmull-Clark / Loop"],
  ["Tessellation", "limit/parametric → triangles", "screen error + shared edge factors"],
] as const;

export function RtrCurvesDiagram() {
  return (
    <Frame caption="连续表示最终要以一致的边界规则离散为实时三角形。">
      <div role="img" aria-label="Bezier、B-spline、细分曲面和自适应细分比较" className="grid gap-3 md:grid-cols-4">
        {representations.map(([title, model, check], index) => (
          <div key={title} className="relative min-h-36 border border-border bg-bg/45 p-3">
            <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">{index + 1}</span>
            <strong className="mt-3 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs text-secondary">{model}</span>
            <span className="mt-3 block border-t border-border pt-2 text-xs text-warning">Check: {check}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
        <span className="border-l-4 border-success bg-success/10 p-2 text-primary">Continuity: C⁰ / G¹ / C¹</span>
        <span className="border-l-4 border-warning bg-warning/10 p-2 text-primary">Error: curvature + silhouette + displacement</span>
        <span className="border-l-4 border-accent bg-accent/10 p-2 text-primary">Crack-free: shared edge factors</span>
      </div>
    </Frame>
  );
}
