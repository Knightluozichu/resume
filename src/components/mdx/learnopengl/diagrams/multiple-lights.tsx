import type { ReactNode } from "react";

export { MultipleLightsDiagram } from "../../diagrams/multiple-lights-diagram";

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

const accumulation = [
  { title: "平行光", code: "result = CalcDirLight(...) ", result: "初始化总贡献", color: accent },
  { title: "点光源数组", code: "result += CalcPointLight[i]", result: "循环累加 N 盏", color: success },
  { title: "聚光", code: "result += CalcSpotLight(...) ", result: "追加相机手电", color: warning },
] as const;

export function LightAccumulationStagesDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const through = step === 0 ? 3 : step;
  return (
    <Frame caption="第一份贡献可用于初始化 result，之后每一盏必须使用 +=；任何一次写成 = 都会覆盖此前累积。">
      <div role="img" aria-label={`多光源贡献累加第 ${step || "全部"} 步`} className="grid gap-3 md:grid-cols-3">
        {accumulation.map((stage, i) => {
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

export function UniformLightArrayDiagram() {
  const lights = [0, 1, 2, 3];
  return (
    <Frame caption="GLSL 结构体数组没有一次性上传接口；CPU 必须为每个有效下标逐字段定位并写值，循环上限与着色器常量保持一致。">
      <div role="img" aria-label="CPU 逐元素上传 pointLights 零到三号结构体字段到 GLSL 定长 uniform 数组" className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="rounded-control border border-accent bg-bg/40 p-3">
          <strong className="text-sm text-primary">CPU upload loop</strong>
          <div className="mt-3 grid gap-2">
            {lights.map((i) => <code key={i} className="break-words text-[10px] text-accent">pointLights[{i}].position / diffuse / Kc...</code>)}
          </div>
        </div>
        <span className="hidden text-secondary md:block">→</span>
        <div className="rounded-control border border-success bg-bg/40 p-3">
          <strong className="text-sm text-primary">GLSL uniform array</strong>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {lights.map((i) => <span key={i} className="rounded-control border border-border px-2 py-3 text-center font-mono text-xs text-success">[{i}]</span>)}
          </div>
          <p className="mt-3 text-xs text-secondary">NR_POINT_LIGHTS = 4</p>
        </div>
      </div>
    </Frame>
  );
}
