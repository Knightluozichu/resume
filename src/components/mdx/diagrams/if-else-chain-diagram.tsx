/**
 * <IfElseChainDiagram>：if → else if → else 分支链流程图。
 *
 * 三步展示：① 检查 if ② 检查 else if ③ 执行 else 或汇合
 * 支持 step prop (1-3)。
 */

interface IfElseChainDiagramProps {
  step?: 1 | 2 | 3;
}

export function IfElseChainDiagram({ step = 3 }: IfElseChainDiagramProps) {
  const cx = 260;
  const diaW = 132;
  const diaH = 52;
  const boxW = 140;
  const boxH = 40;

  const ifY = 88;
  const eiY = 168;
  const elseY = 248;
  const mergeY = 320;

  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 380"
          role="img"
          aria-label="if-else if-else 分支链流程图"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            if / else if / else 分支链
          </text>

          {/* ① if */}
          <g opacity={isActive(1) ? 1 : 0.3}>
            <polygon
              points={`${cx},${ifY - diaH / 2} ${cx + diaW / 2},${ifY} ${cx},${ifY + diaH / 2} ${cx - diaW / 2},${ifY}`}
              fill={"var(--accent)"}
              fillOpacity={0.12}
              stroke={isActive(1) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={ifY + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ① if (score &gt;= 90)
            </text>
            <rect x={cx + 100} y={ifY - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--accent)"} fillOpacity={0.12} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={cx + 170} y={ifY + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--accent)"} fontFamily="monospace">
              grade = &apos;A&apos;
            </text>
            <line x1={cx + diaW / 2} y1={ifY} x2={cx + 100} y2={ifY} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={cx + diaW / 2 + 6} y={ifY - 8} fontSize="10" fill={"var(--accent)"} fontFamily="system-ui">
              真 → 执行后跳出链
            </text>
          </g>

          <line x1={cx} y1={ifY + diaH / 2} x2={cx} y2={eiY - diaH / 2} stroke={isActive(2) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />
          <text x={cx + diaW / 2 + 8} y={(ifY + eiY) / 2} fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
            假 ↓
          </text>

          {/* ② else if */}
          <g opacity={isActive(2) ? 1 : 0.3}>
            <polygon
              points={`${cx},${eiY - diaH / 2} ${cx + diaW / 2},${eiY} ${cx},${eiY + diaH / 2} ${cx - diaW / 2},${eiY}`}
              fill={"var(--accent)"}
              fillOpacity={0.08}
              stroke={isActive(2) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={eiY + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ② else if (score &gt;= 60)
            </text>
            <rect x={cx + 100} y={eiY - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--bg)"} stroke={"var(--text-primary)"} strokeWidth="1.5" />
            <text x={cx + 170} y={eiY + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--text-primary)"} fontFamily="monospace">
              grade = &apos;P&apos;
            </text>
            <line x1={cx + diaW / 2} y1={eiY} x2={cx + 100} y2={eiY} stroke={"var(--text-primary)"} strokeWidth="1.5" />
            <text x={cx + diaW / 2 + 6} y={eiY - 8} fontSize="10" fill={"var(--text-primary)"} fontFamily="system-ui">
              真 → 执行后跳出链
            </text>
          </g>

          <line x1={cx} y1={eiY + diaH / 2} x2={cx} y2={elseY - boxH / 2} stroke={isActive(3) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />
          <text x={cx + diaW / 2 + 8} y={(eiY + elseY) / 2} fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
            全假 ↓
          </text>

          {/* ③ else */}
          <g opacity={isActive(3) ? 1 : 0.3}>
            <rect x={cx - boxW / 2} y={elseY - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--bg)"} stroke={"var(--text-secondary)"} strokeWidth="1.5" strokeDasharray="5 3" />
            <text x={cx} y={elseY + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill={"var(--text-secondary)"} fontFamily="monospace">
              ③ else grade = &apos;F&apos;
            </text>
          </g>

          <line x1={cx} y1={elseY + boxH / 2} x2={cx} y2={mergeY - 16} stroke={"var(--border)"} strokeWidth="1.5" markerEnd="url(#iec-arrow)" />
          <text x={cx} y={mergeY + 12} textAnchor="middle" fontSize="13" fill={"var(--text-secondary)"} fontFamily="system-ui">
            汇合：继续执行后续代码
          </text>

          <text x={24} y={368} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            从上到下依次检查，第一个为真的分支执行后，其余分支全部跳过
          </text>

          <defs>
            <marker id="iec-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--border)"} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        if / else if / else 构成互斥分支链：最多执行其中一个代码块，执行完毕后跳到链尾继续往下走。
      </figcaption>
    </figure>
  );
}
