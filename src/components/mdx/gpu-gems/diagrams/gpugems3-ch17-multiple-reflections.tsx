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

export function GpuGems3Ch17LayeredDistanceMapDiagram() {
  return (
    <Frame
      ariaLabel="分层距离地图：参考点通过 cubemap 六个方向存储多个表面层，每个 texel 包含距离、法线和材质数据"
      caption="fragment shader 不能直接访问三角网格；分层距离 cubemap 把可搜索的场景几何压缩进纹理。"
      height={440}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        scene geometry → layered distance maps → searchable texture scene
      </text>
      <g transform="translate(42 88)">
        <rect width="188" height="222" rx="14" fill={surface} stroke={accent} />
        <circle
          cx="94"
          cy="92"
          r="54"
          fill={accent}
          fillOpacity={0.1}
          stroke={accent}
          strokeWidth={2}
        />
        <path
          d="M 48 132 L 78 84 L 108 112 L 142 66 L 164 132 Z"
          fill={accent}
          fillOpacity={0.16}
          stroke={accent}
          strokeWidth={2}
        />
        <circle cx="94" cy="92" r="7" fill={warning} />
        <text
          x="94"
          y="174"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          reference point
        </text>
        <text x="94" y="194" textAnchor="middle" fontSize={12} fill={secondary}>
          visible scene surfaces
        </text>
      </g>
      <Arrow x1={254} y1={198} x2={294} y2={198} />
      <g transform="translate(314 72)">
        <rect
          width="194"
          height="254"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="97"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          cube map layers
        </text>
        {Array.from({ length: 4 }).map((_, index) => (
          <g key={`distance-layer-${index}`}>
            <rect
              x={28 + index * 12}
              y={58 + index * 36}
              width={138 - index * 24}
              height="26"
              rx="6"
              fill={warning}
              fillOpacity={0.16 + index * 0.07}
              stroke={warning}
            />
            <text
              x="97"
              y={76 + index * 36}
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              layer {index + 1} · d / N / material
            </text>
          </g>
        ))}
        <text x="97" y="226" textAnchor="middle" fontSize={12} fill={secondary}>
          front hit + occluded hits
        </text>
      </g>
      <Arrow x1={532} y1={198} x2={572} y2={198} color={success} />
      <g transform="translate(592 88)">
        <rect
          width="126"
          height="222"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <path
          d="M 64 56 L 30 150 L 98 150 Z"
          fill={success}
          fillOpacity={0.12}
          stroke={success}
          strokeWidth={2}
        />
        <path
          d="M 64 74 L 108 54 M 64 102 L 104 92 M 64 128 L 98 126"
          stroke={success}
          strokeWidth={3}
        />
        <text
          x="63"
          y="178"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          ray lookup
        </text>
        <text x="63" y="198" textAnchor="middle" fontSize={12} fill={secondary}>
          texture, not mesh
        </text>
      </g>
      <rect
        x="42"
        y="352"
        width="676"
        height="48"
        rx="12"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="373" textAnchor="middle" fontSize={13} fill={secondary}>
        distance sign can mark empty texels; extra layers recover surfaces
        hidden from the reference point
      </text>
      <text x="380" y="391" textAnchor="middle" fontSize={12} fill={success}>
        sampled geometry is enough for secondary-ray search
      </text>
    </Frame>
  );
}

export function GpuGems3Ch17RaySearchDiagram() {
  return (
    <Frame
      ariaLabel="二阶段交点搜索：沿二次射线大步 ray marching 定位符号变化，再用 secant search 在区间内收敛到交点"
      caption="先用较便宜的线性步进保证不漏过表面，再在命中的区间里用 secant search 精确定位。"
      height={410}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        robust hit search: march first, refine second
      </text>
      <rect
        x="54"
        y="86"
        width="652"
        height="178"
        rx="16"
        fill={surface}
        stroke={border}
      />
      <line
        x1="86"
        y1="218"
        x2="674"
        y2="218"
        stroke={border}
        strokeWidth={2}
      />
      <path
        d="M 90 176 C 214 102 310 268 426 152 S 590 108 674 176"
        fill="none"
        stroke={accent}
        strokeWidth={3}
      />
      <line
        x1="94"
        y1="120"
        x2="646"
        y2="238"
        stroke={warning}
        strokeWidth={3}
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
        const x = 112 + index * 72;
        const y = 124 + index * 15;
        return (
          <g key={`march-${index}`}>
            <circle cx={x} cy={y} r="6" fill={warning} />
            <text
              x={x}
              y={y - 12}
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              {index + 1}
            </text>
          </g>
        );
      })}
      <circle
        cx="356"
        cy="176"
        r="10"
        fill={success}
        stroke={primary}
        strokeWidth={2}
      />
      <line
        x1="320"
        y1="176"
        x2="394"
        y2="176"
        stroke={success}
        strokeWidth={2}
        strokeDasharray="5 4"
      />
      <text
        x="356"
        y="156"
        textAnchor="middle"
        fontSize={12}
        fontWeight={700}
        fill={success}
      >
        hit interval
      </text>
      <text x="120" y="294" fontSize={13} fontWeight={700} fill={warning}>
        ray marching: no missed crossing
      </text>
      <text x="438" y="294" fontSize={13} fontWeight={700} fill={success}>
        secant search: accurate crossing
      </text>
      <rect
        x="54"
        y="326"
        width="652"
        height="38"
        rx="10"
        fill={surface}
        stroke={border}
      />
      <text x="380" y="350" textAnchor="middle" fontSize={12} fill={secondary}>
        step size smaller than neighboring texel distance reduces the chance of
        skipping a thin reflected object
      </text>
    </Frame>
  );
}

export function GpuGems3Ch17ReflectionRefractionDiagram() {
  return (
    <Frame
      ariaLabel="镜面路径分叉：法线和视线计算反射与折射方向，Fresnel 项按角度分配反射和透射能量"
      caption="同一命中点可以产生反射或折射路径；Fresnel 让掠射角更偏向反射，折射路径则由折射率决定。"
      height={420}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        hit point + normal + material → reflected / refracted rays
      </text>
      <rect
        x="54"
        y="86"
        width="652"
        height="214"
        rx="16"
        fill={surface}
        stroke={border}
      />
      <line
        x1="370"
        y1="108"
        x2="370"
        y2="282"
        stroke={border}
        strokeWidth={2}
        strokeDasharray="7 5"
      />
      <line
        x1="246"
        y1="112"
        x2="370"
        y2="188"
        stroke={accent}
        strokeWidth={3}
      />
      <path d="M 370 188 L 504 112" stroke={warning} strokeWidth={4} />
      <path
        d="M 494 112 L 504 112 L 498 122"
        fill="none"
        stroke={warning}
        strokeWidth={2.5}
      />
      <path d="M 370 188 L 470 270" stroke={success} strokeWidth={4} />
      <path
        d="M 458 264 L 470 270 L 466 256"
        fill="none"
        stroke={success}
        strokeWidth={2.5}
      />
      <path d="M 370 142 L 370 188" stroke={primary} strokeWidth={2} />
      <circle cx="370" cy="188" r="9" fill={primary} />
      <text x="370" y="104" textAnchor="middle" fontSize={12} fill={primary}>
        N
      </text>
      <text x="286" y="126" fontSize={12} fill={accent}>
        V
      </text>
      <text x="472" y="126" fontSize={12} fill={warning}>
        R = reflect
      </text>
      <text x="462" y="264" fontSize={12} fill={success}>
        T = refract
      </text>
      <text x="78" y="332" fontSize={13} fontWeight={700} fill={warning}>
        Fresnel F
      </text>
      <text x="78" y="354" fontSize={12} fill={secondary}>
        reflected energy
      </text>
      <rect x="222" y="340" width="210" height="16" rx="8" fill={border} />
      <rect x="222" y="340" width="126" height="16" rx="8" fill={warning} />
      <text x="458" y="353" fontSize={12} fill={success}>
        1 − F → transmitted energy
      </text>
    </Frame>
  );
}

export function GpuGems3Ch17MultiplePathDiagram() {
  return (
    <Frame
      ariaLabel="多阶路径循环：每次命中按材料类别选择反射、折射或 diffuse 终点，并在最大深度、黑暗或越界时提前终止"
      caption="多阶反射/折射不是无限递归：动态循环带最大深度，命中 diffuse、路径过暗或搜索失败时都可提前结束。"
      height={430}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        dynamic path loop: reflect, refract, accumulate, terminate
      </text>
      <g transform="translate(48 100)">
        <rect width="150" height="96" rx="14" fill={surface} stroke={accent} />
        <text
          x="75"
          y="42"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          current ray
        </text>
        <text x="75" y="66" textAnchor="middle" fontSize={12} fill={secondary}>
          I · V · N · depth
        </text>
      </g>
      <Arrow x1={222} y1={148} x2={264} y2={148} />
      <g transform="translate(284 72)">
        <rect
          width="180"
          height="152"
          rx="14"
          fill={surface}
          stroke={warning}
        />
        <text
          x="90"
          y="32"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          hit material?
        </text>
        <rect
          x="22"
          y="52"
          width="136"
          height="24"
          rx="6"
          fill={warning}
          fillOpacity={0.14}
          stroke={warning}
        />
        <text x="90" y="69" textAnchor="middle" fontSize={12} fill={secondary}>
          negative IOR → mirror
        </text>
        <rect
          x="22"
          y="88"
          width="136"
          height="24"
          rx="6"
          fill={success}
          fillOpacity={0.14}
          stroke={success}
        />
        <text x="90" y="105" textAnchor="middle" fontSize={12} fill={secondary}>
          positive IOR → glass
        </text>
        <text x="90" y="136" textAnchor="middle" fontSize={12} fill={secondary}>
          zero → diffuse end
        </text>
      </g>
      <Arrow x1={486} y1={116} x2={534} y2={92} color={warning} />
      <Arrow x1={486} y1={178} x2={534} y2={202} color={success} />
      <g transform="translate(552 54)">
        <rect width="166" height="76" rx="14" fill={surface} stroke={warning} />
        <text
          x="83"
          y="32"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={warning}
        >
          reflect + F
        </text>
        <text x="83" y="54" textAnchor="middle" fontSize={12} fill={secondary}>
          continue path
        </text>
      </g>
      <g transform="translate(552 166)">
        <rect width="166" height="76" rx="14" fill={surface} stroke={success} />
        <text
          x="83"
          y="32"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={success}
        >
          refract + 1−F
        </text>
        <text x="83" y="54" textAnchor="middle" fontSize={12} fill={secondary}>
          continue path
        </text>
      </g>
      <path
        d="M 635 130 L 635 166"
        stroke={border}
        strokeWidth={2}
        strokeDasharray="5 4"
      />
      <rect
        x="48"
        y="292"
        width="670"
        height="56"
        rx="12"
        fill={surface}
        stroke={border}
      />
      <text x="383" y="314" textAnchor="middle" fontSize={13} fill={secondary}>
        stop when depth reaches MAXDEPTH, radiance becomes negligible, ray
        leaves the map, or diffuse is hit
      </text>
      <text x="383" y="334" textAnchor="middle" fontSize={12} fill={success}>
        early termination is both a correctness guard and a performance feature
      </text>
    </Frame>
  );
}

export function GpuGems3Ch17MinMaxDiagram() {
  return (
    <Frame
      ariaLabel="min-max 加速：每层距离数据先形成距离上下界，射线先跳过不可能相交的区间，再进入精确搜索"
      caption="min-max pair 不是改变交点定义，而是给线性搜索一个可跳过的安全区间，减少无效纹理查找。"
      height={390}
    >
      <text x="38" y="34" fontSize={14} fontWeight={700} fill={primary}>
        per-layer bounds → skip empty intervals → refine real hit
      </text>
      <g transform="translate(54 90)">
        <rect width="210" height="196" rx="14" fill={surface} stroke={accent} />
        <text
          x="105"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          distance layer
        </text>
        {[0, 1, 2, 3].map((index) => (
          <g key={`bound-${index}`}>
            <rect
              x="28"
              y={54 + index * 30}
              width={136 - index * 18}
              height="12"
              rx="6"
              fill={accent}
              fillOpacity={0.28 + index * 0.12}
            />
            <text x="174" y={64 + index * 30} fontSize={11} fill={secondary}>
              min / max
            </text>
          </g>
        ))}
      </g>
      <Arrow x1={300} y1={188} x2={350} y2={188} color={success} />
      <g transform="translate(370 90)">
        <rect
          width="170"
          height="196"
          rx="14"
          fill={surface}
          stroke={success}
        />
        <text
          x="85"
          y="30"
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={primary}
        >
          ray interval
        </text>
        <line
          x1="28"
          y1="86"
          x2="142"
          y2="86"
          stroke={border}
          strokeWidth={3}
        />
        <line
          x1="28"
          y1="128"
          x2="142"
          y2="128"
          stroke={border}
          strokeWidth={3}
        />
        <rect
          x="54"
          y="76"
          width="42"
          height="20"
          rx="6"
          fill={success}
          fillOpacity={0.2}
          stroke={success}
        />
        <rect
          x="112"
          y="118"
          width="24"
          height="20"
          rx="6"
          fill={warning}
          fillOpacity={0.2}
          stroke={warning}
        />
        <text x="85" y="166" textAnchor="middle" fontSize={12} fill={secondary}>
          skip impossible ranges
        </text>
        <text x="85" y="186" textAnchor="middle" fontSize={12} fill={success}>
          search fewer texels
        </text>
      </g>
      <Arrow x1={576} y1={188} x2={626} y2={188} color={warning} />
      <g transform="translate(646 90)">
        <rect width="72" height="196" rx="14" fill={surface} stroke={warning} />
        <circle
          cx="36"
          cy="82"
          r="16"
          fill={warning}
          fillOpacity={0.2}
          stroke={warning}
          strokeWidth={2}
        />
        <path d="M 20 142 L 52 142" stroke={warning} strokeWidth={4} />
        <text x="36" y="168" textAnchor="middle" fontSize={12} fill={secondary}>
          hit
        </text>
        <text x="36" y="188" textAnchor="middle" fontSize={11} fill={secondary}>
          refine
        </text>
      </g>
    </Frame>
  );
}

type PathMode = "reflect" | "refract" | "mixed";
type SearchMode = "march-secant" | "min-max";
type LayerMode = "two" | "three" | "five";

export function GpuGems3Ch17RobustRayLab() {
  const [pathMode, setPathMode] = useState<PathMode>("mixed");
  const [rayDepth, setRayDepth] = useState(3);
  const [layerMode, setLayerMode] = useState<LayerMode>("three");
  const [searchMode, setSearchMode] = useState<SearchMode>("march-secant");
  const [stepSize, setStepSize] = useState("texel-safe");

  const state = useMemo(() => {
    const layerFactor =
      layerMode === "five" ? 1 : layerMode === "three" ? 0.88 : 0.68;
    const pathFactor = pathMode === "mixed" ? 1 : 0.94;
    const searchFactor = searchMode === "min-max" ? 1.12 : 1;
    const thinRisk = stepSize === "coarse" ? 68 : 24;
    const confidence = Math.min(
      96,
      Math.round(
        (54 + rayDepth * 8) * layerFactor * pathFactor +
          (searchMode === "min-max" ? 8 : 0) -
          (stepSize === "coarse" ? 12 : 0),
      ),
    );
    const radiance = Math.max(
      22,
      Math.round(82 - rayDepth * 7 + (pathMode === "reflect" ? 8 : 0)),
    );
    const work = Math.round((18 + rayDepth * 12) * layerFactor * searchFactor);
    const note =
      stepSize === "coarse"
        ? "步长较大，薄物体可能被跳过；先用低成本预览，再缩小步长复核"
        : searchMode === "min-max"
          ? "min-max bounds 减少无效距离采样，但仍需安全的命中细化"
          : "ray marching 负责不漏交点，secant search 负责把命中点收准";
    return { confidence, radiance, work, thinRisk, note };
  }, [layerMode, pathMode, rayDepth, searchMode, stepSize]);

  function reset() {
    setPathMode("mixed");
    setRayDepth(3);
    setLayerMode("three");
    setSearchMode("march-secant");
    setStepSize("texel-safe");
  }

  return (
    <section
      aria-label="GPU Gems 3 Chapter 17 robust multiple reflection and refraction 实验：调整路径类型、最大深度、距离层数、搜索方法和步长"
      data-visual-kind="gpu-gems3-ch17-multiple-reflections"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">
            Robust Secondary Ray Lab
          </p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            让二次光线既不漏，又能实时跑
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            调整路径类型、最大光线深度、距离地图层数、搜索加速和步长，比较命中可信度、路径亮度、纹理工作量与薄物体漏检风险。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置二次光线实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <svg
            viewBox="0 0 520 410"
            role="img"
            aria-label="二次光线实验输出：从表面命中点发出反射或折射路径，并显示命中可信度和工作量"
            className="mx-auto block h-auto w-full max-w-[520px] rounded-control border border-border bg-bg"
          >
            <text
              x="260"
              y="28"
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill={primary}
            >
              {pathMode === "reflect"
                ? "reflection path"
                : pathMode === "refract"
                  ? "refraction path"
                  : "mixed secondary path"}
            </text>
            <rect
              x="54"
              y="74"
              width="412"
              height="202"
              rx="16"
              fill={surface}
              stroke={border}
            />
            <path
              d="M 100 224 Q 260 92 420 224"
              fill={accent}
              fillOpacity={0.1}
              stroke={accent}
              strokeWidth={2}
            />
            <path
              d="M 260 132 L 260 224"
              stroke={primary}
              strokeWidth={2}
              strokeDasharray="6 5"
            />
            <circle cx="260" cy="224" r="8" fill={primary} />
            <path d="M 260 224 L 380 128" stroke={warning} strokeWidth={4} />
            <path
              d="M 366 128 L 380 128 L 374 140"
              fill="none"
              stroke={warning}
              strokeWidth={2.5}
            />
            <path
              d="M 260 224 L 350 270"
              stroke={success}
              strokeWidth={4}
              opacity={pathMode === "reflect" ? 0.28 : 1}
            />
            <path
              d="M 338 264 L 350 270 L 346 256"
              fill="none"
              stroke={success}
              strokeWidth={2.5}
              opacity={pathMode === "reflect" ? 0.28 : 1}
            />
            <text
              x="260"
              y="112"
              textAnchor="middle"
              fontSize={12}
              fill={primary}
            >
              hit normal
            </text>
            <text x="382" y="126" fontSize={12} fill={warning}>
              F · reflect
            </text>
            <text x="350" y="290" fontSize={12} fill={success}>
              1−F · refract
            </text>
            <rect x="54" y="304" width="412" height="16" rx="8" fill={border} />
            <rect
              x="54"
              y="304"
              width={Math.round(412 * (state.confidence / 100))}
              height="16"
              rx="8"
              fill={success}
            />
            <text
              x="260"
              y="344"
              textAnchor="middle"
              fontSize={12}
              fill={secondary}
            >
              confidence {state.confidence}% · radiance {state.radiance}% · work{" "}
              {state.work} units
            </text>
            <text
              x="260"
              y="366"
              textAnchor="middle"
              fontSize={12}
              fill={state.thinRisk > 50 ? warning : success}
            >
              thin-object miss risk {state.thinRisk}%
            </text>
            <text
              x="260"
              y="390"
              textAnchor="middle"
              fontSize={11}
              fill={secondary}
            >
              layered maps: {layerMode} · max depth: {rayDepth}
            </text>
          </svg>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Metric
              label="hit confidence"
              value={`${state.confidence}%`}
              color={success}
            />
            <Metric
              label="path radiance"
              value={`${state.radiance}%`}
              color={warning}
            />
            <Metric
              label="texture work"
              value={`${state.work} units`}
              color={accent}
            />
            <Metric
              label="thin-object risk"
              value={`${state.thinRisk}%`}
              color={state.thinRisk > 50 ? warning : success}
            />
          </div>
          <p
            className="mt-3 rounded-control border border-border bg-bg p-3 text-xs leading-relaxed text-secondary"
            aria-live="polite"
          >
            {state.note}。这些读数是解释算法取舍的稳定示意，不是特定硬件的
            benchmark。
          </p>
        </div>

        <div className="grid gap-4 p-4">
          <label className="grid gap-2 text-sm text-secondary">
            <span>path mode</span>
            <select
              value={pathMode}
              onChange={(event) => setPathMode(event.target.value as PathMode)}
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="mixed">mixed reflection + refraction</option>
              <option value="reflect">reflection only</option>
              <option value="refract">refraction only</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>maximum ray depth: {rayDepth}</span>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={rayDepth}
              onChange={(event) => setRayDepth(Number(event.target.value))}
              className="min-h-11 accent-accent"
              aria-label="maximum ray depth"
            />
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>distance map layers</span>
            <select
              value={layerMode}
              onChange={(event) =>
                setLayerMode(event.target.value as LayerMode)
              }
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="two">2 layers: front + back</option>
              <option value="three">3 layers: diffuse fallback</option>
              <option value="five">5 layers: complex occlusion</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>search acceleration</span>
            <select
              value={searchMode}
              onChange={(event) =>
                setSearchMode(event.target.value as SearchMode)
              }
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="march-secant">ray march + secant refine</option>
              <option value="min-max">min-max bounds + refine</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-secondary">
            <span>linear search step</span>
            <select
              value={stepSize}
              onChange={(event) => setStepSize(event.target.value)}
              className="min-h-11 rounded-control border border-border bg-bg px-3 text-primary"
            >
              <option value="texel-safe">texel-safe fine step</option>
              <option value="coarse">coarse preview step</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-control border border-border bg-bg p-3">
      <p className="text-xs text-secondary">{label}</p>
      <p className="mt-1 text-base font-semibold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
