/**
 * <DsvTreesBstDiagram>：二叉搜索树结构与遍历图解（dsv-trees-bst 章）。
 *
 * 左侧展示一棵 BST（50, 30, 70, 20, 40, 60, 80），标注 BST 性质。
 * 右侧展示三种遍历顺序的节点访问序列。
 * 底部总结栏点出 BST 中序遍历 = 升序序列。
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

type Node = { x: number; y: number; val: number; color?: string };

const TREE: readonly Node[] = [
  { x: 160, y: 80, val: 50, color: accent },
  { x: 100, y: 140, val: 30 },
  { x: 220, y: 140, val: 70 },
  { x: 68, y: 200, val: 20 },
  { x: 132, y: 200, val: 40 },
  { x: 188, y: 200, val: 60 },
  { x: 252, y: 200, val: 80 },
];

const EDGES: readonly [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
];

export function DsvTreesBstDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="二叉搜索树结构与遍历图解。左侧展示一棵 BST，根节点 50，左子树 30(20,40) 右子树 70(60,80)。标注性质：左子树值小于根，右子树值大于根。右侧展示三种遍历：前序 50,30,20,40,70,60,80；中序 20,30,40,50,60,70,80（升序）；后序 20,40,30,60,80,70,50。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            二叉搜索树（BST）结构与遍历
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            左子树值 < 根 < 右子树值　中序遍历 = 升序序列
          </text>

          {/* 分隔线 */}
          <line x1="300" y1="72" x2="300" y2="380" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== BST 树 ===== */}
          <text x="160" y="80" fontSize="13" fontWeight="700" fill={accent} opacity="0">.</text>

          {/* 边 */}
          {EDGES.map(([p, c], i) => (
            <line key={i} x1={TREE[p].x} y1={TREE[p].y} x2={TREE[c].x} y2={TREE[c].y} stroke={border} strokeWidth="1.4" />
          ))}

          {/* 节点 */}
          {TREE.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="18" fill={n.color ? n.color : "var(--bg-elevated)"} fillOpacity={n.color ? "0.12" : "1"} stroke={n.color || border} strokeWidth="1.5" />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={n.color || primary}>{n.val}</text>
            </g>
          ))}

          {/* BST 性质标注 */}
          <text x="48" y="248" fontSize="11" fontWeight="700" fill={secondary}>BST 性质</text>
          <text x="48" y="266" fontSize="11" fill={primary}>· 左子树所有值 < 根值</text>
          <text x="48" y="282" fontSize="11" fill={primary}>· 右子树所有值 > 根值</text>
          <text x="48" y="298" fontSize="11" fill={primary}>· 没有重复值</text>
          <text x="48" y="320" fontSize="11" fill={success}>查找：O(log n) 平衡时</text>
          <text x="48" y="336" fontSize="11" fill={danger}>退化链：O(n)</text>

          {/* ===== 遍历 ===== */}
          <text x="500" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>三种遍历顺序</text>

          {/* 前序 */}
          <rect x="330" y="108" width="340" height="56" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="344" y="128" fontSize="12" fontWeight="700" fill={accent}>前序（根→左→右）</text>
          <text x="344" y="150" fontSize="12" fontFamily="monospace" fill={primary}>50 → 30 → 20 → 40 → 70 → 60 → 80</text>

          {/* 中序 */}
          <rect x="330" y="180" width="340" height="56" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="344" y="200" fontSize="12" fontWeight="700" fill={success}>中序（左→根→右）= 升序！</text>
          <text x="344" y="222" fontSize="12" fontFamily="monospace" fill={primary}>20 → 30 → 40 → 50 → 60 → 70 → 80</text>

          {/* 后序 */}
          <rect x="330" y="252" width="340" height="56" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="344" y="272" fontSize="12" fontWeight="700" fill={warning}>后序（左→右→根）</text>
          <text x="344" y="294" fontSize="12" fontFamily="monospace" fill={primary}>20 → 40 → 30 → 60 → 80 → 70 → 50</text>

          {/* 底部总结 */}
          <rect x="48" y="330" width="252" height="56" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="174" y="352" textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>BST 核心价值</text>
          <text x="174" y="370" textAnchor="middle" fontSize="11" fill={secondary}>查找 O(log n)，中序 = 排序</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BST 的左小右大规则让查找每层排除一半子树。中序遍历「左→根→右」天然得到升序序列，这是 BST 最核心的特性。但 BST 可能退化为链，需要平衡树保证效率。
      </figcaption>
    </figure>
  );
}
