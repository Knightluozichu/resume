"use client";

import { useMemo, useState, type ReactNode } from "react";

type RenderMode = "path tracer" | "photon mapping" | "debug";

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        {children}
      </div>
    </figure>
  );
}

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = round(x2 - size * Math.cos(angle - Math.PI / 6));
  const leftY = round(y2 - size * Math.sin(angle - Math.PI / 6));
  const rightX = round(x2 - size * Math.cos(angle + Math.PI / 6));
  const rightY = round(y2 - size * Math.sin(angle + Math.PI / 6));
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "8 6" : undefined}
      />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function Cgp32RenderingPipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="实际渲染管线图：场景数据经过相机、积分器和帧缓冲得到可检查的图像">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          rendering in practice：把算法接成可验收的管线
        </text>
        <rect
          x="34"
          y="90"
          width="154"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="111"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          场景输入
        </text>
        <text
          x="111"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          几何
        </text>
        <text
          x="111"
          y="204"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          材质 / 光源
        </text>
        <text
          x="111"
          y="238"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          相机 · 随机种子
        </text>
        <Arrow x1={206} y1={188} x2={244} y2={188} color={COLORS.accent} />
        <rect
          x="256"
          y="90"
          width="208"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          渲染器
        </text>
        <text
          x="360"
          y="170"
          textAnchor="middle"
          fontSize="17"
          fill={COLORS.accent}
        >
          path tracer
        </text>
        <text
          x="360"
          y="204"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          或 photon mapping
        </text>
        <text
          x="360"
          y="244"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          积分 · 缓存 · 采样 · 终止
        </text>
        <Arrow x1={482} y1={188} x2={520} y2={188} color={COLORS.success} />
        <rect
          x="532"
          y="90"
          width="154"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="609"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          输出证据
        </text>
        <text
          x="609"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          像素 / 深度
        </text>
        <text
          x="609"
          y="204"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          耗时 / 样本
        </text>
        <text
          x="609"
          y="238"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          日志 · 版本 · 哈希
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          实际渲染的交付物不只是图像，还包括能解释图像的状态记录
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp32PathTracerDiagram() {
  return (
    <Figure>
      <SvgFrame label="路径追踪器图：相机射线经过交点、采样散射方向和下一事件估计累计像素贡献">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          path tracer：一条可重放的路径状态
        </text>
        <line
          x1="64"
          y1="220"
          x2="658"
          y2="220"
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="8 7"
        />
        <circle
          cx="92"
          cy="220"
          r="25"
          fill={COLORS.accent}
          fillOpacity="0.2"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <text
          x="92"
          y="225"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          相机
        </text>
        <Arrow x1={122} y1={220} x2={188} y2={220} color={COLORS.accent} />
        <circle
          cx="224"
          cy="220"
          r="25"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="224"
          y="225"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          x₀
        </text>
        <Arrow x1={254} y1={220} x2={318} y2={220} color={COLORS.success} />
        <circle
          cx="354"
          cy="220"
          r="25"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="354"
          y="225"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          x₁
        </text>
        <Arrow x1={384} y1={220} x2={448} y2={220} color={COLORS.success} />
        <circle
          cx="484"
          cy="220"
          r="25"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="484"
          y="225"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          x₂
        </text>
        <Arrow x1={514} y1={220} x2={578} y2={220} color={COLORS.success} />
        <circle
          cx="614"
          cy="220"
          r="25"
          fill={COLORS.success}
          fillOpacity="0.2"
          stroke={COLORS.success}
          strokeWidth="3"
        />
        <text
          x="614"
          y="225"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.text}
        >
          光源
        </text>
        <rect
          x="166"
          y="78"
          width="116"
          height="62"
          rx="10"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="224"
          y="103"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          命中与法线
        </text>
        <text
          x="224"
          y="124"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          t · n · β
        </text>
        <Arrow
          x1={224}
          y1={190}
          x2={224}
          y2={144}
          color={COLORS.border}
          dashed
        />
        <rect
          x="296"
          y="278"
          width="116"
          height="62"
          rx="10"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="354"
          y="303"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          散射采样
        </text>
        <text
          x="354"
          y="324"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          f · cos / pdf
        </text>
        <Arrow
          x1={354}
          y1={250}
          x2={354}
          y2={274}
          color={COLORS.border}
          dashed
        />
        <rect
          x="426"
          y="78"
          width="116"
          height="62"
          rx="10"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="484"
          y="103"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          下一事件
        </text>
        <text
          x="484"
          y="124"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          可见性 · Lₑ
        </text>
        <Arrow
          x1={484}
          y1={190}
          x2={484}
          y2={144}
          color={COLORS.border}
          dashed
        />
        <text
          x="360"
          y="365"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          记录 path vertices、throughput、PDF 与终止原因，才能复现像素差异
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp32PhotonMappingDiagram() {
  return (
    <Figure>
      <SvgFrame label="光子映射图：光源发射光子，表面存储命中，查询邻域估计局部辐亮度">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          photon mapping：先存能量，再查询局部密度
        </text>
        <rect
          x="34"
          y="88"
          width="164"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="116"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          光源发射
        </text>
        <circle
          cx="116"
          cy="188"
          r="25"
          fill={COLORS.warning}
          fillOpacity="0.2"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <path
          d="M116 148 L116 132 M116 228 L116 244 M76 188 L60 188 M156 188 L172 188"
          stroke={COLORS.warning}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text
          x="116"
          y="254"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          光子 · 方向 · 能量
        </text>
        <Arrow x1={218} y1={188} x2={254} y2={188} color={COLORS.warning} />
        <rect
          x="266"
          y="88"
          width="188"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          光子图
        </text>
        <line
          x1="300"
          y1="226"
          x2="420"
          y2="226"
          stroke={COLORS.border}
          strokeWidth="3"
        />
        {[
          { x: 316, y: 204 },
          { x: 344, y: 184 },
          { x: 370, y: 214 },
          { x: 398, y: 164 },
          { x: 420, y: 196 },
        ].map(({ x, y }, index) => (
          <circle
            key={`photon-${index}`}
            cx={x}
            cy={y}
            r="7"
            fill={COLORS.success}
          />
        ))}
        <text
          x="360"
          y="254"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          按空间结构保存命中光子
        </text>
        <Arrow x1={474} y1={188} x2={510} y2={188} color={COLORS.success} />
        <rect
          x="522"
          y="88"
          width="164"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="604"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          相机查询
        </text>
        <circle
          cx="604"
          cy="190"
          r="42"
          fill={COLORS.accent}
          fillOpacity="0.1"
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <circle cx="580" cy="174" r="6" fill={COLORS.success} />
        <circle cx="612" cy="184" r="6" fill={COLORS.success} />
        <circle cx="594" cy="212" r="6" fill={COLORS.success} />
        <text
          x="604"
          y="254"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          邻域半径 → 密度估计
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          光子映射的偏差与噪声来自存储、半径和查询测度的共同选择
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp32RenderBudgetDiagram() {
  return (
    <Figure>
      <SvgFrame label="渲染预算图：样本、反弹、光子数量和查询半径共同影响时间、噪声、偏差与漏光">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          实际验收：时间、噪声、偏差与漏光一起看
        </text>
        <rect
          x="34"
          y="88"
          width="166"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="117"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          计算预算
        </text>
        <text
          x="117"
          y="166"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          samples
        </text>
        <text
          x="117"
          y="200"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          bounces
        </text>
        <text
          x="117"
          y="234"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          photons · radius
        </text>
        <Arrow x1={222} y1={188} x2={258} y2={188} color={COLORS.accent} />
        <rect
          x="270"
          y="88"
          width="180"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="360"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          中间状态
        </text>
        <text
          x="360"
          y="166"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          路径吞吐量
        </text>
        <text
          x="360"
          y="200"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          命中与可见性
        </text>
        <text
          x="360"
          y="234"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          光子密度与法线
        </text>
        <Arrow x1={472} y1={188} x2={508} y2={188} color={COLORS.success} />
        <rect
          x="520"
          y="88"
          width="166"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="603"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          验收结果
        </text>
        <text
          x="603"
          y="166"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          时间 / 记忆
        </text>
        <text
          x="603"
          y="200"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          噪声 / 收敛
        </text>
        <text
          x="603"
          y="234"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          偏差 / 漏光
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          没有固定输入与中间状态，快一倍不等于正确一倍
        </text>
      </SvgFrame>
    </Figure>
  );
}

function RenderScene({
  mode,
  samples,
  bounces,
  photons,
  radius,
}: {
  mode: RenderMode;
  samples: number;
  bounces: number;
  photons: number;
  radius: number;
}) {
  const isPhoton = mode === "photon mapping";
  const isDebug = mode === "debug";
  const pathColor = isDebug
    ? COLORS.warning
    : isPhoton
      ? COLORS.success
      : COLORS.accent;
  const photonCount = Math.min(12, Math.max(4, Math.round(photons / 180)));
  const queryRadius = round(20 + radius * 28);
  const noise = round(Math.max(0.04, 0.42 / Math.sqrt(samples)));
  const glow = round(0.12 + Math.min(0.5, photons / 3000));
  return (
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label="渲染实践实验场景：比较路径追踪、光子映射与调试路径"
      className="block h-auto w-full"
    >
      <rect width="720" height="320" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode}：固定场景下的实现反馈
      </text>
      <path
        d="M62 242 Q360 206 658 242"
        fill="none"
        stroke={COLORS.border}
        strokeWidth="5"
      />
      <path
        d="M62 246 Q360 210 658 246 L658 284 L62 284 Z"
        fill={COLORS.surface}
        fillOpacity="0.55"
      />
      <rect
        x="70"
        y="138"
        width="102"
        height="68"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="121"
        y="168"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        相机
      </text>
      <text
        x="121"
        y="191"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        固定像素
      </text>
      <path
        d="M238 232 L300 158 L364 222 L430 142"
        fill={pathColor}
        fillOpacity={glow}
        stroke={pathColor}
        strokeWidth="3"
      />
      <circle cx="300" cy="158" r="10" fill={COLORS.warning} />
      <circle cx="364" cy="222" r="9" fill={COLORS.warning} />
      <circle cx="430" cy="142" r="10" fill={COLORS.success} />
      <polyline
        points="172,172 238,232 300,158 364,222 430,142 548,172"
        fill="none"
        stroke={pathColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={isDebug ? "9 7" : undefined}
      />
      {isPhoton ? (
        <>
          {Array.from({ length: photonCount }, (_, index) => {
            const x = 296 + ((index * 37) % 142);
            const y = 182 + ((index * 29) % 48);
            return (
              <circle
                key={`scene-photon-${index}`}
                cx={x}
                cy={y}
                r="5"
                fill={COLORS.success}
              />
            );
          })}
          <circle
            cx="430"
            cy="142"
            r={queryRadius}
            fill={COLORS.success}
            fillOpacity="0.08"
            stroke={COLORS.success}
            strokeWidth="2"
            strokeDasharray="6 5"
          />
        </>
      ) : null}
      {isDebug ? (
        <>
          <rect
            x="328"
            y="100"
            width="82"
            height="34"
            rx="8"
            fill={COLORS.warning}
            fillOpacity="0.18"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <text
            x="369"
            y="122"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.warning}
          >
            首个分叉
          </text>
        </>
      ) : null}
      <rect
        x="532"
        y="138"
        width="116"
        height="68"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="590"
        y="168"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        光源
      </text>
      <text
        x="590"
        y="191"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.warning}
      >
        {isPhoton ? "光子发射" : "直接连接"}
      </text>
      <text
        x="360"
        y="268"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        samples {samples} · bounces {bounces} · photons {photons} · radius{" "}
        {radius.toFixed(2)}
      </text>
      <text
        x="360"
        y="289"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.warning}
      >
        {isDebug
          ? `波动 ${noise.toFixed(3)} · 先记录状态，再修改参数`
          : isPhoton
            ? "光子数量与查询半径共同影响密度估计"
            : "样本数降低噪声，反弹次数扩展间接光路径"}
      </text>
    </svg>
  );
}

export function Cgp32RenderingPracticeLab() {
  const [mode, setMode] = useState<RenderMode>("path tracer");
  const [samples, setSamples] = useState(32);
  const [bounces, setBounces] = useState(3);
  const [photons, setPhotons] = useState(1200);
  const [radius, setRadius] = useState(0.45);

  function reset() {
    setMode("path tracer");
    setSamples(32);
    setBounces(3);
    setPhotons(1200);
    setRadius(0.45);
  }

  const metrics = useMemo(() => {
    const isPhoton = mode === "photon mapping";
    const isDebug = mode === "debug";
    const time = round(
      (samples * (1 + bounces * 0.35) + (isPhoton ? photons / 100 : 0)) / 38,
    );
    const noise = round(
      Math.max(0.035, (isPhoton ? 0.24 : 0.34) / Math.sqrt(samples)),
    );
    const bias = round(
      isPhoton ? radius * 0.16 + 0.018 : isDebug ? 0.22 : 0.012,
    );
    const memory = round(
      isPhoton ? 0.18 + photons / 3600 : 0.08 + bounces * 0.025,
    );
    return { time, noise, bias, memory };
  }, [bounces, mode, photons, samples, radius]);

  return (
    <section
      aria-label="渲染实践专属实验"
      data-visual-kind="cgp-32-rendering-in-practice"
      data-unit-id="cgp-32"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp32 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            渲染实践专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            固定一个场景和像素，比较 path tracer、photon mapping 与 debug
            模式；观察样本、反弹、光子和查询半径如何改变工程反馈。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置渲染实践实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择渲染实现">
        {(["path tracer", "photon mapping", "debug"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => setMode(option)}
            className={
              "min-h-11 rounded-control border px-3 py-2 text-sm " +
              (mode === option
                ? "border-accent bg-accent/10 font-semibold text-primary"
                : "border-border text-secondary")
            }
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-2">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>样本数</span>
            <span className="font-mono text-primary">{samples}</span>
          </span>
          <input
            type="range"
            min="8"
            max="128"
            step="8"
            value={samples}
            onChange={(event) => setSamples(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>最大反弹</span>
            <span className="font-mono text-primary">{bounces}</span>
          </span>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={bounces}
            onChange={(event) => setBounces(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>光子数量</span>
            <span className="font-mono text-primary">{photons}</span>
          </span>
          <input
            type="range"
            min="300"
            max="3000"
            step="150"
            value={photons}
            onChange={(event) => setPhotons(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>查询半径</span>
            <span className="font-mono text-primary">{radius.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={radius}
            onChange={(event) => setRadius(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <RenderScene
          mode={mode}
          samples={samples}
          bounces={bounces}
          photons={photons}
          radius={radius}
        />
      </div>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-4"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">耗时相对值</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.time.toFixed(2)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">噪声</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.noise.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">局部偏差</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.bias.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">额外记忆</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.memory.toFixed(2)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">
        先预测：path tracer 增加样本主要降低噪声，photon mapping
        增加光子主要改善查询证据；若半径过大，局部偏差可能上升。
      </p>
    </section>
  );
}
