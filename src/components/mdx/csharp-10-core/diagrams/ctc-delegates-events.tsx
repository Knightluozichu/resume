/**
 * <CtcDelegatesEventsDiagram>：委托、事件与多播机制。
 *
 * 上半：委托类型签名 + 内置委托（Action/Func）+ 方法绑定。
 * 下半：event 封装（+= / -=）与多播调用链。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CtcDelegatesEventsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="委托与事件。上半展示委托定义和内置委托类型（Action、Func、Predicate）及方法绑定。下半展示 event 封装（外部只能 += / -= 订阅，内部 Invoke 触发多播调用链）和异常隔离。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            委托、事件与多播机制
          </text>

          {/* === 上半：委托与内置委托 === */}
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            类型安全回调 · 内置委托 · 方法绑定
          </text>

          {/* 自定义委托 */}
          <rect x={40} y={64} width={180} height={70} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={130} y={84} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
            delegate void Handler(string)
          </text>
          <text x={130} y={102} textAnchor="middle" fontSize="10" fill={secondary}>自定义委托</text>
          <text x={130} y={118} textAnchor="middle" fontSize="10" fill={secondary}>签名契约 · 类型检查</text>

          {/* 箭头 */}
          <line x1={220} y1={99} x2={270} y2={99} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ctc-de-arrow)" />
          <text x={245} y={92} textAnchor="middle" fontSize="10" fill={secondary}>C# 3.0+</text>

          {/* 内置委托 */}
          <rect x={270} y={64} width={200} height={70} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={370} y={82} textAnchor="middle" fontSize="11" fontWeight="700" fill={success} fontFamily="monospace">
            {"Action<string>"}
          </text>
          <text x={370} y={98} textAnchor="middle" fontSize="11" fontWeight="700" fill={success} fontFamily="monospace">
            {"Func<int,string>"}
          </text>
          <text x={370} y={116} textAnchor="middle" fontSize="10" fill={secondary}>内置通用委托</text>
          <text x={370} y={130} textAnchor="middle" fontSize="10" fill={secondary}>无需自定义 · Lambda 直赋</text>

          {/* 方法绑定 */}
          <rect x={520} y={64} width={160} height={70} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={600} y={84} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
            void OnClick(string)
          </text>
          <text x={600} y={102} textAnchor="middle" fontSize="10" fill={secondary}>匹配签名的方法</text>
          <text x={600} y={118} textAnchor="middle" fontSize="10" fill={secondary}>携带 this · 可多播</text>
          <line x1={470} y1={99} x2={520} y2={99} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ctc-de-arrow)" />
          <text x={495} y={92} textAnchor="middle" fontSize="10" fill={secondary}>绑定</text>

          {/* 分隔线 */}
          <line x1={32} y1={156} x2={VIEW_W - 32} y2={156} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 下半：event 封装与多播 === */}
          <text x={VIEW_W / 2} y={178} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            event 封装与多播调用链
          </text>

          {/* event 声明 */}
          <rect x={40} y={192} width={140} height={70} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={110} y={212} textAnchor="middle" fontSize="11" fontWeight="700" fill={success} fontFamily="monospace">
            event Handler Click
          </text>
          <text x={110} y={230} textAnchor="middle" fontSize="10" fill={secondary}>外部只能 += / -=</text>
          <text x={110} y={246} textAnchor="middle" fontSize="10" fill={secondary}>不能 = 覆盖 / Invoke</text>

          {/* 多播链 */}
          <line x1={180} y1={227} x2={230} y2={227} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ctc-de-arrow)" />

          <rect x={230} y={192} width={120} height={70} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={290} y={212} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">Handler A</text>
          <text x={290} y={230} textAnchor="middle" fontSize="10" fill={secondary}>LogClick</text>
          <text x={290} y={246} textAnchor="middle" fontSize="10" fill={secondary}>订阅者 1</text>

          <line x1={350} y1={227} x2={380} y2={227} stroke={success} strokeWidth="1.4" markerEnd="url(#ctc-de-green)" />
          <text x={365} y={220} textAnchor="middle" fontSize="10" fill={secondary}>+</text>

          <rect x={380} y={192} width={120} height={70} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={440} y={212} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">Handler B</text>
          <text x={440} y={230} textAnchor="middle" fontSize="10" fill={danger}>throw Exception</text>
          <text x={440} y={246} textAnchor="middle" fontSize="10" fill={secondary}>订阅者 2</text>

          <line x1={500} y1={227} x2={530} y2={227} stroke={success} strokeWidth="1.4" markerEnd="url(#ctc-de-green)" />
          <text x={515} y={220} textAnchor="middle" fontSize="10" fill={secondary}>+</text>

          <rect x={530} y={192} width={120} height={70} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={590} y={212} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">Handler C</text>
          <text x={590} y={230} textAnchor="middle" fontSize="10" fill={secondary}>SendMetrics</text>
          <text x={590} y={246} textAnchor="middle" fontSize="10" fill={secondary}>订阅者 3</text>

          {/* Invoke 箭头 */}
          <text x={110} y={282} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning} fontFamily="monospace">
            Click?.Invoke(args)
          </text>
          <path d="M 110 288 Q 200 305 290 266" fill="none" stroke={warning} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#ctc-de-warn)" />

          {/* 异常行为说明 */}
          <rect x={40} y={296} width={640} height="60" rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1" strokeDasharray="4 3" />
          <text x={60} y={316} textAnchor="start" fontSize="11" fontWeight="600" fill={danger}>
            异常行为：B 抛异常 → C 不执行（默认 Invoke）
          </text>
          <text x={60} y={334} textAnchor="start" fontSize="11" fill={secondary}>
            安全调用：GetInvocationList() 逐个 DynamicInvoke + try-catch 隔离
          </text>
          <text x={60} y={350} textAnchor="start" fontSize="11" fill={success}>
            一个订阅者的 bug 不应影响其他订阅者
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={372} x2={VIEW_W - 32} y2={372} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="11" fill={secondary}>
            委托是类型安全回调 · event 封装发布订阅 · 多播按序调用 · 异常需隔离
          </text>
          <text x={VIEW_W / 2} y={408} textAnchor="middle" fontSize="11" fill={secondary}>
            Action/Func/Predicate 内置委托取代自定义 · Lambda 直接赋值
          </text>

          <defs>
            <marker id="ctc-de-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="ctc-de-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
            <marker id="ctc-de-warn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        委托类型安全回调、event 封装发布-订阅、多播按序调用。内置委托 Action/Func 取代自定义委托，多播异常需用 GetInvocationList 隔离。
      </figcaption>
    </figure>
  );
}
