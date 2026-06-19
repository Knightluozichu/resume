/**
 * <FewShotDiagram>：零样本 vs 少样本两栏对比（HEL-303，第 5 章）。
 *
 * 一张静态 SVG，两栏等宽：
 *   左栏「零样本（0-shot）」：只给任务、不给例子 —— 模型只能瞎猜格式，输出跑偏；
 *   右栏「少样本（few-shot）」：先塞两个「输入 → 输出」范例，模型照着学 —— 输出对版。
 * 每栏自上而下三段：① 喂进去的提示梗概 ② 模型看到后怎么办 ③ 实际输出（成败用语义色）。
 * 让读者一眼看清：给几个例子，比用一堆话去描述格式更管用。
 *
 * 两栏用单一 x 公式 colX(i)，等宽零重叠；栏内三段用单一 y 公式 segY(s)。
 *
 * 纯展示 Server 组件（无交互）。配色全部走 DESIGN token（无裸 hex）；
 * 几何常量具名、为 4 的倍数（硬规则 5）。几何自检：两栏零重叠、文字落自己栏内、
 * 四周留白 ≥ 12px、字号 ≥ 10px。
 */

// —— 整体画布。 ——
const VIEW_W = 700;
const VIEW_H = 380;

// —— 标题区。 ——
const TITLE_Y = 28;

// —— 两栏等宽布局（单一 x 公式）。 ——
const COL_MARGIN = 24;
const COL_W = 314;
const COL_GAP = 24;
/** 第 i 栏左上角 x（单一公式，禁双算法）。右边界 = 24 + 314 + 24 + 314 = 676 → 右留白 24。 */
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// —— 栏外框。 ——
const COL_Y = 48;
const COL_H = 304;

// —— 栏内三段（单一 y 公式）。 ——
const SEG_Y0 = COL_Y + 56; // 第 0 段顶（给标题让空间）
const SEG_H = 72;
const SEG_GAP = 12;
/** 第 s 段左上角 y（单一公式）。 */
const segY = (s: number) => SEG_Y0 + s * (SEG_H + SEG_GAP);

// 三段的左侧小标签（两栏共用）。
const SEG_LABELS = ["喂进去的提示", "模型怎么办", "实际输出"] as const;

type Col = {
  /** 栏标题 */
  title: string;
  /** 标题下定性标签 */
  tag: string;
  /** 三段内容，顺序对齐 SEG_LABELS */
  values: readonly [string, string, string];
  /** 最后一段（输出）成功还是失败，决定该段用语义色 */
  ok: boolean;
  /** 整栏是否高亮强调（few-shot 那栏） */
  highlight: boolean;
};

const COLS: readonly Col[] = [
  {
    title: "🎲 零样本（0-shot）",
    tag: "只给任务，不给例子",
    values: [
      "「把这句情绪分类」",
      "没见过你要的格式，只能瞎猜",
      "「这句话好像挺正面的吧？」",
    ],
    ok: false,
    highlight: false,
  },
  {
    title: "🎯 少样本（few-shot）",
    tag: "先给 2 个范例，再让它做",
    values: [
      "「真香→正面 / 退钱→负面。这句呢」",
      "照着范例的格式套上去",
      "「负面」",
    ],
    ok: true,
    highlight: true,
  },
];

export function FewShotDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="零样本和少样本的两栏对比图，左右等宽，任务都是「把一句话做情绪分类」。左栏零样本：只给任务、不给例子。喂进去的提示是「把这句情绪分类」；模型没见过你要的格式，只能瞎猜；实际输出是「这句话好像挺正面的吧？」——又啰嗦又没按格式，算失败。右栏少样本（高亮强调）：先给两个范例再让它做。喂进去的提示是「真香对应正面、退钱对应负面，这句呢」；模型照着范例的格式套上去；实际输出是干脆的一个词「负面」，算成功。核心结论：复杂的格式与口径，用一堆话去描述往往说不清，不如直接给模型一两个「输入到输出」的范例让它照着学——这就是少样本的威力。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* —— 标题 —— */}
          <text
            x={VIEW_W / 2}
            y={TITLE_Y}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            同一个任务：不给例子 vs 给两个例子
          </text>

          {COLS.map((col, ci) => {
            const cx = colX(ci) + COL_W / 2;
            const stroke = col.highlight ? "var(--accent)" : "var(--border)";
            return (
              <g key={col.title}>
                {/* 栏外框 */}
                <rect
                  x={colX(ci)}
                  y={COL_Y}
                  width={COL_W}
                  height={COL_H}
                  rx="12"
                  fill={col.highlight ? "var(--accent-glow)" : "var(--bg)"}
                  stroke={stroke}
                  strokeWidth={col.highlight ? 2 : 1.4}
                />
                {/* 栏标题 + 标签 */}
                <text
                  x={cx}
                  y={COL_Y + 26}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={col.highlight ? "var(--accent)" : "var(--text-primary)"}
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

                {/* 三段：小标签 + 内容（单一 y 公式） */}
                {SEG_LABELS.map((sl, si) => {
                  const y = segY(si);
                  const isOutput = si === SEG_LABELS.length - 1;
                  const outColor = col.ok ? "var(--success)" : "var(--danger)";
                  return (
                    <g key={`${col.title}-s${si}`}>
                      <rect
                        x={colX(ci) + 14}
                        y={y}
                        width={COL_W - 28}
                        height={SEG_H}
                        rx="6"
                        fill="var(--bg-elevated)"
                        stroke={isOutput ? outColor : "var(--border)"}
                        strokeWidth={isOutput ? 1.6 : 1}
                      />
                      <text
                        x={colX(ci) + 26}
                        y={y + 22}
                        fontSize="10"
                        fontWeight="700"
                        fill={isOutput ? outColor : "var(--text-secondary)"}
                      >
                        {isOutput ? (col.ok ? "✓ " : "✗ ") + sl : sl}
                      </text>
                      <text
                        x={colX(ci) + 26}
                        y={y + 48}
                        fontSize="11"
                        fontFamily="var(--font-mono)"
                        fill="var(--text-primary)"
                      >
                        {col.values[si]}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        复杂的格式与口径，与其用一堆话去描述，不如直接给模型一两个「输入→输出」的范例让它照着学——这就是少样本（few-shot）。
      </figcaption>
    </figure>
  );
}
