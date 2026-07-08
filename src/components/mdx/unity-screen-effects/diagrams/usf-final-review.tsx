/**
 * <UsfFinalReviewDiagram>
 *
 * Unity 着色器和屏幕特效全书知识总图
 */

export function UsfFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity 着色器和屏幕特效全书知识总图" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 屏幕特效 知识总图</text>

          <rect x="280" y="50" width="160" height="36" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">OnRenderImage + Blit</text>

          <line x1="360" y1="86" x2="160" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="360" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="560" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="80" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">深度纹理 + 图像效果</text>

          <rect x="280" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">后处理栈 + 光照特效</text>

          <rect x="480" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="560" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">调色 + 辉光 + 高级</text>

          <line x1="160" y1="146" x2="160" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="146" x2="360" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="560" y1="146" x2="560" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="80" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="160" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">性能优化</text>

          <rect x="280" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">URP 迁移</text>

          <rect x="480" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">综合管线</text>

          <line x1="160" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="560" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="240" y="230" width="240" height="36" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="360" y="253" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">电影级后处理管线</text>

          <rect x="48" y="290" width="624" height="64" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="310" textAnchor="middle" fontSize="11" fill="var(--text-primary)">数据流: 场景→RenderTexture→Blit→Shader→链式→屏幕</text>
          <text x="360" y="328" textAnchor="middle" fontSize="11" fill="var(--text-primary)">优化链: 降分辨率→合并Pass→RT池化→按需深度纹理→Profiler</text>
          <text x="360" y="346" textAnchor="middle" fontSize="11" fill="var(--text-primary)">管线: SSAO→SSR→Bloom→DOF→MotionBlur→ColorGrading→输出</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Unity 着色器和屏幕特效全书知识总图</figcaption>
    </figure>
  );
}
