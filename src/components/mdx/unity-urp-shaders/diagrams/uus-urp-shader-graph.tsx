/**
 * <UusUrpShaderGraphDiagram>：Shader Graph 基础图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusUrpShaderGraphDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Shader Graph 基础图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Shader Graph 节点工作流
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            属性输入 → 节点计算 → 主节点输出 → 编译为 Shader
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Property nodes */}
          <rect x="60" y="110" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Property</text>
          <text x="120" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Color/Float/Vec</text>

          {/* Sample Texture node */}
          <rect x="60" y="180" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="202" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Sample Texture</text>
          <text x="120" y="218" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Texture2D</text>

          {/* Math nodes */}
          <rect x="230" y="110" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Multiply</text>
          <text x="290" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">A x B</text>

          <rect x="230" y="180" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="202" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Lerp</text>
          <text x="290" y="218" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">混合 A/B</text>

          {/* Sub Graph */}
          <rect x="400" y="110" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="460" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Sub Graph</text>
          <text x="460" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可复用子图</text>

          {/* Master node */}
          <rect x="560" y="145" width="100" height="80" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="610" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">Vertex /</text>
          <text x="610" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">Fragment</text>
          <text x="610" y="206" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">主输出节点</text>

          {/* Arrows */}
          <text x="190" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="190" y="208" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="360" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="360" y="208" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="530" y="185" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* Bottom info */}
          <rect x="60" y="270" width="600" height="80" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Shader Graph → HLSL 编译流程</text>
          <text x={VIEW_W / 2} y="314" textAnchor="middle" fontSize="11" fill="var(--text-primary)">可视化节点编辑 → 生成 HLSL 代码 → 编译为平台 Shader</text>
          <text x={VIEW_W / 2} y="334" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Graph Data (.shadergraph) → ShaderLab (.shader) → 平台 Shader（HLSLcc / SPIR-V）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Shader Graph 节点工作流——属性与纹理经数学节点处理后输出到主节点
      </figcaption>
    </figure>
  );
}
