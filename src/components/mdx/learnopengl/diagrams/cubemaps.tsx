import type { ReactNode } from "react";

export { Cubemap6FacesDiagram } from "../../diagrams/cubemap-6faces-diagram";
export { ReflectionRefractionDiagram } from "../../diagrams/reflection-refraction-diagram";
export { SkyboxDiagram } from "../../diagrams/skybox-diagram";
export { CubemapDemo } from "../../cubemap-demo";

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

const rows = [
  {
    title: "静态 cubemap",
    input: "预拍 6 面环境",
    sees: "天空与固定远景",
    cost: "一次加载",
    limit: "看不到场景动态物体",
    color: success,
  },
  {
    title: "动态环境 probe",
    input: "物体位置 6 个 90° 相机",
    sees: "当前周围场景",
    cost: "每次更新渲染 6 遍",
    limit: "通常排除被反射物自身",
    color: warning,
  },
  {
    title: "单界面折射",
    input: "refract(I, N, n1/n2)",
    sees: "一次弯折后的环境",
    cost: "每片段一次采样",
    limit: "未模拟出射界面与厚度",
    color: accent,
  },
] as const;

export function CubemapCapabilityDiagram() {
  return (
    <Frame caption="cubemap 是方向到颜色的查询表。静态图、动态 probe 和单界面折射使用同一采样接口，但捕获内容、成本和物理精度完全不同。">
      <div
        role="img"
        aria-label="立方体贴图能力边界，静态贴图只包含预拍环境，动态环境探针要从六个方向重绘场景，单界面折射只模拟一次弯折而不包含出射界面和物体厚度"
        className="grid gap-3"
      >
        {rows.map((row) => (
          <div key={row.title} className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-[1fr_1.3fr_1.2fr_1.2fr_1.5fr] sm:items-center">
            <strong style={{ color: row.color }}>{row.title}</strong>
            <span className="text-secondary">输入：{row.input}</span>
            <span className="text-secondary">内容：{row.sees}</span>
            <span className="text-secondary">成本：{row.cost}</span>
            <span style={{ color: row.color }}>边界：{row.limit}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
