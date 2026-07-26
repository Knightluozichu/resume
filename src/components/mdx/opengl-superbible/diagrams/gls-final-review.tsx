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
          fontSize="11"
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
                strokeWidth={focused && active.length < 4 ? 2.5 : 1.2}
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
                fontSize="11.5"
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
                fontSize="11"
                fill={stage.color}
              >
                {stage.code}
              </text>
              <text x={x + 13} y="199" fontSize="11" fill={secondary}>
                可核查结果
              </text>
              <text x={x + 13} y="221" fontSize="11" fill={primary}>
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
          fontSize="11"
          fill={primary}
        >
          接口、数据、空间、同步、图像、时间和错误日志必须形成同一条证据链
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
              className="rounded-control border bg-bg/40 p-3 transition-opacity"
              style={{ borderColor: stage.color, opacity: focused ? 1 : 0.32 }}
            >
              <div className="flex items-start justify-between gap-3">
                <strong className="text-sm text-primary">
                  {number}. {stage.title}
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

const reviewStages = [
  {
    title: "Contract",
    code: "context / objects / GLSL",
    result: "合法 program 与资源",
    color: accent,
  },
  {
    title: "Pipeline",
    code: "vertex → primitive → pixel",
    result: "可解释 framebuffer",
    color: warning,
  },
  {
    title: "Compute + data",
    code: "dispatch / SSBO / image",
    result: "正确 producer-consumer",
    color: success,
  },
  {
    title: "Evidence",
    code: "query / debug / reference",
    result: "可回归交付",
    color: danger,
  },
] as const;

export function GlsFinalReviewDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
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
      title="OpenGL 7e：从接口契约到可回归渲染器"
      subtitle="contract · graphics pipeline · compute/data · evidence"
      stages={reviewStages}
      active={active}
      ariaLabel="OpenGL全书从接口契约图形管线计算数据到验证证据的整合主链"
      caption="总复习不是技术名词拼盘，而是把对象生命周期、图形与计算管线、数据同步、画质和诊断接成可重建的系统。"
    />
  );
}

const dispatchStages = [
  {
    title: "Dispatch grid",
    code: "ceil(N / localSize)",
    result: "足够的 work groups",
    color: accent,
  },
  {
    title: "Work group",
    code: "gl_WorkGroupID",
    result: "局部分块坐标",
    color: warning,
  },
  {
    title: "Invocation",
    code: "gl_LocalInvocationID",
    result: "组内 lane 坐标",
    color: success,
  },
  {
    title: "Global ID",
    code: "gl_GlobalInvocationID",
    result: "边界检查后访问数据",
    color: danger,
  },
] as const;

export function GlsComputeDispatchDiagram() {
  return (
    <StageDiagram
      title="Dispatch 建立三层执行坐标"
      subtitle="num groups × local size = invocation domain"
      stages={dispatchStages}
      ariaLabel="计算着色器dispatch工作组局部调用和全局调用坐标"
      caption="local size 写在 shader 中，dispatch 参数是 work-group 数量；总 invocation 域可能大于数据域，因此每个 invocation 必须做 bounds check。"
    />
  );
}

const groupStages = [
  {
    title: "Load tile",
    code: "shared tile[]",
    result: "每 lane 搬一部分",
    color: accent,
  },
  {
    title: "Publish",
    code: "barrier()",
    result: "组内到达同步点",
    color: warning,
  },
  {
    title: "Cooperate",
    code: "stride / scan / reduce",
    result: "共享邻居数据",
    color: success,
  },
  {
    title: "Write result",
    code: "SSBO / imageStore",
    result: "每元素唯一写者",
    color: danger,
  },
] as const;

export function GlsWorkGroupDiagram() {
  return (
    <StageDiagram
      title="Work Group 是局部协作边界"
      subtitle="load · synchronize · cooperate · publish"
      stages={groupStages}
      ariaLabel="计算工作组通过共享内存加载同步协作和写出结果"
      caption="Shared memory 只在一个 work group 内共享；barrier 必须由所有活动 invocations 在一致控制流中到达，不能同步其他 work groups。"
    />
  );
}

const memoryStages = [
  {
    title: "Invocation",
    code: "register / local",
    result: "单 invocation 私有",
    color: accent,
  },
  {
    title: "Work-group",
    code: "shared + barrier",
    result: "组内通信",
    color: warning,
  },
  {
    title: "Dispatch output",
    code: "SSBO / image / atomic",
    result: "跨组结果资源",
    color: success,
  },
  {
    title: "Next consumer",
    code: "glMemoryBarrier(bits)",
    result: "API 边界可见",
    color: danger,
  },
] as const;

export function GlsComputeMemoryDiagram() {
  return (
    <StageDiagram
      title="内存域决定同步工具"
      subtitle="private · shared · resource · API consumer"
      stages={memoryStages}
      ariaLabel="计算着色器私有共享资源内存和API内存屏障层次"
      caption="Shader 内 barrier 解决组内协作；dispatch 结束后的 SSBO、image、texture fetch、vertex 或 indirect command 消费由匹配的 API memory barrier bits 连接。"
    />
  );
}

const pipelineStages = [
  {
    title: "Produce",
    code: "dispatch compute",
    result: "写 image / SSBO / command",
    color: accent,
  },
  {
    title: "Declare edge",
    code: "consumer barrier bit",
    result: "精确可见性契约",
    color: warning,
  },
  {
    title: "Consume",
    code: "dispatch / draw / sample",
    result: "后续阶段读正确数据",
    color: success,
  },
  {
    title: "Validate",
    code: "CPU reference + query",
    result: "值、图像和时间一致",
    color: danger,
  },
] as const;

export function GlsComputePipelineDiagram() {
  return (
    <StageDiagram
      title="Compute 必须接入明确的 Producer-Consumer Graph"
      subtitle="write → visibility edge → read → evidence"
      stages={pipelineStages}
      ariaLabel="计算着色器生产资源内存屏障后续消费与验证链"
      caption="`GL_SHADER_STORAGE_BARRIER_BIT`、`GL_SHADER_IMAGE_ACCESS_BARRIER_BIT`、`GL_TEXTURE_FETCH_BARRIER_BIT` 和 `GL_COMMAND_BARRIER_BIT` 由下一消费者决定。"
    />
  );
}

const integrationStages = [
  {
    title: "Foundations",
    code: "context / math / GLSL",
    result: "可定位 triangle 与变换",
    color: accent,
  },
  {
    title: "Graphics",
    code: "vertex / primitive / fragment",
    result: "stage-to-stage contracts",
    color: warning,
  },
  {
    title: "Data + compute",
    code: "buffer / texture / dispatch",
    result: "资源与依赖图",
    color: success,
  },
  {
    title: "Operations",
    code: "query / AZDO / debug",
    result: "性能稳定性闭环",
    color: danger,
  },
] as const;

export function GlsBookIntegrationDiagram() {
  return (
    <StageDiagram
      title="十五章收敛为四层渲染器"
      subtitle="foundations · graphics · data/compute · operations"
      stages={integrationStages}
      ariaLabel="OpenGL十五章基础图形管线数据计算和运行保障四层整合"
      caption="每层都向下一层提供显式契约：数学空间和对象状态、阶段接口、资源生产消费、最终查询调试与恢复证据。"
    />
  );
}

const acceptanceStages = [
  {
    title: "Correctness",
    code: "CPU oracle / invariants",
    result: "数值和边界通过",
    color: accent,
  },
  {
    title: "Visual",
    code: "reference / diff",
    result: "像素与状态可解释",
    color: warning,
  },
  {
    title: "Performance",
    code: "median / p95 / counters",
    result: "固定 workload 分布",
    color: success,
  },
  {
    title: "Stability",
    code: "debug / reset / rebuild",
    result: "坏输入与恢复通过",
    color: danger,
  },
] as const;

export function GlsAcceptanceMatrixDiagram() {
  return (
    <StageDiagram
      title="交付验收必须同时覆盖四条轴"
      subtitle="correctness · visual · performance · stability"
      stages={acceptanceStages}
      ariaLabel="OpenGL数值正确性视觉性能和稳定性四轴验收矩阵"
      caption="只看一张最终截图无法验收 compute 或渲染器；需要 CPU oracle、reference image、时间分布、debug output 和 reset recovery。"
    />
  );
}
