/**
 * <PrototypePatternDiagram>：原型模式克隆对比图（design-patterns 课程）。
 *
 * 左右对比「new 创建」与「clone 创建」：
 *   - 顶部居中 Prototype 接口（虚线边框、斜体、«interface»），声明 clone(): Prototype
 *   - 左侧「用 new 创建」：SomeClass 类 + new 关键字 → 新对象（重新初始化所有字段），
 *     标注「耗时：重新走构造流程」
 *   - 右侧「用 clone 创建」：ConcretePrototype（实现 clone()，返回 this 的深拷贝）
 *     + clone() 箭头 → 新对象（直接复制已有状态），标注「快速：直接复制已有状态」
 *   - 中间竖线分隔对比；虚线空心三角箭头 = ConcretePrototype 实现 Prototype
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×400（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 对比主体 / 底部标注）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 400;

// Prototype 接口框（顶部居中）
const PROTOTYPE = { x: 284, y: 56, w: 152, h: 64 };
// 左侧 SomeClass 类框
const SOME_CLASS = { x: 44, y: 168, w: 240, h: 80 };
// 左侧 new 出的新对象框
const NEW_OBJ = { x: 44, y: 300, w: 240, h: 56 };
// 右侧 ConcretePrototype 框
const CONCRETE = { x: 436, y: 168, w: 240, h: 80 };
// 右侧 clone 出的新对象框
const CLONE_OBJ = { x: 436, y: 300, w: 240, h: 56 };
// 中间分隔线
const DIVIDER_X = 360;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

export function PrototypePatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="原型模式克隆对比图。顶部居中是 Prototype 接口（虚线边框、斜体、«interface»），声明 clone(): Prototype 方法。左侧「用 new 创建」：SomeClass 类有多个字段，通过 new 关键字创建新对象，需要重新初始化所有字段，标注「耗时：重新走构造流程」。右侧「用 clone 创建」：ConcretePrototype 实现 Prototype 接口（虚线空心三角箭头表示实现关系），其 clone() 返回 this 的深拷贝，通过 clone() 箭头得到新对象，直接复制已有状态，标注「快速：直接复制已有状态」。中间竖线分隔左右对比。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口），UML realization */}
            <marker
              id="proto-impl-arrow"
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
            {/* new 创建：实心三角箭头（warning） */}
            <marker
              id="proto-new-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={warning} />
            </marker>
            {/* clone 创建：实心三角箭头（success） */}
            <marker
              id="proto-clone-arrow"
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
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            原型模式 · new 与 clone 对比
          </text>

          {/* ===== Prototype 接口框（顶部居中） ===== */}
          <g>
            <rect
              x={PROTOTYPE.x}
              y={PROTOTYPE.y}
              width={PROTOTYPE.w}
              height={PROTOTYPE.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={PROTOTYPE.x + PROTOTYPE.w / 2}
              y={PROTOTYPE.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={PROTOTYPE.x + PROTOTYPE.w / 2}
              y={PROTOTYPE.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Prototype
            </text>
            <line
              x1={PROTOTYPE.x}
              y1={PROTOTYPE.y + 46}
              x2={PROTOTYPE.x + PROTOTYPE.w}
              y2={PROTOTYPE.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={PROTOTYPE.x + 14}
              y={PROTOTYPE.y + 60}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + clone(): Prototype
            </text>
          </g>

          {/* ===== 实现关系：ConcretePrototype → Prototype（虚线空心三角） ===== */}
          <line
            x1={CONCRETE.x + 24}
            y1={CONCRETE.y}
            x2={PROTOTYPE.x + PROTOTYPE.w - 18}
            y2={PROTOTYPE.y + PROTOTYPE.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#proto-impl-arrow)"
          />
          <text
            x={DIVIDER_X + 8}
            y={CONCRETE.y - 8}
            textAnchor="start"
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            «implements»
          </text>

          {/* ===== 中间分隔线 ===== */}
          <line
            x1={DIVIDER_X}
            y1="132"
            x2={DIVIDER_X}
            y2="360"
            stroke={border}
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* ===== 区段标签 ===== */}
          <text
            x={SOME_CLASS.x + SOME_CLASS.w / 2}
            y="152"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={warning}
          >
            用 new 创建
          </text>
          <text
            x={CONCRETE.x + CONCRETE.w / 2}
            y="152"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={success}
          >
            用 clone 创建
          </text>

          {/* ===== SomeClass 类框（左） ===== */}
          <g>
            <rect
              x={SOME_CLASS.x}
              y={SOME_CLASS.y}
              width={SOME_CLASS.w}
              height={SOME_CLASS.h}
              rx="10"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={SOME_CLASS.x + SOME_CLASS.w / 2}
              y={SOME_CLASS.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              SomeClass
            </text>
            <line
              x1={SOME_CLASS.x}
              y1={SOME_CLASS.y + 32}
              x2={SOME_CLASS.x + SOME_CLASS.w}
              y2={SOME_CLASS.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={SOME_CLASS.x + 14}
              y={SOME_CLASS.y + 52}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - a, b, c（多个字段）
            </text>
            <text
              x={SOME_CLASS.x + 14}
              y={SOME_CLASS.y + 70}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              // 构造时逐个初始化
            </text>
          </g>

          {/* ===== new 创建箭头：SomeClass → 新对象 ===== */}
          <line
            x1={SOME_CLASS.x + SOME_CLASS.w / 2}
            y1={SOME_CLASS.y + SOME_CLASS.h}
            x2={NEW_OBJ.x + NEW_OBJ.w / 2}
            y2={NEW_OBJ.y - 2}
            stroke={warning}
            strokeWidth="1.8"
            markerEnd="url(#proto-new-arrow)"
          />
          <text
            x={SOME_CLASS.x + SOME_CLASS.w / 2 + 12}
            y={SOME_CLASS.y + SOME_CLASS.h + 30}
            fontSize="12"
            fontWeight="700"
            fill={warning}
            fontFamily="monospace"
          >
            new
          </text>

          {/* ===== 新对象框（左，new 结果） ===== */}
          <g>
            <rect
              x={NEW_OBJ.x}
              y={NEW_OBJ.y}
              width={NEW_OBJ.w}
              height={NEW_OBJ.h}
              rx="8"
              fill={warning}
              fillOpacity="0.08"
              stroke={warning}
              strokeWidth="1.6"
            />
            <text
              x={NEW_OBJ.x + NEW_OBJ.w / 2}
              y={NEW_OBJ.y + 24}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              new SomeClass()
            </text>
            <text
              x={NEW_OBJ.x + NEW_OBJ.w / 2}
              y={NEW_OBJ.y + 44}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              字段重新初始化
            </text>
          </g>

          {/* ===== ConcretePrototype 框（右） ===== */}
          <g>
            <rect
              x={CONCRETE.x}
              y={CONCRETE.y}
              width={CONCRETE.w}
              height={CONCRETE.h}
              rx="10"
              fill={elevated}
              stroke={success}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE.x + CONCRETE.w / 2}
              y={CONCRETE.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcretePrototype
            </text>
            <line
              x1={CONCRETE.x}
              y1={CONCRETE.y + 32}
              x2={CONCRETE.x + CONCRETE.w}
              y2={CONCRETE.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 50}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + clone(): Prototype
            </text>
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 68}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              // 已有状态 a=1, b=2
            </text>
          </g>

          {/* ===== clone 创建箭头：ConcretePrototype → 新对象 ===== */}
          <line
            x1={CONCRETE.x + CONCRETE.w / 2}
            y1={CONCRETE.y + CONCRETE.h}
            x2={CLONE_OBJ.x + CLONE_OBJ.w / 2}
            y2={CLONE_OBJ.y - 2}
            stroke={success}
            strokeWidth="1.8"
            markerEnd="url(#proto-clone-arrow)"
          />
          <text
            x={CONCRETE.x + CONCRETE.w / 2 + 12}
            y={CONCRETE.y + CONCRETE.h + 30}
            fontSize="12"
            fontWeight="700"
            fill={success}
            fontFamily="monospace"
          >
            clone()
          </text>

          {/* ===== 新对象框（右，clone 结果） ===== */}
          <g>
            <rect
              x={CLONE_OBJ.x}
              y={CLONE_OBJ.y}
              width={CLONE_OBJ.w}
              height={CLONE_OBJ.h}
              rx="8"
              fill={success}
              fillOpacity="0.08"
              stroke={success}
              strokeWidth="1.6"
            />
            <text
              x={CLONE_OBJ.x + CLONE_OBJ.w / 2}
              y={CLONE_OBJ.y + 24}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              clone() → 新对象
            </text>
            <text
              x={CLONE_OBJ.x + CLONE_OBJ.w / 2}
              y={CLONE_OBJ.y + 44}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              直接复制完整状态
            </text>
          </g>

          {/* ===== 底部对比标注 ===== */}
          <text
            x={SOME_CLASS.x + SOME_CLASS.w / 2}
            y="372"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={warning}
          >
            耗时：重新走构造流程
          </text>
          <text
            x={CONCRETE.x + CONCRETE.w / 2}
            y="372"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={success}
          >
            快速：直接复制已有状态
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        原型模式通过克隆已有对象来创建新对象，避免重新走耗时的构造流程；适合构造代价大
        或需要保留大量已设置状态的场景，注意深拷贝与浅拷贝的选择。
      </figcaption>
    </figure>
  );
}
