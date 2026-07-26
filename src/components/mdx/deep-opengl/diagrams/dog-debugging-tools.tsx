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
            { x: 40, t: "1. 查 GL 错误", d: ["WebGL: getError 隔离检查", "原生 GL/ES: KHR_debug", "两条调试路径不可混用"], c: "var(--accent)" },
            { x: 260, t: "2. 查着色器日志", d: ["getShaderInfoLog 编译", "getProgramInfoLog 链接", "失败否则只黑屏"], c: "var(--accent)" },
            { x: 480, t: "3. 抓帧剖析", d: ["Spector.js 抓 WebGL", "RenderDoc 抓桌面", "逐 draw 查状态/像素"], c: "var(--accent)" },
          ].map((s) => (
            <g key={s.t}>
              <rect x={s.x} y="50" width="200" height="120" rx="8" fill="var(--bg)" stroke={s.c} strokeWidth="1.4" />
              <text x={s.x + 100} y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill={s.c}>{s.t}</text>
              {s.d.map((line, i) => (
                <text key={i} x={s.x + 14} y={96 + i * 20} fontSize="11" fill="var(--text-secondary)">{line}</text>
              ))}
            </g>
          ))}

          {/* 性能瓶颈定位 */}
          <rect x="40" y="190" width="640" height="100" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="212" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">性能瓶颈定位（GPU timer query + CPU 分段计时）</text>
          {[
            { y: 234, t: "顶点 bound", r: "顶点多 / 顶点着色器重 → LOD、剔除、简化着色器" },
            { y: 254, t: "片元 bound", r: "过度绘制 / 片元着色器重 → 前向排序、early-z" },
            { y: 274, t: "带宽/CPU bound", r: "附件/采样字节或提交过多 → 格式/分辨率或批处理实例化" },
          ].map((row) => (
            <g key={row.t}>
              <text x="60" y={row.y} fontSize="11" fontWeight="700" fill="var(--accent)">{row.t}</text>
              <text x="200" y={row.y} fontSize="11" fill="var(--text-secondary)">{row.r}</text>
            </g>
          ))}

          {/* 黑屏排查 */}
          <rect x="40" y="308" width="640" height="68" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="330" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">黑屏排查清单</text>
          <text x="60" y="350" fontSize="11" fill="var(--text-secondary)">getError 有错误码? · 着色器编译链接日志? · VAO/VBO 绑定与属性指针? · uniform 设了没? · viewport/清屏?</text>
          <text x="60" y="368" fontSize="11" fill="var(--text-secondary)">深度测试/混合状态? · 上下文是否丢失? · 逐 draw 用帧抓取器核对管线状态</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">WebGL 与原生调试入口分开；先隔离正确性，再用非阻塞 GPU 查询定位性能</figcaption>
    </figure>
  );
}

const ISOLATION_STEPS = [
  ["输出目标", "把默认/FBO 清成洋红色，确认 viewport、附件和呈现链"],
  ["固定几何", "只画裁剪空间三角形，排除相机、模型和索引"],
  ["固定着色", "顶点直通、片元常量色，排除纹理和光照"],
  ["逐层恢复", "依次恢复 VAO、矩阵、纹理、深度/混合与后处理"],
  ["抓取证据", "在第一处变化点查看 draw 状态、资源内容和像素历史"],
] as const;

export function DogBlackFrameIsolationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div
          role="img"
          aria-label="黑屏问题从输出目标到逐层恢复的五步二分隔离流程"
          className="grid gap-2"
        >
          {ISOLATION_STEPS.map(([title, detail], index) => (
            <div
              key={title}
              className="grid min-h-14 grid-cols-[2rem_7rem_1fr] items-center gap-3 rounded-control border border-border bg-bg/40 p-3"
            >
              <span className="font-mono text-xs text-secondary">{index + 1}</span>
              <strong className="text-sm text-accent">{title}</strong>
              <span className="text-xs leading-5 text-secondary">{detail}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        黑屏调试不是随机改状态，而是用已知输出逐层恢复并找到第一处断点
      </figcaption>
    </figure>
  );
}
