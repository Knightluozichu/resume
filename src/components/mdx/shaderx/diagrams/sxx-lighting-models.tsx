/**
 * <SxxLightingModelsDiagram>：高级光照模型图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxLightingModelsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="高级光照模型图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">高级光照模型</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Phong → Blinn-Phong → Cook-Torrance → 球谐光照</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="145" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="132" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">Phong</text>
          <text x="132" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">经典光照模型</text>
          <text x="132" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">公式：</text>
          <text x="132" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">R dot V ^ n</text>
          <text x="132" y="198" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">反射向量计算</text>

          <rect x="220" y="100" width="145" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="292" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Blinn-Phong</text>
          <text x="292" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">半向量改进</text>
          <text x="292" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">公式：</text>
          <text x="292" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">N dot H ^ n</text>
          <text x="292" y="198" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">更快更平滑</text>

          <rect x="380" y="100" width="145" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">Cook-Torrance</text>
          <text x="452" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">PBR 微表面</text>
          <text x="452" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">公式：</text>
          <text x="452" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">D*G*F / 4NL</text>
          <text x="452" y="198" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GGX/Beckmann</text>

          <rect x="540" y="100" width="100" height="120" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="590" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">球谐光照</text>
          <text x="590" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SH Lighting</text>
          <text x="590" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">用途：</text>
          <text x="590" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">间接光</text>
          <text x="590" y="198" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">预辐射法向</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">光照模型演进</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Phong（反射向量） → Blinn-Phong（半向量，更快） → Cook-Torrance（微表面，物理正确）</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">球谐光照：用低阶球谐函数编码环境光，O(1) 间接光计算</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：从经验模型到物理模型，从直接光到间接光的演进</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">高级光照模型——从 Phong 到 Cook-Torrance 到球谐光照的演进</figcaption>
    </figure>
  );
}
