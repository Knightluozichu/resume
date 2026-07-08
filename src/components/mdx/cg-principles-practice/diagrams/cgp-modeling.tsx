/**
 * <CgpModelingDiagram>：建模与表示方法图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CgpModelingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="建模与表示方法图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            建模与表示方法
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            多边形网格、曲面与体素表示对比
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Polygon mesh */}
          <rect x="60" y="110" width="180" height="130" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">多边形网格</text>
          <text x="150" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">顶点 + 边 + 面</text>
          <text x="150" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">三角形/四边形</text>
          <text x="150" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GPU原生支持</text>
          <text x="150" y="214" textAnchor="middle" fontSize="10" fill="var(--text-primary)">简单高效</text>
          <text x="150" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">离散，细节需高面数</text>

          {/* Parametric surfaces */}
          <rect x="260" y="110" width="180" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">参数曲面</text>
          <text x="350" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Bezier / B-spline</text>
          <text x="350" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">NURBS</text>
          <text x="350" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">控制点控制形状</text>
          <text x="350" y="214" textAnchor="middle" fontSize="10" fill="var(--text-primary)">精确光滑曲面</text>
          <text x="350" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">需 tessellation 转网格</text>

          {/* Voxel / CSG */}
          <rect x="460" y="110" width="200" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="134" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">体素 / CSG</text>
          <text x="560" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">体素：3D规则网格</text>
          <text x="560" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CSG：布尔运算</text>
          <text x="560" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">并/交/差</text>
          <text x="560" y="214" textAnchor="middle" fontSize="10" fill="var(--text-primary)">体素适合体积数据</text>
          <text x="560" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">CSG适合CAD建模</text>

          {/* Subdivision */}
          <rect x="60" y="270" width="600" height="70" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">细分曲面：多边形网格 → 光滑曲面</text>
          <text x={VIEW_W / 2} y="316" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Catmull-Clark / Loop 细分：迭代细化网格，极限收敛到光滑曲面</text>
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">现代动画电影标配：低模控制 + 细分生成高模</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        建模与表示方法——多边形网格、参数曲面、体素与CSG对比
      </figcaption>
    </figure>
  );
}
