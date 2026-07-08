/**
 * <RtwDiffuseDiagram>：漫反射与兰伯特模型
 * 纯静态 SVG，无交互。Server Component。
 */
export function RtwDiffuseDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="漫反射散射方向与兰伯特余弦律" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">漫反射：散射方向 = N + 随机单位向量</text>

          {/* 表面 */}
          <line x1="40" y1="280" x2="680" y2="280" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <text x="660" y="298" fontSize="10.5" fill="var(--text-secondary)">表面</text>

          {/* 法线 */}
          <line x1="340" y1="280" x2="340" y2="170" stroke="var(--text-secondary)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="318" y="166" fontSize="11" fill="var(--text-secondary)">N（法线）</text>

          {/* 入射光（斜射） */}
          <line x1="150" y1="150" x2="340" y2="280" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#dfArrow)" />
          <text x="150" y="142" fontSize="10.5" fill="var(--accent)">入射光</text>
          {/* 夹角 θ */}
          <path d="M 320 200 A 30 30 0 0 1 332 232" fill="none" stroke="var(--text-secondary)" strokeWidth="1" />
          <text x="300" y="222" fontSize="10.5" fill="var(--text-secondary)">θ</text>

          {/* 交点 */}
          <circle cx="340" cy="280" r="4" fill="var(--text-primary)" />
          <text x="346" y="298" fontSize="10.5" fill="var(--text-primary)">p</text>

          {/* 随机单位向量 s（示意球面） */}
          <circle cx="340" cy="220" r="40" fill="none" stroke="var(--accent)" strokeWidth="0.9" strokeDasharray="3 3" strokeOpacity="0.5" />
          <line x1="340" y1="220" x2="372" y2="196" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.7" />
          <text x="376" y="194" fontSize="10" fill="var(--text-secondary)">s（随机）</text>

          {/* 散射方向 d=N+s（多条随机） */}
          <line x1="340" y1="280" x2="372" y2="196" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#dfArrow)" />
          <line x1="340" y1="280" x2="300" y2="200" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="340" y1="280" x2="410" y2="230" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="340" y1="280" x2="280" y2="240" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.6" />
          <text x="384" y="190" fontSize="10.5" fill="var(--accent)">d=N+s</text>

          {/* 右侧：伽马校正曲线对比 */}
          <rect x="470" y="120" width="210" height="150" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="575" y="138" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--text-primary)">伽马校正</text>
          <line x1="495" y1="250" x2="655" y2="250" stroke="var(--border)" strokeWidth="1" />
          <line x1="495" y1="250" x2="495" y2="150" stroke="var(--border)" strokeWidth="1" />
          <path d="M495 250 Q 560 250 655 150" fill="none" stroke="var(--text-secondary)" strokeWidth="1.4" strokeDasharray="4 3" />
          <path d="M495 250 Q 560 165 655 150" fill="none" stroke="var(--accent)" strokeWidth="1.8" />
          <text x="600" y="266" fontSize="9.5" fill="var(--text-secondary)">线性</text>
          <text x="648" y="148" fontSize="9.5" fill="var(--accent)">sqrt(γ=2)</text>

          <defs>
            <marker id="dfArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text x="360" y="372" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">散射方向天然偏向法线，分布 ∝ cosθ（兰伯特律）；输出前开平方校正亮度</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">N + 随机单位向量产生余弦加权散射，伽马校正还原感知亮度</figcaption>
    </figure>
  );
}
