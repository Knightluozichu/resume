/**
 * <CompositePatternDiagram>：组合模式树形结构图（design-patterns 课程）。
 *
 * 展示组合模式的核心结构：
 *   - 顶部 Component 接口（虚线边框、斜体、«interface»），声明 operation()、add()、
 *     remove()、getChild()
 *   - 左下 Leaf 类（叶子节点，operation() 有实现，add/remove 抛异常或空操作）
 *   - 右下 Composite 类（树枝节点，持有 children: Component[]，operation() 遍历
 *     调用 children 的 operation()）
 *   - 底部树形结构示例：root(Composite) → 两个子节点（一个 Leaf 一个 Composite），
 *     后者再有两个 Leaf
 *   - 箭头：Leaf/Composite→Component（实现，虚线空心三角）；
 *     Composite→Component（持有 children，实线实心箭头）
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×480（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部树形示例）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 480;

// Component 接口框（顶部居中）
const COMPONENT = { x: 240, y: 56, w: 240, h: 120 };
// Leaf 框（左下）
const LEAF = { x: 40, y: 204, w: 220, h: 104 };
// Composite 框（右下）
const COMPOSITE = { x: 460, y: 204, w: 220, h: 104 };

// 底部树形结构示例节点（宽 76, 高 24）
const TREE_W = 76;
const TREE_H = 24;
const TREE_ROOT = { x: 322, y: 344 }; // root (Composite)
const TREE_CHILD1 = { x: 192, y: 384 }; // Leaf
const TREE_CHILD2 = { x: 452, y: 384 }; // Composite
const TREE_LEAF2A = { x: 384, y: 424 }; // Leaf
const TREE_LEAF2B = { x: 520, y: 424 }; // Leaf

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function CompositePatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="组合模式树形结构图。顶部居中是 Component 接口（虚线边框、斜体），声明 operation()、add()、remove()、getChild() 四个方法。左下是 Leaf 类（叶子节点），实现了 operation()，但 add/remove 为空操作或不支持。右下是 Composite 类（树枝节点），持有 children: Component[] 数组，operation() 遍历调用所有 children 的 operation()。虚线空心三角箭头从 Leaf 和 Composite 指向 Component 表示实现关系；实线实心箭头从 Composite 指向 Component 标注 children 表示持有关系。底部画了一个树形结构示例：根节点 root 是 Composite，有两个子节点——一个是 Leaf，另一个是 Composite；后者又有两个 Leaf 子节点。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现 / 继承关系：空心三角箭头 */}
            <marker
              id="composite-impl-arrow"
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
            {/* 持有 / 聚合：实心三角箭头 */}
            <marker
              id="composite-holds-arrow"
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
            y="38"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            组合模式 · 树形结构
          </text>

          {/* ===== Component 接口框（顶部居中） ===== */}
          <g>
            <rect
              x={COMPONENT.x}
              y={COMPONENT.y}
              width={COMPONENT.w}
              height={COMPONENT.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={COMPONENT.x + COMPONENT.w / 2}
              y={COMPONENT.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={COMPONENT.x + COMPONENT.w / 2}
              y={COMPONENT.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Component
            </text>
            <line
              x1={COMPONENT.x}
              y1={COMPONENT.y + 46}
              x2={COMPONENT.x + COMPONENT.w}
              y2={COMPONENT.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={COMPONENT.x + 14}
              y={COMPONENT.y + 64}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
            <text
              x={COMPONENT.x + 14}
              y={COMPONENT.y + 80}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + add(c: Component)
            </text>
            <text
              x={COMPONENT.x + 14}
              y={COMPONENT.y + 96}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + remove(c: Component)
            </text>
            <text
              x={COMPONENT.x + 14}
              y={COMPONENT.y + 112}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + getChild(i): Component
            </text>
          </g>

          {/* ===== Leaf 框（左下） ===== */}
          <g>
            <rect
              x={LEAF.x}
              y={LEAF.y}
              width={LEAF.w}
              height={LEAF.h}
              rx="10"
              fill={elevated}
              stroke={success}
              strokeWidth="1.8"
            />
            <text
              x={LEAF.x + LEAF.w / 2}
              y={LEAF.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Leaf
            </text>
            <line
              x1={LEAF.x}
              y1={LEAF.y + 32}
              x2={LEAF.x + LEAF.w}
              y2={LEAF.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={LEAF.x + 14}
              y={LEAF.y + 50}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
            <text
              x={LEAF.x + 14}
              y={LEAF.y + 68}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              + add(c) / + remove(c)
            </text>
            <text
              x={LEAF.x + 14}
              y={LEAF.y + 88}
              fontSize="11"
              fill={danger}
              fontStyle="italic"
            >
              // 抛异常或空操作
            </text>
          </g>

          {/* ===== Composite 框（右下） ===== */}
          <g>
            <rect
              x={COMPOSITE.x}
              y={COMPOSITE.y}
              width={COMPOSITE.w}
              height={COMPOSITE.h}
              rx="10"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={COMPOSITE.x + COMPOSITE.w / 2}
              y={COMPOSITE.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Composite
            </text>
            <line
              x1={COMPOSITE.x}
              y1={COMPOSITE.y + 32}
              x2={COMPOSITE.x + COMPOSITE.w}
              y2={COMPOSITE.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={COMPOSITE.x + 14}
              y={COMPOSITE.y + 50}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              - children: Component[]
            </text>
            <text
              x={COMPOSITE.x + 14}
              y={COMPOSITE.y + 68}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
            <text
              x={COMPOSITE.x + 14}
              y={COMPOSITE.y + 88}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              // 遍历 children.operation()
            </text>
          </g>

          {/* ===== 实现箭头：Leaf → Component（虚线空心三角） ===== */}
          <line
            x1={LEAF.x + LEAF.w / 2}
            y1={LEAF.y}
            x2={COMPONENT.x + 52}
            y2={COMPONENT.y + COMPONENT.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#composite-impl-arrow)"
          />

          {/* ===== 实现箭头：Composite → Component（虚线空心三角） ===== */}
          <line
            x1={COMPOSITE.x + 52}
            y1={COMPOSITE.y}
            x2={COMPONENT.x + COMPONENT.w - 60}
            y2={COMPONENT.y + COMPONENT.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#composite-impl-arrow)"
          />
          <text
            x={COMPONENT.x + COMPONENT.w / 2}
            y={COMPONENT.y + COMPONENT.h + 20}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            «implements»
          </text>

          {/* ===== 持有箭头：Composite → Component（实线实心箭头，标注 children） ===== */}
          <line
            x1={COMPOSITE.x + COMPOSITE.w - 52}
            y1={COMPOSITE.y}
            x2={COMPONENT.x + COMPONENT.w - 20}
            y2={COMPONENT.y + COMPONENT.h + 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#composite-holds-arrow)"
          />
          <text
            x={COMPOSITE.x + COMPOSITE.w - 40}
            y={COMPOSITE.y - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有 children
          </text>

          {/* ===== 底部：树形结构示例 ===== */}
          <text
            x={VIEW_W / 2}
            y="332"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            树形结构示例：统一接口，递归组合
          </text>

          {/* 树形连线：root → child1 / child2 */}
          <line
            x1={TREE_ROOT.x + TREE_W / 2}
            y1={TREE_ROOT.y + TREE_H}
            x2={TREE_CHILD1.x + TREE_W / 2}
            y2={TREE_CHILD1.y}
            stroke={secondary}
            strokeWidth="1.4"
          />
          <line
            x1={TREE_ROOT.x + TREE_W / 2}
            y1={TREE_ROOT.y + TREE_H}
            x2={TREE_CHILD2.x + TREE_W / 2}
            y2={TREE_CHILD2.y}
            stroke={secondary}
            strokeWidth="1.4"
          />
          {/* 树形连线：child2 → leaf2a / leaf2b */}
          <line
            x1={TREE_CHILD2.x + TREE_W / 2}
            y1={TREE_CHILD2.y + TREE_H}
            x2={TREE_LEAF2A.x + TREE_W / 2}
            y2={TREE_LEAF2A.y}
            stroke={secondary}
            strokeWidth="1.4"
          />
          <line
            x1={TREE_CHILD2.x + TREE_W / 2}
            y1={TREE_CHILD2.y + TREE_H}
            x2={TREE_LEAF2B.x + TREE_W / 2}
            y2={TREE_LEAF2B.y}
            stroke={secondary}
            strokeWidth="1.4"
          />

          {/* root 节点 (Composite) */}
          <rect
            x={TREE_ROOT.x}
            y={TREE_ROOT.y}
            width={TREE_W}
            height={TREE_H}
            rx="6"
            fill={warning}
            fillOpacity="0.1"
            stroke={warning}
            strokeWidth="1.6"
          />
          <text
            x={TREE_ROOT.x + TREE_W / 2}
            y={TREE_ROOT.y + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
            fontFamily="monospace"
          >
            root
          </text>

          {/* child1 节点 (Leaf) */}
          <rect
            x={TREE_CHILD1.x}
            y={TREE_CHILD1.y}
            width={TREE_W}
            height={TREE_H}
            rx="6"
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeWidth="1.6"
          />
          <text
            x={TREE_CHILD1.x + TREE_W / 2}
            y={TREE_CHILD1.y + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
            fontFamily="monospace"
          >
            Leaf
          </text>

          {/* child2 节点 (Composite) */}
          <rect
            x={TREE_CHILD2.x}
            y={TREE_CHILD2.y}
            width={TREE_W}
            height={TREE_H}
            rx="6"
            fill={warning}
            fillOpacity="0.1"
            stroke={warning}
            strokeWidth="1.6"
          />
          <text
            x={TREE_CHILD2.x + TREE_W / 2}
            y={TREE_CHILD2.y + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
            fontFamily="monospace"
          >
            Composite
          </text>

          {/* leaf2a 节点 (Leaf) */}
          <rect
            x={TREE_LEAF2A.x}
            y={TREE_LEAF2A.y}
            width={TREE_W}
            height={TREE_H}
            rx="6"
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeWidth="1.6"
          />
          <text
            x={TREE_LEAF2A.x + TREE_W / 2}
            y={TREE_LEAF2A.y + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
            fontFamily="monospace"
          >
            Leaf
          </text>

          {/* leaf2b 节点 (Leaf) */}
          <rect
            x={TREE_LEAF2B.x}
            y={TREE_LEAF2B.y}
            width={TREE_W}
            height={TREE_H}
            rx="6"
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeWidth="1.6"
          />
          <text
            x={TREE_LEAF2B.x + TREE_W / 2}
            y={TREE_LEAF2B.y + 16}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
            fontFamily="monospace"
          >
            Leaf
          </text>

          {/* 树形图例 */}
          <text
            x={40}
            y={TREE_ROOT.y + 16}
            fontSize="11"
            fill={warning}
            fontStyle="italic"
          >
            Composite
          </text>
          <text
            x={40}
            y={TREE_CHILD1.y + 16}
            fontSize="11"
            fill={success}
            fontStyle="italic"
          >
            Leaf
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Leaf 和 Composite 都实现 Component 接口——Client 无需区分叶子与树枝。
        Composite.operation() 递归调用所有子节点的 operation()，让整棵树的
        操作像操作单个节点一样简单。这是「部分-整体」层级结构的核心思想。
      </figcaption>
    </figure>
  );
}
