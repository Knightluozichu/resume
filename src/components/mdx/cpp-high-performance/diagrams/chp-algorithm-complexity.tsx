/**
 * <ChpAlgorithmComplexityDiagram>：算法复杂度对比图（cpp-high-performance 算法与复杂度章）。
 *
 * 左侧：常见复杂度曲线 O(1)/O(log n)/O(n)/O(n log n)/O(n²) 在同一坐标系下的增长趋势，
 *   横轴 n（数据规模），纵轴操作数，曲线随 n 增大分叉。
 * 右侧：复杂度对照表——每行一条复杂度 + 典型算法 + n=1e6 时操作量级 + 工程取舍。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 曲线+对照表 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 左侧坐标系几何
const CHART_LEFT = 56;
const CHART_TOP = 100;
const CHART_W = 280;
const CHART_H = 220;
const CHART_BOTTOM = CHART_TOP + CHART_H;
const CHART_RIGHT = CHART_LEFT + CHART_W;

type Curve = {
  id: string;
  label: string;
  color: string;
  // 归一化函数：输入 t∈[0,1]（对应 n 从 0 到 N），返回 y∈[0,1]（占 CHART_H 比例，1=顶部）
  fn: (t: number) => number;
};

const N_MAX_LABEL = "n →";
// 把操作数映射到 0..1（顶部=1），超过 1 截断
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const CURVES: readonly Curve[] = [
  { id: "1", label: "O(1)", color: "var(--success)", fn: () => 0.08 },
  { id: "logn", label: "O(log n)", color: "var(--accent)", fn: (t) => clamp01(0.08 + 0.55 * Math.log10(1 + 9 * t) / 1) },
  { id: "n", label: "O(n)", color: "var(--warning)", fn: (t) => clamp01(0.08 + 0.62 * t) },
  { id: "nlogn", label: "O(n log n)", color: "var(--danger)", fn: (t) => clamp01(0.08 + 0.78 * t * Math.log10(1 + 9 * t)) },
  { id: "n2", label: "O(n²)", color: "var(--danger)", fn: (t) => clamp01(0.08 + 0.9 * t * t) },
];

type Row = { c: string; color: string; algo: string; ops: string };
const ROWS: readonly Row[] = [
  { c: "O(1)", color: "var(--success)", algo: "哈希查表、数组下标", ops: "1" },
  { c: "O(log n)", color: "var(--accent)", algo: "二分查找、平衡树", ops: "20" },
  { c: "O(n)", color: "var(--warning)", algo: "线性扫描", ops: "1e6" },
  { c: "O(n log n)", color: "var(--danger)", algo: "排序、归并", ops: "2e7" },
  { c: "O(n²)", color: "var(--danger)", algo: "冒泡、选择排序", ops: "1e12" },
];

export function ChpAlgorithmComplexityDiagram() {
  // 生成曲线 path
  const pathFor = (fn: (t: number) => number) => {
    const steps = 40;
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = CHART_LEFT + t * CHART_W;
      const py = CHART_BOTTOM - fn(t) * CHART_H;
      pts.push(`${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="算法复杂度对比。左侧曲线图横轴 n 数据规模纵轴操作数：O(1) 平直最低，O(log n) 缓慢上升，O(n) 线性，O(n log n) 略快于线性，O(n²) 急剧上升。右侧对照表：O(1) 哈希查表数组下标 n=1e6 时 1 次；O(log n) 二分查找平衡树 20 次；O(n) 线性扫描 1e6 次；O(n log n) 排序归并 2e7 次；O(n²) 冒泡选择排序 1e12 次。结论：数据量稍大，复杂度差异就是数量级差异。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            算法复杂度 · 增长趋势对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            n 稍大，复杂度差异就是数量级差异——先选对算法，再谈常数优化
          </text>

          {/* ===== 左侧坐标系 ===== */}
          <text x={CHART_LEFT + CHART_W / 2} y={CHART_TOP - 12} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">操作数 vs 数据规模 n</text>
          {/* 轴 */}
          <line x1={CHART_LEFT} y1={CHART_BOTTOM} x2={CHART_RIGHT + 8} y2={CHART_BOTTOM} stroke="var(--border)" strokeWidth="1.2" />
          <line x1={CHART_LEFT} y1={CHART_TOP - 8} x2={CHART_LEFT} y2={CHART_BOTTOM} stroke="var(--border)" strokeWidth="1.2" />
          <text x={CHART_RIGHT + 4} y={CHART_BOTTOM + 14} fontSize="11" fill="var(--text-secondary)">{N_MAX_LABEL}</text>
          <text x={CHART_LEFT - 8} y={CHART_TOP - 2} textAnchor="end" fontSize="11" fill="var(--text-secondary)">ops</text>
          {/* 网格虚线 */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1={CHART_LEFT} y1={CHART_BOTTOM - g * CHART_H} x2={CHART_RIGHT} y2={CHART_BOTTOM - g * CHART_H} stroke="var(--border)" strokeWidth="0.6" strokeDasharray="3 3" strokeOpacity="0.6" />
          ))}
          {/* 曲线 */}
          {CURVES.map((c) => (
            <g key={c.id}>
              <path d={pathFor(c.fn)} fill="none" stroke={c.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x={CHART_RIGHT - 4} y={CHART_BOTTOM - c.fn(1) * CHART_H - 6} textAnchor="end" fontSize="11" fontWeight="700" fill={c.color}>{c.label}</text>
            </g>
          ))}

          {/* ===== 右侧对照表 ===== */}
          <g>
            <text x="400" y={CHART_TOP - 12} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">复杂度 · 算法 · n=1e6 操作量</text>
            <rect x="372" y={CHART_TOP} width="308" height={CHART_H} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
            {/* 表头 */}
            <text x="384" y={CHART_TOP + 22} fontSize="11" fontWeight="700" fill="var(--text-secondary)">复杂度</text>
            <text x="470" y={CHART_TOP + 22} fontSize="11" fontWeight="700" fill="var(--text-secondary)">典型算法</text>
            <text x="620" y={CHART_TOP + 22} fontSize="11" fontWeight="700" fill="var(--text-secondary)">操作量</text>
            <line x1="384" y1={CHART_TOP + 30} x2="668" y2={CHART_TOP + 30} stroke="var(--border)" strokeWidth="1" />
            {ROWS.map((r, i) => {
              const ry = CHART_TOP + 50 + i * 32;
              return (
                <g key={r.c}>
                  <text x="384" y={ry} fontSize="12" fontWeight="700" fill={r.color}>{r.c}</text>
                  <text x="470" y={ry} fontSize="11" fill="var(--text-primary)">{r.algo}</text>
                  <text x="620" y={ry} fontSize="11" fill="var(--text-primary)">{r.ops}</text>
                </g>
              );
            })}
          </g>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            先把 O(n²) 换成 O(n log n)，再谈缓存与常量——算法层一个数量级胜过微优化百倍
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        五种常见复杂度随 n 增长分叉：O(1) 平直、O(log n) 极缓、O(n) 线性、O(n log n) 略快于线性、O(n²) 急剧上升。n=100 万时，O(n²) 要做万亿次操作而 O(log n) 仅约 20 次。先选对算法（换排序、换数据结构、换思路），再做缓存与常量优化。
      </figcaption>
    </figure>
  );
}
