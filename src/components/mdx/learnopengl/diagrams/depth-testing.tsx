import type { ReactNode } from "react";

export { DepthBufferDiagram } from "../../diagrams/depth-buffer-diagram";
export { DepthPrecisionDiagram } from "../../diagrams/depth-precision-diagram";
export { DepthTestStepDiagram } from "../../diagrams/depth-test-step-diagram";
export { ZFightingDiagram } from "../../diagrams/z-fighting-diagram";

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

export function DepthPipelineTimingDiagram() {
  const stages = [
    { title: "光栅化", detail: "产生候选片段与窗口深度", color: accent },
    { title: "可选 Early-Z", detail: "安全时先拒绝必定不可见的片段", color: success },
    { title: "片段着色器", detail: "计算颜色，可 discard 或写 gl_FragDepth", color: warning },
    { title: "最终深度测试", detail: "按深度函数决定颜色与深度写入", color: accent },
  ] as const;

  return (
    <Frame caption="规范结果由片段输出与深度状态共同决定；实现可在不改变结果时提前做 Early-Z。写 gl_FragDepth、使用 discard 或产生相关副作用时，提前测试可能受限。">
      <div
        role="img"
        aria-label="光栅化产生片段后，驱动可选做提前深度测试，再运行片段着色器，最后按片段最终深度完成测试和写入"
        className="grid gap-2 sm:grid-cols-4"
      >
        {stages.map((stage, index) => (
          <div key={stage.title} className="relative rounded-control border border-border bg-bg/40 p-3">
            <strong className="text-xs" style={{ color: stage.color }}>
              {index + 1}. {stage.title}
            </strong>
            <p className="mt-2 text-xs text-secondary">{stage.detail}</p>
            {index < stages.length - 1 ? (
              <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-secondary sm:block">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}

const stateRows = [
  {
    state: "DEPTH_TEST 关闭",
    compare: "不比较",
    write: "不写深度",
    use: "纯覆盖或明确不需要深度",
    color: warning,
  },
  {
    state: "GL_ALWAYS + mask=true",
    compare: "总通过",
    write: "写入新深度",
    use: "调试状态，不等于关闭测试",
    color: accent,
  },
  {
    state: "GL_LESS + mask=false",
    compare: "仍比较",
    write: "只读，不更新",
    use: "透明物体等只读深度阶段",
    color: success,
  },
] as const;

export function DepthStateContractDiagram() {
  return (
    <Frame caption="深度比较与深度写入是两份独立状态。关闭测试、永远通过、只读深度三者的输出契约不同，不能互相替代。">
      <div role="img" aria-label="关闭深度测试、GL ALWAYS 以及关闭深度写入三种状态在比较和写入行为上的差异" className="grid gap-3">
        {stateRows.map((row) => (
          <div key={row.state} className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 sm:grid-cols-[1.2fr_0.8fr_0.8fr_1.5fr] sm:items-center">
            <strong className="break-words font-mono text-xs" style={{ color: row.color }}>
              {row.state}
            </strong>
            <span className="text-xs text-secondary">比较：{row.compare}</span>
            <span className="text-xs text-secondary">写入：{row.write}</span>
            <span className="text-xs text-secondary">{row.use}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
