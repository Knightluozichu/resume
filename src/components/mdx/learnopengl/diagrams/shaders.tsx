import type { ReactNode } from "react";

export { InterpolationDiagram } from "../../diagrams/interpolation-diagram";
export { ShaderIODiagram } from "../../diagrams/shader-io-diagram";

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
          fontSize="10.5"
          fill={secondary}
        >
          {subtitle}
        </text>
        {stages.map((stage, index) => {
          const n = index + 1;
          const focused = active.includes(n);
          const x = 15 + index * 221;
          return (
            <g key={stage.title} opacity={focused ? 1 : 0.25} data-stage={n}>
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
                {n}
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
                fontSize="9"
                fill={stage.color}
              >
                {stage.code}
              </text>
              <text x={x + 13} y="199" fontSize="9.5" fill={secondary}>
                证据
              </text>
              <text x={x + 13} y="221" fontSize="9.8" fill={primary}>
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
          fontSize="10.2"
          fill={primary}
        >
          数据通道必须同时满足类型、名称或 location、生命周期和当前 program 契约
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">{title}</p>
          <p className="mt-1 text-xs text-secondary">{subtitle}</p>
        </div>
        {stages.map((stage, index) => {
          const n = index + 1;
          const focused = active.includes(n);
          return (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: stage.color, opacity: focused ? 1 : 0.32 }}
            >
              <div className="flex items-start justify-between gap-3">
                <strong className="text-sm text-primary">
                  {n}. {stage.title}
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

const contractStages = [
  {
    title: "Vertex inputs",
    code: "attributes + uniforms",
    result: "每顶点数据和全局参数",
    color: accent,
  },
  {
    title: "Stage interface",
    code: "out ↔ in",
    result: "link-time 类型匹配",
    color: warning,
  },
  {
    title: "Interpolation",
    code: "vertex values → fragments",
    result: "逐片段 varying",
    color: success,
  },
  {
    title: "Fragment output",
    code: "out vec4 → attachment",
    result: "颜色进入 framebuffer",
    color: danger,
  },
] as const;

export function ShaderContractDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const active =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];
  return (
    <StageDiagram
      title="Shader 是阶段间数据契约"
      subtitle="attributes/uniforms · interface · interpolation · output"
      stages={contractStages}
      active={active}
      ariaLabel="着色器顶点属性uniform阶段接口插值与片段输出数据契约"
      caption="Attribute 随 invocation 变化，uniform 对一次 draw 保持一致，out/in 经 link 建立接口，光栅化再插值成逐片段输入。"
    />
  );
}

const typeStages = [
  {
    title: "Scalar",
    code: "bool · int · uint · float",
    result: "明确数值域",
    color: accent,
  },
  {
    title: "Vector",
    code: "vec · ivec · uvec · bvec",
    result: "分量运算与 swizzle",
    color: warning,
  },
  {
    title: "Matrix",
    code: "mat2 · mat3 · mat4",
    result: "列主序线性变换",
    color: success,
  },
  {
    title: "Opaque",
    code: "sampler · image",
    result: "资源句柄不可随意复制",
    color: danger,
  },
] as const;

export function ShaderTypeSystemDiagram() {
  return (
    <StageDiagram
      title="GLSL 类型决定接口和上传函数"
      subtitle="scalar · vector · matrix · opaque resource types"
      stages={typeStages}
      ariaLabel="GLSL标量向量矩阵与不透明资源类型系统"
      caption="CPU 上传函数必须与 active uniform 类型和分量数匹配；向量 swizzle 可重排分量，但不能越过源向量维度。"
    />
  );
}

const classStages = [
  {
    title: "Read files",
    code: "vertexPath + fragmentPath",
    result: "完整 source 与路径错误",
    color: accent,
  },
  {
    title: "Compile stages",
    code: "status + info log",
    result: "逐阶段诊断",
    color: warning,
  },
  {
    title: "Link program",
    code: "interface + link log",
    result: "可执行 program",
    color: success,
  },
  {
    title: "Use + destroy",
    code: "cache locations · delete",
    result: "稳定更新与资源释放",
    color: danger,
  },
] as const;

export function ShaderClassLifecycleDiagram() {
  return (
    <StageDiagram
      title="Shader Class 封装的是生命周期，不是隐藏错误"
      subtitle="read · compile · link · cache/use/destroy"
      stages={classStages}
      ariaLabel="着色器类读取文件编译阶段链接程序缓存位置和释放资源生命周期"
      caption="封装必须保留 shader/program logs 与 source path；成功 link 后删除临时 shader objects，program 由 RAII 或显式 destroy 释放。"
    />
  );
}
