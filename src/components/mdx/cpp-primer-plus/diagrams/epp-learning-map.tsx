/**
 * <EppBookMap>：《C++ Primer Plus》全书学习地图（cpp-primer-plus 入门章）。
 *
 * 三列布局对应全书三大板块：
 *   C++ 基础语法（紫，4 章）/ 类与继承（绿，3 章）/ 模板与 STL（橙，3 章）
 * 每列顶部彩色标题 pill，每个章节是一张圆角小卡片，左缘一颗板块色小圆点把卡片系回所属板块。
 * 卡片间用箭头串成「从语法到对象到泛型」的学习路径；底部总结栏点出全书主线。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 三列主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 三列几何：宽 208、列间距 16、左右各留 32。
const COL_W = 208;
const COL_GAP = 16;
const COL_MARGIN = 32;
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
    id: "syntax",
    name: "C++ 基础语法",
    color: "var(--accent)",
    chapters: ["1. 学习路线图", "2. C++ 基础语法", "3. 数据类型与变量", "4. 控制语句"],
  },
  {
    id: "oop",
    name: "类与继承",
    color: "var(--success)",
    chapters: ["5. 函数与引用", "6. 类与对象", "7. 继承与多态"],
  },
  {
    id: "generic",
    name: "模板与 STL",
    color: "var(--warning)",
    chapters: ["8. 模板与泛型", "9. STL 与算法", "10. 总复习"],
  },
];

export function EppBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ Primer Plus 全书学习地图。三列从左到右对应三大板块：C++ 基础语法（紫色，4 章：学习路线图、C++ 基础语法、数据类型与变量、控制语句）、类与继承（绿色，3 章：函数与引用、类与对象、继承与多态）、模板与 STL（橙色，3 章：模板与泛型、STL 与算法、总复习）。卡片间箭头表示从语法到对象到泛型的学习路径。底部总结：从过程式语法到面向对象再到泛型抽象，三段递进覆盖 C++ 全貌。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ Primer Plus · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从过程式语法 → 面向对象 → 泛型抽象，三段递进覆盖 C++ 全貌
          </text>

          {/* ===== 顶部路径箭头条 ===== */}
          <rect x={COL_MARGIN} y="76" width={VIEW_W - COL_MARGIN * 2} height="32" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="97" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">语法怎么写 → 程序怎么组织 → 抽象怎么复用</tspan>
          </text>

          {/* ===== 三列 ===== */}
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
          <rect x="60" y="384" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="407" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书 10 章 · 三段递进
          </text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先掌握基本语法与控制流，再用类与继承组织数据行为，最后用模板与 STL 实现类型安全的泛型复用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分三大板块：C++ 基础语法讲清变量、类型与控制流，类与继承用对象封装数据与行为，模板与 STL 用泛型实现类型安全的复用。三段层层递进，从「怎么写」到「怎么组织」到「怎么复用」。
      </figcaption>
    </figure>
  );
}
