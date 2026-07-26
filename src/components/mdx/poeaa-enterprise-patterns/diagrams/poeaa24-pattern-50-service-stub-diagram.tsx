/**
 * <Poeaa24Pattern50ServiceStub>：服务桩结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern50ServiceStub() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Service Stub 结构图。用轻量替身代替外部服务（如支付网关），测试时返回固定结果，消除对外部系统的依赖。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Service Stub：测试时用替身代替外部服务" />
          {/* 被测代码 */}
          <rect x={48} y={64} width={180} height={80} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">订单服务（被测）</text>
          <text x={64} y={110} fontSize="11" fontFamily="monospace" fill={T.primary}>payment.charge(¥597)</text>
          <text x={64} y={128} fontSize="11" fill={T.secondary}>不关心谁在响应</text>
          {/* 接口 */}
          <rect x={290} y={64} width={160} height={80} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={290} y={64} width={160} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={290} y={84} width={160} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={370} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>PaymentGateway</text>
          <text x={306} y={112} fontSize="11" fontFamily="monospace" fill={T.primary}>interface</text>
          <text x={306} y={130} fontSize="11" fontFamily="monospace" fill={T.primary}>  charge(amount)</text>
          {/* 两个实现 */}
          <line x1={450} y1={90} x2={520} y2={72} stroke="#E5B567" strokeWidth="1" />
          <line x1={450} y1={118} x2={520} y2={136} stroke="#E5634D" strokeWidth="1" strokeDasharray="4 3" />
          <rect x={520} y={56} width={160} height={32} rx="6" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1" />
          <text x={600} y={76} textAnchor="middle" fontSize="11" fill="#E5B567">StubPayment（测试）</text>
          <rect x={520} y={120} width={160} height={32} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={600} y={140} textAnchor="middle" fontSize="11" fill={T.primary}>StripePayment（生产）</text>
          <text x={600} y={170} textAnchor="middle" fontSize="11" fill="#E5B567">固定返回 success</text>
          {/* 底部说明 */}
          <rect x={48} y={192} width={624} height={52} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={214} fontSize="11" fill={T.secondary}>• 测试快速、可重复、不依赖网络  • 可模拟失败场景（超时、拒绝）</text>
          <text x={64} y={232} fontSize="11" fill={T.secondary}>• 前提：被测代码依赖接口而非具体服务（Separated Interface）</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Stub 代替外部服务返回固定结果，测试不依赖网络" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Service Stub 用轻量替身代替外部服务，测试时返回固定结果，
        消除对网络和外部系统的依赖，还可模拟失败场景。
      </figcaption>
    </figure>
  );
}
