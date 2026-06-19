/**
 * <AaReactTraceDiagram>：ReAct trace 解剖图（HEL-312）。
 *
 * 纯展示 SVG，不引入运行时代码。把一段 Thought / Action / Observation /
 * Final Answer trace 拆成「模型写的」「运行时做的」「停止条件」三层。
 */

const ROWS = [
  {
    id: "thought",
    title: "Thought",
    owner: "模型写",
    example: "我需要先查明早 10 点是否有空。",
    note: "私下推理下一步，不直接给用户。",
    color: "var(--accent)",
  },
  {
    id: "action",
    title: "Action",
    owner: "模型写",
    example: 'calendar_search({"date":"明天","room":"A"})',
    note: "结构化请求：调哪个工具、传哪些参数。",
    color: "var(--warning)",
  },
  {
    id: "observation",
    title: "Observation",
    owner: "运行时写",
    example: "A 室明天 10:00-11:00 可用。",
    note: "工具回执被塞回 messages，下一轮模型能读到。",
    color: "var(--success)",
  },
  {
    id: "final",
    title: "Final Answer",
    owner: "模型写",
    example: "已帮你订好明天 10 点的 A 室。",
    note: "停止信号：不再请求工具，直接回答用户。",
    color: "var(--success)",
  },
] as const;

export function AaReactTraceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox="0 0 900 430"
          role="img"
          aria-label="ReAct trace 解剖图：Thought 和 Action 由模型写出，Observation 由运行时把工具结果回灌，Final Answer 是停止条件。"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <text
            x="24"
            y="32"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Trace 解剖：哪几行是模型写的？哪一行是运行时塞回来的？
          </text>
          <text x="24" y="54" fontSize="11" fill="var(--text-secondary)">
            同一段日志里，Action 只是请求；Observation 才是工具执行后的回执。
          </text>

          <line
            x1="170"
            y1="82"
            x2="170"
            y2="380"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <line
            x1="516"
            y1="82"
            x2="516"
            y2="380"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          <text x="24" y="88" fontSize="11" fill="var(--text-secondary)">
            字段
          </text>
          <text x="188" y="88" fontSize="11" fill="var(--text-secondary)">
            trace 里的实际内容
          </text>
          <text x="534" y="88" fontSize="11" fill="var(--text-secondary)">
            谁负责 / 为什么重要
          </text>

          {ROWS.map((row, index) => {
            const y = 108 + index * 76;
            return (
              <g key={row.id}>
                <rect
                  x="24"
                  y={y}
                  width="852"
                  height="58"
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--border)"
                />
                <rect
                  x="24"
                  y={y}
                  width="132"
                  height="58"
                  rx="10"
                  fill={row.color}
                  fillOpacity="0.1"
                  stroke={row.color}
                />
                <text
                  x="42"
                  y={y + 24}
                  fontSize="13"
                  fontWeight="700"
                  fill={row.color}
                >
                  {row.title}
                </text>
                <text
                  x="42"
                  y={y + 42}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {row.owner}
                </text>
                <text
                  x="188"
                  y={y + 25}
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {row.example}
                </text>
                <text
                  x="534"
                  y={y + 23}
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {row.owner}
                </text>
                <text
                  x="534"
                  y={y + 43}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {row.note}
                </text>
              </g>
            );
          })}

          <path
            d="M450 242 C486 242 486 146 450 146"
            fill="none"
            stroke="var(--accent)"
            strokeDasharray="5 6"
          />
          <text x="292" y="206" fontSize="10" fill="var(--accent)">
            Observation 进入下一轮 Thought
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        读 trace 时要守住边界：模型输出 Action，不代表工具已经执行；只有
        Observation 回来后，下一轮 Thought 才有新事实可用。
      </figcaption>
    </figure>
  );
}
