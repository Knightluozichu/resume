/**
 * <TreeDiagram>：二叉搜索树查找路径可视化。
 * 展示 BST 中查找 62 的路径：
 * 50 (root) → 75 (62 > 50) → 62 (62 < 75) → 命中。
 * Server Component。
 */
export function TreeDiagram() {
  const VW = 720, VH = 400; // Increased VH from 380 to 400 to satisfy margin (R2)
  const NODE_R = 20;

  const ac = "var(--accent)";
  const su = "var(--success)";
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";
  const be = "var(--bg-elevated)";
  const da = "var(--danger)";

  /** 7 个节点的坐标（x, y） - 整体右移以给左侧步骤板留出空间 */
  const nodes = [
    { v: 50, x: 420, y: 75, onPath: true },   // root
    { v: 30, x: 310, y: 145, onPath: false },
    { v: 75, x: 530, y: 145, onPath: true },  // on lookup path
    { v: 20, x: 255, y: 215, onPath: false },
    { v: 40, x: 365, y: 215, onPath: false },
    { v: 62, x: 475, y: 215, onPath: true },  // target
    { v: 80, x: 585, y: 215, onPath: false },
  ];

  /** 边：父索引 → 子索引 */
  const edges: [number, number][] = [
    [0, 1], [0, 2],  // 50→30, 50→75
    [1, 3], [1, 4],  // 30→20, 30→40
    [2, 5], [2, 6],  // 75→62, 75→80
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          role="img"
          aria-label="二叉搜索树查找示意图。从根节点 50 出发查找目标 62。步骤：62 > 50 走向右侧节点 75；62 < 75 走向左侧子节点 62，定位成功。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="tr-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={ac} />
            </marker>
          </defs>

          {/* 标题 */}
          <text x={VW / 2} y={32} textAnchor="middle" fontSize="16px" fontWeight="700" fill={tp}>
            二叉搜索树：查找 62
          </text>
          <text x={VW / 2} y={53} textAnchor="middle" fontSize="11px" fill={ts}>
            左子 &lt; 根 &lt; 右子，每次比较排除一半分支
          </text>

          {/* ======== 左侧步骤控制台 ======== */}
          <rect x={24} y={75} width={170} height={110} rx={8} fill={bg} stroke={bo} strokeWidth={1.5} />
          <rect x={32} y={85} width={154} height={22} rx={4} fill={ac} fillOpacity={0.12} />
          <text x={109} y={100} textAnchor="middle" fontSize="11px" fontWeight="700" fill={ac}>
            查找路径 (Target: 62)
          </text>
          
          <text x={38} y={126} fontSize="11px" fill={tp}>
            1. 62 &gt; 50 (走右子 75)
          </text>
          <text x={38} y={146} fontSize="11px" fill={tp}>
            2. 62 &lt; 75 (走左子 62)
          </text>
          <text x={38} y={168} fontSize="11px" fontWeight="700" fill={su}>
            3. 62 == 62 (命中目标)
          </text>

          {/* ======== 边 ======== */}
          {edges.map(([pi, ci], ei) => {
            const p = nodes[pi];
            const c = nodes[ci];
            const isOnPath = p.onPath && c.onPath;
            return (
              <line
                key={`e${ei}`}
                x1={p.x}
                y1={p.y + NODE_R}
                x2={c.x}
                y2={c.y - NODE_R}
                stroke={isOnPath ? ac : bo}
                strokeWidth={isOnPath ? 2.5 : 1.5}
                strokeOpacity={isOnPath ? 1 : 0.4}
              />
            );
          })}

          {/* ======== 节点圆 ======== */}
          {nodes.map((n) => {
            const isOnPath = n.onPath;
            const isTarget = n.v === 62;
            return (
              <g key={`n${n.v}`}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={NODE_R}
                  fill={isOnPath ? ac : be}
                  fillOpacity={isOnPath ? (isTarget ? 0.2 : 0.12) : 1}
                  stroke={isOnPath ? (isTarget ? su : ac) : bo}
                  strokeWidth={isOnPath ? (isTarget ? 2.5 : 2) : 1.5}
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  fontSize="12px"
                  fontWeight={isOnPath ? "700" : "500"}
                  fill={isOnPath ? (isTarget ? su : ac) : tp}
                >
                  {n.v}
                </text>
              </g>
            );
          })}

          {/* ======== 底部 Footer ======== */}
          <line x1={40} y1={VH - 80} x2={VW - 40} y2={VH - 80} stroke={bo} strokeWidth={1} strokeDasharray="4 3" />

          <text x={VW / 2 - 160} y={VH - 54} textAnchor="middle" fontSize="11px" fill={ts}>
            平衡树 (Best / Avg)
          </text>
          <text x={VW / 2 - 160} y={VH - 36} textAnchor="middle" fontSize="13px" fontWeight="700" fill={su}>
            O(log n)
          </text>

          <line x1={VW / 2} y1={VH - 70} x2={VW / 2} y2={VH - 25} stroke={bo} strokeWidth={1} />

          <text x={VW / 2 + 160} y={VH - 54} textAnchor="middle" fontSize="11px" fill={ts}>
            退化单支树 (Worst)
          </text>
          <text x={VW / 2 + 160} y={VH - 36} textAnchor="middle" fontSize="13px" fontWeight="700" fill={da}>
            O(n)
          </text>

          {/* 最终标语 */}
          <text x={VW / 2} y={VH - 24} textAnchor="middle" fontSize="12px" fontWeight="700" fill={ac}>
            查找性能对比：平衡 O(log n) vs 退化 O(n)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        二叉搜索树（BST）平衡时查找复杂度为 O(log n)，但在最坏情况下（如有序插入）会退化为链表 O(n)。
      </figcaption>
    </figure>
  );
}
