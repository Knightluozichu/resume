/**
 * <AssEngineThermodynamicsDiagram>：发动机热力学循环图（四冲程 P-V 图）。
 *
 * 以压力-体积（P-V）图展示奥托四冲程循环，四个冲程用不同颜色：
 *   - 进气（accent）：0→1，TDC→BDC，低压等压吸气，体积增大
 *   - 压缩（warning）：1→2，BDC→TDC，压力随体积减小而升高（绝热曲线）
 *   - 做功（success）：2→3 等容燃烧压力飙升 + 3→4 膨胀做功压力下降
 *   - 排气（secondary）：4→0，BDC→TDC，低压排气，体积减小
 * 标注关键点 TDC（上止点，V_min）、BDC（下止点，V_max）及状态点 1/2/3/4，
 * 循环包围面积 = 净功输出。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 坐标系
const AX_X0 = 150; // V 轴起点 x
const AX_X1 = 600; // V 轴终点 x
const AX_Y0 = 360; // P 轴底部 y（低压）
const AX_Y_TOP = 110; // P 轴顶部 y

// 关键状态点
const P0 = { x: 200, y: 350 }; // TDC 低压（进气始 / 排气终）
const P1 = { x: 560, y: 350 }; // BDC 低压（进气终 / 压缩始）
const P2 = { x: 200, y: 235 }; // TDC 高压（压缩终 / 燃烧始）
const P3 = { x: 200, y: 140 }; // TDC 峰压（燃烧终 / 膨胀始）
const P4 = { x: 560, y: 210 }; // BDC 中压（膨胀终 / 排气始）
const P_EX = { x: 560, y: 340 }; // 排气回落点

const STROKES = {
  intake: accent,
  compress: warning,
  power: success,
  exhaust: secondary,
} as const;

interface LegendItem {
  label: string;
  color: string;
  desc: string;
}

const LEGEND: readonly LegendItem[] = [
  { label: "进气", color: STROKES.intake, desc: "TDC→BDC 等压吸气" },
  { label: "压缩", color: STROKES.compress, desc: "BDC→TDC 压力升高" },
  { label: "做功", color: STROKES.power, desc: "燃烧 + 膨胀做功" },
  { label: "排气", color: STROKES.exhaust, desc: "BDC→TDC 等压排气" },
];

export function AssEngineThermodynamicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="发动机热力学循环 P-V 图。横轴为体积 V（左小右大），纵轴为压力 P（下低上高）。四冲程用四种颜色：进气（紫色，TDC 到 BDC 低压等压线）；压缩（黄色，BDC 到 TDC 压力升高曲线）；做功（绿色，TDC 处等容燃烧压力飙升后膨胀压力下降曲线）；排气（灰色，BDC 到 TDC 低压排气线）。标注 TDC 上止点与 BDC 下止点，循环包围面积为净功输出。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="aet-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="aet-arrow-accent" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="aet-arrow-warn" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
            <marker id="aet-arrow-succ" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={success} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            四冲程发动机 · P-V 热力学循环
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            进气 → 压缩 → 做功 → 排气，循环包围面积 = 净功输出
          </text>

          {/* 循环包围面积（净功） */}
          <path
            d={`M ${P0.x} ${P0.y}
                L ${P1.x} ${P1.y}
                C 470 340, 300 285, ${P2.x} ${P2.y}
                L ${P3.x} ${P3.y}
                C 300 135, 470 170, ${P4.x} ${P4.y}
                L ${P_EX.x} ${P_EX.y}
                L ${P0.x} ${P_EX.y} Z`}
            fill={success}
            fillOpacity="0.07"
            stroke="none"
          />

          {/* 坐标轴 */}
          <line x1={AX_X0} y1={AX_Y0} x2={AX_X1 + 14} y2={AX_Y0} stroke={primary} strokeWidth="1.6" markerEnd="url(#aet-arrow)" />
          <line x1={AX_X0} y1={AX_Y0} x2={AX_X0} y2={AX_Y_TOP - 14} stroke={primary} strokeWidth="1.6" markerEnd="url(#aet-arrow)" />
          <text x={AX_X1 + 22} y={AX_Y0 + 4} fontSize="12" fontWeight="700" fill={primary}>V</text>
          <text x={AX_X1 - 8} y={AX_Y0 + 18} fontSize="11" fill={secondary}>体积</text>
          <text x={AX_X0 - 12} y={AX_Y_TOP - 20} fontSize="12" fontWeight="700" fill={primary}>P</text>
          <text x={AX_X0 - 14} y={AX_Y_TOP - 6} fontSize="11" fill={secondary}>压力</text>

          {/* TDC / BDC 虚线 */}
          <line x1={P0.x} y1={AX_Y_TOP} x2={P0.x} y2={AX_Y0} stroke={border} strokeWidth="1" strokeDasharray="3 3" />
          <line x1={P1.x} y1={AX_Y_TOP} x2={P1.x} y2={AX_Y0} stroke={border} strokeWidth="1" strokeDasharray="3 3" />
          <text x={P0.x} y={AX_Y0 + 32} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>TDC</text>
          <text x={P0.x} y={AX_Y0 + 46} textAnchor="middle" fontSize="11" fill={secondary}>上止点 V_min</text>
          <text x={P1.x} y={AX_Y0 + 32} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>BDC</text>
          <text x={P1.x} y={AX_Y0 + 46} textAnchor="middle" fontSize="11" fill={secondary}>下止点 V_max</text>

          {/* 进气 0→1 */}
          <line x1={P0.x + 4} y1={P0.y} x2={P1.x - 6} y2={P1.y} stroke={STROKES.intake} strokeWidth="2.4" markerEnd="url(#aet-arrow-accent)" />
          <text x={(P0.x + P1.x) / 2} y={P0.y + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill={STROKES.intake}>进气</text>

          {/* 压缩 1→2 */}
          <path
            d={`M ${P1.x} ${P1.y} C 470 340, 300 285, ${P2.x} ${P2.y}`}
            fill="none"
            stroke={STROKES.compress}
            strokeWidth="2.4"
            markerEnd="url(#aet-arrow-warn)"
          />
          <text x={370} y={300} textAnchor="middle" fontSize="12" fontWeight="700" fill={STROKES.compress}>压缩</text>

          {/* 做功：燃烧 2→3 */}
          <line x1={P2.x} y1={P2.y - 4} x2={P3.x} y2={P3.y + 6} stroke={STROKES.power} strokeWidth="2.4" markerEnd="url(#aet-arrow-succ)" />
          {/* 做功：膨胀 3→4 */}
          <path
            d={`M ${P3.x} ${P3.y} C 300 135, 470 170, ${P4.x} ${P4.y}`}
            fill="none"
            stroke={STROKES.power}
            strokeWidth="2.4"
            markerEnd="url(#aet-arrow-succ)"
          />
          <text x={370} y={170} textAnchor="middle" fontSize="12" fontWeight="700" fill={STROKES.power}>做功</text>
          <text x={P3.x - 12} y={(P2.y + P3.y) / 2} textAnchor="end" fontSize="11" fill={STROKES.power}>燃烧</text>

          {/* 排气 4→0 */}
          <line x1={P4.x} y1={P4.y + 4} x2={P_EX.x} y2={P_EX.y - 4} stroke={STROKES.exhaust} strokeWidth="2.4" markerEnd="url(#aet-arrow)" />
          <line x1={P_EX.x - 6} y1={P_EX.y} x2={P0.x + 6} y2={P_EX.y} stroke={STROKES.exhaust} strokeWidth="2.4" markerEnd="url(#aet-arrow)" />
          <text x={(P0.x + P_EX.x) / 2} y={P_EX.y - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill={STROKES.exhaust}>排气</text>

          {/* 状态点标注 */}
          {[
            { p: P1, t: "1" },
            { p: P2, t: "2" },
            { p: P3, t: "3" },
            { p: P4, t: "4" },
          ].map((s) => (
            <g key={s.t}>
              <circle cx={s.p.x} cy={s.p.y} r="4" fill={primary} />
              <text x={s.p.x + 9} y={s.p.y - 7} fontSize="12" fontWeight="700" fill={primary}>{s.t}</text>
            </g>
          ))}

          {/* 净功标注 */}
          <text x={380} y={250} textAnchor="middle" fontSize="11" fill={success}>净功 W</text>

          {/* 图例 */}
          {LEGEND.map((lg, i) => {
            const lx = 80 + i * 152;
            const ly = 408;
            return (
              <g key={lg.label}>
                <rect x={lx} y={ly} width="14" height="10" rx="2" fill={lg.color} fillOpacity="0.5" stroke={lg.color} strokeWidth="1.2" />
                <text x={lx + 20} y={ly + 9} fontSize="12" fontWeight="700" fill={lg.color}>{lg.label}</text>
                <text x={lx + 20} y={ly + 24} fontSize="11" fill={secondary}>{lg.desc}</text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={40} y1={442} x2={VIEW_W - 40} y2={442} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={456} textAnchor="middle" fontSize="10" fill={secondary}>
            压缩比 ε = V_max / V_min，提高 ε 可提升热效率，但受爆震限制
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四冲程 P-V 循环：进气（紫色，等压吸气）→ 压缩（黄色，压力升高）→ 做功（绿色，燃烧膨胀）→ 排气（灰色，等压排气）。TDC 为上止点（最小体积），BDC 为下止点（最大体积），循环包围面积即发动机净功输出。
      </figcaption>
    </figure>
  );
}
