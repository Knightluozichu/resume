/**
 * <DynamicProgrammingDiagram>：动态规划 — 0/1 背包问题 DP 表格。
 *
 * 展示背包问题的 DP 状态转移：
 * 行 = 物品（吉他 1lb/$1500、音箱 4lb/$3000、笔记本 3lb/$2000）
 * 列 = 背包容量 0-4。
 * 填充 4×5 网格，高亮最优路径，展示公式。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const CELL_W = 100;
const CELL_H = 56;
const GRID_X0 = 125;
const GRID_Y0 = 95;

const ITEMS = [
  { name: "吉他", w: 1, v: 1500 },
  { name: "音箱", w: 4, v: 3000 },
  { name: "笔记本", w: 3, v: 2000 },
  { name: "iPhone", w: 1, v: 2000 },
];

// 预计算的 DP 表格值和路径
// dp[row][cap] = max(dp[row-1][cap], dp[row-1][cap-w] + v if cap>=w)
const DP: number[][] = [
  [0, 1500, 1500, 1500, 1500],      // 吉他 (1lb)
  [0, 1500, 1500, 1500, 3000],      // 音箱 (4lb)
  [0, 1500, 1500, 2000, 3500],      // 笔记本 (3lb) — 3500 = 吉他+笔记本
  [0, 2000, 3500, 3500, 4000],      // iPhone (1lb) — 4000 = 笔记本+iPhone
];

// 最优路径：每个格子是否来自"选当前物品"
const OPTIMAL_PATH: [number, number][] = [
  [3, 1], [3, 2], [3, 3], [3, 4],  // row 3 (iPhone): all chosen
  [2, 2], [2, 3],                    // row 2 (笔记本): chosen at cap>=3
  [1, 4],                            // row 1 (音箱): chosen at cap 4
  [0, 1], [0, 2], [0, 3], [0, 4],   // row 0 (吉他): chosen at all caps>=1
];

export function DynamicProgrammingDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动态规划 0/1 背包问题 DP 表格。4 行物品（吉他、音箱、笔记本、iPhone），5 列容量 0-4。每格填入 dp[i][w] 值，最优路径的格子用 accent 高亮边框。底部展示状态转移公式 dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])。标注 O(n×W) 子问题只算一次存入表格复用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            0/1 背包 DP 表（容量 = 4lb）
          </text>

          {/* 表头：容量列 */}
          {[0, 1, 2, 3, 4].map((cap, ci) => (
            <g key={`cap-${cap}`}>
              <rect
                x={GRID_X0 + ci * CELL_W}
                y={GRID_Y0}
                width={CELL_W}
                height={34}
                fill={"var(--bg)"}
                stroke={"var(--border)"}
                strokeWidth="1"
              />
              <text
                x={GRID_X0 + ci * CELL_W + CELL_W / 2}
                y={GRID_Y0 + 21}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {cap}lb
              </text>
            </g>
          ))}

          {/* 行标签 + 数据单元格 */}
          {ITEMS.map((item, ri) => {
            const rowY = GRID_Y0 + 34 + ri * CELL_H;
            return (
              <g key={`row-${ri}`}>
                {/* 行标签 */}
                <rect x={25} y={rowY} width={95} height={CELL_H} fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1" />
                <text x={72} y={rowY + CELL_H / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
                  {item.name}
                </text>
                <text x={72} y={rowY + CELL_H / 2 - 14} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {item.w}lb / ${item.v}
                </text>

                {/* 数据格子 */}
                {[0, 1, 2, 3, 4].map((cap, ci) => {
                  const val = DP[ri][cap];
                  const isOpt = OPTIMAL_PATH.some(([r, c]) => r === ri && c === cap);
                  const isMax = val === 4000;
                  return (
                    <g key={`cell-${ri}-${ci}`}>
                      <rect
                        x={GRID_X0 + ci * CELL_W}
                        y={rowY}
                        width={CELL_W}
                        height={CELL_H}
                        fill={isOpt ? "var(--accent)" : "var(--bg)"}
                        fillOpacity={isOpt ? (isMax ? 0.22 : 0.12) : 1}
                        stroke={isOpt ? "var(--accent)" : "var(--border)"}
                        strokeWidth={isOpt ? 2 : 1}
                        rx={isOpt ? 4 : 0}
                      />
                      <text
                        x={GRID_X0 + ci * CELL_W + CELL_W / 2}
                        y={rowY + CELL_H / 2 + 4}
                        textAnchor="middle"
                        fontSize={isMax ? 15 : 13}
                        fontWeight={isMax ? "700" : "500"}
                        fill={isOpt ? "var(--accent)" : "var(--text-primary)"}
                      >
                        ${val}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 最优路径标注 */}
          <text x={GRID_X0 + 2.5 * CELL_W} y={GRID_Y0 + 34 + 4 * CELL_H + 28} textAnchor="middle" fontSize="11" fill={"var(--accent)"} fontWeight="600">
            ↑ 最优解：$4000 = 笔记本 + iPhone（3lb + 1lb = 4lb）
          </text>

          {/* 分隔线 */}
          <line x1={30} y1={GRID_Y0 + 34 + 4 * CELL_H + 44} x2={VIEW_W - 30} y2={GRID_Y0 + 34 + 4 * CELL_H + 44} stroke={"var(--border)"} strokeWidth="1" strokeDasharray="4 3" />

          {/* DP 公式 */}
          <text x={VIEW_W / 2} y={GRID_Y0 + 34 + 4 * CELL_H + 70} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            dp[i][w] = max(dp[i−1][w], dp[i−1][w − weight[i]] + value[i])
          </text>

          <text x={VIEW_W / 2} y={GRID_Y0 + 34 + 4 * CELL_H + 92} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            不放当前物品 · 放当前物品（容量够的前提下）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        O(n×W)：子问题只算一次，存入表格复用
      </figcaption>
    </figure>
  );
}
