/**
 * <IcoObjectModelsDiagram>：三种对象模型对比（对象模型基础章）。
 *
 * 三列并排对比 Lippman 提出的三种对象模型：
 *   - 简单对象模型（accent 紫）：成员按槽位索引，对象内存只存指针表
 *   - 表格驱动对象模型（success 绿）：成员函数与数据分两张表，对象存两张表指针
 *   - C++ 对象模型（warning 暖）：数据成员直接内联，虚函数走虚表
 * 底部标注：C++ 对象模型在空间与存取效率上的取舍。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const COL_W = 196;
const COL_GAP = 24;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

interface ModelSpec {
  name: string;
  tag: string;
  color: string;
  layout: string[];
  note: string;
}

const MODELS: readonly ModelSpec[] = [
  {
    name: "简单对象模型",
    tag: "A Model",
    color: "var(--accent)",
    layout: ["对象", "slot[0] → 成员1", "slot[1] → 成员2", "slot[2] → 成员3"],
    note: "每个成员一个槽位指针，存取经一次间接",
  },
  {
    name: "表格驱动模型",
    tag: "Tbl Model",
    color: "var(--success)",
    layout: ["对象", "→ 数据成员表", "  └ data[0]", "  └ data[1]", "→ 成员函数表", "  └ func()"],
    note: "数据与函数分离成两张表，对象只存表指针",
  },
  {
    name: "C++ 对象模型",
    tag: "C++ Model",
    color: "var(--warning)",
    layout: ["对象", "├ 数据成员（内联）", "│  ├ val1", "│  └ val2", "└ vptr → 虚表"],
    note: "数据直接内联，仅虚函数经虚表间接",
  },
];

export function IcoObjectModelsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="三种对象模型对比图。三列并排：简单对象模型用槽位指针表存取成员；表格驱动模型把数据与函数分离成两张表；C++ 对象模型把数据成员内联、仅虚函数经虚表间接存取。底部标注 C++ 对象模型在空间与存取效率上的取舍。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            三种对象模型对比
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            从全间接到数据内联——C++ 对象模型在效率与抽象间的折中
          </text>

          {/* 三列 */}
          {MODELS.map((m, ci) => {
            const cx = colX(ci);
            const bodyY = 92;
            const lineH = 24;
            return (
              <g key={m.name}>
                {/* 列标题 */}
                <rect x={cx} y={72} width={COL_W} height={32} rx="6" fill={m.color} fillOpacity="0.12" stroke={m.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={86} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={m.color}>
                  {m.name}
                </text>
                <text x={cx + COL_W / 2} y={99} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
                  {m.tag}
                </text>

                {/* 布局示意框 */}
                <rect x={cx} y={bodyY} width={COL_W} height={m.layout.length * lineH + 16} rx="8" fill={m.color} fillOpacity="0.05" stroke={m.color} strokeWidth="1.4" strokeOpacity="0.5" />
                {m.layout.map((line, li) => (
                  <text
                    key={li}
                    x={cx + 14}
                    y={bodyY + 24 + li * lineH}
                    fontSize="11.5"
                    fontFamily="monospace"
                    fill="var(--text-primary)"
                  >
                    {line}
                  </text>
                ))}

                {/* 列底注释 */}
                <text x={cx + COL_W / 2} y={bodyY + m.layout.length * lineH + 38} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {m.note}
                </text>
              </g>
            );
          })}

          {/* 底部总结区 */}
          <line x1={32} y1={432} x2={VIEW_W - 32} y2={432} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={456} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            C++ 对象模型：数据内联省空间、提速度；仅虚函数付一次间接代价
          </text>
          <text x={VIEW_W / 2} y={476} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            非虚数据成员存取 = 直接偏移；虚函数存取 = 经 vptr 一次间接查表
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种对象模型从「全间接」（简单模型、表格模型）走向「数据内联 + 虚函数间接」（C++ 模型），在空间占用与存取效率之间取折中。
      </figcaption>
    </figure>
  );
}
