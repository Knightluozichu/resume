/**
 * <HcwMemoryHierarchyDiagram>：内存层次金字塔图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwMemoryHierarchyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存层次金字塔图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内存层次金字塔：速度 ↓ 容量 ↑ 价格 ↓
          </text>

          {/* 金字塔各层（从顶到底，梯形） */}
          {/* 寄存器 */}
          <polygon points="300,60 440,60 460,95 280,95" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">寄存器</text>
          <text x="540" y="82" textAnchor="start" fontSize="10" fill="var(--text-secondary)">~1KB · 0-1ns · CPU 内部</text>

          {/* L1 缓存 */}
          <polygon points="280,95 460,95 485,135 255,135" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="119" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">L1 缓存</text>
          <text x="540" y="119" textAnchor="start" fontSize="10" fill="var(--text-secondary)">~64KB · 1ns · SRAM</text>

          {/* L2 缓存 */}
          <polygon points="255,135 485,135 510,175 230,175" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="159" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">L2 缓存</text>
          <text x="540" y="159" textAnchor="start" fontSize="10" fill="var(--text-secondary)">~256KB · 3-10ns · SRAM</text>

          {/* L3 缓存 */}
          <polygon points="230,175 510,175 535,215 205,215" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="199" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">L3 缓存</text>
          <text x="540" y="199" textAnchor="start" fontSize="10" fill="var(--text-secondary)">~8MB · 10-20ns · SRAM（多核共享）</text>

          {/* 主内存 */}
          <polygon points="205,215 535,215 560,255 180,255" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="239" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">主内存 DRAM</text>
          <text x="540" y="239" textAnchor="start" fontSize="10" fill="var(--text-secondary)">~16GB · 100ns · 通过总线访问</text>

          {/* SSD */}
          <polygon points="180,255 560,255 585,295 155,295" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="279" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">固态硬盘 SSD</text>
          <text x="540" y="279" textAnchor="start" fontSize="10" fill="var(--text-secondary)">~1TB · 100μs · Flash 闪存</text>

          {/* HDD */}
          <polygon points="155,295 585,295 610,335 130,335" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="370" y="319" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">机械硬盘 HDD</text>
          <text x="540" y="319" textAnchor="start" fontSize="10" fill="var(--text-secondary)">~4TB · 10ms · 磁盘片+磁头</text>

          {/* 左侧标注：速度方向 */}
          <text x="80" y="100" textAnchor="middle" fontSize="10" fill="var(--danger)" fontWeight="600">快</text>
          <text x="80" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr;</text>
          <text x="80" y="300" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="80" y="320" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" fontWeight="600">慢</text>

          {/* 局部性原理 */}
          <rect x="40" y="355" width="660" height="80" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="375" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">为什么分层有效？局部性原理（Locality）</text>
          <text x="60" y="393" textAnchor="start" fontSize="10" fill="var(--text-secondary)">① 时间局部性——刚访问的数据很可能再次被访问（如循环变量），保留在缓存</text>
          <text x="60" y="409" textAnchor="start" fontSize="10" fill="var(--text-secondary)">② 空间局部性——被访问数据的邻近地址很可能也被访问（如数组遍历），加载整个缓存行（64B）</text>
          <text x="60" y="425" textAnchor="start" fontSize="10" fill="var(--text-tertiary)">命中率越高 → CPU 等待越少 → 整体表现接近最快层、容量接近最慢层</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存层次金字塔——从寄存器到机械硬盘，速度与容量的 tradeoff 靠局部性原理弥合
      </figcaption>
    </figure>
  );
}
