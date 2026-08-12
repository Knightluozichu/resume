"use client";

import { useMemo, useState, type ReactNode } from "react";

type WorkloadMode = "graphics" | "compute";
type CullMode = "early" | "late";

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
  const left = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </>
  );
}

export function GpuGems2Ch30HostBandwidthDiagram() {
  const rows = [
    ["GPU local memory", "35 GB/s", COLORS.accent],
    ["PCI Express x16", "8 GB/s", COLORS.warning],
    ["CPU memory interface", "6.4 GB/s", COLORS.secondary],
  ] as const;
  return (
    <Figure>
      <Frame label="GeForce 6 系统带宽图：CPU 通过 PCI Express 或 AGP 把命令、纹理和顶点送入 GPU；原章表格中的 GPU local memory 35 GB/s 高于 PCI Express x16 8 GB/s 和 CPU memory interface 6.4 GB/s">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          GPU 内部带宽远大于主机连接：数据应尽量留在本地
        </text>
        <Panel x={28} y={78} width={210} height={250} title="host CPU" />
        <rect
          x="66"
          y="153"
          width="134"
          height="54"
          rx="9"
          fill={COLORS.surface}
          stroke={COLORS.border}
        />
        <text
          x="133"
          y="186"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.text}
        >
          commands / vertices
        </text>
        <Arrow x1={244} y1={180} x2={286} y2={180} color={COLORS.warning} />
        <Panel
          x={286}
          y={78}
          width={150}
          height={250}
          title="bus"
          stroke={COLORS.warning}
        />
        <text
          x="361"
          y="143"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          PCIe / AGP
        </text>
        <text
          x="361"
          y="207"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          one narrow gate
        </text>
        <Arrow x1={442} y1={180} x2={484} y2={180} color={COLORS.accent} />
        <Panel
          x={484}
          y={78}
          width={208}
          height={250}
          title="GeForce 6 GPU"
          stroke={COLORS.accent}
        />
        <rect
          x="516"
          y="137"
          width="144"
          height="40"
          rx="7"
          fill={COLORS.accent}
          fillOpacity="0.16"
          stroke={COLORS.accent}
        />
        <text
          x="588"
          y="162"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.text}
        >
          vertex + fragment
        </text>
        <rect
          x="516"
          y="199"
          width="144"
          height="40"
          rx="7"
          fill={COLORS.accent}
          fillOpacity="0.16"
          stroke={COLORS.accent}
        />
        <text
          x="588"
          y="224"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.text}
        >
          local frame buffer
        </text>
        {rows.map(([label, value, color], index) => (
          <g key={label}>
            <rect
              x="82"
              y={352 + index * 20}
              width={Number(value.split(" ")[0]) * 10}
              height="12"
              rx="4"
              fill={color}
              fillOpacity="0.55"
            />
            <text
              x="430"
              y={362 + index * 20}
              fontSize="11"
              fill={COLORS.secondary}
            >
              {label}
            </text>
            <text
              x="664"
              y={362 + index * 20}
              textAnchor="end"
              fontSize="11"
              fontWeight="700"
              fill={color}
            >
              {value}
            </text>
          </g>
        ))}
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch30GraphicsPipelineDiagram() {
  const stages = [
    ["command parse", "state + draw"],
    ["vertex fetch", "attributes"],
    ["vertex processor", "transform / skin"],
    ["rasterizer", "triangles → fragments"],
    ["fragment processor", "texture + shader"],
    ["depth / blend", "frame buffer"],
  ] as const;
  return (
    <Figure>
      <Frame label="GeForce 6 图形管线：CPU 命令进入后经过 command parse、vertex fetch、vertex processor、rasterizer、fragment processor 和 depth/blend，最后写入 frame buffer">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          从 CPU 命令到 frame buffer：每一段都有不同的数据形状
        </text>
        {stages.map(([title, detail], index) => {
          const x = 23 + index * 116;
          const color =
            index === 2 || index === 4
              ? COLORS.accent
              : index === 3
                ? COLORS.warning
                : COLORS.border;
          return (
            <g key={title}>
              <rect
                x={x}
                y="105"
                width="94"
                height="166"
                rx="11"
                fill={COLORS.surface}
                stroke={color}
                strokeWidth="2"
              />
              <text
                x={x + 47}
                y="142"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={color}
              >
                {title}
              </text>
              <circle
                cx={x + 47}
                cy="193"
                r="23"
                fill={color}
                fillOpacity="0.16"
                stroke={color}
              />
              <text
                x={x + 47}
                y="198"
                textAnchor="middle"
                fontSize="11"
                fill={COLORS.text}
              >
                stage {index + 1}
              </text>
              <text
                x={x + 47}
                y="239"
                textAnchor="middle"
                fontSize="11"
                fill={COLORS.secondary}
              >
                {detail}
              </text>
              {index < stages.length - 1 ? (
                <Arrow x1={x + 96} y1={188} x2={x + 113} y2={188} />
              ) : null}
            </g>
          );
        })}
        <text
          x="360"
          y="322"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.accent}
        >
          vertex processors operate per vertex；fragment processors operate per
          candidate pixel
        </text>
        <text
          x="360"
          y="365"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          depth rejection can prevent expensive fragment work before the
          fragment processor
        </text>
        <text
          x="360"
          y="397"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          pipeline diagrams describe the data path, not a promise of modern API
          behavior
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch30VertexFragmentDiagram() {
  return (
    <Figure>
      <Frame label="GeForce 6 vertex 与 fragment 单元对比：vertex processor 对每个顶点运行变换、蒙皮和纹理读取；fragment processor 对每个 candidate pixel 运行纹理和 shader，四个像素组成 quad 以计算导数">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          两类可编程单元：输入粒度不同，但都走 fp32 与 texture access
        </text>
        <Panel
          x={28}
          y={79}
          width={300}
          height={261}
          title="vertex processor"
          stroke={COLORS.accent}
        />
        <text
          x="178"
          y="127"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          one vertex → one program instance
        </text>
        {["transform", "skinning", "texture fetch"].map((label, index) => (
          <g key={label}>
            <rect
              x="75"
              y={160 + index * 47}
              width="206"
              height="30"
              rx="7"
              fill={COLORS.accent}
              fillOpacity="0.14"
              stroke={COLORS.accent}
            />
            <text
              x="178"
              y={180 + index * 47}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.text}
            >
              {label}
            </text>
          </g>
        ))}
        <Panel
          x={392}
          y={79}
          width={300}
          height={261}
          title="fragment processor"
          stroke={COLORS.warning}
        />
        <text
          x="542"
          y="127"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          one quad → four candidate pixels
        </text>
        {Array.from({ length: 4 }, (_, index) => (
          <rect
            key={`quad-${index}`}
            x={449 + (index % 2) * 42}
            y={158 + Math.floor(index / 2) * 42}
            width="32"
            height="32"
            rx="5"
            fill={COLORS.warning}
            fillOpacity="0.22"
            stroke={COLORS.warning}
          />
        ))}
        <text
          x="542"
          y="251"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={COLORS.text}
        >
          texture + fragment program
        </text>
        <text
          x="542"
          y="280"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          dFdx / dFdy from neighboring lanes
        </text>
        <Arrow x1={331} y1={209} x2={389} y2={209} />
        <text
          x="360"
          y="375"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          quad locality gives texture LOD derivatives；it also means divergence
          has a cost
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch30NonGraphicsDiagram() {
  return (
    <Figure>
      <Frame label="GeForce 6 非图形计算视图：vertex processor 和 fragment processor 作为两个可编程 fp32 block 串联，texture unit 用作随机数据读取，rasterizer 可把顶点或三角形扩展为 fragments，z-cull 提前丢弃不可见片元">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          去掉“画三角形”的外壳后，仍是一条可编程数据通路
        </text>
        <Panel x={28} y={84} width={142} height={222} title="input data" />
        <text
          x="99"
          y="153"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          vertices / fields
        </text>
        <rect
          x="62"
          y="190"
          width="74"
          height="42"
          rx="7"
          fill={COLORS.surface}
          stroke={COLORS.border}
        />
        <text
          x="99"
          y="216"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.text}
        >
          stream
        </text>
        <Arrow x1={174} y1={195} x2={211} y2={195} />
        <Panel
          x={214}
          y={84}
          width={150}
          height={222}
          title="vertex fp32"
          stroke={COLORS.accent}
        />
        <text
          x="289"
          y="153"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          program + texture
        </text>
        <Arrow x1={368} y1={195} x2={404} y2={195} />
        <Panel
          x={407}
          y={84}
          width={112}
          height={222}
          title="raster"
          stroke={COLORS.warning}
        />
        <text
          x="463"
          y="153"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          expand
        </text>
        <text
          x="463"
          y="206"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          interpolate
        </text>
        <Arrow x1={523} y1={195} x2={558} y2={195} />
        <Panel
          x={561}
          y={84}
          width={131}
          height={222}
          title="fragment fp32"
          stroke={COLORS.accent}
        />
        <text
          x="626"
          y="153"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          compute
        </text>
        <text
          x="626"
          y="206"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          write result
        </text>
        <text
          x="360"
          y="354"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          texture unit supplies random-access data；z-cull can stop invisible
          fragments earlier
        </text>
        <text
          x="360"
          y="391"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          这是原章的非图形抽象，不等于现代 compute shader 的 API 语义
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch30ShaderModelDiagram() {
  return (
    <Figure>
      <Frame label="Shader Model 3.0 对比图：GeForce 6 让 vertex 和 fragment 编程模型在 fp32、texture lookup 和 instruction set 上汇合，同时提高 vertex static/dynamic instruction count，并保留不同输入粒度">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          Shader Model 3.0：两个编程模型向共同能力集合靠拢
        </text>
        <Panel
          x={28}
          y={78}
          width={280}
          height={256}
          title="vertex program"
          stroke={COLORS.accent}
        />
        <Panel
          x={412}
          y={78}
          width={280}
          height={256}
          title="fragment program"
          stroke={COLORS.warning}
        />
        {[
          ["fp32 precision", 122],
          ["texture lookups", 175],
          ["shared instruction set", 228],
        ].map(([label, y]) => (
          <g key={String(label)}>
            <rect
              x="65"
              y={Number(y)}
              width="206"
              height="31"
              rx="7"
              fill={COLORS.accent}
              fillOpacity="0.14"
              stroke={COLORS.accent}
            />
            <text
              x="168"
              y={Number(y) + 21}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.text}
            >
              {label}
            </text>
            <rect
              x="449"
              y={Number(y)}
              width="206"
              height="31"
              rx="7"
              fill={COLORS.warning}
              fillOpacity="0.14"
              stroke={COLORS.warning}
            />
            <text
              x="552"
              y={Number(y) + 21}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.text}
            >
              {label}
            </text>
            <line
              x1="276"
              y1={Number(y) + 15}
              x2="444"
              y2={Number(y) + 15}
              stroke={COLORS.success}
              strokeWidth="2"
              strokeDasharray="6 5"
            />
          </g>
        ))}
        <text
          x="168"
          y="302"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          512 static / 65,536 dynamic instructions
        </text>
        <text
          x="552"
          y="302"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          quad execution + texture pipeline
        </text>
        <text
          x="360"
          y="374"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          共同能力不代表共同工作量：vertex 按顶点，fragment 按 candidate pixel
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch30FeaturePerformanceDiagram() {
  const bars = [
    ["vertices / s", 600, "600 M", COLORS.accent],
    ["texels / s", 6400, "6.4 B", COLORS.warning],
    ["pixels / s", 12800, "12.8 B", COLORS.success],
    ["early z-cull px / clock", 64, "64", COLORS.secondary],
  ] as const;
  return (
    <Figure>
      <Frame label="GeForce 6800 Ultra 原章性能摘要：425 MHz graphics clock、550 MHz memory clock、600 million vertices per second、6.4 billion texels per second、12.8 billion z/stencil-only pixels per second，以及每 clock 64 pixels 的 early z-cull">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          性能表应读成“瓶颈提示”，不是跨世代承诺
        </text>
        <Panel
          x={28}
          y={73}
          width={664}
          height={272}
          title="GeForce 6800 Ultra · historical chapter figures"
        />
        {bars.map(([label, value, display, color], index) => {
          const y = 116 + index * 47;
          const width = (Number(value) / 12800) * 470;
          return (
            <g key={label}>
              <text x="50" y={y + 19} fontSize="12" fill={COLORS.secondary}>
                {label}
              </text>
              <rect
                x="200"
                y={y}
                width="470"
                height="25"
                rx="5"
                fill={COLORS.bg}
                stroke={COLORS.border}
              />
              <rect
                x="200"
                y={y}
                width={Math.max(8, width)}
                height="25"
                rx="5"
                fill={color}
                fillOpacity="0.58"
              />
              <text
                x="650"
                y={y + 19}
                textAnchor="end"
                fontSize="12"
                fontWeight="700"
                fill={color}
              >
                {display}
              </text>
            </g>
          );
        })}
        <text
          x="360"
          y="386"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          先问 workload 是否能触发该单元，再问如何接近峰值
        </text>
      </Frame>
    </Figure>
  );
}

function ArchitectureScene({
  cullMode,
  fragmentDensity,
  lookups,
  mode,
  vertices,
}: {
  cullMode: CullMode;
  fragmentDensity: number;
  lookups: number;
  mode: WorkloadMode;
  vertices: number;
}) {
  const metrics = useMemo(() => {
    const candidateFragments = Math.round(vertices * fragmentDensity);
    const cullRate = 0.18 + (fragmentDensity / 6) * 0.12;
    const shadedFragments =
      cullMode === "early"
        ? Math.round(candidateFragments * (1 - cullRate))
        : candidateFragments;
    const vertexWords = Math.round(vertices * 4);
    const textureWords = Math.round(shadedFragments * lookups);
    const hostWords =
      mode === "graphics"
        ? Math.round(vertices * 2.5)
        : Math.round(vertices * 0.75);
    const shaderOps =
      mode === "graphics"
        ? Math.round(shadedFragments * (10 + lookups * 2))
        : Math.round(shadedFragments * (14 + lookups * 3));
    const quadGroups = Math.ceil(shadedFragments / 4);
    return {
      candidateFragments,
      hostWords,
      quadGroups,
      shadedFragments,
      shaderOps,
      textureWords,
      vertexWords,
    };
  }, [cullMode, fragmentDensity, lookups, mode, vertices]);

  const bars = [
    ["vertex words", metrics.vertexWords, COLORS.accent],
    ["texture words", metrics.textureWords, COLORS.warning],
    ["host words", metrics.hostWords, COLORS.secondary],
  ] as const;
  const maximum = Math.max(...bars.map(([, value]) => value), 1);

  return (
    <svg
      viewBox="0 0 720 470"
      role="img"
      aria-label={`GeForce 6 架构实验：${mode} workload，${vertices} vertices，候选 fragments ${metrics.candidateFragments}，实际 fragment shading ${metrics.shadedFragments}，${cullMode} cull，${metrics.quadGroups} quads，${metrics.shaderOps} shader operations`}
      className="mx-auto block h-auto w-full"
    >
      <rect width="720" height="470" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        GeForce 6 architecture lab · {mode} · {cullMode} cull
      </text>
      <rect
        x="24"
        y="56"
        width="430"
        height="286"
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
        vertex → candidate fragments → shaded quads
      </text>
      <rect
        x="50"
        y="127"
        width="106"
        height="52"
        rx="8"
        fill={COLORS.accent}
        fillOpacity="0.18"
        stroke={COLORS.accent}
      />
      <text
        x="103"
        y="158"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={COLORS.text}
      >
        {vertices} vertices
      </text>
      <Arrow x1={161} y1={153} x2={197} y2={153} />
      <rect
        x="202"
        y="127"
        width="116"
        height="52"
        rx="8"
        fill={COLORS.warning}
        fillOpacity="0.18"
        stroke={COLORS.warning}
      />
      <text
        x="260"
        y="150"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={COLORS.text}
      >
        {metrics.candidateFragments}
      </text>
      <text
        x="260"
        y="167"
        textAnchor="middle"
        fontSize="11"
        fill={COLORS.secondary}
      >
        candidate fragments
      </text>
      <Arrow
        x1={323}
        y1={153}
        x2={359}
        y2={153}
        color={cullMode === "early" ? COLORS.success : COLORS.danger}
      />
      <rect
        x="364"
        y="127"
        width="60"
        height="52"
        rx="8"
        fill={cullMode === "early" ? COLORS.success : COLORS.danger}
        fillOpacity="0.18"
        stroke={cullMode === "early" ? COLORS.success : COLORS.danger}
      />
      <text
        x="394"
        y="158"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={COLORS.text}
      >
        {metrics.shadedFragments}
      </text>
      <text
        x="394"
        y="194"
        textAnchor="middle"
        fontSize="11"
        fill={COLORS.secondary}
      >
        shaded
      </text>
      {Array.from({ length: 16 }, (_, index) => (
        <rect
          key={`lab-quad-${index}`}
          x={56 + (index % 8) * 43}
          y={225 + Math.floor(index / 8) * 43}
          width="30"
          height="30"
          rx="5"
          fill={
            index <
            Math.min(
              16,
              Math.ceil(
                metrics.shadedFragments /
                  Math.max(1, metrics.candidateFragments / 16) /
                  4,
              ),
            )
              ? COLORS.accent
              : COLORS.bg
          }
          fillOpacity="0.55"
          stroke={COLORS.border}
        />
      ))}
      <text
        x="239"
        y="321"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        4 pixels per quad · derivatives + texture LOD
      </text>
      <rect
        x="476"
        y="56"
        width="220"
        height="286"
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
          "shader operations",
          metrics.shaderOps.toLocaleString(),
          COLORS.accent,
        ],
        ["quad groups", metrics.quadGroups.toLocaleString(), COLORS.success],
        [
          "texture words",
          metrics.textureWords.toLocaleString(),
          COLORS.warning,
        ],
        ["host words", metrics.hostWords.toLocaleString(), COLORS.secondary],
      ].map(([label, value, color], index) => (
        <g key={label}>
          <text
            x="494"
            y={128 + index * 44}
            fontSize="12"
            fill={COLORS.secondary}
          >
            {label}
          </text>
          <text
            x="678"
            y={128 + index * 44}
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
        y="365"
        width="672"
        height="80"
        rx="10"
        fill={COLORS.surface}
        stroke={COLORS.border}
      />
      {bars.map(([label, value, color], index) => (
        <g key={label}>
          <text
            x="44"
            y={386 + index * 18}
            fontSize="11"
            fill={COLORS.secondary}
          >
            {label}
          </text>
          <rect
            x="145"
            y={376 + index * 18}
            width="405"
            height="11"
            rx="4"
            fill={COLORS.bg}
            stroke={COLORS.border}
          />
          <rect
            x="145"
            y={376 + index * 18}
            width={(Number(value) / maximum) * 405}
            height="11"
            rx="4"
            fill={color}
            fillOpacity="0.58"
          />
          <text
            x="670"
            y={386 + index * 18}
            textAnchor="end"
            fontSize="11"
            fontWeight="700"
            fill={color}
          >
            {Number(value).toLocaleString()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function GpuGems2Ch30ArchitectureLab() {
  const [mode, setMode] = useState<WorkloadMode>("graphics");
  const [cullMode, setCullMode] = useState<CullMode>("early");
  const [vertices, setVertices] = useState(2048);
  const [fragmentDensity, setFragmentDensity] = useState(3);
  const [lookups, setLookups] = useState(4);

  function reset() {
    setMode("graphics");
    setCullMode("early");
    setVertices(2048);
    setFragmentDensity(3);
    setLookups(4);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 30 GeForce 6 架构实验"
      data-visual-kind="gpu-gems2-ch30-geforce6-architecture"
      data-unit-id="gpg-v2-30"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          GeForce 6 Architecture 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          先预测：把 early z-cull 改成 late，再提高每个元素的 texture
          lookup，哪一项会先放大 fragment 工作？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <ArchitectureScene
            cullMode={cullMode}
            fragmentDensity={fragmentDensity}
            lookups={lookups}
            mode={mode}
            vertices={vertices}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2" aria-label="选择 workload">
            {(["graphics", "compute"] as WorkloadMode[]).map((value) => (
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
          <div className="grid grid-cols-2 gap-2" aria-label="选择深度拒绝位置">
            {(["early", "late"] as CullMode[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={cullMode === value}
                onClick={() => setCullMode(value)}
                className="min-h-11 rounded-md border border-border px-2 py-2 text-xs font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {value} cull
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            vertices：{vertices}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="256"
              max="4096"
              step="256"
              value={vertices}
              onChange={(event) => setVertices(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            fragments / vertex：{fragmentDensity}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="6"
              step="1"
              value={fragmentDensity}
              onChange={(event) =>
                setFragmentDensity(Number(event.target.value))
              }
            />
          </label>
          <label className="block text-sm text-secondary">
            texture lookups：{lookups}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="8"
              step="1"
              value={lookups}
              onChange={(event) => setLookups(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {cullMode === "late"
              ? "故障观察：late cull 仍需先执行 fragment program；不可见片元浪费 texture 与 shader work。"
              : mode === "compute"
                ? "非图形视图：vertex 与 fragment block 可被当作串联的 fp32 计算单元，texture unit 提供随机数据读取。"
                : "图形视图：quad 让 fragment processor 计算导数，early cull 让深度已知不可见的片元跳过昂贵着色。"}
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
