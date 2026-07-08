/**
 * <UmsSrpMasteryDiagram>：SRP 渲染管线三层结构与流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsSrpMasteryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="SRP 渲染管线三层结构与流程图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">URP 渲染流程与三层架构</text>

          {/* 三层架构 */}
          <rect x="40" y="60" width="180" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">RendererFeature</text>
          <text x="130" y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">功能封装 + Inspector 配置</text>

          <text x="130" y="118" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; AddRenderPasses</text>

          <rect x="40" y="130" width="180" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">RenderPass</text>
          <text x="130" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Execute() + CommandBuffer</text>

          <text x="130" y="188" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; EnqueuePass</text>

          <rect x="40" y="200" width="180" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">Renderer</text>
          <text x="130" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编排 Pass 执行顺序</text>

          {/* 渲染流程 */}
          <rect x="260" y="60" width="420" height="184" rx="10" fill="var(--text-tertiary)" fillOpacity="0.04" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="470" y="80" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">URP 渲染流程</text>

          <rect x="280" y="95" width="100" height="30" rx="6" fill="var(--info)" fillOpacity="0.12" stroke="var(--info)" strokeWidth="1" />
          <text x="330" y="114" textAnchor="middle" fontSize="10" fill="var(--info)">Shadow</text>
          <text x="395" y="114" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="410" y="95" width="100" height="30" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="460" y="114" textAnchor="middle" fontSize="10" fill="var(--success)">Opaque</text>
          <text x="525" y="114" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="540" y="95" width="100" height="30" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="590" y="114" textAnchor="middle" fontSize="10" fill="var(--accent)">Sky</text>

          <text x="470" y="150" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr;</text>

          <rect x="280" y="160" width="100" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="330" y="179" textAnchor="middle" fontSize="10" fill="var(--warning)">Transparent</text>
          <text x="395" y="179" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="410" y="160" width="100" height="30" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="460" y="179" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">PostProcess</text>

          {/* 注入点说明 */}
          <text x="470" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">renderPassEvent 控制注入时机</text>
          <text x="470" y="228" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">AfterRenderingOpaques / AfterRenderingTransparents</text>

          {/* 批处理对比 */}
          <rect x="40" y="270" width="310" height="100" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="195" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">SRP Batcher</text>
          <text x="195" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同 Shader 不同材质</text>
          <text x="195" y="324" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">合并 CBUFFER 绑定</text>
          <text x="195" y="340" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">DrawCall 数量不变</text>
          <text x="195" y="356" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">需 CBUFFER_START(UnityPerMaterial)</text>

          <rect x="370" y="270" width="310" height="100" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="525" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">GPU Instancing</text>
          <text x="525" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同 Mesh 同 Material</text>
          <text x="525" y="324" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">合并为一次 DrawCall</text>
          <text x="525" y="340" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">适合大量相同物体</text>
          <text x="525" y="356" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">与 SRP Batcher 互斥</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SRP 精通——RendererFeature / RenderPass / Renderer + 渲染流程
      </figcaption>
    </figure>
  );
}
