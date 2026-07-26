/**
 * <DsvHeapsDiagram>：大顶堆结构与操作图解（dsv-heaps 章）。
 *
 * 左侧：大顶堆的树形视图 + 对应数组表示，标注父子下标关系。
 * 右侧：插入上浮和删除下沉的操作示意。
 * 底部总结栏点出堆的核心操作复杂度。
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

const HEAP = [50, 40, 35, 10, 20, 30];
type TNode = { x: number; y: number; val: number; idx: number };
const NODES: readonly TNode[] = [
  { x: 130, y: 90, val: 50, idx: 0 },
  { x: 90, y: 150, val: 40, idx: 1 },
  { x: 170, y: 150, val: 35, idx: 2 },
  { x: 70, y: 210, val: 10, idx: 3 },
  { x: 110, y: 210, val: 20, idx: 4 },
  { x: 150, y: 210, val: 30, idx: 5 },
];
const EDGES: readonly [number, number][] = [[0,1],[0,2],[1,3],[1,4],[2,5]];

export function DsvHeapsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="大顶堆结构图解。左侧展示一棵大顶堆：根 50，左子 40(10,20) 右子 35(30)，满足父≥子。下方对应数组 [50,40,35,10,20,30]，标注下标关系：父=(i-1)/2，左子=2i+1，右子=2i+2。右侧展示插入上浮（新元素放末尾后上浮）和删除下沉（堆顶取走后末尾移到顶下沉）。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            大顶堆：结构、数组表示与核心操作
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            完全二叉树 + 父≥子　数组存储无指针开销
          </text>

          {/* 分隔线 */}
          <line x1="260" y1="72" x2="260" y2="390" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 堆树 ===== */}
          {EDGES.map(([p, c], i) => (
            <line key={i} x1={NODES[p].x} y1={NODES[p].y} x2={NODES[c].x} y2={NODES[c].y} stroke={border} strokeWidth="1.4" />
          ))}
          {NODES.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="17" fill={i === 0 ? accent : "var(--bg-elevated)"} fillOpacity={i === 0 ? "0.12" : "1"} stroke={i === 0 ? accent : border} strokeWidth="1.5" />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={i === 0 ? accent : primary}>{n.val}</text>
            </g>
          ))}
          <text x="130" y="245" textAnchor="middle" fontSize="11" fill={success}>大顶堆：父 ≥ 子</text>

          {/* 数组表示 */}
          <text x="48" y="270" fontSize="11" fontWeight="700" fill={secondary}>数组表示</text>
          {HEAP.map((v, i) => (
            <g key={i}>
              <rect x={48 + i * 36} y={278} width="32" height="32" rx="3" fill={i === 0 ? accent : "var(--bg)"} fillOpacity={i === 0 ? "0.12" : "1"} stroke={i === 0 ? accent : border} strokeWidth="1" />
              <text x={48 + i * 36 + 16} y={298} textAnchor="middle" fontSize="12" fontWeight="600" fill={i === 0 ? accent : primary}>{v}</text>
              <text x={48 + i * 36 + 16} y={324} textAnchor="middle" fontSize="11" fill={secondary}>[{i}]</text>
            </g>
          ))}

          {/* 下标关系 */}
          <text x="48" y="348" fontSize="11" fill={primary}>父 = (i-1)//2</text>
          <text x="48" y="364" fontSize="11" fill={primary}>左子 = 2i+1　右子 = 2i+2</text>

          {/* ===== 操作示意 ===== */}
          <text x="490" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>核心操作</text>

          {/* 插入上浮 */}
          <rect x="280" y="108" width="380" height="64" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="296" y="128" fontSize="12" fontWeight="700" fill={success}>插入 push → 上浮 O(log n)</text>
          <text x="296" y="148" fontSize="11" fill={primary}>① 新元素放数组末尾</text>
          <text x="296" y="164" fontSize="11" fill={primary}>② 与父比较，大则交换上移，直到满足堆序</text>

          {/* 删除下沉 */}
          <rect x="280" y="188" width="380" height="64" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="296" y="208" fontSize="12" fontWeight="700" fill={warning}>删除堆顶 pop → 下沉 O(log n)</text>
          <text x="296" y="228" fontSize="11" fill={primary}>① 取走堆顶（最大值），末尾移到顶</text>
          <text x="296" y="244" fontSize="11" fill={primary}>② 与较大子比较，小则交换下沉</text>

          {/* 建堆 */}
          <rect x="280" y="268" width="380" height="48" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="296" y="288" fontSize="12" fontWeight="700" fill={accent}>建堆 heapify → O(n)</text>
          <text x="296" y="306" fontSize="11" fill={primary}>从最后非叶节点开始，从右到左逐个下沉</text>

          {/* 复杂度总览 */}
          <rect x="280" y="332" width="380" height="40" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="470" y="358" textAnchor="middle" fontSize="11" fill={primary}>
            取最值 O(1)　插入 O(log n)　删除 O(log n)　建堆 O(n)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        堆是完全二叉树+堆序性，用数组存储无指针开销。插入上浮、删除下沉都是 O(log n)，取最值 O(1)，是优先队列的最优实现。
      </figcaption>
    </figure>
  );
}
