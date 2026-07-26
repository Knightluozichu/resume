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

const lifecycleStages = [
  {
    number: 1,
    title: "Framework run",
    code: "context + gl3w + callbacks",
    state: "当前线程拥有 core context",
    evidence: "vendor/version/renderer",
    color: accent,
  },
  {
    number: 2,
    title: "startup()",
    code: "compile/link + VAO",
    state: "program 可执行，VAO 有效",
    evidence: "compile/link status + log",
    color: warning,
  },
  {
    number: 3,
    title: "render(time)",
    code: "clear + use + bind + draw",
    state: "命令进入当前 context",
    evidence: "framebuffer + debug output",
    color: success,
  },
  {
    number: 4,
    title: "shutdown()",
    code: "delete VAO + program",
    state: "上下文仍有效时释放",
    evidence: "生命周期成对闭合",
    color: danger,
  },
] as const;

export function GlsFirstProgramDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const activeStages =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];

  return (
    <DiagramFrame caption="官方示例把平台循环放在 sb7 框架中；章节代码只实现初始化资源、提交帧命令和释放资源。">
      <svg
        viewBox="0 0 840 330"
        role="img"
        aria-label="sb7 application 从创建上下文、startup、render 到 shutdown 的第一程序生命周期"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          第一程序的真实主链：框架 → startup → render → shutdown
        </text>
        <text x="420" y="49" textAnchor="middle" fontSize="11" fill={secondary}>
          每一步都要留下状态与失败证据
        </text>
        {lifecycleStages.map((stage, index) => {
          const focused = activeStages.includes(stage.number);
          const x = 16 + index * 207;
          return (
            <g key={stage.title} opacity={focused ? 1 : 0.25}>
              <rect
                x={x}
                y="72"
                width="188"
                height="194"
                rx="8"
                fill={stage.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={stage.color}
                strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
              />
              <circle cx={x + 25} cy="99" r="14" fill={stage.color} />
              <text
                x={x + 25}
                y="104"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {stage.number}
              </text>
              <text
                x={x + 48}
                y="104"
                fontSize="12.2"
                fontWeight="700"
                fill={primary}
              >
                {stage.title}
              </text>
              <rect
                x={x + 13}
                y="127"
                width="162"
                height="38"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 94}
                y="150"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fill={primary}
              >
                {stage.code}
              </text>
              <text x={x + 14} y="190" fontSize="11" fill={secondary}>
                状态
              </text>
              <text
                x={x + 14}
                y="208"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {stage.state}
              </text>
              <text x={x + 14} y="232" fontSize="11" fill={secondary}>
                证据 · {stage.evidence}
              </text>
            </g>
          );
        })}
        {[204, 411, 618].map((x) => (
          <path
            key={x}
            d={`M${x} 169 H${x + 18} M${x + 11} 162 L${x + 19} 169 L${x + 11} 176`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <text
          x="420"
          y="302"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          swap buffers 与 poll events 由框架循环完成，不属于 render() 内的
          OpenGL 主链
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          sb7 应用生命周期
        </p>
        {lifecycleStages.map((stage) => {
          const focused = activeStages.includes(stage.number);
          return (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3 transition-opacity"
              style={{
                borderColor: stage.color,
                opacity: focused ? 1 : 0.32,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {stage.number}. {stage.title}
                </strong>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: stage.color }}
                >
                  {stage.code}
                </span>
              </div>
              <p className="mt-2 text-xs text-primary">{stage.state}</p>
              <p className="mt-1 text-xs text-secondary">{stage.evidence}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const boundaryRows = [
  ["平台层", "GLFW", "窗口、context、事件、swap", "可替换为 SDL/EGL/WGL 等"],
  [
    "加载层",
    "gl3w",
    "取得当前 context 的函数入口",
    "不是 GLAD；必须在 context 后初始化",
  ],
  [
    "示例层",
    "sb7::application",
    "run/startup/render/shutdown",
    "原书教学生命周期",
  ],
  [
    "OpenGL",
    "core commands",
    "shader、VAO、clear、draw",
    "章节真正要学习的契约",
  ],
] as const;

export function GlsFrameworkBoundaryDiagram() {
  return (
    <DiagramFrame caption="框架依赖可以替换，OpenGL 对象与命令语义不能混进 GLFW、gl3w 或窗口系统。">
      <svg
        viewBox="0 0 840 350"
        role="img"
        aria-label="GLFW gl3w sb7 application 与 OpenGL core commands 的职责边界"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          四层边界：平台、加载、示例框架、OpenGL
        </text>
        <text x="30" y="65" fontSize="11" fill={secondary}>
          层
        </text>
        <text x="150" y="65" fontSize="11" fill={secondary}>
          官方仓库实现
        </text>
        <text x="320" y="65" fontSize="11" fill={secondary}>
          职责
        </text>
        <text x="590" y="65" fontSize="11" fill={secondary}>
          学习边界
        </text>
        {boundaryRows.map((row, index) => {
          const y = 78 + index * 53;
          const color = [accent, warning, success, danger][index];
          return (
            <g key={row[0]}>
              <rect
                x="22"
                y={y}
                width="796"
                height="41"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="42" cy={y + 20} r="7" fill={color} />
              <text
                x="58"
                y={y + 25}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="150"
                y={y + 25}
                fontSize="11"
                fontFamily="monospace"
                fill={color}
              >
                {row[1]}
              </text>
              <text x="320" y={y + 25} fontSize="11" fill={primary}>
                {row[2]}
              </text>
              <text x="590" y={y + 25} fontSize="11" fill={secondary}>
                {row[3]}
              </text>
            </g>
          );
        })}
        <text
          x="420"
          y="320"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          GLFW 与 gl3w 存在于框架内部；旧章写成 GLFW + GLAD，既换了加载器也丢了
          sb7 生命周期
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          官方示例的四层边界
        </p>
        {boundaryRows.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">{row[0]}</strong>
              <span
                className="font-mono text-[11px]"
                style={{ color: [accent, warning, success, danger][index] }}
              >
                {row[1]}
              </span>
            </div>
            <p className="mt-2 text-xs text-primary">{row[2]}</p>
            <p className="mt-1 text-xs text-secondary">{row[3]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const shaderStages = [
  ["Create", "glCreateShader", "获得 shader object 名称"],
  ["Source", "glShaderSource", "复制/引用 GLSL 源片段"],
  ["Compile", "glCompileShader", "检查 COMPILE_STATUS + info log"],
  ["Attach", "glAttachShader", "把 vertex/fragment 交给 program"],
  ["Link", "glLinkProgram", "检查 LINK_STATUS + program log"],
  ["Use", "glUseProgram", "后续 draw 使用链接结果"],
] as const;

export function GlsShaderProgramDiagram() {
  return (
    <DiagramFrame caption="Shader 编译成功不等于 program 可用；链接还要验证跨阶段接口并保留独立日志。">
      <svg
        viewBox="0 0 840 345"
        role="img"
        aria-label="从创建 shader、设置源码、编译、附加、链接到使用 program 的完整链路"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          Shader object → Program object：两级验证链
        </text>
        {shaderStages.map((row, index) => {
          const x = 18 + (index % 3) * 273;
          const y = 63 + Math.floor(index / 3) * 113;
          const color = [accent, warning, success, success, danger, accent][
            index
          ];
          return (
            <g key={row[0]}>
              <rect
                x={x}
                y={y}
                width="250"
                height="88"
                rx="8"
                fill={color}
                fillOpacity="0.07"
                stroke={color}
              />
              <circle cx={x + 24} cy={y + 25} r="13" fill={color} />
              <text
                x={x + 24}
                y={y + 30}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--bg)"
              >
                {index + 1}
              </text>
              <text
                x={x + 45}
                y={y + 29}
                fontSize="12"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x={x + 14}
                y={y + 54}
                fontSize="11"
                fontFamily="monospace"
                fill={color}
              >
                {row[1]}
              </text>
              <text x={x + 14} y={y + 73} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <path
          d="M268 107 H289 M282 100 L290 107 L282 114 M541 107 H562 M555 100 L563 107 L555 114 M143 154 V174 M136 167 L143 175 L150 167 M268 220 H289 M282 213 L290 220 L282 227 M541 220 H562 M555 213 L563 220 L555 227"
          fill="none"
          stroke={border}
          strokeWidth="2"
        />
        <text
          x="420"
          y="320"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          成功后 shader object 可标记删除；program 保留链接得到的可执行代码
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Shader 与 Program 六步链
        </p>
        {shaderStages.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">
                {index + 1}. {row[0]}
              </strong>
              <span className="font-mono text-[10px] text-secondary">
                {row[1]}
              </span>
            </div>
            <p className="mt-2 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const vertexRows = [
  ["Invocation 0", "gl_VertexID = 0", "( 0.25, -0.25, 0.5, 1 )"],
  ["Invocation 1", "gl_VertexID = 1", "(-0.25, -0.25, 0.5, 1 )"],
  ["Invocation 2", "gl_VertexID = 2", "( 0.25,  0.25, 0.5, 1 )"],
] as const;

export function GlsVertexIdDiagram() {
  return (
    <DiagramFrame caption="singletri 的三个 vertex invocation 用 gl_VertexID 读取 shader 内数组；VAO 有效，但没有 attribute buffer。">
      <svg
        viewBox="0 0 840 360"
        role="img"
        aria-label="glDrawArrays 生成三个 gl VertexID 并索引着色器内顶点数组组成三角形"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          glDrawArrays(GL_TRIANGLES, 0, 3)：没有 VBO 也能生成三顶点
        </text>
        <rect
          x="24"
          y="62"
          width="300"
          height="220"
          rx="8"
          fill={accent}
          fillOpacity="0.06"
          stroke={accent}
        />
        <text
          x="174"
          y="88"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={accent}
        >
          Vertex shader invocations
        </text>
        {vertexRows.map((row, index) => {
          const y = 106 + index * 52;
          return (
            <g key={row[0]}>
              <rect
                x="39"
                y={y}
                width="270"
                height="40"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x="52"
                y={y + 17}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="52"
                y={y + 32}
                fontSize="11"
                fontFamily="monospace"
                fill={secondary}
              >
                {row[1]}
              </text>
              <text
                x="296"
                y={y + 25}
                textAnchor="end"
                fontSize="11"
                fontFamily="monospace"
                fill={accent}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <path
          d="M324 172 H385 M376 165 L386 172 L376 179"
          fill="none"
          stroke={border}
          strokeWidth="2"
        />
        <rect
          x="385"
          y="62"
          width="431"
          height="220"
          rx="8"
          fill={success}
          fillOpacity="0.06"
          stroke={success}
        />
        <text
          x="600"
          y="88"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={success}
        >
          Primitive assembly → rasterization
        </text>
        <path
          d="M487 236 L600 110 L713 236 Z"
          fill={success}
          fillOpacity="0.13"
          stroke={success}
          strokeWidth="2"
        />
        <circle cx="487" cy="236" r="6" fill={accent} />
        <circle cx="600" cy="110" r="6" fill={warning} />
        <circle cx="713" cy="236" r="6" fill={danger} />
        <text
          x="475"
          y="258"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          ID 1
        </text>
        <text
          x="600"
          y="103"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          ID 2
        </text>
        <text
          x="726"
          y="258"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          ID 0
        </text>
        <text
          x="600"
          y="310"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          count = 3 → 一个完整 triangle primitive
        </text>
        <text x="420" y="338" textAnchor="middle" fontSize="11" fill={danger}>
          VAO 是 core-profile 绘制状态；本例不用 VBO，不等于真实项目永远不需要
          buffer
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          三个 invocation 组成三角形
        </p>
        {vertexRows.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">{row[0]}</strong>
              <span className="font-mono text-[10px] text-secondary">
                {row[1]}
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] text-primary">{row[2]}</p>
            <p className="mt-1 text-xs text-secondary">
              数组索引 {index} → gl_Position
            </p>
          </div>
        ))}
        <div className="rounded-control border border-success p-3">
          <strong className="text-sm text-primary">Primitive assembly</strong>
          <p className="mt-2 text-xs text-secondary">
            3 个位置 → 1 个 triangle → rasterization → fragments
          </p>
        </div>
      </div>
    </DiagramFrame>
  );
}

const frameRows = [
  ["render()", "glClearBufferfv", "写默认 framebuffer 的 color attachment"],
  ["render()", "glUseProgram", "选择 vertex + fragment 可执行代码"],
  ["render()", "glBindVertexArray", "选择合法 vertex array state"],
  ["render()", "glDrawArrays", "提交 3 个 vertex，组装 triangle"],
  ["framework", "glfwSwapBuffers", "把 back buffer 显示到窗口"],
  ["framework", "glfwPollEvents", "分发平台输入与窗口事件"],
] as const;

export function GlsFrameLoopDiagram() {
  return (
    <DiagramFrame caption="一帧包含 OpenGL 命令与平台循环两部分；swap 是窗口系统操作，draw 只写当前 draw framebuffer。">
      <svg
        viewBox="0 0 840 350"
        role="img"
        aria-label="render clear use program bind vertex array draw arrays 与框架 swap poll events 的帧循环"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          一帧命令：render() 写 back buffer，框架负责显示与事件
        </text>
        {frameRows.map((row, index) => {
          const x = 20 + (index % 3) * 273;
          const y = 62 + Math.floor(index / 3) * 119;
          const color = row[0] === "render()" ? success : accent;
          return (
            <g key={row[1]}>
              <rect
                x={x}
                y={y}
                width="250"
                height="92"
                rx="8"
                fill={color}
                fillOpacity="0.07"
                stroke={color}
              />
              <text x={x + 14} y={y + 23} fontSize="11" fill={secondary}>
                {row[0]}
              </text>
              <text
                x={x + 14}
                y={y + 45}
                fontSize="11"
                fontFamily="monospace"
                fontWeight="700"
                fill={primary}
              >
                {row[1]}
              </text>
              <text x={x + 14} y={y + 69} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <path
          d="M270 108 H293 M286 101 L294 108 L286 115 M543 108 H566 M559 101 L567 108 L559 115 M145 154 V180 M138 173 L145 181 L152 173 M270 227 H293 M286 220 L294 227 L286 234 M543 227 H566 M559 220 L567 227 L559 234"
          fill="none"
          stroke={border}
          strokeWidth="2"
        />
        <path
          d="M704 284 C704 327 136 327 136 284 M129 292 L136 283 L143 292"
          fill="none"
          stroke={border}
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <text
          x="420"
          y="334"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          下一帧重新执行 render；对象持续存在，命令和 back-buffer 内容持续变化
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          render 与框架共同组成帧循环
        </p>
        {frameRows.map((row, index) => (
          <div
            key={row[1]}
            className="rounded-control border border-border p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="font-mono text-[11px] text-primary">
                {row[1]}
              </strong>
              <span
                className="text-xs"
                style={{ color: index < 4 ? success : accent }}
              >
                {row[0]}
              </span>
            </div>
            <p className="mt-2 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
