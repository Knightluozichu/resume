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
    label: "视空间输入",
    detail: "gPosition、gNormal 与采样核处在视空间；noise 只改变核绕法线的转角。",
    code: "TBN = mat3(tangent, bitangent, normal)",
    color: "var(--accent)",
  },
  {
    label: "投影并比较深度",
    detail: "半球样本投回屏幕，读取该处 G-buffer 深度；bias 与 range check 抑制误判。",
    code: "sampleDepth >= samplePos.z + bias",
    color: "var(--warning)",
  },
  {
    label: "去噪后只压环境光",
    detail: "随机旋转打散条带，AO 图模糊后只乘 ambient，不乘直接光。",
    code: "lighting = ambient * AO + direct",
    color: "var(--success)",
  },
  {
    label: "屏幕空间边界",
    detail: "看不见、在屏幕外或被遮挡在后方的几何没有深度记录，不能参与 SSAO。",
    code: "plausible local approximation, not global AO",
    color: "var(--danger)",
  },
] as const;

export function SsaoSamplingContractDiagram() {
  return (
    <Frame caption="SSAO 的采样契约：所有比较在同一视空间完成，投影后只读取当前屏幕可见的深度。它能高效补足局部接触暗角，却无法看见屏幕外或被遮挡在后方的几何。">
      <div
        role="img"
        aria-label="SSAO 采样契约图，展示视空间 G-buffer 和随机旋转核、投影深度比较与范围检查、模糊后只乘环境光，以及屏幕空间无法访问屏幕外几何"
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
