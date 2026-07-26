/**
 * <Poeaa24Pattern14AssociationTableMapping>：关联表映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern14AssociationTableMapping() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="关联表映射图。多对多关系（Student ↔ Course）通过中间关联表 student_course 实现，对象侧是集合引用，表侧是两张外键组成的连接表。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Association Table：多对多 → 中间表" />
          {/* 对象侧 */}
          <rect x={48} y={64} width={160} height={80} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={128} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Student</text>
          <text x={64} y={108} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 1</text>
          <text x={64} y={126} fontSize="11" fontFamily="monospace" fill="#E5B567">courses: Course[]</text>
          <rect x={48} y={184} width={160} height={80} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={128} y={206} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Course</text>
          <text x={64} y={228} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 101</text>
          <text x={64} y={246} fontSize="11" fontFamily="monospace" fill="#E5B567">students: Student[]</text>
          {/* 多对多标注 */}
          <text x={128} y={168} textAnchor="middle" fontSize="11" fill="#E5B567">M : N</text>
          <line x1={128} y1={144} x2={128} y2={184} stroke="#E5B567" strokeWidth="1" strokeDasharray="4 2" />
          {/* 映射箭头 */}
          <line x1={240} y1={160} x2={380} y2={160} stroke={T.accent} strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={310} y={152} textAnchor="middle" fontSize="11" fill={T.accent}>需要中间表</text>
          {/* 表侧 */}
          <rect x={380} y={64} width={140} height={60} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={450} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">students</text>
          <text x={396} y={108} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 1 (PK)</text>
          <rect x={380} y={204} width={140} height={60} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={450} y={226} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">courses</text>
          <text x={396} y={248} fontSize="11" fontFamily="monospace" fill={T.primary}>id: 101 (PK)</text>
          {/* 中间关联表 */}
          <rect x={560} y={120} width={130} height={80} rx="8" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1.5" />
          <text x={625} y={142} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>student_course</text>
          <text x={572} y={164} fontSize="11" fontFamily="monospace" fill="#E5B567">student_id: 1</text>
          <text x={572} y={182} fontSize="11" fontFamily="monospace" fill="#E5B567">course_id: 101</text>
          {/* FK 箭头 */}
          <line x1={520} y1={94} x2={560} y2={140} stroke="#E5B567" strokeWidth="1" strokeDasharray="3 2" />
          <line x1={520} y1={234} x2={560} y2={180} stroke="#E5B567" strokeWidth="1" strokeDasharray="3 2" />
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="多对多关系无法用单个 FK 表达，需要独立的关联表承载两端 ID" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Association Table Mapping 用独立的中间表存储多对多关系。
        对象侧是集合引用，表侧是两个外键组成的连接行。
      </figcaption>
    </figure>
  );
}
