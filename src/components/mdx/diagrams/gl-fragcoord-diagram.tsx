/**
 * <GlFragCoordDiagram>：「高级GLSL」§3「gl_FragCoord」概念主图（HEL-74，C 实战型）。
 *
 * 把 gl_FragCoord 的窗口/屏幕空间坐标系画清楚，掐死本章最大误区（把它当 NDC -1..1）：
 *  - 一块代表画布的网格，左下角是原点 (0,0)、右上角是 (宽,高)，坐标轴沿用「屏幕像素」刻度；
 *  - 一个被点亮的片段方格，旁边标注它的 gl_FragCoord.xy（如 (520, 300)），是「第几个像素」的整数像素坐标；
 *  - 显式标注：x 范围 0..宽、y 范围 0..高（不是 -1..1），要除以 uResolution 才归一化到 0..1。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--border/--bg/--bg-elevated/
 * --text-primary/--text-secondary/--warning），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function GlFragCoordDiagram() {
  // 被点亮的示例片段（在网格里的格位）与它对应的像素坐标标注。
  const litCol = 6; // 第几列（从左数，0 起）
  const litRow = 2; // 第几行（从下数，0 起）
  const cell = 36; // 每格像素（SVG 单位）
  const cols = 8;
  const rows = 5;
  const gridX = 80;
  const gridTop = 40;
  const gridH = rows * cell;
  const gridBottom = gridTop + gridH; // y 轴朝下，原点在底部
  const litX = gridX + litCol * cell;
  const litY = gridBottom - (litRow + 1) * cell;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 300"
          role="img"
          aria-label="gl_FragCoord 是片段在画布上的窗口像素坐标。一块代表画布的网格，左下角是原点 (0,0)，向右是 x 像素、向上是 y 像素，右上角是 (宽, 高)。其中一个被点亮的片段方格，它的 gl_FragCoord.xy 是一对整数像素坐标，比如 (520, 300)，表示它在画布第几个像素的位置。x 的范围是 0 到画布宽、y 的范围是 0 到画布高，不是 -1 到 1，要除以 uResolution 才能归一化到 0 到 1。"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {/* —— 网格（画布像素栅格）—— */}
          {Array.from({ length: cols }).map((_, c) =>
            Array.from({ length: rows }).map((_, r) => {
              const isLit = c === litCol && r === litRow;
              return (
                <rect
                  key={`${c}-${r}`}
                  x={gridX + c * cell}
                  y={gridBottom - (r + 1) * cell}
                  width={cell}
                  height={cell}
                  fill={isLit ? "var(--accent)" : "var(--bg)"}
                  opacity={isLit ? "0.85" : "1"}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
              );
            }),
          )}

          {/* —— 原点标注（左下角）—— */}
          <circle cx={gridX} cy={gridBottom} r="3.5" fill="var(--accent)" />
          <text
            x={gridX - 6}
            y={gridBottom + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className="font-mono"
            fill="var(--accent)"
          >
            (0,0)
          </text>
          <text
            x={gridX - 6}
            y={gridBottom + 32}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            原点
          </text>

          {/* —— x 轴箭头（向右）—— */}
          <line
            x1={gridX}
            y1={gridBottom + 4}
            x2={gridX + cols * cell}
            y2={gridBottom + 4}
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
          />
          <path
            d={`M${gridX + cols * cell} ${gridBottom + 4} l-9 -4 l0 8 z`}
            fill="var(--text-secondary)"
          />
          <text
            x={gridX + cols * cell + 6}
            y={gridBottom + 8}
            fontSize="11"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            x
          </text>

          {/* —— y 轴箭头（向上）—— */}
          <line
            x1={gridX - 4}
            y1={gridBottom}
            x2={gridX - 4}
            y2={gridTop}
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
          />
          <path
            d={`M${gridX - 4} ${gridTop} l-4 9 l8 0 z`}
            fill="var(--text-secondary)"
          />
          <text
            x={gridX - 12}
            y={gridTop + 4}
            fontSize="11"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            y
          </text>

          {/* —— 右上角 (宽, 高) 标注 —— */}
          <text
            x={gridX + cols * cell}
            y={gridTop - 8}
            textAnchor="end"
            fontSize="10"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            (宽, 高)
          </text>

          {/* —— 被点亮片段的 gl_FragCoord 标注 —— */}
          <line
            x1={litX + cell / 2}
            y1={litY + cell / 2}
            x2={360}
            y2={120}
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <rect
            x="360"
            y="98"
            width="148"
            height="48"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="434"
            y="118"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className="font-mono"
            fill="var(--text-primary)"
          >
            gl_FragCoord.xy
          </text>
          <text
            x="434"
            y="136"
            textAnchor="middle"
            fontSize="11"
            className="font-mono"
            fill="var(--accent)"
          >
            ≈ (520, 300)
          </text>

          {/* —— 关键提示：范围是像素，不是 NDC —— */}
          <rect
            x="80"
            y="252"
            width="360"
            height="34"
            rx="6"
            fill="var(--warning)"
            opacity="0.12"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="260"
            y="268"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            x ∈ 0..画布宽，y ∈ 0..画布高（像素），不是 -1..1
          </text>
          <text
            x="260"
            y="282"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            要除以 uResolution 才归一化到 0..1
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>gl_FragCoord.xy</strong> 是片段在画布上的
        <strong>窗口像素坐标</strong>
        ：原点在左下角 <span className="font-mono">(0,0)</span>，向右数像素是
        x、向上数像素是 y，右上角是 <span className="font-mono">(宽, 高)</span>
        。它是像素值不是 NDC，除以{" "}
        <span className="font-mono">uResolution</span> 才归一化到 0..1。
      </figcaption>
    </figure>
  );
}
