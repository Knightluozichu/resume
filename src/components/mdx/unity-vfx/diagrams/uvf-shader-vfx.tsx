/**
 * <UvfShaderVfxDiagram>：Shader 特效（溶解、扭曲、发光）原理图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UvfShaderVfxDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity Shader 特效溶解扭曲发光原理图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Shader 特效三大经典：溶解 &middot; 扭曲 &middot; 发光</text>

          {/* 溶解 */}
          <rect x="30" y="60" width="200" height="280" rx="10" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          <text x="130" y="85" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Dissolve 溶解</text>
          {/* 原始方块 */}
          <rect x="60" y="100" width="80" height="60" rx="4" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1" />
          <text x="100" y="135" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">原图</text>
          {/* 噪声图 */}
          <rect x="160" y="100" width="50" height="50" rx="4" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2,2" />
          <text x="185" y="130" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Noise</text>
          {/* 箭头 */}
          <text x="130" y="185" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          {/* 溶解结果 */}
          <rect x="60" y="200" width="80" height="60" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" strokeDasharray="4,3" />
          <text x="100" y="235" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">clip(noise - threshold)</text>
          {/* 边缘发光 */}
          <rect x="55" y="195" width="90" height="70" rx="6" fill="none" stroke="var(--warning)" strokeWidth="2" strokeOpacity="0.5" />
          <text x="130" y="285" textAnchor="middle" fontSize="10" fill="var(--warning)">边缘 Burn 光</text>
          <text x="130" y="305" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">step + edgeWidth</text>
          <text x="130" y="325" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">_BurnColor &middot; _BurnWidth</text>

          {/* 扭曲 */}
          <rect x="260" y="60" width="200" height="280" rx="10" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="85" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Distortion 扭曲</text>
          {/* 原始画面 */}
          <rect x="290" y="100" width="60" height="80" rx="4" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="1" />
          <text x="320" y="145" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">屏幕</text>
          {/* 扭曲箭头 */}
          <path d="M 370 120 Q 400 100 430 130 Q 410 160 440 170" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="410" y="100" textAnchor="middle" fontSize="10" fill="var(--accent)">UV 偏移</text>
          {/* 扭曲后 */}
          <rect x="290" y="210" width="60" height="80" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <path d="M 295 215 Q 320 230 345 215 M 295 250 Q 320 265 345 250 M 295 285 Q 320 300 345 285" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
          <text x="360" y="310" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">uv += noise.r * _DistortStrength</text>
          <text x="360" y="325" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">GrabPass / RenderTexture</text>

          {/* 发光 */}
          <rect x="490" y="60" width="200" height="280" rx="10" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          <text x="590" y="85" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Glow 发光</text>
          {/* 物体 */}
          <circle cx="590" cy="140" r="30" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1" />
          {/* 光晕 */}
          <circle cx="590" cy="140" r="45" fill="none" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="590" cy="140" r="60" fill="none" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="590" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Fresnel 边缘光</text>
          <text x="590" y="240" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">pow(1 - dot(N, V), _Power)</text>
          <text x="590" y="260" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">&times; _GlowColor</text>
          <text x="590" y="285" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">叠加 Bloom 后处理</text>
          <text x="590" y="305" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Emission channel</text>
          <text x="590" y="325" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">&rarr; HDR &rarr; Bloom</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Shader 特效三大经典——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
