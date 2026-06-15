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
    { label: "char", size: 1, color: "rgb(99,179,237)", note: "1 字节：存单个字符或 −128~127 的小整数" },
    { label: "short", size: 2, color: "rgb(99,237,179)", note: "2 字节：存 −32,768~32,767 的整数" },
    { label: "int", size: 4, color: "var(--accent)", note: "4 字节：最常用的整数类型" },
    { label: "double", size: 8, color: "rgb(237,137,99)", note: "8 字节：双精度浮点数，约 15 位有效数字" },
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
            不同数据类型在内存中占用的空间
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
            每种类型的 sizeof 值取决于编译器和平台——short ≤ int ≤ long，
            float ≤ double ≤ long double。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "第一步：char 只占 1 字节，相当于一个小格子。"}
        {step === 2 && "第二步：short 占 2 字节，比 char 宽一倍。"}
        {step === 3 && "第三步：int 占 4 字节——最常见的整型。"}
        {step === 4 && "第四步：double 占 8 字节——内存中的大块头。"}
      </figcaption>
    </figure>
  );
}
