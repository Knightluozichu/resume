/**
 * <KotlinUiStateDiagram>：辅图——「Kotlin sealed class 把散落状态收敛为穷举类型」。
 *
 * 左面板「重构前」（danger）：三个散落的可空变量 isLoading / data / error，
 * 标注「状态组合爆炸 · NPE 风险」。
 *
 * 中间一个大 accent 箭头标「收束」，把左侧散落变量收束到右侧。
 *
 * 右面板「重构后」（success）：sealed class UiState 及三个子类 Loading / Success(data)
 * / Error(cause)，标注「穷举 when · 编译器保护」。
 *
 * 底部一个 when(state) { ... } 代码框，列出三分支，并标注
 * 「编译器强制穷举，漏分支报错」。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// —— 左右面板。 ——
const LEFT_X = 40;
const PANEL_Y = 68;
const PANEL_H = 172;
const LEFT_W = 232;
const LEFT_CX = LEFT_X + LEFT_W / 2; // 156

const RIGHT_X = 408;
const RIGHT_W = 272;
const RIGHT_CX = RIGHT_X + RIGHT_W / 2; // 544

// —— 中间收束箭头。 ——
const ARROW_X1 = 280;
const ARROW_X2 = 400;
const ARROW_Y = 150;

// —— 底部 when 代码框。 ——
const WHEN_X = 80;
const WHEN_Y = 256;
const WHEN_W = 560;
const WHEN_H = 108;

export function KotlinUiStateDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin sealed class 状态收敛图。左面板「重构前」（红色）：三个散落的可空变量 isLoading: Boolean?、data: T?、error: Throwable?，标注「状态组合爆炸 · NPE 风险」。中间一个紫色大箭头标「收束」，把左侧散落变量收束到右侧。右面板「重构后」（绿色）：sealed class UiState 及三个子类 Loading、Success(data)、Error(cause)，标注「穷举 when · 编译器保护」。底部一个 when(state) 代码框列出三个分支 Loading/Success/Error 各自的处理，并标注「编译器强制穷举，漏分支报错」。底部总结：sealed class 把散落的状态变量收敛为穷举类型，编译器帮你找漏分支。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 主标题 ===== */}
          <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            sealed class：把散落状态收敛为穷举类型
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            散落可空变量 → sealed UiState → 编译器强制穷举 when
          </text>

          {/* ===== 左面板：重构前（danger） ===== */}
          <rect x={LEFT_X} y={PANEL_Y} width={LEFT_W} height={PANEL_H} rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.6" />
          <text x={LEFT_CX} y={PANEL_Y + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">
            重构前
          </text>
          <text x={LEFT_X + 24} y={PANEL_Y + 52} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-primary)" xmlSpace="preserve">
            isLoading: Boolean?
          </text>
          <text x={LEFT_X + 24} y={PANEL_Y + 72} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-primary)" xmlSpace="preserve">
            data: T?
          </text>
          <text x={LEFT_X + 24} y={PANEL_Y + 92} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-primary)" xmlSpace="preserve">
            error: Throwable?
          </text>
          {/* 风险胶囊 */}
          <rect x={LEFT_X + 16} y={PANEL_Y + 116} width={LEFT_W - 32} height="28" rx="14" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x={LEFT_CX} y={PANEL_Y + 134} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">
            状态组合爆炸 · NPE 风险
          </text>

          {/* ===== 中间收束大箭头 ===== */}
          <text x={(ARROW_X1 + ARROW_X2) / 2} y={ARROW_Y - 12} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">
            收束
          </text>
          <line x1={ARROW_X1} y1={ARROW_Y} x2={ARROW_X2} y2={ARROW_Y} stroke="var(--accent)" strokeWidth="4" markerEnd="url(#kotlin-arrow-accent)" />

          {/* ===== 右面板：重构后（success） ===== */}
          <rect x={RIGHT_X} y={PANEL_Y} width={RIGHT_W} height={PANEL_H} rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.6" />
          <text x={RIGHT_CX} y={PANEL_Y + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">
            重构后
          </text>
          <text x={RIGHT_X + 24} y={PANEL_Y + 50} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-primary)" xmlSpace="preserve">
            sealed class UiState
          </text>
          <text x={RIGHT_X + 24} y={PANEL_Y + 70} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-secondary)" xmlSpace="preserve">
            ├ Loading
          </text>
          <text x={RIGHT_X + 24} y={PANEL_Y + 90} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-secondary)" xmlSpace="preserve">
            ├ Success(data)
          </text>
          <text x={RIGHT_X + 24} y={PANEL_Y + 110} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-secondary)" xmlSpace="preserve">
            └ Error(cause)
          </text>
          {/* 收益胶囊 */}
          <rect x={RIGHT_X + 16} y={PANEL_Y + 124} width={RIGHT_W - 32} height="28" rx="14" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x={RIGHT_CX} y={PANEL_Y + 142} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">
            穷举 when · 编译器保护
          </text>

          {/* ===== 底部 when 代码框 ===== */}
          <rect x={WHEN_X} y={WHEN_Y} width={WHEN_W} height={WHEN_H} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.4" />
          <text x={WHEN_X + 24} y={WHEN_Y + 26} fontSize="12" fontFamily="var(--font-mono)" fill="var(--accent)" xmlSpace="preserve">
            {"when(state) {"}
          </text>
          <text x={WHEN_X + 24} y={WHEN_Y + 46} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-primary)" xmlSpace="preserve">
            {"  Loading  -> showLoading()"}
          </text>
          <text x={WHEN_X + 24} y={WHEN_Y + 66} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-primary)" xmlSpace="preserve">
            {"  Success  -> showData(d)"}
          </text>
          <text x={WHEN_X + 24} y={WHEN_Y + 86} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-primary)" xmlSpace="preserve">
            {"  Error    -> showError(e)"}
          </text>
          <text x={WHEN_X + 24} y={WHEN_Y + 102} fontSize="12" fontFamily="var(--font-mono)" fill="var(--accent)" xmlSpace="preserve">
            {"}"}
          </text>

          {/* ===== 编译器保护标注 ===== */}
          <rect x={240} y={WHEN_Y + WHEN_H + 8} width="240" height="24" rx="12" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x={360} y={WHEN_Y + WHEN_H + 24} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">
            编译器强制穷举，漏分支报错
          </text>

          {/* ===== 底部总结 ===== */}
          <text x={VIEW_W / 2} y={426} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            sealed class：把散落的状态变量收敛为穷举类型，编译器帮你找漏分支
          </text>

          <defs>
            <marker id="kotlin-arrow-accent" markerWidth="10" markerHeight="10" refX="5" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        散落的 isLoading / data / error 三个可空变量，组合起来状态空间爆炸、处处 NPE 风险。
        收敛成 sealed class UiState 后，状态是互斥的穷举类型；when 分支必须覆盖所有子类，
        漏掉一个编译器就报错——把「漏处理状态」的运行时 bug 提前变成编译期错误。
      </figcaption>
    </figure>
  );
}
