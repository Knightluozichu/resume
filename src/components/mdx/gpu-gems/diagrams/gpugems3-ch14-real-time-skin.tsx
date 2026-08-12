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

export function GpuGems3Ch14SkinLayersDiagram() {
  return (
    <Frame
      ariaLabel="皮肤三层模型：表面镜面反射、表皮与真皮中的散射吸收，以及薄区域的透射"
      caption="真实皮肤不是一层漫反射颜色：表面高光、组织内的散射吸收和薄区域透射共同决定柔软外观。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        skin = surface reflectance + subsurface transport + transmission
      </text>
      <g transform="translate(68 84)">
        <rect
          width="252"
          height="236"
          rx="16"
          fill={surface}
          stroke={warning}
          strokeWidth={2}
        />
        <path
          d="M 30 76 C 74 54 132 96 222 68"
          fill="none"
          stroke={warning}
          strokeWidth={16}
          strokeOpacity={0.3}
        />
        <text
          x="126"
          y="40"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={warning}
        >
          surface
        </text>
        <text
          x="126"
          y="118"
          textAnchor="middle"
          fontSize={13}
          fill={secondary}
        >
          specular BRDF
        </text>
        <text
          x="126"
          y="144"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          grazing highlights
        </text>
        <path
          d="M 42 174 C 94 144 154 206 212 166"
          fill="none"
          stroke={accent}
          strokeWidth={24}
          strokeOpacity={0.22}
        />
        <text x="126" y="210" textAnchor="middle" fontSize={13} fill={accent}>
          epidermis / dermis
        </text>
      </g>
      <Arrow x1={360} y1={204} x2={414} y2={204} />
      <g transform="translate(438 84)">
        <rect
          width="254"
          height="236"
          rx="16"
          fill={surface}
          stroke={accent}
          strokeWidth={2}
        />
        <circle
          cx="122"
          cy="78"
          r="23"
          fill={warning}
          fillOpacity={0.2}
          stroke={warning}
        />
        <path
          d="M 122 102 C 74 130 74 174 122 200 C 170 174 170 130 122 102"
          fill={accent}
          fillOpacity={0.12}
          stroke={accent}
          strokeWidth={2}
        />
        <line
          x1="122"
          y1="78"
          x2="76"
          y2="162"
          stroke={success}
          strokeWidth={3}
          strokeDasharray="8 6"
        />
        <line
          x1="122"
          y1="78"
          x2="168"
          y2="162"
          stroke={success}
          strokeWidth={3}
          strokeDasharray="8 6"
        />
        <text
          x="127"
          y="42"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={accent}
        >
          light exits nearby
        </text>
        <text
          x="127"
          y="226"
          textAnchor="middle"
          fontSize={12}
          fill={secondary}
        >
          soft glow + local detail
        </text>
      </g>
      <rect
        x="68"
        y="350"
        width="624"
        height="44"
        rx="11"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="378" textAnchor="middle" fontSize={13} fill={secondary}>
        只做 diffuse 会“干硬”；只做 blur 又会丢掉表面高光与薄耳朵透光
      </text>
    </Frame>
  );
}

export function GpuGems3Ch14SpecularDiagram() {
  return (
    <Frame
      ariaLabel="Phong 与物理合理镜面 BRDF 对比：掠射角下物理模型的高光增强与能量约束"
      caption="Phong 能快速给出高光，但在掠射角和能量守恒上不够可信；更物理的 BRDF 只增加少量 shader 工作就能改善脸部反射。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        specular response：grazing angle 是人眼敏感区
      </text>
      <line
        x1="88"
        y1="286"
        x2="684"
        y2="286"
        stroke={border}
        strokeWidth={2}
      />
      <line x1="88" y1="72" x2="88" y2="286" stroke={border} strokeWidth={2} />
      <path
        d="M 100 266 C 194 264 240 250 310 218 C 406 174 508 122 670 108"
        fill="none"
        stroke={warning}
        strokeWidth={5}
      />
      <path
        d="M 100 266 C 202 260 264 238 340 196 C 446 138 550 86 670 76"
        fill="none"
        stroke={accent}
        strokeWidth={5}
      />
      <text x="104" y="60" fontSize={12} fill={secondary}>
        reflected intensity
      </text>
      <text x="668" y="312" textAnchor="end" fontSize={12} fill={secondary}>
        grazing angle →
      </text>
      <text x="604" y="112" fontSize={12} fill={accent}>
        physical BRDF
      </text>
      <text x="604" y="148" fontSize={12} fill={warning}>
        Phong
      </text>
      <rect
        x="106"
        y="334"
        width="558"
        height="48"
        rx="11"
        fill={surface}
        stroke={border}
      />
      <text x="385" y="363" textAnchor="middle" fontSize={13} fill={secondary}>
        镜面不是独立“加一层”：反射掉的能量会减少可供次表面散射的入射光
      </text>
    </Frame>
  );
}

export function GpuGems3Ch14DiffusionProfileDiagram() {
  return (
    <Frame
      ariaLabel="RGB diffusion profile：以激光点为中心的红绿蓝散射曲线，红光传播距离最远"
      caption="diffusion profile 描述一点入射光在不同距离、不同颜色上重新出射多少；红光通常比绿光和蓝光扩散得更远。"
      height={440}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        one laser dot → three color-dependent halos
      </text>
      <line
        x1="88"
        y1="300"
        x2="686"
        y2="300"
        stroke={border}
        strokeWidth={2}
      />
      <line x1="88" y1="76" x2="88" y2="300" stroke={border} strokeWidth={2} />
      <path
        d="M 100 286 C 132 254 152 128 196 112 C 240 126 260 252 300 286"
        fill="none"
        stroke={warning}
        strokeWidth={5}
      />
      <path
        d="M 100 290 C 154 272 186 174 232 164 C 278 174 316 270 360 290"
        fill="none"
        stroke={success}
        strokeWidth={5}
      />
      <path
        d="M 100 294 C 180 286 224 214 268 206 C 322 216 374 284 438 294"
        fill="none"
        stroke={accent}
        strokeWidth={5}
      />
      <circle cx="248" cy="286" r="8" fill={primary} />
      <text x="248" y="326" textAnchor="middle" fontSize={12} fill={secondary}>
        incident point
      </text>
      <text x="620" y="112" fontSize={12} fill={warning}>
        red · wider
      </text>
      <text x="620" y="150" fontSize={12} fill={success}>
        green
      </text>
      <text x="620" y="188" fontSize={12} fill={accent}>
        blue · narrower
      </text>
      <text x="88" y="60" fontSize={12} fill={secondary}>
        emitted light
      </text>
      <text x="680" y="326" textAnchor="end" fontSize={12} fill={secondary}>
        distance on surface →
      </text>
      <rect
        x="104"
        y="354"
        width="560"
        height="48"
        rx="11"
        fill={surface}
        stroke={border}
      />
      <text x="384" y="383" textAnchor="middle" fontSize={13} fill={secondary}>
        物理 profile 的形状很重要：宽底色 + 窄尖峰共同构成柔软又有细节的皮肤
      </text>
    </Frame>
  );
}

export function GpuGems3Ch14GaussianSumDiagram() {
  return (
    <Frame
      ariaLabel="diffusion profile 被六个 Gaussian 核近似：每个核单独卷积，再按权重线性组合"
      caption="把径向 profile 拆成多个 Gaussian 后，每个 Gaussian 都能做可分离 U/V 卷积，最后按同样的权重线性组合。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        profile ≈ weighted sum of Gaussians
      </text>
      <g transform="translate(44 86)">
        <rect
          width="168"
          height="168"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="84"
          y="30"
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={warning}
        >
          target profile
        </text>
        <path
          d="M 22 136 C 56 116 68 52 86 48 C 106 54 114 112 146 136"
          fill="none"
          stroke={warning}
          strokeWidth={5}
        />
        <text x="84" y="150" textAnchor="middle" fontSize={12} fill={secondary}>
          radial, not separable
        </text>
      </g>
      <Arrow x1={240} y1={170} x2={286} y2={170} />
      <g transform="translate(310 70)">
        {Array.from({ length: 6 }, (_, index) => {
          const x = (index % 3) * 116;
          const y = Math.floor(index / 3) * 112;
          return (
            <g key={`gaussian-${index}`} transform={`translate(${x} ${y})`}>
              <rect
                width="98"
                height="84"
                rx="11"
                fill={surface}
                stroke={accent}
              />
              <path
                d="M 13 66 C 34 58 48 24 60 22 C 73 26 80 56 88 66"
                fill="none"
                stroke={accent}
                strokeWidth={3}
              />
              <text
                x="49"
                y="76"
                textAnchor="middle"
                fontSize={11}
                fill={secondary}
              >
                G{index + 1} · w{index + 1}
              </text>
            </g>
          );
        })}
        <text
          x="174"
          y="228"
          textAnchor="middle"
          fontSize={13}
          fill={secondary}
        >
          each Gaussian → separable blur
        </text>
      </g>
      <Arrow x1={686} y1={170} x2={718} y2={170} color={success} />
      <text x="718" y="212" textAnchor="end" fontSize={13} fill={success}>
        Σ wi · Gi
      </text>
      <rect
        x="50"
        y="334"
        width="660"
        height="46"
        rx="11"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="363" textAnchor="middle" fontSize={13} fill={secondary}>
        一次 2D 4096-tap blur → 两次 1D 64 + 64 taps，再复用六张中间纹理
      </text>
    </Frame>
  );
}

export function GpuGems3Ch14TextureSpaceDiagram() {
  return (
    <Frame
      ariaLabel="纹理空间扩散管线：3D 网格以 UV 作为屏幕坐标渲染 irradiance，执行 U/V 模糊，再回到 3D 最终合成"
      caption="纹理空间扩散把 3D 邻域问题变成 2D 纹理处理：UV 展开、irradiance、U/V 可分离卷积、最终 3D 合成。"
      height={450}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        texture-space diffusion：unwrap once, blur many, shade once
      </text>
      <g transform="translate(44 84)">
        <rect width="154" height="158" rx="14" fill={surface} stroke={accent} />
        <path
          d="M 28 118 L 62 44 L 126 74 L 112 132 Z"
          fill={accent}
          fillOpacity={0.14}
          stroke={accent}
          strokeWidth={2}
        />
        <text
          x="77"
          y="28"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={accent}
        >
          3D mesh
        </text>
        <text x="77" y="142" textAnchor="middle" fontSize={12} fill={secondary}>
          UV as render coords
        </text>
      </g>
      <Arrow x1={222} y1={164} x2={266} y2={164} />
      <g transform="translate(286 84)">
        <rect
          width="156"
          height="158"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <rect
          x="30"
          y="48"
          width="96"
          height="62"
          rx="8"
          fill={warning}
          fillOpacity={0.18}
          stroke={warning}
        />
        <circle cx="56" cy="78" r="12" fill={warning} fillOpacity={0.6} />
        <text
          x="78"
          y="28"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={warning}
        >
          irradiance
        </text>
        <text x="78" y="140" textAnchor="middle" fontSize={12} fill={secondary}>
          incoming light
        </text>
      </g>
      <Arrow x1={466} y1={164} x2={510} y2={164} />
      <g transform="translate(530 84)">
        <rect
          width="184"
          height="158"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <rect
          x="24"
          y="48"
          width="58"
          height="62"
          rx="8"
          fill={success}
          fillOpacity={0.14}
          stroke={success}
        />
        <rect
          x="102"
          y="48"
          width="58"
          height="62"
          rx="8"
          fill={success}
          fillOpacity={0.14}
          stroke={success}
        />
        <text
          x="53"
          y="82"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={success}
        >
          U
        </text>
        <text
          x="131"
          y="82"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={success}
        >
          V
        </text>
        <text
          x="92"
          y="28"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={success}
        >
          blur passes
        </text>
        <text x="92" y="140" textAnchor="middle" fontSize={12} fill={secondary}>
          combine in final 3D pass
        </text>
      </g>
      <text x="380" y="294" textAnchor="middle" fontSize={13} fill={secondary}>
        world-space distance ≠ UV distance → stretch map adjusts tap spacing in
        U and V
      </text>
      <rect
        x="48"
        y="326"
        width="664"
        height="54"
        rx="12"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="358" textAnchor="middle" fontSize={13} fill={secondary}>
        纹理空间让卷积便宜，但 seam、拉伸和重叠 UV 成为新的正确性边界
      </text>
    </Frame>
  );
}

export function GpuGems3Ch14TransmissionDiagram() {
  return (
    <Frame
      ariaLabel="半透明阴影图处理薄耳朵：计算穿过表面的深度厚度，连接到光照侧，再复用卷积 irradiance"
      caption="薄区域透射不是把背面直接加亮：translucent shadow map 提供穿透厚度，并连接到光照侧可复用的散射纹理。"
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        thin region transmission：耳朵不是普通 diffuse
      </text>
      <g transform="translate(60 84)">
        <rect
          width="190"
          height="198"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <path
          d="M 74 164 C 24 122 40 56 92 48 C 146 40 170 94 122 164 Z"
          fill={warning}
          fillOpacity={0.16}
          stroke={warning}
          strokeWidth={2.5}
        />
        <line
          x1="40"
          y1="70"
          x2="150"
          y2="140"
          stroke={accent}
          strokeWidth={3}
          strokeDasharray="8 6"
        />
        <text
          x="95"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={warning}
        >
          light-facing side
        </text>
        <text x="95" y="184" textAnchor="middle" fontSize={12} fill={secondary}>
          surface depth
        </text>
      </g>
      <Arrow x1={292} y1={182} x2={340} y2={182} />
      <g transform="translate(362 84)">
        <rect width="176" height="198" rx="14" fill={surface} stroke={accent} />
        <path
          d="M 26 72 L 150 72 L 150 128 L 26 128 Z"
          fill={accent}
          fillOpacity={0.14}
          stroke={accent}
        />
        <text
          x="88"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={accent}
        >
          translucent shadow map
        </text>
        <text x="88" y="99" textAnchor="middle" fontSize={12} fill={secondary}>
          thickness through skin
        </text>
        <text x="88" y="118" textAnchor="middle" fontSize={12} fill={secondary}>
          connect to lit UV
        </text>
        <text x="88" y="174" textAnchor="middle" fontSize={12} fill={secondary}>
          reuse blurred irradiance
        </text>
      </g>
      <Arrow x1={580} y1={182} x2={628} y2={182} color={success} />
      <g transform="translate(648 84)">
        <rect width="72" height="198" rx="14" fill={surface} stroke={success} />
        <path
          d="M 16 146 C 24 106 46 96 58 54"
          stroke={success}
          strokeWidth={11}
          strokeOpacity={0.26}
        />
        <text x="36" y="174" textAnchor="middle" fontSize={12} fill={success}>
          warm
        </text>
        <text x="36" y="192" textAnchor="middle" fontSize={11} fill={secondary}>
          glow
        </text>
      </g>
      <text x="380" y="340" textAnchor="middle" fontSize={13} fill={secondary}>
        same convolution textures can serve local scattering and thin-surface
        transmission
      </text>
    </Frame>
  );
}

type ProfileMode = "physical" | "broad-sharp" | "single";
type PipelineMode = "six-blurs" | "two-blurs" | "direct";
type ThinMode = "off" | "shadow-map";

export function GpuGems3Ch14SkinRenderingLab() {
  const [profile, setProfile] = useState<ProfileMode>("physical");
  const [pipeline, setPipeline] = useState<PipelineMode>("six-blurs");
  const [kernelCount, setKernelCount] = useState(6);
  const [textureSize, setTextureSize] = useState(1024);
  const [thinMode, setThinMode] = useState<ThinMode>("shadow-map");

  const state = useMemo(() => {
    const profileAccuracy =
      profile === "physical" ? 92 : profile === "broad-sharp" ? 68 : 38;
    const resolutionDetail =
      textureSize === 2048 ? 92 : textureSize === 1024 ? 72 : 48;
    const transmission = thinMode === "shadow-map" ? 86 : 24;
    const quality = Math.min(
      98,
      Math.round(
        profileAccuracy * 0.38 +
          resolutionDetail * 0.24 +
          kernelCount * 4 +
          transmission * 0.14,
      ),
    );
    const bandwidth = Math.round(
      textureSize / 64 + kernelCount * (pipeline === "direct" ? 9 : 5),
    );
    const softness = Math.round(
      Math.min(96, 28 + kernelCount * 7 + (profile === "physical" ? 12 : 0)),
    );
    const seamRisk = Math.max(
      12,
      Math.round(
        76 - (textureSize / 2048) * 20 - (profile === "physical" ? 8 : 0),
      ),
    );
    return { quality, bandwidth, softness, seamRisk, transmission };
  }, [kernelCount, pipeline, profile, textureSize, thinMode]);

  function reset() {
    setProfile("physical");
    setPipeline("six-blurs");
    setKernelCount(6);
    setTextureSize(1024);
    setThinMode("shadow-map");
  }

  const haloBars = Array.from({ length: 10 }, (_, index) => {
    const distance = Math.abs(index - 4.5);
    const red = Math.max(
      16,
      Math.round(92 - distance * 16 + (profile === "physical" ? 8 : 0)),
    );
    const green = Math.max(12, Math.round(72 - distance * 17));
    const blue = Math.max(10, Math.round(54 - distance * 15));
    return { red, green, blue };
  });

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 3 Chapter 14 skin rendering 实验：调整 diffusion profile、卷积路径、kernel 数、纹理分辨率和薄区域透射"
      data-visual-kind="gpu-gems3-ch14-real-time-skin"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Real-Time Skin Rendering Lab
        </p>
        <p className="mt-1 text-sm text-secondary">
          猜一猜：把 Gaussian kernels
          调多会带来多少柔软度，又会付出多少带宽？打开薄区域透射后，画质提升来自哪条额外路径？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg
            viewBox="0 0 590 430"
            role="img"
            aria-label="实验结果：RGB 皮肤扩散光晕、柔软度、画质、带宽、seam 风险和透射"
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
              {profile} profile · {pipeline} · {kernelCount} kernels ·{" "}
              {textureSize}px
            </text>
            <rect
              x="24"
              y="48"
              width="542"
              height="152"
              rx="14"
              fill={surface}
              stroke={border}
            />
            {haloBars.map(({ red, green, blue }, index) => {
              const x = 48 + index * 48;
              return (
                <g key={`halo-${index}`}>
                  <rect
                    x={x}
                    y={150 - red}
                    width="18"
                    height={red}
                    rx="5"
                    fill={warning}
                    fillOpacity={0.58}
                  />
                  <rect
                    x={x + 18}
                    y={150 - green}
                    width="12"
                    height={green}
                    rx="4"
                    fill={success}
                    fillOpacity={0.55}
                  />
                  <rect
                    x={x + 30}
                    y={150 - blue}
                    width="10"
                    height={blue}
                    rx="4"
                    fill={accent}
                    fillOpacity={0.55}
                  />
                </g>
              );
            })}
            <circle cx="284" cy="162" r="8" fill={primary} />
            <text
              x="295"
              y="182"
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              incident light → RGB diffusion halo → translucent appearance
            </text>
            <g transform="translate(38 232)">
              <text x="0" y="0" fontSize={12} fill={secondary}>
                profile quality
              </text>
              <rect
                x="112"
                y="-13"
                width="304"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="112"
                y="-13"
                width={(304 * state.quality) / 100}
                height="13"
                rx="6"
                fill={success}
                fillOpacity={0.8}
              />
              <text x="426" y="0" fontSize={12} fill={success}>
                {state.quality}%
              </text>
              <text x="0" y="34" fontSize={12} fill={secondary}>
                softness
              </text>
              <rect
                x="112"
                y="21"
                width="304"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="112"
                y="21"
                width={(304 * state.softness) / 100}
                height="13"
                rx="6"
                fill={accent}
                fillOpacity={0.8}
              />
              <text x="426" y="34" fontSize={12} fill={accent}>
                {state.softness}%
              </text>
              <text x="0" y="68" fontSize={12} fill={secondary}>
                seam risk
              </text>
              <rect
                x="112"
                y="55"
                width="304"
                height="13"
                rx="6"
                fill={border}
              />
              <rect
                x="112"
                y="55"
                width={(304 * state.seamRisk) / 100}
                height="13"
                rx="6"
                fill={warning}
                fillOpacity={0.8}
              />
              <text x="426" y="68" fontSize={12} fill={warning}>
                {state.seamRisk}%
              </text>
            </g>
            <rect
              x="38"
              y="332"
              width="504"
              height="58"
              rx="11"
              fill={surface}
              stroke={border}
            />
            <text x="58" y="357" fontSize={12} fill={success}>
              thin transmission {state.transmission}%
            </text>
            <text
              x="290"
              y="357"
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              bandwidth {state.bandwidth} units
            </text>
            <text x="522" y="357" textAnchor="end" fontSize={12} fill={warning}>
              not ground truth
            </text>
            <text
              x="290"
              y="379"
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              趋势示意：用真实 GPU profile 决定最终预算
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            diffusion profile
            <select
              className="mt-2 block min-h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={profile}
              onChange={(event) =>
                setProfile(event.target.value as ProfileMode)
              }
            >
              <option value="physical">physical sum-of-Gaussians</option>
              <option value="broad-sharp">broad + sharp artistic</option>
              <option value="single">single Gaussian</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            convolution path
            <select
              className="mt-2 block min-h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={pipeline}
              onChange={(event) =>
                setPipeline(event.target.value as PipelineMode)
              }
            >
              <option value="six-blurs">six textures · U/V separable</option>
              <option value="two-blurs">two broad passes</option>
              <option value="direct">direct 2D convolution</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            Gaussian kernels：{kernelCount}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="2"
              max="8"
              value={kernelCount}
              onChange={(event) => setKernelCount(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            irradiance texture
            <select
              className="mt-2 block min-h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={textureSize}
              onChange={(event) => setTextureSize(Number(event.target.value))}
            >
              <option value="512">512px · distant character</option>
              <option value="1024">1024px · hero character</option>
              <option value="2048">2048px · close-up</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            thin-region transmission
            <select
              className="mt-2 block min-h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={thinMode}
              onChange={(event) => setThinMode(event.target.value as ThinMode)}
            >
              <option value="shadow-map">translucent shadow map</option>
              <option value="off">local scattering only</option>
            </select>
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {pipeline === "direct"
              ? "直接二维卷积最直观，但 tap 数和带宽会迅速上涨。"
              : pipeline === "two-blurs"
                ? "少量宽/窄 blur 便宜，但未必拟合三层皮肤 profile。"
                : "多张 Gaussian 纹理按物理 profile 组合，画质更稳但要保留中间 buffer。"}{" "}
            {thinMode === "shadow-map"
              ? "薄区域复用透射厚度，耳朵等部位更可信。"
              : "关闭透射后，薄区域只剩局部散射。"}
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
