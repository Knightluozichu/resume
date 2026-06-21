/**
 * <MvpFlowDiagram>：辅图——「MVP 模式的三方交互流」（HEL-???）。
 *
 * 三个主盒子：View（左，被动只负责展示）、Presenter（中，编排逻辑）、
 * Model（右，持有数据）。
 *
 * 四条带标签箭头：
 *  View → Presenter: "用户事件 (onClick)"
 *  Presenter → Model: "查询/更新数据"
 *  Model → Presenter: "返回结果"
 *  Presenter → View: "更新界面 (showXxx)"
 *
 * 关键标注：Presenter 不含 Android import（可单元测试），
 * View 实现 Contract.View 接口。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 三列盒子
const BOX_W = 160;
const BOX_H = 80;
const BOX_Y = 100; // 顶部统一 Y

const V_X = 40; // View 列 X
const P_X = 280; // Presenter 列 X
const M_X = 520; // Model 列 X

const V_CX = V_X + BOX_W / 2;
const P_CX = P_X + BOX_W / 2;
const M_CX = M_X + BOX_W / 2;

const BOX_CY = BOX_Y + BOX_H / 2; // 盒子中心 Y

const V2P_ARROW_Y = BOX_CY - 28; // View → Presenter 箭头 Y
const P2M_ARROW_Y = BOX_CY - 8; // Presenter → Model 箭头 Y
const M2P_ARROW_Y = BOX_CY + 18; // Model → Presenter 箭头 Y
const P2V_ARROW_Y = BOX_CY + 40; // Presenter → View 箭头 Y

export function MvpFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MVP 模式交互流图。左侧是被动的 View 盒子，只负责展示 UI，实现 Contract.View 接口。中间是 Presenter 盒子，编排业务逻辑，不含任何 Android import，可单元测试。右侧是 Model 盒子，持有和处理数据。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            MVP 模式：三方各司其职
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            View 被动展示 · Presenter 可测试 · Model 管数据
          </text>

          {/* ===== View → Presenter 箭头（上方） ===== */}
          <line
            x1={V_X + BOX_W}
            y1={V2P_ARROW_Y}
            x2={P_X}
            y2={V2P_ARROW_Y}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#mvp-arrow-accent)"
          />
          <text
            x={(V_X + BOX_W + P_X) / 2}
            y={V2P_ARROW_Y - 6}
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            用户事件 (onClick)
          </text>

          {/* ===== Presenter → Model 箭头（中上） ===== */}
          <line
            x1={P_X + BOX_W}
            y1={P2M_ARROW_Y}
            x2={M_X}
            y2={P2M_ARROW_Y}
            stroke="var(--success)"
            strokeWidth="1.6"
            markerEnd="url(#mvp-arrow-success)"
          />
          <text
            x={(P_X + BOX_W + M_X) / 2}
            y={P2M_ARROW_Y - 6}
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            查询/更新数据
          </text>

          {/* ===== Model → Presenter 箭头（中下，反向） ===== */}
          <line
            x1={M_X}
            y1={M2P_ARROW_Y}
            x2={P_X + BOX_W}
            y2={M2P_ARROW_Y}
            stroke="var(--warning)"
            strokeWidth="1.6"
            markerEnd="url(#mvp-arrow-warning)"
          />
          <text
            x={(P_X + BOX_W + M_X) / 2}
            y={M2P_ARROW_Y + 14}
            textAnchor="middle"
            fontSize="11"
            fill="var(--warning)"
          >
            返回结果
          </text>

          {/* ===== Presenter → View 箭头（下方，反向） ===== */}
          <line
            x1={P_X}
            y1={P2V_ARROW_Y}
            x2={V_X + BOX_W}
            y2={P2V_ARROW_Y}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#mvp-arrow-accent)"
          />
          <text
            x={(V_X + BOX_W + P_X) / 2}
            y={P2V_ARROW_Y + 14}
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            更新界面 (showXxx)
          </text>

          {/* ===== View 盒子（左） ===== */}
          <rect
            x={V_X}
            y={BOX_Y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={V_CX}
            y={BOX_Y + 24}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            View
          </text>
          <text
            x={V_CX}
            y={BOX_Y + 46}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            被动，只负责展示
          </text>
          <text
            x={V_CX}
            y={BOX_Y + 64}
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            实现 Contract.View
          </text>

          {/* ===== Presenter 盒子（中） ===== */}
          <rect
            x={P_X}
            y={BOX_Y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x={P_CX}
            y={BOX_Y + 24}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Presenter
          </text>
          <text
            x={P_CX}
            y={BOX_Y + 46}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            编排逻辑，无 Android 依赖
          </text>
          <text
            x={P_CX}
            y={BOX_Y + 64}
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            可纯 JVM 单元测试
          </text>

          {/* ===== Model 盒子（右） ===== */}
          <rect
            x={M_X}
            y={BOX_Y}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x={M_CX}
            y={BOX_Y + 24}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Model
          </text>
          <text
            x={M_CX}
            y={BOX_Y + 46}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            持有数据，数据操作
          </text>
          <text
            x={M_CX}
            y={BOX_Y + 64}
            textAnchor="middle"
            fontSize="11"
            fill="var(--warning)"
          >
            Repository / DataSource
          </text>

          {/* ===== 关键要点 ===== */}
          <rect
            x={40}
            y={210}
            width={640}
            height={60}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y={234}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            Presenter 不含任何 Android import → 可在 JVM 上快速测试
          </text>
          <text
            x={VIEW_W / 2}
            y={254}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            View 只实现 Contract.View 接口 · Presenter 通过接口回调更新 UI
          </text>

          {/* ===== 底部总结 ===== */}
          <line
            x1={40}
            y1={300}
            x2={VIEW_W - 40}
            y2={300}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_W / 2}
            y={324}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            View 被动 · Presenter 可测试 · Model 纯数据
          </text>

          <text
            x={VIEW_W / 2}
            y={350}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Presenter 不持有 Activity 引用，通过接口（Contract.View）通信
          </text>

          <text
            x={VIEW_W / 2}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            关注点分离：Presenter 与 View 解耦，实现高质量的自动化测试
          </text>

          <defs>
            <marker
              id="mvp-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="mvp-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="mvp-arrow-warning"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MVP 中 View 是被动的——它只管展示，把用户事件交给 Presenter。
        Presenter 编排逻辑（查询 Model、处理数据、决定 View 显示什么），
        通过 Contract.View 接口回调更新 View。因为 Presenter 不依赖 Android，
        可以纯 JVM 单元测试，这是 MVP 相比「Fat Activity」的核心优势。
      </figcaption>
    </figure>
  );
}
