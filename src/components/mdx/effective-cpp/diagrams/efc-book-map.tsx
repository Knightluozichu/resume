/**
 * <EfcBookMap>：Effective C++ 全书学习地图（入门章）。
 *
 * 四大板块横向排布，展示 55 条条款的组织结构：
 *   - 第 1 列「习惯 C++ 与构造析构」（accent 紫）：条款 1-12
 *   - 第 2 列「资源管理」（success 绿）：条款 13-17
 *   - 第 3 列「设计与继承」（warning 暖）：条款 18-40
 *   - 第 4 列「模板与杂项」（accent 紫）：条款 41-55
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
  subtitle: string;
  range: string;
  color: string;
  items: string[];
}

const COLUMNS: readonly Column[] = [
  {
    title: "习惯 C++ 与构造析构",
    subtitle: "Ch.1-2",
    range: "条款 1-12",
    color: "var(--accent)",
    items: ["视 C++ 为联邦", "const / inline 替代 #define", "对象初始化", "构造/析构/赋值"],
  },
  {
    title: "资源管理",
    subtitle: "Ch.3",
    range: "条款 13-17",
    color: "var(--success)",
    items: ["以对象管理资源", "RAII 拷贝行为", "访问原始资源", "智能指针"],
  },
  {
    title: "设计与继承",
    subtitle: "Ch.4-6",
    range: "条款 18-40",
    color: "var(--warning)",
    items: ["接口设计原则", "成员变量封装", "is-a 公有继承", "多态与复合"],
  },
  {
    title: "模板与杂项",
    subtitle: "Ch.7-9",
    range: "条款 41-55",
    color: "var(--accent)",
    items: ["模板隐式接口", "TMP 与 type traits", "定制 new/delete", "Boost 与 TR1"],
  },
];

export function EfcBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Effective C++ 全书地图。四列纵向排列：第 1 列习惯 C++ 与构造析构（紫色）包含视 C++ 为联邦、const/inline 替代 #define、对象初始化、构造/析构/赋值；第 2 列资源管理（绿色）包含以对象管理资源、RAII 拷贝行为、访问原始资源、智能指针；第 3 列设计与继承（暖色）包含接口设计原则、成员变量封装、is-a 公有继承、多态与复合；第 4 列模板与杂项（紫色）包含模板隐式接口、TMP 与 type traits、定制 new/delete、Boost 与 TR1。列间用箭头连接表示进阶关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="efc-map-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Effective C++ · 全书地图
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            55 条条款 · 四大板块 · 从习惯语言到驾驭模板
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
              markerEnd="url(#efc-map-arrow)"
            />
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={426} x2={VIEW_W - 32} y2={426} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={450} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            习惯奠基，资源管控，设计封装，模板延伸——55 条准则一条主线
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四大板块：习惯 C++ 与构造析构（条款 1-12）奠基，资源管理（条款 13-17）管控，设计与继承（条款 18-40）封装，模板与杂项（条款 41-55）延伸。
      </figcaption>
    </figure>
  );
}
