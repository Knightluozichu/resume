import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function GlrOpenglBasicsDiagram() {
  const stages = ["Window system", "Current context", "Load entry points", "Query capabilities", "Debug + render"];
  return (
    <Frame caption="初始化是有序合同：上下文 current 之前无法可靠加载或解释现代 OpenGL 命令。">
      <div role="img" aria-label="OpenGL 初始化合同" className="grid gap-2 md:grid-cols-5">
        {stages.map((stage, index) => (
          <div key={stage} className="grid min-h-24 content-center rounded-control border border-border bg-bg/45 p-3 text-center">
            <span className="text-xs font-bold text-accent">0{index + 1}</span>
            <strong className="mt-2 text-xs text-primary">{stage}</strong>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function GlrContextOwnershipDiagram() {
  const rows = [
    ["Context state", "program · VAO · FBO · viewport", "per context"],
    ["Container", "VAO · FBO references and formats", "normally not shared"],
    ["Data object", "buffer · texture · program", "share-group eligible"],
  ];
  return (
    <Frame caption="“状态都在上下文里”不够精确：容器状态与可共享数据对象具有不同边界。">
      <div role="img" aria-label="上下文状态、容器对象和数据对象边界" className="overflow-hidden rounded-control border border-border text-xs">
        <div className="grid grid-cols-[1.1fr_2fr_1.2fr] gap-px bg-border">
          {['类别', '示例', '共享边界'].map((value) => <strong key={value} className="bg-bg p-3 text-primary">{value}</strong>)}
          {rows.flatMap((row) => row.map((value, index) => <span key={`${row[0]}-${value}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 text-secondary"}>{value}</span>))}
        </div>
      </div>
    </Frame>
  );
}

export function GlrDebugLoopDiagram() {
  const nodes = ["label object", "push debug group", "submit command", "read message", "capture state/output"];
  return (
    <Frame caption="调试输出提供 API 证据，状态快照与参考图像补足驱动无法判断的逻辑错误。">
      <div role="img" aria-label="OpenGL 调试闭环" className="flex flex-wrap items-center justify-center gap-2">
        {nodes.map((node, index) => (
          <div key={node} className="flex items-center gap-2">
            <span className="rounded-control border border-border bg-bg/45 px-3 py-2 text-xs font-semibold text-primary">{node}</span>
            {index < nodes.length - 1 ? <span aria-hidden="true" className="text-accent">→</span> : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}
