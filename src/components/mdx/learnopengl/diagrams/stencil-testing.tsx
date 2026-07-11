import type { ReactNode } from "react";

export { StencilBufferDiagram } from "../../diagrams/stencil-buffer-diagram";
export { StencilOutlineStepDiagram } from "../../diagrams/stencil-outline-step-diagram";
export { StencilTestFlowDiagram } from "../../diagrams/stencil-test-flow-diagram";

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

const maskStages = [
  {
    title: "比较掩码",
    code: "(ref & readMask) func (old & readMask)",
    detail: "只决定模板测试看哪些位",
    color: accent,
  },
  {
    title: "选择操作",
    code: "sfail / dpfail / dppass",
    detail: "按模板与深度结果选择 KEEP/REPLACE 等",
    color: warning,
  },
  {
    title: "写入掩码",
    code: "(old & ~writeMask) | (result & writeMask)",
    detail: "只允许掩码为 1 的位被修改",
    color: success,
  },
] as const;

export function StencilMaskContractDiagram() {
  return (
    <Frame caption="glStencilFunc 的比较掩码和 glStencilMask 的写入掩码是两份状态：前者筛选参与比较的位，后者决定哪些旧位可被修改。">
      <div role="img" aria-label="模板比较掩码选择参与比较的位，测试结果选择模板操作，写入掩码再把操作结果与旧模板值按位合并" className="grid gap-3 md:grid-cols-3">
        {maskStages.map((stage, index) => (
          <div key={stage.title} className="relative rounded-control border border-border bg-bg/40 p-3">
            <strong className="text-sm" style={{ color: stage.color }}>
              {index + 1}. {stage.title}
            </strong>
            <p className="mt-3 break-words font-mono text-[10px]" style={{ color: stage.color }}>
              {stage.code}
            </p>
            <p className="mt-2 text-xs text-secondary">{stage.detail}</p>
            {index < maskStages.length - 1 ? (
              <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-secondary md:block">→</span>
            ) : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}

const passRows = [
  { pass: "清除", func: "ALWAYS", op: "KEEP", mask: "0xFF", depth: "按场景", result: "模板归零" },
  { pass: "正常物体", func: "ALWAYS ref=1", op: "dppass=REPLACE", mask: "0xFF", depth: "开 + 写", result: "可见物体像素写 1" },
  { pass: "放大描边", func: "NOTEQUAL ref=1", op: "KEEP", mask: "0x00", depth: "按效果选择", result: "只画外环" },
  { pass: "恢复", func: "ALWAYS", op: "KEEP", mask: "0xFF", depth: "恢复调用前", result: "不污染后续 pass" },
] as const;

export function StencilPassStateDiagram() {
  return (
    <Frame caption="描边是一个状态机，不只是两次 Draw：清除、写标记、只读描边、恢复状态四个阶段都要明确。">
      <div role="img" aria-label="模板描边从清除到正常物体写标记，再到放大物体只读模板，最后恢复所有模板和深度状态的四阶段表" className="grid gap-2">
        {passRows.map((row, index) => (
          <div key={row.pass} className="grid gap-1 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-[0.7fr_1.2fr_1.2fr_0.7fr_0.8fr_1.3fr] sm:items-center">
            <strong style={{ color: index === 2 ? warning : index === 3 ? success : accent }}>{index + 1}. {row.pass}</strong>
            <span className="break-words font-mono text-secondary">{row.func}</span>
            <span className="break-words font-mono text-secondary">{row.op}</span>
            <span className="font-mono text-secondary">{row.mask}</span>
            <span className="text-secondary">{row.depth}</span>
            <span className="text-secondary">{row.result}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
