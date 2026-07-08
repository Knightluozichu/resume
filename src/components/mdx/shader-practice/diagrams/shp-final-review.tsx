/**
 * <ShpFinalReviewDiagram>
 *
 * Shader 开发实战全书知识总图
 */

export function ShpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Shader 开发实战全书知识总图" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Shader 开发实战 知识总图</text>

          <rect x="280" y="50" width="160" height="36" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">渲染管线</text>

          <line x1="360" y1="86" x2="160" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="360" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="560" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="80" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">HLSL 基础</text>

          <rect x="280" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">顶点 + 像素着色器</text>

          <rect x="480" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="560" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">光照着色器</text>

          <line x1="160" y1="146" x2="160" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="146" x2="360" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="560" y1="146" x2="560" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="80" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="160" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">后处理</text>

          <rect x="280" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">性能优化</text>

          <rect x="480" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">高级特效</text>

          <line x1="160" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="560" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="240" y="230" width="240" height="36" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="360" y="253" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">综合实战能力</text>

          <rect x="48" y="290" width="624" height="64" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="310" textAnchor="middle" fontSize="11" fill="var(--text-primary)">数据流: 模型空间 → MVP → 裁剪空间 → 光栅化 → 像素着色 → 后处理 → 屏幕</text>
          <text x="360" y="328" textAnchor="middle" fontSize="11" fill="var(--text-primary)">优化链: 定位瓶颈 → 减少计算/采样/寄存器 → Profiler 验证</text>
          <text x="360" y="346" textAnchor="middle" fontSize="11" fill="var(--text-primary)">特效组合: 噪声 + 射线步进 + Fresnel + 后处理 = 高级效果</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Shader 开发实战全书知识总图</figcaption>
    </figure>
  );
}
