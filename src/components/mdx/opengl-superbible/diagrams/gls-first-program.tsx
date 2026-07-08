/**
 * <GlsFirstProgramDiagram>
 *
 * 第一个OpenGL程序：初始化→着色器→绘制→交换
 */

export function GlsFirstProgramDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="第一个OpenGL程序：初始化→着色器→绘制→交换" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">第一个OpenGL程序流程</text>
<rect x="180" y="62" width="360" height="36" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
<text x="360" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">初始化GLFW</text>
<text x="360" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">创建窗口+上下文</text>
<line x1="360" y1="98" x2="360" y2="112" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="180" y="112" width="360" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
<text x="360" y="128" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">加载GLAD</text>
<text x="360" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">函数指针</text>
<line x1="360" y1="148" x2="360" y2="162" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="180" y="162" width="360" height="36" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
<text x="360" y="178" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">编译着色器</text>
<text x="360" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">顶点+片段</text>
<line x1="360" y1="198" x2="360" y2="212" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="180" y="212" width="360" height="36" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
<text x="360" y="228" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">创建VBO/VAO</text>
<text x="360" y="242" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">上传顶点数据</text>
<line x1="360" y1="248" x2="360" y2="262" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
<rect x="180" y="262" width="360" height="36" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
<text x="360" y="278" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">渲染循环</text>
<text x="360" y="292" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">清空→绘制→交换</text>
<rect x="48" y="350" width="624" height="32" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
<text x="360" y="370" textAnchor="middle" fontSize="11" fill="var(--text-primary)">第一个三角形：3个顶点→顶点着色器→光栅化→片段着色器→屏幕</text>

          <defs>
            <marker id="gls-first-program-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">第一个OpenGL程序：初始化→着色器→绘制→交换</figcaption>
    </figure>
  );
}
