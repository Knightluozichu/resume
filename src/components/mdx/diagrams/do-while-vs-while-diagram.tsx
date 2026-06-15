/**
 * <DoWhileVsWhileDiagram>：while 与 do-while 执行顺序对比图。
 *
 * 三步展示：① while 先判后做 ② do-while 先做后判 ③ 对比总结
 * 支持 step prop (1-3)。
 */

interface DoWhileVsWhileDiagramProps {
  step?: 1 | 2 | 3;
}

export function DoWhileVsWhileDiagram({ step = 3 }: DoWhileVsWhileDiagramProps) {
  const w = 520;
  const leftCx = 130;
  const rightCx = 390;
  const condY = 100;
  const bodyY = 200;
  const boxW = 120;
  const boxH = 40;
  const diamondW = 100;
  const diamondH = 48;

  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} 340`}
          role="img"
          aria-label="while与do-while循环执行顺序对比"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            while vs do-while 对比
          </text>

          {/* 左列：while */}
          <text x={leftCx} y={56} textAnchor="middle" fontSize="13" fontWeight="700" fill={isActive(1) ? "var(--accent)" : "var(--text-secondary)"} fontFamily="system-ui">
            while — 入口条件
          </text>

          <g opacity={isActive(1) ? 1 : 0.35}>
            <polygon
              points={`${leftCx},${condY - diamondH / 2} ${leftCx + diamondW / 2},${condY} ${leftCx},${condY + diamondH / 2} ${leftCx - diamondW / 2},${condY}`}
              fill={"var(--accent)"}
              fillOpacity={0.1}
              stroke={"var(--accent)"}
              strokeWidth="1.5"
            />
            <text x={leftCx} y={condY + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={"var(--text-primary)"} fontFamily="system-ui">
              ① 先判断
            </text>

            <line x1={leftCx} y1={condY + diamondH / 2} x2={leftCx} y2={bodyY - boxH / 2} stroke={"var(--accent)"} strokeWidth="1.5" markerEnd="url(#dw-arrow)" />
            <text x={leftCx + 14} y={(condY + bodyY) / 2} fontSize="9" fill={"var(--text-secondary)"} fontFamily="system-ui">
              真
            </text>

            <rect x={leftCx - boxW / 2} y={bodyY - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1.5" />
            <text x={leftCx} y={bodyY + 5} textAnchor="middle" fontSize="11" fill={"var(--text-primary)"} fontFamily="system-ui">
              ② 再执行体
            </text>

            <path d={`M ${leftCx + boxW / 2} ${bodyY} L ${leftCx + 70} ${bodyY} L ${leftCx + 70} ${condY} L ${leftCx + diamondW / 2} ${condY}`} fill="none" stroke={"var(--text-secondary)"} strokeWidth="1" strokeDasharray="4 3" />

            <text x={leftCx} y={bodyY + 48} textAnchor="middle" fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
              条件假 → 体一次都不跑
            </text>
          </g>

          {/* 右列：do-while */}
          <text x={rightCx} y={56} textAnchor="middle" fontSize="13" fontWeight="700" fill={isActive(2) ? "var(--accent)" : "var(--text-secondary)"} fontFamily="system-ui">
            do-while — 出口条件
          </text>

          <g opacity={isActive(2) ? 1 : 0.35}>
            <rect x={rightCx - boxW / 2} y={condY - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--accent)"} fillOpacity={0.1} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={rightCx} y={condY + 5} textAnchor="middle" fontSize="11" fontWeight="600" fill={"var(--text-primary)"} fontFamily="system-ui">
              ① 先执行体
            </text>

            <line x1={rightCx} y1={condY + boxH / 2} x2={rightCx} y2={bodyY - diamondH / 2} stroke={"var(--accent)"} strokeWidth="1.5" markerEnd="url(#dw-arrow)" />

            <polygon
              points={`${rightCx},${bodyY - diamondH / 2} ${rightCx + diamondW / 2},${bodyY} ${rightCx},${bodyY + diamondH / 2} ${rightCx - diamondW / 2},${bodyY}`}
              fill={"var(--bg)"}
              stroke={"var(--border)"}
              strokeWidth="1.5"
            />
            <text x={rightCx} y={bodyY + 4} textAnchor="middle" fontSize="11" fill={"var(--text-primary)"} fontFamily="system-ui">
              ② 再判断
            </text>

            <path d={`M ${rightCx + diamondW / 2} ${bodyY} L ${rightCx + 70} ${bodyY} L ${rightCx + 70} ${condY} L ${rightCx + boxW / 2} ${condY}`} fill="none" stroke={"var(--text-secondary)"} strokeWidth="1" strokeDasharray="4 3" />
            <text x={rightCx + 14} y={bodyY + diamondH / 2 + 14} fontSize="9" fill={"var(--text-secondary)"} fontFamily="system-ui">
              真 → 再来一轮
            </text>

            <text x={rightCx} y={bodyY + 56} textAnchor="middle" fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
              至少执行一次循环体
            </text>
          </g>

          {/* ③ 对比总结 */}
          <g opacity={isActive(3) ? 1 : 0.35}>
            <rect x={24} y={268} width={w - 48} height={56} rx="8" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1" />
            <text x={36} y={290} fontSize="12" fontWeight="600" fill={"var(--text-primary)"} fontFamily="system-ui">
              ③ 选型口诀
            </text>
            <text x={36} y={310} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
              可能一次都不做 → while；至少要跑一轮（菜单、输入校验）→ do-while
            </text>
          </g>

          <defs>
            <marker id="dw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--accent)"} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        while 先检查条件再执行体；do-while 先执行体再检查条件——因此 do-while 保证循环体至少运行一次。
      </figcaption>
    </figure>
  );
}
