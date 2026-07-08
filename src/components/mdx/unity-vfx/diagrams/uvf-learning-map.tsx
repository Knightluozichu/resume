/**
 * <UvfLearningMapDiagram>：Unity 3D 游戏特效制作典型实例全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function UvfLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 3D 游戏特效制作典型实例全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 3D 游戏特效制作典型实例 · 学习地图</text>

          {/* 四大阶段 */}
          <rect x="40" y="60" width="150" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">基础入门</text>

          <text x="205" y="90" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="220" y="60" width="150" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="295" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">核心技术</text>

          <text x="385" y="90" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="400" y="60" width="150" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="475" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">高级应用</text>

          <text x="565" y="90" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="580" y="60" width="120" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="640" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-tertiary)">综合复习</text>

          {/* 章节列表 */}
          <text x="40" y="140" fontSize="12" fontWeight="600" fill="var(--success)">Ch0-1 基础</text>
          <text x="40" y="160" fontSize="11" fill="var(--text-secondary)">学习地图 &middot; 粒子系统基础</text>

          <text x="220" y="140" fontSize="12" fontWeight="600" fill="var(--accent)">Ch2-4 核心</text>
          <text x="220" y="160" fontSize="11" fill="var(--text-secondary)">粒子进阶 &middot; Shader 特效</text>
          <text x="220" y="176" fontSize="11" fill="var(--text-secondary)">后处理特效</text>

          <text x="400" y="140" fontSize="12" fontWeight="600" fill="var(--warning)">Ch5-8 高级</text>
          <text x="400" y="160" fontSize="11" fill="var(--text-secondary)">动画特效 &middot; 物理特效</text>
          <text x="400" y="176" fontSize="11" fill="var(--text-secondary)">UI 特效 &middot; 战斗特效</text>

          <text x="580" y="140" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">Ch9 复习</text>
          <text x="580" y="160" fontSize="11" fill="var(--text-secondary)">全书总复习</text>

          {/* 关键路径 */}
          <rect x="40" y="210" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="238" textAnchor="middle" fontSize="12" fill="var(--text-primary)">特效主线：粒子 &rarr; Shader &rarr; 后处理 &rarr; 动画/物理驱动 &rarr; UI/战斗综合</text>

          {/* 技能树 */}
          <text x="360" y="290" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">技能递进</text>
          <text x="360" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">认识 ParticleSystem &rarr; 掌握模块与曲线</text>
          <text x="360" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">&rarr; 编写 Shader &rarr; 配置后处理栈</text>
          <text x="360" y="348" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">&rarr; 动画/物理驱动特效 &rarr; UI 与战斗综合实战</text>

          <text x="360" y="390" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">每一章建立在前一章的产出之上，最终落地为完整战斗特效系统</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 3D 游戏特效制作典型实例全书学习地图
      </figcaption>
    </figure>
  );
}
