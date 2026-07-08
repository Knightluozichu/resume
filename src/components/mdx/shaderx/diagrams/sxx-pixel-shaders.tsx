/**
 * <SxxPixelShadersDiagram>：像素着色器技巧图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxPixelShadersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="像素着色器技巧图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">像素着色器技巧</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">多重纹理 / 后处理积分 / 分支优化 / 伪 3D</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="145" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="132" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">多重纹理</text>
          <text x="132" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Multi-texture</text>
          <text x="132" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技巧：</text>
          <text x="132" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">混合/遮罩</text>
          <text x="132" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">细节纹理</text>
          <text x="132" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Splatting</text>

          <rect x="220" y="100" width="145" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="292" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">后处理积分</text>
          <text x="292" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Gaussian/DOF</text>
          <text x="132" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技巧：</text>
          <text x="292" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技巧：</text>
          <text x="292" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">可分离滤波</text>
          <text x="292" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Poission Disk</text>
          <text x="292" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">双线性优化</text>

          <rect x="380" y="100" width="145" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">分支优化</text>
          <text x="452" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Branching</text>
          <text x="452" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技巧：</text>
          <text x="452" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">flatten vs branch</text>
          <text x="452" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">梯度计算</text>
          <text x="452" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">[flatten]/[branch]</text>

          <rect x="540" y="100" width="100" height="120" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="590" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">伪 3D</text>
          <text x="590" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Pseudo-3D</text>
          <text x="590" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技巧：</text>
          <text x="590" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Normal Map</text>
          <text x="590" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Parallax</text>
          <text x="590" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Relief Map</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">像素着色器核心原则</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">每像素计算 → 4K 下 800 万次执行 → 指令数和纹理采样数是性能关键</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">优化：减少 ALU 指令、合并纹理采样、用 MAD 指令、避免梯度冲突</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Shader Model 3.0+ 支持动态分支，但分支内梯度计算有限制</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">像素着色器技巧——多重纹理、后处理积分与分支优化</figcaption>
    </figure>
  );
}
