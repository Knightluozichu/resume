/**
 * <Poeaa24Pattern05TableDataGateway>：表数据入口结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern05TableDataGateway() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="表数据入口结构图。一个 Gateway 类封装一张表的所有 SQL 操作，调用者不需要知道 SQL 细节。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Table Data Gateway：封装一张表的所有 SQL" />
          {/* 调用者 */}
          <rect x={48} y={72} width={160} height={44} rx="6" fill={T.secondary} fillOpacity="0.06" stroke={T.secondary} strokeWidth="1" />
          <text x={128} y={99} textAnchor="middle" fontSize="11" fill={T.primary}>Service / Script</text>
          {/* 箭头 */}
          <line x1={208} y1={94} x2={268} y2={94} stroke={T.secondary} strokeWidth="1.2" />
          <text x={238} y={86} textAnchor="middle" fontSize="11" fill={T.secondary}>调用</text>
          {/* Gateway */}
          <rect x={268} y={60} width={240} height={180} rx="10" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <rect x={268} y={60} width={240} height={28} rx="10" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={268} y={80} width={240} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={388} y={79} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3FB97F">OrderGateway</text>
          <text x={284} y={108} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ findAll(): ResultSet</text>
          <text x={284} y={128} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ findById(id): ResultSet</text>
          <text x={284} y={148} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ insert(data): void</text>
          <text x={284} y={168} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ update(id, data): void</text>
          <text x={284} y={188} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ delete(id): void</text>
          <text x={284} y={218} fontSize="11" fill={T.secondary}>内部持有 SQL 字符串</text>
          {/* DB */}
          <line x1={508} y1={150} x2={568} y2={150} stroke={T.secondary} strokeWidth="1.2" />
          <rect x={568} y={128} width={104} height={44} rx="6" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1" />
          <text x={620} y={155} textAnchor="middle" fontSize="11" fill="#E5B567">orders 表</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="一个 Gateway = 一张表的全部 CRUD，调用者无需知道 SQL" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Table Data Gateway 把一张表的所有 SQL 操作封装在一个类中。
        调用者通过方法名操作数据，不需要知道 SQL 细节。
      </figcaption>
    </figure>
  );
}
