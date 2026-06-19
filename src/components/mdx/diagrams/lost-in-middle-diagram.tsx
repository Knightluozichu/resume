/**
 * <LostInMiddleDiagram>：lost in the middle —— 长上下文里中间信息最容易被忽略（HEL-304，第 6 章）。
 *
 * 一张静态 SVG：上方一长条「上下文」（从开头到结尾），下方一条 U 形「关注度曲线」——
 * 首尾高、中间凹。三个采样点（开头 / 中间 / 结尾）用空心圆标在曲线上，配「容易看见 /
 * 容易忽略 / 容易看见」的判语。让读者一眼看清：把关键信息埋在长上下文中间，模型最容易
 * 漏看；该把它放在开头或结尾。
 *
 * U 形曲线用一条对称二次 path 画（顶点在中间最低），三个采样点 x 用单一公式 sampleX(i)。
 *
 * 纯展示 Server 组件（无交互、无 three）。配色全部走 DESIGN token（无裸 hex）；
 * 几何常量均具名、为 4 的倍数（硬规则 5）。几何自检：元素零重叠、文字落自己区域内、
 * 四周留白 ≥ 12px、字号 ≥ 10px、单一 x 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 396; // 底部要点条下方留 ≥12px 余量（节点近边修复）

// —— 标题区。 ——
const TITLE_Y = 32;
const SUBTITLE_Y = 52;

// —— 上方「上下文」长条。 ——
const CTX_X = 56; // 整块绘图区右移 8px，给左侧「关注度」纵轴标签留足边距（节点近边修复）
const CTX_W = 616; // 右边界 = 56 + 616 = 672 → 右留白 48 不变
const CTX_Y = 76;
const CTX_H = 40;

// —— 下方 U 形关注度曲线区。 ——
const CURVE_LEFT = CTX_X;
const CURVE_RIGHT = CTX_X + CTX_W;
const CURVE_TOP = 168; // 曲线最高点（首尾）所在 y（值越小越高 = 关注度越高）
const CURVE_BOT = 272; // 曲线最低点（中间）所在 y
const AXIS_Y = 332; // 曲线下方横轴（落在中间判语之下）

// 三个采样点：开头 / 中间 / 结尾（单一 x 公式）。
const sampleX = (i: number) =>
  CURVE_LEFT + (i * (CURVE_RIGHT - CURVE_LEFT)) / 2;

type Sample = {
  /** 采样点标题 */
  spot: string;
  /** 关注度判语 */
  verdict: string;
  /** 在曲线上的 y（首尾高 = CURVE_TOP，中间低 = CURVE_BOT） */
  y: number;
  /** 语义色：好 = 看得见，差 = 易忽略 */
  color: string;
  /** 标签往上还是往下挂（避免与曲线/轴挤压） */
  labelAbove: boolean;
};

const SAMPLES: readonly Sample[] = [
  {
    spot: "📍 开头",
    verdict: "容易看见 ✓",
    y: CURVE_TOP,
    color: "var(--success)",
    labelAbove: true,
  },
  {
    spot: "📍 中间",
    verdict: "容易被忽略 ✗",
    y: CURVE_BOT,
    color: "var(--danger)",
    labelAbove: false,
  },
  {
    spot: "📍 结尾",
    verdict: "容易看见 ✓",
    y: CURVE_TOP,
    color: "var(--success)",
    labelAbove: true,
  },
];

// U 形曲线 path：首尾在 CURVE_TOP，用一条二次贝塞尔把谷底压到 CURVE_BOT 附近。
// 二次贝塞尔控制点取在底部更低处，使曲线中段真正下凹到 CURVE_BOT。
const CURVE_CTRL_Y = CURVE_BOT + (CURVE_BOT - CURVE_TOP); // 控制点压低，保证顶点≈CURVE_BOT
const CURVE_PATH = `M ${CURVE_LEFT} ${CURVE_TOP} Q ${(CURVE_LEFT + CURVE_RIGHT) / 2} ${CURVE_CTRL_Y} ${CURVE_RIGHT} ${CURVE_TOP}`;

export function LostInMiddleDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="lost in the middle 现象图，说明长上下文里中间的信息最容易被模型忽略。上方是一根长长的「上下文」条，从开头到结尾。下方是一条 U 形的「关注度曲线」：两端高、中间凹下去——关注度越高曲线位置越高。曲线上标了三个采样点。开头这个点在曲线高处，判语是「容易看见」。中间这个点落在曲线最低的谷底，判语是「容易被忽略」。结尾这个点也在曲线高处，判语是「容易看见」。核心要点：模型对长上下文的注意力不是均匀的，它对开头和结尾的内容更上心，对正中间的内容最容易看漏。所以最关键的指令和信息别埋在长上下文的中间，应该放在开头或结尾，模型才最不容易忽略它。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 标题 —— */}
          <text
            x={VIEW_W / 2}
            y={TITLE_Y}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            lost in the middle：长上下文里，中间最容易被看漏
          </text>
          <text
            x={VIEW_W / 2}
            y={SUBTITLE_Y}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            模型对开头和结尾更上心，对正中间最不上心
          </text>

          {/* —— 上方「上下文」长条 —— */}
          <rect
            x={CTX_X}
            y={CTX_Y}
            width={CTX_W}
            height={CTX_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={CTX_X + 12}
            y={CTX_Y + CTX_H / 2 + 4}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            开头
          </text>
          <text
            x={CTX_X + CTX_W / 2}
            y={CTX_Y + CTX_H / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            ……长长的上下文（一大段历史 / 资料）……
          </text>
          <text
            x={CTX_X + CTX_W - 12}
            y={CTX_Y + CTX_H / 2 + 4}
            textAnchor="end"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            结尾
          </text>

          {/* —— 「关注度」纵轴提示 —— */}
          <text
            x={CTX_X - 8}
            y={CURVE_TOP + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            高
          </text>
          <text
            x={CTX_X - 8}
            y={CURVE_BOT + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            低
          </text>
          <text
            x={CTX_X - 28}
            y={(CURVE_TOP + CURVE_BOT) / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--accent)"
            transform={`rotate(-90 ${CTX_X - 28} ${(CURVE_TOP + CURVE_BOT) / 2 + 4})`}
          >
            关注度
          </text>

          {/* —— U 形关注度曲线 —— */}
          <path
            d={CURVE_PATH}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.6"
          />

          {/* —— 横轴 —— */}
          <line
            x1={CURVE_LEFT}
            y1={AXIS_Y}
            x2={CURVE_RIGHT}
            y2={AXIS_Y}
            stroke="var(--border)"
            strokeWidth="1.2"
          />

          {/* —— 三个采样点 + 判语 —— */}
          {SAMPLES.map((s, i) => {
            const x = sampleX(i);
            // 标签层：above = 点上方；below = 点下方（落在轴与曲线谷底之间）。
            const spotY = s.labelAbove ? s.y - 24 : s.y + 22;
            const verdictY = s.labelAbove ? s.y - 8 : s.y + 38;
            return (
              <g key={s.spot}>
                {/* 从上下文条到采样点的竖向引线（虚线） */}
                <line
                  x1={x}
                  y1={CTX_Y + CTX_H}
                  x2={x}
                  y2={s.y}
                  stroke={s.color}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.7"
                />
                {/* 曲线上的采样圆点 */}
                <circle
                  cx={x}
                  cy={s.y}
                  r="7"
                  fill="var(--bg-elevated)"
                  stroke={s.color}
                  strokeWidth="2.4"
                />
                {/* 采样点标题 */}
                <text
                  x={x}
                  y={spotY}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={s.color}
                >
                  {s.spot}
                </text>
                {/* 判语 */}
                <text
                  x={x}
                  y={verdictY}
                  textAnchor="middle"
                  fontSize="11"
                  fill={s.color}
                >
                  {s.verdict}
                </text>
              </g>
            );
          })}

          {/* —— 底部要点条 —— */}
          <text
            x={VIEW_W / 2}
            y={AXIS_Y + 32}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            👉 最重要的指令 / 信息，放开头或结尾，别埋在中间
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        模型对长上下文的注意力两端高、中间凹——关键信息埋在正中间最容易被漏看。该把它放到开头或结尾，模型才最不容易忽略。
      </figcaption>
    </figure>
  );
}
