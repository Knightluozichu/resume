/**
 * <SpatialPartitionDiagram>：空间分区网格对比图（game-programming-patterns 课程）。
 *
 * 左右双面板对比：
 *   左「无分区」——大矩形内散布 10 个点，所有点对之间以淡红虚线两两相连（N² 比较）。
 *   右「网格分区」——同样大的矩形切成 4×4 网格，选中点的高亮 3×3 邻域（accent 底），
 *   仅从选中点向邻域内 4 个邻居画实线（N→接近常数）。
 * 底部总结：空间分区——将空间切成网格，只检查邻近对象。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×380、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 双面板主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 380;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const success = "var(--success)";

// 面板尺寸
const PANEL_Y = 72;
const PANEL_H = 216;
const LEFT_PANEL = { x: 32, y: PANEL_Y, w: 320, h: PANEL_H };
const RIGHT_PANEL = { x: 368, y: PANEL_Y, w: 320, h: PANEL_H };

// 世界矩形（两面板内一致）
const WORLD_W = 272;
const WORLD_H = 160;
const LEFT_WORLD = { x: 56, y: 102, w: WORLD_W, h: WORLD_H };
const RIGHT_WORLD = { x: 392, y: 102, w: WORLD_W, h: WORLD_H };

// 左面板：无分区，10 个散布点
const NO_PARTITION_POINTS: readonly [number, number][] = [
  [88, 128],
  [148, 116],
  [215, 138],
  [285, 124],
  [108, 168],
  [178, 156],
  [250, 176],
  [128, 208],
  [198, 222],
  [270, 246],
];

// 右面板：网格分区
// 4×4 网格：列宽 68、行高 40
const GRID_COLS = 4;
const GRID_ROWS = 4;
const cellW = WORLD_W / GRID_COLS; // 68
const cellH = WORLD_H / GRID_ROWS; // 40
// 网格竖线 x（相对 RIGHT_WORLD）
const gridVX = [1, 2, 3].map((i) => RIGHT_WORLD.x + i * cellW);
// 网格横线 y（相对 RIGHT_WORLD）
const gridHY = [1, 2, 3].map((i) => RIGHT_WORLD.y + i * cellH);

// 9 个点（col, row 各 0-3）
const GRID_POINTS: readonly [number, number][] = [
  [420, 122], // col0 row0
  [490, 130], // col1 row0
  [560, 165], // col2 row1
  [430, 160], // col0 row1
  [620, 170], // col3 row1
  [500, 200], // col1 row2  ← 选中
  [565, 210], // col2 row2
  [425, 240], // col0 row3
  [610, 245], // col3 row3
];
const SELECTED_IDX = 5; // (500, 200)

// 选中点的 3×3 邻域：col 0-2, row 1-3
const NEIGHBOR_REGION = {
  x: RIGHT_WORLD.x,
  y: RIGHT_WORLD.y + cellH,
  w: cellW * 3,
  h: cellH * 3,
};
// 邻域内的邻居索引（不含选中点自身）
const NEIGHBOR_INDICES = [2, 3, 6, 7];

export function SpatialPartitionDiagram() {
  const leftCx = LEFT_PANEL.x + LEFT_PANEL.w / 2; // 192
  const rightCx = RIGHT_PANEL.x + RIGHT_PANEL.w / 2; // 528
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="空间分区网格对比图。左面板「无分区」：大矩形内散布 10 个点，所有点对之间以淡红虚线两两相连，标注碰撞检测 N 平方两两比较。右面板「网格分区」：同样大的矩形切成 4 乘 4 网格，选中点的高亮 3 乘 3 邻域以紫色底标注，仅从选中点向邻域内 4 个邻居画实线，标注只与同格或邻格比较，N 趋近常数。底部总结：空间分区——将空间切成网格，只检查邻近对象。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            空间分区 · 网格对比
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            把空间切成网格，碰撞检测从 N² 降到接近常数
          </text>

          {/* ===== 左面板：无分区 ===== */}
          <g>
            <rect
              x={LEFT_PANEL.x}
              y={LEFT_PANEL.y}
              width={LEFT_PANEL.w}
              height={LEFT_PANEL.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={leftCx}
              y={PANEL_Y + 18}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={warning}
            >
              无分区
            </text>
            {/* 世界矩形 */}
            <rect
              x={LEFT_WORLD.x}
              y={LEFT_WORLD.y}
              width={LEFT_WORLD.w}
              height={LEFT_WORLD.h}
              fill="var(--bg)"
              stroke={border}
              strokeWidth="1.4"
            />
            {/* N² 两两连线（淡红虚线） */}
            {NO_PARTITION_POINTS.flatMap((a, i) =>
              NO_PARTITION_POINTS.slice(i + 1).map((b, j) => (
                <line
                  key={`pair-${i}-${j}`}
                  x1={a[0]}
                  y1={a[1]}
                  x2={b[0]}
                  y2={b[1]}
                  stroke={danger}
                  strokeWidth="0.6"
                  strokeOpacity="0.15"
                  strokeDasharray="3 3"
                />
              ))
            )}
            {/* 10 个点 */}
            {NO_PARTITION_POINTS.map((p, i) => (
              <circle
                key={`np-${i}`}
                cx={p[0]}
                cy={p[1]}
                r="4"
                fill={primary}
                stroke={danger}
                strokeWidth="1"
              />
            ))}
            {/* 标注 */}
            <text
              x={leftCx}
              y={PANEL_Y + PANEL_H - 10}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={danger}
            >
              碰撞检测：N² 两两比较
            </text>
          </g>

          {/* ===== 右面板：网格分区 ===== */}
          <g>
            <rect
              x={RIGHT_PANEL.x}
              y={RIGHT_PANEL.y}
              width={RIGHT_PANEL.w}
              height={RIGHT_PANEL.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={rightCx}
              y={PANEL_Y + 18}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
            >
              网格分区
            </text>
            {/* 世界矩形 */}
            <rect
              x={RIGHT_WORLD.x}
              y={RIGHT_WORLD.y}
              width={RIGHT_WORLD.w}
              height={RIGHT_WORLD.h}
              fill="var(--bg)"
              stroke={border}
              strokeWidth="1.4"
            />
            {/* 3×3 邻域高亮 */}
            <rect
              x={NEIGHBOR_REGION.x}
              y={NEIGHBOR_REGION.y}
              width={NEIGHBOR_REGION.w}
              height={NEIGHBOR_REGION.h}
              fill={accent}
              fillOpacity="0.08"
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="4 4"
            />
            {/* 网格竖线 */}
            {gridVX.map((x, i) => (
              <line
                key={`gv-${i}`}
                x1={x}
                y1={RIGHT_WORLD.y}
                x2={x}
                y2={RIGHT_WORLD.y + RIGHT_WORLD.h}
                stroke={border}
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            ))}
            {/* 网格横线 */}
            {gridHY.map((y, i) => (
              <line
                key={`gh-${i}`}
                x1={RIGHT_WORLD.x}
                y1={y}
                x2={RIGHT_WORLD.x + RIGHT_WORLD.w}
                y2={y}
                stroke={border}
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            ))}
            {/* 选中点 → 邻居连线（accent 实线） */}
            {NEIGHBOR_INDICES.map((idx, i) => (
              <line
                key={`nbr-${i}`}
                x1={GRID_POINTS[SELECTED_IDX][0]}
                y1={GRID_POINTS[SELECTED_IDX][1]}
                x2={GRID_POINTS[idx][0]}
                y2={GRID_POINTS[idx][1]}
                stroke={accent}
                strokeWidth="1.4"
                strokeOpacity="0.7"
              />
            ))}
            {/* 9 个点 */}
            {GRID_POINTS.map((p, i) => (
              <circle
                key={`gp-${i}`}
                cx={p[0]}
                cy={p[1]}
                r={i === SELECTED_IDX ? 5 : 4}
                fill={i === SELECTED_IDX ? accent : primary}
                stroke={i === SELECTED_IDX ? accent : secondary}
                strokeWidth="1"
              />
            ))}
            {/* 标注 */}
            <text
              x={rightCx}
              y={PANEL_Y + PANEL_H - 10}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={success}
            >
              只与同格/邻格比较：N→接近常数
            </text>
          </g>

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="308"
            width={VIEW_W - 160}
            height="44"
            rx="10"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="335"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            空间分区：将空间切成网格，只检查邻近对象
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        无分区时每个对象要和其余所有对象做碰撞检测，复杂度 O(N²)。引入均匀网格后，对象只与同格及相邻格内的对象比较，单个查询的候选数趋近常数——总复杂度降为 O(N)。
      </figcaption>
    </figure>
  );
}
