/**
 * <JpcComposeBasicsDiagram>：Compose 声明式UI与传统命令式View对比图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function JpcComposeBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Compose声明式UI与传统命令式View对比图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Compose基础——声明式UI vs 命令式View
          </text>

          {/* 左侧：命令式 View */}
          <rect x="30" y="50" width="330" height="440" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">命令式 View（传统）</text>

          <rect x="60" y="90" width="270" height="34" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="111" textAnchor="middle" fontSize="11" fill="var(--danger)">findViewById + 手动更新</text>

          <rect x="60" y="134" width="270" height="30" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="195" y="153" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">val tv = findViewById&lt;TextView&gt;(R.id.tv)</text>

          <rect x="60" y="174" width="270" height="30" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="195" y="193" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">tv.text = "Hello"</text>

          <rect x="60" y="214" width="270" height="30" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="195" y="233" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">tv.visibility = View.GONE</text>

          <text x="195" y="270" textAnchor="middle" fontSize="11" fill="var(--danger)" fontWeight="600">问题：</text>
          <text x="60" y="290" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 状态与UI手动同步，易遗漏</text>
          <text x="60" y="308" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- XML布局 + Java/Kotlin代码分离</text>
          <text x="60" y="326" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- View层级深，findView 开销大</text>
          <text x="60" y="344" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 状态更新需手动刷新多个View</text>
          <text x="60" y="362" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 线程安全问题（UI线程更新）</text>

          {/* 右侧：声明式 Compose */}
          <rect x="380" y="50" width="330" height="440" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">声明式 Compose</text>

          <rect x="410" y="90" width="270" height="34" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="111" textAnchor="middle" fontSize="11" fill="var(--success)">@Composable + State 驱动</text>

          <rect x="410" y="134" width="270" height="30" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="545" y="153" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Composable fun Greeting() &lbrace;</text>

          <rect x="410" y="174" width="270" height="30" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="545" y="193" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">  Text(text = "Hello")</text>

          <rect x="410" y="214" width="270" height="30" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="545" y="233" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">&rbrace;  // 状态变 → 自动重组</text>

          <text x="545" y="270" textAnchor="middle" fontSize="11" fill="var(--success)" fontWeight="600">优势：</text>
          <text x="410" y="290" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- State 变化自动触发重组</text>
          <text x="410" y="308" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- UI = f(state)，单一数据源</text>
          <text x="410" y="326" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 无XML，Kotlin代码统一描述</text>
          <text x="410" y="344" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 编译期智能跳过，性能优化</text>
          <text x="410" y="362" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 组合优于继承，灵活复用</text>

          {/* 底部核心公式 */}
          <rect x="60" y="400" width="620" height="34" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="421" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">核心心智模型：UI = f(state) —— 状态驱动，自动重组</text>

          {/* 中间箭头 */}
          <text x="370" y="270" textAnchor="middle" fontSize="28" fill="var(--accent)">&rarr;</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compose声明式UI与命令式View对比——状态驱动自动重组，消除手动同步
      </figcaption>
    </figure>
  );
}
