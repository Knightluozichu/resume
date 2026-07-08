/**
 * <Cg4GraphicsPipelineDiagram>：图形渲染管线流程图
 *
 * 展示从顶点数据到屏幕像素的完整流水线阶段。
 */

export function Cg4GraphicsPipelineDiagram() {
  const stages = [
    { label: "顶点数据", sub: "Vertex Input", y: 100 },
    { label: "顶点着色器", sub: "Vertex Shader", y: 148 },
    { label: "图元装配", sub: "Primitive Assembly", y: 196 },
    { label: "光栅化", sub: "Rasterization", y: 244 },
    { label: "片段着色器", sub: "Fragment Shader", y: 292 },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="图形渲染管线流程" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">图形渲染管线</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从 3D 顶点到 2D 像素的完整流程</text>

          {stages.map((s, i) => (
            <g key={s.label}>
              <rect x="180" y={s.y - 18} width="360" height="36" rx="8" fill={i % 2 === 0 ? "var(--accent)" : "var(--success)"} fillOpacity="0.1" stroke={i % 2 === 0 ? "var(--accent)" : "var(--success)"} strokeWidth="1.2" />
              <text x="360" y={s.y - 2} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">{s.label}</text>
              <text x="360" y={s.y + 12} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{s.sub}</text>
              {i < stages.length - 1 && (
                <line x1="360" y1={s.y + 18} x2="360" y2={stages[i + 1].y - 18} stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#cg4-pipe-arrow)" />
              )}
            </g>
          ))}

          {/* 输入输出标注 */}
          <text x="60" y="104" textAnchor="middle" fontSize="11" fill="var(--accent)" fontWeight="600">输入</text>
          <text x="60" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">3D 顶点</text>
          <text x="660" y="296" textAnchor="middle" fontSize="11" fill="var(--success)" fontWeight="600">输出</text>
          <text x="660" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">2D 像素</text>

          <defs>
            <marker id="cg4-pipe-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">渲染管线的五个核心阶段：顶点输入→着色→装配→光栅化→片段着色</figcaption>
    </figure>
  );
}
