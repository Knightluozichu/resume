/**
 * <Poeaa24Pattern32RemoteFacade>：远程外观结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 340;
export function Poeaa24Pattern32RemoteFacade() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="远程外观结构图。Remote Facade 在细粒度领域对象之上提供粗粒度接口，将多次远程调用合并为一次用例级操作，减少网络往返。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Remote Facade：粗粒度接口减少网络往返" />
          {/* 客户端 */}
          <rect x={48} y={72} width={160} height={80} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={128} y={94} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">客户端</text>
          <text x={64} y={116} fontSize="11" fill={T.secondary}>一次调用完成用例</text>
          <text x={64} y={134} fontSize="11" fill={T.secondary}>无需了解内部结构</text>
          {/* 网络边界 */}
          <line x1={240} y1={64} x2={240} y2={260} stroke={T.accent} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x={240} y={278} textAnchor="middle" fontSize="11" fill={T.accent}>网络边界</text>
          {/* 单次粗粒度调用 */}
          <line x1={208} y1={112} x2={290} y2={112} stroke={T.accent} strokeWidth="2" />
          <text x={249} y={104} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.accent}>1 次调用</text>
          {/* Remote Facade */}
          <rect x={290} y={72} width={180} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={290} y={72} width={180} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={290} y={92} width={180} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={380} y={91} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>RemoteFacade</text>
          <text x={306} y={118} fontSize="11" fontFamily="monospace" fill="#3FB97F">getOrderDetails(id)</text>
          <text x={306} y={136} fontSize="11" fontFamily="monospace" fill="#3FB97F">placeOrder(dto)</text>
          <text x={306} y={158} fontSize="11" fill={T.secondary}>粗粒度 · 无领域逻辑</text>
          {/* 内部细粒度对象 */}
          <line x1={470} y1={100} x2={530} y2={80} stroke={T.border} strokeWidth="1" />
          <line x1={470} y1={122} x2={530} y2={122} stroke={T.border} strokeWidth="1" />
          <line x1={470} y1={144} x2={530} y2={164} stroke={T.border} strokeWidth="1" />
          <rect x={530} y={64} width={150} height={32} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={605} y={84} textAnchor="middle" fontSize="11" fill={T.primary}>OrderService</text>
          <rect x={530} y={106} width={150} height={32} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={605} y={126} textAnchor="middle" fontSize="11" fill={T.primary}>InventoryService</text>
          <rect x={530} y={148} width={150} height={32} rx="6" fill={T.primary} fillOpacity="0.05" stroke={T.border} strokeWidth="1" />
          <text x={605} y={168} textAnchor="middle" fontSize="11" fill={T.primary}>PaymentService</text>
          <text x={605} y={200} textAnchor="middle" fontSize="11" fill={T.secondary}>多次本地调用（无网络开销）</text>
          {/* 底部对比 */}
          <rect x={48} y={220} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={244} fontSize="11" fontWeight="600" fill={T.primary}>无 Facade：客户端 → N 次远程调用 → 高延迟、高耦合</text>
          <text x={64} y={266} fontSize="11" fill={T.secondary}>有 Facade：客户端 → 1 次远程调用 → Facade 内部协调多个服务 → 低延迟、低耦合</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="粗粒度远程接口将多次网络往返合并为一次用例级调用" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Remote Facade 在细粒度领域对象之上提供粗粒度接口，
        将多次远程调用合并为一次用例级操作，减少网络往返并隔离内部对象模型。
      </figcaption>
    </figure>
  );
}
