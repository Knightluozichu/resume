/**
 * <SentinelLoopDiagram>：哨兵值循环模式流程图。
 *
 * 读入 → 判断是否为哨兵 → 处理 → 再读入
 * 支持 step prop (1-4)。
 */

interface SentinelLoopDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function SentinelLoopDiagram({ step = 4 }: SentinelLoopDiagramProps) {
  const w = 480;
  const cx = w / 2;
  const readY = 80;
  const checkY = 160;
  const processY = 240;
  const boxW = 140;
  const boxH = 44;
  const diamondW = 120;
  const diamondH = 52;

  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} 360`}
          role="img"
          aria-label="哨兵值循环：读入、判断、处理、再读入"
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            哨兵值循环模式
          </text>

          {/* ① 读入 */}
          <g opacity={isActive(1) ? 1 : 0.3}>
            <rect
              x={cx - boxW / 2}
              y={readY - boxH / 2}
              width={boxW}
              height={boxH}
              rx="8"
              fill={"var(--accent)"}
              fillOpacity={0.12}
              stroke={isActive(1) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={readY + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={"var(--text-primary)"} fontFamily="system-ui">
              ① 读入一个值
            </text>
            <text x={cx} y={readY + 22} textAnchor="middle" fontSize="10" fill={"var(--text-secondary)"} fontFamily="monospace">
              scanf(&quot;%d&quot;, &amp;item);
            </text>
          </g>

          <line x1={cx} y1={readY + boxH / 2} x2={cx} y2={checkY - diamondH / 2} stroke={isActive(2) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />

          {/* ② 判断哨兵 */}
          <g opacity={isActive(2) ? 1 : 0.3}>
            <polygon
              points={`${cx},${checkY - diamondH / 2} ${cx + diamondW / 2},${checkY} ${cx},${checkY + diamondH / 2} ${cx - diamondW / 2},${checkY}`}
              fill={"var(--accent)"}
              fillOpacity={0.1}
              stroke={isActive(2) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={checkY - 2} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--text-primary)"} fontFamily="system-ui">
              ② 是哨兵值？
            </text>
            <text x={cx} y={checkY + 14} textAnchor="middle" fontSize="10" fill={"var(--text-secondary)"} fontFamily="monospace">
              item != -1
            </text>
          </g>

          {/* 真 → 处理 */}
          <line x1={cx} y1={checkY + diamondH / 2} x2={cx} y2={processY - boxH / 2} stroke={isActive(3) ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="1.5" />
          <text x={cx + 12} y={(checkY + processY) / 2} fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
            否（继续）
          </text>

          <g opacity={isActive(3) ? 1 : 0.3}>
            <rect
              x={cx - boxW / 2}
              y={processY - boxH / 2}
              width={boxW}
              height={boxH}
              rx="8"
              fill={"var(--bg)"}
              stroke={isActive(3) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={processY + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={"var(--text-primary)"} fontFamily="system-ui">
              ③ 处理该值
            </text>
          </g>

          {/* ④ 回到读入 */}
          <g opacity={isActive(4) ? 1 : 0.3}>
            <path
              d={`M ${cx + boxW / 2} ${processY} L ${w - 40} ${processY} L ${w - 40} ${readY} L ${cx + boxW / 2} ${readY}`}
              fill="none"
              stroke={"var(--accent)"}
              strokeWidth="1.5"
              markerEnd="url(#sent-arrow)"
            />
            <text x={w - 38} y={(readY + processY) / 2} fontSize="10" fill={"var(--accent)"} fontFamily="system-ui">
              ④ 再读入
            </text>
          </g>

          {/* 是哨兵 → 退出 */}
          <line x1={cx - diamondW / 2} y1={checkY} x2={48} y2={checkY} stroke={"var(--text-secondary)"} strokeWidth="1.5" />
          <text x={cx - diamondW / 2 - 36} y={checkY - 8} fontSize="10" fill={"var(--text-secondary)"} fontFamily="system-ui">
            是
          </text>
          <rect x={16} y={checkY + 20} width={72} height={32} rx="6" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1" />
          <text x={52} y={checkY + 40} textAnchor="middle" fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            结束
          </text>

          <defs>
            <marker id="sent-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--accent)"} />
            </marker>
          </defs>

          <text x={24} y={348} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            哨兵值（如 -1）标记数据结束——先读再判，适合不知道输入个数的场景
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        哨兵值循环：每次先读入数据，再判断是否为结束标记（哨兵）。不是哨兵就处理并继续读入，是哨兵则退出。
      </figcaption>
    </figure>
  );
}
