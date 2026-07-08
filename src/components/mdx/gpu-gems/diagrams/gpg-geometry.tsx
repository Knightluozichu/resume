/**
 * <GpgGeometryDiagram>：GPU Gems 几何体处理与细分图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgGeometryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="几何体处理与细分：LOD 与曲面细分策略"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            几何体处理：从低模到高模的自适应细分
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            距离越近 → 细分越多 → 细节越丰富
          </text>

          {/* 远 LOD */}
          <rect x="40" y="80" width="180" height="120" rx="10" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="130" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">远距离 LOD</text>
          <polygon points="80,180 130,120 180,180" fill="var(--text-tertiary)" fillOpacity="0.2" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="130" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">3 个三角形</text>

          {/* 中 LOD */}
          <rect x="250" y="80" width="180" height="120" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="340" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">中距离 LOD</text>
          <polygon points="290,180 315,120 340,180" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <polygon points="340,180 365,120 390,180" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="340" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">6 个三角形</text>

          {/* 近 LOD */}
          <rect x="460" y="80" width="220" height="120" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="570" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">近距离 LOD</text>
          <polygon points="500,180 515,120 530,180" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <polygon points="530,180 545,120 560,180" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <polygon points="560,180 575,120 590,180" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <polygon points="590,180 605,120 620,180" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <polygon points="620,180 635,120 650,180" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="570" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">20+ 个三角形</text>

          {/* 箭头 */}
          <text x="225" y="148" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="435" y="148" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 细分着色器 */}
          <rect x="40" y="230" width="640" height="140" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="256" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">曲面细分管线（Tessellation Shader）</text>

          <rect x="70" y="276" width="110" height="36" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="125" y="298" textAnchor="middle" fontSize="10" fill="var(--text-primary)">壳着色器 (HS)</text>

          <text x="188" y="298" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="210" y="276" width="110" height="36" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="265" y="298" textAnchor="middle" fontSize="10" fill="var(--text-primary)">细分器</text>

          <text x="328" y="298" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="350" y="276" width="110" height="36" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="405" y="298" textAnchor="middle" fontSize="10" fill="var(--text-primary)">域着色器 (DS)</text>

          <text x="468" y="298" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="490" y="276" width="110" height="36" rx="6" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="545" y="298" textAnchor="middle" fontSize="10" fill="var(--text-primary)">顶点/像素</text>

          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-primary)">壳着色器决定细分因子 → 细分器生成新顶点 → 域着色器计算位置</text>
          <text x={VIEW_W / 2} y="358" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">洞察：GPU 端自适应细分，让近处模型平滑、远处模型省三角形</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LOD 策略与曲面细分管线
      </figcaption>
    </figure>
  );
}
