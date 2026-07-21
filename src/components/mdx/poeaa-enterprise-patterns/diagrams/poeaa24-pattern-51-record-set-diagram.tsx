/**
 * <Poeaa24Pattern51RecordSet>：记录集结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern51RecordSet() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Record Set 结构图。Record Set 是数据库查询结果的内存表示，行/列结构可被 Table Module 或 UI 直接消费，是数据库与领域之间的中间形态。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Record Set：查询结果的内存表格" />
          {/* 数据库 */}
          <rect x={48} y={64} width={150} height={80} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={123} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">数据库</text>
          <text x={64} y={110} fontSize="9" fill={T.secondary}>SELECT * FROM</text>
          <text x={64} y={128} fontSize="9" fill={T.secondary}>  orders</text>
          {/* 箭头 */}
          <line x1={198} y1={104} x2={260} y2={104} stroke={T.accent} strokeWidth="1.5" />
          <text x={229} y={96} textAnchor="middle" fontSize="9" fill={T.accent}>查询</text>
          {/* Record Set */}
          <rect x={260} y={64} width={220} height={110} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={260} y={64} width={220} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={260} y={84} width={220} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={370} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>RecordSet</text>
          <text x={276} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>id | total | status</text>
          <text x={276} y={128} fontSize="9" fontFamily="monospace" fill={T.primary}>42 | 597  | paid</text>
          <text x={276} y={146} fontSize="9" fontFamily="monospace" fill={T.primary}>43 | 120  | open</text>
          <text x={276} y={164} fontSize="9" fill={T.secondary}>行/列结构 · 内存中</text>
          {/* 消费者 */}
          <line x1={480} y1={90} x2={540} y2={72} stroke="#3FB97F" strokeWidth="1" />
          <line x1={480} y1={130} x2={540} y2={148} stroke="#3FB97F" strokeWidth="1" />
          <rect x={540} y={56} width={140} height={32} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={610} y={76} textAnchor="middle" fontSize="9" fill="#3FB97F">Table Module</text>
          <rect x={540} y={132} width={140} height={32} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={610} y={152} textAnchor="middle" fontSize="9" fill="#3FB97F">UI 数据绑定</text>
          {/* 底部说明 */}
          <rect x={48} y={200} width={624} height={56} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={222} fontSize="11" fontWeight="600" fill={T.primary}>定位：</text>
          <text x={64} y={242} fontSize="11" fill={T.secondary}>数据库与领域之间的中间形态。适合简单 CRUD 和报表；复杂领域逻辑应转为 Domain Model。</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Record Set 是查询结果的内存行/列表格，可被 Table Module 直接消费" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Record Set 是数据库查询结果的内存表示，行/列结构可被 Table Module 或 UI 直接消费，
        是数据库与领域之间的中间形态。
      </figcaption>
    </figure>
  );
}
