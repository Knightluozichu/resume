/**
 * <RtrGlobalIlluminationDiagram>：实时全局光照图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrGlobalIlluminationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实时全局光照技术图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            实时全局光照
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            直接光 + 间接光 = 全局光照
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Direct vs Indirect */}
          <rect x="60" y="105" width="280" height="110" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="200" y="128" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">直接光照</text>
          <text x="200" y="150" textAnchor="middle" fontSize="10" fill="var(--text-primary)">光源 → 表面 → 眼睛</text>
          <text x="200" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次弹射</text>
          <text x="200" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">BRDF 直接计算</text>
          <text x="200" y="204" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">实时，性能可控</text>

          <rect x="380" y="105" width="280" height="110" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="520" y="128" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">间接光照（GI）</text>
          <text x="520" y="150" textAnchor="middle" fontSize="10" fill="var(--text-primary)">光源 → 表面A → 表面B → 眼睛</text>
          <text x="520" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">多次弹射（颜色渗透）</text>
          <text x="520" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">计算量指数增长</text>
          <text x="520" y="204" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">需要近似方法</text>

          {/* GI Techniques */}
          <rect x="60" y="240" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="130" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">光探针</text>
          <text x="130" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Light Probe / SH</text>

          <rect x="215" y="240" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="285" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">体素追踪</text>
          <text x="285" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">VXGI / SDF</text>

          <rect x="370" y="240" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="440" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">屏幕空间</text>
          <text x="440" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SSAO / SSGI / SSR</text>

          <rect x="525" y="240" width="135" height="50" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="592" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">光线追踪</text>
          <text x="592" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">RTX / DDGI</text>

          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            趋势：从预计算（Lightmap）到实时（RTX硬件追踪）
          </text>
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            AO（环境光遮蔽）是GI的简化形式，只计算遮蔽不计算颜色
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时全局光照——直接光与间接光的近似方案
      </figcaption>
    </figure>
  );
}
