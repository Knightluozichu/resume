import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 420;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const STEP_W = 104;
const STEP_H = 76;
const STEP_START_X = 28;
const STEP_START_Y = 268;
const STEP_GAP_X = 116;
const STEP_RISE_Y = 34;
const GATE_Y = 352;

const stepX = (index: number) => STEP_START_X + index * STEP_GAP_X;
const stepY = (index: number) => STEP_START_Y - index * STEP_RISE_Y;

type LadderStep = {
  title: string;
  subtitle: string;
  cost: string;
  proof: string;
  tone: string;
};

const STEPS: readonly LadderStep[] = [
  {
    title: "单次 LLM",
    subtitle: "一次问答",
    cost: "最低复杂度",
    proof: "baseline",
    tone: "var(--text-secondary)",
  },
  {
    title: "增强 LLM",
    subtitle: "tool / RAG",
    cost: "补事实",
    proof: "事实正确率",
    tone: "var(--success)",
  },
  {
    title: "链式",
    subtitle: "拆步骤",
    cost: "多一次调用",
    proof: "步骤错误率",
    tone: "var(--accent)",
  },
  {
    title: "路由/并行",
    subtitle: "分流或分工",
    cost: "多路径维护",
    proof: "延迟/命中率",
    tone: "var(--warning)",
  },
  {
    title: "评估-优化",
    subtitle: "打分再改",
    cost: "回环成本",
    proof: "分数提升",
    tone: "var(--success)",
  },
  {
    title: "agent",
    subtitle: "滚动规划",
    cost: "最高风险",
    proof: "端到端收益",
    tone: "var(--danger)",
  },
] as const;

export function PatternComplexityLadderDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="模式复杂度阶梯。从左下到右上依次是单次 LLM、增强 LLM、链式、路由或并行、评估-优化和 agent。每升一阶都会增加维护成本、延迟或风险；每一阶下方都有 eval gate，要求用事实正确率、步骤错误率、延迟、分数提升或端到端收益证明复杂度值得。没有评估证明就不要升级。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="pcld-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
              </marker>
            </defs>

            <text
              x={VIEW_W / 2}
              y={28}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              复杂度阶梯：每升一级，都先让 eval 证明值得
            </text>

            <path
              d={`M ${stepX(0) + STEP_W / 2} ${stepY(0) + STEP_H / 2} L ${stepX(5) + STEP_W / 2 + 16} ${stepY(5) + STEP_H / 2 - 8}`}
              fill="none"
              stroke="var(--border)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d={`M ${stepX(0) + STEP_W / 2} ${stepY(0) + STEP_H / 2} L ${stepX(5) + STEP_W / 2 + 16} ${stepY(5) + STEP_H / 2 - 8}`}
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              markerEnd="url(#pcld-arrow)"
            />

            {STEPS.map((step, index) => {
              const x = stepX(index);
              const y = stepY(index);
              const cx = x + STEP_W / 2;
              return (
                <g key={step.title}>
                  <rect
                    x={x}
                    y={y}
                    width={STEP_W}
                    height={STEP_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke={step.tone}
                    strokeWidth={index === 0 ? 1 : 1.4}
                  />
                  <text
                    x={cx}
                    y={y + 22}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={step.tone}
                  >
                    {step.title}
                  </text>
                  <text
                    x={cx}
                    y={y + 44}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {step.subtitle}
                  </text>
                  <text
                    x={cx}
                    y={y + 62}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {step.cost}
                  </text>

                  <line
                    x1={cx}
                    y1={y + STEP_H}
                    x2={cx}
                    y2={GATE_Y - 10}
                    stroke="var(--border)"
                    strokeDasharray="5 5"
                  />
                  <rect
                    x={x}
                    y={GATE_Y}
                    width={STEP_W}
                    height={44}
                    rx={CHIP_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                  />
                  <text
                    x={cx}
                    y={GATE_Y + 18}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--accent)"
                  >
                    eval gate
                  </text>
                  <text
                    x={cx}
                    y={GATE_Y + 36}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {step.proof}
                  </text>
                </g>
              );
            })}

            <rect
              x={132}
              y={52}
              width={456}
              height={52}
              rx={CARD_RADIUS}
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
            />
            <text
              x={VIEW_W / 2}
              y={74}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              升级规则
            </text>
            <text
              x={VIEW_W / 2}
              y={94}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              下一阶只有在当前 eval 证明收益超过成本时才出现
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
