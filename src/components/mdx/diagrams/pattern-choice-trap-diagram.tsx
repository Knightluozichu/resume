/**
 * <PatternChoiceTrapDiagram>：场景选错方案时会怎样（HEL-322，第 11 章误区图解）。
 *
 * 目标：把「固定任务硬上 agent」和「开放任务硬塞工作流」两种高频错配画成一眼能懂的翻车现场。
 * 左栏：固定规则审核报销，却硬做成自主 agent → 慢 / 贵 / 误判。
 * 右栏：开放运维诉求，却硬塞进写死流程 → 卡死 / 分支列不全 / 遇新情况停住。
 *
 * 纯展示 Server 组件。全部配色走 DESIGN token，无裸 hex；几何常量具名且为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 424;

const TITLE_Y = 28;
const COL_W = 328;
const COL_H = 328;
const COL_GAP = 16;
const COL_X = 24;
const COL_Y = 56;

const TASK_W = 208;
const TASK_H = 56;
const TASK_Y = COL_Y + 36;
const WRONG_W = 248;
const WRONG_H = 68;
const WRONG_Y = COL_Y + 132;
const FIX_W = 200;
const FIX_H = 40;
const FIX_Y = COL_Y + 256;

const chipX = [0, 84, 168] as const;
const CHIP_W = 68;
const CHIP_H = 28;
const CHIP_Y = COL_Y + 216;

const colLeft = (i: number) => COL_X + i * (COL_W + COL_GAP);
const colCenter = (i: number) => colLeft(i) + COL_W / 2;
const taskX = (i: number) => colLeft(i) + (COL_W - TASK_W) / 2;
const wrongX = (i: number) => colLeft(i) + (COL_W - WRONG_W) / 2;
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
    title: "固定任务硬上自主方案",
    scenario: "固定规则审报销",
    wrong: "硬做成自主循环",
    wrongSub: "本来能照表判，却让它每步自由发挥",
    chips: ["更慢", "更贵", "会误判"],
    fix: "本该：写死规则就收工",
  },
  {
    title: "开放任务硬塞死流程",
    scenario: "任意运维修复诉求",
    wrong: "硬塞进固定步骤",
    wrongSub: "本来要见招拆招，却只会按预设往下走",
    chips: ["卡死", "列不全", "遇新情况停"],
    fix: "本该：交给能临场拿主意的方案",
  },
];

export function PatternChoiceTrapDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="两种场景选错方案的翻车图。左栏是固定规则审核报销，本来只要按规则判断，却硬做成自主循环，结果出现更慢、更贵、会误判三个后果，正确做法是写死规则就收工。右栏是任意运维修复诉求，本来需要临场判断，却硬塞进固定步骤，结果出现卡死、分支列不全、遇到新情况就停的后果，正确做法是交给能临场拿主意的方案。整张图强调：选错方案时，错误不是抽象的，而会直接表现成延迟、成本和卡死。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="pctd-arrow"
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
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            选错方案时，翻车通常长这样
          </text>

          {PANELS.map((panel, index) => {
            const left = colLeft(index);
            const center = colCenter(index);
            return (
              <g key={panel.title}>
                <rect
                  x={left}
                  y={COL_Y}
                  width={COL_W}
                  height={COL_H}
                  rx="12"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={center}
                  y={COL_Y + 26}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {panel.title}
                </text>

                <rect
                  x={taskX(index)}
                  y={TASK_Y}
                  width={TASK_W}
                  height={TASK_H}
                  rx="10"
                  fill="var(--bg-elevated)"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                <text
                  x={center}
                  y={TASK_Y + 23}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  场景
                </text>
                <text
                  x={center}
                  y={TASK_Y + 41}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {panel.scenario}
                </text>

                <line
                  x1={center}
                  y1={TASK_Y + TASK_H + 8}
                  x2={center}
                  y2={WRONG_Y - 6}
                  stroke="var(--danger)"
                  strokeWidth="1.6"
                  markerEnd="url(#pctd-arrow)"
                />

                <rect
                  x={wrongX(index)}
                  y={WRONG_Y}
                  width={WRONG_W}
                  height={WRONG_H}
                  rx="12"
                  fill="var(--danger)"
                  opacity="0.12"
                />
                <rect
                  x={wrongX(index)}
                  y={WRONG_Y}
                  width={WRONG_W}
                  height={WRONG_H}
                  rx="12"
                  fill="none"
                  stroke="var(--danger)"
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                <text
                  x={center}
                  y={WRONG_Y + 24}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--danger)"
                >
                  ✗ {panel.wrong}
                </text>
                <text
                  x={center}
                  y={WRONG_Y + 46}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {panel.wrongSub}
                </text>

                {panel.chips.map((chip, chipIndex) => (
                  <g key={chip}>
                    <rect
                      x={left + 52 + chipX[chipIndex]}
                      y={CHIP_Y}
                      width={CHIP_W}
                      height={CHIP_H}
                      rx="8"
                      fill="var(--bg-elevated)"
                      stroke="var(--danger)"
                      strokeWidth="1.2"
                    />
                    <text
                      x={left + 52 + chipX[chipIndex] + CHIP_W / 2}
                      y={CHIP_Y + 18}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
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
                  rx="10"
                  fill="var(--success)"
                  opacity="0.12"
                />
                <rect
                  x={fixX(index)}
                  y={FIX_Y}
                  width={FIX_W}
                  height={FIX_H}
                  rx="10"
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="1.4"
                />
                <text
                  x={center}
                  y={FIX_Y + 25}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--success)"
                >
                  ✓ {panel.fix}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        两种错配都不是“概念上不优雅”而已，而是会直接变成肉眼可见的后果：固定任务硬上自主方案，会白白多出延迟、成本和误判；开放任务硬塞死流程，会当场卡死。
      </figcaption>
    </figure>
  );
}
