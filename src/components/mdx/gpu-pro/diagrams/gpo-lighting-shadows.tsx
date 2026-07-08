/**
 * <GpoLightingShadowsDiagram>：光照与阴影图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoLightingShadowsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="光照与阴影图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">光照与阴影技术</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">实时 GI / PBR / 软阴影 / 全局光照</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="190" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="155" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">实时 GI</text>
          <text x="155" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Light Propagation Volume</text>
          <text x="155" y="162" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Voxel Cone Tracing</text>
          <text x="155" y="184" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理：</text>
          <text x="155" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">体素化场景 → 传播光</text>
          <text x="155" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">DDGI（动态探测网格）</text>

          <rect x="265" y="100" width="190" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">PBR 光照</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Cook-Torrance BRDF</text>
          <text x="360" y="162" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GGX / Beckmann NDF</text>
          <text x="360" y="184" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">能量守恒：</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Diffuse + Specular &le; 1</text>
          <text x="360" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">多层材质混合</text>

          <rect x="470" y="100" width="190" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="565" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">软阴影</text>
          <text x="565" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">PCSS / VSM / MSM</text>
          <text x="565" y="162" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SDSM（采样分布）</text>
          <text x="565" y="184" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">PCSS 原理：</text>
          <text x="565" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">搜索遮挡体 → 估面距</text>
          <text x="565" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">→ 按比例柔化采样</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">高级阴影技术链路</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Shadow Map → PCF 柔化 → PCSS 物理软阴影 → VSM 方差阴影</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">VSM：存深度和深度平方，用切比雪夫不等式估遮挡概率（支持预滤波柔化）</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">权衡：PCSS 质量高开销大，VSM 快但有漏光问题</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">光照与阴影技术——实时 GI、PBR 与物理软阴影</figcaption>
    </figure>
  );
}
