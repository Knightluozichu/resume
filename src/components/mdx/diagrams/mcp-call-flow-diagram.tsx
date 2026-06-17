/**
 * <McpCallFlowDiagram>：一次 MCP 工具调用的来回流程（HEL-319，第 10 章）。
 *
 * 一张静态 SVG：四步竖向流程，演出「接了 MCP 之后，一次工具调用怎么走」——
 *   ① client 向 server 要清单：发现这个 server 暴露了哪些 tool（连同 schema）。
 *   ② 这些 tool 的定义被注入模型上下文，模型像第 8 章那样靠 description 选用一个 tool。
 *   ③ client 把模型选中的调用按 MCP 协议转发给 server，server 真正执行。
 *   ④ server 把结果按标准回给 client，client 再喂回模型继续。
 * 关键澄清（与第 8 章衔接）：MCP 只解决「工具怎么标准化接进来」，模型挑哪个工具、
 * 怎么发起调用，底层仍是 function calling——MCP 暴露的 tool 最终还是经 function calling 被调。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：四步框零重叠、文字中心落在自己框内、四周留白 ≥ 14px、字号 ≥ 10px、单一 y 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 420;

// —— 四步竖向流程框（单一 y 公式）。 ——
const STEP_W = 560;
const STEP_H = 64;
const STEP_X = (VIEW_W - STEP_W) / 2; // 80
const STEP_CX = STEP_X + STEP_W / 2; // 360
const STEP_Y0 = 56; // 第 0 步顶
const STEP_GAP = 28;

/** 第 i 步框顶 y（单一公式；底步底 = 56 + 3*(64+28) + 64 = 396 → 距底 24）。 */
function stepY(i: number): number {
  return STEP_Y0 + i * (STEP_H + STEP_GAP);
}
function stepCY(i: number): number {
  return stepY(i) + STEP_H / 2;
}

type FlowStep = {
  /** 序号 + 谁主导。 */
  head: string;
  /** 一句话内容。 */
  body: string;
  /** 用 function calling 还是 MCP（右侧小标）。 */
  layer: "MCP" | "function calling";
};

const FLOW: readonly FlowStep[] = [
  {
    head: "① client 发现 server 能力",
    body: "client 向 MCP Server 要清单：它暴露了哪些 tool（带名字 + description + 参数）",
    layer: "MCP",
  },
  {
    head: "② 模型选用一个 tool",
    body: "这些 tool 定义注入模型上下文，模型靠 description 挑一个（同第 8 章）",
    layer: "function calling",
  },
  {
    head: "③ client 转发给 server 执行",
    body: "client 按 MCP 协议把这次调用转发过去，MCP Server 真正干活",
    layer: "MCP",
  },
  {
    head: "④ 结果按标准回给模型",
    body: "server 把结果按标准回给 client，client 喂回模型继续往下推",
    layer: "MCP",
  },
];

export function McpCallFlowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一次 MCP 工具调用的来回流程，四步竖向排列、自上而下用箭头相连。第一步，client 发现 server 能力：client 向 MCP Server 要一份清单，看它暴露了哪些 tool，连同每个 tool 的名字、description 和参数，这一步走的是 MCP 协议。第二步，模型选用一个 tool：这些 tool 定义被注入模型的上下文，模型靠 description 挑出最该用的那一个，这一步和第八章讲的 function calling 完全一样，底层是 function calling。第三步，client 转发给 server 执行：client 按 MCP 协议把模型选中的这次调用转发给 server，由 MCP Server 真正执行，这一步走 MCP 协议。第四步，结果按标准回给模型：server 把执行结果按标准格式回给 client，client 再把它喂回模型继续往下推理，这一步走 MCP 协议。核心结论：MCP 负责把工具标准化地发现、转发、回传，也就是怎么把工具接进来；但模型到底挑哪个 tool、怎么发起调用，底层仍然是 function calling。MCP 暴露的 tool，最终还是经 function calling 被模型调用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="mcp-flow-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 标题 —— */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一次 MCP 工具调用怎么走（MCP 接工具 · function calling 调工具）
          </text>

          {/* —— 步间竖向箭头 —— */}
          {[0, 1, 2].map((i) => (
            <line
              key={`flow-arrow-${i}`}
              x1={STEP_CX}
              y1={stepY(i) + STEP_H + 2}
              x2={STEP_CX}
              y2={stepY(i + 1) - 4}
              stroke="var(--accent)"
              strokeWidth="1.6"
              markerEnd="url(#mcp-flow-arrow)"
            />
          ))}

          {/* —— 四步框 —— */}
          {FLOW.map((step, i) => {
            const isFc = step.layer === "function calling";
            return (
              <g key={`flow-${i}`}>
                <rect
                  x={STEP_X}
                  y={stepY(i)}
                  width={STEP_W}
                  height={STEP_H}
                  rx="10"
                  fill={isFc ? "var(--bg-elevated)" : "var(--bg)"}
                  stroke={isFc ? "var(--warning)" : "var(--accent)"}
                  strokeWidth="1.6"
                />
                <text
                  x={STEP_X + 16}
                  y={stepCY(i) - 6}
                  fontSize="12"
                  fontWeight="700"
                  fill={isFc ? "var(--warning)" : "var(--accent)"}
                >
                  {step.head}
                </text>
                <text
                  x={STEP_X + 16}
                  y={stepCY(i) + 16}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {step.body}
                </text>
                {/* 右侧分层小标 */}
                <text
                  x={STEP_X + STEP_W - 12}
                  y={stepCY(i) + 4}
                  textAnchor="end"
                  fontSize="10"
                  fontWeight="700"
                  fill={isFc ? "var(--warning)" : "var(--accent)"}
                >
                  {isFc ? "← function calling" : "← MCP 协议"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一次 MCP 工具调用：client 发现 server 能力 → 模型靠 description 选 tool（这步仍是
        function calling）→ client 转发给 server 执行 → 结果回给模型。
        <strong>MCP 负责「接工具」，function calling 负责「调工具」</strong>，两层各司其职。
      </figcaption>
    </figure>
  );
}
