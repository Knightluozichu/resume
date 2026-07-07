/**
 * <EmcAutoUsageDiagram>：auto 使用场景与陷阱。
 *
 * 左右两栏对比：
 *   - 左栏「auto 的收益」（success 绿）：迭代器、Lambda、make 函数、避免截断
 *   - 右栏「auto 的陷阱」（danger 红）：代理类型、花括号推导、未预期推导
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 300;
const COL_GAP = 56;
const COL_MARGIN = 32;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 60;
const ITEM_GAP = 12;
const ITEM_START_Y = 116;
const itemY = (i: number) => ITEM_START_Y + i * (ITEM_H + ITEM_GAP);

interface Item {
  title: string;
  desc: string;
}

interface Column {
  title: string;
  subtitle: string;
  color: string;
  items: Item[];
}

const COLUMNS: readonly Column[] = [
  {
    title: "auto 的收益",
    subtitle: "优先使用",
    color: "var(--success)",
    items: [
      { title: "迭代器类型", desc: 'auto it = m.begin(); 免写 map<K,V>::iterator' },
      { title: "Lambda 闭包", desc: "auto f = [](int x){...}; 类型不可拼写" },
      { title: "make 函数返回", desc: "auto p = make_unique<Widget>();" },
      { title: "避免类型截断", desc: 'unsigned u = v.size(); 隐式转换风险' },
    ],
  },
  {
    title: "auto 的陷阱",
    subtitle: "需警惕",
    color: "var(--danger)",
    items: [
      { title: "代理类型", desc: 'vector<bool>::reference 退化为 bool 失效' },
      { title: "花括号推导", desc: "auto x{1} 推为 initializer_list，非 int" },
      { title: "引用性丢失", desc: "auto 去引用，需 auto& 保留容器元素引用" },
      { title: "顶层 const 丢失", desc: "auto 去顶层 const，const auto 显式补回" },
    ],
  },
];

export function EmcAutoUsageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="auto 使用场景与陷阱对比。左栏收益（绿色）：迭代器类型、Lambda 闭包、make 函数返回、避免类型截断；右栏陷阱（红色）：代理类型如 vector bool reference、花括号推导为 initializer_list、引用性丢失、顶层 const 丢失。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            auto：何时用、何时警惕
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            条款 5 优先用 auto · 条款 6 警惕代理类型推导
          </text>

          {/* 两列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                {/* 列标题 */}
                <rect x={cx} y={78} width={COL_W} height={30} rx="6" fill={col.color} fillOpacity="0.14" stroke={col.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>
                <text x={cx + COL_W - 12} y={98} textAnchor="end" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
                  {col.subtitle}
                </text>

                {/* 条目 */}
                {col.items.map((item, ii) => {
                  const y = itemY(ii);
                  return (
                    <g key={item.title}>
                      <rect x={cx} y={y} width={COL_W} height={ITEM_H} rx="8" fill={col.color} fillOpacity="0.06" stroke={col.color} strokeWidth="1.3" strokeOpacity="0.5" />
                      <text x={cx + 12} y={y + 24} fontSize="11.5" fontWeight="700" fill={col.color}>
                        {item.title}
                      </text>
                      <text x={cx + 12} y={y + 46} fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
                        {item.desc}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 中间连接说明 */}
          <text x={VIEW_W / 2} y={246} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            显式类型初始化
          </text>
          <text x={VIEW_W / 2} y={264} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            惯用法防代理
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={410} x2={VIEW_W - 32} y2={410} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={432} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            收益在简洁与正确，陷阱在代理类型与花括号——用显式初始化惯用法收口
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        auto 的收益在于避免冗长拼写与隐式截断；陷阱在于代理类型与花括号初始化。条款 6 的显式类型初始化惯用法可破解代理类型推导问题。
      </figcaption>
    </figure>
  );
}
