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

const LEFT_X = 28;
const TOP_Y = 84;
const ROW_H = 50;
const LABEL_W = 160;
const COL_W = 238;
const SUPPORT_X = LEFT_X + LABEL_W;
const CODING_X = SUPPORT_X + COL_W;

type FitRow = {
  axis: string;
  support: string;
  coding: string;
  tone: string;
};

const ROWS: readonly FitRow[] = [
  {
    axis: "对话 + 动作",
    support: "问答后退款 / 改单",
    coding: "对话后改代码 / 开 PR",
    tone: "var(--accent)",
  },
  {
    axis: "工具可用",
    support: "订单 / KB / 工单系统",
    coding: "repo / grep / tests",
    tone: "var(--success)",
  },
  {
    axis: "成功标准",
    support: "解决率 / CSAT / SLA",
    coding: "tests / build / review",
    tone: "var(--warning)",
  },
  {
    axis: "反馈闭环",
    support: "客户追问 / 规则拒绝",
    coding: "stderr / failing test",
    tone: "var(--danger)",
  },
  {
    axis: "人类监督",
    support: "高风险升级",
    coding: "PR review / 权限门",
    tone: "var(--accent)",
  },
] as const;

function HeaderCell({
  x,
  title,
  note,
  tone,
}: {
  x: number;
  title: string;
  note: string;
  tone: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={TOP_Y - 44}
        width={COL_W}
        height={36}
        rx={CHIP_RADIUS}
        fill={tone}
        fillOpacity="0.12"
        stroke={tone}
      />
      <text
        x={x + COL_W / 2}
        y={TOP_Y - 22}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fontWeight="700"
        fill={tone}
      >
        {title}
      </text>
      <text
        x={x + COL_W / 2}
        y={TOP_Y - 4}
        textAnchor="middle"
        fontSize={TEXT_SIZE}
        fill="var(--text-secondary)"
      >
        {note}
      </text>
    </g>
  );
}

export function AgentPracticeFitMatrixDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="客服和编码为什么适合 agent 的对照矩阵。两类任务都有对话加动作、可调用工具、明确成功标准、快速反馈闭环和人类监督。客服侧对应订单、知识库、工单系统和高风险升级；编码侧对应代码仓库、测试构建、失败输出和 PR review。"
            className="block h-auto w-[720px]"
          >
            <text
              x={VIEW_W / 2}
              y={28}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              为什么客服和编码适合 agent：五个共同条件
            </text>

            <HeaderCell
              x={SUPPORT_X}
              title="客服 agent"
              note="服务流程里行动"
              tone="var(--success)"
            />
            <HeaderCell
              x={CODING_X}
              title="编码 agent"
              note="仓库环境里行动"
              tone="var(--accent)"
            />

            <rect
              x={LEFT_X}
              y={TOP_Y}
              width={LABEL_W + COL_W * 2}
              height={ROW_H * ROWS.length}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />

            {ROWS.map((row, index) => {
              const y = TOP_Y + index * ROW_H;
              const cy = y + ROW_H / 2;

              return (
                <g key={row.axis}>
                  {index > 0 && (
                    <line
                      x1={LEFT_X}
                      y1={y}
                      x2={LEFT_X + LABEL_W + COL_W * 2}
                      y2={y}
                      stroke="var(--border)"
                    />
                  )}
                  <line
                    x1={SUPPORT_X}
                    y1={y}
                    x2={SUPPORT_X}
                    y2={y + ROW_H}
                    stroke="var(--border)"
                  />
                  <line
                    x1={CODING_X}
                    y1={y}
                    x2={CODING_X}
                    y2={y + ROW_H}
                    stroke="var(--border)"
                  />
                  <circle cx={LEFT_X + 22} cy={cy} r={5} fill={row.tone} />
                  <text
                    x={LEFT_X + 40}
                    y={cy + 5}
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--text-primary)"
                  >
                    {row.axis}
                  </text>
                  <text
                    x={SUPPORT_X + COL_W / 2}
                    y={cy + 5}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {row.support}
                  </text>
                  <text
                    x={CODING_X + COL_W / 2}
                    y={cy + 5}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {row.coding}
                  </text>
                </g>
              );
            })}

            <rect
              x={86}
              y={360}
              width={548}
              height={44}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={378}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              共同点不是“会聊天”，而是能把聊天接到可验证动作上
            </text>
            <text
              x={VIEW_W / 2}
              y={396}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              工具、标准、反馈和监督越清楚，agent 越像工程系统而不是魔法盒
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
