/**
 * <RtwLearningMapDiagram>：Ray Tracing in One Weekend 全书学习地图
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function RtwLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Ray Tracing in One Weekend 全书学习地图" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Ray Tracing in One Weekend · 全书学习地图</text>
          <text x="360" y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">从一条射线到最终渲染：基础 → 几何 → 材质 → 收尾</text>

          {/* 阶段标题 */}
          <rect x="36" y="74" width="153" height="30" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="112.5" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">基础（3）</text>
          <rect x="216" y="74" width="153" height="30" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="292.5" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">几何与材质（4）</text>
          <rect x="396" y="74" width="153" height="30" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="472.5" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">进阶（3）</text>
          <rect x="576" y="74" width="108" height="30" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="630" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">复盘（1）</text>

          {/* 阶段一 章节卡片 */}
          {[
            { x: 36, y: 118, t: "1 学习地图" },
            { x: 36, y: 158, t: "2 射线与相交" },
            { x: 36, y: 198, t: "3 相机与光线" },
          ].map((c) => (
            <g key={c.t}>
              <rect x={c.x} y={c.y} width="153" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <circle cx={c.x + 12} cy={c.y + 16} r="3" fill="var(--accent)" />
              <text x={c.x + 80} y={c.y + 20} textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">{c.t}</text>
            </g>
          ))}
          {/* 阶段二 */}
          {[
            { x: 216, y: 118, t: "4 球体与可命中" },
            { x: 216, y: 158, t: "5 材质与散射" },
            { x: 216, y: 198, t: "6 漫反射" },
            { x: 216, y: 238, t: "7 金属与电介质" },
          ].map((c) => (
            <g key={c.t}>
              <rect x={c.x} y={c.y} width="153" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <circle cx={c.x + 12} cy={c.y + 16} r="3" fill="var(--accent)" />
              <text x={c.x + 80} y={c.y + 20} textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">{c.t}</text>
            </g>
          ))}
          {/* 阶段三 */}
          {[
            { x: 396, y: 118, t: "8 散焦模糊" },
            { x: 396, y: 158, t: "9 最终场景" },
            { x: 396, y: 198, t: "（景深/采样）" },
          ].map((c) => (
            <g key={c.t}>
              <rect x={c.x} y={c.y} width="153" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <circle cx={c.x + 12} cy={c.y + 16} r="3" fill="var(--accent)" />
              <text x={c.x + 80} y={c.y + 20} textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">{c.t}</text>
            </g>
          ))}
          {/* 阶段四 */}
          <rect x="576" y="118" width="108" height="32" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <circle cx="588" cy="134" r="3" fill="var(--accent)" />
          <text x="630" y="138" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">10 总复习</text>

          {/* 流程箭头 */}
          <line x1="189" y1="150" x2="214" y2="150" stroke="var(--accent)" strokeWidth="1.3" strokeOpacity="0.5" markerEnd="url(#arrowRtw)" />
          <line x1="369" y1="150" x2="394" y2="150" stroke="var(--accent)" strokeWidth="1.3" strokeOpacity="0.5" markerEnd="url(#arrowRtw)" />
          <line x1="549" y1="150" x2="574" y2="150" stroke="var(--accent)" strokeWidth="1.3" strokeOpacity="0.5" markerEnd="url(#arrowRtw)" />
          <defs>
            <marker id="arrowRtw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L6,4 L0,8 z" fill="var(--accent)" fillOpacity="0.6" />
            </marker>
          </defs>

          {/* 底部核心理念 */}
          <rect x="48" y="300" width="624" height="60" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="360" y="324" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">核心思想：从相机反向追光，递归模拟散射</text>
          <text x="360" y="344" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">射线 → 求交 → 材质散射 → 递归与采样，几百行 C++ 渲染真实感图片</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">全书十章四阶段：基础射线 → 球体与材质 → 景深与最终场景 → 复盘</figcaption>
    </figure>
  );
}
