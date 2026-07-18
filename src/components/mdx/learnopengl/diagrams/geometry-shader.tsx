import type { ReactNode } from "react";

export { EmitVertexDiagram } from "../../diagrams/emit-vertex-diagram";
export { ExplodeDiagram } from "../../diagrams/explode-diagram";
export { GeometryShaderPipelineDiagram } from "../../diagrams/geometry-shader-pipeline-diagram";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const outputSteps = [
  {
    title: "一次调用的输入",
    detail: "一个已装配图元：点、线或三角形",
    code: "gl_in[]",
    color: "var(--accent)",
  },
  {
    title: "逐顶点快照",
    detail: "先写 gl_Position 和用户输出，再 EmitVertex()",
    code: "EmitVertex()",
    color: "var(--success)",
  },
  {
    title: "输出图元序列",
    detail: "points / line_strip / triangle_strip",
    code: "max_vertices",
    color: "var(--warning)",
  },
] as const;

export function GeometryShaderOutputContractDiagram() {
  return (
    <Frame caption="一条几何着色器调用只处理一个输入图元。EmitVertex 会快照当前所有输出；EndPrimitive 用于在同一次调用内切分多个输出图元，若只输出一个图元，着色器结束时会自动完成它。">
      <div
        role="img"
        aria-label="几何着色器输出契约图，依次显示单个输入图元、EmitVertex 对当前位置和用户输出的快照、带 max vertices 上限的输出图元序列；EndPrimitive 用于分开多个输出图元，单个图元在调用结束时自动完成"
        className="grid gap-3"
      >
        <div className="grid gap-2 lg:grid-cols-3">
          {outputSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-control border border-border bg-bg/40 p-3"
            >
              <div className="flex items-center gap-2 text-xs">
                <span
                  className="grid size-5 shrink-0 place-items-center rounded-full font-mono text-[11px] font-semibold"
                  style={{ color: step.color, backgroundColor: "color-mix(in srgb, currentColor 12%, transparent)" }}
                >
                  {index + 1}
                </span>
                <strong style={{ color: step.color }}>{step.title}</strong>
              </div>
              <p className="mt-2 text-xs leading-5 text-secondary">{step.detail}</p>
              <code className="mt-3 block text-xs text-primary">{step.code}</code>
            </div>
          ))}
        </div>
        <div className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-2">
          <p className="text-secondary">
            <strong className="text-primary">边界：</strong>一次调用若要输出多条 strip，必须用
            <code> EndPrimitive()</code> 分段；最后一条单独的输出图元会在调用结束时自动完成。
          </p>
          <p className="text-secondary">
            <strong className="text-primary">上限：</strong><code>max_vertices</code> 是每次调用可发射顶点数的声明上界。超出它的结果不可依赖，按实际最坏路径声明足够的值。
          </p>
        </div>
      </div>
    </Frame>
  );
}

const spaceRows = [
  {
    title: "可靠的爆破坐标契约",
    stages: ["模型 / 世界 / 观察空间的位置", "叉乘得到同空间面法线", "在同一空间偏移", "最后投影到裁剪空间"],
    color: "var(--success)",
  },
  {
    title: "避免混用裁剪空间",
    stages: ["已透视投影的 gl_Position", "叉乘或直接加偏移", "方向和长度会随投影失真", "不要把它当通用写法"],
    color: "var(--warning)",
  },
] as const;

export function GeometryExplodeSpaceDiagram() {
  return (
    <Frame caption="爆破的法线、位移和位置必须处在同一线性空间。原教程的 gl_in 示例适合讲解几何阶段；用于带透视投影的工程代码时，应显式传递投影前的位置并在最后统一投影。">
      <div
        role="img"
        aria-label="爆破坐标空间对照图，上方在模型、世界或观察空间计算面法线和位移后再投影；下方警示不要在已经透视投影的裁剪空间叉乘或偏移"
        className="grid gap-3"
      >
        {spaceRows.map((row) => (
          <div key={row.title} className="rounded-control border border-border bg-bg/40 p-3">
            <strong className="text-sm" style={{ color: row.color }}>
              {row.title}
            </strong>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {row.stages.map((stage, index) => (
                <div key={stage} className="flex min-w-0 items-start gap-2 text-xs text-secondary">
                  <span className="font-mono" style={{ color: row.color }}>
                    {index + 1}.
                  </span>
                  <span>{stage}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
