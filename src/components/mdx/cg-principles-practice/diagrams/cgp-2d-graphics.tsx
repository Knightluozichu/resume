/**
 * <Cgp2dGraphicsDiagram>：2D图形与变换图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Cgp2dGraphicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="2D图形与变换图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            2D图形与变换
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            平移、旋转、缩放与齐次坐标
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Three transforms */}
          <rect x="60" y="110" width="180" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">平移 Translation</text>
          <text x="150" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">x' = x + tx</text>
          <text x="150" y="176" textAnchor="middle" fontSize="10" fill="var(--text-primary)">y' = y + ty</text>
          <text x="150" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">齐次坐标矩阵：</text>
          <text x="150" y="218" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">[1 0 tx | 0 1 ty | 0 0 1]</text>

          <rect x="260" y="110" width="180" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">旋转 Rotation</text>
          <text x="350" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">x' = x*cos - y*sin</text>
          <text x="350" y="176" textAnchor="middle" fontSize="10" fill="var(--text-primary)">y' = x*sin + y*cos</text>
          <text x="350" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绕原点旋转角度 theta</text>
          <text x="350" y="218" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">[cos -sin 0 | sin cos 0 | 0 0 1]</text>

          <rect x="460" y="110" width="200" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">缩放 Scaling</text>
          <text x="560" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">x' = sx * x</text>
          <text x="560" y="176" textAnchor="middle" fontSize="10" fill="var(--text-primary)">y' = sy * y</text>
          <text x="560" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">均匀缩放 sx=sy</text>
          <text x="560" y="218" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">[sx 0 0 | 0 sy 0 | 0 0 1]</text>

          {/* Homogeneous coords */}
          <rect x="60" y="270" width="600" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">齐次坐标：用3维向量表示2D点 [x, y, 1]</text>
          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-primary)">使所有仿射变换统一为矩阵乘法，可组合：M = M_n x ... x M_2 x M_1</text>
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">变换顺序：先变换的矩阵在右边（右乘），点左乘矩阵链</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        2D图形与变换——平移、旋转、缩放与齐次坐标矩阵
      </figcaption>
    </figure>
  );
}
