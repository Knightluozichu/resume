import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 332;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const PANEL_W = 208;
const PANEL_H = 212;
const PANEL_Y = 76;
const PANEL_XS = [24, 256, 488] as const;

const PANELS = [
  {
    title: "该链式，却硬先分类",
    tone: "var(--warning)",
    symptom1: "每份输入本来都要过同样四步",
    symptom2: "却先多加一道分类，白白变慢",
    fix: "删掉多余分流，直接排同一条线",
  },
  {
    title: "该路由，却全塞一条长链",
    tone: "var(--accent)",
    symptom1: "退款 / 技术 / FAQ 共用一条超长链",
    symptom2: "简单请求也得走一堆无关步骤",
    fix: "先分诊，再把每类送进专线",
  },
  {
    title: "其实已超出工作流边界",
    tone: "var(--danger)",
    symptom1: "类别列不全，分支也写不完",
    symptom2: "一遇到新情况就无路可走",
    fix: "停下继续堆分支，回去评估 agent",
  },
] as const;

export function ChainRoutingTrapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="链式与路由三种典型翻车现场。左栏表示本该用链式却硬先分类：所有输入本来都要过同样四步，却被多加一道分类，白白变慢。中栏表示本该用路由却把退款、技术和 FAQ 全塞进一条超长链，简单请求也得走一堆无关步骤。右栏表示其实已经超出工作流边界：类别列不全，分支也写不完，一遇到新情况就无路可走，应该回去评估 agent。每栏底部都给出对应修法。"
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
              三种最常见的翻车现场
            </text>

            {PANELS.map((panel, index) => {
              const x = PANEL_XS[index];
              return (
                <g key={panel.title}>
                  <rect
                    x={x}
                    y={PANEL_Y}
                    width={PANEL_W}
                    height={PANEL_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                  />
                  <rect
                    x={x + 12}
                    y={PANEL_Y + 12}
                    width={112}
                    height={20}
                    rx={CHIP_RADIUS}
                    fill={panel.tone}
                    fillOpacity="0.14"
                    stroke={panel.tone}
                  />
                  <text
                    x={x + 20}
                    y={PANEL_Y + 26}
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={panel.tone}
                  >
                    翻车模式
                  </text>

                  <text
                    x={x + 18}
                    y={PANEL_Y + 56}
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--text-primary)"
                  >
                    {panel.title}
                  </text>

                  <line
                    x1={x + 18}
                    y1={PANEL_Y + 74}
                    x2={x + PANEL_W - 18}
                    y2={PANEL_Y + 74}
                    stroke="var(--border)"
                  />

                  <text
                    x={x + 18}
                    y={PANEL_Y + 108}
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {panel.symptom1}
                  </text>
                  <text
                    x={x + 18}
                    y={PANEL_Y + 130}
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {panel.symptom2}
                  </text>

                  <circle
                    cx={x + 26}
                    cy={PANEL_Y + 164}
                    r={8}
                    fill={panel.tone}
                    fillOpacity="0.18"
                    stroke={panel.tone}
                  />
                  <text
                    x={x + 44}
                    y={PANEL_Y + 168}
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    修法
                  </text>
                  <text
                    x={x + 18}
                    y={PANEL_Y + 194}
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
