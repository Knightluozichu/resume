import type { ReactNode } from "react";

export { ShadowAcneDiagram } from "../../diagrams/shadow-acne-diagram";
export { ShadowMapStepDiagram } from "../../diagrams/shadow-map-step-diagram";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

export function ShadowMapBoundaryContractDiagram() {
  const rows = [
    ["深度图范围", "光的投影视锥必须覆盖接收阴影与投影物", "范围外物体不会投影"],
    ["取样范围", "proj.xy 或 proj.z 超出 [0,1] 时不能重复取样", "边界白色 / 直接受光"],
    ["bias 边界", "先用斜率 bias 消 acne；过大则 panning", "可在深度遍前剔前面缓解"],
  ] as const;
  return <Frame caption="阴影映射除了两遍渲染，还要维护三个边界：光的投影视锥、深度图取样范围和 bias。否则再正确的 currentDepth 比较也会产生缺影、重复影或脱离影。"><div role="img" aria-label="阴影映射边界契约图，显示光的投影视锥必须覆盖物体、光空间坐标超出零到一时要判受光或使用白色边界、bias 要在消除阴影痤疮和避免 Peter Panning 之间平衡，并可通过深度遍前面剔除缓解" className="grid gap-3">{rows.map((row, index) => <div key={row[0]} className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-[1fr_1.6fr_1fr] sm:items-center"><strong className="text-accent">{index + 1}. {row[0]}</strong><span className="text-secondary">{row[1]}</span><span className="text-warning">{row[2]}</span></div>)}</div></Frame>;
}
