/**
 * <Al4FundamentalsDiagram>：算法基础图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Al4FundamentalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="算法基础图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            算法基础
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            大O表示法、基础数据结构与Union-Find——算法分析的起点
          </text>

          <rect x="60" y="80" width="600" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <text x={VIEW_W / 2} y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">
            大O表示法
          </text>

          <text x={VIEW_W / 2} y="170" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            大O表示法：核心概念
          </text>
          <text x={VIEW_W / 2} y="195" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            通过图解可视化关键原理与执行流程
          </text>

          <rect x="160" y="230" width="180" height="40" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="250" y="255" textAnchor="middle" fontSize="12" fill="var(--success)">输入</text>

          <text x="380" y="255" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="400" y="230" width="180" height="40" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="490" y="255" textAnchor="middle" fontSize="12" fill="var(--warning)">处理/输出</text>

          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            关键洞察：想象你要比较两辆车的速度。你不能只看快不快，要看多远跑多快（距离=输入...
          </text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            复杂度：O(n log n)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        大O表示法、基础数据结构与Union-Find——算法分析的起点
      </figcaption>
    </figure>
  );
}
