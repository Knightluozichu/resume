/**
 * <Poeaa24Ch01LayerStackDiagram>：企业应用三层架构图（POEAA 第1章）。
 *
 * 展示表示层 / 领域层 / 数据源层的垂直分层：
 *   - 请求箭头从上到下穿越各层
 *   - 每层标注职责和典型模式
 *   - 右侧标注依赖方向规则（上层依赖下层，禁止反向）
 *
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色。遵守 docs/diagram-layout-rules.md。
 *
 * 概念：第1章 分层、1.1 企业应用中层次的演化、1.2 三个基本层次、1.3 为各层选择运行环境
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 440;

const LAYER_X = 48;
const LAYER_W = 420;
const LAYER_H = 88;
const LAYER_GAP = 20;
const LAYER_Y_START = 72;

const LAYERS = [
  {
    label: "表示层",
    en: "Presentation Layer",
    color: T.accent,
    duty: "处理用户交互、展示数据、解析输入",
    patterns: "MVC · Page Controller · Front Controller · Template View",
  },
  {
    label: "领域层",
    en: "Domain Layer",
    color: "#3FB97F",
    duty: "封装业务规则、协调领域对象、维护不变量",
    patterns: "Transaction Script · Domain Model · Service Layer",
  },
  {
    label: "数据源层",
    en: "Data Source Layer",
    color: "#E5B567",
    duty: "与数据库/外部系统通信、持久化、查询",
    patterns: "Data Mapper · Active Record · Table Data Gateway",
  },
] as const;

export function Poeaa24Ch01LayerStackDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="引言的企业应用三层架构图，覆盖 0.1 架构、0.2 企业应用、0.3 企业应用的种类、0.4 关于性能的考虑与 0.5 模式。从上到下依次为表示层、领域层、数据源层。请求从用户进入表示层，经领域层处理业务规则，最终到达数据源层与数据库交互。依赖方向规则：上层依赖下层，禁止反向依赖。图示覆盖架构、企业应用、应用种类、性能预算与模式选择的共同语境，每层标注了职责和对应的 POEAA 模式。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={40} text="企业应用三层架构" />

          {/* 层 */}
          {LAYERS.map((layer, i) => {
            const ly = LAYER_Y_START + i * (LAYER_H + LAYER_GAP);
            return (
              <g key={layer.label}>
                {/* 层背景 */}
                <rect
                  x={LAYER_X}
                  y={ly}
                  width={LAYER_W}
                  height={LAYER_H}
                  rx="10"
                  fill={layer.color}
                  fillOpacity="0.06"
                  stroke={layer.color}
                  strokeWidth="1.8"
                />
                {/* 层标题 */}
                <text
                  x={LAYER_X + 20}
                  y={ly + 24}
                  fontSize="14"
                  fontWeight="700"
                  fill={layer.color}
                >
                  {layer.label}
                  <tspan fontSize="11" fill={T.secondary} fontWeight="400">
                    {" "}
                    ({layer.en})
                  </tspan>
                </text>
                {/* 职责 */}
                <text
                  x={LAYER_X + 20}
                  y={ly + 46}
                  fontSize="12"
                  fill={T.primary}
                >
                  {layer.duty}
                </text>
                {/* 模式标签 */}
                <text
                  x={LAYER_X + 20}
                  y={ly + 68}
                  fontSize="11"
                  fill={T.secondary}
                  fontFamily="monospace"
                >
                  {layer.patterns}
                </text>
              </g>
            );
          })}

          {/* 请求箭头（从上到下穿越） */}
          <defs>
            <marker
              id="ch01-req-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={T.accent} />
            </marker>
            <marker
              id="ch01-res-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={T.secondary} />
            </marker>
          </defs>

          {/* 请求下行箭头 */}
          <line
            x1={LAYER_X + LAYER_W / 2 - 20}
            y1={LAYER_Y_START - 8}
            x2={LAYER_X + LAYER_W / 2 - 20}
            y2={LAYER_Y_START + 3 * LAYER_H + 2 * LAYER_GAP + 8}
            stroke={T.accent}
            strokeWidth="2"
            markerEnd="url(#ch01-req-arrow)"
          />
          <text
            x={LAYER_X + LAYER_W / 2 - 32}
            y={LAYER_Y_START + 1.5 * (LAYER_H + LAYER_GAP)}
            fontSize="11"
            fontWeight="600"
            fill={T.accent}
            textAnchor="end"
          >
            请求 ↓
          </text>

          {/* 响应上行箭头 */}
          <line
            x1={LAYER_X + LAYER_W / 2 + 20}
            y1={LAYER_Y_START + 3 * LAYER_H + 2 * LAYER_GAP + 8}
            x2={LAYER_X + LAYER_W / 2 + 20}
            y2={LAYER_Y_START - 8}
            stroke={T.secondary}
            strokeWidth="1.5"
            strokeDasharray="5 3"
            markerEnd="url(#ch01-res-arrow)"
          />
          <text
            x={LAYER_X + LAYER_W / 2 + 32}
            y={LAYER_Y_START + 1.5 * (LAYER_H + LAYER_GAP)}
            fontSize="11"
            fill={T.secondary}
          >
            响应 ↑
          </text>

          {/* 右侧依赖方向规则 */}
          <rect
            x={508}
            y={LAYER_Y_START + 20}
            width={180}
            height={200}
            rx="8"
            fill={T.elevated}
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={598}
            y={LAYER_Y_START + 44}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            依赖方向规则
          </text>
          <line
            x1={508}
            y1={LAYER_Y_START + 56}
            x2={688}
            y2={LAYER_Y_START + 56}
            stroke={T.border}
            strokeWidth="1"
          />
          <text x={520} y={LAYER_Y_START + 78} fontSize="11" fill={T.primary}>
            ✓ 上层依赖下层
          </text>
          <text x={520} y={LAYER_Y_START + 100} fontSize="11" fill={T.primary}>
            ✓ 下层不知道上层存在
          </text>
          <text x={520} y={LAYER_Y_START + 122} fontSize="11" fill={T.danger}>
            ✗ 禁止反向依赖
          </text>
          <text
            x={520}
            y={LAYER_Y_START + 148}
            fontSize="11"
            fill={T.secondary}
          >
            跨层调用 = 边界泄漏
          </text>
          <text
            x={520}
            y={LAYER_Y_START + 170}
            fontSize="11"
            fill={T.secondary}
          >
            层间通过接口解耦
          </text>
          <text
            x={520}
            y={LAYER_Y_START + 192}
            fontSize="11"
            fill={T.secondary}
          >
            （Separated Interface）
          </text>

          {/* 底部总结 */}
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            text="分层的价值：每层可独立替换、独立测试、独立部署——代价是层间间接性和性能开销"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        企业应用经典三层：表示层处理交互，领域层封装业务规则，数据源层负责持久化。
        依赖方向严格向下，上层通过接口调用下层，下层对上层一无所知。
      </figcaption>
    </figure>
  );
}
