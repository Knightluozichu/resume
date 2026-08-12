"use client";

import { useMemo, useState, type ReactNode } from "react";

type SpatialMode = "bounding volume hierarchy" | "grid" | "debug";

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

function Frame({ children, label }: { children: ReactNode; label: string }) {
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
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "8 6" : undefined}
      />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function Cgp37SpatialPipelineDiagram() {
  return (
    <Figure>
      <Frame label="空间数据结构查询流程：对象进入结构，范围查询产出候选集，再执行精确相交测试">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          spatial data structures：把全量扫描变成候选集查询
        </text>
        <rect
          x="30"
          y="92"
          width="158"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="109"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          场景对象
        </text>
        <text
          x="109"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          bounds / id
        </text>
        <text
          x="109"
          y="207"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          插入 · 更新
        </text>
        <text
          x="109"
          y="245"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          对象数量 N
        </text>
        <Arrow x1={204} y1={188} x2={242} y2={188} color={COLORS.accent} />
        <rect
          x="254"
          y="92"
          width="184"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="346"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          空间索引
        </text>
        <text
          x="346"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          BVH / grid
        </text>
        <text
          x="346"
          y="207"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          包围体 · 桶 · 层级
        </text>
        <text
          x="346"
          y="245"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          跳过不相关区域
        </text>
        <Arrow x1={454} y1={188} x2={492} y2={188} color={COLORS.success} />
        <rect
          x="504"
          y="92"
          width="184"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="596"
          y="128"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          查询与验证
        </text>
        <text
          x="596"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          candidate set
        </text>
        <text
          x="596"
          y="207"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          broad phase
        </text>
        <text
          x="596"
          y="245"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          exact intersection
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          索引只能保守地减少候选，最终答案仍需精确几何测试
        </text>
      </Frame>
    </Figure>
  );
}

export function Cgp37BvhDiagram() {
  return (
    <Figure>
      <Frame label="包围体层次结构图：父节点包围两个子节点，查询窗口只遍历相交分支">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          bounding volume hierarchy：用层次包围体剪枝
        </text>
        <rect
          x="48"
          y="72"
          width="624"
          height="242"
          rx="18"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <rect
          x="88"
          y="102"
          width="544"
          height="174"
          rx="14"
          fill={COLORS.accent}
          fillOpacity="0.06"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <text
          x="360"
          y="94"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          root AABB
        </text>
        <rect
          x="112"
          y="130"
          width="238"
          height="118"
          rx="12"
          fill={COLORS.success}
          fillOpacity="0.08"
          stroke={COLORS.success}
          strokeWidth="3"
        />
        <text
          x="231"
          y="151"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          left child
        </text>
        <rect
          x="370"
          y="130"
          width="238"
          height="118"
          rx="12"
          fill={COLORS.warning}
          fillOpacity="0.07"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="489"
          y="151"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          right child
        </text>
        <rect
          x="132"
          y="176"
          width="58"
          height="40"
          rx="8"
          fill={COLORS.success}
          fillOpacity="0.23"
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <rect
          x="208"
          y="176"
          width="58"
          height="40"
          rx="8"
          fill={COLORS.success}
          fillOpacity="0.23"
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <rect
          x="294"
          y="176"
          width="34"
          height="40"
          rx="8"
          fill={COLORS.success}
          fillOpacity="0.23"
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <rect
          x="392"
          y="176"
          width="58"
          height="40"
          rx="8"
          fill={COLORS.warning}
          fillOpacity="0.22"
          stroke={COLORS.warning}
          strokeWidth="2"
        />
        <rect
          x="476"
          y="176"
          width="58"
          height="40"
          rx="8"
          fill={COLORS.warning}
          fillOpacity="0.22"
          stroke={COLORS.warning}
          strokeWidth="2"
        />
        <rect
          x="552"
          y="176"
          width="34"
          height="40"
          rx="8"
          fill={COLORS.warning}
          fillOpacity="0.22"
          stroke={COLORS.warning}
          strokeWidth="2"
        />
        <rect
          x="280"
          y="190"
          width="164"
          height="72"
          rx="12"
          fill={COLORS.bg}
          fillOpacity="0.94"
          stroke={COLORS.text}
          strokeWidth="3"
          strokeDasharray="8 5"
        />
        <text
          x="362"
          y="218"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.text}
        >
          query window
        </text>
        <text
          x="362"
          y="242"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          只走相交节点
        </text>
        <Arrow x1={360} y1={348} x2={360} y2={274} color={COLORS.success} />
        <text
          x="360"
          y="370"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          父节点不相交 → 整棵子树跳过；相交 → 递归到叶子再做精确测试
        </text>
      </Frame>
    </Figure>
  );
}

export function Cgp37GridDiagram() {
  return (
    <Figure>
      <Frame label="网格结构图：对象放入覆盖到的网格桶，查询窗口读取相邻桶并去重候选对象">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          grid：把空间切成桶，再从邻近桶取候选
        </text>
        <rect
          x="56"
          y="70"
          width="420"
          height="250"
          rx="14"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <line
            key={`v-${index}`}
            x1={98 + index * 76}
            y1="86"
            x2={98 + index * 76}
            y2="304"
            stroke={COLORS.border}
            strokeWidth="2"
          />
        ))}
        {[0, 1, 2].map((index) => (
          <line
            key={`h-${index}`}
            x1="72"
            y1={142 + index * 72}
            x2="460"
            y2={142 + index * 72}
            stroke={COLORS.border}
            strokeWidth="2"
          />
        ))}
        <rect
          x="176"
          y="132"
          width="155"
          height="110"
          rx="10"
          fill={COLORS.accent}
          fillOpacity="0.10"
          stroke={COLORS.accent}
          strokeWidth="3"
          strokeDasharray="8 5"
        />
        <text
          x="253"
          y="182"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.accent}
        >
          query window
        </text>
        <text
          x="253"
          y="207"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          读取覆盖桶
        </text>
        <rect
          x="114"
          y="108"
          width="42"
          height="28"
          rx="7"
          fill={COLORS.success}
          fillOpacity="0.25"
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="135"
          y="127"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.success}
        >
          A
        </text>
        <rect
          x="288"
          y="224"
          width="58"
          height="42"
          rx="7"
          fill={COLORS.warning}
          fillOpacity="0.24"
          stroke={COLORS.warning}
          strokeWidth="2"
        />
        <text
          x="317"
          y="250"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.warning}
        >
          B spans
        </text>
        <rect
          x="380"
          y="150"
          width="46"
          height="32"
          rx="7"
          fill={COLORS.success}
          fillOpacity="0.25"
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="403"
          y="171"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.success}
        >
          C
        </text>
        <Arrow x1={510} y1={142} x2={548} y2={142} color={COLORS.accent} />
        <rect
          x="562"
          y="86"
          width="128"
          height="222"
          rx="14"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <text
          x="626"
          y="120"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.text}
        >
          bucket list
        </text>
        <text
          x="626"
          y="162"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          A · C
        </text>
        <text
          x="626"
          y="192"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          B · B · B
        </text>
        <text
          x="626"
          y="234"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          候选对象
        </text>
        <text
          x="626"
          y="264"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.warning}
        >
          去重后再精测
        </text>
        <text
          x="360"
          y="352"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          cell size 影响候选数量；跨桶对象会产生重复引用，不能直接重复计算
        </text>
      </Frame>
    </Figure>
  );
}

export function Cgp37QueryCostDiagram() {
  return (
    <Figure>
      <Frame label="查询策略对照图：暴力扫描、包围体层次结构和网格结构在候选数量与更新代价上的差异">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          query cost：候选更少不等于维护成本更低
        </text>
        <text
          x="70"
          y="82"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          策略
        </text>
        <text
          x="250"
          y="82"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          候选来源
        </text>
        <text
          x="470"
          y="82"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          更新 / 边界风险
        </text>
        {[
          {
            y: 110,
            name: "全量扫描",
            source: "N 个对象",
            note: "无索引；正确但慢",
            color: COLORS.warning,
          },
          {
            y: 174,
            name: "BVH",
            source: "相交节点叶子",
            note: "层级更新；保守包围",
            color: COLORS.success,
          },
          {
            y: 238,
            name: "grid",
            source: "覆盖桶并去重",
            note: "桶维护；cell size 敏感",
            color: COLORS.accent,
          },
        ].map((row) => (
          <g key={row.name}>
            <rect
              x="54"
              y={row.y - 22}
              width="618"
              height="48"
              rx="10"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <circle cx="78" cy={row.y + 2} r="8" fill={row.color} />
            <text
              x="98"
              y={row.y + 7}
              fontSize="14"
              fontWeight="700"
              fill={COLORS.text}
            >
              {row.name}
            </text>
            <text x="250" y={row.y + 7} fontSize="13" fill={row.color}>
              {row.source}
            </text>
            <text x="470" y={row.y + 7} fontSize="13" fill={COLORS.secondary}>
              {row.note}
            </text>
          </g>
        ))}
        <path d="M56 310 H665" stroke={COLORS.border} strokeWidth="2" />
        <text
          x="360"
          y="345"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          先定义查询语义与正确性，再用候选计数、精确测试和更新频率评估结构
        </text>
      </Frame>
    </Figure>
  );
}

type SceneObject = { id: number; x: number; y: number; w: number; h: number };

const SCENE_OBJECTS: SceneObject[] = Array.from({ length: 48 }, (_, index) => ({
  id: index + 1,
  x: 42 + ((index * 83) % 580),
  y: 76 + ((index * 47) % 196),
  w: 18 + ((index * 11) % 34),
  h: 15 + ((index * 7) % 28),
}));

function intersects(
  object: SceneObject,
  query: { x: number; y: number; r: number },
  padding = 0,
) {
  return (
    object.x < query.x + query.r + padding &&
    object.x + object.w > query.x - query.r - padding &&
    object.y < query.y + query.r + padding &&
    object.y + object.h > query.y - query.r - padding
  );
}

function SpatialScene({
  mode,
  objectCount,
  granularity,
  radius,
}: {
  mode: SpatialMode;
  objectCount: number;
  granularity: number;
  radius: number;
}) {
  const objects = SCENE_OBJECTS.slice(0, objectCount);
  const query = { x: 360, y: 178, r: radius };
  const exactObjects = objects.filter((object) => intersects(object, query));
  const broadPadding =
    mode === "bounding volume hierarchy" ? 10 + granularity * 5 : 0;
  const bvhCandidates = objects.filter((object) =>
    intersects(object, query, broadPadding),
  );
  const cellSize = 22 + granularity * 10;
  const minCellX = Math.floor((query.x - query.r) / cellSize);
  const maxCellX = Math.floor((query.x + query.r) / cellSize);
  const minCellY = Math.floor((query.y - query.r) / cellSize);
  const maxCellY = Math.floor((query.y + query.r) / cellSize);
  const gridRefs = objects.flatMap((object) => {
    const firstX = Math.floor(object.x / cellSize);
    const lastX = Math.floor((object.x + object.w) / cellSize);
    const firstY = Math.floor(object.y / cellSize);
    const lastY = Math.floor((object.y + object.h) / cellSize);
    const references: number[] = [];
    for (let cellX = firstX; cellX <= lastX; cellX += 1) {
      for (let cellY = firstY; cellY <= lastY; cellY += 1) {
        if (
          cellX >= minCellX &&
          cellX <= maxCellX &&
          cellY >= minCellY &&
          cellY <= maxCellY
        ) {
          references.push(object.id);
        }
      }
    }
    return references;
  });
  const gridCandidates = objects.filter((object) =>
    gridRefs.includes(object.id),
  );
  const candidates =
    mode === "bounding volume hierarchy"
      ? bvhCandidates
      : mode === "grid"
        ? gridCandidates
        : objects;
  const candidateIds = new Set(candidates.map((object) => object.id));
  const exactTests = candidates.filter((object) =>
    intersects(object, query),
  ).length;
  const refs = mode === "grid" ? gridRefs.length : candidates.length;
  const duplicateRefs = Math.max(0, refs - candidateIds.size);
  const rejected = Math.max(0, candidates.length - exactTests);
  const candidateColor = mode === "debug" ? COLORS.secondary : COLORS.accent;

  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label="空间数据结构交互实验：对象、查询窗口、候选集和精确相交测试"
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode === "bounding volume hierarchy"
          ? "BVH：递归剪枝后检查叶子"
          : mode === "grid"
            ? "grid：读取邻桶并去重"
            : "debug：对照全量扫描"}
      </text>
      <rect
        x="30"
        y="52"
        width="500"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d="M30 127 H530 M30 202 H530 M155 52 V322 M280 52 V322 M405 52 V322"
        stroke={COLORS.border}
        strokeWidth="1.5"
      />
      {objects.map((object) => {
        const isCandidate = candidateIds.has(object.id);
        const isExact = exactObjects.some(
          (candidate) => candidate.id === object.id,
        );
        return (
          <rect
            key={object.id}
            x={object.x}
            y={object.y}
            width={object.w}
            height={object.h}
            rx="5"
            fill={
              isExact
                ? COLORS.success
                : isCandidate
                  ? candidateColor
                  : COLORS.secondary
            }
            fillOpacity={isExact ? "0.38" : isCandidate ? "0.20" : "0.10"}
            stroke={
              isExact
                ? COLORS.success
                : isCandidate
                  ? candidateColor
                  : COLORS.border
            }
            strokeWidth={isExact ? "2.5" : "1.5"}
          />
        );
      })}
      <rect
        x={query.x - query.r}
        y={query.y - query.r}
        width={query.r * 2}
        height={query.r * 2}
        rx="12"
        fill={COLORS.warning}
        fillOpacity="0.08"
        stroke={COLORS.warning}
        strokeWidth="3"
        strokeDasharray="9 6"
      />
      <text
        x={query.x}
        y={query.y + 5}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.warning}
      >
        query
      </text>
      {mode === "grid" && (
        <path
          d={`M${minCellX * cellSize} 52 V322 M${(maxCellX + 1) * cellSize} 52 V322`}
          stroke={COLORS.accent}
          strokeWidth="2"
          strokeDasharray="6 5"
        />
      )}
      <rect
        x="548"
        y="52"
        width="142"
        height="270"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="619"
        y="82"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        查询记录
      </text>
      <text x="568" y="122" fontSize="13" fill={COLORS.secondary}>
        对象总数
      </text>
      <text
        x="670"
        y="122"
        textAnchor="end"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {objects.length}
      </text>
      <text x="568" y="158" fontSize="13" fill={COLORS.secondary}>
        候选数
      </text>
      <text
        x="670"
        y="158"
        textAnchor="end"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.accent}
      >
        {candidates.length}
      </text>
      <text x="568" y="194" fontSize="13" fill={COLORS.secondary}>
        精确测试
      </text>
      <text
        x="670"
        y="194"
        textAnchor="end"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.success}
      >
        {exactTests}
      </text>
      <text x="568" y="230" fontSize="13" fill={COLORS.secondary}>
        被拒绝
      </text>
      <text
        x="670"
        y="230"
        textAnchor="end"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.warning}
      >
        {rejected}
      </text>
      <text x="568" y="266" fontSize="13" fill={COLORS.secondary}>
        重复引用
      </text>
      <text
        x="670"
        y="266"
        textAnchor="end"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.warning}
      >
        {duplicateRefs}
      </text>
      <text
        x="360"
        y="350"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        绿色 = 精确命中 · 紫色 = 候选 · 灰色 = 被索引剪枝；候选仍须做 exact
        intersection
      </text>
    </svg>
  );
}

export function Cgp37SpatialDataStructuresLab() {
  const [mode, setMode] = useState<SpatialMode>("bounding volume hierarchy");
  const [objectCount, setObjectCount] = useState(28);
  const [granularity, setGranularity] = useState(4);
  const [radius, setRadius] = useState(58);
  const metrics = useMemo(() => {
    const objects = SCENE_OBJECTS.slice(0, objectCount);
    const query = { x: 360, y: 178, r: radius };
    const exact = objects.filter((object) => intersects(object, query)).length;
    const candidateEstimate =
      mode === "debug"
        ? objectCount
        : mode === "bounding volume hierarchy"
          ? Math.min(objectCount, exact + 4 + granularity * 2)
          : Math.min(objectCount, exact + 6 + granularity * 3);
    return {
      exact,
      candidateEstimate,
      saved: Math.max(0, objectCount - candidateEstimate),
    };
  }, [mode, objectCount, granularity, radius]);

  function reset() {
    setMode("bounding volume hierarchy");
    setObjectCount(28);
    setGranularity(4);
    setRadius(58);
  }

  return (
    <Figure>
      <div
        className="mb-3 flex flex-wrap items-center gap-2"
        aria-label="空间数据结构实验模式"
      >
        {(["bounding volume hierarchy", "grid", "debug"] as SpatialMode[]).map(
          (nextMode) => (
            <button
              key={nextMode}
              type="button"
              aria-pressed={mode === nextMode}
              onClick={() => setMode(nextMode)}
              className="min-h-11 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary transition hover:border-accent"
            >
              {nextMode === "bounding volume hierarchy"
                ? "BVH"
                : nextMode === "grid"
                  ? "grid"
                  : "全量扫描"}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-lg border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent"
        >
          重置实验
        </button>
      </div>
      <div className="mb-4 grid gap-3 rounded-lg border border-border bg-surface p-3 text-sm sm:grid-cols-3">
        <label className="grid gap-1 text-secondary">
          对象数量：{objectCount}
          <input
            type="range"
            min="8"
            max="48"
            step="4"
            value={objectCount}
            onChange={(event) => setObjectCount(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="grid gap-1 text-secondary">
          叶子 / cell 尺度：{granularity}
          <input
            type="range"
            min="2"
            max="8"
            step="1"
            value={granularity}
            onChange={(event) => setGranularity(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="grid gap-1 text-secondary">
          查询半径：{radius}
          <input
            type="range"
            min="24"
            max="100"
            step="4"
            value={radius}
            onChange={(event) => setRadius(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <SpatialScene
        mode={mode}
        objectCount={objectCount}
        granularity={granularity}
        radius={radius}
      />
      <div
        className="mt-3 grid gap-2 text-sm text-secondary sm:grid-cols-3"
        aria-live="polite"
      >
        <span>候选估计：{metrics.candidateEstimate}</span>
        <span>精确命中：{metrics.exact}</span>
        <span>跳过对象：{metrics.saved}</span>
      </div>
    </Figure>
  );
}
