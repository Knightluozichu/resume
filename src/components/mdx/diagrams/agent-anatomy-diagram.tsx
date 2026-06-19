/**
 * <AgentAnatomyDiagram>：智能体（Agent）解剖图 —— 中央「LLM 大脑」+ 四件外挂（HEL-275，第 1 章）。
 *
 * 一张静态 SVG：正中是一个「LLM 大脑」节点（智能体的决策核心），四角各一个标注框，
 * 分别是它的四件外挂能力 —— 指令（系统提示）/ 工具（Tools）/ 记忆（上下文）/ 循环（Loop），
 * 每个框都有一条箭头连回大脑，表示「这四样都服务于大脑的决策、最终回到大脑」。
 *
 * 这是「裸 LLM → Agent」的核心一图：单独一个 LLM 只会预测下一个词；给它配上
 * 指令告诉它身份与目标、工具让它能行动、记忆让它记住上下文、循环让它能反复思考行动，
 * 它才升级成一个会自己干活的智能体。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：四角框与中央框零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px。
 */

// —— 整体画布。 ——
const VIEW_W = 700;
const VIEW_H = 460;

// —— 中央 LLM 大脑节点（智能体决策核心）。 ——
const BRAIN_W = 220;
const BRAIN_H = 96;
const BRAIN_X = (VIEW_W - BRAIN_W) / 2; // 240
const BRAIN_Y = (VIEW_H - BRAIN_H) / 2; // 182
const BRAIN_CX = BRAIN_X + BRAIN_W / 2; // 350
const BRAIN_CY = BRAIN_Y + BRAIN_H / 2; // 230

// —— 四角标注框（统一尺寸，与中央框零重叠）。 ——
const BOX_W = 168;
const BOX_H = 84;
const MARGIN_X = 32; // 左右框距 viewBox 边
const TOP_Y = 36; // 上排框 y
const BOTTOM_Y = VIEW_H - BOX_H - TOP_Y; // 340，下排框 y
const LEFT_X = MARGIN_X; // 32
const RIGHT_X = VIEW_W - BOX_W - MARGIN_X; // 500

type Corner = {
  /** 四件外挂的标题 */
  title: string;
  /** 一句话人话作用 */
  desc: string;
  /** 框左上角 x / y */
  x: number;
  y: number;
};

// 四角：左上=指令 右上=工具 左下=记忆 右下=循环。
const CORNERS: readonly Corner[] = [
  { title: "📋 指令（系统提示）", desc: "告诉它身份、目标和规矩", x: LEFT_X, y: TOP_Y },
  { title: "🔧 工具（Tools）", desc: "让它能查、能算、能动手", x: RIGHT_X, y: TOP_Y },
  { title: "🧠 记忆（上下文）", desc: "记住聊过的话和查到的料", x: LEFT_X, y: BOTTOM_Y },
  { title: "🔁 循环（Loop）", desc: "反复想—做—看，直到完成", x: RIGHT_X, y: BOTTOM_Y },
];

/** 一个角框中心点（连线终点用）。 */
function cornerCenter(c: Corner): { cx: number; cy: number } {
  return { cx: c.x + BOX_W / 2, cy: c.y + BOX_H / 2 };
}

export function AgentAnatomyDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="智能体（Agent）解剖图。正中央是一个 LLM 大脑节点，代表智能体的决策核心。四个角各有一个标注框，是大脑的四件外挂能力：左上是指令（系统提示），告诉它身份、目标和规矩；右上是工具（Tools），让它能查询、能计算、能动手操作；左下是记忆（上下文），记住聊过的话和查到的资料；右下是循环（Loop），让它反复地想、做、看，直到任务完成。四个框各有一条箭头连回中央的 LLM 大脑，表示这四样能力都服务于大脑的决策、信息最终都回到大脑。核心结论：单独一个 LLM 只会预测下一个词；给它配上指令、工具、记忆和循环这四件外挂，它才升级成一个会自己干活的智能体。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          <defs>
            <marker
              id="anatomy-arrow"
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

          {/* —— 四角 → 大脑的连线（先画，压在框与大脑之下）—— */}
          {CORNERS.map((c) => {
            const { cx, cy } = cornerCenter(c);
            // 连线从角框朝向大脑那一侧的边缘起，到大脑边框附近止（不插进框内）。
            const towardRight = cx < BRAIN_CX;
            const x1 = towardRight ? c.x + BOX_W : c.x;
            const x2 = towardRight ? BRAIN_X - 6 : BRAIN_X + BRAIN_W + 6;
            const y2 = cy < BRAIN_CY ? BRAIN_Y + 16 : BRAIN_Y + BRAIN_H - 16;
            return (
              <line
                key={`line-${c.title}`}
                x1={x1}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="var(--accent)"
                strokeWidth="1.4"
                opacity="0.55"
                markerEnd="url(#anatomy-arrow)"
              />
            );
          })}

          {/* —— 中央 LLM 大脑 —— */}
          <rect
            x={BRAIN_X}
            y={BRAIN_Y}
            width={BRAIN_W}
            height={BRAIN_H}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={BRAIN_CX}
            y={BRAIN_CY - 8}
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧩 LLM 大脑
          </text>
          <text
            x={BRAIN_CX}
            y={BRAIN_CY + 16}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            读懂目标 · 决定下一步
          </text>

          {/* —— 四角标注框 —— */}
          {CORNERS.map((c) => {
            const tx = c.x + BOX_W / 2;
            return (
              <g key={`box-${c.title}`}>
                <rect
                  x={c.x}
                  y={c.y}
                  width={BOX_W}
                  height={BOX_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={tx}
                  y={c.y + 34}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {c.title}
                </text>
                <text
                  x={tx}
                  y={c.y + 58}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {c.desc}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        智能体 = LLM 大脑 + 四件外挂：指令（身份与目标）、工具（能动手）、记忆（记住上下文）、循环（反复想—做—看）。少了任何一件，它都还只是个会聊天的模型。
      </figcaption>
    </figure>
  );
}
