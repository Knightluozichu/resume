/**
 * <RtwCameraDiagram>：相机与光线生成
 *
 * 纯静态 SVG，无交互。Server Component（无 "use client"）。
 */

export function RtwCameraDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="相机与光线生成示意" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">相机起点 → 视口 → 场景光线</text>

          {/* 视口矩形（前移） */}
          <rect x="300" y="120" width="200" height="160" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="400" y="112" textAnchor="middle" fontSize="11" fill="var(--accent)">视口（图像平面）</text>
          {/* 视口四角 */}
          <circle cx="300" cy="120" r="3" fill="var(--text-secondary)" />
          <circle cx="500" cy="120" r="3" fill="var(--text-secondary)" />
          <circle cx="300" cy="280" r="3" fill="var(--text-primary)" />
          <text x="262" y="296" fontSize="11" fill="var(--text-secondary)">lower_left_corner</text>
          {/* horizontal / vertical 标注 */}
          <line x1="300" y1="300" x2="500" y2="300" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="400" y="314" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">horizontal</text>
          <line x1="284" y1="120" x2="284" y2="280" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="278" y="206" textAnchor="end" fontSize="11" fill="var(--text-secondary)">vertical</text>

          {/* 相机起点 */}
          <circle cx="120" cy="200" r="6" fill="var(--accent)" />
          <text x="120" y="226" textAnchor="middle" fontSize="11" fill="var(--text-primary)">O（相机起点）</text>

          {/* 三条光线穿过视口 */}
          <line x1="120" y1="200" x2="300" y2="280" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.85" />
          <line x1="120" y1="200" x2="400" y2="200" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.85" />
          <line x1="120" y1="200" x2="500" y2="120" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.85" />
          {/* 延伸进场景 */}
          <line x1="400" y1="200" x2="640" y2="200" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" strokeDasharray="5 4" />
          <line x1="500" y1="120" x2="660" y2="70" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" strokeDasharray="5 4" />
          <line x1="300" y1="280" x2="600" y2="360" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" strokeDasharray="5 4" />

          {/* 像素点 P_view */}
          <circle cx="400" cy="200" r="4" fill="var(--text-primary)" />
          <text x="408" y="194" fontSize="11" fill="var(--text-primary)">P_view(u,v)</text>

          {/* 公式条 */}
          <rect x="48" y="350" width="624" height="38" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="373" textAnchor="middle" fontSize="11" fill="var(--text-primary)">ray(O, lower_left_corner + u·horizontal + v·vertical − O)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">像素归一化为 (u,v)，在视口上定位后从相机起点连线即得发射光线</figcaption>
    </figure>
  );
}
