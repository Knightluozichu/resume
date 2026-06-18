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

const COL_W = 216;
const COL_H = 308;
const COL_GAP = 12;
const COL_X = 24;
const COL_Y = 72;

const SCENE_W = 176;
const SCENE_H = 56;
const SCENE_Y = COL_Y + 42;

const DAMAGE_W = 180;
const DAMAGE_H = 78;
const DAMAGE_Y = COL_Y + 130;

const FIX_W = 180;
const FIX_H = 52;
const FIX_Y = COL_Y + 236;

const colLeft = (index: number) => COL_X + index * (COL_W + COL_GAP);
const colCenter = (index: number) => colLeft(index) + COL_W / 2;
const sceneX = (index: number) => colLeft(index) + (COL_W - SCENE_W) / 2;
const damageX = (index: number) => colLeft(index) + (COL_W - DAMAGE_W) / 2;
const fixX = (index: number) => colLeft(index) + (COL_W - FIX_W) / 2;

type TrapPanel = {
  title: string;
  tone: string;
  scene: string;
  wrong: string;
  wrongSub: string;
  fix: string;
};

const PANELS: readonly TrapPanel[] = [
  {
    title: "标准太虚",
    tone: "var(--warning)",
    scene: "“再自然一点”",
    wrong: "反馈越改越漂",
    wrongSub: "rubric 不是检查项，只像审美评价",
    fix: "改法：把标准改写成可检查项，例如事实、术语、语气、范围",
  },
  {
    title: "缺事实也硬进循环",
    tone: "var(--accent)",
    scene: "关键数字或范围没依据",
    wrong: "只会反复改文风",
    wrongSub: "没有新输入时，优化器只能围着旧错误打转",
    fix: "改法：先补检索、工具调用或程序校验，不要拿重写代替补事实",
  },
  {
    title: "没停止条件",
    tone: "var(--danger)",
    scene: "“再润一下”永远成立",
    wrong: "循环越跑越贵",
    wrongSub: "没有 pass 线和轮次上限，系统就不知道何时该停",
    fix: "改法：写死通过条件和 maxRounds，到上限就交当前最好版本或转人工",
  },
] as const;

export function EvaluatorOptimizerTrapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="评估-优化模式的三种典型翻车现场。第一栏是标准太虚，例如只说再自然一点，结果评估器给不出稳定分数和有效反馈。第二栏是缺事实也硬进循环，关键数字或范围没依据时，系统只会反复改文风，却补不出新事实。第三栏是没停止条件，每轮都还能继续润色，导致循环无限膨胀。"
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
              这章最常见的 3 个翻车现场
            </text>

            {PANELS.map((panel, index) => (
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
                  x={colCenter(index)}
                  y={COL_Y + 26}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {panel.title}
                </text>

                <rect
                  x={sceneX(index)}
                  y={SCENE_Y}
                  width={SCENE_W}
                  height={SCENE_H}
                  rx={CARD_RADIUS}
                  fill="var(--bg-elevated)"
                  stroke={panel.tone}
                />
                <text
                  x={colCenter(index)}
                  y={SCENE_Y + 22}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill={panel.tone}
                >
                  场景
                </text>
                <text
                  x={colCenter(index)}
                  y={SCENE_Y + 42}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fill="var(--text-primary)"
                >
                  {panel.scene}
                </text>

                <rect
                  x={damageX(index)}
                  y={DAMAGE_Y}
                  width={DAMAGE_W}
                  height={DAMAGE_H}
                  rx={CARD_RADIUS}
                  fill="var(--danger)"
                  fillOpacity="0.1"
                  stroke="var(--danger)"
                  strokeDasharray="5 4"
                />
                <text
                  x={colCenter(index)}
                  y={DAMAGE_Y + 26}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill="var(--danger)"
                >
                  ✗ {panel.wrong}
                </text>
                <text
                  x={colCenter(index)}
                  y={DAMAGE_Y + 48}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fill="var(--text-primary)"
                >
                  {panel.wrongSub}
                </text>

                <rect
                  x={fixX(index)}
                  y={FIX_Y}
                  width={FIX_W}
                  height={FIX_H}
                  rx={CHIP_RADIUS}
                  fill="var(--bg-elevated)"
                  stroke={panel.tone}
                />
                <text
                  x={colCenter(index)}
                  y={FIX_Y + 22}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fontWeight="700"
                  fill={panel.tone}
                >
                  修法
                </text>
                <text
                  x={colCenter(index)}
                  y={FIX_Y + 40}
                  textAnchor="middle"
                  fontSize={TEXT_SIZE}
                  fill="var(--text-primary)"
                >
                  {panel.fix}
                </text>
              </g>
            ))}
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
