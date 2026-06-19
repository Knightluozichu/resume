/**
 * <ToolGranularityDiagram>：工具粒度取舍三态对照（HEL-317，第 9 章）。
 *
 * 一张静态 SVG，三栏并列同一件事「订一张去上海的高铁票」的三种工具切法：
 *   左栏「太细」：拆成 search / pick / lock / pay / issue 等好几个原子工具，
 *     agent 要把它们串成长长一条链才办成 —— 组合爆炸、慢且易错。
 *   中栏「合适」：一个 book_train_ticket 工具，一次办成一件完整的事 —— 刚刚好。
 *   右栏「太粗」：一个 manage_travel 工具，订票 / 改签 / 退票 / 查天气全塞进去，
 *     参数一大堆、模型不知道这次到底想干嘛 —— 不灵活、易误用。
 * 核心一图：粒度不是越细越好、也不是越粗越省事 —— 一个工具办成「一件完整的事」最好用。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名、为 4 的倍数（硬规则 5）。
 * 几何自检：三栏与各节点零重叠、文字中心落在自己框内、四周留白 ≥ 14px（含 stroke）、字号 ≥ 10px、单一列 x 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 728;
const VIEW_H = 396;

// —— 标题区。 ——
const TITLE_Y = 32;

// —— 三栏分区（单一 x 公式）。 ——
const COL_W = 216;
const COL_GAP = 18;
const COL_X0 = 24; // 三栏跨度：24 + 3*216 + 2*18 = 708 → 右边界 708 → 距 VIEW_W(728) 右留白 20
const COL_TOP = 52;
const COL_H = 320; // 底 = 52 + 320 = 372 → 距底 24

/** 第 i 栏左上角 x（单一公式）。0=太细 1=合适 2=太粗。 */
function colX(i: number): number {
  return COL_X0 + i * (COL_W + COL_GAP);
}

// —— 栏内原子调用小块（仅「太细」栏用，竖直堆叠）。 ——
const STEP_W = 168;
const STEP_H = 30;
const STEP_Y0 = COL_TOP + 84;
const STEP_GAP = 8;

/** 「太细」栏第 i 个原子步骤的 y（单一公式）。 */
function stepY(i: number): number {
  return STEP_Y0 + i * (STEP_H + STEP_GAP);
}

// 「太细」栏的 5 个原子工具。
const FINE_STEPS: readonly string[] = [
  "search_trains()",
  "pick_train()",
  "lock_seat()",
  "pay()",
  "issue_ticket()",
];

type Col = {
  title: string;
  /** 标题语义色 token。 */
  color: string;
  /** 副标题一句。 */
  sub: string;
  /** 底注（结论），两行。 */
  note: readonly [string, string];
};

const COLS: readonly Col[] = [
  {
    title: "太细 · 组合爆炸",
    color: "var(--danger)",
    sub: "拆成 5 个原子工具",
    note: ["agent 要串 5 步才订成", "—— 慢、易在中途出错"],
  },
  {
    title: "合适 · 刚刚好",
    color: "var(--success)",
    sub: "一个工具办成一件完整的事",
    note: ["一次调用就订成", "—— agent 用着最顺"],
  },
  {
    title: "太粗 · 一锅烩",
    color: "var(--warning)",
    sub: "一个工具管太多事",
    note: ["参数一大堆，模型不知道", "这次到底要干哪件"],
  },
];

export function ToolGranularityDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="工具粒度取舍的三态对照图，三栏并列，对同一件事「订一张去上海的高铁票」展示三种工具切法。左栏太细、组合爆炸：把这件事拆成 search_trains、pick_train、lock_seat、pay、issue_ticket 五个原子工具，agent 要把它们串成一条长链才办成，又慢又容易在中途某一步出错。中栏合适、刚刚好：用一个 book_train_ticket 工具，一次调用就办成一件完整的事，agent 用着最顺。右栏太粗、一锅烩：用一个 manage_travel 工具，把订票、改签、退票、查天气全塞进去，参数一大堆，模型不知道这次到底要干哪件事，既不灵活又容易误用。核心结论：工具粒度不是越细越好、也不是越粗越省事，一个工具刚好办成「一件完整的事」时最好用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 标题 —— */}
          <text
            x={VIEW_W / 2}
            y={TITLE_Y}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            同一件事「订一张去上海的高铁票」，三种粒度
          </text>

          {/* —— 三栏 —— */}
          {COLS.map((col, c) => {
            const x = colX(c);
            const cx = x + COL_W / 2;
            return (
              <g key={col.title}>
                {/* 栏底框 */}
                <rect
                  x={x}
                  y={COL_TOP}
                  width={COL_W}
                  height={COL_H}
                  rx="12"
                  fill="var(--bg)"
                  stroke={col.color}
                  strokeWidth="1.6"
                />
                {/* 栏标题 */}
                <text
                  x={cx}
                  y={COL_TOP + 26}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.title}
                </text>
                {/* 副标题 */}
                <text
                  x={cx}
                  y={COL_TOP + 48}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {col.sub}
                </text>
                {/* 底注（两行） */}
                <text
                  x={cx}
                  y={COL_TOP + COL_H - 34}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  <tspan x={cx} dy="0">
                    {col.note[0]}
                  </tspan>
                  <tspan x={cx} dy="14">
                    {col.note[1]}
                  </tspan>
                </text>
              </g>
            );
          })}

          {/* —— 左栏「太细」：5 个原子工具竖排 + 串联箭头 —— */}
          {FINE_STEPS.map((s, i) => {
            const x = colX(0) + (COL_W - STEP_W) / 2;
            const y = stepY(i);
            return (
              <g key={`fine-${i}`}>
                {i > 0 && (
                  <line
                    x1={x + STEP_W / 2}
                    y1={stepY(i - 1) + STEP_H}
                    x2={x + STEP_W / 2}
                    y2={y}
                    stroke="var(--danger)"
                    strokeWidth="1.4"
                  />
                )}
                <rect
                  x={x}
                  y={y}
                  width={STEP_W}
                  height={STEP_H}
                  rx="6"
                  fill="var(--bg-elevated)"
                  stroke="var(--danger)"
                  strokeWidth="1.2"
                />
                <text
                  x={x + STEP_W / 2}
                  y={y + STEP_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {s}
                </text>
              </g>
            );
          })}

          {/* —— 中栏「合适」：一个工具大方块（居中）—— */}
          {(() => {
            const x = colX(1) + (COL_W - STEP_W) / 2;
            const y = COL_TOP + 124;
            const h = 96;
            const cx = x + STEP_W / 2;
            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={STEP_W}
                  height={h}
                  rx="10"
                  fill="var(--accent-glow)"
                  stroke="var(--success)"
                  strokeWidth="1.8"
                />
                <text x={cx} y={y + 36} textAnchor="middle" fontSize="20">
                  ✅
                </text>
                <text
                  x={cx}
                  y={y + 66}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  book_train_ticket()
                </text>
                <text
                  x={cx}
                  y={y + 84}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  一次办成
                </text>
              </g>
            );
          })()}

          {/* —— 右栏「太粗」：一个工具塞 4 件事 —— */}
          {(() => {
            const x = colX(2) + (COL_W - STEP_W) / 2;
            const y = COL_TOP + 88;
            const h = 132;
            const cx = x + STEP_W / 2;
            const items = ["订票", "改签", "退票", "查天气"];
            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={STEP_W}
                  height={h}
                  rx="10"
                  fill="var(--bg-elevated)"
                  stroke="var(--warning)"
                  strokeWidth="1.8"
                />
                <text
                  x={cx}
                  y={y + 24}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  manage_travel()
                </text>
                {items.map((it, j) => (
                  <g key={`coarse-${j}`}>
                    <rect
                      x={x + 16}
                      y={y + 40 + j * 22}
                      width={STEP_W - 32}
                      height={18}
                      rx="4"
                      fill="var(--bg)"
                      stroke="var(--warning)"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={y + 40 + j * 22 + 13}
                      textAnchor="middle"
                      fontSize="10"
                      fill="var(--text-primary)"
                    >
                      {it}
                    </text>
                  </g>
                ))}
              </g>
            );
          })()}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        粒度取舍：拆得太细，agent
        要串一长串调用才办成一件事（慢、易错）；揉得太粗，一个工具管太多、模型分不清这次要干哪件。一个工具刚好办成「一件完整的事」时最好用。
      </figcaption>
    </figure>
  );
}
