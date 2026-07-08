/**
 * <UvfParticleAdvancedDiagram>：粒子系统进阶模块与曲线图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UvfParticleAdvancedDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 粒子系统进阶模块与曲线图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">粒子系统进阶：模块 &middot; 曲线 &middot; 碰撞</text>

          {/* 左侧：模块列表 */}
          <text x="120" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">进阶模块</text>

          <rect x="40" y="80" width="160" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="103" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Color over Lifetime</text>

          <rect x="40" y="124" width="160" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="147" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Size over Lifetime</text>

          <rect x="40" y="168" width="160" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="120" y="191" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Collision</text>

          <rect x="40" y="212" width="160" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="120" y="235" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Sub Emitters</text>

          <rect x="40" y="256" width="160" height="36" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="120" y="279" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Trails</text>

          {/* 中间：曲线编辑器 */}
          <text x="400" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Curve 编辑器</text>
          <rect x="260" y="80" width="280" height="120" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          {/* 曲线 */}
          <path d="M 270 170 Q 340 90 400 120 T 530 100" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <line x1="270" y1="180" x2="530" y2="180" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <line x1="270" y1="90" x2="270" y2="180" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <text x="400" y="205" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Lifetime 0 &rarr; 1</text>
          <text x="265" y="135" textAnchor="end" fontSize="10" fill="var(--text-tertiary)">Size</text>

          {/* 右侧：碰撞示意 */}
          <text x="620" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">碰撞</text>
          <rect x="560" y="80" width="120" height="120" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          {/* 粒子下落 */}
          <circle cx="610" cy="100" r="4" fill="var(--accent)" />
          <circle cx="625" cy="125" r="4" fill="var(--accent)" fillOpacity="0.7" />
          <circle cx="630" cy="155" r="4" fill="var(--accent)" fillOpacity="0.4" />
          {/* 地面 */}
          <line x1="570" y1="180" x2="670" y2="180" stroke="var(--text-secondary)" strokeWidth="2" />
          {/* 弹射 */}
          <path d="M 630 155 L 635 175 L 645 160" fill="none" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="620" y="210" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">反弹 &middot; 杀亡</text>

          {/* 底部说明 */}
          <rect x="40" y="300" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="328" textAnchor="middle" fontSize="11" fill="var(--text-primary)">曲线驱动画板参数随生命周期变化；碰撞模块让粒子与世界交互；Sub Emitters 实现连锁特效</text>
          <text x="360" y="370" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Color/Size 曲线 &rarr; 渐隐渐缩 &middot; Collision &rarr; 弹射或杀亡 &middot; Sub Emitters &rarr; 爆炸 &rarr; 烟雾 &rarr; 余烬</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        粒子系统进阶模块与曲线——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
