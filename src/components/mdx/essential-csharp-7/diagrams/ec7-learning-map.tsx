/**
 * <Ec7LearningMapDiagram>：C# 7.0 本质论 全书学习地图。
 *
 * 四列横向排布，展示全书 10 章的组织结构：
 *   - 第 1 列「C# 基础」（accent 紫）：学习地图、类型与变量、运算符与控制流
 *   - 第 2 列「面向对象」（success 绿）：类与对象、继承与接口
 *   - 第 3 列「泛型与委托」（warning 暖）：泛型、委托与事件
 *   - 第 4 列「高级特性」（danger 红）：LINQ、异步编程、总复习
 * 列间用箭头连接表示进阶关系。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const COL_W = 152;
const COL_GAP = 18;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 42;
const ITEM_GAP = 8;
const ITEM_START_Y = 100;
const itemY = (i: number) => ITEM_START_Y + i * (ITEM_H + ITEM_GAP);

interface Column {
  title: string;
  range: string;
  color: string;
  items: string[];
}

const COLUMNS: readonly Column[] = [
  {
    title: "C# 基础",
    range: "第 1-3 章",
    color: "var(--accent)",
    items: ["学习地图", "类型与变量", "运算符与控制流"],
  },
  {
    title: "面向对象",
    range: "第 4-5 章",
    color: "var(--success)",
    items: ["类与对象", "继承与接口"],
  },
  {
    title: "泛型与委托",
    range: "第 6-7 章",
    color: "var(--warning)",
    items: ["泛型", "委托与事件"],
  },
  {
    title: "高级特性",
    range: "第 8-10 章",
    color: "var(--danger)",
    items: ["LINQ", "异步编程", "总复习"],
  },
];

export function Ec7LearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 7.0 本质论全书地图。四列纵向排列：第 1 列 C# 基础（紫色）包含学习地图、类型与变量、运算符与控制流；第 2 列面向对象（绿色）包含类与对象、继承与接口；第 3 列泛型与委托（暖色）包含泛型、委托与事件；第 4 列高级特性（红色）包含 LINQ、异步编程、总复习。列间用箭头连接表示进阶关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ec7-map-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C# 7.0 本质论 · 全书地图
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            基础 · 面向对象 · 泛型委托 · 高级特性——四段递进
          </text>

          {/* 四列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                <rect x={cx} y={66} width={COL_W} height={26} rx="6" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={84} textAnchor="middle" fontSize="12" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>
                <text x={cx + COL_W / 2} y={94} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
                  {col.range}
                </text>

                {col.items.map((item, ii) => {
                  const y = itemY(ii);
                  return (
                    <g key={item}>
                      <rect x={cx} y={y} width={COL_W} height={ITEM_H} rx="8" fill={col.color} fillOpacity="0.06" stroke={col.color} strokeWidth="1.4" strokeOpacity="0.5" />
                      <text x={cx + COL_W / 2} y={y + ITEM_H / 2 + 4} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)">
                        {item}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 列间进阶箭头 */}
          {[0, 1, 2].map((i) => (
            <line
              key={`arrow-${i}`}
              x1={colX(i) + COL_W + 3}
              y1={ITEM_START_Y + 1.5 * (ITEM_H + ITEM_GAP)}
              x2={colX(i + 1) - 3}
              y2={ITEM_START_Y + 1.5 * (ITEM_H + ITEM_GAP)}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#ec7-map-arrow)"
            />
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={376} x2={VIEW_W - 32} y2={376} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={400} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            基础筑底，面向对象建骨，泛型委托强筋，高级特性冲刺
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四大板块：C# 基础（第 1-3 章）筑底，面向对象（第 4-5 章）建骨，泛型与委托（第 6-7 章）强筋，高级特性（第 8-10 章）冲刺。
      </figcaption>
    </figure>
  );
}
