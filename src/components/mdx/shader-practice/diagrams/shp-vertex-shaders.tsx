/**
 * <ShpVertexShadersDiagram>
 *
 * 顶点着色器：MVP 变换与属性传递
 */

export function ShpVertexShadersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="顶点着色器 MVP 变换与属性传递" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">顶点着色器实战</text>

          <rect x="30" y="60" width="120" height="56" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="90" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">模型空间</text>
          <text x="90" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">POSITION</text>

          <rect x="200" y="60" width="120" height="56" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="260" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">世界空间</text>
          <text x="260" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">× World</text>

          <rect x="370" y="60" width="120" height="56" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="430" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">观察空间</text>
          <text x="430" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">× View</text>

          <rect x="540" y="60" width="150" height="56" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">裁剪空间</text>
          <text x="615" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">× Proj → SV_POSITION</text>

          <line x1="150" y1="88" x2="200" y2="88" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-vertex-shaders-arrow)" />
          <line x1="320" y1="88" x2="370" y2="88" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-vertex-shaders-arrow)" />
          <line x1="490" y1="88" x2="540" y2="88" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-vertex-shaders-arrow)" />

          <rect x="30" y="150" width="660" height="36" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="173" textAnchor="middle" fontSize="11" fill="var(--text-primary)">mul(Proj, mul(View, mul(World, pos))) — MVP 串联变换</text>

          <rect x="30" y="210" width="310" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="185" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">输入属性</text>
          <text x="185" y="250" textAnchor="middle" fontSize="10" fill="var(--text-primary)">POSITION (float3)</text>
          <text x="185" y="266" textAnchor="middle" fontSize="10" fill="var(--text-primary)">NORMAL (float3)</text>
          <text x="185" y="282" textAnchor="middle" fontSize="10" fill="var(--text-primary)">TEXCOORD0 (float2)</text>
          <text x="185" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从顶点缓冲读取</text>

          <rect x="380" y="210" width="310" height="100" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="535" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">输出属性（光栅化插值）</text>
          <text x="535" y="250" textAnchor="middle" fontSize="10" fill="var(--text-primary)">SV_POSITION (float4)</text>
          <text x="535" y="266" textAnchor="middle" fontSize="10" fill="var(--text-primary)">NORMAL (float3)</text>
          <text x="535" y="282" textAnchor="middle" fontSize="10" fill="var(--text-primary)">TEXCOORD0 (float2)</text>
          <text x="535" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">传递给像素着色器</text>

          <line x1="340" y1="260" x2="380" y2="260" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#shp-vertex-shaders-arrow)" />

          <text x="360" y="365" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">每个顶点执行一次 → 变换坐标 + 传递插值属性</text>

          <defs>
            <marker id="shp-vertex-shaders-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">顶点着色器 MVP 变换与属性传递</figcaption>
    </figure>
  );
}
