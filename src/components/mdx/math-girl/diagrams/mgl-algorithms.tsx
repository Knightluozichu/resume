/**
 * <MglAlgorithmsDiagram>：算法设计三大范式对比图（mgl-algorithms 章）。
 *
 * 三列对比：分治、贪心、动态规划。
 * 底部总结栏列出选择依据。
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

export function MglAlgorithmsDiagram() {
  const cols = [
    { name: "分治", color: accent, core: "分解→递归→合并", condition: "子问题独立", example: "归并排序\n快速排序", complexity: "O(n log n)" },
    { name: "贪心", color: success, core: "每步选当前最优", condition: "贪心选择性质", example: "Dijkstra\nHuffman编码", complexity: "O(n log n)" },
    { name: "动态规划", color: warning, core: "记忆化避免重复", condition: "最优子结构\n+重叠子问题", example: "背包问题\nLCS", complexity: "O(n×W)" },
  ];
  const colW = 200;
  const gap = 16;
  const startX = 36;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="算法设计三大范式对比。分治：分解→递归→合并，子问题独立不重叠，如归并排序O(n log n)。贪心：每步选当前最优，需贪心选择性质，如Dijkstra。动态规划：记忆化避免重复计算，需最优子结构+重叠子问题，如背包问题O(n×W)。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>算法设计三大范式</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>分治（独立子问题）　贪心（局部最优=全局最优）　DP（重叠子问题）</text>

          {cols.map((c, i) => {
            const x = startX + i * (colW + gap);
            return (
              <g key={c.name}>
                {/* 列头 */}
                <rect x={x} y="80" width={colW} height="36" rx="8" fill={c.color} fillOpacity="0.12" stroke={c.color} strokeWidth="1.2" />
                <text x={x + colW / 2} y="103" textAnchor="middle" fontSize="14" fontWeight="700" fill={c.color}>{c.name}</text>

                {/* 核心思想 */}
                <rect x={x} y="128" width={colW} height="44" rx="6" fill="var(--bg)" stroke={border} strokeWidth="0.5" />
                <text x={x + colW / 2} y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>核心思想</text>
                <text x={x + colW / 2} y="164" textAnchor="middle" fontSize="11" fill={primary}>{c.core}</text>

                {/* 适用条件 */}
                <rect x={x} y="184" width={colW} height="56" rx="6" fill="var(--bg)" stroke={border} strokeWidth="0.5" />
                <text x={x + colW / 2} y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>适用条件</text>
                {c.condition.split("\n").map((line, li) => (
                  <text key={li} x={x + colW / 2} y={222 + li * 14} textAnchor="middle" fontSize="11" fill={primary}>{line}</text>
                ))}

                {/* 典型案例 */}
                <rect x={x} y="252" width={colW} height="56" rx="6" fill="var(--bg)" stroke={border} strokeWidth="0.5" />
                <text x={x + colW / 2} y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>典型案例</text>
                {c.example.split("\n").map((line, li) => (
                  <text key={li} x={x + colW / 2} y={290 + li * 14} textAnchor="middle" fontSize="11" fill={primary}>{line}</text>
                ))}

                {/* 复杂度 */}
                <rect x={x} y="320" width={colW} height="36" rx="6" fill={c.color} fillOpacity="0.06" stroke={c.color} strokeWidth="0.8" strokeOpacity="0.4" />
                <text x={x + colW / 2} y="343" textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="600" fill={c.color}>{c.complexity}</text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <rect x="36" y="372" width={VIEW_W - 72} height="32" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="393" textAnchor="middle" fontSize="11" fill={secondary}>
            子问题独立→分治　局部最优=全局最优→贪心　子问题重叠→动态规划
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分治适合子问题独立的问题（归并排序），贪心需要贪心选择性质（Dijkstra），动态规划处理重叠子问题（背包、LCS）。选择范式取决于问题的数学结构。
      </figcaption>
    </figure>
  );
}
