"use client";

import { useMemo, useState, type ReactNode } from "react";

const C = {
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
      viewBox="0 0 760 440"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height="440" rx="16" fill={C.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = C.accent,
  dashed = false,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  dashed?: boolean;
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
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "7 6" : undefined}
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function Box({
  accent,
  detail,
  label,
  width = 150,
  x,
  y,
}: {
  accent: string;
  detail: string;
  label: string;
  width?: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="84"
        rx="14"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 35}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.text}
      >
        {label}
      </text>
      <text
        x={x + width / 2}
        y={y + 62}
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
    </g>
  );
}

function Dots({
  color,
  count = 12,
  offsetX = 0,
  offsetY = 0,
  radius = 4,
}: {
  color: string;
  count?: number;
  offsetX?: number;
  offsetY?: number;
  radius?: number;
}) {
  return (
    <g transform={`translate(${offsetX} ${offsetY})`}>
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const ring = index % 3;
        const x = Number((Math.cos(angle) * (22 + ring * 18)).toFixed(2));
        const y = Number((Math.sin(angle) * (18 + ring * 15)).toFixed(2));
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={radius}
            fill={color}
            fillOpacity="0.72"
          />
        );
      })}
    </g>
  );
}

function MatrixGrid({
  accent,
  columns = 8,
  rows = 6,
  sparse = false,
  x,
  y,
}: {
  accent: string;
  columns?: number;
  rows?: number;
  sparse?: boolean;
  x: number;
  y: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: columns }, (_, column) => {
          const active = sparse ? (row * 3 + column * 5) % 7 < 2 : true;
          return (
            <rect
              key={`${row}-${column}`}
              x={column * 18}
              y={row * 18}
              width="14"
              height="14"
              rx="2"
              fill={active ? accent : C.border}
              fillOpacity={active ? 0.62 : 0.22}
              stroke={active ? accent : C.border}
            />
          );
        }),
      )}
    </g>
  );
}

export function GpuGems3Ch09RelightingOverviewDiagram() {
  return (
    <Figure>
      <Frame label="电影灯光重照明总览：view samples 与 gather samples 产生直接光，预计算 transfer matrix 把 gather direct 转成 view indirect，最后相加">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          只改灯光，不重建场景：把昂贵关系提前缓存
        </text>
        <g transform="translate(26 82)">
          <rect
            width="208"
            height="252"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="104"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            view samples
          </text>
          <text
            x="104"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            相机看见的像素点
          </text>
          <rect
            x="38"
            y="82"
            width="132"
            height="86"
            rx="9"
            fill={C.bg}
            stroke={C.border}
          />
          <Dots color={C.accent} count={14} offsetX={104} offsetY={125} />
          <text
            x="104"
            y="208"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            position · normal · material
          </text>
          <text
            x="104"
            y="236"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            Vd + Vi → final pixels
          </text>
        </g>
        <g transform="translate(526 82)">
          <rect
            width="208"
            height="252"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="104"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            gather samples
          </text>
          <text
            x="104"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            全场可能反射光的表面点
          </text>
          <rect
            x="38"
            y="82"
            width="132"
            height="86"
            rx="9"
            fill={C.bg}
            stroke={C.border}
          />
          <Dots color={C.warning} count={18} offsetX={104} offsetY={125} />
          <text
            x="104"
            y="208"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            direct illumination gd
          </text>
          <text
            x="104"
            y="236"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            可见区域之外也要采样
          </text>
        </g>
        <Arrow x1={252} y1={208} x2={318} y2={208} />
        <Arrow x1={442} y1={208} x2={508} y2={208} />
        <Box
          accent={C.success}
          detail="precomputed offline"
          label="transfer T"
          x={286}
          y={168}
          width={188}
        />
        <text
          x="380"
          y="382"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          Vi = T · gd；运行时只更新 direct light 与稀疏矩阵乘法
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch09SampleCloudDiagram() {
  return (
    <Figure>
      <Frame label="view samples 和 gather samples 的区别：view samples 来自当前相机的 deep frame buffer，gather samples 覆盖全场并按位置和法线组织成方形纹理">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          两朵云：一个负责“看见”，一个负责“可能反弹”
        </text>
        <g transform="translate(30 82)">
          <rect
            width="318"
            height="268"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="159"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            camera-visible cloud
          </text>
          <path
            d="M 48 188 Q 74 108 143 132 Q 208 72 276 162 L 276 204 L 48 204 Z"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="2"
          />
          <Dots color={C.accent} count={15} offsetX={158} offsetY={158} />
          <text
            x="159"
            y="234"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            deep frame buffer
          </text>
          <text
            x="159"
            y="260"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            position · normal · BRDF
          </text>
        </g>
        <Arrow x1={372} y1={216} x2={420} y2={216} />
        <g transform="translate(424 82)">
          <rect
            width="306"
            height="268"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="153"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            whole-scene gather cloud
          </text>
          <rect
            x="42"
            y="68"
            width="222"
            height="116"
            rx="9"
            fill={C.bg}
            stroke={C.border}
          />
          <Dots
            color={C.warning}
            count={27}
            offsetX={153}
            offsetY={126}
            radius={3.5}
          />
          <text
            x="153"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            flatten to power-of-two texture
          </text>
          <text
            x="153"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            位置 + 法线相近的点相邻
          </text>
        </g>
        <text
          x="380"
          y="386"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          gather samples 不是屏幕上的可见点；它们承载“间接光从哪里来”的候选空间
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch09TransferMatrixDiagram() {
  return (
    <Figure>
      <Frame label="direct-to-indirect transfer matrix：view samples 乘 gather direct 的巨大矩阵被拆成 final gather F 与 multibounce M 加 identity">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          不直接存一张“不可乘”的巨矩阵
        </text>
        <g transform="translate(28 82)">
          <rect
            width="220"
            height="266"
            rx="16"
            fill={C.surface}
            stroke={C.danger}
          />
          <text
            x="110"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            naive T
          </text>
          <MatrixGrid accent={C.danger} columns={8} rows={9} x={38} y={62} />
          <text
            x="110"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            view × gather · dense
          </text>
        </g>
        <Arrow x1={274} y1={214} x2={322} y2={214} />
        <g transform="translate(326 82)">
          <rect
            width="194"
            height="266"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="97"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            split T
          </text>
          <Box
            accent={C.success}
            detail="view ← gather"
            label="F final gather"
            width={154}
            x={20}
            y={62}
          />
          <Box
            accent={C.warning}
            detail="gather ↔ gather"
            label="M multibounce"
            width={154}
            x={20}
            y={166}
          />
        </g>
        <Arrow x1={546} y1={214} x2={594} y2={214} />
        <g transform="translate(598 82)">
          <rect
            width="134"
            height="266"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="67"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            runtime
          </text>
          <text
            x="67"
            y="86"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            F · (M + I)
          </text>
          <text
            x="67"
            y="126"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            gather direct
          </text>
          <Arrow x1={67} y1={146} x2={67} y2={188} color={C.success} />
          <text
            x="67"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            indirect on view
          </text>
        </g>
        <text
          x="380"
          y="386"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          F 保持高精度，M 可以低精度；误差最接近最终图像的地方最值得保留预算
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch09WaveletDiagram() {
  return (
    <Figure>
      <Frame label="二维 Haar wavelet 压缩：矩阵行经过平均、水平、垂直和对角四种子块变换，大量接近零的系数被按支持区域重要性裁剪">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          wavelet 把“有结构的图像行”变成少量系数
        </text>
        <g transform="translate(36 84)">
          <rect
            width="240"
            height="252"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="120"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            matrix row as image
          </text>
          <MatrixGrid accent={C.accent} columns={8} rows={7} x={48} y={68} />
          <text
            x="120"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            sharp shadows / glossy details
          </text>
          <text
            x="120"
            y="248"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            仍然有局部高频结构
          </text>
        </g>
        <Arrow x1={302} y1={210} x2={350} y2={210} />
        <g transform="translate(354 84)">
          <rect
            width="182"
            height="252"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="91"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            2D Haar
          </text>
          <rect
            x="30"
            y="72"
            width="54"
            height="54"
            fill={C.success}
            fillOpacity="0.18"
            stroke={C.success}
          />
          <rect
            x="84"
            y="72"
            width="54"
            height="54"
            fill={C.warning}
            fillOpacity="0.18"
            stroke={C.warning}
          />
          <rect
            x="30"
            y="126"
            width="54"
            height="54"
            fill={C.warning}
            fillOpacity="0.18"
            stroke={C.warning}
          />
          <rect
            x="84"
            y="126"
            width="54"
            height="54"
            fill={C.danger}
            fillOpacity="0.18"
            stroke={C.danger}
          />
          <text
            x="57"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            avg
          </text>
          <text
            x="111"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            H
          </text>
          <text
            x="57"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            V
          </text>
          <text
            x="111"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fill={C.danger}
          >
            D
          </text>
          <text
            x="91"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            coarse → fine
          </text>
          <text
            x="91"
            y="248"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            每级缩小一半
          </text>
        </g>
        <Arrow x1={562} y1={210} x2={610} y2={210} />
        <g transform="translate(614 84)">
          <rect
            width="118"
            height="252"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="59"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            sparse
          </text>
          <MatrixGrid
            accent={C.success}
            columns={4}
            rows={8}
            sparse
            x={28}
            y={68}
          />
          <text
            x="59"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            按 support
          </text>
          <text
            x="59"
            y="248"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            保留重要项
          </text>
        </g>
        <text
          x="380"
          y="386"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          不能只保留绝对值最大的系数：大 support 的低幅系数可能覆盖更多像素
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch09SparsePackingDiagram() {
  return (
    <Figure>
      <Frame label="稀疏矩阵 GPU 存储：非零系数按列呈现为局部图像块，把紧致矩形打包进 texture atlas 以减少状态切换">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把稀疏矩阵当作很多张小图来打包
        </text>
        <g transform="translate(34 88)">
          <rect
            width="214"
            height="238"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="107"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            sparse columns
          </text>
          <rect
            x="42"
            y="70"
            width="55"
            height="122"
            rx="7"
            fill={C.bg}
            stroke={C.border}
          />
          <rect
            x="117"
            y="70"
            width="55"
            height="122"
            rx="7"
            fill={C.bg}
            stroke={C.border}
          />
          <rect
            x="51"
            y="86"
            width="37"
            height="28"
            fill={C.warning}
            fillOpacity="0.36"
          />
          <rect
            x="51"
            y="126"
            width="37"
            height="46"
            fill={C.warning}
            fillOpacity="0.18"
          />
          <rect
            x="126"
            y="98"
            width="37"
            height="54"
            fill={C.warning}
            fillOpacity="0.28"
          />
          <text
            x="107"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            非零系数成簇
          </text>
        </g>
        <Arrow x1={276} y1={206} x2={324} y2={206} />
        <g transform="translate(328 88)">
          <rect
            width="404"
            height="238"
            rx="16"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="202"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            texture atlas
          </text>
          <rect
            x="54"
            y="64"
            width="296"
            height="126"
            rx="8"
            fill={C.bg}
            stroke={C.border}
          />
          <rect
            x="70"
            y="80"
            width="90"
            height="72"
            rx="5"
            fill={C.accent}
            fillOpacity="0.2"
            stroke={C.accent}
          />
          <rect
            x="176"
            y="80"
            width="150"
            height="42"
            rx="5"
            fill={C.warning}
            fillOpacity="0.2"
            stroke={C.warning}
          />
          <rect
            x="176"
            y="132"
            width="92"
            height="42"
            rx="5"
            fill={C.success}
            fillOpacity="0.2"
            stroke={C.success}
          />
          <text
            x="202"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            少量 texture state changes
          </text>
        </g>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          atlas 让 GPU 以图像采样路径读取稀疏块，但需要保存每个 block
          的坐标与边界
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch09RelightingEngineDiagram() {
  return (
    <Figure>
      <Frame label="GPU relighting engine：direct illumination、wavelet transform、sparse matrix multiplication 三种操作在 GPU 上组合，最终叠加 view direct 与 view indirect">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          运行时只留下三种 GPU 操作
        </text>
        <Box
          accent={C.accent}
          detail="light shader + shadow map"
          label="direct illumination"
          x={28}
          y={102}
          width={184}
        />
        <Arrow x1={228} y1={144} x2={272} y2={144} />
        <Box
          accent={C.warning}
          detail="square texture passes"
          label="wavelet transform"
          x={274}
          y={102}
          width={184}
        />
        <Arrow x1={474} y1={144} x2={518} y2={144} />
        <Box
          accent={C.success}
          detail="atlas blocks × vectors"
          label="sparse multiply"
          x={520}
          y={102}
          width={184}
        />
        <g transform="translate(86 256)">
          <rect
            width="588"
            height="80"
            rx="14"
            fill={C.surface}
            stroke={C.border}
          />
          <text
            x="294"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            view full = view direct + view indirect
          </text>
          <text
            x="294"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            2×2 direct supersample · indirect upsample · closest neighbor
            避免跨边缘 leaking
          </text>
        </g>
        <Arrow x1={366} y1={190} x2={366} y2={250} color={C.accent} />
        <text
          x="380"
          y="382"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          CPU 负责离线预计算；GPU 负责灯光改变后的即时更新
        </text>
      </Frame>
    </Figure>
  );
}

type MaterialMode = "diffuse" | "glossy";

export function GpuGems3Ch09RelightingLab() {
  const [lightEnergy, setLightEnergy] = useState(64);
  const [gatherBudget, setGatherBudget] = useState(256);
  const [waveletCoefficients, setWaveletCoefficients] = useState(64);
  const [bounces, setBounces] = useState(2);
  const [material, setMaterial] = useState<MaterialMode>("diffuse");

  const result = useMemo(() => {
    const direct = Math.round(34 + lightEnergy * 0.62);
    const indirect = Math.round(
      18 +
        gatherBudget / 22 +
        waveletCoefficients * 0.22 +
        bounces * 8 +
        (material === "glossy" ? 10 : 0),
    );
    const transferWork = Math.round(
      waveletCoefficients * bounces * (material === "glossy" ? 1.2 : 1),
    );
    const edgeRisk = Math.max(
      3,
      Math.round(30 - gatherBudget / 28 + (material === "glossy" ? 8 : 0)),
    );
    return { direct, edgeRisk, indirect, transferWork };
  }, [bounces, gatherBudget, lightEnergy, material, waveletCoefficients]);

  const dots = Array.from({ length: 18 }, (_, index) => {
    const angle = (index / 18) * Math.PI * 2;
    const radius = 54 + (index % 3) * 14;
    return {
      x: Number((182 + Math.cos(angle) * radius).toFixed(2)),
      y: Number((158 + Math.sin(angle) * radius * 0.64).toFixed(2)),
    };
  });

  function reset() {
    setLightEnergy(64);
    setGatherBudget(256);
    setWaveletCoefficients(64);
    setBounces(2);
    setMaterial("diffuse");
  }

  const dirty =
    lightEnergy !== 64 ||
    gatherBudget !== 256 ||
    waveletCoefficients !== 64 ||
    bounces !== 2 ||
    material !== "diffuse";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 3 Chapter 9 cinematic relighting 实验：调整灯光、gather budget、wavelet coefficients、bounce 次数与材质"
      data-visual-kind="gpu-gems3-ch09-cinematic-relighting"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Cinematic Relighting Lab
        </p>
        <p className="mt-1 text-sm text-secondary">
          把灯光设计参数与离线缓存分开调节，观察
          direct、indirect、稀疏乘法工作和边缘 leaking 风险的趋势。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg
            viewBox="0 0 520 360"
            role="img"
            aria-label="view samples、gather samples 和 direct-to-indirect transfer 的 relighting 预览"
            className="block h-auto w-full"
          >
            <text
              x="260"
              y="26"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={C.text}
            >
              {material} · {bounces} bounce · gather {gatherBudget}
            </text>
            <rect
              x="32"
              y="58"
              width="300"
              height="174"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <path
              d="M 54 196 Q 92 112 164 134 Q 236 76 310 170 L 310 206 L 54 206 Z"
              fill={C.accent}
              fillOpacity="0.08"
              stroke={C.accent}
              strokeWidth="2"
            />
            <circle
              cx="182"
              cy="154"
              r="45"
              fill={C.warning}
              fillOpacity={0.1 + lightEnergy / 700}
              stroke={C.warning}
            />
            {dots.map((dot, index) => (
              <circle
                key={index}
                cx={dot.x}
                cy={dot.y}
                r={index % 4 === 0 ? 4 : 3}
                fill={index % 3 === 0 ? C.success : C.accent}
                fillOpacity="0.76"
              />
            ))}
            <Arrow x1={282} y1={92} x2={220} y2={132} color={C.warning} />
            <text
              x="182"
              y="254"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              view samples ← indirect contribution
            </text>
            <rect
              x="354"
              y="58"
              width="134"
              height="218"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <text
              x="421"
              y="86"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={C.text}
            >
              读数
            </text>
            <text x="370" y="120" fontSize="12" fill={C.secondary}>
              direct
            </text>
            <text
              x="474"
              y="120"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.accent}
            >
              {result.direct}
            </text>
            <text x="370" y="154" fontSize="12" fill={C.secondary}>
              indirect
            </text>
            <text
              x="474"
              y="154"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.warning}
            >
              {result.indirect}
            </text>
            <text x="370" y="188" fontSize="12" fill={C.secondary}>
              sparse work
            </text>
            <text
              x="474"
              y="188"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.success}
            >
              {result.transferWork}
            </text>
            <text x="370" y="222" fontSize="12" fill={C.secondary}>
              edge risk
            </text>
            <text
              x="474"
              y="222"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={result.edgeRisk > 18 ? C.danger : C.success}
            >
              {result.edgeRisk}%
            </text>
            <text
              x="260"
              y="318"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              light energy {lightEnergy} · coefficients {waveletCoefficients}
            </text>
            <text
              x="260"
              y="342"
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              趋势示意：真实画面还取决于 visibility、BRDF 和场景尺度
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            material model
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={material}
              onChange={(event) =>
                setMaterial(event.target.value as MaterialMode)
              }
            >
              <option value="diffuse">diffuse</option>
              <option value="glossy">glossy</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            light energy：{lightEnergy}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="20"
              max="100"
              value={lightEnergy}
              onChange={(event) => setLightEnergy(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            gather budget：{gatherBudget}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="64"
              max="512"
              step="64"
              value={gatherBudget}
              onChange={(event) => setGatherBudget(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            wavelet coefficients：{waveletCoefficients}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="16"
              max="128"
              step="16"
              value={waveletCoefficients}
              onChange={(event) =>
                setWaveletCoefficients(Number(event.target.value))
              }
            />
          </label>
          <label className="block text-sm text-secondary">
            indirect bounces：{bounces}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="4"
              value={bounces}
              onChange={(event) => setBounces(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {waveletCoefficients < 48
              ? "系数少，乘法快但 sharp lighting detail 更容易丢失。"
              : material === "glossy"
                ? "glossy 会保留更尖的高光，gather 与系数预算不足时更容易出现边缘误差。"
                : "diffuse 的间接光更平滑，适合先验证 transfer 与 sample coverage 的契约。"}
          </p>
          <button
            type="button"
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
            onClick={reset}
            disabled={!dirty}
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
