/**
 * <VkgFinalReviewDiagram>：Vulkan 全书知识总览
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function VkgFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Vulkan 全书知识总览" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Vulkan 全书知识总览</text>

          {/* Five stages */}
          <text x="360" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">渲染流程五大阶段</text>

          {/* Stage 1: Init */}
          <rect x="20" y="65" width="125" height="100" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="82" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent)">1. 初始化</text>
          <text x="82" y="100" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkInstance</text>
          <text x="82" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkPhysicalDevice</text>
          <text x="82" y="124" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkDevice + Queue</text>
          <text x="82" y="136" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkSurfaceKHR</text>
          <text x="82" y="148" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkSwapchainKHR</text>
          <text x="82" y="160" textAnchor="middle" fontSize="7.5" fill="var(--accent)">第1-3章</text>

          <line x1="145" y1="115" x2="155" y2="115" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aFR)" />
          <defs>
            <marker id="aFR" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Stage 2: Pipeline */}
          <rect x="155" y="65" width="125" height="100" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="217" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--success)">2. 管线</text>
          <text x="217" y="100" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">DescriptorSetLayout</text>
          <text x="217" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">PipelineLayout</text>
          <text x="217" y="124" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">RenderPass</text>
          <text x="217" y="136" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">ShaderModule</text>
          <text x="217" y="148" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkPipeline</text>
          <text x="217" y="160" textAnchor="middle" fontSize="7.5" fill="var(--success)">第4、7章</text>

          <line x1="280" y1="115" x2="290" y2="115" stroke="var(--success)" strokeWidth="1.3" markerEnd="url(#aFR2)" />
          <defs>
            <marker id="aFR2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--success)" />
            </marker>
          </defs>

          {/* Stage 3: Resources */}
          <rect x="290" y="65" width="125" height="100" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="352" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--warning)">3. 资源</text>
          <text x="352" y="100" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkImage</text>
          <text x="352" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkImageView</text>
          <text x="352" y="124" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkSampler</text>
          <text x="352" y="136" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VkBuffer</text>
          <text x="352" y="148" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">DescriptorSet</text>
          <text x="352" y="160" textAnchor="middle" fontSize="7.5" fill="var(--warning)">第8章</text>

          <line x1="415" y1="115" x2="425" y2="115" stroke="var(--warning)" strokeWidth="1.3" markerEnd="url(#aFR3)" />
          <defs>
            <marker id="aFR3" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* Stage 4: Commands */}
          <rect x="425" y="65" width="125" height="100" rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="487" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--danger)">4. 命令</text>
          <text x="487" y="100" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CommandPool</text>
          <text x="487" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CommandBuffer</text>
          <text x="487" y="124" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">录制 + Submit</text>
          <text x="487" y="136" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Semaphore</text>
          <text x="487" y="148" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Fence 同步</text>
          <text x="487" y="160" textAnchor="middle" fontSize="7.5" fill="var(--danger)">第6章</text>

          <line x1="550" y1="115" x2="560" y2="115" stroke="var(--danger)" strokeWidth="1.3" markerEnd="url(#aFR4)" />
          <defs>
            <marker id="aFR4" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* Stage 5: Advanced */}
          <rect x="560" y="65" width="140" height="100" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4,2" />
          <text x="630" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-secondary)">5. 高级</text>
          <text x="630" y="100" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">光线追踪</text>
          <text x="630" y="112" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">网格着色器</text>
          <text x="630" y="124" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Bindless</text>
          <text x="630" y="136" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">VRS</text>
          <text x="630" y="148" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">扩展系统</text>
          <text x="630" y="160" textAnchor="middle" fontSize="7.5" fill="var(--text-secondary)">第9章</text>

          {/* Vulkan vs OpenGL */}
          <text x="360" y="195" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">Vulkan vs OpenGL 设计对比</text>

          <rect x="40" y="210" width="290" height="135" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="185" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">OpenGL（隐式）</text>
          <text x="55" y="248" fontSize="9" fill="var(--text-secondary)">全局状态机，驱动隐式管理</text>
          <text x="55" y="264" fontSize="9" fill="var(--text-secondary)">自动内存管理</text>
          <text x="55" y="280" fontSize="9" fill="var(--text-secondary)">隐式同步</text>
          <text x="55" y="296" fontSize="9" fill="var(--text-secondary)">单线程上下文</text>
          <text x="55" y="312" fontSize="9" fill="var(--text-secondary)">快速原型，代码量少</text>
          <text x="55" y="328" fontSize="9" fill="var(--text-secondary)">性能依赖驱动优化</text>

          <rect x="390" y="210" width="290" height="135" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Vulkan（显式）</text>
          <text x="405" y="248" fontSize="9" fill="var(--text-secondary)">不可变管线对象，显式配置</text>
          <text x="405" y="264" fontSize="9" fill="var(--text-secondary)">开发者完全控制内存</text>
          <text x="405" y="280" fontSize="9" fill="var(--text-secondary)">显式信号量/fence 同步</text>
          <text x="405" y="296" fontSize="9" fill="var(--text-secondary)">多线程录制命令缓冲</text>
          <text x="405" y="312" fontSize="9" fill="var(--text-secondary)">代码量大，需引擎级架构</text>
          <text x="405" y="328" fontSize="9" fill="var(--text-secondary)">性能可预测，CPU 开销低</text>

          {/* Key takeaway */}
          <rect x="40" y="360" width="640" height="30" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="379" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--text-primary)">核心思想：显式控制换取可预测性能和多线程友好性</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Vulkan 全书知识脉络与 OpenGL 对比</figcaption>
    </figure>
  );
}
