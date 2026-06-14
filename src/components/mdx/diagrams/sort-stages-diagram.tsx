/**
 * <SortStagesDiagram>：std::sort 排序各阶段可视化。
 *
 * 支持 `step` prop（1-4）：
 *   1: 原始无序数组 [5, 2, 8, 1, 9, 3, 6, 4, 7]
 *   2: 分区（Partition）——基准 5, 左边 <5, 右边 >5
 *   3: 左右子区间递归排序完成 [1,2,3,4,5,6,7,8,9]
 *   4: 最终排序结果，带绿色标注已排好序
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */
export function SortStagesDiagram({ step = 1 }: { step?: number }) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 760;
  const h = 340;
  const cellW = 52;
  const cellH = 44;
  const gap = 4;

  type StepDef = {
    title: string;
    subtitle: string;
    data: number[];
    highlights: Record<number, { fill: string; opacity: number; stroke: string; textColor: string }>;
    bottomText: string;
    bottomTextColor: string;
  };

  const steps: Record<number, StepDef> = {
    1: {
      title: "阶段 1：原始无序数组",
      subtitle: "std::sort(v.begin(), v.end())",
      data: [5, 2, 8, 1, 9, 3, 6, 4, 7],
      highlights: {},
      bottomText: "快速排序的内部：① 选基准（pivot）→ ② 分区（partition）→ ③ 递归子区间。",
      bottomTextColor: secondary,
    },
    2: {
      title: "阶段 2：分区（Partition）",
      subtitle: "选基准 5——左边 <5，右边 >5",
      data: [2, 1, 3, 4, 5, 8, 9, 6, 7],
      highlights: { 4: { fill: warn, opacity: 0.25, stroke: warn, textColor: warn } },
      bottomText: "Partition 是核心：扫描一遍数组，把比基准小的换到左边、大的换到右边。O(n)",
      bottomTextColor: secondary,
    },
    3: {
      title: "阶段 3：左右递归排序",
      subtitle: "递归对 [2,1,3,4] 和 [8,9,6,7] 分别排序",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      highlights: { 4: { fill: warn, opacity: 0.25, stroke: warn, textColor: warn } },
      bottomText: "基准 5 已在最终位置——左/右子区间各自递归调用 sort。分治：每层 O(n)，深 log₂n → O(n log n)",
      bottomTextColor: secondary,
    },
    4: {
      title: "阶段 4：排序完成！O(n log n)",
      subtitle: "快速排序最终结果",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      highlights: {
        0: { fill: good, opacity: 0.18, stroke: good, textColor: good },
        1: { fill: good, opacity: 0.18, stroke: good, textColor: good },
        2: { fill: good, opacity: 0.18, stroke: good, textColor: good },
        3: { fill: good, opacity: 0.18, stroke: good, textColor: good },
        4: { fill: good, opacity: 0.22, stroke: good, textColor: good },
        5: { fill: good, opacity: 0.18, stroke: good, textColor: good },
        6: { fill: good, opacity: 0.18, stroke: good, textColor: good },
        7: { fill: good, opacity: 0.18, stroke: good, textColor: good },
        8: { fill: good, opacity: 0.18, stroke: good, textColor: good },
      },
      bottomText: "排序完成——std::sort 要求 RandomAccess 迭代器，vector/deque/array 适用，list 不适用",
      bottomTextColor: good,
    },
  };

  const { title, subtitle, data, highlights, bottomText, bottomTextColor } = steps[step];
  const n = data.length;
  const totalW = n * (cellW + gap) - gap;
  const startX = (w - totalW) / 2;
  const startY = 100;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={`排序阶段 ${step}：${title}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x={w / 2} y="24" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">{title}</text>
          <text x={w / 2} y="46" fontSize="11" fill={secondary} textAnchor="middle" fontFamily="monospace">{subtitle}</text>

          {/* 数组索引 */}
          {data.map((_, i) => (
            <text
              key={`idx-${i}`}
              x={startX + i * (cellW + gap) + cellW / 2}
              y={startY - 14}
              fontSize="9"
              fill={secondary}
              textAnchor="middle"
              fontFamily="monospace"
            >
              [{i}]
            </text>
          ))}

          {/* 数组元素 */}
          {data.map((val, i) => {
            const hi = highlights[i];
            const cellFill = hi?.fill ?? accent;
            const cellOpacity = hi?.opacity ?? 0.15;
            const cellStroke = hi?.stroke ?? accent;
            const txtColor = hi?.textColor ?? accent;

            return (
              <g key={`cell-${i}`}>
                <rect
                  x={startX + i * (cellW + gap)}
                  y={startY}
                  width={cellW}
                  height={cellH}
                  rx="6"
                  fill={cellFill}
                  fillOpacity={cellOpacity}
                  stroke={cellStroke}
                />
                <text
                  x={startX + i * (cellW + gap) + cellW / 2}
                  y={startY + cellH / 2 + 5}
                  fontSize="18"
                  fontWeight="600"
                  fill={txtColor}
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* 区间标注 for partition */}
          {step === 2 && (
            <>
              <rect x={startX - 6} y={startY - 6} width={5 * (cellW + gap) + 6} height={cellH + 12} rx="10" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="5 3" />
              <text x={startX + 2 * (cellW + gap)} y={startY - 20} fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">&lt; 5</text>
              <rect x={startX + 5 * (cellW + gap) - 6} y={startY - 6} width={4 * (cellW + gap) + 6} height={cellH + 12} rx="10" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="5 3" />
              <text x={startX + 7 * (cellW + gap)} y={startY - 20} fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">&gt; 5</text>
            </>
          )}

          {/* 分隔线 for recursion */}
          {step === 3 && (
            <>
              <line x1={startX + 4 * (cellW + gap)} y1={startY - 8} x2={startX + 4 * (cellW + gap)} y2={startY + cellH + 8} stroke={accent} strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
              <text x={startX + 2 * (cellW + gap)} y={startY + cellH + 24} fontSize="9" fill={good} textAnchor="middle">左区间已排 ✓</text>
              <text x={startX + 7 * (cellW + gap)} y={startY + cellH + 24} fontSize="9" fill={good} textAnchor="middle">右区间已排 ✓</text>
            </>
          )}

          {/* 底部说明 */}
          <text x={w / 2} y={h - 20} fontSize="10" fill={bottomTextColor} textAnchor="middle">
            {bottomText}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        std::sort 的快速排序过程：选基准 → 分区（小于基准放左边，大于放右边）→ 左右子区间递归。全程 O(n log n)，需要 RandomAccess 迭代器。
      </figcaption>
    </figure>
  );
}
