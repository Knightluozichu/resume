/**
 * <TemplateMethodDiagram>：模板方法模式骨架图（design-patterns 课程）。
 *
 *   - 顶部：AbstractClass，含 templateMethod()（{final} 不可覆写）与
 *     primitiveOp1() / primitiveOp2()（{abstract}，子类实现）
 *   - 左下 / 右下：ConcreteClassA / ConcreteClassB，各自实现两个原语操作
 *   - 继承关系：实线 + 空心三角（UML generalization），经 rake 汇聚到 AbstractClass
 *   - 底部执行流程：① templateMethod() → ② primitiveOp1() → ③ primitiveOp2()
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层
 * （标题 / 继承结构 / 执行流程+总结）。间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// AbstractClass 框（顶部居中）
const ABSTRACT = { x: 220, y: 54, w: 280, h: 120 };
// 两个具体类框（底部左右，尺寸统一）
const CONCRETE_W = 240;
const CONCRETE_H = 84;
const CONCRETE_Y = 210;
const CONCRETE_CENTERS = [192, 528] as const; // A / B 中心 x
// 继承 rake 的横向 bus 与主干
const BUS_Y = 200;
const STEM_X = 360;

// 底部执行流程三步
const FLOW_W = 148;
const FLOW_H = 32;
const FLOW_Y = 336;
const FLOW_XS = [78, 286, 494] as const;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function TemplateMethodDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模板方法模式骨架图。顶部 AbstractClass 包含 templateMethod 方法（标注 final 不可覆写）以及 primitiveOp1、primitiveOp2 两个方法（标注 abstract 由子类实现）。底部 ConcreteClassA 与 ConcreteClassB 各自实现 primitiveOp1 与 primitiveOp2，以实线空心三角箭头经一条汇流线指向 AbstractClass 表示继承关系。底部执行流程：第一步 templateMethod 调用第二步 primitiveOp1，再调用第三步 primitiveOp2，用序号标注步骤。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 继承 / 泛化：空心三角箭头（指向父类） */}
            <marker
              id="tm-inherit-arrow"
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
            {/* 流程箭头 */}
            <marker
              id="tm-flow-arrow"
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
            y="34"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            模板方法模式 · 算法骨架
          </text>

          {/* ===== AbstractClass 框 ===== */}
          <g>
            <rect
              x={ABSTRACT.x}
              y={ABSTRACT.y}
              width={ABSTRACT.w}
              height={ABSTRACT.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={ABSTRACT.x + ABSTRACT.w / 2}
              y={ABSTRACT.y + 20}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «abstract»
            </text>
            <text
              x={ABSTRACT.x + ABSTRACT.w / 2}
              y={ABSTRACT.y + 38}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              AbstractClass
            </text>
            <line
              x1={ABSTRACT.x}
              y1={ABSTRACT.y + 48}
              x2={ABSTRACT.x + ABSTRACT.w}
              y2={ABSTRACT.y + 48}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ABSTRACT.x + 16}
              y={ABSTRACT.y + 68}
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              + templateMethod()
            </text>
            <text
              x={ABSTRACT.x + ABSTRACT.w - 16}
              y={ABSTRACT.y + 68}
              textAnchor="end"
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"{final}"}
            </text>
            <line
              x1={ABSTRACT.x}
              y1={ABSTRACT.y + 80}
              x2={ABSTRACT.x + ABSTRACT.w}
              y2={ABSTRACT.y + 80}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ABSTRACT.x + 16}
              y={ABSTRACT.y + 100}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + primitiveOp1()
            </text>
            <text
              x={ABSTRACT.x + ABSTRACT.w - 16}
              y={ABSTRACT.y + 100}
              textAnchor="end"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"{abstract}"}
            </text>
            <text
              x={ABSTRACT.x + 16}
              y={ABSTRACT.y + 116}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + primitiveOp2()
            </text>
          </g>

          {/* ===== 继承 rake：两具体类 → AbstractClass（实线空心三角） ===== */}
          <line
            x1={CONCRETE_CENTERS[0]}
            y1={BUS_Y}
            x2={CONCRETE_CENTERS[1]}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
          />
          <line
            x1={STEM_X}
            y1={BUS_Y}
            x2={STEM_X}
            y2={ABSTRACT.y + ABSTRACT.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#tm-inherit-arrow)"
          />
          {CONCRETE_CENTERS.map((cx) => (
            <line
              key={`drop-${cx}`}
              x1={cx}
              y1={CONCRETE_Y}
              x2={cx}
              y2={BUS_Y}
              stroke={accent}
              strokeWidth="1.6"
            />
          ))}
          <text
            x={STEM_X + 10}
            y={BUS_Y - 10}
            fontSize="11"
            fontStyle="italic"
            fill={secondary}
          >
            extends
          </text>

          {/* ===== 两个具体类框 ===== */}
          {(["A", "B"] as const).map((tag, i) => {
            const cx = CONCRETE_CENTERS[i];
            const x = cx - CONCRETE_W / 2;
            return (
              <g key={`concrete-${tag}`}>
                <rect
                  x={x}
                  y={CONCRETE_Y}
                  width={CONCRETE_W}
                  height={CONCRETE_H}
                  rx="10"
                  fill={elevated}
                  stroke={border}
                  strokeWidth="1.8"
                />
                <text
                  x={cx}
                  y={CONCRETE_Y + 22}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {`ConcreteClass${tag}`}
                </text>
                <line
                  x1={x}
                  y1={CONCRETE_Y + 32}
                  x2={x + CONCRETE_W}
                  y2={CONCRETE_Y + 32}
                  stroke={border}
                  strokeWidth="1"
                />
                <text
                  x={x + 16}
                  y={CONCRETE_Y + 50}
                  fontSize="12"
                  fill={primary}
                  fontFamily="monospace"
                >
                  + primitiveOp1()
                </text>
                <text
                  x={x + 16}
                  y={CONCRETE_Y + 68}
                  fontSize="12"
                  fill={primary}
                  fontFamily="monospace"
                >
                  + primitiveOp2()
                </text>
              </g>
            );
          })}

          {/* ===== 分隔线 ===== */}
          <line
            x1="40"
            y1="312"
            x2={VIEW_W - 40}
            y2="312"
            stroke={border}
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* ===== 执行流程标签 ===== */}
          <text
            x={VIEW_W / 2}
            y="328"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            执行流程：templateMethod 编排步骤
          </text>

          {/* ===== 流程连线 ① → ② → ③ ===== */}
          <line
            x1={FLOW_XS[0] + FLOW_W}
            y1={FLOW_Y + FLOW_H / 2}
            x2={FLOW_XS[1] - 2}
            y2={FLOW_Y + FLOW_H / 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#tm-flow-arrow)"
          />
          <line
            x1={FLOW_XS[1] + FLOW_W}
            y1={FLOW_Y + FLOW_H / 2}
            x2={FLOW_XS[2] - 2}
            y2={FLOW_Y + FLOW_H / 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#tm-flow-arrow)"
          />

          {/* ===== 流程三步框 ===== */}
          {/* ① templateMethod()（入口，accent 高亮） */}
          <rect
            x={FLOW_XS[0]}
            y={FLOW_Y}
            width={FLOW_W}
            height={FLOW_H}
            rx="8"
            fill={accent}
            fillOpacity="0.12"
            stroke={accent}
            strokeWidth="1.8"
          />
          <text
            x={FLOW_XS[0] + FLOW_W / 2}
            y={FLOW_Y + FLOW_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={accent}
            fontFamily="monospace"
          >
            ① templateMethod()
          </text>

          {/* ② primitiveOp1() */}
          <rect
            x={FLOW_XS[1]}
            y={FLOW_Y}
            width={FLOW_W}
            height={FLOW_H}
            rx="8"
            fill={elevated}
            stroke={border}
            strokeWidth="1.8"
          />
          <text
            x={FLOW_XS[1] + FLOW_W / 2}
            y={FLOW_Y + FLOW_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
            fontFamily="monospace"
          >
            ② primitiveOp1()
          </text>

          {/* ③ primitiveOp2() */}
          <rect
            x={FLOW_XS[2]}
            y={FLOW_Y}
            width={FLOW_W}
            height={FLOW_H}
            rx="8"
            fill={elevated}
            stroke={border}
            strokeWidth="1.8"
          />
          <text
            x={FLOW_XS[2] + FLOW_W / 2}
            y={FLOW_Y + FLOW_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
            fontFamily="monospace"
          >
            ③ primitiveOp2()
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="392"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            模板方法：父类定义算法骨架，子类填充具体步骤——复用结构，变化细节
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        templateMethod() 用 final 锁定执行顺序，把可变的 primitiveOp
        延迟到子类实现。新增一种算法变体只需新建一个子类覆写原语操作——骨架复用、细节可变，是「好莱坞原则」的典型应用。
      </figcaption>
    </figure>
  );
}
