import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 416;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const PANEL_W = 320;
const PANEL_H = 312;
const PANEL_Y = 68;
const PANEL_XS = [32, 368] as const;

const LOOP_CX = 152;
const LOOP_CY = 178;
const LOOP_RX = 82;

type TrapPanel = {
  title: string;
  tone: string;
  scene: string;
  wrong: string;
  fix: string;
  x: number;
};

const PANELS: readonly TrapPanel[] = [
  {
    title: "没有环境反馈",
    tone: "var(--danger)",
    scene: "只让模型自评“我做得不错”",
    wrong: "自嗨循环",
    fix: "修法：每轮接测试、diff、API 响应或人工检查",
    x: PANEL_XS[0],
  },
  {
    title: "没有沙盒 / 停机",
    tone: "var(--warning)",
    scene: "给了写文件和发请求权限",
    wrong: "放权失控",
    fix: "修法：最小权限、预算上限、危险动作确认",
    x: PANEL_XS[1],
  },
] as const;

export function AutonomousAgentTrapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="自主智能体的两个翻车现场。第一种是没有环境反馈，agent 只靠模型自评反复循环，形成自嗨循环。第二种是没有沙盒或停机条件就放权，agent 可能持续写文件、发请求或扩大影响范围。图中给出修法：接入真实环境反馈，设置最小权限、预算上限和人工确认。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="aatrap-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
              </marker>
              <marker
                id="aatrap-ok"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
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
              自主智能体最危险的两个翻车现场
            </text>

            {PANELS.map((panel, index) => {
              const center = panel.x + PANEL_W / 2;
              return (
                <g key={panel.title}>
                  <rect
                    x={panel.x}
                    y={PANEL_Y}
                    width={PANEL_W}
                    height={PANEL_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                  />
                  <text
                    x={center}
                    y={PANEL_Y + 28}
                    textAnchor="middle"
                    fontSize={TITLE_SIZE}
                    fontWeight="700"
                    fill="var(--text-primary)"
                  >
                    {panel.title}
                  </text>

                  <rect
                    x={panel.x + 38}
                    y={PANEL_Y + 52}
                    width={244}
                    height={40}
                    rx={CHIP_RADIUS}
                    fill="var(--bg-elevated)"
                    stroke={panel.tone}
                  />
                  <text
                    x={center}
                    y={PANEL_Y + 77}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {panel.scene}
                  </text>

                  {index === 0 ? (
                    <g>
                      <path
                        d={`M ${panel.x + LOOP_CX - LOOP_RX} ${PANEL_Y + LOOP_CY} C ${panel.x + 48} ${PANEL_Y + 96}, ${panel.x + 272} ${PANEL_Y + 96}, ${panel.x + LOOP_CX + LOOP_RX} ${PANEL_Y + LOOP_CY}`}
                        fill="none"
                        stroke="var(--danger)"
                        strokeWidth="2"
                        markerEnd="url(#aatrap-arrow)"
                      />
                      <path
                        d={`M ${panel.x + LOOP_CX + LOOP_RX} ${PANEL_Y + LOOP_CY + 18} C ${panel.x + 272} ${PANEL_Y + 264}, ${panel.x + 48} ${PANEL_Y + 264}, ${panel.x + LOOP_CX - LOOP_RX} ${PANEL_Y + LOOP_CY + 18}`}
                        fill="none"
                        stroke="var(--danger)"
                        strokeWidth="2"
                        markerEnd="url(#aatrap-arrow)"
                      />
                      <rect
                        x={panel.x + 72}
                        y={PANEL_Y + 130}
                        width={176}
                        height={80}
                        rx={CARD_RADIUS}
                        fill="var(--danger)"
                        fillOpacity="0.1"
                        stroke="var(--danger)"
                        strokeDasharray="6 5"
                      />
                      <text
                        x={center}
                        y={PANEL_Y + 160}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fontWeight="700"
                        fill="var(--danger)"
                      >
                        模型想象的反馈
                      </text>
                      <text
                        x={center}
                        y={PANEL_Y + 184}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fill="var(--text-primary)"
                      >
                        “看起来已经完成”
                      </text>
                    </g>
                  ) : (
                    <g>
                      <line
                        x1={panel.x + 74}
                        y1={PANEL_Y + 134}
                        x2={panel.x + 246}
                        y2={PANEL_Y + 134}
                        stroke="var(--danger)"
                        strokeWidth="2"
                        markerEnd="url(#aatrap-arrow)"
                      />
                      <line
                        x1={panel.x + 74}
                        y1={PANEL_Y + 174}
                        x2={panel.x + 246}
                        y2={PANEL_Y + 174}
                        stroke="var(--danger)"
                        strokeWidth="2"
                        markerEnd="url(#aatrap-arrow)"
                      />
                      <line
                        x1={panel.x + 74}
                        y1={PANEL_Y + 214}
                        x2={panel.x + 246}
                        y2={PANEL_Y + 214}
                        stroke="var(--danger)"
                        strokeWidth="2"
                        markerEnd="url(#aatrap-arrow)"
                      />
                      <text
                        x={panel.x + 48}
                        y={PANEL_Y + 138}
                        fontSize={TEXT_SIZE}
                        fill="var(--text-primary)"
                      >
                        写文件
                      </text>
                      <text
                        x={panel.x + 48}
                        y={PANEL_Y + 178}
                        fontSize={TEXT_SIZE}
                        fill="var(--text-primary)"
                      >
                        发请求
                      </text>
                      <text
                        x={panel.x + 48}
                        y={PANEL_Y + 218}
                        fontSize={TEXT_SIZE}
                        fill="var(--text-primary)"
                      >
                        继续重试
                      </text>
                      <rect
                        x={panel.x + 246}
                        y={PANEL_Y + 114}
                        width={42}
                        height={120}
                        rx={CARD_RADIUS}
                        fill="var(--danger)"
                        fillOpacity="0.1"
                        stroke="var(--danger)"
                        strokeDasharray="6 5"
                      />
                      <text
                        x={panel.x + 267}
                        y={PANEL_Y + 178}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fontWeight="700"
                        fill="var(--danger)"
                      >
                        越界
                      </text>
                    </g>
                  )}

                  <rect
                    x={panel.x + 54}
                    y={PANEL_Y + 238}
                    width={212}
                    height={28}
                    rx={CHIP_RADIUS}
                    fill={panel.tone}
                    fillOpacity="0.12"
                    stroke={panel.tone}
                  />
                  <text
                    x={center}
                    y={PANEL_Y + 256}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={panel.tone}
                  >
                    ✗ {panel.wrong}
                  </text>
                  <rect
                    x={panel.x + 28}
                    y={PANEL_Y + 278}
                    width={264}
                    height={24}
                    rx={CHIP_RADIUS}
                    fill="var(--success)"
                    fillOpacity="0.1"
                    stroke="var(--success)"
                  />
                  <text
                    x={center}
                    y={PANEL_Y + 294}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--success)"
                  >
                    {panel.fix}
                  </text>
                </g>
              );
            })}

            <path
              d="M 312 360 C 336 392, 384 392, 408 360"
              fill="none"
              stroke="var(--success)"
              strokeWidth="2"
              markerEnd="url(#aatrap-ok)"
            />
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
