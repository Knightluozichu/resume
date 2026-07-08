/**
 * <Cg4AdvancedRenderingDiagram>：高级渲染技术示意图
 *
 * 展示光线追踪与光栅化两种渲染范式的对比。
 */

export function Cg4AdvancedRenderingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="高级渲染技术" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">光栅化 vs 光线追踪</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">两种主流渲染范式的对比</text>

          {/* 左侧：光栅化 */}
          <rect x="30" y="72" width="310" height="290" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="185" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">光栅化 Rasterization</text>

          {/* 三角形到像素 */}
          <polygon points="60,260 160,120 180,250" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="200" y1="190" x2="250" y2="190" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#cg4-adv-arrow1)" />
          {Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => (
            <rect key={`r-${r}-${c}`} x={260 + c * 12} y={140 + r * 12} width="12" height="12" fill="var(--accent)" fillOpacity={Math.random() > 0.3 ? 0.3 : 0} stroke="var(--border)" strokeWidth="0.5" />
          )))}
          <text x="185" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">前向：图元 → 像素</text>
          <text x="185" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">速度快，GPU 并行</text>
          <text x="185" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全局光照需近似</text>

          {/* 右侧：光线追踪 */}
          <rect x="380" y="72" width="310" height="290" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">光线追踪 Ray Tracing</text>

          {/* 眼睛 → 光线 → 物体 → 反射 */}
          <circle cx="420" cy="160" r="8" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1.5" />
          <text x="420" y="145" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">眼</text>
          <line x1="430" y1="160" x2="540" y2="200" stroke="var(--success)" strokeWidth="1.5" />
          <line x1="540" y1="200" x2="620" y2="140" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="540" cy="200" r="14" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">反向：像素 → 光线 → 场景</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">物理精确，全局光照</text>
          <text x="535" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">计算量大，需加速结构</text>

          <defs>
            <marker id="cg4-adv-arrow1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">光栅化（前向投影）与光线追踪（反向追踪）两种渲染范式对比</figcaption>
    </figure>
  );
}
