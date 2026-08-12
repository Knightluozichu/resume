"use client";

import { useMemo, useState, type ReactNode } from "react";

type Scenario = "color" | "convolution" | "histogram" | "sliding";

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

const SCENARIOS: Record<
  Scenario,
  {
    baseCost: number;
    fit: "direct" | "multipass" | "poor";
    label: string;
    reads: number;
    reason: string;
  }
> = {
  color: {
    baseCost: 8,
    fit: "direct",
    label: "逐像素调色",
    reads: 1,
    reason: "每个输出只依赖同位置输入，天然并行。",
  },
  convolution: {
    baseCost: 42,
    fit: "multipass",
    label: "邻域卷积",
    reads: 9,
    reason: "可以 gather 邻域；核过大时拆成多个 pass。",
  },
  histogram: {
    baseCost: 54,
    fit: "poor",
    label: "亮度直方图",
    reads: 1,
    reason: "输入像素要 scatter 到不同统计桶，旧式 fragment pipeline 不擅长。",
  },
  sliding: {
    baseCost: 30,
    fit: "poor",
    label: "滑动累加滤波",
    reads: 2,
    reason: "当前像素依赖前一像素结果，破坏并行执行顺序。",
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

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
      viewBox="0 0 720 400"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height="400" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
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
  const size = 9;
  const p1 = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const p2 = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </>
  );
}

function Panel({
  height,
  title,
  width,
  x,
  y,
}: {
  height: number;
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
        rx="15"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 31}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        {title}
      </text>
    </>
  );
}

export function GpuGems2Ch25FitDiagram() {
  const rows = [
    {
      color: COLORS.success,
      gpu: "逐像素颜色变换",
      model: "1 input → 1 output",
      verdict: "直接映射",
    },
    {
      color: COLORS.accent,
      gpu: "独立邻域卷积",
      model: "many reads → 1 output",
      verdict: "gather 友好",
    },
    {
      color: COLORS.warning,
      gpu: "直方图统计",
      model: "1 input → chosen bin",
      verdict: "scatter 困难",
    },
    {
      color: COLORS.danger,
      gpu: "顺序滑动累加",
      model: "depends on prior output",
      verdict: "并行不成立",
    },
  ];
  return (
    <Figure>
      <Frame label="Motion 图像算法适配图：逐像素和独立邻域操作适合 GPU gather，直方图 scatter 与依赖前一像素的顺序算法不适合旧式 fragment pipeline">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          先看数据依赖，再决定是否搬到 GPU
        </text>
        <text
          x="52"
          y="69"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          算法
        </text>
        <text
          x="292"
          y="69"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          数据流
        </text>
        <text
          x="610"
          y="69"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          结论
        </text>
        {rows.map((row, index) => {
          const y = 86 + index * 64;
          return (
            <g key={row.gpu}>
              <rect
                x="32"
                y={y}
                width="656"
                height="48"
                rx="12"
                fill={COLORS.surface}
                stroke={row.color}
                strokeWidth="2"
              />
              <circle cx="54" cy={y + 24} r="7" fill={row.color} />
              <text
                x="73"
                y={y + 29}
                fontSize="13"
                fontWeight="700"
                fill={COLORS.text}
              >
                {row.gpu}
              </text>
              <text x="292" y={y + 29} fontSize="13" fill={COLORS.secondary}>
                {row.model}
              </text>
              <text
                x="610"
                y={y + 29}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={row.color}
              >
                {row.verdict}
              </text>
            </g>
          );
        })}
        <text
          x="360"
          y="368"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          GPU
          擅长从任意位置读取，但旧式管线难以把每个结果写向任意位置或共享顺序状态
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch25BudgetDiagram() {
  const chain = ["source", "3D LUT", "palette", "next read"];
  return (
    <Figure>
      <Frame label="fragment program 资源预算图：dependent texture reads 形成间接层级，达到四层限制时可转移顶点计算或拆分多 pass，但中间 pbuffer 会增加带宽和精度损失">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          资源不是一个总数：instructions、reads 与 indirection 分开计
        </text>
        <Panel
          x={28}
          y={70}
          width={420}
          height={246}
          title="dependent texture chain"
        />
        {chain.map((label, index) => {
          const x = 52 + index * 96;
          return (
            <g key={label}>
              <rect
                x={x}
                y="140"
                width="76"
                height="62"
                rx="10"
                fill={COLORS.bg}
                stroke={index === 3 ? COLORS.danger : COLORS.accent}
                strokeWidth="2"
              />
              <text
                x={x + 38}
                y="166"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={COLORS.text}
              >
                {label}
              </text>
              <text
                x={x + 38}
                y="187"
                textAnchor="middle"
                fontSize="12"
                fill={index === 3 ? COLORS.danger : COLORS.secondary}
              >
                level {index + 1}
              </text>
              {index < chain.length - 1 ? (
                <Arrow x1={x + 80} y1={171} x2={x + 92} y2={171} />
              ) : null}
            </g>
          );
        })}
        <text
          x="238"
          y="244"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          坐标依赖前一次 texture result，就增加一层 indirection
        </text>
        <text
          x="238"
          y="278"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          优先：vertex/constants 预计算 → arithmetic → 最后才拆 pass
        </text>
        <Panel
          x={474}
          y={70}
          width={218}
          height={246}
          title="multi-pass fallback"
        />
        {[
          { label: "pass A", y: 126 },
          { label: "pbuffer", y: 190 },
          { label: "pass B", y: 254 },
        ].map((item, index) => (
          <g key={item.label}>
            <rect
              x="516"
              y={item.y}
              width="134"
              height="38"
              rx="9"
              fill={COLORS.bg}
              stroke={index === 1 ? COLORS.warning : COLORS.success}
              strokeWidth="2"
            />
            <text
              x="583"
              y={item.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={COLORS.text}
            >
              {item.label}
            </text>
            {index < 2 ? (
              <Arrow
                x1={583}
                y1={item.y + 40}
                x2={583}
                y2={item.y + 60}
                color={COLORS.warning}
              />
            ) : null}
          </g>
        ))}
        <text
          x="360"
          y="368"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          拆 pass 能跨过单 shader 限制，却会付出中间写回、读回与量化成本
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch25NumericsDiagram() {
  return (
    <Figure>
      <Frame label="除零可移植性图：透明像素从 premultiplied 转 straight 时除以 alpha，零分母在不同 GPU 上可能产生大数或 NaN；加入 epsilon 并使用 CPU reference 校验">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          相同 shader，不同除零语义会走向不同输出
        </text>
        <Panel x={28} y={78} width={204} height={214} title="input" />
        <text
          x="130"
          y="143"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          premultiplied pixel
        </text>
        <text
          x="130"
          y="187"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill={COLORS.text}
        >
          rgb / α
        </text>
        <text
          x="130"
          y="230"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.danger}
        >
          α = 0
        </text>
        <Arrow x1={246} y1={184} x2={280} y2={184} />
        <Panel
          x={292}
          y={78}
          width={176}
          height={214}
          title="vendor behavior"
        />
        <text
          x="380"
          y="145"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          large finite value
        </text>
        <text
          x="380"
          y="181"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.danger}
        >
          NaN propagation
        </text>
        <path d="M326 211 H434" stroke={COLORS.border} strokeWidth="2" />
        <text
          x="380"
          y="248"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          later × 0 differs
        </text>
        <Arrow x1={482} y1={184} x2={516} y2={184} color={COLORS.success} />
        <Panel x={528} y={78} width={164} height={214} title="portable fix" />
        <text
          x="610"
          y="144"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          max(α, ε)
        </text>
        <text
          x="610"
          y="181"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          known domain
        </text>
        <text
          x="610"
          y="218"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          CPU reference
        </text>
        <text
          x="610"
          y="255"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          finite output
        </text>
        <text
          x="360"
          y="351"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          epsilon 不是装饰：它把未定义边界变成跨 GPU 可测试的数值契约
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch25FilteringDiagram() {
  return (
    <Figure>
      <Frame label="双线性过滤质量图：一对一映射偏离 texel center 会累计软化；straight alpha 插值把透明黑色混入边缘，premultiplied alpha 在过滤前保存正确颜色贡献">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          bilinear filtering 的两类陷阱：采样位置与 alpha 表示
        </text>
        <Panel
          x={28}
          y={72}
          width={318}
          height={244}
          title="one-to-one copy softening"
        />
        {[0, 1, 2, 3].map((index) => (
          <rect
            key={`texel-${index}`}
            x={62 + index * 58}
            y="133"
            width="54"
            height="54"
            fill={index % 2 ? COLORS.surface : COLORS.accent}
            fillOpacity={index % 2 ? 1 : 0.35}
            stroke={COLORS.border}
          />
        ))}
        <line
          x1="89"
          y1="117"
          x2="89"
          y2="205"
          stroke={COLORS.success}
          strokeWidth="3"
        />
        <circle cx="101" cy="160" r="8" fill={COLORS.danger} />
        <text
          x="187"
          y="231"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          center: exact texel
        </text>
        <text
          x="187"
          y="261"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.danger}
        >
          fractional offset: neighbor bleed
        </text>
        <text
          x="187"
          y="291"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          identity pass 可改 nearest
        </text>
        <Panel
          x={374}
          y={72}
          width={318}
          height={244}
          title="transparent edge filtering"
        />
        <rect
          x="410"
          y="132"
          width="100"
          height="76"
          rx="10"
          fill={COLORS.bg}
          stroke={COLORS.danger}
          strokeWidth="2"
        />
        <text
          x="460"
          y="158"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.danger}
        >
          straight α
        </text>
        <text
          x="460"
          y="184"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          transparent RGB leaks
        </text>
        <Arrow x1={520} y1={170} x2={548} y2={170} color={COLORS.success} />
        <rect
          x="558"
          y="132"
          width="100"
          height="76"
          rx="10"
          fill={COLORS.bg}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="608"
          y="158"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          premultiplied
        </text>
        <text
          x="608"
          y="184"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          RGB already × α
        </text>
        <text
          x="533"
          y="245"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          filter associated color + alpha
        </text>
        <text
          x="533"
          y="279"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          Over composite: no dark fringe
        </text>
        <text
          x="360"
          y="366"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          “硬件过滤免费”只指指令成本；质量仍由采样对齐与颜色表示契约决定
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch25DebugDiagram() {
  return (
    <Figure>
      <Frame label="Motion shader 调试阶梯：先用 CPU reference 确认算法，再检查语法和硬件限制，随后把中间量缩放写到 framebuffer，最后跨 GPU 比较实现差异">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          黑盒调试：每次只回答一个问题
        </text>
        {[
          {
            label: "CPU reference",
            note: "算法本身正确吗？",
            width: 520,
            color: COLORS.success,
          },
          {
            label: "syntax / native limits",
            note: "shader 是否执行？",
            width: 430,
            color: COLORS.accent,
          },
          {
            label: "framebuffer probe",
            note: "哪一步数值偏离？",
            width: 340,
            color: COLORS.warning,
          },
          {
            label: "cross-GPU compare",
            note: "是否为 vendor 语义？",
            width: 250,
            color: COLORS.danger,
          },
        ].map((step, index) => {
          const x = (720 - step.width) / 2;
          const y = 76 + index * 67;
          return (
            <g key={step.label}>
              <rect
                x={x}
                y={y}
                width={step.width}
                height="48"
                rx="12"
                fill={COLORS.surface}
                stroke={step.color}
                strokeWidth="2"
              />
              <text
                x={x + 22}
                y={y + 29}
                fontSize="13"
                fontWeight="700"
                fill={step.color}
              >
                {step.label}
              </text>
              <text
                x={x + step.width - 20}
                y={y + 29}
                textAnchor="end"
                fontSize="13"
                fill={COLORS.secondary}
              >
                {step.note}
              </text>
            </g>
          );
        })}
        <text
          x="360"
          y="369"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          无单步调试器时，把中间值当颜色输出；reference 与探针共同缩小故障范围
        </text>
      </Frame>
    </Figure>
  );
}

function MotionLabScene({
  highPrecision,
  passes,
  premultiplied,
  sampleOffset,
  scenario,
}: {
  highPrecision: boolean;
  passes: number;
  premultiplied: boolean;
  sampleOffset: number;
  scenario: Scenario;
}) {
  const config = SCENARIOS[scenario];
  const data = useMemo(() => {
    const instructions =
      Math.ceil(config.baseCost / passes) + (premultiplied ? 3 : 0);
    const softening = clamp(sampleOffset * (passes + 1) * 44, 0, 100);
    const fringe = premultiplied ? 0 : clamp(18 + sampleOffset * 80, 0, 100);
    const quantization = highPrecision ? passes * 0.08 : passes * 0.72;
    const executable = config.fit !== "poor" && instructions <= 64;
    return { executable, fringe, instructions, quantization, softening };
  }, [config, highPrecision, passes, premultiplied, sampleOffset]);
  const fitColor =
    config.fit === "direct"
      ? COLORS.success
      : config.fit === "multipass"
        ? COLORS.warning
        : COLORS.danger;

  return (
    <svg
      viewBox="0 0 720 430"
      role="img"
      aria-label="Apple Motion GPU 图像处理交互实验：选择算法、pass 数、采样偏移、alpha 表示和中间缓冲精度，观察适配性、指令预算、软化、边缘与量化风险"
      className="block h-auto w-full"
    >
      <rect width="720" height="430" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        Motion image pipeline lab · {config.label}
      </text>
      <rect
        x="24"
        y="54"
        width="672"
        height="90"
        rx="14"
        fill={COLORS.surface}
        stroke={fitColor}
        strokeWidth="2"
      />
      <text x="47" y="82" fontSize="13" fontWeight="700" fill={fitColor}>
        mapping verdict
      </text>
      <text
        x="673"
        y="82"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={fitColor}
      >
        {config.fit}
      </text>
      <text x="47" y="112" fontSize="13" fill={COLORS.secondary}>
        {config.reason}
      </text>
      <text x="47" y="135" fontSize="12" fill={COLORS.secondary}>
        texture reads / output：{config.reads}
      </text>
      <rect
        x="24"
        y="164"
        width="408"
        height="218"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="228"
        y="194"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        render passes
      </text>
      {Array.from({ length: passes }, (_, index) => {
        const width = 328 / passes;
        const x = 64 + index * width;
        return (
          <g key={`pass-${index}`}>
            <rect
              x={x}
              y="226"
              width={Math.max(42, width - 10)}
              height="64"
              rx="9"
              fill={COLORS.bg}
              stroke={index === passes - 1 ? COLORS.accent : COLORS.border}
              strokeWidth="2"
            />
            <text
              x={x + Math.max(42, width - 10) / 2}
              y="252"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.text}
            >
              pass {index + 1}
            </text>
            <text
              x={x + Math.max(42, width - 10) / 2}
              y="274"
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {highPrecision ? "16f" : "8-bit"}
            </text>
          </g>
        );
      })}
      <line
        x1="64"
        y1="326"
        x2={64 + 280 * (1 - data.softening / 100)}
        y2="326"
        stroke={COLORS.accent}
        strokeWidth="16"
        strokeLinecap="round"
      />
      <line
        x1={64 + 280 * (1 - data.softening / 100)}
        y1="326"
        x2="344"
        y2="326"
        stroke={COLORS.danger}
        strokeWidth="16"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      <text
        x="228"
        y="360"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        edge retention after repeated sampling
      </text>
      <rect
        x="454"
        y="164"
        width="242"
        height="218"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="575"
        y="194"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        quality record
      </text>
      {[
        {
          label: "instructions / pass",
          value: `${data.instructions}`,
          color: data.instructions <= 64 ? COLORS.success : COLORS.danger,
        },
        {
          label: "softening risk",
          value: `${data.softening.toFixed(0)}%`,
          color: data.softening < 20 ? COLORS.success : COLORS.warning,
        },
        {
          label: "alpha fringe",
          value: `${data.fringe.toFixed(0)}%`,
          color: data.fringe === 0 ? COLORS.success : COLORS.danger,
        },
        {
          label: "quantization",
          value: data.quantization.toFixed(2),
          color: highPrecision ? COLORS.success : COLORS.warning,
        },
      ].map((metric, index) => (
        <g key={metric.label}>
          <text
            x="476"
            y={232 + index * 38}
            fontSize="12"
            fill={COLORS.secondary}
          >
            {metric.label}
          </text>
          <text
            x="674"
            y={232 + index * 38}
            textAnchor="end"
            fontSize="13"
            fontWeight="700"
            fill={metric.color}
          >
            {metric.value}
          </text>
        </g>
      ))}
      <text
        x="360"
        y="411"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={data.executable ? COLORS.success : COLORS.danger}
      >
        {data.executable
          ? "可执行：继续与 CPU reference 做像素级误差比较"
          : "结构不适配或超预算：改算法、做 reduction，或拆分数据依赖"}
      </text>
    </svg>
  );
}

export function GpuGems2Ch25MotionLab() {
  const [scenario, setScenario] = useState<Scenario>("convolution");
  const [passes, setPasses] = useState(2);
  const [sampleOffset, setSampleOffset] = useState(0.08);
  const [premultiplied, setPremultiplied] = useState(true);
  const [highPrecision, setHighPrecision] = useState(false);

  function reset() {
    setScenario("convolution");
    setPasses(2);
    setSampleOffset(0.08);
    setPremultiplied(true);
    setHighPrecision(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 25 Apple Motion 图像处理实验"
      data-visual-kind="gpu-gems2-ch25-motion-image-processing"
      data-unit-id="gpg-v2-25"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Apple Motion GPU image-processing 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          先预测：把 histogram 或 sequential filter 直接塞进 fragment
          shader，再增加 pass，真的能解决数据依赖吗？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <MotionLabScene
            highPrecision={highPrecision}
            passes={passes}
            premultiplied={premultiplied}
            sampleOffset={sampleOffset}
            scenario={scenario}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2" aria-label="选择图像处理算法">
            {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => setScenario(key)}
                className="min-h-11 rounded-md border border-border px-2 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {SCENARIOS[key].label}
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            pass 数：{passes}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="4"
              step="1"
              value={passes}
              onChange={(event) => setPasses(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            sample offset：{sampleOffset.toFixed(2)} px
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={sampleOffset}
              onChange={(event) => setSampleOffset(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            aria-pressed={!premultiplied}
            onClick={() => setPremultiplied((value) => !value)}
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            alpha：{premultiplied ? "premultiplied" : "straight（故障模式）"}
          </button>
          <button
            type="button"
            aria-pressed={highPrecision}
            onClick={() => setHighPrecision((value) => !value)}
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            intermediate：{highPrecision ? "16-bit float" : "8-bit"}
          </button>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {SCENARIOS[scenario].fit === "poor"
              ? "增加 pass 不能自动修复 scatter 或顺序依赖；先重写为 reduction、分块或 CPU 路径。"
              : !premultiplied
                ? "straight alpha 与透明黑邻居一起过滤会产生暗边；这是可见的故障注入。"
                : sampleOffset > 0.2
                  ? "一对一复制偏离 texel center，重复 pass 会累计 softening。"
                  : "记录每个 pass 的格式、采样位置、资源预算，并与 CPU reference 比较。"}
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
