/**
 * <DogShaderLanguageDiagram>：GLSL ES 着色器语言
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogShaderLanguageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="GLSL ES 顶点片元传值与限定符" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">顶点着色器 → varying 插值 → 片元着色器</text>

          {/* uniform 公告板 */}
          <rect x="260" y="48" width="200" height="40" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">uniform（绘制不变，共享）</text>

          {/* 顶点着色器 */}
          <rect x="40" y="120" width="240" height="150" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="160" y="142" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">顶点着色器</text>
          <text x="56" y="164" fontSize="9.5" fill="var(--text-secondary)">in a_pos / a_uv（attribute）</text>
          <text x="56" y="180" fontSize="9.5" fill="var(--text-secondary)">uniform u_mvp</text>
          <text x="56" y="196" fontSize="9.5" fill="var(--accent)">out v_uv / v_color（varying）</text>
          <text x="56" y="216" fontSize="9.5" fill="var(--text-primary)">gl_Position = u_mvp·pos</text>
          <text x="56" y="236" fontSize="9.5" fill="var(--text-secondary)">逐顶点执行</text>

          {/* 光栅化插值 */}
          <rect x="300" y="150" width="120" height="90" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="180" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--accent)">光栅化</text>
          <text x="360" y="198" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">按重心坐标</text>
          <text x="360" y="212" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">插值 varying</text>
          <text x="360" y="230" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">逐像素</text>

          {/* 片元着色器 */}
          <rect x="440" y="120" width="240" height="150" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="560" y="142" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">片元着色器</text>
          <text x="456" y="164" fontSize="9.5" fill="var(--accent)">in v_uv / v_color（插值后）</text>
          <text x="456" y="180" fontSize="9.5" fill="var(--text-secondary)">uniform u_tex（sampler2D）</text>
          <text x="456" y="196" fontSize="9.5" fill="var(--text-secondary)">precision mediump float</text>
          <text x="456" y="216" fontSize="9.5" fill="var(--text-primary)">out fragColor = tex·color</text>
          <text x="456" y="236" fontSize="9.5" fill="var(--text-secondary)">逐片元执行</text>

          {/* 箭头 */}
          <line x1="280" y1="195" x2="300" y2="195" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#slArrow)" />
          <line x1="420" y1="195" x2="440" y2="195" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#slArrow)" />
          <line x1="360" y1="88" x2="160" y2="120" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
          <line x1="360" y1="88" x2="560" y2="120" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />

          <text x="360" y="306" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">out 与 in 同名即连接，管线自动插值</text>
          <rect x="40" y="324" width="640" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">限定符：uniform（共享常量）· in/out（顶点片元传值）· precision（精度）</text>
          <text x="360" y="364" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">片元必须显式声明 float 精度；ES3 用 in/out 取代 ES2 的 attribute/varying</text>

          <defs>
            <marker id="slArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">顶点 out 与片元 in 同名连接，光栅化按重心坐标插值 varying</figcaption>
    </figure>
  );
}
