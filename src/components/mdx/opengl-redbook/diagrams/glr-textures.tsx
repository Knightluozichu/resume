/**
 * <GlrTexturesDiagram>
 *
 * 纹理创建：生成→绑定→设置参数→上传数据→生成Mipmap
 */

export function GlrTexturesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="纹理创建：生成→绑定→设置参数→上传数据→生成Mipmap" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">纹理创建与采样</text>
<rect x="180" y="62" width="360" height="36" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
<text x="360" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">glGenTextures</text>
<text x="360" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生成纹理</text>
<line x1="360" y1="98" x2="360" y2="112" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="180" y="112" width="360" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
<text x="360" y="128" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">glBindTexture</text>
<text x="360" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绑定纹理</text>
<line x1="360" y1="148" x2="360" y2="162" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="180" y="162" width="360" height="36" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
<text x="360" y="178" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">设置参数</text>
<text x="360" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">过滤+环绕</text>
<line x1="360" y1="198" x2="360" y2="212" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="180" y="212" width="360" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
<text x="360" y="228" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">上传数据</text>
<text x="360" y="242" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">glTexImage2D</text>
<line x1="360" y1="248" x2="360" y2="262" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="180" y="262" width="360" height="36" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
<text x="360" y="278" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">生成Mipmap</text>
<text x="360" y="292" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自动多级</text>

          <defs>
            <marker id="glr-textures-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">纹理创建：生成→绑定→设置参数→上传数据→生成Mipmap</figcaption>
    </figure>
  );
}
