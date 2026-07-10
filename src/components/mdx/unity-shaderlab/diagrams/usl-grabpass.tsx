/**
 * <UslGrabpassDiagram>
 *
 * GrabPass 屏幕抓取与折射效果
 */

export function UslGrabpassDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="GrabPass 屏幕抓取与折射效果" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">GrabPass 与屏幕抓取</text>

          <rect x="30" y="55" width="160" height="56" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="110" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">场景渲染</text>
          <text x="110" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不透明物体</text>

          <rect x="240" y="55" width="160" height="56" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="320" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">GrabPass</text>
          <text x="320" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">抓取屏幕纹理</text>

          <rect x="450" y="55" width="160" height="56" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="530" y="77" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">折射 Pass</text>
          <text x="530" y="95" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">采样 + 扰动</text>

          <rect x="640" y="55" width="50" height="56" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="665" y="88" textAnchor="middle" fontSize="9" fill="var(--text-primary)">输出</text>

          <line x1="190" y1="83" x2="240" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usl-grabpass-arrow)" />
          <line x1="400" y1="83" x2="450" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usl-grabpass-arrow)" />
          <line x1="610" y1="83" x2="640" y2="83" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#usl-grabpass-arrow)" />

          <rect x="30" y="130" width="310" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="185" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">GrabPass &#123;&#125;</text>
          <text x="185" y="168" textAnchor="middle" fontSize="10" fill="var(--text-primary)">每对象每帧抓取一次</text>
          <text x="185" y="185" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">开销大，不推荐</text>

          <rect x="380" y="130" width="310" height="70" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="535" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">GrabPass &#123; "_GrabTex" &#125;</text>
          <text x="535" y="168" textAnchor="middle" fontSize="10" fill="var(--text-primary)">只抓取一次，所有对象共享</text>
          <text x="535" y="185" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">性能更好，推荐</text>

          <rect x="48" y="225" width="624" height="56" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="245" textAnchor="middle" fontSize="11" fill="var(--text-primary)">玻璃折射: 采样法线贴图 → 偏移 GrabPass UV → 采样屏幕色</text>
          <text x="360" y="263" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Queue=Transparent 确保在不透明物体之后抓取</text>

          <text x="360" y="315" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">替代方案: Command Buffer / URP Opaque Texture / 降分辨率抓取</text>
          <text x="360" y="335" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">移动端 GrabPass 开销大，建议用 Command Buffer 或降级方案</text>

          <defs>
            <marker id="usl-grabpass-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">GrabPass 屏幕抓取与折射效果</figcaption>
    </figure>
  );
}
