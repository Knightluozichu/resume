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

export function GpuGems3Ch11ShadowVolumeOverviewDiagram() {
  return (
    <Figure>
      <Frame label="shadow volume 原理：光源、遮挡物和向无穷远挤出的体积，摄像机射线进入和离开体积时更新 stencil counter">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把“不可见”变成一条可数的边界
        </text>
        <g transform="translate(38 82)">
          <circle
            cx="70"
            cy="132"
            r="25"
            fill={C.warning}
            fillOpacity="0.2"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="70"
            y="138"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.warning}
          >
            light
          </text>
          <path
            d="M 192 92 L 250 126 L 222 194 L 164 160 Z"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="207"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            occluder
          </text>
          <path
            d="M 222 94 L 646 28 L 646 236 L 222 194 Z"
            fill={C.danger}
            fillOpacity="0.14"
            stroke={C.danger}
            strokeWidth="2"
            strokeDasharray="8 6"
          />
          <text
            x="430"
            y="126"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.danger}
          >
            shadow volume
          </text>
          <Arrow x1={98} y1={126} x2={163} y2={126} color={C.warning} />
          <line
            x1="294"
            y1="160"
            x2="632"
            y2="160"
            stroke={C.success}
            strokeWidth="3"
          />
          <circle cx="322" cy="160" r="7" fill={C.success} />
          <circle cx="492" cy="160" r="7" fill={C.success} />
          <text
            x="322"
            y="186"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            entry +1
          </text>
          <text
            x="492"
            y="186"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            exit −1
          </text>
          <text
            x="520"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            nonzero counter → shadowed pixel
          </text>
        </g>
        <text
          x="380"
          y="408"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          先填充 scene depth，再只向 stencil buffer
          写体积边界；颜色和深度本身不在此 pass 修改
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch11ZPassZFailDiagram() {
  return (
    <Figure>
      <Frame label="z-pass 与 z-fail 对比：摄像机在体积外可数前方交点，摄像机在体积内则从几何后方数交点并需要完整 caps">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          摄像机在哪一侧，决定 stencil 从哪里数
        </text>
        <g transform="translate(34 82)">
          <rect
            width="322"
            height="260"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="161"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            z-pass
          </text>
          <circle cx="48" cy="134" r="12" fill={C.success} />
          <text
            x="48"
            y="166"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            camera outside
          </text>
          <path
            d="M 104 84 L 278 58 L 278 208 L 104 180 Z"
            fill={C.danger}
            fillOpacity="0.14"
            stroke={C.danger}
            strokeDasharray="7 6"
          />
          <line
            x1="60"
            y1="134"
            x2="280"
            y2="134"
            stroke={C.success}
            strokeWidth="3"
          />
          <circle cx="148" cy="134" r="6" fill={C.success} />
          <circle cx="236" cy="134" r="6" fill={C.success} />
          <text
            x="148"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            front depth pass
          </text>
          <text
            x="161"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            fast, no front cap required
          </text>
        </g>
        <g transform="translate(404 82)">
          <rect
            width="322"
            height="260"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="161"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            z-fail / Carmack&apos;s reverse
          </text>
          <circle cx="168" cy="134" r="12" fill={C.warning} />
          <text
            x="168"
            y="166"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            camera inside
          </text>
          <path
            d="M 54 84 L 278 58 L 278 208 L 54 180 Z"
            fill={C.danger}
            fillOpacity="0.14"
            stroke={C.danger}
            strokeDasharray="7 6"
          />
          <line
            x1="46"
            y1="134"
            x2="280"
            y2="134"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="161"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            back depth-fail pass
          </text>
          <text
            x="161"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            works generally, caps must close volume
          </text>
        </g>
        <text
          x="380"
          y="408"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          动态系统可用保守的 camera-inside test 在 z-pass 与 z-fail 之间切换
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch11RobustMeshDiagram() {
  return (
    <Figure>
      <Frame label="鲁棒 shadow volume 网格：闭合二流形只挤出朝向变化边，低质量开放网格还要挤出无邻居边并对所有多边形处理">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          网格有洞，也要让 stencil 的边界闭合
        </text>
        <g transform="translate(34 84)">
          <rect
            width="318"
            height="256"
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
            closed two-manifold
          </text>
          <path
            d="M 72 188 L 150 72 L 246 188 Z"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path
            d="M 72 188 L 150 72 L 246 188"
            fill="none"
            stroke={C.success}
            strokeWidth="6"
          />
          <text
            x="159"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            邻面朝向变化 → silhouette edge
          </text>
          <text
            x="159"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            一次挤出即可
          </text>
        </g>
        <Arrow x1={368} y1={210} x2={412} y2={210} />
        <g transform="translate(430 84)">
          <rect
            width="296"
            height="256"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="148"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            open / intersecting mesh
          </text>
          <path
            d="M 76 190 L 146 78 L 232 148 L 170 210 Z"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="3"
          />
          <path
            d="M 76 190 L 146 78 M 232 148 L 170 210"
            stroke={C.danger}
            strokeWidth="6"
          />
          <circle cx="146" cy="78" r="8" fill={C.danger} />
          <text
            x="148"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            无邻居边也挤出
          </text>
          <text
            x="148"
            y="256"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            所有 polygon 分组，必要时边挤出两次
          </text>
        </g>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          生成面必须朝向 volume 外侧；预处理可识别普通网格，困难网格再启用
          robust 路径
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch11GeometryShaderDiagram() {
  return (
    <Figure>
      <Frame label="geometry shader 动态生成 shadow volume：带三角形邻接输入，GS 根据朝向输出 caps 与 extruded silhouette quads">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把每帧 silhouette 判断从 CPU 搬进 GPU
        </text>
        <g transform="translate(24 106)">
          <rect
            width="158"
            height="150"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="79"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            VS input
          </text>
          <path
            d="M 40 104 L 79 46 L 118 104 Z"
            fill={C.accent}
            fillOpacity="0.2"
            stroke={C.accent}
          />
          <circle cx="40" cy="104" r="6" fill={C.success} />
          <circle cx="79" cy="46" r="6" fill={C.success} />
          <circle cx="118" cy="104" r="6" fill={C.success} />
          <text
            x="79"
            y="132"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            6 verts: triangle + neighbors
          </text>
        </g>
        <Arrow x1={198} y1={180} x2={244} y2={180} />
        <g transform="translate(258 106)">
          <rect
            width="190"
            height="150"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="95"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            geometry shader
          </text>
          <text
            x="95"
            y="68"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            face light?
          </text>
          <text
            x="95"
            y="94"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            neighbor sign change?
          </text>
          <text
            x="95"
            y="120"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            emit triangle strip
          </text>
        </g>
        <Arrow x1={464} y1={180} x2={510} y2={180} />
        <g transform="translate(524 106)">
          <rect
            width="210"
            height="150"
            rx="14"
            fill={C.surface}
            stroke={C.success}
          />
          <text
            x="105"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.success}
          >
            stencil volume
          </text>
          <path
            d="M 32 110 L 68 60 L 96 94 L 176 42 L 176 126 L 32 126 Z"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
          />
          <text
            x="105"
            y="142"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            front cap · back cap · side quads
          </text>
        </g>
        <text
          x="380"
          y="316"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          adjacency 输入让 GS 能比较邻面朝向；w=0 表示向无穷远的方向
        </text>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          动画 mesh 每帧重算 silhouette 时，GPU 生成比 CPU 回读拓扑更自然
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch11HierarchicalCullingDiagram() {
  return (
    <Figure>
      <Frame label="层次遮挡剔除：BVH 从前向后遍历，把节点 AABB 沿光方向挤出成 shadow volume AABB，若不可见则剪掉整个子树">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          不可见的不是一个物体，而是一整棵 shadow subtree
        </text>
        <g transform="translate(38 78)">
          <rect
            width="250"
            height="276"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="125"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            BVH front-to-back
          </text>
          <rect
            x="101"
            y="56"
            width="48"
            height="30"
            rx="6"
            fill={C.accent}
            fillOpacity="0.18"
            stroke={C.accent}
          />
          <line
            x1="125"
            y1="86"
            x2="76"
            y2="118"
            stroke={C.border}
            strokeWidth="2"
          />
          <line
            x1="125"
            y1="86"
            x2="174"
            y2="118"
            stroke={C.border}
            strokeWidth="2"
          />
          <rect
            x="38"
            y="118"
            width="76"
            height="30"
            rx="6"
            fill={C.success}
            fillOpacity="0.18"
            stroke={C.success}
          />
          <rect
            x="136"
            y="118"
            width="76"
            height="30"
            rx="6"
            fill={C.warning}
            fillOpacity="0.18"
            stroke={C.warning}
          />
          <line
            x1="76"
            y1="148"
            x2="55"
            y2="182"
            stroke={C.border}
            strokeWidth="2"
          />
          <line
            x1="76"
            y1="148"
            x2="97"
            y2="182"
            stroke={C.border}
            strokeWidth="2"
          />
          <line
            x1="174"
            y1="148"
            x2="153"
            y2="182"
            stroke={C.border}
            strokeWidth="2"
          />
          <line
            x1="174"
            y1="148"
            x2="195"
            y2="182"
            stroke={C.border}
            strokeWidth="2"
          />
          <rect
            x="30"
            y="182"
            width="50"
            height="28"
            rx="6"
            fill={C.success}
            fillOpacity="0.18"
            stroke={C.success}
          />
          <rect
            x="84"
            y="182"
            width="50"
            height="28"
            rx="6"
            fill={C.success}
            fillOpacity="0.18"
            stroke={C.success}
          />
          <rect
            x="138"
            y="182"
            width="50"
            height="28"
            rx="6"
            fill={C.danger}
            fillOpacity="0.18"
            stroke={C.danger}
          />
          <rect
            x="192"
            y="182"
            width="50"
            height="28"
            rx="6"
            fill={C.danger}
            fillOpacity="0.18"
            stroke={C.danger}
          />
          <text
            x="125"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            query node → visible? → traverse/render
          </text>
          <text
            x="125"
            y="268"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            async + temporal coherence
          </text>
        </g>
        <Arrow x1={312} y1={212} x2={360} y2={212} />
        <g transform="translate(380 78)">
          <rect
            width="342"
            height="276"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="171"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            shadow-volume AABB query
          </text>
          <rect
            x="44"
            y="98"
            width="96"
            height="86"
            rx="8"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
          />
          <path
            d="M 140 104 L 286 62 L 286 220 L 140 182 Z"
            fill={C.danger}
            fillOpacity="0.12"
            stroke={C.danger}
            strokeDasharray="7 6"
          />
          <text
            x="92"
            y="146"
            textAnchor="middle"
            fontSize="13"
            fill={C.warning}
          >
            node AABB
          </text>
          <text
            x="214"
            y="142"
            textAnchor="middle"
            fontSize="13"
            fill={C.danger}
          >
            extruded AABB
          </text>
          <Arrow x1={140} y1={144} x2={242} y2={144} color={C.warning} />
          <text
            x="171"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            not visible → prune subtree
          </text>
          <text
            x="171"
            y="276"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            visible → generate volume at leaf
          </text>
        </g>
        <text
          x="380"
          y="408"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          光源在 AABB 内或摄像机在挤出 AABB 内时要跳过不安全的
          query，直接继续遍历
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch11StencilPerformanceDiagram() {
  return (
    <Figure>
      <Frame label="shadow volume 性能取舍：z-pass 通常没有 caps 且 fill rate 较低，z-fail 更通用但 caps 和遮挡区域会增加工作">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          正确性、封闭性与 fill rate 要一起算
        </text>
        <g transform="translate(42 86)">
          <rect
            width="312"
            height="236"
            rx="16"
            fill={C.surface}
            stroke={C.accent}
          />
          <text
            x="156"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.accent}
          >
            z-pass baseline
          </text>
          <rect x="46" y="70" width="220" height="24" rx="12" fill={C.border} />
          <rect
            x="46"
            y="70"
            width="112"
            height="24"
            rx="12"
            fill={C.success}
          />
          <text x="156" y="88" textAnchor="middle" fontSize="12" fill={C.text}>
            fill rate · lower
          </text>
          <text
            x="156"
            y="132"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            caps: front omitted, back at infinity
          </text>
          <text
            x="156"
            y="164"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            mesh: closed path easiest
          </text>
          <text
            x="156"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            use when camera is outside
          </text>
        </g>
        <g transform="translate(406 86)">
          <rect
            width="312"
            height="236"
            rx="16"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="156"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.warning}
          >
            z-fail fallback
          </text>
          <rect x="46" y="70" width="220" height="24" rx="12" fill={C.border} />
          <rect
            x="46"
            y="70"
            width="178"
            height="24"
            rx="12"
            fill={C.warning}
          />
          <text x="156" y="88" textAnchor="middle" fontSize="12" fill={C.text}>
            fill rate · higher
          </text>
          <text
            x="156"
            y="132"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            caps: front + back must close volume
          </text>
          <text
            x="156"
            y="164"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            mesh: robust mode costs more
          </text>
          <text
            x="156"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            use when camera is inside
          </text>
        </g>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          volume culling、scissor 与 depth bounds 可进一步减少 stencil
          fill；query 也不应同步阻塞 CPU
        </text>
      </Frame>
    </Figure>
  );
}

type CameraMode = "outside" | "inside";
type MeshMode = "closed" | "open";
type GenerationMode = "cpu" | "geometry-shader";
type QueryMode = "sync" | "async";

export function GpuGems3Ch11ShadowVolumeLab() {
  const [cameraMode, setCameraMode] = useState<CameraMode>("outside");
  const [meshMode, setMeshMode] = useState<MeshMode>("closed");
  const [generationMode, setGenerationMode] =
    useState<GenerationMode>("geometry-shader");
  const [queryMode, setQueryMode] = useState<QueryMode>("async");
  const [nodeBudget, setNodeBudget] = useState(64);

  const result = useMemo(() => {
    const zMode = cameraMode === "outside" ? "z-pass" : "z-fail";
    const robust = meshMode === "open";
    const generated = generationMode === "geometry-shader" ? "GPU" : "CPU";
    const queryGain = queryMode === "async" ? 18 : 0;
    const pruned = Math.min(88, Math.round(nodeBudget * 0.58 + queryGain));
    const stencilOps = Math.round(
      (zMode === "z-fail" ? 118 : 82) + (robust ? 32 : 0),
    );
    const fillRisk = Math.min(
      98,
      Math.round(
        (zMode === "z-fail" ? 48 : 26) + (robust ? 14 : 0) - nodeBudget / 7,
      ),
    );
    const emitted = generated === "GPU" ? (robust ? 14 : 9) : robust ? 22 : 15;
    return { emitted, fillRisk, generated, pruned, stencilOps, zMode };
  }, [cameraMode, generationMode, meshMode, nodeBudget, queryMode]);

  function reset() {
    setCameraMode("outside");
    setMeshMode("closed");
    setGenerationMode("geometry-shader");
    setQueryMode("async");
    setNodeBudget(64);
  }

  const dirty =
    cameraMode !== "outside" ||
    meshMode !== "closed" ||
    generationMode !== "geometry-shader" ||
    queryMode !== "async" ||
    nodeBudget !== 64;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 3 Chapter 11 shadow volume 实验：调整摄像机位置、网格质量、生成路径、query 模式与节点预算"
      data-visual-kind="gpu-gems3-ch11-shadow-volumes"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">Shadow Volume Lab</p>
        <p className="mt-1 text-sm text-secondary">
          把 z-pass/z-fail、鲁棒网格路径、geometry shader 和层次 query
          分开调节，观察 stencil 工作与 fill risk 的趋势。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg
            viewBox="0 0 520 360"
            role="img"
            aria-label="shadow volume、stencil counter 和 hierarchical culling 读数预览"
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
              {result.zMode} · {meshMode} mesh · {result.generated} generation
            </text>
            <rect
              x="28"
              y="58"
              width="300"
              height="160"
              rx="14"
              fill={C.surface}
              stroke={C.border}
            />
            <circle
              cx="78"
              cy="138"
              r="18"
              fill={C.warning}
              fillOpacity="0.22"
              stroke={C.warning}
              strokeWidth="2"
            />
            <path
              d="M 132 104 L 174 126 L 154 176 L 112 154 Z"
              fill={C.accent}
              fillOpacity="0.2"
              stroke={C.accent}
              strokeWidth="2"
            />
            <path
              d="M 154 104 L 302 72 L 302 202 L 154 176 Z"
              fill={C.danger}
              fillOpacity="0.14"
              stroke={C.danger}
              strokeDasharray="7 6"
            />
            <line
              x1="98"
              y1="138"
              x2="300"
              y2="138"
              stroke={C.success}
              strokeWidth="3"
            />
            <circle cx="194" cy="138" r="6" fill={C.success} />
            <circle cx="262" cy="138" r="6" fill={C.success} />
            <text
              x="194"
              y="164"
              textAnchor="middle"
              fontSize="12"
              fill={C.success}
            >
              +1
            </text>
            <text
              x="262"
              y="164"
              textAnchor="middle"
              fontSize="12"
              fill={C.success}
            >
              −1
            </text>
            <text
              x="178"
              y="244"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              stencil counter path
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
            <text x="368" y="120" fontSize="12" fill={C.secondary}>
              stencil ops
            </text>
            <text
              x="474"
              y="120"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.accent}
            >
              {result.stencilOps}
            </text>
            <text x="368" y="154" fontSize="12" fill={C.secondary}>
              GS emitted
            </text>
            <text
              x="474"
              y="154"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.success}
            >
              {result.emitted}
            </text>
            <text x="368" y="188" fontSize="12" fill={C.secondary}>
              pruned
            </text>
            <text
              x="474"
              y="188"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={C.success}
            >
              {result.pruned}%
            </text>
            <text x="368" y="222" fontSize="12" fill={C.secondary}>
              fill risk
            </text>
            <text
              x="474"
              y="222"
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={result.fillRisk > 42 ? C.danger : C.warning}
            >
              {result.fillRisk}%
            </text>
            <text
              x="260"
              y="318"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              {queryMode} query · budget {nodeBudget}
            </text>
            <text
              x="260"
              y="342"
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              趋势示意：真实结果仍取决于屏幕覆盖、网格退化和 GPU timer
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            camera position
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={cameraMode}
              onChange={(event) =>
                setCameraMode(event.target.value as CameraMode)
              }
            >
              <option value="outside">outside volume · z-pass</option>
              <option value="inside">inside volume · z-fail</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            mesh quality
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={meshMode}
              onChange={(event) => setMeshMode(event.target.value as MeshMode)}
            >
              <option value="closed">closed two-manifold</option>
              <option value="open">open / intersecting</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            volume generation
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={generationMode}
              onChange={(event) =>
                setGenerationMode(event.target.value as GenerationMode)
              }
            >
              <option value="geometry-shader">geometry shader · GPU</option>
              <option value="cpu">silhouette build · CPU</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            occlusion query
            <select
              className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary"
              value={queryMode}
              onChange={(event) =>
                setQueryMode(event.target.value as QueryMode)
              }
            >
              <option value="async">async + temporal coherence</option>
              <option value="sync">synchronous query</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            node budget：{nodeBudget}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="16"
              max="112"
              step="16"
              value={nodeBudget}
              onChange={(event) => setNodeBudget(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {cameraMode === "inside"
              ? "camera 在 volume 内，z-fail 更稳健但 caps 与 fill rate 成本更高。"
              : meshMode === "open"
                ? "开放网格启用 robust 生成，边界边也会参与 volume；先确认额外挤出能换来正确性。"
                : queryMode === "async"
                  ? "异步 query 与上一帧可见性帮助避免 CPU 等待，但必须保守处理光源/摄像机进入 AABB 的情况。"
                  : "同步 query 便于教学观察，却可能把 GPU readback 延迟暴露给 CPU。"}
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
