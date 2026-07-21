/**
 * <Poeaa24Pattern34OptimisticOfflineLock>：乐观离线锁时序图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 360;
export function Poeaa24Pattern34OptimisticOfflineLock() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="乐观离线锁时序图。读取时记录版本号，提交时比较版本：版本一致则提交成功并递增版本，版本不一致则拒绝提交者并提供重试路径。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Optimistic Offline Lock：提交时检查版本" />
          {/* 两个事务泳道 */}
          <text x={140} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">事务 A</text>
          <text x={400} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">事务 B</text>
          <text x={600} y={68} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>数据库</text>
          <line x1={140} y1={76} x2={140} y2={280} stroke="#3FB97F" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={400} y1={76} x2={400} y2={280} stroke="#E5B567" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={600} y1={76} x2={600} y2={280} stroke={T.accent} strokeWidth="1" strokeDasharray="4 3" />
          {/* Step 1: A 读取 version=1 */}
          <line x1={140} y1={96} x2={600} y2={96} stroke="#3FB97F" strokeWidth="1.2" />
          <text x={370} y={90} textAnchor="middle" fontSize="9" fill="#3FB97F">读取记录（version = 1）</text>
          {/* Step 2: B 读取 version=1 */}
          <line x1={400} y1={120} x2={600} y2={120} stroke="#E5B567" strokeWidth="1.2" />
          <text x={500} y={114} textAnchor="middle" fontSize="9" fill="#E5B567">读取（version = 1）</text>
          {/* Step 3: B 先提交成功 */}
          <line x1={400} y1={150} x2={600} y2={150} stroke="#E5B567" strokeWidth="1.5" />
          <text x={500} y={144} textAnchor="middle" fontSize="9" fill="#E5B567">提交：version 1→2 ✓</text>
          {/* Step 4: A 提交被拒绝 */}
          <line x1={140} y1={180} x2={600} y2={180} stroke="#E5634D" strokeWidth="1.5" />
          <text x={370} y={174} textAnchor="middle" fontSize="9" fontWeight="600" fill="#E5634D">提交：期望 version=1，实际=2 ✗ 拒绝</text>
          {/* Step 5: A 重试 */}
          <line x1={140} y1={210} x2={600} y2={210} stroke="#3FB97F" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={370} y={204} textAnchor="middle" fontSize="9" fill="#3FB97F">重新读取（version = 2）→ 合并修改 → 重试提交</text>
          {/* 底部说明 */}
          <rect x={48} y={240} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={264} fontSize="11" fontWeight="600" fill={T.primary}>核心机制：</text>
          <text x={64} y={286} fontSize="11" fill={T.secondary}>不加锁，提交时比较版本号。冲突概率低时开销最小；冲突时拒绝后提交者，提供重试/合并路径。</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="读取记版本，提交比版本：一致则提交，不一致则拒绝后提交者" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        乐观离线锁在读取时记录版本号，提交时比较：版本一致则提交并递增，
        不一致则拒绝后提交者。适合冲突概率低的场景。
      </figcaption>
    </figure>
  );
}
