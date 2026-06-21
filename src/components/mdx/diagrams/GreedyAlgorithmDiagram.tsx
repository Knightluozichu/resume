/**
 * <GreedyAlgorithmDiagram>：Grokking Algorithms — 贪心算法可视化。
 *
 * 展示电台覆盖问题的贪心策略：
 * 左面板 5 个电台（S1–S5），圆半径表示覆盖省份数；
 * 右面板 8 个省份（小圆点）；
 * 底部列出贪心三步：选最优 → 移除已覆盖 → 重复。
 *
 * Server Component（纯 SVG，无 "use client"）。
 * 全部使用 JSX 表达式语法 fill={"var(--accent)"} 等避免 TS 歧义。
 */

const VW = 720;
const VH = 620;

const L_X = 20;
const L_W = 330;
const L_CX = L_X + L_W / 2;

const R_X = 380;
const R_W = 320;

const STEPS_Y = 470;
const STEPS_H = 80;

/** 5 个电台：位置 + 覆盖省份数 → 半径（proportional） */
const stations = [
  { id: "S1", cy: 105, covers: 3, r: 16 },
  { id: "S2", cy: 230, covers: 5, r: 24 },
  { id: "S3", cy: 355, covers: 2, r: 12 },
  { id: "S4", cy: 170, covers: 4, r: 20 },
  { id: "S5", cy: 310, covers: 4, r: 20 },
];

/** 8 个省份 */
const provinceYs = [115, 143, 171, 199, 227, 255, 283, 311];

const SEARCH_ARIA =
  "贪心算法示意图。左面板展示 5 个电台 S1 到 S5，圆半径表示覆盖省份数。" +
  "右面板展示 8 个待覆盖省份。底部三步：一、选出覆盖最多未覆盖省份的电台；" +
  "二、移除已覆盖省份；三、重复直到全部覆盖。";

export function GreedyAlgorithmDiagram() {
  const ac = "var(--accent)";
  const su = "var(--success)";
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";
  const be = "var(--bg-elevated)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          role="img"
          aria-label={SEARCH_ARIA}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ga-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={ac} />
            </marker>
          </defs>

          {/* 标题 */}
          <text x={VW / 2} y={32} textAnchor="middle" fontSize={16} fontWeight="700" fill={tp}>
            贪心算法：电台覆盖问题
          </text>
          <text x={VW / 2} y={54} textAnchor="middle" fontSize={11} fill={ts}>
            每步选当前最优 → 逐步逼近全局近似最优
          </text>

          {/* ======== 左面板：电台 ======== */}
          <rect
            x={L_X}
            y={70}
            width={L_W}
            height={320}
            rx={10}
            fill={bg}
            stroke={bo}
            strokeWidth={1.5}
          />
          {/* 左面板标题 */}
          <rect x={L_X + 10} y={78} width={L_W - 20} height={26} rx={6} fill={ac} fillOpacity={0.08} />
          <text
            x={L_CX}
            y={96}
            textAnchor="middle"
            fontSize={13}
            fontWeight="700"
            fill={ac}
          >
            电台（覆盖能力 ∝ 半径）
          </text>

          {/* 5 个电台圆 */}
          {stations.map((s) => (
            <g key={s.id}>
              <circle
                cx={L_CX}
                cy={s.cy}
                r={s.r}
                fill={ac}
                fillOpacity={0.12}
                stroke={ac}
                strokeWidth={2}
              />
              <text
                x={L_CX}
                y={s.cy + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight="700"
                fill={ac}
              >
                {s.id}
              </text>
              <text
                x={L_CX}
                y={s.cy + s.r + 12}
                textAnchor="middle"
                fontSize={11}
                fill={ts}
              >
                覆盖 {s.covers} 省
              </text>
            </g>
          ))}

          {/* ======== 右面板：省份 ======== */}
          <rect
            x={R_X}
            y={70}
            width={R_W}
            height={320}
            rx={10}
            fill={bg}
            stroke={bo}
            strokeWidth={1.5}
          />
          {/* 右面板标题 */}
          <rect x={R_X + 10} y={78} width={R_W - 20} height={26} rx={6} fill={su} fillOpacity={0.08} />
          <text
            x={R_X + R_W / 2}
            y={96}
            textAnchor="middle"
            fontSize={13}
            fontWeight="700"
            fill={su}
          >
            待覆盖省份（8 个）
          </text>

          {/* 8 个省点 */}
          {provinceYs.map((py, i) => (
            <g key={`p${i}`}>
              <circle
                cx={R_X + 55 + (i % 4) * 60}
                cy={115 + Math.floor(i / 4) * 55}
                r={8}
                fill={su}
                fillOpacity={0.18}
                stroke={su}
                strokeWidth={1.5}
              />
              <text
                x={R_X + 55 + (i % 4) * 60}
                y={115 + Math.floor(i / 4) * 55 + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight="600"
                fill={su}
              >
                {i + 1}
              </text>
            </g>
          ))}

          {/* 从 S2（覆盖最多）到省份的示意连接 */}
          <path
            d={`M${L_CX + stations[1].r} ${stations[1].cy} Q${(L_CX + stations[1].r + R_X + 55) / 2} ${stations[1].cy - 20} ${R_X + 55} ${115 + 2 * 55}`}
            stroke={ac}
            strokeWidth={1.5}
            strokeDasharray="5 3"
            fill="none"
            markerEnd="url(#ga-accent)"
          />
          <text
            x={(L_CX + stations[1].r + R_X + 55) / 2 - 15}
            y={stations[1].cy - 32}
            textAnchor="middle"
            fontSize={11}
            fill={ac}
          >
            贪心优选 →
          </text>

          {/* ======== 底部分隔线 ======== */}
          <line x1={40} y1={STEPS_Y - 12} x2={VW - 40} y2={STEPS_Y - 12} stroke={bo} strokeWidth={1} strokeDasharray="4 3" />

          {/* ======== 底部步骤区 ======== */}
          <text x={VW / 2} y={STEPS_Y + 14} textAnchor="middle" fontSize={12} fontWeight="700" fill={tp}>
            贪心策略三步骤
          </text>

          {/* Step 1 */}
          <rect x={40} y={STEPS_Y + 26} width={VW - 80} height={22} rx={4} fill={ac} fillOpacity={0.06} />
          <text x={56} y={STEPS_Y + 41} textAnchor="start" fontSize={11} fontWeight="600" fill={ac}>
            1.
          </text>
          <text x={76} y={STEPS_Y + 41} textAnchor="start" fontSize={11} fill={tp}>
            选择覆盖最多<text fontWeight="600" fill={ac}>未覆盖</text>省份的电台
          </text>

          {/* Step 2 */}
          <rect x={40} y={STEPS_Y + 52} width={VW - 80} height={22} rx={4} fill={ts} fillOpacity={0.04} />
          <text x={56} y={STEPS_Y + 67} textAnchor="start" fontSize={11} fontWeight="600" fill={ts}>
            2.
          </text>
          <text x={76} y={STEPS_Y + 67} textAnchor="start" fontSize={11} fill={tp}>
            从待覆盖集合中<text fontWeight="600" fill={su}>移除</text>该电台已覆盖的省份
          </text>

          {/* Step 3 */}
          <rect x={40} y={STEPS_Y + 78} width={VW - 80} height={22} rx={4} fill={ts} fillOpacity={0.04} />
          <text x={56} y={STEPS_Y + 93} textAnchor="start" fontSize={11} fontWeight="600" fill={ts}>
            3.
          </text>
          <text x={76} y={STEPS_Y + 93} textAnchor="start" fontSize={11} fill={tp}>
            重复步骤 1–2，直到所有省份都被覆盖 → 得到<text fontWeight="600" fill={ac}>近似最优解</text>
          </text>

          {/* 最终标语 */}
          <text x={VW / 2} y={VH - 24} textAnchor="middle" fontSize={12} fontWeight="700" fill={ac}>
            贪心策略：每步选最优 → 全局近似最优
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        贪心算法在每一步选择当前看来最好的方案。对于集合覆盖问题，
        贪心策略给出的是近似最优解（不一定全局最优，但足够接近）。
      </figcaption>
    </figure>
  );
}
