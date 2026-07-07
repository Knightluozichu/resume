/**
 * <StatePatternDiagram>：状态模式 UML 结构图 + 状态转换示意（design-patterns 课程）。
 *
 * 上半部分 UML 结构图：
 *   - Context 类（左）持有 state: State 引用，暴露 setState() / request()
 *   - State 接口（中上，虚线边框 + 斜体类名 + «interface» 构造型），声明 handle()
 *   - ConcreteStateA / ConcreteStateB（底部左右）各自实现 handle()
 *   - Context「持有」→ State：实线实心三角箭头
 *   - 具体状态「实现」→ State：虚线 + 空心三角箭头（UML realization rake）
 *
 * 下半部分状态转换示意：
 *   - StateA / StateB 两个圆角矩形（药丸）
 *   - 上弧 StateA → StateB 标「条件 X 触发」，下弧 StateB → StateA 标「条件 Y 触发」
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×540（≥660）、四周留白 ≥32、
 * 文字距边界 ≥24、字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、
 * 三段垂直分层（标题 / 主体 / 底部总结）。间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 540;

// ===== 上半部分：UML 结构图 =====
// Context 类框（左）
const CONTEXT = { x: 48, y: 76, w: 184, h: 140 };
// State 接口框（中上，虚线边框 + 斜体）
const STATE = { x: 296, y: 76, w: 176, h: 104 };
// 两个具体状态框（底部左右，尺寸统一）
const CONCRETE_W = 176;
const CONCRETE_H = 96;
const CONCRETE_Y = 264;
// A / B 中心 x：以 State 中心 (384) 为对称轴
const CONCRETE_CENTERS = [288, 480] as const;
// 实现关系 rake 的横向 bus 与主干
const BUS_Y = 240;
const STEM_X = 384;

// ===== 下半部分：状态转换示意 =====
// 两个状态药丸（圆角矩形）
const PILL_W = 128;
const PILL_H = 52;
const PILL_Y = 416;
const PILL_CENTERS = [232, 488] as const;
// 上下两条弧的起终点 y（药丸侧边中点上下各 12px）
const ARC_UPPER_Y = 430;
const ARC_LOWER_Y = 454;
// 弧控制点（关于药丸中点 442 对称）
const ARC_UPPER_CTRL = { x: 360, y: 408 };
const ARC_LOWER_CTRL = { x: 360, y: 476 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function StatePatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="状态模式结构图与状态转换示意图。上半部分 UML 结构图：左侧 Context 类持有 state State 引用，暴露 setState 与 request 方法，以实线箭头标「持有」指向中间的 State 接口（虚线边框、斜体类名、interface 构造型，声明 handle 方法）；底部 ConcreteStateA 与 ConcreteStateB 两个具体状态各自实现 handle，以虚线空心三角箭头指向 State 表示实现关系。下半部分状态转换示意：StateA 与 StateB 两个圆角矩形用弯曲箭头连接，上弧标注「条件 X 触发」表示由 A 转到 B，下弧标注「条件 Y 触发」表示由 B 转回 A。底部说明：对象的行为随内部状态改变而改变——看起来像换了一个人。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口），UML realization */}
            <marker
              id="state-impl-arrow"
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
              id="state-holds-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
            {/* 状态转换：实心三角箭头（指向目标状态） */}
            <marker
              id="state-transition-arrow"
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
            y="44"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            状态模式 · 结构图与状态转换
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
            <text
              x={CONTEXT.x + CONTEXT.w / 2}
              y={CONTEXT.y + 24}
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
              y1={CONTEXT.y + 36}
              x2={CONTEXT.x + CONTEXT.w}
              y2={CONTEXT.y + 36}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONTEXT.x + 14}
              y={CONTEXT.y + 58}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - state: State
            </text>
            <line
              x1={CONTEXT.x}
              y1={CONTEXT.y + 70}
              x2={CONTEXT.x + CONTEXT.w}
              y2={CONTEXT.y + 70}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONTEXT.x + 14}
              y={CONTEXT.y + 92}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + setState(s)
            </text>
            <text
              x={CONTEXT.x + 14}
              y={CONTEXT.y + 114}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + request()
            </text>
          </g>

          {/* ===== 持有 关联箭头：Context → State ===== */}
          <line
            x1={CONTEXT.x + CONTEXT.w}
            y1={CONTEXT.y + 24}
            x2={STATE.x - 2}
            y2={STATE.y + 24}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#state-holds-arrow)"
          />
          <text
            x={(CONTEXT.x + CONTEXT.w + STATE.x) / 2}
            y={CONTEXT.y + 14}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== State 接口框（虚线边框 + 斜体类名 + «interface»） ===== */}
          <g>
            <rect
              x={STATE.x}
              y={STATE.y}
              width={STATE.w}
              height={STATE.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={STATE.x + STATE.w / 2}
              y={STATE.y + 20}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={STATE.x + STATE.w / 2}
              y={STATE.y + 40}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              State
            </text>
            <line
              x1={STATE.x}
              y1={STATE.y + 52}
              x2={STATE.x + STATE.w}
              y2={STATE.y + 52}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={STATE.x + 14}
              y={STATE.y + 74}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + handle()
            </text>
          </g>

          {/* ===== 实现关系 rake：两具体状态 → State（虚线 + 空心三角） ===== */}
          {/* 横向 bus：连接两个具体状态的 drop */}
          <line
            x1={CONCRETE_CENTERS[0]}
            y1={BUS_Y}
            x2={CONCRETE_CENTERS[1]}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          {/* 主干：bus → State 底部（空心三角箭头指向接口） */}
          <line
            x1={STEM_X}
            y1={BUS_Y}
            x2={STEM_X}
            y2={STATE.y + STATE.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#state-impl-arrow)"
          />
          {/* 两条 drop：每个具体状态顶部 → bus */}
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
            x={STEM_X + 12}
            y={BUS_Y - 12}
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            «implements»
          </text>

          {/* ===== 两个具体状态框 ===== */}
          {(["A", "B"] as const).map((tag, i) => {
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
                  ConcreteState{tag}
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
                  y={CONCRETE_Y + 58}
                  fontSize="12"
                  fill={primary}
                  fontFamily="monospace"
                >
                  + handle()
                </text>
                <text
                  x={x + 14}
                  y={CONCRETE_Y + 80}
                  fontSize="11"
                  fill={secondary}
                  fontStyle="italic"
                >
                  {`// 状态 ${tag} 的行为`}
                </text>
              </g>
            );
          })}

          {/* ===== 上下两部分分隔线 ===== */}
          <line
            x1="48"
            y1="376"
            x2={VIEW_W - 48}
            y2="376"
            stroke={border}
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* ===== 状态转换：StateA / StateB 药丸 ===== */}
          {(["StateA", "StateB"] as const).map((label, i) => {
            const cx = PILL_CENTERS[i];
            const x = cx - PILL_W / 2;
            return (
              <g key={`pill-${label}`}>
                <rect
                  x={x}
                  y={PILL_Y}
                  width={PILL_W}
                  height={PILL_H}
                  rx={PILL_H / 2}
                  fill={accent}
                  fillOpacity="0.08"
                  stroke={accent}
                  strokeWidth="1.8"
                />
                <text
                  x={cx}
                  y={PILL_Y + PILL_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={accent}
                  fontFamily="monospace"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* ===== 上弧：StateA → StateB（条件 X 触发） ===== */}
          <path
            d={`M ${PILL_CENTERS[0] + PILL_W / 2} ${ARC_UPPER_Y} Q ${ARC_UPPER_CTRL.x} ${ARC_UPPER_CTRL.y} ${PILL_CENTERS[1] - PILL_W / 2 - 2} ${ARC_UPPER_Y}`}
            fill="none"
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#state-transition-arrow)"
          />
          <text
            x={(PILL_CENTERS[0] + PILL_CENTERS[1]) / 2}
            y="400"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            条件 X 触发
          </text>

          {/* ===== 下弧：StateB → StateA（条件 Y 触发） ===== */}
          <path
            d={`M ${PILL_CENTERS[1] - PILL_W / 2} ${ARC_LOWER_Y} Q ${ARC_LOWER_CTRL.x} ${ARC_LOWER_CTRL.y} ${PILL_CENTERS[0] + PILL_W / 2 + 2} ${ARC_LOWER_Y}`}
            fill="none"
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#state-transition-arrow)"
          />
          <text
            x={(PILL_CENTERS[0] + PILL_CENTERS[1]) / 2}
            y="488"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            条件 Y 触发
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="512"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            状态模式：对象的行为随内部状态改变而改变——看起来像换了一个人
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Context 将「当前状态」委托给一个 State
        对象：状态切换只需调用 setState 换一个具体状态，同一 request
        在不同状态下表现出不同行为——状态转换逻辑集中在具体状态类内部，Context 无需感知切换细节。
      </figcaption>
    </figure>
  );
}
