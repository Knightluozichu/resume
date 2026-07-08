/**
 * <RtrTexturingDiagram>：纹理与采样技术图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrTexturingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="纹理与采样技术图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            纹理与采样技术
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            纹理映射、过滤模式与Mipmap链
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* UV mapping */}
          <rect x="60" y="110" width="160" height="120" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">UV映射</text>
          <text x="140" y="154" textAnchor="middle" fontSize="10" fill="var(--text-primary)">2D纹理 → 3D表面</text>
          <text x="140" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">UV坐标 [0,1]²</text>
          <text x="140" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">unwrap展开</text>
          <text x="140" y="212" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">纹理坐标 = 几何属性</text>

          {/* Filtering */}
          <rect x="240" y="110" width="220" height="120" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">过滤模式</text>
          <text x="350" y="154" textAnchor="middle" fontSize="10" fill="var(--text-primary)">放大：最近邻 / 双线性</text>
          <text x="350" y="172" textAnchor="middle" fontSize="10" fill="var(--text-primary)">缩小：双线性 / 三线性</text>
          <text x="350" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">各向异性过滤（AF）</text>
          <text x="350" y="212" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">解决斜角采样模糊</text>

          {/* Mipmap */}
          <rect x="480" y="110" width="180" height="120" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="570" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">Mipmap</text>
          <text x="570" y="154" textAnchor="middle" fontSize="10" fill="var(--text-primary)">多级渐远纹理</text>
          <text x="570" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每级缩小一半</text>
          <text x="570" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按距离选择级别</text>
          <text x="570" y="212" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">内存 +33%，速度大幅提升</text>

          {/* Key concepts */}
          <rect x="60" y="260" width="600" height="80" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="284" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">纹理采样核心原则</text>
          <text x={VIEW_W / 2} y="306" textAnchor="middle" fontSize="11" fill="var(--text-primary)">1. 放大用双线性，缩小用Mipmap+三线性，斜面用各向异性</text>
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="11" fill="var(--text-primary)">2. 纹理压缩（BC/DXT/ETC）减少显存带宽，不影响视觉质量</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        纹理与采样技术——UV映射、过滤模式与Mipmap多级渐远
      </figcaption>
    </figure>
  );
}
