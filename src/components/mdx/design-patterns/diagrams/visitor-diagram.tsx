/**
 * <VisitorDiagram>：访问者模式双分派图（design-patterns 课程）。
 *
 *   - 上方：Visitor 接口（虚线边框），声明 visitA(elemA) / visitB(elemB)
 *   - 左下：ConcreteVisitor（实现 visitA / visitB）
 *   - 右上：Element 接口（虚线边框，声明 accept(visitor)）
 *   - 右下：ConcreteElementA / ConcreteElementB（accept 内调用 visitor.visitX(this)）
 *   - 虚线空心三角 = 实现接口；实线实心箭头 = 调用（标 visitX(this)）
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 双分派结构 / 底部总结）。
 * 间距用 4 的倍数。调用箭头与实现 rake 经坐标核算避免相互穿插。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// Visitor 接口框（左上）
const VISITOR = { x: 40, y: 60, w: 240, h: 96 };
const VISITOR_CX = VISITOR.x + VISITOR.w / 2; // 160
// Element 接口框（右上，加宽以容纳下方两个具体元素 rake）
const ELEMENT = { x: 380, y: 60, w: 308, h: 84 };
const ELEMENT_CX = ELEMENT.x + ELEMENT.w / 2; // 534
// ConcreteVisitor 框（左下）
const CONCRETE_VISITOR = { x: 40, y: 200, w: 240, h: 116 };
// 两个具体元素框（右下并排，尺寸统一）
const CE_W = 150;
const CE_H = 120;
const CE_Y = 200;
const CE_A = { x: 380, y: CE_Y, w: CE_W, h: CE_H }; // 中心 x = 455
const CE_B = { x: 538, y: CE_Y, w: CE_W, h: CE_H }; // 中心 x = 613
// Element 实现 rake：bus 与 stem
const CE_BUS_Y = 176;
const CE_A_DROP_X = 400; // 偏左，避开 CEB 调用箭头
const CE_B_DROP_X = 613;
// 调用箭头落点（Visitor 右边缘，y 错开避免重叠）
const CALL_END_A = { x: 280, y: 132 }; // visitA
const CALL_END_B = { x: 280, y: 120 }; // visitB（更靠上，保证整条线在 visitA 之上）

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function VisitorDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="访问者模式双分派图。上方 Visitor 接口（虚线边框）声明 visitA 与 visitB 方法；右上 Element 接口（虚线边框）声明 accept 方法。左下 ConcreteVisitor 实现 visitA、visitB；右下 ConcreteElementA 与 ConcreteElementB 各自实现 accept，内部调用 visitor.visitA(this) 或 visitor.visitB(this)。虚线空心三角箭头表示实现关系，实线箭头从具体元素指向 Visitor 标注 visitA(this) 与 visitB(this) 表示调用。底部说明：访问者——在不修改元素类的前提下添加新操作（双分派）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口） */}
            <marker
              id="vis-impl-arrow"
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
            {/* 调用：实心三角箭头（指向 Visitor） */}
            <marker
              id="vis-call-arrow"
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
            访问者模式 · 双分派
          </text>

          {/* ===== Visitor 接口框 ===== */}
          <g>
            <rect
              x={VISITOR.x}
              y={VISITOR.y}
              width={VISITOR.w}
              height={VISITOR.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={VISITOR_CX}
              y={VISITOR.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={VISITOR_CX}
              y={VISITOR.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Visitor
            </text>
            <line
              x1={VISITOR.x}
              y1={VISITOR.y + 46}
              x2={VISITOR.x + VISITOR.w}
              y2={VISITOR.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={VISITOR.x + 14}
              y={VISITOR.y + 66}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + visitA(a: ElemA)
            </text>
            <text
              x={VISITOR.x + 14}
              y={VISITOR.y + 82}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + visitB(b: ElemB)
            </text>
          </g>

          {/* ===== Element 接口框 ===== */}
          <g>
            <rect
              x={ELEMENT.x}
              y={ELEMENT.y}
              width={ELEMENT.w}
              height={ELEMENT.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={ELEMENT_CX}
              y={ELEMENT.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={ELEMENT_CX}
              y={ELEMENT.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Element
            </text>
            <line
              x1={ELEMENT.x}
              y1={ELEMENT.y + 46}
              x2={ELEMENT.x + ELEMENT.w}
              y2={ELEMENT.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ELEMENT.x + 14}
              y={ELEMENT.y + 66}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + accept(v: Visitor)
            </text>
          </g>

          {/* ===== ConcreteVisitor 框 ===== */}
          <g>
            <rect
              x={CONCRETE_VISITOR.x}
              y={CONCRETE_VISITOR.y}
              width={CONCRETE_VISITOR.w}
              height={CONCRETE_VISITOR.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE_VISITOR.x + CONCRETE_VISITOR.w / 2}
              y={CONCRETE_VISITOR.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteVisitor
            </text>
            <line
              x1={CONCRETE_VISITOR.x}
              y1={CONCRETE_VISITOR.y + 32}
              x2={CONCRETE_VISITOR.x + CONCRETE_VISITOR.w}
              y2={CONCRETE_VISITOR.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONCRETE_VISITOR.x + 14}
              y={CONCRETE_VISITOR.y + 52}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + visitA(a)
            </text>
            <text
              x={CONCRETE_VISITOR.x + 14}
              y={CONCRETE_VISITOR.y + 70}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + visitB(b)
            </text>
            <text
              x={CONCRETE_VISITOR.x + 14}
              y={CONCRETE_VISITOR.y + 92}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              // 针对元素的具体操作
            </text>
          </g>

          {/* ===== 实现箭头：ConcreteVisitor → Visitor（垂直） ===== */}
          <line
            x1={VISITOR_CX}
            y1={CONCRETE_VISITOR.y}
            x2={VISITOR_CX}
            y2={VISITOR.y + VISITOR.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#vis-impl-arrow)"
          />
          <text
            x={VISITOR_CX + 10}
            y={(VISITOR.y + VISITOR.h + CONCRETE_VISITOR.y) / 2 + 4}
            fontSize="11"
            fontStyle="italic"
            fill={secondary}
          >
            «implements»
          </text>

          {/* ===== Element 实现 rake：CEA / CEB → Element ===== */}
          <line
            x1={CE_A_DROP_X}
            y1={CE_Y}
            x2={CE_A_DROP_X}
            y2={CE_BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <line
            x1={CE_B_DROP_X}
            y1={CE_Y}
            x2={CE_B_DROP_X}
            y2={CE_BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <line
            x1={CE_A_DROP_X}
            y1={CE_BUS_Y}
            x2={CE_B_DROP_X}
            y2={CE_BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <line
            x1={ELEMENT_CX}
            y1={CE_BUS_Y}
            x2={ELEMENT_CX}
            y2={ELEMENT.y + ELEMENT.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#vis-impl-arrow)"
          />
          <text
            x={ELEMENT_CX + 10}
            y={CE_BUS_Y - 8}
            fontSize="11"
            fontStyle="italic"
            fill={secondary}
          >
            «implements»
          </text>

          {/* ===== 两个具体元素框 ===== */}
          {(
            [
              { box: CE_A, tag: "A", visit: "visitA(this)" },
              { box: CE_B, tag: "B", visit: "visitB(this)" },
            ] as const
          ).map(({ box, tag, visit }) => (
            <g key={`ce-${tag}`}>
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx="10"
                fill={elevated}
                stroke={border}
                strokeWidth="1.8"
              />
              <text
                x={box.x + box.w / 2}
                y={box.y + 22}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {`ConcreteElement${tag}`}
              </text>
              <line
                x1={box.x}
                y1={box.y + 32}
                x2={box.x + box.w}
                y2={box.y + 32}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={box.x + 12}
                y={box.y + 50}
                fontSize="12"
                fill={primary}
                fontFamily="monospace"
              >
                + accept(v)
              </text>
              <text
                x={box.x + 12}
                y={box.y + 70}
                fontSize="11"
                fill={accent}
                fontStyle="italic"
                fontFamily="monospace"
              >
                {`{ v.${visit} }`}
              </text>
              <text
                x={box.x + 12}
                y={box.y + 90}
                fontSize="11"
                fill={secondary}
                fontStyle="italic"
              >
                // 双分派
              </text>
            </g>
          ))}

          {/* ===== 调用箭头：ConcreteElementA → Visitor（visitA） ===== */}
          <line
            x1={CE_A.x}
            y1={CE_Y}
            x2={CALL_END_A.x + 2}
            y2={CALL_END_A.y}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#vis-call-arrow)"
          />
          <text
            x="325"
            y="162"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            visitA(this)
          </text>

          {/* ===== 调用箭头：ConcreteElementB → Visitor（visitB） ===== */}
          <line
            x1={CE_B.x}
            y1={CE_Y}
            x2={CALL_END_B.x + 2}
            y2={CALL_END_B.y}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#vis-call-arrow)"
          />
          <text
            x="418"
            y="158"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            visitB(this)
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="400"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            访问者：在不修改元素类的前提下添加新操作（双分派）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        accept(v) 内部回调 v.visitX(this)——第一次分派按元素类型选 accept，第二次按
        Visitor 类型选 visitX。新增操作只需加一个 ConcreteVisitor，元素类层次完全不用动；反之新增元素类型则所有 Visitor 都要改。
      </figcaption>
    </figure>
  );
}
