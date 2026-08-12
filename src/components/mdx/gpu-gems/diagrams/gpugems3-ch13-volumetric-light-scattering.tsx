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

export function GpuGems3Ch13ScatteringOverviewDiagram() {
  return (
    <Frame
      ariaLabel="体积光散射后处理流程：场景图像、屏幕空间光源位置、沿像素到光源的射线采样和加法合成"
      caption="把复杂场景压成一张图像：后处理只沿像素到屏幕空间光源的方向取样，再把衰减后的样本相加。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        scene image → screen-space ray → additive scattering
      </text>
      <g transform="translate(42 82)">
        <rect width="190" height="174" rx="14" fill={surface} stroke={border} />
        <circle
          cx="54"
          cy="50"
          r="21"
          fill={warning}
          fillOpacity={0.2}
          stroke={warning}
          strokeWidth={2}
        />
        <path
          d="M 20 148 L 20 104 L 60 78 L 88 108 L 124 62 L 170 148 Z"
          fill={accent}
          fillOpacity={0.18}
          stroke={accent}
        />
        <rect x="20" y="148" width="150" height="10" rx="5" fill={border} />
        <text
          x="95"
          y="196"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          source frame
        </text>
        <text x="95" y="218" textAnchor="middle" fontSize={12} fill={secondary}>
          任意动画场景
        </text>
      </g>
      <Arrow x1={268} y1={166} x2={316} y2={166} />
      <g transform="translate(338 82)">
        <rect width="190" height="174" rx="14" fill={surface} stroke={accent} />
        <circle
          cx="154"
          cy="42"
          r="20"
          fill={warning}
          fillOpacity={0.2}
          stroke={warning}
          strokeWidth={2}
        />
        <text x="154" y="46" textAnchor="middle" fontSize={11} fill={warning}>
          light
        </text>
        <circle cx="42" cy="134" r="8" fill={success} />
        {[0, 1, 2, 3, 4].map((index) => (
          <g key={`ray-${index}`}>
            <line
              x1="42"
              y1="134"
              x2={154 - index * 5}
              y2={42 + index * 8}
              stroke={accent}
              strokeOpacity={0.42}
              strokeWidth={1.5}
            />
            <circle
              cx={64 + index * 18}
              cy={116 - index * 15}
              r="5"
              fill={success}
              fillOpacity={0.8}
            />
          </g>
        ))}
        <text
          x="95"
          y="196"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          pixel samples
        </text>
        <text x="95" y="218" textAnchor="middle" fontSize={12} fill={secondary}>
          density · decay · weight
        </text>
      </g>
      <Arrow x1={574} y1={166} x2={622} y2={166} color={success} />
      <g transform="translate(644 82)">
        <rect width="74" height="174" rx="14" fill={surface} stroke={success} />
        <path
          d="M 16 142 L 28 116 L 40 94 L 52 68 L 64 42"
          stroke={success}
          strokeWidth={9}
          strokeOpacity={0.3}
        />
        <path
          d="M 18 144 L 31 118 L 42 96 L 54 70 L 66 42"
          stroke={success}
          strokeWidth={3}
        />
        <text
          x="37"
          y="196"
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={success}
        >
          shafts
        </text>
        <text x="37" y="218" textAnchor="middle" fontSize={11} fill={secondary}>
          output
        </text>
      </g>
      <rect
        x="42"
        y="320"
        width="676"
        height="50"
        rx="12"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="350" textAnchor="middle" fontSize={13} fill={secondary}>
        只处理屏幕上的像素，不要求预先生成体积网格或为每个物体同步设置场景
      </text>
    </Frame>
  );
}

export function GpuGems3Ch13ScreenRayDiagram() {
  return (
    <Frame
      ariaLabel="屏幕空间射线采样：从像素位置沿指向光源的方向以 density 间距取多个样本"
      caption="每个像素拥有自己的屏幕空间射线；样本越密，条带越少但纹理带宽与像素着色成本越高。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        one pixel, one ray, many image samples
      </text>
      <rect
        x="48"
        y="76"
        width="664"
        height="220"
        rx="14"
        fill={surface}
        stroke={border}
      />
      <circle
        cx="636"
        cy="124"
        r="27"
        fill={warning}
        fillOpacity={0.2}
        stroke={warning}
        strokeWidth={2.5}
      />
      <text
        x="636"
        y="128"
        textAnchor="middle"
        fontSize={12}
        fontWeight={700}
        fill={warning}
      >
        light
      </text>
      <circle cx="120" cy="248" r="10" fill={success} />
      <text x="120" y="280" textAnchor="middle" fontSize={12} fill={success}>
        receiver pixel
      </text>
      <line
        x1="120"
        y1="248"
        x2="636"
        y2="124"
        stroke={accent}
        strokeOpacity={0.35}
        strokeWidth={4}
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
        const t = (index + 1) / 9;
        return (
          <g key={`sample-${index}`}>
            <circle
              cx={120 + (636 - 120) * t}
              cy={248 + (124 - 248) * t}
              r="8"
              fill={index === 3 || index === 4 ? warning : accent}
              fillOpacity={0.2}
              stroke={index === 3 || index === 4 ? warning : accent}
              strokeWidth={2}
            />
            <text
              x={120 + (636 - 120) * t}
              y={272 - index * 4}
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              {index + 1}
            </text>
          </g>
        );
      })}
      <path
        d="M 150 222 C 270 176 404 170 570 136"
        fill="none"
        stroke={warning}
        strokeWidth={2}
        strokeDasharray="7 6"
      />
      <text x="340" y="106" textAnchor="middle" fontSize={12} fill={accent}>
        deltaTexCoord = (pixel − light) / samples × density
      </text>
      <text x="380" y="336" textAnchor="middle" fontSize={13} fill={secondary}>
        increase density → smaller separation → brighter shafts over a shorter
        screen-space range
      </text>
      <text x="380" y="364" textAnchor="middle" fontSize={12} fill={secondary}>
        sample hit emissive region → add light；sample hit occluder → reduce the
        accumulated source
      </text>
    </Frame>
  );
}

export function GpuGems3Ch13AttenuationDiagram() {
  return (
    <Frame
      ariaLabel="体积光散射后处理的衰减曲线：weight 控制单个样本，decay 让距离更远的样本衰减，exposure 缩放最终亮度"
      caption="三个参数分工不同：weight 改每次加多少，decay 改沿射线走远后的衰减，exposure 最后统一缩放输出。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        additive samples with controlled falloff
      </text>
      <line
        x1="92"
        y1="292"
        x2="682"
        y2="292"
        stroke={border}
        strokeWidth={2}
      />
      <line x1="92" y1="78" x2="92" y2="292" stroke={border} strokeWidth={2} />
      <path
        d="M 104 100 C 198 116 252 152 330 184 C 428 224 534 258 670 278"
        fill="none"
        stroke={accent}
        strokeWidth={4}
      />
      <path
        d="M 104 100 C 194 102 260 116 350 144 C 456 176 552 224 670 264"
        fill="none"
        stroke={success}
        strokeWidth={4}
      />
      <path
        d="M 104 100 C 194 100 282 100 380 100 C 496 100 588 100 670 100"
        fill="none"
        stroke={warning}
        strokeWidth={4}
      />
      <text x="104" y="70" fontSize={12} fill={secondary}>
        contribution
      </text>
      <text x="670" y="316" textAnchor="end" fontSize={12} fill={secondary}>
        sample index i → farther from light
      </text>
      <text x="628" y="274" fontSize={12} fill={accent}>
        decay 0.82
      </text>
      <text x="628" y="235" fontSize={12} fill={success}>
        decay 0.92
      </text>
      <text x="628" y="96" fontSize={12} fill={warning}>
        weight only
      </text>
      <rect
        x="104"
        y="344"
        width="566"
        height="48"
        rx="11"
        fill={surface}
        stroke={border}
      />
      <text x="387" y="373" textAnchor="middle" fontSize={13} fill={secondary}>
        weight ↑ 或 exposure ↑ → 更亮；decay ↓ → 更快落下、shaft 更短
      </text>
    </Frame>
  );
}

export function GpuGems3Ch13OcclusionMethodsDiagram() {
  return (
    <Frame
      ariaLabel="屏幕空间遮挡的三种处理：黑色无纹理 occlusion pre-pass、stencil 标记和降低纹理对比度"
      caption="屏幕空间采样把颜色当作可见性线索；pre-pass 与 stencil 先去掉纹理干扰，contrast 方法则降低错误条纹的可见度。"
      height={450}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        screen-space occlusion：让样本看见“遮挡”，而不是看见纹理
      </text>
      <g transform="translate(42 76)">
        <rect width="208" height="210" rx="14" fill={surface} stroke={accent} />
        <text
          x="104"
          y="30"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={accent}
        >
          pre-pass
        </text>
        <rect x="28" y="58" width="152" height="76" rx="10" fill={border} />
        <circle cx="54" cy="88" r="11" fill={primary} />
        <path d="M 74 126 L 102 82 L 134 126 Z" fill={primary} />
        <text
          x="104"
          y="164"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          occluders = black
        </text>
        <text
          x="104"
          y="187"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          then add shafts
        </text>
      </g>
      <g transform="translate(276 76)">
        <rect
          width="208"
          height="210"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="104"
          y="30"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={success}
        >
          stencil
        </text>
        <rect
          x="28"
          y="58"
          width="152"
          height="76"
          rx="10"
          fill={surface}
          stroke={border}
        />
        <circle
          cx="54"
          cy="88"
          r="11"
          fill={warning}
          fillOpacity={0.3}
          stroke={warning}
        />
        <path d="M 74 126 L 102 82 L 134 126 Z" fill={border} />
        <rect
          x="43"
          y="148"
          width="122"
          height="15"
          rx="7"
          fill={success}
          fillOpacity={0.2}
          stroke={success}
        />
        <text
          x="104"
          y="188"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          emissive pixels marked
        </text>
      </g>
      <g transform="translate(510 76)">
        <rect
          width="208"
          height="210"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="104"
          y="30"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={warning}
        >
          contrast
        </text>
        <path
          d="M 28 126 C 58 76 82 148 108 92 C 132 44 156 122 180 78"
          fill="none"
          stroke={warning}
          strokeWidth={7}
          strokeOpacity={0.24}
        />
        <path
          d="M 28 126 C 58 108 82 126 108 108 C 132 92 156 112 180 98"
          fill="none"
          stroke={warning}
          strokeWidth={4}
        />
        <text
          x="104"
          y="164"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          fog / aerial perspective
        </text>
        <text
          x="104"
          y="187"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          hides streaking
        </text>
      </g>
      <text x="380" y="342" textAnchor="middle" fontSize={13} fill={secondary}>
        选择依据：能改 source buffer → pre-pass；已有 bit budget →
        stencil；不能改内容 → contrast / fog / fade
      </text>
      <text x="380" y="370" textAnchor="middle" fontSize={12} fill={secondary}>
        多光源可以逐个 screen-space pass 做 additive blend
      </text>
    </Frame>
  );
}

export function GpuGems3Ch13CaveatsDiagram() {
  return (
    <Frame
      ariaLabel="体积光散射的边界问题：屏幕边缘样本离开可见区域、近光源前后景排序错误和光源接近屏幕垂直方向"
      caption="这是屏幕空间近似的边界：guard band 减少边缘闪烁，深度/遮挡处理缓和前后景错误，clamp 或 fade 避免光源投影趋于无穷。"
      height={440}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        post-process caveats：屏幕空间不是完整体积
      </text>
      <g transform="translate(46 78)">
        <rect
          width="202"
          height="202"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <rect
          x="28"
          y="48"
          width="146"
          height="118"
          rx="8"
          fill={border}
          fillOpacity={0.28}
          stroke={border}
        />
        <circle cx="170" cy="54" r="14" fill={warning} stroke={warning} />
        <path
          d="M 50 146 L 82 104 L 120 146"
          stroke={accent}
          strokeWidth={9}
          strokeOpacity={0.34}
        />
        <path
          d="M 74 136 L 170 58"
          stroke={accent}
          strokeWidth={2}
          strokeDasharray="6 5"
        />
        <text
          x="101"
          y="188"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          edge flicker → guard band
        </text>
      </g>
      <g transform="translate(278 78)">
        <rect width="202" height="202" rx="14" fill={surface} stroke={accent} />
        <rect
          x="26"
          y="48"
          width="150"
          height="118"
          rx="8"
          fill={border}
          fillOpacity={0.22}
          stroke={border}
        />
        <path
          d="M 42 146 L 92 86 L 142 146 Z"
          fill={warning}
          fillOpacity={0.3}
          stroke={warning}
        />
        <path
          d="M 50 132 L 164 72"
          stroke={success}
          strokeWidth={8}
          strokeOpacity={0.3}
        />
        <text
          x="101"
          y="188"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          shaft in front → depth caveat
        </text>
      </g>
      <g transform="translate(510 78)">
        <rect
          width="202"
          height="202"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <circle
          cx="100"
          cy="106"
          r="58"
          fill="none"
          stroke={border}
          strokeWidth={2}
        />
        <line
          x1="100"
          y1="106"
          x2="186"
          y2="56"
          stroke={success}
          strokeWidth={3}
        />
        <path
          d="M 144 80 L 188 56 L 162 112"
          fill={success}
          fillOpacity={0.18}
          stroke={success}
        />
        <text
          x="101"
          y="188"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          perpendicular → clamp / fade
        </text>
      </g>
      <text x="380" y="338" textAnchor="middle" fontSize={13} fill={secondary}>
        近似有效的前提：emissive region 比 occluder
        明亮，且采样射线仍在可见屏幕范围内
      </text>
    </Frame>
  );
}

export function GpuGems3Ch13BandwidthDiagram() {
  return (
    <Frame
      ariaLabel="体积光散射性能选择：全分辨率采样、低分辨率加双线性过滤和多光源叠加"
      caption="降低分辨率可以减纹理带宽，但需要过滤与更好的采样图案来控制条带；多光源则按光源数量重复 screen-space pass。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        quality / bandwidth / pass count
      </text>
      <g transform="translate(44 88)">
        <rect
          width="180"
          height="132"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="90"
          y="30"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={warning}
        >
          full resolution
        </text>
        <rect
          x="26"
          y="54"
          width="128"
          height="48"
          rx="8"
          fill={warning}
          fillOpacity={0.16}
          stroke={warning}
        />
        <text x="90" y="84" textAnchor="middle" fontSize={12} fill={secondary}>
          sharp · bandwidth high
        </text>
      </g>
      <Arrow x1={248} y1={154} x2={292} y2={154} />
      <g transform="translate(314 88)">
        <rect width="180" height="132" rx="14" fill={surface} stroke={accent} />
        <text
          x="90"
          y="30"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={accent}
        >
          downsample
        </text>
        <rect
          x="40"
          y="54"
          width="82"
          height="48"
          rx="8"
          fill={accent}
          fillOpacity={0.16}
          stroke={accent}
        />
        <text x="90" y="84" textAnchor="middle" fontSize={12} fill={secondary}>
          filter · less BW
        </text>
      </g>
      <Arrow x1={518} y1={154} x2={562} y2={154} color={success} />
      <g transform="translate(584 88)">
        <rect
          width="132"
          height="132"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="66"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={success}
        >
          extra light
        </text>
        <line
          x1="26"
          y1="62"
          x2="106"
          y2="62"
          stroke={success}
          strokeWidth={6}
          strokeOpacity={0.36}
        />
        <line
          x1="26"
          y1="80"
          x2="106"
          y2="80"
          stroke={success}
          strokeWidth={6}
          strokeOpacity={0.55}
        />
        <text x="66" y="110" textAnchor="middle" fontSize={12} fill={secondary}>
          × passes
        </text>
      </g>
      <rect
        x="44"
        y="270"
        width="672"
        height="62"
        rx="14"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="298" textAnchor="middle" fontSize={13} fill={primary}>
        先决定像素预算，再决定 samples、分辨率、filter 和 pass 数
      </text>
      <text x="380" y="320" textAnchor="middle" fontSize={12} fill={secondary}>
        stochastic pattern 可打散低采样规则条带，但需要 temporal / spatial
        过滤配合
      </text>
    </Frame>
  );
}

type OcclusionMode = "none" | "prepass" | "stencil";

export function GpuGems3Ch13ScatteringLab() {
  const [mode, setMode] = useState<OcclusionMode>("prepass");
  const [samples, setSamples] = useState(24);
  const [density, setDensity] = useState(0.75);
  const [decay, setDecay] = useState(0.9);
  const [exposure, setExposure] = useState(1.1);

  const state = useMemo(() => {
    const occlusionFactor =
      mode === "none" ? 0.58 : mode === "prepass" ? 0.92 : 0.86;
    const shaftReach = Math.min(
      96,
      Math.round(
        22 +
          samples *
            density *
            (0.55 + decay * 0.55) *
            exposure *
            occlusionFactor,
      ),
    );
    const streaking = Math.max(
      10,
      Math.round(
        74 - samples * 1.9 - density * 18 + (mode === "none" ? 18 : 0),
      ),
    );
    const leakage = mode === "none" ? 68 : mode === "prepass" ? 18 : 24;
    const bandwidth = Math.round(
      samples * (0.8 + density) * (mode === "stencil" ? 0.88 : 1),
    );
    const brightness = Math.min(
      98,
      Math.round(34 + exposure * 28 + decay * 18 + (mode === "none" ? 8 : 0)),
    );
    return { shaftReach, streaking, leakage, bandwidth, brightness };
  }, [decay, density, exposure, mode, samples]);

  function reset() {
    setMode("prepass");
    setSamples(24);
    setDensity(0.75);
    setDecay(0.9);
    setExposure(1.1);
  }

  const rays = Array.from({ length: 9 }, (_, index) => {
    const y = 76 + index * 31;
    const length = 180 + state.shaftReach * 2.3 - index * 9;
    return { y, length };
  });

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 3 Chapter 13 volumetric light scattering 实验：调整 occlusion 方法、采样数、density、decay 和 exposure"
      data-visual-kind="gpu-gems3-ch13-volumetric-light-scattering"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Volumetric Light Scattering Lab
        </p>
        <p className="mt-1 text-sm text-secondary">
          猜一猜：把 samples 或 exposure 调大，光束会更稳定还是只会更亮？把
          occlusion mode 切到 none，又会暴露哪一种 screen-space 错觉？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_248px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg
            viewBox="0 0 590 430"
            role="img"
            aria-label="实验结果：光束延伸、条纹、遮挡泄漏、采样带宽和整体亮度"
            className="block h-auto w-full"
          >
            <text
              x="295"
              y="25"
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill={primary}
            >
              {mode} · {samples} samples · density {density.toFixed(2)}
            </text>
            <rect
              x="24"
              y="48"
              width="542"
              height="196"
              rx="14"
              fill={surface}
              stroke={border}
            />
            <circle
              cx="506"
              cy="86"
              r="22"
              fill={warning}
              fillOpacity={0.2}
              stroke={warning}
              strokeWidth={2}
            />
            <text
              x="506"
              y="90"
              textAnchor="middle"
              fontSize={11}
              fill={warning}
            >
              light
            </text>
            {rays.map(({ y, length }, index) => (
              <g key={`beam-${index}`}>
                <line
                  x1="78"
                  y1={y + 42}
                  x2={Math.min(494, 78 + length)}
                  y2={y}
                  stroke={index % 3 === 0 ? success : accent}
                  strokeOpacity={0.14 + decay * 0.22}
                  strokeWidth={index % 3 === 0 ? 11 : 7}
                />
                <circle
                  cx={138 + index * 24}
                  cy={y + 32}
                  r="6"
                  fill={mode === "none" && index % 3 === 1 ? warning : accent}
                  fillOpacity={0.4}
                />
              </g>
            ))}
            <path
              d="M 72 218 L 126 156 L 184 218 Z"
              fill={border}
              stroke={secondary}
              strokeWidth={2}
            />
            <text
              x="128"
              y="236"
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              occluder
            </text>
            <text
              x="295"
              y="272"
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              post-process light shafts · longer bars mean wider screen-space
              reach
            </text>
            <g transform="translate(38 304)">
              <text x="0" y="0" fontSize={12} fill={secondary}>
                streaking
              </text>
              <rect
                x="86"
                y="-13"
                width="312"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="86"
                y="-13"
                width={(312 * state.streaking) / 100}
                height="13"
                rx="6"
                fill={warning}
                fillOpacity={0.78}
              />
              <text x="410" y="0" fontSize={12} fill={warning}>
                {state.streaking}%
              </text>
              <text x="0" y="34" fontSize={12} fill={secondary}>
                occlusion leakage
              </text>
              <rect
                x="86"
                y="21"
                width="312"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="86"
                y="21"
                width={(312 * state.leakage) / 100}
                height="13"
                rx="6"
                fill={accent}
                fillOpacity={0.78}
              />
              <text x="410" y="34" fontSize={12} fill={accent}>
                {state.leakage}%
              </text>
              <text x="0" y="68" fontSize={12} fill={secondary}>
                shaft brightness
              </text>
              <rect
                x="86"
                y="55"
                width="312"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="86"
                y="55"
                width={(312 * state.brightness) / 100}
                height="13"
                rx="6"
                fill={success}
                fillOpacity={0.78}
              />
              <text x="410" y="68" fontSize={12} fill={success}>
                {state.brightness}%
              </text>
            </g>
            <rect
              x="38"
              y="388"
              width="504"
              height="25"
              rx="9"
              fill={surface}
              stroke={border}
            />
            <text
              x="290"
              y="405"
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              sample bandwidth: {state.bandwidth} units · conceptual trend,
              verify with GPU profile
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            occlusion method
            <select
              className="mt-2 block min-h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={mode}
              onChange={(event) => setMode(event.target.value as OcclusionMode)}
            >
              <option value="none">none · raw image</option>
              <option value="prepass">black occlusion pre-pass</option>
              <option value="stencil">emissive stencil bit</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            samples：{samples}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="8"
              max="48"
              step="4"
              value={samples}
              onChange={(event) => setSamples(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            density：{density.toFixed(2)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0.25"
              max="1.25"
              step="0.05"
              value={density}
              onChange={(event) => setDensity(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            decay：{decay.toFixed(2)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0.7"
              max="0.98"
              step="0.01"
              value={decay}
              onChange={(event) => setDecay(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            exposure：{exposure.toFixed(1)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0.4"
              max="2"
              step="0.1"
              value={exposure}
              onChange={(event) => setExposure(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {mode === "none"
              ? "没有遮挡预处理，原始纹理会被当成可见性线索，条纹和漏光更明显。"
              : mode === "prepass"
                ? "黑色无纹理 pre-pass 把遮挡物与材质颜色分开，适合能控制 source buffer 的管线。"
                : "stencil 只允许带 emissive bit 的样本参与累加，适合已有 stencil/alpha 通道的路径。"}
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
