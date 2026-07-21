/**
 * <Poeaa24Pattern33DataTransferObject>：数据传输对象结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern33DataTransferObject() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数据传输对象结构图。DTO 是可序列化的数据载体，将多个字段打包为一次传输，避免领域对象直接跨越进程边界。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Data Transfer Object：打包数据，一次过界" />
          {/* 左侧：领域对象 */}
          <rect x={48} y={64} width={180} height={110} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">领域对象（服务端）</text>
          <text x={64} y={108} fontSize="9" fontFamily="monospace" fill={T.primary}>Order</text>
          <text x={64} y={126} fontSize="9" fontFamily="monospace" fill={T.primary}>  ├ Customer</text>
          <text x={64} y={144} fontSize="9" fontFamily="monospace" fill={T.primary}>  ├ LineItem[]</text>
          <text x={64} y={162} fontSize="9" fontFamily="monospace" fill={T.primary}>  └ Payment</text>
          {/* 箭头：组装 */}
          <line x1={228} y1={100} x2={290} y2={100} stroke={T.accent} strokeWidth="1.5" />
          <text x={259} y={92} textAnchor="middle" fontSize="9" fill={T.accent}>组装</text>
          {/* 中间：DTO */}
          <rect x={290} y={64} width={160} height={110} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={290} y={64} width={160} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={290} y={84} width={160} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={370} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>OrderDTO</text>
          <text x={306} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>orderId: 42</text>
          <text x={306} y={128} fontSize="9" fontFamily="monospace" fill={T.primary}>customer: "张三"</text>
          <text x={306} y={146} fontSize="9" fontFamily="monospace" fill={T.primary}>total: 597.00</text>
          <text x={306} y={164} fontSize="9" fontFamily="monospace" fill={T.primary}>items: [...]</text>
          {/* 箭头：传输 */}
          <line x1={450} y1={100} x2={510} y2={100} stroke="#E5B567" strokeWidth="1.5" />
          <text x={480} y={92} textAnchor="middle" fontSize="9" fill="#E5B567">序列化</text>
          {/* 右侧：客户端 */}
          <rect x={510} y={64} width={170} height={110} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={595} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">客户端</text>
          <text x={526} y={110} fontSize="9" fill={T.secondary}>只拿到纯数据</text>
          <text x={526} y={128} fontSize="9" fill={T.secondary}>无行为、无关联</text>
          <text x={526} y={146} fontSize="9" fill={T.secondary}>一次传输全部字段</text>
          <text x={526} y={164} fontSize="9" fill={T.secondary}>可缓存、可版本化</text>
          {/* 底部说明 */}
          <rect x={48} y={200} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={224} fontSize="11" fontWeight="600" fill={T.primary}>核心价值：</text>
          <text x={64} y={246} fontSize="11" fill={T.secondary}>• 领域对象不越界（安全）  • 一次传输代替 N 次 getter 调用（性能）  • 契约可独立演进（解耦）</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="DTO 将多字段打包为一次序列化传输，领域对象不跨越进程边界" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Data Transfer Object 是可序列化的数据载体，将多个字段打包为一次传输，
        避免领域对象直接跨越进程边界，同时减少远程调用次数。
      </figcaption>
    </figure>
  );
}
