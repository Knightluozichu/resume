/**
 * <SxxEnvironmentDiagram>：环境效果渲染图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxEnvironmentDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="环境效果渲染图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            环境效果渲染
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            天空、大气、水面与雾效的环境着色
          </text>

          {/* 天空盒 */}
          <rect x="40" y="80" width="200" height="140" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">天空盒 Skybox</text>
          <text x="140" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">立方体贴图包围场景</text>
          <text x="140" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">6面纹理无缝拼接</text>
          <text x="140" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">静态天空 / 程序化天空</text>
          <text x="140" y="186" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">采样方向 = 视线方向</text>
          <text x="140" y="204" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">float3 skyColor = texCUBE(skybox, dir)</text>

          {/* 大气散射 */}
          <rect x="260" y="80" width="200" height="140" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">大气散射 Atmosphere</text>
          <text x="360" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Rayleigh 散射（蓝色）</text>
          <text x="360" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Mie 散射（光晕）</text>
          <text x="360" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">日出日落色彩变化</text>
          <text x="360" y="186" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">散射强度 ∝ 1/λ^4</text>
          <text x="360" y="204" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">波长短（蓝）散射更强</text>

          {/* 水面 */}
          <rect x="480" y="80" width="200" height="140" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">水面 Water</text>
          <text x="580" y="126" textAnchor="middle" fontSize="10" fill="var(--text-primary)">反射 + 折射 + 菲涅尔</text>
          <text x="580" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">法线扰动模拟波浪</text>
          <text x="580" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">深度梯度控制透明度</text>
          <text x="580" y="186" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Fresnel: pow(1-N·V, 5)</text>
          <text x="580" y="204" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">掠射角反射增强</text>

          {/* 雾效 */}
          <rect x="120" y="250" width="480" height="110" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="274" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">雾效 Fog</text>
          <text x="200" y="300" textAnchor="middle" fontSize="11" fill="var(--text-primary)">线性雾</text>
          <text x="200" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">f = (end-d)/(end-start)</text>
          <text x="360" y="300" textAnchor="middle" fontSize="11" fill="var(--text-primary)">指数雾</text>
          <text x="360" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">f = exp(-d * density)</text>
          <text x="520" y="300" textAnchor="middle" fontSize="11" fill="var(--text-primary)">指数平方雾</text>
          <text x="520" y="318" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">f = exp(-(d*density)^2)</text>
          <text x="360" y="344" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最终颜色 = lerp(fogColor, surfaceColor, f)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        环境效果渲染——天空盒、大气散射、水面与雾效的着色模型
      </figcaption>
    </figure>
  );
}
