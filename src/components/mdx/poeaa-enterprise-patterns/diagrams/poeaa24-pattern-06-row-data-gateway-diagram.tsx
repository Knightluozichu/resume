/**
 * <Poeaa24Pattern06RowDataGateway>：行数据入口结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern06RowDataGateway() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="行数据入口结构图。一个对象实例对应数据库中的一行，对象持有字段值和 save/delete 方法。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Row Data Gateway：一个对象 = 一行" />
          {/* 对象实例 */}
          <rect x={200} y={64} width={320} height={180} rx="10" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={200} y={64} width={320} height={28} rx="10" fill="#E5B567" fillOpacity="0.12" />
          <rect x={200} y={84} width={320} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={360} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E5B567">OrderRow (实例 = 一行)</text>
          <text x={216} y={112} fontSize="11" fontFamily="monospace" fill={T.primary}>id: number</text>
          <text x={216} y={132} fontSize="11" fontFamily="monospace" fill={T.primary}>customerId: number</text>
          <text x={216} y={152} fontSize="11" fontFamily="monospace" fill={T.primary}>amount: number</text>
          <text x={216} y={172} fontSize="11" fontFamily="monospace" fill={T.primary}>status: string</text>
          <line x1={200} y1={182} x2={520} y2={182} stroke="#E5B567" strokeWidth="0.6" strokeOpacity="0.4" />
          <text x={216} y={202} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ save(): void</text>
          <text x={216} y={222} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ delete(): void</text>
          {/* 对应关系 */}
          <text x={48} y={290} fontSize="11" fill="#E5B567">✓ 对象字段 = 表列，一一对应</text>
          <text x={400} y={290} fontSize="11" fill={T.danger}>✗ 无业务逻辑，只是数据容器</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="每个实例精确对应一行，字段即列，方法只有 save/delete" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Row Data Gateway 让一个对象实例精确对应数据库中的一行。
        对象持有字段值并提供 save/delete 方法，但不包含业务逻辑。
      </figcaption>
    </figure>
  );
}
