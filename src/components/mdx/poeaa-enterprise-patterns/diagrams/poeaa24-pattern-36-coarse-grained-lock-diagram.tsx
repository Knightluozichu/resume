/**
 * <Poeaa24Pattern36CoarseGrainedLock>：粗粒度锁结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern36CoarseGrainedLock() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="粗粒度锁结构图。对聚合根加一把锁，聚合内所有对象共享该锁：锁 Order 即锁住其下所有 LineItem 和 Payment。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Coarse-Grained Lock：锁聚合根，保护整棵树" />
          {/* 聚合根 */}
          <rect x={280} y={64} width={160} height={48} rx="8" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="2" />
          <text x={360} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>Order（聚合根）</text>
          <text x={360} y={102} textAnchor="middle" fontSize="9" fill={T.accent}>🔒 version = 3</text>
          {/* 子对象 */}
          <line x1={320} y1={112} x2={200} y2={148} stroke={T.border} strokeWidth="1.2" />
          <line x1={360} y1={112} x2={360} y2={148} stroke={T.border} strokeWidth="1.2" />
          <line x1={400} y1={112} x2={520} y2={148} stroke={T.border} strokeWidth="1.2" />
          <rect x={120} y={148} width={160} height={40} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={200} y={172} textAnchor="middle" fontSize="9" fill={T.primary}>LineItem #1</text>
          <rect x={280} y={148} width={160} height={40} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={360} y={172} textAnchor="middle" fontSize="9" fill={T.primary}>LineItem #2</text>
          <rect x={440} y={148} width={160} height={40} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={520} y={172} textAnchor="middle" fontSize="9" fill={T.primary}>Payment</text>
          {/* 锁覆盖范围 */}
          <rect x={104} y={56} width={512} height={144} rx="12" fill="none" stroke={T.accent} strokeWidth="1" strokeDasharray="6 4" />
          <text x={616} y={72} textAnchor="end" fontSize="9" fill={T.accent}>一把锁覆盖全部</text>
          {/* 底部说明 */}
          <rect x={48} y={216} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={240} fontSize="11" fontWeight="600" fill={T.primary}>vs 细粒度锁：</text>
          <text x={64} y={262} fontSize="11" fill={T.secondary}>• 只需管理一把锁（简单）  • 不漏锁（完整保护）  • 代价：无关修改也可能互相阻塞</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="锁住聚合根即锁住整棵对象树，管理简单但可能过度阻塞" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        粗粒度锁对聚合根加一把锁，聚合内所有对象共享该锁。
        管理简单、不漏锁，代价是无关修改也可能互相阻塞。
      </figcaption>
    </figure>
  );
}
