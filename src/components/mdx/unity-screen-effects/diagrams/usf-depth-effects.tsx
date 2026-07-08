/**
 * <UsfDepthEffectsDiagram>
 *
 * 深度纹理特效: 获取与使用
 */

export function UsfDepthEffectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="深度纹理特效获取与使用" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">深度纹理特效</text>

          <rect x="30" y="55" width="155" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">获取深度纹理</text>
          <text x="107" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Camera.depthTextureMode</text>
          <text x="107" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">= Depth / DepthNormals</text>
          <text x="107" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">_CameraDepthTexture</text>

          <rect x="200" y="55" width="155" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">深度值转换</text>
          <text x="277" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Linear01Depth(z)</text>
          <text x="277" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">→ 0~1 线性深度</text>
          <text x="277" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LinearEyeDepth → 观察空间</text>

          <rect x="370" y="55" width="155" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">景深 DOF</text>
          <text x="447" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">焦点距离+范围</text>
          <text x="447" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">焦外区域模糊</text>
          <text x="447" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">近焦/远焦分别处理</text>

          <rect x="540" y="55" width="150" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">屏幕空间雾</text>
          <text x="615" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">exp(-d * density)</text>
          <text x="615" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">雾色 × 密度混合</text>
          <text x="615" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">比顶点雾更精确</text>

          <rect x="30" y="155" width="660" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="175" textAnchor="middle" fontSize="11" fill="var(--text-primary)">深度纹理存储裁剪空间 z 值（非线性），远处变化很小</text>
          <text x="360" y="193" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">必须用 Linear01Depth 转换为线性深度才能正确比较</text>

          <rect x="48" y="225" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="245" textAnchor="middle" fontSize="11" fill="var(--text-primary)">DOF: 深度 → 焦点距离比较 → 模糊权重 → 模糊混合</text>
          <text x="360" y="263" textAnchor="middle" fontSize="11" fill="var(--text-primary)">雾效: LinearEyeDepth → 距离 → 指数衰减 → 颜色混合</text>

          <text x="360" y="315" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">深度纹理是屏幕特效的核心数据源，使全屏着色器能感知 3D 深度</text>
          <text x="360" y="335" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">深度+法线纹理可做 SSAO、边缘检测、折射等高级效果</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">深度纹理特效获取与使用</figcaption>
    </figure>
  );
}
