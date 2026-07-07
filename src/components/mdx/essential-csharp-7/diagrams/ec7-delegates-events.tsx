/**
 * <Ec7DelegatesEventsDiagram>：委托与事件——发布-订阅模型。
 *
 * 左侧：发布者 Publisher，内部持有 event
 * 中间：委托调用链（多播委托）
 * 右侧：订阅者 Subscriber A / B / C
 * 底部：Func/Action 内置委托与 Lambda
 *
 * 纯静态展示，无交互。Server Component。
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

export function Ec7DelegatesEventsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="委托与事件发布订阅模型。左侧发布者 Publisher 持有 event，中间多播委托调用链连接多个处理方法，右侧订阅者 Subscriber A、B、C 分别注册了处理方法。底部标注 Func 和 Action 内置委托及 Lambda 表达式。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ec7-del-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            委托与事件：发布-订阅模型
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            委托 = 类型安全函数指针 · 事件 = 受控的多播委托
          </text>

          {/* 发布者 */}
          <g>
            <rect x={40} y={90} width={160} height={130} rx="10" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
            <text x={120} y={112} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Publisher</text>
            <line x1={52} y1={120} x2={188} y2={120} stroke={border} strokeWidth="1" />
            <text x={52} y={138} fontSize="11" fontFamily="monospace" fill={primary}>{"event EventHandler X;"}</text>
            <text x={52} y={156} fontSize="11" fontFamily="monospace" fill={primary}>OnX() 方法</text>
            <text x={52} y={178} fontSize="10" fill={secondary}>发布者只允许</text>
            <text x={52} y={192} fontSize="10" fill={secondary}>+= / -= 订阅</text>
            <text x={52} y={210} fontSize="10" fill={secondary}>外部不能直接触发</text>
          </g>

          {/* 多播委托链（中间） */}
          <g>
            <text x={340} y={98} textAnchor="middle" fontSize="11" fontWeight="700" fill={secondary}>多播委托调用链</text>
            <rect x={260} y={108} width={160} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1.2" />
            <text x={340} y={128} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>HandlerA(msg)</text>
            <line x1={340} y1={138} x2={340} y2={148} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ec7-del-arrow)" />
            <rect x={260} y={152} width={160} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1.2" />
            <text x={340} y={172} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>HandlerB(msg)</text>
            <line x1={340} y1={182} x2={340} y2={192} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ec7-del-arrow)" />
            <rect x={260} y={196} width={160} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1.2" />
            <text x={340} y={216} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>HandlerC(msg)</text>
          </g>

          {/* 发布者 → 委托链 箭头 */}
          <line x1={200} y1={155} x2={260} y2={123} stroke={accent} strokeWidth="1.6" markerEnd="url(#ec7-del-arrow)" strokeOpacity="0.6" />
          <text x={220} y={145} fontSize="10" fill={accent}>触发</text>

          {/* 订阅者（右侧） */}
          <g>
            <text x={580} y={98} textAnchor="middle" fontSize="11" fontWeight="700" fill={secondary}>订阅者</text>
            <rect x={500} y={108} width={160} height={36} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" />
            <text x={580} y={131} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>Subscriber A</text>
            <rect x={500} y={152} width={160} height={36} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" />
            <text x={580} y={175} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>Subscriber B</text>
            <rect x={500} y={196} width={160} height={36} rx="8" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.4" />
            <text x={580} y={219} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>Subscriber C</text>
          </g>

          {/* 委托链 → 订阅者 箭头 */}
          <line x1={420} y1={123} x2={500} y2={126} stroke={success} strokeWidth="1.2" strokeDasharray="4 3" strokeOpacity="0.5" />
          <line x1={420} y1={167} x2={500} y2={170} stroke={warning} strokeWidth="1.2" strokeDasharray="4 3" strokeOpacity="0.5" />
          <line x1={420} y1={211} x2={500} y2={214} stroke={danger} strokeWidth="1.2" strokeDasharray="4 3" strokeOpacity="0.5" />

          {/* 底部：Func/Action/Lambda */}
          <line x1={32} y1={268} x2={VIEW_W - 32} y2={268} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={290} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            内置委托与 Lambda
          </text>
          <g>
            <rect x={50} y={304} width={190} height={40} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={145} y={322} textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill={accent}>{"Func<T, TResult>"}</text>
            <text x={145} y={338} textAnchor="middle" fontSize="10" fill={secondary}>有返回值的委托</text>
          </g>
          <g>
            <rect x={265} y={304} width={190} height={40} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={360} y={322} textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill={success}>{"Action<T>"}</text>
            <text x={360} y={338} textAnchor="middle" fontSize="10" fill={secondary}>无返回值的委托</text>
          </g>
          <g>
            <rect x={480} y={304} width={190} height={40} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={575} y={322} textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill={warning}>{"x => x * 2"}</text>
            <text x={575} y={338} textAnchor="middle" fontSize="10" fill={secondary}>Lambda 表达式</text>
          </g>

          {/* 底部说明 */}
          <line x1={32} y1={364} x2={VIEW_W - 32} y2={364} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={386} textAnchor="middle" fontSize="11" fill={secondary}>
            event 封装委托 · 只允许 += / -= · 发布者内部用 Invoke 触发
          </text>
          <text x={VIEW_W / 2} y={405} textAnchor="middle" fontSize="11" fill={secondary}>
            多播委托按注册顺序依次调用 · 异常会中断链
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        发布者通过 event 持有多播委托，订阅者用 += 注册处理方法；触发时按顺序调用所有注册的处理器。
      </figcaption>
    </figure>
  );
}
