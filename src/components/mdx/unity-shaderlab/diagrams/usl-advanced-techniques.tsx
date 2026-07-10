/**
 * <UslAdvancedTechniquesDiagram>
 *
 * 高级 ShaderLab 技巧
 */

export function UslAdvancedTechniquesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="高级 ShaderLab 技巧" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`高级 ShaderLab 技巧`}</text>

          <rect x="30" y="55" width="155" height="95" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">{`变体管理`}</text>
          <text x="107" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`shader_feature`}</text>
          <text x="107" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`multi_compile`}</text>
          <text x="107" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`Variant Collection`}</text>
          <text x="107" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">{`控制编译量`}</text>

          <rect x="200" y="55" width="155" height="95" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">{`溶解效果`}</text>
          <text x="277" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`噪声纹理阈值`}</text>
          <text x="277" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`clip 丢弃`}</text>
          <text x="277" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`smoothstep 燃烧边`}</text>
          <text x="277" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">{`渐变动画`}</text>

          <rect x="370" y="55" width="155" height="95" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">{`能量护盾`}</text>
          <text x="447" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`Fresnel 边缘发光`}</text>
          <text x="447" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`噪声能量流动`}</text>
          <text x="447" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`GrabPass 折射`}</text>
          <text x="447" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">{`Blend Add`}</text>

          <rect x="540" y="55" width="150" height="95" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">{`变体优化`}</text>
          <text x="615" y="95" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`skip_variants`}</text>
          <text x="615" y="110" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`合并关键词`}</text>
          <text x="615" y="125" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{`Addressables`}</text>
          <text x="615" y="140" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">{`按需加载`}</text>

          <rect x="48" y="175" width="624" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="195" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{`shader_feature vs multi_compile`}</text>
          <text x="360" y="213" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{`feature: 按需编译 | compile: 全部编译`}</text>

          <rect x="48" y="250" width="624" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="270" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{`溶解: noise(uv) < amount ? clip : 燃烧边缘色`}</text>
          <text x="360" y="288" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{`护盾: fresnel * noise * pulse + grabPass 拓扑`}</text>

          <text x="360" y="345" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">{`高级技巧 = 基础技术组合: 噪声 + Fresnel + clip + 变体管理`}</text>
          <text x="360" y="365" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">{`变体优化: 分析 build 报告，skip_variants 去除未使用组合`}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">高级 ShaderLab 技巧</figcaption>
    </figure>
  );
}
