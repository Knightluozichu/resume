/**
 * <GppCategoryMap>：游戏编程模式全景分类图（game-programming-patterns 课程入门章）。
 *
 * 四列布局对应《Game Programming Patterns》四大部分：
 *   序列模式（绿，3）/ 行为模式（紫，4）/ 解耦模式（黄，1）/ 优化模式（红，4）
 * 每列顶部彩色标题 pill，每个模式名是一张圆角小卡片，左缘一颗类别色小圆点把卡片系回所属类别。
 * 顶部横条「GoF 模式游戏速览」列出 6 个前置 GoF 模式（Command / Flyweight / Observer /
 * Prototype / Singleton / State）作为前置知识。底部总结栏点出全书结构。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四列主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// 四列几何：宽 148、列间距 20、左右各留 34（≥32）。
const COL_W = 148;
const COL_GAP = 20;
const COL_MARGIN = 34;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// 卡片几何：高 28、垂直间距 8（满足 R5 ≥8）。
const CARD_H = 28;
const CARD_GAP = 8;
const CARD_ROW = CARD_H + CARD_GAP; // 36
const CARDS_TOP_Y = 178; // 标题 + 横条 + 列头之下

type Column = {
  id: string;
  name: string;
  color: string;
  patterns: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "sequencing",
    name: "序列模式",
    color: "var(--success)",
    patterns: ["游戏循环", "更新方法", "双缓冲"],
  },
  {
    id: "behavioral",
    name: "行为模式",
    color: "var(--accent)",
    patterns: ["子类沙箱", "类型对象", "组件", "事件队列"],
  },
  {
    id: "decoupling",
    name: "解耦模式",
    color: "var(--warning)",
    patterns: ["服务定位器"],
  },
  {
    id: "optimization",
    name: "优化模式",
    color: "var(--danger)",
    patterns: ["数据局部性", "脏标记", "对象池", "空间分区"],
  },
];

// 顶部横条：6 个 GoF 模式作为前置速览。
const GOF_PATTERNS = [
  "Command",
  "Flyweight",
  "Observer",
  "Prototype",
  "Singleton",
  "State",
];

export function GppCategoryMap() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏编程模式全景分类图。顶部横条列出 6 个 GoF 模式游戏速览（Command、Flyweight、Observer、Prototype、Singleton、State）作为前置。下方四列分别对应书的四部分：序列模式 3 个（游戏循环、更新方法、双缓冲，绿色）、行为模式 4 个（子类沙箱、类型对象、组件、事件队列，紫色）、解耦模式 1 个（服务定位器，黄色）、优化模式 4 个（数据局部性、脏标记、对象池、空间分区，红色）。底部总结：全书四部分共 12 个游戏专用模式。"
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
            游戏编程模式 · 全景分类
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            按序列 · 行为 · 解耦 · 优化四部分组织
          </text>

          {/* ===== 顶部横条：GoF 模式游戏速览（前置） ===== */}
          <rect
            x={COL_MARGIN}
            y="74"
            width={VIEW_W - COL_MARGIN * 2}
            height="40"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="99"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">
              GoF 模式游戏速览
            </tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">{GOF_PATTERNS.join(" · ")}</tspan>
          </text>

          {/* ===== 四列 ===== */}
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                {/* 列头彩色 pill */}
                <rect
                  x={x}
                  y="134"
                  width={COL_W}
                  height="30"
                  rx="8"
                  fill={col.color}
                  fillOpacity="0.12"
                  stroke={col.color}
                  strokeWidth="1.2"
                />
                <text
                  x={x + COL_W / 2}
                  y="154"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.name}（{col.patterns.length}）
                </text>

                {/* 模式卡片 */}
                {col.patterns.map((name, pi) => {
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
                      {/* 类别色小圆点：把卡片系回所属类别 */}
                      <circle
                        cx={x + 14}
                        cy={cy + CARD_H / 2}
                        r="3"
                        fill={col.color}
                      />
                      <text
                        x={x + COL_W / 2}
                        y={cy + CARD_H / 2 + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--text-primary)"
                      >
                        {name}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 底部总结栏（三段分层之底部） ===== */}
          <rect
            x="80"
            y="336"
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
            y="366"
            textAnchor="middle"
            fontSize="13"
            fill="var(--text-primary)"
          >
            全书四部分共 12 个游戏专用模式 · 顶部 6 个 GoF 模式为前置速览
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        游戏编程模式分四部分组织：序列（控制时间流）、行为（决定实体做什么）、解耦（拆分依赖）、优化（提速）。顶部 6 个 GoF 模式是游戏开发中复用的经典设计模式。
      </figcaption>
    </figure>
  );
}
