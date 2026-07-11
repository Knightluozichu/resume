import type { ReactNode } from "react";

export { FaceCullingDiagram } from "../../diagrams/face-culling-diagram";
export { WindingCullStepDiagram } from "../../diagrams/winding-cull-step-diagram";
export { WindingOrderDiagram } from "../../diagrams/winding-order-diagram";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const pipelineStages = [
  { title: "顶点着色", detail: "所有顶点仍执行", cost: "剔除省不到", color: warning },
  { title: "装配与裁剪", detail: "形成裁剪后的三角形", cost: "准备窗口坐标", color: accent },
  { title: "判定与剔除", detail: "按屏幕有向面积判 front/back", cost: "整 primitive 丢弃", color: success },
  { title: "光栅与片段", detail: "仅保留面产生片段", cost: "主要节省区", color: accent },
] as const;

export function CullingPipelineDiagram() {
  return (
    <Frame caption="面剔除发生在顶点处理之后、光栅化之前：它省掉被剔 primitive 的光栅与片段工作，但不会省掉这些顶点已经执行的 vertex shader。">
      <div role="img" aria-label="所有顶点先执行着色和三角形装配裁剪，然后按窗口坐标环绕判定并剔除，只有保留面进入光栅化与片段着色" className="grid gap-2 sm:grid-cols-4">
        {pipelineStages.map((stage, index) => (
          <div key={stage.title} className="relative rounded-control border border-border bg-bg/40 p-3">
            <strong className="text-xs" style={{ color: stage.color }}>{index + 1}. {stage.title}</strong>
            <p className="mt-2 text-xs text-secondary">{stage.detail}</p>
            <p className="mt-2 text-[10px]" style={{ color: stage.color }}>{stage.cost}</p>
            {index < pipelineStages.length - 1 ? <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-secondary sm:block">→</span> : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}

const parityRows = [
  { transform: "det(M3x3) > 0", example: "平移 / 旋转 / 正缩放", winding: "保持", action: "沿用 CCW", color: success },
  { transform: "det(M3x3) < 0", example: "X=-1 镜像 / 奇数轴负缩放", winding: "翻转", action: "切 CW 或修索引", color: warning },
  { transform: "双面 / 开放网格", example: "草片 / 布 / 纸", winding: "两侧都需显示", action: "按材质关闭剔除", color: accent },
] as const;

export function CullingTransformParityDiagram() {
  return (
    <Frame caption="环绕由完整变换链的奇偶性决定。一个负尺度轴会镜像坐标并翻转窗口环绕；两个负轴又恢复原方向。">
      <div role="img" aria-label="正行列式变换保持环绕，负行列式镜像变换翻转环绕，双面开放网格应按材质关闭剔除" className="grid gap-3">
        {parityRows.map((row) => (
          <div key={row.transform} className="grid gap-1 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-[1fr_1.4fr_0.7fr_1fr] sm:items-center">
            <strong className="break-words font-mono" style={{ color: row.color }}>{row.transform}</strong>
            <span className="text-secondary">{row.example}</span>
            <span className="text-secondary">环绕：{row.winding}</span>
            <span style={{ color: row.color }}>{row.action}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
