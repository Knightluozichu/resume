"use client";

import { useMemo, useState, type ReactNode } from "react";

type ExecutionMode = "serial" | "stream";

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 420"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height="420" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Panel({
  height,
  stroke = COLORS.border,
  title,
  width,
  x,
  y,
}: {
  height: number;
  stroke?: string;
  title: string;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="14"
        fill={COLORS.surface}
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 29}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={stroke === COLORS.border ? COLORS.text : stroke}
      >
        {title}
      </text>
    </>
  );
}

function Arrow({
  color = COLORS.accent,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const p1 = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const p2 = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </>
  );
}

export function GpuGems2Ch29TechnologyTrendsDiagram() {
  const years = [0, 1, 2, 3, 4];
  const capability = years.map((year) => 1.5 ** year);
  const bandwidth = years.map((year) => 1.25 ** year);
  const latencyProgress = years.map((year) => 1.05 ** year);
  const path = (values: number[], maximum: number) =>
    values
      .map((value, index) => {
        const x = 86 + index * 128;
        const y = 326 - (value / maximum) * 230;
        return `${index === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
      })
      .join(" ");
  const maximum = capability[capability.length - 1];

  return (
    <Figure>
      <Frame label="GPU Gems 2 第 29 章技术趋势图：以原章给出的年增长率归一化展示处理能力约百分之五十、DRAM 带宽约百分之二十五、DRAM 延迟改善约百分之五，三条曲线差距持续扩大">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          三项都在进步，但不同斜率重写了架构约束
        </text>
        <Panel
          x={28}
          y={66}
          width={664}
          height={292}
          title="normalized historical trend from the chapter"
        />
        {[0, 1, 2, 3].map((tick) => (
          <g key={`grid-${tick}`}>
            <line
              x1="74"
              y1={326 - tick * 68}
              x2="642"
              y2={326 - tick * 68}
              stroke={COLORS.border}
              strokeDasharray="5 7"
            />
            <text
              x="58"
              y={331 - tick * 68}
              textAnchor="end"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {tick + 1}×
            </text>
          </g>
        ))}
        <path
          d={path(capability, maximum)}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <path
          d={path(bandwidth, maximum)}
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <path
          d={path(latencyProgress, maximum)}
          fill="none"
          stroke={COLORS.secondary}
          strokeWidth="4"
        />
        {[
          ["compute capability · ~50%/year", COLORS.accent],
          ["DRAM bandwidth · ~25%/year", COLORS.warning],
          ["DRAM latency improvement · ~5%/year", COLORS.secondary],
        ].map(([label, color], index) => (
          <g key={label}>
            <line
              x1="94"
              y1={92 + index * 26}
              x2="119"
              y2={92 + index * 26}
              stroke={color}
              strokeWidth="4"
            />
            <text x="130" y={97 + index * 26} fontSize="12" fill={color}>
              {label}
            </text>
          </g>
        ))}
        <text
          x="360"
          y="397"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          原章 2005 年预测数据用于解释斜率差；现代项目必须重新测量绝对值
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch29TransistorBudgetDiagram() {
  const designs = [
    { name: "latency-oriented", control: 44, datapath: 24, storage: 32 },
    { name: "throughput-oriented", control: 16, datapath: 62, storage: 22 },
  ] as const;
  return (
    <Figure>
      <Frame label="处理器晶体管预算对比：延迟导向设计把更多面积投入控制与缓存，吞吐导向设计把更多面积投入数据通路，以简单控制和大量并行元素换取高总吞吐">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          控制、data path、storage 争夺同一块芯片预算
        </text>
        {designs.map((design, designIndex) => {
          const y = 107 + designIndex * 145;
          const sections = [
            ["control", design.control, COLORS.warning],
            ["data path", design.datapath, COLORS.accent],
            ["storage", design.storage, COLORS.secondary],
          ] as const;
          let offset = 0;
          return (
            <g key={design.name}>
              <text
                x="64"
                y={y - 16}
                fontSize="14"
                fontWeight="700"
                fill={COLORS.text}
              >
                {design.name}
              </text>
              {sections.map(([label, value, color]) => {
                const x = 64 + offset * 5.7;
                const width = value * 5.7;
                offset += value;
                return (
                  <g key={label}>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height="64"
                      fill={color}
                      fillOpacity="0.34"
                      stroke={color}
                    />
                    <text
                      x={x + width / 2}
                      y={y + 29}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill={COLORS.text}
                    >
                      {label}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 48}
                      textAnchor="middle"
                      fontSize="11"
                      fill={COLORS.secondary}
                    >
                      illustrative {value}%
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <text
          x="360"
          y="391"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          比例是教学示意；关键取舍是单线程灵活性与并行 data path 密度
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch29ParallelismDiagram() {
  return (
    <Figure>
      <Frame label="三级并行图：任务并行让多个流水阶段同时处理不同批次，数据并行让同一 kernel 同时处理多个元素，指令并行让单个元素内的独立算术操作重叠执行">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          同一工作负载可同时暴露 task、data 与 instruction parallelism
        </text>
        <Panel
          x={24}
          y={72}
          width={210}
          height={278}
          title="task parallelism"
        />
        {[
          ["vertex", 116],
          ["raster", 181],
          ["fragment", 246],
        ].map(([label, y], index) => (
          <g key={label}>
            <rect
              x="52"
              y={Number(y)}
              width="154"
              height="39"
              rx="7"
              fill={COLORS.accent}
              fillOpacity={0.12 + index * 0.09}
              stroke={COLORS.accent}
            />
            <text
              x="129"
              y={Number(y) + 25}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.text}
            >
              {label} · batch {index + 1}
            </text>
          </g>
        ))}
        <Panel
          x={255}
          y={72}
          width={210}
          height={278}
          title="data parallelism"
          stroke={COLORS.accent}
        />
        {Array.from({ length: 12 }, (_, index) => (
          <rect
            key={`lane-${index}`}
            x={286 + (index % 4) * 39}
            y={121 + Math.floor(index / 4) * 54}
            width="30"
            height="38"
            rx="5"
            fill={COLORS.accent}
            fillOpacity={0.18 + (index % 4) * 0.08}
            stroke={COLORS.accent}
          />
        ))}
        <text
          x="360"
          y="317"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          same kernel · independent elements
        </text>
        <Panel
          x={486}
          y={72}
          width={210}
          height={278}
          title="instruction parallelism"
        />
        {["mul", "add", "fetch", "convert"].map((label, index) => (
          <g key={label}>
            <rect
              x={520 + (index % 2) * 80}
              y={128 + Math.floor(index / 2) * 86}
              width="64"
              height="54"
              rx="8"
              fill={COLORS.surface}
              stroke={index < 2 ? COLORS.warning : COLORS.border}
              strokeWidth="2"
            />
            <text
              x={552 + (index % 2) * 80}
              y={160 + Math.floor(index / 2) * 86}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.text}
            >
              {label}
            </text>
          </g>
        ))}
        <text
          x="360"
          y="394"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          只有程序显式暴露独立工作，硬件才有机会填满这些并行层级
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch29StreamKernelDiagram() {
  const stages = [
    "vertex kernel",
    "assembly / clip",
    "raster kernel",
    "fragment kernel",
  ];
  return (
    <Figure>
      <Frame label="流编程模型图：同类型的长数据流依次通过 vertex、assembly and clip、raster、fragment kernels，每个 kernel 对各元素独立计算，阶段间只传递显式 streams">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          stream 是有序同类型元素，kernel 是对整条 stream 的批量变换
        </text>
        {stages.map((stage, index) => {
          const x = 24 + index * 174;
          return (
            <g key={stage}>
              <Panel
                x={x}
                y={93}
                width={146}
                height={211}
                title={stage}
                stroke={index === 3 ? COLORS.success : COLORS.border}
              />
              {Array.from({ length: 8 }, (_, itemIndex) => (
                <circle
                  key={`${stage}-${itemIndex}`}
                  cx={x + 34 + (itemIndex % 4) * 27}
                  cy={158 + Math.floor(itemIndex / 4) * 50}
                  r="9"
                  fill={COLORS.accent}
                  fillOpacity={0.24 + (itemIndex % 4) * 0.1}
                  stroke={COLORS.accent}
                />
              ))}
              <text
                x={x + 73}
                y="275"
                textAnchor="middle"
                fontSize="11"
                fill={COLORS.secondary}
              >
                independent elements
              </text>
              {index < stages.length - 1 ? (
                <Arrow x1={x + 148} y1={202} x2={x + 171} y2={202} />
              ) : null}
            </g>
          );
        })}
        <text
          x="360"
          y="345"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.accent}
        >
          map 是典型操作；expand、reduce、filter 改变 stream 形状
        </text>
        <text
          x="360"
          y="391"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          kernel 内跨元素依赖会破坏直接的数据并行映射
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch29CommunicationDiagram() {
  return (
    <Figure>
      <Frame label="通信成本图：低局部性路径让每个 kernel 中间结果往返 off-chip memory；流式路径把相邻阶段数据留在片上，通过缓存、压缩或局部重算减少昂贵传输">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          算力增长快于外部通信，先消灭 traffic，再谈增加算术单元
        </text>
        <Panel
          x={28}
          y={70}
          width={310}
          height={284}
          title="global round-trips"
          stroke={COLORS.warning}
        />
        <rect
          x="65"
          y="127"
          width="100"
          height="54"
          rx="8"
          fill={COLORS.surface}
          stroke={COLORS.border}
        />
        <text
          x="115"
          y="159"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.text}
        >
          kernel A
        </text>
        <rect
          x="201"
          y="127"
          width="100"
          height="54"
          rx="8"
          fill={COLORS.surface}
          stroke={COLORS.border}
        />
        <text
          x="251"
          y="159"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.text}
        >
          kernel B
        </text>
        <rect
          x="99"
          y="257"
          width="168"
          height="54"
          rx="8"
          fill={COLORS.warning}
          fillOpacity="0.14"
          stroke={COLORS.warning}
        />
        <text
          x="183"
          y="289"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.warning}
        >
          off-chip memory
        </text>
        <Arrow x1={115} y1={183} x2={152} y2={253} color={COLORS.warning} />
        <Arrow x1={216} y1={253} x2={251} y2={183} color={COLORS.warning} />
        <Panel
          x={382}
          y={70}
          width={310}
          height={284}
          title="local stream path"
          stroke={COLORS.accent}
        />
        <rect
          x="416"
          y="127"
          width="100"
          height="54"
          rx="8"
          fill={COLORS.accent}
          fillOpacity="0.14"
          stroke={COLORS.accent}
        />
        <text
          x="466"
          y="159"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.text}
        >
          kernel A
        </text>
        <rect
          x="558"
          y="127"
          width="100"
          height="54"
          rx="8"
          fill={COLORS.accent}
          fillOpacity="0.14"
          stroke={COLORS.accent}
        />
        <text
          x="608"
          y="159"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.text}
        >
          kernel B
        </text>
        <Arrow x1={518} y1={154} x2={555} y2={154} />
        {[
          ["cache", 427],
          ["compress", 508],
          ["recompute", 589],
        ].map(([label, x]) => (
          <g key={label}>
            <rect
              x={Number(x)}
              y="250"
              width="70"
              height="45"
              rx="7"
              fill={COLORS.surface}
              stroke={COLORS.border}
            />
            <text
              x={Number(x) + 35}
              y="278"
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {label}
            </text>
          </g>
        ))}
        <text
          x="360"
          y="394"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          三种方法都在用晶体管或计算换取更少的 off-chip bandwidth
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch29LatencyToleranceDiagram() {
  return (
    <Figure>
      <Frame label="延迟隐藏时间线：当 wave 0 等待内存时，调度器执行 wave 1、2、3；足够多独立元素让处理单元保持忙碌，优化目标从单元素低延迟转向整条 stream 的高吞吐">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          latency 没有消失：用其他 ready work 覆盖等待窗口
        </text>
        <Panel
          x={28}
          y={70}
          width={664}
          height={286}
          title="processing-unit timeline"
        />
        {["wave 0", "wave 1", "wave 2", "wave 3"].map((wave, index) => {
          const y = 120 + index * 52;
          const start = 92 + index * 58;
          return (
            <g key={wave}>
              <text x="52" y={y + 21} fontSize="12" fill={COLORS.secondary}>
                {wave}
              </text>
              <rect
                x={start}
                y={y}
                width="78"
                height="28"
                rx="5"
                fill={COLORS.accent}
                fillOpacity="0.58"
              />
              <rect
                x={start + 78}
                y={y}
                width="178"
                height="28"
                rx="5"
                fill={COLORS.warning}
                fillOpacity="0.16"
                stroke={COLORS.warning}
                strokeDasharray="5 4"
              />
              <text
                x={start + 167}
                y={y + 19}
                textAnchor="middle"
                fontSize="11"
                fill={COLORS.warning}
              >
                memory wait
              </text>
              <rect
                x={start + 256}
                y={y}
                width="62"
                height="28"
                rx="5"
                fill={COLORS.success}
                fillOpacity="0.58"
              />
            </g>
          );
        })}
        <line
          x1="92"
          y1="334"
          x2="646"
          y2="334"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text x="92" y="350" fontSize="11" fill={COLORS.secondary}>
          issue
        </text>
        <text
          x="646"
          y="350"
          textAnchor="end"
          fontSize="11"
          fill={COLORS.secondary}
        >
          complete
        </text>
        <text
          x="360"
          y="397"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          长 stream + 独立元素 + 深流水，才能在等待期间持续发射工作
        </text>
      </Frame>
    </Figure>
  );
}

function StreamingScene({
  elements,
  globalWords,
  locality,
  mode,
  ops,
}: {
  elements: number;
  globalWords: number;
  locality: number;
  mode: ExecutionMode;
  ops: number;
}) {
  const metrics = useMemo(() => {
    const lanes = mode === "stream" ? 16 : 1;
    const residentElements = Math.min(elements, lanes * 8);
    const laneUtilization = Math.min(1, elements / (lanes * 4));
    const offChipWords = elements * globalWords * (1 - locality / 100);
    const arithmeticIntensity =
      ops / Math.max(0.25, globalWords * (1 - locality / 100));
    const computeCycles =
      (elements * ops) / (lanes * 2 * Math.max(0.25, laneUtilization));
    const memoryCycles = offChipWords * 3.2;
    const latencyCoverage =
      mode === "stream" ? Math.min(1, residentElements / 64) : 0.08;
    const exposedMemory = memoryCycles * (1 - latencyCoverage * 0.82);
    const bottleneck =
      computeCycles >= exposedMemory ? "compute" : "communication";
    return {
      arithmeticIntensity,
      bottleneck,
      laneUtilization,
      offChipWords,
      latencyCoverage,
    };
  }, [elements, globalWords, locality, mode, ops]);

  return (
    <svg
      viewBox="0 0 720 460"
      role="img"
      aria-label={`流处理实验：${mode} 模式，${elements} 个元素，每元素 ${ops} 次运算、${globalWords} 个全局 word、局部性 ${locality}%，瓶颈为 ${metrics.bottleneck}`}
      className="mx-auto block h-auto w-full"
    >
      <rect width="720" height="460" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        streaming architecture lab · {mode} execution
      </text>
      <rect
        x="24"
        y="56"
        width="430"
        height="314"
        rx="13"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="239"
        y="86"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.text}
      >
        element lanes and communication path
      </text>
      {Array.from({ length: 32 }, (_, index) => {
        const active =
          index < Math.min(32, mode === "stream" ? Math.ceil(elements / 8) : 1);
        const waiting =
          active && index % 5 === 3 && metrics.latencyCoverage < 0.7;
        return (
          <rect
            key={`execution-lane-${index}`}
            x={54 + (index % 8) * 44}
            y={111 + Math.floor(index / 8) * 47}
            width="31"
            height="31"
            rx="5"
            fill={waiting ? COLORS.warning : active ? COLORS.accent : COLORS.bg}
            fillOpacity={active ? 0.58 : 1}
            stroke={
              waiting ? COLORS.warning : active ? COLORS.accent : COLORS.border
            }
          />
        );
      })}
      <rect
        x="55"
        y="317"
        width="352"
        height="28"
        rx="7"
        fill={COLORS.bg}
        stroke={COLORS.border}
      />
      <rect
        x="55"
        y="317"
        width={352 * Math.min(1, metrics.offChipWords / 2000)}
        height="28"
        rx="7"
        fill={
          metrics.bottleneck === "communication"
            ? COLORS.warning
            : COLORS.accent
        }
        fillOpacity="0.58"
      />
      <text
        x="231"
        y="336"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={COLORS.text}
      >
        off-chip traffic · {Math.round(metrics.offChipWords).toLocaleString()}{" "}
        words
      </text>
      <rect
        x="476"
        y="56"
        width="220"
        height="314"
        rx="13"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="586"
        y="86"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.text}
      >
        measured workload facts
      </text>
      {[
        [
          "arithmetic intensity",
          metrics.arithmeticIntensity.toFixed(1),
          COLORS.accent,
        ],
        [
          "lane utilization",
          `${Math.round(metrics.laneUtilization * 100)}%`,
          metrics.laneUtilization > 0.75 ? COLORS.success : COLORS.warning,
        ],
        [
          "latency covered",
          `${Math.round(metrics.latencyCoverage * 100)}%`,
          metrics.latencyCoverage > 0.75 ? COLORS.success : COLORS.warning,
        ],
        [
          "limiting path",
          metrics.bottleneck,
          metrics.bottleneck === "compute" ? COLORS.accent : COLORS.warning,
        ],
      ].map(([label, value, color], index) => (
        <g key={label}>
          <text
            x="496"
            y={130 + index * 55}
            fontSize="12"
            fill={COLORS.secondary}
          >
            {label}
          </text>
          <text
            x="677"
            y={130 + index * 55}
            textAnchor="end"
            fontSize="13"
            fontWeight="700"
            fill={color}
          >
            {value}
          </text>
        </g>
      ))}
      <rect
        x="24"
        y="390"
        width="672"
        height="44"
        rx="8"
        fill={COLORS.surface}
        stroke={
          metrics.bottleneck === "communication"
            ? COLORS.warning
            : COLORS.border
        }
      />
      <text
        x="360"
        y="417"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={
          metrics.bottleneck === "communication"
            ? COLORS.warning
            : COLORS.secondary
        }
      >
        {metrics.bottleneck === "communication"
          ? "traffic dominates：提高 locality、压缩或增加每次读取后的有效计算"
          : "compute dominates：长 stream 已暴露并行，可检查 data path 与指令组合"}
      </text>
    </svg>
  );
}

export function GpuGems2Ch29StreamingLab() {
  const [mode, setMode] = useState<ExecutionMode>("stream");
  const [elements, setElements] = useState(512);
  const [ops, setOps] = useState(24);
  const [globalWords, setGlobalWords] = useState(4);
  const [locality, setLocality] = useState(50);

  function reset() {
    setMode("stream");
    setElements(512);
    setOps(24);
    setGlobalWords(4);
    setLocality(50);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 29 流式架构实验"
      data-visual-kind="gpu-gems2-ch29-streaming-architectures"
      data-unit-id="gpg-v2-29"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Streaming Architectures 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          先预测：保持元素数不变，把 global words 加倍、locality
          降低，增加算术操作还能否让并行单元持续忙碌？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <StreamingScene
            elements={elements}
            globalWords={globalWords}
            locality={locality}
            mode={mode}
            ops={ops}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2" aria-label="选择执行模型">
            {(["serial", "stream"] as ExecutionMode[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className="min-h-11 rounded-md border border-border px-2 py-2 text-xs font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {value}
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            stream elements：{elements}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="32"
              max="1024"
              step="32"
              value={elements}
              onChange={(event) => setElements(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            operations / element：{ops}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="4"
              max="64"
              step="4"
              value={ops}
              onChange={(event) => setOps(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            global words / element：{globalWords}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="12"
              step="1"
              value={globalWords}
              onChange={(event) => setGlobalWords(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            on-chip locality：{locality}%
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="90"
              step="10"
              value={locality}
              onChange={(event) => setLocality(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {mode === "serial"
              ? "故障观察：即使单元素很快，串行模型也没有足够 ready work 覆盖长内存等待，吞吐单元会出现空槽。"
              : locality < 30 && globalWords > 7
                ? "通信压力过高：先减少全局往返或压缩数据，再增加算术资源。"
                : "长 stream 暴露数据并行；局部中间结果和多个 resident waves 共同隐藏外部延迟。"}
          </p>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
