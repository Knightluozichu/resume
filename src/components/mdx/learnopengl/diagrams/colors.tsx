import type { ReactNode } from "react";

export { ColorMultiplyDiagram } from "../../diagrams/color-multiply-diagram";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

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

const channels = [
  { name: "R", light: 0, object: 1, result: 0, color: danger },
  { name: "G", light: 1, object: 0.5, result: 0.5, color: success },
  { name: "B", light: 0, object: 0.31, result: 0, color: accent },
] as const;

export function ColorReflectionDiagram() {
  return (
    <Frame caption="纯绿光照珊瑚色物体：没有红光和蓝光可供反射，对应通道相乘后归零，只剩半强度绿色。">
      <div role="img" aria-label="纯绿光零一零逐通道乘珊瑚色一零点五零点三一，得到零零点五零" className="grid gap-3 md:grid-cols-3">
        {channels.map((channel) => (
          <div key={channel.name} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: channel.color }}>
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm" style={{ color: channel.color }}>{channel.name} 通道</strong>
              <span className="h-5 w-5 rounded-control border border-border" style={{ backgroundColor: channel.color }} />
            </div>
            <p className="mt-3 text-center font-mono text-sm text-primary">
              {channel.light} × {channel.object} = {channel.result}
            </p>
            <p className="mt-2 text-center text-xs text-secondary">
              光中{channel.light === 0 ? "没有该成分" : "有完整成分"}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs">
        <span className="rounded-control border border-success bg-success/10 px-2 py-2 text-primary">光 (0, 1, 0)</span>
        <span className="text-secondary">×</span>
        <span className="rounded-control border border-warning bg-warning/10 px-2 py-2 text-primary">物体 (1, .5, .31)</span>
        <span className="text-secondary">=</span>
        <span className="rounded-control border border-success bg-success/10 px-2 py-2 text-primary">所见 (0, .5, 0)</span>
      </div>
    </Frame>
  );
}

const multiplyStages = [
  { title: "输入光色", code: "lightColor", result: "有哪些 RGB 光到达表面", color: success },
  { title: "输入反射率", code: "objectColor", result: "各通道愿意反射多少", color: warning },
  { title: "逐通道相乘", code: "light * object", result: "R×R · G×G · B×B", color: accent },
  { title: "输出片段", code: "FragColor", result: "显示器收到的线性 RGB", color: danger },
] as const;

export function ColorMultiplyStepsDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const active = step === 0 ? [0, 1, 2, 3] : step === 1 ? [0] : step === 2 ? [0, 1] : [0, 1, 2, 3];
  return (
    <Frame caption="颜色乘法是数据流，不是把两种颜料混在一起：光色提供能量，物体色充当每个 RGB 通道的反射比例。">
      <div className="grid gap-3 md:grid-cols-4" role="img" aria-label={`颜色逐通道乘法第 ${step || "全部"} 步`}>
        {multiplyStages.map((stage, i) => {
          const on = active.includes(i);
          return (
            <div key={stage.title} data-stage={i + 1} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: stage.color, opacity: on ? 1 : 0.28 }}>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-control text-xs font-bold text-bg" style={{ backgroundColor: stage.color }}>{i + 1}</span>
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

export function LightingSceneContractDiagram() {
  const columns = [
    { title: "被照物体", vao: "objectVAO", shader: "lightingShader", output: "lightColor × objectColor", color: accent },
    { title: "灯源立方体", vao: "lightVAO", shader: "lightCubeShader", output: "lightColor", color: warning },
  ];
  return (
    <Frame caption="两次 draw call 共享同一份立方体位置 VBO，但 VAO 分别记住属性配置，着色器也分别表达被照表面与可视灯源。">
      <div role="img" aria-label="同一立方体顶点缓冲连接到物体 VAO 和灯源 VAO，分别使用光照着色器和灯源着色器绘制" className="grid gap-3">
        <div className="mx-auto rounded-control border border-success bg-bg/40 px-4 py-3 text-center">
          <strong className="font-mono text-sm text-primary">cubePositionVBO</strong>
          <p className="mt-1 text-xs text-secondary">共享 36 个立方体顶点</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {columns.map((column) => (
            <div key={column.title} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: column.color }}>
              <strong className="text-sm text-primary">{column.title}</strong>
              <div className="mt-3 grid gap-2 text-xs">
                <span className="rounded-control border border-border px-2 py-2 font-mono text-secondary">{column.vao}</span>
                <span className="rounded-control border border-border px-2 py-2 font-mono" style={{ color: column.color }}>{column.shader}</span>
                <span className="rounded-control border border-border px-2 py-2 font-mono text-primary">FragColor = {column.output}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
