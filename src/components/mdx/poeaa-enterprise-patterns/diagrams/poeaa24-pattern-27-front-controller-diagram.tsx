/**
 * <Poeaa24Pattern27FrontController>：前端控制器请求流图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern27FrontController() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="前端控制器请求流图。所有请求经过单一入口 Front Controller，由它分发到对应的 Command/Handler 处理，统一处理安全、日志等横切关注点。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Front Controller：单一入口 → 分发" />
          {/* 请求入口 */}
          <rect x={48} y={80} width={100} height={36} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={98} y={102} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={T.primary}>所有请求</text>
          <line x1={148} y1={98} x2={200} y2={98} stroke={T.primary} strokeWidth="1.2" />
          {/* Front Controller */}
          <rect x={200} y={64} width={180} height={120} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={200} y={64} width={180} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={200} y={84} width={200} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={290} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>FrontController</text>
          <text x={216} y={112} fontSize="9" fill={T.secondary}>① 认证/日志</text>
          <text x={216} y={130} fontSize="9" fill={T.secondary}>② 解析 URL</text>
          <text x={216} y={148} fontSize="9" fill="#3FB97F">③ 分发到 Command</text>
          <text x={216} y={166} fontSize="9" fill={T.secondary}>④ 选择 View</text>
          {/* 分发箭头 */}
          <line x1={380} y1={100} x2={460} y2={80} stroke="#E5B567" strokeWidth="1" />
          <line x1={380} y1={124} x2={460} y2={124} stroke="#E5B567" strokeWidth="1" />
          <line x1={380} y1={148} x2={460} y2={168} stroke="#E5B567" strokeWidth="1" />
          {/* Commands */}
          <rect x={460} y={64} width={210} height={36} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={565} y={86} textAnchor="middle" fontSize="10" fill="#3FB97F">ViewOrderCommand</text>
          <rect x={460} y={108} width={210} height={36} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={565} y={130} textAnchor="middle" fontSize="10" fill="#3FB97F">EditOrderCommand</text>
          <rect x={460} y={152} width={210} height={36} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={565} y={174} textAnchor="middle" fontSize="10" fill="#3FB97F">DeleteOrderCommand</text>
          {/* 底部说明 */}
          <rect x={48} y={220} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={244} fontSize="11" fontWeight="600" fill={T.primary}>vs Page Controller：</text>
          <text x={64} y={266} fontSize="11" fill={T.secondary}>Front Controller 集中处理横切关注点（安全、日志、错误），Command 只关注业务</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="所有请求经单一入口分发，横切关注点集中处理" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Front Controller 用单一入口处理所有请求，统一处理安全、日志等横切关注点，
        再分发到具体 Command 处理业务逻辑。
      </figcaption>
    </figure>
  );
}
