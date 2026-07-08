/**
 * <DsaDisjointSetsDiagram>：并查集路径压缩与按秩合并图解（dsa-disjoint-sets 章）。
 *
 * 左侧：Union 操作——按秩合并，矮树挂高树。
 * 右侧：Find 操作——路径压缩，沿途节点直接指向根。
 * 底部：Kruskal MST 应用——排序边 + 并查集判环。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function DsaDisjointSetsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="并查集图解。左侧 Union 按秩合并：秩 0 的树 4 挂到秩 1 的树 1 下，合并后秩仍为 1。右侧 Find 路径压缩：查找节点 4 时沿途节点 4、3、2 全部直接指向根 1，扁平化树结构。底部 Kruskal MST：排序边后逐一加入，用并查集检测是否成环。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>并查集：按秩合并 + 路径压缩</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>两种优化使单次操作趋近 O(α(n)) ≈ O(1)</text>

          <line x1="360" y1="74" x2="360" y2="290" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：Union 按秩合并 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Union(x, y) 按秩合并</text>

          {/* 合并前：树 A（秩1）和树 B（秩0） */}
          <text x="80" y="114" fontSize="11" fontWeight="600" fill={secondary}>合并前</text>

          {/* 树 A：1 → 2, 3，秩 1 */}
          <circle cx="100" cy="132" r="13" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="100" y="136" textAnchor="middle" fontSize="11" fill={accent}>1</text>
          <circle cx="72" cy="168" r="11" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x="72" y="172" textAnchor="middle" fontSize="10" fill={accent}>2</text>
          <circle cx="128" cy="168" r="11" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x="128" y="172" textAnchor="middle" fontSize="10" fill={accent}>3</text>
          <line x1="94" y1="144" x2="76" y2="158" stroke={accent} strokeWidth="1" />
          <line x1="106" y1="144" x2="124" y2="158" stroke={accent} strokeWidth="1" />
          <text x="100" y="194" textAnchor="middle" fontSize="10" fill={secondary}>秩=1</text>

          {/* 树 B：4，秩 0 */}
          <circle cx="240" cy="150" r="11" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
          <text x="240" y="154" textAnchor="middle" fontSize="11" fill={warning}>4</text>
          <text x="240" y="194" textAnchor="middle" fontSize="10" fill={secondary}>秩=0</text>

          {/* 箭头：合并 */}
          <text x="180" y="218" textAnchor="middle" fontSize="11" fill={primary}>矮树挂高树</text>
          <path d="M 180 228 L 180 240" stroke={primary} strokeWidth="1.2" markerEnd="url(#arrowDsu)" />

          {/* 合并后 */}
          <text x="180" y="260" fontSize="11" fontWeight="600" fill={secondary}>合并后（秩仍=1）</text>
          <circle cx="180" cy="276" r="13" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="180" y="280" textAnchor="middle" fontSize="11" fill={success}>1</text>
          <circle cx="140" cy="308" r="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x="140" y="311" textAnchor="middle" fontSize="9" fill={success}>2</text>
          <circle cx="180" cy="308" r="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x="180" y="311" textAnchor="middle" fontSize="9" fill={success}>3</text>
          <circle cx="220" cy="308" r="10" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1" />
          <text x="220" y="311" textAnchor="middle" fontSize="9" fill={warning}>4</text>
          <line x1="172" y1="286" x2="144" y2="300" stroke={success} strokeWidth="1" />
          <line x1="180" y1="289" x2="180" y2="298" stroke={success} strokeWidth="1" />
          <line x1="188" y1="286" x2="216" y2="300" stroke={warning} strokeWidth="1" strokeDasharray="3 2" />

          {/* ===== 右侧：Find 路径压缩 ===== */}
          <text x="540" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Find(x) 路径压缩</text>

          <text x="540" y="114" textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>压缩前（深度3的链）</text>

          {/* 链：4 → 3 → 2 → 1 */}
          <circle cx="540" cy="132" r="13" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x="540" y="136" textAnchor="middle" fontSize="11" fill={accent}>1</text>
          <circle cx="540" cy="164" r="11" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x="540" y="168" textAnchor="middle" fontSize="10" fill={accent}>2</text>
          <circle cx="540" cy="192" r="11" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x="540" y="196" textAnchor="middle" fontSize="10" fill={accent}>3</text>
          <circle cx="540" cy="220" r="11" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
          <text x="540" y="224" textAnchor="middle" fontSize="10" fill={warning}>4</text>
          <line x1="540" y1="145" x2="540" y2="153" stroke={border} strokeWidth="1" />
          <line x1="540" y1="175" x2="540" y2="181" stroke={border} strokeWidth="1" />
          <line x1="540" y1="203" x2="540" y2="209" stroke={border} strokeWidth="1" />
          <text x="570" y="180" fontSize="10" fill={warning}>Find(4)</text>

          {/* 箭头 */}
          <path d="M 540 238 L 540 250" stroke={primary} strokeWidth="1.2" markerEnd="url(#arrowDsu)" />
          <text x="540" y="262" textAnchor="middle" fontSize="11" fill={primary}>沿途节点指向根</text>

          {/* 压缩后 */}
          <text x="540" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>压缩后（全部指向根）</text>

          <circle cx="540" cy="300" r="13" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="540" y="304" textAnchor="middle" fontSize="11" fill={success}>1</text>
          <circle cx="480" cy="336" r="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x="480" y="339" textAnchor="middle" fontSize="9" fill={success}>2</text>
          <circle cx="520" cy="336" r="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x="520" y="339" textAnchor="middle" fontSize="9" fill={success}>3</text>
          <circle cx="560" cy="336" r="10" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1" />
          <text x="560" y="339" textAnchor="middle" fontSize="9" fill={warning}>4</text>
          <line x1="530" y1="310" x2="486" y2="326" stroke={success} strokeWidth="1" />
          <line x1="536" y1="312" x2="520" y2="326" stroke={success} strokeWidth="1" />
          <line x1="546" y1="312" x2="556" y2="326" stroke={warning} strokeWidth="1" strokeDasharray="3 2" />

          {/* ===== 底部：Kruskal MST ===== */}
          <rect x="40" y="358" width={VIEW_W - 80} height="80" rx="10" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="382" textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>Kruskal 最小生成树应用</text>
          <text x="70" y="406" fontSize="12" fill={primary}>1. 所有边按权值排序</text>
          <text x="260" y="406" fontSize="12" fill={primary}>2. 逐条尝试加入</text>
          <text x="420" y="406" fontSize="12" fill={primary}>3. Find 判两端是否同集合</text>
          <text x="70" y="426" fontSize="11" fill={success}>同集合 = 成环，跳过</text>
          <text x="260" y="426" fontSize="11" fill={accent}>不同集合 = Union 合并，加入 MST</text>

          <defs>
            <marker id="arrowDsu" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={primary} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        按秩合并保证树高增长缓慢，路径压缩在 Find 时把沿途节点直接挂到根。两者结合使并查集单次操作均摊 O(α(n))，α 是反 Ackermann 函数，对任何实际数据 ≤ 4。
      </figcaption>
    </figure>
  );
}
