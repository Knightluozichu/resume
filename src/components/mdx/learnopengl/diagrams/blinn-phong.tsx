import type { ReactNode } from "react";

export { HalfVectorDiagram } from "../../diagrams/half-vector-diagram";
export { PhongBlinnHighlightDiagram } from "../../diagrams/phong-blinn-highlight-diagram";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

type BoundaryStep = 1 | 2 | 3;

const boundaryRows = [
  {
    title: "Phong 的测量对象",
    formula: "spec = pow(max(dot(R, V), 0), n)",
    detail: "低指数时，高光范围会延伸到 R 与 V 夹角超过 90 度的区域。",
    result: "R dot V < 0 会被截成 0，出现硬边",
    color: "var(--danger)",
  },
  {
    title: "Blinn 的替代对象",
    formula: "H = normalize(L + V); spec = pow(max(dot(N, H), 0), n)",
    detail: "在受光面 N dot L > 0 且光不在表面下方的条件下，H 与 N 不会跨过 90 度。",
    result: "高光可连续衰减，不发生该截断",
    color: "var(--success)",
  },
  {
    title: "保持同样大小",
    formula: "Phong n = 8  ->  Blinn n = 16..32",
    detail: "N dot H 往往比 R dot V 更接近 1；相同指数会让 Blinn 高光更宽。",
    result: "以 2 到 4 倍为起点，再按材质调参",
    color: "var(--warning)",
  },
] as const;

export function BlinnPhongBoundaryDiagram({ step = 3 }: { step?: BoundaryStep }) {
  const visibleRows = boundaryRows.slice(0, step);

  return (
    <Frame caption="Blinn-Phong 解决的是 Phong 在低镜面指数下的镜面截断，不是自动获得能量守恒。它仍是经验模型；若追求物理一致性，需要后续的微表面 PBR 模型。">
      <div
        role="img"
        aria-label="Blinn-Phong 镜面边界图，先显示 Phong 的 R 点乘 V 小于零被截断，再显示 Blinn 的 N 点乘 H 在受光条件下连续衰减，最后显示 Phong 指数八对应 Blinn 指数十六到三十二的经验匹配范围"
        className="grid gap-3"
      >
        {visibleRows.map((row, index) => (
          <div key={row.title} className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 sm:grid-cols-[1.1fr_1.55fr_1.45fr] sm:items-center">
            <strong className="text-sm" style={{ color: row.color }}>{index + 1}. {row.title}</strong>
            <div>
              <code className="block break-words text-xs text-primary">{row.formula}</code>
              <p className="mt-2 text-xs leading-5 text-secondary">{row.detail}</p>
            </div>
            <p className="text-xs leading-5" style={{ color: row.color }}>{row.result}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function BlinnExponentMatchDiagram() {
  return (
    <Frame caption="原教程的具体比较是 Phong 指数 8 对 Blinn 指数 32。2 到 4 倍只是使高光宽度接近的经验起点，不能替代在目标光照与颜色空间中的实际校准。">
      <div
        role="img"
        aria-label="Phong 与 Blinn 镜面指数匹配图，显示 Phong 八的较宽高光、Blinn 同指数更宽高光，以及 Blinn 三十二与 Phong 八宽度接近的经验匹配"
        className="grid gap-3 md:grid-cols-3"
      >
        <div className="rounded-control border border-border bg-bg/40 p-3">
          <strong className="text-sm text-accent">Phong n = 8</strong>
          <div className="mt-4 h-3 rounded-full bg-accent/40" />
          <p className="mt-3 text-xs text-secondary">原教程的低指数对照基准。</p>
        </div>
        <div className="rounded-control border border-border bg-bg/40 p-3">
          <strong className="text-sm text-danger">Blinn n = 8</strong>
          <div className="mt-4 h-3 rounded-full bg-danger/55" />
          <p className="mt-3 text-xs text-secondary">同指数通常更宽、更软，不能直接复用。</p>
        </div>
        <div className="rounded-control border border-border bg-bg/40 p-3">
          <strong className="text-sm text-success">Blinn n = 32</strong>
          <div className="mx-auto mt-4 h-3 w-1/2 rounded-full bg-success/55" />
          <p className="mt-3 text-xs text-secondary">4 倍示例，宽度更接近 Phong n = 8。</p>
        </div>
      </div>
    </Frame>
  );
}
