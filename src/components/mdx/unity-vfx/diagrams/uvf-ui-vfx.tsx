/**
 * <UvfUiVfxDiagram>：UI 特效（UGUI 动效、粒子 UI）图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UvfUiVfxDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity UI 特效 UGUI 动效粒子 UI 图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">UI 特效：UGUI 动效 &middot; 粒子 UI &middot; 屏幕反馈</text>

          {/* 左侧：UGUI 动效 */}
          <text x="130" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">UGUI 动效</text>
          <rect x="40" y="75" width="180" height="200" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          {/* 按钮 */}
          <rect x="70" y="95" width="120" height="35" rx="6" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="118" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Button</text>
          {/* 弹跳曲线 */}
          <path d="M 70 130 Q 100 100 130 110 T 190 115" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="130" y="150" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">DOTween ScaleEase</text>
          {/* 弹出面板 */}
          <rect x="65" y="165" width="130" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4,2" />
          <text x="130" y="195" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Panel Slide In</text>
          {/* 闪烁提示 */}
          <circle cx="130" cy="240" r="8" fill="var(--warning)" fillOpacity="0.4" stroke="var(--warning)" strokeWidth="1" />
          <circle cx="130" cy="240" r="14" fill="none" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="130" y="265" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Pulse 提示动效</text>

          {/* 中间：粒子 UI */}
          <text x="360" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">粒子 UI</text>
          <rect x="270" y="75" width="180" height="200" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          {/* Canvas */}
          <rect x="290" y="90" width="140" height="170" rx="4" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2,2" />
          <text x="360" y="105" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Canvas (Screen Space)</text>
          {/* 粒子在 UI 上 */}
          <circle cx="320" cy="140" r="3" fill="var(--accent)" />
          <circle cx="350" cy="150" r="2" fill="var(--accent)" fillOpacity="0.7" />
          <circle cx="380" cy="135" r="3" fill="var(--accent)" fillOpacity="0.5" />
          <circle cx="400" cy="160" r="2" fill="var(--accent)" fillOpacity="0.3" />
          {/* 金币飞出 */}
          <circle cx="340" cy="200" r="6" fill="var(--warning)" fillOpacity="0.5" stroke="var(--warning)" strokeWidth="1" />
          <path d="M 340 200 Q 370 170 400 145" fill="none" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="360" y="240" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">ParticleSystem Renderer</text>
          <text x="360" y="255" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Render Mode = Canvas</text>

          {/* 右侧：屏幕反馈 */}
          <text x="590" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">屏幕反馈</text>
          <rect x="500" y="75" width="180" height="200" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          {/* 屏幕震屏 */}
          <rect x="520" y="90" width="140" height="70" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeDasharray="3,3" />
          <text x="590" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Screen Shake</text>
          <text x="590" y="138" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Camera抖动 &middot; UI偏移</text>
          {/* 闪屏 */}
          <rect x="520" y="175" width="140" height="40" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="590" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Flash 闪屏</text>
          {/* 伤害数字 */}
          <text x="590" y="245" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">-999</text>
          <text x="590" y="265" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">FloatingText 飘字</text>

          {/* 底部 */}
          <rect x="40" y="295" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="323" textAnchor="middle" fontSize="11" fill="var(--text-primary)">UI 特效 = UGUI 动画 + Canvas 粒子 + 屏幕反馈，三者配合构成完整交互体验</text>
          <text x="360" y="360" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">DOTween 驱动 UI 动画 &middot; Canvas 粒子 Render Mode &middot; 屏幕震屏用 iTween/DoShake</text>
          <text x="360" y="378" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">注意：UI 粒子 MaxParticles 控制数量 &middot; 飘字用对象池避免 GC</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UI 特效——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
