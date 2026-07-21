/**
 * <Poeaa24Pattern47Money>：Money 值对象结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern47Money() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Money 值对象结构图。Money 封装金额和币种，运算时强制检查币种一致性，避免浮点精度丢失和跨币种混算。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Money：金额 + 币种，运算自带保护" />
          {/* Money 类 */}
          <rect x={250} y={64} width={220} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={250} y={64} width={220} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={250} y={84} width={220} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={360} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>Money（值对象）</text>
          <text x={266} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>amount: BigDecimal</text>
          <text x={266} y={128} fontSize="9" fontFamily="monospace" fill={T.primary}>currency: CNY</text>
          <text x={266} y={146} fontSize="9" fontFamily="monospace" fill="#3FB97F">add(m) / multiply(n)</text>
          {/* 左侧：正确用法 */}
          <rect x={48} y={64} width={170} height={100} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={133} y={86} textAnchor="middle" fontSize="10" fontWeight="600" fill="#3FB97F">✓ 受保护的运算</text>
          <text x={64} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>¥100 + ¥50 = ¥150</text>
          <text x={64} y={130} fontSize="9" fill={T.secondary}>币种一致才允许相加</text>
          <text x={64} y={148} fontSize="9" fill={T.secondary}>精度由 BigDecimal 保证</text>
          {/* 右侧：错误用法 */}
          <rect x={500} y={64} width={180} height={100} rx="8" fill="#E5634D" fillOpacity="0.06" stroke="#E5634D" strokeWidth="1.2" />
          <text x={590} y={86} textAnchor="middle" fontSize="10" fontWeight="600" fill="#E5634D">✗ 裸数字的问题</text>
          <text x={516} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>100 + 50 = ?（美元?）</text>
          <text x={516} y={130} fontSize="9" fill={T.secondary}>0.1 + 0.2 ≠ 0.3</text>
          <text x={516} y={148} fontSize="9" fill={T.secondary}>币种混算无警告</text>
          {/* 底部说明 */}
          <rect x={48} y={192} width={624} height={52} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={214} fontSize="11" fill={T.secondary}>• Money 是值对象：¥100 == ¥100，不可变，可自由替换</text>
          <text x={64} y={232} fontSize="11" fill={T.secondary}>• 跨币种运算需显式汇率转换，绝不静默混算</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Money 封装金额与币种，运算自带精度和币种保护" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Money 是典型的值对象：封装金额和币种，运算时强制检查币种一致性，
        避免浮点精度丢失和跨币种混算。
      </figcaption>
    </figure>
  );
}
