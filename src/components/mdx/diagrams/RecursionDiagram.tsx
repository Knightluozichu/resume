/**
 * <RecursionDiagram>：递归调用栈可视化。
 * 以 factorial(4) 为例展示递归过程：
 * - 左侧：调用栈向下展开（4 个彩色矩形嵌套），每个框标注当前调用和计算。
 * - 右侧：返回箭头向上传递结果。
 * - 底部：标注基线条件 factorial(1) = 1，递归步 n * factorial(n-1)。
 * Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 530; // Increased from 520 to satisfy bottom margin (R2)

const BOX_W = 260;
const BOX_H = 52;
const BOX_GAP = 20;
const START_X = 100;
const START_Y = 100;

const COLORS = [
  "var(--accent)",
  "var(--success)",
  "var(--warning)",
  "var(--danger)",
];

const CALLS = [
  { label: "factorial(4)", expr: "4 × f(3)", result: "→ 4 × 6 = 24" },
  { label: "factorial(3)", expr: "3 × f(2)", result: "→ 3 × 2 = 6" },
  { label: "factorial(2)", expr: "2 × f(1)", result: "→ 2 × 1 = 2" },
  { label: "factorial(1)", expr: "基线条件", result: "= 1" },
];

const REC_ARIA =
  "递归调用栈示意图。以 factorial(4) 为例展示递归过程。" +
  "左侧四个彩色矩形从上到下依次展开调用栈：" +
  "factorial(4) = 4 × f(3)、factorial(3) = 3 × f(2)、" +
  "factorial(2) = 2 × f(1)、factorial(1) 基线条件 = 1。" +
  "右侧箭头表示从底部向上逐层返回计算结果：1 → 2 → 6 → 24。" +
  "底部标注基线条件加递归步等于子问题缩小直到原子。";

export function RecursionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={REC_ARIA}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {COLORS.map((_, i) => (
              <marker
                key={i}
                id={`rec-arrow-${i}`}
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 z" fill={COLORS[i]} />
              </marker>
            ))}
          </defs>

          {/* 标题 */}
          <text
            x={VIEW_W / 2}
            y={30}
            textAnchor="middle"
            fontSize="16px"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            递归：factorial(4) 调用栈
          </text>
          <text
            x={VIEW_W / 2}
            y={54}
            textAnchor="middle"
            fontSize="11px"
            fill="var(--text-secondary)"
          >
            向下递推（调用）→ 向上回归（计算）
          </text>

          {/* 调用栈向下递推的垂直箭头 */}
          {[0, 1, 2].map((i) => (
            <line
              key={`down-${i}`}
              x1={START_X + BOX_W / 2}
              y1={START_Y + i * (BOX_H + BOX_GAP) + BOX_H}
              x2={START_X + BOX_W / 2}
              y2={START_Y + (i + 1) * (BOX_H + BOX_GAP)}
              stroke={COLORS[i]}
              strokeWidth="2"
              markerEnd={`url(#rec-arrow-${i})`}
            />
          ))}

          {/* 调用栈盒子 */}
          {CALLS.map((call, i) => {
            const y = START_Y + i * (BOX_H + BOX_GAP);
            return (
              <g key={i}>
                <rect
                  x={START_X}
                  y={y}
                  width={BOX_W}
                  height={BOX_H}
                  rx="10"
                  fill={COLORS[i]}
                  fillOpacity="0.1"
                  stroke={COLORS[i]}
                  strokeWidth="2"
                />
                <text
                  x={START_X + 16}
                  y={y + 22}
                  fontSize="12px"
                  fontWeight="700"
                  fill={`var(--text-primary)`}
                >
                  {call.label}
                </text>
                <text
                  x={START_X + 16}
                  y={y + 40}
                  fontSize="11px"
                  fill={COLORS[i]}
                >
                  {call.expr}
                </text>
              </g>
            );
          })}

          {/* 右侧返回结果 */}
          {/* 从底部向上返回的箭头 */}
          {[0, 1, 2].map((i) => {
            const fromY = START_Y + (2 - i + 1) * (BOX_H + BOX_GAP);
            const toY = START_Y + (2 - i) * (BOX_H + BOX_GAP) + BOX_H;
            return (
              <line
                key={`up-${i}`}
                x1={START_X + BOX_W + 80}
                y1={fromY}
                x2={START_X + BOX_W + 80}
                y2={toY}
                stroke={COLORS[2 - i]}
                strokeWidth="1.8"
                strokeDasharray="5 3"
                markerEnd={`url(#rec-arrow-${2 - i})`}
              />
            );
          })}

          {/* 返回结果标签 */}
          {[0, 1, 2, 3].map((i) => {
            const y = START_Y + i * (BOX_H + BOX_GAP) + BOX_H / 2;
            return (
              <text
                key={`res-${i}`}
                x={START_X + BOX_W + 110}
                y={y + 4}
                fontSize="11px"
                fontWeight="600"
                fill={COLORS[i]}
              >
                {CALLS[i].result}
              </text>
            );
          })}

          {/* 向右展开箭头 */}
          {[0, 1, 2].map((i) => {
            const y = START_Y + i * (BOX_H + BOX_GAP) + BOX_H / 2;
            return (
              <line
                key={`expand-${i}`}
                x1={START_X + BOX_W + 4}
                y1={y}
                x2={START_X + BOX_W + 68}
                y2={y}
                stroke="var(--text-secondary)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
            );
          })}

          {/* 栈的标签 */}
          <text
            x={START_X + BOX_W / 2}
            y={START_Y - 14}
            textAnchor="middle"
            fontSize="11px"
            fontWeight="600"
            fill={"var(--accent)"}
          >
            ▼ 调用栈向下递推
          </text>

          <text
            x={START_X + BOX_W + 80}
            y={START_Y - 14}
            textAnchor="middle"
            fontSize="11px"
            fontWeight="600"
            fill={"var(--success)"}
          >
            ▲ 返回值向上回归
          </text>

          {/* ===== 关键概念总结 ===== */}
          <line
            x1={30}
            y1={START_Y + 4 * (BOX_H + BOX_GAP) + 30}
            x2={VIEW_W - 30}
            y2={START_Y + 4 * (BOX_H + BOX_GAP) + 30}
            stroke={"var(--border)"}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* 基线条件框 */}
          <rect
            x={88}
            y={START_Y + 4 * (BOX_H + BOX_GAP) + 50}
            width={180}
            height={46}
            rx="8"
            fill={"var(--accent)"}
            fillOpacity="0.08"
            stroke={"var(--accent)"}
            strokeWidth="1.5"
          />
          <text
            x={178}
            y={START_Y + 4 * (BOX_H + BOX_GAP) + 70}
            textAnchor="middle"
            fontSize="11px"
            fontWeight="700"
            fill={"var(--accent)"}
          >
            基线条件
          </text>
          <text
            x={178}
            y={START_Y + 4 * (BOX_H + BOX_GAP) + 88}
            textAnchor="middle"
            fontSize="11px"
            fill="var(--text-secondary)"
          >
            f(1) = 1（直接返回）
          </text>

          {/* 加号 */}
          <text
            x={VIEW_W / 2}
            y={START_Y + 4 * (BOX_H + BOX_GAP) + 78}
            textAnchor="middle"
            fontSize="18px"
            fill="var(--text-secondary)"
          >
            +
          </text>

          {/* 递归步框 */}
          <rect
            x={320}
            y={START_Y + 4 * (BOX_H + BOX_GAP) + 50}
            width={200}
            height={46}
            rx="8"
            fill={"var(--success)"}
            fillOpacity="0.08"
            stroke={"var(--success)"}
            strokeWidth="1.5"
          />
          <text
            x={420}
            y={START_Y + 4 * (BOX_H + BOX_GAP) + 70}
            textAnchor="middle"
            fontSize="11px"
            fontWeight="700"
            fill={"var(--success)"}
          >
            递归步
          </text>
          <text
            x={420}
            y={START_Y + 4 * (BOX_H + BOX_GAP) + 88}
            textAnchor="middle"
            fontSize="11px"
            fill="var(--text-secondary)"
          >
            n × f(n−1)（缩小问题）
          </text>

          <text
            x={VIEW_W / 2}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="12px"
            fontWeight="700"
            fill={"var(--accent)"}
          >
            基线条件 + 递归步 = 子问题缩小直到原子
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        递归三要素：基线条件（factorial(1)=1，停止递推）、
        递归步（factorial(n)=n×factorial(n−1)，缩小问题规模）、
        返回值向上逐层归并，最终 factorial(4)=24。
      </figcaption>
    </figure>
  );
}
