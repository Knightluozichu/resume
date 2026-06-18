/**
 * <ParallelizationWorkflowDiagram>：并行工作流的 fan-out -> fan-in（HEL-326，Ch13）。
 *
 * 一张静态 SVG，说明「并行」不是让模型临场想下一步，而是人先把互不依赖的子任务写死：
 * 任务进来后一次性扇出到几个并行 worker，最后再统一汇总。
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
const VIEW_H = 344;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const TITLE_Y = 28;

const TASK_X = 208;
const TASK_Y = 52;
const TASK_W = 304;
const TASK_H = 56;

const FAN_CX = VIEW_W / 2;
const FAN_CY = 132;

const WORKER_W = 184;
const WORKER_H = 76;
const WORKER_Y = 172;
const WORKER_XS = [24, 268, 512] as const;

const MERGE_X = 152;
const MERGE_Y = 280;
const MERGE_W = 416;
const MERGE_H = 36;

const WORKERS = [
  {
    title: "Worker A",
    body1: "查规格约束",
    body2: "不等别人的结果",
    tone: "var(--success)",
  },
  {
    title: "Worker B",
    body1: "查价格与库存",
    body2: "互不依赖，可同时跑",
    tone: "var(--accent)",
  },
  {
    title: "Worker C",
    body1: "查用户评价",
    body2: "各做各的再汇总",
    tone: "var(--warning)",
  },
] as const;

export function ParallelizationWorkflowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="并行工作流示意图。顶部是一张任务卡，表示收到了一个需要同时补齐多类信息的任务。中间先经过一个 fan-out 节点，说明子任务已经由人预先写死。随后一次性分发给三个并行 worker：第一个查规格约束，第二个查价格与库存，第三个查用户评价。三者之间没有依赖关系，所以可以同时执行，不需要谁先等谁。底部再通过 fan-in 汇总成一份最终结果。核心结论是：并行适合那些子任务能预先列清，而且彼此互不依赖的场景。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="pwd-arrow"
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
              y={TITLE_Y}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              并行工作流：先写死子任务，再 fan-out 一起做，最后 fan-in 汇总
            </text>

            <rect
              x={TASK_X}
              y={TASK_Y}
              width={TASK_W}
              height={TASK_H}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.4"
            />
            <text
              x={VIEW_W / 2}
              y={TASK_Y + 24}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              任务：为商品页同时补齐多类信息
            </text>
            <text
              x={VIEW_W / 2}
              y={TASK_Y + 44}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              先列清哪些子任务可以同时做
            </text>

            <line
              x1={VIEW_W / 2}
              y1={TASK_Y + TASK_H}
              x2={FAN_CX}
              y2={FAN_CY - 18}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#pwd-arrow)"
            />
            <rect
              x={FAN_CX - 84}
              y={FAN_CY - 18}
              width={168}
              height={36}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.2"
            />
            <text
              x={FAN_CX}
              y={FAN_CY + 4}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              fan-out：预先写死的并行子任务
            </text>

            {WORKERS.map((worker, index) => {
              const x = WORKER_XS[index];
              const centerX = x + WORKER_W / 2;
              return (
                <g key={worker.title}>
                  <line
                    x1={FAN_CX}
                    y1={FAN_CY + 18}
                    x2={centerX}
                    y2={WORKER_Y - 8}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.6"
                    markerEnd="url(#pwd-arrow)"
                  />
                  <rect
                    x={x}
                    y={WORKER_Y}
                    width={WORKER_W}
                    height={WORKER_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                    strokeWidth="1.2"
                  />
                  <rect
                    x={x + 12}
                    y={WORKER_Y + 12}
                    width={72}
                    height={20}
                    rx={CHIP_RADIUS}
                    fill={worker.tone}
                    fillOpacity="0.14"
                    stroke={worker.tone}
                  />
                  <text
                    x={x + 20}
                    y={WORKER_Y + 26}
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={worker.tone}
                  >
                    {worker.title}
                  </text>
                  <text
                    x={centerX}
                    y={WORKER_Y + 48}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {worker.body1}
                  </text>
                  <text
                    x={centerX}
                    y={WORKER_Y + 66}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {worker.body2}
                  </text>
                  <line
                    x1={centerX}
                    y1={WORKER_Y + WORKER_H}
                    x2={VIEW_W / 2}
                    y2={MERGE_Y - 8}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.6"
                    markerEnd="url(#pwd-arrow)"
                  />
                </g>
              );
            })}

            <rect
              x={MERGE_X}
              y={MERGE_Y}
              width={MERGE_W}
              height={MERGE_H}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={MERGE_Y + 22}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              fan-in：把并行结果统一收口成最终答案
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}

export const ParallelWorkflowDiagram = ParallelizationWorkflowDiagram;
