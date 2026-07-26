/**
 * <Poeaa24Pattern13ForeignKeyMapping>：外键映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern13ForeignKeyMapping() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="外键映射图。对象间的引用关系（Order 引用 Customer）映射为表间的外键列（orders.customer_id → customers.id）。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Foreign Key Mapping：对象引用 → 外键列" />
          {/* 对象侧 */}
          <rect x={48} y={64} width={180} height={100} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Order</text>
          <text x={64} y={108} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 42</text>
          <text x={64} y={126} fontSize="11" fontFamily="monospace" fill="#E5B567">customer: Customer</text>
          <text x={64} y={144} fontSize="11" fontFamily="monospace" fill={T.primary}>amount: 199</text>
          <rect x={48} y={184} width={180} height={80} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={206} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Customer</text>
          <text x={64} y={228} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 7</text>
          <text x={64} y={246} fontSize="11" fontFamily="monospace" fill={T.primary}>name: "Alice"</text>
          {/* 对象引用箭头 */}
          <line x1={138} y1={164} x2={138} y2={184} stroke="#E5B567" strokeWidth="1.2" />
          <text x={148} y={178} fontSize="11" fill="#E5B567">引用</text>
          {/* 中间映射箭头 */}
          <line x1={260} y1={126} x2={432} y2={108} stroke="#E5B567" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={346} y={108} textAnchor="middle" fontSize="11" fill="#E5B567">对象引用 → FK 列</text>
          {/* 表侧 */}
          <rect x={432} y={64} width={240} height={100} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={552} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">orders</text>
          <text x={448} y={108} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 42</text>
          <text x={448} y={126} fontSize="11" fontFamily="monospace" fill="#E5B567">customer_id: 7  ← FK</text>
          <text x={448} y={144} fontSize="11" fontFamily="monospace" fill={T.primary}>amount: 199</text>
          <rect x={432} y={184} width={240} height={80} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={552} y={206} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">customers</text>
          <text x={448} y={228} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 7  ← PK</text>
          <text x={448} y={246} fontSize="11" fontFamily="monospace" fill={T.primary}>name: 'Alice'</text>
          {/* FK 关系箭头 */}
          <line x1={552} y1={164} x2={552} y2={184} stroke="#E5B567" strokeWidth="1.2" />
          <text x={562} y={178} fontSize="11" fill="#E5B567">FK→PK</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="对象间的引用在关系层变成外键列，指向目标表主键" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Foreign Key Mapping 将对象间的引用关系映射为表间的外键列。
        加载时通过 FK 值查找关联对象，保存时写入 FK 值。
      </figcaption>
    </figure>
  );
}
