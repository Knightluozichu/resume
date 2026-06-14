/**
 * <SsaaVsMsaaDiagram>：「抗锯齿」SSAA 超采样 vs MSAA 多重采样 的开销对照图
 * （HEL-77，A 概念型）。并排两块，同一片像素网格，让读者一眼看出「贵在哪、省在哪」：
 *  - 左 SSAA（超采样）：每个像素都被拆成 4 个子像素，且每个子像素都跑一遍片段着色 ——
 *    画面里全部像素都标着「×4 着色」，质量好但着色量翻几倍，贵。
 *  - 右 MSAA（多重采样）：只在几何边缘的像素多放采样点判覆盖度，片段着色仍每像素一次 ——
 *    只有边缘那一圈像素标多采样点，内部/外部像素都是「×1 着色」，性价比高。
 *
 * 强调对照：SSAA 的成本是「每个子像素都着色」，MSAA 的省钱关键是「多采样只多了覆盖度判定，
 * 着色还是每像素一次，且只在边缘多采」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

const N = 4; // 4×4 像素网格
const CELL = 30;

// 一个面板的网格：起点 (ox,oy)，逐格画。返回该格是否「边缘格」（斜边横穿）。
function isEdgeCell(col: number, row: number): boolean {
  // 斜边大致沿对角，row + col 接近 N-1 的格子算边缘。
  const d = row + col - (N - 1);
  return d >= -0.5 && d <= 0.5;
}
function isInsideCell(col: number, row: number): boolean {
  return row + col > N - 1;
}

function Panel({
  ox,
  oy,
  mode,
}: {
  ox: number;
  oy: number;
  mode: "ssaa" | "msaa";
}) {
  const nodes: React.ReactNode[] = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const x = ox + col * CELL;
      const y = oy + row * CELL;
      const edge = isEdgeCell(col, row);
      const inside = isInsideCell(col, row);
      // 像素底色：图元内 accent 浅、外背景。
      nodes.push(
        <rect
          key={`bg-${col}-${row}`}
          x={x}
          y={y}
          width={CELL}
          height={CELL}
          fill={inside ? "var(--accent)" : "var(--bg)"}
          fillOpacity={inside ? 0.28 : 1}
          stroke="var(--border)"
          strokeWidth="1"
        />,
      );

      if (mode === "ssaa") {
        // SSAA：每个像素都拆 4 子像素，且每个子像素都着色（画 2×2 小点，全部 success 实心）。
        for (let sy = 0; sy < 2; sy++) {
          for (let sx = 0; sx < 2; sx++) {
            nodes.push(
              <circle
                key={`s-${col}-${row}-${sx}-${sy}`}
                cx={x + 8 + sx * 14}
                cy={y + 8 + sy * 14}
                r="3"
                fill="var(--warning)"
              />,
            );
          }
        }
      } else {
        // MSAA：只有边缘格多放采样点（4 点判覆盖度），内部/外部格只一个着色点（每像素着色一次）。
        if (edge) {
          for (let sy = 0; sy < 2; sy++) {
            for (let sx = 0; sx < 2; sx++) {
              nodes.push(
                <circle
                  key={`m-${col}-${row}-${sx}-${sy}`}
                  cx={x + 8 + sx * 14}
                  cy={y + 8 + sy * 14}
                  r="3"
                  fill="var(--success)"
                />,
              );
            }
          }
        } else {
          // 非边缘像素：一个着色点（每像素着色一次）
          nodes.push(
            <circle
              key={`m1-${col}-${row}`}
              cx={x + CELL / 2}
              cy={y + CELL / 2}
              r="3"
              fill="var(--accent)"
            />,
          );
        }
      }
    }
  }

  // 斜边参考线（两面板同一条，沿反对角）
  const line = (
    <line
      x1={ox + N * CELL}
      y1={oy}
      x2={ox}
      y2={oy + N * CELL}
      stroke="var(--text-primary)"
      strokeWidth="1.5"
      strokeDasharray="5 3"
    />
  );

  return (
    <g>
      {nodes}
      {line}
    </g>
  );
}

export function SsaaVsMsaaDiagram() {
  const aria =
    "SSAA 超采样和 MSAA 多重采样的开销对照。左边 SSAA：每个像素都被拆成 4 个子像素，而且每个子像素都跑一遍片段着色，着色量翻几倍，质量好但贵。右边 MSAA：只在几何边缘的像素多放采样点来判覆盖度，片段着色仍然每个像素只跑一次，内部和外部的像素都只有一个着色点，性价比高。";

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 420 220"
          role="img"
          aria-label={aria}
          className="mx-auto block h-auto w-full max-w-[420px]"
        >
          {/* 左标题 */}
          <text
            x="80"
            y="24"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--danger)"
          >
            SSAA 超采样
          </text>
          <text
            x="80"
            y="42"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每个子像素都着色 · 贵
          </text>

          {/* 右标题 */}
          <text
            x="320"
            y="24"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            MSAA 多重采样
          </text>
          <text
            x="320"
            y="42"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            只边缘多采 · 着色每像素一次
          </text>

          <Panel ox={20} oy={56} mode="ssaa" />
          <Panel ox={260} oy={56} mode="msaa" />

          {/* 中缝分隔 */}
          <line
            x1="210"
            y1="52"
            x2="210"
            y2="184"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* 底部图例 */}
          <circle cx="34" cy="204" r="3" fill="var(--warning)" />
          <text x="44" y="208" fontSize="9" fill="var(--text-secondary)">
            子像素着色点（每个都跑着色器）
          </text>
          <circle cx="262" cy="204" r="3" fill="var(--success)" />
          <text x="272" y="208" fontSize="9" fill="var(--text-secondary)">
            边缘采样点（只判覆盖度）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>SSAA</strong> 把每个像素都拆成子像素、
        <strong>每个子像素都着色</strong>（着色量翻几倍，贵）；
        <strong>MSAA</strong> 只在<strong>几何边缘</strong>多放采样点判覆盖度，
        <strong>片段着色仍每像素一次</strong>（性价比之选）。
      </figcaption>
    </figure>
  );
}
