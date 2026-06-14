/**
 * <VectorMemoryModelDiagram>：vector capacity vs size 与元素内存布局。
 *
 * 支持 `step` prop（1-4）：
 *   1: 初始空 vector，capacity=0，size=0，没有分配内存
 *   2: push_back(1)，capacity=1，size=1，分配了 1 个元素的内存
 *   3: push_back(2)，capacity=2，size=2，翻倍扩容
 *   4: push_back(3)，capacity=4，size=3，再翻倍——3 个已用，1 个预留
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */
export function VectorMemoryModelDiagram({ step = 1 }: { step?: number }) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const warn = "rgb(229,181,103)";

  const w = 720;
  const h = 420;

  const stepData: Record<number, { size: number; capacity: number; elements: string[] }> = {
    1: { size: 0, capacity: 0, elements: [] },
    2: { size: 1, capacity: 1, elements: ["a"] },
    3: { size: 2, capacity: 2, elements: ["a", "b"] },
    4: { size: 3, capacity: 4, elements: ["a", "b", "c"] },
  };

  const { size, capacity, elements } = stepData[step] ?? stepData[1];

  const titleTexts: Record<number, string> = {
    1: "初始状态：size=0，capacity=0，未分配内存",
    2: "push_back(\"a\")：分配 capacity=1，size=1",
    3: "push_back(\"b\")：capacity 翻倍到 2，size=2",
    4: "push_back(\"c\")：capacity 再翻倍到 4（3 已用 + 1 预留）",
  };

  const cellW = 64;
  const cellH = 48;
  const gap = 10;
  const startX = (w - 8 * (cellW + gap) + gap) / 2;
  const startY = 160;
  const maxCols = 8;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={`vector 内存模型第 ${step} 步：size=${size}, capacity=${capacity}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={w / 2} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            {titleTexts[step]}
          </text>

          {/* 状态信息条 */}
          <rect x={(w - 300) / 2} y="46" width="300" height="36" rx="8" fill={accent} opacity="0.06" stroke={border} />
          <text x={w / 2 - 70} y="68" fontSize="13" fontWeight="600" fill={primary} textAnchor="middle">
            size = <tspan fill={accent} fontFamily="monospace">{size}</tspan>
          </text>
          <text x={w / 2} y="68" fontSize="13" fontWeight="600" fill={primary} textAnchor="middle">
            capacity = <tspan fill={warn} fontFamily="monospace">{capacity}</tspan>
          </text>
          <text x={w / 2 + 70} y="68" fontSize="13" fontWeight="600" fill={primary} textAnchor="middle">
            free = <tspan fill="rgb(63,185,127)" fontFamily="monospace">{capacity - size}</tspan>
          </text>

          {/* 内存布局可视化 */}
          {capacity === 0 ? (
            <g>
              <rect
                x={startX}
                y={startY}
                width={cellW}
                height={cellH}
                rx="6"
                fill="none"
                stroke={border}
                strokeDasharray="4 4"
                opacity="0.4"
              />
              <text x={startX + cellW / 2} y={startY + cellH / 2 + 4} fontSize="10" fill={secondary} textAnchor="middle">
                无内存
              </text>
            </g>
          ) : (
            <>
              {/* 总容量外框 */}
              <rect
                x={startX - 8}
                y={startY - 8}
                width={maxCols * (cellW + gap) - gap + 16}
                height={cellH + 16}
                rx="10"
                fill="none"
                stroke={warn}
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <text
                x={startX + maxCols * (cellW + gap) / 2}
                y={startY - 16}
                fontSize="9"
                fill={warn}
                textAnchor="middle"
              >
                分配的总内存（capacity 个元素空间）
              </text>

              {/* 元素格子 */}
              {Array.from({ length: capacity }).map((_, i) => {
                const cx = startX + i * (cellW + gap);
                const used = i < size;
                return (
                  <g key={i}>
                    <rect
                      x={cx}
                      y={startY}
                      width={cellW}
                      height={cellH}
                      rx="6"
                      fill={used ? accent : bg}
                      fillOpacity={used ? 0.15 : 1}
                      stroke={used ? accent : border}
                      strokeWidth={used ? "2.5" : "1"}
                      strokeDasharray={used ? undefined : "3 3"}
                    />
                    {used && (
                      <text
                        x={cx + cellW / 2}
                        y={startY + cellH / 2 + 5}
                        fontSize="18"
                        fontWeight="700"
                        fill={accent}
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {elements[i]}
                      </text>
                    )}
                    {!used && (
                      <text
                        x={cx + cellW / 2}
                        y={startY + cellH / 2 + 4}
                        fontSize="9"
                        fill={secondary}
                        textAnchor="middle"
                      >
                        未使用
                      </text>
                    )}
                    <text
                      x={cx + cellW / 2}
                      y={startY + cellH + 16}
                      fontSize="9"
                      fill={secondary}
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      [{i}]
                    </text>
                  </g>
                );
              })}

              {/* 未分配但可见的格子（用于 step 3/4 显示扩容差距） */}
              {capacity < maxCols && Array.from({ length: maxCols - capacity }).map((_, i) => {
                const cx = startX + (capacity + i) * (cellW + gap);
                return (
                  <g key={`unused-${i}`}>
                    <rect
                      x={cx}
                      y={startY}
                      width={cellW}
                      height={cellH}
                      rx="6"
                      fill="none"
                      stroke={border}
                      strokeDasharray="2 2"
                      opacity="0.2"
                    />
                  </g>
                );
              })}
            </>
          )}

          {/* 三个指针示意 */}
          <g transform={`translate(${startX}, ${startY + cellH + 60})`}>
            {/* begin 指针 */}
            {capacity > 0 && (
              <>
                <line x1="0" y1="0" x2={cellW / 2} y2={cellH - cellH} stroke={accent} strokeWidth="1.5" markerStart="url(#dot)" />
                <text x="0" y="-14" fontSize="10" fill={accent} textAnchor="middle" fontFamily="monospace">
                  begin()
                </text>
              </>
            )}
            {/* end 指针 */}
            {size > 0 && (
              <>
                <line
                  x1={size * (cellW + gap)}
                  y1="0"
                  x2={size * (cellW + gap) - cellW / 2}
                  y2={cellH - cellH}
                  stroke={primary}
                  strokeWidth="1.5"
                  markerStart="url(#dotP)"
                />
                <text x={size * (cellW + gap)} y="-14" fontSize="10" fill={primary} textAnchor="middle" fontFamily="monospace">
                  end()
                </text>
              </>
            )}
            {/* capacity 指针 (隐式) */}
            {capacity > 0 && (
              <>
                <line
                  x1={capacity * (cellW + gap) - gap}
                  y1="0"
                  x2={capacity * (cellW + gap) - gap - cellW / 2}
                  y2={cellH - cellH}
                  stroke={warn}
                  strokeWidth="1.5"
                  markerStart="url(#dotW)"
                />
                <text x={capacity * (cellW + gap) - gap} y="-14" fontSize="10" fill={warn} textAnchor="middle" fontFamily="monospace">
                  cap
                </text>
              </>
            )}
          </g>

          {/* 图例 */}
          <g transform={`translate(${startX}, ${startY + cellH + 100})`}>
            <rect x="0" y="2" width="16" height="12" rx="3" fill={accent} opacity="0.15" stroke={accent} strokeWidth="2" />
            <text x="22" y="12" fontSize="10" fill={secondary}>已占用 (size 个)</text>
            <rect x="140" y="2" width="16" height="12" rx="3" fill="none" stroke={border} strokeDasharray="3 3" />
            <text x="162" y="12" fontSize="10" fill={secondary}>预留未用 (capacity−size)</text>
            <rect x="320" y="2" width="16" height="12" rx="3" fill="none" stroke={warn} strokeDasharray="4 4" />
            <text x="342" y="12" fontSize="10" fill={secondary}>总容量边界 (capacity)</text>
          </g>

          {/* 扩容说明（只在需要扩容的步出现） */}
          {step >= 3 && (
            <g transform={`translate(${startX}, ${startY + cellH + 122})`}>
              <rect x="-8" y="-4" width={500} height="26" rx="6" fill={warn} opacity="0.06" />
              <text x="242" y="14" fontSize="11" fill={warn} textAnchor="middle">
                {step === 3
                  ? "capacity 不够 → 分配新内存，拷贝旧元素，释放旧内存（翻倍扩容）"
                  : "capacity 仍不够 → 再次翻倍到 4。常见实现按 2× 或 1.5× 扩容，均摊 O(1)"}
              </text>
            </g>
          )}

          {/* 旧内存示意 (step 4) */}
          {step === 4 && (
            <g>
              <rect
                x={startX - 8 + 2}
                y={startY - 8 + 2}
                width={2 * (cellW + gap) + 16}
                height={cellH + 16}
                rx="10"
                fill="none"
                stroke={secondary}
                strokeDasharray="2 4"
                opacity="0.25"
              />
              <text
                x={startX + (2 * (cellW + gap)) / 2}
                y={startY + cellH + 36}
                fontSize="9"
                fill={secondary}
                textAnchor="middle"
                opacity="0.35"
              >
                旧内存 (capacity=2) — 已释放
              </text>
            </g>
          )}

          <defs>
            <marker id="dot" markerWidth="6" markerHeight="6" refX="3" refY="3">
              <circle cx="3" cy="3" r="3" fill={accent} />
            </marker>
            <marker id="dotP" markerWidth="6" markerHeight="6" refX="3" refY="3">
              <circle cx="3" cy="3" r="3" fill={primary} />
            </marker>
            <marker id="dotW" markerWidth="6" markerHeight="6" refX="3" refY="3">
              <circle cx="3" cy="3" r="3" fill={warn} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        vector 内部使用三个指针（begin / end / capacity_end）管理连续内存。size 是已用元素数，capacity 是已分配的总空间。push_back 导致 size==capacity 时触发扩容——分配更大的新内存，拷贝旧元素，释放旧内存。
      </figcaption>
    </figure>
  );
}
