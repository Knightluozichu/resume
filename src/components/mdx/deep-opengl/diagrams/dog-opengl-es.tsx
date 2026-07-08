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
            { y: 236, t: "过度绘制 → 每块片元数↑ → 功耗↑" },
          ].map((row) => (
            <text key={row.y} x="286" y={row.y} fontSize="10" fill={row.t.startsWith("过度") ? "var(--accent)" : "var(--text-primary)"}>{row.t}</text>
          ))}

          {/* 精度策略 */}
          <rect x="40" y="290" width="640" height="86" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">精度策略</text>
          <text x="60" y="332" fontSize="10" fill="var(--accent)">highp → 位置、矩阵、法线变换（防溢出/条纹）</text>
          <text x="60" y="350" fontSize="10" fill="var(--text-secondary)">mediump → 颜色、UV、普通片元运算（省电省带宽）</text>
          <text x="60" y="368" fontSize="10" fill="var(--text-secondary)">lowp → 颜色分量等低精度需求；片元必须显式声明默认 float 精度</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">移动 GPU 分块渲染使过度绘制代价高，按通道选精度省电防失真</figcaption>
    </figure>
  );
}
