/**
 * <MemoryTypesDiagram>：短期记忆 vs 长期记忆 两栏对比（HEL-291，第 2 章）。
 *
 * 一张静态 SVG，两栏等宽（左短期 / 右长期），每栏按同样三行对照：
 *   存什么 · 活多久 · 例子。让读者一眼看清两种记忆的边界，别把它们混为一谈。
 *
 * 两栏用「单一 x 公式」colX(i) 排布，等宽，禁止双算法（svg-diagram-quality 硬规则）。
 * 行也用「单一 y 公式」rowY(r) 排布。
 *
 * 纯展示 Server 组件（无交互）。配色全部走 DESIGN token（无裸 hex）；
 * 几何常量具名、为 4 的倍数（硬规则 5）。几何自检：两栏零重叠、文字落在自己栏内、
 * 四周留白 ≥ 12px、字号 ≥ 10px、viewBox 利用率适中。
 */

// —— 整体画布。 ——
const VIEW_W = 640;
const VIEW_H = 312;

// —— 两栏等宽布局（单一 x 公式）。 ——
// 右边界 = MARGIN + (COL_W+COL_GAP) + COL_W = 32 + 312 + 280 = 624 → 左右留白各 ≥16。
const COL_W = 280;
const COL_GAP = 32;
const COL_MARGIN = 32;
/** 第 i 栏左上角 x（单一公式，禁双算法）。 */
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// —— 栏外框。 ——
const COL_Y = 52;
const COL_H = 232;

// —— 栏内对照行（单一 y 公式）。 ——
const ROW_TOP = COL_Y + 64; // 第一行 y（给标题让空间）
const ROW_STEP = 52;
/** 第 r 行的基准 y（行内文字据此偏移）。 */
const rowY = (r: number) => ROW_TOP + r * ROW_STEP;

// 三行对照项的左侧标签（两栏共用）。
const ROW_LABELS = ["存什么", "活多久", "例子"] as const;

type Col = {
  /** 栏标题 */
  title: string;
  /** 标题下定性标签 */
  tag: string;
  /** 三行内容，顺序对齐 ROW_LABELS */
  values: readonly [string, string, string];
  /** 是否高亮强调。 */
  highlight: boolean;
};

const COLS: readonly Col[] = [
  {
    title: "⏱️ 短期记忆",
    tag: "上下文窗口内 · 单次会话",
    values: ["本轮对话 / 工具结果", "会话结束就忘", "「你刚说怕冷」"],
    highlight: false,
  },
  {
    title: "🗄️ 长期记忆",
    tag: "写进外部存储 · 跨会话",
    values: ["写进数据库 / 向量库", "下次来还记得", "「这位 VIP 上月退过货」"],
    highlight: true,
  },
];

export function MemoryTypesDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="短期记忆和长期记忆的两栏对比图，左右等宽。左栏是短期记忆，特点是只活在上下文窗口内、单次会话里：存的是本轮对话和工具结果，会话一结束就忘，例子是「你刚说怕冷」。右栏是长期记忆（高亮强调），特点是写进外部存储、能跨会话：存的是写进数据库或向量库的信息，下次再来还记得，例子是「这位 VIP 上月退过货」。两栏按同样的三行对照：存什么、活多久、例子。核心区别：短期记忆关掉会话就忘，长期记忆要专门写进外部存储才能跨会话保留——别把两者混为一谈，更别把所有历史一股脑塞进上下文当短期记忆用。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 标题行 */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            两种记忆：关掉就忘的 vs 跨会话还记得的
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
                  y={COL_Y + 28}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={col.highlight ? "var(--accent)" : "var(--text-primary)"}
                >
                  {col.title}
                </text>
                <text
                  x={cx}
                  y={COL_Y + 48}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {col.tag}
                </text>

                {/* 三行对照：左标签 + 右值（单一 y 公式） */}
                {ROW_LABELS.map((rl, ri) => (
                  <g key={`${col.title}-r${ri}`}>
                    <text
                      x={colX(ci) + 20}
                      y={rowY(ri)}
                      textAnchor="start"
                      fontSize="11"
                      fontWeight="700"
                      fill="var(--text-secondary)"
                    >
                      {rl}
                    </text>
                    <text
                      x={colX(ci) + COL_W - 20}
                      y={rowY(ri)}
                      textAnchor="end"
                      fontSize="11"
                      fill="var(--text-primary)"
                    >
                      {col.values[ri]}
                    </text>
                    {/* 行间细分隔线（最后一行不画） */}
                    {ri < ROW_LABELS.length - 1 && (
                      <line
                        x1={colX(ci) + 16}
                        y1={rowY(ri) + 16}
                        x2={colX(ci) + COL_W - 16}
                        y2={rowY(ri) + 16}
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
        短期记忆活在上下文窗口里、关掉会话就忘；长期记忆要写进外部存储、跨会话还记得。两者各管一段，别混为一谈（篇 5 深讲）。
      </figcaption>
    </figure>
  );
}
