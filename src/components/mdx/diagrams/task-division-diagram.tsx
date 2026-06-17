/**
 * <TaskDivisionDiagram>：任务划分三策略并排对照图（HEL-237，type D §3 对比图）。
 *
 * 三列等宽并排，对比设计并发代码时划分任务的三种策略：
 *  ① 数据划分（data partitioning）：把一大块数据切成 N 份，每个线程独立处理一份
 *     （示意：一条长数据被竖切成 4 段，4 个线程各领一段）。适合数据量大、各份处理互不依赖。
 *  ② 递归划分（recursive division）：分治，把问题递归拆成两半，子任务再并行
 *     （示意：一个根分成两枝、每枝再分两枝——并行快排就是这样）。适合可分治的递归算法。
 *  ③ 流水线（pipeline）：按工序分阶段，数据依次流过各阶段，不同阶段由不同线程负责
 *     （示意：阶段1→阶段2→阶段3 串成一条流水线，数据一件件流过）。适合数据连续到达、工序固定。
 *
 * 餐厅后厨隐喻：数据划分 = 同一道菜分给多个厨师各做一批；流水线 = 把一道菜按工序
 * （洗→切→炒）分给不同厨师，菜在工位间流动；递归划分 = 大单子拆成小单子、小单子再拆。
 *
 * Server Component（纯静态对照图，无交互/动画，不需 "use client"）。三列等宽、不叠字、
 * 每个 <text> 距 viewBox 边 ≥14px。视觉全部 DESIGN token（accent / success / warning /
 * border / bg / text-*），无裸 hex。
 */

const VIEW_W = 680;
const VIEW_H = 360;

const DATA_COLOR = "var(--accent)"; // 数据划分
const REC_COLOR = "var(--success)"; // 递归划分
const PIPE_COLOR = "var(--warning)"; // 流水线

// 三列布局：等宽，列间留缝（16 + 3×204 + 2×18 + 16 = 680，两侧边距对称 16px）。
const COL_W = 204;
const COL_GAP = 18;
const COL_Y = 56;
const COL_H = 286;
const colX = (i: number) => 16 + i * (COL_W + COL_GAP);

type Column = {
  color: string;
  title: string;
  subtitle: string;
  fit: string;
};

const COLUMNS: readonly Column[] = [
  {
    color: DATA_COLOR,
    title: "① 数据划分",
    subtitle: "一大块数据切成 N 份，每线程处理一份",
    fit: "适合：数据量大、各份处理互不依赖（如并行求和、逐元素变换）",
  },
  {
    color: REC_COLOR,
    title: "② 递归划分",
    subtitle: "分治：递归拆成两半，子任务再并行",
    fit: "适合：可分治的递归算法（如并行快排、归并）",
  },
  {
    color: PIPE_COLOR,
    title: "③ 流水线",
    subtitle: "按工序分阶段，数据依次流过各阶段",
    fit: "适合：数据连续到达、工序固定（如解码→处理→编码）",
  },
];

export function TaskDivisionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="任务划分三策略并排对照图。第一列数据划分：把一大块数据切成 N 份，每个线程处理一份，适合数据量大、各份处理互不依赖，例如并行求和或逐元素变换。第二列递归划分：用分治思路把问题递归拆成两半、子任务再并行，适合可分治的递归算法，例如并行快排或归并。第三列流水线：按工序分阶段，数据依次流过各阶段、不同阶段由不同线程负责，适合数据连续到达、工序固定的场景，例如解码、处理、编码三段流水线。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* 标题 */}
          <text
            x="16"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            任务划分三策略：怎么把活分给多个线程
          </text>

          {COLUMNS.map((c, i) => {
            const x = colX(i);
            const cx = x + COL_W / 2;
            return (
              <g key={c.title}>
                {/* 列卡片 */}
                <rect
                  x={x}
                  y={COL_Y}
                  width={COL_W}
                  height={COL_H}
                  rx="12"
                  fill={c.color}
                  fillOpacity="0.06"
                  stroke={c.color}
                  strokeWidth="1.6"
                />
                {/* 列标题 */}
                <text
                  x={cx}
                  y={COL_Y + 26}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {c.title}
                </text>
                {/* 列副标题 */}
                <text
                  x={cx}
                  y={COL_Y + 46}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  {c.subtitle}
                </text>
              </g>
            );
          })}

          {/* ===== ① 数据划分示意：一条长数据竖切成 4 份，4 线程各领一份 ===== */}
          {(() => {
            const x = colX(0);
            const cy = COL_Y + 132;
            const blockW = 38;
            const blockH = 44;
            const gap = 8;
            const totalW = blockW * 4 + gap * 3;
            const startX = x + (COL_W - totalW) / 2;
            return (
              <g>
                {[0, 1, 2, 3].map((k) => (
                  <g key={`d-${k}`}>
                    <rect
                      x={startX + k * (blockW + gap)}
                      y={cy}
                      width={blockW}
                      height={blockH}
                      rx="6"
                      fill={DATA_COLOR}
                      fillOpacity="0.18"
                      stroke={DATA_COLOR}
                      strokeWidth="1.6"
                    />
                    <text
                      x={startX + k * (blockW + gap) + blockW / 2}
                      y={cy + blockH / 2 + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="var(--font-mono)"
                      fill="var(--text-primary)"
                    >
                      {`T${k}`}
                    </text>
                  </g>
                ))}
                <text
                  x={x + COL_W / 2}
                  y={cy + blockH + 22}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  4 个线程各领一段，独立算
                </text>
              </g>
            );
          })()}

          {/* ===== ② 递归划分示意：一根分两枝、每枝再分两枝（分治树）===== */}
          {(() => {
            const x = colX(1);
            const cx = x + COL_W / 2;
            const topY = COL_Y + 116;
            const r = 12;
            const midY = topY + 44;
            const leafY = midY + 44;
            const dx1 = 46; // 第一层左右偏移
            const dx2 = 24; // 第二层左右偏移
            const node = (nx: number, ny: number, key: string) => (
              <circle
                key={key}
                cx={nx}
                cy={ny}
                r={r}
                fill={REC_COLOR}
                fillOpacity="0.18"
                stroke={REC_COLOR}
                strokeWidth="1.6"
              />
            );
            const edge = (
              x1: number,
              y1: number,
              x2: number,
              y2: number,
              key: string,
            ) => (
              <line
                key={key}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={REC_COLOR}
                strokeWidth="1.4"
                strokeOpacity="0.7"
              />
            );
            return (
              <g>
                {/* 边（先画，压在节点下） */}
                {edge(cx, topY, cx - dx1, midY, "e1")}
                {edge(cx, topY, cx + dx1, midY, "e2")}
                {edge(cx - dx1, midY, cx - dx1 - dx2, leafY, "e3")}
                {edge(cx - dx1, midY, cx - dx1 + dx2, leafY, "e4")}
                {edge(cx + dx1, midY, cx + dx1 - dx2, leafY, "e5")}
                {edge(cx + dx1, midY, cx + dx1 + dx2, leafY, "e6")}
                {/* 节点 */}
                {node(cx, topY, "n0")}
                {node(cx - dx1, midY, "n1")}
                {node(cx + dx1, midY, "n2")}
                {node(cx - dx1 - dx2, leafY, "n3")}
                {node(cx - dx1 + dx2, leafY, "n4")}
                {node(cx + dx1 - dx2, leafY, "n5")}
                {node(cx + dx1 + dx2, leafY, "n6")}
                <text
                  x={cx}
                  y={leafY + 30}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  拆成两半、子任务再并行
                </text>
              </g>
            );
          })()}

          {/* ===== ③ 流水线示意：三阶段串成一条流水线，数据流过 ===== */}
          {(() => {
            const x = colX(2);
            const cy = COL_Y + 124;
            const stageW = 50;
            const stageH = 36;
            const gap = 14;
            const totalW = stageW * 3 + gap * 2;
            const startX = x + (COL_W - totalW) / 2;
            const labels = ["阶段1", "阶段2", "阶段3"];
            return (
              <g>
                {labels.map((lbl, k) => {
                  const sx = startX + k * (stageW + gap);
                  return (
                    <g key={`p-${k}`}>
                      <rect
                        x={sx}
                        y={cy}
                        width={stageW}
                        height={stageH}
                        rx="6"
                        fill={PIPE_COLOR}
                        fillOpacity="0.18"
                        stroke={PIPE_COLOR}
                        strokeWidth="1.6"
                      />
                      <text
                        x={sx + stageW / 2}
                        y={cy + stageH / 2 + 4}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        fill="var(--text-primary)"
                      >
                        {lbl}
                      </text>
                      {/* 阶段间箭头 */}
                      {k < 2 && (
                        <text
                          x={sx + stageW + gap / 2}
                          y={cy + stageH / 2 + 4}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="700"
                          fill={PIPE_COLOR}
                        >
                          →
                        </text>
                      )}
                    </g>
                  );
                })}
                <text
                  x={x + COL_W / 2}
                  y={cy + stageH + 26}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  数据一件件流过各阶段
                </text>
              </g>
            );
          })()}

          {/* 每列底部「适合什么」一句（两行排版，避免叠字）===== */}
          {COLUMNS.map((c, i) => {
            const x = colX(i);
            const cx = x + COL_W / 2;
            // 把 fit 文案按「适合：…（…）」拆两行
            const m = c.fit.match(/^(适合：[^（]+)（(.+)）$/);
            const line1 = m ? m[1] : c.fit;
            const line2 = m ? `（${m[2]}）` : "";
            return (
              <g key={`fit-${i}`}>
                <line
                  x1={x + 16}
                  y1={COL_Y + COL_H - 56}
                  x2={x + COL_W - 16}
                  y2={COL_Y + COL_H - 56}
                  stroke={c.color}
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />
                <text
                  x={cx}
                  y={COL_Y + COL_H - 36}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="700"
                  fill={c.color}
                >
                  {line1}
                </text>
                <text
                  x={cx}
                  y={COL_Y + COL_H - 18}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {line2}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        把活分给多个线程有三条路：数据划分（同一份处理切成 N
        份各算各的）、递归划分（分治拆成子问题再并行，如并行快排）、流水线（按工序分阶段、数据流过各阶段）。没有最优，只有最配场景的那一种。
      </figcaption>
    </figure>
  );
}
