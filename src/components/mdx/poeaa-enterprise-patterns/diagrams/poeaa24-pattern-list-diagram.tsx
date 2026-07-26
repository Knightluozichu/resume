/**
 * <Poeaa24PatternListDiagram>：按族分类的树状索引图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 400;
export function Poeaa24PatternListDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="模式目录树状索引图。51 个模式按 10 个族分类：领域逻辑 4 个、数据源 4 个、对象关系行为 3 个、对象关系结构 6 个、继承映射 4 个、元数据 3 个、Web 表示 7 个、分布 2 个、离线并发 4 个、会话状态 3 个、基础 5 个。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="模式目录：10 族 × 51 模式" />
          {/* 根节点 */}
          <rect x={300} y={56} width={120} height={32} rx="6" fill={T.accent} fillOpacity="0.1" stroke={T.accent} strokeWidth="1.5" />
          <text x={360} y={77} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>POEAA</text>
          {/* 左列 */}
          <text x={48} y={120} fontSize="11" fontWeight="600" fill="#3FB97F">领域逻辑 (4)</text>
          <text x={64} y={138} fontSize="11" fill={T.secondary}>Transaction Script · Domain Model</text>
          <text x={64} y={154} fontSize="11" fill={T.secondary}>Table Module · Service Layer</text>
          <text x={48} y={180} fontSize="11" fontWeight="600" fill="#3FB97F">数据源 (4)</text>
          <text x={64} y={198} fontSize="11" fill={T.secondary}>Table Data Gateway · Row Data Gateway</text>
          <text x={64} y={214} fontSize="11" fill={T.secondary}>Active Record · Data Mapper</text>
          <text x={48} y={240} fontSize="11" fontWeight="600" fill="#E5B567">对象关系行为 (3)</text>
          <text x={64} y={258} fontSize="11" fill={T.secondary}>Unit of Work · Identity Map · Lazy Load</text>
          <text x={48} y={284} fontSize="11" fontWeight="600" fill="#E5B567">对象关系结构 (6)</text>
          <text x={64} y={302} fontSize="11" fill={T.secondary}>Identity Field · Foreign Key · Association Table</text>
          <text x={64} y={318} fontSize="11" fill={T.secondary}>Dependent Mapping · Embedded Value · Serialized LOB</text>
          <text x={48} y={344} fontSize="11" fontWeight="600" fill="#E5B567">继承映射 (4)</text>
          <text x={64} y={362} fontSize="11" fill={T.secondary}>Single Table · Class Table · Concrete Table · Inheritance Mappers</text>
          {/* 右列 */}
          <text x={400} y={120} fontSize="11" fontWeight="600" fill="#6CB6FF">Web 表示 (7)</text>
          <text x={416} y={138} fontSize="11" fill={T.secondary}>MVC · Page Controller · Front Controller</text>
          <text x={416} y={154} fontSize="11" fill={T.secondary}>Template View · Transform View</text>
          <text x={416} y={170} fontSize="11" fill={T.secondary}>Two Step View · Application Controller</text>
          <text x={400} y={196} fontSize="11" fontWeight="600" fill="#6CB6FF">分布 (2)</text>
          <text x={416} y={214} fontSize="11" fill={T.secondary}>Remote Facade · Data Transfer Object</text>
          <text x={400} y={240} fontSize="11" fontWeight="600" fill="#F47067">离线并发 (4)</text>
          <text x={416} y={258} fontSize="11" fill={T.secondary}>Optimistic Lock · Pessimistic Lock</text>
          <text x={416} y={274} fontSize="11" fill={T.secondary}>Coarse-Grained Lock · Implicit Lock</text>
          <text x={400} y={300} fontSize="11" fontWeight="600" fill="#F47067">会话状态 (3)</text>
          <text x={416} y={318} fontSize="11" fill={T.secondary}>Client Session · Server Session · Database Session</text>
          <text x={400} y={344} fontSize="11" fontWeight="600" fill={T.accent}>基础 (5)</text>
          <text x={416} y={362} fontSize="11" fill={T.secondary}>Gateway · Mapper · Layer Supertype</text>
          <text x={416} y={378} fontSize="11" fill={T.secondary}>Separated Interface · Registry</text>
          {/* 连接线 */}
          <line x1={300} y1={72} x2={128} y2={108} stroke={T.border} strokeWidth="1" />
          <line x1={420} y1={72} x2={480} y2={108} stroke={T.border} strokeWidth="1" />
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 8} text="51 个模式按 10 个族索引，每族标注模式数量和成员" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书 51 个模式按 10 个族分类索引。左列：领域逻辑、数据源、对象关系（行为/结构/继承）。
        右列：Web 表示、分布、离线并发、会话状态、基础。
      </figcaption>
    </figure>
  );
}
