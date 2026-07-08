/**
 * <UslSubshaderPassDiagram>
 *
 * SubShader 与 Pass 的渲染状态控制
 */

export function UslSubshaderPassDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="SubShader 与 Pass 的渲染状态控制" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">SubShader 与 Pass</text>

          <rect x="260" y="50" width="200" height="36" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">SubShader</text>

          <line x1="360" y1="86" x2="180" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="360" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="540" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="80" y="110" width="200" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="180" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Tags + LOD</text>

          <rect x="260" y="110" width="200" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Pass 1</text>

          <rect x="440" y="110" width="200" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Pass 2 (可选)</text>

          <rect x="30" y="165" width="220" height="56" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="185" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Queue=Transparent</text>
          <text x="140" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">RenderType=Opaque</text>
          <text x="140" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LOD 100-600 质量分级</text>

          <rect x="260" y="165" width="200" height="56" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="185" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Cull Back</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ZWrite On</text>
          <text x="360" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">正常渲染</text>

          <rect x="470" y="165" width="220" height="56" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="580" y="185" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Cull Front</text>
          <text x="580" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ZWrite Off</text>
          <text x="580" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">法线外扩描边</text>

          <rect x="48" y="255" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="275" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Cull: Back/Front/Off 剔除控制</text>
          <text x="360" y="293" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Blend: SrcAlpha OneMinusSrcAlpha 透明混合</text>

          <text x="360" y="345" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">多 Pass: 描边(Pass2 法线外扩+Cull Front) 叠加本体(Pass1)</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">UsePass: 引用其他 Shader 的 Pass，注意 Name 全大写</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">SubShader 与 Pass 的渲染状态控制</figcaption>
    </figure>
  );
}
