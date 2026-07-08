/**
 * <Cgp3dGraphicsDiagram>：3D图形与投影图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Cgp3dGraphicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="3D图形与投影图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            3D图形与投影
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            透视投影与正交投影的数学原理
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Perspective */}
          <rect x="60" y="110" width="280" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="200" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">透视投影</text>
          <text x="200" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">近大远小</text>
          <text x="200" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">x' = x * n / (n - z)</text>
          <text x="200" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">y' = y * n / (n - z)</text>
          <text x="200" y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">FOV + 宽高比 → 透视矩阵</text>
          <text x="200" y="230" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">模拟人眼/相机视角</text>

          {/* Orthographic */}
          <rect x="360" y="110" width="280" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="500" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">正交投影</text>
          <text x="500" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">无近大远小</text>
          <text x="500" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">x' = (x - l) / (r - l) * 2 - 1</text>
          <text x="500" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">y' = (y - b) / (t - b) * 2 - 1</text>
          <text x="500" y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">平行线保持平行</text>
          <text x="500" y="230" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">适合CAD/2D游戏/俯视图</text>

          {/* Comparison */}
          <rect x="60" y="270" width="600" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">核心差异：透视投影的w分量 = -z（携带深度信息）</text>
          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-primary)">透视除法：x/w, y/w, z/w → 归一化设备坐标(NDC)</text>
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">正交投影w恒为1，不做除法，所以无透视形变</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        3D图形与投影——透视投影与正交投影的数学原理对比
      </figcaption>
    </figure>
  );
}
