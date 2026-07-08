/**
 * <Gep1ResourceManagementDiagram>：资源管理生命周期与异步加载图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 430;

export function Gep1ResourceManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="资源管理生命周期与异步加载图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            资源管理：引用计数 + 异步加载
          </text>

          {/* 引用计数生命周期 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">引用计数生命周期</text>

          <rect x="40" y="72" width="280" height="40" rx="8" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1.2" />
          <text x="180" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">请求加载 — refCount = 1</text>

          <text x="180" y="126" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="40" y="132" width="280" height="40" rx="8" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="180" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">多处引用 — refCount++</text>

          <text x="180" y="186" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="40" y="192" width="280" height="40" rx="8" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="180" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">引用释放 — refCount--</text>

          <text x="180" y="246" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="40" y="252" width="280" height="40" rx="8" fill="var(--text-tertiary)" fillOpacity="0.16" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="180" y="276" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">refCount = 0 → 卸载</text>

          <text x="180" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同一资源只加载一次</text>
          <text x="180" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GUID 去重，缓存命中直接返回</text>

          {/* 异步加载流程 */}
          <text x="540" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">异步加载流程</text>

          <rect x="400" y="72" width="280" height="34" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="93" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">主线程：RequestAsync(guid)</text>

          <text x="540" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="400" y="126" width="280" height="34" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="147" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">IO 线程：读文件 + 反序列化</text>

          <text x="540" y="174" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="400" y="180" width="280" height="34" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="201" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">Render 线程：上传 GPU（显存）</text>

          <text x="540" y="228" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <rect x="400" y="234" width="280" height="34" rx="8" fill="var(--text-tertiary)" fillOpacity="0.16" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="540" y="255" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">主线程：回调通知「就绪」</text>

          <text x="540" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">加载不卡帧</text>
          <text x="540" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GPU 资源只能在渲染线程创建</text>
          <text x="540" y="322" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">跨线程移交，避免主线程阻塞</text>

          {/* 底部策略 */}
          <rect x="40" y="346" width="640" height="70" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="368" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            资源缓存 + 依赖链
          </text>
          <text x="360" y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            贴图 → 材质 → 网格：依赖关系图，按拓扑序加载
          </text>
          <text x="360" y="404" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            LRU 策略管理显存上限：超限时优先驱逐 refCount=0 的资源
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        资源管理——引用计数决定卸载时机，异步加载保证帧率平稳，依赖链保证加载顺序
      </figcaption>
    </figure>
  );
}
