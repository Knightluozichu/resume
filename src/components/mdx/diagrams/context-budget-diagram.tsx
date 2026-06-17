/**
 * <ContextBudgetDiagram>：上下文窗口 = 一根「有限 token 预算条」，被几类用途瓜分（HEL-304，第 6 章）。
 *
 * 一张静态 SVG：一根固定宽度的「容量条」（= 上下文窗口的 token 上限），从左到右按用途
 * 切成五段——系统提示 / 历史对话 / 检索资料 / 工具结果 / 留给输出的余量。条上方标「token 上限」
 * 刻度，让读者一眼看清：所有东西都从这同一根预算里出，谁占多了别人就没地方。
 *
 * 五段横向拼接，单一 x 公式 segX(i)（按各段占比累加），无重叠、首尾贴边但留 MARGIN 边距。
 * 每段下方挂一条引线 + 标签（错位高低两行，避免标签互相挤压）。
 *
 * 纯展示 Server 组件（无交互、无 three）。配色全部走 DESIGN token（无裸 hex）；
 * 几何常量均具名、为 4 的倍数（硬规则 5）。几何自检：段间零重叠、文字落自己框内、
 * 四周留白 ≥ 12px、字号 ≥ 10px、单一 x 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 340;

// —— 标题区。 ——
const TITLE_Y = 32;
const SUBTITLE_Y = 52;

// —— 容量条（一根固定宽度的预算条）。 ——
const BAR_X = 32;
const BAR_Y = 96;
const BAR_W = 656; // 右边界 = 32 + 656 = 688 → 右留白 32
const BAR_H = 64;

type Seg = {
  /** 段标签（含 emoji） */
  label: string;
  /** 这段装什么的一句话说明 */
  note: string;
  /** 该段占整条预算的比例（五段之和 = 1） */
  ratio: number;
  /** 语义色 token */
  color: string;
  /** 标签挂在条下方第几层（0 = 近条，1 = 远条），错位避免挤压 */
  row: 0 | 1;
};

/** 五段用途（左→右），ratio 之和 = 1。 */
const SEGS: readonly Seg[] = [
  {
    label: "🧭 系统提示",
    note: "人设 + 规矩，每轮都带",
    ratio: 0.16,
    color: "var(--accent)",
    row: 0,
  },
  {
    label: "💬 历史对话",
    note: "之前每一轮的问答",
    ratio: 0.34,
    color: "var(--info)",
    row: 1,
  },
  {
    label: "📚 检索资料",
    note: "临时查到的背景料",
    ratio: 0.2,
    color: "var(--success)",
    row: 0,
  },
  {
    label: "🔧 工具结果",
    note: "工具调用返回的内容",
    ratio: 0.16,
    color: "var(--warning)",
    row: 1,
  },
  {
    label: "✍️ 输出余量",
    note: "必须留给模型写回答",
    ratio: 0.14,
    color: "var(--danger)",
    row: 0,
  },
];

/** 第 i 段左边界 x（单一公式：起点 + 前面各段宽度之和）。 */
function segX(i: number): number {
  let acc = BAR_X;
  for (let k = 0; k < i; k++) acc += SEGS[k].ratio * BAR_W;
  return acc;
}

export function ContextBudgetDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="上下文窗口是一根有限的 token 预算条，被五类用途瓜分。一根固定宽度的容量条代表上下文窗口的 token 上限，从左到右被切成五段：系统提示（人设加规矩，每轮都带，约占一成六）、历史对话（之前每一轮的问答，占比最大约三成四）、检索资料（临时查到的背景料，约两成）、工具结果（工具调用返回的内容，约一成六）、最后必须留出的输出余量（留给模型写回答，约一成四）。核心要点：这五样东西全都从同一根预算里出，总和不能超过 token 上限——谁占多了，别人就没地方了。历史对话会随着对话变长不断膨胀，最容易把别的挤掉；而最右边给输出留的余量一旦被前面占满，模型就没空间生成回答了。所以管理上下文窗口，本质就是在这根固定的预算条上分配每一段该占多少。"
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
            上下文窗口 = 一根有限的 token 预算条
          </text>
          <text
            x={VIEW_W / 2}
            y={SUBTITLE_Y}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            下面这些全从同一根预算里出，加起来不能超 token 上限
          </text>

          {/* —— 「token 上限」刻度线（条右端竖线 + 标签）—— */}
          <line
            x1={BAR_X + BAR_W}
            y1={BAR_Y - 14}
            x2={BAR_X + BAR_W}
            y2={BAR_Y + BAR_H + 8}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
          <text
            x={BAR_X + BAR_W}
            y={BAR_Y - 20}
            textAnchor="end"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            ◄ token 上限（装满就到头）
          </text>

          {/* —— 容量条外框（统一底，segments 填在内）—— */}
          <rect
            x={BAR_X}
            y={BAR_Y}
            width={BAR_W}
            height={BAR_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.6"
          />

          {/* —— 五段用途 —— */}
          {SEGS.map((seg, i) => {
            const x = segX(i);
            const w = seg.ratio * BAR_W;
            const cx = x + w / 2;
            // 标签错位：row 0 近条（引线短），row 1 远条（引线长）。
            const lineEndY =
              seg.row === 0 ? BAR_Y + BAR_H + 22 : BAR_Y + BAR_H + 58;
            const labelY =
              seg.row === 0 ? BAR_Y + BAR_H + 38 : BAR_Y + BAR_H + 74;
            const noteY = labelY + 16;
            return (
              <g key={seg.label}>
                {/* 段填充（首段圆左角、末段圆右角靠外框 rx 兜住，这里统一矩形内嵌） */}
                <rect
                  x={x + 2}
                  y={BAR_Y + 2}
                  width={Math.max(0, w - 4)}
                  height={BAR_H - 4}
                  fill={seg.color}
                  opacity="0.22"
                />
                {/* 段分隔竖线（除第一段外，左缘画线） */}
                {i > 0 && (
                  <line
                    x1={x}
                    y1={BAR_Y + 2}
                    x2={x}
                    y2={BAR_Y + BAR_H - 2}
                    stroke="var(--border)"
                    strokeWidth="1.4"
                  />
                )}
                {/* 段内占比文字（条内居中） */}
                <text
                  x={cx}
                  y={BAR_Y + BAR_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={seg.color}
                >
                  {`${Math.round(seg.ratio * 100)}%`}
                </text>
                {/* 引线：段中心 → 标签层 */}
                <line
                  x1={cx}
                  y1={BAR_Y + BAR_H + 2}
                  x2={cx}
                  y2={lineEndY}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                {/* 标签 + 说明 */}
                <text
                  x={cx}
                  y={labelY}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={seg.color}
                >
                  {seg.label}
                </text>
                <text
                  x={cx}
                  y={noteY}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {seg.note}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        系统提示、历史、检索、工具结果、输出余量——全挤在同一根固定预算里。历史会越积越长，最容易把别人挤没地方；管理窗口，就是在这根条上分配每段占多少。
      </figcaption>
    </figure>
  );
}
