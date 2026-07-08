/**
 * <UusUrpBasicsDiagram>：URP 基础与架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusUrpBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="URP 基础与架构图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            URP 渲染管线架构
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            SRP Core → Renderer → Render Pass → Shader
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="140" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">SRP Core</text>
          <text x="130" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">管线调度核心</text>

          <rect x="220" y="100" width="140" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Renderer</text>
          <text x="290" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">渲染器配置</text>

          <rect x="380" y="100" width="140" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="450" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Render Pass</text>
          <text x="450" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">渲染通道</text>

          <rect x="540" y="100" width="120" height="60" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="600" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Shader</text>
          <text x="600" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">着色器</text>

          <text x="200" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="360" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="520" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="60" y="190" width="290" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="205" y="212" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">URP Asset（管线资产）</text>
          <text x="205" y="232" textAnchor="middle" fontSize="10" fill="var(--text-primary)">渲染质量 / 阴影 / 后处理 / MSAA</text>
          <text x="205" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨平台配置：PC / Mobile / Switch</text>

          <rect x="370" y="190" width="290" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="515" y="212" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Renderer Feature（渲染特性）</text>
          <text x="515" y="232" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SSAO / Screen Space Shadows</text>
          <text x="515" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可插拔扩展渲染功能</text>

          <rect x="60" y="285" width="600" height="60" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="308" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">SRP Batch：合批同 Shader 的绘制调用，减少 SetPassCall</text>
          <text x={VIEW_W / 2} y="328" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">条件：相同 Shader + 相同关键词组合 + 兼容的 CBuffer</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        URP 渲染管线架构——SRP Core 调度 Renderer，Renderer 组织 Render Pass
      </figcaption>
    </figure>
  );
}
