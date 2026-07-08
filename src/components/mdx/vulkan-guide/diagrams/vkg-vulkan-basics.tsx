/**
 * <VkgVulkanBasicsDiagram>：Vulkan 基础概念与同步原语
 * 纯静态 SVG，无交互。Server Component。
 */
export function VkgVulkanBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Vulkan 对象层次与同步原语" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">对象层次 + 同步：栅栏(CPU⇄GPU) vs 信号量(GPU⇄GPU)</text>

          {/* 对象层次 */}
          <rect x="40" y="56" width="120" height="44" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="100" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Instance</text>
          <rect x="180" y="56" width="120" height="44" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="240" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent)">物理设备</text>
          <text x="240" y="94" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">查能力</text>
          <rect x="320" y="56" width="120" height="44" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="380" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent)">逻辑设备</text>
          <text x="380" y="94" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">建资源</text>
          <rect x="460" y="56" width="120" height="44" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="520" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent)">队列族</text>
          <text x="520" y="94" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">图形/呈现</text>
          {[160, 300, 440].map((x) => (
            <line key={x} x1={x} y1="78" x2={x + 12} y2="78" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#vbArrow)" />
          ))}

          {/* 验证层 */}
          <rect x="610" y="56" width="90" height="44" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="655" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent)">验证层</text>
          <text x="655" y="94" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">调试期</text>

          {/* 同步原语对比 */}
          <rect x="40" y="130" width="320" height="150" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="200" y="154" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">栅栏 Fence（CPU 等 GPU）</text>
          <text x="60" y="180" fontSize="10" fill="var(--text-secondary)">vkQueueSubmit(.., fence)</text>
          <text x="60" y="200" fontSize="10" fill="var(--text-secondary)">vkWaitForFences → CPU 阻塞</text>
          <text x="60" y="226" fontSize="10" fill="var(--accent)">用途：等命令缓冲执行完以便重用</text>
          <text x="60" y="252" fontSize="9.5" fill="var(--text-secondary)">CPU ──等──&gt; GPU 完成</text>

          <rect x="380" y="130" width="300" height="150" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="530" y="154" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">信号量 Semaphore（GPU 内部）</text>
          <text x="400" y="180" fontSize="10" fill="var(--text-secondary)">imageAvailable: 取图像→绘制</text>
          <text x="400" y="200" fontSize="10" fill="var(--text-secondary)">renderFinished: 绘制→呈现</text>
          <text x="400" y="226" fontSize="10" fill="var(--accent)">用途：串 GPU 内部命令顺序</text>
          <text x="400" y="252" fontSize="9.5" fill="var(--text-secondary)">GPU 命令 A ──接力──&gt; GPU 命令 B</text>

          {/* 底部 */}
          <rect x="40" y="300" width="640" height="76" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="322" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">栅栏 = CPU⇄GPU 同步（命令缓冲可重用）；信号量 = GPU⇄GPU 同步（取图→绘→现顺序）</text>
          <text x="360" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">验证层开发期开、发布期关；队列族需查 GRAPHICS_BIT + 呈现支持</text>
          <text x="360" y="360" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">二者不可互换：栅栏不串 GPU 内部顺序，信号量不被 CPU 直接等</text>

          <defs>
            <marker id="vbArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">对象层层嵌套，栅栏管 CPU 等 GPU、信号量管 GPU 内部命令顺序</figcaption>
    </figure>
  );
}
