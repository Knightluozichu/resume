import type { ReactNode } from "react";

export { DiffuseNormalDiagram } from "../../diagrams/diffuse-normal-diagram";
export { SpecularReflectDiagram } from "../../diagrams/specular-reflect-diagram";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const terms = [
  { name: "ambient", input: "constant", equation: "ka · lightColor", effect: "背光不死黑", color: warning },
  { name: "diffuse", input: "N · L", equation: "max(dot(N,L),0)", effect: "朝光面更亮", color: success },
  { name: "specular", input: "R · V", equation: "pow(max(dot(R,V),0),s)", effect: "视角相关高光", color: accent },
] as const;

export function PhongCompositionDiagram() {
  return (
    <Frame caption="Phong 把底光、方向性明暗和视角相关高光分别计算，再相加并乘表面颜色。">
      <div role="img" aria-label="Phong 光照由环境光漫反射镜面高光三项相加组成" className="grid gap-3 md:grid-cols-3">
        {terms.map((term) => (
          <div key={term.name} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: term.color }}>
            <div className="flex items-center justify-between gap-2">
              <strong className="font-mono text-sm" style={{ color: term.color }}>{term.name}</strong>
              <span className="text-xs text-secondary">{term.input}</span>
            </div>
            <p className="mt-3 break-words rounded-control border border-border px-2 py-2 text-center font-mono text-[10px] text-primary">{term.equation}</p>
            <p className="mt-2 text-center text-xs text-secondary">{term.effect}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-control border border-accent bg-bg/40 px-3 py-2 text-center font-mono text-[11px] text-primary">
        result = (ambient + diffuse + specular) × objectColor
      </div>
    </Frame>
  );
}

const stages = [
  { title: "只开环境光", output: "各面同亮，只有保底色", color: warning },
  { title: "叠加漫反射", output: "N·L 形成朝光与背光面", color: success },
  { title: "叠加镜面", output: "R·V 产生随视角移动的高光", color: accent },
] as const;

export function PhongStagesDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const through = step === 0 ? 3 : step;
  return (
    <Frame caption="逐项打开而不是只看最终图：环境光提供底色，漫反射建立体积，镜面项最后补充光泽。">
      <div role="img" aria-label={`Phong 光照叠加第 ${step || "全部"} 步`} className="grid gap-3 md:grid-cols-3">
        {stages.map((stage, i) => {
          const on = i < through;
          return (
            <div key={stage.title} data-stage={i + 1} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: stage.color, opacity: on ? 1 : 0.28 }}>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-control text-xs font-bold text-bg" style={{ backgroundColor: stage.color }}>{i + 1}</span>
                <strong className="text-sm text-primary">{stage.title}</strong>
              </div>
              <div className="mt-3 grid grid-cols-6 gap-1" aria-hidden="true">
                {Array.from({ length: 18 }, (_, cell) => (
                  <span key={cell} className="aspect-square rounded-[2px]" style={{ backgroundColor: stage.color, opacity: on ? 0.18 + ((cell + i * 3) % 6) * 0.13 : 0.08 }} />
                ))}
              </div>
              <p className="mt-3 text-xs text-secondary">{stage.output}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

export function PhongGouraudDiagram() {
  const modes = [
    { name: "Gouraud", where: "顶点着色器算光照", interpolate: "插值最终颜色", risk: "低面数时高光会丢失或成块", color: warning },
    { name: "Phong shading", where: "片段着色器算光照", interpolate: "插值 FragPos 与 Normal", risk: "更平滑，但每片段计算更贵", color: accent },
  ];
  return (
    <Frame caption="两者使用同一套光照公式，差别在计算频率：Gouraud 每顶点一次，Phong shading 每片段一次。">
      <div role="img" aria-label="Gouraud 顶点光照与 Phong 逐片段光照对比" className="grid gap-3 md:grid-cols-2">
        {modes.map((mode) => (
          <div key={mode.name} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: mode.color }}>
            <strong className="text-sm" style={{ color: mode.color }}>{mode.name}</strong>
            <div className="mt-3 grid gap-2 text-xs">
              <p className="rounded-control border border-border px-2 py-2 text-primary">计算：{mode.where}</p>
              <p className="rounded-control border border-border px-2 py-2 text-primary">光栅化：{mode.interpolate}</p>
              <p className="rounded-control border border-border px-2 py-2 text-secondary">代价：{mode.risk}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-secondary">
        <span style={{ color: success }}>少顶点</span><span>→ Gouraud 误差更明显</span><span style={{ color: danger }}>高光最敏感</span>
      </div>
    </Frame>
  );
}
