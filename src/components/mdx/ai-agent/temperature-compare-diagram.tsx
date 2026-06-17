/**
 * <AaTemperatureCompareDiagram>：低温 vs 高温 输出对照解剖图（HEL-294，采样与解码章）。
 *
 * 同一个 prompt（「写一句关于猫的话」），左栏低温（T 小·确定·死板照搬）、右栏高温
 * （T 大·发散·天马行空），各配一组「分布形状缩略」：低温分布陡（一根独大→几乎总挑它），
 * 高温分布平（头尾接近→挑谁都有可能）。一图说清「温度调低 = 稳但死板，调高 = 活但发散」。
 *
 * 布局（§四几何，无容器框圈内容——两栏各自独立、靠栏标题分组，不用大 rect 把整栏框住）：
 *   - 两栏 x 用单一对称公式：左栏 x=COL_LEFT、右栏 x=COL_LEFT+COL_W+COL_GAP；
 *   - 栏内迷你条形用单一公式 barX(j) 排，等宽等距、不溢出栏、文字 textAnchor=middle 居中；
 *   - 距 viewBox 边 ≥24px；字号 ≥10px；样例输出文字盒不与条形区重叠（纵向分区）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色（var(--accent) / --warning / --success / --border / --text-*），
 * 无裸 hex、无阴影。
 */

export function AaTemperatureCompareDiagram() {
  // —— 布局常量（viewBox 内坐标）——
  const VIEW_W = 760;
  const VIEW_H = 380;

  const COL_W = 340;
  const COL_GAP = 28;
  const COL_LEFT = 26; // 左栏左缘距 viewBox 边 26（≥24）
  const colX = (i: number) => COL_LEFT + i * (COL_W + COL_GAP);

  // 栏内分区（纵向）：栏头文字 → 迷你条形区 → 样例输出。
  const COL_TOP = 84;
  const BARS_TOP = COL_TOP + 44;
  const BARS_H = 96;
  const BARS_BASE = BARS_TOP + BARS_H;
  const OUT_TOP = BARS_BASE + 28; // 样例输出区顶

  type Col = {
    id: string;
    title: string;
    tag: string; // T 标签
    desc: string; // 一句话
    /** 迷你条形高度比例（示意分布形状）。 */
    bars: readonly number[];
    /** 三句示例输出（演示「死板照搬」vs「天马行空」）。 */
    outputs: readonly string[];
    color: string;
  };

  const NBARS = 6;
  const cols: readonly Col[] = [
    {
      id: "low",
      title: "低温 · 确定",
      tag: "T = 0.2",
      desc: "分布很陡：一根独大，几乎总挑它",
      bars: [1.0, 0.32, 0.14, 0.07, 0.04, 0.02],
      outputs: [
        "猫是一种可爱的动物。",
        "猫是一种可爱的动物。",
        "猫是一种可爱的小动物。",
      ],
      color: "var(--accent)",
    },
    {
      id: "high",
      title: "高温 · 发散",
      tag: "T = 1.5",
      desc: "分布很平：头尾接近，挑谁都有可能",
      bars: [0.66, 0.58, 0.5, 0.44, 0.38, 0.3],
      outputs: [
        "那只橘猫又在偷吃鱼干。",
        "猫的瞳孔里藏着一整片夜空。",
        "据说猫能看见风的形状。",
      ],
      color: "var(--warning)",
    },
  ];

  const barAreaW = COL_W - 24; // 条形区宽（栏内左右各留 12）
  const barGap = 8;
  const barW = (barAreaW - barGap * (NBARS - 1)) / NBARS;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="低温与高温输出对照图。同一个 prompt「写一句关于猫的话」，左栏是低温（T=0.2，确定）：概率分布很陡，一根条独大，模型几乎总挑同一个 token，输出稳定但死板，三次几乎都是「猫是一种可爱的动物」。右栏是高温（T=1.5，发散）：分布很平，各候选概率接近，模型挑谁都有可能，输出天马行空、各不相同，比如「那只橘猫又在偷吃鱼干」「猫的瞳孔里藏着一整片夜空」「据说猫能看见风的形状」。一句话：温度调低更稳但死板，调高更活但发散。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            同一个 prompt，温度调低 vs 调高
          </text>
          <text
            x={VIEW_W / 2}
            y="54"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            prompt：「写一句关于猫的话」 · 温度只改「挑 token 的随机度」，不改谁分高
          </text>

          {/* ===== 两栏（各自独立分组，无外层容器框）===== */}
          {cols.map((c, ci) => {
            const x = colX(ci);
            const cx = x + COL_W / 2;
            return (
              <g key={c.id}>
                {/* 栏头：标题 + T 标签 + 一句话 */}
                <text
                  x={cx}
                  y={COL_TOP}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {c.title}
                </text>
                <text
                  x={cx}
                  y={COL_TOP + 22}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={c.color}
                >
                  {c.tag} · {c.desc}
                </text>

                {/* 迷你条形基线 */}
                <line
                  x1={x + 12}
                  y1={BARS_BASE}
                  x2={x + 12 + barAreaW}
                  y2={BARS_BASE}
                  stroke="var(--border)"
                  strokeWidth="1"
                />

                {/* 迷你条形（单一公式 barX(j)，示意分布形状） */}
                {c.bars.map((bh, j) => {
                  const bx = x + 12 + j * (barW + barGap);
                  const barH = bh * BARS_H;
                  const by = BARS_BASE - barH;
                  return (
                    <rect
                      key={`bar-${c.id}-${j}`}
                      x={bx}
                      y={by}
                      width={barW}
                      height={barH}
                      rx="2"
                      fill={c.color}
                      fillOpacity={j === 0 ? 0.85 : 0.5}
                    />
                  );
                })}

                {/* 分布形状一句话（条形区下方） */}
                <text
                  x={cx}
                  y={BARS_BASE + 18}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {c.id === "low" ? "↑ 陡：基本只挑第一个" : "↑ 平：六个都可能被挑"}
                </text>

                {/* 样例输出（三句，纵向排，不与条形区重叠） */}
                <text
                  x={x + 12}
                  y={OUT_TOP}
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  三次输出：
                </text>
                {c.outputs.map((o, k) => (
                  <text
                    key={`out-${c.id}-${k}`}
                    x={x + 12}
                    y={OUT_TOP + 20 + k * 20}
                    fontSize="11"
                    fill="var(--text-secondary)"
                  >
                    {`· ${o}`}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        温度低，分布陡、模型死板照搬同一句；温度高，分布平、模型天马行空各不相同——但温度只改「挑 token
        的随机度」，不改「谁本来分高」。
      </figcaption>
    </figure>
  );
}
