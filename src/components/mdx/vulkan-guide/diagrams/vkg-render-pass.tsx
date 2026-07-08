/**
 * <VkgRenderPassDiagram>：渲染通道与附件结构
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function VkgRenderPassDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="渲染通道与附件结构" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">渲染通道：附件 → 子通道 → 帧缓冲</text>

          {/* Render Pass container */}
          <rect x="20" y="45" width="680" height="180" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">VkRenderPass</text>

          {/* Attachments column */}
          <text x="100" y="85" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">附件描述</text>

          <rect x="40" y="95" width="120" height="35" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="100" y="110" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">附件 0: 颜色</text>
          <text x="100" y="123" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CLEAR→STORE</text>

          <rect x="40" y="135" width="120" height="35" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="100" y="150" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">附件 1: 法线</text>
          <text x="100" y="163" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CLEAR→DONT_CARE</text>

          <rect x="40" y="175" width="120" height="35" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="100" y="190" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">附件 2: 深度</text>
          <text x="100" y="203" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CLEAR→DONT_CARE</text>

          {/* Subpass 0 */}
          <rect x="200" y="95" width="150" height="75" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="275" y="113" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--accent)">子通道 0: G-Buffer</text>
          <text x="275" y="130" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">写 → 附件 0（颜色）</text>
          <text x="275" y="144" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">写 → 附件 1（法线）</text>
          <text x="275" y="158" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">写 → 附件 2（深度）</text>

          {/* Dependency arrow */}
          <line x1="275" y1="170" x2="275" y2="185" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#aRP)" />
          <defs>
            <marker id="aRP" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--warning)" />
            </marker>
          </defs>
          <text x="300" y="182" fontSize="8" fill="var(--warning)">依赖</text>

          {/* Subpass 1 */}
          <rect x="200" y="185" width="150" height="35" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="275" y="203" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--success)">子通道 1: 光照</text>
          <text x="275" y="216" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">读附件 0,1 → 写交换链</text>

          {/* External dependency arrows */}
          <text x="410" y="85" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">子通道依赖</text>

          <rect x="370" y="95" width="150" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="445" y="114" textAnchor="middle" fontSize="9" fill="var(--text-primary)">EXTERNAL → 子通道 0</text>

          <rect x="370" y="135" width="150" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="445" y="154" textAnchor="middle" fontSize="9" fill="var(--text-primary)">子通道 0 → 子通道 1</text>

          <rect x="370" y="175" width="150" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="445" y="194" textAnchor="middle" fontSize="9" fill="var(--text-primary)">子通道 1 → EXTERNAL</text>

          {/* Layout transitions */}
          <text x="610" y="85" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--text-primary)">布局转换</text>
          <rect x="540" y="95" width="140" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="610" y="114" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">UNDEFINED → COLOR_OPT</text>
          <rect x="540" y="135" width="140" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="610" y="154" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">COLOR_OPT → SHADER_RO</text>
          <rect x="540" y="175" width="140" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="610" y="194" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">SHADER_RO → PRESENT</text>

          {/* Framebuffer */}
          <rect x="100" y="250" width="520" height="55" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">VkFramebuffer</text>
          <text x="360" y="288" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">VkImageView[0]（颜色）+ VkImageView[1]（法线）+ VkImageView[2]（深度）→ 绑定到 RenderPass 附件槽</text>

          <line x1="100" y1="210" x2="100" y2="250" stroke="var(--success)" strokeWidth="1" strokeDasharray="3,2" />
          <line x1="275" y1="220" x2="275" y2="250" stroke="var(--success)" strokeWidth="1" strokeDasharray="3,2" />

          {/* Render commands */}
          <text x="360" y="335" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">渲染命令流程</text>
          <rect x="60" y="350" width="120" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="120" y="370" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vkCmdBeginRenderPass</text>
          <line x1="180" y1="366" x2="195" y2="366" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#aRP2)" />
          <defs>
            <marker id="aRP2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <rect x="195" y="350" width="80" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="235" y="370" textAnchor="middle" fontSize="9" fill="var(--text-primary)">子通道 0 绘制</text>
          <line x1="275" y1="366" x2="290" y2="366" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#aRP2)" />

          <rect x="290" y="350" width="80" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="330" y="370" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vkCmdNextSubpass</text>
          <line x1="370" y1="366" x2="385" y2="366" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#aRP2)" />

          <rect x="385" y="350" width="80" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="425" y="370" textAnchor="middle" fontSize="9" fill="var(--text-primary)">子通道 1 绘制</text>
          <line x1="465" y1="366" x2="480" y2="366" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#aRP2)" />

          <rect x="480" y="350" width="150" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="555" y="370" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vkCmdEndRenderPass</text>

          <text x="360" y="398" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">附件描述 → 子通道引用 → 子通道依赖 → 帧缓冲绑定 → 录制渲染命令</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">渲染通道的附件、子通道、依赖与帧缓冲结构</figcaption>
    </figure>
  );
}
