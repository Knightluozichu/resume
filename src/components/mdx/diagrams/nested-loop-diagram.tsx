/**
 * <NestedLoopDiagram>：嵌套循环遍历 3×3 矩阵示意。
 *
 * 外循环控制行、内循环控制列，按行优先顺序点亮格子。
 * Server Component，静态 SVG。
 */

interface NestedLoopDiagramProps {
  /** 当前高亮到第几个格子 (0-9)，默认 9 展示完整遍历 */
  highlightUpTo?: number;
}

const GRID = 3;
const CELL = 56;
const PAD = 48;

export function NestedLoopDiagram({ highlightUpTo = 9 }: NestedLoopDiagramProps) {
  const w = PAD * 2 + GRID * CELL + 160;
  const h = PAD * 2 + GRID * CELL + 100;

  const cells: { row: number; col: number; order: number }[] = [];
  let order = 1;
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      cells.push({ row: r, col: c, order });
      order++;
    }
  }

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="3乘3矩阵嵌套循环行优先遍历示意" className="mx-auto block h-auto w-full max-w-[520px]">
          <text x={PAD} y={32} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            嵌套循环：3×3 矩阵行优先遍历
          </text>

          {cells.map(({ row, col, order: n }) => {
            const x = PAD + col * CELL;
            const y = PAD + 16 + row * CELL;
            const lit = n <= highlightUpTo;
            return (
              <g key={`${row}-${col}`}>
                <rect
                  x={x}
                  y={y}
                  width={CELL - 8}
                  height={CELL - 8}
                  rx="6"
                  fill={lit ? "var(--accent)" : "var(--bg)"}
                  fillOpacity={lit ? 0.18 : 1}
                  stroke={lit ? "var(--accent)" : "var(--border)"}
                  strokeWidth="1.5"
                />
                <text x={x + (CELL - 8) / 2} y={y + (CELL - 8) / 2 - 4} textAnchor="middle" fontSize="11" fill={"var(--text-secondary)"} fontFamily="monospace">
                  [{row}][{col}]
                </text>
                <text x={x + (CELL - 8) / 2} y={y + (CELL - 8) / 2 + 14} textAnchor="middle" fontSize="13" fontWeight="700" fill={lit ? "var(--text-primary)" : "var(--text-secondary)"} fontFamily="system-ui">
                  {n}
                </text>
              </g>
            );
          })}

          {/* 伪代码 */}
          <text x={PAD + GRID * CELL + 24} y={PAD + 40} fontSize="11" fill={"var(--text-secondary)"} fontFamily="monospace">
            for (r=0; r&lt;3; r++)
          </text>
          <text x={PAD + GRID * CELL + 36} y={PAD + 58} fontSize="11" fill={"var(--text-secondary)"} fontFamily="monospace">
            for (c=0; c&lt;3; c++)
          </text>
          <text x={PAD + GRID * CELL + 48} y={PAD + 76} fontSize="11" fill={"var(--accent)"} fontFamily="monospace">
            process(r,c);
          </text>

          <text x={PAD} y={h - 30} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            外循环换行、内循环扫列——数字是访问顺序。
          </text>
          <text x={PAD} y={h - 14} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            总次数 = 外层次数 × 内层次数 = 3×3 = 9
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        嵌套循环典型用途：遍历二维数组/矩阵。外循环控制行索引，内循环控制列索引，按行优先依次访问每个元素。
      </figcaption>
    </figure>
  );
}
