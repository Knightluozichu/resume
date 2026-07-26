/**
 * <Poeaa24Pattern08DataMapper>：数据映射器结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 380;
export function Poeaa24Pattern08DataMapper() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数据映射器结构图。领域对象和数据库表完全解耦，Mapper 在中间翻译。领域对象不知道数据库存在，Mapper 负责读取行并构建对象、把对象状态写回行。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Data Mapper：对象与表完全解耦" />
          {/* 领域对象 */}
          <rect x={48} y={72} width={200} height={120} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.5" />
          <rect x={48} y={72} width={200} height={28} rx="8" fill="#3FB97F" fillOpacity="0.12" />
          <rect x={48} y={92} width={200} height={8} fill="#3FB97F" fillOpacity="0.12" />
          <text x={148} y={91} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3FB97F">Order（领域对象）</text>
          <text x={64} y={118} fontSize="11" fontFamily="monospace" fill={T.primary}>- items: OrderItem[]</text>
          <text x={64} y={136} fontSize="11" fontFamily="monospace" fill={T.primary}>- customer: Customer</text>
          <text x={64} y={158} fontSize="11" fontFamily="monospace" fill="#3FB97F">+ calculateTotal()</text>
          <text x={64} y={176} fontSize="11" fill={T.secondary}>不知道 DB 存在</text>
          {/* Mapper */}
          <rect x={296} y={72} width={128} height={120} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={360} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>OrderMapper</text>
          <text x={308} y={120} fontSize="11" fontFamily="monospace" fill="#3FB97F">find(id)</text>
          <text x={308} y={138} fontSize="11" fontFamily="monospace" fill="#3FB97F">insert(obj)</text>
          <text x={308} y={156} fontSize="11" fontFamily="monospace" fill="#3FB97F">update(obj)</text>
          <text x={308} y={174} fontSize="11" fontFamily="monospace" fill="#3FB97F">delete(obj)</text>
          {/* 表 */}
          <rect x={472} y={72} width={200} height={120} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.5" />
          <rect x={472} y={72} width={200} height={28} rx="8" fill="#E5B567" fillOpacity="0.12" />
          <rect x={472} y={92} width={200} height={8} fill="#E5B567" fillOpacity="0.12" />
          <text x={572} y={91} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E5B567">orders 表</text>
          <text x={488} y={118} fontSize="11" fontFamily="monospace" fill={T.primary}>id | customer_id | amount</text>
          <text x={488} y={136} fontSize="11" fontFamily="monospace" fill={T.primary}>status | created_at</text>
          <text x={488} y={158} fontSize="11" fill={T.secondary}>纯关系结构</text>
          {/* 箭头 */}
          <line x1={248} y1={132} x2={296} y2={132} stroke={T.secondary} strokeWidth="1.2" />
          <line x1={424} y1={132} x2={472} y2={132} stroke={T.secondary} strokeWidth="1.2" />
          <text x={360} y={210} textAnchor="middle" fontSize="11" fill={T.accent}>Mapper 双向翻译：行 ↔ 对象</text>
          {/* 优势 */}
          <rect x={48} y={240} width={624} height={72} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={264} fontSize="11" fontWeight="600" fill={T.primary}>核心优势：</text>
          <text x={64} y={286} fontSize="11" fill={T.secondary}>• 领域对象可独立测试（无需 DB）  • 表结构变化不影响领域层  • 一个对象可映射到多张表</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="适用：领域复杂、需要测试隔离、表结构与对象结构差异大" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Data Mapper 在领域对象和数据库之间建立翻译层。
        领域对象完全不知道数据库存在，Mapper 负责双向转换。
      </figcaption>
    </figure>
  );
}
