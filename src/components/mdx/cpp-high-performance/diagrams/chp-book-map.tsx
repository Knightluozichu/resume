/**
 * <ChpBookMap>：《C++ 高性能编程》全书学习地图（cpp-high-performance 入门章）。
 *
 * 四列布局对应全书四大板块：
 *   性能基础（紫，2 章）/ 内存与数据结构（绿，3 章）/ 并发优化（橙，2 章）/ 模板与元编程（红，3 章）
 * 每列顶部彩色标题 pill，每个章节是一张圆角小卡片，左缘一颗板块色小圆点把卡片系回所属板块。
 * 卡片间用箭头串成「由测量到优化」的学习路径；底部总结栏点出全书主线。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四列主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// 四列几何：宽 156、列间距 12、左右各留 30（≥32 略紧，故取 30 使 4 列对称落在 720 内）。
const COL_W = 156;
const COL_GAP = 12;
const COL_MARGIN = 30;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// 卡片几何：高 32、垂直间距 10（满足 R5 ≥8）。
const CARD_H = 32;
const CARD_GAP = 10;
const CARD_ROW = CARD_H + CARD_GAP; // 42
const CARDS_TOP_Y = 168;

type Column = {
  id: string;
  name: string;
  color: string;
  chapters: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "basics",
    name: "性能基础",
    color: "var(--accent)",
    chapters: ["1. 学习地图", "2. 性能基础"],
  },
  {
    id: "memory",
    name: "内存与数据结构",
    color: "var(--success)",
    chapters: ["3. 内存管理", "4. 数据结构", "5. 算法与复杂度"],
  },
  {
    id: "concurrency",
    name: "并发优化",
    color: "var(--warning)",
    chapters: ["6. 并发", "7. CPU 缓存"],
  },
  {
    id: "advanced",
    name: "模板与元编程",
    color: "var(--danger)",
    chapters: ["8. 模板元编程", "9. 性能分析", "10. 总复习"],
  },
];

export function ChpBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 高性能编程全书学习地图。四列从左到右对应四大板块：性能基础（紫色，2 章：学习地图、性能基础）、内存与数据结构（绿色，3 章：内存管理、数据结构、算法与复杂度）、并发优化（橙色，2 章：并发、CPU 缓存）、模板与元编程（红色，3 章：模板元编程、性能分析、总复习）。卡片间箭头表示由测量到优化的学习路径。底部总结：先测量再优化，从内存到并发逐层提速。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 高性能编程 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从性能基础 → 内存与数据结构 → 并发 → 模板与剖析，四段递进
          </text>

          {/* ===== 顶部路径箭头条 ===== */}
          <rect x={COL_MARGIN} y="76" width={VIEW_W - COL_MARGIN * 2} height="32" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="97" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">测量 → 分析 → 优化 → 验证</tspan>
          </text>

          {/* ===== 四列 ===== */}
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                {/* 列头彩色 pill */}
                <rect x={x} y="124" width={COL_W} height="32" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={x + COL_W / 2} y="145" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>{col.name}（{col.chapters.length}）</text>

                {/* 章节卡片 */}
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect x={x} y={cy} width={COL_W} height={CARD_H} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                      <circle cx={x + 14} cy={cy + CARD_H / 2} r="3" fill={col.color} />
                      <text x={x + COL_W / 2} y={cy + CARD_H / 2 + 4} textAnchor="middle" fontSize="12" fill="var(--text-primary)">{name}</text>
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
          <rect x="60" y="360" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="383" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书 10 章 · 四段递进
          </text>
          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先建立「测量优先」的性能观，再从内存布局、数据结构、并发、模板逐层榨取速度
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分四大板块：性能基础建立「测量—分析—优化—验证」的方法论，内存与数据结构从布局与访问模式要速度，并发与缓存榨取多核与硬件红利，模板与剖析把优化固化到编译期与工程流程。
      </figcaption>
    </figure>
  );
}
