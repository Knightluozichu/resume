/**
 * <Poeaa24Pattern03TableModule>：表模块结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern03TableModule() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="表模块结构图。一个类管理一张表的所有行，提供集合操作如 find、update、delete。适合结构化查询为主的场景。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="表模块：一个类管一张表" />
          <rect x={200} y={64} width={320} height={180} rx="10" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={200} y={64} width={320} height={28} rx="10" fill="#E5B567" fillOpacity="0.12" />
          <rect x={200} y={84} width={320} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={360} y={83} textAnchor="middle" fontSize="13" fontWeight="700" fill="#E5B567">OrderTable</text>
          <text x={216} y={112} fontSize="11" fontFamily="monospace" fill={T.primary}>- db: Database</text>
          <text x={216} y={136} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ find(id): Row</text>
          <text x={216} y={158} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ findByCustomer(id): RowSet</text>
          <text x={216} y={180} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ update(row): void</text>
          <text x={216} y={202} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ delete(id): void</text>
          <text x={216} y={228} fontSize="11" fill={T.secondary}>操作对象是行集合，不是单个对象</text>
          <text x={48} y={280} fontSize="11" fill="#E5B567">✓ 结构化查询、批量操作自然</text>
          <text x={400} y={280} fontSize="11" fill={T.danger}>✗ 复杂业务规则难以表达</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="适用：结构化查询为主、业务规则简单的系统" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        表模块用一个类管理一张表的所有行，提供集合操作。
        适合结构化查询为主的场景，但复杂业务规则难以表达。
      </figcaption>
    </figure>
  );
}
