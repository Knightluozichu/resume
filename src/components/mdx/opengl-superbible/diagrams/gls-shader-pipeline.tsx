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

const pipelineGroups = [
  {
    number: 1,
    title: "输入与顶点",
    stages: "vertex input → VS",
    result: "裁剪空间顶点 + out 接口",
    color: accent,
  },
  {
    number: 2,
    title: "细分与几何",
    stages: "TCS → generator → TES → GS",
    result: "可选：由 patch 生成或改写图元",
    color: warning,
  },
  {
    number: 3,
    title: "固定图元处理",
    stages: "assembly → clip → rasterize",
    result: "装配、裁剪、视口映射并产生片段",
    color: success,
  },
  {
    number: 4,
    title: "片段与帧缓冲",
    stages: "FS → tests/blend → framebuffer",
    result: "片段输出通过测试后才可能写入",
    color: danger,
  },
] as const;

export function GlsShaderPipelineDiagram({
  step = 0,
}: {
  step?: 0 | 1 | 2 | 3;
}) {
  const activeStages =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];

  return (
    <DiagramFrame caption="OpenGL 图形管线包含可编程阶段和固定功能阶段；细分与几何阶段可选，计算着色器不在这条绘制链中。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="OpenGL 从顶点输入、可选细分和几何、图元装配与光栅化到片段和帧缓冲操作的完整图形管线"
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
          一次 draw 的完整路径
        </text>
        <text x="450" y="50" textAnchor="middle" fontSize="11" fill={secondary}>
          可编程 shader 与固定功能处理共同决定 framebuffer 结果
        </text>
        {pipelineGroups.map((group, index) => {
          const focused = activeStages.includes(group.number);
          const x = 15 + index * 221;
          return (
            <g key={group.title} opacity={focused ? 1 : 0.25}>
              <rect
                x={x}
                y="75"
                width="205"
                height="184"
                rx="8"
                fill={group.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={group.color}
                strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
              />
              <circle cx={x + 27} cy="103" r="15" fill={group.color} />
              <text
                x={x + 27}
                y="108"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {group.number}
              </text>
              <text
                x={x + 50}
                y="108"
                fontSize="12.5"
                fontWeight="700"
                fill={primary}
              >
                {group.title}
              </text>
              <rect
                x={x + 12}
                y="132"
                width="181"
                height="42"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 102.5}
                y="157"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={primary}
              >
                {group.stages}
              </text>
              <text x={x + 13} y="203" fontSize="11" fill={secondary}>
                阶段输出
              </text>
              <text x={x + 13} y="224" fontSize="11" fill={primary}>
                {group.result}
              </text>
            </g>
          );
        })}
        {[210, 431, 652].map((x) => (
          <path
            key={x}
            d={`M${x} 167 H${x + 23} M${x + 15} 159 L${x + 24} 167 L${x + 15} 175`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <rect
          x="205"
          y="286"
          width="490"
          height="28"
          rx="6"
          fill={accent}
          fillOpacity="0.06"
          stroke={accent}
          strokeOpacity="0.4"
        />
        <text
          x="450"
          y="304"
          textAnchor="middle"
          fontSize="11"
          fill={primary}
        >
          compute shader 单独 dispatch；它可共享资源与同步机制，但不会穿过上述
          draw 阶段
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          一次 draw 的完整路径
        </p>
        {pipelineGroups.map((group) => {
          const focused = activeStages.includes(group.number);
          return (
            <div
              key={group.title}
              className="rounded-control border bg-bg/40 p-3 transition-opacity"
              style={{
                borderColor: group.color,
                opacity: focused ? 1 : 0.32,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {group.number}. {group.title}
                </strong>
                <span
                  className="text-right font-mono text-[9px]"
                  style={{ color: group.color }}
                >
                  {group.stages}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{group.result}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const interfaceRows = [
  ["location", "layout(location = 0)", "显式资源位置"],
  ["type", "vec3 ↔ vec3", "基本类型与数组形状匹配"],
  ["qualifier", "smooth / flat / noperspective", "决定光栅化插值规则"],
] as const;

export function GlsStageInterfaceDiagram() {
  return (
    <DiagramFrame caption="阶段间数据不是按变量名运行时拷贝；链接器先核对接口，光栅化阶段再按限定符为片段生成输入。">
      <svg
        viewBox="0 0 860 320"
        role="img"
        aria-label="着色器生产者 out 经过程序链接接口检查和光栅化插值进入消费者 in"
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
          stage-to-stage 接口契约
        </text>
        {[
          [35, "生产阶段", "out VS_OUT { vec3 color; }", accent],
          [330, "链接 + 插值", "match → raster interpolation", warning],
          [625, "消费阶段", "in VS_OUT { vec3 color; }", success],
        ].map(([x, title, code, color]) => (
          <g key={String(title)}>
            <rect
              x={Number(x)}
              y="64"
              width="200"
              height="82"
              rx="8"
              fill={String(color)}
              fillOpacity="0.08"
              stroke={String(color)}
            />
            <text
              x={Number(x) + 100}
              y="91"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
            >
              {title}
            </text>
            <text
              x={Number(x) + 100}
              y="119"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="11"
              fill={secondary}
            >
              {code}
            </text>
          </g>
        ))}
        {[235, 530].map((x) => (
          <path
            key={x}
            d={`M${x} 105 H${x + 80} M${x + 70} 96 L${x + 81} 105 L${x + 70} 114`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        {interfaceRows.map((row, index) => {
          const y = 178 + index * 39;
          return (
            <g key={row[0]}>
              <rect
                x="90"
                y={y}
                width="680"
                height="31"
                rx="5"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <text
                x="112"
                y={y + 20}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="270"
                y={y + 20}
                fontFamily="monospace"
                fontSize="11"
                fill={accent}
              >
                {row[1]}
              </text>
              <text x="515" y={y + 20} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          out → 链接/插值 → in
        </p>
        {interfaceRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p className="mt-1 break-words font-mono text-[11px] text-accent">
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const tessellationStages = [
  ["Patch 输入", "GL_PATCHES", "控制点集合", accent],
  ["TCS", "layout(vertices=n) out", "级别 + 控制点", warning],
  ["Primitive generator", "fixed function", "生成参数域坐标", success],
  ["TES", "gl_TessCoord", "求值为裁剪空间顶点", danger],
] as const;

export function GlsTessellationDiagram() {
  return (
    <DiagramFrame caption="OpenGL 曲面细分的正确名称是 Tessellation Control Shader、固定 primitive generator 与 Tessellation Evaluation Shader。">
      <svg
        viewBox="0 0 880 300"
        role="img"
        aria-label="OpenGL patch 依次经过曲面细分控制着色器、固定图元生成器和曲面细分求值着色器"
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
      >
        <text
          x="440"
          y="29"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          Patch 如何变成细分图元
        </text>
        {tessellationStages.map((stage, index) => {
          const x = 20 + index * 218;
          return (
            <g key={stage[0]}>
              <rect
                x={x}
                y="70"
                width="195"
                height="145"
                rx="8"
                fill={stage[3]}
                fillOpacity="0.08"
                stroke={stage[3]}
              />
              <text
                x={x + 97.5}
                y="101"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={primary}
              >
                {stage[0]}
              </text>
              <rect
                x={x + 12}
                y="119"
                width="171"
                height="34"
                rx="5"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 97.5}
                y="140"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={stage[3]}
              >
                {stage[1]}
              </text>
              <text
                x={x + 97.5}
                y="184"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {stage[2]}
              </text>
            </g>
          );
        })}
        {[215, 433, 651].map((x) => (
          <path
            key={x}
            d={`M${x} 143 H${x + 22} M${x + 14} 135 L${x + 23} 143 L${x + 14} 151`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <text
          x="440"
          y="251"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          三角形域：p = u p₀ + v p₁ + w p₂，且 u + v + w = 1
        </text>
        <text
          x="440"
          y="275"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          TCS 可选但 TES 存在时通常配套；generator 是固定功能，不是 shader
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Patch 的 OpenGL 细分链
        </p>
        {tessellationStages.map((stage, index) => (
          <div
            key={stage[0]}
            className="rounded-control border p-3"
            style={{ borderColor: stage[3] }}
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">
                {index + 1}. {stage[0]}
              </strong>
              <span
                className="text-right font-mono text-[10px]"
                style={{ color: stage[3] }}
              >
                {stage[1]}
              </span>
            </div>
            <p className="mt-2 text-xs text-secondary">{stage[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const lifecycle = [
  ["GLSL source", "glShaderSource", "源代码与版本声明"],
  ["Compile", "glCompileShader", "status + shader info log"],
  ["Link", "glLinkProgram", "接口匹配 + program log"],
  ["Examine / use", "glGetProgramResource*", "自省后 glUseProgram"],
] as const;

export function GlsProgramLifecycleDiagram() {
  return (
    <DiagramFrame caption="编译只验证单个 shader；链接才建立跨阶段可执行程序。成功后仍可通过 program interface 查询实际资源。">
      <svg
        viewBox="0 0 880 320"
        role="img"
        aria-label="GLSL 源代码经过着色器编译、程序链接、接口自省后成为可使用程序"
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
          从 GLSL 到可执行 program
        </text>
        {lifecycle.map((stage, index) => {
          const x = 20 + index * 217;
          const color = [accent, warning, success, danger][index];
          return (
            <g key={stage[0]}>
              <circle cx={x + 22} cy="91" r="15" fill={color} />
              <text
                x={x + 22}
                y="96"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {index + 1}
              </text>
              <rect
                x={x}
                y="115"
                width="194"
                height="105"
                rx="8"
                fill={color}
                fillOpacity="0.08"
                stroke={color}
              />
              <text
                x={x + 97}
                y="144"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={primary}
              >
                {stage[0]}
              </text>
              <text
                x={x + 97}
                y="170"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={color}
              >
                {stage[1]}
              </text>
              <text
                x={x + 97}
                y="196"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {stage[2]}
              </text>
            </g>
          );
        })}
        {[214, 431, 648].map((x) => (
          <path
            key={x}
            d={`M${x} 169 H${x + 22} M${x + 14} 161 L${x + 23} 169 L${x + 14} 177`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <rect
          x="160"
          y="253"
          width="560"
          height="38"
          rx="6"
          fill={accent}
          fillOpacity="0.05"
          stroke={accent}
          strokeOpacity="0.5"
        />
        <text
          x="440"
          y="277"
          textAnchor="middle"
          fontSize="11"
          fill={primary}
        >
          单体 program：glUseProgram　｜　separable programs：glUseProgramStages
          + program pipeline
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          GLSL program 生命周期
        </p>
        {lifecycle.map((stage, index) => (
          <div
            key={stage[0]}
            className="rounded-control border border-border p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">
                {index + 1}. {stage[0]}
              </strong>
              <span className="font-mono text-[10px] text-accent">
                {stage[1]}
              </span>
            </div>
            <p className="mt-2 text-xs text-secondary">{stage[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const invocationRows = [
  ["Vertex", "索引后的顶点调用（受缓存影响）", "pipeline statistics / timer"],
  ["TCS", "patch 数 × 输出控制点调用", "patches + shader invocations"],
  ["TES", "细分器生成的域坐标数量", "generated primitives"],
  [
    "Geometry",
    "输入图元 × invocations，输出有上限",
    "GS invocations/primitives",
  ],
  [
    "Fragment",
    "覆盖 × samples，并受 early tests 影响",
    "samples passed + timer",
  ],
] as const;

export function GlsInvocationEvidenceDiagram() {
  return (
    <DiagramFrame caption="执行次数由输入、细分级别、覆盖率、采样数和测试共同决定；先用查询与 GPU 时间证据定位瓶颈。">
      <svg
        viewBox="0 0 860 340"
        role="img"
        aria-label="各着色阶段调用粒度、工作量决定因素和可测量证据对照表"
        className="mx-auto hidden h-auto w-full max-w-[860px] md:block"
      >
        <text
          x="430"
          y="27"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          没有一个阶段永远最贵
        </text>
        <text x="28" y="64" fontSize="11" fill={secondary}>
          阶段
        </text>
        <text x="165" y="64" fontSize="11" fill={secondary}>
          调用量由什么决定
        </text>
        <text x="585" y="64" fontSize="11" fill={secondary}>
          应采集的证据
        </text>
        {invocationRows.map((row, index) => {
          const y = 78 + index * 45;
          const color = [accent, warning, success, danger, accent][index];
          return (
            <g key={row[0]}>
              <rect
                x="20"
                y={y}
                width="820"
                height="34"
                rx="5"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="39" cy={y + 17} r="6" fill={color} />
              <text
                x="54"
                y={y + 21}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text x="165" y={y + 21} fontSize="11" fill={primary}>
                {row[1]}
              </text>
              <text
                x="585"
                y={y + 21}
                fontFamily="monospace"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <rect
          x="115"
          y="311"
          width="630"
          height="23"
          rx="5"
          fill={warning}
          fillOpacity="0.08"
          stroke={warning}
          strokeOpacity="0.5"
        />
        <text x="430" y="327" textAnchor="middle" fontSize="11" fill={primary}>
          计数器说明规模，timer query / profiler 才说明耗时；二者应一起看
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          阶段工作量与证据
        </p>
        {invocationRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p className="mt-1 text-xs text-primary">{row[1]}</p>
            <p className="mt-1 break-words font-mono text-[10px] text-secondary">
              {row[2]}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
