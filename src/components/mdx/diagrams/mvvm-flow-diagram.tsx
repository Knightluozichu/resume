/**
 * <MvvmFlowDiagram>：辅图——「MVVM 模式的单向数据流」（HEL-???）。
 *
 * 三个主盒子：Fragment/Compose（左，观察状态）、ViewModel（中，持有 UiState + 处理动作）、
 * Repository（右，数据源）。
 *
 * 关键区别于 MVP：ViewModel 不持有 View 引用，而是暴露 observable state
 * （StateFlow/LiveData），View 通过观察 state 自动重组/刷新。
 *
 * 单向数据流标注：
 *  User Action → ViewModel.onClick()
 *  ViewModel 更新 _uiState
 *  View 观察 uiState → 自动 recompose/更新
 *  ViewModel → Repository 获取数据
 *
 * 重点标注：ViewModel 在配置变更（旋转）时存活。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 三列盒子
const BOX_W = 160;
const BOX_H = 80;
const BOX_Y = 100;

const V_X = 40; // Fragment/Compose
const VM_X = 280; // ViewModel
const R_X = 520; // Repository

const V_CX = V_X + BOX_W / 2;
const VM_CX = VM_X + BOX_W / 2;
const R_CX = R_X + BOX_W / 2;

const BOX_CY = BOX_Y + BOX_H / 2;

export function MvvmFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MVVM 模式单向数据流图。左侧是 Fragment 或 Compose 视图层，负责观察状态并展示 UI。中间是 ViewModel，持有 UiState 并通过 StateFlow 或 LiveData 暴露可观察状态，响应 onClick 等用户动作。右侧是 Repository 数据仓库层。"
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
            MVVM 模式：单向数据流
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            状态驱动 · View 观察 · ViewModel 不持有 View 引用
          </text>

          {/* ===== View → ViewModel 箭头：UI 事件 ===== */}
          <line
            x1={V_X + BOX_W}
            y1={BOX_CY - 20}
            x2={VM_X}
            y2={BOX_CY - 20}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#mvvm-arrow-accent)"
          />
          <text
            x={(V_X + BOX_W + VM_X) / 2}
            y={BOX_CY - 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            调用 viewModel.onClick()
          </text>

          {/* ===== ViewModel → View 观察状态箭头 (反向) ===== */}
          <line
            x1={VM_X}
            y1={BOX_CY + 20}
            x2={V_X + BOX_W}
            y2={BOX_CY + 20}
            stroke="var(--success)"
            strokeWidth="1.6"
            strokeDasharray="5 3"
            markerEnd="url(#mvvm-arrow-success)"
          />
          <text
            x={(V_X + BOX_W + VM_X) / 2}
            y={BOX_CY + 36}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--success)"
          >
            观察 _uiState (Flow/LiveData)
          </text>

          {/* ===== Fragment/Compose 盒子（左） ===== */}
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
            Fragment/Compose
          </text>
          <text
            x={V_CX}
            y={BOX_Y + 46}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            观察状态，自动展示
          </text>
          <text
            x={V_CX}
            y={BOX_Y + 64}
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            collectAsState() / observe()
          </text>

          {/* ===== ViewModel 盒子（中） ===== */}
          <rect
            x={VM_X}
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
            x={VM_CX}
            y={BOX_Y + 22}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ViewModel
          </text>
          <text
            x={VM_CX}
            y={BOX_Y + 42}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            持有 _uiState 并暴露
          </text>
          <text
            x={VM_CX}
            y={BOX_Y + 60}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            MutableStateFlow
          </text>

          {/* ===== Repository 盒子（右） ===== */}
          <rect
            x={R_X}
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
            x={R_CX}
            y={BOX_Y + 24}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Repository
          </text>
          <text
            x={R_CX}
            y={BOX_Y + 46}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            提供数据
          </text>
          <text
            x={R_CX}
            y={BOX_Y + 64}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            API / 数据库 / 缓存
          </text>

          {/* ===== ViewModel → Repository 箭头 ===== */}
          <line
            x1={VM_X + BOX_W}
            y1={BOX_CY - 14}
            x2={R_X}
            y2={BOX_CY - 14}
            stroke="var(--warning)"
            strokeWidth="1.4"
            markerEnd="url(#mvvm-arrow-warning)"
          />
          <text
            x={(VM_X + BOX_W + R_X) / 2}
            y={BOX_CY - 22}
            textAnchor="middle"
            fontSize="11"
            fill="var(--warning)"
          >
            获取数据
          </text>

          {/* ===== Repository → ViewModel 反向箭头 ===== */}
          <line
            x1={R_X}
            y1={BOX_CY + 14}
            x2={VM_X + BOX_W}
            y2={BOX_CY + 14}
            stroke="var(--warning)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
            markerEnd="url(#mvvm-arrow-warning)"
          />
          <text
            x={(VM_X + BOX_W + R_X) / 2}
            y={BOX_CY + 26}
            textAnchor="middle"
            fontSize="11"
            fill="var(--warning)"
          >
            返回数据
          </text>

          {/* ===== 关键区别标注框 ===== */}
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
            ViewModel 不持有 View 引用，只暴露 StateFlow / LiveData
          </text>
          <text
            x={VIEW_W / 2}
            y={254}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            View 观察状态自动反应 · ViewModel 在旋转等配置变更时存活
          </text>

          {/* ===== 底部单向流总结 ===== */}
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
            UI → 事件 → ViewModel → 状态 → UI
          </text>
          <text
            x={VIEW_W / 2}
            y={350}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            单向数据流（UDF）
          </text>
          <text
            x={VIEW_W / 2}
            y={380}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            与 MVP 关键区别：ViewModel 不调用 View 方法，而是更新状态让 View 自动反应
          </text>

          <text
            x={VIEW_W / 2}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            状态驱动：View 观察状态变化自动更新，实现低耦合的 UI 控制
          </text>

          <defs>
            <marker
              id="mvvm-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="mvvm-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="mvvm-arrow-warning"
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
        MVVM 的核心是「状态驱动 UI」。ViewModel 暴露 `StateFlow`/`LiveData`
        作为可观察状态，View 通过 `collectAsState()`/`observe()` 订阅状态；
        状态变化时 View 自动重组/刷新，无需 Presenter 手动调 `showXxx`。
        ViewModel 不持有 View 引用（对比 MVP），且在屏幕旋转等配置变更时存活。
      </figcaption>
    </figure>
  );
}
