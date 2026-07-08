/**
 * <DogDebuggingToolsDiagram>：调试与性能分析
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogDebuggingToolsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="GL 调试与性能分析流程" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">调试三步：查错误 → 查着色器 → 抓帧剖析</text>

          {/* 三步卡片 */}
          {[
            { x: 40, t: "1. 查 GL 错误", d: ["glGetError 查错误码", "KHR_debug 回调主动通知", "INVALID_ENUM/VALUE/OPERATION"], c: "var(--accent)" },
            { x: 260, t: "2. 查着色器日志", d: ["getShaderInfoLog 编译", "getProgramInfoLog 链接", "失败否则只黑屏"], c: "var(--accent)" },
            { x: 480, t: "3. 抓帧剖析", d: ["Spector.js 抓 WebGL", "RenderDoc 抓桌面", "逐 draw 查状态/像素"], c: "var(--accent)" },
          ].map((s) => (
            <g key={s.t}>
              <rect x={s.x} y="50" width="200" height="120" rx="8" fill="var(--bg)" stroke={s.c} strokeWidth="1.4" />
              <text x={s.x + 100} y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill={s.c}>{s.t}</text>
              {s.d.map((line, i) => (
                <text key={i} x={s.x + 14} y={96 + i * 20} fontSize="9.5" fill="var(--text-secondary)">{line}</text>
              ))}
            </g>
          ))}

          {/* 性能瓶颈定位 */}
          <rect x="40" y="190" width="640" height="100" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="212" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">性能瓶颈定位（GPU timer query + CPU 分段计时）</text>
          {[
            { y: 234, t: "顶点 bound", r: "顶点多 / 顶点着色器重 → LOD、剔除、简化着色器" },
            { y: 254, t: "片元 bound", r: "过度绘制 / 片元着色器重 → 前向排序、early-z" },
            { y: 274, t: "带宽/CPU bound", r: "纹理采样多 / draw call 多 → 压缩纹理图集、批处理实例化" },
          ].map((row) => (
            <g key={row.t}>
              <text x="60" y={row.y} fontSize="10" fontWeight="700" fill="var(--accent)">{row.t}</text>
              <text x="200" y={row.y} fontSize="10" fill="var(--text-secondary)">{row.r}</text>
            </g>
          ))}

          {/* 黑屏排查 */}
          <rect x="40" y="308" width="640" height="68" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="330" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">黑屏排查清单</text>
          <text x="60" y="350" fontSize="10" fill="var(--text-secondary)">getError 有错误码? · 着色器编译链接日志? · VAO/VBO 绑定与属性指针? · uniform 设了没? · viewport/清屏?</text>
          <text x="60" y="368" fontSize="10" fill="var(--text-secondary)">深度测试/混合状态? · 上下文是否丢失? · 逐 draw 用帧抓取器核对管线状态</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先查错误与着色器日志，再用帧抓取器逐 draw 剖析，性能用 GPU timer query 定位瓶颈</figcaption>
    </figure>
  );
}
