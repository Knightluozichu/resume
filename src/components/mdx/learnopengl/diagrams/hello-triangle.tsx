import type { ReactNode } from "react";

export { VertexPipelineDiagram } from "../../diagrams/vertex-pipeline-diagram";

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

type Stage = { title: string; code: string; result: string; color: string };

function StageDiagram({
  title,
  subtitle,
  stages,
  caption,
  ariaLabel,
  active = [1, 2, 3, 4],
}: {
  title: string;
  subtitle: string;
  stages: readonly Stage[];
  caption: string;
  ariaLabel: string;
  active?: readonly number[];
}) {
  return (
    <DiagramFrame caption={caption}>
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label={ariaLabel}
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
          {title}
        </text>
        <text
          x="450"
          y="49"
          textAnchor="middle"
          fontSize="11.5"
          fill={secondary}
        >
          {subtitle}
        </text>
        {stages.map((stage, index) => {
          const number = index + 1;
          const focused = active.includes(number);
          const x = 15 + index * 221;
          return (
            <g
              key={stage.title}
              opacity={focused ? 1 : 0.25}
              data-stage={number}
            >
              <rect
                x={x}
                y="76"
                width="205"
                height="180"
                rx="8"
                fill={stage.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={stage.color}
                strokeWidth={active.length < 4 && focused ? 2.5 : 1.2}
              />
              <circle cx={x + 26} cy="104" r="15" fill={stage.color} />
              <text
                x={x + 26}
                y="109"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {number}
              </text>
              <text
                x={x + 48}
                y="109"
                fontSize="11.4"
                fontWeight="700"
                fill={primary}
              >
                {stage.title}
              </text>
              <rect
                x={x + 12}
                y="133"
                width="181"
                height="38"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 102.5}
                y="156"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11.5"
                fill={stage.color}
              >
                {stage.code}
              </text>
              <text x={x + 13} y="199" fontSize="11.5" fill={secondary}>
                结果
              </text>
              <text x={x + 13} y="221" fontSize="11.5" fill={primary}>
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
          x="145"
          y="282"
          width="610"
          height="30"
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
          fontSize="11.5"
          fill={primary}
        >
          每个对象和状态都要能回答：谁创建、谁捕获、绘制时谁必须重新绑定
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">{title}</p>
          <p className="mt-1 text-xs text-secondary">{subtitle}</p>
        </div>
        {stages.map((stage, index) => {
          const number = index + 1;
          const focused = active.includes(number);
          return (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: stage.color, opacity: focused ? 1 : 0.32 }}
            >
              <div className="flex items-start justify-between gap-3">
                <strong className="text-sm text-primary">
                  {number}. {stage.title}
                </strong>
                <span
                  className="font-mono text-[9px]"
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

const lifecycle = [
  {
    title: "Source + data",
    code: "GLSL · vertices · indices",
    result: "CPU 侧权威输入",
    color: accent,
  },
  {
    title: "Create objects",
    code: "program · VBO · VAO · EBO",
    result: "合法 GPU objects",
    color: warning,
  },
  {
    title: "Capture contract",
    code: "attrib pointer + element buffer",
    result: "VAO 保存读取规则",
    color: success,
  },
  {
    title: "Draw + verify",
    code: "use · bind · draw · log",
    result: "三角形和诊断证据",
    color: danger,
  },
] as const;

export function HelloTriangleLifecycleDiagram() {
  return (
    <StageDiagram
      title="第一个三角形是一组对象契约"
      subtitle="author inputs → create → capture → draw and verify"
      stages={lifecycle}
      ariaLabel="三角形从着色器顶点索引到程序缓冲顶点数组状态和绘制验证的对象生命周期"
      caption="VBO 存 bytes，VAO 捕获 attribute 与 element-buffer 读取状态，program 定义阶段逻辑；绘制时 program 和 VAO 都必须有效。"
    />
  );
}

const shaderStages = [
  {
    title: "Create shader",
    code: "glCreateShader(type)",
    result: "阶段 object",
    color: accent,
  },
  {
    title: "Compile",
    code: "source + status + log",
    result: "每阶段独立通过",
    color: warning,
  },
  {
    title: "Link program",
    code: "attach + link + log",
    result: "接口匹配的 executable",
    color: success,
  },
  {
    title: "Detach/delete",
    code: "program owns executable",
    result: "临时 shader 可释放",
    color: danger,
  },
] as const;

export function TriangleShaderLifecycleDiagram() {
  return (
    <StageDiagram
      title="Compile 与 Link 是两道独立门"
      subtitle="shader objects are temporary; linked program is the draw-time executable"
      stages={shaderStages}
      ariaLabel="顶点片段着色器创建编译日志程序链接接口检查与临时对象释放"
      caption="Compile status 只证明单个 shader 合法；link status 还要验证阶段接口。Program 成功链接后可 detach/delete 临时 shader objects。"
    />
  );
}

const vaoStages = [
  {
    title: "Bind VAO",
    code: "glBindVertexArray",
    result: "选择状态容器",
    color: accent,
  },
  {
    title: "Bind VBO",
    code: "GL_ARRAY_BUFFER",
    result: "pointer 调用读取当前 binding",
    color: warning,
  },
  {
    title: "Define attribute",
    code: "pointer + enable",
    result: "format/stride/offset/buffer",
    color: success,
  },
  {
    title: "Bind EBO",
    code: "ELEMENT_ARRAY_BUFFER",
    result: "index buffer 属于 VAO state",
    color: danger,
  },
] as const;

export function TriangleVaoCaptureDiagram() {
  return (
    <StageDiagram
      title="VAO 捕获的是读取状态，不是顶点 bytes"
      subtitle="bind VAO → bind VBO → pointer/enable → optional EBO"
      stages={vaoStages}
      ariaLabel="VAO捕获顶点属性格式缓冲关联与元素索引缓冲状态"
      caption="`glVertexAttribPointer` 把当时的 ARRAY_BUFFER 关联写进 attribute state；ELEMENT_ARRAY_BUFFER binding 本身属于当前 VAO。"
    />
  );
}

const rasterStages = [
  {
    title: "Primitive",
    code: "3 vertices → triangle",
    result: "连续边界与内部",
    color: accent,
  },
  {
    title: "Pixel grid",
    code: "viewport samples",
    result: "离散 sample locations",
    color: warning,
  },
  {
    title: "Coverage",
    code: "inside / outside",
    result: "产生 covered fragments",
    color: success,
  },
  {
    title: "Fragment output",
    code: "FragColor → framebuffer",
    result: "测试后成为像素",
    color: danger,
  },
] as const;

export function TriangleRasterizationDiagram({
  stage = 0,
}: {
  stage?: 0 | 1 | 2 | 3 | 4;
}) {
  return (
    <StageDiagram
      title="光栅化把连续图元离散成覆盖样本"
      subtitle="primitive · sample grid · coverage · fragment output"
      stages={rasterStages}
      active={stage === 0 ? [1, 2, 3, 4] : [stage]}
      ariaLabel="三角形图元像素网格覆盖判定片段输出四步光栅化"
      caption="片段不是最终像素；它还需通过深度、模板与混合等 per-fragment operations，才可能修改 framebuffer。"
    />
  );
}
