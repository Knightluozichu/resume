/**
 * <UsfScreenBasicsDiagram>
 *
 * 屏幕特效基础: OnRenderImage 与 Blit
 */

export function UsfScreenBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="屏幕特效基础 OnRenderImage 与 Blit" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">屏幕特效基础</text>

          <rect x="30" y="55" width="140" height="56" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="100" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">场景渲染</text>
          <text x="100" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">→ src RenderTexture</text>

          <rect x="220" y="55" width="140" height="56" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="290" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">OnRenderImage</text>
          <text x="290" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">C# 回调</text>

          <rect x="410" y="55" width="140" height="56" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="480" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Graphics.Blit</text>
          <text x="480" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全屏着色器</text>

          <rect x="600" y="55" width="90" height="56" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="645" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">屏幕</text>
          <text x="645" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">dest</text>

          <line x1="170" y1="83" x2="220" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-screen-basics-arrow)" />
          <line x1="360" y1="83" x2="410" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-screen-basics-arrow)" />
          <line x1="550" y1="83" x2="600" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usf-screen-basics-arrow)" />

          <rect x="30" y="140" width="660" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="160" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Graphics.Blit(src, dest, material) — 全屏四边形渲染</text>
          <text x="360" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">顶点着色器传递 UV，像素着色器处理每个像素</text>

          <rect x="48" y="215" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="235" textAnchor="middle" fontSize="11" fill="var(--text-primary)">多效果链: src → Blit(tmp, mat1) → Blit(tmp, mat2) → Blit(dest, mat3)</text>
          <text x="360" y="253" textAnchor="middle" fontSize="11" fill="var(--text-primary)">RenderTexture 池化: RenderTexture.GetTemporary / Release</text>

          <text x="360" y="305" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">屏幕特效 = 全屏 2D 图像处理，不需要 3D 几何体数据</text>
          <text x="360" y="325" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">URP 迁移: OnRenderImage → ScriptableRendererFeature + RenderPass</text>
          <text x="360" y="345" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">降分辨率处理再上采样是移动端优化的关键手段</text>

          <defs>
            <marker id="usf-screen-basics-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">屏幕特效基础: OnRenderImage 与 Blit</figcaption>
    </figure>
  );
}
