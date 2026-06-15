/**
 * <ForLoopFlowDiagram>：C 语言 for 循环四步流程图。
 *
 * for(init; cond; update) 的执行顺序：
 * ① 初始化 → ② 条件判断 → ③ 循环体 → ④ 更新 → 回到②
 *
 * 支持 step prop (1-4) 控制当前高亮步。
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface ForLoopFlowDiagramProps {
  /** 当前高亮步 (1-4)，默认 4 展示全流程 */
  step?: 1 | 2 | 3 | 4;
}

export function ForLoopFlowDiagram({ step = 4 }: ForLoopFlowDiagramProps) {
  const w = 500;
  const cx = w / 2;

  const initY = 72;
  const condY = 140;
  const bodyX = cx + 130;
  const bodyY = 140;
  const updateX = cx + 130;
  const updateY = 260;
  const endX = cx - 130;
  const endY = 260;

  const boxW = 148;
  const boxH = 44;
  const diamondW = 128;
  const diamondH = 56;

  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} 380`}
          role="img"
          aria-label="for循环四步流程图：初始化、条件判断、循环体、更新"
          className="mx-auto block h-auto w-full max-w-[500px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            for(init; cond; update) 流程图
          </text>

          {/* ① 初始化 */}
          <g opacity={isActive(1) ? 1 : 0.3}>
            <rect
              x={cx - boxW / 2}
              y={initY - boxH / 2}
              width={boxW}
              height={boxH}
              rx="8"
              fill={"var(--accent)"}
              fillOpacity={isActive(1) ? 0.12 : 0.04}
              stroke={isActive(1) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={initY + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={isActive(1) ? "var(--text-primary)" : "var(--text-secondary)"} fontFamily="system-ui">
              ① 初始化 init
            </text>
            <text x={cx} y={initY + 22} textAnchor="middle" fontSize="10" fill={"var(--text-secondary)"} fontFamily="monospace">
              int i = 0;
            </text>
          </g>

          <line x1={cx} y1={initY + boxH / 2} x2={cx} y2={condY - diamondH / 2} stroke={isActive(2) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />

          {/* ② 条件判断 */}
          <g opacity={isActive(2) ? 1 : 0.3}>
            <polygon
              points={`${cx},${condY - diamondH / 2} ${cx + diamondW / 2},${condY} ${cx},${condY + diamondH / 2} ${cx - diamondW / 2},${condY}`}
              fill={"var(--accent)"}
              fillOpacity={isActive(2) ? 0.12 : 0.04}
              stroke={isActive(2) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={condY + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={isActive(2) ? "var(--text-primary)" : "var(--text-secondary)"} fontFamily="system-ui">
              ② 条件 cond？
            </text>
          </g>

          <line x1={cx + diamondW / 2} y1={condY} x2={bodyX - boxW / 2} y2={bodyY - boxH / 2} stroke={isActive(3) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />
          <text x={cx + diamondW / 2 + 8} y={condY - 8} fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
            真
          </text>

          {/* ③ 循环体 */}
          <g opacity={isActive(3) ? 1 : 0.3}>
            <rect
              x={bodyX - boxW / 2}
              y={bodyY - boxH / 2}
              width={boxW}
              height={boxH}
              rx="8"
              fill={"var(--accent)"}
              fillOpacity={isActive(3) ? 0.12 : 0.04}
              stroke={isActive(3) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={bodyX} y={bodyY + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={isActive(3) ? "var(--text-primary)" : "var(--text-secondary)"} fontFamily="system-ui">
              ③ 执行循环体
            </text>
          </g>

          <line x1={bodyX} y1={bodyY + boxH / 2} x2={bodyX} y2={updateY - boxH / 2} stroke={isActive(4) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />

          {/* ④ 更新 */}
          <g opacity={isActive(4) ? 1 : 0.3}>
            <rect
              x={updateX - boxW / 2}
              y={updateY - boxH / 2}
              width={boxW}
              height={boxH}
              rx="8"
              fill={"var(--accent)"}
              fillOpacity={isActive(4) ? 0.12 : 0.04}
              stroke={isActive(4) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={updateX} y={updateY + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={isActive(4) ? "var(--text-primary)" : "var(--text-secondary)"} fontFamily="system-ui">
              ④ 更新 update
            </text>
            <text x={updateX} y={updateY + 22} textAnchor="middle" fontSize="10" fill={"var(--text-secondary)"} fontFamily="monospace">
              i++
            </text>
          </g>

          {/* 回到条件 */}
          <g opacity={isActive(4) ? 1 : 0.3}>
            <path
              d={`M ${updateX - boxW / 2} ${updateY} L 36 ${updateY} L 36 ${condY} L ${cx - diamondW / 2} ${condY}`}
              fill="none"
              stroke={isActive(4) ? "var(--accent)" : "var(--text-secondary)"}
              strokeWidth="1.5"
              markerEnd={isActive(4) ? "url(#for-loop-arrow)" : "url(#for-loop-arrow-dim)"}
            />
            <text x={38} y={updateY - 12} fontSize="10" fill={isActive(4) ? "var(--accent)" : "var(--text-secondary)"} fontFamily="system-ui">
              回到②
            </text>
          </g>

          {/* 假 → 退出 */}
          <line x1={cx - diamondW / 2} y1={condY} x2={endX + boxW / 2} y2={endY - boxH / 2} stroke={"var(--text-secondary)"} strokeWidth="1.5" />
          <text x={cx - diamondW / 2 - 28} y={condY - 8} fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
            假
          </text>

          <rect x={endX - boxW / 2} y={endY - boxH / 2} width={boxW} height={boxH} rx="8" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1.5" />
          <text x={endX} y={endY + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill={"var(--text-secondary)"} fontFamily="system-ui">
            退出循环
          </text>

          <defs>
            <marker id="for-loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--accent)"} />
            </marker>
            <marker id="for-loop-arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--text-secondary)"} />
            </marker>
          </defs>

          <text x={24} y={368} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            for 把 init / cond / update 写在一行——三要素各管一段，循环体只放花括号里
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        for 循环标准流程：初始化（只执行一次）→ 条件判断 → 循环体 → 更新 → 回到条件。条件为假时退出。
      </figcaption>
    </figure>
  );
}
