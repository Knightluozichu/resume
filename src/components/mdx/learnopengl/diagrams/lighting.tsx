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
    label: "材质先定 F0 与 kD",
    detail: "金属用 albedo 作为 F0 且没有漫反射；非金属保留漫反射并从 0.04 起步。",
    code: "F0 = mix(vec3(0.04), albedo, metallic)",
    color: "var(--accent)",
  },
  {
    label: "每盏灯累加 BRDF",
    detail: "辐射度随距离平方衰减；D/G/F 与 NdotL 一起构成单灯贡献。",
    code: "Lo += (diffuse + specular) * radiance * NdotL",
    color: "var(--warning)",
  },
  {
    label: "线性 HDR 才能输出",
    detail: "先在线性空间累积高亮度，再色调映射，最后 gamma 编码到显示器。",
    code: "toneMap(ambient + Lo) -> gammaEncode",
    color: "var(--success)",
  },
] as const;

export function PbrLightingContractDiagram({ step = 3 }: { step?: Step }) {
  return (
    <Frame caption="PBR 直接光照的实现契约：先确定材质能量分配，逐灯在线性 HDR 中累积 Cook-Torrance BRDF，最后才进行色调映射和 gamma 输出。">
      <div
        role="img"
        aria-label="PBR 光照契约图，展示 F0 和 kD 的材质能量分配、每盏灯累加 Cook-Torrance BRDF，以及线性 HDR 到色调映射和 gamma 的输出顺序"
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
