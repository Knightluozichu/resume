/**
 * <StencilBufferDiagram>：「模板测试」§3 模板缓冲的「镂空蜡纸 / 喷漆模板」比喻图（HEL-68，A 概念型）。
 *
 * 把模板缓冲画成一张盖在画布上的「蜡纸 / 喷漆模板」：缓冲里每个像素存一个整数，
 * 喷漆（新片段的颜色）只有落在「镂空处」（模板值满足条件的格子）才能透到画布上，
 * 落在「实心处」（不满足条件的格子）的漆被挡掉。本图分三层并排：
 *  ①左：模板缓冲——一张 0/1 的整数网格（1 = 物体所在区域、镂空；0 = 其余、实心）；
 *  ②中：喷漆 = 新来的一片颜色（想盖满整块画布）；
 *  ③右：透过模板后的结果——只有模板值满足比较（这里示意「只在 1 处通过」）的格子被涂上。
 * 强调直觉：模板缓冲不直接显示，只在幕后当「掩模」决定片段能不能落到颜色缓冲。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

// 6×4 模板网格：值为 1 的格子拼出一个「十字 / 物体」形状（镂空），其余为 0（实心）。
const COLS = 6;
const ROWS = 4;
// 哪些格子的模板值是 1（按 row*COLS+col 索引）——拼一个居中的方块物体。
const ONES = new Set([8, 9, 10, 13, 14, 15, 16, 19, 20, 21]);

export function StencilBufferDiagram() {
  // 单元格几何（三个网格共用一套尺寸，便于横向对齐）。
  const cell = 26;
  const gw = COLS * cell;
  const gh = ROWS * cell;
  // 三个网格的左上角 x 起点。
  const x1 = 30;
  const x2 = 285;
  const x3 = 540;
  const gy = 70;

  const cells = Array.from({ length: COLS * ROWS }, (_, i) => i);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 300"
          role="img"
          aria-label="模板缓冲的喷漆模板比喻，分三栏。左栏是模板缓冲：一张六乘四的整数网格，每个像素存一个整数，中间一块拼成物体形状的格子值为 1、被画成镂空，其余格子值为 0、被画成实心。中栏是新来的喷漆，也就是一整片想盖满画布的颜色。右栏是透过模板之后的结果：喷漆只在模板值为 1 的镂空格子里透到画布上、被涂色，落在值为 0 的实心格子上的漆被模板挡掉。说明模板缓冲不直接显示，只在幕后当掩模，决定片段能不能落到颜色缓冲。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ============ 左栏：模板缓冲（0/1 整数网格） ============ */}
          <text
            x={x1 + gw / 2}
            y="36"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            模板缓冲（每像素存一个整数）
          </text>
          {cells.map((i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const isOne = ONES.has(i);
            return (
              <g key={`buf-${i}`}>
                <rect
                  x={x1 + c * cell}
                  y={gy + r * cell}
                  width={cell}
                  height={cell}
                  fill={isOne ? "var(--bg)" : "var(--bg-elevated)"}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={x1 + c * cell + cell / 2}
                  y={gy + r * cell + cell / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  className="font-mono"
                  fill={isOne ? "var(--accent)" : "var(--text-secondary)"}
                  fontWeight={isOne ? "700" : "400"}
                >
                  {isOne ? "1" : "0"}
                </text>
              </g>
            );
          })}
          <text
            x={x1 + gw / 2}
            y={gy + gh + 28}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            值为 <tspan fill="var(--accent)">1</tspan>= 镂空（让漆透过）
          </text>
          <text
            x={x1 + gw / 2}
            y={gy + gh + 48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            值为 <tspan fill="var(--text-secondary)">0</tspan>= 实心（挡住漆）
          </text>

          {/* 模板 → 喷漆 之间的「叠合」箭头 */}
          <text
            x={(x1 + gw + x2) / 2}
            y={gy + gh / 2 - 4}
            textAnchor="middle"
            fontSize="18"
            fill="var(--text-secondary)"
          >
            +
          </text>

          {/* ============ 中栏：喷漆（一整片想盖满的颜色） ============ */}
          <text
            x={x2 + gw / 2}
            y="36"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            喷漆（新片段的颜色）
          </text>
          <rect
            x={x2}
            y={gy}
            width={gw}
            height={gh}
            rx="4"
            fill="var(--accent)"
            opacity="0.7"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x={x2 + gw / 2}
            y={gy + gh / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            想盖满整块
          </text>
          <text
            x={x2 + gw / 2}
            y={gy + gh + 28}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一整片新颜色
          </text>
          <text
            x={x2 + gw / 2}
            y={gy + gh + 48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            朝整块画布喷
          </text>

          {/* 喷漆 → 结果 之间的「透过」箭头 */}
          <line
            x1={x2 + gw + 12}
            y1={gy + gh / 2}
            x2={x3 - 14}
            y2={gy + gh / 2}
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d={`M${x3 - 14} ${gy + gh / 2} l-9 -4 l0 8 z`}
            fill="var(--border)"
          />

          {/* ============ 右栏：透过模板后的结果 ============ */}
          <text
            x={x3 + gw / 2}
            y="36"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            落到画布的结果
          </text>
          {cells.map((i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const isOne = ONES.has(i);
            return (
              <rect
                key={`res-${i}`}
                x={x3 + c * cell}
                y={gy + r * cell}
                width={cell}
                height={cell}
                fill={isOne ? "var(--accent)" : "var(--bg)"}
                opacity={isOne ? 0.7 : 1}
                stroke="var(--border)"
                strokeWidth="1"
              />
            );
          })}
          <text
            x={x3 + gw / 2}
            y={gy + gh + 28}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            只在模板值满足条件处
          </text>
          <text
            x={x3 + gw / 2}
            y={gy + gh + 48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            （这里示意「只在 1 处」）上色
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        把<strong>模板缓冲</strong>
        想成一张盖在画布上的喷漆模板：它为每个像素存一个
        <strong>整数</strong>（左，这里 1 = 镂空、0 =
        实心）。一片新喷的漆（中）朝整块画布喷下去， 但只有落在
        <strong>满足比较条件</strong>的格子（这里是值为 1
        的镂空处）才能透到画布上（右），
        其余被模板挡掉。模板缓冲自己不显示，只在幕后当「掩模」。
      </figcaption>
    </figure>
  );
}
