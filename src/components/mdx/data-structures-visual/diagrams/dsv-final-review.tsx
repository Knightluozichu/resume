/**
 * <DsvFinalReviewDiagram>：大话数据结构全书知识串联图（dsv-final-review 章）。
 *
 * 中心节点「数据结构选择」，向外辐射三大主线：
 *   存储方式（数组→链表→树→图）、查找效率（O(n)→O(log n)→O(1)）、排序算法（O(n²)→O(n log n)）。
 * 底部总结栏点出全书核心思想。
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

export function DsvFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="大话数据结构全书知识串联图。中心是「数据结构选择」，三条主线向外辐射：存储方式演进（数组→链表→BST→堆→图）、查找效率跃迁（O(n)顺序→O(log n)二分→O(1)哈希）、排序算法进化（O(n²)冒泡→O(n log n)快排归并堆排）。底部总结：没有最好的数据结构，只有最适合场景的数据结构。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            全书知识串联图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            三条主线汇聚于「数据结构选择」
          </text>

          {/* 中心节点 */}
          <ellipse cx={VIEW_W / 2} cy="210" rx="90" ry="32" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="2" />
          <text x={VIEW_W / 2} y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>数据结构选择</text>
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="11" fill={secondary}>按操作频率选结构</text>

          {/* ===== 主线一：存储演进（左侧） ===== */}
          <line x1={VIEW_W / 2 - 90} y1="210" x2="200" y2="130" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x="48" y="100" width="180" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="138" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>主线一：存储演进</text>
          <text x="60" y="138" fontSize="11" fill={primary}>数组(连续) → 链表(链式)</text>
          <text x="60" y="154" fontSize="11" fill={primary}>→ BST → 堆 → 图</text>

          {/* ===== 主线二：查找跃迁（右侧） ===== */}
          <line x1={VIEW_W / 2 + 90} y1="210" x2="520" y2="130" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x="492" y="100" width="180" height="60" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="582" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>主线二：查找跃迁</text>
          <text x="504" y="138" fontSize="11" fill={primary}>O(n) 顺序 → O(log n)</text>
          <text x="504" y="154" fontSize="11" fill={primary}>二分/BST → O(1) 哈希</text>

          {/* ===== 主线三：排序进化（底部） ===== */}
          <line x1={VIEW_W / 2} y1="242" x2={VIEW_W / 2} y2="290" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x="200" y="290" width="320" height="56" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="310" textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>主线三：排序进化</text>
          <text x="216" y="328" fontSize="11" fill={primary}>O(n²) 冒泡/选择/插入 → O(n log n) 快排/归并/堆排</text>

          {/* 底部总结 */}
          <rect x="48" y="370" width={VIEW_W - 96} height="36" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="393" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            全书核心：没有最好的数据结构，只有最适合场景的数据结构
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三条主线串联全书：存储从线性到树到图，查找从 O(n) 到 O(1)，排序从 O(n²) 到 O(n log n)。所有知识汇聚于「根据操作频率选择数据结构」。
      </figcaption>
    </figure>
  );
}
