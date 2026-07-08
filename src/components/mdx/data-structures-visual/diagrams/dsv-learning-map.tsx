/**
 * <DsvBookMap>：《大话数据结构》全书学习地图（data-structures-visual 入门章）。
 *
 * 四列布局对应全书四大板块：
 *   入门（紫，2 章）/ 线性结构（绿，2 章）/ 树结构（橙，3 章）/ 算法应用（红，3 章）
 * 每列顶部彩色标题 pill，每个章节是一张圆角小卡片，左缘一颗板块色小圆点。
 * 底部总结栏点出全书主线。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md。
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

type Column = {
  id: string;
  name: string;
  color: string;
  chapters: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "intro",
    name: "入门",
    color: "var(--accent)",
    chapters: ["0. 学习地图", "1. 算法复杂度"],
  },
  {
    id: "linear",
    name: "线性结构",
    color: "var(--success)",
    chapters: ["2. 数组与链表", "3. 栈与队列"],
  },
  {
    id: "trees",
    name: "树结构",
    color: "var(--warning)",
    chapters: ["4. 树与二叉搜索树", "5. 堆", "6. 图"],
  },
  {
    id: "algorithms",
    name: "算法应用",
    color: "var(--danger)",
    chapters: ["7. 排序算法", "8. 查找算法", "9. 总复习"],
  },
];

export function DsvBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="大话数据结构全书学习地图。四列从左到右对应四大板块：入门（紫色，2 章：学习地图、算法复杂度）、线性结构（绿色，2 章：数组与链表、栈与队列）、树结构（橙色，3 章：树与二叉搜索树、堆、图）、算法应用（红色，3 章：排序算法、查找算法、总复习）。底部总结：从线性到树到图到算法，四段递进覆盖数据结构全貌。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            大话数据结构 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从线性 → 树 → 图 → 算法，四段递进覆盖数据结构全貌
          </text>

          {/* ===== 顶部路径箭头条 ===== */}
          <rect x={COL_MARGIN} y="76" width={VIEW_W - COL_MARGIN * 2} height="32" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="97" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">数据怎么存 → 结构怎么变 → 数据怎么处理</tspan>
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

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y="384" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="407" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书 10 章 · 四段递进
          </text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先掌握复杂度分析工具，再用线性结构打基础，进阶树与图，最后用排序与查找实战
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分四大板块：入门讲清概念与复杂度，线性结构是基础存储方式，树结构解决层次与网络关系，算法应用是实战场景。四段层层递进，从「怎么存」到「怎么处理」。
      </figcaption>
    </figure>
  );
}
