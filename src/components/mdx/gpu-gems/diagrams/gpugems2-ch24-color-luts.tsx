"use client";

import { useMemo, useState, type ReactNode } from "react";

type LatticeSize = 2 | 8 | 16 | 32;

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

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
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
      viewBox="0 0 720 390"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height="390" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = COLORS.accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = round(x2 - size * Math.cos(angle - Math.PI / 6));
  const leftY = round(y2 - size * Math.sin(angle - Math.PI / 6));
  const rightX = round(x2 - size * Math.cos(angle + Math.PI / 6));
  const rightY = round(y2 - size * Math.sin(angle + Math.PI / 6));
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function GpuGems2Ch24ColorPipelineDiagram() {
  return (
    <Figure>
      <Frame label="三维颜色查找表流程：先将复杂颜色操作烘焙到小型颜色格点，再用源图颜色索引三维纹理得到实时结果">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          Color Transform LUT：复杂度在烘焙期，运行时只做查表
        </text>
        <rect
          x="28"
          y="91"
          width="156"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="106"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          identity lattice
        </text>
        <text
          x="106"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          RGB domain
        </text>
        <text
          x="106"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          small proxy image
        </text>
        <text
          x="106"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          known sample points
        </text>
        <Arrow x1={198} y1={185} x2={232} y2={185} />
        <rect
          x="244"
          y="91"
          width="176"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="332"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          offline grading
        </text>
        <text
          x="332"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          curves · levels
        </text>
        <text
          x="332"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          hue · saturation
        </text>
        <text
          x="332"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          bake operator chain
        </text>
        <Arrow x1={434} y1={185} x2={468} y2={185} color={COLORS.success} />
        <rect
          x="480"
          y="91"
          width="212"
          height="188"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="586"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          runtime shader
        </text>
        <text
          x="586"
          y="164"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          sample source RGB
        </text>
        <text
          x="586"
          y="198"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          tex3D(adjusted RGB)
        </text>
        <text
          x="586"
          y="232"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          transformed output
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          运算链再长，应用阶段仍是一条 dependent 3D texture lookup
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch24LutDimensionDiagram() {
  return (
    <Figure>
      <Frame label="一维与三维颜色查找表对比：一维表独立映射通道，三维立方体允许 RGB 通道交叉影响">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          1D vs 3D LUT：能否表达 channel cross-talk
        </text>
        <rect
          x="34"
          y="78"
          width="294"
          height="218"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="181"
          y="114"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          three independent 1D curves
        </text>
        {[COLORS.danger, COLORS.success, COLORS.accent].map((color, index) => (
          <path
            key={`curve-${index}`}
            d={`M64 ${round(249 - index * 13)} C124 ${round(233 - index * 8)} 202 ${round(171 + index * 8)} 296 ${round(134 + index * 13)}`}
            fill="none"
            stroke={color}
            strokeWidth="4"
          />
        ))}
        <path
          d="M64 260 H296 M64 260 V130"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="181"
          y="282"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          R→R · G→G · B→B
        </text>
        <Arrow x1={350} y1={187} x2={386} y2={187} />
        <rect
          x="398"
          y="78"
          width="288"
          height="218"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="542"
          y="114"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          3D color cube
        </text>
        <path
          d="M454 240 L546 264 L626 220 L535 197 Z"
          fill={COLORS.accent}
          fillOpacity="0.12"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <path
          d="M454 240 V151 L535 111 L626 135 V220 M454 151 L546 175 L626 135 M546 175 V264 M535 111 V197"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        {[0, 1, 2, 3].map((index) => (
          <circle
            key={`cube-node-${index}`}
            cx={470 + index * 42}
            cy={228 - index * 24}
            r="6"
            fill={index % 2 ? COLORS.success : COLORS.warning}
          />
        ))}
        <text
          x="542"
          y="282"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          RGB→arbitrary RGB mapping
        </text>
        <text
          x="360"
          y="340"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          grayscale、hue warp 与 gamut mapping 需要三个输入通道共同决定输出
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch24TrilinearDiagram() {
  const corners = [
    [250, 119],
    [400, 150],
    [250, 259],
    [400, 290],
    [320, 78],
    [470, 109],
    [320, 218],
    [470, 249],
  ];
  return (
    <Figure>
      <Frame label="三线性插值图：查询颜色位于三维格点单元内部，硬件根据八个包围角点的距离权重重建输出颜色">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          trilinear interpolation：八个角点重建一个颜色
        </text>
        <path
          d="M250 119 L400 150 L400 290 L250 259 Z M320 78 L470 109 L470 249 L320 218 Z M250 119 L320 78 M400 150 L470 109 M400 290 L470 249 M250 259 L320 218"
          fill="none"
          stroke={COLORS.border}
          strokeWidth="3"
        />
        {corners.map(([x, y], index) => (
          <g key={`corner-${index}`}>
            <circle
              cx={x}
              cy={y}
              r="10"
              fill={
                index % 3 === 0
                  ? COLORS.warning
                  : index % 3 === 1
                    ? COLORS.accent
                    : COLORS.success
              }
              stroke={COLORS.bg}
              strokeWidth="3"
            />
            <text x={x + 13} y={y - 8} fontSize="12" fill={COLORS.secondary}>
              c{index}
            </text>
          </g>
        ))}
        <circle
          cx="365"
          cy="188"
          r="12"
          fill={COLORS.danger}
          stroke={COLORS.bg}
          strokeWidth="4"
        />
        {corners.map(([x, y], index) => (
          <line
            key={`weight-${index}`}
            x1="365"
            y1="188"
            x2={x}
            y2={y}
            stroke={COLORS.danger}
            strokeWidth="1.5"
            strokeDasharray="5 5"
            strokeOpacity="0.55"
          />
        ))}
        <rect
          x="516"
          y="91"
          width="176"
          height="180"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="604"
          y="127"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          hardware filtering
        </text>
        <text x="540" y="164" fontSize="13" fill={COLORS.secondary}>
          2³ = 8 corners
        </text>
        <text x="540" y="197" fontSize="13" fill={COLORS.secondary}>
          three fractional axes
        </text>
        <text x="540" y="230" fontSize="13" fill={COLORS.success}>
          one texture sample
        </text>
        <text
          x="604"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          continuous transform only
        </text>
        <text
          x="360"
          y="340"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          LUT 越小，插值误差越依赖变换是否平滑；不连续操作不适合稀疏格点
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch24TexelCenterDiagram() {
  return (
    <Figure>
      <Frame label="三维 LUT 纹理坐标校正图：零到一的输入必须映射到首尾 texel center，避免边缘 half-texel 混合和夹紧">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          texel-center correction：数据格点不是图片边界
        </text>
        <rect
          x="34"
          y="82"
          width="314"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.danger}
          strokeWidth="2"
        />
        <text
          x="191"
          y="116"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.danger}
        >
          uncorrected [0,1]
        </text>
        <line
          x1="72"
          y1="203"
          x2="310"
          y2="203"
          stroke={COLORS.border}
          strokeWidth="4"
        />
        {[0, 1, 2, 3].map((index) => (
          <g key={`raw-${index}`}>
            <rect
              x={78 + index * 57}
              y="170"
              width="46"
              height="66"
              fill={COLORS.accent}
              fillOpacity={round(0.12 + index * 0.13)}
              stroke={COLORS.border}
            />
            <circle cx={101 + index * 57} cy="203" r="6" fill={COLORS.accent} />
          </g>
        ))}
        <path
          d="M61 155 V250 M321 155 V250"
          stroke={COLORS.danger}
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <text
          x="191"
          y="270"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          endpoints sample outside center range
        </text>
        <Arrow x1={366} y1={184} x2={402} y2={184} color={COLORS.success} />
        <rect
          x="414"
          y="82"
          width="272"
          height="204"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="550"
          y="116"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          adjusted coordinate
        </text>
        <text
          x="550"
          y="157"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.text}
        >
          u′ = (N−1)/N · u + 1/(2N)
        </text>
        <line
          x1="449"
          y1="210"
          x2="650"
          y2="210"
          stroke={COLORS.border}
          strokeWidth="4"
        />
        {[0, 1, 2, 3].map((index) => (
          <circle
            key={`center-${index}`}
            cx={467 + index * 55}
            cy="210"
            r="8"
            fill={index === 0 || index === 3 ? COLORS.warning : COLORS.accent}
          />
        ))}
        <text
          x="550"
          y="257"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          input extrema land on outer sample centers
        </text>
        <text
          x="360"
          y="340"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          小型 3D LUT 的 half-texel 偏差可见，scale/offset 必须预计算并传给
          shader
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch24HdrShaperDiagram() {
  return (
    <Figure>
      <Frame label="HDR shaper LUT 流程：一维曲线把宽动态范围非均匀压缩到零到一，三维 LUT 处理颜色，再用逆曲线恢复范围">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          HDR shaper：把有限 3D lattice 分配给视觉重要区域
        </text>
        <rect
          x="28"
          y="95"
          width="148"
          height="172"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="102"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          HDR input
        </text>
        <text
          x="102"
          y="174"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          0 … scene ceiling
        </text>
        <text
          x="102"
          y="210"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          highlights sparse
        </text>
        <Arrow x1={190} y1={181} x2={224} y2={181} />
        <rect
          x="236"
          y="95"
          width="146"
          height="172"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="309"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.accent}
        >
          1D shaper
        </text>
        <path
          d="M263 230 C270 174 302 154 354 142"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <text
          x="309"
          y="250"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          nonuniform sampling
        </text>
        <Arrow x1={396} y1={181} x2={430} y2={181} color={COLORS.success} />
        <rect
          x="442"
          y="95"
          width="130"
          height="172"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="507"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.success}
        >
          3D LUT
        </text>
        <text
          x="507"
          y="173"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          normalized cube
        </text>
        <text
          x="507"
          y="209"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          dense dark samples
        </text>
        <Arrow x1={586} y1={181} x2={620} y2={181} />
        <rect
          x="632"
          y="95"
          width="60"
          height="172"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="662"
          y="137"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.text}
        >
          inverse
        </text>
        <text
          x="662"
          y="175"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          restore
        </text>
        <text
          x="662"
          y="204"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          range
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          ceiling 太低会 clamp，太高会浪费格点；shaper 让暗部获得更多有效采样
        </text>
      </Frame>
    </Figure>
  );
}

function ColorLutScene({
  correctCenters,
  exposure,
  latticeSize,
  saturation,
}: {
  correctCenters: boolean;
  exposure: number;
  latticeSize: LatticeSize;
  saturation: number;
}) {
  const nodes = useMemo(() => {
    const side = latticeSize <= 8 ? 4 : latticeSize <= 16 ? 5 : 6;
    return Array.from({ length: side * side }, (_, index) => ({
      x: 58 + (index % side) * (262 / (side - 1)),
      y: 264 - Math.floor(index / side) * (162 / (side - 1)),
      opacity: round(0.18 + ((index * 7) % 10) * 0.065),
    }));
  }, [latticeSize]);
  const transformStrength = round(
    Math.min(
      1,
      0.35 + Math.abs(exposure) * 0.17 + Math.abs(saturation - 1) * 0.5,
    ),
  );
  const memoryEntries = latticeSize ** 3;
  const edgeError = correctCenters ? 0 : round((1 / latticeSize) * 255);
  const outputLevel = round(Math.min(1, Math.max(0, 0.5 * 2 ** exposure)));

  return (
    <svg
      viewBox="0 0 720 390"
      role="img"
      aria-label="三维颜色 LUT 交互实验：调整格点大小、曝光、饱和度和 texel center 校正，观察采样密度与边缘误差"
      className="block h-auto w-full"
    >
      <rect width="720" height="390" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        color LUT lab：{latticeSize}³ lattice /{" "}
        {correctCenters ? "center-corrected" : "raw coordinates"}
      </text>
      <rect
        x="28"
        y="54"
        width="332"
        height="264"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d="M48 279 L320 279 L320 86 M48 279 L92 242 L360 242 M320 279 L360 242"
        fill="none"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {nodes.map((node, index) => (
        <circle
          key={`lattice-node-${index}`}
          cx={round(node.x + Math.floor(index / Math.sqrt(nodes.length)) * 6)}
          cy={round(node.y - (index % 3) * 2)}
          r={latticeSize === 2 ? "9" : "5"}
          fill={
            index % 3 === 0
              ? COLORS.warning
              : index % 3 === 1
                ? COLORS.accent
                : COLORS.success
          }
          fillOpacity={node.opacity}
          stroke={COLORS.border}
        />
      ))}
      <circle
        cx="202"
        cy="178"
        r="11"
        fill={COLORS.danger}
        stroke={COLORS.bg}
        strokeWidth="3"
      />
      <text
        x="202"
        y="303"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        source RGB indexes a transformed color volume
      </text>
      <rect
        x="390"
        y="54"
        width="302"
        height="264"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="541"
        y="87"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        runtime record
      </text>
      <text x="414" y="126" fontSize="13" fill={COLORS.secondary}>
        lattice entries
      </text>
      <text
        x="668"
        y="126"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.accent}
      >
        {memoryEntries.toLocaleString("en-US")}
      </text>
      <text x="414" y="159" fontSize="13" fill={COLORS.secondary}>
        transform strength
      </text>
      <text
        x="668"
        y="159"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.warning}
      >
        {transformStrength.toFixed(2)}
      </text>
      <text x="414" y="192" fontSize="13" fill={COLORS.secondary}>
        output luminance
      </text>
      <text
        x="668"
        y="192"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        {outputLevel.toFixed(3)}
      </text>
      <text x="414" y="225" fontSize="13" fill={COLORS.secondary}>
        edge quantization
      </text>
      <text
        x="668"
        y="225"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={edgeError > 0 ? COLORS.danger : COLORS.success}
      >
        {edgeError.toFixed(1)} / 255
      </text>
      <text
        x="541"
        y="271"
        textAnchor="middle"
        fontSize="13"
        fill={correctCenters ? COLORS.success : COLORS.danger}
      >
        {correctCenters
          ? "input extrema land on texel centers"
          : "failure mode: edge clamp / nonlinear response"}
      </text>
      <text
        x="360"
        y="350"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        选择满足误差预算的最小 lattice，并让输入域、采样中心与 LUT 烘焙契约一致
      </text>
    </svg>
  );
}

export function GpuGems2Ch24ColorLutLab() {
  const [latticeSize, setLatticeSize] = useState<LatticeSize>(16);
  const [exposure, setExposure] = useState(0);
  const [saturation, setSaturation] = useState(1.1);
  const [correctCenters, setCorrectCenters] = useState(true);

  function reset() {
    setLatticeSize(16);
    setExposure(0);
    setSaturation(1.1);
    setCorrectCenters(true);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 24 三维颜色查找表实验"
      data-visual-kind="gpu-gems2-ch24-color-luts"
      data-unit-id="gpg-v2-24"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">3D color LUT 实验</p>
        <p className="mt-1 text-sm text-secondary">
          先预测：减小 lattice 或关闭 texel-center
          correction，会怎样影响颜色边界和存储？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_240px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <ColorLutScene
            correctCenters={correctCenters}
            exposure={exposure}
            latticeSize={latticeSize}
            saturation={saturation}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {([2, 8, 16, 32] as LatticeSize[]).map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={latticeSize === size}
                onClick={() => setLatticeSize(size)}
                className="min-h-11 rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {size}³ LUT
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            exposure：{exposure.toFixed(1)} EV
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={exposure}
              onChange={(event) => setExposure(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            saturation：{saturation.toFixed(1)}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={saturation}
              onChange={(event) => setSaturation(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            aria-pressed={!correctCenters}
            onClick={() => setCorrectCenters((value) => !value)}
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-left text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            texel centers：{correctCenters ? "corrected" : "failure mode"}
          </button>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {latticeSize <= 8
              ? "小 lattice 适合平滑或 primary-only 变换；复杂 gamut warp 需要用 reference 测最大插值误差。"
              : correctCenters
                ? "scale/offset 把 RGB 极值映射到首尾 texel center，trilinear interpolation 才符合数值格点语义。"
                : "故障模式会在 LUT 边缘引入 half-texel 非线性；对小型 3D LUT 尤其明显。"}
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
