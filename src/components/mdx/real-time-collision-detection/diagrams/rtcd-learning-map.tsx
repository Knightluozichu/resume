/**
 * <RtcdLearningMapDiagram>：实时碰撞检测算法技术 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function RtcdLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实时碰撞检测算法技术 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            实时碰撞检测算法技术 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            基础 → 粗粒度 → 细粒度 → 优化 → 总复习
          </text>

          {/* 第一阶段：基础 */}
          <rect x="30" y="70" width="680" height="76" rx="12" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="48" y="90" fontSize="11" fontWeight="700" fill="var(--success)">阶段一 · 基础</text>

          <rect x="50" y="98" width="300" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="200" y="116" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">学习地图</text>
          <text x="200" y="131" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全书结构与学习路径</text>

          <rect x="370" y="98" width="320" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="530" y="116" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">碰撞检测类型</text>
          <text x="530" y="131" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">离散 DCCD / 连续 CCD</text>

          <text x={VIEW_W / 2} y="162" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二阶段：粗粒度 */}
          <rect x="30" y="172" width="680" height="76" rx="12" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="48" y="192" fontSize="11" fontWeight="700" fill="var(--accent)">阶段二 · 粗粒度（Broad Phase）</text>

          <rect x="50" y="200" width="320" height="40" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="218" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Sweep and Prune</text>
          <text x="210" y="233" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">排序端点 + 区间相交</text>

          <rect x="390" y="200" width="300" height="40" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="218" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">空间分割</text>
          <text x="540" y="233" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">网格 / 树 / 松散四叉树</text>

          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三阶段：细粒度 */}
          <rect x="30" y="274" width="680" height="76" rx="12" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="48" y="294" fontSize="11" fontWeight="700" fill="var(--warning)">阶段三 · 细粒度（Narrow Phase）</text>

          <rect x="50" y="302" width="320" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="320" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">GJK 算法</text>
          <text x="210" y="335" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Minkowski 差 + 单纯形</text>

          <rect x="390" y="302" width="300" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="320" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">SAT 分离轴定理</text>
          <text x="540" y="335" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">投影区间 + 分离轴判定</text>

          <text x={VIEW_W / 2} y="366" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四五阶段：优化 + 复习 */}
          <rect x="50" y="376" width="210" height="44" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="155" y="395" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">连续碰撞检测 CCD</text>
          <text x="155" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扫掠体 / 时间冲击点</text>

          <rect x="280" y="376" width="210" height="44" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="385" y="395" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">优化策略</text>
          <text x="385" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SIMD / 缓存 / 并行</text>

          <rect x="510" y="376" width="180" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="395" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">全书总复习</text>
          <text x="600" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">管线串联与综合</text>

          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：先粗筛减少候选对，再精算确认碰撞，最后优化与连续性保证
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时碰撞检测算法技术 全书学习地图——从基础到优化的五阶段进阶路径
      </figcaption>
    </figure>
  );
}
