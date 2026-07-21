/**
 * <Poeaa24Pattern37ImplicitLock>：隐含锁结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 320;
export function Poeaa24Pattern37ImplicitLock() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="隐含锁结构图。锁的获取隐藏在框架层（如 Unit of Work 或 Data Mapper），业务代码无需显式加锁，所有修改入口自动获得锁保护。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Implicit Lock：锁隐藏在框架层，业务代码无感" />
          {/* 业务代码层 */}
          <rect x={48} y={64} width={280} height={90} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={188} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">业务代码</text>
          <text x={64} y={108} fontSize="9" fontFamily="monospace" fill={T.primary}>order.setTotal(597)</text>
          <text x={64} y={126} fontSize="9" fontFamily="monospace" fill={T.primary}>uow.commit()</text>
          <text x={64} y={144} fontSize="9" fill={T.secondary}>无显式 lock() 调用</text>
          {/* 箭头 */}
          <line x1={328} y1={109} x2={390} y2={109} stroke={T.accent} strokeWidth="1.5" />
          <text x={359} y={100} textAnchor="middle" fontSize="9" fill={T.accent}>委托</text>
          {/* 框架层 */}
          <rect x={390} y={64} width={290} height={90} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={390} y={64} width={290} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={390} y={84} width={290} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={535} y={83} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>框架层（UoW / Mapper）</text>
          <text x={406} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>commit() → 自动获取锁</text>
          <text x={406} y={128} fontSize="9" fontFamily="monospace" fill={T.primary}>写入前 → 检查版本</text>
          <text x={406} y={146} fontSize="9" fill={T.secondary}>所有修改入口隐式加锁</text>
          {/* 底部说明 */}
          <rect x={48} y={180} width={624} height={84} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={204} fontSize="11" fontWeight="600" fill={T.primary}>优势与风险：</text>
          <text x={64} y={226} fontSize="11" fill={T.secondary}>• 优势：不会忘记加锁，业务代码干净，锁策略集中管理</text>
          <text x={64} y={248} fontSize="11" fill={T.secondary}>• 风险：锁行为不透明，调试困难；需确保只读路径和嵌套调用行为可预测</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="锁的获取隐藏在框架层，业务代码无需显式加锁" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        隐含锁将锁的获取隐藏在框架层（Unit of Work / Data Mapper），
        业务代码无需显式加锁，所有修改入口自动获得锁保护。
      </figcaption>
    </figure>
  );
}
