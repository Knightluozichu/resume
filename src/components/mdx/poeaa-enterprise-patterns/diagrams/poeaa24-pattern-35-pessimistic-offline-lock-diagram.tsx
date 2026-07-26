/**
 * <Poeaa24Pattern35PessimisticOfflineLock>：悲观离线锁时序图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern35PessimisticOfflineLock() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="悲观离线锁时序图。事务 A 读取时获取排他锁，事务 B 被阻塞等待，A 完成修改并释放锁后 B 才能继续。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Pessimistic Offline Lock：先加锁，再修改" />
          {/* 泳道 */}
          <text x={140} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">事务 A</text>
          <text x={400} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">事务 B</text>
          <text x={600} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>锁管理器</text>
          <line x1={140} y1={76} x2={140} y2={280} stroke="#3FB97F" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={400} y1={76} x2={400} y2={280} stroke="#E5B567" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={600} y1={76} x2={600} y2={280} stroke={T.accent} strokeWidth="1" strokeDasharray="4 3" />
          {/* Step 1: A 获取锁 */}
          <line x1={140} y1={96} x2={600} y2={96} stroke="#3FB97F" strokeWidth="1.5" />
          <text x={370} y={90} textAnchor="middle" fontSize="11" fill="#3FB97F">请求排他锁 → 获得 🔒</text>
          {/* Step 2: A 修改数据 */}
          <rect x={100} y={108} width={80} height={28} rx="4" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1" />
          <text x={140} y={126} textAnchor="middle" fontSize="11" fill="#3FB97F">安心修改</text>
          {/* Step 3: B 请求锁被阻塞 */}
          <line x1={400} y1={150} x2={600} y2={150} stroke="#E5634D" strokeWidth="1.5" />
          <text x={500} y={144} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5634D">请求锁 → 被阻塞 ⏳</text>
          {/* Step 4: B 等待 */}
          <rect x={360} y={162} width={80} height={28} rx="4" fill="#E5634D" fillOpacity="0.08" stroke="#E5634D" strokeWidth="1" strokeDasharray="3 2" />
          <text x={400} y={180} textAnchor="middle" fontSize="11" fill="#E5634D">等待中…</text>
          {/* Step 5: A 释放锁 */}
          <line x1={140} y1={210} x2={600} y2={210} stroke="#3FB97F" strokeWidth="1.2" />
          <text x={370} y={204} textAnchor="middle" fontSize="11" fill="#3FB97F">提交修改 → 释放锁 🔓</text>
          {/* Step 6: B 获得锁 */}
          <line x1={600} y1={234} x2={400} y2={234} stroke="#E5B567" strokeWidth="1.2" />
          <text x={500} y={228} textAnchor="middle" fontSize="11" fill="#E5B567">获得锁 → 继续执行</text>
          {/* 底部说明 */}
          <rect x={48} y={248} width={624} height={56} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={270} fontSize="11" fontWeight="600" fill={T.primary}>代价与适用：</text>
          <text x={64} y={290} fontSize="11" fill={T.secondary}>冲突概率高时避免反复重试；代价是等待、死锁风险和锁管理复杂度（超时、失主恢复）。</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="读取即加排他锁：持有者安心修改，竞争者被阻塞直到释放" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        悲观离线锁在读取时即获取排他锁，竞争者被阻塞直到锁释放。
        适合冲突概率高的场景，代价是等待和死锁风险。
      </figcaption>
    </figure>
  );
}
