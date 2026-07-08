/**
 * <Cg4FinalReviewDiagram>：总复习知识图谱
 *
 * 展示全书核心知识点的关联关系。
 */

export function Cg4FinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="计算机图形学总复习知识图谱" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">计算机图形学 · 核心知识图谱</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从顶点到像素，从理论到实践</text>

          {/* 中心节点 */}
          <rect x="280" y="170" width="160" height="50" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="360" y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">渲染管线</text>
          <text x="360" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">核心主线</text>

          {/* 四周知识点 */}
          {/* 左上 */}
          <line x1="280" y1="180" x2="160" y2="120" stroke="var(--border)" strokeWidth="1" />
          <rect x="80" y="100" width="140" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">几何变换</text>
          <text x="150" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Model/View/Proj</text>

          {/* 右上 */}
          <line x1="440" y1="180" x2="560" y2="120" stroke="var(--border)" strokeWidth="1" />
          <rect x="500" y="100" width="140" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="570" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">光照着色</text>
          <text x="570" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Phong / BRDF</text>

          {/* 左下 */}
          <line x1="280" y1="210" x2="160" y2="280" stroke="var(--border)" strokeWidth="1" />
          <rect x="80" y="260" width="140" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="150" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">光栅化</text>
          <text x="150" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">扫描转换</text>

          {/* 右下 */}
          <line x1="440" y1="210" x2="560" y2="280" stroke="var(--border)" strokeWidth="1" />
          <rect x="500" y="260" width="140" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="570" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">纹理映射</text>
          <text x="570" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">UV / Mipmap</text>

          {/* 底部：高级主题 */}
          <rect x="120" y="340" width="480" height="40" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">高级主题</text>
          <text x="360" y="372" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可见性(Z-Buffer) · 曲线曲面(Bezier) · 光线追踪 · 全局光照</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">全书核心知识图谱：渲染管线为中心，四大主题辐射展开</figcaption>
    </figure>
  );
}
