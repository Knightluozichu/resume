/**
 * <WhileLoopFlowDiagram>：C语言 while 循环流程图。
 *
 * 用标准流程图展示 while 循环的四步执行逻辑：
 * ① 条件判断（菱形）→ ② 循环体（矩形）→ ③ 更新条件变量 → ④ 回到判断
 *
 * 支持 step prop (1-4) 控制当前高亮步。
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface WhileLoopFlowDiagramProps {
  /** 当前高亮步 (1-4)，默认 4 展示全流程 */
  step?: 1 | 2 | 3 | 4;
}

export function WhileLoopFlowDiagram({ step = 4 }: WhileLoopFlowDiagramProps) {
  const w = 480;

  // 节点位置
  const startX = w / 2;
  const startY = 40;
  const condY = 80;
  const bodyX = startX + 120;
  const bodyY = 80;
  const updateX = startX + 120;
  const updateY = 210;
  const endX = startX - 120;
  const endY = 210;

  // 节点尺寸
  const diamondW = 120;
  const diamondH = 56;
  const boxW = 140;
  const boxH = 40;

  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} 370`}
          role="img"
          aria-label="while循环的四步流程图：条件判断→循环体→更新条件→回到判断"
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          {/* 标题 */}
          <text x={24} y={28} fontSize="16" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            while 循环流程图
          </text>

          {/* ── 步骤 ①：条件判断（菱形）── */}
          <g opacity={isActive(1) ? 1 : 0.3}>
            <polygon
              points={`${startX},${condY - diamondH / 2} ${startX + diamondW / 2},${condY} ${startX},${condY + diamondH / 2} ${startX - diamondW / 2},${condY}`}
              fill="var(--accent)"
              fillOpacity={isActive(1) ? 0.12 : 0.04}
              stroke={isActive(1) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={startX} y={condY + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={isActive(1) ? "var(--text-primary)" : "var(--text-secondary)"} fontFamily="system-ui">
              ① 条件成立？
            </text>
          </g>

          {/* 开始→条件判断 */}
          <text x={startX} y={startY} textAnchor="middle" fontSize="12" fill="var(--text-secondary)" fontFamily="system-ui">开始</text>
          <line x1={startX} y1={startY + 10} x2={startX} y2={condY - diamondH / 2} stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="4 3" />

          {/* ── 条件→循环体（True 分支）── */}
          <line x1={startX + diamondW / 2} y1={condY} x2={bodyX - boxW / 2} y2={bodyY - boxH / 2} stroke={isActive(2) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />

          {/* ── 步骤 ②：循环体（矩形）── */}
          <g opacity={isActive(2) ? 1 : 0.3}>
            <rect
              x={bodyX - boxW / 2}
              y={bodyY - boxH / 2}
              width={boxW}
              height={boxH}
              rx="8"
              fill={isActive(2) ? "var(--accent)" : "var(--bg)"}
              fillOpacity={isActive(2) ? 0.12 : 1}
              stroke={isActive(2) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={bodyX} y={bodyY + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={isActive(2) ? "var(--text-primary)" : "var(--text-secondary)"} fontFamily="system-ui">
              ② 执行循环体
            </text>
            <text x={bodyX} y={bodyY + 20} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
              花括号内的代码
            </text>
          </g>

          {/* ── 循环体→更新条件 ── */}
          <line x1={bodyX} y1={bodyY + boxH / 2} x2={bodyX} y2={updateY - boxH / 2} stroke={isActive(3) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />

          {/* ── 步骤 ③：更新条件（矩形）── */}
          <g opacity={isActive(3) ? 1 : 0.3}>
            <rect
              x={updateX - boxW / 2}
              y={updateY - boxH / 2}
              width={boxW}
              height={boxH}
              rx="8"
              fill={isActive(3) ? "var(--accent)" : "var(--bg)"}
              fillOpacity={isActive(3) ? 0.12 : 1}
              stroke={isActive(3) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={updateX} y={updateY + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={isActive(3) ? "var(--text-primary)" : "var(--text-secondary)"} fontFamily="system-ui">
              ③ 更新条件变量
            </text>
            <text x={updateX} y={updateY + 20} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
              i++ / n-- / ...
            </text>
          </g>

          {/* ── 回到判断（弧形箭头）── */}
          <g opacity={isActive(4) ? 1 : 0.3}>
            <path
              d={`M ${updateX - boxW / 2} ${updateY} L 40 ${updateY} L 40 ${condY} L ${startX - diamondW / 2} ${condY}`}
              fill="none"
              stroke={isActive(4) ? "var(--accent)" : "var(--text-secondary)"}
              strokeWidth="1.5"
              markerEnd={isActive(4) ? "url(#loop-arrow)" : "url(#loop-arrow-dim)"}
            />
            <text x={42} y={updateY - 14} fontSize="10" fill={isActive(4) ? "var(--accent)" : "var(--text-secondary)"} fontFamily="system-ui">
              ④ 回到判断
            </text>
          </g>

          {/* ── 条件→结束（False 分支）── */}
          <g opacity={isActive(4) ? 1 : 0.3}>
            <line x1={startX - diamondW / 2} y1={condY} x2={endX + boxW / 2} y2={endY - boxH / 2} stroke="var(--text-secondary)" strokeWidth="1.5" />
          </g>

          {/* ── 结束节点 ── */}
          <rect x={endX - boxW / 2} y={endY - boxH / 2} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={endX} y={endY + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-secondary)" fontFamily="system-ui">
            退出循环
          </text>

          {/* ── 箭头标记 ── */}
          <defs>
            <marker id="loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--accent)" />
            </marker>
            <marker id="loop-arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 图例 */}
          <text x={24} y={360} fontSize="11" fill="var(--text-secondary)" fontFamily="system-ui">
            菱形 = 条件判断 · 矩形 = 执行步骤 · 返回弧线 = 继续循环 · 向左分支 = 退出
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        while 循环的标准执行流程：先检查条件 → 条件为真执行循环体 → 更新条件变量 → 回到检查。条件为假时退出循环。
      </figcaption>
    </figure>
  );
}
