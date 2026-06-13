/**
 * <DepthBufferDiagram>：「深度测试」§3 深度缓冲是什么的配图（HEL-67，A 概念型）。
 *
 * 把「每个像素除了存颜色，还偷偷存了一个深度值」这件事画清楚，并用它解释
 * 「为什么后画的近物能正确盖住先画的远物」：
 *  ①左半：一个 4×3 像素网格，每格上半画颜色块、下半标一个深度数字（0~1，越小越近）。
 *    强调一格 = 颜色 + 深度两份数据。
 *  ②右半：两块前后交叠的卡片（一远一近），近卡片深度小、把远卡片在交叠处盖住——
 *    因为「新片段深度更小（更近）→ 通过 GL_LESS → 改写这一格」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function DepthBufferDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="深度缓冲示意，分左右两栏。左栏：一块由小方格组成的像素网格，每个方格上半是一块颜色、下半标了一个 0 到 1 之间的深度数字，说明屏幕上每个像素除了颜色还额外存了一个深度值，深度越小表示离镜头越近。右栏：两块前后交叠的卡片，一块离镜头远、深度大，一块离镜头近、深度小；在两块重叠的地方，近的卡片把远的卡片盖住，因为新片段的深度更小、通过了深度测试，于是改写了那一格的颜色和深度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ============ 左栏：一格 = 颜色 + 深度 ============ */}
          <text
            x="170"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            每个像素：颜色 + 一个深度值
          </text>

          {/* 4×3 像素网格：上半颜色、下半深度数字 */}
          {(
            [
              [0, 0, "var(--accent)", "0.3"],
              [1, 0, "var(--accent)", "0.3"],
              [2, 0, "var(--warning)", "0.7"],
              [3, 0, "var(--warning)", "0.7"],
              [0, 1, "var(--accent)", "0.3"],
              [1, 1, "var(--success)", "0.5"],
              [2, 1, "var(--success)", "0.5"],
              [3, 1, "var(--warning)", "0.7"],
              [0, 2, "var(--success)", "0.5"],
              [1, 2, "var(--success)", "0.5"],
              [2, 2, "var(--warning)", "0.7"],
              [3, 2, "var(--warning)", "0.7"],
            ] as const
          ).map(([cx, cy, color, depth]) => {
            const x = 70 + cx * 50;
            const y = 56 + cy * 56;
            return (
              <g key={`${cx}-${cy}`}>
                {/* 上半：颜色 */}
                <rect
                  x={x}
                  y={y}
                  width="46"
                  height="28"
                  fill={color}
                  opacity="0.7"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                {/* 下半：深度值 */}
                <rect
                  x={x}
                  y={y + 28}
                  width="46"
                  height="24"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={x + 23}
                  y={y + 44}
                  textAnchor="middle"
                  fontSize="11"
                  className="font-mono"
                  fill="var(--text-secondary)"
                >
                  {depth}
                </text>
              </g>
            );
          })}
          <text
            x="170"
            y="246"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            上半 = 颜色（颜色缓冲）
          </text>
          <text
            x="170"
            y="266"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            下半 = 深度（深度缓冲，越小越近）
          </text>

          {/* 分隔竖线 */}
          <line
            x1="350"
            y1="44"
            x2="350"
            y2="288"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：近物盖住远物 ============ */}
          <text
            x="540"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            近的盖住远的（不靠先后画）
          </text>

          {/* 远卡片（深度大、画在后面图层但被盖） */}
          <rect
            x="420"
            y="70"
            width="150"
            height="110"
            rx="6"
            fill="var(--warning)"
            opacity="0.7"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="445"
            y="100"
            fontSize="11"
            className="font-mono"
            fill="var(--text-primary)"
          >
            远 z=0.7
          </text>

          {/* 近卡片（深度小，在交叠处盖住远卡片） */}
          <rect
            x="500"
            y="120"
            width="150"
            height="110"
            rx="6"
            fill="var(--accent)"
            opacity="0.85"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="585"
            y="150"
            fontSize="11"
            className="font-mono"
            fill="var(--text-primary)"
          >
            近 z=0.3
          </text>

          <text
            x="540"
            y="266"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            交叠处：z=0.3 比 0.7 小 → 近的胜出
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        屏幕上每个像素除了存<strong>颜色</strong>，还额外存了一个 0~1 的
        <strong>深度值</strong>
        （左：上半颜色、下半深度，越小越近）。两物体交叠时，
        谁的深度小（更近）谁就胜出、盖住对方（右）——靠的是比深度，
        <strong>不是</strong>谁后画。
      </figcaption>
    </figure>
  );
}
