/**
 * <Poeaa24Pattern20ConcreteTableInheritance>：具体表继承映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern20ConcreteTableInheritance() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="具体表继承映射图。只有具体子类有表，每张表包含父类所有字段（冗余），无外键无 JOIN，但多态查询需 UNION。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Concrete Table Inheritance：每具体类一表（含父字段）" />
          {/* 类继承树 */}
          <rect x={48} y={64} width={140} height={44} rx="6" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1.2" strokeDasharray="5 3" />
          <text x={118} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Employee (抽象)</text>
          <line x1={88} y1={108} x2={88} y2={128} stroke={T.secondary} strokeWidth="1" />
          <line x1={148} y1={108} x2={148} y2={128} stroke={T.secondary} strokeWidth="1" />
          <rect x={48} y={128} width={80} height={36} rx="6" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1" />
          <text x={88} y={150} textAnchor="middle" fontSize="11" fill="#E5B567">Engineer</text>
          <rect x={148} y={128} width={80} height={36} rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
          <text x={188} y={150} textAnchor="middle" fontSize="11" fill={T.accent}>Manager</text>
          {/* 映射箭头 */}
          <line x1={240} y1={130} x2={320} y2={130} stroke="#E5B567" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={280} y={122} textAnchor="middle" fontSize="11" fill="#E5B567">仅具体类</text>
          {/* 表：engineers（含父字段） */}
          <rect x={320} y={64} width={180} height={100} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={410} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">engineers</text>
          <text x={336} y={108} fontSize="11" fontFamily="monospace" fill={T.secondary}>id | name</text>
          <text x={336} y={126} fontSize="11" fill={T.secondary}>↑ 父类字段冗余</text>
          <text x={336} y={148} fontSize="11" fontFamily="monospace" fill="#E5B567">skill</text>
          {/* 表：managers（含父字段） */}
          <rect x={320} y={184} width={180} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.2" />
          <text x={410} y={206} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>managers</text>
          <text x={336} y={228} fontSize="11" fontFamily="monospace" fill={T.secondary}>id | name</text>
          <text x={336} y={246} fontSize="11" fill={T.secondary}>↑ 父类字段冗余</text>
          <text x={336} y={268} fontSize="11" fontFamily="monospace" fill={T.accent}>budget</text>
          {/* 右侧说明 */}
          <rect x={540} y={64} width={148} height={160} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={614} y={88} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.primary}>特点</text>
          <text x={556} y={112} fontSize="11" fill="#3FB97F">✓ 无 JOIN</text>
          <text x={556} y={134} fontSize="11" fill="#3FB97F">✓ 无 NULL 列</text>
          <text x={556} y={160} fontSize="11" fill={T.danger}>✗ 父字段冗余</text>
          <text x={556} y={182} fontSize="11" fill={T.danger}>✗ 多态需 UNION</text>
          <text x={556} y={204} fontSize="11" fill={T.danger}>✗ 父类改字段波及所有表</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="无父类表，每张具体表自含全部字段，查询单类快但多态需 UNION" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Concrete Table Inheritance 只为具体类建表，每张表包含父类所有字段。
        单类查询无需 JOIN，但多态查询需 UNION，且父类变更波及所有子表。
      </figcaption>
    </figure>
  );
}
