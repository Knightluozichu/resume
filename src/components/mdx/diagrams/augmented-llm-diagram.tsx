/**
 * <AugmentedLlmDiagram>：增强型 LLM 解剖图 —— 中央「裸 LLM」外包三种能力（HEL-291，第 2 章）。
 *
 * 一张静态 SVG：正中是一个「Base LLM（模型权重不变）」节点，外面套一圈虚线「增强外壳」，
 * 三个方向各挂一个能力框 —— 检索 Retrieval / 工具 Tools / 记忆 Memory，每个都有双向箭头
 * 连回中央 LLM（喂信息进去 / 让它能调用），强调「模型本身没动，是外面包了一层壳」。
 *
 * 这是「裸 LLM → 增强型 LLM」的核心一图：base LLM 还是那个 base LLM，
 * 检索把外部资料塞进上下文、工具让它能动手、记忆让它跨轮记得住 —— 三层一包，脱胎换骨。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：三能力框与中央框零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px。
 */

// —— 整体画布。 ——
const VIEW_W = 700;
const VIEW_H = 440;

// —— 中央 base LLM 节点（权重不变的核心）。 ——
const CORE_W = 184;
const CORE_H = 96;
const CORE_X = (VIEW_W - CORE_W) / 2; // 258
const CORE_Y = (VIEW_H - CORE_H) / 2; // 172
const CORE_CX = CORE_X + CORE_W / 2; // 350
const CORE_CY = CORE_Y + CORE_H / 2; // 220

// —— 「增强外壳」虚线框（包住 core，向外扩一圈，强调「外面包了壳」）。 ——
const SHELL_PAD = 36;
const SHELL_X = CORE_X - SHELL_PAD; // 222
const SHELL_Y = CORE_Y - SHELL_PAD; // 136
const SHELL_W = CORE_W + SHELL_PAD * 2; // 256
const SHELL_H = CORE_H + SHELL_PAD * 2; // 168

// —— 三个能力框（上中=记忆，左下=检索，右下=工具；统一尺寸）。 ——
const CAP_W = 196;
const CAP_H = 76;
const TOP_Y = 24; // 上方框 y
const BOTTOM_Y = VIEW_H - CAP_H - 24; // 340，下方两框 y
const TOP_X = (VIEW_W - CAP_W) / 2; // 252，上方框居中
const LEFT_X = 28; // 左下框 x
const RIGHT_X = VIEW_W - CAP_W - 28; // 476，右下框 x

type Cap = {
  /** 能力标题 */
  title: string;
  /** 一句话人话作用 */
  desc: string;
  /** 框左上角 x / y */
  x: number;
  y: number;
};

// 三能力：上=记忆 左下=检索 右下=工具。
const CAPS: readonly Cap[] = [
  { title: "🧠 记忆 Memory", desc: "跨轮 / 跨会话记得住", x: TOP_X, y: TOP_Y },
  { title: "🔍 检索 Retrieval", desc: "按需捞外部资料进上下文", x: LEFT_X, y: BOTTOM_Y },
  { title: "🔧 工具 Tools", desc: "产出调用、让它能动手", x: RIGHT_X, y: BOTTOM_Y },
];

export function AugmentedLlmDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="增强型 LLM 解剖图。正中央是一个 Base LLM 节点，标注「模型权重不变」，外面套着一圈虚线框，叫做增强外壳，表示模型本身没有改动、只是在外面包了一层能力壳。三个方向各挂一个能力框，都用双向箭头连回中央的 LLM。上方是记忆 Memory，作用是让它跨轮、跨会话记得住；左下方是检索 Retrieval，作用是按需把外部资料捞进上下文；右下方是工具 Tools，作用是让 LLM 产出调用、真正能动手做事。核心结论：base LLM 还是原来那个 base LLM，权重一个字节都没变；是检索、工具、记忆这三层外壳把它包了起来，才让它从一个只会续写文字的模型，变成一个能查资料、能动手、能记事的增强型 LLM。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          <defs>
            <marker
              id="aug-arrow"
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
              id="aug-arrow-start"
              viewBox="0 0 10 10"
              refX="1"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M10 0 L0 5 L10 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 能力框 → 中央 LLM 的双向连线（先画，压在框与壳之下）—— */}
          {/* 记忆（上）↕ LLM */}
          <line
            x1={CORE_CX}
            y1={TOP_Y + CAP_H + 4}
            x2={CORE_CX}
            y2={SHELL_Y - 4}
            stroke="var(--accent)"
            strokeWidth="1.6"
            opacity="0.55"
            markerEnd="url(#aug-arrow)"
            markerStart="url(#aug-arrow-start)"
          />
          {/* 检索（左下）↕ LLM */}
          <line
            x1={LEFT_X + CAP_W + 4}
            y1={BOTTOM_Y + CAP_H / 2}
            x2={SHELL_X - 4}
            y2={CORE_CY + 24}
            stroke="var(--accent)"
            strokeWidth="1.6"
            opacity="0.55"
            markerEnd="url(#aug-arrow)"
            markerStart="url(#aug-arrow-start)"
          />
          {/* 工具（右下）↕ LLM */}
          <line
            x1={RIGHT_X - 4}
            y1={BOTTOM_Y + CAP_H / 2}
            x2={SHELL_X + SHELL_W + 4}
            y2={CORE_CY + 24}
            stroke="var(--accent)"
            strokeWidth="1.6"
            opacity="0.55"
            markerEnd="url(#aug-arrow)"
            markerStart="url(#aug-arrow-start)"
          />

          {/* —— 增强外壳（虚线框，包住 core）—— */}
          <rect
            x={SHELL_X}
            y={SHELL_Y}
            width={SHELL_W}
            height={SHELL_H}
            rx="18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="6 5"
            opacity="0.7"
          />
          <text
            x={SHELL_X + SHELL_W - 8}
            y={SHELL_Y + 16}
            textAnchor="end"
            fontSize="10"
            fill="var(--accent)"
          >
            增强外壳
          </text>

          {/* —— 中央 base LLM —— */}
          <rect
            x={CORE_X}
            y={CORE_Y}
            width={CORE_W}
            height={CORE_H}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={CORE_CX}
            y={CORE_CY - 10}
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧩 Base LLM
          </text>
          <text
            x={CORE_CX}
            y={CORE_CY + 14}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            模型权重不变 · 还是它
          </text>

          {/* —— 三个能力框 —— */}
          {CAPS.map((c) => {
            const tx = c.x + CAP_W / 2;
            return (
              <g key={`cap-${c.title}`}>
                <rect
                  x={c.x}
                  y={c.y}
                  width={CAP_W}
                  height={CAP_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={tx}
                  y={c.y + 32}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {c.title}
                </text>
                <text
                  x={tx}
                  y={c.y + 54}
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
        增强型 LLM = base LLM（权重一个字节都没改）+ 外包三层能力：检索（捞资料）、工具（能动手）、记忆（记得住）。不是换了个更聪明的模型，而是在原模型外面包了一层壳。
      </figcaption>
    </figure>
  );
}
