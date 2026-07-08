/**
 * <RtrTransformsDiagram>：几何变换与空间图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrTransformsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="几何变换与坐标空间图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            几何变换与空间
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从模型空间到屏幕空间的坐标变换链
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Space chain */}
          <rect x="55" y="110" width="110" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="110" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">模型空间</text>
          <text x="110" y="150" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">局部坐标</text>

          <text x="175" y="142" textAnchor="middle" fontSize="12" fill="var(--accent)">Model</text>
          <text x="175" y="156" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">矩阵</text>
          <text x="185" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="200" y="110" width="110" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="255" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">世界空间</text>
          <text x="255" y="150" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">全局坐标</text>

          <text x="320" y="142" textAnchor="middle" fontSize="12" fill="var(--accent)">View</text>
          <text x="320" y="156" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">矩阵</text>
          <text x="330" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="345" y="110" width="110" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="400" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">观察空间</text>
          <text x="400" y="150" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">相机坐标</text>

          <text x="465" y="142" textAnchor="middle" fontSize="11" fill="var(--accent)">Projection</text>
          <text x="465" y="156" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">矩阵</text>
          <text x="480" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="495" y="110" width="110" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="550" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">裁剪空间</text>
          <text x="550" y="150" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">NDC</text>

          {/* Transform types */}
          <rect x="55" y="200" width="290" height="100" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="222" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">仿射变换</text>
          <text x="200" y="244" textAnchor="middle" fontSize="10" fill="var(--text-primary)">平移 + 旋转 + 缩放</text>
          <text x="200" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">保留平行线和比例关系</text>
          <text x="200" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用 4x4 齐次矩阵表示</text>

          <rect x="375" y="200" width="290" height="100" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" />
          <text x="520" y="222" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">投影变换</text>
          <text x="520" y="244" textAnchor="middle" fontSize="10" fill="var(--text-primary)">透视投影 / 正交投影</text>
          <text x="520" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">透视：近大远小（FOV）</text>
          <text x="520" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">正交：无透视形变</text>

          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键：MVP = Model × View × Projection，顶点逐级左乘矩阵变换空间
          </text>
          <text x={VIEW_W / 2} y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            透视除法（w除法）将裁剪空间→NDC，再映射到屏幕坐标
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        几何变换与空间——从模型空间到裁剪空间的坐标变换链
      </figcaption>
    </figure>
  );
}
