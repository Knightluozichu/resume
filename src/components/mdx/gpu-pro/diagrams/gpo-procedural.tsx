/**
 * <GpoProceduralDiagram>：程序化生成图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoProceduralDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="程序化生成图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">程序化生成技术</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">噪声 / L-System / 程序化纹理与地形</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="190" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="155" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">噪声函数</text>
          <text x="155" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Perlin / Simplex / Worley</text>
          <text x="155" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">分形布朗运动：</text>
          <text x="155" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">fbm = sum(octave * fi)</text>
          <text x="155" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">i=0..N, fi=freq^i</text>
          <text x="155" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">湍流 / 面程 / 域扭曲</text>

          <rect x="265" y="100" width="190" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">程序化纹理</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">无纹理图采样</text>
          <text x="360" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">优势：</text>
          <text x="360" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">无限分辨率</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">零内存占用</text>
          <text x="360" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">劣势：ALU 开销高</text>

          <rect x="470" y="100" width="190" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="565" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">程序化地形</text>
          <text x="565" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Heightmap 生成</text>
          <text x="565" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">技术：</text>
          <text x="565" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Erosion 侵蚀</text>
          <text x="565" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">分层叠加</text>
          <text x="565" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GPU 生成 + Tessellation</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">程序化生成核心思想</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">用数学函数替代纹理资产 → 无限分辨率 + 零存储 + 可参数化</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">关键：噪声是程序化的基石，fbm 叠加多层噪声产生自然纹理</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">权衡：ALU 开销 vs 内存带宽，预计算纹理 vs 实时计算</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">程序化生成——噪声函数驱动无限纹理与地形</figcaption>
    </figure>
  );
}
