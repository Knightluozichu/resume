/**
 * <Poeaa24Pattern17SerializedLob>：序列化 LOB 映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern17SerializedLob() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="序列化 LOB 映射图。对象图（含嵌套和集合）被序列化为一个大字段（BLOB/CLOB）存入单行，读取时反序列化恢复完整对象图。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Serialized LOB：对象图 → 单字段存储" />
          {/* 对象图 */}
          <rect x={48} y={64} width={220} height={160} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <rect x={48} y={64} width={220} height={28} rx="8" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={48} y={84} width={220} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={158} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3FB97F">Order 对象图</text>
          <text x={64} y={112} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 42</text>
          <text x={64} y={132} fontSize="11" fontFamily="monospace" fill={T.primary}>items: [</text>
          <text x={80} y={150} fontSize="11" fontFamily="monospace" fill={T.secondary}>Item("A", 2),</text>
          <text x={80} y={168} fontSize="11" fontFamily="monospace" fill={T.secondary}>Item("B", 1)</text>
          <text x={64} y={186} fontSize="11" fontFamily="monospace" fill={T.primary}>]</text>
          <text x={64} y={206} fontSize="11" fontFamily="monospace" fill={T.primary}>coupon: Coupon(10%)</text>
          {/* 序列化箭头 */}
          <line x1={268} y1={144} x2={380} y2={144} stroke={T.accent} strokeWidth="1.5" />
          <text x={324} y={134} textAnchor="middle" fontSize="11" fill={T.accent}>serialize()</text>
          <line x1={380} y1={174} x2={268} y2={174} stroke="#3FB97F" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x={324} y={192} textAnchor="middle" fontSize="11" fill="#3FB97F">deserialize()</text>
          {/* 表侧 */}
          <rect x={380} y={64} width={300} height={160} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={380} y={64} width={300} height={28} rx="8" fill="#E5B567" fillOpacity="0.12" />
          <rect x={380} y={84} width={300} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={530} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E5B567">orders 表（一行）</text>
          <text x={396} y={112} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 42</text>
          <rect x={396} y={122} width={268} height={80} rx="4" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1" strokeDasharray="4 2" />
          <text x={408} y={142} fontSize="11" fontFamily="monospace" fill={T.accent}>data: BLOB/CLOB</text>
          <text x={408} y={162} fontSize="11" fontFamily="monospace" fill={T.secondary}>{'{"id":42,"items":[{"sku":"A",'}</text>
          <text x={408} y={178} fontSize="11" fontFamily="monospace" fill={T.secondary}>{'"qty":2},...],"coupon":{...}}'}</text>
          <text x={408} y={196} fontSize="11" fill={T.secondary}>整个对象图压缩为一个字段</text>
          {/* 底部说明 */}
          <rect x={48} y={248} width={624} height={48} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={270} fontSize="11" fill={T.secondary}>✓ 简单：无需多表 JOIN，一次读写完整对象图</text>
          <text x={64} y={288} fontSize="11" fill={T.danger}>✗ 无法按字段查询/索引，并发修改粒度粗</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="适合结构复杂但整体读写的对象图，牺牲查询灵活性换取简单" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Serialized LOB 将整个对象图序列化为一个大字段存入数据库。
        读写简单（一次 I/O），但无法对内部字段做 SQL 查询或索引。
      </figcaption>
    </figure>
  );
}
