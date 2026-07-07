/**
 * <StrategyPatternDiagram>：策略模式 UML 结构图（design-patterns 课程）。
 *
 * 展示 Strategy 接口 + 3 个具体策略（ConcreteStrategyA/B/C）+ Context 类的关系：
 *   - Context 持有一个 Strategy 引用（实线箭头标「持有」），暴露 setStrategy / executeStrategy
 *   - Strategy 是接口（虚线边框 + 斜体类名 + «interface» 构造型），声明 algorithm()
 *   - 3 个具体策略各自实现 algorithm()，以虚线 + 空心三角箭头（UML rake）指向 Strategy
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// Context 类框（左）
const CONTEXT = { x: 56, y: 84, w: 200, h: 124 };
// Strategy 接口框（中上）
const STRATEGY = { x: 300, y: 84, w: 168, h: 100 };
// 三个具体策略框（底部一行）
const CONCRETE_W = 160;
const CONCRETE_H = 100;
const CONCRETE_Y = 260;
// A / B / C 中心 x：B 与 Strategy 中心对齐，rake 主干落在 B 正上方
const CONCRETE_CENTERS = [204, 384, 564] as const;
// 实现关系 rake 的横向 bus 与主干 x
const BUS_Y = 232;
const STEM_X = 384;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function StrategyPatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="策略模式结构图。Context 类持有一个 Strategy 接口引用（实线箭头标「持有」），暴露 setStrategy 与 executeStrategy 方法；Strategy 是接口（虚线边框、斜体类名、«interface» 构造型），声明 algorithm 方法；ConcreteStrategyA/B/C 三个具体策略各自实现 algorithm，以虚线空心三角箭头指向 Strategy 表示实现关系。底部说明：Context 将算法的选择与使用解耦，客户端可在运行时切换策略。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口），UML realization */}
            <marker
              id="strategy-impl-arrow"
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
            {/* 关联 / 持有：实心三角箭头（指向被持有者） */}
            <marker
              id="strategy-holds-arrow"
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
            策略模式 · 结构图
          </text>

          {/* ===== Context 类框 ===== */}
          <g>
            <rect
              x={CONTEXT.x}
              y={CONTEXT.y}
              width={CONTEXT.w}
              height={CONTEXT.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            {/* 类名 */}
            <text
              x={CONTEXT.x + CONTEXT.w / 2}
              y={CONTEXT.y + 22}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Context
            </text>
            <line
              x1={CONTEXT.x}
              y1={CONTEXT.y + 32}
              x2={CONTEXT.x + CONTEXT.w}
              y2={CONTEXT.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            {/* 属性：持有 Strategy 引用 */}
            <text
              x={CONTEXT.x + 14}
              y={CONTEXT.y + 52}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - strategy: Strategy
            </text>
            <line
              x1={CONTEXT.x}
              y1={CONTEXT.y + 64}
              x2={CONTEXT.x + CONTEXT.w}
              y2={CONTEXT.y + 64}
              stroke={border}
              strokeWidth="1"
            />
            {/* 方法 */}
            <text
              x={CONTEXT.x + 14}
              y={CONTEXT.y + 86}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + setStrategy(s)
            </text>
            <text
              x={CONTEXT.x + 14}
              y={CONTEXT.y + 108}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + executeStrategy()
            </text>
          </g>

          {/* ===== 持有 关联箭头：Context → Strategy ===== */}
          <line
            x1={CONTEXT.x + CONTEXT.w}
            y1={CONTEXT.y + 22}
            x2={STRATEGY.x - 2}
            y2={STRATEGY.y + 22}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#strategy-holds-arrow)"
          />
          <text
            x={(CONTEXT.x + CONTEXT.w + STRATEGY.x) / 2}
            y={CONTEXT.y + 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== Strategy 接口框（虚线边框 + 斜体类名 + «interface»） ===== */}
          <g>
            <rect
              x={STRATEGY.x}
              y={STRATEGY.y}
              width={STRATEGY.w}
              height={STRATEGY.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={STRATEGY.x + STRATEGY.w / 2}
              y={STRATEGY.y + 20}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={STRATEGY.x + STRATEGY.w / 2}
              y={STRATEGY.y + 38}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Strategy
            </text>
            <line
              x1={STRATEGY.x}
              y1={STRATEGY.y + 50}
              x2={STRATEGY.x + STRATEGY.w}
              y2={STRATEGY.y + 50}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={STRATEGY.x + 14}
              y={STRATEGY.y + 72}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + algorithm()
            </text>
          </g>

          {/* ===== 实现关系 rake：三具体策略 → Strategy（虚线 + 空心三角） ===== */}
          {/* 横向 bus：连接三个具体策略的 drop */}
          <line
            x1={CONCRETE_CENTERS[0]}
            y1={BUS_Y}
            x2={CONCRETE_CENTERS[2]}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          {/* 主干：bus → Strategy 底部（空心三角箭头指向接口） */}
          <line
            x1={STEM_X}
            y1={BUS_Y}
            x2={STEM_X}
            y2={STRATEGY.y + STRATEGY.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#strategy-impl-arrow)"
          />
          {/* 三条 drop：每个具体策略顶部 → bus */}
          {CONCRETE_CENTERS.map((cx) => (
            <line
              key={`drop-${cx}`}
              x1={cx}
              y1={CONCRETE_Y}
              x2={cx}
              y2={BUS_Y}
              stroke={accent}
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />
          ))}
          {/* implements 构造型标注 */}
          <text
            x={STEM_X + 14}
            y={BUS_Y - 14}
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            «implements»
          </text>

          {/* ===== 三个具体策略框 ===== */}
          {(["A", "B", "C"] as const).map((tag, i) => {
            const cx = CONCRETE_CENTERS[i];
            const x = cx - CONCRETE_W / 2;
            return (
              <g key={tag}>
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
                  y={CONCRETE_Y + 24}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={primary}
                  fontFamily="monospace"
                >
                  ConcreteStrategy{tag}
                </text>
                <line
                  x1={x}
                  y1={CONCRETE_Y + 34}
                  x2={x + CONCRETE_W}
                  y2={CONCRETE_Y + 34}
                  stroke={border}
                  strokeWidth="1"
                />
                <text
                  x={x + 14}
                  y={CONCRETE_Y + 56}
                  fontSize="12"
                  fill={primary}
                  fontFamily="monospace"
                >
                  + algorithm()
                </text>
                <text
                  x={x + 14}
                  y={CONCRETE_Y + 80}
                  fontSize="11"
                  fill={secondary}
                  fontStyle="italic"
                >
                  {`// 算法 ${tag} 的实现`}
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="396"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            Context 将算法的选择和使用解耦——客户端可在运行时切换策略
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Context 只依赖 Strategy
        接口：把「选用哪个算法」与「如何执行算法」分开，新增算法只需新增一个具体策略类，无需改动
        Context。
      </figcaption>
    </figure>
  );
}
