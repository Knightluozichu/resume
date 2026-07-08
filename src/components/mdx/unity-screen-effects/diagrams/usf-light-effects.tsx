/**
 * <UsfLightEffectsDiagram>
 *
 * 光照特效: 体积光/镜头光晕/SSAO
 */

export function UsfLightEffectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="光照特效实现" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">光照特效</text>

          <rect x="30" y="55" width="155" height="95" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">体积光 God Rays</text>
          <text x="107" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">径向步进采样</text>
          <text x="107" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">累加亮度散射</text>
          <text x="107" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">距离衰减</text>
          <text x="107" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">降分辨率优化</text>

          <rect x="200" y="55" width="155" height="95" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">镜头光晕</text>
          <text x="277" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">光源→屏幕中心</text>
          <text x="277" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">反向生成光斑</text>
          <text x="277" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">星芒+衰减</text>
          <text x="277" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">Blend Add 叠加</text>

          <rect x="370" y="55" width="155" height="95" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">SSAO</text>
          <text x="447" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">随机半球采样</text>
          <text x="447" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">深度差比较</text>
          <text x="447" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">累加遮蔽值</text>
          <text x="447" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">双边滤波平滑</text>

          <rect x="540" y="55" width="150" height="95" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">镜头灰尘</text>
          <text x="615" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">Dirt 贴图</text>
          <text x="615" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">与 Bloom 相乘</text>
          <text x="615" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">散射光叠加</text>
          <text x="615" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">增加真实感</text>

          <rect x="48" y="175" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="195" textAnchor="middle" fontSize="11" fill="var(--text-primary)">God Rays: 从像素向光源径向步进，累加采样亮度</text>
          <text x="360" y="213" textAnchor="middle" fontSize="11" fill="var(--text-primary)">SSAO: 采样半球点深度比较 → 遮蔽因子 → 乘到环境光</text>

          <rect x="48" y="250" width="624" height="50" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="270" textAnchor="middle" fontSize="11" fill="var(--text-primary)">镜头光晕: 沿光源-中心反方向生成光斑，星芒+衰减</text>
          <text x="360" y="288" textAnchor="middle" fontSize="11" fill="var(--text-primary)">需光源在屏幕内，Blend Add 叠加到画面</text>

          <text x="360" y="345" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">光照特效 = 深度/法线纹理 + 屏幕空间采样 + 数学计算</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">SSAO 需要深度+法线纹理，降分辨率计算再上采样</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">光照特效实现</figcaption>
    </figure>
  );
}
