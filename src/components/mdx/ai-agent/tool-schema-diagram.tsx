/**
 * <AaToolSchemaDiagram>：一份 tool schema 的结构解剖图（HEL-311，静态 Server SVG）。
 *
 * 把「给模型看的工具说明书（tool schema）」拆成三部分，逐块标注「模型靠它做什么」：
 *   ① name        工具名——模型在请求里写它来指名要调哪个工具
 *   ② description 一句话说明——模型靠它判断这个工具是干嘛的、该不该调（选工具的关键）
 *   ③ parameters  参数表（名 / 类型 / 说明）——模型靠它知道该传什么、各是什么类型
 * 左栏是 schema 的三块卡片（各自独立 rect，仅圈自己那一块），右栏是与每块对齐的
 * 「模型靠它做什么」注解，中间用连线一一对齐。让读者一眼看清 schema = 模型的「电话簿词条」。
 *
 * 布局（防遮挡红线，§四几何，无容器框圈内容——靠两栏标题 + 卡片对齐分组，不用大 rect 套住所有卡）：
 *   - 左栏三张「部件卡」纵向排列，卡顶 y 用单一公式 cardY(i)=CARD_TOP + i*(CARD_H + GAP)；
 *   - parameters 卡较高（要列两行参数），单独给高度，仍走同一起点公式 + 累加；
 *   - 右栏「模型靠它做什么」注解卡，卡顶 y 与左栏卡中线对齐；
 *   - 中间连线从左卡右缘 → 右卡左缘，落在两卡中线、不穿字；
 *   - 距 viewBox 边 ≥18px；字号 ≥10px；无裸 hex（全 DESIGN token）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 */

export function AaToolSchemaDiagram() {
  // —— 布局常量（viewBox 内坐标，间距均 2 的倍数）——
  const VIEW_W = 760;
  const VIEW_H = 420;

  const LCOL_X = 24; // 左栏（schema 部件卡）左缘
  const LCOL_W = 366;
  const RCOL_X = 470; // 右栏（注解卡）左缘
  const RCOL_W = 270;

  const CARD_TOP = 84; // 第一张卡顶 y

  // 三张部件卡：name / description 各占 64 高，parameters 占 118 高（两行参数）。
  const H_NAME = 64;
  const H_DESC = 64;
  const H_PARAMS = 118;
  const GAP = 24;

  const yName = CARD_TOP;
  const yDesc = yName + H_NAME + GAP;
  const yParams = yDesc + H_DESC + GAP;

  type Part = {
    id: string;
    index: string;
    y: number;
    h: number;
    color: string;
    title: string; // 左卡：部件名
    sample: string; // 左卡：示例值
    note: string; // 右卡：模型靠它做什么
  };

  const parts: readonly Part[] = [
    {
      id: "name",
      index: "①",
      y: yName,
      h: H_NAME,
      color: "var(--accent)",
      title: "name（工具名）",
      sample: '"get_weather"',
      note: "模型在请求里写这个名字，指名「我要调它」",
    },
    {
      id: "description",
      index: "②",
      y: yDesc,
      h: H_DESC,
      color: "var(--warning)",
      title: "description（说明）",
      sample: '"查询某城市当前天气"',
      note: "模型靠这句话判断这工具干嘛的、该不该调——选工具的关键",
    },
    {
      id: "parameters",
      index: "③",
      y: yParams,
      h: H_PARAMS,
      color: "var(--success)",
      title: "parameters（参数表）",
      sample: "", // 参数行单独画
      note: "模型靠它知道要传什么、各是什么类型、哪个必填",
    },
  ];

  // parameters 卡里要列的两条参数行（名: 类型 · 说明）。
  const paramRows: readonly { name: string; type: string; desc: string }[] = [
    { name: "city", type: "string", desc: "城市名，如「上海」（必填）" },
    { name: "unit", type: "string", desc: "温标 c / f（可选）" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一份 tool schema（给模型看的工具说明书）的结构解剖图。它分三块。第一块 name 是工具名，例如 get_weather，模型在请求里写这个名字来指名要调哪个工具。第二块 description 是一句话说明，例如查询某城市当前天气，模型靠这句话判断这个工具是干嘛的、该不该调，是选工具的关键。第三块 parameters 是参数表，列出每个参数的名字、类型、说明，例如 city 是字符串必填、unit 是字符串可选，模型靠它知道该传什么、各是什么类型、哪个必填。schema 就是模型的电话簿词条，模型靠它决定调谁、传什么。"
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
            tool schema：给模型看的「电话簿词条」，分三块
          </text>

          {/* ===== 栏标题 ===== */}
          <text
            x={LCOL_X + 4}
            y="64"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            schema 的三块（模型看到的就是这份说明书）
          </text>
          <text
            x={RCOL_X + 4}
            y="64"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            模型靠这一块做什么
          </text>

          {/* ===== 三块部件 ===== */}
          {parts.map((p) => {
            const midY = p.y + p.h / 2;
            return (
              <g key={p.id}>
                {/* —— 连线：左卡右缘 → 右卡左缘（落在卡中线，不穿字）—— */}
                <line
                  x1={LCOL_X + LCOL_W}
                  y1={midY}
                  x2={RCOL_X}
                  y2={midY}
                  stroke={p.color}
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                  opacity="0.6"
                />

                {/* —— 左栏：schema 部件卡（独立 rect，仅圈自己）—— */}
                <rect
                  x={LCOL_X}
                  y={p.y}
                  width={LCOL_W}
                  height={p.h}
                  rx="10"
                  fill={p.color}
                  fillOpacity="0.1"
                  stroke={p.color}
                  strokeWidth="1.6"
                />
                <text
                  x={LCOL_X + 16}
                  y={p.y + 24}
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  <tspan fill={p.color}>{p.index} </tspan>
                  {p.title}
                </text>

                {/* name / description 卡：示例值一行 */}
                {p.sample && (
                  <text
                    x={LCOL_X + 16}
                    y={p.y + 46}
                    fontSize="12"
                    fontFamily="var(--font-mono, monospace)"
                    fill="var(--text-secondary)"
                  >
                    {p.sample}
                  </text>
                )}

                {/* —— 右栏：模型靠它做什么 注解卡（独立 rect，仅圈自己）—— */}
                <rect
                  x={RCOL_X}
                  y={midY - 22}
                  width={RCOL_W}
                  height={44}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                {/* 注解可能较长，按需折两行 */}
                {wrapNote(p.note).map((ln, k, arr) => (
                  <text
                    key={k}
                    x={RCOL_X + 12}
                    y={midY + 4 + (k - (arr.length - 1) / 2) * 14}
                    fontSize="10.5"
                    fill="var(--text-secondary)"
                  >
                    {ln}
                  </text>
                ))}
              </g>
            );
          })}

          {/* ===== parameters 卡内部的参数行（在卡内、距卡顶留出标题空间）===== */}
          {paramRows.map((r, i) => {
            const ry = yParams + 36 + i * 36; // 标题占 36，逐行 +36
            return (
              <g key={r.name}>
                <rect
                  x={LCOL_X + 14}
                  y={ry}
                  width={LCOL_W - 28}
                  height={28}
                  rx="6"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                <text
                  x={LCOL_X + 26}
                  y={ry + 18}
                  fontSize="11"
                  fontFamily="var(--font-mono, monospace)"
                  fill="var(--text-primary)"
                >
                  <tspan fontWeight="700" fill="var(--success)">
                    {r.name}
                  </tspan>
                  <tspan fill="var(--text-secondary)">{` : ${r.type}`}</tspan>
                </text>
                <text
                  x={LCOL_X + LCOL_W - 26}
                  y={ry + 18}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {r.desc}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        tool schema 是「给模型看的说明书」：name 让模型指名调谁、description
        让模型判断该不该调、parameters
        告诉模型该传什么——模型就靠这份词条决定调哪个工具、填什么参数。
      </figcaption>
    </figure>
  );
}

/** 把一句注解按粗略字宽折成 ≤2 行（中文按字数切，避免超出注解卡宽）。 */
function wrapNote(note: string): string[] {
  const MAX = 16; // 每行约 16 个中文字（10.5px 字号 + 270 宽卡）
  if (note.length <= MAX) return [note];
  // 优先在破折号 / 标点处断，否则按长度硬切
  const breakAt = note.lastIndexOf("——", MAX);
  if (breakAt > 4) return [note.slice(0, breakAt), note.slice(breakAt)];
  return [note.slice(0, MAX), note.slice(MAX)];
}
