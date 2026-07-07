/**
 * <CtrBookMap>：C++ 编程测试秘籍 全书学习地图（入门章）。
 *
 * 三大板块横向排布，展示全书 10 章的组织结构：
 *   - 第 1 列「基础测试」（accent 紫）：学习路线图、基础语法测试、内存管理测试
 *   - 第 2 列「进阶测试」（success 绿）：STL 测试、模板测试、并发测试
 *   - 第 3 列「面试实战」（warning 暖）：设计模式测试、算法测试、调试与优化测试、总复习
 * 列间用箭头连接表示进阶关系。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const COL_W = 200;
const COL_GAP = 30;
const COL_MARGIN = 30;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 50;
const ITEM_GAP = 10;
const ITEM_START_Y = 108;
const itemY = (i: number) => ITEM_START_Y + i * (ITEM_H + ITEM_GAP);

interface Column {
  title: string;
  range: string;
  color: string;
  items: string[];
}

const COLUMNS: readonly Column[] = [
  {
    title: "基础测试",
    range: "第 1-3 章",
    color: "var(--accent)",
    items: ["学习路线图", "基础语法测试", "内存管理测试"],
  },
  {
    title: "进阶测试",
    range: "第 4-6 章",
    color: "var(--success)",
    items: ["STL 测试", "模板测试", "并发测试"],
  },
  {
    title: "面试实战",
    range: "第 7-10 章",
    color: "var(--warning)",
    items: ["设计模式测试", "算法测试", "调试与优化测试", "总复习"],
  },
];

export function CtrBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 编程测试秘籍全书地图。三列纵向排列：第 1 列基础测试（紫色）包含学习路线图、基础语法测试、内存管理测试；第 2 列进阶测试（绿色）包含 STL 测试、模板测试、并发测试；第 3 列面试实战（暖色）包含设计模式测试、算法测试、调试与优化测试、总复习。列间用箭头连接表示进阶关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ctr-map-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 编程测试秘籍 · 全书地图
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            基础 · 进阶 · 面试——测试驱动 C++ 能力巩固
          </text>

          {/* 三列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                <rect x={cx} y={74} width={COL_W} height={28} rx="6" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={93} textAnchor="middle" fontSize="12" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>
                <text x={cx + COL_W / 2} y={103} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
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
          {[0, 1].map((i) => (
            <line
              key={`arrow-${i}`}
              x1={colX(i) + COL_W + 4}
              y1={itemY(1) + ITEM_H / 2}
              x2={colX(i + 1) - 4}
              y2={itemY(1) + ITEM_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#ctr-map-arrow)"
            />
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={426} x2={VIEW_W - 32} y2={426} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={450} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            基础筑底，进阶强骨，面试冲刺——测试驱动 + 陷阱导向一条主线
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书三大板块：基础测试（第 1-3 章）筑底，进阶测试（第 4-6 章）强骨，面试实战（第 7-10 章）冲刺。
      </figcaption>
    </figure>
  );
}
