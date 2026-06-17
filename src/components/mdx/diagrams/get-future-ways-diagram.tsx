"use client";

/**
 * <GetFutureWaysDiagram>：拿到 future 的三种方式对比（HEL-232，§5 辅 Demo，静态图）。
 *
 * 餐厅后厨隐喻：future = 取餐凭证；问题是「谁来往这张凭证里填结果」。三种来源并排：
 *  ① std::async：标准库自动起一个后台任务（厨师），任务返回值自动填进 future；
 *  ② std::packaged_task：把一个可调用对象包成「带凭证的任务」，可搬运/延后，
 *     由你显式调度（在哪个线程、何时调用 task()）才执行，执行后填进 future；
 *  ③ std::promise：你手动持有写端，在任意线程 set_value/set_exception 把值/异常
 *     摆上取餐台，配对的 future 取到。
 * 三者拿结果都用同一个 future.get()——区别只在「谁、何时、怎样填这张凭证」。
 *
 * 纯静态 SVG（无动画）：不需要时间线。视觉全部 DESIGN token，无裸 hex。
 * 几何遵守硬规则：每个 text 距 viewBox 任意边 ≥12px；三列用单一公式分布；无叠字。
 */

const VIEW_W = 660;
const VIEW_H = 336; // 顶部下移＋底注 baseline 在 VIEW_H-18：标题距顶、底注距底均 ≥14px（HEL-246）

// 三列等距分布：列宽 + 列间距由单一公式给出。
const PAD_X = 18; // 左右边距（>12px）
const COLS = 3;
const COL_GAP = 18;
const COL_W = (VIEW_W - PAD_X * 2 - COL_GAP * (COLS - 1)) / COLS;
const colX = (i: number) => PAD_X + i * (COL_W + COL_GAP);

// 行 y：标题行、来源框、「谁来填」箭头标签、future 框、底注。
const SRC_Y = 70;
const SRC_H = 78;
const FUT_Y = 220;
const FUT_H = 56;

const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";

type Col = {
  key: string;
  color: string;
  title: string;
  srcLines: readonly string[]; // 来源框内多行
  fill: string; // 「谁来填」一句
  detail: string; // future 框副说明
};

const COLS_DATA: readonly Col[] = [
  {
    key: "async",
    color: ACCENT,
    title: "① std::async",
    srcLines: ["标准库自动", "起一个后台任务", "（自动雇厨师）"],
    fill: "任务返回值自动填",
    detail: "起线程＋填结果一手包办",
  },
  {
    key: "packaged_task",
    color: SUCCESS,
    title: "② std::packaged_task",
    srcLines: ["包装可调用对象", "可搬运·延后", "由你显式调度执行"],
    fill: "task() 执行后填",
    detail: "你决定在哪线程、何时跑",
  },
  {
    key: "promise",
    color: WARNING,
    title: "③ std::promise",
    srcLines: ["你手动持有写端", "任意线程", "set_value / set_exception"],
    fill: "你手动 set_value 填",
    detail: "完全手动摆上取餐台",
  },
];

export function GetFutureWaysDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="拿到 future 的三种方式对比图，三列并排。第一列 std::async：标准库自动起一个后台任务，任务返回值自动填进 future，起线程和填结果一手包办。第二列 std::packaged_task：把可调用对象包成带凭证的任务，可搬运、可延后，由你显式调度执行，执行后填进 future，你决定在哪个线程、何时跑。第三列 std::promise：你手动持有写端，在任意线程调用 set_value 或 set_exception，把值或异常摆上取餐台，完全手动。三者最终都用同一个 future 的 get 拿结果，区别只在谁、何时、怎样往这张凭证里填结果。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <defs>
            <marker
              id="gfw-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L7 3.5 L0 7 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            拿到 future 的三种方式：谁来填这张「取餐凭证」
          </text>
          <text
            x={VIEW_W / 2}
            y="52"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            三者都用同一个 future.get() 取结果，只是「谁、何时、怎样填」不同
          </text>

          {COLS_DATA.map((col, i) => {
            const x = colX(i);
            const cx = x + COL_W / 2;
            return (
              <g key={col.key}>
                {/* 来源框 */}
                <rect
                  x={x}
                  y={SRC_Y}
                  width={COL_W}
                  height={SRC_H}
                  rx="10"
                  fill={col.color}
                  fillOpacity="0.1"
                  stroke={col.color}
                  strokeWidth="1.6"
                />
                <text
                  x={cx}
                  y={SRC_Y + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={col.color}
                >
                  {col.title}
                </text>
                {col.srcLines.map((line, j) => (
                  <text
                    key={line}
                    x={cx}
                    y={SRC_Y + 40 + j * 14}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill="var(--text-secondary)"
                  >
                    {line}
                  </text>
                ))}

                {/* 「谁来填」箭头：来源框底 → future 框顶 */}
                <line
                  x1={cx}
                  y1={SRC_Y + SRC_H + 4}
                  x2={cx}
                  y2={FUT_Y - 6}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.6"
                  markerEnd="url(#gfw-arrow)"
                  opacity="0.7"
                />
                <text
                  x={cx}
                  y={(SRC_Y + SRC_H + FUT_Y) / 2 + 4}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.fill}
                </text>

                {/* future 框（共同终点） */}
                <rect
                  x={x}
                  y={FUT_Y}
                  width={COL_W}
                  height={FUT_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={cx}
                  y={FUT_Y + 22}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  future.get()
                </text>
                <text
                  x={cx}
                  y={FUT_Y + 40}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {col.detail}
                </text>
              </g>
            );
          })}

          {/* 底注 */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            async＝自动雇厨师；packaged_task＝可搬运可延后的任务；promise＝你手动摆上台
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种方式都换回一张 future「取餐凭证」、都用 future.get()
        取结果，区别只在「谁来填这张凭证」：async
        让标准库自动起任务并填；packaged_task
        把任务打包、由你显式调度执行后填；promise 则由你在任意线程手动 set_value
        填。
      </figcaption>
    </figure>
  );
}
