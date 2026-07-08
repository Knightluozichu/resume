/**
 * <ShpLightingShadersDiagram>
 *
 * Phong 与 Blinn-Phong 光照模型
 */

export function ShpLightingShadersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Phong 与 Blinn-Phong 光照模型" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">光照着色器</text>

          <rect x="30" y="55" width="200" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Ambient 环境光</text>
          <text x="130" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">模拟间接照明</text>
          <text x="130" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ambient = ka * ambientColor</text>

          <rect x="260" y="55" width="200" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">Diffuse 漫反射</text>
          <text x="360" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">max(dot(N, L), 0)</text>
          <text x="360" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">粗糙表面散射</text>

          <rect x="490" y="55" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">Specular 镜面反射</text>
          <text x="590" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">pow(max(dot(R,V),0), sh)</text>
          <text x="590" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">光滑表面高光</text>

          <rect x="30" y="155" width="660" height="40" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">最终颜色 = Ambient + Diffuse + Specular</text>

          <rect x="30" y="215" width="310" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="185" y="235" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Phong</text>
          <text x="185" y="255" textAnchor="middle" fontSize="10" fill="var(--text-primary)">R = reflect(-L, N)</text>
          <text x="185" y="272" textAnchor="middle" fontSize="10" fill="var(--text-primary)">spec = pow(dot(R, V), shininess)</text>
          <text x="185" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用 reflect 计算反射向量</text>

          <rect x="380" y="215" width="310" height="90" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="535" y="235" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Blinn-Phong</text>
          <text x="535" y="255" textAnchor="middle" fontSize="10" fill="var(--text-primary)">H = normalize(L + V)</text>
          <text x="535" y="272" textAnchor="middle" fontSize="10" fill="var(--text-primary)">spec = pow(dot(N, H), shininess)</text>
          <text x="535" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用半角向量，省去 reflect</text>

          <text x="360" y="345" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">法线必须归一化: normalize(N) — 插值后长度会变化</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">多光源: 循环遍历光源数组，逐光源累加 Diffuse + Specular</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Phong 与 Blinn-Phong 光照模型</figcaption>
    </figure>
  );
}
