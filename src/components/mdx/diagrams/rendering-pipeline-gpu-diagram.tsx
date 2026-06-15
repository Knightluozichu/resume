/**
 * <RenderingPipelineGpuDiagram highlight="vertex|raster|fragment|post|all">：
 * GPU 侧渲染管线阶段与瓶颈定位示意。
 */

type GpuHighlight = "vertex" | "raster" | "fragment" | "post" | "all";

interface Props {
  highlight?: GpuHighlight;
}

const STAGES: { key: GpuHighlight; label: string; sub: string; y: number }[] = [
  { key: "vertex", label: "Vertex", sub: "顶点变换·蒙皮", y: 52 },
  { key: "raster", label: "Raster", sub: "三角形→片元", y: 102 },
  { key: "fragment", label: "Fragment", sub: "像素着色·Overdraw", y: 152 },
  { key: "post", label: "Post", sub: "后处理全屏 Pass", y: 202 },
];

export function RenderingPipelineGpuDiagram({
  highlight = "all",
}: Props) {
  const active = (key: GpuHighlight) =>
    highlight === "all" || highlight === key;
  const stroke = (key: GpuHighlight) =>
    active(key) ? "var(--accent)" : "var(--border)";
  const fill = (key: GpuHighlight) =>
    active(key) ? "var(--bg-elevated)" : "var(--bg)";

  const caption: Record<GpuHighlight, string> = {
    all: "Profiler GPU ms 高时，用 Frame Debugger 看哪一段 Pass 占时最长，再对症减几何、减 Overdraw 或砍后处理。",
    vertex: "Vertex bound：蒙皮网格、高面数、复杂 Shader 顶点阶段——减 LOD、简化网格、检查 Skinned Mesh。",
    raster: "Raster/Geometry bound：屏幕上三角形过多——减小物体、LOD、视锥剔除；Stats 里 Triangles/Vertices 偏高。",
    fragment: "Fragment/Fill bound：半透明叠层、大分辨率全屏绘制——Stats Overdraw 高；减粒子、减透明层、降分辨率。",
    post: "Post bound：Bloom/DOF/SSR 等全屏 Pass 堆叠——Profiler 里 Post-processing 或 URP Renderer Feature 占时高。",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="GPU 渲染管线阶段：Vertex、Raster、Fragment、Post-processing"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x="48" y="28" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            GPU 帧内典型阶段（Frame Debugger 自上而下）
          </text>

          {STAGES.map((s, i) => (
            <g key={s.key}>
              <rect
                x="120"
                y={s.y}
                width="400"
                height="40"
                rx="8"
                fill={fill(s.key)}
                stroke={stroke(s.key)}
                strokeWidth={active(s.key) ? 2.5 : 1.5}
              />
              <text
                x="140"
                y={s.y + 18}
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              <text
                x="140"
                y={s.y + 32}
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.sub}
              </text>
              {i < STAGES.length - 1 && (
                <line
                  x1="320"
                  y1={s.y + 40}
                  x2="320"
                  y2={STAGES[i + 1].y}
                  stroke="var(--border)"
                  strokeWidth="2"
                />
              )}
            </g>
          ))}

          {/* Profiler readout */}
          <rect
            x="40"
            y="248"
            width="560"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text x="320" y="264" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Game → Stats：Batches / Tris / Saved by batching · Window → Analysis → Frame Debugger
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {caption[highlight]}
      </figcaption>
    </figure>
  );
}
