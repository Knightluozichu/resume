"use client";

import { useMemo, useState, type ReactNode } from "react";

type Space = "local" | "world";
type Point3 = { x: number; y: number; z: number };
type Point2 = { x: number; y: number };

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="360" rx="14" fill="var(--bg)" />
      {children}
    </svg>
  );
}

function rotateX(point: Point3, angle: number): Point3 {
  const r = (angle * Math.PI) / 180;
  return {
    x: point.x,
    y: point.y * Math.cos(r) - point.z * Math.sin(r),
    z: point.y * Math.sin(r) + point.z * Math.cos(r),
  };
}

function rotateY(point: Point3, angle: number): Point3 {
  const r = (angle * Math.PI) / 180;
  return {
    x: point.x * Math.cos(r) + point.z * Math.sin(r),
    y: point.y,
    z: -point.x * Math.sin(r) + point.z * Math.cos(r),
  };
}

function rotateZ(point: Point3, angle: number): Point3 {
  const r = (angle * Math.PI) / 180;
  return {
    x: point.x * Math.cos(r) - point.y * Math.sin(r),
    y: point.x * Math.sin(r) + point.y * Math.cos(r),
    z: point.z,
  };
}

function transformPoint(
  point: Point3,
  yaw: number,
  pitch: number,
  roll: number,
  space: Space,
): Point3 {
  if (space === "local") {
    return rotateY(rotateX(rotateZ(point, roll), pitch), yaw);
  }
  return rotateZ(rotateX(rotateY(point, yaw), pitch), roll);
}

function project(point: Point3, center: Point2, scale = 66): Point2 {
  return {
    x: center.x + (point.x - point.z) * scale,
    y: center.y - point.y * scale + (point.x + point.z) * scale * 0.42,
  };
}

const CUBE_POINTS: Point3[] = [
  { x: -1, y: -1, z: -1 },
  { x: 1, y: -1, z: -1 },
  { x: 1, y: 1, z: -1 },
  { x: -1, y: 1, z: -1 },
  { x: -1, y: -1, z: 1 },
  { x: 1, y: -1, z: 1 },
  { x: 1, y: 1, z: 1 },
  { x: -1, y: 1, z: 1 },
];

const CUBE_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

function CubeWire({
  center,
  color,
  dashed = false,
  points,
}: {
  center: Point2;
  color: string;
  dashed?: boolean;
  points: Point3[];
}) {
  const projected = points.map((point) => project(point, center));
  return (
    <g>
      {CUBE_EDGES.map(([start, end]) => (
        <line
          key={`${start}-${end}`}
          x1={projected[start].x}
          y1={projected[start].y}
          x2={projected[end].x}
          y2={projected[end].y}
          stroke={color}
          strokeWidth={dashed ? "2" : "3"}
          strokeDasharray={dashed ? "7 5" : undefined}
          opacity={dashed ? "0.62" : "1"}
        />
      ))}
      {projected.map((point, index) => (
        <circle
          key={`vertex-${index}`}
          cx={point.x}
          cy={point.y}
          r="5"
          fill={color}
          opacity={dashed ? "0.72" : "1"}
        />
      ))}
    </g>
  );
}

export function Cgp11SpaceTransformDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="三维空间变换：模型空间的立方体经过世界和观察变换进入屏幕">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            transformations in three dimensions：同一物体穿过多个空间
          </text>
          <rect
            x="38"
            y="72"
            width="192"
            height="214"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <CubeWire
            center={{ x: 134, y: 184 }}
            color={COLORS.warning}
            points={CUBE_POINTS}
            dashed
          />
          <text
            x="134"
            y="316"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            模型空间：物体自己的轴
          </text>
          <line
            x1="248"
            y1="180"
            x2="286"
            y2="180"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="278,170 298,180 278,190" fill={COLORS.accent} />
          <rect
            x="304"
            y="72"
            width="192"
            height="214"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <CubeWire
            center={{ x: 400, y: 184 }}
            color={COLORS.accent}
            points={CUBE_POINTS.map((point) =>
              transformPoint(point, 24, 12, 18, "local"),
            )}
          />
          <text
            x="400"
            y="316"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            世界空间：场景中的位置
          </text>
          <line
            x1="514"
            y1="180"
            x2="552"
            y2="180"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="544,170 564,180 544,190" fill={COLORS.accent} />
          <rect
            x="570"
            y="72"
            width="112"
            height="214"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="594"
            y1="242"
            x2="658"
            y2="242"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="594"
            y1="242"
            x2="594"
            y2="112"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <polygon
            points="610,220 646,136 670,220"
            fill={COLORS.success}
            fillOpacity="0.16"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text
            x="626"
            y="316"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            观察/屏幕
          </text>
          <text
            x="360"
            y="344"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            每次交接都要记录空间、轴和矩阵
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三维变换的难点不只在公式数量，而在同一个数字属于哪个空间、绕哪条轴旋转。
      </figcaption>
    </figure>
  );
}

export function Cgp11RotationAxisDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="三维旋转轴：物体绕明确的轴和角度旋转，距离与局部结构可被检查">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            rotation：角度之外，旋转轴也必须明确
          </text>
          <line
            x1="96"
            y1="260"
            x2="308"
            y2="138"
            stroke={COLORS.warning}
            strokeWidth="4"
          />
          <circle cx="96" cy="260" r="7" fill={COLORS.warning} />
          <circle cx="308" cy="138" r="7" fill={COLORS.warning} />
          <text x="92" y="286" fontSize="13" fill={COLORS.warning}>
            轴起点
          </text>
          <text x="300" y="122" fontSize="13" fill={COLORS.warning}>
            轴方向
          </text>
          <polygon
            points="180,230 236,134 292,230"
            fill={COLORS.accent}
            fillOpacity="0.16"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon
            points="214,248 278,164 334,252"
            fill={COLORS.success}
            fillOpacity="0.14"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <path
            d="M250 154 C316 126 370 170 360 220"
            fill="none"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <polygon points="349,207 364,222 344,224" fill={COLORS.success} />
          <text x="372" y="194" fontSize="13" fill={COLORS.success}>
            θ
          </text>
          <line
            x1="430"
            y1="90"
            x2="430"
            y2="280"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="456"
            y="114"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            旋转记录
          </text>
          <text x="456" y="150" fontSize="13" fill={COLORS.secondary}>
            axis = (aₓ, aᵧ, a_z)
          </text>
          <text x="456" y="180" fontSize="13" fill={COLORS.secondary}>
            angle = θ
          </text>
          <text x="456" y="214" fontSize="13" fill={COLORS.accent}>
            R(axis, θ)
          </text>
          <text x="456" y="252" fontSize="13" fill={COLORS.secondary}>
            先定义轴，再解释结果
          </text>
          <text
            x="360"
            y="330"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            同一物体绕不同轴旋转，不是同一个变换
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        用 yaw、pitch、roll 只是方便的参数化；调试时仍要能说清每个角对应哪条轴。
      </figcaption>
    </figure>
  );
}

export function Cgp11CompositionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="三维变换组合：模型矩阵、观察矩阵和投影矩阵依次把点送到屏幕">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            组合矩阵：空间交接比最终像素更值得记录
          </text>
          {[
            [42, "模型", "M", COLORS.warning],
            [206, "观察", "V", COLORS.accent],
            [370, "投影", "P", COLORS.success],
          ].map(([x, title, symbol, color]) => (
            <g key={title}>
              <rect
                x={Number(x)}
                y="94"
                width="126"
                height="132"
                rx="14"
                fill={COLORS.surface}
                stroke={COLORS.border}
                strokeWidth="2"
              />
              <text
                x={Number(x) + 63}
                y="130"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={COLORS.text}
              >
                {title}
              </text>
              <text
                x={Number(x) + 63}
                y="178"
                textAnchor="middle"
                fontSize="28"
                fontWeight="700"
                fill={color as string}
              >
                {symbol as string}
              </text>
              <text
                x={Number(x) + 63}
                y="260"
                textAnchor="middle"
                fontSize="13"
                fill={COLORS.secondary}
              >
                记录输入/输出空间
              </text>
            </g>
          ))}
          <line
            x1="174"
            y1="160"
            x2="198"
            y2="160"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="190,150 210,160 190,170" fill={COLORS.accent} />
          <line
            x1="338"
            y1="160"
            x2="362"
            y2="160"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="354,150 374,160 354,170" fill={COLORS.accent} />
          <line
            x1="502"
            y1="160"
            x2="526"
            y2="160"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="518,150 538,160 518,170" fill={COLORS.accent} />
          <text
            x="580"
            y="166"
            fontSize="17"
            fontWeight="700"
            fill={COLORS.success}
          >
            clip
          </text>
          <text
            x="360"
            y="320"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            p_clip = P · V · M · p_local
          </text>
          <text
            x="360"
            y="344"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            矩阵顺序和列主序约定必须写进验收记录
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        看到屏幕位置错误时，按 M、V、P
        的交接逐段回放，能避免一开始就改投影参数。
      </figcaption>
    </figure>
  );
}

function InteractiveCube({
  yaw,
  pitch,
  roll,
  space,
}: {
  yaw: number;
  pitch: number;
  roll: number;
  space: Space;
}) {
  const transformed = CUBE_POINTS.map((point) =>
    transformPoint(point, yaw, pitch, roll, space),
  );
  const center = { x: 218, y: 206 };
  return (
    <SvgFrame label="可调三维变换实验：改变 yaw、pitch、roll 与旋转空间，观察立方体姿态">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live 3D transform：姿态变化要绑定空间
      </text>
      <rect
        x="44"
        y="62"
        width="360"
        height="248"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="78"
        y1="260"
        x2="354"
        y2="260"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="218"
        y1="280"
        x2="218"
        y2="98"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="218"
        y1="260"
        x2="324"
        y2="198"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="360" y="264" fontSize="12" fill={COLORS.secondary}>
        x
      </text>
      <text x="224" y="100" fontSize="12" fill={COLORS.secondary}>
        y
      </text>
      <text x="330" y="194" fontSize="12" fill={COLORS.secondary}>
        z
      </text>
      <CubeWire
        center={center}
        color={COLORS.warning}
        points={CUBE_POINTS}
        dashed
      />
      <CubeWire center={center} color={COLORS.accent} points={transformed} />
      <text x="72" y="294" fontSize="13" fill={COLORS.secondary}>
        黄：原始姿态 · 紫：变换姿态
      </text>
      <rect
        x="438"
        y="70"
        width="254"
        height="226"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="460" y="106" fontSize="14" fontWeight="700" fill={COLORS.text}>
        当前姿态
      </text>
      <text x="460" y="140" fontSize="13" fill={COLORS.accent}>
        yaw = {yaw}°
      </text>
      <text x="460" y="168" fontSize="13" fill={COLORS.success}>
        pitch = {pitch}°
      </text>
      <text x="460" y="196" fontSize="13" fill={COLORS.warning}>
        roll = {roll}°
      </text>
      <text x="460" y="234" fontSize="13" fill={COLORS.secondary}>
        轴空间：{space === "local" ? "局部" : "世界"}
      </text>
      <text x="460" y="270" fontSize="13" fill={COLORS.text}>
        逐帧记录顶点位置
      </text>
      <text
        x="360"
        y="338"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        只改变一条轴，再检查深度与朝向是否符合预测
      </text>
    </SvgFrame>
  );
}

export function Cgp11TransformationsThreeDimensionsLab() {
  const [yaw, setYaw] = useState(26);
  const [pitch, setPitch] = useState(18);
  const [roll, setRoll] = useState(12);
  const [space, setSpace] = useState<Space>("local");
  const currentSpace = useMemo(
    () => (space === "local" ? "局部轴" : "世界轴"),
    [space],
  );

  function reset() {
    setYaw(26);
    setPitch(18);
    setRoll(12);
    setSpace("local");
  }

  return (
    <section
      aria-label="三维变换专属数学实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-11-transformations-three-dimensions"
      data-unit-id="cgp-11"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 MathViz · 3D transforms
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把三条旋转轴变成可观察状态
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：只改变 yaw
            时，立方体哪一组边会交换深度？把轴空间从局部切到世界后，同一组角度还会得到同一姿态吗？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置三维变换实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择三维旋转空间">
          {(
            [
              ["local", "局部轴"],
              ["world", "世界轴"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={space === value}
              onClick={() => setSpace(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                space === value
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>yaw · y 轴</span>
              <span className="font-mono text-primary">{yaw}°</span>
            </span>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={yaw}
              onChange={(event) => setYaw(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>pitch · x 轴</span>
              <span className="font-mono text-primary">{pitch}°</span>
            </span>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={pitch}
              onChange={(event) => setPitch(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>roll · z 轴</span>
              <span className="font-mono text-primary">{roll}°</span>
            </span>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={roll}
              onChange={(event) => setRoll(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <InteractiveCube yaw={yaw} pitch={pitch} roll={roll} space={space} />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前轴空间：{currentSpace}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先标注旋转轴和所属空间，再判断姿态；如果结果突然翻转，回到每一段矩阵交接检查深度分量。
          </p>
        </div>
      </div>
    </section>
  );
}
