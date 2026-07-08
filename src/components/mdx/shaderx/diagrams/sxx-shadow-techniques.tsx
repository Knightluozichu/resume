/**
 * <SxxShadowTechniquesDiagram>：阴影技术图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxShadowTechniquesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="阴影技术图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">阴影技术</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">投影阴影 / Shadow Volume / Shadow Map</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="180" height="110" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">投影阴影</text>
          <text x="150" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Planar Shadow</text>
          <text x="150" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理：</text>
          <text x="150" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">从光源视角</text>
          <text x="150" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">投影到地面</text>

          <rect x="260" y="100" width="180" height="110" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Shadow Volume</text>
          <text x="350" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">体阴影</text>
          <text x="350" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理：</text>
          <text x="350" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">构建阴影体</text>
          <text x="350" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Stencil 计数</text>

          <rect x="460" y="100" width="180" height="110" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="550" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">Shadow Map</text>
          <text x="550" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">阴影贴图</text>
          <text x="550" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理：</text>
          <text x="550" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">光源渲染深度</text>
          <text x="550" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">深度比较</text>

          <rect x="60" y="240" width="600" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">三种阴影技术对比</text>
          <text x={VIEW_W / 2} y="284" textAnchor="middle" fontSize="11" fill="var(--text-primary)">投影阴影：只支持平面接收，最简单 | Shadow Volume：精确硬边，几何开销大</text>
          <text x={VIEW_W / 2} y="302" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Shadow Map：最通用，支持任意接收面，但有锯齿/精度问题</text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">现代引擎主用 Shadow Map + CSM/PCF/PCSS 优化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">阴影技术——投影阴影、Shadow Volume 与 Shadow Map 的对比</figcaption>
    </figure>
  );
}
