/**
 * <Poeaa24Pattern12IdentityField>：标识字段映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern12IdentityField() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="标识字段映射图。对象的 id 字段对应表的主键列，用于在内存中唯一标识对象并与数据库行建立对应关系。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Identity Field：对象 ID ↔ 表主键" />
          {/* 对象侧 */}
          <rect x={48} y={64} width={240} height={140} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <rect x={48} y={64} width={240} height={28} rx="8" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={48} y={84} width={240} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={168} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3FB97F">Order（内存对象）</text>
          <text x={64} y={112} fontSize="10" fontFamily="monospace" fill="#E5B567">id: 42  ← 标识字段</text>
          <text x={64} y={132} fontSize="10" fontFamily="monospace" fill={T.primary}>customer: Customer</text>
          <text x={64} y={152} fontSize="10" fontFamily="monospace" fill={T.primary}>amount: 199.00</text>
          <text x={64} y={172} fontSize="10" fontFamily="monospace" fill={T.primary}>status: "pending"</text>
          {/* 箭头 */}
          <line x1={288} y1={112} x2={432} y2={112} stroke="#E5B567" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={360} y={104} textAnchor="middle" fontSize="10" fill="#E5B567">映射</text>
          {/* 表侧 */}
          <rect x={432} y={64} width={240} height={140} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={432} y={64} width={240} height={28} rx="8" fill="#E5B567" fillOpacity="0.12" />
          <rect x={432} y={84} width={240} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={552} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E5B567">orders 表</text>
          <text x={448} y={112} fontSize="10" fontFamily="monospace" fill="#E5B567">id: 42  ← PK</text>
          <text x={448} y={132} fontSize="10" fontFamily="monospace" fill={T.primary}>customer_id: 7</text>
          <text x={448} y={152} fontSize="10" fontFamily="monospace" fill={T.primary}>amount: 199.00</text>
          <text x={448} y={172} fontSize="10" fontFamily="monospace" fill={T.primary}>status: 'pending'</text>
          {/* 底部说明 */}
          <rect x={48} y={228} width={624} height={48} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={250} fontSize="11" fill={T.secondary}>• 标识字段让对象在内存中有唯一身份，无需比较全部字段</text>
          <text x={64} y={268} fontSize="11" fill={T.secondary}>• Identity Map 和 Unit of Work 都依赖此字段做对象追踪</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="每个领域对象持有一个 id 字段，精确对应数据库主键" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Identity Field 在对象中保存数据库主键值，使对象在内存中拥有唯一身份，
        是 Identity Map 和 Unit of Work 的基础。
      </figcaption>
    </figure>
  );
}
