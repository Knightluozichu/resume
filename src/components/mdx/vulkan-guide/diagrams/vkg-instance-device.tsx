/**
 * <VkgInstanceDeviceDiagram>：实例与物理设备初始化流程
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function VkgInstanceDeviceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Vulkan 实例与物理设备初始化流程" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">实例与物理设备初始化流程</text>

          {/* Step 1: VkInstance */}
          <rect x="40" y="55" width="180" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="130" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">1. VkInstance</text>
          <text x="130" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">vkCreateInstance()</text>
          <text x="130" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">AppInfo + 扩展/层</text>

          {/* Arrow 1→2 */}
          <line x1="220" y1="95" x2="250" y2="95" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowR)" />
          <defs>
            <marker id="arrowR" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L6,4 L0,8 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Step 2: Enumerate */}
          <rect x="250" y="55" width="180" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="340" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">2. 枚举物理设备</text>
          <text x="340" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">vkEnumeratePhysical</text>
          <text x="340" y="115" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">Devices()</text>
          <text x="340" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">查询属性/特性</text>

          {/* Arrow 2→3 */}
          <line x1="430" y1="95" x2="460" y2="95" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowR)" />

          {/* Step 3: Queue Family */}
          <rect x="460" y="55" width="220" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="570" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">3. 选择队列族</text>
          <text x="570" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">VK_QUEUE_GRAPHICS_BIT</text>
          <text x="570" y="115" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">VK_QUEUE_COMPUTE_BIT</text>
          <text x="570" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">检查设备扩展支持</text>

          {/* Step 4: VkDevice (below) */}
          <rect x="200" y="175" width="320" height="70" rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.5" />
          <text x="360" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">4. VkDevice（逻辑设备）</text>
          <text x="360" y="218" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">vkCreateDevice() → vkGetDeviceQueue()</text>
          <text x="360" y="234" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">启用扩展 + 特性 + 队列优先级</text>

          {/* Arrow 3→4 */}
          <path d="M 570 135 L 570 160 L 360 160 L 360 175" fill="none" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arrowG)" />
          <defs>
            <marker id="arrowG" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L6,4 L0,8 Z" fill="var(--success)" />
            </marker>
          </defs>

          {/* GPU cards */}
          <text x="360" y="280" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">物理设备类型</text>
          <rect x="50" y="295" width="150" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="125" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Discrete GPU</text>
          <text x="125" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">独立显卡（优先选）</text>

          <rect x="220" y="295" width="150" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="295" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Integrated GPU</text>
          <text x="295" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">集成显卡</text>

          <rect x="390" y="295" width="150" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="465" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Virtual GPU</text>
          <text x="465" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">虚拟化设备</text>

          <rect x="560" y="295" width="110" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="615" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">CPU</text>
          <text x="615" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">软件回退</text>

          <text x="360" y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">实例→枚举→队列族选择→逻辑设备：Vulkan 初始化的四步链</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">VkInstance 到 VkDevice 的初始化链路与物理设备类型</figcaption>
    </figure>
  );
}
