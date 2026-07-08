/**
 * <RtwMetalDielectricDiagram>：金属反射与电介质折射
 * 纯静态 SVG，无交互。Server Component。
 */
export function RtwMetalDielectricDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="金属反射与电介质折射对比" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">金属反射 vs 电介质折射</text>

          {/* 左：金属 */}
          <line x1="40" y1="280" x2="320" y2="280" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <text x="180" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">金属（reflect + fuzz）</text>
          <line x1="180" y1="280" x2="180" y2="170" stroke="var(--text-secondary)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="186" y="166" fontSize="10" fill="var(--text-secondary)">N</text>
          {/* 入射 */}
          <line x1="70" y1="160" x2="180" y2="280" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#mdArrow)" />
          {/* 反射 */}
          <line x1="180" y1="280" x2="290" y2="160" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#mdArrow)" />
          <text x="64" y="156" fontSize="10" fill="var(--accent)">入射 d</text>
          <text x="288" y="156" fontSize="10" fill="var(--accent)">反射 r=d−2(d·N)N</text>
          {/* fuzz 扰动箭头 */}
          <line x1="180" y1="280" x2="270" y2="180" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="180" y1="280" x2="300" y2="190" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="244" y="200" fontSize="9.5" fill="var(--text-secondary)">+fuzz</text>

          {/* 右：电介质（球） */}
          <circle cx="540" cy="210" r="70" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="540" y="214" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">电介质球</text>
          <line x1="540" y1="210" x2="540" y2="120" stroke="var(--text-secondary)" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* 入射 */}
          <line x1="430" y1="120" x2="540" y2="210" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#mdArrow)" />
          <text x="410" y="116" fontSize="10" fill="var(--accent)">入射</text>
          {/* 折射（穿出） */}
          <line x1="540" y1="210" x2="650" y2="280" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#mdArrow)" />
          <text x="640" y="296" fontSize="10" fill="var(--accent)">折射</text>
          {/* 反射分支（虚线） */}
          <line x1="540" y1="210" x2="620" y2="130" stroke="var(--accent)" strokeWidth="1.1" strokeDasharray="4 3" />
          <text x="624" y="128" fontSize="10" fill="var(--text-secondary)">反射(Schlick)</text>
          <text x="372" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ηi·sinθi=ηt·sinθt</text>

          {/* 底部说明 */}
          <rect x="40" y="330" width="640" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="352" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">金属：r=d−2(d·N)N + fuzz ·  电介质：Snell 折射，sinθ_t&gt;1 时全内反射</text>
          <text x="360" y="372" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">Schlick: R=R0+(1−R0)(1−cosθ)^5，按概率在反射/折射间蒙特卡洛抽样</text>

          <defs>
            <marker id="mdArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">金属做镜面反射加模糊，电介质按 Snell 折射并按 Schlick 概率选反射或折射</figcaption>
    </figure>
  );
}
