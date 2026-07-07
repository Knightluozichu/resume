/**
 * <CpcBookMap>：《CPU 眼里的 C++》全书学习地图（cpu-eye-cpp 入门章）。
 *
 * 三列布局对应全书三大板块：
 *   编译与链接（紫，2 章）/ CPU 运行时机制（绿，4 章）/ CPU 性能优化（橙，4 章）
 * 每列顶部彩色标题 pill，每个章节是一张圆角小卡片，左缘一颗板块色小圆点把卡片系回所属板块。
 * 卡片间用箭头串成「从代码诞生到运行提速」的学习路径；底部总结栏点出全书主线。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 三列主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

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
    id: "compile",
    name: "编译与链接",
    color: "var(--accent)",
    chapters: ["1. 学习路线图", "2. 编译过程"],
  },
  {
    id: "runtime",
    name: "CPU 运行时机制",
    color: "var(--success)",
    chapters: ["3. 内存模型", "4. 函数调用机制", "5. 虚函数实现", "6. 异常处理机制"],
  },
  {
    id: "optimize",
    name: "CPU 性能优化",
    color: "var(--warning)",
    chapters: ["7. 内联与优化", "8. 缓存友好编程", "9. 编译器优化", "10. 总复习"],
  },
];

export function CpcBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CPU 眼里的 C++ 全书学习地图。三列从左到右对应三大板块：编译与链接（紫色，2 章：学习路线图、编译过程）、CPU 运行时机制（绿色，4 章：内存模型、函数调用机制、虚函数实现、异常处理机制）、CPU 性能优化（橙色，4 章：内联与优化、缓存友好编程、编译器优化、总复习）。卡片间箭头表示从代码诞生到运行提速的学习路径。底部总结：从编译到运行到优化，把 C++ 语义映射回 CPU 真实成本。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CPU 眼里的 C++ · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从编译 → 运行时机制 → 性能优化，把 C++ 语义映射回 CPU 真实成本
          </text>

          {/* ===== 顶部路径箭头条 ===== */}
          <rect x={COL_MARGIN} y="76" width={VIEW_W - COL_MARGIN * 2} height="32" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="97" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">代码怎么来 → 怎么跑 → 怎么变快</tspan>
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
          <rect x="60" y="360" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="383" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书 10 章 · 三段递进
          </text>
          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先懂代码怎么编译成机器码，再看 CPU 怎么执行它，最后把底层理解转化为性能红利
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分三大板块：编译与链接讲清代码如何变成可执行文件，CPU 运行时机制揭示对象布局、栈帧、虚表与异常的底层实现，CPU 性能优化把底层机制转化为内联、缓存与编译器优化红利。
      </figcaption>
    </figure>
  );
}
