/**
 * <IteratorDiagram>：迭代器模式结构图（design-patterns 课程）。
 *
 * 四象限 UML 结构图：
 *   - 左上：Iterable / Collection 接口（虚线边框 + 斜体 + «interface»），声明 createIterator()
 *   - 右上：Iterator 接口（虚线边框），声明 hasNext() 与 next()
 *   - 左下：ConcreteCollection（实现 Iterable，持有 data）
 *   - 右下：ConcreteIterator（实现 Iterator，持有 collection 引用 + cursor）
 *   - 虚线空心三角箭头 = 实现接口（Concrete → Interface）
 *   - 实线实心箭头 = 持有（ConcreteIterator → ConcreteCollection）
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×380（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 380;

// 上排两个接口框（虚线边框）
const ITERABLE = { x: 80, y: 64, w: 200, h: 88 };
const ITERATOR = { x: 440, y: 64, w: 200, h: 88 };
// 下排两个具体类框
const CONCRETE_COLLECTION = { x: 64, y: 200, w: 232, h: 120 };
const CONCRETE_ITERATOR = { x: 424, y: 200, w: 232, h: 120 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function DpIteratorDiagram() {
  // 接口中心 x（实现箭头的落点）
  const iterableCx = ITERABLE.x + ITERABLE.w / 2; // 180
  const iteratorCx = ITERATOR.x + ITERATOR.w / 2; // 540
  // 持有箭头纵向位置（具体类中部）
  const holdsY = CONCRETE_COLLECTION.y + 56; // 256

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="迭代器模式结构图。左上 Iterable 接口（虚线边框）声明 createIterator 方法；右上 Iterator 接口（虚线边框）声明 hasNext 与 next 方法。左下 ConcreteCollection 实现 Iterable 并持有 data 数据；右下 ConcreteIterator 实现 Iterator，持有 collection 引用与 cursor 游标。虚线空心三角箭头从两个具体类指向对应接口表示实现关系；实线实心箭头从 ConcreteIterator 指向 ConcreteCollection 标注「持有」。底部说明：迭代器——统一遍历接口，屏蔽集合的内部结构。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口） */}
            <marker
              id="iter-impl-arrow"
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
            {/* 持有 / 关联：实心三角箭头 */}
            <marker
              id="iter-holds-arrow"
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
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            迭代器模式 · 结构图
          </text>

          {/* ===== Iterable 接口框 ===== */}
          <g>
            <rect
              x={ITERABLE.x}
              y={ITERABLE.y}
              width={ITERABLE.w}
              height={ITERABLE.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={iterableCx}
              y={ITERABLE.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={iterableCx}
              y={ITERABLE.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Iterable
            </text>
            <line
              x1={ITERABLE.x}
              y1={ITERABLE.y + 46}
              x2={ITERABLE.x + ITERABLE.w}
              y2={ITERABLE.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ITERABLE.x + 14}
              y={ITERABLE.y + 68}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + createIterator()
            </text>
          </g>

          {/* ===== Iterator 接口框 ===== */}
          <g>
            <rect
              x={ITERATOR.x}
              y={ITERATOR.y}
              width={ITERATOR.w}
              height={ITERATOR.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={iteratorCx}
              y={ITERATOR.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={iteratorCx}
              y={ITERATOR.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Iterator
            </text>
            <line
              x1={ITERATOR.x}
              y1={ITERATOR.y + 46}
              x2={ITERATOR.x + ITERATOR.w}
              y2={ITERATOR.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ITERATOR.x + 14}
              y={ITERATOR.y + 66}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + hasNext(): bool
            </text>
            <text
              x={ITERATOR.x + 14}
              y={ITERATOR.y + 82}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + next(): T
            </text>
          </g>

          {/* ===== 实现箭头：ConcreteCollection → Iterable ===== */}
          <line
            x1={iterableCx}
            y1={CONCRETE_COLLECTION.y}
            x2={iterableCx}
            y2={ITERABLE.y + ITERABLE.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#iter-impl-arrow)"
          />
          <text
            x={iterableCx + 10}
            y={(ITERABLE.y + ITERABLE.h + CONCRETE_COLLECTION.y) / 2 + 4}
            fontSize="11"
            fontStyle="italic"
            fill={secondary}
          >
            «implements»
          </text>

          {/* ===== 实现箭头：ConcreteIterator → Iterator ===== */}
          <line
            x1={iteratorCx}
            y1={CONCRETE_ITERATOR.y}
            x2={iteratorCx}
            y2={ITERATOR.y + ITERATOR.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#iter-impl-arrow)"
          />
          <text
            x={iteratorCx + 10}
            y={(ITERATOR.y + ITERATOR.h + CONCRETE_ITERATOR.y) / 2 + 4}
            fontSize="11"
            fontStyle="italic"
            fill={secondary}
          >
            «implements»
          </text>

          {/* ===== ConcreteCollection 框 ===== */}
          <g>
            <rect
              x={CONCRETE_COLLECTION.x}
              y={CONCRETE_COLLECTION.y}
              width={CONCRETE_COLLECTION.w}
              height={CONCRETE_COLLECTION.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE_COLLECTION.x + CONCRETE_COLLECTION.w / 2}
              y={CONCRETE_COLLECTION.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteCollection
            </text>
            <line
              x1={CONCRETE_COLLECTION.x}
              y1={CONCRETE_COLLECTION.y + 32}
              x2={CONCRETE_COLLECTION.x + CONCRETE_COLLECTION.w}
              y2={CONCRETE_COLLECTION.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONCRETE_COLLECTION.x + 14}
              y={CONCRETE_COLLECTION.y + 52}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - data: T[]
            </text>
            <line
              x1={CONCRETE_COLLECTION.x}
              y1={CONCRETE_COLLECTION.y + 64}
              x2={CONCRETE_COLLECTION.x + CONCRETE_COLLECTION.w}
              y2={CONCRETE_COLLECTION.y + 64}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONCRETE_COLLECTION.x + 14}
              y={CONCRETE_COLLECTION.y + 84}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + createIterator()
            </text>
            <text
              x={CONCRETE_COLLECTION.x + 14}
              y={CONCRETE_COLLECTION.y + 104}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              // 返回 ConcreteIterator
            </text>
          </g>

          {/* ===== ConcreteIterator 框 ===== */}
          <g>
            <rect
              x={CONCRETE_ITERATOR.x}
              y={CONCRETE_ITERATOR.y}
              width={CONCRETE_ITERATOR.w}
              height={CONCRETE_ITERATOR.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE_ITERATOR.x + CONCRETE_ITERATOR.w / 2}
              y={CONCRETE_ITERATOR.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteIterator
            </text>
            <line
              x1={CONCRETE_ITERATOR.x}
              y1={CONCRETE_ITERATOR.y + 32}
              x2={CONCRETE_ITERATOR.x + CONCRETE_ITERATOR.w}
              y2={CONCRETE_ITERATOR.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONCRETE_ITERATOR.x + 14}
              y={CONCRETE_ITERATOR.y + 50}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - collection
            </text>
            <text
              x={CONCRETE_ITERATOR.x + 14}
              y={CONCRETE_ITERATOR.y + 68}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - cursor: int
            </text>
            <line
              x1={CONCRETE_ITERATOR.x}
              y1={CONCRETE_ITERATOR.y + 78}
              x2={CONCRETE_ITERATOR.x + CONCRETE_ITERATOR.w}
              y2={CONCRETE_ITERATOR.y + 78}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONCRETE_ITERATOR.x + 14}
              y={CONCRETE_ITERATOR.y + 96}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + hasNext() / next()
            </text>
          </g>

          {/* ===== 持有箭头：ConcreteIterator → ConcreteCollection ===== */}
          <line
            x1={CONCRETE_ITERATOR.x}
            y1={holdsY}
            x2={CONCRETE_COLLECTION.x + CONCRETE_COLLECTION.w + 2}
            y2={holdsY}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#iter-holds-arrow)"
          />
          <text
            x={(CONCRETE_COLLECTION.x + CONCRETE_COLLECTION.w + CONCRETE_ITERATOR.x) / 2}
            y={holdsY - 10}
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
            y="356"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            迭代器：统一遍历接口，屏蔽集合的内部结构
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        客户端只依赖 Iterator 接口，用 hasNext/next
        逐个访问元素——无需知道集合是数组、链表还是树。同一集合可以创建多个独立游标的迭代器互不干扰。
      </figcaption>
    </figure>
  );
}
