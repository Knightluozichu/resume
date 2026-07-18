/**
 * <KrcStringPointerDiagram>：字符串与字符指针。
 *
 * 两段对比展示：
 *   - 上段：字符数组 vs 字符指针的内存模型（可改 vs 只读）
 *   - 下段：指针运算遍历字符串（*p++ 逐字符访问直到 '\0'）
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const CELL_W = 36;
const CELL_H = 44;
const CELL_GAP = 4;

export function KrcStringPointerDiagram() {
  const chars = ["H", "e", "l", "l", "o", "\\0"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="字符串与字符指针。上段对比字符数组（栈上，可修改）与字符指针（指向只读字符串常量，不可修改）；下段展示用指针运算 *p++ 逐字符遍历直到遇到空字符。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="krc-sp-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text
            x={VIEW_W / 2}
            y={36}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            字符串与字符指针
          </text>
          <text
            x={VIEW_W / 2}
            y={58}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            字符数组可改，字符指针指向常量只读；C 字符串以 &apos;\0&apos; 结尾
          </text>

          {/* ── 上段：字符数组 vs 字符指针 ── */}
          <text
            x={40}
            y={96}
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            ① 字符数组 vs 字符指针
          </text>
          <line
            x1={32}
            y1={106}
            x2={VIEW_W - 32}
            y2={106}
            stroke="var(--border)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* 左：字符数组 char arr[] = "Hello"; */}
          <text
            x={60}
            y={134}
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
            fontFamily="monospace"
          >
            char arr[] = &quot;Hello&quot;;
          </text>
          <text x={60} y={150} fontSize="11" fill="var(--text-secondary)">
            栈上内存，可修改
          </text>
          {chars.map((c, i) => {
            const x = 60 + i * (CELL_W + CELL_GAP);
            const isNull = c === "\\0";
            return (
              <g key={`arr-${i}`}>
                <rect
                  x={x}
                  y={158}
                  width={CELL_W}
                  height={CELL_H}
                  rx="4"
                  fill={isNull ? "var(--warning)" : "var(--success)"}
                  fillOpacity={0.08}
                  stroke={isNull ? "var(--warning)" : "var(--success)"}
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <text
                  x={x + CELL_W / 2}
                  y={174}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                  fontFamily="monospace"
                >
                  arr[{i}]
                </text>
                <text
                  x={x + CELL_W / 2}
                  y={194}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                  fontFamily="monospace"
                >
                  {c}
                </text>
              </g>
            );
          })}

          {/* 右：字符指针 char *p = "Hello"; */}
          <text
            x={420}
            y={134}
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
            fontFamily="monospace"
          >
            char *p = &quot;Hello&quot;;
          </text>
          <text x={420} y={150} fontSize="11" fill="var(--text-secondary)">
            指向只读常量区，不可改
          </text>
          {/* pointer box */}
          <rect
            x={420}
            y={160}
            width={70}
            height={36}
            rx="6"
            fill="var(--bg)"
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
          />
          <text
            x={455}
            y={176}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            p
          </text>
          <text
            x={455}
            y={191}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
            fontFamily="monospace"
          >
            0x...
          </text>
          {/* arrow to string constant */}
          <line
            x1={490}
            y1={178}
            x2={520}
            y2={178}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            markerEnd="url(#krc-sp-arrow)"
          />
          {chars.map((c, i) => {
            const x = 524 + i * (CELL_W + CELL_GAP);
            const isNull = c === "\\0";
            return (
              <g key={`ptr-${i}`}>
                <rect
                  x={x}
                  y={158}
                  width={CELL_W}
                  height={CELL_H}
                  rx="4"
                  fill={isNull ? "var(--warning)" : "var(--warning)"}
                  fillOpacity={0.06}
                  stroke={isNull ? "var(--warning)" : "var(--warning)"}
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                  strokeDasharray={isNull ? undefined : "3 2"}
                />
                <text
                  x={x + CELL_W / 2}
                  y={194}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                  fontFamily="monospace"
                >
                  {c}
                </text>
              </g>
            );
          })}

          {/* ── 下段：指针运算遍历 ── */}
          <text
            x={40}
            y={244}
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            ② 指针运算遍历：while (*p) p++;
          </text>
          <line
            x1={32}
            y1={254}
            x2={VIEW_W - 32}
            y2={254}
            stroke="var(--border)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* string cells with pointer positions */}
          {chars.map((c, i) => {
            const x = 80 + i * (CELL_W + 16);
            const isNull = c === "\\0";
            return (
              <g key={`trav-${i}`}>
                <rect
                  x={x}
                  y={276}
                  width={CELL_W}
                  height={CELL_H}
                  rx="4"
                  fill={isNull ? "var(--warning)" : "var(--accent)"}
                  fillOpacity={0.06}
                  stroke={isNull ? "var(--warning)" : "var(--accent)"}
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                />
                <text
                  x={x + CELL_W / 2}
                  y={292}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                  fontFamily="monospace"
                >
                  +{i}
                </text>
                <text
                  x={x + CELL_W / 2}
                  y={312}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                  fontFamily="monospace"
                >
                  {c}
                </text>
                {/* pointer p label for each step */}
                <text
                  x={x + CELL_W / 2}
                  y={338}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--success)"
                  fontFamily="monospace"
                >
                  p (step {i})
                </text>
                {i < chars.length - 1 && (
                  <line
                    x1={x + CELL_W + 2}
                    y1={298}
                    x2={x + CELL_W + 12}
                    y2={298}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.2"
                    markerEnd="url(#krc-sp-arrow)"
                    strokeOpacity="0.4"
                  />
                )}
              </g>
            );
          })}

          {/* stop at null */}
          <rect
            x={80 + (chars.length - 1) * (CELL_W + 16) - 6}
            y={270}
            width={CELL_W + 12}
            height={CELL_H + 12}
            rx="6"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x={80 + (chars.length - 1) * (CELL_W + 16) + CELL_W / 2}
            y={356}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            *p == &apos;\0&apos; → 停止
          </text>

          {/* 底部说明 */}
          <line
            x1={32}
            y1={384}
            x2={VIEW_W - 32}
            y2={384}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text x={32} y={406} fontSize="11" fill="var(--text-secondary)">
            字符数组在栈上，元素可任意修改；字符指针指向字符串常量（通常在只读段），尝试修改会段错误。
          </text>
          <text x={32} y={424} fontSize="11" fill="var(--text-secondary)">
            *p++ 先取 p 指向的字符，再把 p 前移一格；遇到 &apos;\0&apos;（值为
            0）时 while 条件为假，循环终止。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        字符数组（可改）与字符指针（指向只读常量）的内存模型对比，以及用 *p++
        遍历字符串直到 &apos;\0&apos; 终止的指针运算过程。
      </figcaption>
    </figure>
  );
}
