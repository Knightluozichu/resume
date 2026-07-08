/**
 * <DsaBookMap>：《数据结构与算法分析 C++描述》全书学习地图（dsa-cpp 入门章）。
 *
 * 四列布局对应全书四大板块：
 *   基础（紫，2 章）/ 数据结构（绿，2 章）/ 散列与图（橙，3 章）/ 算法设计（红，3 章）
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 156;
const COL_GAP = 12;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const CARD_H = 32;
const CARD_GAP = 10;
const CARD_ROW = CARD_H + CARD_GAP;
const CARDS_TOP_Y = 168;

type Column = { id: string; name: string; color: string; chapters: string[] };

const COLUMNS: readonly Column[] = [
  { id: "fundamentals", name: "基础", color: "var(--accent)", chapters: ["0. 学习地图", "1. 复杂度分析"] },
  { id: "data-structures", name: "数据结构", color: "var(--success)", chapters: ["2. 线性表", "3. 树结构"] },
  { id: "hash-graph", name: "散列与图", color: "var(--warning)", chapters: ["4. 散列表", "5. 并查集", "6. 图算法"] },
  { id: "algorithms", name: "算法设计", color: "var(--danger)", chapters: ["7. 排序", "8. 动态规划", "9. 总复习"] },
];

export function DsaBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数据结构与算法分析 C++描述全书学习地图。四列从左到右：基础（紫色，2 章：学习地图、复杂度分析）、数据结构（绿色，2 章：线性表、树结构）、散列与图（橙色，3 章：散列表、并查集、图算法）、算法设计（红色，3 章：排序、动态规划、总复习）。底部总结：C++实现与算法分析并重，从复杂度分析到动态规划。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">数据结构与算法分析 C++ · 全书学习地图</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">C++ 实现与算法分析并重　从复杂度到动态规划</text>

          <rect x={COL_MARGIN} y="76" width={VIEW_W - COL_MARGIN * 2} height="32" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="97" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">分析工具 → 基本结构 → 高级结构 → 算法设计</tspan>
          </text>

          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                <rect x={x} y="124" width={COL_W} height="32" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={x + COL_W / 2} y="145" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>{col.name}（{col.chapters.length}）</text>
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect x={x} y={cy} width={COL_W} height={CARD_H} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                      <circle cx={x + 12} cy={cy + CARD_H / 2} r="3" fill={col.color} />
                      <text x={x + COL_W / 2} y={cy + CARD_H / 2 + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{name}</text>
                      {pi < col.chapters.length - 1 && (
                        <line x1={x + COL_W / 2} y1={cy + CARD_H} x2={x + COL_W / 2} y2={cy + CARD_ROW - 2} stroke={col.color} strokeWidth="1.4" strokeOpacity="0.6" />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          <rect x="60" y="384" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="407" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">全书 10 章 · 四段递进</text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先用复杂度分析建立评估工具，再实现基本与高级结构，最后用排序和DP掌握算法设计范式</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分四大板块：基础讲复杂度分析与均摊分析，数据结构实现线性表与树，散列与图覆盖散列表/并查集/图算法，算法设计讲排序与动态规划。C++ 实现与分析并重。
      </figcaption>
    </figure>
  );
}
