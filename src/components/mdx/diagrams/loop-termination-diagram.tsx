/**
 * <LoopTerminationDiagram>：智能体循环的三种出口（HEL-297，第 3 章）。
 *
 * 一张静态 SVG：上方一个「循环」节点（自带一条回环箭头表示「不停在转」），
 * 下方三个并列的出口框，是循环正常 / 强制 / 兜底跳出的三条路 ——
 *   ① LLM 判定任务完成 → 正常退出（绿）
 *   ② 转够 max steps → 强制停（黄）
 *   ③ 出错无法继续 → 兜底退出（红）
 * 循环节点旁标注「没有 max steps 这道闸 → 可能无限转、烧钱」（呼应 §7 失控循环误区）。
 *
 * 这是「循环到底什么时候停」的核心一图：自主性把决定权交给 LLM，但人必须留下
 * max steps 与出错兜底两道硬闸，否则循环可能原地打转、停不下来。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：循环框与出口框零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px、同行框单一 x 公式。
 */

// —— 整体画布（底部留足余量，保证出口框距 viewBox 边 ≥ 12px）。 ——
const VIEW_W = 720;
const VIEW_H = 408;

// —— 上方「循环」节点（环形决策核心）。 ——
const LOOP_W = 200;
const LOOP_H = 76;
const LOOP_X = (VIEW_W - LOOP_W) / 2; // 260
const LOOP_Y = 40;
const LOOP_CX = LOOP_X + LOOP_W / 2; // 360
const LOOP_CY = LOOP_Y + LOOP_H / 2; // 78

// —— 下方三个并列出口框（统一尺寸，横向等距；同行单一 x 公式）。 ——
const EXIT_W = 200;
const EXIT_H = 116;
const EXIT_Y = 232;
const EXIT_GAP = 32;
const EXIT_MARGIN_X = (VIEW_W - (EXIT_W * 3 + EXIT_GAP * 2)) / 2; // 28
const EXIT_TITLE_Y = EXIT_Y + 32;

/** 第 i 个出口框左上角 x（单一公式）。 */
function exitX(i: number): number {
  return EXIT_MARGIN_X + i * (EXIT_W + EXIT_GAP);
}

type Exit = {
  /** 出口标题（带 emoji）。 */
  title: string;
  /** 触发条件（一句人话）。 */
  cond: string;
  /** 结果（一句人话）。 */
  result: string;
  /** 语义色 token（绿=正常/黄=强制/红=兜底）。 */
  color: string;
};

// 三种出口：正常完成 / max steps 强制停 / 出错兜底。
const EXITS: readonly Exit[] = [
  {
    title: "✅ 正常退出",
    cond: "LLM 判定任务已完成",
    result: "给出最终答案，皆大欢喜",
    color: "var(--success)",
  },
  {
    title: "⏱️ 强制停（max steps）",
    cond: "转够预设的最大步数",
    result: "硬性叫停，给个兜底回答",
    color: "var(--warning)",
  },
  {
    title: "🛑 出错兜底",
    cond: "工具报错 / 没法再继续",
    result: "退出循环，返回错误说明",
    color: "var(--danger)",
  },
];

export function LoopTerminationDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="智能体循环的三种出口示意图。上方中央是一个循环节点，自带一条回环箭头，表示它一直在思考、行动、观察地转圈。循环节点旁边标注一句警告：没有 max steps 这道闸，循环可能无限转、烧钱。从循环节点向下分出三条路，指向并列的三个出口框。第一个是正常退出，条件是 LLM 判定任务已完成，结果是给出最终答案，用绿色表示。第二个是强制停，也就是 max steps，条件是转够预设的最大步数，结果是硬性叫停、给个兜底回答，用黄色表示。第三个是出错兜底，条件是工具报错或没法再继续，结果是退出循环、返回错误说明，用红色表示。核心结论：自主性把要不要继续的决定权交给了 LLM，但人必须留下 max steps 和出错兜底这两道硬闸，否则循环可能原地打转、停不下来。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="loop-term-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 循环 → 三出口 的连线（先画，压在框下）—— */}
          {EXITS.map((e, i) => (
            <line
              key={`exit-line-${i}`}
              x1={LOOP_CX}
              y1={LOOP_Y + LOOP_H + 2}
              x2={exitX(i) + EXIT_W / 2}
              y2={EXIT_Y - 4}
              stroke="var(--accent)"
              strokeWidth="1.5"
              opacity="0.55"
              markerEnd="url(#loop-term-arrow)"
            />
          ))}

          {/* —— 循环节点自环箭头（在循环节点上方画半弧，示意「在转」）—— */}
          <path
            d={`M ${LOOP_X + 28} ${LOOP_Y + 6}
                C ${LOOP_X + 28} ${LOOP_Y - 24},
                  ${LOOP_X + LOOP_W - 28} ${LOOP_Y - 24},
                  ${LOOP_X + LOOP_W - 28} ${LOOP_Y + 6}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            markerEnd="url(#loop-term-arrow)"
          />

          {/* —— 上方循环节点 —— */}
          <rect
            x={LOOP_X}
            y={LOOP_Y}
            width={LOOP_W}
            height={LOOP_H}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={LOOP_CX}
            y={LOOP_CY - 6}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🔁 智能体循环
          </text>
          <text
            x={LOOP_CX}
            y={LOOP_CY + 16}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一圈圈转：想 → 做 → 看
          </text>

          {/* —— 失控警告（循环节点右侧）—— */}
          <text
            x={VIEW_W / 2}
            y={LOOP_Y + LOOP_H + 56}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--danger)"
          >
            ⚠ 没有 max steps 这道闸 → 可能无限转、烧钱
          </text>

          {/* —— 下方三个并列出口框 —— */}
          {EXITS.map((e, i) => {
            const x = exitX(i);
            const cx = x + EXIT_W / 2;
            return (
              <g key={e.title}>
                <rect
                  x={x}
                  y={EXIT_Y}
                  width={EXIT_W}
                  height={EXIT_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke={e.color}
                  strokeWidth="1.8"
                />
                <text
                  x={cx}
                  y={EXIT_TITLE_Y}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={e.color}
                >
                  {e.title}
                </text>
                <text
                  x={cx}
                  y={EXIT_Y + 62}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {e.cond}
                </text>
                <text
                  x={cx}
                  y={EXIT_Y + 90}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {e.result}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        循环三出口：① LLM 判完成正常退出、② 转够 max steps 强制停、③
        出错兜底退出。自主性把「要不要继续」交给 LLM，但人必须留下 max steps
        与出错兜底两道硬闸，否则循环可能停不下来。
      </figcaption>
    </figure>
  );
}
