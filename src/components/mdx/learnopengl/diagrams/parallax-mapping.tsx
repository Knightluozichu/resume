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
    label: "输入空间",
    detail: "viewDir 必须已在切线空间；深度图的黑白约定要和偏移方向配套。",
    code: "V = normalize(tangentViewPos - tangentFragPos)",
    color: "var(--accent)",
  },
  {
    label: "命中坐标",
    detail: "基础视差一次偏移；陡峭视差分层查找；POM 在相邻两层间插值。",
    code: "sampleUv = uv - V.xy / V.z * depth * scale",
    color: "var(--warning)",
  },
  {
    label: "同一最终 UV",
    detail: "颜色和法线必须采样 sampleUv；不能只偏移其中一张贴图。",
    code: "albedo(sampleUv), normal(sampleUv)",
    color: "var(--success)",
  },
  {
    label: "平面边界",
    detail: "sampleUv 越出 [0,1] 时可 discard，去掉平面边缘的拉伸，但不会改变模型轮廓。",
    code: "if (outOfRange(sampleUv)) discard",
    color: "var(--danger)",
  },
] as const;

export function ParallaxSamplingContractDiagram() {
  return (
    <Frame caption="视差贴图的实现契约：在切线空间找出最终采样坐标，然后让颜色图与法线图共同使用它。POM 只把 UV 命中点估得更准，依旧不会位移顶点或改变物体的外轮廓。">
      <div
        role="img"
        aria-label="视差贴图采样契约图，依次展示切线空间视线、由深度图计算最终采样坐标、颜色与法线共享最终坐标，以及越界坐标可丢弃但不会改变轮廓"
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
