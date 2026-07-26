/**
 * <AaeApproximationDiagram>：近似算法图解（advanced-algorithm 概率算法章）。
 *
 * 左侧：TSP（旅行商）5 节点图。最优解 OPT 用虚线（accent）标注（凸包周边），
 *       贪心近似解 APX 用实线（warning）标注（星形穿越，更长）。
 * 右侧：近似比概念 APX ≤ α × OPT，用两根条形对比 OPT 与 APX 的高度差，标注 α。
 * 下方：常见近似算法及其近似比——Vertex Cover 2-近似、TSP Christofides 1.5-近似、Set Cover ln(n)-近似。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×470（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 470;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

// TSP 节点（左半区）
const N: Record<string, { x: number; y: number }> = {
  N1: { x: 110, y: 116 },
  N2: { x: 250, y: 116 },
  N3: { x: 300, y: 224 },
  N4: { x: 175, y: 296 },
  N5: { x: 60, y: 224 },
};
// 最优解：凸包周边
const OPT_TOUR: [string, string][] = [
  ["N1", "N2"],
  ["N2", "N3"],
  ["N3", "N4"],
  ["N4", "N5"],
  ["N5", "N1"],
];
// 近似解：星形穿越，更长
const APX_TOUR: [string, string][] = [
  ["N1", "N3"],
  ["N3", "N5"],
  ["N5", "N2"],
  ["N2", "N4"],
  ["N4", "N1"],
];

// 近似比条形（右半区），基线 y=292
const BAR_BASE = 292;
const OPT_BAR = { x: 432, w: 48, h: 80 };
const APX_BAR = { x: 560, w: 48, h: 120 };

// 下方算法卡
const ALGOS: { name: string; ratio: string; note: string; color: string }[] = [
  { name: "Vertex Cover", ratio: "2-近似", note: "贪心取最大度，常数比", color: accent },
  { name: "TSP Christofides", ratio: "1.5-近似", note: "MST + 最小权完美匹配", color: success },
  { name: "Set Cover", ratio: "ln(n)-近似", note: "贪心选覆盖最多者", color: warning },
];

export function AaeApproximationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="近似算法图解。左侧 TSP 五节点图：虚线为最优解 OPT（凸包周边），实线为贪心近似解 APX（星形穿越，更长）。右侧近似比概念 APX ≤ α × OPT，两根条形对比 OPT 与 APX 高度差并标注 α。下方列出 Vertex Cover 2-近似、TSP Christofides 1.5-近似、Set Cover ln(n)-近似。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            近似算法 · 用可接受的误差换时间
          </text>

          {/* 左半区标题 */}
          <text x={170} y={58} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            TSP 实例 · 最优 vs 近似
          </text>

          {/* 近似解 APX（实线 warning） */}
          {APX_TOUR.map(([a, b], i) => (
            <line
              key={`apx-${i}`}
              x1={N[a].x}
              y1={N[a].y}
              x2={N[b].x}
              y2={N[b].y}
              stroke={warning}
              strokeWidth="2.4"
              strokeOpacity="0.85"
            />
          ))}
          {/* 最优解 OPT（虚线 accent） */}
          {OPT_TOUR.map(([a, b], i) => (
            <line
              key={`opt-${i}`}
              x1={N[a].x}
              y1={N[a].y}
              x2={N[b].x}
              y2={N[b].y}
              stroke={accent}
              strokeWidth="2"
              strokeDasharray="6 4"
              strokeOpacity="0.9"
            />
          ))}
          {/* TSP 节点 */}
          {Object.entries(N).map(([key, p]) => (
            <g key={key}>
              <circle cx={p.x} cy={p.y} r="11" fill={elevated} stroke={primary} strokeWidth="1.8" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary} fontFamily="monospace">
                {key}
              </text>
            </g>
          ))}
          {/* 左半区图例 */}
          <line x1={40} y1={332} x2={64} y2={332} stroke={accent} strokeWidth="2" strokeDasharray="6 4" />
          <text x={70} y={336} fontSize="11" fill={primary}>OPT 最优解（虚线）</text>
          <line x1={40} y1={352} x2={64} y2={352} stroke={warning} strokeWidth="2.4" />
          <text x={70} y={356} fontSize="11" fill={primary}>APX 近似解（实线）</text>

          {/* 右半区分隔 */}
          <line x1={360} y1={70} x2={360} y2={316} stroke={border} strokeWidth="1" strokeDasharray="3 4" />

          {/* 右半区：近似比 */}
          <text x={524} y={58} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            近似比 Approximation Ratio
          </text>
          {/* 公式 */}
          <rect x={420} y={74} width={208} height={40} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={524} y={100} textAnchor="middle" fontSize="17" fontWeight="700" fill={accent} fontFamily="monospace">
            APX ≤ α × OPT
          </text>

          {/* 条形：OPT */}
          <rect x={OPT_BAR.x} y={BAR_BASE - OPT_BAR.h} width={OPT_BAR.w} height={OPT_BAR.h} rx="4" fill={accent} fillOpacity="0.55" stroke={accent} strokeWidth="1.4" />
          <text x={OPT_BAR.x + OPT_BAR.w / 2} y={BAR_BASE + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">OPT</text>
          <text x={OPT_BAR.x + OPT_BAR.w / 2} y={BAR_BASE + 30} textAnchor="middle" fontSize="11" fill={secondary}>最优</text>

          {/* 条形：APX */}
          <rect x={APX_BAR.x} y={BAR_BASE - APX_BAR.h} width={APX_BAR.w} height={APX_BAR.h} rx="4" fill={warning} fillOpacity="0.55" stroke={warning} strokeWidth="1.4" />
          <text x={APX_BAR.x + APX_BAR.w / 2} y={BAR_BASE + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">APX</text>
          <text x={APX_BAR.x + APX_BAR.w / 2} y={BAR_BASE + 30} textAnchor="middle" fontSize="11" fill={secondary}>近似</text>

          {/* α 标注：连接两条形顶部 */}
          <line x1={OPT_BAR.x + OPT_BAR.w} y1={BAR_BASE - OPT_BAR.h} x2={APX_BAR.x} y2={BAR_BASE - APX_BAR.h} stroke={secondary} strokeWidth="1.4" strokeDasharray="4 3" />
          <circle cx={515} cy={BAR_BASE - 100} r="13" fill={elevated} stroke={secondary} strokeWidth="1.4" />
          <text x={515} y={BAR_BASE - 96} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">α</text>
          <text x={524} y={BAR_BASE + 56} textAnchor="middle" fontSize="11" fill={secondary}>
            α 越接近 1 越好
          </text>

          {/* 下方算法卡 */}
          <line x1={32} y1={392} x2={VIEW_W - 32} y2={392} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          {ALGOS.map((a, i) => {
            const x = 40 + i * 216;
            return (
              <g key={a.name}>
                <rect x={x} y={402} width={208} height={52} rx="8" fill={a.color} fillOpacity="0.07" stroke={a.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={x + 12} y={421} fontSize="12" fontWeight="700" fill={a.color}>
                  {a.name}
                </text>
                <text x={x + 196} y={421} textAnchor="end" fontSize="13" fontWeight="700" fill={a.color} fontFamily="monospace">
                  {a.ratio}
                </text>
                <text x={x + 12} y={442} fontSize="11" fill={secondary}>
                  {a.note}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        左：TSP 最优解 OPT（虚线凸包）与贪心近似解 APX（实线星形，更长）；右：近似比 APX ≤ α × OPT，α 越接近 1 越优。常见近似比：Vertex Cover 2-近似、TSP Christofides 1.5-近似、Set Cover ln(n)-近似。
      </figcaption>
    </figure>
  );
}
