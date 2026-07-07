/**
 * <OpcBookMap>：《C++ 性能优化指南》全书学习地图（optimized-cpp 入门章）。
 *
 * 五列布局对应全书五大板块：
 *   性能思维（紫，2 章）/ 字符串与算法（绿，2 章）/ 内存管理（橙，2 章）/ I/O与并发（红，2 章）/ 优化实践（青，2 章）
 * 每列顶部彩色标题 pill，每个章节是一张圆角小卡片，左缘一颗板块色小圆点。
 * 卡片间箭头串成「测量→优化→验证」的学习路径；底部总结栏点出全书主线。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 五列主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 五列几何：宽 124、列间距 12、左右各留 36。
const COL_W = 124;
const COL_GAP = 12;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// 卡片几何：高 32、垂直间距 10。
const CARD_H = 32;
const CARD_GAP = 10;
const CARD_ROW = CARD_H + CARD_GAP;
const CARDS_TOP_Y = 168;

type Column = {
  id: string;
  name: string;
  color: string;
  chapters: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "mindset",
    name: "性能思维",
    color: "var(--accent)",
    chapters: ["1. 学习路线图", "2. 优化思维"],
  },
  {
    id: "algo",
    name: "字符串与算法",
    color: "var(--success)",
    chapters: ["3. 字符串优化", "4. 算法选择"],
  },
  {
    id: "memory",
    name: "内存管理",
    color: "var(--warning)",
    chapters: ["5. 动态分配", "6. 智能指针"],
  },
  {
    id: "io",
    name: "I/O与并发",
    color: "var(--danger)",
    chapters: ["7. I/O 优化", "8. 并发优化"],
  },
  {
    id: "practice",
    name: "优化实践",
    color: "var(--accent)",
    chapters: ["9. 性能分析", "10. 总复习"],
  },
];

export function OpcBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 性能优化指南全书学习地图。五列从左到右对应五大板块：性能思维（紫色，2 章：学习路线图、优化思维）、字符串与算法（绿色，2 章：字符串优化、算法选择）、内存管理（橙色，2 章：动态分配、智能指针）、I/O与并发（红色，2 章：I/O 优化、并发优化）、优化实践（青色，2 章：性能分析、总复习）。卡片间箭头表示测量到验证的学习路径。底部总结：先测量再优化，从字符串到并发逐层榨取性能。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 性能优化指南 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从性能思维 → 字符串与算法 → 内存 → I/O与并发 → 优化实践，五段递进
          </text>

          {/* ===== 顶部路径箭头条 ===== */}
          <rect x={COL_MARGIN} y="76" width={VIEW_W - COL_MARGIN * 2} height="32" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="97" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">测量 → 分析 → 优化 → 验证</tspan>
          </text>

          {/* ===== 五列 ===== */}
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                {/* 列头彩色 pill */}
                <rect x={x} y="124" width={COL_W} height="32" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={x + COL_W / 2} y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill={col.color}>{col.name}</text>

                {/* 章节卡片 */}
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect x={x} y={cy} width={COL_W} height={CARD_H} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                      <circle cx={x + 12} cy={cy + CARD_H / 2} r="3" fill={col.color} />
                      <text x={x + COL_W / 2} y={cy + CARD_H / 2 + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{name}</text>
                      {pi < col.chapters.length - 1 && (
                        <line x1={x + COL_W / 2} y1={cy + CARD_H} x2={x + COL_W / 2} y2={cy + CARD_ROW - 2} stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.6" />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y="380" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="403" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书 10 章 · 五段递进
          </text>
          <text x={VIEW_W / 2} y="422" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先建立「测量优先」的性能观，再从字符串、算法、内存到 I/O 与并发逐层榨取速度
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分五大板块：性能思维建立「测量—分析—优化—验证」的方法论，字符串与算法从高频操作要速度，内存管理减少分配开销，I/O与并发榨取硬件红利，优化实践用工具链量化与防回归。
      </figcaption>
    </figure>
  );
}
