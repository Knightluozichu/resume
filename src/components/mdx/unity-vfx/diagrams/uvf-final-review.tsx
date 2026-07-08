/**
 * <UvfFinalReviewDiagram>：全书总复习知识体系图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function UvfFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 3D 游戏特效制作典型实例全书总复习知识体系图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 游戏特效全书知识体系总览</text>

          {/* 中心节点 */}
          <circle cx="360" cy="210" r="55" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="205" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">游戏特效</text>
          <text x="360" y="222" textAnchor="middle" fontSize="11" fill="var(--accent)">核心体系</text>

          {/* 四大分支 */}
          {/* 粒子系统 */}
          <rect x="40" y="80" width="150" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">粒子系统</text>
          <text x="115" y="122" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">基础 &middot; 进阶 &middot; 曲线</text>
          <line x1="190" y1="130" x2="310" y2="185" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,3" />

          {/* Shader 特效 */}
          <rect x="40" y="250" width="150" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="115" y="275" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Shader 特效</text>
          <text x="115" y="292" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">溶解 &middot; 扭曲 &middot; 后处理</text>
          <line x1="190" y1="265" x2="310" y2="235" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,3" />

          {/* 驱动系统 */}
          <rect x="530" y="80" width="150" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="605" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">驱动系统</text>
          <text x="605" y="122" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">动画 &middot; 物理 &middot; 事件</text>
          <line x1="530" y1="130" x2="410" y2="185" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,3" />

          {/* 综合应用 */}
          <rect x="530" y="250" width="150" height="60" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="605" y="275" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">综合应用</text>
          <text x="605" y="292" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">UI &middot; 战斗 &middot; 打击感</text>
          <line x1="530" y1="265" x2="410" y2="235" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3,3" />

          {/* 知识脉络 */}
          <text x="360" y="355" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">知识脉络</text>
          <text x="360" y="375" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">认识粒子 &rarr; 掌握 Shader &rarr; 用动画/物理驱动 &rarr; 组合为战斗特效</text>
          <text x="360" y="395" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">每一层都是下一层的基础：没有粒子就没有素材，没有 Shader 就没有质感，没有驱动就没有节奏，没有综合就没有打击感</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识体系总览——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
