/**
 * <Al4StringsDiagram>：字符串算法图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Al4StringsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="字符串算法图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            字符串算法
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            字符串排序、查找与正则——文本处理的核心算法
          </text>

          <rect x="60" y="80" width="600" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <text x={VIEW_W / 2} y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">
            字符串查找
          </text>

          <text x={VIEW_W / 2} y="170" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            字符串查找：核心概念
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
            关键洞察：想象你要在一本书里找algorithm。最笨的方法是从第一页逐个比对（...
          </text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            复杂度：视具体实现而定
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        字符串排序、查找与正则——文本处理的核心算法
      </figcaption>
    </figure>
  );
}
