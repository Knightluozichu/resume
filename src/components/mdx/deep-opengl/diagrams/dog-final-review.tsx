/**
 * <DogFinalReviewDiagram>：全书数据流与诊断速查
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogFinalReviewDiagram() {
  const flow = [
    { x: 40, t: "取上下文", c: "第4章" },
    { x: 160, t: "建 VAO/VBO", c: "第2章" },
    { x: 290, t: "编译着色器", c: "第3章" },
    { x: 420, t: "设状态", c: "状态机" },
    { x: 540, t: "drawElements", c: "第1章管线" },
    { x: 40, y2: true, t: "FBO 后处理", c: "第7章" },
    { x: 200, y2: true, t: "优化", c: "第6章" },
    { x: 330, y2: true, t: "移动适配", c: "第5章" },
    { x: 470, y2: true, t: "跨平台", c: "第8章" },
    { x: 600, y2: true, t: "调试", c: "第9章" },
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="全书数据流与诊断速查" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">全书数据流：设状态 → 喂数据 → 发绘制 → 后处理</text>

          {/* 上排主流程 */}
          {flow.filter(n => !n.y2).map((n, i) => (
            <g key={n.t}>
              <rect x={n.x} y="56" width="116" height="46" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.3" />
              <text x={n.x + 58} y="78" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--accent)">{n.t}</text>
              <text x={n.x + 58} y="94" textAnchor="middle" fontSize="8.5" fill="var(--text-secondary)">{n.c}</text>
              {i < 4 && <line x1={n.x + 116} y1="79" x2={n.x + 128} y2="79" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#dfrArrow)" />}
            </g>
          ))}

          {/* 下排支撑 */}
          {flow.filter(n => n.y2).map((n, i) => (
            <g key={n.t}>
              <rect x={n.x} y="130" width="116" height="40" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x={n.x + 58} y="150" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{n.t}</text>
              <text x={n.x + 58} y="164" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{n.c}</text>
              {i < 4 && <line x1={n.x + 116} y1="150" x2={n.x + 128} y2="150" stroke="var(--border)" strokeWidth="1" strokeOpacity="0.6" />}
            </g>
          ))}

          {/* 症状速查 */}
          <rect x="40" y="190" width="640" height="170" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="212" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">症状 → 环节 → 根因 速查</text>
          {[
            { y: 236, s: "黑屏", e: "着色器/缓冲/状态", r: "着色器编译链接失败 · VAO 绑定顺序错 · uniform 没设" },
            { y: 262, s: "性能差", e: "优化/瓶颈", r: "draw call 多 · 状态频繁切换 · 过度绘制 · 纹理采样多" },
            { y: 288, s: "兼容崩溃", e: "跨平台", r: "未检测扩展 · 只写高端路径 · GLSL 版本不符" },
            { y: 314, s: "移动发热", e: "移动适配", r: "过度绘制高 · mediump 算位置致条纹" },
            { y: 340, s: "切标签黑屏", e: "上下文", r: "上下文丢失未 preventDefault/未重建资源" },
          ].map((row) => (
            <g key={row.s}>
              <text x="60" y={row.y} fontSize="10" fontWeight="700" fill="var(--accent)">{row.s}</text>
              <text x="180" y={row.y} fontSize="10" fill="var(--text-primary)">{row.e}</text>
              <text x="340" y={row.y} fontSize="10" fill="var(--text-secondary)">{row.r}</text>
            </g>
          ))}

          <defs>
            <marker id="dfrArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">主流程串成数据流，症状速查直接定位环节与根因</figcaption>
    </figure>
  );
}
