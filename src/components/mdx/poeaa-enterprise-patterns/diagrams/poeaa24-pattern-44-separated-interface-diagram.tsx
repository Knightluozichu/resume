/**
 * <Poeaa24Pattern44SeparatedInterface>：分离接口结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern44SeparatedInterface() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Separated Interface 结构图。接口定义在独立包中，高层模块依赖接口包，实现包依赖接口包，依赖方向始终指向抽象。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Separated Interface：接口独立成包，依赖指向抽象" />
          {/* 高层模块 */}
          <rect x={48} y={72} width={180} height={64} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={94} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">高层模块</text>
          <text x={64} y={118} fontSize="11" fill={T.secondary}>只 import 接口包</text>
          {/* 接口包 */}
          <rect x={290} y={64} width={160} height={80} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={290} y={64} width={160} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={290} y={84} width={160} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={370} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>接口包</text>
          <text x={306} y={112} fontSize="11" fontFamily="monospace" fill={T.primary}>interface Payment</text>
          <text x={306} y={130} fontSize="11" fontFamily="monospace" fill={T.primary}>  charge(amount)</text>
          {/* 实现包 */}
          <rect x={520} y={72} width={160} height={64} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={600} y={94} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">实现包</text>
          <text x={536} y={118} fontSize="11" fontFamily="monospace" fill={T.primary}>StripePayment</text>
          {/* 依赖箭头 */}
          <line x1={228} y1={104} x2={290} y2={104} stroke="#3FB97F" strokeWidth="1.5" />
          <text x={259} y={96} textAnchor="middle" fontSize="11" fill="#3FB97F">依赖</text>
          <line x1={520} y1={104} x2={450} y2={104} stroke="#E5B567" strokeWidth="1.5" />
          <text x={485} y={96} textAnchor="middle" fontSize="11" fill="#E5B567">实现</text>
          {/* 底部说明 */}
          <rect x={48} y={172} width={624} height={72} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={196} fontSize="11" fontWeight="600" fill={T.primary}>依赖方向规则：</text>
          <text x={64} y={218} fontSize="11" fill={T.secondary}>• 高层 → 接口包 ← 实现包：依赖始终指向抽象</text>
          <text x={64} y={236} fontSize="11" fill={T.secondary}>• 接口包不反向引用实现  • 可替换实现而不改高层代码（DI 注入）</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="接口独立成包，高层与实现都依赖抽象，依赖方向不反转" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分离接口将接口定义在独立包中，高层模块和实现包都依赖接口包，
        依赖方向始终指向抽象，可替换实现而不改高层代码。
      </figcaption>
    </figure>
  );
}
