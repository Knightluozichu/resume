/**
 * <AddArchitectureVsDesignDiagram>：架构 vs 设计对比图（architecture-domain 入门章）。
 *
 * 左右两列对比：
 *   - 左列「设计」（accent 紫）：关注类、函数、模块级别，回答「怎么实现」
 *   - 右列「架构」（success 绿）：关注系统级别的边界、依赖方向、组件关系，回答「系统分成哪几块」
 * 底部箭头从设计指向架构，标注「进阶」。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const COL_W = 280;
const COL_GAP = 48;
const COL_MARGIN = 56;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 56;
const ITEM_GAP = 12;
const ITEM_START_Y = 108;
const itemY = (i: number) => ITEM_START_Y + i * (ITEM_H + ITEM_GAP);

interface Side {
  title: string;
  question: string;
  color: string;
  items: { label: string; desc: string }[];
}

const LEFT: Side = {
  title: "设计",
  question: "怎么实现？",
  color: "var(--accent)",
  items: [
    { label: "类与接口", desc: "字段、方法、继承关系" },
    { label: "函数与算法", desc: "逻辑流程、复杂度" },
    { label: "模块与包", desc: "代码组织、可见性" },
    { label: "设计模式", desc: "局部问题的复用方案" },
  ],
};

const RIGHT: Side = {
  title: "架构",
  question: "系统分成哪几块？",
  color: "var(--success)",
  items: [
    { label: "系统边界", desc: "内外边界在哪里划" },
    { label: "依赖方向", desc: "组件之间谁依赖谁" },
    { label: "组件关系", desc: "通信方式与契约" },
    { label: "架构风格", desc: "分层、六边形、微服务" },
  ],
};

export function AddArchitectureVsDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="架构与设计对比图。左列「设计」（紫色）关注类与接口、函数与算法、模块与包、设计模式，回答怎么实现。右列「架构」（绿色）关注系统边界、依赖方向、组件关系、架构风格，回答系统分成哪几块。底部箭头从设计指向架构，标注进阶。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="avd-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L7 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text
            x={VIEW_W / 2}
            y={36}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            架构 vs 设计
          </text>
          <text
            x={VIEW_W / 2}
            y={58}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            设计解决「怎么实现」，架构解决「系统分成哪几块」
          </text>

          {/* 左列：设计 */}
          <g>
            <rect
              x={colX(0)}
              y={76}
              width={COL_W}
              height={28}
              rx="6"
              fill={LEFT.color}
              fillOpacity="0.12"
              stroke={LEFT.color}
              strokeWidth="1.5"
            />
            <text
              x={colX(0) + COL_W / 2}
              y={95}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={LEFT.color}
            >
              {LEFT.title}
            </text>
            <text
              x={colX(0) + COL_W / 2}
              y={itemY(0) - 8}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill="var(--text-secondary)"
            >
              {LEFT.question}
            </text>
            {LEFT.items.map((item, i) => (
              <g key={item.label}>
                <rect
                  x={colX(0)}
                  y={itemY(i)}
                  width={COL_W}
                  height={ITEM_H}
                  rx="8"
                  fill={LEFT.color}
                  fillOpacity="0.06"
                  stroke={LEFT.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
                <text
                  x={colX(0) + 16}
                  y={itemY(i) + 24}
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {item.label}
                </text>
                <text
                  x={colX(0) + 16}
                  y={itemY(i) + 44}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {item.desc}
                </text>
              </g>
            ))}
          </g>

          {/* 右列：架构 */}
          <g>
            <rect
              x={colX(1)}
              y={76}
              width={COL_W}
              height={28}
              rx="6"
              fill={RIGHT.color}
              fillOpacity="0.12"
              stroke={RIGHT.color}
              strokeWidth="1.5"
            />
            <text
              x={colX(1) + COL_W / 2}
              y={95}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={RIGHT.color}
            >
              {RIGHT.title}
            </text>
            <text
              x={colX(1) + COL_W / 2}
              y={itemY(0) - 8}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill="var(--text-secondary)"
            >
              {RIGHT.question}
            </text>
            {RIGHT.items.map((item, i) => (
              <g key={item.label}>
                <rect
                  x={colX(1)}
                  y={itemY(i)}
                  width={COL_W}
                  height={ITEM_H}
                  rx="8"
                  fill={RIGHT.color}
                  fillOpacity="0.06"
                  stroke={RIGHT.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
                <text
                  x={colX(1) + 16}
                  y={itemY(i) + 24}
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {item.label}
                </text>
                <text
                  x={colX(1) + 16}
                  y={itemY(i) + 44}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {item.desc}
                </text>
              </g>
            ))}
          </g>

          {/* 底部进阶箭头：设计 → 架构 */}
          <line
            x1={colX(0) + COL_W / 2}
            y1={388}
            x2={colX(1) + COL_W / 2}
            y2={388}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#avd-arrow)"
          />
          <text
            x={VIEW_W / 2}
            y={380}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            进阶
          </text>
          <text
            x={VIEW_W / 2}
            y={412}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            从局部实现决策上升到系统级结构决策
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        设计关注类、函数、模块级别的「怎么实现」；架构关注系统级别的边界、依赖方向、组件关系——从设计到架构是一次视角的进阶。
      </figcaption>
    </figure>
  );
}
