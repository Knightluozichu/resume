/**
 * <UslCommandBufferDiagram>
 *
 * Command Buffer 渲染管线插入点
 */

export function UslCommandBufferDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Command Buffer 渲染管线插入点" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">命令缓冲区 (Command Buffer)</text>

          <rect x="30" y="55" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="80" y="80" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Shadow</text>

          <rect x="145" y="55" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="80" textAnchor="middle" fontSize="10" fill="var(--text-primary)">GBuffer</text>

          <rect x="260" y="55" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="310" y="80" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Lighting</text>

          <rect x="375" y="55" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="425" y="80" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Image FX</text>

          <rect x="490" y="55" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="540" y="80" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Display</text>

          <rect x="130" y="110" width="130" height="30" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="130" textAnchor="middle" fontSize="9.5" fill="var(--danger)">AfterGBuffer</text>

          <rect x="245" y="110" width="130" height="30" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="310" y="130" textAnchor="middle" fontSize="9.5" fill="var(--danger)">AfterLighting</text>

          <rect x="360" y="110" width="130" height="30" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="425" y="130" textAnchor="middle" fontSize="9.5" fill="var(--danger)">BeforeImageFX</text>

          <line x1="195" y1="95" x2="195" y2="110" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="310" y1="95" x2="310" y2="110" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="425" y1="95" x2="425" y2="110" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3,3" />

          <rect x="30" y="165" width="200" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="130" y="185" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">CameraEvent</text>
          <text x="130" y="203" textAnchor="middle" fontSize="10" fill="var(--text-primary)">AfterGBuffer</text>
          <text x="130" y="220" textAnchor="middle" fontSize="10" fill="var(--text-primary)">BeforeImageEffects</text>

          <rect x="260" y="165" width="200" height="70" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="185" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">可用命令</text>
          <text x="360" y="203" textAnchor="middle" fontSize="10" fill="var(--text-primary)">DrawRenderers</text>
          <text x="360" y="220" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Blit / SetRenderTarget</text>

          <rect x="490" y="165" width="200" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="590" y="185" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">URP 替代</text>
          <text x="590" y="203" textAnchor="middle" fontSize="10" fill="var(--text-primary)">RenderFeature</text>
          <text x="590" y="220" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ScriptablePass</text>

          <rect x="48" y="260" width="624" height="50" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="280" textAnchor="middle" fontSize="11" fill="var(--text-primary)">选择性描边: Replacement Shader 渲染目标对象 → 边缘检测 → 叠加</text>
          <text x="360" y="298" textAnchor="middle" fontSize="11" fill="var(--text-primary)">比 GrabPass 更灵活: 精确控制渲染时机/分辨率/对象</text>

          <text x="360" y="350" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">Command Buffer: 在渲染管线特定位置插入自定义渲染命令</text>
          <text x="360" y="370" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">URP 中用 RenderFeature 替代，与管线更好集成</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Command Buffer 渲染管线插入点</figcaption>
    </figure>
  );
}
