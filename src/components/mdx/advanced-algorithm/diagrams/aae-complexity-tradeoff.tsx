/**
 * <AaeComplexityTradeoffDiagram>：复杂度分析与工程权衡图（advanced-algorithm 基础章）。
 *
 * 二维坐标图：X 轴 = 时间复杂度（O(1) → O(log n) → O(n) → O(n log n) → O(n²) → O(n³)），
 * Y 轴 = 空间复杂度（O(1) → O(log n) → O(n) → O(n²)）。
 * 在图上标注常见算法：
 *   - 二分查找 O(log n)/O(1)
 *   - 哈希表 O(1)/O(n)
 *   - 归并排序 O(n log n)/O(n)
 *   - 快速排序 O(n log n)/O(log n)
 *   - 线性查找 O(n)/O(1)
 *   - 矩阵乘法 O(n³)/O(n²)
 * 用虚线标注「工程权衡线」：实际工程中常在时间/空间之间做取舍。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 坐标轴范围
const AXIS_X0 = 100;
const AXIS_X1 = 660;
const AXIS_Y0 = 380; // 底部（空间小）
const AXIS_Y1 = 96; // 顶部（空间大）

// X 轴时间复杂度刻度位置
const X_TICKS: { label: string; x: number }[] = [
  { label: "O(1)", x: 150 },
  { label: "O(log n)", x: 250 },
  { label: "O(n)", x: 360 },
  { label: "O(n log n)", x: 460 },
  { label: "O(n²)", x: 560 },
  { label: "O(n³)", x: 640 },
];

// Y 轴空间复杂度刻度位置
const Y_TICKS: { label: string; y: number }[] = [
  { label: "O(1)", y: 360 },
  { label: "O(log n)", y: 290 },
  { label: "O(n)", y: 200 },
  { label: "O(n²)", y: 120 },
];

// 算法点
interface AlgoPoint {
  name: string;
  x: number;
  y: number;
  color: string;
  labelDX: number;
  labelDY: number;
}

const POINTS: readonly AlgoPoint[] = [
  { name: "哈希表", x: 150, y: 200, color: accent, labelDX: 8, labelDY: -10 },
  { name: "二分查找", x: 250, y: 360, color: success, labelDX: -8, labelDY: -12 },
  { name: "线性查找", x: 360, y: 360, color: secondary, labelDX: -8, labelDY: 18 },
  { name: "快速排序", x: 460, y: 290, color: warning, labelDX: 8, labelDY: -10 },
  { name: "归并排序", x: 460, y: 200, color: accent, labelDX: 8, labelDY: -10 },
  { name: "矩阵乘法", x: 640, y: 120, color: warning, labelDX: -8, labelDY: -12 },
];

export function AaeComplexityTradeoffDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="复杂度分析与工程权衡图。横轴为时间复杂度（从 O(1) 到 O(n³)），纵轴为空间复杂度（从 O(1) 到 O(n²)）。图上标注六个算法：哈希表 O(1)/O(n)、二分查找 O(log n)/O(1)、线性查找 O(n)/O(1)、快速排序 O(n log n)/O(log n)、归并排序 O(n log n)/O(n)、矩阵乘法 O(n³)/O(n²)。一条虚线表示工程权衡线——时间与空间之间的取舍。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            复杂度分析 · 时间 / 空间权衡
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            越靠左下越省，越靠右上越费——工程常在两者间取舍
          </text>

          {/* 网格线（横向） */}
          {Y_TICKS.map((t) => (
            <line key={`yg-${t.label}`} x1={AXIS_X0} y1={t.y} x2={AXIS_X1} y2={t.y} stroke={border} strokeWidth="1" strokeOpacity="0.5" />
          ))}
          {/* 网格线（纵向） */}
          {X_TICKS.map((t) => (
            <line key={`xg-${t.label}`} x1={t.x} y1={AXIS_Y1} x2={t.x} y2={AXIS_Y0} stroke={border} strokeWidth="1" strokeOpacity="0.5" />
          ))}

          {/* 坐标轴 */}
          <line x1={AXIS_X0} y1={AXIS_Y0} x2={AXIS_X1} y2={AXIS_Y0} stroke={secondary} strokeWidth="1.8" />
          <line x1={AXIS_X0} y1={AXIS_Y1} x2={AXIS_X0} y2={AXIS_Y0} stroke={secondary} strokeWidth="1.8" />

          {/* X 轴刻度标签 */}
          {X_TICKS.map((t) => (
            <text key={`xt-${t.label}`} x={t.x} y={AXIS_Y0 + 18} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">
              {t.label}
            </text>
          ))}
          {/* Y 轴刻度标签 */}
          {Y_TICKS.map((t) => (
            <text key={`yt-${t.label}`} x={AXIS_X0 - 10} y={t.y + 4} textAnchor="end" fontSize="11" fill={secondary} fontFamily="monospace">
              {t.label}
            </text>
          ))}

          {/* 轴标题 */}
          <text x={(AXIS_X0 + AXIS_X1) / 2} y={AXIS_Y0 + 40} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            时间复杂度 →
          </text>
          <text x={AXIS_X0 - 60} y={(AXIS_Y0 + AXIS_Y1) / 2} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} transform={`rotate(-90 ${AXIS_X0 - 60} ${(AXIS_Y0 + AXIS_Y1) / 2})`}>
            空间复杂度 ↑
          </text>

          {/* 工程权衡线（虚线对角） */}
          <line x1={150} y1={120} x2={640} y2={360} stroke={accent} strokeWidth="1.6" strokeDasharray="7 4" strokeOpacity="0.6" />
          <text x={420} y={250} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} transform="rotate(24 420 250)">
            工程权衡线
          </text>

          {/* 算法点 */}
          {POINTS.map((p) => (
            <g key={p.name}>
              <circle cx={p.x} cy={p.y} r="6" fill={p.color} stroke="var(--bg)" strokeWidth="1.5" />
              <text x={p.x + p.labelDX} y={p.y + p.labelDY} fontSize="11.5" fontWeight="700" fill={primary}>
                {p.name}
              </text>
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={432} x2={VIEW_W - 32} y2={432} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={456} textAnchor="middle" fontSize="12" fill={secondary}>
            左下省资源，右上换速度——没有免费午餐，只有权衡
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        复杂度权衡图：横轴时间复杂度、纵轴空间复杂度。哈希表用 O(n) 空间换 O(1) 时间，二分查找两者皆省，矩阵乘法两者皆费；虚线为工程权衡线，提示时间与空间的取舍边界。
      </figcaption>
    </figure>
  );
}
