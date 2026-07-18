/**
 * <DataTypeMemoryLayout step={1|2|3|4}>：不同数据类型在内存中的布局对比图。
 *
 * Step 1: char（1 字节）——单个格子
 * Step 2: short（2 字节）——两个连续格子
 * Step 3: int（4 字节）——四个连续格子
 * Step 4: double（8 字节）——八个连续格子
 *
 * 每种类型并排展示：类型名 + sizeof 值 + 内存格子图。
 * 强调「不同宽度」如何影响内存占用。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface DataTypeMemoryLayoutProps {
  step?: 1 | 2 | 3 | 4;
}

export function DataTypeMemoryLayout({ step = 1 }: DataTypeMemoryLayoutProps) {
  const allTypes = [
    { label: "char", size: 1, color: "rgb(99,179,237)", note: "示例：1 个 C 字节" },
    { label: "short", size: 2, color: "rgb(99,237,179)", note: "示例 ABI：sizeof(short)=2" },
    { label: "int", size: 4, color: "var(--accent)", note: "示例 ABI：sizeof(int)=4" },
    { label: "double", size: 8, color: "rgb(237,137,99)", note: "示例 ABI：sizeof(double)=8" },
  ];

  // 如果 step 是特定值，只展示该 step 对应的那一行
  const typesToShow = allTypes.filter((_, i) => i + 1 <= step);

  const cellSize = 36;
  const gap = 4;
  const leftLabelX = 20;
  const cellStartX = 180;
  const rowH = 52;
  const startY = 44;

  const maxCells = 8;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 620 280"
          role="img"
          aria-label={`数据类型内存布局对比——第 ${step} 步：${typesToShow.map(t => t.label).join("、")}`}
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          {/* 标题 */}
          <text x="310" y="24" fontSize="14" fontWeight="700" fill="var(--text-primary)" textAnchor="middle">
            示例 ABI 的数据类型存储大小
          </text>

          {/* 内存示意图例 */}
          <text x="620" y="24" fontSize="11" fill="var(--text-secondary)" textAnchor="end">
            1 格 = 1 字节
          </text>

          {typesToShow.map((t, ti) => {
            const y = startY + ti * rowH;

            return (
              <g key={t.label}>
                {/* 行背景 */}
                <rect x="10" y={y - 12} width="600" height={rowH - 4} rx="4" fill="var(--bg-elevated)" />

                {/* 类型标签 + sizeof */}
                <text
                  x={leftLabelX}
                  y={y + 14}
                  fontSize="13"
                  fontWeight="700"
                  fill={t.color}
                  fontFamily="monospace"
                >
                  {t.label}
                </text>
                <text
                  x={leftLabelX}
                  y={y + 28}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  sizeof({t.label}) = {t.size}
                </text>

                {/* 内存格子 */}
                {Array.from({ length: maxCells }, (_, ci) => {
                  const cx = cellStartX + ci * (cellSize + gap);
                  const isActive = ci < t.size;
                  const alpha = isActive ? 0.25 : 0.06;
                  const stroke = isActive ? t.color : "var(--border)";

                  return (
                    <g key={ci}>
                      <rect
                        x={cx}
                        y={y - 4}
                        width={cellSize}
                        height={cellSize}
                        rx="4"
                        fill={t.color}
                        opacity={alpha}
                        stroke={stroke}
                        strokeWidth={isActive ? 2 : 1}
                      />
                      {isActive && (
                        <text
                          x={cx + cellSize / 2}
                          y={y + 17}
                          textAnchor="middle"
                          fontSize="10"
                          fill={t.color}
                          fontFamily="monospace"
                        >
                          {ti}
                        </text>
                      )}
                      {!isActive && ci < maxCells - 1 && (
                        <text
                          x={cx + cellSize / 2}
                          y={y + 17}
                          textAnchor="middle"
                          fontSize="9"
                          fill="var(--text-secondary)"
                          opacity="0.3"
                        >
                          ·
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 底部说明 */}
          <text
            x="16"
            y={startY + typesToShow.length * rowH + 14}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            格子只展示一种常见实现；实际值由当前编译目标的 sizeof 给出。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "第一步：sizeof(char) 按定义为 1；CHAR_BIT 决定该字节含多少位。"}
        {step === 2 && "第二步：图示实现的 short 为 2 字节，其他实现可能不同。"}
        {step === 3 && "第三步：图示实现的 int 为 4 字节，标准只规定最低范围。"}
        {step === 4 && "第四步：图示实现的 double 为 8 字节，表示与精度仍要查询实现。"}
      </figcaption>
    </figure>
  );
}
