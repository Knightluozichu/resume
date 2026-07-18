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
    label: "把 HDR 环境变成方向纹理",
    detail: "等距柱状 HDR 在六个捕获视图中渲染为 cubemap，之后才能高效按方向采样。",
    code: "equirectangular HDR -> environment cubemap",
    color: "var(--accent)",
  },
  {
    label: "离线卷积成低频辐照度",
    detail: "对每个法线方向半球积分环境光；cos(theta) 与 sin(theta) 分别给出投影和面积权重。",
    code: "irradianceMap(N) = integral hemisphere Li * cos(theta)",
    color: "var(--warning)",
  },
  {
    label: "运行时只采一次 N",
    detail: "漫反射不保留环境的高频细节，因此低分辨率 irradiance map 足够；再乘 kD 和 albedo。",
    code: "ambientDiffuse = kD * texture(irradianceMap, N) * albedo",
    color: "var(--success)",
  },
] as const;

export function IblDiffuseIrradianceContractDiagram({ step = 3 }: { step?: Step }) {
  return (
    <Frame caption="漫反射 IBL 的预计算契约：把高动态范围环境转为 cubemap，对每个法线方向卷积成低频辐照度，然后在运行时以一次法线方向采样替代常量环境光。">
      <div
        role="img"
        aria-label="IBL 漫反射辐照度契约图，展示等距柱状 HDR 转 cubemap、半球积分卷积为低频辐照度贴图、运行时按法线采样并乘 kD 和反照率"
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
