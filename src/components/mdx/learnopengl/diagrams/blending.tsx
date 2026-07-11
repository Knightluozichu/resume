import type { ReactNode } from "react";

export { AlphaSortDiagram } from "../../diagrams/alpha-sort-diagram";
export { BlendEquationDiagram } from "../../diagrams/blend-equation-diagram";
export { BlendSortStepDiagram } from "../../diagrams/blend-sort-step-diagram";
export { DiscardVsBlendDiagram } from "../../diagrams/discard-vs-blend-diagram";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

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

const alphaModes = [
  {
    title: "直通 alpha",
    texture: "RGB 未预乘",
    factors: "SRC_ALPHA, ONE_MINUS_SRC_ALPHA",
    formula: "src.rgb * src.a + dst.rgb * (1-src.a)",
    color: accent,
  },
  {
    title: "预乘 alpha",
    texture: "RGB 已乘 alpha",
    factors: "ONE, ONE_MINUS_SRC_ALPHA",
    formula: "src.rgb + dst.rgb * (1-src.a)",
    color: success,
  },
] as const;

export function BlendAlphaModeDiagram() {
  return (
    <Frame caption="纹理存储约定必须和 blend factors 配套。把预乘纹理当直通 alpha 再乘一次会发暗；把直通纹理当预乘则会产生亮边。">
      <div role="img" aria-label="直通 alpha 与预乘 alpha 的纹理 RGB 含义、混合因子和计算公式对比" className="grid gap-3 md:grid-cols-2">
        {alphaModes.map((mode) => (
          <div key={mode.title} className="rounded-control border border-border bg-bg/40 p-3">
            <strong className="text-sm" style={{ color: mode.color }}>{mode.title}</strong>
            <p className="mt-2 text-xs text-secondary">纹理：{mode.texture}</p>
            <p className="mt-3 break-words font-mono text-[10px]" style={{ color: mode.color }}>{mode.factors}</p>
            <p className="mt-2 break-words font-mono text-[10px] text-secondary">{mode.formula}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const passStages = [
  { title: "不透明 pass", detail: "深度测试开，深度写入开", result: "建立可靠 opaque depth", color: accent },
  { title: "透明排序", detail: "保留重复项，按相机距离远到近", result: "决定 source-over 累积顺序", color: warning },
  { title: "透明 pass", detail: "深度测试开，通常深度写入关", result: "被不透明物遮挡，透明层逐层混合", color: success },
  { title: "恢复状态", detail: "depth mask / blend state / equation", result: "不污染下一帧或后续 pass", color: accent },
] as const;

export function TransparencyPassDiagram() {
  return (
    <Frame caption="经典透明管线是四阶段契约。它适合可按对象排序的表面；相交、循环遮挡或大量粒子需要拆分几何、加权混合等 OIT 方案。">
      <div role="img" aria-label="先画不透明物建立深度，再对透明物稳定排序，保持深度测试并通常关闭深度写入进行混合，最后恢复状态" className="grid gap-2 sm:grid-cols-4">
        {passStages.map((stage, index) => (
          <div key={stage.title} className="relative rounded-control border border-border bg-bg/40 p-3">
            <strong className="text-xs" style={{ color: stage.color }}>{index + 1}. {stage.title}</strong>
            <p className="mt-2 text-xs text-secondary">{stage.detail}</p>
            <p className="mt-2 text-[10px]" style={{ color: stage.color }}>{stage.result}</p>
            {index < passStages.length - 1 ? <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-secondary sm:block">→</span> : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}
