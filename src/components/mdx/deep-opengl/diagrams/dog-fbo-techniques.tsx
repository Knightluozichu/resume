/**
 * <DogFboTechniquesDiagram>：FBO 与后处理技术
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogFboTechniquesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="FBO 渲染到纹理与后处理链" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">FBO：场景 → 离屏纹理 → 后处理 → 屏幕</text>

          {/* FBO 容器 */}
          <rect x="40" y="60" width="280" height="180" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="180" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">FBO（离屏画布）</text>
          {/* 颜色附件 */}
          <rect x="60" y="100" width="240" height="56" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="180" y="120" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)">颜色附件 COLOR_ATTACHMENT0</text>
          <text x="180" y="138" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">2D 纹理（可采样）</text>
          {/* 深度附件 */}
          <rect x="60" y="170" width="240" height="56" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="180" y="190" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)">深度附件 DEPTH_ATTACHMENT</text>
          <text x="180" y="208" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">renderbuffer / 深度纹理</text>
          <text x="180" y="226" textAnchor="middle" fontSize="9.5" fill="var(--accent)">checkFramebufferStatus</text>

          {/* 渲染到纹理 */}
          <line x1="200" y1="60" x2="200" y2="40" stroke="var(--accent)" strokeWidth="1.3" />
          <text x="200" y="34" textAnchor="middle" fontSize="9.5" fill="var(--accent)">绑 FBO 渲染场景（含深度测试）</text>

          {/* 后处理链 */}
          <line x1="320" y1="128" x2="370" y2="128" stroke="var(--accent)" strokeWidth="1.4" markerEnd="url(#fboArrow)" />
          <text x="345" y="120" textAnchor="middle" fontSize="9" fill="var(--accent)">纹理</text>

          {/* ping-pong */}
          <rect x="370" y="100" width="150" height="56" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="445" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-primary)">后处理 Pass A</text>
          <text x="445" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">水平模糊</text>
          <rect x="540" y="100" width="150" height="56" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="615" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-primary)">后处理 Pass B</text>
          <text x="615" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">垂直模糊</text>
          <line x1="520" y1="120" x2="540" y2="120" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#fboArrow)" />
          <line x1="540" y1="140" x2="520" y2="140" stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#fboArrow)" />
          <text x="530" y="158" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">ping-pong</text>

          {/* 输出到屏 */}
          <line x1="615" y1="156" x2="615" y2="200" stroke="var(--accent)" strokeWidth="1.4" markerEnd="url(#fboArrow)" />
          <rect x="520" y="200" width="190" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="615" y="222" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--accent)">默认帧缓冲（屏幕）</text>
          <text x="615" y="240" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">bindFramebuffer(null)</text>

          {/* 说明 */}
          <rect x="40" y="290" width="640" height="86" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="312" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)">FBO 本身不存数据，是挂载附件的容器</text>
          <text x="60" y="332" fontSize="10" fill="var(--text-secondary)">创建：genFramebuffers → bind → 挂颜色纹理 + 深度 renderbuffer → checkFramebufferStatus</text>
          <text x="60" y="350" fontSize="10" fill="var(--text-secondary)">渲染到纹理：绑 FBO + viewport(纹理尺寸) + 画场景 → 解绑回 null + viewport(canvas) + 全屏四边形后处理</text>
          <text x="60" y="368" fontSize="10" fill="var(--accent)">切换渲染目标务必同步 viewport；ping-pong 用两个 FBO 交替读写做多遍模糊</text>

          <defs>
            <marker id="fboArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">FBO 离屏渲染场景到纹理，后处理着色器加工后画到屏幕</figcaption>
    </figure>
  );
}
