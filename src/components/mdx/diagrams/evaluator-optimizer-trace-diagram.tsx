import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 328;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const VERSION_W = 168;
const VERSION_H = 132;
const VERSION_Y = 96;
const VERSION_XS = [24, 276, 528] as const;

const FEEDBACK_W = 100;
const FEEDBACK_H = 84;
const FEEDBACK_XS = [184, 436] as const;
const FEEDBACK_Y = 120;

type VersionCard = {
  title: string;
  score: string;
  tone: string;
  line1: string;
  line2: string;
  line3: string;
};

const VERSIONS: readonly VersionCard[] = [
  {
    title: "v1 初稿",
    score: "62 分",
    tone: "var(--warning)",
    line1: "事实都在，但像直译",
    line2: "公告口吻不够稳",
    line3: "还没到可外发状态",
  },
  {
    title: "v2 改写版",
    score: "81 分",
    tone: "var(--accent)",
    line1: "主线收拢了",
    line2: "上线范围更清楚",
    line3: "只剩少数硬伤",
  },
  {
    title: "v3 终稿",
    score: "达标 / 停机",
    tone: "var(--success)",
    line1: "关键信息完整",
    line2: "语气与术语都过线",
    line3: "满足 pass 条件",
  },
] as const;

const FEEDBACKS = [
  {
    title: "feedback",
    line1: "改公告口吻",
    line2: "补 Pro 用户范围",
  },
  {
    title: "feedback",
    line1: "统一术语",
    line2: "收尾更明确",
  },
] as const;

export function EvaluatorOptimizerTraceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="评估-优化的分数迭代轨迹。从 v1 初稿 62 分开始，评估器给出一轮反馈，优化器改出 v2 81 分；再给第二轮反馈，最后得到 v3 终稿，达到门槛后停机。图强调每一轮都保留版本、分数和反馈，而不是无限重写。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="eotd-arrow"
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
              每一轮都留下分数、问题和改动方向
            </text>

            <rect
              x={24}
              y={44}
              width={220}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={134}
              y={62}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              例子：把发布稿从 62 分磨到过线
            </text>

            {VERSIONS.map((version, index) => {
              const x = VERSION_XS[index];
              return (
                <g key={version.title}>
                  <rect
                    x={x}
                    y={VERSION_Y}
                    width={VERSION_W}
                    height={VERSION_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                  />
                  <rect
                    x={x + 12}
                    y={VERSION_Y + 12}
                    width={84}
                    height={20}
                    rx={CHIP_RADIUS}
                    fill={version.tone}
                    fillOpacity="0.14"
                    stroke={version.tone}
                  />
                  <text
                    x={x + 20}
                    y={VERSION_Y + 26}
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={version.tone}
                  >
                    {version.title}
                  </text>
                  <text
                    x={x + VERSION_W / 2}
                    y={VERSION_Y + 58}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={version.tone}
                  >
                    {version.score}
                  </text>
                  <text
                    x={x + VERSION_W / 2}
                    y={VERSION_Y + 84}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {version.line1}
                  </text>
                  <text
                    x={x + VERSION_W / 2}
                    y={VERSION_Y + 104}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {version.line2}
                  </text>
                  <text
                    x={x + VERSION_W / 2}
                    y={VERSION_Y + 122}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {version.line3}
                  </text>
                </g>
              );
            })}

            {FEEDBACKS.map((feedback, index) => {
              const x = FEEDBACK_XS[index];
              return (
                <g key={`${feedback.title}-${index}`}>
                  <line
                    x1={VERSION_XS[index] + VERSION_W}
                    y1={VERSION_Y + VERSION_H / 2}
                    x2={x - 8}
                    y2={FEEDBACK_Y + FEEDBACK_H / 2}
                    stroke="var(--text-secondary)"
                    strokeWidth="2"
                    markerEnd="url(#eotd-arrow)"
                  />
                  <line
                    x1={x + FEEDBACK_W}
                    y1={FEEDBACK_Y + FEEDBACK_H / 2}
                    x2={VERSION_XS[index + 1] - 8}
                    y2={VERSION_Y + VERSION_H / 2}
                    stroke="var(--text-secondary)"
                    strokeWidth="2"
                    markerEnd="url(#eotd-arrow)"
                  />
                  <rect
                    x={x}
                    y={FEEDBACK_Y}
                    width={FEEDBACK_W}
                    height={FEEDBACK_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg-elevated)"
                    stroke="var(--accent)"
                  />
                  <text
                    x={x + FEEDBACK_W / 2}
                    y={FEEDBACK_Y + 24}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--accent)"
                  >
                    {feedback.title}
                  </text>
                  <text
                    x={x + FEEDBACK_W / 2}
                    y={FEEDBACK_Y + 48}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {feedback.line1}
                  </text>
                  <text
                    x={x + FEEDBACK_W / 2}
                    y={FEEDBACK_Y + 66}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {feedback.line2}
                  </text>
                </g>
              );
            })}

            <rect
              x={88}
              y={268}
              width={544}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={286}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              关键特征：每轮都留版本与分数，分数过线或达到上限就停，不做无限循环
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
