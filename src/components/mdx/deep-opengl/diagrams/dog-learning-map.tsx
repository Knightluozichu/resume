/**
 * <DogLearningMapDiagram>：深入理解 OpenGL WebGL OpenGL ES 全书学习地图
 * 纯静态 SVG，无交互。Server Component。
 */
export function DogLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="深入理解 OpenGL WebGL OpenGL ES 全书学习地图" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">深入理解 OpenGL/WebGL/OpenGL ES · 学习地图</text>

          {/* 三 API 关系 */}
          <rect x="40" y="50" width="200" height="40" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">OpenGL（桌面全功能）</text>
          <rect x="260" y="50" width="200" height="40" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">OpenGL ES（移动精简）</text>
          <rect x="480" y="50" width="200" height="40" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="580" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">WebGL（浏览器）</text>
          <line x1="240" y1="70" x2="260" y2="70" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" markerEnd="url(#dogArrow)" />
          <line x1="460" y1="70" x2="480" y2="70" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" markerEnd="url(#dogArrow)" />

          {/* 图形管线阶段 */}
          <text x="360" y="118" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">图形管线阶段</text>
          {["顶点输入", "顶点着色器", "图元装配", "光栅化", "片元着色器", "逐片元测试", "帧缓冲"].map((s, i) => (
            <g key={s}>
              <rect x={40 + i * 95} y="130" width="86" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x={83 + i * 95} y="150" textAnchor="middle" fontSize="9.5" fill={(s === "顶点着色器" || s === "片元着色器") ? "var(--accent)" : "var(--text-primary)"}>{s}</text>
            </g>
          ))}
          <text x="360" y="178" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">橙色为可编程着色器阶段</text>

          {/* 十章卡片 */}
          <text x="360" y="202" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">十章脉络</text>
          {[
            { x: 40, y: 212, t: "1 学习地图" },
            { x: 162, y: 212, t: "2 架构状态机" },
            { x: 284, y: 212, t: "3 GLSL ES" },
            { x: 406, y: 212, t: "4 WebGL 基础" },
            { x: 528, y: 212, t: "5 OpenGL ES" },
            { x: 40, y: 256, t: "6 渲染优化" },
            { x: 162, y: 256, t: "7 FBO 后处理" },
            { x: 284, y: 256, t: "8 跨平台" },
            { x: 406, y: 256, t: "9 调试性能" },
            { x: 528, y: 256, t: "10 总复习" },
          ].map((c) => (
            <g key={c.t}>
              <rect x={c.x} y={c.y} width="112" height="34" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x={c.x + 56} y={c.y + 22} textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{c.t}</text>
            </g>
          ))}

          <rect x="40" y="312" width="640" height="60" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="336" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">核心思想：状态机 + 图形管线 + 可编程着色器</text>
          <text x="360" y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">设状态 → 喂数据 → 发绘制；三 API 同源，差异在子集与扩展</text>

          <defs>
            <marker id="dogArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L6,4 L0,8 z" fill="var(--accent)" fillOpacity="0.6" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">三 API 同源关系、图形管线七阶段与十章脉络总览</figcaption>
    </figure>
  );
}
