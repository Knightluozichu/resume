/**
 * <Poeaa24LearningMapDiagram>：全书模式依赖网络图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 420;
export function Poeaa24LearningMapDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="全书模式依赖网络图。展示 10 个模式族之间的依赖关系：基础模式支撑所有族，领域逻辑与数据源通过对象关系映射连接，Web 表示和分布模式在上层，离线并发和会话状态横切所有层。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="全书模式依赖网络" />
          {/* 基础模式 - 底部 */}
          <rect x={260} y={340} width={200} height={40} rx="8" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1.5" />
          <text x={360} y={365} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>基础模式 (5)</text>
          {/* 领域逻辑 */}
          <rect x={48} y={240} width={160} height={40} rx="8" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={128} y={265} textAnchor="middle" fontSize="11" fontWeight="600" fill="#3FB97F">领域逻辑 (4)</text>
          {/* 数据源 */}
          <rect x={260} y={240} width={160} height={40} rx="8" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={340} y={265} textAnchor="middle" fontSize="11" fontWeight="600" fill="#3FB97F">数据源 (4)</text>
          {/* 对象关系行为 */}
          <rect x={48} y={160} width={160} height={40} rx="8" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1.2" />
          <text x={128} y={185} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5B567">对象关系行为 (3)</text>
          {/* 对象关系结构 */}
          <rect x={260} y={160} width={160} height={40} rx="8" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1.2" />
          <text x={340} y={185} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5B567">对象关系结构 (6)</text>
          {/* 对象关系元数据 */}
          <rect x={472} y={160} width={160} height={40} rx="8" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1.2" />
          <text x={552} y={185} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5B567">元数据 (3)</text>
          {/* Web 表示 */}
          <rect x={48} y={80} width={160} height={40} rx="8" fill="#6CB6FF" fillOpacity="0.08" stroke="#6CB6FF" strokeWidth="1.2" />
          <text x={128} y={105} textAnchor="middle" fontSize="11" fontWeight="600" fill="#6CB6FF">Web 表示 (7)</text>
          {/* 分布 */}
          <rect x={260} y={80} width={160} height={40} rx="8" fill="#6CB6FF" fillOpacity="0.08" stroke="#6CB6FF" strokeWidth="1.2" />
          <text x={340} y={105} textAnchor="middle" fontSize="11" fontWeight="600" fill="#6CB6FF">分布 (2)</text>
          {/* 离线并发 */}
          <rect x={472} y={80} width={160} height={40} rx="8" fill="#F47067" fillOpacity="0.08" stroke="#F47067" strokeWidth="1.2" />
          <text x={552} y={105} textAnchor="middle" fontSize="11" fontWeight="600" fill="#F47067">离线并发 (4)</text>
          {/* 会话状态 */}
          <rect x={472} y={240} width={160} height={40} rx="8" fill="#F47067" fillOpacity="0.08" stroke="#F47067" strokeWidth="1.2" />
          <text x={552} y={265} textAnchor="middle" fontSize="11" fontWeight="600" fill="#F47067">会话状态 (3)</text>
          {/* 依赖箭头 */}
          {/* 基础 → 领域逻辑 */}
          <line x1={300} y1={340} x2={168} y2={280} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 基础 → 数据源 */}
          <line x1={360} y1={340} x2={340} y2={280} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 基础 → 会话状态 */}
          <line x1={420} y1={340} x2={512} y2={280} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 领域逻辑 → 对象关系行为 */}
          <line x1={128} y1={240} x2={128} y2={200} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 数据源 → 对象关系结构 */}
          <line x1={340} y1={240} x2={340} y2={200} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 数据源 → 元数据 */}
          <line x1={400} y1={240} x2={512} y2={200} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 对象关系行为 → Web 表示 */}
          <line x1={128} y1={160} x2={128} y2={120} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 对象关系结构 → 分布 */}
          <line x1={340} y1={160} x2={340} y2={120} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 元数据 → 离线并发 */}
          <line x1={552} y1={160} x2={552} y2={120} stroke={T.border} strokeWidth="1" strokeDasharray="4 3" />
          {/* 图例 */}
          <text x={48} y={400} fontSize="11" fill={T.secondary}>虚线 = 依赖方向（上层依赖下层）  颜色 = 逻辑分组</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 8} text="10 个模式族、51 个模式的依赖网络：基础模式支撑全局" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书 51 个模式分为 10 个族，基础模式（Gateway / Mapper / Registry 等）支撑所有其他族。
        学习路径：基础 → 领域逻辑 + 数据源 → 对象关系 → Web / 分布 / 并发 / 会话。
      </figcaption>
    </figure>
  );
}
