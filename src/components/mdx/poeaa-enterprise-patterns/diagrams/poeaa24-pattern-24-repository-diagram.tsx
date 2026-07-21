/**
 * <Poeaa24Pattern24Repository>：仓储结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern24Repository() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="仓储结构图。Repository 在领域层和数据源之间建立集合式接口，领域代码像操作内存集合一样存取聚合，底层由 Mapper/DataStore 实现。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Repository：领域层看到集合，不见 DB" />
          {/* 领域层 */}
          <rect x={48} y={64} width={180} height={100} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">领域服务</text>
          <text x={64} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>repo.findById(42)</text>
          <text x={64} y={128} fontSize="9" fontFamily="monospace" fill={T.primary}>repo.save(order)</text>
          <text x={64} y={146} fontSize="9" fontFamily="monospace" fill={T.primary}>repo.findBy(spec)</text>
          {/* 箭头 */}
          <line x1={228} y1={114} x2={290} y2={114} stroke={T.accent} strokeWidth="1.5" />
          {/* Repository 接口 */}
          <rect x={290} y={64} width={180} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={290} y={64} width={180} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={290} y={84} width={180} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={380} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>OrderRepository</text>
          <text x={306} y={112} fontSize="9" fontFamily="monospace" fill="#3FB97F">findById(id): Order</text>
          <text x={306} y={130} fontSize="9" fontFamily="monospace" fill="#3FB97F">save(order): void</text>
          <text x={306} y={148} fontSize="9" fontFamily="monospace" fill="#3FB97F">findBy(spec): Order[]</text>
          {/* 箭头到实现 */}
          <line x1={470} y1={114} x2={530} y2={114} stroke="#E5B567" strokeWidth="1.5" strokeDasharray="5 3" />
          <text x={500} y={106} textAnchor="middle" fontSize="9" fill="#E5B567">实现</text>
          {/* 数据源 */}
          <rect x={530} y={64} width={158} height={100} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={609} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">DataMapper</text>
          <text x={546} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>SQL / ORM</text>
          <text x={546} y={128} fontSize="9" fontFamily="monospace" fill={T.primary}>IdentityMap</text>
          <text x={546} y={146} fontSize="9" fontFamily="monospace" fill={T.primary}>UnitOfWork</text>
          {/* 底部说明 */}
          <rect x={48} y={196} width={624} height={100} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={220} fontSize="11" fontWeight="600" fill={T.primary}>Repository 的职责边界：</text>
          <text x={64} y={244} fontSize="10" fill={T.secondary}>• 对领域层暴露集合式接口（add/remove/find），隐藏持久化细节</text>
          <text x={64} y={264} fontSize="10" fill={T.secondary}>• 内部协调 DataMapper + IdentityMap + UnitOfWork 完成实际 I/O</text>
          <text x={64} y={284} fontSize="10" fill={T.secondary}>• 一个聚合根对应一个 Repository，粒度 = 聚合边界</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="领域层通过 Repository 像操作集合一样存取聚合，不见数据库" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Repository 在领域层和数据源之间建立集合式接口。
        领域代码像操作内存集合一样存取聚合，底层持久化细节完全隐藏。
      </figcaption>
    </figure>
  );
}
