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
    label: "先分配能量",
    detail: "Fresnel 给镜面份额 kS；非金属剩余部分才可成为漫反射 kD。",
    code: "kS = F;  kD = (1 - kS) * (1 - metallic)",
    color: "var(--accent)",
  },
  {
    label: "再统计微表面",
    detail: "D 统计有多少微面朝向半程向量，G 扣除被邻面遮住的入射与出射。",
    code: "specular = D * G * F / (4 * NdotV * NdotL)",
    color: "var(--warning)",
  },
  {
    label: "最后进入积分",
    detail: "BRDF 乘每个方向的入射辐射度与余弦项；直接光用求和，IBL 近似半球积分。",
    code: "Lo = integral(BRDF * Li * NdotL)",
    color: "var(--success)",
  },
] as const;

export function PbrBrdfContractDiagram({ step = 3 }: { step?: Step }) {
  return (
    <Frame caption="Cook-Torrance 的推导顺序：先满足能量分配，再用 D/G/F 描述微表面镜面反射，最后把 BRDF 放进反射率方程。这样不会把“材质颜色”“粗糙度”“掠射反射”混成一个经验高光参数。">
      <div
        role="img"
        aria-label="PBR BRDF 契约图，依次展示 Fresnel 分配镜面和漫反射能量、D G F 组成微表面镜面项、BRDF 进入反射率方程积分"
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
