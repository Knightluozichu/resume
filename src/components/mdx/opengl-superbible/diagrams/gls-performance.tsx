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

type Stage = {
  title: string;
  signal: string;
  evidence: string;
  color: string;
};

function FourStageDiagram({
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
                fontSize="9.2"
                fill={stage.color}
              >
                {stage.signal}
              </text>
              <text x={x + 13} y="198" fontSize="9.5" fill={secondary}>
                交付证据
              </text>
              <text x={x + 13} y="220" fontSize="9.8" fill={primary}>
                {stage.evidence}
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
          x="148"
          y="282"
          width="604"
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
          每个结论都必须同时保留工作负载、时间线、画质基线和错误状态
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
                  {stage.signal}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{stage.evidence}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const measurementStages = [
  {
    title: "Instrument",
    signal: "CPU clock + GPU query",
    evidence: "frame markers / query IDs",
    color: accent,
  },
  {
    title: "Classify",
    signal: "CPU / shader / bandwidth",
    evidence: "controlled A/B result",
    color: warning,
  },
  {
    title: "Change one cause",
    signal: "batch / resident / simplify",
    evidence: "one-variable patch",
    color: success,
  },
  {
    title: "Verify + guard",
    signal: "quality / debug / reset",
    evidence: "median + p95 + reference",
    color: danger,
  },
] as const;

export function GlsPerformanceDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const active =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];
  return (
    <FourStageDiagram
      title="性能工程是一条可证伪的测量闭环"
      subtitle="instrument → classify → change one cause → verify and guard"
      stages={measurementStages}
      active={active}
      ariaLabel="从测量分类到单变量优化和稳定性回归的性能工程闭环"
      caption="先建立 CPU 与 GPU 的异步测量证据，再只改变一个原因，最后用画质、调试输出和鲁棒性状态做回归。"
    />
  );
}

const queryStages = [
  {
    title: "Frame N · CPU",
    signal: "Begin/End query",
    evidence: "只提交，不读取结果",
    color: accent,
  },
  {
    title: "Frame N · GPU",
    signal: "timestamp / samples",
    evidence: "按 GPU 时间线执行",
    color: warning,
  },
  {
    title: "Frame N+K · CPU",
    signal: "RESULT_AVAILABLE",
    evidence: "可用后再读取",
    color: success,
  },
  {
    title: "Aggregate",
    signal: "median / p95 / counters",
    evidence: "跨帧形成结论",
    color: danger,
  },
] as const;

export function GlsQueryTimelineDiagram() {
  return (
    <FourStageDiagram
      title="Query 是异步证据，不是帧内同步点"
      subtitle="CPU enqueue · GPU execute · delayed availability · aggregate"
      stages={queryStages}
      ariaLabel="OpenGL查询对象从提交到延迟读取和统计聚合的异步时间线"
      caption="Timer、occlusion 与 pipeline statistics queries 都应延迟消费；立即读取 GL_QUERY_RESULT 可能把排队时间变成 CPU stall。"
    />
  );
}

const syncStages = [
  {
    title: "Ordering",
    signal: "same-context order",
    evidence: "命令先后关系",
    color: accent,
  },
  {
    title: "Visibility",
    signal: "glMemoryBarrier",
    evidence: "下一消费者可见",
    color: warning,
  },
  {
    title: "Completion",
    signal: "fence + wait",
    evidence: "GPU 已越过边界",
    color: success,
  },
  {
    title: "Ownership",
    signal: "ring slot protocol",
    evidence: "CPU/GPU 不争用",
    color: danger,
  },
] as const;

export function GlsSynchronizationDiagram() {
  return (
    <FourStageDiagram
      title="同步必须拆成四个不同问题"
      subtitle="ordering ≠ visibility ≠ completion ≠ ownership"
      stages={syncStages}
      ariaLabel="OpenGL命令排序内存可见性栅栏完成和资源所有权的区别"
      caption="Memory barrier 解决后续访问的可见性，fence 证明执行进度；二者都不能自动替你设计持久映射 ring 的所有权。"
    />
  );
}

const azdoStages = [
  {
    title: "Resident data",
    signal: "immutable + persistent",
    evidence: "mapped ring / stable VAO",
    color: accent,
  },
  {
    title: "Batched commands",
    signal: "MDI / packet buffer",
    evidence: "many draws per submit",
    color: warning,
  },
  {
    title: "Resident resources",
    signal: "multi-bind / bindless",
    evidence: "fewer rebinding transitions",
    color: success,
  },
  {
    title: "GPU decisions",
    signal: "indirect command buffer",
    evidence: "cull → barrier → draw",
    color: danger,
  },
] as const;

export function GlsAzdoDiagram() {
  return (
    <FourStageDiagram
      title="AZDO 把数据、命令和资源变成长寿命流"
      subtitle="resident storage · command batches · resource handles · GPU-produced work"
      stages={azdoStages}
      ariaLabel="低开销OpenGL从驻留数据批量命令资源驻留到GPU生成间接命令"
      caption="低开销 OpenGL 不是删除某一个 API，而是减少分配、验证、绑定和 CPU/GPU 往返，并用明确的同步协议维持正确性。"
    />
  );
}

const experimentStages = [
  {
    title: "CPU submission",
    signal: "null/cheap draw",
    evidence: "CPU frame and call count",
    color: accent,
  },
  {
    title: "Vertex/geometry",
    signal: "reduce primitives",
    evidence: "GPU timer delta",
    color: warning,
  },
  {
    title: "Fragment",
    signal: "lower resolution",
    evidence: "pixel-cost sensitivity",
    color: success,
  },
  {
    title: "Bandwidth",
    signal: "smaller formats",
    evidence: "bytes and quality delta",
    color: danger,
  },
] as const;

export function GlsBottleneckExperimentDiagram() {
  return (
    <FourStageDiagram
      title="瓶颈定位依赖受控实验"
      subtitle="hold workload constant · change one pressure · compare distributions"
      stages={experimentStages}
      ariaLabel="CPU提交几何片段和带宽瓶颈的四类受控实验"
      caption="降低分辨率、几何量或资源字节只是诊断实验；只有在固定场景、预热、画质基线和多帧统计下，时间变化才可解释。"
    />
  );
}

const debugStages = [
  {
    title: "Debug context",
    signal: "GL_CONTEXT_FLAG_DEBUG_BIT",
    evidence: "开发期启用诊断",
    color: accent,
  },
  {
    title: "Filter",
    signal: "source/type/severity",
    evidence: "抑制已知噪声",
    color: warning,
  },
  {
    title: "Add context",
    signal: "labels + debug groups",
    evidence: "对象和 pass 可定位",
    color: success,
  },
  {
    title: "Capture",
    signal: "message callback",
    evidence: "轻量结构化日志",
    color: danger,
  },
] as const;

export function GlsDebugOutputDiagram() {
  return (
    <FourStageDiagram
      title="Debug Output 把驱动消息放回渲染上下文"
      subtitle="request · filter · label · capture"
      stages={debugStages}
      ariaLabel="OpenGL调试上下文过滤对象标签调试组和消息回调链"
      caption="调试输出应带对象标签和 debug group；callback 只记录轻量信息，避免重入 OpenGL 或执行阻塞工作。"
    />
  );
}

const robustnessStages = [
  {
    title: "Validate",
    signal: "size/offset/count/format",
    evidence: "拒绝越界和溢出",
    color: accent,
  },
  {
    title: "Detect",
    signal: "reset status + errors",
    evidence: "识别上下文丢失",
    color: warning,
  },
  {
    title: "Contain",
    signal: "stop submit / quarantine",
    evidence: "不传播坏状态",
    color: success,
  },
  {
    title: "Recover",
    signal: "recreate context/resources",
    evidence: "从 CPU 描述重建",
    color: danger,
  },
] as const;

export function GlsRobustnessDiagram() {
  return (
    <FourStageDiagram
      title="鲁棒性是可恢复的状态机"
      subtitle="validate → detect → contain → rebuild"
      stages={robustnessStages}
      ariaLabel="OpenGL输入验证重置检测故障隔离和上下文资源恢复状态机"
      caption="Robust context 与 robust buffer access 提供检测或限制，不替代应用层的尺寸、偏移、计数、格式和不可信资产验证。"
    />
  );
}
