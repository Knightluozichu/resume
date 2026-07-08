/**
 * <CgpRenderingAlgorithmsDiagram>：渲染算法与可见性图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CgpRenderingAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="渲染算法与可见性图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            渲染算法与可见性
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Z-buffer、Painter算法与光线投射
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Z-buffer */}
          <rect x="60" y="110" width="180" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">Z-buffer</text>
          <text x="150" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">逐像素深度比较</text>
          <text x="150" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">if z &lt; zbuffer[x][y]</text>
          <text x="150" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">  写入颜色和深度</text>
          <text x="150" y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">简单，无需排序</text>
          <text x="150" y="230" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GPU标准方案</text>

          {/* Painter's */}
          <rect x="260" y="110" width="180" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Painter算法</text>
          <text x="350" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">从远到近绘制</text>
          <text x="350" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按深度排序图元</text>
          <text x="350" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">后面的覆盖前面的</text>
          <text x="350" y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">无法处理循环遮挡</text>
          <text x="350" y="230" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">适合半透明排序</text>

          {/* Ray casting */}
          <rect x="460" y="110" width="200" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">光线投射/追踪</text>
          <text x="560" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">从像素发射光线</text>
          <text x="560" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">求交最近物体</text>
          <text x="560" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">天然解决可见性</text>
          <text x="560" y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">支持反射/折射</text>
          <text x="560" y="230" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">计算量大，RTX加速</text>

          {/* BSP */}
          <rect x="60" y="270" width="600" height="70" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">其他可见性算法</text>
          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-primary)">BSP树（预排序空间分割） | 八叉树（层次剔除） | Portal（室内场景门户裁剪）</text>
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">现代GPU主要用Z-buffer，其余算法用于特定场景优化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渲染算法与可见性——Z-buffer、Painter算法与光线投射对比
      </figcaption>
    </figure>
  );
}
