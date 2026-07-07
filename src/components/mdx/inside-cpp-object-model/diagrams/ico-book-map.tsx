/**
 * <IcoBookMap>：《深度探索 C++ 对象模型》全书学习地图（入门章）。
 *
 * 三大板块横向排布，展示全书 7 章的组织结构与学习路径：
 *   - 第 1 列「对象模型基础」（accent 紫）：第 0-1 章
 *   - 第 2 列「构造语义」（success 绿）：第 2-3 章
 *   - 第 3 列「运行时机制」（warning 暖）：第 4-9 章
 * 列间用箭头连接表示进阶关系，底部标注全书主线。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const COL_W = 196;
const COL_GAP = 24;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 44;
const ITEM_GAP = 10;
const ITEM_START_Y = 116;
const itemY = (i: number) => ITEM_START_Y + i * (ITEM_H + ITEM_GAP);

interface Column {
  title: string;
  range: string;
  color: string;
  items: string[];
}

const COLUMNS: readonly Column[] = [
  {
    title: "对象模型基础",
    range: "第 0-1 章",
    color: "var(--accent)",
    items: ["全书概览与学习路径", "对象模型演化", "三种模型对比", "对象模型的开销"],
  },
  {
    title: "构造语义",
    range: "第 2-3 章",
    color: "var(--success)",
    items: ["构造函数语义", "成员初始化序列", "虚表指针设置", "数据成员布局与对齐"],
  },
  {
    title: "运行时机制",
    range: "第 4-9 章",
    color: "var(--warning)",
    items: ["函数语义与 this", "虚函数与虚表", "RTTI 与 typeid", "多重继承与对象生命周期"],
  },
];

export function IcoBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深度探索 C++ 对象模型全书地图。三列纵向排列：第 1 列对象模型基础（紫色）包含全书概览、对象模型演化、三种模型对比、对象模型的开销；第 2 列构造语义（绿色）包含构造函数语义、成员初始化序列、虚表指针设置、数据成员布局与对齐；第 3 列运行时机制（暖色）包含函数语义与 this、虚函数与虚表、RTTI 与 typeid、多重继承与对象生命周期。列间用箭头连接表示进阶关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ico-map-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            深度探索 C++ 对象模型 · 全书地图
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            7 章主线 · 三大板块 · 从对象布局到运行时多态
          </text>

          {/* 三列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                {/* 列标题区 */}
                <rect x={cx} y={74} width={COL_W} height={30} rx="6" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={94} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>
                <text x={cx + COL_W / 2} y={106} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
                  {col.range}
                </text>

                {/* 列内条目 */}
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
          {[0, 1].map((i) => (
            <line
              key={`arrow-${i}`}
              x1={colX(i) + COL_W + 4}
              y1={itemY(1) + ITEM_H / 2}
              x2={colX(i + 1) - 4}
              y2={itemY(1) + ITEM_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#ico-map-arrow)"
            />
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={426} x2={VIEW_W - 32} y2={426} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={450} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            对象布局奠基，构造语义立柱，运行时机制贯通——一条理解 C++ 实现的主线
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书三大板块：对象模型基础（第 0-1 章）奠基，构造语义（第 2-3 章）立柱，运行时机制（第 4-9 章）贯通，串起 C++ 对象从布局到多态的实现脉络。
      </figcaption>
    </figure>
  );
}
