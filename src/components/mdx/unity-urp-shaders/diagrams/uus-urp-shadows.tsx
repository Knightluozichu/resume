/**
 * <UusUrpShadowsDiagram>：URP 阴影实现图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusUrpShadowsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="URP 阴影实现图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            URP 阴影系统
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            主光阴影 + 附加光阴影 → 阴影贴图采样
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="180" height="110" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">主光阴影</text>
          <text x="150" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Directional Shadow</text>
          <text x="150" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">级联阴影（CSM）：</text>
          <text x="150" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">最多 4 级 Cascade</text>
          <text x="150" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">近处高精度，远处低精度</text>

          <rect x="270" y="100" width="180" height="110" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">附加光阴影</text>
          <text x="360" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Point / Spot Shadow</text>
          <text x="360" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">Cube Shadow Map：</text>
          <text x="360" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">6 面立方体贴图</text>
          <text x="360" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">受上限限制</text>

          <rect x="480" y="100" width="160" height="110" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">阴影处理</text>
          <text x="560" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Soft Shadow</text>
          <text x="560" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">PCF 采样：</text>
          <text x="560" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">2x2 / 3x3 / 5x5</text>
          <text x="560" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">PCSS（可选）</text>

          <text x="245" y="158" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">+</text>
          <text x="455" y="158" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="60" y="240" width="600" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">阴影渲染流程</text>
          <text x={VIEW_W / 2} y="284" textAnchor="middle" fontSize="11" fill="var(--text-primary)">1. 渲染 Shadow Map（从光源视角，仅深度）</text>
          <text x={VIEW_W / 2} y="302" textAnchor="middle" fontSize="11" fill="var(--text-primary)">2. 主着色 Pass 中采样 Shadow Map，比较深度</text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">3. Shadow Bias：Depth Bias + Normal Bias 消除 Shadow Acne</text>
          <text x={VIEW_W / 2} y="336" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">性能：阴影分辨率 / 级联数 / 柔化核大小 是三大开销因子</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        URP 阴影系统——级联主光阴影与附加光阴影经 Shadow Map 采样合成
      </figcaption>
    </figure>
  );
}
