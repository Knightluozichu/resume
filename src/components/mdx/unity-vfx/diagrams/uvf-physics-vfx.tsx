/**
 * <UvfPhysicsVfxDiagram>：物理特效（碰撞特效、力场、布料）图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UvfPhysicsVfxDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 物理特效碰撞力场布料图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">物理特效：碰撞 &middot; 力场 &middot; 布料</text>

          {/* 碰撞特效 */}
          <text x="130" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">碰撞特效</text>
          <rect x="40" y="75" width="180" height="130" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          {/* 两个物体碰撞 */}
          <rect x="60" y="120" width="35" height="35" rx="4" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1" />
          <rect x="155" y="120" width="35" height="35" rx="4" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1" />
          {/* 碰撞点 */}
          <circle cx="125" cy="137" r="20" fill="none" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.6" />
          <circle cx="125" cy="137" r="12" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="125" cy="137" r="6" fill="var(--accent)" fillOpacity="0.3" />
          {/* 粒子飞溅 */}
          <circle cx="105" cy="115" r="2" fill="var(--accent)" />
          <circle cx="145" cy="110" r="2" fill="var(--accent)" />
          <circle cx="100" cy="160" r="2" fill="var(--accent)" fillOpacity="0.6" />
          <circle cx="150" cy="165" r="2" fill="var(--accent)" fillOpacity="0.6" />
          <text x="130" y="190" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">OnCollisionEnter &rarr; Spawn VFX</text>

          {/* 力场 */}
          <text x="360" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">力场 Force Field</text>
          <rect x="270" y="75" width="180" height="130" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          {/* 力场中心 */}
          <circle cx="360" cy="140" r="8" fill="var(--accent)" fillOpacity="0.5" />
          {/* 力场范围 */}
          <circle cx="360" cy="140" r="25" fill="none" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3,2" />
          <circle cx="360" cy="140" r="45" fill="none" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3,2" />
          {/* 被影响的粒子 */}
          <circle cx="325" cy="125" r="3" fill="var(--warning)" />
          <path d="M 325 125 L 340 132" stroke="var(--warning)" strokeWidth="1" />
          <circle cx="395" cy="130" r="3" fill="var(--warning)" />
          <path d="M 395 130 L 380 135" stroke="var(--warning)" strokeWidth="1" />
          <circle cx="345" cy="170" r="3" fill="var(--warning)" />
          <path d="M 345 170 L 355 155" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="190" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">ParticleSystem Force Field</text>

          {/* 布料 */}
          <text x="590" y="65" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">布料 Cloth</text>
          <rect x="500" y="75" width="180" height="130" rx="8" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          {/* 布料网格 */}
          <path d="M 530 100 L 650 100 M 530 120 L 650 120 M 530 140 L 650 140 M 530 160 L 650 160 M 530 180 L 650 180" stroke="var(--warning)" strokeWidth="0.8" fillOpacity="0.3" />
          <path d="M 530 100 L 530 180 M 565 100 L 565 180 M 600 100 L 600 180 M 635 100 L 635 180 M 650 100 L 650 180" stroke="var(--warning)" strokeWidth="0.8" fillOpacity="0.3" />
          {/* 固定点 */}
          <circle cx="530" cy="100" r="4" fill="var(--success)" />
          <circle cx="650" cy="100" r="4" fill="var(--success)" />
          <text x="590" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Cloth 组件 &middot; 顶点固定</text>

          {/* 底部说明 */}
          <rect x="40" y="230" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="258" textAnchor="middle" fontSize="11" fill="var(--text-primary)">物理回调驱动特效：碰撞点 &rarr; 粒子爆炸；力场 &rarr; 粒子轨迹偏转；布料 &rarr; 拖尾扰动</text>

          {/* 性能提示 */}
          <text x="360" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">性能注意</text>
          <text x="360" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">碰撞特效用对象池 &middot; 力场用 GPU 粒子 &middot; 布料限制顶点数</text>
          <text x="360" y="350" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">contact.point 定位特效生成位置 &middot; contact.normal 决定飞溅方向</text>
          <text x="360" y="375" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">移动端布料建议用预烘焙动画替代实时模拟</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        物理特效碰撞力场布料——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
