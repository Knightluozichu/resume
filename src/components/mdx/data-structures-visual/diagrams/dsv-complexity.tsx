/**
 * <DsvComplexityDiagram>：算法复杂度增长曲线对比图（dsv-complexity 章）。
 *
 * 用阶梯/折线展示六种常见复杂度的增长趋势，横轴 n、纵轴操作次数。
 * 底部总结栏列出常见操作的复杂度速查。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// 图表区域
const CHART_X = 64;
const CHART_Y = 100;
const CHART_W = 480;
const CHART_H = 240;
const N_MAX = 10; // n 轴最大值（逻辑值）

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

type Curve = { label: string; color: string; fn: (n: number) => number };

const CURVES: readonly Curve[] = [
  { label: "O(1)", color: success, fn: () => 1 },
  { label: "O(log n)", color: accent, fn: (n) => Math.log2(n + 1) },
  { label: "O(n)", color: warning, fn: (n) => n },
  { label: "O(n log n)", color: danger, fn: (n) => n * Math.log2(n + 1) },
  { label: "O(n²)", color: "var(--danger)", fn: (n) => n * n },
];

const Y_MAX = 40;

function toX(n: number) {
  return CHART_X + (n / N_MAX) * CHART_W;
}
function toY(val: number) {
  return CHART_Y + CHART_H - Math.min(val, Y_MAX) / Y_MAX * CHART_H;
}

export function DsvComplexityDiagram() {
  const points = (fn: (n: number) => number) => {
    const pts: string[] = [];
    for (let n = 1; n <= N_MAX; n++) {
      pts.push(`${toX(n)},${toY(fn(n))}`);
    }
    return pts.join(" ");
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="算法复杂度增长曲线对比图。横轴为输入规模 n（1 到 10），纵轴为操作次数。五条曲线从低到高：O(1) 常数线平直、O(log n) 缓慢上升、O(n) 线性上升、O(n log n) 略快于线性、O(n²) 快速飙升。右侧图例标注各曲线名称与颜色。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            常见时间复杂度增长趋势
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            横轴：输入规模 n　纵轴：操作次数（截断 40）
          </text>

          {/* 坐标轴 */}
          <line x1={CHART_X} y1={CHART_Y} x2={CHART_X} y2={CHART_Y + CHART_H} stroke={border} strokeWidth="1.2" />
          <line x1={CHART_X} y1={CHART_Y + CHART_H} x2={CHART_X + CHART_W} y2={CHART_Y + CHART_H} stroke={border} strokeWidth="1.2" />

          {/* Y 轴刻度 */}
          {[0, 10, 20, 30, 40].map((v) => (
            <g key={v}>
              <line x1={CHART_X - 4} y1={toY(v)} x2={CHART_X} y2={toY(v)} stroke={border} strokeWidth="1" />
              <text x={CHART_X - 8} y={toY(v) + 4} textAnchor="end" fontSize="11" fill={secondary}>{v}</text>
            </g>
          ))}
          <text x={CHART_X - 36} y={CHART_Y + CHART_H / 2} textAnchor="middle" fontSize="11" fill={secondary} transform={`rotate(-90 ${CHART_X - 36} ${CHART_Y + CHART_H / 2})`}>操作次数</text>

          {/* X 轴刻度 */}
          {[1, 2, 4, 6, 8, 10].map((n) => (
            <g key={n}>
              <line x1={toX(n)} y1={CHART_Y + CHART_H} x2={toX(n)} y2={CHART_Y + CHART_H + 4} stroke={border} strokeWidth="1" />
              <text x={toX(n)} y={CHART_Y + CHART_H + 18} textAnchor="middle" fontSize="11" fill={secondary}>{n}</text>
            </g>
          ))}
          <text x={CHART_X + CHART_W / 2} y={CHART_Y + CHART_H + 38} textAnchor="middle" fontSize="11" fill={secondary}>输入规模 n</text>

          {/* 曲线 */}
          {CURVES.map((c) => (
            <polyline key={c.label} points={points(c.fn)} fill="none" stroke={c.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          ))}

          {/* 图例 */}
          <g>
            <text x={560} y="112" fontSize="12" fontWeight="700" fill={secondary}>图例（快→慢）</text>
            {CURVES.map((c, i) => (
              <g key={c.label}>
                <line x1={560} y1={132 + i * 22} x2={584} y2={132 + i * 22} stroke={c.color} strokeWidth="2.5" />
                <text x={592} y={136 + i * 22} fontSize="12" fill={primary}>{c.label}</text>
              </g>
            ))}
          </g>

          {/* 底部总结 */}
          <rect x="60" y="372" width={VIEW_W - 120} height="36" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="395" textAnchor="middle" fontSize="11" fill={secondary}>
            n=10 时：O(1)=1　O(log n)=4　O(n)=10　O(n log n)=33　O(n²)=100
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        复杂度等级从 O(1) 到 O(2^n)，差距随 n 增大急剧拉开。选对算法与数据结构，就是把复杂度从高阶压到低阶。
      </figcaption>
    </figure>
  );
}
