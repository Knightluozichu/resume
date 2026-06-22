/**
 * <DecisionMatrixDiagram />：《Android 设计模式》「设计问答广场」章配图。
 *
 * 画面内容：2×2 决策矩阵，用于团队规模和变更频率两个维度选择架构模式。
 *  X 轴「团队规模」：左 small 2-3 人 → 右 large 20+ 人。
 *  Y 轴「变更频率」：下 stable 稳定 → 上 rapid 快速迭代。
 *  四个象限各有一个推荐模式卡片：
 *   - 左下：Small + Stable → 简单 MVC 够用
 *   - 左上：Small + Rapid → MVVM + Compose
 *   - 右下：Large + Stable → MVP + Clean Architecture
 *   - 右上：Large + Rapid → VIPER / Flux 明确边界
 *  矩阵下方是四步决策检查清单：约束 → 比较代价 → 反证条件 → 记录决策。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

// —— 象限定义 ——
interface Quadrant {
  row: 0 | 1; // 0 = top (rapid), 1 = bottom (stable)
  col: 0 | 1; // 0 = left (small), 1 = right (large)
  recommendation: string;
  color: string;
}

const QUADRANTS: readonly Quadrant[] = [
  { row: 0, col: 0, recommendation: "MVVM + Compose", color: "var(--accent)" },
  { row: 0, col: 1, recommendation: "VIPER / Flux\n明确边界", color: "var(--warning)" },
  { row: 1, col: 0, recommendation: "简单 MVC 够用", color: "var(--success)" },
  { row: 1, col: 1, recommendation: "MVP + Clean\nArchitecture", color: "var(--danger)" },
];

// —— 决策步骤 ——
interface DecisionStep {
  step: string;
  description: string;
  color: string;
}

const DECISION_STEPS: readonly DecisionStep[] = [
  { step: "① 约束", description: "团队人数、迭代频率、技术栈", color: "var(--accent)" },
  { step: "② 比较代价", description: "过度工程 vs 欠工程", color: "var(--warning)" },
  { step: "③ 反证条件", description: "什么情况下你的选择会翻车？", color: "var(--danger)" },
  { step: "④ 记录决策", description: "写下 Why，而非 How", color: "var(--success)" },
];

// —— 布局常量 ——
const VIEW_W = 720;
const VIEW_H = 540;
const PAD_X = 24;
const MATRIX_X = 100; // 矩阵区域左边 x (centered: (720-520)/2 = 100)
const MATRIX_Y = 64; // 矩阵区域上边 y
const MATRIX_W = 520; // 矩阵宽
const MATRIX_H = 280; // 矩阵高
const CELL_W = MATRIX_W / 2;
const CELL_H = MATRIX_H / 2;
const AXIS_LABEL_OFFSET = 28; // 轴标签偏移
const CHECKLIST_Y = 414; // 检查清单起始 y
const STEP_BOX_W = 144;
const STEP_BOX_H = 64;
const ARROW_SIZE = 32;

/** 根据 row/col 计算象限色阶（对角线方向组合，越右上越需要重架构）。 */
function quadrantBgOpacity(row: 0 | 1, col: 0 | 1): { bg: number; intensity: string } {
  if (row === 0 && col === 1) return { bg: 0.12, intensity: "重" }; // Large+Rapid
  if (row === 1 && col === 1) return { bg: 0.08, intensity: "中" }; // Large+Stable
  if (row === 0 && col === 0) return { bg: 0.06, intensity: "中轻" }; // Small+Rapid
  return { bg: 0.04, intensity: "轻" }; // Small+Stable
}

export function DecisionMatrixDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="架构选择 2×2 决策矩阵。X 轴为团队规模从左到右从小到大，Y 轴为变更频率从下到上从稳定到快速迭代。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* === 标题 === */}
          <text x={PAD_X} y="30" fontSize="14" fontWeight="700" fill="var(--text-primary)">
            架构选择决策矩阵
          </text>
          <text x={PAD_X} y="48" fontSize="11" fill="var(--text-secondary)">
            团队规模 × 变更频率：选择适度的架构模式
          </text>

          {/* === 2×2 矩阵 === */}
          {/* 矩阵背景 */}
          <rect x={MATRIX_X} y={MATRIX_Y} width={MATRIX_W} height={MATRIX_H} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.4" />

          {/* 十字分割线 */}
          <line x1={MATRIX_X} y1={MATRIX_Y + CELL_H} x2={MATRIX_X + MATRIX_W} y2={MATRIX_Y + CELL_H} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
          <line x1={MATRIX_X + CELL_W} y1={MATRIX_Y} x2={MATRIX_X + CELL_W} y2={MATRIX_Y + MATRIX_H} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

          {/* X 轴标签 */}
          <text x={MATRIX_X + MATRIX_W / 2} y={MATRIX_Y + MATRIX_H + AXIS_LABEL_OFFSET} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            团队规模
          </text>
          <text x={MATRIX_X + 16} y={MATRIX_Y + MATRIX_H + AXIS_LABEL_OFFSET + 16} textAnchor="start" fontSize="11" fill="var(--text-secondary)">
            ← 小 (2-3人)
          </text>
          <text x={MATRIX_X + MATRIX_W - 16} y={MATRIX_Y + MATRIX_H + AXIS_LABEL_OFFSET + 16} textAnchor="end" fontSize="11" fill="var(--text-secondary)">
            大 (20+人) →
          </text>

          {/* Y 轴标签 */}
          <text x={MATRIX_X - 16} y={MATRIX_Y + MATRIX_H / 2} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)" transform={`rotate(-90 ${MATRIX_X - 16} ${MATRIX_Y + MATRIX_H / 2})`}>
            变更频率
          </text>
          <text x={MATRIX_X - 36} y={MATRIX_Y + 20} textAnchor="end" fontSize="11" fill="var(--text-secondary)">
            ↑ 快
          </text>
          <text x={MATRIX_X - 36} y={MATRIX_Y + MATRIX_H - 8} textAnchor="end" fontSize="11" fill="var(--text-secondary)">
            ↓ 稳
          </text>

          {/* 四个象限 */}
          {QUADRANTS.map((q) => {
            const cx = MATRIX_X + q.col * CELL_W; // 本象限左上 x
            const cy = MATRIX_Y + q.row * CELL_H; // 本象限左上 y
            const qInfo = quadrantBgOpacity(q.row, q.col);
            return (
              <g key={`q${q.row}${q.col}`}>
                {/* 象限淡底色 */}
                <rect x={cx + 4} y={cy + 4} width={CELL_W - 8} height={CELL_H - 8} rx="6" fill={q.color} fillOpacity={qInfo.bg} />

                {/* 推荐卡片 */}
                <rect
                  x={cx + CELL_W / 2 - 72}
                  y={cy + CELL_H / 2 - 28}
                  width="144"
                  height="56"
                  rx="8"
                  fill="var(--bg-elevated)"
                  stroke={q.color}
                  strokeWidth="1.6"
                />
                {q.recommendation.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={cx + CELL_W / 2}
                    y={cy + CELL_H / 2 - 4 + li * 16}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={li === 0 ? "700" : "500"}
                    fill={li === 0 ? q.color : "var(--text-primary)"}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* === 底部决策检查清单 === */}
          <text x={PAD_X} y={CHECKLIST_Y - 16} fontSize="13" fontWeight="700" fill="var(--text-primary)">
            决策检查清单
          </text>

          {DECISION_STEPS.map((step, i) => {
            const sx = PAD_X + i * (STEP_BOX_W + ARROW_SIZE);
            return (
              <g key={step.step}>
                {/* 步骤卡片 */}
                <rect
                  x={sx}
                  y={CHECKLIST_Y}
                  width={STEP_BOX_W}
                  height={STEP_BOX_H}
                  rx="6"
                  fill={step.color}
                  fillOpacity="0.08"
                  stroke={step.color}
                  strokeWidth="1.2"
                />
                <text x={sx + STEP_BOX_W / 2} y={CHECKLIST_Y + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={step.color}>
                  {step.step}
                </text>
                <text x={sx + STEP_BOX_W / 2} y={CHECKLIST_Y + 42} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {step.description}
                </text>

                {/* 步骤间箭头 */}
                {i < DECISION_STEPS.length - 1 && (
                  <g>
                    <line
                      x1={sx + STEP_BOX_W + 4}
                      y1={CHECKLIST_Y + STEP_BOX_H / 2}
                      x2={sx + STEP_BOX_W + ARROW_SIZE - 6}
                      y2={CHECKLIST_Y + STEP_BOX_H / 2}
                      stroke="var(--border)"
                      strokeWidth="1.4"
                    />
                    <path
                      d={`M ${sx + STEP_BOX_W + ARROW_SIZE - 6} ${CHECKLIST_Y + STEP_BOX_H / 2} l -4 -3 l 0 6 z`}
                      fill="var(--border)"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        架构模式没有银弹，选择依赖具体上下文。用决策矩阵定位你的象限，按四步清单走：
        约束 → 比较过度工程与欠工程的代价 → 反证你的选择 → 记录决策的 Why，而非 How。
      </figcaption>
    </figure>
  );
}
