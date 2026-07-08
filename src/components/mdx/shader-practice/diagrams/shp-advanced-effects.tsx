/**
 * <ShpAdvancedEffectsDiagram>
 *
 * 高级特效: SSR / 体积雾 / 水面 / 程序化纹理
 */

export function ShpAdvancedEffectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="高级特效实现" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">高级特效实现</text>

          <rect x="30" y="55" width="155" height="95" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">屏幕空间反射 SSR</text>
          <text x="107" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">从像素出发</text>
          <text x="107" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">沿反射方向步进</text>
          <text x="107" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">采样深度判断相交</text>
          <text x="107" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">无法反射屏外物体</text>

          <rect x="200" y="55" width="155" height="95" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">体积雾</text>
          <text x="277" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">射线步进</text>
          <text x="277" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">采样密度函数</text>
          <text x="277" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">Beer-Lambert 透射</text>
          <text x="277" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">降分辨率优化</text>

          <rect x="370" y="55" width="155" height="95" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">水面扰动</text>
          <text x="447" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">Gerstner 波位移</text>
          <text x="447" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">Fresnel 反射/折射</text>
          <text x="447" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">法线贴图流动</text>
          <text x="447" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">泡沫噪声叠加</text>

          <rect x="540" y="55" width="150" height="95" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">程序化纹理</text>
          <text x="615" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">Perlin/Simplex 噪声</text>
          <text x="615" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">FBM 多层叠加</text>
          <text x="615" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">噪声映射颜色</text>
          <text x="615" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">预烘焙提升性能</text>

          <rect x="48" y="175" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="195" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">SSR 射线步进: pos += dir * step; depth = sampleDepth(pos);</text>
          <text x="360" y="213" textAnchor="middle" fontSize="11" fill="var(--text-primary)">if (pos.z - depth < threshold) hit! → 采样该处颜色为反射色</text>

          <rect x="48" y="250" width="624" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="270" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Fresnel: fresnel = pow(1 - dot(N, V), 5)</text>
          <text x="360" y="288" textAnchor="middle" fontSize="11" fill="var(--text-primary)">color = lerp(refractionColor, reflectionColor, fresnel)</text>

          <text x="360" y="345" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">高级特效 = 基础技术组合: 噪声 + 射线步进 + Fresnel + 后处理</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">先用低质量版本验证效果，再逐步提升精度和优化性能</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">高级特效实现</figcaption>
    </figure>
  );
}
