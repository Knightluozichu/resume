/**
 * <EmcBookMap>：Effective Modern C++ 全书学习地图（入门章）。
 *
 * 四大板块横向排布，展示 42 条条款的组织结构：
 *   - 第 1 列「类型推导与 auto」（accent 紫）：条款 1-6
 *   - 第 2 列「智能指针与资源管理」（success 绿）：条款 7-22
 *   - 第 3 列「移动语义与转发」（warning 暖）：条款 23-30
 *   - 第 4 列「并发与其他」（accent 紫）：条款 31-42
 * 列间用箭头连接表示进阶关系。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const COL_W = 152;
const COL_GAP = 16;
const COL_MARGIN = 32;
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
    title: "类型推导与 auto",
    range: "条款 1-6",
    color: "var(--accent)",
    items: ["模板类型推导", "auto 类型推导", "decltype", "优先用 auto"],
  },
  {
    title: "智能指针与资源管理",
    range: "条款 7-22",
    color: "var(--success)",
    items: ["迈向现代 C++", "unique / shared / weak", "make 函数", "Pimpl 惯用法"],
  },
  {
    title: "移动语义与转发",
    range: "条款 23-30",
    color: "var(--warning)",
    items: ["move 与 forward", "通用引用", "引用折叠", "完美转发失败"],
  },
  {
    title: "并发与其他",
    range: "条款 31-42",
    color: "var(--accent)",
    items: ["Lambda 表达式", "task / thread / atomic", "future 与 promise", "emplace 优化"],
  },
];

export function EmcBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Effective Modern C++ 全书地图。四列纵向排列：第 1 列类型推导与 auto（紫色）包含模板类型推导、auto 类型推导、decltype、优先用 auto；第 2 列智能指针与资源管理（绿色）包含迈向现代 C++、unique/shared/weak、make 函数、Pimpl 惯用法；第 3 列移动语义与转发（暖色）包含 move 与 forward、通用引用、引用折叠、完美转发失败；第 4 列并发与其他（紫色）包含 Lambda 表达式、task/thread/atomic、future 与 promise、emplace 优化。列间用箭头连接表示进阶关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="emc-map-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Effective Modern C++ · 全书地图
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            42 条条款 · 四大板块 · 从类型推导到并发 API
          </text>

          {/* 四列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                {/* 列标题区 */}
                <rect x={cx} y={74} width={COL_W} height={28} rx="6" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={93} textAnchor="middle" fontSize="12" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>
                <text x={cx + COL_W / 2} y={103} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
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
          {[0, 1, 2].map((i) => (
            <line
              key={`arrow-${i}`}
              x1={colX(i) + COL_W + 4}
              y1={itemY(1) + ITEM_H / 2}
              x2={colX(i + 1) - 4}
              y2={itemY(1) + ITEM_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#emc-map-arrow)"
            />
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={426} x2={VIEW_W - 32} y2={426} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={450} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            推导奠基，资源管控，移动转发，并发收口——42 条准则一条主线
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四大板块：类型推导与 auto（条款 1-6）奠基，智能指针与资源管理（条款 7-22）管控，移动语义与转发（条款 23-30）提速，并发与其他（条款 31-42）收口。
      </figcaption>
    </figure>
  );
}
