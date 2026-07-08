/**
 * <Gep1SceneGraphDiagram>：场景图遍历与空间分割图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 440;

export function Gep1SceneGraphDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="场景图遍历与空间分割图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            场景图：空间分割与视锥剔除
          </text>

          {/* 左：八叉树空间分割 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">八叉树空间分割</text>

          <rect x="50" y="70" width="260" height="260" rx="6" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
          <line x1="180" y1="70" x2="180" y2="330" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="50" y1="200" x2="310" y2="200" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.6" />

          {/* 四个象限再分 */}
          <line x1="115" y1="70" x2="115" y2="200" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.4" />
          <line x1="245" y1="70" x2="245" y2="200" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.4" />
          <line x1="50" y1="135" x2="180" y2="135" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.4" />
          <line x1="180" y1="135" x2="310" y2="135" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.4" />

          {/* 物体散点 */}
          <circle cx="90" cy="110" r="6" fill="var(--success)" fillOpacity="0.7" />
          <circle cx="150" cy="170" r="6" fill="var(--success)" fillOpacity="0.7" />
          <circle cx="260" cy="100" r="6" fill="var(--warning)" fillOpacity="0.7" />
          <circle cx="220" cy="175" r="6" fill="var(--warning)" fillOpacity="0.7" />
          <circle cx="90" cy="260" r="6" fill="var(--warning)" fillOpacity="0.7" />
          <circle cx="260" cy="280" r="6" fill="var(--success)" fillOpacity="0.7" />

          {/* 视锥框 */}
          <polygon points="70,90 150,90 150,180 70,180" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.4" strokeDasharray="5 3" />

          <text x="180" y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绿点在视锥内 → 渲染</text>
          <text x="180" y="366" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">黄点在视锥外 → 整个节点剔除</text>
          <text x="180" y="386" textAnchor="middle" fontSize="10" fill="var(--accent)">只需检测节点包围盒，不必遍历物体</text>
          <text x="180" y="406" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">3D 场景用八叉树，2D 用四叉树</text>

          {/* 右：场景图遍历 */}
          <text x="540" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">场景图遍历流程</text>

          <rect x="430" y="72" width="220" height="40" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 更新世界变换</text>

          <text x="540" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="430" y="136" width="220" height="40" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2. 更新包围球</text>

          <text x="540" y="192" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="430" y="200" width="220" height="40" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="224" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">3. 视锥剔除</text>

          <text x="540" y="256" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="430" y="264" width="220" height="40" rx="8" fill="var(--text-tertiary)" fillOpacity="0.16" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="540" y="288" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">4. 收集可见物体 → 渲染列表</text>

          <text x="540" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自顶向下递归</text>
          <text x="540" y="340" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">父节点包围球包含所有子节点</text>
          <text x="540" y="362" textAnchor="middle" fontSize="10" fill="var(--accent)">父节点被剔除 → 子节点全跳过</text>
          <text x="540" y="382" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">早剪枝 = O(log n) 而非 O(n)</text>
          <text x="540" y="406" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">BVH / 八叉树是空间分割的两种实现</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        场景图——空间分割让视锥剔除只需检测节点包围盒，父节点被剪枝则子树全跳过
      </figcaption>
    </figure>
  );
}
