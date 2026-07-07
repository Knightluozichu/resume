/**
 * <EcpBookMap>：《Easy C++（第5版）》全书学习地图（easy-cpp-5e 入门章）。
 *
 * 三列布局对应全书三大板块：
 *   C++ 入门（绿，4 章）/ 类与对象（紫，3 章）/ STL 与进阶（橙，3 章）
 * 每列顶部彩色标题 pill，每个章节是一张圆角小卡片，左缘一颗板块色小圆点。
 * 卡片间用箭头串成「由浅入深」的学习路径；底部总结栏点出全书结构。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const COL_W = 200;
const COL_GAP = 20;
const COL_MARGIN = 40;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const CARD_H = 30;
const CARD_GAP = 10;
const CARD_ROW = CARD_H + CARD_GAP;
const CARDS_TOP_Y = 180;

type Column = {
  id: string;
  name: string;
  color: string;
  chapters: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "basics",
    name: "C++ 入门",
    color: "var(--success)",
    chapters: ["1. 学习路线图", "2. 第一个 C++ 程序", "3. 变量与类型", "4. 控制流"],
  },
  {
    id: "oop",
    name: "类与对象",
    color: "var(--accent)",
    chapters: ["5. 函数", "6. 类与对象", "7. 继承与多态"],
  },
  {
    id: "stl",
    name: "STL 与进阶",
    color: "var(--warning)",
    chapters: ["8. 模板入门", "9. STL 入门", "10. 总复习"],
  },
];

export function EcpBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Easy C++ 第5版全书学习地图。三列从左到右对应三大板块：C++ 入门（绿色，4 章：学习路线图、第一个 C++ 程序、变量与类型、控制流）、类与对象（紫色，3 章：函数、类与对象、继承与多态）、STL 与进阶（橙色，3 章：模板入门、STL 入门、总复习）。卡片间箭头表示由浅入深的学习路径。底部总结：从 C++ 语法到标准库，三段递进。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Easy C++（第5版） · 全书学习地图
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            从 C++ 语法 → 面向对象 → STL 标准库，三段递进
          </text>

          {/* ===== 顶部路径箭头条 ===== */}
          <rect
            x={COL_MARGIN}
            y="76"
            width={VIEW_W - COL_MARGIN * 2}
            height="32"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="97"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">
              学习路径
            </tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">C++ 基础 → 类与对象 → 模板与 STL</tspan>
          </text>

          {/* ===== 三列 ===== */}
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                {/* 列头彩色 pill */}
                <rect
                  x={x}
                  y="128"
                  width={COL_W}
                  height="32"
                  rx="8"
                  fill={col.color}
                  fillOpacity="0.12"
                  stroke={col.color}
                  strokeWidth="1.2"
                />
                <text
                  x={x + COL_W / 2}
                  y="149"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.name}（{col.chapters.length}）
                </text>

                {/* 章节卡片 */}
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect
                        x={x}
                        y={cy}
                        width={COL_W}
                        height={CARD_H}
                        rx="6"
                        fill="var(--bg)"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <circle cx={x + 14} cy={cy + CARD_H / 2} r="3" fill={col.color} />
                      <text
                        x={x + COL_W / 2}
                        y={cy + CARD_H / 2 + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--text-primary)"
                      >
                        {name}
                      </text>
                      {/* 列内向下箭头 */}
                      {pi < col.chapters.length - 1 && (
                        <line
                          x1={x + COL_W / 2}
                          y1={cy + CARD_H}
                          x2={x + COL_W / 2}
                          y2={cy + CARD_ROW - 2}
                          stroke="var(--accent)"
                          strokeWidth="1.4"
                          strokeOpacity="0.6"
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="360"
            width={VIEW_W - 160}
            height="52"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="383"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            全书 10 章 · 三段递进
          </text>
          <text
            x={VIEW_W / 2}
            y="402"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            先用 C++ 写逻辑，再用类组织结构，最后用 STL 提效
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分三大板块：C++ 入门打底（程序结构、变量、控制流），类与对象引入 OOP（函数、类、继承），STL 与进阶接触泛型与标准库。
      </figcaption>
    </figure>
  );
}
