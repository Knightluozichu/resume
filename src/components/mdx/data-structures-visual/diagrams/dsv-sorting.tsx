/**
 * <DsvSortingDiagram>：六大排序算法复杂度对比图（dsv-sorting 章）。
 *
 * 表格式布局展示六种排序算法的关键属性对比。
 * 底部总结栏点出选型建议。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

type SortRow = { name: string; avg: string; worst: string; space: string; stable: string; color: string };

const ROWS: readonly SortRow[] = [
  { name: "冒泡排序", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "稳定", color: secondary },
  { name: "选择排序", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "不稳定", color: secondary },
  { name: "插入排序", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "稳定", color: secondary },
  { name: "快速排序", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: "不稳定", color: accent },
  { name: "归并排序", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: "稳定", color: success },
  { name: "堆排序", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)", stable: "不稳定", color: warning },
];

export function DsvSortingDiagram() {
  const TABLE_X = 48;
  const TABLE_Y = 100;
  const ROW_H = 36;
  const cols = [
    { label: "算法", x: TABLE_X + 16, w: 100 },
    { label: "平均", x: TABLE_X + 140, w: 100 },
    { label: "最坏", x: TABLE_X + 260, w: 100 },
    { label: "空间", x: TABLE_X + 380, w: 80 },
    { label: "稳定性", x: TABLE_X + 480, w: 80 },
    { label: "推荐场景", x: TABLE_X + 570, w: 100 },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="六大排序算法复杂度对比表。冒泡/选择/插入：平均最坏均 O(n²)，空间 O(1)。快速排序：平均 O(n log n) 最坏 O(n²) 不稳定。归并排序：O(n log n) 稳定但空间 O(n)。堆排序：O(n log n) 原地但不稳定。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            六大排序算法对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            简单排序 O(n²) → 高效排序 O(n log n)，稳定性与空间各有取舍
          </text>

          {/* 表头 */}
          <rect x={TABLE_X} y={TABLE_Y} width={VIEW_W - TABLE_X * 2} height={ROW_H} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          {cols.map((c) => (
            <text key={c.label} x={c.x} y={TABLE_Y + ROW_H / 2 + 4} fontSize="12" fontWeight="700" fill={accent}>{c.label}</text>
          ))}

          {/* 数据行 */}
          {ROWS.map((r, i) => {
            const y = TABLE_Y + (i + 1) * ROW_H;
            const scenes = ["教学演示", "交换次数最少", "小数据最优", "通用最快", "需稳定性", "最坏保证"];
            return (
              <g key={r.name}>
                <rect x={TABLE_X} y={y} width={VIEW_W - TABLE_X * 2} height={ROW_H} fill={i % 2 === 0 ? "var(--bg)" : "var(--bg-elevated)"} stroke={border} strokeWidth="0.5" strokeOpacity="0.5" />
                <text x={cols[0].x} y={y + ROW_H / 2 + 4} fontSize="12" fontWeight="600" fill={r.color}>{r.name}</text>
                <text x={cols[1].x} y={y + ROW_H / 2 + 4} fontSize="12" fill={primary}>{r.avg}</text>
                <text x={cols[2].x} y={y + ROW_H / 2 + 4} fontSize="12" fill={r.worst.includes("n²") ? danger : success}>{r.worst}</text>
                <text x={cols[3].x} y={y + ROW_H / 2 + 4} fontSize="12" fill={primary}>{r.space}</text>
                <text x={cols[4].x} y={y + ROW_H / 2 + 4} fontSize="12" fill={r.stable === "稳定" ? success : warning}>{r.stable}</text>
                <text x={cols[5].x} y={y + ROW_H / 2 + 4} fontSize="11" fill={secondary}>{scenes[i]}</text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <rect x="48" y="370" width={VIEW_W - 96} height="36" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="393" textAnchor="middle" fontSize="11" fill={secondary}>
            通用大数据选快排　需要稳定性选归并　小数据选插入　需要最坏保证选堆排
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        排序算法从 O(n²) 进化到 O(n log n)，但各有取舍：快排最快但不稳定且最坏 O(n²)，归并稳定但费空间，堆排原地但常数大。选择取决于场景需求。
      </figcaption>
    </figure>
  );
}
