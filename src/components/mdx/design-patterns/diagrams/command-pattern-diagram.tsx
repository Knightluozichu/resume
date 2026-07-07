/**
 * <CommandPatternDiagram>：命令模式 UML 结构图（design-patterns 课程）。
 *
 * 展示命令模式的完整调用链条：
 *   - 顶部居中 Command 接口（虚线边框 + 斜体类名 + «interface» 构造型），声明 execute()
 *   - 左侧 Invoker 类，持有 commands 列表，暴露 setCommand / executeCommand
 *   - 右侧 ConcreteCommand 类，持有 receiver 引用，实现 execute()（内部调用 receiver.action()）
 *   - 底部右侧 Receiver 类，提供 action()
 *   - 实线实心箭头 = 持有（Invoker → Command；ConcreteCommand → Receiver）
 *   - 虚线空心三角箭头 = 实现接口（ConcreteCommand → Command）
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// Command 接口框（顶部居中）
const COMMAND = { x: 276, y: 64, w: 168, h: 88 };
// Invoker 类框（左）
const INVOKER = { x: 40, y: 140, w: 192, h: 140 };
// ConcreteCommand 类框（右）
const CONCRETE = { x: 488, y: 140, w: 192, h: 140 };
// Receiver 类框（底部右侧）
const RECEIVER = { x: 488, y: 308, w: 192, h: 72 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CommandPatternDiagram() {
  // ConcreteCommand / Receiver 共用中心 x（垂直「持有」箭头落在此处）
  const concreteCx = CONCRETE.x + CONCRETE.w / 2; // 584

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="命令模式结构图。顶部居中是 Command 接口（虚线边框、斜体类名、«interface» 构造型），声明 execute 方法。左侧 Invoker 类持有 commands 命令列表，暴露 setCommand 与 executeCommand 方法，以实线实心箭头指向 Command 表示持有关系。右侧 ConcreteCommand 类持有 receiver 引用，实现 execute 方法（内部调用 receiver.action），以虚线空心三角箭头指向 Command 表示实现关系。底部右侧 Receiver 类提供 action 方法，ConcreteCommand 以实线实心箭头指向 Receiver 表示持有关系。底部说明：将请求封装为对象——调用者不需要知道接收者是谁，也不需要知道请求如何被执行。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口），UML realization */}
            <marker
              id="command-impl-arrow"
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
              id="command-holds-arrow"
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
            命令模式 · 结构图
          </text>

          {/* ===== Command 接口框（顶部居中） ===== */}
          <g>
            <rect
              x={COMMAND.x}
              y={COMMAND.y}
              width={COMMAND.w}
              height={COMMAND.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={COMMAND.x + COMMAND.w / 2}
              y={COMMAND.y + 20}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={COMMAND.x + COMMAND.w / 2}
              y={COMMAND.y + 38}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Command
            </text>
            <line
              x1={COMMAND.x}
              y1={COMMAND.y + 50}
              x2={COMMAND.x + COMMAND.w}
              y2={COMMAND.y + 50}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={COMMAND.x + 14}
              y={COMMAND.y + 72}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + execute()
            </text>
          </g>

          {/* ===== Invoker 类框（左） ===== */}
          <g>
            <rect
              x={INVOKER.x}
              y={INVOKER.y}
              width={INVOKER.w}
              height={INVOKER.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={INVOKER.x + INVOKER.w / 2}
              y={INVOKER.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Invoker
            </text>
            <line
              x1={INVOKER.x}
              y1={INVOKER.y + 34}
              x2={INVOKER.x + INVOKER.w}
              y2={INVOKER.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            {/* 属性：命令列表 */}
            <text
              x={INVOKER.x + 14}
              y={INVOKER.y + 54}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - commands: Command[]
            </text>
            <line
              x1={INVOKER.x}
              y1={INVOKER.y + 66}
              x2={INVOKER.x + INVOKER.w}
              y2={INVOKER.y + 66}
              stroke={border}
              strokeWidth="1"
            />
            {/* 方法 */}
            <text
              x={INVOKER.x + 14}
              y={INVOKER.y + 88}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + setCommand(c)
            </text>
            <text
              x={INVOKER.x + 14}
              y={INVOKER.y + 110}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + executeCommand()
            </text>
          </g>

          {/* ===== 持有 关联箭头：Invoker → Command ===== */}
          <line
            x1={INVOKER.x + INVOKER.w}
            y1={INVOKER.y + 28}
            x2={COMMAND.x - 2}
            y2={COMMAND.y + COMMAND.h - 16}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#command-holds-arrow)"
          />
          <text
            x={(INVOKER.x + INVOKER.w + COMMAND.x) / 2}
            y={COMMAND.y + COMMAND.h - 24}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== ConcreteCommand 类框（右） ===== */}
          <g>
            <rect
              x={CONCRETE.x}
              y={CONCRETE.y}
              width={CONCRETE.w}
              height={CONCRETE.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={concreteCx}
              y={CONCRETE.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteCommand
            </text>
            <line
              x1={CONCRETE.x}
              y1={CONCRETE.y + 34}
              x2={CONCRETE.x + CONCRETE.w}
              y2={CONCRETE.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            {/* 属性：receiver 引用 */}
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 54}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - receiver: Receiver
            </text>
            <line
              x1={CONCRETE.x}
              y1={CONCRETE.y + 66}
              x2={CONCRETE.x + CONCRETE.w}
              y2={CONCRETE.y + 66}
              stroke={border}
              strokeWidth="1"
            />
            {/* 方法 */}
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 88}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + execute()
            </text>
            {/* 注释：内部委托给 receiver.action() */}
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 110}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              // receiver.action()
            </text>
          </g>

          {/* ===== 实现关系箭头：ConcreteCommand → Command（虚线 + 空心三角） ===== */}
          <line
            x1={CONCRETE.x}
            y1={CONCRETE.y + 28}
            x2={COMMAND.x + COMMAND.w + 2}
            y2={COMMAND.y + COMMAND.h - 16}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#command-impl-arrow)"
          />
          <text
            x={(CONCRETE.x + COMMAND.x + COMMAND.w) / 2}
            y={COMMAND.y + COMMAND.h - 24}
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill={secondary}
          >
            实现
          </text>

          {/* ===== Receiver 类框（底部右侧） ===== */}
          <g>
            <rect
              x={RECEIVER.x}
              y={RECEIVER.y}
              width={RECEIVER.w}
              height={RECEIVER.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={RECEIVER.x + RECEIVER.w / 2}
              y={RECEIVER.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Receiver
            </text>
            <line
              x1={RECEIVER.x}
              y1={RECEIVER.y + 34}
              x2={RECEIVER.x + RECEIVER.w}
              y2={RECEIVER.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={RECEIVER.x + 14}
              y={RECEIVER.y + 56}
              fontSize="12"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              + action()
            </text>
          </g>

          {/* ===== 持有 关联箭头：ConcreteCommand → Receiver ===== */}
          <line
            x1={concreteCx}
            y1={CONCRETE.y + CONCRETE.h}
            x2={concreteCx}
            y2={RECEIVER.y - 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#command-holds-arrow)"
          />
          <text
            x={concreteCx + 8}
            y={(CONCRETE.y + CONCRETE.h + RECEIVER.y) / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="412"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            将请求封装为对象——调用者不需要知道接收者是谁，也不需要知道请求如何被执行
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Invoker 只依赖 Command
        接口：把「发出请求」与「谁来执行、如何执行」彻底解耦。ConcreteCommand
        绑定一个 Receiver 并在 execute() 中转发调用——新增命令只需新增一个 ConcreteCommand
        类，Invoker 与 Receiver 都无需改动。
      </figcaption>
    </figure>
  );
}
