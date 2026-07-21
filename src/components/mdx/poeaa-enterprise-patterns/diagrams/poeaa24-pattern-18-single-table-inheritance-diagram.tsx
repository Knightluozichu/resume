/**
 * <Poeaa24Pattern18SingleTableInheritance>：单表继承映射图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern18SingleTableInheritance() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="单表继承映射图。整个类继承树映射到一张表，用 type 鉴别器列区分子类，子类特有字段在同一表中以可空列存在。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Single Table Inheritance：一棵树 → 一张表" />
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
          <line x1={240} y1={110} x2={340} y2={110} stroke="#E5B567" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x={290} y={102} textAnchor="middle" fontSize="10" fill="#E5B567">全部→一表</text>
          {/* 表 */}
          <rect x={340} y={64} width={340} height={200} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={340} y={64} width={340} height={28} rx="8" fill="#E5B567" fillOpacity="0.12" />
          <rect x={340} y={84} width={340} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={510} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E5B567">employees 表（唯一一张）</text>
          <text x={356} y={112} fontSize="10" fontFamily="monospace" fill={T.primary}>id | name | type</text>
          <text x={356} y={132} fontSize="10" fontFamily="monospace" fill="#E5B567">engineer_skill (nullable)</text>
          <text x={356} y={152} fontSize="10" fontFamily="monospace" fill={T.accent}>manager_budget (nullable)</text>
          <line x1={340} y1={164} x2={680} y2={164} stroke="#E5B567" strokeWidth="0.6" strokeOpacity="0.4" />
          <text x={356} y={184} fontSize="9" fontFamily="monospace" fill={T.secondary}>1 | Alice | Engineer | Go | NULL</text>
          <text x={356} y={202} fontSize="9" fontFamily="monospace" fill={T.secondary}>2 | Bob   | Manager  | NULL | 50k</text>
          <text x={356} y={220} fontSize="9" fontFamily="monospace" fill={T.secondary}>3 | Carol | Engineer | Rust | NULL</text>
          {/* 底部说明 */}
          <rect x={48} y={284} width={624} height={40} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={302} fontSize="11" fill="#3FB97F">✓ 查询简单（无 JOIN），多态查询天然支持</text>
          <text x={400} y={302} fontSize="11" fill={T.danger}>✗ 列爆炸、NULL 泛滥</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="type 鉴别器列区分子类，所有字段共存于一张表" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Single Table Inheritance 将整个继承树映射到一张表，
        用 type 鉴别器列区分子类，子类特有字段以可空列存在。
      </figcaption>
    </figure>
  );
}
