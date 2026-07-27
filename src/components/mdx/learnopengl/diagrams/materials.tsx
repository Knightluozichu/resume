import type { ReactNode } from "react";

export { MaterialVsShaderDiagram } from "../../diagrams/material-vs-shader-diagram";

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

const pairs = [
  { term: "ambient", material: "material.ambient", light: "light.ambient", role: "底色反射 × 间接光强", color: warning },
  { term: "diffuse", material: "material.diffuse", light: "light.diffuse", role: "主色反射 × 直接光强 × N·L", color: success },
  { term: "specular", material: "material.specular", light: "light.specular", role: "高光色 × 镜面光强 × R·V", color: accent },
] as const;

export function MaterialLightPairDiagram() {
  return (
    <Frame caption="Material 回答表面如何反射，Light 回答各类光有多强；同名三项配对相乘，职责不能互换。">
      <div role="img" aria-label="材质环境漫反射镜面属性与光源同名强度逐项配对相乘" className="grid gap-3">
        {pairs.map((pair) => (
          <div key={pair.term} className="grid items-center gap-2 rounded-control border bg-bg/40 p-3 md:grid-cols-[1fr_auto_1fr_1.4fr]" style={{ borderColor: pair.color }}>
            <code className="break-words text-xs" style={{ color: pair.color }}>{pair.material}</code>
            <span className="text-center text-secondary">×</span>
            <code className="break-words text-xs text-primary">{pair.light}</code>
            <span className="text-xs text-secondary">{pair.role}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-control border border-danger bg-bg/40 px-3 py-2 text-center text-xs text-primary">
        shininess 只属于 Material：它描述表面高光衰减，不描述光源强度
      </div>
    </Frame>
  );
}

const stages = [
  { title: "选材质预设", code: "ambient · diffuse · specular · shininess", result: "确定表面反射特性", color: warning },
  { title: "配置光属性", code: "light ambient · diffuse · specular", result: "确定入射光各项强度", color: success },
  { title: "逐项计算", code: "light.X × material.X", result: "相加得到最终片段颜色", color: accent },
] as const;

export function MaterialStagesDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const through = step === 0 ? 3 : step;
  return (
    <Frame caption="复刻材质不能只抄一组颜色：必须完整设置四个 Material 字段、三类 Light 强度，再让 Phong 三项逐项配对。">
      <div role="img" aria-label={`材质应用流程第 ${step || "全部"} 步`} className="grid gap-3 md:grid-cols-3">
        {stages.map((stage, i) => {
          const on = i < through;
          return (
            <div key={stage.title} data-stage={i + 1} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: stage.color, opacity: on ? 1 : 0.28 }}>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-control text-xs font-bold text-bg" style={{ backgroundColor: stage.color }}>{i + 1}</span>
                <strong className="text-sm text-primary">{stage.title}</strong>
              </div>
              <p className="mt-3 break-words font-mono text-[10px]" style={{ color: stage.color }}>{stage.code}</p>
              <p className="mt-2 text-xs text-secondary">{stage.result}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

const presets = [
  { name: "Gold", diffuse: "0.75 · 0.61 · 0.23", specular: "暖色 0.63 · 0.56 · 0.37", shininess: "51.2", swatch: "rgb(192 155 58)" },
  { name: "Emerald", diffuse: "0.08 · 0.61 · 0.08", specular: "绿色 0.63 · 0.73 · 0.63", shininess: "76.8", swatch: "rgb(30 156 52)" },
  { name: "Green rubber", diffuse: "0.40 · 0.50 · 0.40", specular: "弱 0.04 · 0.70 · 0.04", shininess: "10.0", swatch: "rgb(72 110 72)" },
] as const;

export function MaterialPresetDiagram() {
  return (
    <Frame caption="预设差异不只在主色：镜面颜色和 shininess 共同决定高光色泽、面积与锐度。">
      <div role="img" aria-label="金翡翠绿橡胶三种 Phong 材质预设对比" className="grid gap-3 md:grid-cols-3">
        {presets.map((preset) => (
          <div key={preset.name} className="rounded-control border border-border bg-bg/40 p-3">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 shrink-0 rounded-control border border-border" style={{ backgroundColor: preset.swatch }} />
              <strong className="text-sm text-primary">{preset.name}</strong>
            </div>
            <dl className="mt-3 grid gap-2 text-xs">
              <div><dt className="text-secondary">diffuse</dt><dd className="break-words font-mono text-primary">{preset.diffuse}</dd></div>
              <div><dt className="text-secondary">specular</dt><dd className="break-words font-mono text-primary">{preset.specular}</dd></div>
              <div><dt className="text-secondary">shininess</dt><dd className="font-mono" style={{ color: preset.name === "Green rubber" ? danger : accent }}>{preset.shininess}</dd></div>
            </dl>
          </div>
        ))}
      </div>
    </Frame>
  );
}
