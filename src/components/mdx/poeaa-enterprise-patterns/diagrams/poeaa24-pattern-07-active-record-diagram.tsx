/**
 * <Poeaa24Pattern07ActiveRecord>：活动记录结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern07ActiveRecord() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="活动记录结构图。对象 = 一行 + 业务逻辑。对象既有字段（对应表列），又有行为方法（业务规则），还能自己 save/delete。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Active Record：对象 = 行 + 业务逻辑" />
          <rect x={200} y={60} width={320} height={220} rx="10" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={200} y={60} width={320} height={28} rx="10" fill={T.accent} fillOpacity="0.12" />
          <rect x={200} y={80} width={320} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={360} y={79} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>Order (Active Record)</text>
          {/* 字段区 */}
          <text x={216} y={108} fontSize="10" fontFamily="monospace" fill={T.primary}>id: number</text>
          <text x={216} y={126} fontSize="10" fontFamily="monospace" fill={T.primary}>customerId: number</text>
          <text x={216} y={144} fontSize="10" fontFamily="monospace" fill={T.primary}>amount: number</text>
          <line x1={200} y1={154} x2={520} y2={154} stroke={T.accent} strokeWidth="0.6" strokeOpacity="0.4" />
          {/* 方法区 */}
          <text x={216} y={174} fontSize="10" fontFamily="monospace" fill="#3FB97F">+ save(): void</text>
          <text x={216} y={192} fontSize="10" fontFamily="monospace" fill="#3FB97F">+ delete(): void</text>
          <text x={216} y={214} fontSize="10" fontFamily="monospace" fill="#E5B567">+ calculateDiscount(): number</text>
          <text x={216} y={232} fontSize="10" fontFamily="monospace" fill="#E5B567">+ isOverdue(): boolean</text>
          <text x={216} y={254} fontSize="10" fontFamily="monospace" fill="#E5B567">+ applyCoupon(code): void</text>
          {/* 标注 */}
          <text x={540} y={120} fontSize="10" fill={T.secondary}>← 数据（= 表列）</text>
          <text x={540} y={180} fontSize="10" fill="#3FB97F">← 持久化</text>
          <text x={540} y={230} fontSize="10" fill="#E5B567">← 业务逻辑</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Active Record = Row Data Gateway + 领域行为，适合中等复杂度" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Active Record 在 Row Data Gateway 基础上叠加业务逻辑。
        对象既是数据容器又是行为载体，适合中等复杂度的领域。
      </figcaption>
    </figure>
  );
}
