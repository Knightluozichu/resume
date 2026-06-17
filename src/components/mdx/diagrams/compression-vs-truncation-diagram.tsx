/**
 * <CompressionVsTruncationDiagram>：装满了怎么办——压缩 vs 裁剪 两栏对比（HEL-304，第 6 章）。
 *
 * 一张静态 SVG，两栏等宽：左栏「压缩」= 把最旧的几轮历史总结成一小段摘要塞回去；
 * 右栏「裁剪」= 直接把无关 / 最旧的内容丢掉。每栏顶部一个小示意（旧历史 → 处理后），
 * 下面按同样三行对照：怎么做 · 优点 · 缺点。让读者一眼看清两种省地方的策略各自的取舍。
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

// —— 两栏等宽布局（单一 x 公式）。 ——
// 右边界 = MARGIN + (COL_W+COL_GAP) + COL_W = 32 + 360 + 328 = 720 → 收紧到 712，右留白 ≥ 8 → 调小 COL_W。
const COL_W = 324;
const COL_GAP = 32;
const COL_MARGIN = 20;
/** 第 i 栏左上角 x（单一公式，禁双算法）。右边界 = 20 + 356 + 324 = 700 → 右留白 20。 */
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// —— 栏外框。 ——
const COL_Y = 48;
const COL_H = 348;

// —— 栏顶示意区（旧历史块 → 箭头 → 处理后块）。 ——
const MINI_Y = COL_Y + 56;
const MINI_H = 44;

// —— 栏内对照行（单一 y 公式）。 ——
const ROW_TOP = COL_Y + 168; // 第一行 y（给标题 + 示意区让空间）
const ROW_STEP = 56;
/** 第 r 行的基准 y（行内文字据此偏移）。 */
const rowY = (r: number) => ROW_TOP + r * ROW_STEP;

// 三行对照项的左侧标签（两栏共用）。
const ROW_LABELS = ["怎么做", "优点", "缺点"] as const;

type Col = {
  /** 栏标题 */
  title: string;
  /** 标题下定性标签 */
  tag: string;
  /** 顶部示意：处理后那块的文字（旧历史块文字固定为「旧历史」） */
  afterText: string;
  /** 处理后那块的语义色 */
  color: string;
  /** 三行内容，顺序对齐 ROW_LABELS */
  values: readonly [string, string, string];
};

const COLS: readonly Col[] = [
  {
    title: "🗜️ 压缩（summarization）",
    tag: "把老历史总结成一小段",
    afterText: "一句摘要",
    color: "var(--success)",
    values: [
      "把最旧的几轮交给 LLM 总结成一条短摘要，塞回去",
      "信息没全丢——要点还在，省下大半 token",
      "总结要多花一次模型调用；细节可能被概括掉",
    ],
  },
  {
    title: "✂️ 裁剪（truncation）",
    tag: "直接丢掉无关 / 最旧的",
    afterText: "（丢弃）",
    color: "var(--danger)",
    values: [
      "直接删掉最旧或与当前任务无关的几轮，不做处理",
      "零额外成本、最快——一删了事",
      "丢掉的内容彻底没了，删错了就找不回来",
    ],
  },
];

export function CompressionVsTruncationDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="装满了怎么办，压缩和裁剪两种省地方策略的两栏对比图，左右等宽。左栏是压缩，也叫 summarization，做法是把老历史总结成一小段：顶部示意一块「旧历史」经箭头变成「一句摘要」。怎么做：把最旧的几轮交给大模型总结成一条短摘要，再塞回上下文。优点：信息没有全丢，要点还在，能省下大半 token。缺点：总结本身要多花一次模型调用，而且细节可能被概括掉。右栏是裁剪，也叫 truncation，做法是直接丢掉无关或最旧的内容：顶部示意一块「旧历史」经箭头被直接丢弃。怎么做：直接删掉最旧或与当前任务无关的几轮，不做任何处理。优点：零额外成本、最快，一删了事。缺点：丢掉的内容彻底没了，删错了就找不回来。核心区别：压缩用一次额外的模型调用换来「信息不全丢」，裁剪用「彻底丢失」换来「零成本最快」。要点还有用就压缩，确实没用了就裁剪。"
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
            窗口快满了，两种腾地方的办法：压缩 vs 裁剪
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

                {/* —— 顶部示意：旧历史块 → 箭头 → 处理后块 —— */}
                <rect
                  x={x + 24}
                  y={MINI_Y}
                  width={104}
                  height={MINI_H}
                  rx="6"
                  fill="var(--info)"
                  opacity="0.2"
                  stroke="var(--info)"
                  strokeWidth="1.2"
                />
                <text
                  x={x + 24 + 52}
                  y={MINI_Y + MINI_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--info)"
                >
                  旧历史
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
                  opacity="0.2"
                  stroke={col.color}
                  strokeWidth="1.4"
                  strokeDasharray={ci === 1 ? "4 3" : undefined}
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
        压缩用一次额外模型调用换「信息不全丢」，裁剪用「彻底丢失」换「零成本最快」。要点还有用就压缩，确实没用了就裁剪。
      </figcaption>
    </figure>
  );
}
