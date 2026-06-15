/**
 * <SwitchCaseDiagram>：switch-case 多路选择与 fall-through 穿透图。
 *
 * 四步展示：① 求值 expr ② 匹配 case ③ 执行 + break ④ fall-through 穿透
 * 支持 step prop (1-4)。
 */

interface SwitchCaseDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function SwitchCaseDiagram({ step = 4 }: SwitchCaseDiagramProps) {
  const cx = 260;
  const labelX = 100;
  const codeX = 340;
  const codeW = 168;
  const codeH = 36;
  const gap = 48;

  const entryY = 72;
  const case1Y = 140;
  const case2Y = case1Y + gap;
  const case3Y = case2Y + gap;
  const endY = 340;

  const mid = (y: number) => y + codeH / 2;
  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 400"
          role="img"
          aria-label="switch-case 多路选择与 fall-through 穿透图"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            switch-case 与 fall-through
          </text>

          {/* ① 求值 */}
          <g opacity={isActive(1) ? 1 : 0.3}>
            <rect x={cx - 90} y={entryY - 20} width={180} height={40} rx="8" fill={"var(--accent)"} fillOpacity={0.12} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={cx} y={entryY + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ① switch (choice)
            </text>
          </g>

          <line x1={cx} y1={entryY + 20} x2={cx} y2={case1Y - 4} stroke={isActive(2) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />

          {/* ② 匹配 case 1 */}
          <g opacity={isActive(2) ? 1 : 0.3}>
            <rect x={labelX - 56} y={case1Y} width={112} height={codeH} rx="6" fill={"var(--accent)"} fillOpacity={0.15} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={labelX} y={mid(case1Y) + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
              case 1:
            </text>
            <text x={cx} y={case1Y - 6} textAnchor="middle" fontSize="10" fill={"var(--accent)"} fontFamily="system-ui">
              ② choice==1 命中，跳入
            </text>
          </g>

          {/* ③ 执行 + break */}
          <g opacity={isActive(3) ? 1 : 0.3}>
            <rect x={codeX - codeW / 2} y={case1Y} width={codeW} height={codeH} rx="6" fill={"var(--bg)"} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={codeX} y={mid(case1Y) + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={"var(--text-primary)"} fontFamily="monospace">
              ③ printf(...); break;
            </text>
            <line x1={labelX + 56} y1={mid(case1Y)} x2={codeX - codeW / 2} y2={mid(case1Y)} stroke={"var(--accent)"} strokeWidth="1.5" markerEnd="url(#sc-arrow)" />
            <line x1={codeX} y1={case1Y + codeH} x2={codeX} y2={endY - 12} stroke={"var(--accent)"} strokeWidth="1.5" strokeDasharray="4 3" />
            <text x={codeX + 8} y={case1Y + codeH + 16} fontSize="10" fill={"var(--accent)"} fontFamily="system-ui">
              break 跳出 switch
            </text>
          </g>

          {/* case 2 — 缺 break */}
          <g opacity={isActive(4) ? 1 : 0.35}>
            <rect x={labelX - 56} y={case2Y} width={112} height={codeH} rx="6" fill={"var(--bg)"} stroke={"var(--text-primary)"} strokeWidth="1.5" />
            <text x={labelX} y={mid(case2Y) + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--text-primary)"} fontFamily="monospace">
              case 2:
            </text>
            <rect x={codeX - codeW / 2} y={case2Y} width={codeW} height={codeH} rx="6" fill={"var(--bg)"} stroke={"var(--text-primary)"} strokeWidth="1" />
            <text x={codeX} y={mid(case2Y) + 4} textAnchor="middle" fontSize="11" fill={"var(--text-primary)"} fontFamily="monospace">
              printf(&quot;B&quot;);
            </text>
            <line x1={labelX + 56} y1={mid(case2Y)} x2={codeX - codeW / 2} y2={mid(case2Y)} stroke={"var(--text-primary)"} strokeWidth="1" />

            <rect x={labelX - 56} y={case3Y} width={112} height={codeH} rx="6" fill={"var(--accent)"} fillOpacity={0.1} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={labelX} y={mid(case3Y) + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--accent)"} fontFamily="monospace">
              case 3:
            </text>
            <rect x={codeX - codeW / 2} y={case3Y} width={codeW} height={codeH} rx="6" fill={"var(--accent)"} fillOpacity={0.08} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={codeX} y={mid(case3Y) + 4} textAnchor="middle" fontSize="11" fill={"var(--accent)"} fontFamily="monospace">
              printf(&quot;C&quot;); break;
            </text>

            <line x1={codeX} y1={case2Y + codeH} x2={codeX} y2={case3Y} stroke={"var(--accent)"} strokeWidth="2" markerEnd="url(#sc-arrow)" />
            <text x={codeX + 10} y={mid(case2Y) + gap / 2 + 4} fontSize="10" fontWeight="700" fill={"var(--accent)"} fontFamily="system-ui">
              ④ 缺 break → 穿透 fall-through
            </text>
          </g>

          <text x={cx} y={endY + 8} textAnchor="middle" fontSize="12" fill={"var(--text-secondary)"} fontFamily="system-ui">
            所有分支汇合，继续执行 switch 之后的代码
          </text>

          <text x={24} y={388} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            case 标签只做跳转，不自动隔离代码块；break 负责跳出，漏写则继续执行下方 case
          </text>

          <defs>
            <marker id="sc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--accent)"} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        switch 根据表达式的值跳转到匹配的 case；break 阻止继续向下执行。忘记 break 会导致 fall-through，连跑多个 case 的代码。
      </figcaption>
    </figure>
  );
}
