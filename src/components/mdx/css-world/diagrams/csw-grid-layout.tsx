/**
 * <CswGridLayoutDiagram>：Grid 布局与二维排版图解。
 * 展示行列轨道与网格单元定位。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function CswGridLayoutDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Grid 布局与二维排版图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Grid 布局：二维网格与单元定位
          </text>

          {/* Grid 容器 */}
          <rect x="60" y="50" width="440" height="260" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="76" y="68" fontSize="10" fill="var(--accent)">display:grid;</text>
          <text x="76" y="82" fontSize="9" fill="var(--text-secondary)">grid-template-columns: 1fr 2fr 1fr;</text>
          <text x="76" y="96" fontSize="9" fill="var(--text-secondary)">grid-template-rows: 60px 1fr 60px;</text>

          {/* 列轨道标签 */}
          <text x="160" y="112" textAnchor="middle" fontSize="9" fill="var(--success)">1fr</text>
          <text x="280" y="112" textAnchor="middle" fontSize="9" fill="var(--success)">2fr</text>
          <text x="400" y="112" textAnchor="middle" fontSize="9" fill="var(--success)">1fr</text>

          {/* 行轨道标签 */}
          <text x="48" y="150" textAnchor="middle" fontSize="9" fill="var(--warning)">60px</text>
          <text x="48" y="200" textAnchor="middle" fontSize="9" fill="var(--warning)">1fr</text>
          <text x="48" y="260" textAnchor="middle" fontSize="9" fill="var(--warning)">60px</text>

          {/* 网格线 */}
          <line x1="100" y1="120" x2="100" y2="300" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="220" y1="120" x2="220" y2="300" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="340" y1="120" x2="340" y2="300" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="460" y1="120" x2="460" y2="300" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />

          <line x1="100" y1="130" x2="460" y2="130" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="100" y1="190" x2="460" y2="190" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="100" y1="250" x2="460" y2="250" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="100" y1="300" x2="460" y2="300" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3 2" />

          {/* 网格单元 */}
          <rect x="106" y="134" width="110" height="52" rx="4" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="161" y="164" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">header</text>

          <rect x="226" y="134" width="110" height="52" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="281" y="164" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">nav</text>

          <rect x="106" y="194" width="230" height="52" rx="4" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="221" y="224" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">main（跨 2 列）</text>

          <rect x="346" y="194" width="110" height="52" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="401" y="224" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">aside</text>

          <rect x="106" y="254" width="350" height="42" rx="4" fill="var(--text-tertiary)" fillOpacity="0.18" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="281" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">footer（跨 3 列）</text>

          {/* 右侧：grid-area 定位语法 */}
          <rect x="520" y="50" width="180" height="260" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="610" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">网格线定位语法</text>

          <text x="535" y="98" fontSize="10" fontWeight="600" fill="var(--text-primary)">grid-column</text>
          <text x="535" y="116" fontSize="9" fill="var(--text-secondary)">1 / 3（起线 / 终线）</text>
          <text x="535" y="130" fontSize="9" fill="var(--text-tertiary)">跨第 1-2 列轨道</text>

          <text x="535" y="158" fontSize="10" fontWeight="600" fill="var(--text-primary)">grid-row</text>
          <text x="535" y="176" fontSize="9" fill="var(--text-secondary)">2 / 4（起线 / 终线）</text>
          <text x="535" y="190" fontSize="9" fill="var(--text-tertiary)">跨第 2-3 行轨道</text>

          <text x="535" y="218" fontSize="10" fontWeight="600" fill="var(--text-primary)">span 关键字</text>
          <text x="535" y="236" fontSize="9" fill="var(--text-secondary)">grid-column: span 2</text>
          <text x="535" y="250" fontSize="9" fill="var(--text-tertiary)">自动跨 2 列</text>

          <text x="535" y="278" fontSize="10" fontWeight="600" fill="var(--text-primary)">grid-area</text>
          <text x="535" y="296" fontSize="9" fill="var(--text-secondary)">row-start / col-start</text>
          <text x="535" y="308" fontSize="9" fill="var(--text-secondary)">/ row-end / col-end</text>

          {/* 底部：gap 与 fr 单位 */}
          <rect x="60" y="328" width="320" height="110" rx="8" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="220" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">fr 单位：按比例分配剩余空间</text>
          <text x="220" y="372" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">1fr 2fr 1fr → 1:2:1</text>
          <text x="220" y="390" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">容器 400px，gap 20px</text>
          <text x="220" y="406" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">可用 340px → 85 / 170 / 85</text>
          <text x="220" y="424" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">fr 在固定尺寸之后分配</text>

          <rect x="400" y="328" width="280" height="110" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="540" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">gap：行列间距</text>
          <text x="540" y="372" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">gap: 20px（行列同距）</text>
          <text x="540" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">row-gap / column-gap 分设</text>
          <text x="540" y="410" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">gap 不计入 fr 分配的剩余空间</text>
          <text x="540" y="426" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">替代旧的 grid-column-gap</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Grid 布局——行列轨道、fr 单位、grid-area 定位与 gap 间距
      </figcaption>
    </figure>
  );
}
