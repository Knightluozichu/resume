/**
 * <StructuredVsFreeformDiagram>：为什么要结构化输出——自由文本 vs 结构化 JSON 两栏对比（HEL-309，第 7 章）。
 *
 * 一张静态 SVG，两栏等宽：左栏「自由文本」= agent 下游靠正则去抠字段，格式一变就崩；
 * 右栏「结构化 JSON」= 直接 json.loads 解析，稳。每栏顶部一个小示意（模型输出 → 处理后），
 * 下面按同样三行对照：模型吐出什么 · 下游怎么取 · 可靠吗。让读者一眼看清「为什么要结构化」。
 *
 * 两栏用「单一 x 公式」colX(i) 排布、等宽，禁双算法（svg-diagram-quality 硬规则）；
 * 行也用「单一 y 公式」rowY(r) 排布。
 *
 * 纯展示 Server 组件（无交互）。配色全部走 DESIGN token（无裸 hex）；几何常量具名、
 * 为 4 的倍数（硬规则 5）。几何自检：两栏零重叠、文字落自己栏内、四周留白 ≥ 12px、
 * 字号 ≥ 10px、viewBox 利用率适中。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 420;

// —— 两栏等宽布局（单一 x 公式）。右边界 = 20 + 356 + 324 = 700 → 右留白 20，左留白 20。 ——
const COL_W = 324;
const COL_GAP = 32;
const COL_MARGIN = 20;
/** 第 i 栏左上角 x（单一公式，禁双算法）。 */
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// —— 栏外框。 ——
const COL_Y = 48;
const COL_H = 348; // 底边 = 48 + 348 = 396 → 底留白 24

// —— 栏顶示意区（模型输出块 → 箭头 → 处理后块）。 ——
const MINI_Y = COL_Y + 56;
const MINI_H = 44;

// —— 栏内对照行（单一 y 公式）。 ——
const ROW_TOP = COL_Y + 168;
const ROW_STEP = 56;
/** 第 r 行的基准 y。 */
const rowY = (r: number) => ROW_TOP + r * ROW_STEP;

// 三行对照项的左侧标签（两栏共用）。
const ROW_LABELS = ["模型吐出什么", "下游怎么取", "可靠吗"] as const;

type Col = {
  /** 栏标题 */
  title: string;
  /** 标题下定性标签 */
  tag: string;
  /** 顶部示意：处理后那块的文字（模型输出块文字固定为「模型输出」） */
  afterText: string;
  /** 处理后那块的语义色 */
  color: string;
  /** 处理后块是否画虚线框（自由文本一栏标「易碎」） */
  dashed: boolean;
  /** 三行内容，顺序对齐 ROW_LABELS */
  values: readonly [string, string, string];
};

const COLS: readonly Col[] = [
  {
    title: "😵 自由文本",
    tag: "一段给人读的话",
    afterText: "正则去抠",
    color: "var(--danger)",
    dashed: true,
    values: [
      "「这单可以退，原因是还在 7 天内」一段话",
      "写正则 / 切字符串硬抠出「能否退」「理由」",
      "脆——模型换个措辞、多句话，正则就抠错或抠空",
    ],
  },
  {
    title: "🎯 结构化 JSON",
    tag: "机器能直接解析",
    afterText: "json.loads",
    color: "var(--success)",
    dashed: false,
    values: [
      '{"can_return": true, "reason": "7 天内"}',
      "一行 json.loads，按字段名直接拿值",
      "稳——字段固定、类型明确，下游照字段取就行",
    ],
  },
];

export function StructuredVsFreeformDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="为什么要结构化输出，自由文本和结构化 JSON 两栏对比图，左右等宽。左栏是自由文本，模型吐出的是一段给人读的话：顶部示意一块「模型输出」经箭头到「正则去抠」，用虚线框标它易碎。模型吐出什么：一段「这单可以退，原因是还在 7 天内」的自然语言。下游怎么取：只能写正则或切字符串，硬把「能否退」「理由」从话里抠出来。可靠吗：很脆，模型换个措辞、多写一句话，正则就抠错或抠空。右栏是结构化 JSON，机器能直接解析：顶部示意一块「模型输出」经箭头到「json.loads」。模型吐出什么：一段形如花括号 can_return 等于 true、reason 等于 7 天内的 JSON。下游怎么取：一行 json.loads 解析后，按字段名直接拿值。可靠吗：很稳，字段固定、类型明确，下游照字段取就行。核心区别：自由文本要靠正则去抠、格式一变就崩，结构化 JSON 能被机器直接解析、稳。agent 的下游全是程序在消费输出，所以要让模型吐出结构化结果。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 标题行 —— */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            下游是程序在消费：自由文本 vs 结构化 JSON
          </text>

          {COLS.map((col, ci) => {
            const cx = colX(ci) + COL_W / 2;
            const x = colX(ci);
            return (
              <g key={col.title}>
                {/* 栏外框 */}
                <rect
                  x={x}
                  y={COL_Y}
                  width={COL_W}
                  height={COL_H}
                  rx="12"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                {/* 栏标题 + 标签 */}
                <text
                  x={cx}
                  y={COL_Y + 26}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.title}
                </text>
                <text
                  x={cx}
                  y={COL_Y + 44}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {col.tag}
                </text>

                {/* —— 顶部示意：模型输出块 → 箭头 → 处理后块 —— */}
                <rect
                  x={x + 24}
                  y={MINI_Y}
                  width={104}
                  height={MINI_H}
                  rx="6"
                  fill="var(--accent)"
                  opacity="0.18"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
                <text
                  x={x + 24 + 52}
                  y={MINI_Y + MINI_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  模型输出
                </text>
                {/* 箭头 */}
                <line
                  x1={x + 140}
                  y1={MINI_Y + MINI_H / 2}
                  x2={x + 188}
                  y2={MINI_Y + MINI_H / 2}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.6"
                />
                <path
                  d={`M ${x + 188} ${MINI_Y + MINI_H / 2} l -8 -5 v 10 z`}
                  fill="var(--text-secondary)"
                />
                {/* 处理后块 */}
                <rect
                  x={x + 196}
                  y={MINI_Y}
                  width={104}
                  height={MINI_H}
                  rx="6"
                  fill={col.color}
                  opacity="0.18"
                  stroke={col.color}
                  strokeWidth="1.4"
                  strokeDasharray={col.dashed ? "4 3" : undefined}
                />
                <text
                  x={x + 196 + 52}
                  y={MINI_Y + MINI_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.afterText}
                </text>

                {/* —— 三行对照：左标签 + 右值（单一 y 公式）—— */}
                {ROW_LABELS.map((rl, ri) => (
                  <g key={`${col.title}-r${ri}`}>
                    <text
                      x={x + 20}
                      y={rowY(ri)}
                      textAnchor="start"
                      fontSize="11"
                      fontWeight="700"
                      fill="var(--text-secondary)"
                    >
                      {rl}
                    </text>
                    <text
                      x={x + 20}
                      y={rowY(ri) + 18}
                      textAnchor="start"
                      fontSize="11"
                      fontFamily={ri === 0 ? "var(--font-mono)" : undefined}
                      fill="var(--text-primary)"
                    >
                      {col.values[ri]}
                    </text>
                    {/* 行间细分隔线（最后一行不画） */}
                    {ri < ROW_LABELS.length - 1 && (
                      <line
                        x1={x + 16}
                        y1={rowY(ri) + 32}
                        x2={x + COL_W - 16}
                        y2={rowY(ri) + 32}
                        stroke="var(--border)"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    )}
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        agent
        的下游全是程序在消费输出：自由文本要靠正则去抠、格式一变就崩；结构化
        JSON 能被机器直接解析、字段固定，这才是可靠的拿法。
      </figcaption>
    </figure>
  );
}
