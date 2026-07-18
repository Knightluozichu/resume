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
    label: "按粗糙度预滤波环境",
    detail: "同一 HDR cubemap 以 GGX 重要性采样卷积到多个 mip；粗糙度越高，反射波瓣越宽、采样层越模糊。",
    code: "prefilteredColor = textureLod(prefilterMap, R, roughness * MAX_LOD)",
    color: "var(--accent)",
  },
  {
    label: "预计算二维 BRDF LUT",
    detail: "以 NdotV 和 roughness 为坐标积分几何项与 Fresnel，LUT 存下可复用的 scale A 和 bias B。",
    code: "envBRDF = texture(brdfLUT, vec2(NdotV, roughness)).rg",
    color: "var(--warning)",
  },
  {
    label: "运行时重建镜面贡献",
    detail: "由视线和法线得到反射向量 R；将预滤波环境色与 F * A + B 合成，不再额外乘一次 kS。",
    code: "specularIBL = prefilteredColor * (F * A + B)",
    color: "var(--success)",
  },
] as const;

export function IblSpecularContractDiagram({ step = 3 }: { step?: Step }) {
  return (
    <Frame caption="镜面 IBL 的 Split-Sum 契约：把环境的粗糙度相关反射预滤波为 cubemap mip 链，再预计算 BRDF LUT，最后在每个片段以反射方向、NdotV 与粗糙度重建镜面环境光。">
      <div
        role="img"
        aria-label="IBL 镜面反射契约图，展示按粗糙度预滤波环境 cubemap、预计算 NdotV 与粗糙度二维 BRDF LUT、运行时合成 F 乘 A 加 B 的镜面贡献"
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
