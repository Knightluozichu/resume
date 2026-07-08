/**
 * <UsfPostProcessingDiagram>
 *
 * 后处理栈架构与 Volume Blending
 */

export function UsfPostProcessingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="后处理栈架构与 Volume Blending" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">后处理栈</text>

          <rect x="30" y="55" width="150" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="105" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">PostProcessLayer</text>
          <text x="105" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">挂载在相机上</text>
          <text x="105" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">控制渲染执行</text>
          <text x="105" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Anti-aliasing 等</text>

          <rect x="200" y="55" width="150" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="275" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">PostProcessVolume</text>
          <text x="275" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">影响范围+权重</text>
          <text x="275" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">全局/局部</text>
          <text x="275" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Blending 过渡</text>

          <rect x="370" y="55" width="150" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="445" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">PostProcessProfile</text>
          <text x="445" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">效果配置资源</text>
          <text x="445" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Bloom/ColorGrading</text>
          <text x="445" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Vignette/DOF 等</text>

          <rect x="540" y="55" width="150" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">URP 替代</text>
          <text x="615" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Volume + Profile</text>
          <text x="615" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">RenderFeature</text>
          <text x="615" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">管线原生集成</text>

          <rect x="30" y="155" width="660" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="175" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Volume Blending: 相机进入 Volume 范围 → 效果按权重平滑过渡</text>
          <text x="360" y="193" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">如进入洞穴时画面渐暗、进入水下时色调变化</text>

          <rect x="48" y="225" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="245" textAnchor="middle" fontSize="11" fill="var(--text-primary)">URP 自定义后处理: RenderFeature + RenderPass + VolumeComponent</text>
          <text x="360" y="263" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Blit 执行自定义 Shader → 注入到管线 BeforeRendering/AfterRendering</text>

          <text x="360" y="315" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">后处理栈 = Layer(执行) + Volume(范围) + Profile(配置) 三层分离</text>
          <text x="360" y="335" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">URP 中 Volume 直接挂载在场景对象上，无需 Layer 组件</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">后处理栈架构与 Volume Blending</figcaption>
    </figure>
  );
}
