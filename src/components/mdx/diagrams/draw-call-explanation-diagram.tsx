/**
 * <DrawCallExplanationDiagram />：Draw Call 工作原理示意。
 *
 * CPU 在左侧打包命令，通过 Draw Call 箭头发送给右侧的 GPU 执行渲染。
 */

export function DrawCallExplanationDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 250"
          role="img"
          aria-label="Draw Call 流程：CPU 准备命令通过 Draw Call 发送给 GPU 执行"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* Title */}
          <text
            x="280"
            y="24"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Draw Call：CPU → GPU 的渲染命令
          </text>

          {/* CPU Box */}
          <rect
            x="40"
            y="50"
            width="180"
            height="130"
            rx="10"
            fill="var(--surface-raised)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="130"
            y="74"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            CPU
          </text>
          <text
            x="130"
            y="96"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            准备渲染命令
          </text>
          {/* Command items */}
          {["网格引用", "材质引用", "变换矩阵"].map((label, i) => (
            <g key={label}>
              <rect
                x="60"
                y={108 + i * 22}
                width="140"
                height="18"
                rx="4"
                fill="var(--border)"
                opacity="0.4"
              />
              <text
                x="130"
                y={120 + i * 22}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                {label}
              </text>
            </g>
          ))}

          {/* Arrow */}
          <defs>
            <marker
              id="dc-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>
          <line
            x1="230"
            y1="115"
            x2="330"
            y2="115"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#dc-arrow)"
          />
          <text
            x="280"
            y="106"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            Draw Call
          </text>
          <text
            x="280"
            y="134"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            每条 = 一次 CPU→GPU 通信
          </text>

          {/* GPU Box */}
          <rect
            x="340"
            y="50"
            width="180"
            height="130"
            rx="10"
            fill="var(--surface-raised)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="430"
            y="74"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU
          </text>
          <text
            x="430"
            y="96"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            执行渲染管线
          </text>
          {/* Pipeline stages */}
          {["顶点着色", "光栅化", "片段着色", "帧缓冲"].map((label, i) => (
            <g key={label}>
              <rect
                x="360"
                y={108 + i * 18}
                width="140"
                height="14"
                rx="3"
                fill="var(--accent)"
                opacity={0.15 + i * 0.1}
              />
              <text
                x="430"
                y={119 + i * 18}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-primary)"
              >
                {label}
              </text>
            </g>
          ))}

          {/* Bottom explanation */}
          <text
            x="280"
            y="210"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Draw Call 多 → CPU 侧准备开销大 → GPU 饿着等命令
          </text>
          <text
            x="280"
            y="228"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            合批（Batching）= 把多条 Draw Call 合成一条，减少 CPU-GPU 通信次数
          </text>
        </svg>
      </div>
    </figure>
  );
}
