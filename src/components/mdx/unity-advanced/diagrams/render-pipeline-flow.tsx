/**
 * <RenderPipelineFlow>：渲染管线流程图
 *
 * 展示 CPU 端 → GPU 端的完整渲染管线流程：
 * CPU端：Culling → Sorting → DrawCall 提交
 * GPU端：Vertex Shader → Tessellation → Geometry Shader → Rasterization → Fragment Shader → Output Merger
 * 标注 SetPass Call vs DrawCall 的区别
 */

const VIEW_W = 800;
const VIEW_H = 440;

type Stage = {
  label: string;
  sub: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
  side: "cpu" | "gpu";
};

const STAGES: readonly Stage[] = [
  // CPU 端
  { label: "Culling", sub: "视锥/遮挡剔除", color: "var(--accent)", x: 30, y: 100, w: 95, h: 56, side: "cpu" },
  { label: "Sorting", sub: "排序/合批", color: "var(--accent)", x: 145, y: 100, w: 95, h: 56, side: "cpu" },
  { label: "DrawCall", sub: "提交渲染指令", color: "var(--warning)", x: 260, y: 100, w: 100, h: 56, side: "cpu" },
  // GPU 端
  { label: "Vertex\nShader", sub: "顶点变换", color: "var(--success)", x: 30, y: 230, w: 90, h: 56, side: "gpu" },
  { label: "Tessellation", sub: "曲面细分", color: "var(--success)", x: 140, y: 230, w: 95, h: 56, side: "gpu" },
  { label: "Geometry\nShader", sub: "几何着色", color: "var(--success)", x: 255, y: 230, w: 95, h: 56, side: "gpu" },
  { label: "Rasterization", sub: "光栅化", color: "var(--danger)", x: 370, y: 230, w: 100, h: 56, side: "gpu" },
  { label: "Fragment\nShader", sub: "片元着色", color: "var(--success)", x: 490, y: 230, w: 95, h: 56, side: "gpu" },
  { label: "Output\nMerger", sub: "混合/深度/模板", color: "var(--danger)", x: 605, y: 230, w: 100, h: 56, side: "gpu" },
];

export function RenderPipelineFlow() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[800px]"
        style={{ minWidth: 700 }}
        role="img"
        aria-label="渲染管线流程图"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        {/* 标题 */}
        <text x={VIEW_W / 2} y={28} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          渲染管线流程（CPU → GPU）
        </text>
        <text x={VIEW_W / 2} y={46} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          CPU准备渲染数据→提交DrawCall→GPU执行着色器流水线→输出到帧缓冲
        </text>

        {/* CPU 区域 */}
        <rect x={20} y={70} width={355} height={110} fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" rx="8" />
        <text x={35} y={88} fill="var(--accent)" fontSize="12" fontWeight="700" fontFamily="system-ui">CPU 端（主线程+渲染线程）</text>

        {/* GPU 区域 */}
        <rect x={20} y={200} width={700} height={110} fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeDasharray="4 3" rx="8" />
        <text x={35} y={218} fill="var(--success)" fontSize="12" fontWeight="700" fontFamily="system-ui">GPU 端（图形API流水线）</text>

        {/* 帧缓冲输出 */}
        <rect x={720} y={210} width={60} height={90} fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" rx="6" />
        <text x={750} y={240} textAnchor="middle" fill="var(--danger)" fontSize="10" fontWeight="600" fontFamily="system-ui">Frame</text>
        <text x={750} y={255} textAnchor="middle" fill="var(--danger)" fontSize="10" fontWeight="600" fontFamily="system-ui">Buffer</text>
        <text x={750} y={275} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">前/后缓冲</text>
        <text x={750} y={288} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">双缓冲交换</text>

        {/* 阶段框 */}
        {STAGES.map((s) => {
          const lines = s.label.split("\n");
          return (
            <g key={s.label.replace(/\n/g, "-")}>
              <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="var(--bg)" stroke={s.color} strokeWidth="1.5" rx="6" />
              <rect x={s.x} y={s.y} width={s.w} height={4} fill={s.color} rx="2" />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={s.x + s.w / 2}
                  y={s.y + 22 + li * 13}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="system-ui"
                >
                  {line}
                </text>
              ))}
              <text x={s.x + s.w / 2} y={s.y + s.h - 10} textAnchor="middle" fill="var(--text-secondary)" fontSize="8.5" fontFamily="system-ui">{s.sub}</text>
            </g>
          );
        })}

        {/* CPU 内部箭头：Culling → Sorting → DrawCall */}
        <path d="M 125 128 L 140 128" stroke="var(--accent)" strokeWidth="1.8" fill="none" markerEnd="url(#rpf-arrow-accent)" />
        <path d="M 240 128 L 255 128" stroke="var(--accent)" strokeWidth="1.8" fill="none" markerEnd="url(#rpf-arrow-accent)" />

        {/* CPU → GPU 连接（DrawCall 提交给 GPU） */}
        <path d="M 310 156 C 310 180, 75 190, 75 225" stroke="var(--warning)" strokeWidth="2" fill="none" markerEnd="url(#rpf-arrow-warning)" strokeDasharray="5 3" />
        <text x={165} y={188} textAnchor="middle" fill="var(--warning)" fontSize="9" fontWeight="600" fontFamily="system-ui">SetPass Call（切换Pass/材质）</text>
        <text x={165} y={200} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">+ DrawCall（提交图元）</text>

        {/* GPU 流水线箭头 */}
        {(() => {
          const gpuStages = STAGES.filter((s) => s.side === "gpu");
          return gpuStages.slice(0, -1).map((s, i) => {
            const next = gpuStages[i + 1];
            const x1 = s.x + s.w + 2;
            const x2 = next.x - 2;
            const y = s.y + s.h / 2;
            return (
              <path
                key={`gpu-${i}`}
                d={`M ${x1} ${y} L ${x2} ${y}`}
                stroke="var(--success)"
                strokeWidth="1.8"
                fill="none"
                markerEnd="url(#rpf-arrow-success)"
              />
            );
          });
        })()}

        {/* Output Merger → FrameBuffer */}
        <path d="M 705 258 L 718 258" stroke="var(--danger)" strokeWidth="1.8" fill="none" markerEnd="url(#rpf-arrow-danger)" />

        {/* 光栅化下方标注：关键阶段 */}
        <g>
          <rect x={370} y={300} width={100} height={28} fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" rx="4" />
          <text x={420} y={318} textAnchor="middle" fill="var(--danger)" fontSize="9" fontWeight="600" fontFamily="system-ui">三角面→片元</text>
        </g>

        {/* Camera.Render 流程说明 */}
        <g>
          <rect x={20} y={330} width={760} height={90} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />
          <text x={35} y={352} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">Camera.Render 一帧的关键步骤</text>

          {[
            { step: "1", label: "Cull", desc: "视锥剔除+遮挡剔除\nLayer/Camera层过滤", color: "var(--accent)" },
            { step: "2", label: "Sort", desc: "按距离/材质/Queue\n排序（Opaque→Transparent）", color: "var(--accent)" },
            { step: "3", label: "Build", desc: "构建渲染命令列表\n执行合批策略", color: "var(--warning)" },
            { step: "4", label: "Submit", desc: "Graphics.DrawXxx/CommandBuffer\n提交给GPU驱动", color: "var(--warning)" },
            { step: "5", label: "GPU", desc: "GPU流水线执行\n顶点→光栅→片元→输出", color: "var(--success)" },
          ].map((c, i) => {
            const cx = 40 + i * 148;
            return (
              <g key={c.label}>
                <circle cx={cx + 12} cy={375} r={10} fill={c.color} fillOpacity="0.15" stroke={c.color} strokeWidth="1" />
                <text x={cx + 12} y={379} textAnchor="middle" fill={c.color} fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace">{c.step}</text>
                <text x={cx + 30} y={373} fill={c.color} fontSize="10" fontWeight="600" fontFamily="system-ui">{c.label}</text>
                <text x={cx + 30} y={386} fill="var(--text-secondary)" fontSize="7.5" fontFamily="system-ui">{c.desc.split("\n")[0]}</text>
                <text x={cx + 30} y={397} fill="var(--text-secondary)" fontSize="7.5" fontFamily="system-ui">{c.desc.split("\n")[1]}</text>
                {i < 4 && (
                  <path d={`M ${cx + 135} 375 L ${cx + 143} 375`} stroke="var(--border)" strokeWidth="1" fill="none" markerEnd="url(#rpf-arrow-gray)" />
                )}
              </g>
            );
          })}
        </g>

        <defs>
          <marker id="rpf-arrow-accent" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--accent)" />
          </marker>
          <marker id="rpf-arrow-success" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--success)" />
          </marker>
          <marker id="rpf-arrow-warning" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--warning)" />
          </marker>
          <marker id="rpf-arrow-danger" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--danger)" />
          </marker>
          <marker id="rpf-arrow-gray" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="var(--border)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
