/**
 * <InputValidationFlowDiagram>：读入 → 验证 → 重试 流程（step 1-4）。
 */

interface InputValidationFlowDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function InputValidationFlowDiagram({ step = 4 }: InputValidationFlowDiagramProps) {
  const cx = 320;
  const boxW = 200;
  const boxH = 44;
  const y1 = 64;
  const y2 = 140;
  const y3 = 216;
  const y4 = 292;
  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="输入验证与重试流程图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            输入验证循环
          </text>

          <g opacity={isActive(1) ? 1 : 0.35}>
            <rect x={cx - boxW / 2} y={y1} width={boxW} height={boxH} rx="8" fill={"var(--accent)"} fillOpacity={0.12} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={cx} y={y1 + 28} textAnchor="middle" fontSize="13" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ① 提示并读入
            </text>
          </g>

          <line x1={cx} y1={y1 + boxH} x2={cx} y2={y2} stroke={isActive(2) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" markerEnd="url(#ivf-arrow)" />

          <g opacity={isActive(2) ? 1 : 0.35}>
            <polygon
              points={`${cx},${y2 + 8} ${cx + 88},${y2 + boxH / 2 + 8} ${cx},${y2 + boxH - 8} ${cx - 88},${y2 + boxH / 2 + 8}`}
              fill={"var(--bg)"}
              stroke={isActive(2) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={y2 + boxH / 2 + 14} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ② 验证合法？
            </text>
          </g>

          {/* 合法 → 成功 */}
          <line x1={cx + 88} y1={y2 + boxH / 2 + 8} x2={520} y2={y2 + boxH / 2 + 8} stroke={isActive(3) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" />
          <text x={430} y={y2 + boxH / 2} fontSize="10" fill={"var(--accent)"} fontFamily="system-ui">
            是
          </text>
          <g opacity={isActive(3) ? 1 : 0.35}>
            <rect x={520} y={y2 + 8} width={100} height={boxH - 16} rx="8" fill={"var(--accent)"} fillOpacity={0.15} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={570} y={y2 + boxH / 2 + 6} textAnchor="middle" fontSize="11" fontWeight="600" fill={"var(--accent)"} fontFamily="monospace">
              ③ 使用数据
            </text>
          </g>

          {/* 非法 → 清理重试 */}
          <line x1={cx - 88} y1={y2 + boxH / 2 + 8} x2={120} y2={y2 + boxH / 2 + 8} stroke={isActive(4) ? "rgb(229,181,103)" : "var(--border)"} strokeWidth="1.5" />
          <text x={200} y={y2 + boxH / 2} fontSize="10" fill={"rgb(229,181,103)"} fontFamily="system-ui">
            否
          </text>
          <line x1={120} y1={y2 + boxH / 2 + 8} x2={120} y2={y4 + boxH / 2} stroke={isActive(4) ? "rgb(229,181,103)" : "var(--border)"} strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1={120} y1={y4 + boxH / 2} x2={cx - boxW / 2} y2={y4 + boxH / 2} stroke={isActive(4) ? "rgb(229,181,103)" : "var(--border)"} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#ivf-warn)" />

          <g opacity={isActive(4) ? 1 : 0.35}>
            <rect x={cx - boxW / 2} y={y4} width={boxW} height={boxH} rx="8" fill={"rgb(229,181,103)"} fillOpacity={0.1} stroke={"rgb(229,181,103)"} strokeWidth="1.5" />
            <text x={cx} y={y4 + 28} textAnchor="middle" fontSize="12" fontWeight="700" fill={"rgb(229,181,103)"} fontFamily="monospace">
              ④ 清缓冲区 + 重试
            </text>
          </g>

          <text x={24} y={348} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            健壮交互程序的核心：永远不信任用户输入，验证失败时吃掉残留字符再重新提示。
          </text>

          <defs>
            <marker id="ivf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--accent)"} />
            </marker>
            <marker id="ivf-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"rgb(229,181,103)"} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        输入验证不是「读一次就完」——失败路径必须清理 stdin 残留，否则下一次读入会读到垃圾字符，陷入死循环或静默错误。
      </figcaption>
    </figure>
  );
}
