/**
 * <FlyweightPatternDiagram>：享元模式共享图（design-patterns 课程）。
 *
 * 展示享元模式的核心结构：
 *   - 左侧 FlyweightFactory 类（维护 flyweights: Map，有 getFlyweight(key) 方法）
 *   - 右上 Flyweight 接口（虚线边框、斜体），声明 operation(extrinsicState)
 *   - 右下 ConcreteFlyweight（存储 intrinsicState 内部状态）
 *   - 3 个客户端共享同一个 ConcreteFlyweight 实例（箭头指向同一对象）
 *   - 底部文字：「享元：共享细粒度对象，分离内部状态与外部状态」
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×400（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 400;

// FlyweightFactory 框（左侧）
const FACTORY = { x: 40, y: 68, w: 220, h: 108 };
// Flyweight 接口框（右上）
const FLYWEIGHT = { x: 420, y: 68, w: 220, h: 80 };
// ConcreteFlyweight 框（右下）
const CONCRETE_FW = { x: 430, y: 200, w: 220, h: 84 };
// 3 个 Client 框（底部左侧）
const CLIENT_W = 100;
const CLIENT_H = 48;
const CLIENT_Y = 304;
const CLIENT_1 = { x: 40, y: CLIENT_Y };
const CLIENT_2 = { x: 152, y: CLIENT_Y };
const CLIENT_3 = { x: 264, y: CLIENT_Y };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

export function FlyweightPatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="享元模式共享图。左侧是 FlyweightFactory 类，维护一个 flyweights: Map，有 getFlyweight(key) 方法，用于共享或创建享元对象。右上是 Flyweight 接口（虚线边框、斜体），声明 operation(extrinsicState) 方法。右下是 ConcreteFlyweight，存储 intrinsicState 内部状态，实现 operation(extrinsicState) 方法。底部左侧有 3 个客户端 Client，通过共享箭头指向同一个 ConcreteFlyweight 实例，表示它们共享同一个享元对象。底部说明：享元共享细粒度对象，分离内部状态与外部状态。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头 */}
            <marker
              id="flyweight-impl-arrow"
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
            {/* 创建 / 返回：实心三角箭头 */}
            <marker
              id="flyweight-create-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={warning} />
            </marker>
            {/* 共享：实心三角箭头（success） */}
            <marker
              id="flyweight-share-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={success} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="38"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            享元模式 · 共享结构
          </text>

          {/* ===== FlyweightFactory 框（左侧） ===== */}
          <g>
            <rect
              x={FACTORY.x}
              y={FACTORY.y}
              width={FACTORY.w}
              height={FACTORY.h}
              rx="10"
              fill={elevated}
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={FACTORY.x + FACTORY.w / 2}
              y={FACTORY.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              FlyweightFactory
            </text>
            <line
              x1={FACTORY.x}
              y1={FACTORY.y + 32}
              x2={FACTORY.x + FACTORY.w}
              y2={FACTORY.y + 32}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={FACTORY.x + 14}
              y={FACTORY.y + 50}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              - flyweights: Map
            </text>
            <text
              x={FACTORY.x + 14}
              y={FACTORY.y + 68}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + getFlyweight(key)
            </text>
            <text
              x={FACTORY.x + 14}
              y={FACTORY.y + 88}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"// 命中缓存则共享"}
            </text>
            <text
              x={FACTORY.x + 14}
              y={FACTORY.y + 102}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"// 否则创建新实例"}
            </text>
          </g>

          {/* ===== Flyweight 接口框（右上） ===== */}
          <g>
            <rect
              x={FLYWEIGHT.x}
              y={FLYWEIGHT.y}
              width={FLYWEIGHT.w}
              height={FLYWEIGHT.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={FLYWEIGHT.x + FLYWEIGHT.w / 2}
              y={FLYWEIGHT.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={FLYWEIGHT.x + FLYWEIGHT.w / 2}
              y={FLYWEIGHT.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Flyweight
            </text>
            <line
              x1={FLYWEIGHT.x}
              y1={FLYWEIGHT.y + 46}
              x2={FLYWEIGHT.x + FLYWEIGHT.w}
              y2={FLYWEIGHT.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={FLYWEIGHT.x + 14}
              y={FLYWEIGHT.y + 64}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operation(extrinsicState)
            </text>
          </g>

          {/* ===== ConcreteFlyweight 框（右下） ===== */}
          <g>
            <rect
              x={CONCRETE_FW.x}
              y={CONCRETE_FW.y}
              width={CONCRETE_FW.w}
              height={CONCRETE_FW.h}
              rx="10"
              fill={elevated}
              stroke={success}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE_FW.x + CONCRETE_FW.w / 2}
              y={CONCRETE_FW.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteFlyweight
            </text>
            <line
              x1={CONCRETE_FW.x}
              y1={CONCRETE_FW.y + 32}
              x2={CONCRETE_FW.x + CONCRETE_FW.w}
              y2={CONCRETE_FW.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={CONCRETE_FW.x + 14}
              y={CONCRETE_FW.y + 50}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              - intrinsicState
            </text>
            <text
              x={CONCRETE_FW.x + 14}
              y={CONCRETE_FW.y + 68}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operation(extrinsicState)
            </text>
          </g>

          {/* ===== 创建 / 返回箭头：Factory → Flyweight（实线箭头） ===== */}
          <line
            x1={FACTORY.x + FACTORY.w}
            y1={FACTORY.y + 44}
            x2={FLYWEIGHT.x - 2}
            y2={FLYWEIGHT.y + 40}
            stroke={warning}
            strokeWidth="1.6"
            markerEnd="url(#flyweight-create-arrow)"
          />
          <text
            x={(FACTORY.x + FACTORY.w + FLYWEIGHT.x) / 2}
            y={FACTORY.y + 34}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={warning}
          >
            创建 / 返回
          </text>

          {/* ===== 实现箭头：ConcreteFlyweight → Flyweight（虚线空心三角） ===== */}
          <line
            x1={CONCRETE_FW.x + CONCRETE_FW.w / 2}
            y1={CONCRETE_FW.y}
            x2={FLYWEIGHT.x + FLYWEIGHT.w / 2}
            y2={FLYWEIGHT.y + FLYWEIGHT.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#flyweight-impl-arrow)"
          />
          <text
            x={CONCRETE_FW.x + CONCRETE_FW.w / 2 + 14}
            y={(CONCRETE_FW.y + FLYWEIGHT.y + FLYWEIGHT.h) / 2}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            «implements»
          </text>

          {/* ===== Client 框 ×3（底部左侧） ===== */}
          <g>
            <rect
              x={CLIENT_1.x}
              y={CLIENT_1.y}
              width={CLIENT_W}
              height={CLIENT_H}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={CLIENT_1.x + CLIENT_W / 2}
              y={CLIENT_1.y + 20}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Client1
            </text>
            <line
              x1={CLIENT_1.x}
              y1={CLIENT_1.y + 28}
              x2={CLIENT_1.x + CLIENT_W}
              y2={CLIENT_1.y + 28}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CLIENT_1.x + 8}
              y={CLIENT_1.y + 42}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 共享实例"}
            </text>
          </g>
          <g>
            <rect
              x={CLIENT_2.x}
              y={CLIENT_2.y}
              width={CLIENT_W}
              height={CLIENT_H}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={CLIENT_2.x + CLIENT_W / 2}
              y={CLIENT_2.y + 20}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Client2
            </text>
            <line
              x1={CLIENT_2.x}
              y1={CLIENT_2.y + 28}
              x2={CLIENT_2.x + CLIENT_W}
              y2={CLIENT_2.y + 28}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CLIENT_2.x + 8}
              y={CLIENT_2.y + 42}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 共享实例"}
            </text>
          </g>
          <g>
            <rect
              x={CLIENT_3.x}
              y={CLIENT_3.y}
              width={CLIENT_W}
              height={CLIENT_H}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={CLIENT_3.x + CLIENT_W / 2}
              y={CLIENT_3.y + 20}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Client3
            </text>
            <line
              x1={CLIENT_3.x}
              y1={CLIENT_3.y + 28}
              x2={CLIENT_3.x + CLIENT_W}
              y2={CLIENT_3.y + 28}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CLIENT_3.x + 8}
              y={CLIENT_3.y + 42}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 共享实例"}
            </text>
          </g>

          {/* ===== 共享箭头：3 个 Client → ConcreteFlyweight（实线箭头） ===== */}
          <line
            x1={CLIENT_1.x + CLIENT_W}
            y1={CLIENT_1.y + 24}
            x2={CONCRETE_FW.x - 2}
            y2={CONCRETE_FW.y + 36}
            stroke={success}
            strokeWidth="1.6"
            markerEnd="url(#flyweight-share-arrow)"
          />
          <line
            x1={CLIENT_2.x + CLIENT_W}
            y1={CLIENT_2.y + 24}
            x2={CONCRETE_FW.x - 2}
            y2={CONCRETE_FW.y + 44}
            stroke={success}
            strokeWidth="1.6"
            markerEnd="url(#flyweight-share-arrow)"
          />
          <line
            x1={CLIENT_3.x + CLIENT_W}
            y1={CLIENT_3.y + 24}
            x2={CONCRETE_FW.x - 2}
            y2={CONCRETE_FW.y + 52}
            stroke={success}
            strokeWidth="1.6"
            markerEnd="url(#flyweight-share-arrow)"
          />
          <text
            x={(CLIENT_3.x + CLIENT_W + CONCRETE_FW.x) / 2}
            y={CONCRETE_FW.y + CONCRETE_FW.h + 20}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={success}
          >
            共享同一实例
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="372"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            享元：共享细粒度对象，分离内部状态与外部状态
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        内部状态（intrinsicState）存储在 ConcreteFlyweight 中，可被多个客户端共享；
        外部状态（extrinsicState）由客户端在调用 operation() 时传入。Factory
        负责缓存和复用对象——相同 key 只创建一个实例，大幅减少内存占用。
      </figcaption>
    </figure>
  );
}
