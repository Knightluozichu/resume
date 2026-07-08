/**
 * <GpoRenderingTechniquesDiagram>：高级渲染技术图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoRenderingTechniquesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="高级渲染技术图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">高级渲染技术对比</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">前向渲染 vs 延迟渲染 vs 可见性缓冲</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="190" height="240" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="155" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">前向渲染</text>
          <text x="155" y="148" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Forward Rendering</text>
          <text x="155" y="172" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">流程：</text>
          <text x="155" y="190" textAnchor="middle" fontSize="10" fill="var(--text-primary)">逐物体逐光源</text>
          <text x="155" y="206" textAnchor="middle" fontSize="10" fill="var(--text-primary)">直接计算光照</text>
          <text x="155" y="230" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">优点：</text>
          <text x="155" y="248" textAnchor="middle" fontSize="10" fill="var(--text-primary)">MSAA 原生支持</text>
          <text x="155" y="264" textAnchor="middle" fontSize="10" fill="var(--text-primary)">透明物体支持</text>
          <text x="155" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">缺点：</text>
          <text x="155" y="306" textAnchor="middle" fontSize="10" fill="var(--text-primary)">光源数 O(N*M)</text>
          <text x="155" y="322" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">N=物体 M=光源</text>

          <rect x="265" y="100" width="190" height="240" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">延迟渲染</text>
          <text x="360" y="148" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Deferred Rendering</text>
          <text x="360" y="172" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">流程：</text>
          <text x="360" y="190" textAnchor="middle" fontSize="10" fill="var(--text-primary)">G-Buffer 几何</text>
          <text x="360" y="206" textAnchor="middle" fontSize="10" fill="var(--text-primary)">光照 Pass 计算</text>
          <text x="360" y="230" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">优点：</text>
          <text x="360" y="248" textAnchor="middle" fontSize="10" fill="var(--text-primary)">光源数 O(N+M)</text>
          <text x="360" y="264" textAnchor="middle" fontSize="10" fill="var(--text-primary)">大量光源高效</text>
          <text x="360" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">缺点：</text>
          <text x="360" y="306" textAnchor="middle" fontSize="10" fill="var(--text-primary)">不支持 MSAA</text>
          <text x="360" y="322" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">G-Buffer 带宽大</text>

          <rect x="470" y="100" width="190" height="240" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="565" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">可见性缓冲</text>
          <text x="565" y="148" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Visibility Buffer</text>
          <text x="565" y="172" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">流程：</text>
          <text x="565" y="190" textAnchor="middle" fontSize="10" fill="var(--text-primary)">存图元ID+属性</text>
          <text x="565" y="206" textAnchor="middle" fontSize="10" fill="var(--text-primary)">延迟属性读取</text>
          <text x="565" y="230" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">优点：</text>
          <text x="565" y="248" textAnchor="middle" fontSize="10" fill="var(--text-primary)">带宽极低</text>
          <text x="565" y="264" textAnchor="middle" fontSize="10" fill="var(--text-primary)">材质复杂度无关</text>
          <text x="565" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">缺点：</text>
          <text x="565" y="306" textAnchor="middle" fontSize="10" fill="var(--text-primary)">实现复杂</text>
          <text x="565" y="322" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">需现代 GPU 特性</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">高级渲染技术对比——前向、延迟与可见性缓冲的权衡</figcaption>
    </figure>
  );
}
