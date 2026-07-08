/**
 * <UsfAdvancedEffectsDiagram>
 *
 * 高级屏幕特效: SSR/运动模糊/色差/折射
 */

export function UsfAdvancedEffectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="高级屏幕特效" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">高级屏幕特效</text>

          <rect x="30" y="55" width="155" height="95" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">屏幕空间反射 SSR</text>
          <text x="107" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">射线步进</text>
          <text x="107" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">深度判断相交</text>
          <text x="107" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">采样交点颜色</text>
          <text x="107" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">无法反射屏外物体</text>

          <rect x="200" y="55" width="155" height="95" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">运动模糊</text>
          <text x="277" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">速度纹理</text>
          <text x="277" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">沿速度方向采样</text>
          <text x="277" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">累加平均</text>
          <text x="277" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">Object/Camera Motion</text>

          <rect x="370" y="55" width="155" height="95" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">色差</text>
          <text x="447" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">RGB 通道偏移</text>
          <text x="447" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">边缘偏移大</text>
          <text x="447" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">中心无色差</text>
          <text x="447" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">模拟镜头边缘</text>

          <rect x="540" y="55" width="150" height="95" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">屏幕折射</text>
          <text x="615" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">法线扰动 UV</text>
          <text x="615" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">采样不透明纹理</text>
          <text x="615" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">Fresnel 混合</text>
          <text x="615" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">GrabPass/Opaque Tex</text>

          <rect x="48" y="175" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="195" textAnchor="middle" fontSize="11" fill="var(--text-primary)">SSR: pos += reflectDir * step → 采样深度 → 判断命中 → 取颜色</text>
          <text x="360" y="213" textAnchor="middle" fontSize="11" fill="var(--text-primary)">运动模糊: 沿 Motion Vector 方向多次采样累加</text>

          <rect x="48" y="250" width="624" height="50" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="270" textAnchor="middle" fontSize="11" fill="var(--text-primary)">色差: 像素到中心距离 × 偏移系数 → R/G/B 分别采样</text>
          <text x="360" y="288" textAnchor="middle" fontSize="11" fill="var(--text-primary)">折射: 法线 × 强度 → UV 偏移 → 采样 Opaque Texture</text>

          <text x="360" y="345" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">高级特效 = 深度/法线/速度纹理 + 屏幕空间算法 + 多技术组合</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">先用低质量版本验证效果，再逐步提升精度和优化性能</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">高级屏幕特效</figcaption>
    </figure>
  );
}
