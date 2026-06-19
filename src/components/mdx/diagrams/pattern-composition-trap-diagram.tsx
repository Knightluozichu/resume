import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 452;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const PANEL_W = 208;
const PANEL_H = 292;
const PANEL_Y = 80;
const PANEL_XS = [28, 256, 484] as const;

type Trap = {
  title: string;
  wrong: string;
  scene1: string;
  scene2: string;
  fix: string;
  tone: string;
};

const TRAPS: readonly Trap[] = [
  {
    title: "无指标加复杂度",
    wrong: "“先加个 loop”",
    scene1: "没有 baseline",
    scene2: "也没有 pass 线",
    fix: "先定义 eval gate",
    tone: "var(--danger)",
  },
  {
    title: "框架遮住细节",
    wrong: "只看节点名",
    scene1: "prompt 不可见",
    scene2: "tool / response 混成黑盒",
    fix: "展开 in / out",
    tone: "var(--warning)",
  },
  {
    title: "mega-agent 吃所有任务",
    wrong: "一个 agent 全包",
    scene1: "路由、检索、评估都塞进去",
    scene2: "失败后无法定位",
    fix: "拆回小模式组合",
    tone: "var(--accent)",
  },
] as const;

export function PatternCompositionTrapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="模式组合的三种翻车图。第一种是没有指标就加复杂度，没有 baseline 也没有 pass 线，应先定义 eval gate。第二种是框架遮住 prompt、tool 和 response，只剩节点名，应展开每段输入输出。第三种是 mega-agent 吃掉所有任务，把路由、检索和评估都塞进一个 agent，失败后无法定位，应拆回小模式组合。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="pctd-cross"
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
              组合模式三种翻车：看不见指标、细节和边界
            </text>

            {TRAPS.map((trap, index) => {
              const x = PANEL_XS[index];
              const cx = x + PANEL_W / 2;
              return (
                <g key={trap.title}>
                  <rect
                    x={x}
                    y={PANEL_Y}
                    width={PANEL_W}
                    height={PANEL_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                  />
                  <text
                    x={cx}
                    y={PANEL_Y + 28}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={trap.tone}
                  >
                    {trap.title}
                  </text>
                  <rect
                    x={x + 20}
                    y={PANEL_Y + 48}
                    width={PANEL_W - 40}
                    height={36}
                    rx={CHIP_RADIUS}
                    fill={trap.tone}
                    fillOpacity="0.12"
                    stroke={trap.tone}
                  />
                  <text
                    x={cx}
                    y={PANEL_Y + 71}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {trap.wrong}
                  </text>

                  {index === 0 && (
                    <g>
                      <line
                        x1={x + 52}
                        y1={PANEL_Y + 126}
                        x2={x + 156}
                        y2={PANEL_Y + 126}
                        stroke="var(--danger)"
                        strokeWidth="2"
                        markerEnd="url(#pctd-cross)"
                      />
                      <text
                        x={x + 44}
                        y={PANEL_Y + 130}
                        fontSize={TEXT_SIZE}
                        fill="var(--text-secondary)"
                      >
                        v1
                      </text>
                      <text
                        x={x + 162}
                        y={PANEL_Y + 130}
                        fontSize={TEXT_SIZE}
                        fill="var(--text-secondary)"
                      >
                        v2
                      </text>
                      <text
                        x={cx}
                        y={PANEL_Y + 164}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fill="var(--text-primary)"
                      >
                        {trap.scene1}
                      </text>
                      <text
                        x={cx}
                        y={PANEL_Y + 184}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fill="var(--text-secondary)"
                      >
                        {trap.scene2}
                      </text>
                    </g>
                  )}

                  {index === 1 && (
                    <g>
                      <rect
                        x={x + 40}
                        y={PANEL_Y + 112}
                        width={128}
                        height={72}
                        rx={CARD_RADIUS}
                        fill="var(--bg-elevated)"
                        stroke="var(--warning)"
                      />
                      <text
                        x={cx}
                        y={PANEL_Y + 144}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fontWeight="700"
                        fill="var(--warning)"
                      >
                        framework node
                      </text>
                      <text
                        x={cx}
                        y={PANEL_Y + 164}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fill="var(--text-secondary)"
                      >
                        内部不可审计
                      </text>
                    </g>
                  )}

                  {index === 2 && (
                    <g>
                      <circle
                        cx={cx}
                        cy={PANEL_Y + 148}
                        r={52}
                        fill="var(--accent)"
                        fillOpacity="0.12"
                        stroke="var(--accent)"
                      />
                      <text
                        x={cx}
                        y={PANEL_Y + 144}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fontWeight="700"
                        fill="var(--accent)"
                      >
                        mega-agent
                      </text>
                      <text
                        x={cx}
                        y={PANEL_Y + 164}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fill="var(--text-secondary)"
                      >
                        什么都管
                      </text>
                    </g>
                  )}

                  <text
                    x={cx}
                    y={PANEL_Y + 210}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {index === 0 ? "复杂度涨了" : trap.scene1}
                  </text>
                  <text
                    x={cx}
                    y={PANEL_Y + 230}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {index === 0 ? "但没人知道是否更好" : trap.scene2}
                  </text>
                  <rect
                    x={x + 20}
                    y={PANEL_Y + PANEL_H - 42}
                    width={PANEL_W - 40}
                    height={24}
                    rx={CHIP_RADIUS}
                    fill="var(--success)"
                    fillOpacity="0.1"
                    stroke="var(--success)"
                  />
                  <text
                    x={cx}
                    y={PANEL_Y + PANEL_H - 25}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill="var(--success)"
                  >
                    {trap.fix}
                  </text>
                </g>
              );
            })}

            <rect
              x={88}
              y={396}
              width={544}
              height={32}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={417}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              防翻车口诀：先指标，再透明，再拆小；别让复杂度替你做设计决策
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
