import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 454;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const CARD_W = 196;
const CARD_H = 86;
const START_X = 34;
const START_Y = 86;
const GAP_X = 30;
const GAP_Y = 22;

type Risk = {
  title: string;
  trigger: string;
  handoff: string;
  tone: string;
};

const RISKS: readonly Risk[] = [
  {
    title: "退款金额高",
    trigger: "超过额度 / VIP 客户",
    handoff: "人工审批",
    tone: "var(--warning)",
  },
  {
    title: "删除 / 部署",
    trigger: "不可逆或影响线上",
    handoff: "双人确认",
    tone: "var(--danger)",
  },
  {
    title: "权限越界",
    trigger: "请求超出角色范围",
    handoff: "拒绝 + 记录",
    tone: "var(--danger)",
  },
  {
    title: "测试不通过",
    trigger: "build / test failed",
    handoff: "回到修复",
    tone: "var(--warning)",
  },
  {
    title: "置信度低",
    trigger: "证据缺失 / 多解",
    handoff: "请人判断",
    tone: "var(--accent)",
  },
] as const;

function RiskCard({ risk, index }: { risk: Risk; index: number }) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  const x = START_X + col * (CARD_W + GAP_X);
  const y = START_Y + row * (CARD_H + GAP_Y);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={CARD_W}
        height={CARD_H}
        rx={CARD_RADIUS}
        fill="var(--bg)"
        stroke={risk.tone}
      />
      <rect
        x={x + 14}
        y={y + 12}
        width={CARD_W - 28}
        height={24}
        rx={CHIP_RADIUS}
        fill={risk.tone}
        fillOpacity="0.12"
        stroke={risk.tone}
      />
      <text
        x={x + CARD_W / 2}
        y={y + 29}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={risk.tone}
      >
        {risk.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={y + 56}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-primary)"
      >
        {risk.trigger}
      </text>
      <text
        x={x + CARD_W / 2}
        y={y + 74}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {risk.handoff}
      </text>
    </g>
  );
}

export function AgentPracticeRiskDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="agent 实践中的人工接管红线。退款金额高、删除或部署、权限越界、测试不通过、置信度低时，agent 都不应继续自动执行，而要进入人工审批、双人确认、拒绝记录、回到修复或请人判断。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="risk-handoff-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
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
              什么时候必须人类接管：五条红线
            </text>
            <text
              x={VIEW_W / 2}
              y={52}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              红线不是失败，而是把不可逆风险留给有责任的人判断
            </text>

            {RISKS.map((risk, index) => (
              <RiskCard key={risk.title} risk={risk} index={index} />
            ))}

            <path
              d="M 230 330 C 278 296, 352 296, 400 330"
              fill="none"
              stroke="var(--warning)"
              strokeWidth="2"
              strokeDasharray="7 5"
              markerEnd="url(#risk-handoff-arrow)"
            />
            <rect
              x={430}
              y={296}
              width={226}
              height={82}
              rx={CARD_RADIUS}
              fill="var(--warning)"
              fillOpacity="0.1"
              stroke="var(--warning)"
            />
            <text
              x={543}
              y={322}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--warning)"
            >
              接管动作
            </text>
            <text
              x={543}
              y={346}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-primary)"
            >
              停止自动执行
            </text>
            <text
              x={543}
              y={366}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              带上证据、diff、日志交给人
            </text>

            <rect
              x={74}
              y={402}
              width={572}
              height={30}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={422}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              安全默认值：不确定就停机；能解释、能回滚、有人负责，才继续自动化
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
