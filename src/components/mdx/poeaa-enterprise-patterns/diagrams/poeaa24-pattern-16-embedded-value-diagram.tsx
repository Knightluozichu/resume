/**
 * <Poeaa24Pattern16EmbeddedValue>：嵌入值映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern16EmbeddedValue() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="嵌入值映射图。值对象（如 Money、Address）没有独立表，其字段直接展开为所有者表的列。对象侧是嵌套结构，表侧是扁平列。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Embedded Value：值对象 → 扁平列" />
          {/* 对象侧 */}
          <rect x={48} y={64} width={240} height={140} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <rect x={48} y={64} width={240} height={28} rx="8" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={48} y={84} width={240} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={168} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3FB97F">Employee</text>
          <text x={64} y={112} fontSize="10" fontFamily="monospace" fill={T.primary}>id: 1</text>
          <text x={64} y={132} fontSize="10" fontFamily="monospace" fill={T.primary}>name: "Bob"</text>
          <rect x={72} y={142} width={196} height={48} rx="4" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1" strokeDasharray="4 2" />
          <text x={84} y={160} fontSize="10" fontFamily="monospace" fill="#E5B567">address: Address</text>
          <text x={84} y={178} fontSize="9" fontFamily="monospace" fill={T.secondary}>  .city .street .zip</text>
          {/* 映射箭头 */}
          <line x1={288} y1={134} x2={420} y2={134} stroke="#E5B567" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={354} y={126} textAnchor="middle" fontSize="10" fill="#E5B567">展开为列</text>
          {/* 表侧 */}
          <rect x={420} y={64} width={260} height={140} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={420} y={64} width={260} height={28} rx="8" fill="#E5B567" fillOpacity="0.12" />
          <rect x={420} y={84} width={260} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={550} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E5B567">employees 表</text>
          <text x={436} y={112} fontSize="10" fontFamily="monospace" fill={T.primary}>id: 1</text>
          <text x={436} y={132} fontSize="10" fontFamily="monospace" fill={T.primary}>name: 'Bob'</text>
          <text x={436} y={152} fontSize="10" fontFamily="monospace" fill="#E5B567">city: 'Shanghai'</text>
          <text x={436} y={172} fontSize="10" fontFamily="monospace" fill="#E5B567">street: 'Nanjing Rd'</text>
          <text x={436} y={192} fontSize="10" fontFamily="monospace" fill="#E5B567">zip: '200001'</text>
          {/* 底部说明 */}
          <rect x={48} y={228} width={624} height={48} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={250} fontSize="11" fill={T.secondary}>• 值对象无独立表、无主键，字段直接平铺到所有者表中</text>
          <text x={64} y={268} fontSize="11" fill={T.secondary}>• 适合：Money、Address、DateRange 等不可变小对象</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="值对象的字段展开为所有者表的列，无需 JOIN" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Embedded Value 将值对象（如 Address）的字段直接映射为所有者表的列。
        无需额外表和 JOIN，但列数会随值对象字段增长。
      </figcaption>
    </figure>
  );
}
