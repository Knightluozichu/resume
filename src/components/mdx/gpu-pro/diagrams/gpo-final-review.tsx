/**
 * <GpoFinalReviewDiagram>：GPU Pro 总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpoFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="GPU Pro 总复习图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">GPU Pro 知识图谱总览</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">渲染技术 → 光照阴影 → 图像空间 → GPU计算 → 着色</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <circle cx={VIEW_W / 2} cy="200" r="55" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y="195" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">GPU Pro</text>
          <text x={VIEW_W / 2} y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">前沿渲染</text>

          <rect x="60" y="110" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">渲染技术</text>
          <text x="120" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Forward/Deferred</text>

          <rect x="60" y="175" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="120" y="197" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">光照阴影</text>
          <text x="120" y="213" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PBR/GI/PCSS</text>

          <rect x="60" y="240" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">图像空间</text>
          <text x="120" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SSAO/SSR</text>

          <rect x="540" y="110" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">GPU模拟</text>
          <text x="600" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">粒子/流体</text>

          <rect x="540" y="175" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="197" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">体积渲染</text>
          <text x="600" y="213" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Ray Marching</text>

          <rect x="540" y="240" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">高级着色</text>
          <text x="600" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SSS/各向异性</text>

          <line x1="180" y1="135" x2="305" y2="180" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="180" y1="200" x2="305" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="180" y1="265" x2="305" y2="220" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="540" y1="135" x2="415" y2="180" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="540" y1="200" x2="415" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="540" y1="265" x2="415" y2="220" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          <rect x="210" y="310" width="300" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="335" textAnchor="middle" fontSize="11" fill="var(--text-primary)">核心原则：论文工程化 + 视觉可信 + 性能可接受</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">GPU Pro 知识图谱总览——六大模块围绕前沿渲染展开</figcaption>
    </figure>
  );
}
