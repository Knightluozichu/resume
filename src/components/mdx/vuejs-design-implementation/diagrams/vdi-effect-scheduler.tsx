/**
 * <VdiEffectSchedulerDiagram>：副作用与调度器图解。
 * 展示 effect 注册、scheduler 调度、computed 缓存、watch 侦听。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VdiEffectSchedulerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="副作用与调度器图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            副作用与调度器：effect / computed / watch
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            scheduler 控制执行时机，lazy 控制是否立即执行，缓存控制是否重算
          </text>

          {/* 上半：三种副作用对比 */}
          <rect x="30" y="66" width="210" height="170" rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="135" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">effect(fn)</text>
          <text x="135" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">立即执行一次</text>
          <text x="135" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">依赖变化时重新执行</text>
          <line x1="50" y1="140" x2="220" y2="140" stroke="var(--border)" strokeWidth="1" />
          <text x="135" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">无 scheduler</text>
          <text x="135" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认同步重新执行 fn</text>
          <text x="135" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">lazy:true 则不立即跑</text>
          <text x="135" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">手动 effectFn() 执行</text>

          <rect x="265" y="66" width="210" height="170" rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">computed(getter)</text>
          <text x="370" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">lazy：首次不执行</text>
          <text x="370" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">读取 .value 才计算</text>
          <line x1="285" y1="140" x2="455" y2="140" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">scheduler = 缓存</text>
          <text x="370" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">依赖变 → 标脏 dirty</text>
          <text x="370" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">下次读才重算 getter</text>
          <text x="370" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">值未变不触发下游</text>

          <rect x="500" y="66" width="210" height="170" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="605" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">watch(source, cb)</text>
          <text x="605" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">依赖变 → 执行 cb</text>
          <text x="605" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">传新旧值给回调</text>
          <line x1="520" y1="140" x2="690" y2="140" stroke="var(--border)" strokeWidth="1" />
          <text x="605" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">scheduler = cb</text>
          <text x="605" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用 scheduler 替换默认</text>
          <text x="605" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">immediate 首次执行</text>
          <text x="605" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">flush:post 等待 DOM</text>

          {/* 下半：调度器作用 */}
          <rect x="30" y="258" width="680" height="172" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="280" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">scheduler：自定义 effect 重新执行的行为</text>

          <rect x="50" y="296" width="180" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">无 scheduler</text>
          <text x="140" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">trigger 时直接执行 fn</text>

          <rect x="250" y="296" width="180" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="340" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">computed scheduler</text>
          <text x="340" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">trigger 时只标脏不执行</text>

          <rect x="450" y="296" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">watch scheduler</text>
          <text x="540" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">trigger 时执行 cb 回调</text>

          <text x="370" y="384" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            lazy 控制是否立即执行；scheduler 控制依赖变化时做什么
          </text>
          <text x="370" y="404" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：computed 与 watch 都基于 effect + scheduler + lazy 实现
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        副作用与调度器——effect 立即执行、computed 懒求值缓存、watch 用 scheduler 侦听变化
      </figcaption>
    </figure>
  );
}
