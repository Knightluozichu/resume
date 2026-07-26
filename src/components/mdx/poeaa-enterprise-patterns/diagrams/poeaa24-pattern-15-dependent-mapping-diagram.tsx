/**
 * <Poeaa24Pattern15DependentMapping>：从属映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern15DependentMapping() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="从属映射图。从属对象（OrderItem）没有独立身份，其生命周期完全依附于所有者（Order），由所有者的 Mapper 统一负责加载和保存。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Dependent Mapping：从属对象无独立生命" />
          {/* 所有者 */}
          <rect x={48} y={64} width={200} height={120} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <rect x={48} y={64} width={200} height={28} rx="8" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={48} y={84} width={200} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={148} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3FB97F">Order（所有者）</text>
          <text x={64} y={112} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 42</text>
          <text x={64} y={132} fontSize="11" fontFamily="monospace" fill="#E5B567">items: OrderItem[]</text>
          <text x={64} y={152} fontSize="11" fontFamily="monospace" fill={T.primary}>total: 597.00</text>
          {/* 从属对象 */}
          <rect x={48} y={204} width={200} height={80} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" strokeDasharray="5 3" />
          <text x={148} y={226} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">OrderItem（从属）</text>
          <text x={64} y={248} fontSize="11" fontFamily="monospace" fill={T.primary}>product: "Widget"</text>
          <text x={64} y={266} fontSize="11" fontFamily="monospace" fill={T.primary}>qty: 3, price: 199</text>
          {/* 拥有关系 */}
          <line x1={148} y1={184} x2={148} y2={204} stroke="#3FB97F" strokeWidth="1.5" />
          <text x={160} y={198} fontSize="11" fill="#3FB97F">拥有 ◆</text>
          {/* Mapper */}
          <rect x={320} y={100} width={160} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={400} y={124} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>OrderMapper</text>
          <text x={336} y={148} fontSize="11" fontFamily="monospace" fill="#3FB97F">find(id) → Order+Items</text>
          <text x={336} y={166} fontSize="11" fontFamily="monospace" fill="#3FB97F">insert(order+items)</text>
          <text x={336} y={184} fontSize="11" fontFamily="monospace" fill="#3FB97F">delete(order+items)</text>
          {/* 箭头 */}
          <line x1={248} y1={130} x2={320} y2={140} stroke={T.accent} strokeWidth="1.2" />
          {/* 表侧 */}
          <rect x={530} y={64} width={160} height={60} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={610} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">orders</text>
          <text x={546} y={108} fontSize="11" fontFamily="monospace" fill={T.primary}>id | total</text>
          <rect x={530} y={144} width={160} height={80} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={610} y={166} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">order_items</text>
          <text x={546} y={188} fontSize="11" fontFamily="monospace" fill={T.primary}>order_id: 42 (FK)</text>
          <text x={546} y={206} fontSize="11" fontFamily="monospace" fill={T.primary}>product | qty | price</text>
          {/* 箭头到表 */}
          <line x1={480} y1={140} x2={530} y2={120} stroke="#E5B567" strokeWidth="1" strokeDasharray="4 2" />
          <line x1={480} y1={160} x2={530} y2={180} stroke="#E5B567" strokeWidth="1" strokeDasharray="4 2" />
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="从属对象没有自己的 Mapper，由所有者统一负责持久化" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dependent Mapping 让从属对象（如 OrderItem）没有独立身份和 Mapper，
        完全由所有者（Order）的 Mapper 统一加载和保存。
      </figcaption>
    </figure>
  );
}
