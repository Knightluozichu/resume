/**
 * <VkgTexturesShadersDiagram>：纹理与着色器资源绑定链路
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function VkgTexturesShadersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="纹理与着色器资源绑定链路" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">纹理与着色器资源绑定链路</text>

          {/* Image creation pipeline */}
          <text x="360" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">纹理上传与布局转换</text>

          <rect x="30" y="65" width="100" height="45" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="80" y="83" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">Staging Buffer</text>
          <text x="80" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CPU 可见内存</text>

          <line x1="130" y1="87" x2="145" y2="87" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aTS)" />
          <defs>
            <marker id="aTS" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <rect x="145" y="65" width="100" height="45" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="195" y="83" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--accent)">VkImage</text>
          <text x="195" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">GPU 本地内存</text>

          <line x1="245" y1="87" x2="260" y2="87" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aTS)" />

          <rect x="260" y="65" width="100" height="45" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="310" y="83" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--accent)">VkImageView</text>
          <text x="310" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">格式/范围</text>

          <line x1="360" y1="87" x2="375" y2="87" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aTS)" />

          <rect x="375" y="65" width="100" height="45" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="425" y="83" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--accent)">VkSampler</text>
          <text x="425" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">过滤/寻址</text>

          <line x1="475" y1="87" x2="490" y2="87" stroke="var(--success)" strokeWidth="1.3" markerEnd="url(#aTS2)" />
          <defs>
            <marker id="aTS2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--success)" />
            </marker>
          </defs>

          <rect x="490" y="65" width="120" height="45" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="83" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--success)">DescriptorSet</text>
          <text x="550" y="97" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">ImageInfo 写入</text>

          {/* Layout transitions */}
          <text x="195" y="135" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">布局转换</text>
          <rect x="80" y="140" width="230" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="195" y="156" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">UNDEFINED → TRANSFER_DST → SHADER_READ_ONLY</text>

          {/* Descriptor system */}
          <text x="360" y="195" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">描述符系统三件套</text>

          <rect x="40" y="210" width="180" height="65" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="230" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--accent)">DescriptorSetLayout</text>
          <text x="130" y="247" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">binding 0: CombinedImageSampler</text>
          <text x="130" y="262" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">stage: FRAGMENT</text>

          <rect x="270" y="210" width="180" height="65" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="230" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--accent)">DescriptorPool</text>
          <text x="360" y="247" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">预分配内存池</text>
          <text x="360" y="262" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">按类型计数限制</text>

          <rect x="500" y="210" width="180" height="65" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="590" y="230" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--success)">DescriptorSet</text>
          <text x="590" y="247" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">从 Pool 分配</text>
          <text x="590" y="262" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">符合 Layout 结构</text>

          <line x1="220" y1="242" x2="270" y2="242" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />
          <line x1="450" y1="242" x2="500" y2="242" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />

          {/* Shader binding */}
          <text x="360" y="305" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">着色器资源访问</text>

          <rect x="40" y="320" width="160" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="120" y="340" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">vkCmdBindDescriptorSets</text>
          <text x="120" y="357" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">绑定到管线</text>

          <rect x="240" y="320" width="160" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="320" y="340" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">vkCmdPushConstants</text>
          <text x="320" y="357" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">MVP 矩阵 ≤128B</text>

          <rect x="440" y="320" width="240" height="50" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="340" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--warning)">GLSL: sampler2D + push_constant</text>
          <text x="560" y="357" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">GLSL → SPIR-V → VkShaderModule</text>

          <line x1="200" y1="345" x2="240" y2="345" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#aTS)" />
          <line x1="400" y1="345" x2="440" y2="345" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#aTS)" />

          <text x="360" y="393" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">VkImage → ImageView → Sampler → DescriptorSet → Shader binding</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">纹理创建、布局转换、描述符系统与着色器资源绑定的完整链路</figcaption>
    </figure>
  );
}
