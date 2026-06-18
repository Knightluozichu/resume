import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 396;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const CARD_W = 148;
const CARD_H = 104;
const CARD_Y = 112;
const CARD_XS = [44, 286, 528] as const;
const METRIC_Y = 264;

type TraceCard = {
  title: string;
  structure: string;
  metric: string;
  note: string;
  tone: string;
};

const TRACE: readonly TraceCard[] = [
  {
    title: "v1",
    structure: "routing + RAG",
    metric: "解答率 72%",
    note: "baseline 清楚",
    tone: "var(--success)",
  },
  {
    title: "v2",
    structure: "+ evaluator loop",
    metric: "解答率 71%",
    note: "成本 +38%",
    tone: "var(--danger)",
  },
  {
    title: "v1.1",
    structure: "回退到简单结构",
    metric: "解答率 73%",
    note: "只补检索质量",
    tone: "var(--success)",
  },
] as const;

export function PatternRollbackTraceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="模式回退轨迹图。第一版使用 routing 加 RAG，解答率 72%，作为 baseline。第二版加入 evaluator loop，但解答率下降到 71%，成本增加 38%，说明复杂度没有带来收益。系统因此回退到更简单的 v1.1，只补检索质量，解答率回到 73%。图强调复杂度必须可测，也必须可回退。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="prtd-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
              </marker>
              <marker
                id="prtd-rollback"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
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
              回退轨迹：复杂度没涨指标，就退回更简单结构
            </text>

            <rect
              x={80}
              y={52}
              width={560}
              height={36}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={75}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              规则：每次加模式都留下 baseline、指标和回退开关
            </text>

            <line
              x1={CARD_XS[0] + CARD_W}
              y1={CARD_Y + CARD_H / 2}
              x2={CARD_XS[1] - 8}
              y2={CARD_Y + CARD_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#prtd-arrow)"
            />
            <text
              x={240}
              y={CARD_Y + 42}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              加复杂度
            </text>
            <path
              d={`M ${CARD_XS[1] + CARD_W / 2} ${CARD_Y + CARD_H + 8} C 420 324, 292 324, ${CARD_XS[0] + CARD_W / 2} ${CARD_Y + CARD_H + 8}`}
              fill="none"
              stroke="var(--danger)"
              strokeWidth="2"
              strokeDasharray="7 5"
              markerEnd="url(#prtd-rollback)"
            />
            <line
              x1={CARD_XS[0] + CARD_W}
              y1={METRIC_Y + 42}
              x2={CARD_XS[2] - 8}
              y2={METRIC_Y + 42}
              stroke="var(--success)"
              strokeWidth="2"
              markerEnd="url(#prtd-arrow)"
            />
            <text
              x={VIEW_W / 2}
              y={METRIC_Y + 34}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--success)"
            >
              回退后只修最窄瓶颈
            </text>

            {TRACE.map((item, index) => {
              const x = CARD_XS[index];
              const cx = x + CARD_W / 2;
              return (
                <g key={item.title}>
                  <rect
                    x={x}
                    y={CARD_Y}
                    width={CARD_W}
                    height={CARD_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke={item.tone}
                  />
                  <text
                    x={cx}
                    y={CARD_Y + 24}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={item.tone}
                  >
                    {item.title}
                  </text>
                  <text
                    x={cx}
                    y={CARD_Y + 48}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {item.structure}
                  </text>
                  <text
                    x={cx}
                    y={CARD_Y + 72}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={item.tone}
                  >
                    {item.metric}
                  </text>
                  <text
                    x={cx}
                    y={CARD_Y + 92}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {item.note}
                  </text>
                </g>
              );
            })}

            <rect
              x={88}
              y={METRIC_Y}
              width={544}
              height={44}
              rx={CARD_RADIUS}
              fill="var(--danger)"
              fillOpacity="0.1"
              stroke="var(--danger)"
            />
            <text
              x={VIEW_W / 2}
              y={METRIC_Y + 18}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--danger)"
            >
              判定：指标没涨 + 成本上涨 = 打开 rollback
            </text>
            <text
              x={VIEW_W / 2}
              y={METRIC_Y + 36}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              可测不是为了证明自己对，而是为了敢删掉没用的复杂度
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
