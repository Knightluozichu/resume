/**
 * <Poeaa24Pattern43LayerSupertype>：层超类型结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern43LayerSupertype() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Layer Supertype 结构图。层超类型将该层所有类型共有的机制（如 ID 字段、脏标记）提取到基类中，避免重复代码。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Layer Supertype：层内共性提取到基类" />
          {/* 超类型 */}
          <rect x={250} y={64} width={220} height={72} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={250} y={64} width={220} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={250} y={84} width={220} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={360} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>DomainObject（基类）</text>
          <text x={266} y={110} fontSize="11" fontFamily="monospace" fill={T.primary}>id: Long</text>
          <text x={266} y={128} fontSize="11" fontFamily="monospace" fill={T.primary}>isDirty / markDirty()</text>
          {/* 继承箭头 */}
          <line x1={300} y1={136} x2={160} y2={172} stroke={T.border} strokeWidth="1.2" />
          <line x1={360} y1={136} x2={360} y2={172} stroke={T.border} strokeWidth="1.2" />
          <line x1={420} y1={136} x2={560} y2={172} stroke={T.border} strokeWidth="1.2" />
          {/* 子类 */}
          <rect x={80} y={172} width={160} height={44} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={160} y={198} textAnchor="middle" fontSize="11" fill="#3FB97F">Customer</text>
          <rect x={280} y={172} width={160} height={44} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={360} y={198} textAnchor="middle" fontSize="11" fill="#3FB97F">Order</text>
          <rect x={480} y={172} width={160} height={44} rx="6" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1" />
          <text x={560} y={198} textAnchor="middle" fontSize="11" fill="#3FB97F">Product</text>
          {/* 底部说明 */}
          <rect x={48} y={232} width={624} height={44} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={252} fontSize="11" fill={T.secondary}>• 只放真正跨层内类型的共同机制（ID、脏标记、乐观锁版本）</text>
          <text x={64} y={268} fontSize="11" fill={T.secondary}>• 拒绝膨胀：与具体业务相关的便利方法不属于超类型</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 8} text="层内共性机制提取到基类，子类只关注业务差异" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        层超类型将该层所有类型共有的机制（ID、脏标记等）提取到基类中，
        子类只关注业务差异，避免重复代码。
      </figcaption>
    </figure>
  );
}
