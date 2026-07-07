/**
 * <EcsLearningMapDiagram>：Effective C# 全书学习地图（入门章）。
 *
 * 四大板块横向排布，展示 50 条建议的组织结构：
 *   - 第 1 列「语言习惯」（accent 紫）：条款 1-12
 *   - 第 2 列「资源管理」（success 绿）：条款 13-25
 *   - 第 3 列「泛型与 LINQ」（warning 暖）：条款 26-37
 *   - 第 4 列「并发设计」（accent 紫）：条款 38-50
 * 列间用箭头连接表示进阶关系。
 *
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const COL_W = 152;
const COL_GAP = 16;
const COL_MARGIN = 32;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 46;
const ITEM_GAP = 10;
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
    title: "语言习惯",
    range: "条款 1-12",
    color: "var(--accent)",
    items: ["属性优先于字段", "readonly 与 const", "is/as 优于强制转换", "条件特性替 #if"],
  },
  {
    title: "资源管理",
    range: "条款 13-25",
    color: "var(--success)",
    items: ["IDisposable 模式", "using 语句", "值类型与引用类型", "0 基索引数组"],
  },
  {
    title: "泛型与 LINQ",
    range: "条款 26-37",
    color: "var(--warning)",
    items: ["泛型约束最小化", "延迟执行", "避免重复枚举", "lambda 捕获陷阱"],
  },
  {
    title: "并发设计",
    range: "条款 38-50",
    color: "var(--accent)",
    items: ["异常过滤器", "并行与异步", "Task 与 await", "相等性与哈希"],
  },
];

export function EcsLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Effective C# 全书地图。四列纵向排列：第 1 列语言习惯（紫色）包含属性优先、readonly 与 const、is/as 优于强制转换、条件特性替 #if；第 2 列资源管理（绿色）包含 IDisposable 模式、using 语句、值类型与引用类型、0 基索引数组；第 3 列泛型与 LINQ（暖色）包含泛型约束最小化、延迟执行、避免重复枚举、lambda 捕获陷阱；第 4 列并发设计（紫色）包含异常过滤器、并行与异步、Task 与 await、相等性与哈希。列间用箭头连接表示进阶关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-map-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Effective C# · 全书地图
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            50 条建议 · 四大板块 · 从语言习惯到并发设计
          </text>

          {/* 四列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                <rect x={cx} y={70} width={COL_W} height={26} rx="6" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={88} textAnchor="middle" fontSize="12" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>
                <text x={cx + COL_W / 2} y={96} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
                  {col.range}
                </text>

                {col.items.map((item, ii) => {
                  const y = itemY(ii);
                  return (
                    <g key={item}>
                      <rect x={cx} y={y} width={COL_W} height={ITEM_H} rx="8" fill={col.color} fillOpacity="0.06" stroke={col.color} strokeWidth="1.4" strokeOpacity="0.5" />
                      <text x={cx + COL_W / 2} y={y + ITEM_H / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
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
              x1={colX(i) + COL_W + 4}
              y1={itemY(1) + ITEM_H / 2}
              x2={colX(i + 1) - 4}
              y2={itemY(1) + ITEM_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#ecs-map-arrow)"
            />
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={368} x2={VIEW_W - 32} y2={368} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            习惯奠基，资源管控，泛型抽象，并发收口——50 条准则一条主线
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四大板块：语言习惯（条款 1-12）奠基，资源管理（条款 13-25）管控，泛型与 LINQ（条款 26-37）抽象，并发设计（条款 38-50）收口。
      </figcaption>
    </figure>
  );
}
