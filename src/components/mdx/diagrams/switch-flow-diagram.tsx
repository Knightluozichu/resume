/**
 * <SwitchFlowDiagram>：switch 表达式的 case/default 跳转图。
 *
 * 展示 switch(expr) 从上到下依次匹配 case 值，匹配成功后执行对应代码块，
 * 遇到 break 跳出 switch；若都未命中则执行 default。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function SwitchFlowDiagram() {
  const cx = 320;
  const startY = 32;

  // switch 入口框
  const entryW = 200;
  const entryH = 38;
  const entryTop = startY + 16;
  const entryMid = entryTop + entryH / 2;

  // case 参数
  const caseGap = 50;
  const caseLabelX = 100;
  const caseCodeX = 340;
  const codeW = 180;
  const codeH = 36;

  const caseY0 = entryTop + entryH + 52;
  const caseY1 = caseY0 + caseGap;
  const caseY2 = caseY1 + caseGap;

  // default
  const defaultY = caseY2 + caseGap;

  // 结束
  const endY = defaultY + 64;

  const caseMid = (y: number) => y + codeH / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 440"
          role="img"
          aria-label="switch 多路分支跳转图：switch(expr) 根据值跳转到匹配的 case 或 default"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ── 入口 label ── */}
          <text x={cx} y={startY} textAnchor="middle" fontSize="13" fill="var(--text-secondary)">
            程序携带一个整型/枚举/字符值
          </text>

          {/* ── switch 入口框 ── */}
          <rect x={cx - entryW / 2} y={entryTop} width={entryW} height={entryH} rx="10" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={cx} y={entryMid + 5} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            switch (expr)
          </text>

          {/* ── 从 switch 往下连到三个 case ── */}
          <line x1={cx} y1={entryTop + entryH} x2={cx} y2={caseY0} stroke="var(--border)" strokeWidth="1.5" />

          <line x1={cx - 60} y1={caseY0} x2={cx + 60} y2={caseY0} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={cx - 60} y1={caseY0} x2={cx - 60} y2={caseMid(caseY0)} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={cx + 60} y1={caseY0} x2={cx + 60} y2={caseMid(caseY2)} stroke="var(--border)" strokeWidth="1.5" />
          {/* 横线覆盖到 caseY2 */}
          <line x1={cx - 60} y1={caseMid(caseY1)} x2={cx + 60} y2={caseMid(caseY1)} stroke="var(--border)" strokeWidth="1.5" />

          {/* case 1: 命中 → 执行 → break */}
          <line x1={cx - 60} y1={caseMid(caseY0)} x2={caseLabelX} y2={caseMid(caseY0)} stroke="var(--border)" strokeWidth="1.5" />
          <rect x={caseLabelX - 64} y={caseY0} width={128} height={codeH} rx="6" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={caseLabelX} y={caseMid(caseY0) + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            case 值1:
          </text>
          <line x1={caseLabelX + 64} y1={caseMid(caseY0)} x2={caseCodeX} y2={caseMid(caseY0)} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowHeadAccent)" />
          <rect x={caseCodeX - codeW / 2} y={caseY0} width={codeW} height={codeH} rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x={caseCodeX} y={caseMid(caseY0) + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            代码 A → break
          </text>

          {/* case 2 */}
          <line x1={cx - 60} y1={caseMid(caseY1)} x2={caseLabelX} y2={caseMid(caseY1)} stroke="var(--border)" strokeWidth="1.5" />
          <rect x={caseLabelX - 64} y={caseY1} width={128} height={codeH} rx="6" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x={caseLabelX} y={caseMid(caseY1) + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            case 值2:
          </text>
          <line x1={caseLabelX + 64} y1={caseMid(caseY1)} x2={caseCodeX} y2={caseMid(caseY1)} stroke="var(--text-primary)" strokeWidth="1.5" markerEnd="url(#arrowHeadGray)" />
          <rect x={caseCodeX - codeW / 2} y={caseY1} width={codeW} height={codeH} rx="6" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="1" />
          <text x={caseCodeX} y={caseMid(caseY1) + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            代码 B → break
          </text>

          {/* case 3 */}
          <line x1={cx - 60} y1={caseMid(caseY2)} x2={caseLabelX} y2={caseMid(caseY2)} stroke="var(--border)" strokeWidth="1.5" />
          <rect x={caseLabelX - 64} y={caseY2} width={128} height={codeH} rx="6" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x={caseLabelX} y={caseMid(caseY2) + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            case 值3:
          </text>
          <line x1={caseLabelX + 64} y1={caseMid(caseY2)} x2={caseCodeX} y2={caseMid(caseY2)} stroke="var(--text-primary)" strokeWidth="1.5" markerEnd="url(#arrowHeadGray)" />
          <rect x={caseCodeX - codeW / 2} y={caseY2} width={codeW} height={codeH} rx="6" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="1" />
          <text x={caseCodeX} y={caseMid(caseY2) + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            代码 C → break
          </text>

          {/* default */}
          <line x1={cx + 60} y1={caseMid(caseY2)} x2={cx + 60} y2={defaultY + codeH / 2} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={cx + 60} y1={defaultY + codeH / 2} x2={caseLabelX} y2={defaultY + codeH / 2} stroke="var(--border)" strokeWidth="1.5" />
          <rect x={caseLabelX - 64} y={defaultY} width={128} height={codeH} rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={caseLabelX} y={defaultY + codeH / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-secondary)" fontFamily="monospace">
            default:
          </text>
          <line x1={caseLabelX + 64} y1={defaultY + codeH / 2} x2={caseCodeX} y2={defaultY + codeH / 2} stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrowHeadGray)" />
          <rect x={caseCodeX - codeW / 2} y={defaultY} width={codeW} height={codeH} rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1" />
          <text x={caseCodeX} y={defaultY + codeH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-secondary)" fontFamily="monospace">
            默认代码
          </text>

          {/* ── 三个 case break 汇合到结束 ── */}
          <line x1={caseCodeX} y1={caseY0 + codeH} x2={caseCodeX} y2={endY - 8} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={caseCodeX + codeW / 2} y1={caseMid(caseY0)} x2={caseCodeX + codeW / 2} y2={caseMid(caseY2)} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={caseCodeX} y1={caseMid(caseY1)} x2={caseCodeX + codeW / 2} y2={caseMid(caseY1)} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={caseCodeX} y1={caseMid(caseY2)} x2={caseCodeX + codeW / 2} y2={caseMid(caseY2)} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={caseCodeX + codeW / 2} y1={endY - 8} x2={caseCodeX} y2={endY - 8} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={caseCodeX} y1={endY - 8} x2={caseCodeX} y2={endY} stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#arrowHeadGray)" />

          {/* default 也汇合 */}
          <line x1={caseCodeX} y1={defaultY + codeH} x2={caseCodeX} y2={endY - 8} stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="4 3" />

          <text x={caseCodeX} y={endY + 18} textAnchor="middle" fontSize="13" fill="var(--text-secondary)">
            所有分支汇合，继续执行
          </text>

          {/* ── 图例 ── */}
          <text x={24} y={418} fontSize="12" fill="var(--text-secondary)" fontFamily="monospace">
            expr 的值与每个 case 比较，命中则跳入；break 跳出 switch，default 是「都不命中」的兜底。
          </text>

          {/* ── 箭头标记定义 ── */}
          <defs>
            <marker id="arrowHeadAccent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill="var(--accent)" />
            </marker>
            <marker id="arrowHeadGray" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill="var(--border)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        `switch` 根据表达式的值跳转到匹配的 `case`，执行直到 `break` 跳出。忘记写 `break` 会导致「贯穿（fall-through）」——继续执行下一个 case 的代码。所有 case 都不匹配时走 `default`。
      </figcaption>
    </figure>
  );
}
