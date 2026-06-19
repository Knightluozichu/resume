import {
  PATTERN_DIAGRAM_VIEW_W,
  PATTERN_FONT_TEXT,
  PATTERN_FONT_TITLE,
  PATTERN_RADIUS_CARD,
  PATTERN_RADIUS_CONTROL,
  PatternDiagramViewport,
} from "./agentic-pattern-diagram-shell";

const VIEW_W = PATTERN_DIAGRAM_VIEW_W;
const VIEW_H = 280;
const TITLE_SIZE = PATTERN_FONT_TITLE;
const TEXT_SIZE = PATTERN_FONT_TEXT;
const CARD_RADIUS = PATTERN_RADIUS_CARD;
const CHIP_RADIUS = PATTERN_RADIUS_CONTROL;

const CARD_W = 148;
const CARD_H = 96;
const CARD_Y = 92;
const CARD_GAP = 16;
const CARD_XS = [16, 180, 344, 508] as const;

const STEPS = [
  {
    title: "① OCR 转写",
    body1: "先把图片变文字",
    body2: "所有输入都必经",
    tone: "var(--accent)",
  },
  {
    title: "② 抽字段",
    body1: "提金额 / 日期 / 抬头",
    body2: "输出更结构化",
    tone: "var(--warning)",
  },
  {
    title: "③ Gate 检查",
    body1: "缺字段就拦下",
    body2: "不让错误传下去",
    tone: "var(--success)",
  },
  {
    title: "④ 填表输出",
    body1: "把检查后的结果",
    body2: "写进固定报销单",
    tone: "var(--accent)",
  },
] as const;

export function ChainingWorkflowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <PatternDiagramViewport>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label="链式工作流示意图。四张圆角卡片从左到右排成一条固定流水线：第一步 OCR 转写，先把图片变成文字；第二步抽字段，提取金额、日期、抬头等结构化信息；第三步 Gate 检查，发现缺字段或格式错误时在中途拦下；第四步填表输出，把检查后的结果写进固定报销单。四张卡之间用箭头直连，没有分叉，强调所有输入都走同一串固定工序。图底部还有一句总结：同一条流水线，所有输入都按顺序过完。"
            className="block h-auto w-[720px]"
          >
            <defs>
              <marker
                id="cwd-arrow"
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
              链式：所有输入都走同一串固定工序
            </text>

            <rect
              x={24}
              y={44}
              width={168}
              height={28}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={108}
              y={62}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fontWeight="700"
              fill="var(--accent)"
            >
              示例：发票报销流水线
            </text>

            {STEPS.map((step, index) => {
              const x = CARD_XS[index];
              const centerX = x + CARD_W / 2;
              const nextX = CARD_XS[index + 1];
              return (
                <g key={step.title}>
                  <rect
                    x={x}
                    y={CARD_Y}
                    width={CARD_W}
                    height={CARD_H}
                    rx={CARD_RADIUS}
                    fill="var(--bg)"
                    stroke="var(--border)"
                  />
                  <rect
                    x={x + 12}
                    y={CARD_Y + 12}
                    width={88}
                    height={20}
                    rx={CHIP_RADIUS}
                    fill={step.tone}
                    fillOpacity="0.14"
                    stroke={step.tone}
                  />
                  <text
                    x={x + 20}
                    y={CARD_Y + 26}
                    fontSize={TEXT_SIZE}
                    fontWeight="700"
                    fill={step.tone}
                  >
                    {step.title}
                  </text>
                  <text
                    x={centerX}
                    y={CARD_Y + 54}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-primary)"
                  >
                    {step.body1}
                  </text>
                  <text
                    x={centerX}
                    y={CARD_Y + 74}
                    textAnchor="middle"
                    fontSize={TEXT_SIZE}
                    fill="var(--text-secondary)"
                  >
                    {step.body2}
                  </text>

                  {nextX !== undefined && (
                    <g>
                      <line
                        x1={x + CARD_W}
                        y1={CARD_Y + CARD_H / 2}
                        x2={nextX - 8}
                        y2={CARD_Y + CARD_H / 2}
                        stroke="var(--text-secondary)"
                        strokeWidth="2"
                        markerEnd="url(#cwd-arrow)"
                      />
                      <text
                        x={(x + CARD_W + nextX - 8) / 2}
                        y={CARD_Y + CARD_H / 2 - 10}
                        textAnchor="middle"
                        fontSize={TEXT_SIZE}
                        fill="var(--text-secondary)"
                      >
                        前一步输出给后一步
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            <rect
              x={96}
              y={218}
              width={528}
              height={30}
              rx={CHIP_RADIUS}
              fill="var(--bg)"
              stroke="var(--border)"
            />
            <text
              x={VIEW_W / 2}
              y={237}
              textAnchor="middle"
              fontSize={TEXT_SIZE}
              fill="var(--text-secondary)"
            >
              关键特征：不管输入是什么，大家都按同一顺序把整条线走完
            </text>
          </svg>
        </PatternDiagramViewport>
      </div>
    </figure>
  );
}
