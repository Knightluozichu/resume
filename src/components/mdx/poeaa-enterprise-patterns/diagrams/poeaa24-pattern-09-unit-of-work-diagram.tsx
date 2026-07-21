/**
 * <Poeaa24Pattern09UnitOfWork>：工作单元生命周期序列图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 420;
export function Poeaa24Pattern09UnitOfWork() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="工作单元生命周期序列图。展示 UnitOfWork 在一次业务事务中如何跟踪新增、修改、删除对象，并在 commit 时按正确顺序统一写出。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Unit of Work：跟踪变更 → 原子提交" />
          {/* 泳道标题 */}
          <text x={120} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">业务代码</text>
          <text x={360} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>UnitOfWork</text>
          <text x={600} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">数据库</text>
          {/* 生命线 */}
          <line x1={120} y1={78} x2={120} y2={370} stroke="#3FB97F" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
          <line x1={360} y1={78} x2={360} y2={370} stroke={T.accent} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
          <line x1={600} y1={78} x2={600} y2={370} stroke="#E5B567" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
          {/* Step 1: registerNew */}
          <line x1={120} y1={100} x2={350} y2={100} stroke={T.primary} strokeWidth="1.2" markerEnd="url(#uow-arrow)" />
          <text x={235} y={94} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={T.primary}>registerNew(order)</text>
          <rect x={340} y={104} width={40} height={20} rx="3" fill={T.accent} fillOpacity="0.15" stroke={T.accent} strokeWidth="0.8" />
          <text x={360} y={118} textAnchor="middle" fontSize="8" fill={T.accent}>new[]</text>
          {/* Step 2: registerDirty */}
          <line x1={120} y1={148} x2={350} y2={148} stroke={T.primary} strokeWidth="1.2" markerEnd="url(#uow-arrow)" />
          <text x={235} y={142} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={T.primary}>registerDirty(customer)</text>
          <rect x={340} y={152} width={40} height={20} rx="3" fill="#E5B567" fillOpacity="0.15" stroke="#E5B567" strokeWidth="0.8" />
          <text x={360} y={166} textAnchor="middle" fontSize="8" fill="#E5B567">dirty[]</text>
          {/* Step 3: registerRemoved */}
          <line x1={120} y1={196} x2={350} y2={196} stroke={T.primary} strokeWidth="1.2" markerEnd="url(#uow-arrow)" />
          <text x={235} y={190} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={T.primary}>registerRemoved(oldItem)</text>
          <rect x={340} y={200} width={40} height={20} rx="3" fill={T.danger} fillOpacity="0.15" stroke={T.danger} strokeWidth="0.8" />
          <text x={360} y={214} textAnchor="middle" fontSize="8" fill={T.danger}>del[]</text>
          {/* Step 4: commit */}
          <line x1={120} y1={252} x2={350} y2={252} stroke="#3FB97F" strokeWidth="1.5" markerEnd="url(#uow-arrow)" />
          <text x={235} y={246} textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="monospace" fill="#3FB97F">commit()</text>
          {/* commit 内部：按顺序写出 */}
          <line x1={370} y1={272} x2={590} y2={272} stroke="#E5B567" strokeWidth="1.2" markerEnd="url(#uow-arrow)" />
          <text x={480} y={266} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#E5B567">INSERT order</text>
          <line x1={370} y1={296} x2={590} y2={296} stroke="#E5B567" strokeWidth="1.2" markerEnd="url(#uow-arrow)" />
          <text x={480} y={290} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#E5B567">UPDATE customer</text>
          <line x1={370} y1={320} x2={590} y2={320} stroke="#E5B567" strokeWidth="1.2" markerEnd="url(#uow-arrow)" />
          <text x={480} y={314} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#E5B567">DELETE oldItem</text>
          {/* 顺序标注 */}
          <text x={620} y={276} fontSize="9" fill={T.secondary}>①</text>
          <text x={620} y={300} fontSize="9" fill={T.secondary}>②</text>
          <text x={620} y={324} fontSize="9" fill={T.secondary}>③</text>
          {/* 成功返回 */}
          <line x1={590} y1={348} x2={370} y2={348} stroke="#3FB97F" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#uow-arrow)" />
          <text x={480} y={344} textAnchor="middle" fontSize="9" fill="#3FB97F">全部成功 / 全部回滚</text>
          {/* 箭头 marker */}
          <defs>
            <marker id="uow-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="none" stroke={T.primary} strokeWidth="1" />
            </marker>
          </defs>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="UoW 收集变更，commit 时按 INSERT → UPDATE → DELETE 顺序原子写出" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unit of Work 在业务操作期间跟踪所有新增、修改、删除的对象，
        commit 时按正确顺序统一写出，失败则全部回滚。
      </figcaption>
    </figure>
  );
}
