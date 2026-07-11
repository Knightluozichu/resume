import type { ReactNode } from "react";

export { AttenuationCurveDiagram } from "../../diagrams/attenuation-curve-diagram";
export { LightCastersDiagram } from "../../diagrams/light-casters-diagram";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const contracts = [
  { name: "Directional", fields: "direction", lightDir: "normalize(-direction)", factor: "1.0", color: accent },
  { name: "Point", fields: "position + Kc/Kl/Kq", lightDir: "normalize(position-FragPos)", factor: "attenuation(d)", color: success },
  { name: "Spot", fields: "position + direction + cutoffs", lightDir: "normalize(position-FragPos)", factor: "attenuation × coneIntensity", color: warning },
] as const;

export function LightCasterContractDiagram() {
  return (
    <Frame caption="Phong 公式不变；光源类型只决定 lightDir 如何得到，以及 diffuse/specular 最后还要乘哪个强度因子。">
      <div role="img" aria-label="平行光点光源聚光的数据字段方向计算和额外强度因子对比" className="grid gap-3 md:grid-cols-3">
        {contracts.map((contract) => (
          <div key={contract.name} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: contract.color }}>
            <strong className="text-sm" style={{ color: contract.color }}>{contract.name}</strong>
            <dl className="mt-3 grid gap-2 text-xs">
              <div><dt className="text-secondary">字段</dt><dd className="break-words font-mono text-primary">{contract.fields}</dd></div>
              <div><dt className="text-secondary">lightDir</dt><dd className="break-words font-mono text-primary">{contract.lightDir}</dd></div>
              <div><dt className="text-secondary">额外系数</dt><dd className="break-words font-mono text-primary">{contract.factor}</dd></div>
            </dl>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function LightCasterStagesDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const through = step === 0 ? 3 : step;
  return (
    <Frame caption="用同一个片段依次替换光源模型：平行光验证方向，点光源增加距离衰减，聚光再增加锥形范围。">
      <div role="img" aria-label={`投光物实现第 ${step || "全部"} 步`} className="grid gap-3 md:grid-cols-3">
        {contracts.map((contract, i) => {
          const on = i < through;
          return (
            <div key={contract.name} data-stage={i + 1} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: contract.color, opacity: on ? 1 : 0.28 }}>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-control text-xs font-bold text-bg" style={{ backgroundColor: contract.color }}>{i + 1}</span>
                <strong className="text-sm text-primary">{contract.name}</strong>
              </div>
              <p className="mt-3 break-words font-mono text-[10px]" style={{ color: contract.color }}>{contract.lightDir}</p>
              <p className="mt-2 text-xs text-secondary">乘数：{contract.factor}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}
