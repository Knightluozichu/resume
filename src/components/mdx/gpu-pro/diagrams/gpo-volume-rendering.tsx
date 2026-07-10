/**
 * <GpoVolumeRenderingDiagram>：体积渲染图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoVolumeRenderingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="体积渲染图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`体积渲染技术`}</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{`Ray Marching / 体积光照 / 体积雾`}</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="190" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="155" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">{`Ray Marching`}</text>
          <text x="155" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`沿光线步进采样`}</text>
          <text x="155" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">{`流程：`}</text>
          <text x="155" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`ray = camera → pixel`}</text>
          <text x="155" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`step += ray * dt`}</text>
          <text x="155" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`累积密度/颜色`}</text>

          <rect x="265" y="100" width="190" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{`体积光照`}</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`参与介质散射`}</text>
          <text x="360" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">{`Beer-Lambert：`}</text>
          <text x="360" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`T = exp(-sigma * d)`}</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`散射 + 吸收 + 自发光`}</text>
          <text x="360" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`Phase 函数（Henyel-Greenstein）`}</text>

          <rect x="470" y="100" width="190" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="565" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">{`体积雾 / 云`}</text>
          <text x="565" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`屏幕空间 / 3D 纹理`}</text>
          <text x="565" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">{`优化：`}</text>
          <text x="565" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`Froxel 分块`}</text>
          <text x="565" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">{`时间复用累积`}</text>
          <text x="565" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`3D Noise 程序化云`}</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">{`体积渲染方程（简化）`}</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{`L = integral[ Scattering(Li * phase) - Absorption(L) + Emission ] * transmittance dt`}</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`步进数（Samples）决定质量与性能：32 步高质量，8 步移动端`}</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`优化：早期终止（alpha < threshold 跳出）、Jittering（抖动消除环带）`}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">体积渲染——Ray Marching 累积参与介质的散射与吸收</figcaption>
    </figure>
  );
}
