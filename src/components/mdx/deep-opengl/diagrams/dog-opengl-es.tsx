/**
 * <DogOpenglEsDiagram>：OpenGL ES 移动端适配
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogOpenglEsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="OpenGL ES 移动端适配与 TBDR" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">移动 GPU：TBDR 分块渲染 + 精度适配</text>

          {/* 画面分块 */}
          <text x="150" y="62" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">画面分块（Tile）</text>
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 4 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={40 + c * 55} y={74 + r * 45} width="50" height="40" rx="4" fill={r === 1 && c === 2 ? "var(--accent)" : "var(--bg)"} fillOpacity={r === 1 && c === 2 ? 0.18 : 1} stroke="var(--border)" strokeWidth="1" />
            ))
          )}
          <text x="150" y="266" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">每块在片上缓存独立处理</text>

          {/* TBDR 流程 */}
          <rect x="270" y="74" width="410" height="180" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="475" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">TBDR 处理流程</text>
          {[
            { y: 116, t: "1. 几何阶段：顶点着色 + 图元装配（全局）" },
            { y: 140, t: "2. 分块：把图元分到各 Tile 的 bin" },
            { y: 164, t: "3. 逐块：加载 Tile 到片上缓存" },
            { y: 188, t: "4. 片元着色 + 深度测试（片上，省带宽）" },
            { y: 212, t: "5. 写回显存（一次性）" },
            { y: 236, t: "透明/未消除片元 + 附件存取 → 带宽与功耗↑" },
          ].map((row) => (
            <text key={row.y} x="286" y={row.y} fontSize="10" fill={row.t.startsWith("过度") ? "var(--accent)" : "var(--text-primary)"}>{row.t}</text>
          ))}

          {/* 精度策略 */}
          <rect x="40" y="290" width="640" height="86" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">精度策略</text>
          <text x="60" y="332" fontSize="10" fill="var(--accent)">highp → 位置、矩阵、法线变换（防溢出/条纹）</text>
          <text x="60" y="350" fontSize="10" fill="var(--text-secondary)">mediump → 先验证范围与误差，再用 GPU 计数器确认收益</text>
          <text x="60" y="368" fontSize="10" fill="var(--text-secondary)">附件格式/分辨率 → 直接决定片外带宽；临时附件可避免无用 store</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">移动优化同时约束片元工作、附件 load/store、分辨率与数值精度，并以计数器验证</figcaption>
    </figure>
  );
}

const LIFECYCLE_STATES = [
  ["无 Surface", "保存 CPU 描述，不提交 swap"],
  ["Surface 可用", "选择 EGLConfig 并创建 EGLSurface"],
  ["Context current", "创建或复用上下文，重建缺失 GPU 资源"],
  ["渲染运行", "绘制、eglSwapBuffers、检查尺寸与错误"],
  ["暂停/销毁", "停止线程，解绑并销毁 Surface；Context 是否保留由策略决定"],
] as const;

export function DogMobileLifecycleDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div
          role="img"
          aria-label="Android 原生窗口、EGLSurface、EGLContext 与 GPU 资源的分层生命周期"
          className="grid gap-2"
        >
          {LIFECYCLE_STATES.map(([state, action], index) => (
            <div
              key={state}
              className="grid min-h-14 grid-cols-[2rem_8rem_1fr] items-center gap-3 rounded-control border border-border bg-bg/40 p-3"
            >
              <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                {index + 1}
              </span>
              <strong className="text-sm text-primary">{state}</strong>
              <span className="text-xs leading-5 text-secondary">{action}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Surface、Context 和 GPU 资源寿命不同，恢复逻辑必须分别判断
      </figcaption>
    </figure>
  );
}
