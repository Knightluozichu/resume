/**
 * <UvfAnimationVfxDiagram>：动画事件驱动特效与动画曲线图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UvfAnimationVfxDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 动画事件驱动特效图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">动画驱动特效：Animation Event &amp; Animation Curve</text>

          {/* 时间轴 */}
          <line x1="40" y1="120" x2="680" y2="120" stroke="var(--text-tertiary)" strokeWidth="2" />
          <text x="40" y="110" fontSize="10" fill="var(--text-tertiary)">0s</text>
          <text x="680" y="110" fontSize="10" fill="var(--text-tertiary)" textAnchor="end">2s</text>

          {/* 动画片段 */}
          <rect x="40" y="70" width="640" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="360" y="95" textAnchor="middle" fontSize="11" fill="var(--accent)">AnimationClip: Attack</text>

          {/* 动画事件标记 */}
          <line x1="200" y1="60" x2="200" y2="130" stroke="var(--success)" strokeWidth="2" strokeDasharray="4,2" />
          <circle cx="200" cy="120" r="5" fill="var(--success)" />
          <text x="200" y="55" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">Event: PlaySlash</text>

          <line x1="400" y1="60" x2="400" y2="130" stroke="var(--warning)" strokeWidth="2" strokeDasharray="4,2" />
          <circle cx="400" cy="120" r="5" fill="var(--warning)" />
          <text x="400" y="55" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">Event: HitImpact</text>

          <line x1="580" y1="60" x2="580" y2="130" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="4,2" />
          <circle cx="580" cy="120" r="5" fill="var(--text-tertiary)" />
          <text x="580" y="55" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-tertiary)">Event: Sheathe</text>

          {/* 事件触发流程 */}
          <text x="360" y="165" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">事件触发链</text>

          <rect x="40" y="180" width="130" height="40" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="105" y="205" textAnchor="middle" fontSize="10" fill="var(--text-primary)">动画帧到达</text>

          <text x="185" y="205" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="200" y="180" width="130" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="265" y="205" textAnchor="middle" fontSize="10" fill="var(--text-primary)">AnimationEvent</text>

          <text x="345" y="205" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="360" y="180" width="130" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="425" y="205" textAnchor="middle" fontSize="10" fill="var(--text-primary)">回调 C# 方法</text>

          <text x="505" y="205" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="520" y="180" width="160" height="40" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="600" y="205" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Instantiate 特效</text>

          {/* 曲线驱动 */}
          <text x="360" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">AnimationCurve 驱动特效参数</text>
          <rect x="100" y="275" width="520" height="80" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          <line x1="120" y1="340" x2="600" y2="340" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <line x1="120" y1="285" x2="120" y2="340" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <path d="M 120 330 C 200 310 300 290 400 295 C 500 300 550 320 600 335" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="360" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">curve.Evaluate(time) &rarr; 粒子发射率 &middot; 光强 &middot; 缩放</text>
          <text x="360" y="380" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">关键帧精确控制特效与动画同步</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动画事件驱动特效——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
