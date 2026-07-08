/**
 * <SxxLearningMapDiagram>：ShaderX 系列 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="ShaderX 系列全书学习地图图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">ShaderX 系列 全书学习地图</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">顶点着色 → 像素着色 → 光照 → 阴影 → 后处理 → 环境</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="135" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="127" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">顶点着色器</text>
          <text x="127" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">变形/动画</text>

          <rect x="210" y="100" width="135" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="277" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">像素着色器</text>
          <text x="277" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">技巧/优化</text>

          <rect x="360" y="100" width="135" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="427" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">光照模型</text>
          <text x="427" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">BRDF/SH</text>

          <rect x="510" y="100" width="150" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="585" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">阴影/后处理</text>
          <text x="585" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Shadow/Bloom</text>

          <text x="127" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="277" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="427" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="585" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="200" width="600" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fill="var(--text-primary)">核心主线：从「顶点变形」到「像素着色」到「光照阴影」到「环境效果」</text>
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ShaderX = 实时 Shader 编程技巧的实战手册</text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">学习路径</text>
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">顶点着色器（变形/动画） → 像素着色器（技巧/优化） → 光照模型（BRDF/SH）</text>
          <text x={VIEW_W / 2} y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">→ 阴影技术 → 后处理 → 环境效果 → 程序化纹理 → 性能优化</text>
          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">关键洞察：ShaderX 是 Shader 编程的「黑客技巧集」</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">ShaderX 系列全书学习地图——从顶点到像素到环境的全链路</figcaption>
    </figure>
  );
}
