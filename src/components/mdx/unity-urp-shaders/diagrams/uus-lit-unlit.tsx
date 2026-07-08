/**
 * <UusLitUnlitDiagram>：Lit 与 Unlit Shader 图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusLitUnlitDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lit 与 Unlit Shader 图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Lit 与 Unlit Shader 对比
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Lit = PBR 光照响应 | Unlit = 无光照直通颜色
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Lit side */}
          <rect x="60" y="100" width="290" height="240" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Lit（受光）</text>
          <text x="205" y="148" textAnchor="middle" fontSize="10" fill="var(--text-primary)">材质：BaseColor + Metallic + Smoothness</text>
          <text x="205" y="166" textAnchor="middle" fontSize="10" fill="var(--text-primary)">+ Normal + Emission + Occlusion</text>
          <text x="205" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">光照计算：</text>
          <text x="205" y="208" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Direct: Diffuse + Specular (BRDF)</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Indirect: GI / SH / Reflection Probe</text>
          <text x="205" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">光照模型：</text>
          <text x="205" y="268" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Physically Based (Cook-Torrance)</text>
          <text x="205" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">用途：3D 场景物体</text>
          <text x="205" y="312" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">角色 / 建筑 / 地形 / 道具</text>

          {/* Unlit side */}
          <rect x="370" y="100" width="290" height="240" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="515" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Unlit（无光照）</text>
          <text x="515" y="148" textAnchor="middle" fontSize="10" fill="var(--text-primary)">材质：BaseColor / Texture</text>
          <text x="515" y="166" textAnchor="middle" fontSize="10" fill="var(--text-primary)">+ 颜色直通输出</text>
          <text x="515" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">光照计算：</text>
          <text x="515" y="208" textAnchor="middle" fontSize="10" fill="var(--text-primary)">无（不参与光照管线）</text>
          <text x="515" y="226" textAnchor="middle" fontSize="10" fill="var(--text-primary)">颜色 = 纹理采样 / 固定色</text>
          <text x="515" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">光照模型：</text>
          <text x="515" y="268" textAnchor="middle" fontSize="10" fill="var(--text-primary)">无</text>
          <text x="515" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">用途：UI / 特效 / 调试</text>
          <text x="515" y="312" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">粒子 / UI / 全屏覆盖 / 预览</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lit 与 Unlit Shader 对比——Lit 走 PBR 光照管线，Unlit 直通输出颜色
      </figcaption>
    </figure>
  );
}
