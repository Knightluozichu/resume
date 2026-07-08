/**
 * <RtwSphereHittableDiagram>：球体与可命中对象 / 命中记录与列表取最近
 * 纯静态 SVG，无交互。Server Component。
 */
export function RtwSphereHittableDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="命中记录与列表取最近交点" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">hittable_list：遍历物体，收紧 t_max 取最近交点</text>

          {/* 球 A（近） */}
          <circle cx="230" cy="210" r="62" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="230" y="214" textAnchor="middle" fontSize="11" fill="var(--text-primary)">球 A</text>
          {/* 球 B（远） */}
          <circle cx="500" cy="200" r="70" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="5 4" />
          <text x="500" y="204" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">球 B（更远）</text>

          {/* 射线 */}
          <line x1="60" y1="250" x2="660" y2="170" stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#shArrow)" />
          <circle cx="60" cy="250" r="4" fill="var(--accent)" />
          <text x="56" y="270" fontSize="11" fill="var(--text-primary)">O</text>

          {/* 近交点（选中） */}
          <circle cx="188" cy="234" r="5" fill="var(--text-primary)" />
          <text x="150" y="258" fontSize="10.5" fill="var(--text-primary)">最近交点 p (t 小)</text>
          {/* 近交点法线 */}
          <line x1="188" y1="234" x2="150" y2="200" stroke="var(--text-secondary)" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="118" y="196" fontSize="10.5" fill="var(--text-secondary)">normal n</text>

          {/* 远交点（被丢弃） */}
          <circle cx="438" cy="184" r="4" fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <text x="430" y="172" fontSize="10.5" fill="var(--text-secondary)">t 更大，丢弃</text>

          {/* hit_record 卡片 */}
          <rect x="40" y="312" width="300" height="74" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="190" y="332" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">hit_record</text>
          <text x="56" y="352" fontSize="10.5" fill="var(--text-secondary)">p（交点） · normal（法线）</text>
          <text x="56" y="368" fontSize="10.5" fill="var(--text-secondary)">t（参数） · front_face（正反面）</text>
          <text x="56" y="382" fontSize="10.5" fill="var(--text-secondary)">mat_ptr（材质指针）</text>

          {/* 流程 */}
          <rect x="370" y="312" width="310" height="74" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="525" y="332" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">列表遍历流程</text>
          <text x="386" y="352" fontSize="10.5" fill="var(--text-primary)">closest = t_max</text>
          <text x="386" y="368" fontSize="10.5" fill="var(--text-primary)">命中 → closest = t（收紧区间）</text>
          <text x="386" y="382" fontSize="10.5" fill="var(--text-primary)">最终 rec = 全局最近交点</text>

          <defs>
            <marker id="shArrow" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
              <path d="M0,0 L8,5 L0,10 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">列表遍历每个物体，用最近 t 不断收紧求交区间，留下全局最近交点</figcaption>
    </figure>
  );
}
