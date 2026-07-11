import type { ReactNode } from "react";

export { DiffuseMapDiagram } from "../../diagrams/diffuse-map-diagram";
export { SpecularMapDiagram } from "../../diagrams/specular-map-diagram";

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

const layers = [
  { title: "漫反射贴图", sampler: "material.diffuse", result: "逐片段底色", color: success },
  { title: "镜面贴图", sampler: "material.specular", result: "逐片段高光强度/颜色", color: warning },
  { title: "自发光贴图", sampler: "material.emission", result: "不依赖光照的额外亮色", color: accent },
] as const;

export function LightingMapLayersDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const through = step === 0 ? 3 : step;
  return (
    <Frame caption="三张贴图控制不同材质通道：diffuse 进入环境/漫反射，specular 只调高光，emission 直接加到最终颜色。">
      <div role="img" aria-label={`光照贴图分层第 ${step || "全部"} 步`} className="grid gap-3 md:grid-cols-3">
        {layers.map((layer, i) => {
          const on = i < through;
          return (
            <div key={layer.title} data-stage={i + 1} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: layer.color, opacity: on ? 1 : 0.28 }}>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-control text-xs font-bold text-bg" style={{ backgroundColor: layer.color }}>{i + 1}</span>
                <strong className="text-sm text-primary">{layer.title}</strong>
              </div>
              <p className="mt-3 break-words font-mono text-[10px]" style={{ color: layer.color }}>{layer.sampler}</p>
              <p className="mt-2 text-xs text-secondary">{layer.result}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-control border border-accent bg-bg/40 px-3 py-2 text-center font-mono text-[11px] text-primary">
        FragColor = ambient + diffuse + specular + emission
      </div>
    </Frame>
  );
}

const bindings = [
  { unit: "0", texture: "diffuseMap", sampler: "material.diffuse", color: success },
  { unit: "1", texture: "specularMap", sampler: "material.specular", color: warning },
  { unit: "2", texture: "emissionMap", sampler: "material.emission", color: accent },
] as const;

export function LightingMapBindingDiagram() {
  return (
    <Frame caption="Sampler uniform 保存纹理单元编号，不保存纹理对象；绘制前必须让编号、active unit 与实际 binding 三者一致。">
      <div role="img" aria-label="漫反射镜面自发光三张纹理分别绑定到零一二号纹理单元和材质采样器" className="grid gap-3">
        {bindings.map((binding) => (
          <div key={binding.unit} className="grid items-center gap-2 rounded-control border bg-bg/40 p-3 md:grid-cols-[auto_1fr_auto_1.2fr]" style={{ borderColor: binding.color }}>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-control text-xs font-bold text-bg" style={{ backgroundColor: binding.color }}>{binding.unit}</span>
            <code className="break-words text-xs text-primary">{binding.texture}</code>
            <span className="text-center text-secondary">→</span>
            <code className="break-words text-xs" style={{ color: binding.color }}>{binding.sampler}</code>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function EmissionMapDiagram() {
  return (
    <Frame caption="自发光贴图不是新光源：它只让当前表面直接输出额外颜色，不会照亮附近物体，也不受 N·L 或 R·V 控制。">
      <div role="img" aria-label="自发光贴图经过纹理坐标采样和强度缩放后直接加到片段颜色，不经过光照方向计算" className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        <div className="rounded-control border border-accent bg-bg/40 p-3 text-center">
          <strong className="text-sm text-primary">emission map</strong>
          <p className="mt-2 font-mono text-[10px] text-accent">texture(..., UV).rgb</p>
        </div>
        <span className="hidden text-secondary md:block">×</span>
        <div className="rounded-control border border-warning bg-bg/40 p-3 text-center">
          <strong className="text-sm text-primary">emissionStrength</strong>
          <p className="mt-2 font-mono text-[10px] text-warning">0.0 … 1.0+</p>
        </div>
        <span className="hidden text-secondary md:block">+</span>
        <div className="rounded-control border border-danger bg-bg/40 p-3 text-center">
          <strong className="text-sm text-primary">lit result</strong>
          <p className="mt-2 font-mono text-[10px] text-danger">ambient+diffuse+specular</p>
        </div>
      </div>
    </Frame>
  );
}
