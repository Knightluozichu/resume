"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const surface = "var(--surface)";

function Frame({
  ariaLabel,
  caption,
  children,
  height = 420,
}: {
  ariaLabel: string;
  caption: string;
  children: ReactNode;
  height?: number;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 760 ${height}`}
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path
        d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
      />
    </>
  );
}

export function GpuGems3Ch12AoOverviewDiagram() {
  return (
    <Frame
      ariaLabel="环境光遮挡从网格构建层次圆盘树，远处使用聚合节点，近处递归展开并累加遮挡"
      caption="远处用一个大圆盘近似许多面，近处再展开到更细的节点；自适应遍历把成对求和从 O(n²) 压到接近 O(n log n)。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        mesh → hierarchical disks → receiver occlusion
      </text>
      <g transform="translate(42 78)">
        <path
          d="M 18 182 L 74 70 L 138 182 L 196 92 L 258 182"
          fill="none"
          stroke={border}
          strokeWidth={3}
        />
        <circle
          cx="74"
          cy="70"
          r="18"
          fill={accent}
          fillOpacity={0.18}
          stroke={accent}
        />
        <circle
          cx="138"
          cy="182"
          r="18"
          fill={accent}
          fillOpacity={0.18}
          stroke={accent}
        />
        <circle
          cx="196"
          cy="92"
          r="18"
          fill={accent}
          fillOpacity={0.18}
          stroke={accent}
        />
        <text
          x="138"
          y="230"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          triangle mesh / surface samples
        </text>
      </g>
      <Arrow x1={318} y1={166} x2={368} y2={166} />
      <g transform="translate(388 78)">
        <circle
          cx="110"
          cy="54"
          r="42"
          fill={warning}
          fillOpacity={0.16}
          stroke={warning}
          strokeWidth={2}
        />
        <circle
          cx="66"
          cy="166"
          r="25"
          fill={warning}
          fillOpacity={0.13}
          stroke={warning}
        />
        <circle
          cx="154"
          cy="166"
          r="25"
          fill={warning}
          fillOpacity={0.13}
          stroke={warning}
        />
        <line
          x1="110"
          y1="96"
          x2="74"
          y2="143"
          stroke={border}
          strokeWidth={2}
        />
        <line
          x1="110"
          y1="96"
          x2="146"
          y2="143"
          stroke={border}
          strokeWidth={2}
        />
        <text
          x="110"
          y="50"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={warning}
        >
          parent disk
        </text>
        <text x="110" y="70" textAnchor="middle" fontSize={11} fill={secondary}>
          far: accept
        </text>
        <text
          x="110"
          y="212"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          near: descend to children
        </text>
      </g>
      <Arrow x1={596} y1={134} x2={650} y2={134} color={success} />
      <g transform="translate(654 78)">
        <circle
          cx="46"
          cy="108"
          r="25"
          fill={success}
          fillOpacity={0.16}
          stroke={success}
          strokeWidth={2}
        />
        <line
          x1="46"
          y1="108"
          x2="14"
          y2="58"
          stroke={success}
          strokeWidth={2}
        />
        <line
          x1="46"
          y1="108"
          x2="76"
          y2="50"
          stroke={success}
          strokeWidth={2}
        />
        <text x="46" y="152" textAnchor="middle" fontSize={12} fill={success}>
          receiver p
        </text>
        <text x="46" y="174" textAnchor="middle" fontSize={11} fill={secondary}>
          Σ form factors
        </text>
      </g>
      <rect
        x="46"
        y="342"
        width="666"
        height="44"
        rx="11"
        fill={surface}
        stroke={border}
      />
      <text x="379" y="370" textAnchor="middle" fontSize={13} fill={secondary}>
        远处低频近似，近处高频细节：只在误差值得付费时展开树
      </text>
    </Frame>
  );
}

export function GpuGems3Ch12ArtifactDiagram() {
  return (
    <Frame
      ariaLabel="逐顶点与逐片元环境光遮挡的伪影对比：线性插值条带、圆盘边界和顶点附近 pinching"
      caption="提高采样率不能自动修好近似模型：逐顶点会留下插值条带，逐片元又会暴露圆盘边界和顶点附近的 pinching。"
      height={450}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        original approximation：sampling rate 不是 robustness
      </text>
      <g transform="translate(42 70)">
        <rect
          width="316"
          height="150"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="158"
          y="28"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={warning}
        >
          per-vertex
        </text>
        <path
          d="M 34 118 L 100 58 L 164 118 L 232 54 L 282 118"
          fill="none"
          stroke={border}
          strokeWidth={3}
        />
        <path
          d="M 40 120 C 112 102 176 82 280 112"
          fill="none"
          stroke={accent}
          strokeWidth={12}
          strokeOpacity={0.24}
        />
        <line
          x1="44"
          y1="96"
          x2="276"
          y2="96"
          stroke={warning}
          strokeDasharray="7 6"
          strokeWidth={2}
        />
        <text
          x="158"
          y="142"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          linear interpolation bands
        </text>
      </g>
      <g transform="translate(402 70)">
        <rect width="316" height="150" rx="14" fill={surface} stroke={accent} />
        <text
          x="158"
          y="28"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={accent}
        >
          per-fragment
        </text>
        <path
          d="M 34 118 L 100 58 L 164 118 L 232 54 L 282 118"
          fill="none"
          stroke={border}
          strokeWidth={3}
        />
        <circle
          cx="100"
          cy="58"
          r="28"
          fill={warning}
          fillOpacity={0.12}
          stroke={warning}
          strokeDasharray="5 4"
        />
        <circle
          cx="232"
          cy="54"
          r="24"
          fill={warning}
          fillOpacity={0.12}
          stroke={warning}
          strokeDasharray="5 4"
        />
        <path
          d="M 86 108 C 118 70 146 62 176 92"
          fill="none"
          stroke={warning}
          strokeWidth={9}
          strokeOpacity={0.28}
        />
        <text
          x="158"
          y="142"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          disk boundary + vertex pinching
        </text>
      </g>
      <rect
        x="42"
        y="262"
        width="676"
        height="82"
        rx="14"
        fill={surface}
        stroke={border}
      />
      <text x="62" y="292" fontSize={13} fontWeight={700} fill={primary}>
        诊断顺序
      </text>
      <text x="62" y="318" fontSize={12} fill={secondary}>
        插值条带 → 采样位置不够细；圆盘边界 → parent/children 离散切换；pinching
        → 点太靠近顶点圆盘，d² 让贡献爆炸
      </text>
      <text x="380" y="394" textAnchor="middle" fontSize={13} fill={success}>
        修复应改变近似模型，而不是只把三角形数量乘大
      </text>
    </Frame>
  );
}

export function GpuGems3Ch12TransitionZoneDiagram() {
  return (
    <Frame
      ariaLabel="层次环境光遮挡的 transition zone：在 tooClose 周围把 parent disk 贡献平滑混合到 children 贡献"
      caption="transition zone 把离散的停止/展开决定变成连续权重：外边界偏向 parent，内边界偏向 children，中间平滑过渡。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        transition zone：把树的离散跳转摊平
      </text>
      <line
        x1="86"
        y1="212"
        x2="674"
        y2="212"
        stroke={border}
        strokeWidth={2}
      />
      <line
        x1="86"
        y1="198"
        x2="86"
        y2="226"
        stroke={secondary}
        strokeWidth={2}
      />
      <line
        x1="280"
        y1="190"
        x2="280"
        y2="234"
        stroke={warning}
        strokeWidth={2}
      />
      <line
        x1="480"
        y1="190"
        x2="480"
        y2="234"
        stroke={success}
        strokeWidth={2}
      />
      <line
        x1="674"
        y1="198"
        x2="674"
        y2="226"
        stroke={secondary}
        strokeWidth={2}
      />
      <rect
        x="280"
        y="92"
        width="200"
        height="120"
        fill={accent}
        fillOpacity={0.1}
        stroke={accent}
        strokeDasharray="8 6"
      />
      <path
        d="M 94 116 C 182 116 222 116 278 118"
        fill="none"
        stroke={warning}
        strokeWidth={8}
        strokeOpacity={0.78}
      />
      <path
        d="M 282 118 C 342 128 416 176 478 178"
        fill="none"
        stroke={accent}
        strokeWidth={8}
        strokeOpacity={0.78}
      />
      <path
        d="M 482 178 C 546 178 610 178 666 178"
        fill="none"
        stroke={success}
        strokeWidth={8}
        strokeOpacity={0.78}
      />
      <text x="172" y="90" textAnchor="middle" fontSize={13} fill={warning}>
        parent weight ≈ 1
      </text>
      <text
        x="380"
        y="78"
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill={accent}
      >
        blend by distance
      </text>
      <text x="574" y="90" textAnchor="middle" fontSize={13} fill={success}>
        children weight ≈ 1
      </text>
      <text x="280" y="258" textAnchor="middle" fontSize={12} fill={warning}>
        tooClose · (1 + r)
      </text>
      <text x="480" y="258" textAnchor="middle" fontSize={12} fill={success}>
        tooClose · (1 − r)
      </text>
      <text x="86" y="286" fontSize={12} fill={secondary}>
        farther
      </text>
      <text x="674" y="286" textAnchor="end" fontSize={12} fill={secondary}>
        closer to receiver
      </text>
      <rect
        x="92"
        y="326"
        width="576"
        height="50"
        rx="11"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="348" textAnchor="middle" fontSize={12} fill={secondary}>
        parent contribution × (child area / parent area) + child contribution
      </text>
      <text x="380" y="367" textAnchor="middle" fontSize={12} fill={secondary}>
        面积比避免 parent 被每个 child 重复计算
      </text>
    </Frame>
  );
}

export function GpuGems3Ch12TriangleClipDiagram() {
  return (
    <Frame
      ariaLabel="把三角形按 receiver 的支持平面裁剪成可见部分，再计算 point-to-triangle form factor"
      caption="先裁掉 receiver 背后的三角形区域，再对可见三角形或四边形计算 form factor；否则可见性会被系统性高估。"
      height={440}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        finest level：真实 triangle detail 进入 form factor
      </text>
      <g transform="translate(54 86)">
        <rect
          width="286"
          height="236"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="143"
          y="28"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={warning}
        >
          before clipping
        </text>
        <path
          d="M 44 186 L 120 58 L 248 186 Z"
          fill={warning}
          fillOpacity={0.2}
          stroke={warning}
          strokeWidth={2.5}
        />
        <line
          x1="32"
          y1="140"
          x2="258"
          y2="140"
          stroke={accent}
          strokeWidth={2.5}
          strokeDasharray="8 6"
        />
        <text x="46" y="130" fontSize={12} fill={accent}>
          support plane
        </text>
        <circle cx="120" cy="194" r="7" fill={success} />
        <text
          x="143"
          y="222"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          receiver p + normal n
        </text>
      </g>
      <Arrow x1={370} y1={202} x2={424} y2={202} />
      <g transform="translate(452 86)">
        <rect
          width="252"
          height="236"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="126"
          y="28"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={success}
        >
          visible portion
        </text>
        <path
          d="M 34 186 L 82 106 L 204 106 L 220 186 Z"
          fill={success}
          fillOpacity={0.2}
          stroke={success}
          strokeWidth={2.5}
        />
        <line
          x1="24"
          y1="98"
          x2="228"
          y2="98"
          stroke={accent}
          strokeWidth={2.5}
          strokeDasharray="8 6"
        />
        <text x="126" y="80" textAnchor="middle" fontSize={12} fill={accent}>
          clip to plane
        </text>
        <text
          x="126"
          y="222"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          3 vertices → triangle/quad
        </text>
      </g>
      <text x="380" y="378" textAnchor="middle" fontSize={13} fill={secondary}>
        signed distance + epsilon 处理 on-plane 顶点，避免边界抖动
      </text>
    </Frame>
  );
}

export function GpuGems3Ch12ConvergenceDiagram() {
  return (
    <Frame
      ariaLabel="环境光遮挡迭代用最近两次结果的 weighted minimum 强制收敛，并用距离衰减和三角衰减调节艺术效果"
      caption="原始迭代可能在高遮挡场景中来回摆动；对最近两次结果做偏向较小值的加权混合，再用距离和三角衰减控制过暗与局部细节。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        iterative AO：收敛约束与可调参数
      </text>
      <g transform="translate(48 78)">
        <rect
          width="184"
          height="156"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="92"
          y="28"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={warning}
        >
          pass k−1
        </text>
        <path
          d="M 28 114 C 64 54 120 140 158 72"
          fill="none"
          stroke={warning}
          strokeWidth={6}
        />
        <text x="92" y="142" textAnchor="middle" fontSize={12} fill={secondary}>
          occlusion₀
        </text>
      </g>
      <Arrow x1={254} y1={156} x2={302} y2={156} />
      <g transform="translate(322 78)">
        <rect width="184" height="156" rx="14" fill={surface} stroke={accent} />
        <text
          x="92"
          y="28"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={accent}
        >
          weighted minimum
        </text>
        <path
          d="M 28 112 C 64 74 120 116 158 86"
          fill="none"
          stroke={success}
          strokeWidth={6}
        />
        <text x="92" y="142" textAnchor="middle" fontSize={12} fill={secondary}>
          0.7 · min + 0.3 · max
        </text>
      </g>
      <Arrow x1={528} y1={156} x2={576} y2={156} color={success} />
      <g transform="translate(596 78)">
        <rect
          width="122"
          height="156"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="61"
          y="28"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={success}
        >
          stable
        </text>
        <text x="61" y="70" textAnchor="middle" fontSize={12} fill={secondary}>
          less flicker
        </text>
        <text x="61" y="94" textAnchor="middle" fontSize={12} fill={secondary}>
          less over-dark
        </text>
      </g>
      <rect
        x="48"
        y="278"
        width="670"
        height="88"
        rx="14"
        fill={surface}
        stroke={border}
      />
      <text x="70" y="307" fontSize={13} fontWeight={700} fill={primary}>
        两个旋钮的语义
      </text>
      <text x="70" y="332" fontSize={12} fill={secondary}>
        distance attenuation ↑ → 远处贡献更快变亮；triangle attenuation ↓ →
        细缝/台阶等小特征更突出
      </text>
      <text x="70" y="353" fontSize={12} fill={secondary}>
        它们改变的是目标函数，不是把近似结果冒充 ray-traced ground truth
      </text>
    </Frame>
  );
}

export function GpuGems3Ch12PerformanceDiagram() {
  return (
    <Frame
      ariaLabel="高质量环境光遮挡的性能账本：层次圆盘预计算、屏幕可见片元、三角形裁剪和自适应遍历"
      caption="高质量路径把额外工作集中在可见片元和近处细节：层次阶段减少远处遍历，裁剪阶段避免为不可见三角形计算 form factor。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        performance ledger：画质提升来自有选择的额外工作
      </text>
      <g transform="translate(46 92)">
        <rect
          width="154"
          height="112"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="77"
          y="32"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={warning}
        >
          coarse disks
        </text>
        <text x="77" y="62" textAnchor="middle" fontSize={12} fill={secondary}>
          hierarchy pass
        </text>
        <text x="77" y="84" textAnchor="middle" fontSize={12} fill={secondary}>
          small batch
        </text>
      </g>
      <Arrow x1={222} y1={148} x2={276} y2={148} />
      <g transform="translate(298 92)">
        <rect width="174" height="112" rx="14" fill={surface} stroke={accent} />
        <text
          x="87"
          y="32"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={accent}
        >
          visible fragments
        </text>
        <text x="87" y="62" textAnchor="middle" fontSize={12} fill={secondary}>
          adaptive traversal
        </text>
        <text x="87" y="84" textAnchor="middle" fontSize={12} fill={secondary}>
          high-quality factor
        </text>
      </g>
      <Arrow x1={494} y1={148} x2={548} y2={148} color={success} />
      <g transform="translate(570 92)">
        <rect
          width="144"
          height="112"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="72"
          y="32"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={success}
        >
          result
        </text>
        <text x="72" y="62" textAnchor="middle" fontSize={12} fill={secondary}>
          smooth shadow
        </text>
        <text x="72" y="84" textAnchor="middle" fontSize={12} fill={secondary}>
          sharp contact
        </text>
      </g>
      <rect
        x="46"
        y="258"
        width="668"
        height="76"
        rx="14"
        fill={surface}
        stroke={border}
      />
      <text x="70" y="288" fontSize={13} fontWeight={700} fill={primary}>
        profile first
      </text>
      <text x="70" y="313" fontSize={12} fill={secondary}>
        关注 total fragments、tree visits 和 branch cost；高质量 form factor
        更稳健，但分支多、batch 小，吞吐可能下降
      </text>
    </Frame>
  );
}

type SamplingMode = "vertex" | "fragment";
type RobustnessMode = "original" | "smooth" | "triangle";

export function GpuGems3Ch12AmbientOcclusionLab() {
  const [sampling, setSampling] = useState<SamplingMode>("fragment");
  const [robustness, setRobustness] = useState<RobustnessMode>("smooth");
  const [traversalDepth, setTraversalDepth] = useState(8);
  const [distanceAttenuation, setDistanceAttenuation] = useState(0.6);
  const [triangleAttenuation, setTriangleAttenuation] = useState(0.7);

  const state = useMemo(() => {
    const interpolationArtifact = sampling === "vertex" ? 72 : 22;
    const discontinuity =
      robustness === "original" ? 76 : robustness === "smooth" ? 24 : 24;
    const pinch =
      robustness === "triangle" ? 18 : robustness === "original" ? 74 : 48;
    const localDetail = Math.round(
      Math.min(
        94,
        34 + traversalDepth * 4 + (robustness === "triangle" ? 22 : 0),
      ),
    );
    const farBrightness = Math.round(42 + distanceAttenuation * 28);
    const work = Math.round(
      24 +
        traversalDepth * 5 +
        (sampling === "fragment" ? 24 : 8) +
        (robustness === "triangle" ? 22 : 0),
    );
    return {
      interpolationArtifact,
      discontinuity,
      pinch,
      localDetail,
      farBrightness,
      work,
    };
  }, [distanceAttenuation, robustness, sampling, traversalDepth]);

  function reset() {
    setSampling("fragment");
    setRobustness("smooth");
    setTraversalDepth(8);
    setDistanceAttenuation(0.6);
    setTriangleAttenuation(0.7);
  }

  const sampleCells = Array.from({ length: 12 }, (_, index) => {
    const stripe = Math.abs(index - 5.5) / 5.5;
    const base = Math.round(28 + stripe * 42 + state.localDetail * 0.18);
    const artifact =
      sampling === "vertex" && (index === 3 || index === 8) ? 28 : 0;
    const detail =
      robustness === "triangle" && (index === 4 || index === 5 || index === 6)
        ? 18
        : 0;
    return Math.max(
      16,
      Math.min(94, base + artifact - detail + triangleAttenuation * 8),
    );
  });

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 3 Chapter 12 ambient occlusion 实验：调整采样方式、鲁棒修复、遍历深度、距离衰减和三角衰减"
      data-visual-kind="gpu-gems3-ch12-high-quality-ambient-occlusion"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          High-Quality Ambient Occlusion Lab
        </p>
        <p className="mt-1 text-sm text-secondary">
          猜一猜：把 traversal depth 调大，或把 sampling 从 vertex 切到
          fragment，哪些伪影会下降，哪类 GPU 工作会上升？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_248px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg
            viewBox="0 0 580 390"
            role="img"
            aria-label="实验结果：插值条带、圆盘边界、pinching、局部细节、远处亮度与估算工作量"
            className="block h-auto w-full"
          >
            <text
              x="290"
              y="25"
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill={primary}
            >
              {sampling === "vertex" ? "per-vertex" : "per-fragment"} ·{" "}
              {robustness} fix · depth {traversalDepth}
            </text>
            <rect
              x="24"
              y="48"
              width="532"
              height="96"
              rx="14"
              fill={surface}
              stroke={border}
            />
            {sampleCells.map((value, index) => {
              const x = 42 + index * 42;
              const color =
                value > 78 ? warning : value > 54 ? accent : success;
              return (
                <rect
                  key={`cell-${index}`}
                  x={x}
                  y={128 - value * 0.72}
                  width="30"
                  height={value * 0.72}
                  rx="5"
                  fill={color}
                  fillOpacity={0.22}
                  stroke={color}
                />
              );
            })}
            <text
              x="290"
              y="166"
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              receiver surface · darker means more local occlusion
            </text>
            <g transform="translate(38 202)">
              <text x="0" y="0" fontSize={12} fill={secondary}>
                插值条带
              </text>
              <rect
                x="86"
                y="-13"
                width="316"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="86"
                y="-13"
                width={(316 * state.interpolationArtifact) / 100}
                height="13"
                rx="6"
                fill={warning}
                fillOpacity={0.78}
              />
              <text x="414" y="0" fontSize={12} fill={warning}>
                {state.interpolationArtifact}%
              </text>
              <text x="0" y="34" fontSize={12} fill={secondary}>
                圆盘边界
              </text>
              <rect
                x="86"
                y="21"
                width="316"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="86"
                y="21"
                width={(316 * state.discontinuity) / 100}
                height="13"
                rx="6"
                fill={accent}
                fillOpacity={0.78}
              />
              <text x="414" y="34" fontSize={12} fill={accent}>
                {state.discontinuity}%
              </text>
              <text x="0" y="68" fontSize={12} fill={secondary}>
                vertex pinching
              </text>
              <rect
                x="86"
                y="55"
                width="316"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="86"
                y="55"
                width={(316 * state.pinch) / 100}
                height="13"
                rx="6"
                fill={warning}
                fillOpacity={0.78}
              />
              <text x="414" y="68" fontSize={12} fill={warning}>
                {state.pinch}%
              </text>
            </g>
            <rect
              x="38"
              y="302"
              width="504"
              height="54"
              rx="11"
              fill={surface}
              stroke={border}
            />
            <text x="58" y="325" fontSize={12} fill={success}>
              local detail {state.localDetail}%
            </text>
            <text
              x="290"
              y="325"
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              far brightness {state.farBrightness}%
            </text>
            <text x="522" y="325" textAnchor="end" fontSize={12} fill={accent}>
              work {state.work} units
            </text>
            <text
              x="290"
              y="346"
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              趋势示意：实际画质仍需用真实 GPU profile 验证
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            sampling mode
            <select
              className="mt-2 block min-h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={sampling}
              onChange={(event) =>
                setSampling(event.target.value as SamplingMode)
              }
            >
              <option value="vertex">per-vertex · cheaper</option>
              <option value="fragment">per-fragment · sharper</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            robustness path
            <select
              className="mt-2 block min-h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={robustness}
              onChange={(event) =>
                setRobustness(event.target.value as RobustnessMode)
              }
            >
              <option value="original">original disks</option>
              <option value="smooth">transition zone</option>
              <option value="triangle">triangle detail</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            traversal depth：{traversalDepth}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="2"
              max="12"
              value={traversalDepth}
              onChange={(event) =>
                setTraversalDepth(Number(event.target.value))
              }
            />
          </label>
          <label className="block text-sm text-secondary">
            distance attenuation：{distanceAttenuation.toFixed(1)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={distanceAttenuation}
              onChange={(event) =>
                setDistanceAttenuation(Number(event.target.value))
              }
            />
          </label>
          <label className="block text-sm text-secondary">
            triangle attenuation：{triangleAttenuation.toFixed(1)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0.2"
              max="1.4"
              step="0.1"
              value={triangleAttenuation}
              onChange={(event) =>
                setTriangleAttenuation(Number(event.target.value))
              }
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {robustness === "original"
              ? "原始圆盘路径最便宜，但会保留边界与 pinching。"
              : robustness === "smooth"
                ? "过渡区抑制 parent/children 的离散跳变；继续加深遍历会让残余断层更淡。"
                : "三角形路径把真实局部面带回最低层，细节更锐利，但裁剪与分支更重。"}
          </p>
          <button
            type="button"
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            onClick={reset}
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
