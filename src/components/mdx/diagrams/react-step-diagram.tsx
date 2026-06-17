/**
 * <ReActStepDiagram>：ReAct 模式 —— 一轮迭代拆成 Thought → Action → Observation 三段（HEL-297，第 3 章）。
 *
 * 一张静态 SVG：横向三段，左=思考 Thought、中=行动 Action、右=观察 Observation，
 * 箭头依次相连，构成「一轮」循环里的三步；右侧一条回流虚线箭头标出
 * 「观察完喂回 → 进入下一轮的思考」。每段下方一句人话说明它在干啥。
 *
 * 这是「把单次调用拆成可观察的三段」的核心一图：智能体每转一圈，都按
 * 想（下一步该干啥）→ 做（真去调工具）→ 看（结果是什么）这三段走，
 * 看到的结果又喂回去支撑下一轮的想——这正是 ReAct（Reason + Act）的骨架。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：三段框零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px、同行框单一 x 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 320;

// —— 三段框（统一尺寸，横向等距；同行用单一 x 公式）。 ——
const BOX_W = 192;
const BOX_H = 112;
const BOX_Y = 80;
const GAP = 36; // 框间距
const MARGIN_X = (VIEW_W - (BOX_W * 3 + GAP * 2)) / 2; // 24，三框整体居中
const BOX_CY = BOX_Y + BOX_H / 2; // 136

/** 第 i 段框左上角 x（单一公式，禁双算法）。 */
function boxX(i: number): number {
  return MARGIN_X + i * (BOX_W + GAP);
}

type Segment = {
  /** 段名（带 emoji + 中英）。 */
  title: string;
  /** 段在循环里干啥（一句人话）。 */
  role: string;
  /** 一个具体例子（订高铁票场景，承接主动画）。 */
  example: string;
};

// 三段：思考 → 行动 → 观察。例子统一用「订高铁票」场景，和主动画呼应。
const SEGMENTS: readonly Segment[] = [
  {
    title: "💭 思考 Thought",
    role: "想：下一步该干啥",
    example: "「先查有哪些车次」",
  },
  {
    title: "🛠️ 行动 Action",
    role: "做：真去调一个工具",
    example: "search_trains(明天, 上海)",
  },
  {
    title: "👀 观察 Observation",
    role: "看：工具返回了什么",
    example: "「G1 ¥553 / G7 ¥553 …」",
  },
];

export function ReActStepDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="ReAct 模式：一轮迭代拆成三段的示意图。从左到右横向排列三个框，构成智能体一轮循环的三步。第一段是思考 Thought，作用是想下一步该干啥，例子是先查有哪些车次。第二段是行动 Action，作用是真去调用一个工具，例子是 search_trains 明天 上海。第三段是观察 Observation，作用是看工具返回了什么，例子是 G1 五百五十三元、G7 五百五十三元等。三段之间有箭头依次相连：思考之后行动，行动之后观察。最右边还有一条回流的虚线箭头，从观察绕回到思考，表示这一轮看到的结果会喂回去，支撑下一轮的思考。核心结论：智能体每转一圈都按想、做、看这三段走，看到的结果又喂回支撑下一轮的想，这就是 ReAct，也就是 Reason 加 Act 的骨架。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="react-step-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="react-step-arrow-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 顶部标题：一轮 = 三段 */}
          <text
            x={VIEW_W / 2}
            y={40}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一轮迭代 = 想 → 做 → 看
          </text>

          {/* —— 段间箭头：思考 → 行动、行动 → 观察 —— */}
          {[0, 1].map((i) => (
            <line
              key={`seg-arrow-${i}`}
              x1={boxX(i) + BOX_W + 2}
              y1={BOX_CY}
              x2={boxX(i + 1) - 4}
              y2={BOX_CY}
              stroke="var(--accent)"
              strokeWidth="1.8"
              markerEnd="url(#react-step-arrow)"
            />
          ))}

          {/* —— 回流虚线箭头：观察 → 下一轮思考（从右框底绕回左框底）—— */}
          <path
            d={`M ${boxX(2) + BOX_W / 2} ${BOX_Y + BOX_H + 8}
                C ${boxX(2) + BOX_W / 2} ${BOX_Y + BOX_H + 56},
                  ${boxX(0) + BOX_W / 2} ${BOX_Y + BOX_H + 56},
                  ${boxX(0) + BOX_W / 2} ${BOX_Y + BOX_H + 12}`}
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
            opacity="0.7"
            markerEnd="url(#react-step-arrow-dim)"
          />
          <text
            x={VIEW_W / 2}
            y={BOX_Y + BOX_H + 64}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            观察喂回 → 支撑下一轮的思考
          </text>

          {/* —— 三段框 —— */}
          {SEGMENTS.map((seg, i) => {
            const x = boxX(i);
            const cx = x + BOX_W / 2;
            return (
              <g key={seg.title}>
                <rect
                  x={x}
                  y={BOX_Y}
                  width={BOX_W}
                  height={BOX_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                />
                <text
                  x={cx}
                  y={BOX_Y + 30}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {seg.title}
                </text>
                <text
                  x={cx}
                  y={BOX_Y + 56}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--accent)"
                >
                  {seg.role}
                </text>
                <text
                  x={cx}
                  y={BOX_Y + 86}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily={i === 1 ? "var(--font-mono)" : undefined}
                  fill="var(--text-secondary)"
                >
                  {seg.example}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        ReAct = Reason（思考）+ Act（行动）：一轮迭代拆成「想下一步 → 真去做 →
        看结果」三段，看到的结果喂回去支撑下一轮的想。这是智能体循环里每一圈的内部构造。
      </figcaption>
    </figure>
  );
}
