/**
 * <RtcdSpatialPartitioningDiagram>：空间分割策略对比图解（网格/八叉树/松散四叉树）。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 430;

export function RtcdSpatialPartitioningDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="空间分割策略对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            空间分割：均匀网格 / 八叉树 / 松散四叉树
          </text>

          {/* 1. 均匀网格 */}
          <rect x="20" y="50" width="225" height="250" rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="132" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">均匀网格 Grid</text>

          {/* 网格线 */}
          {[95, 130, 165, 200, 235].map((y) => (
            <line key={`gh${y}`} x1="40" y1={y} x2="225" y2={y} stroke="var(--success)" strokeWidth="0.7" strokeOpacity="0.3" />
          ))}
          {[70, 100, 130, 160, 190, 220].map((x) => (
            <line key={`gv${x}`} x1={x} y1="85" x2={x} y2="250" stroke="var(--success)" strokeWidth="0.7" strokeOpacity="0.3" />
          ))}
          {/* 物体 */}
          <circle cx="80" cy="120" r="7" fill="var(--accent)" fillOpacity="0.5" stroke="var(--accent)" strokeWidth="1" />
          <circle cx="170" cy="180" r="7" fill="var(--accent)" fillOpacity="0.5" stroke="var(--accent)" strokeWidth="1" />
          <circle cx="120" cy="220" r="7" fill="var(--accent)" fillOpacity="0.5" stroke="var(--accent)" strokeWidth="1" />
          <text x="132" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">定长格子 · 只查相邻格</text>
          <text x="132" y="290" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">简单 · 分布不均时退化</text>

          {/* 2. 八叉树 */}
          <rect x="255" y="50" width="225" height="250" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="367" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">八叉树 Octree</text>

          {/* 根区域 */}
          <rect x="275" y="85" width="185" height="160" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
          {/* 一级分割 */}
          <line x1="367" y1="85" x2="367" y2="245" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="275" y1="165" x2="460" y2="165" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          {/* 二级分割（左上区域密集） */}
          <line x1="321" y1="85" x2="321" y2="165" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1="275" y1="125" x2="367" y2="125" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />
          {/* 物体（左上密集） */}
          <circle cx="295" cy="100" r="5" fill="var(--warning)" fillOpacity="0.6" stroke="var(--warning)" strokeWidth="0.8" />
          <circle cx="340" cy="110" r="5" fill="var(--warning)" fillOpacity="0.6" stroke="var(--warning)" strokeWidth="0.8" />
          <circle cx="310" cy="140" r="5" fill="var(--warning)" fillOpacity="0.6" stroke="var(--warning)" strokeWidth="0.8" />
          <circle cx="420" cy="210" r="5" fill="var(--warning)" fillOpacity="0.6" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="367" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">递归分割 · 密集区细分</text>
          <text x="367" y="290" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">自适应 · 稀疏区省内存</text>

          {/* 3. 松散四叉树 */}
          <rect x="490" y="50" width="230" height="250" rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="605" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">松散四叉树 Loose</text>

          {/* 严格边界（虚线） */}
          <rect x="510" y="85" width="190" height="160" fill="none" stroke="var(--text-tertiary)" strokeWidth="0.7" strokeDasharray="3 3" strokeOpacity="0.4" />
          <line x1="605" y1="85" x2="605" y2="245" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.3" />
          <line x1="510" y1="165" x2="700" y2="165" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.3" />
          {/* 松散边界（实线，放大） */}
          <rect x="505" y="80" width="100" height="90" fill="none" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
          <rect x="605" y="80" width="100" height="90" fill="none" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
          <rect x="505" y="165" width="100" height="90" fill="none" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
          <rect x="605" y="165" width="100" height="90" fill="none" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
          {/* 跨界物体 */}
          <circle cx="605" cy="125" r="8" fill="var(--accent)" fillOpacity="0.5" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="108" textAnchor="middle" fontSize="9" fill="var(--accent)">跨界</text>
          <text x="605" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">格子放大 k 倍 · 减少跨界</text>
          <text x="605" y="290" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">物体只存一个节点</text>

          {/* 对比表 */}
          <rect x="20" y="316" width="700" height="100" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="40" y="338" fontSize="11" fontWeight="600" fill="var(--text-secondary)">策略</text>
          <text x="170" y="338" fontSize="11" fontWeight="600" fill="var(--text-secondary)">适合场景</text>
          <text x="380" y="338" fontSize="11" fontWeight="600" fill="var(--text-secondary)">插入/查询</text>
          <text x="540" y="338" fontSize="11" fontWeight="600" fill="var(--text-secondary)">更新成本</text>
          <line x1="40" y1="346" x2="700" y2="346" stroke="var(--border)" strokeWidth="1" />
          <text x="40" y="366" fontSize="11" fill="var(--success)">均匀网格</text>
          <text x="170" y="366" fontSize="11" fill="var(--text-primary)">物体分布均匀</text>
          <text x="380" y="366" fontSize="11" fill="var(--text-primary)">O(1) 哈希定位</text>
          <text x="540" y="366" fontSize="11" fill="var(--text-primary)">低（改格子即可）</text>
          <text x="40" y="386" fontSize="11" fill="var(--accent)">八叉树</text>
          <text x="170" y="386" fontSize="11" fill="var(--text-primary)">分布不均、动态场景</text>
          <text x="380" y="386" fontSize="11" fill="var(--text-primary)">O(log n) 遍历</text>
          <text x="540" y="386" fontSize="11" fill="var(--text-primary)">中（可能重建树）</text>
          <text x="40" y="406" fontSize="11" fill="var(--warning)">松散四叉树</text>
          <text x="170" y="406" fontSize="11" fill="var(--text-primary)">大量移动物体</text>
          <text x="380" y="406" fontSize="11" fill="var(--text-primary)">O(log n) 遍历</text>
          <text x="540" y="406" fontSize="11" fill="var(--text-primary)">低（少跨界少迁移）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种空间分割——网格适合均匀分布、八叉树自适应密度、松散四叉树减少跨界迁移
      </figcaption>
    </figure>
  );
}
