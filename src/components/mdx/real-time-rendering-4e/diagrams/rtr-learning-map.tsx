/**
 * <RtrLearningMapDiagram>：实时渲染第4版全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实时渲染第4版全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            实时渲染第4版全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            管线基础 → 变换着色 → 高级技术 → 优化加速
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="130" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">管线基础</text>
          <text x="135" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">管线/变换</text>

          <rect x="220" y="100" width="130" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="285" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">着色纹理</text>
          <text x="285" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">光照/BRDF</text>

          <rect x="370" y="100" width="130" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="435" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">高级技术</text>
          <text x="435" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">阴影/GI</text>

          <rect x="520" y="100" width="130" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="585" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">优化加速</text>
          <text x="585" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">剔除/LOD</text>

          <text x="135" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="285" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="435" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>
          <text x="585" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&darr;</text>

          <rect x="70" y="200" width="580" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            核心主线：从「理解管线」到「控制质量与性能」
          </text>
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            管线是骨架，着色是血肉，优化是工程化能力
          </text>

          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            学习路径
          </text>
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            管线（架构认知） → 变换（空间理解） → 着色（视觉效果）
          </text>
          <text x={VIEW_W / 2} y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 纹理（细节控制） → BRDF（物理精度） → 阴影GI（真实感）
          </text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 优化（工程落地）
          </text>

          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：RTR4 是实时渲染的百科全书，理论与实践并重
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时渲染第4版全书学习地图——从管线基础到优化加速的进阶路径
      </figcaption>
    </figure>
  );
}
