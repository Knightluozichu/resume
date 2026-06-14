/**
 * <VectorGrowthDiagram>：push_back 过程中 capacity 变化。
 *
 * 支持 `step` prop（1-4）：
 *   1: 初始空 vector，capacity=0，size=0
 *   2: push_back(1)，capacity 从 0→1，size=1
 *   3: push_back(2)，capacity 从 1→2，size=2
 *   4: push_back(3)，capacity 从 2→4（翻倍），size=3
 *
 * 用方块矩阵展示当前元素（实心 accent 色）和预留空间（虚线边框）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary / --text-secondary）。
 */
export function VectorGrowthDiagram({ step = 1 }: { step?: number }) {
  const token = {
    accent: "var(--accent)",
    border: "var(--border)",
    bg: "var(--bg)",
    bgElevated: "var(--bg-elevated)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
  };

  const cellSize = 52;
  const gap = 8;
  const startX = 80;
  const startY = 140;
  const cols = 8;

  const stepData: Record<number, { size: number; capacity: number; elements: string[] }> = {
    1: { size: 0, capacity: 0, elements: [] },
    2: { size: 1, capacity: 1, elements: ["1"] },
    3: { size: 2, capacity: 2, elements: ["1", "2"] },
    4: { size: 3, capacity: 4, elements: ["1", "2", "3"] },
  };

  const { size, capacity, elements } = stepData[step] ?? stepData[1];

  const titleText: Record<number, string> = {
    1: "初始状态：vector 为空，capacity=0",
    2: "push_back(1)：分配 capacity=1",
    3: "push_back(2)：capacity 翻到 2",
    4: "push_back(3)：capacity 翻到 4（为下一次扩容预留）",
  };

  const svgW = 720;
  const svgH = 380;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          role="img"
          aria-label={`vector push_back 第 ${step} 步：size=${size}, capacity=${capacity}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={svgW / 2} y="32" fontSize="15" fontWeight="700" fill={token.textPrimary} textAnchor="middle" fontFamily="monospace">
            {titleText[step]}
          </text>

          {/* 状态信息 */}
          <rect x={(svgW - 220) / 2} y="52" width="220" height="34" rx="6" fill={token.accent} opacity="0.08" />
          <text x={svgW / 2 - 40} y="72" fontSize="13" fontWeight="600" fill={token.textPrimary} textAnchor="middle">
            size = <tspan fill={token.accent} fontFamily="monospace">{size}</tspan>
          </text>
          <text x={svgW / 2 + 40} y="72" fontSize="13" fontWeight="600" fill={token.textPrimary} textAnchor="middle">
            capacity = <tspan fill="rgb(229,181,103)" fontFamily="monospace">{capacity}</tspan>
          </text>

          {/* 方块区域 */}
          {capacity === 0 ? (
            <rect
              x={startX}
              y={startY}
              width={cellSize}
              height={cellSize}
              rx="6"
              fill="none"
              stroke={token.border}
              strokeDasharray="4 4"
              opacity="0.5"
            />
          ) : (
            <>
              {/* 容量边框 (整个可用空间) */}
              <rect
                x={startX - 6}
                y={startY - 6}
                width={cols * (cellSize + gap) - gap + 12}
                height={cellSize + 12}
                rx="8"
                fill="none"
                stroke={token.border}
                strokeDasharray="4 4"
              />

              {/* 方块 */}
              {Array.from({ length: capacity }).map((_, i) => {
                const cx = startX + i * (cellSize + gap);
                const isUsed = i < size;
                return (
                  <g key={i}>
                    <rect
                      x={cx}
                      y={startY}
                      width={cellSize}
                      height={cellSize}
                      rx="6"
                      fill={isUsed ? token.accent : token.bg}
                      fillOpacity={isUsed ? 0.2 : 1}
                      stroke={isUsed ? token.accent : token.border}
                      strokeWidth={isUsed ? "2" : "1"}
                      strokeDasharray={isUsed ? undefined : "3 3"}
                    />
                    {isUsed && (
                      <text
                        x={cx + cellSize / 2}
                        y={startY + cellSize / 2 + 4}
                        fontSize="16"
                        fontWeight="700"
                        fill={token.accent}
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {elements[i]}
                      </text>
                    )}
                    {!isUsed && i < capacity && (
                      <text
                        x={cx + cellSize / 2}
                        y={startY + cellSize / 2 + 4}
                        fontSize="10"
                        fill={token.textSecondary}
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        预留
                      </text>
                    )}
                  </g>
                );
              })}
            </>
          )}

          {/* 图例 */}
          <g transform={`translate(${startX}, ${startY + cellSize + 40})`}>
            <rect x="0" y="4" width="18" height="14" rx="3" fill={token.accent} opacity="0.2" stroke={token.accent} strokeWidth="2" />
            <text x="26" y="16" fontSize="11" fill={token.textSecondary}>已用元素 (size 个)</text>
            <rect x="150" y="4" width="18" height="14" rx="3" fill="none" stroke={token.border} strokeDasharray="3 3" />
            <text x="176" y="16" fontSize="11" fill={token.textSecondary}>预留空间 (capacity − size)</text>
          </g>

          {/* 扩容说明 */}
          {step >= 3 && (
            <g transform={`translate(${startX}, ${startY + cellSize + 72})`}>
              <rect x="-6" y="-4" width={560} height="24" rx="6" fill="rgb(229,181,103)" opacity="0.06" />
              <text x="274" y="12" fontSize="11" fill="rgb(229,181,103)" textAnchor="middle">
                {step === 3
                  ? "capacity 不够装了 → 重新分配更大的内存，拷贝旧元素，释放旧内存"
                  : "capacity 仍不够 → 再翻倍到 4。常见实现按 2× 扩容，均摊每次 push_back 的拷贝开销接近 O(1)"}
              </text>
            </g>
          )}

          {step === 4 && (
            <>
              {/* 旧内存示意（半透明） */}
              <rect
                x={startX - 6 + 2}
                y={startY - 6 + 2}
                width={2 * (cellSize + gap) - gap + 12}
                height={cellSize + 12}
                rx="8"
                fill="none"
                stroke={token.textSecondary}
                strokeDasharray="2 4"
                opacity="0.3"
              />
              <text
                x={startX + (2 * (cellSize + gap)) / 2}
                y={startY + cellSize + 20}
                fontSize="9"
                fill={token.textSecondary}
                textAnchor="middle"
                opacity="0.5"
              >
                旧内存 (capacity=2) — 已释放
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        vector 的 push_back 动态扩容过程。当 size 达到 capacity 时，分配更大的新内存，拷贝旧元素过去，释放旧内存。典型策略是每次翻倍扩容。
      </figcaption>
    </figure>
  );
}
