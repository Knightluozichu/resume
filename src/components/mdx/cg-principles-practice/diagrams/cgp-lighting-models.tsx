/**
 * <CgpLightingModelsDiagram>：光照模型与着色图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CgpLightingModelsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="光照模型与着色图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            光照模型与着色
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Flat / Gouraud / Phong 三种着色频率
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Flat */}
          <rect x="60" y="110" width="180" height="140" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Flat 着色</text>
          <text x="150" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">逐面计算</text>
          <text x="150" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每个三角形一个颜色</text>
          <text x="150" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">法线 = 面法线</text>
          <text x="150" y="218" textAnchor="middle" fontSize="10" fill="var(--text-primary)">最快但最粗糙</text>
          <text x="150" y="238" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">适合Low-poly风格</text>

          {/* Gouraud */}
          <rect x="260" y="110" width="180" height="140" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Gouraud 着色</text>
          <text x="350" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">逐顶点计算</text>
          <text x="350" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">顶点处算光照</text>
          <text x="350" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">颜色在面内插值</text>
          <text x="350" y="218" textAnchor="middle" fontSize="10" fill="var(--text-primary)">高光可能丢失</text>
          <text x="350" y="238" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">性能与质量折中</text>

          {/* Phong shading */}
          <rect x="460" y="110" width="200" height="140" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Phong 着色</text>
          <text x="560" y="156" textAnchor="middle" fontSize="10" fill="var(--text-primary)">逐像素计算</text>
          <text x="560" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">法线在面内插值</text>
          <text x="560" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每像素算光照</text>
          <text x="560" y="218" textAnchor="middle" fontSize="10" fill="var(--text-primary)">高光锐利准确</text>
          <text x="560" y="238" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GPU标准方案</text>

          {/* Comparison */}
          <rect x="60" y="280" width="600" height="60" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="304" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">着色频率 = 光照计算的粒度</text>
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Flat(面) &lt; Gouraud(顶点) &lt; Phong(像素)：质量递增，性能递减</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        光照模型与着色——Flat/Gouraud/Phong三种着色频率对比
      </figcaption>
    </figure>
  );
}
