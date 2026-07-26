/**
 * <Poeaa24Pattern23QueryObject>：查询对象结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern23QueryObject() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="查询对象结构图。将 SQL 查询条件封装为对象，支持组合、复用和数据库无关性，由 QueryObject 翻译为目标 SQL。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Query Object：查询条件 → 可组合对象" />
          {/* 业务代码构建查询 */}
          <rect x={48} y={64} width={200} height={120} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={148} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">业务代码</text>
          <text x={64} y={110} fontSize="11" fontFamily="monospace" fill={T.primary}>Query q = new Query()</text>
          <text x={64} y={128} fontSize="11" fontFamily="monospace" fill={T.primary}>  .where("status","paid")</text>
          <text x={64} y={146} fontSize="11" fontFamily="monospace" fill={T.primary}>{'  .and("amount", ">", 100)'}</text>
          <text x={64} y={164} fontSize="11" fontFamily="monospace" fill={T.primary}>  .orderBy("date", DESC)</text>
          {/* 箭头 */}
          <line x1={248} y1={124} x2={310} y2={124} stroke={T.accent} strokeWidth="1.5" />
          <text x={279} y={116} textAnchor="middle" fontSize="11" fill={T.accent}>构建</text>
          {/* QueryObject */}
          <rect x={310} y={64} width={170} height={120} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={310} y={64} width={170} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={310} y={84} width={170} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={395} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>QueryObject</text>
          <text x={326} y={112} fontSize="11" fontFamily="monospace" fill={T.primary}>criteria: []</text>
          <text x={326} y={130} fontSize="11" fontFamily="monospace" fill={T.primary}>order: []</text>
          <text x={326} y={152} fontSize="11" fontFamily="monospace" fill="#3FB97F">toSQL(dialect)</text>
          <text x={326} y={170} fontSize="11" fontFamily="monospace" fill="#3FB97F">execute(session)</text>
          {/* 箭头到 SQL */}
          <line x1={480} y1={124} x2={540} y2={124} stroke="#E5B567" strokeWidth="1.5" />
          <text x={510} y={116} textAnchor="middle" fontSize="11" fill="#E5B567">翻译</text>
          {/* 生成的 SQL */}
          <rect x={540} y={64} width={148} height={120} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={614} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">SQL</text>
          <text x={556} y={110} fontSize="11" fontFamily="monospace" fill={T.primary}>SELECT * FROM orders</text>
          <text x={556} y={128} fontSize="11" fontFamily="monospace" fill={T.primary}>WHERE status='paid'</text>
          <text x={556} y={146} fontSize="11" fontFamily="monospace" fill={T.primary}>  AND amount &gt; 100</text>
          <text x={556} y={164} fontSize="11" fontFamily="monospace" fill={T.primary}>ORDER BY date DESC</text>
          {/* 底部说明 */}
          <rect x={48} y={216} width={624} height={80} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={240} fontSize="11" fontWeight="600" fill={T.primary}>优势：</text>
          <text x={64} y={262} fontSize="11" fill={T.secondary}>• 查询可组合、可复用、可序列化  • 业务代码不依赖 SQL 方言</text>
          <text x={64} y={282} fontSize="11" fill={T.secondary}>• 可针对元数据验证字段名  • 支持动态构建复杂查询</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="查询条件封装为对象，与 SQL 方言解耦，支持组合和验证" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Query Object 将查询条件封装为可组合的对象，与 SQL 方言解耦。
        业务代码构建查询对象，由框架翻译为目标数据库的 SQL。
      </figcaption>
    </figure>
  );
}
