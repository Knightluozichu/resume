/**
 * <ParallelOrchestrationTrapDiagram>：并行 / 编排-工作者的三类高频翻车现场（HEL-326，Ch13）。
 *
 * 1. 有依赖的步骤硬并行。
 * 2. 固定三块活却硬上编排者。
 * 3. worker 分工含糊，导致重复劳动。
 *
 * 纯展示 Server 组件。配色全部走 DESIGN token；几何常量具名且为 4 的倍数。
 */

import {
  PatternDiagramViewport,
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 432;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CONTROL_RADIUS = PATTERN_RADIUS_CONTROL;

const TITLE_Y = 28;
const COL_W = 216;
const COL_H = 330;
const COL_GAP = 12;
const COL_X = 24;
const COL_Y = 60;

const SCENARIO_W = 172;
const SCENARIO_H = 54;
const SCENARIO_Y = COL_Y + 42;

const WRONG_W = 180;
const WRONG_H = 72;
const WRONG_Y = COL_Y + 130;

const CHIP_W = 148;
const CHIP_H = 28;
const CHIP_GAP = 10;
const CHIP_Y = COL_Y + 224;

const FIX_W = 176;
const FIX_H = 42;
const FIX_Y = COL_Y + 274;

const colLeft = (i: number) => COL_X + i * (COL_W + COL_GAP);
const colCenter = (i: number) => colLeft(i) + COL_W / 2;
const scenarioX = (i: number) => colLeft(i) + (COL_W - SCENARIO_W) / 2;
const wrongX = (i: number) => colLeft(i) + (COL_W - WRONG_W) / 2;
const chipX = (i: number) => colLeft(i) + (COL_W - CHIP_W) / 2;
const fixX = (i: number) => colLeft(i) + (COL_W - FIX_W) / 2;

type TrapPanel = {
  title: string;
  scenario: string;
  wrong: string;
  wrongSub: string;
  chips: readonly string[];
  fix: string;
};

const PANELS: readonly TrapPanel[] = [
  {
    title: "有依赖却硬并行",
    scenario: "先拿目录，再查正文",
    wrong: "两步同时发出去",
    wrongSub: "后一步其实要吃前一步结果，只会白跑或返工",
    chips: ["顺序被打乱", "结果空转"],
    fix: "改法：先串行排依赖，再并行独立部分",
  },
  {
    title: "固定三块活硬上编排者",
    scenario: "每次都固定查 A / B / C",
    wrong: "还让编排者先思考再分派",
    wrongSub: "本来可直接写死 fan-out，却多加一层调度开销",
    chips: ["更慢", "更贵"],
    fix: "改法：直接并行 fan-out，不必先编排",
  },
  {
    title: "worker 分工含糊",
    scenario: "都只说“去查市场”",
    wrong: "每个 worker 查了差不多的东西",
    wrongSub: "没有边界，结果重复劳动，汇总也难收口",
    chips: ["重复劳动", "汇总混乱"],
    fix: "改法：把每个 worker 的职责写具体",
  },
] as const;

export function ParallelOrchestrationTrapDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="并行与编排-工作者的三类翻车现场。第一栏是有依赖的步骤硬并行，例如先拿目录再查正文却同时发出去，后一步其实依赖前一步结果，只会白跑。第二栏是固定三块活却硬上编排者，本来每次都固定查 A、B、C，直接 fan-out 就够，却多加一层编排思考，导致更慢更贵。第三栏是 worker 分工含糊，大家都只收到模糊的查市场任务，于是重复劳动、汇总混乱。整张图强调：错误通常来自依赖关系没理清、结构已经固定却还过度调度，或分工边界没有写清。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="potd-arrow"
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
              y={TITLE_Y}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight="700"
              fill="var(--text-primary)"
            >
              这章最常见的 3 个翻车现场
            </text>

            {PANELS.map((panel, index) => {
              const center = colCenter(index);
              return (
                <g key={panel.title}>
                  <rect
                    x={colLeft(index)}
                    y={COL_Y}
                    width={COL_W}
                    height={COL_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                  />
                  <text
                    x={center}
                    y={COL_Y + 26}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--text-primary)"
                  >
                    {panel.title}
                  </text>

                  <rect
                    x={scenarioX(index)}
                    y={SCENARIO_Y}
                    width={SCENARIO_W}
                    height={SCENARIO_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg-elevated)"
                    stroke="var(--accent)"
                  />
                  <text
                    x={center}
                    y={SCENARIO_Y + 22}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--accent)"
                  >
                    场景
                  </text>
                  <text
                    x={center}
                    y={SCENARIO_Y + 40}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {panel.scenario}
                  </text>

                  <line
                    x1={center}
                    y1={SCENARIO_Y + SCENARIO_H + 8}
                    x2={center}
                    y2={WRONG_Y - 8}
                    stroke="var(--danger)"
                    strokeWidth="1.6"
                    markerEnd="url(#potd-arrow)"
                  />

                  <rect
                    x={wrongX(index)}
                    y={WRONG_Y}
                    width={WRONG_W}
                    height={WRONG_H}
                    rx={CARD_RADIUS}
                    fill="var(--danger)"
                    opacity="0.12"
                  />
                  <rect
                    x={wrongX(index)}
                    y={WRONG_Y}
                    width={WRONG_W}
                    height={WRONG_H}
                    rx={CARD_RADIUS}
                    fill="none"
                    stroke="var(--danger)"
                    strokeWidth="1.6"
                    strokeDasharray="5 4"
                  />
                  <text
                    x={center}
                    y={WRONG_Y + 24}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--danger)"
                  >
                    ✗ {panel.wrong}
                  </text>
                  <text
                    x={center}
                    y={WRONG_Y + 46}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {panel.wrongSub}
                  </text>

                  {panel.chips.map((chip, chipIndex) => (
                    <g key={chip}>
                      <rect
                        x={chipX(index)}
                        y={CHIP_Y + chipIndex * (CHIP_H + CHIP_GAP)}
                        width={CHIP_W}
                        height={CHIP_H}
                        rx={CONTROL_RADIUS}
                        fill="var(--bg-elevated)"
                        stroke="var(--danger)"
                      />
                      <text
                        x={center}
                        y={CHIP_Y + chipIndex * (CHIP_H + CHIP_GAP) + 18}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fill="var(--danger)"
                      >
                        {chip}
                      </text>
                    </g>
                  ))}

                  <rect
                    x={fixX(index)}
                    y={FIX_Y}
                    width={FIX_W}
                    height={FIX_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg-elevated)"
                    stroke="var(--success)"
                  />
                  <text
                    x={center}
                    y={FIX_Y + 18}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--success)"
                  >
                    修法
                  </text>
                  <text
                    x={center}
                    y={FIX_Y + 34}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {panel.fix}
                  </text>
                </g>
              );
            })}
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}

export const ParallelOrchestratorTrapDiagram = ParallelOrchestrationTrapDiagram;
