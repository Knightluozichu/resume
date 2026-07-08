/**
 * <DogOpenglArchitectureDiagram>：OpenGL 架构与状态机
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogOpenglArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="OpenGL 架构与状态机：对象协作与绑定" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">状态机：绑对象 → 拨开关 → 发绘制</text>

          {/* 上下文 */}
          <rect x="40" y="50" width="640" height="40" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">渲染上下文 Context（承载所有状态与对象）</text>

          {/* 三类对象 */}
          <rect x="50" y="120" width="180" height="70" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="142" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">VAO</text>
          <text x="140" y="160" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">记录属性配置</text>
          <text x="140" y="176" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">+ VBO/EBO 关联</text>

          <rect x="270" y="120" width="180" height="70" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="142" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">VBO</text>
          <text x="360" y="160" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">顶点属性数据</text>
          <text x="360" y="176" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">位置/法线/UV</text>

          <rect x="490" y="120" width="180" height="70" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="580" y="142" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">EBO</text>
          <text x="580" y="160" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">索引数组</text>
          <text x="580" y="176" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">复用顶点</text>

          {/* VAO 捕获 VBO/EBO */}
          <line x1="140" y1="190" x2="320" y2="120" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 3" />
          <line x1="140" y1="190" x2="540" y2="120" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 3" />
          <text x="200" y="108" fontSize="9" fill="var(--accent)">捕获关联</text>

          {/* 状态开关 */}
          <text x="360" y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">当前状态开关</text>
          {["DEPTH_TEST", "BLEND", "CULL_FACE", "useProgram"].map((s, i) => (
            <g key={s}>
              <rect x={80 + i * 150} y="240" width="130" height="28" rx="14" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
              <circle cx={96 + i * 150} cy="254" r="6" fill="var(--accent)" />
              <text x={145 + i * 150} y="258" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{s}</text>
            </g>
          ))}

          {/* draw call */}
          <rect x="250" y="300" width="220" height="44" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">drawElements()</text>
          <line x1="360" y1="268" x2="360" y2="300" stroke="var(--accent)" strokeWidth="1.4" markerEnd="url(#oaArrow)" />

          <text x="360" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绘制命令按当前 VAO + VBO + EBO + 程序 + 开关状态跑一遍管线</text>
          <defs>
            <marker id="oaArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">VAO 捕获 VBO/EBO 配置，状态开关持续生效，drawElements 按当前状态绘制</figcaption>
    </figure>
  );
}
