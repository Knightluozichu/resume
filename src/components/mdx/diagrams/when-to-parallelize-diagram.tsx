/**
 * <WhenToParallelizeDiagram>：「该不该 par」决策对比图（HEL-239，§3 引出 / §5 辅 Demo）。
 *
 * 两栏并排对照，给读者一份判断清单：
 *  ✓ 值得并行（左，绿）：大数据量 + 每元素处理够重 + 元素间无依赖无争用 → 加速明显。
 *  ✗ 并行反而亏（右，红）：小数据 + 每元素极轻 + 有争用 / 副作用 → 分发与同步开销
 *    盖过收益，甚至比 seq 更慢。
 *
 * 呼应 ch9：开销来自任务分发、线程调度、合并归约，以及可能的 false sharing / 争用。
 * 三条判据逐条对照（数据量 / 每元素成本 / 依赖与争用），底部各给一句结论。
 *
 * Server Component（纯静态对照图，无交互 / 动画，不需 "use client"）。两栏等宽、不叠字，
 * 每个 <text> 距 viewBox 边 ≥14px，两栏卡片与内部行框互不重叠。视觉全部 DESIGN token
 * （success / danger / border / bg / text-*），无裸 hex。
 */

const VIEW_W = 660;
const VIEW_H = 376;

const GOOD_COLOR = "var(--success)"; // 值得并行
const BAD_COLOR = "var(--danger)"; // 并行反而亏

// 两栏布局：等宽，列间留缝（16 + 2×306 + 1×16 + 16 = 660，两侧边距对称 16px）。
const COL_W = 306;
const COL_GAP = 16;
const COL_Y = 64;
const COL_H = 296;
const colX = (i: number) => 16 + i * (COL_W + COL_GAP);

// 三条判据行（两栏共用同样的判据，左右给相反的取值）。
type Criterion = {
  axis: string;
  good: string;
  bad: string;
};

const CRITERIA: readonly Criterion[] = [
  {
    axis: "数据量",
    good: "大（百万级元素）",
    bad: "小（几十、几百个）",
  },
  {
    axis: "每元素处理成本",
    good: "重（一次要算不少）",
    bad: "极轻（一次加法、一次赋值）",
  },
  {
    axis: "元素间依赖 / 争用",
    good: "无依赖、无共享写、无副作用",
    bad: "有依赖 / 共享写 / 锁 / false sharing",
  },
];

// 每行的几何：标题区下方，三行等高。
const ROW_TOP = COL_Y + 52;
const ROW_H = 52;
const ROW_GAP = 8;
const rowY = (i: number) => ROW_TOP + i * (ROW_H + ROW_GAP);

export function WhenToParallelizeDiagram() {
  const cols = [
    {
      color: GOOD_COLOR,
      mark: "✓",
      title: "值得并行",
      pick: (c: Criterion) => c.good,
      verdict: "分发开销被大量重活摊薄 → 加速明显",
    },
    {
      color: BAD_COLOR,
      mark: "✗",
      title: "并行反而亏",
      pick: (c: Criterion) => c.bad,
      verdict: "分发 / 同步开销盖过收益 → 可能更慢",
    },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="该不该用并行执行策略的决策对比图。左栏「值得并行」：数据量大（百万级元素）、每元素处理成本重、元素间无依赖无共享写无副作用，此时任务分发开销被大量重活摊薄，加速明显。右栏「并行反而亏」：数据量小（几十几百个）、每元素处理极轻（一次加法或赋值）、元素间有依赖或共享写或加锁或 false sharing，此时任务分发与同步的开销盖过并行收益，甚至比顺序执行更慢。三条判据数据量、每元素成本、依赖与争用逐行左右对照，给读者一份判断清单。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 标题 */}
          <text
            x="16"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            该不该传 par？一份判断清单
          </text>
          <text x="16" y="48" fontSize="10.5" fill="var(--text-secondary)">
            并行不是免费的——分发、调度、合并都要钱，得看活够不够大、够不够独立
          </text>

          {cols.map((col, i) => {
            const x = colX(i);
            const cx = x + COL_W / 2;
            return (
              <g key={col.title}>
                {/* 栏卡片 */}
                <rect
                  x={x}
                  y={COL_Y}
                  width={COL_W}
                  height={COL_H}
                  rx="12"
                  fill={col.color}
                  fillOpacity="0.06"
                  stroke={col.color}
                  strokeWidth="1.6"
                />
                {/* 栏标题 */}
                <text
                  x={cx}
                  y={COL_Y + 30}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={col.color}
                >
                  {`${col.mark} ${col.title}`}
                </text>

                {/* 三条判据行 */}
                {CRITERIA.map((c, r) => {
                  const y = rowY(r);
                  return (
                    <g key={`${col.title}-${c.axis}`}>
                      <rect
                        x={x + 14}
                        y={y}
                        width={COL_W - 28}
                        height={ROW_H}
                        rx="7"
                        fill={col.color}
                        fillOpacity="0.05"
                        stroke={col.color}
                        strokeWidth="1"
                        strokeOpacity="0.4"
                      />
                      <text
                        x={x + 26}
                        y={y + 20}
                        fontSize="10"
                        fontWeight="700"
                        fill="var(--text-secondary)"
                      >
                        {c.axis}
                      </text>
                      <text
                        x={x + 26}
                        y={y + 40}
                        fontSize="11"
                        fontWeight="600"
                        fill="var(--text-primary)"
                      >
                        {col.pick(c)}
                      </text>
                    </g>
                  );
                })}

                {/* 结论条 */}
                <line
                  x1={x + 14}
                  y1={COL_Y + COL_H - 42}
                  x2={x + COL_W - 14}
                  y2={COL_Y + COL_H - 42}
                  stroke={col.color}
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />
                <text
                  x={cx}
                  y={COL_Y + COL_H - 20}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.verdict}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并行有开销（分发、调度、合并、可能的争用）。只有「数据量大 +
        每元素处理重 + 元素间无依赖无争用」三条都占，par
        才划算；反之小数据、极轻处理、有争用，并行反而比顺序更慢。
      </figcaption>
    </figure>
  );
}
