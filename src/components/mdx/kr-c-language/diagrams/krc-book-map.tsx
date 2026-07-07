/**
 * <KrcBookMap>：C 程序设计语言（K&R）全书学习地图。
 *
 * 五个 section 横向排布，展示「概览 → 类型 → 控制流与函数 → 指针与数组 → 结构体与IO」的进阶关系：
 *   - 概览（accent）：全书哲学与学习路径
 *   - 类型与运算符（accent）：基本类型、表达式
 *   - 控制流与函数（success）：分支循环、程序结构
 *   - 指针与数组（warning）：指针算术、字符串
 *   - 结构体与IO（success）：结构体、标准I/O、UNIX接口
 * 列间用箭头连接表示递进关系。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const COL_W = 116;
const COL_GAP = 18;
const COL_MARGIN = 40;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 52;
const ITEM_GAP = 10;
const ITEM_START_Y = 116;

const itemY = (i: number) => ITEM_START_Y + i * (ITEM_H + ITEM_GAP);

interface Section {
  title: string;
  subtitle: string;
  color: string;
  items: string[];
}

const SECTIONS: readonly Section[] = [
  {
    title: "C 语言概览",
    subtitle: "Overview",
    color: "var(--accent)",
    items: ["设计哲学", "学习路径"],
  },
  {
    title: "类型与运算符",
    subtitle: "Types",
    color: "var(--accent)",
    items: ["基本类型", "运算符", "类型转换"],
  },
  {
    title: "控制流与函数",
    subtitle: "Control",
    color: "var(--success)",
    items: ["分支循环", "函数定义", "作用域"],
  },
  {
    title: "指针与数组",
    subtitle: "Pointers",
    color: "var(--warning)",
    items: ["指针算术", "字符串", "命令行参数"],
  },
  {
    title: "结构体与IO",
    subtitle: "Struct/IO",
    color: "var(--success)",
    items: ["结构体联合", "标准I/O", "UNIX接口"],
  },
];

export function KrcBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C 程序设计语言全书学习地图。五列横向排列：概览、类型与运算符、控制流与函数、指针与数组、结构体与IO。列间用箭头连接表示递进关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="krc-bm-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
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
            C 程序设计语言（K&R）· 全书地图
          </text>
          <text
            x={VIEW_W / 2}
            y={58}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            从基本语法到底层接口——五个板块构成 C 语言完整视图
          </text>

          {/* 五列 */}
          {SECTIONS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                {/* 列标题区 */}
                <rect
                  x={cx}
                  y={84}
                  width={COL_W}
                  height={28}
                  rx="6"
                  fill={col.color}
                  fillOpacity="0.12"
                  stroke={col.color}
                  strokeWidth="1.5"
                />
                <text
                  x={cx + COL_W / 2}
                  y={103}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.title}
                </text>

                {/* 列内条目 */}
                {col.items.map((item, ii) => {
                  const y = itemY(ii);
                  return (
                    <g key={item}>
                      <rect
                        x={cx}
                        y={y}
                        width={COL_W}
                        height={ITEM_H}
                        rx="8"
                        fill={col.color}
                        fillOpacity="0.06"
                        stroke={col.color}
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                      />
                      <text
                        x={cx + COL_W / 2}
                        y={y + ITEM_H / 2 + 5}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="600"
                        fill="var(--text-primary)"
                      >
                        {item}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 列间递进箭头 */}
          {[0, 1, 2, 3].map((ci) => (
            <line
              key={`arrow-${ci}`}
              x1={colX(ci) + COL_W + 4}
              y1={itemY(1) + ITEM_H / 2}
              x2={colX(ci + 1) - 4}
              y2={itemY(1) + ITEM_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#krc-bm-arrow)"
            />
          ))}

          {/* 底部总结 */}
          <line
            x1={32}
            y1={388}
            x2={VIEW_W - 32}
            y2={388}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_W / 2}
            y={412}
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            类型奠基、控制流组织逻辑、指针操作内存、结构体与IO连接系统
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        K&R 全书五个板块：概览引路，类型与运算符奠基，控制流与函数组织逻辑，指针与数组操作内存，结构体与IO连接操作系统。
      </figcaption>
    </figure>
  );
}
