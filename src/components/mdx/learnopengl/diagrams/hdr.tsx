import type { ReactNode } from "react";

type Step = 1 | 2 | 3;

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
    label: "线性 HDR 计算",
    detail: "光照叠加的值可以大于 1；此时绝不能写进 RGBA8。",
    code: "linearRadiance = direct + indirect + emission",
    color: "var(--accent)",
  },
  {
    label: "浮点中间缓冲",
    detail: "第一遍把线性结果写入 RGBA16F，保住高光之间的相对差异。",
    code: "scene -> RGBA16F color attachment",
    color: "var(--warning)",
  },
  {
    label: "显示变换出口",
    detail: "第二遍先色调映射压回显示范围，最后才编码为 sRGB。",
    code: "toneMap(hdr) -> gammaEncode -> display",
    color: "var(--success)",
  },
] as const;

export function HdrOutputContractDiagram({ step = 3 }: { step?: Step }) {
  return (
    <Frame caption="HDR 的三段出口契约：在线性空间累积亮度，用浮点颜色附件保住大于 1 的中间结果，然后先色调映射、最后 gamma 编码。错误的顺序会让压缩曲线作用在非线性数据上。">
      <div
        role="img"
        aria-label="HDR 输出契约图，依次显示线性 HDR 光照计算、浮点 RGBA16F 中间缓冲、色调映射后 gamma 编码到显示器"
        className="grid gap-3"
      >
        {stages.slice(0, step).map((stage, index) => (
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
