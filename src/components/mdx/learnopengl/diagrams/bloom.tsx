import type { ReactNode } from "react";

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

const stages = [
  {
    label: "同一 HDR 几何 pass",
    detail: "MRT 同时写场景颜色与阈值筛出的亮区；不用重渲场景。",
    code: "sceneColor + brightColor",
    color: "var(--accent)",
  },
  {
    label: "只模糊亮区",
    detail: "横向和纵向一维高斯交替执行；乒乓 FBO 避免读写同一张纹理。",
    code: "bright -> blurH -> blurV -> ...",
    color: "var(--warning)",
  },
  {
    label: "在线性 HDR 合成",
    detail: "先加 scene + blurredBloom，再色调映射和 gamma；不要在显示空间相加。",
    code: "toneMap(scene + blurredBloom)",
    color: "var(--success)",
  },
  {
    label: "HDR 是范围优势",
    detail: "LDR 也能做 bloom，但阈值只能落在 [0,1] 内，较容易把普通浅色误选为亮区。",
    code: "HDR allows threshold > 1.0",
    color: "var(--danger)",
  },
] as const;

export function BloomCompositionContractDiagram() {
  return (
    <Frame caption="泛光的合成契约：只对提取出的亮区做模糊，并在线性 HDR 空间与原场景相加后再显示变换。HDR 不是泛光的同义词，却给亮度阈值更大的可用范围。">
      <div
        role="img"
        aria-label="泛光合成契约图，显示 MRT 生成场景色与亮区色、乒乓高斯只模糊亮区、在线性 HDR 合成后色调映射，以及 HDR 让阈值可大于 1"
        className="grid gap-3"
      >
        {stages.map((stage, index) => (
          <div
            key={stage.label}
            className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 sm:grid-cols-[1fr_1.65fr_1.75fr] sm:items-center"
          >
            <strong className="text-sm" style={{ color: stage.color }}>
              {index + 1}. {stage.label}
            </strong>
            <p className="text-xs leading-5 text-secondary">{stage.detail}</p>
            <code className="break-words text-xs text-primary">{stage.code}</code>
          </div>
        ))}
      </div>
    </Frame>
  );
}
