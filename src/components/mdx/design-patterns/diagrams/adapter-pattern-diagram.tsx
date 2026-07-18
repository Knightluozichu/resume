/**
 * <AdapterPatternDiagram>：适配器模式结构图（design-patterns 课程）。
 *
 * 展示适配器模式的核心结构：
 *   - 左侧 Client 类（期望调用 target.request()）
 *   - 中间上方 Target 接口（虚线边框、斜体类名、«interface»），声明 request()
 *   - 中间下方 Adapter 类（实现 Target 接口，内部持有 Adaptee 引用，
 *     request() 内部调用 adaptee.specificRequest()）
 *   - 右侧 Adaptee 类（有 specificRequest() 方法，接口不兼容）
 *   - 箭头：Client→Target（依赖，虚线开放箭头）；Adapter→Target（实现，虚线空心三角）；
 *     Adapter→Adaptee（持有，实线实心箭头）
 *   - 底部文字：「适配器：让不兼容的接口协同工作」
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×400（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 400;

// Client 框（左侧）
const CLIENT = { x: 36, y: 76, w: 144, h: 80 };
// Target 接口框（中间上方）
const TARGET = { x: 280, y: 76, w: 160, h: 80 };
// Adapter 框（中间下方）
const ADAPTER = { x: 280, y: 192, w: 160, h: 104 };
// Adaptee 框（右侧）
const ADAPTEE = { x: 520, y: 200, w: 160, h: 84 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const warning = "var(--warning)";

export function AdapterPatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="适配器模式结构图。左侧是 Client 类，期望调用 target.request()。中间上方是 Target 接口（虚线边框、斜体），声明 request() 方法。中间下方是 Adapter 类，实现了 Target 接口，内部持有 Adaptee 引用，其 request() 方法内部调用 adaptee.specificRequest()。右侧是 Adaptee 类，有 specificRequest() 方法，但接口与 Target 不兼容。虚线开放箭头从 Client 指向 Target 表示依赖关系；虚线空心三角箭头从 Adapter 指向 Target 表示实现关系；实线实心箭头从 Adapter 指向 Adaptee 表示持有关系。底部说明：适配器让不兼容的接口协同工作。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 依赖关系：开放箭头（V形），UML dependency */}
            <marker
              id="adapter-dep-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path
                d="M0 0 L9 5 L0 10"
                fill="none"
                stroke={secondary}
                strokeWidth="1.5"
              />
            </marker>
            {/* 实现关系：空心三角箭头（指向接口），UML realization */}
            <marker
              id="adapter-impl-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="11"
              refY="6"
              orient="auto"
            >
              <path
                d="M1 1 L11 6 L1 11 z"
                fill={elevated}
                stroke={accent}
                strokeWidth="1"
              />
            </marker>
            {/* 持有 / 关联：实心三角箭头（指向被持有者） */}
            <marker
              id="adapter-holds-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="40"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            适配器模式 · 结构
          </text>

          {/* ===== Client 框（左侧） ===== */}
          <g>
            <rect
              x={CLIENT.x}
              y={CLIENT.y}
              width={CLIENT.w}
              height={CLIENT.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CLIENT.x + CLIENT.w / 2}
              y={CLIENT.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Client
            </text>
            <line
              x1={CLIENT.x}
              y1={CLIENT.y + 34}
              x2={CLIENT.x + CLIENT.w}
              y2={CLIENT.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CLIENT.x + 12}
              y={CLIENT.y + 54}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 通过 Target 接口"}
            </text>
            <text
              x={CLIENT.x + 12}
              y={CLIENT.y + 72}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 调用 request()"}
            </text>
          </g>

          {/* ===== Target 接口框（中间上方） ===== */}
          <g>
            <rect
              x={TARGET.x}
              y={TARGET.y}
              width={TARGET.w}
              height={TARGET.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={TARGET.x + TARGET.w / 2}
              y={TARGET.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={TARGET.x + TARGET.w / 2}
              y={TARGET.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Target
            </text>
            <line
              x1={TARGET.x}
              y1={TARGET.y + 46}
              x2={TARGET.x + TARGET.w}
              y2={TARGET.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={TARGET.x + 14}
              y={TARGET.y + 64}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + request()
            </text>
          </g>

          {/* ===== Adapter 框（中间下方） ===== */}
          <g>
            <rect
              x={ADAPTER.x}
              y={ADAPTER.y}
              width={ADAPTER.w}
              height={ADAPTER.h}
              rx="10"
              fill={elevated}
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={ADAPTER.x + ADAPTER.w / 2}
              y={ADAPTER.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Adapter
            </text>
            <line
              x1={ADAPTER.x}
              y1={ADAPTER.y + 32}
              x2={ADAPTER.x + ADAPTER.w}
              y2={ADAPTER.y + 32}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ADAPTER.x + 12}
              y={ADAPTER.y + 50}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              - adaptee: Adaptee
            </text>
            <text
              x={ADAPTER.x + 12}
              y={ADAPTER.y + 68}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + request()
            </text>
            <text
              x={ADAPTER.x + 12}
              y={ADAPTER.y + 88}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"// 转发 specificRequest()"}
            </text>
          </g>

          {/* ===== Adaptee 框（右侧） ===== */}
          <g>
            <rect
              x={ADAPTEE.x}
              y={ADAPTEE.y}
              width={ADAPTEE.w}
              height={ADAPTEE.h}
              rx="10"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={ADAPTEE.x + ADAPTEE.w / 2}
              y={ADAPTEE.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Adaptee
            </text>
            <line
              x1={ADAPTEE.x}
              y1={ADAPTEE.y + 34}
              x2={ADAPTEE.x + ADAPTEE.w}
              y2={ADAPTEE.y + 34}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={ADAPTEE.x + 12}
              y={ADAPTEE.y + 54}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + specificRequest()
            </text>
            <text
              x={ADAPTEE.x + 12}
              y={ADAPTEE.y + 72}
              fontSize="11"
              fill={warning}
              fontStyle="italic"
            >
              {"// 接口不兼容"}
            </text>
          </g>

          {/* ===== 依赖箭头：Client → Target（虚线开放箭头） ===== */}
          <line
            x1={CLIENT.x + CLIENT.w}
            y1={CLIENT.y + 40}
            x2={TARGET.x - 2}
            y2={TARGET.y + 40}
            stroke={secondary}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#adapter-dep-arrow)"
          />
          <text
            x={(CLIENT.x + CLIENT.w + TARGET.x) / 2}
            y={CLIENT.y + 30}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={secondary}
          >
            依赖
          </text>

          {/* ===== 实现箭头：Adapter → Target（虚线空心三角） ===== */}
          <line
            x1={ADAPTER.x + ADAPTER.w / 2}
            y1={ADAPTER.y}
            x2={TARGET.x + TARGET.w / 2}
            y2={TARGET.y + TARGET.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#adapter-impl-arrow)"
          />
          <text
            x={ADAPTER.x + ADAPTER.w / 2 + 16}
            y={(ADAPTER.y + TARGET.y + TARGET.h) / 2}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            «implements»
          </text>

          {/* ===== 持有箭头：Adapter → Adaptee（实线实心箭头） ===== */}
          <line
            x1={ADAPTER.x + ADAPTER.w}
            y1={ADAPTER.y + 50}
            x2={ADAPTEE.x - 2}
            y2={ADAPTEE.y + 42}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#adapter-holds-arrow)"
          />
          <text
            x={(ADAPTER.x + ADAPTER.w + ADAPTEE.x) / 2}
            y={ADAPTER.y + 40}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="372"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            适配器：让不兼容的接口协同工作
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        适配器实现了 Target 接口，同时内部持有一个 Adaptee 引用。当 Client 调用
        adapter.request() 时，适配器把请求转发给 adaptee.specificRequest()，
        从而让原本接口不兼容的类能够协同工作——无需修改任何一方的代码。
      </figcaption>
    </figure>
  );
}
