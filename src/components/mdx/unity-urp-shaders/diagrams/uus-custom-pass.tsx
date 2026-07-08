/**
 * <UusCustomPassDiagram>：自定义 Pass 与渲染特性图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusCustomPassDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="自定义 Pass 与渲染特性图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            自定义 Pass 与 Renderer Feature
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            ScriptableRendererFeature → ScriptableRenderPass → 注入管线
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="180" height="80" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">Renderer Feature</text>
          <text x="150" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ScriptableRendererFeature</text>
          <text x="150" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">挂载到 Renderer Data</text>

          <text x="250" y="142" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="270" y="100" width="180" height="80" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Render Pass</text>
          <text x="360" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ScriptableRenderPass</text>
          <text x="360" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Execute() 执行绘制</text>

          <text x="460" y="142" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="480" y="100" width="160" height="80" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">注入点</text>
          <text x="560" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">RenderPassEvent</text>
          <text x="560" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">BeforeRendering / After</text>

          <rect x="60" y="210" width="190" height="130" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="155" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Create() 方法</text>
          <text x="155" y="256" textAnchor="middle" fontSize="10" fill="var(--text-primary)">初始化 Pass 实例</text>
          <text x="155" y="274" textAnchor="middle" fontSize="10" fill="var(--text-primary)">设置注入点</text>
          <text x="155" y="292" textAnchor="middle" fontSize="10" fill="var(--text-primary)">配置材质/RT</text>
          <text x="155" y="318" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Feature 生命周期入口</text>

          <rect x="265" y="210" width="190" height="130" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">OnCameraSetup()</text>
          <text x="360" y="256" textAnchor="middle" fontSize="10" fill="var(--text-primary)">分配临时 RT</text>
          <text x="360" y="274" textAnchor="middle" fontSize="10" fill="var(--text-primary)">配置渲染目标</text>
          <text x="360" y="292" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Blit / Draw Mesh</text>
          <text x="360" y="318" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">每帧执行渲染逻辑</text>

          <rect x="470" y="210" width="190" height="130" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="565" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">典型应用</text>
          <text x="565" y="256" textAnchor="middle" fontSize="10" fill="var(--text-primary)">描边 Outline</text>
          <text x="565" y="274" textAnchor="middle" fontSize="10" fill="var(--text-primary)">全屏特效（Blit）</text>
          <text x="565" y="292" textAnchor="middle" fontSize="10" fill="var(--text-primary)">自定义深度/法线 Pass</text>
          <text x="565" y="318" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">扩展 URP 渲染能力</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-center text-sm text-secondary">
        自定义 Pass 与 Renderer Feature——Feature 创建 Pass，Pass 在注入点执行
      </figcaption>
    </figure>
  );
}
