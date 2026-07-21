/**
 * <Poeaa24Pattern19ClassTableInheritance>：类表继承映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 380;
export function Poeaa24Pattern19ClassTableInheritance() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="类表继承映射图。每个类（含抽象父类）对应一张表，子类表通过外键引用父类表主键，查询需要 JOIN。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Class Table Inheritance：每类一表 + JOIN" />
          {/* 类继承树 */}
          <rect x={48} y={64} width={140} height={44} rx="6" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={118} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Employee</text>
          <line x1={88} y1={108} x2={88} y2={128} stroke={T.secondary} strokeWidth="1" />
          <line x1={148} y1={108} x2={148} y2={128} stroke={T.secondary} strokeWidth="1" />
          <rect x={48} y={128} width={80} height={36} rx="6" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1" />
          <text x={88} y={150} textAnchor="middle" fontSize="10" fill="#E5B567">Engineer</text>
          <rect x={148} y={128} width={80} height={36} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={188} y={150} textAnchor="middle" fontSize="10" fill={T.accent}>Manager</text>
          {/* 映射箭头 */}
          <line x1={240} y1={110} x2={320} y2={110} stroke="#E5B567" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={280} y={102} textAnchor="middle" fontSize="10" fill="#E5B567">每类→一表</text>
          {/* 表：employees */}
          <rect x={320} y={64} width={180} height={80} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={410} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">employees</text>
          <text x={336} y={108} fontSize="10" fontFamily="monospace" fill={T.primary}>id (PK) | name</text>
          <text x={336} y={126} fontSize="10" fontFamily="monospace" fill={T.secondary}>公共字段</text>
          {/* 表：engineers */}
          <rect x={320} y={164} width={180} height={70} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={410} y={186} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">engineers</text>
          <text x={336} y={208} fontSize="10" fontFamily="monospace" fill={T.primary}>emp_id (FK) | skill</text>
          <text x={336} y={224} fontSize="9" fill={T.secondary}>FK → employees.id</text>
          {/* 表：managers */}
          <rect x={320} y={254} width={180} height={70} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.2" />
          <text x={410} y={276} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>managers</text>
          <text x={336} y={298} fontSize="10" fontFamily="monospace" fill={T.primary}>emp_id (FK) | budget</text>
          <text x={336} y={314} fontSize="9" fill={T.secondary}>FK → employees.id</text>
          {/* 右侧说明 */}
          <rect x={540} y={64} width={148} height={140} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={614} y={88} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.primary}>特点</text>
          <text x={556} y={112} fontSize="10" fill="#3FB97F">✓ 无 NULL 列</text>
          <text x={556} y={134} fontSize="10" fill="#3FB97F">✓ 表结构清晰</text>
          <text x={556} y={160} fontSize="10" fill={T.danger}>✗ 查询需 JOIN</text>
          <text x={556} y={182} fontSize="10" fill={T.danger}>✗ 多态查询复杂</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="每个类一张表，子类通过 FK 引用父类，查询需 JOIN 重组对象" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Class Table Inheritance 为继承树中的每个类创建一张表，
        子类表通过外键引用父类表。数据无冗余，但查询需要 JOIN。
      </figcaption>
    </figure>
  );
}
