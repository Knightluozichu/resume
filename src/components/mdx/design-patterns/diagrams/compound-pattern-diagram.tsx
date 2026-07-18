/**
 * <CompoundPatternDiagram>：MVC 复合模式图解（design-patterns 课程）。
 *
 * 展示 MVC 如何组合三个模式，产生协同效应：
 *   - Model（左侧，被观察者）—— Observer 模式：notifyObservers 通知 View
 *   - View（右上，观察者 + Composite 树节点）—— 订阅 Model；内部是树形结构
 *   - Controller（右下，Strategy）—— View 持有 Controller 引用，可替换策略
 *   - 颜色标注三个模式作用区域：
 *       Observer = success 绿、Strategy = accent 紫、Composite = warning 黄
 *   - 箭头：Model→View（notify，Observer）；View→Controller（委托，Strategy）；
 *     View 内部标注树形结构（Composite）
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层
 * （标题 / 主体三框 + 箭头 / 图例 + 总结）。间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// Model 框（左侧，被观察者，Observer 模式 success 绿）
const MODEL = { x: 44, y: 80, w: 208, h: 172 };
// View 框（右上，观察者 + Composite 树节点）
const VIEW = { x: 296, y: 80, w: 380, h: 132 };
// Controller 框（右下，Strategy，accent 紫）
const CONTROLLER = { x: 296, y: 252, w: 380, h: 104 };

// View 内部 Composite 小树节点（warning 黄）
const TREE_ROOT = { cx: 570, cy: 120, w: 56, h: 22 };
const TREE_CHILD1 = { cx: 516, cy: 162, w: 56, h: 20 };
const TREE_CHILD2 = { cx: 624, cy: 162, w: 56, h: 20 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

export function CompoundPatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MVC 复合模式图解。左侧 Model 是被观察者（绿色边框，Observer 模式），通过 notifyObservers 通知右侧上方的 View。View 既是观察者（订阅 Model，绿色标注），内部右侧又是 Composite 树形结构（黄色），根节点 View 下挂 Button 和 List 两个子节点。右侧下方的 Controller 是 Strategy（紫色边框），View 持有 Controller 引用并可替换策略，通过委托箭头（紫色）指向 Controller。底部图例用三种颜色说明三个模式的作用区域，总结文字：MVC = Observer + Strategy + Composite，模式组合产生协同效应。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* Observer 通知箭头：实心三角，success 绿 */}
            <marker
              id="compound-notify-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={success} />
            </marker>
            {/* Strategy 委托箭头：实心三角，accent 紫 */}
            <marker
              id="compound-delegate-arrow"
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
            MVC 复合模式 · 模式组合协同
          </text>

          {/* ===== Model 框（左侧，被观察者，Observer 模式 success 绿） ===== */}
          <g>
            <rect
              x={MODEL.x}
              y={MODEL.y}
              width={MODEL.w}
              height={MODEL.h}
              rx="10"
              fill={success}
              fillOpacity="0.06"
              stroke={success}
              strokeWidth="1.8"
            />
            <text
              x={MODEL.x + MODEL.w / 2}
              y={MODEL.y + 22}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Model
            </text>
            <line
              x1={MODEL.x}
              y1={MODEL.y + 32}
              x2={MODEL.x + MODEL.w}
              y2={MODEL.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={MODEL.x + 14}
              y={MODEL.y + 52}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - observers: Observer[]
            </text>
            <line
              x1={MODEL.x}
              y1={MODEL.y + 64}
              x2={MODEL.x + MODEL.w}
              y2={MODEL.y + 64}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <text
              x={MODEL.x + 14}
              y={MODEL.y + 84}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + registerObserver(o)
            </text>
            <text
              x={MODEL.x + 14}
              y={MODEL.y + 104}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + removeObserver(o)
            </text>
            <text
              x={MODEL.x + 14}
              y={MODEL.y + 124}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + notifyObservers()
            </text>
            <text
              x={MODEL.x + 14}
              y={MODEL.y + 148}
              fontSize="11"
              fill={success}
              fontStyle="italic"
            >
              {"// 被观察者（Subject）"}
            </text>
          </g>

          {/* ===== View 框（右上，观察者 + Composite 树节点） ===== */}
          <g>
            <rect
              x={VIEW.x}
              y={VIEW.y}
              width={VIEW.w}
              height={VIEW.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            {/* 中间竖虚线分隔左右两半 */}
            <line
              x1={VIEW.x + 168}
              y1={VIEW.y + 12}
              x2={VIEW.x + 168}
              y2={VIEW.y + VIEW.h - 12}
              stroke={border}
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            {/* 左半：观察者部分（success 绿标注） */}
            <text
              x={VIEW.x + 84}
              y={VIEW.y + 22}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              View
            </text>
            <line
              x1={VIEW.x}
              y1={VIEW.y + 32}
              x2={VIEW.x + 168}
              y2={VIEW.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={VIEW.x + 14}
              y={VIEW.y + 52}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + update()
            </text>
            <text
              x={VIEW.x + 14}
              y={VIEW.y + 72}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + display()
            </text>
            <text
              x={VIEW.x + 14}
              y={VIEW.y + 96}
              fontSize="11"
              fill={success}
              fontStyle="italic"
            >
              {"// 观察者"}
            </text>

            {/* 右半：Composite 树（warning 黄） */}
            <text
              x={TREE_ROOT.cx}
              y={VIEW.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={warning}
              fontStyle="italic"
            >
              Composite 树
            </text>
            {/* 树连线：root → child1 / child2 */}
            <line
              x1={TREE_ROOT.cx}
              y1={TREE_ROOT.cy + TREE_ROOT.h / 2}
              x2={TREE_CHILD1.cx}
              y2={TREE_CHILD1.cy - TREE_CHILD1.h / 2}
              stroke={warning}
              strokeWidth="1.4"
            />
            <line
              x1={TREE_ROOT.cx}
              y1={TREE_ROOT.cy + TREE_ROOT.h / 2}
              x2={TREE_CHILD2.cx}
              y2={TREE_CHILD2.cy - TREE_CHILD2.h / 2}
              stroke={warning}
              strokeWidth="1.4"
            />
            {/* root 节点 */}
            <rect
              x={TREE_ROOT.cx - TREE_ROOT.w / 2}
              y={TREE_ROOT.cy - TREE_ROOT.h / 2}
              width={TREE_ROOT.w}
              height={TREE_ROOT.h}
              rx="5"
              fill={warning}
              fillOpacity="0.14"
              stroke={warning}
              strokeWidth="1.6"
            />
            <text
              x={TREE_ROOT.cx}
              y={TREE_ROOT.cy + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              View
            </text>
            {/* child1 节点 */}
            <rect
              x={TREE_CHILD1.cx - TREE_CHILD1.w / 2}
              y={TREE_CHILD1.cy - TREE_CHILD1.h / 2}
              width={TREE_CHILD1.w}
              height={TREE_CHILD1.h}
              rx="4"
              fill={warning}
              fillOpacity="0.1"
              stroke={warning}
              strokeWidth="1.4"
            />
            <text
              x={TREE_CHILD1.cx}
              y={TREE_CHILD1.cy + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={secondary}
              fontFamily="monospace"
            >
              Button
            </text>
            {/* child2 节点 */}
            <rect
              x={TREE_CHILD2.cx - TREE_CHILD2.w / 2}
              y={TREE_CHILD2.cy - TREE_CHILD2.h / 2}
              width={TREE_CHILD2.w}
              height={TREE_CHILD2.h}
              rx="4"
              fill={warning}
              fillOpacity="0.1"
              stroke={warning}
              strokeWidth="1.4"
            />
            <text
              x={TREE_CHILD2.cx}
              y={TREE_CHILD2.cy + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={secondary}
              fontFamily="monospace"
            >
              List
            </text>
          </g>

          {/* ===== Controller 框（右下，Strategy，accent 紫） ===== */}
          <g>
            <rect
              x={CONTROLLER.x}
              y={CONTROLLER.y}
              width={CONTROLLER.w}
              height={CONTROLLER.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={CONTROLLER.x + CONTROLLER.w / 2}
              y={CONTROLLER.y + 22}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              Controller
            </text>
            <line
              x1={CONTROLLER.x}
              y1={CONTROLLER.y + 32}
              x2={CONTROLLER.x + CONTROLLER.w}
              y2={CONTROLLER.y + 32}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={CONTROLLER.x + 14}
              y={CONTROLLER.y + 52}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + handleInput(event)
            </text>
            <text
              x={CONTROLLER.x + 14}
              y={CONTROLLER.y + 76}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"// Strategy：View 持有引用，可替换"}
            </text>
          </g>

          {/* ===== Model→View 箭头（notify，Observer 模式 success 绿） ===== */}
          <line
            x1={MODEL.x + MODEL.w}
            y1={MODEL.y + 56}
            x2={VIEW.x - 2}
            y2={VIEW.y + 56}
            stroke={success}
            strokeWidth="1.8"
            markerEnd="url(#compound-notify-arrow)"
          />
          <text
            x={(MODEL.x + MODEL.w + VIEW.x) / 2}
            y={MODEL.y + 48}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={success}
            fontFamily="monospace"
          >
            notify()
          </text>
          <text
            x={(MODEL.x + MODEL.w + VIEW.x) / 2}
            y={MODEL.y + 72}
            textAnchor="middle"
            fontSize="11"
            fill={success}
            fontStyle="italic"
          >
            Observer
          </text>

          {/* ===== View→Controller 箭头（委托，Strategy 模式 accent 紫） ===== */}
          <line
            x1={VIEW.x + VIEW.w / 2}
            y1={VIEW.y + VIEW.h}
            x2={VIEW.x + VIEW.w / 2}
            y2={CONTROLLER.y - 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#compound-delegate-arrow)"
          />
          <text
            x={VIEW.x + VIEW.w / 2 + 14}
            y={VIEW.y + VIEW.h + 16}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            委托
          </text>
          <text
            x={VIEW.x + VIEW.w / 2 + 14}
            y={VIEW.y + VIEW.h + 30}
            fontSize="11"
            fill={accent}
            fontStyle="italic"
          >
            Strategy
          </text>

          {/* ===== 图例（三色说明三个模式作用区域） ===== */}
          {/* Observer */}
          <rect
            x="44"
            y="376"
            width="16"
            height="12"
            rx="3"
            fill={success}
            fillOpacity="0.14"
            stroke={success}
            strokeWidth="1.6"
          />
          <text x="66" y="386" fontSize="11" fill={primary}>
            Observer：Model 通知 View
          </text>
          {/* Strategy */}
          <rect
            x="280"
            y="376"
            width="16"
            height="12"
            rx="3"
            fill={accent}
            fillOpacity="0.14"
            stroke={accent}
            strokeWidth="1.6"
          />
          <text x="302" y="386" fontSize="11" fill={primary}>
            Strategy：View 委托 Controller
          </text>
          {/* Composite */}
          <rect
            x="520"
            y="376"
            width="16"
            height="12"
            rx="3"
            fill={warning}
            fillOpacity="0.14"
            stroke={warning}
            strokeWidth="1.6"
          />
          <text x="542" y="386" fontSize="11" fill={primary}>
            Composite：View 树形结构
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="424"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            MVC = Observer + Strategy + Composite——模式组合产生协同效应
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Model 用 Observer 通知 View，View 用 Composite
        组合子视图，再把输入处理委托给可替换的
        Controller（Strategy）。三个模式各司其职，组合起来才构成完整的
        MVC——单一模式做不到这种解耦度。
      </figcaption>
    </figure>
  );
}
