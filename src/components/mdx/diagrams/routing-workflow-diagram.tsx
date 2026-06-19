import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 360;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const INPUT_X = 24;
const INPUT_Y = 128;
const INPUT_W = 144;
const INPUT_H = 72;

const ROUTER_CX = 280;
const ROUTER_CY = 164;
const ROUTER_HW = 76;
const ROUTER_HH = 44;

const LANE_X = 428;
const LANE_W = 248;
const LANE_H = 68;
const LANE_YS = [72, 146, 220] as const;

const LANES = [
  {
    title: "退款支线",
    body: "查订单 -> 判退款资格 -> 执行退款",
    tone: "var(--success)",
  },
  {
    title: "技术支线",
    body: "收错误信息 -> 匹配故障类型 -> 给修法",
    tone: "var(--accent)",
  },
  {
    title: "普通咨询支线",
    body: "查知识库 -> 组织答复 -> 收尾",
    tone: "var(--warning)",
  },
] as const;

export function RoutingWorkflowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="路由工作流示意图。左边是一张输入卡片，表示客服总入口收到用户请求。中间是一个菱形路由器，负责先判断请求类别。右边分成三条固定支线：退款支线，流程是查订单、判退款资格、执行退款；技术支线，流程是收错误信息、匹配故障类型、给修法；普通咨询支线，流程是查知识库、组织答复、收尾。图强调：每个请求只走最适合自己的一条线，而不是所有请求都走全套。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="rwd-arrow"
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
              路由：先分诊，再进对应的专门流程
            </text>

            <rect
              x={24}
              y={44}
              width={184}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={116}
              y={62}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              示例：客服总入口
            </text>

            <rect
              x={INPUT_X}
              y={INPUT_Y}
              width={INPUT_W}
              height={INPUT_H}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={INPUT_X + INPUT_W / 2}
              y={INPUT_Y + 28}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              用户请求
            </text>
            <text
              x={INPUT_X + INPUT_W / 2}
              y={INPUT_Y + 50}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              退款 / 技术 / 普通咨询
            </text>

            <line
              x1={INPUT_X + INPUT_W}
              y1={INPUT_Y + INPUT_H / 2}
              x2={ROUTER_CX - ROUTER_HW - 10}
              y2={ROUTER_CY}
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#rwd-arrow)"
            />

            <polygon
              points={`${ROUTER_CX},${ROUTER_CY - ROUTER_HH} ${ROUTER_CX + ROUTER_HW},${ROUTER_CY} ${ROUTER_CX},${ROUTER_CY + ROUTER_HH} ${ROUTER_CX - ROUTER_HW},${ROUTER_CY}`}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={ROUTER_CX}
              y={ROUTER_CY - 8}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              路由器
            </text>
            <text
              x={ROUTER_CX}
              y={ROUTER_CY + 14}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              先判断属于哪一类
            </text>

            {LANES.map((lane, index) => {
              const y = LANE_YS[index];
              return (
                <g key={lane.title}>
                  <line
                    x1={ROUTER_CX + ROUTER_HW}
                    y1={ROUTER_CY}
                    x2={LANE_X - 10}
                    y2={y + LANE_H / 2}
                    stroke="var(--text-secondary)"
                    strokeWidth="2"
                    markerEnd="url(#rwd-arrow)"
                  />
                  <rect
                    x={LANE_X}
                    y={y}
                    width={LANE_W}
                    height={LANE_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                  />
                  <rect
                    x={LANE_X + 12}
                    y={y + 12}
                    width={88}
                    height={18}
                    rx={CHIP_RADIUS}
                    fill={lane.tone}
                    fillOpacity="0.14"
                    stroke={lane.tone}
                  />
                  <text
                    x={LANE_X + 20}
                    y={y + 25}
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={lane.tone}
                  >
                    {lane.title}
                  </text>
                  <text
                    x={LANE_X + 20}
                    y={y + 48}
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {lane.body}
                  </text>
                </g>
              );
            })}

            <rect
              x={92}
              y={306}
              width={536}
              height={30}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={325}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              关键特征：入口先分类，每个请求只走最适合自己的那条支线
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
