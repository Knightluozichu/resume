/**
 * <ShortCircuitDiagram>：逻辑运算符 && 与 || 的短路求值示意图。
 *
 * 展示：左侧操作数决定右侧是否被求值。
 * Server Component（纯展示，静态 SVG，无交互）。
 */

export function ShortCircuitDiagram() {
  const leftX = 120;
  const rightX = 380;
  const row1Y = 100;
  const row2Y = 220;
  const boxW = 148;
  const boxH = 44;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 340"
          role="img"
          aria-label="逻辑运算符短路求值示意图"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            逻辑运算符短路求值
          </text>

          {/* && 行 */}
          <text x={24} y={72} fontSize="14" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
            a &amp;&amp; b — 全真才真
          </text>

          <rect x={leftX - boxW / 2} y={row1Y - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--accent)"} fillOpacity={0.12} stroke={"var(--accent)"} strokeWidth="1.5" />
          <text x={leftX} y={row1Y + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--text-primary)"} fontFamily="monospace">
            求值 a
          </text>

          <text x={260} y={row1Y + 5} textAnchor="middle" fontSize="18" fill={"var(--text-secondary)"} fontFamily="monospace">
            &amp;&amp;
          </text>

          <rect x={rightX - boxW / 2} y={row1Y - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x={rightX} y={row1Y - 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--text-secondary)"} fontFamily="monospace">
            求值 b
          </text>
          <text x={rightX} y={row1Y + 14} textAnchor="middle" fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
            a 为假时跳过
          </text>

          <line x1={leftX + boxW / 2} y1={row1Y} x2={rightX - boxW / 2 - 40} y2={row1Y} stroke={"var(--accent)"} strokeWidth="1.5" />
          <line x1={leftX + boxW / 2 + 20} y1={row1Y + boxH / 2} x2={leftX + boxW / 2 + 20} y2={row1Y + 52} stroke={"var(--accent)"} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={leftX + boxW / 2 + 24} y={row1Y + 68} fontSize="10" fill={"var(--accent)"} fontFamily="system-ui">
            a==0 → 直接得 0，b 不算
          </text>

          {/* || 行 */}
          <text x={24} y={192} fontSize="14" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            a || b — 有真即真
          </text>

          <rect x={leftX - boxW / 2} y={row2Y - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--accent)"} fillOpacity={0.12} stroke={"var(--accent)"} strokeWidth="1.5" />
          <text x={leftX} y={row2Y + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--text-primary)"} fontFamily="monospace">
            求值 a
          </text>

          <text x={260} y={row2Y + 5} textAnchor="middle" fontSize="18" fill={"var(--text-secondary)"} fontFamily="monospace">
            ||
          </text>

          <rect x={rightX - boxW / 2} y={row2Y - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x={rightX} y={row2Y - 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--text-secondary)"} fontFamily="monospace">
            求值 b
          </text>
          <text x={rightX} y={row2Y + 14} textAnchor="middle" fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
            a 为真时跳过
          </text>

          <line x1={leftX + boxW / 2} y1={row2Y} x2={rightX - boxW / 2 - 40} y2={row2Y} stroke={"var(--text-primary)"} strokeWidth="1.5" />
          <line x1={leftX + boxW / 2 + 20} y1={row2Y + boxH / 2} x2={leftX + boxW / 2 + 20} y2={row2Y + 52} stroke={"var(--text-primary)"} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={leftX + boxW / 2 + 24} y={row2Y + 68} fontSize="10" fill={"var(--text-primary)"} fontFamily="system-ui">
            a!=0 → 直接得 1，b 不算
          </text>

          <text x={24} y={310} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            短路求值：结果已定时不再计算右侧——可用来保护除零、空指针等危险操作
          </text>
          <text x={24} y={328} fontSize="11" fill={"var(--accent)"} fontFamily="monospace">
            例：if (ptr != NULL &amp;&amp; *ptr &gt; 0)  /* ptr 空则不会解引用 */
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        `&&` 左侧为假时整个表达式为假，不再求值右侧；`||` 左侧为真时整个表达式为真，同样跳过右侧。这叫短路求值。
      </figcaption>
    </figure>
  );
}
