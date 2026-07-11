import type { ReactNode } from "react";

export { ModelDemo } from "../../model-demo";
export { ModelCompositionDiagram } from "../../diagrams/model-composition-diagram";
export { NodeRecursionDiagram } from "../../diagrams/node-recursion-diagram";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

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

const stages = [
  {
    title: "解析文件",
    code: "ReadFile + validate",
    result: "得到有效 aiScene，并确定模型目录",
    color: accent,
  },
  {
    title: "遍历节点",
    code: "parentWorld * nodeLocal",
    result: "递归收集网格并保留层级变换",
    color: success,
  },
  {
    title: "构造资源",
    code: "Mesh + texture cache",
    result: "去重 GPU 图片，保留每次材质语义",
    color: warning,
  },
] as const;

export function ModelLoadStagesDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const through = step === 0 ? 3 : step;

  return (
    <Frame caption="Model 加载不是一次 ReadFile：先验证输入，再带着累计变换遍历节点，最后把 CPU 数据、GPU Mesh 与纹理缓存组织成稳定所有权。">
      <div
        role="img"
        aria-label={`Model 文件解析节点遍历和资源构造流程第 ${step || "全部"} 步`}
        className="grid gap-3 md:grid-cols-3"
      >
        {stages.map((stage, index) => (
          <div
            key={stage.title}
            data-stage={index + 1}
            className="rounded-control border bg-bg/40 p-3"
            style={{ borderColor: stage.color, opacity: index < through ? 1 : 0.28 }}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-control text-xs font-bold text-bg"
                style={{ backgroundColor: stage.color }}
              >
                {index + 1}
              </span>
              <strong className="text-sm text-primary">{stage.title}</strong>
            </div>
            <p className="mt-3 break-words font-mono text-[10px]" style={{ color: stage.color }}>
              {stage.code}
            </p>
            <p className="mt-2 text-xs text-secondary">{stage.result}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function ModelNodeTransformDiagram() {
  return (
    <Frame caption="把节点树压成 Mesh 列表时不能丢掉空间关系：每层先把父世界矩阵乘本地矩阵，再把累计结果应用到顶点或保存为实例变换。">
      <div
        role="img"
        aria-label="父节点世界变换乘当前节点局部变换得到当前世界变换，再应用到网格顶点或保存为绘制实例变换"
        className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center"
      >
        <div className="rounded-control border border-accent bg-bg/40 p-3 text-center">
          <strong className="text-sm text-primary">父级世界矩阵</strong>
          <p className="mt-2 font-mono text-xs text-accent">parentWorld</p>
        </div>
        <span className="text-center text-secondary">×</span>
        <div className="rounded-control border border-success bg-bg/40 p-3 text-center">
          <strong className="text-sm text-primary">节点局部矩阵</strong>
          <p className="mt-2 font-mono text-xs text-success">node-&gt;mTransformation</p>
        </div>
        <span className="text-center text-secondary">→</span>
        <div className="rounded-control border border-warning bg-bg/40 p-3 text-center">
          <strong className="text-sm text-primary">当前世界矩阵</strong>
          <p className="mt-2 break-words font-mono text-xs text-warning">world = parentWorld * local</p>
        </div>
      </div>
    </Frame>
  );
}
