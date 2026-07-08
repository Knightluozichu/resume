/**
 * <VkgGraphicsPipelineDiagram>：Vulkan 图形管线阶段
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function VkgGraphicsPipelineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Vulkan 图形管线阶段" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Vulkan 图形管线阶段</text>

          {/* Pipeline stages flow */}
          {/* Stage 1: Vertex Input */}
          <rect x="20" y="55" width="80" height="55" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="60" y="76" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">顶点输入</text>
          <text x="60" y="93" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">固定功能</text>
          <text x="60" y="105" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">绑定/属性</text>

          <line x1="100" y1="82" x2="112" y2="82" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aP1)" />
          <defs>
            <marker id="aP1" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Stage 2: Input Assembly */}
          <rect x="112" y="55" width="80" height="55" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="152" y="76" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">输入装配</text>
          <text x="152" y="93" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">固定功能</text>
          <text x="152" y="105" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">拓扑类型</text>

          <line x1="192" y1="82" x2="204" y2="82" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aP1)" />

          {/* Stage 3: Vertex Shader */}
          <rect x="204" y="55" width="80" height="55" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="244" y="76" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--accent)">顶点着色器</text>
          <text x="244" y="93" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">可编程</text>
          <text x="244" y="105" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">SPIR-V</text>

          <line x1="284" y1="82" x2="296" y2="82" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aP1)" />

          {/* Stage 4: Tessellation */}
          <rect x="296" y="55" width="80" height="55" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="336" y="76" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-secondary)">曲面细分</text>
          <text x="336" y="93" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">可选</text>
          <text x="336" y="105" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">可编程</text>

          <line x1="376" y1="82" x2="388" y2="82" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aP1)" />

          {/* Stage 5: Geometry Shader */}
          <rect x="388" y="55" width="80" height="55" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="428" y="76" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-secondary)">几何着色器</text>
          <text x="428" y="93" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">可选</text>
          <text x="428" y="105" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">可编程</text>

          <line x1="468" y1="82" x2="480" y2="82" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aP1)" />

          {/* Stage 6: Rasterization */}
          <rect x="480" y="55" width="80" height="55" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="520" y="76" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">光栅化</text>
          <text x="520" y="93" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">固定功能</text>
          <text x="520" y="105" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">面剔除</text>

          <line x1="560" y1="82" x2="572" y2="82" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aP1)" />

          {/* Stage 7: Fragment Shader */}
          <rect x="572" y="55" width="80" height="55" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="612" y="76" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--accent)">片段着色器</text>
          <text x="612" y="93" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">可编程</text>
          <text x="612" y="105" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">SPIR-V</text>

          <line x1="612" y1="110" x2="612" y2="128" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#aP1)" />

          {/* Stage 8: Color Blend */}
          <rect x="522" y="130" width="180" height="55" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="612" y="151" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--text-primary)">颜色混合</text>
          <text x="612" y="168" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">固定功能</text>
          <text x="612" y="180" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">混合公式/附件</text>

          {/* Legend */}
          <text x="20" y="220" fontSize="11" fontWeight="700" fill="var(--text-primary)">图例</text>
          <rect x="20" y="230" width="20" height="14" rx="3" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="48" y="241" fontSize="10" fill="var(--text-secondary)">可编程阶段（着色器）</text>
          <rect x="200" y="230" width="20" height="14" rx="3" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="228" y="241" fontSize="10" fill="var(--text-secondary)">固定功能阶段</text>
          <rect x="360" y="230" width="20" height="14" rx="3" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="388" y="241" fontSize="10" fill="var(--text-secondary)">可选阶段</text>

          {/* Create info structure */}
          <text x="20" y="280" fontSize="12" fontWeight="700" fill="var(--text-primary)">VkGraphicsPipelineCreateInfo 组成</text>

          <rect x="20" y="295" width="150" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="95" y="313" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ShaderStages (VS+FS)</text>

          <rect x="180" y="295" width="120" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="240" y="313" textAnchor="middle" fontSize="10" fill="var(--text-primary)">VertexInput</text>

          <rect x="310" y="295" width="100" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="313" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Rasterizer</text>

          <rect x="420" y="295" width="100" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="470" y="313" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ColorBlend</text>

          <rect x="530" y="295" width="80" height="28" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="570" y="313" textAnchor="middle" fontSize="10" fill="var(--success)">PipelineLayout</text>

          <rect x="620" y="295" width="80" height="28" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="660" y="313" textAnchor="middle" fontSize="10" fill="var(--success)">RenderPass</text>

          <text x="360" y="360" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">所有状态一次性配置 → vkCreateGraphicsPipelines → 不可变 VkPipeline</text>
          <text x="360" y="380" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">创建昂贵但绑定极快：vkCmdBindPipeline 只需一个对象引用</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Vulkan 图形管线的 8 个阶段与创建结构</figcaption>
    </figure>
  );
}
