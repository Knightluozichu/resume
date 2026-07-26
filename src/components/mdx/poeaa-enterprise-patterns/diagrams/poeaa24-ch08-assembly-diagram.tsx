/**
 * <Poeaa24Ch08AssemblyDiagram>：全景组装图（POEAA 第8章）。
 *
 * 展示一个请求从浏览器到数据库经过的所有模式层：
 *   MVC → Service Layer → Domain Model → Data Mapper → DB
 * 每层标注对应的 POEAA 模式名。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 480;

const LAYER_X = 120;
const LAYER_W = 480;
const LAYER_H = 56;
const GAP = 12;
const START_Y = 72;

const LAYERS = [
  { label: "浏览器 / 客户端", pattern: "HTTP 请求", color: T.secondary },
  { label: "Front Controller", pattern: "MVC · 路由分发", color: T.accent },
  { label: "Service Layer", pattern: "应用服务 · 事务边界", color: "#3FB97F" },
  { label: "Domain Model", pattern: "业务规则 · 领域对象", color: "#3FB97F" },
  { label: "Unit of Work + Identity Map", pattern: "变更跟踪 · 缓存", color: "#E5B567" },
  { label: "Data Mapper", pattern: "对象 ↔ 行 映射", color: "#E5B567" },
  { label: "数据库", pattern: "SQL · 事务提交", color: T.secondary },
] as const;

export function Poeaa24Ch08AssemblyDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全景组装图。一个请求从浏览器出发，经 Front Controller 路由分发，到 Service Layer 处理应用逻辑和事务边界，调用 Domain Model 执行业务规则，通过 Unit of Work 跟踪变更、Identity Map 缓存已读对象，最终由 Data Mapper 把对象映射为数据库行并执行 SQL。每层标注了对应的 POEAA 模式名。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={40} text="全景组装：一个请求经过的所有模式" />

          {/* 层 */}
          {LAYERS.map((layer, i) => {
            const ly = START_Y + i * (LAYER_H + GAP);
            return (
              <g key={layer.label}>
                <rect
                  x={LAYER_X}
                  y={ly}
                  width={LAYER_W}
                  height={LAYER_H}
                  rx="8"
                  fill={layer.color}
                  fillOpacity="0.06"
                  stroke={layer.color}
                  strokeWidth="1.5"
                />
                <text
                  x={LAYER_X + 20}
                  y={ly + 24}
                  fontSize="13"
                  fontWeight="700"
                  fill={layer.color}
                  fontFamily="monospace"
                >
                  {layer.label}
                </text>
                <text
                  x={LAYER_X + 20}
                  y={ly + 44}
                  fontSize="11"
                  fill={T.secondary}
                >
                  {layer.pattern}
                </text>
                {/* 连接箭头 */}
                {i < LAYERS.length - 1 && (
                  <line
                    x1={LAYER_X + LAYER_W / 2}
                    y1={ly + LAYER_H}
                    x2={LAYER_X + LAYER_W / 2}
                    y2={ly + LAYER_H + GAP}
                    stroke={T.secondary}
                    strokeWidth="1.2"
                  />
                )}
              </g>
            );
          })}

          {/* 右侧分层标注 */}
          <text x={LAYER_X + LAYER_W + 16} y={START_Y + 28} fontSize="11" fill={T.accent}>表示层</text>
          <text x={LAYER_X + LAYER_W + 16} y={START_Y + 2 * (LAYER_H + GAP) + 28} fontSize="11" fill="#3FB97F">领域层</text>
          <text x={LAYER_X + LAYER_W + 16} y={START_Y + 5 * (LAYER_H + GAP) + 28} fontSize="11" fill="#E5B567">数据源层</text>

          {/* 左侧请求/响应标注 */}
          <defs>
            <marker id="ch08-down" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 z" fill={T.accent} />
            </marker>
            <marker id="ch08-up" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 z" fill={T.secondary} />
            </marker>
          </defs>
          <line
            x1={LAYER_X - 24}
            y1={START_Y}
            x2={LAYER_X - 24}
            y2={START_Y + 6 * (LAYER_H + GAP) + LAYER_H}
            stroke={T.accent}
            strokeWidth="1.5"
            markerEnd="url(#ch08-down)"
          />
          <text x={LAYER_X - 36} y={START_Y + 3 * (LAYER_H + GAP)} fontSize="11" fill={T.accent} textAnchor="middle" writingMode="vertical-rl">请求下行</text>

          <line
            x1={LAYER_X - 48}
            y1={START_Y + 6 * (LAYER_H + GAP) + LAYER_H}
            x2={LAYER_X - 48}
            y2={START_Y}
            stroke={T.secondary}
            strokeWidth="1.2"
            strokeDasharray="4 3"
            markerEnd="url(#ch08-up)"
          />
          <text x={LAYER_X - 60} y={START_Y + 3 * (LAYER_H + GAP)} fontSize="11" fill={T.secondary} textAnchor="middle" writingMode="vertical-rl">响应上行</text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="每层只认识相邻层——模式是层间的连接件，不是孤立的技巧" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一个请求从浏览器到数据库，依次经过 Front Controller、Service Layer、Domain Model、
        Unit of Work、Data Mapper。每个模式解决层间的一个具体问题，组合起来构成完整架构。
      </figcaption>
    </figure>
  );
}
