"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";

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

function Frame({
  children,
  height = 420,
  label,
}: {
  children: ReactNode;
  height?: number;
  label: string;
}) {
  return (
    <svg
      viewBox={`0 0 760 ${height}`}
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height={height} rx="16" fill={C.bg} />
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
  const size = 9;
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
        strokeDasharray={dashed ? "7 6" : undefined}
        strokeWidth="3"
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
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

function RigidShape({
  angle = 0,
  fill = C.accent,
  opacity = 0.86,
  x,
  y,
}: {
  angle?: number;
  fill?: string;
  opacity?: number;
  x: number;
  y: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
      <rect x="-38" y="-28" width="76" height="56" rx="10" fill={fill} />
      <circle cx="-23" cy="28" r="7" fill={C.text} />
      <circle cx="23" cy="28" r="7" fill={C.text} />
      <path d="M -22 -28 L -11 -46 H 14 L 26 -28" fill="none" stroke={C.text} strokeWidth="4" />
    </g>
  );
}

function ParticleDots({
  color = C.success,
  count = 9,
  offsetX = 0,
  offsetY = 0,
}: {
  color?: string;
  count?: number;
  offsetX?: number;
  offsetY?: number;
}) {
  return (
    <g>
      {Array.from({ length: count }, (_, index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);
        return (
          <circle
            key={`particle-${offsetX}-${offsetY}-${index}`}
            cx={offsetX - 24 + column * 24}
            cy={offsetY - 20 + row * 24}
            r="5"
            fill={color}
            fillOpacity="0.88"
          />
        );
      })}
    </g>
  );
}

function GridCells({
  columns = 6,
  rows = 4,
  x,
  y,
  width,
  height,
}: {
  columns?: number;
  rows?: number;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="9" fill={C.surface} stroke={C.border} strokeWidth="2" />
      {Array.from({ length: columns - 1 }, (_, index) => {
        const px = x + (width / columns) * (index + 1);
        return <line key={`grid-col-${px}`} x1={px} x2={px} y1={y} y2={y + height} stroke={C.border} />;
      })}
      {Array.from({ length: rows - 1 }, (_, index) => {
        const py = y + (height / rows) * (index + 1);
        return <line key={`grid-row-${py}`} x1={x} x2={x + width} y1={py} y2={py} stroke={C.border} />;
      })}
    </g>
  );
}

export function GpuGems3Ch29MotionDiagram() {
  return (
    <Figure>
      <Frame
        height={448}
        label="刚体运动拆成平移和旋转：力改变线动量，偏心力产生力矩并改变角动量"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one rigid body, two kinds of motion
        </text>
        <g transform="translate(30 86)">
          <rect width="322" height="286" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="161" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.text}>
            translation
          </text>
          <RigidShape x={160} y={140} fill={C.accent} />
          <circle cx="160" cy="140" r="6" fill={C.success} />
          <Arrow x1={160} x2={258} y1={140} y2={112} color={C.accent} />
          <text x="160" y="224" textAnchor="middle" fontSize="13" fill={C.accent}>
            center of mass X + linear momentum P
          </text>
          <text x="160" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>
            force changes dP / dt
          </text>
        </g>
        <g transform="translate(408 86)">
          <rect width="322" height="286" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="161" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill={C.text}>
            rotation
          </text>
          <RigidShape x={160} y={140} angle={22} fill={C.warning} />
          <circle cx="160" cy="140" r="6" fill={C.success} />
          <Arrow x1={194} x2={262} y1={94} y2={72} color={C.warning} />
          <path d="M 108 174 A 58 58 0 1 0 204 92" fill="none" stroke={C.warning} strokeWidth="4" strokeDasharray="8 6" />
          <text x="160" y="224" textAnchor="middle" fontSize="13" fill={C.warning}>
            torque changes angular momentum L
          </text>
          <text x="160" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>
            inertia controls angular speed W
          </text>
        </g>
        <rect x="30" y="400" width="700" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="421" textAnchor="middle" fontSize="13" fill={C.secondary}>
          integrate both states each iteration, then render from position and orientation
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch29QuaternionDiagram() {
  return (
    <Figure>
      <Frame
        height={420}
        label="用四元数更新刚体姿态：角速度产生小的旋转增量，四元数归一化后避免矩阵累积的缩放和剪切"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          quaternion state keeps rotation rigid
        </text>
        <g transform="translate(30 82)">
          <rect width="210" height="256" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="105" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            angular velocity W
          </text>
          <Arrow x1={105} x2={174} y1={146} y2={100} color={C.warning} />
          <path d="M 64 176 A 47 47 0 1 0 147 106" fill="none" stroke={C.warning} strokeWidth="4" strokeDasharray="7 5" />
          <text x="105" y="218" textAnchor="middle" fontSize="13" fill={C.warning}>
            axis + angle
          </text>
          <text x="105" y="246" textAnchor="middle" fontSize="12" fill={C.secondary}>
            four values fit RGBA
          </text>
        </g>
        <Arrow x1={264} x2={302} y1={210} y2={210} color={C.accent} />
        <g transform="translate(312 82)">
          <rect width="192" height="256" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="96" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            q ← q + dq
          </text>
          <rect x="42" y="70" width="108" height="88" rx="9" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
          <text x="96" y="101" textAnchor="middle" fontSize="14" fill={C.success}>normalize(q)</text>
          <text x="96" y="130" textAnchor="middle" fontSize="12" fill={C.secondary}>no stretch degrees</text>
          <Arrow x1={96} x2={96} y1={174} y2={204} color={C.success} />
          <circle cx="96" cy="230" r="26" fill="none" stroke={C.success} strokeWidth="4" />
          <line x1="96" x2="120" y1="230" y2="208" stroke={C.success} strokeWidth="4" />
        </g>
        <Arrow x1={528} x2={566} y1={210} y2={210} color={C.warning} />
        <g transform="translate(576 82)">
          <rect width="154" height="256" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="77" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            matrix drift
          </text>
          <rect x="32" y="72" width="90" height="88" rx="9" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
          <path d="M 48 142 L 78 92 L 106 140 Z" fill="none" stroke={C.warning} strokeWidth="4" />
          <path d="M 44 92 L 110 148" stroke={C.danger} strokeWidth="3" strokeDasharray="6 5" />
          <text x="77" y="204" textAnchor="middle" fontSize="13" fill={C.warning}>rotation + scale</text>
          <text x="77" y="232" textAnchor="middle" fontSize="12" fill={C.secondary}>accumulates error</text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch29ParticleGridDiagram() {
  return (
    <Figure>
      <Frame
        height={444}
        label="粒子化刚体和均匀网格：每个刚体填充为等尺寸粒子，再把粒子索引写入网格以便只搜索邻近单元"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          replace polygon pairs with particles in nearby cells
        </text>
        <g transform="translate(28 84)">
          <rect width="218" height="280" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="109" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            rigid body → particles
          </text>
          <RigidShape x={109} y={142} fill={C.accent} opacity={0.28} />
          <ParticleDots color={C.accent} count={9} offsetX={109} offsetY={142} />
          <text x="109" y="224" textAnchor="middle" fontSize="13" fill={C.accent}>same diameter</text>
          <text x="109" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>resolution trades cost</text>
        </g>
        <Arrow x1={264} x2={302} y1={224} y2={224} color={C.accent} />
        <g transform="translate(314 84)">
          <rect width="214" height="280" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="107" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            uniform grid
          </text>
          <GridCells x={30} y={70} width={154} height={116} />
          <circle cx="98" cy="128" r="8" fill={C.warning} />
          <circle cx="124" cy="151" r="8" fill={C.warning} />
          <circle cx="72" cy="151" r="8" fill={C.warning} />
          <text x="107" y="226" textAnchor="middle" fontSize="13" fill={C.success}>cell → particle indices</text>
          <text x="107" y="254" textAnchor="middle" fontSize="12" fill={C.secondary}>neighbor search is local</text>
        </g>
        <Arrow x1={546} x2={584} y1={224} y2={224} color={C.warning} />
        <g transform="translate(596 84)">
          <rect width="134" height="280" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="67" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
            contacts
          </text>
          <circle cx="54" cy="126" r="18" fill={C.accent} fillOpacity="0.66" />
          <circle cx="84" cy="143" r="18" fill={C.warning} fillOpacity="0.66" />
          <Arrow x1={68} x2={102} y1={134} y2={116} color={C.warning} />
          <text x="67" y="212" textAnchor="middle" fontSize="13" fill={C.warning}>distance &lt; diameter</text>
          <text x="67" y="240" textAnchor="middle" fontSize="12" fill={C.secondary}>spring + damping</text>
        </g>
        <rect x="28" y="392" width="702" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="413" textAnchor="middle" fontSize="13" fill={C.secondary}>
          depth peeling can voxelize a closed mesh before the particle simulation starts
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch29TextureDataDiagram() {
  return (
    <Figure>
      <Frame
        height={420}
        label="GPU 数据布局：刚体物理量、粒子物理量和扁平三维纹理均存储为可读写纹理，并用双缓冲避免原地覆盖"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          textures are the simulation state and the work queues
        </text>
        <g transform="translate(28 84)">
          <rect width="214" height="256" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>body state</text>
          <rect x="42" y="70" width="54" height="126" rx="8" fill={C.accent} fillOpacity="0.18" stroke={C.accent} />
          <rect x="116" y="70" width="54" height="126" rx="8" fill={C.accent} fillOpacity="0.09" stroke={C.accent} strokeDasharray="6 5" />
          <text x="69" y="104" textAnchor="middle" fontSize="12" fill={C.accent}>read</text>
          <text x="143" y="104" textAnchor="middle" fontSize="12" fill={C.accent}>write</text>
          <Arrow x1={99} x2={114} y1={132} y2={132} color={C.accent} />
          <text x="107" y="228" textAnchor="middle" fontSize="13" fill={C.secondary}>P, L, X, q</text>
        </g>
        <Arrow x1={264} x2={302} y1={212} y2={212} color={C.accent} />
        <g transform="translate(314 84)">
          <rect width="214" height="256" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="107" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>particle state</text>
          <rect x="38" y="70" width="138" height="62" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} />
          <text x="107" y="98" textAnchor="middle" fontSize="13" fill={C.success}>position · velocity</text>
          <rect x="38" y="150" width="138" height="46" rx="8" fill={C.warning} fillOpacity="0.14" stroke={C.warning} />
          <text x="107" y="179" textAnchor="middle" fontSize="13" fill={C.warning}>relative position</text>
          <text x="107" y="228" textAnchor="middle" fontSize="13" fill={C.secondary}>derived every iteration</text>
        </g>
        <Arrow x1={550} x2={588} y1={212} y2={212} color={C.success} />
        <g transform="translate(600 84)">
          <rect width="130" height="256" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="65" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>flat 3D grid</text>
          <GridCells x={28} y={70} width={74} height={90} columns={4} rows={3} />
          <rect x="48" y="176" width="34" height="24" rx="4" fill={C.warning} fillOpacity="0.5" />
          <text x="65" y="228" textAnchor="middle" fontSize="12" fill={C.warning}>cell lists</text>
        </g>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "particles", caption: "从刚体状态计算每个粒子的位置和速度" },
  { label: "grid", caption: "把粒子索引写入均匀网格，建立局部邻域" },
  { label: "contacts", caption: "计算碰撞反力、阻尼和切向摩擦并归约到刚体" },
  { label: "integrate", caption: "更新动量、位置和四元数，再交换双缓冲纹理" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  contacts: "计算碰撞反力、阻尼和切向摩擦并归约到刚体",
  grid: "把粒子索引写入均匀网格，建立局部邻域",
  integrate: "更新动量、位置和四元数，再交换双缓冲纹理",
  particles: "从刚体状态计算每个粒子的位置和速度",
};

export function GpuGems3Ch29PipelineDiagram() {
  const particlesRef = useRef<SVGGElement>(null);
  const gridRef = useRef<SVGGElement>(null);
  const contactsRef = useRef<SVGGElement>(null);
  const integrateRef = useRef<SVGGElement>(null);
  const refs = [particlesRef, gridRef, contactsRef, integrateRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(
          ref.current!,
          { opacity: [0.3, 1], duration: T * 0.42 },
          T * index,
        );
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame
        height={454}
        label="GPU 刚体模拟的四段教学管线：粒子状态、网格、碰撞接触和积分更新"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one GPU iteration, four visible phases
        </text>
        <g ref={particlesRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="108" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · particles</text>
          <RigidShape x={108} y={190} fill={C.accent} opacity={0.28} />
          <ParticleDots color={C.accent} count={9} offsetX={108} offsetY={190} />
          <text x="108" y="282" textAnchor="middle" fontSize="13" fill={C.accent}>xᵢ, vᵢ</text>
          <text x="108" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>derive from q</text>
        </g>
        <Arrow x1={208} x2={230} y1={214} y2={214} color={C.accent} />
        <g ref={gridRef} style={{ opacity: 0.3 }}>
          <rect x="242" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="326" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · grid</text>
          <GridCells x={272} y={148} width={108} height={88} columns={4} rows={3} />
          <circle cx="326" cy="191" r="7" fill={C.warning} />
          <circle cx="353" cy="220" r="7" fill={C.warning} />
          <text x="326" y="282" textAnchor="middle" fontSize="13" fill={C.success}>cell lists</text>
          <text x="326" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>local neighbors</text>
        </g>
        <Arrow x1={426} x2={448} y1={214} y2={214} color={C.success} />
        <g ref={contactsRef} style={{ opacity: 0.3 }}>
          <rect x="460" y="88" width="168" height="252" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="544" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · contacts</text>
          <circle cx="518" cy="194" r="22" fill={C.accent} fillOpacity="0.65" />
          <circle cx="570" cy="194" r="22" fill={C.warning} fillOpacity="0.65" />
          <Arrow x1={539} x2={553} y1={194} y2={194} color={C.danger} />
          <text x="544" y="282" textAnchor="middle" fontSize="13" fill={C.warning}>spring + damping</text>
          <text x="544" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>force / torque</text>
        </g>
        <Arrow x1={644} x2={666} y1={214} y2={214} color={C.warning} />
        <g ref={integrateRef} style={{ opacity: 0.3 }}>
          <rect x="678" y="88" width="56" height="252" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="706" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <path d="M 694 220 A 18 18 0 1 0 724 188" fill="none" stroke={C.accent} strokeWidth="4" />
          <text x="706" y="282" textAnchor="middle" fontSize="12" fill={C.accent}>integrate</text>
          <text x="706" y="310" textAnchor="middle" fontSize="11" fill={C.secondary}>swap</text>
        </g>
        <rect x="24" y="376" width="710" height="34" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>
          a fifth momentum pass can be fused with integration when MRTs are available
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察刚体状态如何变成粒子邻域，再回到下一帧的姿态。"
      />
    </Figure>
  );
}

type BodyCount = "many" | "few";
type GridMode = "brute" | "grid";
type OrientationMode = "matrix" | "quaternion";
type ParticleResolution = "high" | "low";

const DEFAULTS = {
  bodies: "many" as BodyCount,
  grid: "grid" as GridMode,
  orientation: "quaternion" as OrientationMode,
  particles: "high" as ParticleResolution,
  timestep: 16,
};

export function GpuGems3Ch29RigidBodyLab() {
  const [bodies, setBodies] = useState<BodyCount>(DEFAULTS.bodies);
  const [grid, setGrid] = useState<GridMode>(DEFAULTS.grid);
  const [orientation, setOrientation] = useState<OrientationMode>(DEFAULTS.orientation);
  const [particles, setParticles] = useState<ParticleResolution>(DEFAULTS.particles);
  const [timestep, setTimestep] = useState(DEFAULTS.timestep);

  const result = useMemo(() => {
    const bodyCount = bodies === "many" ? 1200 : 160;
    const particlePerBody = particles === "high" ? 32 : 12;
    const particleCount = bodyCount * particlePerBody;
    const pairChecks = grid === "grid" ? Math.round(particleCount * 9.5) : Math.round((particleCount * particleCount) / 820);
    const ips = Math.max(42, Math.round(210000 / (pairChecks + particleCount * 1.4) * (timestep < 20 ? 1 : 0.84)));
    const integrity = orientation === "quaternion" ? "rigid" : timestep > 20 ? "drift risk" : "watch scale";
    const contactCount = Math.round(pairChecks * 0.18);
    return { bodyCount, contactCount, integrity, ips, pairChecks, particleCount };
  }, [bodies, grid, orientation, particles, timestep]);

  const reset = () => {
    setBodies(DEFAULTS.bodies);
    setGrid(DEFAULTS.grid);
    setOrientation(DEFAULTS.orientation);
    setParticles(DEFAULTS.particles);
    setTimestep(DEFAULTS.timestep);
  };

  const bodyOpacity = bodies === "many" ? 0.44 : 0.82;
  const particleCount = particles === "high" ? 9 : 5;
  const driftAngle = orientation === "quaternion" ? 18 : timestep > 20 ? 42 : 28;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 29
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              GPU Rigid Body Simulation Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整粒子分辨率、对象规模、邻域搜索和姿态表示，观察碰撞检查量、迭代速度与旋转稳定性。
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg
              viewBox="0 0 730 398"
              role="img"
              aria-label={`刚体模拟实验：${result.bodyCount} 个刚体，${result.particleCount} 个粒子，${grid} 邻域搜索，${orientation} 姿态，${result.ips} iterations per second`}
              className="mx-auto block h-auto w-full"
            >
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>
                body state → particles → grid contacts → next pose
              </text>
              <rect x="34" y="56" width="662" height="242" rx="12" fill={C.surface} stroke={C.border} />
              <g opacity={bodyOpacity}>
                <RigidShape x={150} y={176} angle={driftAngle} fill={C.accent} />
                <RigidShape x={240} y={202} angle={-driftAngle * 0.6} fill={C.warning} />
                <RigidShape x={574} y={178} angle={driftAngle * 0.45} fill={C.success} />
              </g>
              <ParticleDots color={C.accent} count={particleCount} offsetX={150} offsetY={176} />
              <GridCells x={330} y={92} width={154} height={126} />
              <circle cx="408" cy="150" r="8" fill={C.warning} />
              <circle cx="438" cy="176" r="8" fill={C.warning} />
              <Arrow x1={274} x2={320} y1={178} y2={158} color={C.accent} />
              <Arrow x1={490} x2={540} y1={160} y2={142} color={C.success} />
              <text x="150" y="270" textAnchor="middle" fontSize="12" fill={C.accent}>particle values</text>
              <text x="407" y="246" textAnchor="middle" fontSize="12" fill={C.warning}>neighbor contacts</text>
              <text x="574" y="270" textAnchor="middle" fontSize="12" fill={C.success}>updated pose</text>
              <text x="365" y="334" textAnchor="middle" fontSize="13" fill={C.secondary}>
                {result.particleCount} particles · {result.pairChecks} candidate checks · {result.contactCount} contacts
              </text>
              <text x="365" y="360" textAnchor="middle" fontSize="13" fill={result.integrity === "rigid" ? C.success : C.warning}>
                {grid === "grid" ? "uniform grid" : "brute force"} · {orientation} · {result.integrity}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="粒子数" tone={C.accent} value={`${result.particleCount}`} />
            <Metric label="候选检查" tone={C.warning} value={`${result.pairChecks}`} />
            <Metric label="碰撞接触" tone={C.success} value={`${result.contactCount}`} />
            <Metric label="估算 iterations/s" tone={C.secondary} value={`${result.ips}`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch29-particles">
            particle resolution
            <select
              id="ch29-particles"
              value={particles}
              onChange={(event) => setParticles(event.target.value as ParticleResolution)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="low">low: 12 per body</option>
              <option value="high">high: 32 per body</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch29-bodies">
            body count
            <select
              id="ch29-bodies"
              value={bodies}
              onChange={(event) => setBodies(event.target.value as BodyCount)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="few">few bodies</option>
              <option value="many">many bodies</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch29-grid">
            neighbor search
            <select
              id="ch29-grid"
              value={grid}
              onChange={(event) => setGrid(event.target.value as GridMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="grid">uniform grid</option>
              <option value="brute">brute force pairs</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch29-orientation">
            orientation state
            <select
              id="ch29-orientation"
              value={orientation}
              onChange={(event) => setOrientation(event.target.value as OrientationMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="quaternion">quaternion</option>
              <option value="matrix">rotation matrix</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch29-timestep">
            timestep: {timestep} ms
            <input
              id="ch29-timestep"
              type="range"
              min="8"
              max="32"
              step="4"
              value={timestep}
              onChange={(event) => setTimestep(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
