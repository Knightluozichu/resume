/**
 * <Poeaa24Ch10DataSourceGradient>：数据源模式梯度图（POEAA 第10章概览）。
 *
 * 展示 4 个数据源模式从简单到复杂的梯度：
 *   Table Data Gateway → Row Data Gateway → Active Record → Data Mapper
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 420;

const PATTERNS = [
  {
    name: "Table Data Gateway",
    desc: "一个类管一张表的所有 SQL",
    detail: "find / insert / update / delete 全在 Gateway",
    color: "#3FB97F",
  },
  {
    name: "Row Data Gateway",
    desc: "一个对象 = 一行数据",
    detail: "对象持有字段 + save() 方法",
    color: "#E5B567",
  },
  {
    name: "Active Record",
    desc: "对象 = 行 + 业务逻辑",
    detail: "领域行为直接写在数据对象上",
    color: "#E5B567",
  },
  {
    name: "Data Mapper",
    desc: "对象与表完全解耦",
    detail: "Mapper 独立翻译，领域对象不知 DB 存在",
    color: T.accent,
  },
] as const;

export function Poeaa24Ch10DataSourceGradientDiagram() {
  const startX = 48;
  const boxW = 148;
  const boxH = 160;
  const gap = 12;
  const topY = 100;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据源模式梯度图，覆盖第10章 数据源架构模式。从左到右复杂度递增：Table Data Gateway 最简单，一个类管一张表；Row Data Gateway 一个对象对应一行；Active Record 在行对象上叠加业务逻辑；Data Mapper 最复杂但最灵活，对象与表完全解耦。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle
            x={VIEW_W / 2}
            y={40}
            text="数据源模式：从简单到复杂的梯度"
          />

          {/* 复杂度箭头 */}
          <defs>
            <marker
              id="ch10-ax"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 z" fill={T.secondary} />
            </marker>
          </defs>
          <line
            x1={startX}
            y1={72}
            x2={startX + 4 * boxW + 3 * gap}
            y2={72}
            stroke={T.secondary}
            strokeWidth="1.2"
            markerEnd="url(#ch10-ax)"
          />
          <text
            x={startX + (4 * boxW + 3 * gap) / 2}
            y={64}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            复杂度 / 灵活度递增 →
          </text>

          {/* 四个模式盒子 */}
          {PATTERNS.map((p, i) => {
            const x = startX + i * (boxW + gap);
            return (
              <g key={p.name}>
                <rect
                  x={x}
                  y={topY}
                  width={boxW}
                  height={boxH}
                  rx="8"
                  fill={p.color}
                  fillOpacity="0.06"
                  stroke={p.color}
                  strokeWidth="1.5"
                />
                {/* 标题栏 */}
                <rect
                  x={x}
                  y={topY}
                  width={boxW}
                  height={28}
                  rx="8"
                  fill={p.color}
                  fillOpacity="0.12"
                />
                <rect
                  x={x}
                  y={topY + 20}
                  width={boxW}
                  height={8}
                  fill={p.color}
                  fillOpacity="0.12"
                />
                <text
                  x={x + boxW / 2}
                  y={topY + 19}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={p.color}
                >
                  {p.name}
                </text>
                {/* 描述 */}
                <text x={x + 10} y={topY + 52} fontSize="11" fill={T.primary}>
                  {p.desc}
                </text>
                <text x={x + 10} y={topY + 72} fontSize="11" fill={T.secondary}>
                  {p.detail}
                </text>
                {/* 序号 */}
                <text
                  x={x + boxW / 2}
                  y={topY + boxH - 16}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="700"
                  fill={p.color}
                  fillOpacity="0.3"
                >
                  {i + 1}
                </text>
                {/* 连接箭头 */}
                {i < 3 && (
                  <line
                    x1={x + boxW}
                    y1={topY + boxH / 2}
                    x2={x + boxW + gap}
                    y2={topY + boxH / 2}
                    stroke={T.secondary}
                    strokeWidth="1.2"
                    markerEnd="url(#ch10-ax)"
                  />
                )}
              </g>
            );
          })}

          {/* 下方选择指引 */}
          <line
            x1={startX}
            y1={topY + boxH + 24}
            x2={startX + 4 * boxW + 3 * gap}
            y2={topY + boxH + 24}
            stroke={T.border}
            strokeWidth="0.8"
          />
          <text x={startX} y={topY + boxH + 48} fontSize="11" fill="#3FB97F">
            ← 简单 CRUD、脚本式应用
          </text>
          <text
            x={startX + 4 * boxW + 3 * gap}
            y={topY + boxH + 48}
            textAnchor="end"
            fontSize="11"
            fill={T.accent}
          >
            复杂领域、需要测试隔离 →
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="选择依据：领域逻辑是否需要与持久化解耦？需要 → Data Mapper；不需要 → 越左越简单"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据源模式族包含四个模式，按复杂度递增排列。简单应用从 Table Data
        Gateway 起步， 领域逻辑复杂时迁移到 Data
        Mapper，让领域对象完全不知道数据库的存在。
      </figcaption>
    </figure>
  );
}
