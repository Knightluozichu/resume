/**
 * <MglCombinatoricsDiagram>：组合计数核心概念图解（mgl-combinatorics 章）。
 *
 * 左侧：排列 vs 组合的对比示意。
 * 右侧：帕斯卡三角形 + 容斥原理图解。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function MglCombinatoricsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="组合计数图解。左侧排列 vs 组合：从 ABCDE 中选 3 个，排列 P(5,3)=60（顺序重要），组合 C(5,3)=10（顺序不重要）。右上帕斯卡三角形前 5 行，标注递推关系 C(n,k)=C(n-1,k-1)+C(n-1,k)。右下容斥原理：|A∪B|=|A|+|B|-|A∩B|。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>排列、组合与容斥</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>顺序重要→排列　顺序不重要→组合</text>

          <line x1="320" y1="74" x2="320" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：排列 vs 组合 ===== */}
          <text x="160" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>从 5 人选 3 人</text>

          {/* 排列 */}
          <rect x="48" y="108" width="256" height="68" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="128" fontSize="12" fontWeight="700" fill={accent}>排列 P(5,3) = 60</text>
          <text x="64" y="148" fontSize="11" fill={primary}>排成一排（顺序重要）</text>
          <text x="64" y="166" fontSize="11" fontFamily="monospace" fill={secondary}>ABC ≠ BAC → 5×4×3 = 60</text>

          {/* 组合 */}
          <rect x="48" y="188" width="256" height="68" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="208" fontSize="12" fontWeight="700" fill={success}>组合 C(5,3) = 10</text>
          <text x="64" y="228" fontSize="11" fill={primary}>组成一组（顺序不重要）</text>
          <text x="64" y="246" fontSize="11" fontFamily="monospace" fill={secondary}>{'{A,B,C}'} = {'{B,C,A}'} → 60/3! = 10</text>

          {/* 关系 */}
          <text x="176" y="280" textAnchor="middle" fontSize="11" fill={warning}>P(n,k) = C(n,k) × k!</text>

          {/* ===== 右上：帕斯卡三角形 ===== */}
          <text x="520" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>帕斯卡三角形</text>
          {[
            { row: [1], y: 112 },
            { row: [1, 1], y: 130 },
            { row: [1, 2, 1], y: 148 },
            { row: [1, 3, 3, 1], y: 166 },
            { row: [1, 4, 6, 4, 1], y: 184 },
          ].map((r, ri) => (
            r.row.map((val, ci) => (
              <g key={`${ri}-${ci}`}>
                <text x={520 + (ci - (r.row.length - 1) / 2) * 28} y={r.y} textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill={val === 6 ? accent : primary}>{val}</text>
              </g>
            ))
          ))}
          <text x="520" y="208" textAnchor="middle" fontSize="10" fill={secondary}>C(n,k) = C(n-1,k-1) + C(n-1,k)</text>

          {/* ===== 右下：容斥原理 ===== */}
          <rect x="340" y="224" width="332" height="120" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="506" y="244" textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>容斥原理</text>

          {/* 两个重叠圆 */}
          <circle cx="440" cy="296" r="36" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" />
          <circle cx="500" cy="296" r="36" fill={danger} fillOpacity="0.15" stroke={danger} strokeWidth="1.5" />
          <text x="420" y="300" textAnchor="middle" fontSize="11" fill={accent}>|A|</text>
          <text x="520" y="300" textAnchor="middle" fontSize="11" fill={danger}>|B|</text>
          <text x="470" y="300" textAnchor="middle" fontSize="10" fill={primary}>∩</text>

          <text x="506" y="338" textAnchor="middle" fontSize="12" fontFamily="monospace" fill={primary}>|A∪B| = |A| + |B| - |A∩B|</text>

          {/* 底部 */}
          <rect x="48" y="360" width="624" height="36" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="383" textAnchor="middle" fontSize="11" fill={secondary}>
            组合计数是算法复杂度分析的基础：C(n,2)→O(n²)　2ⁿ→子集枚举　n!→全排列
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排列顺序重要 P(n,k)=n!/(n-k)!，组合顺序不重要 C(n,k)=n!/(k!(n-k)!)。帕斯卡三角形展示二项式系数的递推关系。容斥原理交替加减交集计算并集大小。
      </figcaption>
    </figure>
  );
}
