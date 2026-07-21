/**
 * <Poeaa24Pattern02DomainModel>：领域模型结构图。
 * 展示对象网络 + 多态的核心结构。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 380;
export function Poeaa24Pattern02DomainModel() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="领域模型结构图。多个领域对象（Order、Customer、Product）通过关联形成对象网络，每个对象封装自己的业务规则和行为。多态让不同子类有不同实现。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="领域模型：对象网络 + 行为封装" />
          {/* Order */}
          <rect x={48} y={72} width={180} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={48} y={72} width={180} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={48} y={92} width={180} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={138} y={91} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>Order</text>
          <text x={60} y={118} fontSize="10" fontFamily="monospace" fill={T.primary}>- items: OrderItem[]</text>
          <text x={60} y={136} fontSize="10" fontFamily="monospace" fill={T.primary}>- customer: Customer</text>
          <text x={60} y={158} fontSize="10" fontFamily="monospace" fill="#3FB97F">+ calculateTotal()</text>
          {/* Customer */}
          <rect x={280} y={72} width={180} height={100} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <rect x={280} y={72} width={180} height={28} rx="8" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={280} y={92} width={180} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={370} y={91} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3FB97F">Customer</text>
          <text x={292} y={118} fontSize="10" fontFamily="monospace" fill={T.primary}>- creditLimit: Money</text>
          <text x={292} y={136} fontSize="10" fontFamily="monospace" fill={T.primary}>- orders: Order[]</text>
          <text x={292} y={158} fontSize="10" fontFamily="monospace" fill="#3FB97F">+ checkCredit()</text>
          {/* Product */}
          <rect x={512} y={72} width={160} height={100} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={512} y={72} width={160} height={28} rx="8" fill="#E5B567" fillOpacity="0.12" />
          <rect x={512} y={92} width={160} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={592} y={91} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E5B567">Product</text>
          <text x={524} y={118} fontSize="10" fontFamily="monospace" fill={T.primary}>- price: Money</text>
          <text x={524} y={136} fontSize="10" fontFamily="monospace" fill={T.primary}>- discount: Discount</text>
          <text x={524} y={158} fontSize="10" fontFamily="monospace" fill="#3FB97F">+ getDiscountedPrice()</text>
          {/* 关联线 */}
          <line x1={228} y1={122} x2={280} y2={122} stroke={T.secondary} strokeWidth="1" />
          <text x={254} y={114} textAnchor="middle" fontSize="9" fill={T.secondary}>1..*</text>
          <line x1={460} y1={122} x2={512} y2={122} stroke={T.secondary} strokeWidth="1" strokeDasharray="4 3" />
          {/* 多态示例 */}
          <rect x={48} y={210} width={624} height={100} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={234} fontSize="12" fontWeight="600" fill={T.primary}>多态：Discount 策略</text>
          <rect x={64} y={248} width={140} height={44} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={134} y={268} textAnchor="middle" fontSize="10" fill={T.primary}>PercentDiscount</text>
          <text x={134} y={284} textAnchor="middle" fontSize="9" fill={T.secondary}>price * (1 - rate)</text>
          <rect x={220} y={248} width={140} height={44} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={290} y={268} textAnchor="middle" fontSize="10" fill={T.primary}>AbsoluteDiscount</text>
          <text x={290} y={284} textAnchor="middle" fontSize="9" fill={T.secondary}>price - amount</text>
          <rect x={376} y={248} width={140} height={44} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={446} y={268} textAnchor="middle" fontSize="10" fill={T.primary}>BulkDiscount</text>
          <text x={446} y={284} textAnchor="middle" fontSize="9" fill={T.secondary}>{'qty > N → 打折'}</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="适用：规则复杂、频繁变化、需要多态和对象协作的系统" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        领域模型用对象网络封装业务规则，每个对象有自己的行为和状态。
        多态让不同策略有不同实现，规则变化时只需修改对应类。
      </figcaption>
    </figure>
  );
}
