/**
 * <UslPropertiesBlockDiagram>
 *
 * Properties 语义块属性类型与面板交互
 */

export function UslPropertiesBlockDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Properties 语义块属性类型与面板交互" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Properties 语义块</text>

          <rect x="30" y="55" width="155" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">数值类型</text>
          <text x="107" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Float — 输入框</text>
          <text x="107" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Range — 滑块</text>
          <text x="107" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">面板可调节</text>

          <rect x="200" y="55" width="155" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">颜色向量</text>
          <text x="277" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Color — RGBA</text>
          <text x="277" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Vector — 4D</text>
          <text x="277" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">float4 / half4</text>

          <rect x="370" y="55" width="155" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">纹理类型</text>
          <text x="447" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">2D — 普通纹理</text>
          <text x="447" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Cube — 立方体贴图</text>
          <text x="447" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">sampler2D</text>

          <rect x="540" y="55" width="150" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">C# 交互</text>
          <text x="615" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SetFloat/SetColor</text>
          <text x="615" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SetTexture</text>
          <text x="615" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MaterialPropertyBlock</text>

          <rect x="30" y="160" width="660" height="56" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="180" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">_Color("Main Color", Color) = (1,1,1,1)</text>
          <text x="360" y="198" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">_MainTex("Texture", 2D) = "white" &#123;&#125;</text>
          <text x="360" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">格式: _Name("Label", Type) = Default</text>

          <rect x="48" y="250" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="270" textAnchor="middle" fontSize="11" fill="var(--text-primary)">材质面板 → 属性值 → Shader 代码 → 渲染输出</text>
          <text x="360" y="288" textAnchor="middle" fontSize="11" fill="var(--text-primary)">C# 脚本可通过 Material 或 MaterialPropertyBlock 动态修改</text>

          <text x="360" y="340" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">MaterialPropertyBlock 修改属性不创建材质实例，保持合批</text>
          <text x="360" y="360" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">全局属性: Shader.SetGlobalColor 影响所有材质</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Properties 语义块属性类型与面板交互</figcaption>
    </figure>
  );
}
