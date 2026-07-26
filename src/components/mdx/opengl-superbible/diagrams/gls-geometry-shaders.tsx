import type { ReactNode } from "react";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function DiagramFrame({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const processingStages = [
  {
    number: 1,
    title: "Patch + TCS",
    code: "control points + levels",
    result: "可选重写控制点和细分级别",
    color: accent,
  },
  {
    number: 2,
    title: "Generator + TES",
    code: "domain coordinates → position",
    result: "固定生成参数点，TES 求值",
    color: warning,
  },
  {
    number: 3,
    title: "Geometry shader",
    code: "primitive → output strips",
    result: "可选过滤、改写或路由图元",
    color: success,
  },
  {
    number: 4,
    title: "Assembly + raster",
    code: "clip / cull / rasterize",
    result: "输出图元进入固定处理",
    color: danger,
  },
] as const;

export function GlsGeometryShadersDiagram({
  step = 0,
}: {
  step?: 0 | 1 | 2 | 3;
}) {
  const active =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];
  return (
    <DiagramFrame caption="Primitive processing 包含专用 tessellation 链和可选 geometry shader；两者解决不同粒度的问题。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="图元从 patch 和细分控制、固定生成与求值、几何着色到装配光栅化的完整处理链"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text
          x="450"
          y="29"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          图元处理的两条可编程路径
        </text>
        <text x="450" y="50" textAnchor="middle" fontSize="11" fill={secondary}>
          规则细分交给 tessellator；逐图元改写与路由交给 geometry shader
        </text>
        {processingStages.map((stage, index) => {
          const focused = active.includes(stage.number);
          const x = 15 + index * 221;
          return (
            <g key={stage.title} opacity={focused ? 1 : 0.25}>
              <rect
                x={x}
                y="75"
                width="205"
                height="180"
                rx="8"
                fill={stage.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={stage.color}
                strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
              />
              <circle cx={x + 27} cy="103" r="15" fill={stage.color} />
              <text
                x={x + 27}
                y="108"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {stage.number}
              </text>
              <text
                x={x + 50}
                y="108"
                fontSize="12.2"
                fontWeight="700"
                fill={primary}
              >
                {stage.title}
              </text>
              <rect
                x={x + 12}
                y="132"
                width="181"
                height="38"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 102.5}
                y="155"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={stage.color}
              >
                {stage.code}
              </text>
              <text x={x + 13} y="201" fontSize="11" fill={secondary}>
                结果
              </text>
              <text x={x + 13} y="222" fontSize="11" fill={primary}>
                {stage.result}
              </text>
            </g>
          );
        })}
        {[210, 431, 652].map((x) => (
          <path
            key={x}
            d={`M${x} 165 H${x + 23} M${x + 15} 157 L${x + 24} 165 L${x + 15} 173`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <rect
          x="190"
          y="283"
          width="520"
          height="29"
          rx="6"
          fill={accent}
          fillOpacity="0.06"
          stroke={accent}
          strokeOpacity="0.45"
        />
        <text
          x="450"
          y="302"
          textAnchor="middle"
          fontSize="11"
          fill={primary}
        >
          不启用某阶段时，数据直接进入后续合法阶段；不是所有 draw 都需要完整链
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          完整 primitive processing
        </p>
        {processingStages.map((stage) => {
          const focused = active.includes(stage.number);
          return (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3 transition-opacity"
              style={{ borderColor: stage.color, opacity: focused ? 1 : 0.32 }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {stage.number}. {stage.title}
                </strong>
                <span
                  className="text-right font-mono text-[9px]"
                  style={{ color: stage.color }}
                >
                  {stage.code}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{stage.result}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const domainRows = [
  ["triangles", "(u,v,w), u+v+w=1", "3 outer + 1 inner", accent],
  ["quads", "(u,v) ∈ [0,1]²", "4 outer + 2 inner", warning],
  ["isolines", "(u,line)", "line count + segments", success],
] as const;

export function GlsTessellationDomainsDiagram() {
  return (
    <DiagramFrame caption="TES layout 选择 triangles、quads 或 isolines 参数域；spacing、winding 与 point_mode 决定生成拓扑，不决定曲面位置。">
      <svg
        viewBox="0 0 860 320"
        role="img"
        aria-label="曲面细分三角形四边形和等值线参数域及其内外细分级别"
        className="mx-auto hidden h-auto w-full max-w-[860px] md:block"
      >
        <text
          x="430"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          三种 tessellation domain
        </text>
        {domainRows.map((row, index) => {
          const x = 25 + index * 278;
          return (
            <g key={row[0]}>
              <rect
                x={x}
                y="67"
                width="252"
                height="175"
                rx="8"
                fill={row[3]}
                fillOpacity="0.08"
                stroke={row[3]}
              />
              <text
                x={x + 126}
                y="101"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="12.5"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <rect
                x={x + 14}
                y="122"
                width="224"
                height="39"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 126}
                y="146"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text
                x={x + 126}
                y="197"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="430"
          y="282"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          equal_spacing / fractional_even_spacing / fractional_odd_spacing · cw
          / ccw · point_mode
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          三种细分参数域
        </p>
        {domainRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="font-mono text-sm text-primary">{row[0]}</strong>
            <p className="mt-1 font-mono text-[10px]" style={{ color: row[3] }}>
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const edgeRows = [
  ["Patch A shared edge", "outer[1] = 8", "8 segments", accent],
  ["Patch B shared edge", "outer[3] = 8", "8 segments", success],
  ["Mismatch", "8 versus 5", "T-junction / crack risk", danger],
] as const;

export function GlsTessellationFactorsDiagram() {
  return (
    <DiagramFrame caption="相邻 patch 的共享边必须得到兼容 outer level；inner level 只控制内部密度，不能修复边界裂缝。">
      <svg
        viewBox="0 0 860 315"
        role="img"
        aria-label="相邻曲面 patch 共享边使用匹配外层细分级别避免裂缝"
        className="mx-auto hidden h-auto w-full max-w-[860px] md:block"
      >
        <text
          x="430"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          Outer level 是 patch 边界契约
        </text>
        {edgeRows.map((row, index) => {
          const y = 70 + index * 57;
          return (
            <g key={row[0]}>
              <rect
                x="80"
                y={y}
                width="700"
                height="43"
                rx="7"
                fill={row[3]}
                fillOpacity="0.07"
                stroke={row[3]}
              />
              <text
                x="105"
                y={y + 26}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="385"
                y={y + 26}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text x="605" y={y + 26} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <path
          d="M300 270 H560 M420 251 V289"
          stroke={warning}
          strokeWidth="3"
        />
        <text
          x="430"
          y="304"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          从同一边端点和同一 LOD 规则计算，避免浮点或视角分歧
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          共享边细分契约
        </p>
        {edgeRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p className="mt-1 font-mono text-[10px]" style={{ color: row[3] }}>
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const topologyRows = [
  ["points", "1", "points", accent],
  ["lines", "2", "line_strip", warning],
  ["lines_adjacency", "4", "line_strip", success],
  ["triangles", "3", "triangle_strip", danger],
  ["triangles_adjacency", "6", "triangle_strip", accent],
] as const;

export function GlsGeometryContractDiagram() {
  return (
    <DiagramFrame caption="Geometry shader 输入拓扑决定 gl_in 数组长度；输出只允许 points、line_strip 或 triangle_strip，并受两个实现上限共同约束。">
      <svg
        viewBox="0 0 900 365"
        role="img"
        aria-label="几何着色器五种输入拓扑的顶点数组长度和三种输出拓扑契约"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text
          x="450"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          输入是完整图元，输出是 strip
        </text>
        <text x="28" y="66" fontSize="11" fill={secondary}>
          input layout
        </text>
        <text x="320" y="66" fontSize="11" fill={secondary}>
          gl_in.length()
        </text>
        <text x="585" y="66" fontSize="11" fill={secondary}>
          合法 output family
        </text>
        {topologyRows.map((row, index) => {
          const y = 80 + index * 47;
          return (
            <g key={row[0]}>
              <rect
                x="20"
                y={y}
                width="860"
                height="35"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="40" cy={y + 17.5} r="6" fill={row[3]} />
              <text
                x="55"
                y={y + 22}
                fontFamily="monospace"
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="350"
                y={y + 22}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text
                x="585"
                y={y + 22}
                fontFamily="monospace"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="450"
          y="335"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          query: GL_MAX_GEOMETRY_OUTPUT_VERTICES +
          GL_MAX_GEOMETRY_TOTAL_OUTPUT_COMPONENTS
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Geometry topology contract
        </p>
        {topologyRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <div className="flex justify-between gap-3">
              <strong className="font-mono text-[11px] text-primary">
                {row[0]}
              </strong>
              <span className="font-mono text-[10px]" style={{ color: row[3] }}>
                gl_in = {row[1]}
              </span>
            </div>
            <p className="mt-1 font-mono text-[10px] text-secondary">
              out: {row[2]}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const emitStages = [
  ["write outputs", "position/color/layer", accent],
  ["EmitVertex()", "append vertex; outputs undefined", warning],
  ["repeat", "rewrite every required output", success],
  ["EndPrimitive()", "finish current strip", danger],
] as const;

export function GlsEmissionStateDiagram() {
  return (
    <DiagramFrame caption="EmitVertex 将当前输出快照追加到 strip；发射后输出值未定义，下一顶点必须重写。EndPrimitive 只结束当前 strip。">
      <svg
        viewBox="0 0 880 315"
        role="img"
        aria-label="几何着色器写输出发射顶点重写输出并结束当前条带的状态机"
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
      >
        <text
          x="440"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          一次输出 strip 的状态机
        </text>
        {emitStages.map((stage, index) => {
          const x = 18 + index * 217;
          return (
            <g key={stage[0]}>
              <circle cx={x + 24} cy="90" r="15" fill={stage[2]} />
              <text
                x={x + 24}
                y="95"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {index + 1}
              </text>
              <rect
                x={x}
                y="116"
                width="195"
                height="110"
                rx="8"
                fill={stage[2]}
                fillOpacity="0.08"
                stroke={stage[2]}
              />
              <text
                x={x + 97.5}
                y="149"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {stage[0]}
              </text>
              <text
                x={x + 97.5}
                y="184"
                textAnchor="middle"
                fontSize="11"
                fill={stage[2]}
              >
                {stage[1]}
              </text>
            </g>
          );
        })}
        {[213, 430, 647].map((x) => (
          <path
            key={x}
            d={`M${x} 171 H${x + 22} M${x + 14} 163 L${x + 23} 171 L${x + 14} 179`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <text
          x="440"
          y="285"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          line_strip: V−1 segments · triangle_strip: max(0,V−2) triangles
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Emit / End strip 状态
        </p>
        {emitStages.map((stage, index) => (
          <div
            key={stage[0]}
            className="rounded-control border p-3"
            style={{ borderColor: stage[2] }}
          >
            <strong className="font-mono text-sm text-primary">
              {index + 1}. {stage[0]}
            </strong>
            <p className="mt-1 text-xs" style={{ color: stage[2] }}>
              {stage[1]}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const routingRows = [
  ["invocation 0", "MVP[0]", "viewport 0 / layer 0", accent],
  ["invocation 1", "MVP[1]", "viewport 1 / layer 1", warning],
  ["invocation 2", "MVP[2]", "viewport 2 / layer 2", success],
  ["invocation 3", "MVP[3]", "viewport 3 / layer 3", danger],
] as const;

export function GlsLayerViewportDiagram() {
  return (
    <DiagramFrame caption="Geometry shader invocations 可复制同一输入图元，并通过 gl_ViewportIndex 或 gl_Layer 路由到不同视口或 framebuffer layer。">
      <svg
        viewBox="0 0 880 330"
        role="img"
        aria-label="几何着色器四次 invocation 使用不同矩阵并路由到四个视口或图层"
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
      >
        <text
          x="440"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          一次输入，多路变换与路由
        </text>
        {routingRows.map((row, index) => {
          const y = 72 + index * 51;
          return (
            <g key={row[0]}>
              <rect
                x="70"
                y={y}
                width="740"
                height="39"
                rx="6"
                fill={row[3]}
                fillOpacity="0.07"
                stroke={row[3]}
              />
              <text
                x="95"
                y={y + 24}
                fontFamily="monospace"
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="350"
                y={y + 24}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text
                x="570"
                y={y + 24}
                fontFamily="monospace"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="440"
          y="303"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          总 invocation = input primitives × layout(invocations=N)；输出量仍受每
          invocation 上限约束
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          多 invocation 路由
        </p>
        {routingRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <div className="flex justify-between gap-3">
              <strong className="font-mono text-[11px] text-primary">
                {row[0]}
              </strong>
              <span className="font-mono text-[10px]" style={{ color: row[3] }}>
                {row[1]}
              </span>
            </div>
            <p className="mt-1 font-mono text-[10px] text-secondary">
              {row[2]}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
