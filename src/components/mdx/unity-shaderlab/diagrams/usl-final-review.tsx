/**
 * <UslFinalReviewDiagram>
 *
 * Unity ShaderLab 开发实战全书知识总图
 */

export function UslFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity ShaderLab 开发实战全书知识总图" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity ShaderLab 知识总图</text>

          <rect x="280" y="50" width="160" height="36" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">ShaderLab 结构</text>

          <line x1="360" y1="86" x2="160" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="360" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="86" x2="560" y2="110" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="80" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Properties + Pass</text>

          <rect x="280" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">表面着色器 + 光照</text>

          <rect x="480" y="110" width="160" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="560" y="133" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">GrabPass + CmdBuf</text>

          <line x1="160" y1="146" x2="160" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="146" x2="360" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="560" y1="146" x2="560" y2="170" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="80" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="160" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">变体管理</text>

          <rect x="280" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">高级技巧</text>

          <rect x="480" y="170" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">多平台适配</text>

          <line x1="160" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="360" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="560" y1="206" x2="360" y2="230" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="240" y="230" width="240" height="36" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="360" y="253" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">综合实战能力</text>

          <rect x="48" y="290" width="624" height="64" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="310" textAnchor="middle" fontSize="11" fill="var(--text-primary)">数据流: Properties → SubShader → Pass → 光照模型 → 混合 → 输出</text>
          <text x="360" y="328" textAnchor="middle" fontSize="11" fill="var(--text-primary)">优化链: 减少 Pass → 控制变体 → LOD 分级 → 合并纹理 → half 精度</text>
          <text x="360" y="346" textAnchor="middle" fontSize="11" fill="var(--text-primary)">特效: 溶解(噪声+clip) + 描边(多Pass) + 护盾(Fresnel+GrabPass)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Unity ShaderLab 开发实战全书知识总图</figcaption>
    </figure>
  );
}
