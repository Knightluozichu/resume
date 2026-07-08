/**
 * <RtrShadowsDiagram>：实时阴影技术图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrShadowsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实时阴影技术图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            实时阴影技术
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            阴影映射、PCF滤波与级联阴影
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Shadow Map pipeline */}
          <rect x="60" y="105" width="200" height="100" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">1. 深度Pass</text>
          <text x="160" y="148" textAnchor="middle" fontSize="10" fill="var(--text-primary)">从光源视角渲染</text>
          <text x="160" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">只写深度不写颜色</text>
          <text x="160" y="186" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">输出 Shadow Map</text>

          <text x="275" y="155" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="290" y="105" width="200" height="100" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="390" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">2. 深度比较</text>
          <text x="390" y="148" textAnchor="middle" fontSize="10" fill="var(--text-primary)">片段到光源距离</text>
          <text x="390" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">vs Shadow Map 深度</text>
          <text x="390" y="186" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">大于 = 在阴影中</text>

          <text x="505" y="155" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="520" y="105" width="140" height="100" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">3. 滤波</text>
          <text x="590" y="148" textAnchor="middle" fontSize="10" fill="var(--text-primary)">PCF 软阴影</text>
          <text x="590" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">采样多点平均</text>
          <text x="590" y="186" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">边缘平滑</text>

          {/* Techniques */}
          <rect x="60" y="230" width="180" height="60" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">CSM 级联阴影</text>
          <text x="150" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">近处高精度远处低精度</text>

          <rect x="260" y="230" width="180" height="60" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="350" y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">VSM 方差阴影</text>
          <text x="350" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">存深度+深度²，可双线性滤波</text>

          <rect x="460" y="230" width="200" height="60" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="560" y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">面光源软阴影</text>
          <text x="560" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PCSS 尺寸随距离变化</text>

          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            核心权衡：精度 vs 覆盖范围 vs 性能
          </text>
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Shadow Acne（自阴影）需偏移，Peter-panning（悬浮）偏移过大
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时阴影技术——阴影映射三步流程与优化方案
      </figcaption>
    </figure>
  );
}
