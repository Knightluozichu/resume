/**
 * <Cg4TransformationsDiagram>：几何变换与坐标系示意图
 *
 * 展示模型→世界→视图→投影的坐标变换链。
 */

export function Cg4TransformationsDiagram() {
  const spaces = [
    { label: "模型空间", sub: "Object Space", x: 90 },
    { label: "世界空间", sub: "World Space", x: 260 },
    { label: "视图空间", sub: "View Space", x: 430 },
    { label: "裁剪空间", sub: "Clip Space", x: 600 },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="几何变换与坐标系" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">坐标变换链</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">顶点在不同坐标系间的变换流程</text>

          {spaces.map((s, i) => (
            <g key={s.label}>
              <rect x={s.x - 65} y="100" width="130" height="60" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
              <text x={s.x} y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">{s.label}</text>
              <text x={s.x} y="144" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{s.sub}</text>
              {i < spaces.length - 1 && (
                <g>
                  <line x1={s.x + 65} y1="130" x2={spaces[i + 1].x - 65} y2="130" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#cg4-trans-arrow)" />
                  <text x={(s.x + spaces[i + 1].x) / 2} y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
                    {i === 0 ? "Model" : i === 1 ? "View" : "Projection"}
                  </text>
                  <text x={(s.x + spaces[i + 1].x) / 2} y="110" textAnchor="middle" fontSize="9" fill="var(--accent)">Matrix</text>
                </g>
              )}
            </g>
          ))}

          {/* 矩阵公式区 */}
          <rect x="48" y="200" width="624" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="224" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">变换矩阵组合</text>
          <text x="360" y="252" textAnchor="middle" fontSize="13" fill="var(--accent)" fontFamily="monospace">v_clip = M_projection x M_view x M_model x v_local</text>
          <text x="360" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">模型矩阵：局部→世界位置</text>
          <text x="360" y="296" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">视图矩阵：世界→摄像机视角</text>
          <text x="360" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">投影矩阵：3D→2D 裁剪空间（透视/正交）</text>

          <text x="360" y="370" textAnchor="middle" fontSize="11" fill="var(--text-primary)">变换顺序：右乘矩阵从右向左作用于顶点</text>

          <defs>
            <marker id="cg4-trans-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">顶点经过模型、视图、投影三次矩阵变换完成坐标空间转换</figcaption>
    </figure>
  );
}
