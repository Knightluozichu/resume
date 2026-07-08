/**
 * <RtwDefocusBlurDiagram>：散焦模糊与景深
 * 纯静态 SVG，无交互。Server Component。
 */
export function RtwDefocusBlurDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="散焦模糊与景深示意" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">薄透镜散焦：起点在光圈圆盘采样，方向锁向焦平面</text>

          {/* 光圈圆盘（相机） */}
          <ellipse cx="120" cy="200" rx="10" ry="46" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="120" y="262" textAnchor="middle" fontSize="10.5" fill="var(--accent)">光圈圆盘</text>
          {/* 三个起点 */}
          <circle cx="120" cy="170" r="3" fill="var(--text-primary)" />
          <circle cx="120" cy="200" r="3" fill="var(--text-primary)" />
          <circle cx="120" cy="230" r="3" fill="var(--text-primary)" />

          {/* 焦平面对焦点 */}
          <line x1="380" y1="120" x2="380" y2="280" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="4 3" />
          <circle cx="380" cy="200" r="5" fill="var(--text-primary)" />
          <text x="388" y="196" fontSize="10.5" fill="var(--text-primary)">对焦点 t（焦平面）</text>
          <text x="388" y="210" fontSize="10" fill="var(--text-secondary)">focus_dist</text>

          {/* 三条光线汇聚到对焦点 */}
          <line x1="120" y1="170" x2="380" y2="200" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="120" y1="200" x2="380" y2="200" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="120" y1="230" x2="380" y2="200" stroke="var(--accent)" strokeWidth="1.5" />

          {/* 焦平面物体（清晰） */}
          <circle cx="380" cy="330" r="20" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="380" y="370" textAnchor="middle" fontSize="10" fill="var(--accent)">对焦物体（清晰）</text>

          {/* 近处物体（模糊，光斑） */}
          <circle cx="250" cy="330" r="14" fill="var(--text-secondary)" fillOpacity="0.18" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="250" y="370" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">近（模糊）</text>

          {/* 远处物体（更模糊） */}
          <circle cx="560" cy="330" r="22" fill="var(--text-secondary)" fillOpacity="0.12" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="560" y="370" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">远（更模糊）</text>

          {/* 说明 */}
          <rect x="40" y="56" width="640" height="34" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="78" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">起点在圆盘随机采样 → 方向 = 对焦点 t − 起点；焦平面清晰，前后物体发散成光斑</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">光圈圆盘上随机起点都指向焦平面对焦点，焦平面清晰、前后模糊</figcaption>
    </figure>
  );
}
