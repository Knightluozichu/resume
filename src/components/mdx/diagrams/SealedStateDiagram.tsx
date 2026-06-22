/**
 * <SealedStateDiagram />：《Android 设计模式》「Kotlin 对设计的影响」章配图。
 *
 * 画面内容：左右对比面板展示 Kotlin sealed class 如何替代分散的状态变量。
 *  左侧 "Before (Java style)"：三个独立可空变量（data / error / loading）散落各处，
 *        用混乱的交错箭头表示隐式状态耦合，突出容易遗漏组合。
 *  右侧 "After (Kotlin)"：一个 sealed class UiState 包含 Loading / Success(data) / Error(message)，
 *        三个分支出一个根节点，清晰统一。
 *  底部：一个 View 渲染逻辑框，展示 `when(state) { ... }` 的穷尽处理，
 *        三个分支分别映射到 spinner / content / retry。
 *  最底部：编译器强制穷尽的洞察横幅。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

// —— 布局常量 ——
const VIEW_W = 680;
const VIEW_H = 480;
const PAD_X = 24;
const PANEL_W = 280;
const PANEL_H = 220; // Increased from 200 to prevent bottom text overlap
const LEFT_PANEL_X = PAD_X;
const RIGHT_PANEL_X = PAD_X + PANEL_W + 24;
const PANEL_Y = 52;
const VAR_Y = PANEL_Y + 48; // Before 面板内变量起始 y
const SEALED_Y = PANEL_Y + 40; // After 面板内 sealed class 起始 y
const WHEN_Y = 320; // when 渲染区 Y (shifted down slightly for panel height)
const INSIGHT_Y = 430; // 底部洞察 Y

export function SealedStateDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin sealed class 替代分散状态变量对比图。左侧 Before（Java 风格）面板：三个独立可空变量 data: Data?、error: Throwable?、loading: Boolean 散落各处，交错箭头表示隐式状态耦合，标注容易遗漏组合。右侧 After（Kotlin）面板：一个 sealed class UiState 树形展开三个分支 Loading、Success(data)、Error(message)，从根节点 UiState 出发整齐分支。底部 View 渲染逻辑框展示 when(state) 穷尽处理：is Loading 显示 spinner、is Success 显示 content、is Error 显示 retry，三路径无遗漏。最底部洞察横幅：编译器强迫你处理所有状态，忘一个等于编译错误。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* === 标题 === */}
          <text x={PAD_X} y="30" fontSize="14" fontWeight="700" fill="var(--text-primary)">
            sealed class：用类型系统消灭状态爆炸
          </text>

          {/* === 左侧面板：Before (Java style) === */}
          <rect x={LEFT_PANEL_X} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx="10" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x={LEFT_PANEL_X} y={PANEL_Y} width={PANEL_W} height="28" rx="10" fill="var(--danger)" fillOpacity="0.1" />
          <text x={LEFT_PANEL_X + PANEL_W / 2} y={PANEL_Y + 19} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">
            Before (Java style)
          </text>

          {/* 三个分散变量 */}
          <g>
            {/* data: Data? */}
            <rect x={LEFT_PANEL_X + 16} y={VAR_Y} width={PANEL_W - 32} height="36" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1.2" />
            <text x={LEFT_PANEL_X + 32} y={VAR_Y + 16} fontSize="11" fontFamily="var(--font-mono)" fill="var(--text-primary)">
              data: Data?
            </text>
            <text x={LEFT_PANEL_X + 32} y={VAR_Y + 29} fontSize="11" fill="var(--text-secondary)">
              成功数据（可能为空）
            </text>

            {/* error: Throwable? */}
            <rect x={LEFT_PANEL_X + 16} y={VAR_Y + 48} width={PANEL_W - 32} height="36" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1.2" />
            <text x={LEFT_PANEL_X + 32} y={VAR_Y + 48 + 16} fontSize="11" fontFamily="var(--font-mono)" fill="var(--text-primary)">
              error: Throwable?
            </text>
            <text x={LEFT_PANEL_X + 32} y={VAR_Y + 48 + 29} fontSize="11" fill="var(--text-secondary)">
              错误信息（可能为空）
            </text>

            {/* loading: Boolean */}
            <rect x={LEFT_PANEL_X + 16} y={VAR_Y + 96} width={PANEL_W - 32} height="36" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1.2" />
            <text x={LEFT_PANEL_X + 32} y={VAR_Y + 96 + 16} fontSize="11" fontFamily="var(--font-mono)" fill="var(--text-primary)">
              loading: Boolean
            </text>
            <text x={LEFT_PANEL_X + 32} y={VAR_Y + 96 + 29} fontSize="11" fill="var(--text-secondary)">
              加载标记
            </text>

            {/* 混乱交错箭头 */}
            <path
              d={`M ${LEFT_PANEL_X + PANEL_W - 40} ${VAR_Y + 18} Q ${LEFT_PANEL_X + PANEL_W + 10} ${VAR_Y + 42} ${LEFT_PANEL_X + PANEL_W - 20} ${VAR_Y + 66}`}
              fill="none"
              stroke="var(--danger)"
              strokeWidth="1.4"
              strokeDasharray="4 3"
              opacity="0.6"
            />
            <path
              d={`M ${LEFT_PANEL_X + PANEL_W - 50} ${VAR_Y + 66} Q ${LEFT_PANEL_X + PANEL_W + 20} ${VAR_Y + 24} ${LEFT_PANEL_X + PANEL_W - 30} ${VAR_Y + 114}`}
              fill="none"
              stroke="var(--danger)"
              strokeWidth="1.4"
              strokeDasharray="4 3"
              opacity="0.6"
            />
            <path
              d={`M ${LEFT_PANEL_X + 36} ${VAR_Y + 114} Q ${LEFT_PANEL_X + 12} ${VAR_Y + 80} ${LEFT_PANEL_X + 20} ${VAR_Y + 40}`}
              fill="none"
              stroke="var(--danger)"
              strokeWidth="1.4"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          </g>

          {/* Before 底部警告文本 */}
          <text x={LEFT_PANEL_X + PANEL_W / 2} y={PANEL_Y + PANEL_H - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)" opacity="0.85">
            隐式耦合 · 2³ = 8 种组合 · 容易遗漏
          </text>

          {/* === 右侧面板：After (Kotlin) === */}
          <rect x={RIGHT_PANEL_X} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx="10" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x={RIGHT_PANEL_X} y={PANEL_Y} width={PANEL_W} height="28" rx="10" fill="var(--success)" fillOpacity="0.1" />
          <text x={RIGHT_PANEL_X + PANEL_W / 2} y={PANEL_Y + 19} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">
            After (Kotlin)
          </text>

          {/* sealed class UiState */}
          {/* 根节点 */}
          <rect x={RIGHT_PANEL_X + PANEL_W / 2 - 48} y={SEALED_Y} width="96" height="28" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="2" />
          <text x={RIGHT_PANEL_X + PANEL_W / 2} y={SEALED_Y + 19} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)" fill="var(--accent)">
            UiState
          </text>

          {/* 三个分支 */}
          {[
            { label: "Loading", y: SEALED_Y + 46, color: "var(--warning)" },
            { label: "Success(data)", y: SEALED_Y + 82, color: "var(--success)" },
            { label: "Error(msg)", y: SEALED_Y + 118, color: "var(--danger)" },
          ].map((branch) => (
            <g key={branch.label}>
              {/* 从根节点到分支的竖线 + 横线 */}
              <line x1={RIGHT_PANEL_X + PANEL_W / 2} y1={SEALED_Y + 28} x2={RIGHT_PANEL_X + PANEL_W / 2} y2={branch.y + 14} stroke="var(--border)" strokeWidth="1.4" />
              <line x1={RIGHT_PANEL_X + PANEL_W / 2} y1={branch.y + 14} x2={RIGHT_PANEL_X + PANEL_W / 2 - 20} y2={branch.y + 14} stroke="var(--border)" strokeWidth="1.4" />
              <rect x={RIGHT_PANEL_X + PANEL_W / 2 - 110} y={branch.y} width={90} height="28" rx="4" fill={branch.color} fillOpacity="0.1" stroke={branch.color} strokeWidth="1.4" />
              <text x={RIGHT_PANEL_X + PANEL_W / 2 - 110 + 45} y={branch.y + 18} textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="var(--font-mono)" fill={branch.color}>
                {branch.label}
              </text>
            </g>
          ))}

          {/* After 底部总结文本 */}
          <text x={RIGHT_PANEL_X + PANEL_W / 2} y={PANEL_Y + PANEL_H - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)" opacity="0.85">
            一个类型统一 3 种状态 · 无隐式组合
          </text>

          {/* === 底部：View when 渲染逻辑 === */}
          <rect x={PAD_X} y={WHEN_Y} width={VIEW_W - PAD_X * 2} height="64" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x={VIEW_W / 2} y={WHEN_Y + 16} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            View 渲染 # when(state) — 编译器强制穷尽
          </text>

          {/* Loading → spinner */}
          <rect x={PAD_X + 24} y={WHEN_Y + 26} width={(VIEW_W - PAD_X * 2 - 72) / 3} height="28" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x={PAD_X + 24 + (VIEW_W - PAD_X * 2 - 72) / 6} y={WHEN_Y + 44} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">
            is Loading → spinner
          </text>

          {/* Success → content */}
          <rect x={PAD_X + 36 + (VIEW_W - PAD_X * 2 - 72) / 3} y={WHEN_Y + 26} width={(VIEW_W - PAD_X * 2 - 72) / 3} height="28" rx="4" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x={PAD_X + 36 + (VIEW_W - PAD_X * 2 - 72) / 3 + (VIEW_W - PAD_X * 2 - 72) / 6} y={WHEN_Y + 44} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            is Success → content
          </text>

          {/* Error → retry */}
          <rect x={PAD_X + 48 + ((VIEW_W - PAD_X * 2 - 72) / 3) * 2} y={WHEN_Y + 26} width={(VIEW_W - PAD_X * 2 - 72) / 3} height="28" rx="4" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x={PAD_X + 48 + ((VIEW_W - PAD_X * 2 - 72) / 3) * 2 + (VIEW_W - PAD_X * 2 - 72) / 6} y={WHEN_Y + 44} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">
            is Error → retry
          </text>

          {/* === 底部关键洞察横幅 === */}
          <rect x={PAD_X} y={INSIGHT_Y} width={VIEW_W - PAD_X * 2} height="32" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x={VIEW_W / 2} y={INSIGHT_Y + 21} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            编译器强迫你处理所有状态，忘一个 = 编译错误
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin sealed class 用类型系统消灭状态爆炸：一个类型统一所有状态，编译器通过 exhaustive when 强制处理每一种可能，
        消除 Java 风格中分散可空变量导致的隐式状态组合与遗漏。
      </figcaption>
    </figure>
  );
}
