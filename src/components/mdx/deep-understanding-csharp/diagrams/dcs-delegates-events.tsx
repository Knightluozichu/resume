/**
 * <DcsDelegatesEventsDiagram>：委托、事件与多播机制。
 *
 * 上半：委托类型签名 + 实例方法绑定。
 * 下半：event 封装（+= / -=）与多播调用链。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
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

const CARD_W = 160;
const CARD_H = 80;

export function DcsDelegatesEventsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="委托与事件。上半展示委托定义：签名（参数和返回类型）绑定到匹配的实例方法。下半展示 event 封装：外部只能 += / -= 订阅，内部 Invoke 触发多播调用链。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            委托、事件与多播机制
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            类型安全回调 · event 封装 · 多播调用链
          </text>

          {/* 上半：委托定义与方法绑定 */}
          <text x={180} y={86} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            委托：类型安全的函数引用
          </text>

          {/* 委托签名卡片 */}
          <rect x={50} y={100} width={CARD_W} height={CARD_H} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={130} y={122} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
            delegate void Handler(string)
          </text>
          <text x={130} y={142} textAnchor="middle" fontSize="11" fill={secondary}>
            定义签名契约
          </text>
          <text x={130} y={160} textAnchor="middle" fontSize="11" fill={secondary}>
            参数+返回类型必须匹配
          </text>

          {/* 箭头 */}
          <line x1={210} y1={140} x2={270} y2={140} stroke={secondary} strokeWidth="1.4" markerEnd="url(#dcs-de-arrow)" />
          <text x={240} y={132} textAnchor="middle" fontSize="10" fill={secondary}>绑定</text>

          {/* 方法卡片 */}
          <rect x={270} y={100} width={CARD_W} height={CARD_H} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={350} y={122} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">
            void OnClick(string)
          </text>
          <text x={350} y={142} textAnchor="middle" fontSize="11" fill={secondary}>
            匹配签名的方法
          </text>
          <text x={350} y={160} textAnchor="middle" fontSize="11" fill={secondary}>
            可携带实例对象 (this)
          </text>

          {/* vs C++ 函数指针 */}
          <rect x={470} y={100} width={CARD_W + 10} height={CARD_H} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={555} y={122} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            C++ 函数指针
          </text>
          <text x={555} y={142} textAnchor="middle" fontSize="11" fill={secondary}>
            裸地址 · 无类型检查
          </text>
          <text x={555} y={160} textAnchor="middle" fontSize="11" fill={secondary}>
            无对象上下文 · 不可多播
          </text>

          {/* 分隔线 */}
          <line x1={32} y1={210} x2={VIEW_W - 32} y2={210} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：event 封装与多播 */}
          <text x={VIEW_W / 2} y={236} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            event 封装与多播调用链
          </text>

          {/* event 声明 */}
          <rect x={50} y={256} width={140} height={66} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={120} y={278} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">
            event Handler Click
          </text>
          <text x={120} y={296} textAnchor="middle" fontSize="11" fill={secondary}>
            外部只能 += / -=
          </text>
          <text x={120} y={312} textAnchor="middle" fontSize="11" fill={secondary}>
            不能 = 覆盖 / 不能 Invoke
          </text>

          {/* 多播链 */}
          <line x1={190} y1={289} x2={250} y2={289} stroke={secondary} strokeWidth="1.4" markerEnd="url(#dcs-de-arrow)" />

          <rect x={250} y={256} width={120} height={66} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={310} y={278} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
            Handler A
          </text>
          <text x={310} y={296} textAnchor="middle" fontSize="10" fill={secondary}>LogClick</text>
          <text x={310} y={312} textAnchor="middle" fontSize="10" fill={secondary}>订阅者 1</text>

          <line x1={370} y1={289} x2={400} y2={289} stroke={success} strokeWidth="1.4" markerEnd="url(#dcs-de-green)" />
          <text x={385} y={282} textAnchor="middle" fontSize="10" fill={secondary}>+</text>

          <rect x={400} y={256} width={120} height={66} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={460} y={278} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
            Handler B
          </text>
          <text x={460} y={296} textAnchor="middle" fontSize="10" fill={secondary}>UpdateUI</text>
          <text x={460} y={312} textAnchor="middle" fontSize="10" fill={secondary}>订阅者 2</text>

          <line x1={520} y1={289} x2={550} y2={289} stroke={success} strokeWidth="1.4" markerEnd="url(#dcs-de-green)" />
          <text x={535} y={282} textAnchor="middle" fontSize="10" fill={secondary}>+</text>

          <rect x={550} y={256} width={120} height={66} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={610} y={278} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
            Handler C
          </text>
          <text x={610} y={296} textAnchor="middle" fontSize="10" fill={secondary}>SendMetrics</text>
          <text x={610} y={312} textAnchor="middle" fontSize="10" fill={secondary}>订阅者 3</text>

          {/* Invoke 箭头 */}
          <text x={120} y={346} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>
            Click?.Invoke(args)
          </text>
          <path d="M 120 352 Q 200 370 310 328" fill="none" stroke={warning} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#dcs-de-warn)" />

          {/* 底部总结 */}
          <line x1={32} y1={384} x2={VIEW_W - 32} y2={384} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={402} textAnchor="middle" fontSize="11" fill={secondary}>
            event 是对委托字段的封装 · 委托是回调体系的基石 · 多播按顺序调用全部订阅者
          </text>

          <defs>
            <marker id="dcs-de-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="dcs-de-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
            <marker id="dcs-de-warn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        委托类型安全回调、event 封装发布-订阅、多播按序调用。
      </figcaption>
    </figure>
  );
}
