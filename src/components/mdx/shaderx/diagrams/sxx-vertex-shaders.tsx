/**
 * <SxxVertexShadersDiagram>：顶点着色器进阶图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxVertexShadersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="顶点着色器进阶图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">顶点着色器进阶技术</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">变形 / 蒙皮 / 粒子 / 过程动画</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="145" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="132" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">顶点变形</text>
          <text x="132" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Displacement</text>
          <text x="132" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技术：</text>
          <text x="132" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">噪声位移</text>
          <text x="132" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">波形动画</text>
          <text x="132" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Vertex Texture</text>

          <rect x="220" y="100" width="145" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="292" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">骨骼蒙皮</text>
          <text x="292" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Skinning</text>
          <text x="292" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技术：</text>
          <text x="292" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">矩阵调色板</text>
          <text x="292" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GPU 蒙皮</text>
          <text x="292" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Dual Quaternion</text>

          <rect x="380" y="100" width="145" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">粒子顶点</text>
          <text x="452" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Point Sprite</text>
          <text x="452" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技术：</text>
          <text x="452" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Billboard</text>
          <text x="452" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GPU 粒子</text>
          <text x="452" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Expand Quad</text>

          <rect x="540" y="100" width="100" height="120" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="590" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">过程动画</text>
          <text x="590" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Procedural</text>
          <text x="590" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技术：</text>
          <text x="590" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">风吹草动</text>
          <text x="590" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">布料摆动</text>
          <text x="590" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">SH 变形</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">顶点着色器的核心思想</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">在 GPU 侧逐顶点变换位置 → 解放 CPU → 大规模变形/动画</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Vertex Texture Fetch：在 VS 中采样纹理驱动变形（海浪/地形）</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：VS 输出 position → 光栅化 → PS 着色，VS 是几何变形的唯一入口</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">顶点着色器进阶——变形、蒙皮、粒子与过程动画</figcaption>
    </figure>
  );
}
