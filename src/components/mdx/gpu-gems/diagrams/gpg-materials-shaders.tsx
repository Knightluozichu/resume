/**
 * <GpgMaterialsShadersDiagram>：GPU Gems 材质与着色器图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgMaterialsShadersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="材质与着色器：BRDF 分量与材质参数映射"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            材质模型：BRDF 的三驾马车
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            漫反射 + 镜面反射 + 环境光 = 完整的表面外观
          </text>

          {/* 漫反射 */}
          <circle cx="120" cy="140" r="40" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          <text x="120" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">漫反射</text>
          <text x="120" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Lambert / Oren-Nayar</text>
          <text x="120" y="216" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">光线均匀散射</text>
          <text x="120" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">粗糙表面</text>

          {/* 镜面反射 */}
          <circle cx="360" cy="140" r="40" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="360" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">镜面反射</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Blinn-Phong / Cook-Torrance</text>
          <text x="360" y="216" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">光线镜面反弹</text>
          <text x="360" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">光滑表面</text>

          {/* 环境光 */}
          <circle cx="600" cy="140" r="40" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="600" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">环境光</text>
          <text x="600" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Cubemap / SH</text>
          <text x="600" y="216" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">间接光照近似</text>
          <text x="600" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">金属感来源</text>

          {/* 加号 */}
          <text x="240" y="148" textAnchor="middle" fontSize="24" fill="var(--text-tertiary)">+</text>
          <text x="480" y="148" textAnchor="middle" fontSize="24" fill="var(--text-tertiary)">+</text>

          {/* 材质参数表 */}
          <rect x="40" y="260" width="640" height="110" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="284" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">材质参数 → BRDF 输入</text>

          <text x="80" y="310" textAnchor="start" fontSize="11" fill="var(--text-primary)">albedo（反照率）</text>
          <text x="240" y="310" textAnchor="start" fontSize="10" fill="var(--text-secondary)">→ 漫反射颜色</text>
          <text x="80" y="332" textAnchor="start" fontSize="11" fill="var(--text-primary)">roughness（粗糙度）</text>
          <text x="240" y="332" textAnchor="start" fontSize="10" fill="var(--text-secondary)">→ 高光锐度/散射范围</text>
          <text x="420" y="310" textAnchor="start" fontSize="11" fill="var(--text-primary)">metalness（金属度）</text>
          <text x="560" y="310" textAnchor="start" fontSize="10" fill="var(--text-secondary)">→ 染色高光</text>
          <text x="420" y="332" textAnchor="start" fontSize="11" fill="var(--text-primary)">normal（法线贴图）</text>
          <text x="560" y="332" textAnchor="start" fontSize="10" fill="var(--text-secondary)">→ 微表面扰动</text>
          <text x={VIEW_W / 2} y="358" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">洞察：PBR 的本质是用物理参数（粗糙度/金属度）替代美术魔数</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BRDF 三分量与 PBR 材质参数的映射关系
      </figcaption>
    </figure>
  );
}
