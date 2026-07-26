/**
 * <KrcPointerRelationshipDiagram>：指针与数组的关系。
 *
 * 三段式展示指针与数组的等价关系：
 *   - 顶段：数组名 a 与指针 p 指向同一地址
 *   - 中段：指针算术 a[i] = *(a+i) 的内存映射
 *   - 底段：多维数组 a[i][j] 的行主序布局与指针解读
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const CELL_W = 56;
const CELL_H = 40;
const CELL_GAP = 8;
const CELLS_START_X = 196;

export function KrcPointerRelationshipDiagram() {
  // 1D array: 5 elements
  const arr1d = [10, 20, 30, 40, 50];
  const cell1dX = (i: number) => CELLS_START_X + i * (CELL_W + CELL_GAP);

  // 2D array: 2 rows x 4 cols
  const cols2d = 4;
  const cell2dX = (c: number) => CELLS_START_X + c * (CELL_W + CELL_GAP);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="指针与数组的关系。顶段展示数组名 a 与指针 p 指向同一地址；中段展示 a[i] 等价于 *(a+i) 的指针算术；底段展示二维数组 a[i][j] 的行主序布局与指针解读。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="krc-pr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            指针与数组的关系
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            数组名 = 指向首元素的指针；a[i] 就是 *(a+i)
          </text>

          {/* ── 顶段：数组名 vs 指针 ── */}
          <text x={40} y={96} fontSize="13" fontWeight="700" fill="var(--accent)">① 数组名 = 首元素指针</text>
          <line x1={32} y1={106} x2={VIEW_W - 32} y2={106} stroke="var(--border)" strokeWidth="1" strokeOpacity="0.5" />

          {/* pointer p and array name a both point to arr1d[0] */}
          <text x={50} y={140} fontSize="12" fill="var(--text-secondary)" fontFamily="monospace">int a[5];</text>
          <text x={50} y={158} fontSize="12" fill="var(--text-secondary)" fontFamily="monospace">int *p = a;</text>

          {/* pointer labels above first cell */}
          <text x={cell1dX(0) + CELL_W / 2} y={138} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)" fontFamily="monospace">a / p</text>
          <line x1={cell1dX(0) + CELL_W / 2} y1={142} x2={cell1dX(0) + CELL_W / 2} y2={152} stroke="var(--success)" strokeWidth="1.4" markerEnd="url(#krc-pr-arrow)" />

          {/* 1D cells */}
          {arr1d.map((v, i) => (
            <g key={i}>
              <rect x={cell1dX(i)} y={156} width={CELL_W} height={CELL_H} rx="6" fill="var(--accent)" fillOpacity={0.06 + i * 0.02} stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
              <text x={cell1dX(i) + CELL_W / 2} y={172} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">a[{i}]</text>
              <text x={cell1dX(i) + CELL_W / 2} y={190} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">{v}</text>
            </g>
          ))}
          {/* offset labels */}
          {arr1d.map((_, i) => (
            <text key={`off-${i}`} x={cell1dX(i) + CELL_W / 2} y={212} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
              +{i}
            </text>
          ))}

          {/* ── 中段：指针算术等价 ── */}
          <text x={40} y={250} fontSize="13" fontWeight="700" fill="var(--accent)">② 指针算术：a[i] ≡ *(a+i)</text>
          <line x1={32} y1={260} x2={VIEW_W - 32} y2={260} stroke="var(--border)" strokeWidth="1" strokeOpacity="0.5" />

          {/* equivalence boxes */}
          <rect x={120} y={276} width={180} height={32} rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <text x={210} y={297} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">a[i]</text>

          <text x={320} y={297} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">≡</text>

          <rect x={350} y={276} width={200} height={32} rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <text x={450} y={297} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">*(a + i)</text>

          <text x={VIEW_W / 2} y={328} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            a+i 按 sizeof(int) 步长跳转，不是加 i 个字节
          </text>

          {/* ── 底段：多维数组行主序 ── */}
          <text x={40} y={360} fontSize="13" fontWeight="700" fill="var(--accent)">③ 二维数组 a[2][4] 行主序</text>
          <line x1={32} y1={370} x2={VIEW_W - 32} y2={370} stroke="var(--border)" strokeWidth="1" strokeOpacity="0.5" />

          {/* row 0 */}
          <text x={70} y={398} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)" fontFamily="monospace">a[0]</text>
          {[0, 1, 2, 3].map((c) => (
            <g key={`r0-${c}`}>
              <rect x={cell2dX(c)} y={382} width={CELL_W} height={CELL_H} rx="6" fill="var(--accent)" fillOpacity={0.06} stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
              <text x={cell2dX(c) + CELL_W / 2} y={397} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">[{0}][{c}]</text>
              <text x={cell2dX(c) + CELL_W / 2} y={415} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">{c + 1}</text>
            </g>
          ))}

          {/* row 1 */}
          <text x={70} y={448} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)" fontFamily="monospace">a[1]</text>
          {[0, 1, 2, 3].map((c) => (
            <g key={`r1-${c}`}>
              <rect x={cell2dX(c)} y={432} width={CELL_W} height={CELL_H} rx="6" fill="var(--warning)" fillOpacity={0.06} stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
              <text x={cell2dX(c) + CELL_W / 2} y={447} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">[{1}][{c}]</text>
              <text x={cell2dX(c) + CELL_W / 2} y={465} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">{c + 5}</text>
            </g>
          ))}

          {/* continuous memory arrow */}
          <line x1={cell2dX(0)} y1={426} x2={cell2dX(cols2d - 1) + CELL_W} y2={426} stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={494} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            二维数组在内存中连续存放：a[i][j] = *(*(a+i)+j)，先跳 i 行再跳 j 列
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        指针与数组的关系：数组名即首元素指针，a[i] 等价于 *(a+i)，指针算术按类型大小步进。二维数组按行主序连续存放，a[i][j] = *(*(a+i)+j)。
      </figcaption>
    </figure>
  );
}
