/**
 * <CgpRasterGraphicsDiagram>：光栅图形学基础图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CgpRasterGraphicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="光栅图形学基础图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            光栅图形学基础
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从直线到三角形——图元光栅化算法
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* DDA/Bresenham */}
          <rect x="60" y="110" width="180" height="120" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">直线光栅化</text>
          <text x="150" y="154" textAnchor="middle" fontSize="10" fill="var(--text-primary)">DDA算法</text>
          <text x="150" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Bresenham算法</text>
          <text x="150" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">中点画线法</text>
          <text x="150" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">整数运算，无浮点</text>

          {/* Triangle fill */}
          <rect x="260" y="110" width="180" height="120" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">三角形填充</text>
          <text x="350" y="154" textAnchor="middle" fontSize="10" fill="var(--text-primary)">扫描线填充</text>
          <text x="350" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">重心坐标判断</text>
          <text x="350" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">edge function</text>
          <text x="350" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GPU硬件实现</text>

          {/* Anti-aliasing */}
          <rect x="460" y="110" width="200" height="120" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">抗锯齿</text>
          <text x="560" y="154" textAnchor="middle" fontSize="10" fill="var(--text-primary)">超采样(SSAA)</text>
          <text x="560" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">多重采样(MSAA)</text>
          <text x="560" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">FXAA / TAA</text>
          <text x="560" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">边缘像素混合</text>

          {/* Key insight */}
          <rect x="60" y="260" width="600" height="80" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="284" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">光栅化核心思想</text>
          <text x={VIEW_W / 2} y="306" textAnchor="middle" fontSize="11" fill="var(--text-primary)">连续几何 → 离散像素：每个像素判断「是否被图元覆盖」</text>
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">锯齿是离散采样的必然产物，抗锯齿用「覆盖率」而非「是否」来决定像素颜色</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        光栅图形学基础——直线光栅化、三角形填充与抗锯齿
      </figcaption>
    </figure>
  );
}
