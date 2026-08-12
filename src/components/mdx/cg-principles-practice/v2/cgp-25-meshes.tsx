"use client";

import { useState, type ReactNode } from "react";

type MeshView = "wireframe" | "topology" | "lod";

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        {children}
      </div>
    </figure>
  );
}

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const left = {
    x: Math.round((x2 - size * Math.cos(angle - Math.PI / 6)) * 1000) / 1000,
    y: Math.round((y2 - size * Math.sin(angle - Math.PI / 6)) * 1000) / 1000,
  };
  const right = {
    x: Math.round((x2 - size * Math.cos(angle + Math.PI / 6)) * 1000) / 1000,
    y: Math.round((y2 - size * Math.sin(angle + Math.PI / 6)) * 1000) / 1000,
  };
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={
          String(x2) +
          "," +
          String(y2) +
          " " +
          String(left.x) +
          "," +
          String(left.y) +
          " " +
          String(right.x) +
          "," +
          String(right.y)
        }
        fill={color}
      />
    </>
  );
}

function MeshPatch({
  originX,
  originY,
  size,
  density,
  highlightEdge = false,
  showNormals = false,
}: {
  originX: number;
  originY: number;
  size: number;
  density: number;
  highlightEdge?: boolean;
  showNormals?: boolean;
}) {
  const cells: ReactNode[] = [];
  const vertices: ReactNode[] = [];
  for (let row = 0; row <= density; row += 1) {
    for (let column = 0; column <= density; column += 1) {
      const x = originX + (column * size) / density;
      const y = originY + (row * size) / density;
      vertices.push(
        <circle
          key={"mesh-vertex-" + originX + "-" + row + "-" + column}
          cx={x}
          cy={y}
          r={density <= 3 ? "5" : "3"}
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />,
      );
      if (showNormals && row < density && column < density) {
        cells.push(
          <line
            key={"mesh-normal-" + originX + "-" + row + "-" + column}
            x1={x + size / density / 2}
            y1={y + size / density / 2}
            x2={x + size / density / 2}
            y2={y + size / density / 2 - 16}
            stroke={COLORS.warning}
            strokeWidth="2"
          />,
        );
      }
    }
  }
  return (
    <g>
      {Array.from({ length: density + 1 }, (_, row) => {
        const y = originY + (row * size) / density;
        return (
          <line
            key={"mesh-row-" + originX + "-" + row}
            x1={originX}
            y1={y}
            x2={originX + size}
            y2={y}
            stroke={COLORS.border}
            strokeWidth="2"
          />
        );
      })}
      {Array.from({ length: density + 1 }, (_, column) => {
        const x = originX + (column * size) / density;
        return (
          <line
            key={"mesh-column-" + originX + "-" + column}
            x1={x}
            y1={originY}
            x2={x}
            y2={originY + size}
            stroke={COLORS.border}
            strokeWidth="2"
          />
        );
      })}
      {highlightEdge ? (
        <line
          x1={originX + size / 2}
          y1={originY}
          x2={originX + size / 2}
          y2={originY + size}
          stroke={COLORS.warning}
          strokeWidth="5"
        />
      ) : null}
      {cells}
      {vertices}
    </g>
  );
}

export function Cgp25MeshDataDiagram() {
  return (
    <Figure>
      <SvgFrame label="网格数据流程图：顶点位置、索引连接和属性经过拓扑解释生成可渲染表面">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          meshes：位置、连接与属性组成可渲染表面
        </text>
        <rect
          x="34"
          y="88"
          width="176"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="122"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          vertices
        </text>
        <MeshPatch originX={74} originY={146} size={96} density={2} />
        <text
          x="122"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          位置 + 法线 + UV
        </text>
        <Arrow x1={230} y1={184} x2={274} y2={184} color={COLORS.accent} />
        <rect
          x="290"
          y="88"
          width="156"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="368"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          indices
        </text>
        <text
          x="368"
          y="168"
          textAnchor="middle"
          fontSize="16"
          fill={COLORS.accent}
        >
          0, 1, 2
        </text>
        <text
          x="368"
          y="204"
          textAnchor="middle"
          fontSize="16"
          fill={COLORS.success}
        >
          0, 2, 3
        </text>
        <text
          x="368"
          y="250"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          复用位置并声明绕向
        </text>
        <Arrow x1={466} y1={184} x2={510} y2={184} color={COLORS.accent} />
        <rect
          x="526"
          y="88"
          width="160"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="606"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          surface
        </text>
        <MeshPatch
          originX={558}
          originY={148}
          size={96}
          density={2}
          showNormals
        />
        <text
          x="606"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          图元 + 法向反馈
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          网格不是点的集合，而是一份可检查的连接契约
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp25TopologyDiagram() {
  return (
    <Figure>
      <SvgFrame label="网格拓扑图：流形边有两个邻面，边界边有一个邻面，非流形边可能有三个以上邻面">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          mesh topology：同一条边连接了多少个面
        </text>
        <g>
          <rect
            x="34"
            y="86"
            width="204"
            height="202"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="136"
            y="121"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            流形内部边
          </text>
          <polygon
            points="72,232 136,142 200,232"
            fill={COLORS.accent}
            fillOpacity="0.14"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon
            points="72,232 136,286 200,232"
            fill={COLORS.success}
            fillOpacity="0.14"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <line
            x1="136"
            y1="142"
            x2="136"
            y2="286"
            stroke={COLORS.warning}
            strokeWidth="5"
          />
          <text
            x="136"
            y="268"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            一条边，两个邻面
          </text>
        </g>
        <g>
          <rect
            x="258"
            y="86"
            width="204"
            height="202"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="121"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            边界边
          </text>
          <polygon
            points="296,232 360,142 424,232"
            fill={COLORS.accent}
            fillOpacity="0.14"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <line
            x1="296"
            y1="232"
            x2="424"
            y2="232"
            stroke={COLORS.warning}
            strokeWidth="5"
          />
          <text
            x="360"
            y="268"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            一条边，一个邻面
          </text>
        </g>
        <g>
          <rect
            x="482"
            y="86"
            width="204"
            height="202"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="584"
            y="121"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            非流形边
          </text>
          <path
            d="M520 232 L584 142 L648 232 Z M520 232 L584 278 L648 232 Z M584 142 L584 278"
            fill={COLORS.warning}
            fillOpacity="0.12"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <line
            x1="584"
            y1="142"
            x2="584"
            y2="278"
            stroke={COLORS.accent}
            strokeWidth="6"
          />
          <text
            x="584"
            y="306"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            邻面数超出预期
          </text>
        </g>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          拓扑检查先数邻接关系，再解释渲染中的裂缝与法向
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp25AttributeDiagram() {
  return (
    <Figure>
      <SvgFrame label="网格属性图：几何位置、面法线与顶点法线代表不同的平滑语义">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          网格属性：位置相同，不代表着色语义相同
        </text>
        <rect
          x="34"
          y="88"
          width="196"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="132"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          位置
        </text>
        <MeshPatch originX={82} originY={150} size={100} density={2} />
        <text
          x="132"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          决定几何边界
        </text>
        <Arrow x1={250} y1={184} x2={290} y2={184} color={COLORS.accent} />
        <rect
          x="306"
          y="88"
          width="196"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="404"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          法线
        </text>
        <MeshPatch
          originX={354}
          originY={150}
          size={100}
          density={2}
          showNormals
        />
        <text
          x="404"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          决定光照方向
        </text>
        <Arrow x1={522} y1={184} x2={562} y2={184} color={COLORS.accent} />
        <rect
          x="578"
          y="88"
          width="108"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="632"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          LOD
        </text>
        <text
          x="632"
          y="166"
          textAnchor="middle"
          fontSize="17"
          fill={COLORS.warning}
        >
          高
        </text>
        <text
          x="632"
          y="204"
          textAnchor="middle"
          fontSize="17"
          fill={COLORS.success}
        >
          中
        </text>
        <text
          x="632"
          y="242"
          textAnchor="middle"
          fontSize="17"
          fill={COLORS.accent}
        >
          低
        </text>
        <text
          x="632"
          y="268"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          按距离选
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          属性通道要和它的几何、拓扑与平滑假设一起验收
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp25LodDiagram() {
  return (
    <Figure>
      <SvgFrame label="细节层级图：同一物体根据屏幕占用选择高、中、低分辨率网格">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          level of detail：屏幕贡献决定网格预算
        </text>
        <g>
          <rect
            x="34"
            y="86"
            width="204"
            height="202"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="136"
            y="121"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            近处 · 高
          </text>
          <MeshPatch originX={72} originY={148} size={128} density={6} />
          <text
            x="136"
            y="268"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            几何预算高，轮廓细
          </text>
        </g>
        <g>
          <rect
            x="258"
            y="86"
            width="204"
            height="202"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="121"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            中距 · 中
          </text>
          <MeshPatch originX={296} originY={148} size={128} density={4} />
          <text
            x="360"
            y="268"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            保持主要形状
          </text>
        </g>
        <g>
          <rect
            x="482"
            y="86"
            width="204"
            height="202"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="584"
            y="121"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.text}
          >
            远处 · 低
          </text>
          <MeshPatch originX={536} originY={148} size={96} density={2} />
          <text
            x="584"
            y="268"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            节省顶点与带宽
          </text>
        </g>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          LOD 不是随意删点：要保持轮廓、拓扑和属性的可接受误差
        </text>
      </SvgFrame>
    </Figure>
  );
}

function MeshLabScene({
  view,
  density,
  lod,
  showNormals,
  nonManifold,
}: {
  view: MeshView;
  density: number;
  lod: number;
  showNormals: boolean;
  nonManifold: boolean;
}) {
  return (
    <svg
      viewBox="0 0 720 330"
      role="img"
      aria-label="网格实验场景：观察线框、拓扑邻接和细节层级变化"
      className="block h-auto w-full"
    >
      <rect width="720" height="330" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {view === "wireframe"
          ? "wireframe mesh"
          : view === "topology"
            ? "topology inspection"
            : "LOD selection"}
        ：网格反馈
      </text>
      <rect
        x="40"
        y="54"
        width="500"
        height="200"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <MeshPatch
        originX={100}
        originY={78}
        size={150}
        density={view === "lod" ? 2 + lod : density}
        highlightEdge={view === "topology" || nonManifold}
        showNormals={showNormals}
      />
      <MeshPatch
        originX={306}
        originY={78}
        size={150}
        density={view === "lod" ? 2 + Math.max(1, lod - 1) : density}
        highlightEdge={view === "topology" && nonManifold}
        showNormals={showNormals}
      />
      {nonManifold ? (
        <path
          d="M456 78 L456 228 L496 178 Z"
          fill={COLORS.warning}
          fillOpacity="0.16"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
      ) : null}
      <rect
        x="568"
        y="54"
        width="122"
        height="200"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="629"
        y="88"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        检查项
      </text>
      <text
        x="629"
        y="126"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        面数 {density * density * 2}
      </text>
      <text
        x="629"
        y="158"
        textAnchor="middle"
        fontSize="13"
        fill={nonManifold ? COLORS.warning : COLORS.success}
      >
        {nonManifold ? "非流形：开启" : "流形：正常"}
      </text>
      <text
        x="629"
        y="190"
        textAnchor="middle"
        fontSize="13"
        fill={showNormals ? COLORS.warning : COLORS.secondary}
      >
        法线 {showNormals ? "显示" : "隐藏"}
      </text>
      <text
        x="629"
        y="222"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.accent}
      >
        LOD {lod}
      </text>
      <text
        x="360"
        y="282"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        先看连接关系，再看属性与细节层级；不要用最终填充掩盖拓扑错误
      </text>
      <text
        x="360"
        y="309"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        {view === "topology"
          ? "黄色边是当前拓扑检查的邻接边"
          : "只改变一个网格证据，再观察结果"}
      </text>
    </svg>
  );
}

export function Cgp25MeshesLab() {
  const [view, setView] = useState<MeshView>("wireframe");
  const [density, setDensity] = useState(4);
  const [lod, setLod] = useState(2);
  const [showNormals, setShowNormals] = useState(true);
  const [nonManifold, setNonManifold] = useState(false);

  function reset() {
    setView("wireframe");
    setDensity(4);
    setLod(2);
    setShowNormals(true);
    setNonManifold(false);
  }

  return (
    <section
      aria-label="网格专属实验"
      data-visual-kind="cgp-25-meshes"
      data-unit-id="cgp-25"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp25 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            网格专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            在同一个网格上切换线框、拓扑和 LOD
            视图；观察面数、邻接、法线和细节预算的关系。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置网格实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择网格视图">
        {(["wireframe", "topology", "lod"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={view === option}
            onClick={() => setView(option)}
            className={
              "min-h-11 rounded-control border px-3 py-2 text-sm " +
              (view === option
                ? "border-accent bg-accent/10 font-semibold text-primary"
                : "border-border text-secondary")
            }
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-3">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>网格密度</span>
            <span className="font-mono text-primary">{density}</span>
          </span>
          <input
            type="range"
            min="2"
            max="7"
            value={density}
            onChange={(event) => setDensity(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>LOD 层级</span>
            <span className="font-mono text-primary">{lod}</span>
          </span>
          <input
            type="range"
            min="1"
            max="4"
            value={lod}
            onChange={(event) => setLod(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-h-11 items-center gap-3 text-sm text-secondary">
          <input
            type="checkbox"
            checked={showNormals}
            onChange={(event) => setShowNormals(event.target.checked)}
            className="size-5 accent-accent"
          />
          <span>显示顶点法线</span>
        </label>
        <label className="flex min-h-11 items-center gap-3 text-sm text-secondary md:col-span-3">
          <input
            type="checkbox"
            checked={nonManifold}
            onChange={(event) => setNonManifold(event.target.checked)}
            className="size-5 accent-accent"
          />
          <span>注入非流形连接：观察邻接检查如何暴露异常</span>
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <MeshLabScene
          view={view}
          density={density}
          lod={lod}
          showNormals={showNormals}
          nonManifold={nonManifold}
        />
      </div>
      <div
        className="mt-4 rounded-card border border-border bg-background p-4"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-semibold text-primary">
          当前视图：{view} · 密度 {density} · LOD {lod} · 拓扑{" "}
          {nonManifold ? "异常" : "正常"}
        </p>
        <p className="mt-1 text-sm leading-6 text-secondary">
          先预测改变密度会影响面数还是拓扑语义，再只打开一个检查项；如果出现裂缝，先回到索引和邻接关系。
        </p>
      </div>
    </section>
  );
}
