"use client";

import { useMemo, useRef, useState, type ReactNode, type Ref } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

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

const T = TEACHING_BEAT_MS;

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

function NodeBox({
  accent = C.accent,
  detail,
  label,
  x,
  y,
  width = 142,
}: {
  accent?: string;
  detail: string;
  label: string;
  x: number;
  y: number;
  width?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="92"
        rx="12"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 35}
        textAnchor="middle"
        fontSize="14"
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

function Metric({
  label,
  tone = C.accent,
  value,
}: {
  label: string;
  tone?: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
      <span className="text-sm text-secondary">{label}</span>
      <span className="font-mono text-sm font-semibold" style={{ color: tone }}>
        {value}
      </span>
    </div>
  );
}

function CannyStage({
  accent,
  detail,
  label,
  number,
  stageRef,
  x,
}: {
  accent: string;
  detail: string;
  label: string;
  number: string;
  stageRef: Ref<SVGGElement>;
  x: number;
}) {
  return (
    <g ref={stageRef}>
      <circle cx={x + 32} cy="156" r="22" fill={accent} />
      <text
        x={x + 32}
        y="162"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={C.bg}
      >
        {number}
      </text>
      <rect
        x={x + 62}
        y="112"
        width="110"
        height="88"
        rx="12"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
      />
      <text
        x={x + 117}
        y="148"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={C.text}
      >
        {label}
      </text>
      <text
        x={x + 117}
        y="177"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
    </g>
  );
}

export function GpuGems2Ch40InversePipelineDiagram() {
  return (
    <Figure>
      <Frame label="Computer Vision on the GPU 的反向图形流水线：输入图像进入纹理，片元程序并行处理每个位置，结果纹理成为下一阶段输入">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把“看图”反转成一条可重复的图形流水线
        </text>
        <NodeBox
          accent={C.warning}
          detail="camera image"
          label="输入纹理"
          x={48}
          y={132}
        />
        <NodeBox
          accent={C.accent}
          detail="one fragment / pixel"
          label="片元程序"
          x={224}
          y={132}
        />
        <NodeBox
          accent={C.success}
          detail="filtered texture"
          label="结果纹理"
          x={400}
          y={132}
        />
        <NodeBox
          accent={C.warning}
          detail="next pass input"
          label="下一阶段"
          x={576}
          y={132}
          width={136}
        />
        <Arrow x1={190} y1={178} x2={224} y2={178} color={C.warning} />
        <Arrow x1={366} y1={178} x2={400} y2={178} color={C.accent} />
        <Arrow x1={542} y1={178} x2={576} y2={178} color={C.success} />
        <path
          d="M644 226 C644 300 116 300 116 226"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <Arrow x1={116} y1={226} x2={116} y2={226} color={C.border} />
        <text
          x="380"
          y="330"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          每个输出位置只写回自己的位置：规则输出，适合 SIMD 并行
        </text>
        <text
          x="380"
          y="366"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          render-to-texture / frame buffer copy → 下一次过滤的输入
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch40FilterChainDiagram() {
  const passes = [
    ["RGB", "原始相机帧", C.warning],
    ["HSV", "颜色分割", C.accent],
    ["blur x/y", "可分离滤波", C.success],
    ["mask", "候选区域", C.accent],
  ] as const;
  return (
    <Figure>
      <Frame label="视觉算法的多阶段过滤：RGB 输入依次经过 HSV 分割、横纵两个方向的可分离滤波，最后生成候选 mask">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          每一遍只做一种规则的过滤
        </text>
        {passes.map(([short, detail, accent], index) => {
          const x = 48 + index * 174;
          return (
            <g key={short}>
              <rect
                x={x}
                y="124"
                width="136"
                height="122"
                rx="14"
                fill={accent}
                fillOpacity="0.14"
                stroke={accent}
                strokeWidth="2"
              />
              <text
                x={x + 68}
                y="166"
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill={accent}
              >
                {short}
              </text>
              <text
                x={x + 68}
                y="200"
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                {detail}
              </text>
              <text
                x={x + 68}
                y="224"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                pass {index + 1}
              </text>
              {index < passes.length - 1 ? (
                <Arrow
                  x1={x + 136}
                  y1={185}
                  x2={x + 174}
                  y2={185}
                  color={C.border}
                />
              ) : null}
            </g>
          );
        })}
        <rect
          x="92"
          y="296"
          width="576"
          height="72"
          rx="12"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="326"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          15 × 15 的二维核 → 先横向、再纵向
        </text>
        <text
          x="380"
          y="350"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          多一遍 pass，少很多 texture lookup
        </text>
      </Frame>
    </Figure>
  );
}

const CANNY_STEPS: TeachingStep[] = [
  { label: "filter", caption: "先平滑并求导" },
  { label: "gradient", caption: "得到方向与强度" },
  { label: "suppress", caption: "沿方向保留局部峰值" },
  { label: "edge", caption: "输出细边缘" },
];

const CANNY_LABELS: Record<string, string> = Object.fromEntries(
  CANNY_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function GpuGems2Ch40CannyTimelineDiagram() {
  const filterRef = useRef<SVGGElement>(null);
  const gradientRef = useRef<SVGGElement>(null);
  const suppressRef = useRef<SVGGElement>(null);
  const edgeRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: CANNY_STEPS,
    build: (tl) => {
      tl.add(filterRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("filter", 0);
      tl.add(
        gradientRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T,
      );
      tl.label("gradient", T);
      tl.add(
        suppressRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("suppress", T * 2);
      tl.add(
        edgeRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("edge", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可播放的 Canny 边缘检测教学动画：先做可分离高斯滤波，再计算梯度方向和强度，沿梯度方向做非极大值抑制，最后输出细边缘">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          Canny：从模糊的变化到一条细边缘
        </text>
        <CannyStage
          stageRef={filterRef}
          number="1"
          label="filter"
          detail="Gaussian x / y"
          accent={C.warning}
          x={44}
        />
        <CannyStage
          stageRef={gradientRef}
          number="2"
          label="gradient"
          detail="magnitude + direction"
          accent={C.accent}
          x={222}
        />
        <CannyStage
          stageRef={suppressRef}
          number="3"
          label="suppress"
          detail="forward / backward"
          accent={C.success}
          x={400}
        />
        <CannyStage
          stageRef={edgeRef}
          number="4"
          label="edge"
          detail="thin line"
          accent={C.accent}
          x={578}
        />
        <Arrow x1={216} y1={156} x2={222} y2={156} color={C.border} />
        <Arrow x1={394} y1={156} x2={400} y2={156} color={C.border} />
        <Arrow x1={572} y1={156} x2={578} y2={156} color={C.border} />
        <path
          d="M92 272 C190 230 270 312 370 272 S550 230 668 272"
          fill="none"
          stroke={C.accent}
          strokeWidth="4"
        />
        <circle cx="228" cy="274" r="10" fill={C.warning} />
        <circle cx="426" cy="274" r="10" fill={C.success} />
        <circle cx="592" cy="258" r="10" fill={C.accent} />
        <text
          x="380"
          y="344"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          非极大值抑制只留下沿梯度方向比邻居更强的点
        </text>
        <text
          x="380"
          y="370"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          点击播放、暂停、单步或拖动进度，观察每个 pass 如何接力
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={CANNY_LABELS}
        caption="把 Canny 拆成四个片元 pass：每一步都产生下一步所需的纹理。"
      />
    </Figure>
  );
}

export function GpuGems2Ch40MomentReductionDiagram() {
  const cells = [
    ["1", "x", "y"],
    ["0", "0", "0"],
    ["1", "x", "y"],
    ["0", "0", "0"],
  ];
  return (
    <Figure>
      <Frame label="手部质心的 GPU 归约：阈值 mask 产生每像素的 1、x、y 和颜色分量，先按行求和再按列求和，最后得到 M00、M10、M01">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          从每个像素的统计量归约到一个质心
        </text>
        <rect
          x="46"
          y="100"
          width="170"
          height="170"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        {cells.map(([value, x, y], index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          return (
            <g key={`${value}-${index}`}>
              <rect
                x={70 + col * 58}
                y={126 + row * 58}
                width="44"
                height="44"
                rx="7"
                fill={value === "1" ? C.warning : C.bg}
                fillOpacity={value === "1" ? 0.24 : 1}
                stroke={value === "1" ? C.warning : C.border}
              />
              <text
                x={92 + col * 58}
                y={154 + row * 58}
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                {value}/{x}/{y}
              </text>
            </g>
          );
        })}
        <text
          x="131"
          y="298"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          mask → (E, xE, yE)
        </text>
        <Arrow x1={216} y1={184} x2={292} y2={184} color={C.accent} />
        <NodeBox
          accent={C.accent}
          detail="row sums"
          label="第一遍"
          x={292}
          y={138}
          width={140}
        />
        <Arrow x1={432} y1={184} x2={508} y2={184} color={C.success} />
        <NodeBox
          accent={C.success}
          detail="column sum"
          label="第二遍"
          x={508}
          y={138}
          width={140}
        />
        <rect
          x="210"
          y="314"
          width="420"
          height="62"
          rx="12"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="420"
          y="340"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          centroid = (M10 / M00, M01 / M00)
        </text>
        <text
          x="420"
          y="362"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          只在最后读取一个像素，减少 CPU↔GPU 往返
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch40RegistrationFeatureDiagram() {
  const bins = Array.from({ length: 8 }, (_, index) => index);
  return (
    <Figure>
      <Frame label="VideoOrbits 与特征向量布局：图像配准先把每像素乘加归约为 Ax=b，特征点的 16×16 邻域被分成 16 个 4×4 区域，每个区域生成 8 个方向直方图 bin，共 128 维">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          从“全图求和”切换到“稀疏点的向量布局”
        </text>
        <rect
          x="48"
          y="104"
          width="188"
          height="154"
          rx="14"
          fill={C.warning}
          fillOpacity="0.14"
          stroke={C.warning}
        />
        <text
          x="142"
          y="136"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          VideoOrbits
        </text>
        <text
          x="142"
          y="166"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          per-pixel multiply/add
        </text>
        <text
          x="142"
          y="190"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          ↓ GPU reduction
        </text>
        <text
          x="142"
          y="222"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          A x = b
        </text>
        <Arrow x1={236} y1={180} x2={302} y2={180} color={C.accent} />
        <rect
          x="302"
          y="104"
          width="158"
          height="154"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="381"
          y="136"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          feature point
        </text>
        <rect
          x="338"
          y="154"
          width="86"
          height="72"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
        />
        {Array.from({ length: 16 }, (_, index) => (
          <rect
            key={index}
            x={342 + (index % 4) * 20}
            y={158 + Math.floor(index / 4) * 16}
            width="16"
            height="12"
            fill={index === 6 || index === 10 ? C.warning : C.accent}
            fillOpacity={index === 6 || index === 10 ? 0.8 : 0.28}
          />
        ))}
        <Arrow x1={460} y1={180} x2={526} y2={180} color={C.success} />
        <rect
          x="526"
          y="104"
          width="186"
          height="154"
          rx="14"
          fill={C.success}
          fillOpacity="0.12"
          stroke={C.success}
        />
        <text
          x="619"
          y="136"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          16 × 8 = 128
        </text>
        <text
          x="619"
          y="160"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          histogram bins
        </text>
        {bins.map((bin) => (
          <rect
            key={bin}
            x={550 + (bin % 4) * 34}
            y={186 + Math.floor(bin / 4) * 22}
            width="24"
            height={12 + ((bin * 7) % 14)}
            fill={C.success}
            fillOpacity="0.72"
          />
        ))}
        <text
          x="380"
          y="324"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          每个特征点占一行，每个点写出一条固定长度的向量
        </text>
        <text
          x="380"
          y="352"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          先由 CPU 找到少数坐标，再让 GPU 并行填充这些行
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch40MultiGpuDiagram() {
  return (
    <Figure>
      <Frame label="多 GPU 视觉处理：GPU 0 做滤波和边缘，GPU 1 做颜色分割和质心，GPU 2 做特征向量，CPU 只在阶段边界读取汇总结果">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把互不等待的视觉算法分到不同 GPU
        </text>
        <rect
          x="292"
          y="90"
          width="176"
          height="74"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="121"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          CPU orchestrator
        </text>
        <text
          x="380"
          y="145"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          只在阶段边界读回
        </text>
        <Arrow x1={292} y1={127} x2={190} y2={210} color={C.warning} />
        <Arrow x1={380} y1={164} x2={380} y2={210} color={C.accent} />
        <Arrow x1={468} y1={127} x2={570} y2={210} color={C.success} />
        {(
          [
            [56, "GPU 0", "filter + Canny", C.warning],
            [302, "GPU 1", "HSV + moments", C.accent],
            [548, "GPU 2", "feature vectors", C.success],
          ] as const
        ).map(([x, label, detail, accent]) => (
          <g key={label}>
            <rect
              x={x}
              y="210"
              width="156"
              height="102"
              rx="14"
              fill={accent}
              fillOpacity="0.14"
              stroke={accent}
              strokeWidth="2"
            />
            <text
              x={Number(x) + 78}
              y="248"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={C.text}
            >
              {label}
            </text>
            <text
              x={Number(x) + 78}
              y="278"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              {detail}
            </text>
          </g>
        ))}
        <text
          x="380"
          y="366"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          shared memory 让结果互相交换；独立 pass 才真正获得并行收益
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch40TradeoffDiagram() {
  return (
    <Figure>
      <Frame label="GPU 视觉的取舍：把大部分逐像素工作留在 GPU，最后只读回一个统计像素；过早 readback 会让 CPU 等待">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          好的边界：GPU 做密集工作，CPU 只拿小结果
        </text>
        <rect
          x="48"
          y="112"
          width="294"
          height="182"
          rx="14"
          fill={C.success}
          fillOpacity="0.12"
          stroke={C.success}
        />
        <text
          x="195"
          y="148"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          推荐：延后 readback
        </text>
        <text
          x="195"
          y="182"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          image → passes → reduction
        </text>
        <text
          x="195"
          y="208"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          → 1 个统计像素 → CPU
        </text>
        <text
          x="195"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          GPU 连续运行
        </text>
        <rect
          x="418"
          y="112"
          width="294"
          height="182"
          rx="14"
          fill={C.danger}
          fillOpacity="0.1"
          stroke={C.danger}
        />
        <text
          x="565"
          y="148"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.danger}
        >
          警惕：每遍都 readback
        </text>
        <text
          x="565"
          y="182"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          pass → CPU → pass → CPU
        </text>
        <text
          x="565"
          y="208"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          大量同步与总线往返
        </text>
        <text
          x="565"
          y="252"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          GPU 被迫等待
        </text>
        <Arrow x1={342} y1={202} x2={418} y2={202} color={C.border} dashed />
        <text
          x="380"
          y="354"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          读回的不是“整张图”，而是算法真正需要的少量状态
        </text>
      </Frame>
    </Figure>
  );
}

type VisionMode = "canny" | "hand" | "feature";

export function GpuGems2Ch40ComputerVisionLab() {
  const [mode, setMode] = useState<VisionMode>("canny");
  const [edgeThreshold, setEdgeThreshold] = useState(48);
  const [skinThreshold, setSkinThreshold] = useState(56);
  const [reductionPasses, setReductionPasses] = useState(2);
  const [scatterMistake, setScatterMistake] = useState(false);

  const result = useMemo(() => {
    const edgePixels = Math.max(8, Math.round(98 - edgeThreshold * 0.72));
    const handCoverage = Math.max(
      4,
      Math.round(92 - Math.abs(skinThreshold - 56) * 1.35),
    );
    const centroidStability = Math.max(
      30,
      100 - Math.abs(skinThreshold - 56) * 2 - (reductionPasses - 2) * 8,
    );
    const featureConfidence = Math.max(
      28,
      Math.round(
        56 + reductionPasses * 12 - Math.abs(edgeThreshold - 48) * 0.38,
      ),
    );
    const readback =
      mode === "hand"
        ? "1 pixel / centroid"
        : mode === "feature"
          ? "N rows / points"
          : "1 mask texture";
    const bottleneck = scatterMistake
      ? "错误模式：scatter 写入让多个输出争抢地址。"
      : mode === "canny"
        ? "片元吞吐占主导；把 2D 核拆成 x/y 两遍。"
        : mode === "hand"
          ? "归约 pass 把整张 mask 压成少量统计量。"
          : "稀疏 feature point 用固定行布局输出 128 维向量。";
    return {
      bottleneck,
      centroidStability,
      edgePixels,
      featureConfidence,
      handCoverage,
      readback,
    };
  }, [edgeThreshold, mode, reductionPasses, scatterMistake, skinThreshold]);

  const reset = () => {
    setMode("canny");
    setEdgeThreshold(48);
    setSkinThreshold(56);
    setReductionPasses(2);
    setScatterMistake(false);
  };

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Computer Vision on the GPU 实验模式"
          >
            {(
              [
                ["canny", "Canny 边缘"],
                ["hand", "手部质心"],
                ["feature", "特征向量"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${mode === value ? "border-accent bg-accent/15 text-primary" : "border-border text-secondary hover:border-accent"}`}
                onClick={() => setMode(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 rounded-card border border-border bg-surface p-4">
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch40-edge-threshold"
            >
              edge threshold{" "}
              <span className="font-mono text-primary">{edgeThreshold}</span>
              <input
                id="ch40-edge-threshold"
                type="range"
                min="12"
                max="86"
                value={edgeThreshold}
                onChange={(event) =>
                  setEdgeThreshold(Number(event.target.value))
                }
                className="accent-accent"
              />
            </label>
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch40-skin-threshold"
            >
              HSV skin threshold{" "}
              <span className="font-mono text-primary">{skinThreshold}</span>
              <input
                id="ch40-skin-threshold"
                type="range"
                min="18"
                max="88"
                value={skinThreshold}
                onChange={(event) =>
                  setSkinThreshold(Number(event.target.value))
                }
                className="accent-accent"
              />
            </label>
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch40-reduction-passes"
            >
              reduction passes{" "}
              <span className="font-mono text-primary">{reductionPasses}</span>
              <input
                id="ch40-reduction-passes"
                type="range"
                min="1"
                max="4"
                value={reductionPasses}
                onChange={(event) =>
                  setReductionPasses(Number(event.target.value))
                }
                className="accent-accent"
              />
            </label>
            <label
              className="flex items-center gap-2 text-sm text-secondary"
              htmlFor="ch40-scatter-mistake"
            >
              <input
                id="ch40-scatter-mistake"
                type="checkbox"
                checked={scatterMistake}
                onChange={(event) => setScatterMistake(event.target.checked)}
                className="accent-accent"
              />
              注入 scatter 写入误区
            </label>
          </div>
          <button
            type="button"
            className="mt-3 rounded-full border border-border px-3 py-1.5 text-sm text-secondary hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验
          </button>
        </div>
        <div
          className="rounded-card border border-border bg-surface p-4"
          aria-live="polite"
        >
          <div className="mb-2 text-sm font-semibold text-primary">
            当前路径：
            {mode === "canny"
              ? "Canny"
              : mode === "hand"
                ? "手部质心"
                : "特征向量"}
          </div>
          <Metric
            label="edge candidates"
            value={`${result.edgePixels}%`}
            tone={C.warning}
          />
          <Metric
            label="hand mask"
            value={`${result.handCoverage}%`}
            tone={C.accent}
          />
          <Metric
            label="centroid stability"
            value={`${result.centroidStability}%`}
            tone={C.success}
          />
          <Metric
            label="feature confidence"
            value={`${result.featureConfidence}%`}
            tone={C.success}
          />
          <Metric label="readback" value={result.readback} tone={C.accent} />
          <div
            className={`mt-4 rounded-card border p-3 text-sm ${scatterMistake ? "border-danger bg-danger/10 text-primary" : "border-success bg-success/10 text-primary"}`}
          >
            {result.bottleneck}
          </div>
          <div
            className="mt-4 grid grid-cols-8 gap-1"
            aria-label="特征直方图预览"
          >
            {Array.from({ length: 16 }, (_, index) => (
              <div
                key={index}
                className="h-8 rounded-sm bg-accent/50"
                style={{
                  opacity:
                    0.25 + ((index * 13 + reductionPasses * 9) % 60) / 100,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Figure>
  );
}
