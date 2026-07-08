/**
 * <GpoImageSpaceDiagram>：图像空间效果图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoImageSpaceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="图像空间效果图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">图像空间效果</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">SSAO / SSR / 屏幕空间反射与遮蔽</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="190" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="155" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">SSAO</text>
          <text x="155" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">屏幕空间环境光遮蔽</text>
          <text x="155" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">输入：</text>
          <text x="155" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Depth + Normal</text>
          <text x="155" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理：</text>
          <text x="155" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">球内采样 → 比较深度</text>

          <rect x="265" y="100" width="190" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">SSR</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">屏幕空间反射</text>
          <text x="360" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">输入：</text>
          <text x="360" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Depth + Normal + Color</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理：</text>
          <text x="360" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Ray March 沿反射方向</text>

          <rect x="470" y="100" width="190" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="565" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">SSGI / SSDO</text>
          <text x="565" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">屏幕空间全局光照</text>
          <text x="565" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">输入：</text>
          <text x="565" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Depth + Normal + Color</text>
          <text x="565" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理：</text>
          <text x="565" y="216" textAnchor="middle" fontSize="10" fill="var(--text-primary)">反射光线 → 采样颜色</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">图像空间效果的共同局限</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">只能利用屏幕内可见信息 → 屏幕外反射/遮蔽丢失</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">需深度边缘处理 → Hi-Z 加速 Ray March</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">解决：SSR 降级到 Reflection Probe，SSAO 与烘焙 AO 混合</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">图像空间效果——SSAO/SSR/SSGI 的原理与局限</figcaption>
    </figure>
  );
}
