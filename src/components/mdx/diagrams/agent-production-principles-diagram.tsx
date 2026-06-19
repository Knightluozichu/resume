import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 430;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;
const SCORE_SIZE = 25;

const GAUGE_R = 70;
const GAUGE_CY = 198;

type PrincipleGauge = {
  title: string;
  score: number;
  status: string;
  risk: string;
  cx: number;
  tone: string;
};

const GAUGES: readonly PrincipleGauge[] = [
  {
    title: "简单性",
    score: 78,
    status: "先 workflow",
    risk: "证据不足别升级",
    cx: 144,
    tone: "var(--success)",
  },
  {
    title: "透明性",
    score: 46,
    status: "审计缺口",
    risk: "计划 / 调用不可追",
    cx: 360,
    tone: "var(--danger)",
  },
  {
    title: "ACI",
    score: 64,
    status: "接口待补",
    risk: "errors / eval 未齐",
    cx: 576,
    tone: "var(--warning)",
  },
] as const;

function needleAngle(score: number) {
  return -120 + (score / 100) * 240;
}

function needleTip(cx: number, score: number) {
  const angle = (needleAngle(score) * Math.PI) / 180;
  return {
    x: cx + Math.cos(angle) * 48,
    y: GAUGE_CY + Math.sin(angle) * 48,
  };
}

function Gauge({ gauge }: { gauge: PrincipleGauge }) {
  const tip = needleTip(gauge.cx, gauge.score);
  const isFailing = gauge.tone === "var(--danger)";

  return (
    <g>
      <rect
        x={gauge.cx - 92}
        y={88}
        width={184}
        height={244}
        rx={CARD_RADIUS}
        fill={isFailing ? "var(--danger)" : "var(--bg)"}
        fillOpacity={isFailing ? 0.12 : 1}
        stroke={gauge.tone}
        strokeWidth={isFailing ? 2 : 1.4}
      />
      <text
        x={gauge.cx}
        y={118}
        textAnchor="middle"
        fontSize={TITLE_SIZE}
        fontWeight="700"
        fill={gauge.tone}
      >
        {gauge.title}
      </text>

      <path
        d={`M ${gauge.cx - GAUGE_R} ${GAUGE_CY} A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${gauge.cx + GAUGE_R} ${GAUGE_CY}`}
        fill="none"
        stroke="var(--border)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d={`M ${gauge.cx - GAUGE_R} ${GAUGE_CY} A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${gauge.cx + GAUGE_R} ${GAUGE_CY}`}
        fill="none"
        stroke={gauge.tone}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${Math.max(36, gauge.score * 2.2)} 220`}
      />
      <line
        x1={gauge.cx}
        y1={GAUGE_CY}
        x2={tip.x}
        y2={tip.y}
        stroke={gauge.tone}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={gauge.cx} cy={GAUGE_CY} r="7" fill={gauge.tone} />
      <text
        x={gauge.cx}
        y={GAUGE_CY + 42}
        textAnchor="middle"
        fontSize={SCORE_SIZE}
        fontWeight="700"
        fill="var(--text-primary)"
      >
        {gauge.score}
      </text>
      <rect
        x={gauge.cx - 62}
        y={252}
        width={124}
        height={26}
        rx={CHIP_RADIUS}
        fill={gauge.tone}
        fillOpacity="0.12"
        stroke={gauge.tone}
      />
      <text
        x={gauge.cx}
        y={270}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={gauge.tone}
      >
        {gauge.status}
      </text>
      <text
        x={gauge.cx}
        y={304}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {gauge.risk}
      </text>
    </g>
  );
}

export function AgentProductionPrinciplesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="生产化 agent 三原则仪表盘。简单性 78 分，提示先用 workflow；透明性 46 分，审计缺口亮红，因为计划和工具调用不可追；ACI 64 分，接口待补，因为 errors 和 eval 没有齐。结论是三项任一项不合格都不要上线。"
            className="block h-auto w-[720px]"
          >
            <text
              x={VIEW_W / 2}
              y={32}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              生产化三原则：任一红灯，都先别上线
            </text>
            <text
              x={VIEW_W / 2}
              y={56}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              简单性控制复杂度，透明性留下可审记录，ACI 让工具像产品接口
            </text>

            {GAUGES.map((gauge) => (
              <Gauge key={gauge.title} gauge={gauge} />
            ))}

            <rect
              x={76}
              y={358}
              width={568}
              height={44}
              rx={CHIP_RADIUS}
              fill="var(--danger)"
              fillOpacity="0.1"
              stroke="var(--danger)"
            />
            <text
              x={VIEW_W / 2}
              y={386}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--danger)"
            >
              总览规则：简单性、透明性、ACI 必须一起过线；短板就是上线风险
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
