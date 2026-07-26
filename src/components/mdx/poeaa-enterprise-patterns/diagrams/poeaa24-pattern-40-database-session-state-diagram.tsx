/**
 * <Poeaa24Pattern40DatabaseSessionState>：数据库会话状态结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern40DatabaseSessionState() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数据库会话状态结构图。会话数据持久化到数据库表中，任意应用节点均可读取，支持事务化读写和过期清理，代价是每次访问都有数据库开销。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Database Session State：状态持久化到数据库" />
          {/* 客户端 */}
          <rect x={48} y={64} width={150} height={70} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={123} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">客户端</text>
          <text x={64} y={110} fontSize="11" fontFamily="monospace" fill={T.primary}>sid=abc123</text>
          {/* 箭头到应用服务器 */}
          <line x1={198} y1={99} x2={260} y2={99} stroke={T.accent} strokeWidth="1.5" />
          {/* 应用服务器（多节点） */}
          <rect x={260} y={64} width={180} height={70} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={350} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>任意应用节点</text>
          <text x={276} y={110} fontSize="11" fill={T.secondary}>无本地状态，按需读写 DB</text>
          {/* 箭头到数据库 */}
          <line x1={440} y1={99} x2={510} y2={99} stroke="#E5B567" strokeWidth="1.5" />
          <text x={475} y={90} textAnchor="middle" fontSize="11" fill="#E5B567">SQL</text>
          {/* 数据库 */}
          <rect x={510} y={64} width={170} height={100} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={595} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">sessions 表</text>
          <text x={526} y={108} fontSize="11" fontFamily="monospace" fill={T.primary}>sid | data | expires</text>
          <text x={526} y={126} fontSize="11" fontFamily="monospace" fill={T.primary}>abc | {"{...}"} | 30m</text>
          <text x={526} y={148} fontSize="11" fill={T.secondary}>事务化读写 · 过期清理</text>
          {/* 底部说明 */}
          <rect x={48} y={196} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={220} fontSize="11" fontWeight="600" fill={T.primary}>适用与限制：</text>
          <text x={64} y={242} fontSize="11" fill={T.secondary}>• 适用：需持久化、跨节点共享、故障恢复  • 限制：每次访问有 DB 开销，高并发时成热点</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="状态持久化到数据库，任意节点可读写，代价是 DB 开销" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据库会话状态将数据持久化到数据库表中，任意应用节点均可读写，
        支持事务化操作和故障恢复，代价是每次访问都有数据库开销。
      </figcaption>
    </figure>
  );
}
