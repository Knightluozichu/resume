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
    label: "几何 pass：只记录",
    detail: "MRT 写 gPosition、gNormal、gAlbedoSpec；此阶段不累加每盏灯。",
    code: "RGBA16F pos / RGBA16F normal / RGBA8 albedo+spec",
    color: "var(--accent)",
  },
  {
    label: "同一坐标空间",
    detail: "位置、法线、光源和观察位置必须同在世界空间或同在视空间。",
    code: "gNormal = normalize(worldNormal)",
    color: "var(--warning)",
  },
  {
    label: "光照 pass：一次重建",
    detail: "全屏 pass 按像素采样 G-buffer，再对影响该像素的灯累加光照。",
    code: "lighting(gPosition, gNormal, gAlbedoSpec)",
    color: "var(--success)",
  },
  {
    label: "混合管线收尾",
    detail: "不透明物体适合延迟；透明与特殊材质通常在之后以前向路径绘制。",
    code: "deferred opaque -> forward transparent",
    color: "var(--danger)",
  },
] as const;

export function DeferredGBufferContractDiagram() {
  return (
    <Frame caption="延迟着色的 G-buffer 契约：先完整记录不透明表面的几何事实，再在同一坐标空间中做全屏光照。法线在浮点附件中保留 [-1,1] 的原值；只有调试显示时才映射成颜色。">
      <div
        role="img"
        aria-label="延迟着色 G-buffer 契约图，展示 MRT 记录位置法线反照率、统一坐标空间、全屏光照 pass，以及透明对象走前向混合路径"
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
