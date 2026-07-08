/**
 * <GpoMobileRenderingDiagram>：移动端渲染优化图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoMobileRenderingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="移动端渲染优化图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">移动端渲染优化</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">TBR 架构 / 带宽优化 / 着色器精简</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="190" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="155" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">TBR 架构</text>
          <text x="155" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Tile-Based Rendering</text>
          <text x="155" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理：</text>
          <text x="155" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">屏幕分 Tile</text>
          <text x="155" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">逐 Tile 渲染</text>
          <text x="155" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">片上缓存减少带宽</text>

          <rect x="265" y="100" width="190" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">带宽优化</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">避免回读 GPU 数据</text>
          <text x="360" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">关键技巧：</text>
          <text x="360" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">G-Buffer 在 Tile 内</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">降低 RT 分辨率</text>
          <text x="360" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">ASTC 纹理压缩</text>

          <rect x="470" y="100" width="190" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="565" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">着色器精简</text>
          <text x="565" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">half 精度替代 float</text>
          <text x="565" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">优化策略：</text>
          <text x="565" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">减少分支/循环</text>
          <text x="565" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">预计算 LUT</text>
          <text x="565" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">简化 BRDF 项</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">移动端 vs PC 端核心差异</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">移动端瓶颈 = 带宽（TBR 优化目标） | PC 端瓶颈 = 计算量（ALU/填充率）</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">移动端用 Forward+ 或 Tile-Based Deferred | PC 端用 Deferred + 大量光源</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GPU Pro 建议：移动端优先减少 RT 数量和 Blit 次数</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">移动端渲染优化——TBR 架构下的带宽与着色器优化</figcaption>
    </figure>
  );
}
