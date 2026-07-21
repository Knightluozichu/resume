/**
 * <Poeaa24Pattern22MetadataMapping>：元数据映射结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern22MetadataMapping() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="元数据映射结构图。映射规则从代码中提取到独立的元数据描述（XML/注解/配置），Mapper 读取元数据驱动加载和保存，避免硬编码。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Metadata Mapping：规则外置，代码通用" />
          {/* 元数据 */}
          <rect x={48} y={64} width={200} height={140} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={48} y={64} width={200} height={28} rx="8" fill="#E5B567" fillOpacity="0.12" />
          <rect x={48} y={84} width={200} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={148} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">映射元数据</text>
          <text x={64} y={112} fontSize="9" fontFamily="monospace" fill={T.primary}>class: Order</text>
          <text x={64} y={130} fontSize="9" fontFamily="monospace" fill={T.primary}>table: orders</text>
          <text x={64} y={148} fontSize="9" fontFamily="monospace" fill={T.primary}>field: amount → col: amt</text>
          <text x={64} y={166} fontSize="9" fontFamily="monospace" fill={T.primary}>field: customer → FK</text>
          <text x={64} y={188} fontSize="9" fill={T.secondary}>XML / 注解 / JSON</text>
          {/* 箭头到 Mapper */}
          <line x1={248} y1={134} x2={300} y2={134} stroke="#E5B567" strokeWidth="1.2" />
          <text x={274} y={126} textAnchor="middle" fontSize="9" fill="#E5B567">读取</text>
          {/* 通用 Mapper */}
          <rect x={300} y={84} width={160} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={380} y={108} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>通用 Mapper</text>
          <text x={316} y={132} fontSize="9" fontFamily="monospace" fill="#3FB97F">load(meta, id)</text>
          <text x={316} y={150} fontSize="9" fontFamily="monospace" fill="#3FB97F">save(meta, obj)</text>
          <text x={316} y={170} fontSize="9" fill={T.secondary}>一套代码处理所有类</text>
          {/* 箭头到对象/表 */}
          <line x1={460} y1={114} x2={530} y2={94} stroke="#3FB97F" strokeWidth="1.2" />
          <line x1={460} y1={154} x2={530} y2={174} stroke="#E5B567" strokeWidth="1.2" />
          {/* 对象 */}
          <rect x={530} y={64} width={150} height={60} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={605} y={86} textAnchor="middle" fontSize="10" fontWeight="600" fill="#3FB97F">Order 对象</text>
          <text x={546} y={108} fontSize="9" fontFamily="monospace" fill={T.primary}>amount, customer</text>
          {/* 表 */}
          <rect x={530} y={144} width={150} height={60} rx="6" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1" />
          <text x={605} y={166} textAnchor="middle" fontSize="10" fontWeight="600" fill="#E5B567">orders 表</text>
          <text x={546} y={188} fontSize="9" fontFamily="monospace" fill={T.primary}>amt, customer_id</text>
          {/* 底部说明 */}
          <rect x={48} y={232} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={256} fontSize="11" fontWeight="600" fill={T.primary}>核心思想：</text>
          <text x={64} y={278} fontSize="11" fill={T.secondary}>映射规则从代码中抽离为数据 → Mapper 变成通用引擎 → 新增类只需加元数据，无需写新 Mapper</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="元数据驱动映射：规则是数据，代码是引擎" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Metadata Mapping 将对象-关系映射规则外置为元数据（XML/注解/配置），
        Mapper 读取元数据驱动加载和保存，新增类无需编写新代码。
      </figcaption>
    </figure>
  );
}
