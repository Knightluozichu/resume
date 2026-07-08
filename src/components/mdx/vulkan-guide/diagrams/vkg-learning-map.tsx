/**
 * <VkgLearningMapDiagram>：Vulkan 学习指南 全书学习地图
 * 纯静态 SVG，无交互。Server Component。
 */
export function VkgLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Vulkan 学习指南全书学习地图" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Vulkan 学习指南 · 全书学习地图</text>

          {/* 五大初始化步骤 */}
          <text x="360" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">五大初始化步骤</text>
          {[
            { x: 40, t: "1 Instance", d: "实例" },
            { x: 172, t: "2 Device", d: "物理/逻辑设备" },
            { x: 304, t: "3 Swapchain", d: "交换链" },
            { x: 436, t: "4 Pipeline", d: "图形管线" },
            { x: 568, t: "5 CmdBuffer", d: "命令缓冲" },
          ].map((s, i) => (
            <g key={s.t}>
              <rect x={s.x} y="66" width="112" height="56" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.3" />
              <text x={s.x + 56} y="88" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent)">{s.t}</text>
              <text x={s.x + 56} y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{s.d}</text>
              {i < 4 && <line x1={s.x + 112} y1="94" x2={s.x + 124} y2="94" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#vkgArrow)" />}
            </g>
          ))}

          {/* 渲染循环 */}
          <rect x="40" y="140" width="640" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">渲染循环：取图像 → 提交命令 → 等同步 → 呈现</text>
          <text x="360" y="180" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">vkAcquireNextImageKHR → vkQueueSubmit → vkWaitForFences → vkQueuePresentKHR</text>

          {/* 十章 */}
          <text x="360" y="216" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">十章脉络</text>
          {[
            { x: 40, y: 226, t: "1 学习地图" },
            { x: 180, y: 226, t: "2 基础概念" },
            { x: 320, y: 226, t: "3 实例设备" },
            { x: 460, y: 226, t: "4 交换链" },
            { x: 600, y: 226, t: "5 图形管线" },
            { x: 40, y: 268, t: "6 命令缓冲" },
            { x: 180, y: 268, t: "7 渲染通道" },
            { x: 320, y: 268, t: "8 纹理着色器" },
            { x: 460, y: 268, t: "9 高级特性" },
            { x: 600, y: 268, t: "10 总复习" },
          ].map((c) => (
            <g key={c.t}>
              <rect x={c.x} y={c.y} width="132" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x={c.x + 66} y={c.y + 21} textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{c.t}</text>
            </g>
          ))}

          <rect x="40" y="318" width="640" height="58" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="340" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">核心思想：显式 API + 命令缓冲 + 显式同步</text>
          <text x="360" y="360" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">代码量大但无驱动隐式开销，可预测、可并行、跨平台一致</text>

          <defs>
            <marker id="vkgArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">五大初始化步骤、渲染循环与十章脉络总览</figcaption>
    </figure>
  );
}
