/**
 * <Poeaa24Pattern10IdentityMap>：标识映射结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 400;
export function Poeaa24Pattern10IdentityMap() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="标识映射结构图。展示 IdentityMap 如何保证同一 ID 只加载一次对象，后续请求直接返回缓存实例，避免重复对象和状态矛盾。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Identity Map：同一 ID = 同一实例" />
          {/* 左侧：请求流 */}
          <text x={120} y={72} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">请求序列</text>
          {/* 第一次请求 */}
          <rect x={48} y={88} width={144} height={36} rx="6" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1" />
          <text x={120} y={110} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#3FB97F">load(id=42)</text>
          <text x={200} y={110} fontSize="9" fill={T.secondary}>→ 缓存未命中</text>
          {/* 第二次请求 */}
          <rect x={48} y={140} width={144} height={36} rx="6" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1" />
          <text x={120} y={162} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#3FB97F">load(id=42)</text>
          <text x={200} y={162} fontSize="9" fill="#E5B567">→ 缓存命中 ✓</text>
          {/* 第三次请求 */}
          <rect x={48} y={192} width={144} height={36} rx="6" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1" />
          <text x={120} y={214} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#3FB97F">load(id=99)</text>
          <text x={200} y={214} fontSize="9" fill={T.secondary}>→ 缓存未命中</text>
          {/* 中间：IdentityMap */}
          <rect x={320} y={72} width={180} height={180} rx="10" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={320} y={72} width={180} height={28} rx="10" fill={T.accent} fillOpacity="0.12" />
          <rect x={320} y={92} width={180} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={410} y={91} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>IdentityMap</text>
          <text x={336} y={120} fontSize="10" fontFamily="monospace" fill={T.primary}>Map&lt;id, object&gt;</text>
          <text x={336} y={144} fontSize="10" fontFamily="monospace" fill="#E5B567">42 → Order@0x1</text>
          <text x={336} y={168} fontSize="10" fontFamily="monospace" fill="#E5B567">99 → Customer@0x2</text>
          <line x1={320} y1={180} x2={500} y2={180} stroke={T.accent} strokeWidth="0.6" strokeOpacity="0.4" />
          <text x={336} y={200} fontSize="9" fontFamily="monospace" fill="#3FB97F">get(id): object</text>
          <text x={336} y={218} fontSize="9" fontFamily="monospace" fill="#3FB97F">put(id, obj): void</text>
          <text x={336} y={236} fontSize="9" fontFamily="monospace" fill="#3FB97F">remove(id): void</text>
          {/* 右侧：保证 */}
          <rect x={540} y={72} width={148} height={180} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={614} y={96} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.primary}>核心保证</text>
          <text x={556} y={120} fontSize="10" fill="#3FB97F">✓ 同 ID 同实例</text>
          <text x={556} y={144} fontSize="10" fill="#3FB97F">✓ 无重复对象</text>
          <text x={556} y={168} fontSize="10" fill="#3FB97F">✓ 修改可见</text>
          <text x={556} y={196} fontSize="10" fill={T.danger}>✗ 需手动清理</text>
          <text x={556} y={220} fontSize="10" fill={T.danger}>✗ 内存占用</text>
          {/* 底部：作用域 */}
          <rect x={48} y={280} width={624} height={64} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={304} fontSize="11" fontWeight="600" fill={T.primary}>作用域选择：</text>
          <text x={64} y={326} fontSize="11" fill={T.secondary}>• 严格模式：一个 UoW/请求一个 Map（推荐）  • 全局模式：整个会话共享（需处理过期）</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="Identity Map 确保每个数据库身份在作用域内只产生一个对象实例" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Identity Map 用 Map 缓存已加载对象，同一 ID 的后续请求直接返回已有实例，
        避免重复对象和相互矛盾的状态。
      </figcaption>
    </figure>
  );
}
