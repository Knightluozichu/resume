/**
 * <UvfParticleBasicsDiagram>：ParticleSystem 组件核心属性图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UvfParticleBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity ParticleSystem 组件核心属性图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">ParticleSystem 组件核心属性</text>

          {/* 中心节点 */}
          <rect x="280" y="160" width="160" height="50" rx="10" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="360" y="190" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">ParticleSystem</text>

          {/* 左上：Main Module */}
          <rect x="40" y="60" width="140" height="70" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="110" y="85" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Main Module</text>
          <text x="110" y="103" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Duration</text>
          <text x="110" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Looping / Start</text>

          <line x1="180" y1="120" x2="280" y2="170" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,3" />

          {/* 右上：Emission */}
          <rect x="540" y="60" width="140" height="70" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="610" y="85" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Emission</text>
          <text x="610" y="103" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Rate over Time</text>
          <text x="610" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Bursts</text>

          <line x1="540" y1="120" x2="440" y2="170" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,3" />

          {/* 左下：Shape */}
          <rect x="40" y="250" width="140" height="70" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="110" y="275" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Shape</text>
          <text x="110" y="293" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Sphere / Cone</text>
          <text x="110" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Box / Mesh</text>

          <line x1="180" y1="260" x2="280" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,3" />

          {/* 右下：Renderer */}
          <rect x="540" y="250" width="140" height="70" rx="8" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="610" y="275" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">Renderer</text>
          <text x="610" y="293" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Render Mode</text>
          <text x="610" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Material / Trail</text>

          <line x1="540" y1="260" x2="440" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,3" />

          {/* 生命周期箭头 */}
          <text x="360" y="360" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">粒子生命周期：Emit &rarr; Simulate &rarr; Render</text>
          <text x="360" y="378" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Main 控制全局 &middot; Emission 控制生成 &middot; Shape 控制方向 &middot; Renderer 控制渲染</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ParticleSystem 组件核心属性——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
