import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 440;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const LANE_X = 28;
const LANE_W = 664;
const LANE_H = 84;
const LANE_GAP = 16;
const LANE_Y0 = 72;

const EVENT_W = 108;
const EVENT_H = 52;

const laneY = (index: number) => LANE_Y0 + index * (LANE_H + LANE_GAP);

type Lane = {
  title: string;
  tone: string;
  note: string;
};

const LANES: readonly Lane[] = [
  {
    title: "Human",
    tone: "var(--warning)",
    note: "目标 / 检查点",
  },
  {
    title: "Coding agent",
    tone: "var(--accent)",
    note: "计划 / 修改 / 判断",
  },
  {
    title: "Tools & env",
    tone: "var(--success)",
    note: "测试 / diff / ground truth",
  },
] as const;

type TraceEvent = {
  lane: number;
  x: number;
  title: string;
  sub: string;
  tone: string;
};

const EVENTS: readonly TraceEvent[] = [
  {
    lane: 0,
    x: 88,
    title: "任务",
    sub: "修 failing test",
    tone: "var(--warning)",
  },
  {
    lane: 1,
    x: 188,
    title: "计划",
    sub: "读错 + 定假设",
    tone: "var(--accent)",
  },
  {
    lane: 1,
    x: 300,
    title: "改动",
    sub: "补边界处理",
    tone: "var(--accent)",
  },
  {
    lane: 2,
    x: 412,
    title: "测试",
    sub: "仍失败",
    tone: "var(--danger)",
  },
  {
    lane: 1,
    x: 524,
    title: "修正",
    sub: "按 stderr 调整",
    tone: "var(--accent)",
  },
  {
    lane: 2,
    x: 636,
    title: "通过",
    sub: "build + tests",
    tone: "var(--success)",
  },
] as const;

type Checkpoint = {
  x: number;
  title: string;
  sub: string;
  tone: string;
};

const CHECKPOINTS: readonly Checkpoint[] = [
  {
    x: 420,
    title: "环境否决",
    sub: "失败结果回到计划",
    tone: "var(--danger)",
  },
  {
    x: 620,
    title: "人类检查点",
    sub: "权限外不继续",
    tone: "var(--warning)",
  },
] as const;

export function AutonomousAgentTraceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="编码 agent 的一次运行轨迹。人类给出修复测试的目标；agent 读错误、制定计划并修改代码；工具和环境返回测试失败，失败结果回到 agent 的下一轮计划；agent 修正后再次运行构建和测试，全部通过。图中还标出人类检查点和停机条件，强调 agent 的每一步都被工具结果约束。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="aatd-arrow"
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
                id="aatd-feedback"
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
              一个编码 agent 的运行轨迹：动作必须留下证据
            </text>

            {LANES.map((lane, index) => (
              <g key={lane.title}>
                <rect
                  x={LANE_X}
                  y={laneY(index)}
                  width={LANE_W}
                  height={LANE_H}
                  rx={CARD_RADIUS}
                  fill="var(--bg)"
                  stroke="var(--border)"
                />
                <rect
                  x={LANE_X + 16}
                  y={laneY(index) + 14}
                  width={118}
                  height={24}
                  rx={CHIP_RADIUS}
                  fill={lane.tone}
                  fillOpacity="0.14"
                  stroke={lane.tone}
                />
                <text
                  x={LANE_X + 28}
                  y={laneY(index) + 31}
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill={lane.tone}
                >
                  {lane.title}
                </text>
                <text
                  x={LANE_X + 28}
                  y={laneY(index) + 58}
                  fontSize={TEXT_SIZE}
                  fill="var(--text-secondary)"
                >
                  {lane.note}
                </text>
              </g>
            ))}

            <path
              d="M 150 114 C 180 114, 178 160, 188 172"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#aatd-arrow)"
            />
            <path
              d="M 250 172 C 284 172, 286 172, 300 172"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#aatd-arrow)"
            />
            <path
              d="M 356 194 C 392 214, 394 262, 412 272"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#aatd-arrow)"
            />
            <path
              d="M 456 272 C 492 242, 506 198, 524 194"
              fill="none"
              stroke="var(--danger)"
              strokeWidth="2"
              strokeDasharray="7 5"
              markerEnd="url(#aatd-feedback)"
            />
            <path
              d="M 580 194 C 616 214, 620 262, 636 272"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#aatd-arrow)"
            />

            {EVENTS.map((event) => (
              <g key={`${event.title}-${event.x}`}>
                <rect
                  x={event.x - EVENT_W / 2}
                  y={laneY(event.lane) + 16}
                  width={EVENT_W}
                  height={EVENT_H}
                  rx={CARD_RADIUS}
                  fill="var(--bg-elevated)"
                  stroke={event.tone}
                />
                <text
                  x={event.x}
                  y={laneY(event.lane) + 38}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill={event.tone}
                >
                  {event.title}
                </text>
                <text
                  x={event.x}
                  y={laneY(event.lane) + 58}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fill="var(--text-primary)"
                >
                  {event.sub}
                </text>
              </g>
            ))}

            {CHECKPOINTS.map((checkpoint) => (
              <g key={checkpoint.title}>
                <line
                  x1={checkpoint.x}
                  y1={LANE_Y0 + LANE_H * 3 + LANE_GAP * 2 + 10}
                  x2={checkpoint.x}
                  y2={376}
                  stroke={checkpoint.tone}
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                <rect
                  x={checkpoint.x - 84}
                  y={376}
                  width={168}
                  height={44}
                  rx={CHIP_RADIUS}
                  fill="var(--bg)"
                  stroke={checkpoint.tone}
                />
                <text
                  x={checkpoint.x}
                  y={394}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill={checkpoint.tone}
                >
                  {checkpoint.title}
                </text>
                <text
                  x={checkpoint.x}
                  y={412}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fill="var(--text-secondary)"
                >
                  {checkpoint.sub}
                </text>
              </g>
            ))}

            <rect
              x={72}
              y={376}
              width={208}
              height={44}
              rx={CHIP_RADIUS}
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
            />
            <text
              x={176}
              y={394}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--success)"
            >
              停机条件
            </text>
            <text
              x={176}
              y={412}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              测试通过 + diff 可解释 + 无越权
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
