/**
 * <GpoAdvancedShadingDiagram>：高级着色技术图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoAdvancedShadingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="高级着色技术图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">高级着色技术</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">次表面散射 / 各向异性 / 多层材质 / 位移</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="145" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="132" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">次表面散射</text>
          <text x="132" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SSS</text>
          <text x="132" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">用途：</text>
          <text x="132" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">皮肤 / 蜡 / 玉石</text>
          <text x="132" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">方法：</text>
          <text x="132" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Separable SSS</text>

          <rect x="220" y="100" width="145" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="292" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">各向异性</text>
          <text x="292" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Anisotropic BRDF</text>
          <text x="292" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">用途：</text>
          <text x="292" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">金属拉丝 / 头发</text>
          <text x="292" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">方法：</text>
          <text x="292" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GGX 各向异性</text>

          <rect x="380" y="100" width="145" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">多层材质</text>
          <text x="452" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Layered Material</text>
          <text x="452" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">用途：</text>
          <text x="452" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">车漆 / 清漆</text>
          <text x="452" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">方法：</text>
          <text x="452" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">两层 BRDF 混合</text>

          <rect x="540" y="100" width="100" height="120" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="590" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">位移</text>
          <text x="590" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Displacement</text>
          <text x="590" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">用途：</text>
          <text x="590" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">地形/细节</text>
          <text x="590" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">方法：</text>
          <text x="590" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Tessellation</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">高级着色核心原则</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">物理正确性 + 视觉可信度 &gt; 严格物理模拟（游戏渲染非离线渲染）</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">SSS 用预积分纹理加速 | 各向异性用切线方向调制 NDF | 多层用 Fresnel 权重混合</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：近似方法降低 ALU 开销，保持视觉质量</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">高级着色技术——SSS、各向异性与多层材质的工程近似</figcaption>
    </figure>
  );
}
