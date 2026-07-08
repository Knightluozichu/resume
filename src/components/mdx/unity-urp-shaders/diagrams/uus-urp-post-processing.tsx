/**
 * <UusUrpPostProcessingDiagram>：URP 后处理栈图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusUrpPostProcessingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="URP 后处理栈图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            URP 后处理栈（Volume 系统）
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            渲染目标 → 后处理链 → 最终输出
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="120" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="126" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">场景渲染</text>
          <text x="120" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Camera Color RT</text>

          <text x="190" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="210" y="100" width="110" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="265" y="126" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Bloom</text>
          <text x="265" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">泛光</text>

          <text x="330" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="350" y="100" width="110" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="405" y="126" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Color Adjust</text>
          <text x="405" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">调色</text>

          <text x="470" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="490" y="100" width="110" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="126" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Tone Map</text>
          <text x="545" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">色调映射</text>

          <text x="610" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="630" y="100" width="50" height="60" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="655" y="134" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">输出</text>

          <rect x="60" y="190" width="600" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Volume 系统（Volume Framework）</text>
          <text x={VIEW_W / 2} y="232" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Global Volume + Local Volume → 权重混合 → 按优先级插值效果参数</text>
          <text x={VIEW_W / 2} y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Volume Profile → Volume Component（Bloom/DepthOfField/...）→ Override</text>

          <rect x="60" y="280" width="290" height="70" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="205" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Before Rendering（渲染前）</text>
          <text x="205" y="320" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Depth of Field / Motion Blur</text>
          <text x="205" y="336" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">注入点：BeforeRenderingPostProcessing</text>

          <rect x="370" y="280" width="290" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="515" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">After Rendering（渲染后）</text>
          <text x="515" y="320" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Bloom / Color Adjust / Tone Map / Vignette</text>
          <text x="515" y="336" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">注入点：AfterRendering</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        URP 后处理栈——Volume 系统按注入点组织后处理效果链
      </figcaption>
    </figure>
  );
}
