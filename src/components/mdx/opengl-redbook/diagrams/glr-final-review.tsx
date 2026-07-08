/**
 * <GlrFinalReviewDiagram>
 *
 * OpenGL红宝书核心知识图谱
 */

export function GlrFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="OpenGL红宝书核心知识图谱" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">OpenGL红宝书 核心知识图谱</text>
<text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从初始化到现代实践的完整脉络</text>
<rect x="280" y="170" width="160" height="50" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
<text x="360" y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">可编程管线</text>
<text x="360" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">核心主线</text>
<line x1="280" y1="180" x2="160" y2="120" stroke="var(--border)" strokeWidth="1" />
<rect x="80" y="100" width="140" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
<text x="150" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">着色器</text>
<text x="150" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">GLSL编程</text>
<line x1="440" y1="180" x2="560" y2="120" stroke="var(--border)" strokeWidth="1" />
<rect x="500" y="100" width="140" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
<text x="570" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">纹理光照</text>
<text x="570" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">材质+采样</text>
<line x1="280" y1="210" x2="160" y2="280" stroke="var(--border)" strokeWidth="1" />
<rect x="80" y="260" width="140" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
<text x="150" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">帧缓冲</text>
<text x="150" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">FBO+混合</text>
<line x1="440" y1="210" x2="560" y2="280" stroke="var(--border)" strokeWidth="1" />
<rect x="500" y="260" width="140" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
<text x="570" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">现代实践</text>
<text x="570" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">实例化+优化</text>
<rect x="120" y="340" width="480" height="40" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
<text x="360" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">高级主题</text>
<text x="360" y="372" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">高级缓冲(UBO/SSBO) 间接绘制 DSA SPIRV</text>
          <defs>
            <marker id="glr-final-review-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">OpenGL红宝书核心知识图谱</figcaption>
    </figure>
  );
}
