/**
 * <IfElseFlowDiagram>：if → else if → else 的分支选择流程图。
 *
 * 菱形判断节点（条件）+ 矩形执行框（代码块）+ 箭头连接，
 * 展示程序如何根据条件选择一条路径执行。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function IfElseFlowDiagram() {
  const cx = 340;
  // 入口
  const startY = 28;
  const condTop = startY + 36;

  // 三个分支的 label
  const branchLx = 112;
  const branchMx = cx;
  const branchRx = cx + 180;

  // 菱形参数
  const diaW = 140;
  const diaH = 50;
  const diaHalfW = diaW / 2;
  const diaHalfH = diaH / 2;

  // if 条件菱形
  const ifDiaY = condTop + diaHalfH;

  // else if 条件菱形
  const eiDiaY = ifDiaY + 128;

  const boxW = 128;
  const boxH = 36;

  // 三个分支的执行框 top
  const boxTop = eiDiaY + 96;

  // 结束节点
  const endY = boxTop + boxH + 64;

  const boxCenterY = boxTop + boxH / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 680 480"
          role="img"
          aria-label="if-else if-else 分支选择流程图：菱形判断节点通过箭头引导到对应分支代码块"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* ── 入口 ── */}
          <text x={cx} y={startY} textAnchor="middle" fontSize="13" fill="var(--text-secondary)">
            程序入口
          </text>
          <line x1={cx} y1={startY + 5} x2={cx} y2={ifDiaY - diaHalfH} stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#arrowHeadGray)" />

          {/* ── if 条件菱形 ── */}
          <polygon
            points={`${cx},${ifDiaY - diaHalfH} ${cx + diaHalfW},${ifDiaY} ${cx},${ifDiaY + diaHalfH} ${cx - diaHalfW},${ifDiaY}`}
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text x={cx} y={ifDiaY + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            if (条件1)
          </text>

          {/* if true → 左分支 */}
          <text x={cx - diaHalfW - 30} y={ifDiaY - 4} textAnchor="end" fontSize="11" fill="var(--accent)">true</text>
          <line x1={cx - diaHalfW} y1={ifDiaY} x2={cx - 86} y2={ifDiaY} stroke="var(--accent)" strokeWidth="1.5" />
          <line x1={cx - 86} y1={ifDiaY} x2={cx - 86} y2={boxCenterY} stroke="var(--accent)" strokeWidth="1.5" />
          <line x1={cx - 86} y1={boxCenterY} x2={branchLx} y2={boxCenterY} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowHeadAccent)" />

          {/* if false → 往下到 else if */}
          <text x={cx + diaHalfW + 8} y={ifDiaY + 48} fontSize="11" fill="var(--text-secondary)">false</text>
          <line x1={cx + diaHalfW} y1={ifDiaY} x2={cx + diaHalfW + 40} y2={ifDiaY} stroke="var(--text-secondary)" strokeWidth="1.5" />
          <line x1={cx + diaHalfW + 40} y1={ifDiaY} x2={cx + diaHalfW + 40} y2={eiDiaY - diaHalfH} stroke="var(--text-secondary)" strokeWidth="1.5" />
          <line x1={cx + diaHalfW + 40} y1={eiDiaY - diaHalfH} x2={cx + diaHalfW} y2={eiDiaY - diaHalfH} stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrowHeadGray)" />

          {/* ── else if 条件菱形 ── */}
          <polygon
            points={`${cx},${eiDiaY - diaHalfH} ${cx + diaHalfW},${eiDiaY} ${cx},${eiDiaY + diaHalfH} ${cx - diaHalfW},${eiDiaY}`}
            fill="var(--bg)"
            stroke="var(--text-primary)"
            strokeWidth="2"
          />
          <text x={cx} y={eiDiaY + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            else if (条件2)
          </text>

          {/* else if true → 中间分支 */}
          <text x={cx - diaHalfW - 30} y={eiDiaY - 4} textAnchor="end" fontSize="11" fill="var(--text-primary)">true</text>
          <line x1={cx - diaHalfW} y1={eiDiaY} x2={cx - 42} y2={eiDiaY} stroke="var(--text-primary)" strokeWidth="1.5" />
          <line x1={cx - 42} y1={eiDiaY} x2={cx - 42} y2={boxCenterY} stroke="var(--text-primary)" strokeWidth="1.5" />
          <line x1={cx - 42} y1={boxCenterY} x2={branchMx} y2={boxCenterY} stroke="var(--text-primary)" strokeWidth="1.5" markerEnd="url(#arrowHeadAccent)" />

          {/* else if false → else 分支 */}
          <text x={cx + diaHalfW + 8} y={eiDiaY} fontSize="11" fill="var(--text-secondary)">false</text>
          <line x1={cx + diaHalfW} y1={eiDiaY} x2={branchRx} y2={eiDiaY} stroke="var(--text-secondary)" strokeWidth="1.5" />
          <line x1={branchRx} y1={eiDiaY} x2={branchRx} y2={boxCenterY} stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrowHeadGray)" />

          {/* ── 三个分支的执行框 ── */}
          {/* 分支 1：if true */}
          <rect x={branchLx - boxW / 2} y={boxTop} width={boxW} height={boxH} rx="8" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={branchLx} y={boxCenterY + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            执行代码块 A
          </text>

          {/* 分支 2：else if true */}
          <rect x={branchMx - boxW / 2} y={boxTop} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x={branchMx} y={boxCenterY + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            执行代码块 B
          </text>

          {/* 分支 3：else */}
          <rect x={branchRx - boxW / 2} y={boxTop} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.5" />
          <text x={branchRx} y={boxCenterY + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-secondary)" fontFamily="monospace">
            执行代码块 C
          </text>

          {/* else 标签 */}
          <text x={branchRx - boxW / 2 - 10} y={boxTop - 8} fontSize="11" fill="var(--text-secondary)">else</text>

          {/* ── 三个分支汇聚到结束 ── */}
          <line x1={branchLx} y1={boxTop + boxH} x2={branchLx} y2={endY - 16} stroke="var(--bg)" strokeWidth="0" />
          <line x1={branchMx} y1={boxTop + boxH} x2={branchMx} y2={endY - 16} stroke="var(--bg)" strokeWidth="0" />
          <line x1={branchRx} y1={boxTop + boxH} x2={branchRx} y2={endY - 16} stroke="var(--bg)" strokeWidth="0" />

          {/* 实际汇合线 */}
          <line x1={branchLx} y1={boxTop + boxH} x2={branchLx} y2={endY - 8} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={branchLx} y1={endY - 8} x2={branchRx} y2={endY - 8} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={branchMx} y1={boxTop + boxH} x2={branchMx} y2={endY - 8} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={branchRx} y1={boxTop + boxH} x2={branchRx} y2={endY - 8} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={cx} y1={endY - 8} x2={cx} y2={endY} stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#arrowHeadGray)" />

          {/* 结束 */}
          <text x={cx} y={endY + 18} textAnchor="middle" fontSize="13" fill="var(--text-secondary)">
            继续执行后续代码
          </text>

          {/* ── 注释文字 ── */}
          <text x={branchLx} y={boxTop - 8} fontSize="11" fill="var(--accent)">分支 1</text>
          <text x={branchMx} y={boxTop - 8} fontSize="11" fill="var(--text-primary)">分支 2</text>

          {/* ── 图例 ── */}
          <text x={24} y={420} fontSize="12" fill="var(--text-secondary)" fontFamily="monospace">
            菱形 = 条件判断   圆角矩形 = 代码块   → = 流向
          </text>
          <text x={24} y={444} fontSize="12" fill="var(--accent)" fontFamily="monospace">
            三条路径中最多选一条执行，全部 false 才走 else。
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
        程序的执行路径由条件判断决定：有且只有一条分支会被执行——条件从上到下依次检查，第一个为 true 的分支被执行后，跳过后续所有分支。
      </figcaption>
    </figure>
  );
}
