/**
 * <PyaLearningMapDiagram>：《Python高级编程》全书学习地图。
 *
 * 四列布局对应四大板块：
 *   基础内省（紫，2章）/ 高级语法（绿，2章）/ 并发编程（橙，3章）/ 工程实践（红，3章）
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const COL_W = 156;
const COL_GAP = 12;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const CARD_H = 30;
const CARD_GAP = 8;
const CARD_ROW = CARD_H + CARD_GAP;
const CARDS_TOP_Y = 158;

type Column = {
  id: string;
  name: string;
  color: string;
  chapters: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "basics",
    name: "基础内省",
    color: "var(--accent)",
    chapters: ["0. 学习地图", "1. Python内部机制"],
  },
  {
    id: "syntax",
    name: "高级语法",
    color: "var(--success)",
    chapters: ["2. 迭代器与生成器", "3. 装饰器与元类"],
  },
  {
    id: "concurrency",
    name: "并发编程",
    color: "var(--warning)",
    chapters: ["4. asyncio", "5. multiprocessing", "6. Cython"],
  },
  {
    id: "engineering",
    name: "工程实践",
    color: "var(--danger)",
    chapters: ["7. 测试", "8. 打包", "9. 总复习"],
  },
];

export function PyaLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python高级编程全书学习地图。四列从左到右对应四大板块：基础内省（紫色，2章）、高级语法（绿色，2章）、并发编程（橙色，3章）、工程实践（红色，3章）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Python高级编程 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从会用 → 懂原理 → 破瓶颈 → 落工程，四段递进
          </text>

          {/* 顶部路径条 */}
          <rect x={COL_MARGIN} y="68" width={VIEW_W - COL_MARGIN * 2} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="87" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">进阶路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">理解语言 → 掌握利器 → 突破瓶颈 → 落地工程</tspan>
          </text>

          {/* 四列 */}
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                <rect x={x} y="112" width={COL_W} height="30" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={x + COL_W / 2} y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>{col.name}（{col.chapters.length}）</text>

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

          {/* 底部总结栏 */}
          <rect x="60" y="340" width={VIEW_W - 120} height="44" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="360" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书 10 章 · 四段递进
          </text>
          <text x={VIEW_W / 2} y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先理解对象模型，再掌握语法利器，突破并发瓶颈，最终工程化落地
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分四大板块：基础内省讲底层机制，高级语法掌握迭代器与元编程，并发编程突破性能瓶颈，工程实践实现测试与打包。
      </figcaption>
    </figure>
  );
}
