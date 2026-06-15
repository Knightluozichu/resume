/**
 * <IncrementTimelineDiagram>：`++i`（前缀）vs `i++`（后缀）的三步时序对比图。
 *
 * 与 C++ 版 IncrementDecrementDiagram 类似，但按 C Primer Plus 风格重新设计：
 * 三步流动对比——第 1 步初始、第 2 步操作、第 3 步结果，清晰展示"先加后用"与"先用后加"的差异。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * step prop (1-3) 控制高亮步（默认 3 展示全流程）。
 * token 色，无阴影。
 */

interface IncrementTimelineDiagramProps {
  /** 当前高亮步 (1-3)，默认 3 展示全流程 */
  step?: 1 | 2 | 3;
}

export function IncrementTimelineDiagram({ step = 3 }: IncrementTimelineDiagramProps) {
  const marginL = 36;
  const topY = 72;
  const bottomY = 240;
  const boxW = 130;
  const boxH = 42;
  const gap = 60;
  const totalW = 560;

  const stepCenters = [marginL + 70, marginL + 210, marginL + 350];

  const isActive = (st: number) => step >= st;
  const activeColor = (st: number) => (isActive(st) ? "var(--accent)" : "var(--text-secondary)");
  const activeBg = (st: number) => (isActive(st) ? "var(--accent)" : "var(--border)");
  const activeText = (st: number) => (isActive(st) ? "var(--text-primary)" : "var(--text-secondary)");

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${totalW} 440`}
          role="img"
          aria-label="++i（先加后用）和 i++（先用后加）的三步时序对比：初始值→操作→表达式结果"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* ---- 上半部分：++i（前缀递增）---- */}
          <text x={marginL + 4} y={topY - 20} fontSize="16" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            ++i（前缀递增）—— 先加，后用
          </text>

          {/* 步骤 1：初始值 i=5 */}
          <rect x={stepCenters[0] - boxW / 2} y={topY} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke={activeBg(1)} strokeWidth="1.5" />
          <text x={stepCenters[0]} y={topY + boxH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill={activeText(1)} fontFamily="monospace">
            i = 5
          </text>

          {/* 箭头 1→2 */}
          {isActive(1) && (
            <line x1={stepCenters[0] + boxW / 2 + 8} y1={topY + boxH / 2} x2={stepCenters[1] - boxW / 2 - 8} y2={topY + boxH / 2} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-up)" />
          )}

          {/* 步骤 2：先自增为 6 */}
          <rect x={stepCenters[1] - boxW / 2} y={topY} width={boxW} height={boxH} rx="8" fill={isActive(2) ? "var(--accent)" : "var(--bg)"} fillOpacity={isActive(2) ? 0.12 : 1} stroke={activeBg(2)} strokeWidth="1.5" />
          <text x={stepCenters[1]} y={topY + boxH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={activeColor(2)} fontFamily="monospace">
            ++i → i=6
          </text>

          {/* 箭头 2→3 */}
          {isActive(2) && (
            <line x1={stepCenters[1] + boxW / 2 + 8} y1={topY + boxH / 2} x2={stepCenters[2] - boxW / 2 - 8} y2={topY + boxH / 2} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-up)" />
          )}

          {/* 步骤 3：用新值 6 */}
          <rect x={stepCenters[2] - boxW / 2} y={topY} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke={activeBg(3)} strokeWidth="1.5" />
          <text x={stepCenters[2]} y={topY + boxH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill={activeText(3)} fontFamily="monospace">
            表达式 = 6
          </text>

          {/* 注释 */}
          <text x={stepCenters[0]} y={topY + boxH + 20} textAnchor="middle" fontSize="11" fill={activeColor(1)}>① 初始值</text>
          <text x={stepCenters[1]} y={topY + boxH + 20} textAnchor="middle" fontSize="11" fill={activeColor(2)}>② 先自增 +1</text>
          <text x={stepCenters[2]} y={topY + boxH + 20} textAnchor="middle" fontSize="11" fill={activeColor(3)}>③ 再用新值</text>

          {/* ---- 分隔线 ---- */}
          <line x1={marginL} y1={188} x2={totalW - marginL} y2={188} stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />

          {/* ---- 下半部分：i++（后缀递增）---- */}
          <text x={marginL + 4} y={bottomY - 20} fontSize="16" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            i++（后缀递增）—— 先用，后加
          </text>

          {/* 步骤 1：初始值 i=5 */}
          <rect x={stepCenters[0] - boxW / 2} y={bottomY} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke={activeBg(1)} strokeWidth="1.5" />
          <text x={stepCenters[0]} y={bottomY + boxH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill={activeText(1)} fontFamily="monospace">i = 5</text>

          {/* 箭头 1→2 */}
          {isActive(1) && (
            <line x1={stepCenters[0] + boxW / 2 + 8} y1={bottomY + boxH / 2} x2={stepCenters[1] - boxW / 2 - 8} y2={bottomY + boxH / 2} stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow-dn)" />
          )}

          {/* 步骤 2：先返回旧值 5 */}
          <rect x={stepCenters[1] - boxW / 2} y={bottomY} width={boxW} height={boxH} rx="8" fill={isActive(2) ? "var(--accent)" : "var(--bg)"} fillOpacity={isActive(2) ? 0.12 : 1} stroke={activeBg(2)} strokeWidth="1.5" />
          <text x={stepCenters[1]} y={bottomY + 13} textAnchor="middle" fontSize="13" fontWeight="700" fill={activeColor(2)} fontFamily="monospace">
            返回旧值 5
          </text>
          <text x={stepCenters[1]} y={bottomY + 30} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">（然后 i 变 6）</text>

          {/* 箭头 2→3 */}
          {isActive(2) && (
            <line x1={stepCenters[1] + boxW / 2 + 8} y1={bottomY + boxH / 2} x2={stepCenters[2] - boxW / 2 - 8} y2={bottomY + boxH / 2} stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow-dn)" />
          )}

          {/* 步骤 3：表达式结果是旧值 5 */}
          <rect x={stepCenters[2] - boxW / 2} y={bottomY} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke={activeBg(3)} strokeWidth="1.5" />
          <text x={stepCenters[2]} y={bottomY + boxH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill={activeText(3)} fontFamily="monospace">表达式 = 5</text>

          {/* 注释 */}
          <text x={stepCenters[0]} y={bottomY + boxH + 20} textAnchor="middle" fontSize="11" fill={activeColor(1)}>① 初始值</text>
          <text x={stepCenters[1]} y={bottomY + boxH + 20} textAnchor="middle" fontSize="11" fill={activeColor(2)}>② 先用旧值</text>
          <text x={stepCenters[2]} y={bottomY + boxH + 20} textAnchor="middle" fontSize="11" fill={activeColor(3)}>③ i 之后变更</text>

          {/* ---- 标记箭头定义 ---- */}
          <defs>
            <marker id="arrow-up" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--accent)" />
            </marker>
            <marker id="arrow-dn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ---- 底部总结 ---- */}
          <text x={marginL} y={430} fontSize="12" fill="var(--accent)" fontFamily="monospace">
            ++i = 先加再用（新值）　　i++ = 先用再加（旧值）　　—— 看 ++ 在变量名前还是后。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        前缀递增（++i）：先自增、再使用新值；后缀递增（i++）：先返回旧值、再自增。二者对 i 的最终影响相同，但表达式值不同。
      </figcaption>
    </figure>
  );
}
