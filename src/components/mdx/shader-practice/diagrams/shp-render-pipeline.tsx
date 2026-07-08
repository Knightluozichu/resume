/**
 * <ShpRenderPipelineDiagram>
 *
 * 渲染管线三阶段与 Shader 角色
 */

export function ShpRenderPipelineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="渲染管线三阶段与 Shader 角色" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">渲染管线与 Shader 角色</text>

          <rect x="30" y="60" width="200" height="60" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">应用程序阶段</text>
          <text x="130" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU: Draw Call / 数据准备</text>

          <rect x="260" y="60" width="200" height="60" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">几何阶段</text>
          <text x="360" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">顶点着色器: MVP 变换</text>

          <rect x="490" y="60" width="200" height="60" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">光栅化阶段</text>
          <text x="590" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">像素着色器: 逐像素着色</text>

          <line x1="230" y1="90" x2="260" y2="90" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-render-pipeline-arrow)" />
          <line x1="460" y1="90" x2="490" y2="90" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-render-pipeline-arrow)" />

          <rect x="260" y="150" width="200" height="40" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.6" />
          <text x="360" y="175" textAnchor="middle" fontSize="11" fill="var(--text-primary)">顶点 → 裁剪 → 投影 → 屏幕映射</text>

          <rect x="490" y="150" width="200" height="40" rx="6" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.6" />
          <text x="590" y="175" textAnchor="middle" fontSize="11" fill="var(--text-primary)">图元 → 片段 → 着色 → 混合</text>

          <rect x="30" y="220" width="660" height="36" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="243" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Shader 可编程阶段: 顶点着色器(必需) + 像素着色器(必需)</text>

          <rect x="48" y="290" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="310" textAnchor="middle" fontSize="11" fill="var(--text-primary)">顶点着色器: 执行 N 次（每顶点一次） → MVP 变换 + 属性传递</text>
          <text x="360" y="328" textAnchor="middle" fontSize="11" fill="var(--text-primary)">像素着色器: 执行 N*M 次（每片段一次） → 光照 + 纹理 + 最终颜色</text>

          <defs>
            <marker id="shp-render-pipeline-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">渲染管线三阶段与 Shader 角色</figcaption>
    </figure>
  );
}
