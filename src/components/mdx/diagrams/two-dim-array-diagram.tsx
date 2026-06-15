/**
 * <TwoDimArrayDiagram>：二维数组行优先（row-major）存储布局。
 *
 * 展示 int m[3][4] 在内存中按行连续排列。
 */

export function TwoDimArrayDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const rows = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];
  const cellW = 56;
  const cellH = 40;
  const gridX = 200;
  const gridY = 72;

  const linear: { row: number; col: number; val: number; idx: number }[] = [];
  let k = 0;
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      linear.push({ row: r, col: c, val: rows[r][c], idx: k++ });
    }
  }

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="二维数组 int m[3][4] 行优先存储示意图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            int m[3][4] — 逻辑上是 3 行 × 4 列
          </text>

          <text x={24} y={56} fontSize="12" fontWeight="700" fill={secondary}>
            逻辑视图（二维表格）
          </text>

          {rows.map((row, r) =>
            row.map((v, c) => (
              <g key={`g-${r}-${c}`}>
                <rect
                  x={gridX + c * cellW}
                  y={gridY + r * cellH}
                  width={cellW - 4}
                  height={cellH - 4}
                  rx="4"
                  fill={bg}
                  stroke={border}
                  strokeWidth="1.5"
                />
                <text
                  x={gridX + c * cellW + (cellW - 4) / 2}
                  y={gridY + r * cellH + (cellH - 4) / 2 + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {v}
                </text>
                <text
                  x={gridX + c * cellW + (cellW - 4) / 2}
                  y={gridY + r * cellH - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fill={secondary}
                  fontFamily="monospace"
                >
                  m[{r}][{c}]
                </text>
              </g>
            )),
          )}

          <text x={24} y={gridY + rows.length * cellH + 28} fontSize="12" fontWeight="700" fill={secondary}>
            物理内存（一行接一行，行优先）
          </text>

          {linear.map((item, i) => (
            <g key={`lin-${i}`}>
              <rect
                x={24 + i * 46}
                y={gridY + rows.length * cellH + 40}
                width={42}
                height={36}
                rx="4"
                fill={item.col === 0 ? accent : bg}
                opacity={item.col === 0 ? 0.12 : 0.06}
                stroke={item.col === 0 ? accent : border}
                strokeWidth="1.5"
              />
              <text
                x={24 + i * 46 + 21}
                y={gridY + rows.length * cellH + 62}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={primary}
                fontFamily="monospace"
              >
                {item.val}
              </text>
            </g>
          ))}

          <path
            d={`M ${gridX + 2 * cellW + 26} ${gridY + cellH * 1.5} Q 120 200 80 ${gridY + rows.length * cellH + 58}`}
            stroke={accent}
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 3"
            markerEnd="url(#twoDimArrow)"
          />
          <text x={100} y={200} fontSize="10" fill={accent}>
            按行展开
          </text>

          <text x={24} y={330} fontSize="11" fill={secondary}>
            m[1][2] 是第 2 行第 3 列 → 线性下标 1×4+2 = 6 → 内存中第 7 个 int（从 0 计）。
          </text>

          <defs>
            <marker id="twoDimArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 把二维数组存成一条连续的一维带：先存第 0 行全部元素，再存第 1 行……这叫行优先存储。
      </figcaption>
    </figure>
  );
}
