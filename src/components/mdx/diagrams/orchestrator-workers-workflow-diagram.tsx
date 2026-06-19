/**
 * <OrchestratorWorkersWorkflowDiagram>：编排者先读任务，再动态拆活给 worker（HEL-326，Ch13）。
 *
 * 一张静态 SVG，说明编排-工作者不是把固定步骤并行化，而是让编排者先理解任务，
 * 再决定要派几个 worker、各自查什么、最后统一汇总。
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

const TITLE_Y = 28;

const TASK_X = 180;
const TASK_Y = 52;
const TASK_W = 360;
const TASK_H = 56;

const ORCH_X = 224;
const ORCH_Y = 132;
const ORCH_W = 272;
const ORCH_H = 64;

const WORKER_W = 184;
const WORKER_H = 76;
const WORKER_Y = 228;
const WORKER_XS = [24, 268, 512] as const;

const SUMMARY_X = 170;
const SUMMARY_Y = 326;
const SUMMARY_W = 380;
const SUMMARY_H = 28;

const WORKERS = [
  {
    title: "Worker A",
    body1: "查竞品价格",
    body2: "这次才被指派",
    tone: "var(--success)",
  },
  {
    title: "Worker B",
    body1: "查用户痛点",
    body2: "分工来自编排者判断",
    tone: "var(--accent)",
  },
  {
    title: "Worker C",
    body1: "查法规限制",
    body2: "数量与任务都可动态变",
    tone: "var(--warning)",
  },
] as const;

export function OrchestratorWorkersWorkflowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="编排者和工作者工作流示意图。顶部是一个复杂任务卡，表示需求先进入系统。中间是编排者卡片，它先读完整个任务，再判断要派几个 worker、每个 worker 各查什么。下方是三个被动态分配的 worker：一个查竞品价格，一个查用户痛点，一个查法规限制。重点不是固定三步，而是这些分工由编排者根据任务临时决定。最底部再统一回到汇总结论。核心结论是：当子任务不能预先列清时，需要先有一个编排者理解任务，再动态拆活和收口。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="owd-arrow"
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
              编排-工作者：先读任务，再决定派谁查什么
            </text>

            <rect
              x={TASK_X}
              y={TASK_Y}
              width={TASK_W}
              height={TASK_H}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={TASK_Y + 24}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              任务：为新品制定上市建议
            </text>
            <text
              x={VIEW_W / 2}
              y={TASK_Y + 44}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              先看完整需求，分工不一定事先写好
            </text>

            <line
              x1={VIEW_W / 2}
              y1={TASK_Y + TASK_H}
              x2={VIEW_W / 2}
              y2={ORCH_Y - 8}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#owd-arrow)"
            />

            <rect
              x={ORCH_X}
              y={ORCH_Y}
              width={ORCH_W}
              height={ORCH_H}
              rx={CARD_RADIUS}
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x={VIEW_W / 2}
              y={ORCH_Y + 24}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              Orchestrator：先理解任务，再动态拆活
            </text>
            <text
              x={VIEW_W / 2}
              y={ORCH_Y + 46}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              决定派几个 worker、每个查什么、最后怎么汇总
            </text>

            {WORKERS.map((worker, index) => {
              const x = WORKER_XS[index];
              const centerX = x + WORKER_W / 2;
              return (
                <g key={worker.title}>
                  <line
                    x1={VIEW_W / 2}
                    y1={ORCH_Y + ORCH_H}
                    x2={centerX}
                    y2={WORKER_Y - 8}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.6"
                    markerEnd="url(#owd-arrow)"
                  />
                  <rect
                    x={x}
                    y={WORKER_Y}
                    width={WORKER_W}
                    height={WORKER_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
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
                    y2={SUMMARY_Y - 6}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.6"
                    markerEnd="url(#owd-arrow)"
                  />
                </g>
              );
            })}

            <rect
              x={SUMMARY_X}
              y={SUMMARY_Y}
              width={SUMMARY_W}
              height={SUMMARY_H}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={SUMMARY_Y + 19}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              汇总：编排者收齐结果后统一生成结论
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}

export const OrchestratorWorkersDiagram = OrchestratorWorkersWorkflowDiagram;
