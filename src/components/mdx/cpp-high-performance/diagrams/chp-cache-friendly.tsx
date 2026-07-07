/**
 * <ChpCacheFriendlyDiagram>：缓存友好编程模式（cpp-high-performance CPU 缓存/数据结构章）。
 *
 * 左右对比两种数据组织：
 *   左 AoS（Array of Structs）：每对象一块，遍历时字段混排，无用字段也进缓存行。
 *   右 SoA（Struct of Arrays）：每字段一数组，只遍历目标字段，缓存行全是有用数据。
 * 中部用缓存行格子示意「热字段」占比差异，底部给出命中数与吞吐对比。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / AoS vs SoA 主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 300;
const COL_GAP = 24;
const COL_LEFT_L = 36;
const COL_LEFT_R = COL_LEFT_L + COL_W + COL_GAP;
const COL_TOP = 100;

export function ChpCacheFriendlyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="缓存友好数据布局对比。左侧 AoS（Array of Structs，结构体数组）：每个对象含 x/y/z/active 等字段紧挨存放，遍历 active 时无用字段也进缓存行，命中率低。右侧 SoA（Struct of Arrays，数组结构体）：每个字段独立成数组，只遍历 active 数组，缓存行全是目标数据，命中率高。结论：只遍历部分字段时，SoA 让缓存行全是有用数据，吞吐显著提升。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            缓存友好 · AoS vs SoA 数据布局
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            只遍历部分字段时，把热字段拆成独立数组，缓存行全是有用数据
          </text>

          {/* ===== 左：AoS ===== */}
          <g>
            <rect x={COL_LEFT_L} y={COL_TOP} width={COL_W} height="28" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
            <text x={COL_LEFT_L + COL_W / 2} y={COL_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">AoS 结构体数组</text>

            <rect x={COL_LEFT_L} y={COL_TOP + 40} width={COL_W} height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
            <text x={COL_LEFT_L + 12} y={COL_TOP + 60} fontSize="11" fill="var(--text-secondary)">struct {`{ x, y, z, active }`} objs[N];</text>
            {/* 三个对象，每对象 4 字段，active 用红表示热字段 */}
            {[0, 1, 2].map((k) => (
              <g key={k}>
                <text x={COL_LEFT_L + 12} y={COL_TOP + 84 + k * 24} fontSize="10" fill="var(--text-secondary)">obj{k}:</text>
                <rect x={COL_LEFT_L + 52 + k * 0} y={COL_TOP + 74 + k * 24} width="44" height="18" rx="3" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
                <text x={COL_LEFT_L + 74} y={COL_TOP + 87 + k * 24} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">x</text>
                <rect x={COL_LEFT_L + 98} y={COL_TOP + 74 + k * 24} width="44" height="18" rx="3" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
                <text x={COL_LEFT_L + 120} y={COL_TOP + 87 + k * 24} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">y</text>
                <rect x={COL_LEFT_L + 144} y={COL_TOP + 74 + k * 24} width="44" height="18" rx="3" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
                <text x={COL_LEFT_L + 166} y={COL_TOP + 87 + k * 24} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">z</text>
                <rect x={COL_LEFT_L + 190} y={COL_TOP + 74 + k * 24} width="44" height="18" rx="3" fill="var(--danger)" fillOpacity="0.5" stroke="var(--danger)" strokeWidth="1.2" />
                <text x={COL_LEFT_L + 212} y={COL_TOP + 87 + k * 24} textAnchor="middle" fontSize="9" fill="var(--text-primary)">act</text>
              </g>
            ))}
            <text x={COL_LEFT_L + 12} y={COL_TOP + 150} fontSize="11" fill="var(--text-secondary)">遍历 active：x/y/z 也被加载</text>

            {/* 命中率条 */}
            <rect x={COL_LEFT_L} y={COL_TOP + 172} width={COL_W} height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
            <text x={COL_LEFT_L + 12} y={COL_TOP + 192} fontSize="11" fill="var(--text-secondary)"><tspan fontWeight="700" fill="var(--text-primary)">缓存行有效载荷：</tspan></text>
            <rect x={COL_LEFT_L + 12} y={COL_TOP + 200} width={COL_W - 24} height="14" rx="3" fill="var(--bg)" stroke="var(--border)" strokeWidth="0.8" />
            <rect x={COL_LEFT_L + 12} y={COL_TOP + 200} width={(COL_W - 24) * 0.25} height="14" rx="3" fill="var(--danger)" fillOpacity="0.6" />
            <text x={COL_LEFT_L + COL_W - 16} y={COL_TOP + 211} textAnchor="end" fontSize="10" fill="var(--text-secondary)">约 25%</text>
          </g>

          {/* ===== 右：SoA ===== */}
          <g>
            <rect x={COL_LEFT_R} y={COL_TOP} width={COL_W} height="28" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
            <text x={COL_LEFT_R + COL_W / 2} y={COL_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">SoA 数组结构体</text>

            <rect x={COL_LEFT_R} y={COL_TOP + 40} width={COL_W} height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
            <text x={COL_LEFT_R + 12} y={COL_TOP + 60} fontSize="11" fill="var(--text-secondary)">struct {`{ xs[N], ys[N], zs[N], actives[N] };`}</text>
            {/* 四个字段数组，只有 actives 是热字段 */}
            {["xs", "ys", "zs"].map((f, k) => (
              <g key={f}>
                <text x={COL_LEFT_R + 12} y={COL_TOP + 84 + k * 24} fontSize="10" fill="var(--text-secondary)">{f}:</text>
                {[0, 1, 2].map((j) => (
                  <rect key={j} x={COL_LEFT_R + 52 + j * 56} y={COL_TOP + 74 + k * 24} width="44" height="18" rx="3" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
                ))}
              </g>
            ))}
            <g>
              <text x={COL_LEFT_R + 12} y={COL_TOP + 156} fontSize="10" fontWeight="700" fill="var(--danger)">actives:</text>
              {[0, 1, 2].map((j) => (
                <rect key={j} x={COL_LEFT_R + 52 + j * 56} y={COL_TOP + 146} width="44" height="18" rx="3" fill="var(--danger)" fillOpacity="0.5" stroke="var(--danger)" strokeWidth="1.2" />
              ))}
            </g>
            <text x={COL_LEFT_R + 12} y={COL_TOP + 178} fontSize="11" fill="var(--text-secondary)">遍历 active：缓存行全是 active</text>

            {/* 命中率条 */}
            <rect x={COL_LEFT_R} y={COL_TOP + 196} width={COL_W} height="60" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
            <text x={COL_LEFT_R + 12} y={COL_TOP + 216} fontSize="11" fill="var(--text-secondary)"><tspan fontWeight="700" fill="var(--text-primary)">缓存行有效载荷：</tspan></text>
            <rect x={COL_LEFT_R + 12} y={COL_TOP + 224} width={COL_W - 24} height="14" rx="3" fill="var(--bg)" stroke="var(--border)" strokeWidth="0.8" />
            <rect x={COL_LEFT_R + 12} y={COL_TOP + 224} width={(COL_W - 24) * 1} height="14" rx="3" fill="var(--success)" fillOpacity="0.6" />
            <text x={COL_LEFT_R + COL_W - 16} y={COL_TOP + 235} textAnchor="end" fontSize="10" fill="var(--text-secondary)">约 100%</text>
          </g>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            按访问模式组织数据：热字段集中存放，让每次访存都物尽其用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AoS 把一个对象的所有字段连续存放，遍历单字段时无用字段也占满缓存行；SoA 把同字段拆成独立数组，只遍历目标字段时缓存行全是有效数据。当只访问少数字段（如粒子系统的 active 标志），SoA 能让缓存有效载荷从 25% 提升到接近 100%，吞吐成倍增长。
      </figcaption>
    </figure>
  );
}
