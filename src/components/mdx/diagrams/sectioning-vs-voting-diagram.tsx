/**
 * <SectioningVsVotingDiagram>：并行的两种常见形态（HEL-326，Ch13）。
 *
 * 左栏是 sectioning：把大任务切成几片，各自负责不同片段；右栏是 voting：
 * 多个 worker 对同一个问题各自判断，最后做多数或汇总裁决。
 *
 * 纯展示 Server 组件。配色全部走 DESIGN token；几何常量具名且为 4 的倍数。
 */

import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 372;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const COL_W = 328;
const COL_H = 284;
const COL_GAP = 16;
const COL_X = 24;
const COL_Y = 60;

const WORKER_W = 84;
const WORKER_H = 44;
const WORKER_GAP = 16;
const WORKER_ROW_Y = COL_Y + 126;

const LEFT_WORKER_X = [44, 144, 244] as const;
const RIGHT_WORKER_X = [388, 488, 588] as const;

const leftX = (i: number) => COL_X + i * (COL_W + COL_GAP);

export function SectioningVsVotingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="并行的两种常见形态对照图。左栏是分片 sectioning：一份长任务先切成三段，分别交给三个 worker，每个人负责不同片段，最后再拼回一份完整答案。右栏是投票 voting：同一个问题同时交给三个 worker，各自独立作答，底部再做多数判断或汇总裁决。核心结论是：sectioning 解决的是任务太大需要分块，voting 解决的是同一个判断想用多个视角交叉验证。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="svv-arrow"
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
              并行不只一种：有人分片干活，有人同时给判断再投票
            </text>

            <rect
              x={leftX(0)}
              y={COL_Y}
              width={COL_W}
              height={COL_H}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={leftX(0) + COL_W / 2}
              y={COL_Y + 28}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              Sectioning：按片分工
            </text>
            <text
              x={leftX(0) + COL_W / 2}
              y={COL_Y + 48}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              一份大任务切片，各做不同部分
            </text>
            <rect
              x={84}
              y={COL_Y + 72}
              width={228}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg-elevated)"
              stroke="var(--accent)"
            />
            <text
              x={198}
              y={COL_Y + 90}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              长文档 -&gt; 切成 3 段摘要
            </text>
            {LEFT_WORKER_X.map((x, index) => (
              <g key={`section-${x}`}>
                <line
                  x1={198}
                  y1={COL_Y + 100}
                  x2={x + WORKER_W / 2}
                  y2={WORKER_ROW_Y - 10}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.6"
                  markerEnd="url(#svv-arrow)"
                />
                <rect
                  x={x}
                  y={WORKER_ROW_Y}
                  width={WORKER_W}
                  height={WORKER_H}
                  rx={CHIP_RADIUS}
                  fill="var(--bg)"
                  stroke="var(--border)"
                />
                <text
                  x={x + WORKER_W / 2}
                  y={WORKER_ROW_Y + 18}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {`片段 ${index + 1}`}
                </text>
                <text
                  x={x + WORKER_W / 2}
                  y={WORKER_ROW_Y + 34}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fill="var(--text-secondary)"
                >
                  各管一块
                </text>
                <line
                  x1={x + WORKER_W / 2}
                  y1={WORKER_ROW_Y + WORKER_H}
                  x2={198}
                  y2={COL_Y + 238}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.6"
                  markerEnd="url(#svv-arrow)"
                />
              </g>
            ))}
            <rect
              x={78}
              y={COL_Y + 238}
              width={240}
              height={32}
              rx={CHIP_RADIUS}
              fill="var(--bg-elevated)"
              stroke="var(--success)"
            />
            <text
              x={198}
              y={COL_Y + 258}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              再拼成一份完整摘要
            </text>

            <rect
              x={leftX(1)}
              y={COL_Y}
              width={COL_W}
              height={COL_H}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={leftX(1) + COL_W / 2}
              y={COL_Y + 28}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              Voting：同题多判
            </text>
            <text
              x={leftX(1) + COL_W / 2}
              y={COL_Y + 48}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              同一个判断，多人独立回答再汇总
            </text>
            <rect
              x={412}
              y={COL_Y + 72}
              width={228}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg-elevated)"
              stroke="var(--warning)"
            />
            <text
              x={526}
              y={COL_Y + 90}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--warning)"
            >
              这条回复是否合规？
            </text>
            {RIGHT_WORKER_X.map((x, index) => (
              <g key={`vote-${x}`}>
                <line
                  x1={526}
                  y1={COL_Y + 100}
                  x2={x + WORKER_W / 2}
                  y2={WORKER_ROW_Y - 10}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.6"
                  markerEnd="url(#svv-arrow)"
                />
                <rect
                  x={x}
                  y={WORKER_ROW_Y}
                  width={WORKER_W}
                  height={WORKER_H}
                  rx={CHIP_RADIUS}
                  fill="var(--bg)"
                  stroke="var(--border)"
                />
                <text
                  x={x + WORKER_W / 2}
                  y={WORKER_ROW_Y + 18}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {`评委 ${index + 1}`}
                </text>
                <text
                  x={x + WORKER_W / 2}
                  y={WORKER_ROW_Y + 34}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fill="var(--text-secondary)"
                >
                  独立判断
                </text>
                <line
                  x1={x + WORKER_W / 2}
                  y1={WORKER_ROW_Y + WORKER_H}
                  x2={526}
                  y2={COL_Y + 238}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.6"
                  markerEnd="url(#svv-arrow)"
                />
              </g>
            ))}
            <rect
              x={406}
              y={COL_Y + 238}
              width={240}
              height={32}
              rx={CHIP_RADIUS}
              fill="var(--bg-elevated)"
              stroke="var(--success)"
            />
            <text
              x={526}
              y={COL_Y + 258}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              多数决 / 汇总成最终裁决
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
