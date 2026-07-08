/**
 * <DsvSearchingDiagram>：三种查找算法效率对比图（dsv-searching 章）。
 *
 * 左侧：三种查找的原理示意（顺序逐个比较 / 二分减半 / 哈希直接定位）。
 * 右侧：复杂度对比与适用场景。
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

export function DsvSearchingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="三种查找算法对比。顺序查找 O(n)：从头逐个比较，无前提。二分查找 O(log n)：有序数组中每次排除一半。哈希查找 O(1)：哈希函数直接定位，需额外空间。底部对比表：复杂度、前提、适用场景。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            三种查找算法：从 O(n) 到 O(1)
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            效率越高，前提越苛刻　顺序无门槛　二分要有序　哈希要空间
          </text>

          {/* ===== 顺序查找 ===== */}
          <rect x="48" y="80" width="624" height="64" rx="8" fill={secondary} fillOpacity="0.06" stroke={secondary} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="100" fontSize="13" fontWeight="700" fill={primary}>顺序查找</text>
          <text x="180" y="100" fontSize="13" fontWeight="600" fill={warning}>O(n)</text>
          <text x="64" y="120" fontSize="11" fill={primary}>逐个比较：[5] → [3] → [8] → [1] → [9] → ... → 找到目标</text>
          <text x="64" y="136" fontSize="11" fill={secondary}>无前提条件，适合无序小数据或一次性查找</text>

          {/* ===== 二分查找 ===== */}
          <rect x="48" y="160" width="624" height="64" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="180" fontSize="13" fontWeight="700" fill={primary}>二分查找</text>
          <text x="180" y="180" fontSize="13" fontWeight="600" fill={accent}>O(log n)</text>
          <text x="64" y="200" fontSize="11" fill={primary}>每次减半：[1,3,5,7,9,11,13] → mid=7 → 右半 → mid=11 → 左半 → mid=9 ✓</text>
          <text x="64" y="216" fontSize="11" fill={secondary}>前提：有序 + 随机访问 + 不频繁变动</text>

          {/* ===== 哈希查找 ===== */}
          <rect x="48" y="240" width="624" height="64" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="260" fontSize="13" fontWeight="700" fill={primary}>哈希查找</text>
          <text x="180" y="260" fontSize="13" fontWeight="600" fill={success}>O(1) 均摊</text>
          <text x="64" y="280" fontSize="11" fill={primary}>直接定位：hash("apple")=3 → table[3]="apple" ✓ 一步到位</text>
          <text x="64" y="296" fontSize="11" fill={secondary}>代价：额外空间 + 不支持范围查询 + 最坏 O(n) 冲突</text>

          {/* ===== 对比表 ===== */}
          <rect x="48" y="320" width="624" height="80" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x="64" y="340" fontSize="12" fontWeight="700" fill={accent}>n=100万时对比</text>
          <text x="64" y="360" fontSize="11" fill={primary}>顺序查找：平均 50 万次比较　　二分查找：约 20 次比较　　哈希查找：约 1 次计算</text>
          <text x="64" y="378" fontSize="11" fill={secondary}>效率从 O(n) → O(log n) → O(1)，每步一个数量级跃迁，但前提条件递增</text>
          <text x="64" y="394" fontSize="11" fill={secondary}>选择依据：无序→顺序　有序静态→二分　高频查找→哈希　范围查询→BST</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        查找效率从 O(n) 到 O(log n) 到 O(1) 的三次跃迁，每次跃迁都增加前提条件。顺序查找无门槛，二分要有序，哈希要空间。根据数据特征选策略。
      </figcaption>
    </figure>
  );
}
