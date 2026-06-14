/**
 * <UboBindingDiagram step={1|2|3}>：「高级GLSL」UBO 主图 + §5「UBO 如何共享」<Stepper> 三步配图（HEL-74，C 实战型）。
 *
 * 同一组件按 step 演示「为什么用 UBO / UBO 怎么共享 / std140 怎么对齐」三种状态：
 *  ①不用 UBO：每个 program 各自存一份 projection / view uniform，改一次矩阵要往 N 个 program
 *    各传一遍（N 根独立箭头），冗余、易漏；
 *  ②用 UBO：一块缓冲存 projection / view，经一个绑定点（binding point 0）同时接到 N 个 program，
 *    改一次缓冲，全体 program 立刻看到新值；
 *  ③std140 对齐：UBO 里成员按规则对齐——float 占 4 字节、vec3 要补齐到 16 字节（留 padding）、
 *    mat4 占 4 列各 16 字节，画出「带 padding 的内存条」示意为什么 CPU 写入要按这套偏移。
 *
 * 不传 step 时默认 step=2（章节正文里当 UBO 概念主图用）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--border/--bg/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type UboStep = 1 | 2 | 3;

const ARIA: Record<UboStep, string> = {
  1: "不用 Uniform 缓冲对象的情况。场景里有三个着色器程序，每个程序里都各自存了一份投影矩阵和观察矩阵的 uniform。想改一次这两个矩阵，就得用 CPU 分别往三个程序各传一遍，画出三根独立的箭头，冗余而且容易漏掉某一个。",
  2: "使用 Uniform 缓冲对象的情况。CPU 只把投影矩阵和观察矩阵写进一块共享的缓冲，这块缓冲经过一个编号为 0 的绑定点，同时接到三个着色器程序上。改一次这块缓冲，三个程序立刻都读到新值，只需设置一次。",
  3: "std140 内存布局示意。Uniform 缓冲对象里的成员要按规则对齐：一个 float 占 4 字节，一个 vec3 虽然只有 3 个数，却要补齐占满 16 字节、后面留一段空白填充 padding，一个 mat4 按 4 列、每列各占 16 字节排列。CPU 往缓冲里写数据时必须照这套偏移量摆放，否则着色器会读错位。",
};

export function UboBindingDiagram({ step = 2 }: { step?: UboStep }) {
  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {step === 1 && <NoUbo />}
          {step === 2 && <WithUbo />}
          {step === 3 && <Std140 />}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && (
          <>
            <strong>不用 UBO</strong>：每个 program 各存一份矩阵
            uniform，改一次要往 N 个 program <strong>各传一遍</strong>
            ，冗余易漏。
          </>
        )}
        {step === 2 && (
          <>
            <strong>用 UBO</strong>：一块缓冲存矩阵，经<strong>绑定点</strong>
            同时接到 N 个 program，改一次缓冲<strong>全体生效</strong>。
          </>
        )}
        {step === 3 && (
          <>
            <strong>std140 对齐</strong>：成员按规则对齐——
            <span className="font-mono">vec3</span> 要补齐到 16 字节、留{" "}
            <strong>padding</strong>，CPU 写入须照这套偏移。
          </>
        )}
      </figcaption>
    </figure>
  );
}

/* ============ step 1：不用 UBO，每个 program 各传一遍 ============ */
function NoUbo() {
  const progs = [60, 130, 200];
  return (
    <>
      <rect
        x="40"
        y="30"
        width="160"
        height="48"
        rx="8"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      <text
        x="120"
        y="50"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        CPU（你的程序）
      </text>
      <text
        x="120"
        y="68"
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        改一次 projection / view
      </text>

      {/* 三根独立箭头，各传一遍 */}
      {progs.map((y, i) => (
        <g key={i}>
          <line
            x1="200"
            y1="54"
            x2="340"
            y2={y + 24}
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <path d={`M340 ${y + 24} l-11 -1 l4 9 z`} fill="var(--warning)" />
        </g>
      ))}
      <text
        x="262"
        y="160"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="var(--warning)"
      >
        各传一遍（冗余）
      </text>

      {/* 三个 program，各存一份 */}
      {progs.map((y, i) => (
        <g key={i}>
          <rect
            x="340"
            y={y}
            width="180"
            height="48"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="430"
            y={y + 20}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            着色器程序 {i + 1}
          </text>
          <text
            x="430"
            y={y + 38}
            textAnchor="middle"
            fontSize="9"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            各存一份 projection/view
          </text>
        </g>
      ))}
    </>
  );
}

/* ============ step 2：用 UBO，一块缓冲经绑定点接多个 program ============ */
function WithUbo() {
  const progs = [40, 120, 200];
  return (
    <>
      <rect
        x="30"
        y="120"
        width="120"
        height="48"
        rx="8"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      <text
        x="90"
        y="140"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        CPU
      </text>
      <text
        x="90"
        y="157"
        textAnchor="middle"
        fontSize="9"
        fill="var(--text-secondary)"
      >
        写一次缓冲
      </text>

      {/* CPU → UBO */}
      <line
        x1="150"
        y1="144"
        x2="186"
        y2="144"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <path d="M186 144 l-10 -5 l0 10 z" fill="var(--accent)" />

      {/* UBO（一块共享缓冲） */}
      <rect
        x="188"
        y="116"
        width="116"
        height="56"
        rx="8"
        fill="var(--bg-elevated)"
        stroke="var(--accent)"
        strokeWidth="2.5"
      />
      <text
        x="246"
        y="138"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="var(--accent)"
      >
        UBO 缓冲
      </text>
      <text
        x="246"
        y="156"
        textAnchor="middle"
        fontSize="9"
        className="font-mono"
        fill="var(--text-secondary)"
      >
        projection, view
      </text>

      {/* 绑定点徽标 */}
      <rect
        x="320"
        y="128"
        width="64"
        height="32"
        rx="16"
        fill="var(--success)"
        opacity="0.16"
        stroke="var(--success)"
        strokeWidth="1.5"
      />
      <text
        x="352"
        y="148"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="var(--success)"
      >
        绑定点 0
      </text>
      <line
        x1="304"
        y1="144"
        x2="320"
        y2="144"
        stroke="var(--accent)"
        strokeWidth="2"
      />

      {/* 绑定点 → 三个 program */}
      {progs.map((y, i) => (
        <g key={i}>
          <line
            x1="384"
            y1="144"
            x2="428"
            y2={y + 22}
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d={`M428 ${y + 22} l-11 -1 l4 9 z`} fill="var(--accent)" />
          <rect
            x="430"
            y={y}
            width="120"
            height="44"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="490"
            y={y + 20}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            程序 {i + 1}
          </text>
          <text
            x="490"
            y={y + 36}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            读同一块
          </text>
        </g>
      ))}

      <text
        x="280"
        y="290"
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="600"
        fill="var(--accent)"
      >
        改一次缓冲 → 三个程序全体生效
      </text>
    </>
  );
}

/* ============ step 3：std140 内存布局（带 padding 的内存条） ============ */
// 内存条几何常量（模块级，避免 render 内重建）。
const STD140_CELL_W = 56;
const STD140_X0 = 40;
const std140RowY = (n: number) => 70 + n * 52;

type Std140Cell = {
  col: number;
  row: number;
  label: string;
  kind: "data" | "pad";
};

// 三行内存条：float（+3 padding）/ vec3（+1 padding）/ vec4（占满）。
const STD140_CELLS: readonly Std140Cell[] = [
  { col: 0, row: 0, label: "float", kind: "data" },
  { col: 1, row: 0, label: "pad", kind: "pad" },
  { col: 2, row: 0, label: "pad", kind: "pad" },
  { col: 3, row: 0, label: "pad", kind: "pad" },
  { col: 0, row: 1, label: "vec3.x", kind: "data" },
  { col: 1, row: 1, label: "vec3.y", kind: "data" },
  { col: 2, row: 1, label: "vec3.z", kind: "data" },
  { col: 3, row: 1, label: "pad", kind: "pad" },
  { col: 0, row: 2, label: "vec4.x", kind: "data" },
  { col: 1, row: 2, label: "vec4.y", kind: "data" },
  { col: 2, row: 2, label: "vec4.z", kind: "data" },
  { col: 3, row: 2, label: "vec4.w", kind: "data" },
];

const STD140_ROW_NOTES: readonly {
  row: number;
  text: string;
  warn: boolean;
}[] = [
  { row: 0, text: "偏移 0：float 占 4 字节，padding 补到 16", warn: false },
  {
    row: 1,
    text: "偏移 16：vec3 也吃满 16 字节！（第 4 格是 padding）",
    warn: true,
  },
  { row: 2, text: "偏移 32：vec4 正好占满，无 padding", warn: false },
];

function Std140() {
  return (
    <>
      <text
        x="280"
        y="36"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        std140：成员按 16 字节对齐摆进缓冲（每格 = 4 字节）
      </text>

      {/* 三行内存条：每格 4 字节，data 实色、pad 虚线空格 */}
      {STD140_CELLS.map((c) => (
        <g key={`${c.row}-${c.col}`}>
          <rect
            x={STD140_X0 + c.col * STD140_CELL_W}
            y={std140RowY(c.row)}
            width={STD140_CELL_W}
            height="36"
            fill={c.kind === "pad" ? "var(--bg)" : "var(--accent)"}
            opacity={c.kind === "pad" ? "1" : "0.75"}
            stroke={c.kind === "pad" ? "var(--warning)" : "var(--border)"}
            strokeWidth="1.5"
            strokeDasharray={c.kind === "pad" ? "4 3" : undefined}
          />
          <text
            x={STD140_X0 + c.col * STD140_CELL_W + STD140_CELL_W / 2}
            y={std140RowY(c.row) + 22}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            className="font-mono"
            fill={c.kind === "pad" ? "var(--warning)" : "var(--text-primary)"}
          >
            {c.label}
          </text>
        </g>
      ))}

      {/* 每行右侧说明 */}
      {STD140_ROW_NOTES.map((n) => (
        <text
          key={n.row}
          x={STD140_X0 + 4 * STD140_CELL_W + 12}
          y={std140RowY(n.row) + 22}
          fontSize="10"
          fill={n.warn ? "var(--warning)" : "var(--text-secondary)"}
        >
          {n.text}
        </text>
      ))}
    </>
  );
}
