/**
 * <LaunchModeDiagram />：《Android 编程权威指南》more-intents-tasks 章
 * 「四种启动模式对返回栈的影响」配图（HEL-192）。
 *
 * 画面内容：四列并排对比 standard / singleTop / singleTask / singleInstance，
 * 每列画一个竖直的任务返回栈（栈底在下、栈顶在上），统一演示同一个动作——
 * **「当前栈已有 A，再次启动 A」时，每种模式给出的结果**：
 *  - standard：再压一个新的 A 实例（栈：… A · A），两个 A 并存 → 新建（--accent）。
 *  - singleTop：A 已在栈顶，直接复用同实例（回调 onNewIntent），不新建 → 复用（--success）；
 *    并标注「若 A 不在栈顶则同 standard、会新建」这条边界。
 *  - singleTask：栈中已有 A，清除它上面的所有 Activity（clearTop），回到那个 A 实例 → 复用（--success）。
 *  - singleInstance：A 独占一个单独的任务栈，全系统只此一个，复用 → 复用（--success），
 *    用 --warning 框出「独立 Task」表达它住在别的栈里。
 * 每列下方标注典型用途 + 一句 taskAffinity 关系。
 *
 * 配色语义：新建实例用 --accent，复用既有实例用 --success（一眼区分两类结果）；
 * singleInstance 的「独立 Task」边框用 --warning。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色，无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 一张 Activity 卡片在某模式结果栈里的角色：是新建还是复用，决定配色。 ——
type CellKind = "fresh" | "reuse";

// —— 结果栈里的一层卡片（从栈底到栈顶排列）。 ——
type StackCell = {
  /** 卡片标题（Activity 名）。 */
  title: string;
  /** 这一层是新建实例还是复用既有实例。 */
  kind: CellKind;
  /** 可选副标注（如 onNewIntent / clearTop）。 */
  note?: string;
};

// —— 一种启动模式列：模式名 + 结果栈（自底向上）+ 一句话结论 + 典型用途 + taskAffinity 备注。 ——
type ModeColumn = {
  /** launchMode 取值名。 */
  mode: string;
  /** 一句话结论（标题下方）。 */
  verdict: string;
  /** 结果栈：数组首元素是栈底，末元素是栈顶。 */
  stack: readonly StackCell[];
  /** 是否独立任务栈（singleInstance）——用 warning 框标出。 */
  separateTask?: boolean;
  /** 典型用途。 */
  useCase: string;
  /** taskAffinity 一句话关系。 */
  affinity: string;
};

const COLUMNS: readonly ModeColumn[] = [
  {
    mode: "standard",
    verdict: "再压一个新 A",
    stack: [
      { title: "A", kind: "reuse" },
      { title: "A", kind: "fresh", note: "新实例" },
    ],
    useCase: "绝大多数普通页面",
    affinity: "留在原 Task（同 affinity）",
  },
  {
    mode: "singleTop",
    verdict: "栈顶 A 复用",
    stack: [{ title: "A", kind: "reuse", note: "onNewIntent" }],
    useCase: "搜索页：避免重复打开",
    affinity: "不在栈顶则同 standard 会新建",
  },
  {
    mode: "singleTask",
    verdict: "清栈复用 A",
    stack: [{ title: "A", kind: "reuse", note: "clearTop" }],
    useCase: "App 主入口 / 通知点入",
    affinity: "同 affinity Task 内全局唯一",
  },
  {
    mode: "singleInstance",
    verdict: "独占一个 Task",
    stack: [{ title: "A", kind: "reuse", note: "独占" }],
    separateTask: true,
    useCase: "来电 / 闹钟响铃界面",
    affinity: "独立 affinity → 自成一个 Task",
  },
];

// —— 布局常量（间距走 4 倍数；四列等宽并排）。 ——
const COL_W = 168; // 单列宽
const COL_GAP = 16; // 列间距
const PAD_X = 24; // 画布左右内边距
const COL_COUNT = COLUMNS.length;

const CARD_W = 120; // 栈卡片宽
const CARD_H = 40; // 栈卡片高
const STACK_GAP = 8; // 同栈相邻两层卡片的垂直间隔
const SLOT_H = CARD_H + STACK_GAP; // 一层「栈槽」高度

const HEADER_Y = 32; // 模式名基线 y
const VERDICT_Y = 52; // 结论基线 y
const STACK_BOTTOM_Y = 280; // 各列栈底卡片的顶边 y（栈底在下、栈顶在上）
const BASELINE_Y = STACK_BOTTOM_Y + CARD_H + 12; // 栈底基线 y
const USECASE_Y = BASELINE_Y + 28; // 典型用途行 y
const AFFINITY_Y = USECASE_Y + 32; // taskAffinity 行 y（两行注释）

const VIEW_W = PAD_X * 2 + COL_W * COL_COUNT + COL_GAP * (COL_COUNT - 1);
const VIEW_H = 416;

/** 第 i 列的左边界 x。 */
function colX(i: number): number {
  return PAD_X + i * (COL_W + COL_GAP);
}

/** 第 i 列里栈卡片的左边界 x（在列内水平居中）。 */
function cardX(i: number): number {
  return colX(i) + (COL_W - CARD_W) / 2;
}

/** 栈内第 slot 层（0 = 栈底）卡片的顶边 y。 */
function slotToY(slot: number): number {
  return STACK_BOTTOM_Y - slot * SLOT_H;
}

/** 取某一层卡片的语义色 token：新建 = accent，复用 = success。 */
function cellColor(kind: CellKind): string {
  return kind === "fresh" ? "var(--accent)" : "var(--success)";
}

export function LaunchModeDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="四种 Activity 启动模式对返回栈影响的并列对比图。四列分别是 standard、singleTop、singleTask、singleInstance，每列画一个竖直的任务返回栈（栈底在下、栈顶在上），统一演示同一个动作：当前栈里已经有一个 Activity A，再次启动 A 会发生什么。新建的实例用强调紫色标注，复用既有实例用绿色标注。第一列 standard：再压入一个新的 A 实例，栈里同时存在两个 A，最上面那个是新建的实例。第二列 singleTop：A 已经在栈顶，直接复用同一个实例并回调 onNewIntent，不创建新实例；但若 A 不在栈顶，则行为同 standard 会新建。第三列 singleTask：栈里已有 A，系统清除 A 上面的所有 Activity（clearTop），回到那个已有的 A 实例。第四列 singleInstance：A 独占一个单独的任务栈，全系统只有这一个实例，用警告黄色边框标出它住在独立的 Task 里。每列下方标注典型用途与 taskAffinity 关系：standard 用于绝大多数普通页面、留在原 Task；singleTop 用于搜索页避免重复打开、不在栈顶时仍会新建；singleTask 用于 App 主入口或通知点入、在同 affinity 的 Task 内全局唯一；singleInstance 用于来电或闹钟响铃界面、独立 affinity 自成一个 Task。"
          className="mx-auto block h-auto w-full max-w-[800px]"
        >
          {/* —— 标题 —— */}
          <text
            x={PAD_X}
            y="18"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            同一个动作 ——「当前栈已有 A，再次启动 A」—— 四种 launchMode 各给出什么结果
          </text>

          {/* —— 配色图例：新建（accent）/ 复用（success） —— */}
          <g>
            <rect
              x={VIEW_W - PAD_X - 188}
              y="6"
              width="12"
              height="12"
              rx="3"
              fill="var(--accent)"
              fillOpacity="0.16"
              stroke="var(--accent)"
              strokeWidth="1.2"
            />
            <text
              x={VIEW_W - PAD_X - 172}
              y="16"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              新建实例
            </text>
            <rect
              x={VIEW_W - PAD_X - 96}
              y="6"
              width="12"
              height="12"
              rx="3"
              fill="var(--success)"
              fillOpacity="0.16"
              stroke="var(--success)"
              strokeWidth="1.2"
            />
            <text
              x={VIEW_W - PAD_X - 80}
              y="16"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              复用既有
            </text>
          </g>

          {/* —— 四列 —— */}
          {COLUMNS.map((col, i) => {
            const cx = colX(i);
            const colMidX = cx + COL_W / 2;
            const cardLeft = cardX(i);
            const stackTopSlot = col.stack.length - 1;
            // singleInstance 的「独立 Task」外框：把这一列的栈罩在一个 warning 虚线框里。
            const frameTop = slotToY(stackTopSlot) - 12;
            const frameH = (stackTopSlot + 1) * SLOT_H - STACK_GAP + 24;
            return (
              <g key={col.mode}>
                {/* 列分隔竖线（除第一列外，列左侧画一条淡分隔） */}
                {i > 0 && (
                  <line
                    x1={cx - COL_GAP / 2}
                    y1={HEADER_Y - 16}
                    x2={cx - COL_GAP / 2}
                    y2={AFFINITY_Y + 8}
                    stroke="var(--border)"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                )}

                {/* 模式名 */}
                <text
                  x={colMidX}
                  y={HEADER_Y}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {col.mode}
                </text>
                {/* 一句话结论 */}
                <text
                  x={colMidX}
                  y={VERDICT_Y}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {col.verdict}
                </text>

                {/* singleInstance：独立 Task 外框（warning 虚线） */}
                {col.separateTask && (
                  <>
                    <rect
                      x={cardLeft - 12}
                      y={frameTop}
                      width={CARD_W + 24}
                      height={frameH}
                      rx="8"
                      fill="var(--warning)"
                      fillOpacity="0.05"
                      stroke="var(--warning)"
                      strokeWidth="1.3"
                      strokeDasharray="5 4"
                    />
                    <text
                      x={colMidX}
                      y={frameTop - 6}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="600"
                      fill="var(--warning)"
                    >
                      独立 Task
                    </text>
                  </>
                )}

                {/* 结果栈：自底向上逐层画卡片 */}
                {col.stack.map((cell, slot) => {
                  const y = slotToY(slot);
                  const color = cellColor(cell.kind);
                  const cyMid = y + CARD_H / 2;
                  return (
                    <g key={`${col.mode}-${slot}`}>
                      <rect
                        x={cardLeft}
                        y={y}
                        width={CARD_W}
                        height={CARD_H}
                        rx="8"
                        fill={color}
                        fillOpacity="0.12"
                        stroke={color}
                        strokeWidth="1.4"
                      />
                      {/* 左侧语义色条 */}
                      <rect
                        x={cardLeft}
                        y={y}
                        width="4"
                        height={CARD_H}
                        rx="2"
                        fill={color}
                      />
                      {/* Activity 名 */}
                      <text
                        x={cardLeft + CARD_W / 2}
                        y={cell.note ? cyMid : cyMid + 4}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="700"
                        fontFamily="var(--font-mono)"
                        fill="var(--text-primary)"
                      >
                        {cell.title}
                      </text>
                      {/* 副标注（onNewIntent / clearTop / 新实例 …） */}
                      {cell.note && (
                        <text
                          x={cardLeft + CARD_W / 2}
                          y={cyMid + 13}
                          textAnchor="middle"
                          fontSize="8.5"
                          fontFamily="var(--font-mono)"
                          fill={color}
                        >
                          {cell.note}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* 栈底基线 + 「栈底」标识 */}
                <line
                  x1={cardLeft - 8}
                  y1={BASELINE_Y}
                  x2={cardLeft + CARD_W + 8}
                  y2={BASELINE_Y}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={colMidX}
                  y={BASELINE_Y + 14}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="var(--text-secondary)"
                >
                  ▲ 栈底
                </text>

                {/* 典型用途 */}
                <text
                  x={colMidX}
                  y={USECASE_Y}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {col.useCase}
                </text>
                {/* taskAffinity 一句话关系 */}
                <text
                  x={colMidX}
                  y={AFFINITY_Y}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="var(--text-secondary)"
                >
                  {col.affinity}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四种 <code>launchMode</code> 面对同一个动作「栈里已有 A，再启动 A」给出四种结果：
        <code> standard </code>再压一个新 A（紫=新建）、<code>singleTop</code> 栈顶复用、
        <code> singleTask </code>清栈复用、<code>singleInstance</code> 独占一个 Task（绿=复用既有）。
        是否新建还要看 <code>taskAffinity</code> 把它分进了哪个 Task。
      </figcaption>
    </figure>
  );
}
