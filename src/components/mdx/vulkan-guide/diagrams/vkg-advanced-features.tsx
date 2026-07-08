/**
 * <VkgAdvancedFeaturesDiagram>：Vulkan 高级特性对比
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function VkgAdvancedFeaturesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Vulkan 高级特性对比" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Vulkan 高级特性对比</text>

          {/* Ray Tracing */}
          <rect x="20" y="50" width="165" height="155" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="102" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">光线追踪</text>
          <text x="102" y="86" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VK_KHR_ray_tracing</text>

          <rect x="30" y="96" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="102" y="112" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">BLAS（几何体级）</text>

          <rect x="30" y="124" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="102" y="140" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">TLAS（实例级）</text>

          <rect x="30" y="152" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="102" y="168" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">SBT（着色器绑定表）</text>

          <text x="102" y="190" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">反射/阴影/全局光照</text>

          {/* Mesh Shader */}
          <rect x="195" y="50" width="165" height="155" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">网格着色器</text>
          <text x="277" y="86" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VK_EXT_mesh_shader</text>

          <rect x="205" y="96" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="277" y="112" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">Task Shader（可选）</text>

          <rect x="205" y="124" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="277" y="140" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">Mesh Shader</text>

          <rect x="205" y="152" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="277" y="168" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">→ 光栅化 → FS</text>

          <text x="277" y="190" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">程序化几何/GPU 驱动</text>

          {/* Bindless */}
          <rect x="370" y="50" width="165" height="155" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">描述符索引</text>
          <text x="452" y="86" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VK_EXT_descriptor_indexing</text>

          <rect x="380" y="96" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="452" y="112" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">textures[] 大数组</text>

          <rect x="380" y="124" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="452" y="140" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">NonUniform 索引</text>

          <rect x="380" y="152" width="145" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="452" y="168" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">无需频繁更新描述符</text>

          <text x="452" y="190" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">大量材质/纹理</text>

          {/* VRS */}
          <rect x="545" y="50" width="155" height="155" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="622" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">可变速率着色</text>
          <text x="622" y="86" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VK_KHR_fragment_shading_rate</text>

          <rect x="555" y="96" width="135" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="622" y="112" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">1x1 全分辨率</text>

          <rect x="555" y="124" width="135" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="622" y="140" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">2x2 降采样</text>

          <rect x="555" y="152" width="135" height="24" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="622" y="168" textAnchor="middle" fontSize="8.5" fill="var(--text-primary)">4x4 极低速率</text>

          <text x="622" y="190" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VR/性能敏感区域</text>

          {/* Extension lifecycle */}
          <text x="360" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">扩展生命周期</text>

          <rect x="40" y="250" width="130" height="40" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="105" y="268" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">厂商扩展</text>
          <text x="105" y="282" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VK_NV_* / VK_AMD_*</text>

          <line x1="170" y1="270" x2="185" y2="270" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#aAF)" />
          <defs>
            <marker id="aAF" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <rect x="185" y="250" width="130" height="40" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="250" y="268" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--accent)">EXT 扩展</text>
          <text x="250" y="282" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">多厂商共识</text>

          <line x1="315" y1="270" x2="330" y2="270" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#aAF)" />

          <rect x="330" y="250" width="130" height="40" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="395" y="268" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--success)">KHR 扩展</text>
          <text x="395" y="282" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Khronos 官方认可</text>

          <line x1="460" y1="270" x2="475" y2="270" stroke="var(--success)" strokeWidth="1.2" markerEnd="url(#aAF2)" />
          <defs>
            <marker id="aAF2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--success)" />
            </marker>
          </defs>

          <rect x="475" y="250" width="220" height="40" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="585" y="268" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--warning)">核心 API（提升）</text>
          <text x="585" y="282" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Vulkan 1.1 / 1.2 / 1.3</text>

          {/* Usage tips */}
          <rect x="20" y="305" width="680" height="75" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="325" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--text-primary)">使用原则</text>
          <text x="30" y="343" fontSize="9.5" fill="var(--text-secondary)">1. 始终用 vkEnumerateDeviceExtensionProperties 检查支持，不用版本号猜测</text>
          <text x="30" y="358" fontSize="9.5" fill="var(--text-secondary)">2. 启用扩展时同时链入对应的 Features2 结构体，检查特性位</text>
          <text x="30" y="373" fontSize="9.5" fill="var(--text-secondary)">3. 为不支持的设备提供回退路径（光栅化替代光线追踪、传统管线替代网格着色器）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">四大高级特性对比与扩展生命周期</figcaption>
    </figure>
  );
}
