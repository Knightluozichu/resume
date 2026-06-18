import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 404;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const DRAFT_X = 40;
const DRAFT_Y = 136;
const NODE_W = 148;
const NODE_H = 72;

const EVAL_X = 286;
const EVAL_Y = 64;

const FEEDBACK_X = 532;
const FEEDBACK_Y = 136;
const FEEDBACK_W = 148;
const FEEDBACK_H = 72;

const OPT_X = 532;
const OPT_Y = 246;

const REVISED_X = 286;
const REVISED_Y = 300;

export function EvaluatorOptimizerWorkflowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="评估-优化工作流闭环。左侧先有一份初稿 draft，上方中间是 evaluator 负责按明确标准打分并指出问题，右上是 feedback 把问题转成可执行修改意见，右下是 optimizer 依据反馈改写，底部中间得到 revised draft。只要还没过线，这份 revised draft 就继续回到 evaluator 再评一次，形成一个带停止条件的闭环。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="eowd-arrow"
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
                id="eowd-arrow-accent"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
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
              评估-优化：同一份产物在闭环里反复打磨
            </text>

            <rect
              x={24}
              y={44}
              width={204}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={126}
              y={62}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              示例：把一篇草稿磨到过线
            </text>

            <line
              x1={DRAFT_X + NODE_W}
              y1={DRAFT_Y + NODE_H / 2}
              x2={EVAL_X - 12}
              y2={EVAL_Y + NODE_H - 2}
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#eowd-arrow)"
            />
            <line
              x1={EVAL_X + NODE_W}
              y1={EVAL_Y + NODE_H / 2}
              x2={FEEDBACK_X - 12}
              y2={FEEDBACK_Y + NODE_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#eowd-arrow)"
            />
            <line
              x1={FEEDBACK_X + FEEDBACK_W / 2}
              y1={FEEDBACK_Y + FEEDBACK_H}
              x2={FEEDBACK_X + FEEDBACK_W / 2}
              y2={OPT_Y - 12}
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#eowd-arrow)"
            />
            <line
              x1={OPT_X}
              y1={OPT_Y + NODE_H / 2}
              x2={REVISED_X + NODE_W + 12}
              y2={REVISED_Y + NODE_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="2"
              markerEnd="url(#eowd-arrow)"
            />
            <path
              d={`M ${REVISED_X + NODE_W / 2} ${REVISED_Y} C ${REVISED_X + NODE_W / 2} 248, 236 168, ${EVAL_X + NODE_W / 2} ${EVAL_Y + NODE_H + 10}`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="6 5"
              markerEnd="url(#eowd-arrow-accent)"
            />

            <g>
              <rect
                x={DRAFT_X}
                y={DRAFT_Y}
                width={NODE_W}
                height={NODE_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <rect
                x={DRAFT_X + 12}
                y={DRAFT_Y + 12}
                width={74}
                height={20}
                rx={CHIP_RADIUS}
                fill="var(--warning)"
                fillOpacity="0.14"
                stroke="var(--warning)"
              />
              <text
                x={DRAFT_X + 20}
                y={DRAFT_Y + 26}
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--warning)"
              >
                draft
              </text>
              <text
                x={DRAFT_X + NODE_W / 2}
                y={DRAFT_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                先产出一个版本
              </text>
            </g>

            <g>
              <rect
                x={EVAL_X}
                y={EVAL_Y}
                width={NODE_W}
                height={NODE_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <rect
                x={EVAL_X + 12}
                y={EVAL_Y + 12}
                width={88}
                height={20}
                rx={CHIP_RADIUS}
                fill="var(--accent)"
                fillOpacity="0.14"
                stroke="var(--accent)"
              />
              <text
                x={EVAL_X + 20}
                y={EVAL_Y + 26}
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                evaluator
              </text>
              <text
                x={EVAL_X + NODE_W / 2}
                y={EVAL_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                先打分，再指出差在哪里
              </text>
            </g>

            <g>
              <rect
                x={FEEDBACK_X}
                y={FEEDBACK_Y}
                width={FEEDBACK_W}
                height={FEEDBACK_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <rect
                x={FEEDBACK_X + 12}
                y={FEEDBACK_Y + 12}
                width={82}
                height={20}
                rx={CHIP_RADIUS}
                fill="var(--warning)"
                fillOpacity="0.14"
                stroke="var(--warning)"
              />
              <text
                x={FEEDBACK_X + 20}
                y={FEEDBACK_Y + 26}
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--warning)"
              >
                feedback
              </text>
              <text
                x={FEEDBACK_X + FEEDBACK_W / 2}
                y={FEEDBACK_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                把扣分点改写成可执行建议
              </text>
            </g>

            <g>
              <rect
                x={OPT_X}
                y={OPT_Y}
                width={NODE_W}
                height={NODE_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <rect
                x={OPT_X + 12}
                y={OPT_Y + 12}
                width={86}
                height={20}
                rx={CHIP_RADIUS}
                fill="var(--success)"
                fillOpacity="0.14"
                stroke="var(--success)"
              />
              <text
                x={OPT_X + 20}
                y={OPT_Y + 26}
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--success)"
              >
                optimizer
              </text>
              <text
                x={OPT_X + NODE_W / 2}
                y={OPT_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                按反馈改写，不必从零重来
              </text>
            </g>

            <g>
              <rect
                x={REVISED_X}
                y={REVISED_Y}
                width={NODE_W}
                height={NODE_H}
                rx={CARD_RADIUS}
                fill="var(--bg)"
                stroke="var(--border)"
              />
              <rect
                x={REVISED_X + 12}
                y={REVISED_Y + 12}
                width={112}
                height={20}
                rx={CHIP_RADIUS}
                fill="var(--accent)"
                fillOpacity="0.14"
                stroke="var(--accent)"
              />
              <text
                x={REVISED_X + 20}
                y={REVISED_Y + 26}
                fontSize={TEXT_SIZE}
                fontWeight="700"
                fill="var(--accent)"
              >
                revised draft
              </text>
              <text
                x={REVISED_X + NODE_W / 2}
                y={REVISED_Y + 50}
                textAnchor="middle"
                fontSize={TEXT_SIZE}
                fill="var(--text-primary)"
              >
                新版本不过线，就继续回环
              </text>
            </g>

            <rect
              x={92}
              y={360}
              width={536}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={378}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              关键特征：评估标准先写清，反馈能驱动下一轮，直到过线或命中停止条件
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
