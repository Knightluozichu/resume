/**
 * <DrawCallPipelineDiagram>：Draw Call / Batches / SetPass 含义与 CPU→GPU 提交流程。
 */

type Highlight = "drawcall" | "batch" | "setpass" | "all";

interface Props {
  /** 高亮某一指标；省略则全览 */
  highlight?: Highlight;
}

export function DrawCallPipelineDiagram({ highlight = "all" }: Props) {
  const active = (key: Highlight) => highlight === "all" || highlight === key;
  const stroke = (key: Highlight) =>
    active(key) ? "var(--accent)" : "var(--border)";
  const fill = (key: Highlight) =>
    active(key) ? "var(--bg-elevated)" : "var(--bg)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 260"
          role="img"
          aria-label="Unity 渲染提交流程：CPU 发出 Draw Call，经 Batches 合批，切换 SetPass 绑定着色器，最终 GPU 绘制"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* CPU → GPU pipeline */}
          <rect
            x="24"
            y="48"
            width="88"
            height="72"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="68"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            CPU
          </text>
          <text
            x="68"
            y="98"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            提交命令
          </text>

          <line
            x1="112"
            y1="84"
            x2="148"
            y2="84"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#dc-pipe-arrow)"
          />

          {/* Draw Call box */}
          <rect
            x="152"
            y="36"
            width="120"
            height="96"
            rx="8"
            fill={fill("drawcall")}
            stroke={stroke("drawcall")}
            strokeWidth={active("drawcall") ? 2.5 : 1.5}
          />
          <text
            x="212"
            y="62"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Draw Call
          </text>
          <text
            x="212"
            y="82"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            一次绘制指令
          </text>
          <text
            x="212"
            y="98"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            网格+材质+Pass
          </text>
          <text
            x="212"
            y="118"
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
          >
            CPU 开销大
          </text>

          <line
            x1="272"
            y1="84"
            x2="308"
            y2="84"
            stroke={stroke("batch")}
            strokeWidth="2"
          />

          {/* Batches */}
          <rect
            x="312"
            y="36"
            width="120"
            height="96"
            rx="8"
            fill={fill("batch")}
            stroke={stroke("batch")}
            strokeWidth={active("batch") ? 2.5 : 1.5}
          />
          <text
            x="372"
            y="62"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Batches
          </text>
          <text
            x="372"
            y="82"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            合批后的组
          </text>
          <text
            x="372"
            y="98"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            多物体→少提交
          </text>
          <text
            x="372"
            y="118"
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            越少越好
          </text>

          <line
            x1="432"
            y1="84"
            x2="468"
            y2="84"
            stroke={stroke("setpass")}
            strokeWidth="2"
          />

          {/* SetPass */}
          <rect
            x="472"
            y="36"
            width="120"
            height="96"
            rx="8"
            fill={fill("setpass")}
            stroke={stroke("setpass")}
            strokeWidth={active("setpass") ? 2.5 : 1.5}
          />
          <text
            x="532"
            y="62"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            SetPass
          </text>
          <text
            x="532"
            y="82"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            切换 Shader Pass
          </text>
          <text
            x="532"
            y="98"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            材质/关键字变
          </text>
          <text
            x="532"
            y="118"
            textAnchor="middle"
            fontSize="9"
            fill="var(--warning)"
          >
            切换也贵
          </text>

          <line
            x1="592"
            y1="84"
            x2="616"
            y2="84"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="628"
            y="88"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU
          </text>

          {/* Metrics row */}
          <rect
            x="40"
            y="160"
            width="560"
            height="72"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="320"
            y="182"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Profiler → Rendering 模块常见读数
          </text>
          <text
            x="120"
            y="208"
            textAnchor="middle"
            fontSize="10"
            fill={active("drawcall") ? "var(--accent)" : "var(--text-secondary)"}
          >
            Draw Calls ≈ 原始指令数
          </text>
          <text
            x="320"
            y="208"
            textAnchor="middle"
            fontSize="10"
            fill={active("batch") ? "var(--accent)" : "var(--text-secondary)"}
          >
            Batches ≈ 实际提交组数
          </text>
          <text
            x="520"
            y="208"
            textAnchor="middle"
            fontSize="10"
            fill={active("setpass") ? "var(--accent)" : "var(--text-secondary)"}
          >
            SetPass Calls ≈ Pass 切换次数
          </text>
          <text
            x="320"
            y="228"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            合批成功 → Batches 远小于 Draw Calls；材质各异 → SetPass 偏高
          </text>

          <defs>
            <marker
              id="dc-pipe-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Draw Call 是 CPU 向 GPU 发出的一次绘制指令；Batches 是合批后的提交组；SetPass
        是着色器 Pass 切换次数——三者都在 Profiler Rendering 里可见。
      </figcaption>
    </figure>
  );
}
