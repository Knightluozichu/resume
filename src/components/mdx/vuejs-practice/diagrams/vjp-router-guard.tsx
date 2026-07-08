/**
 * <VjpRouterGuardDiagram>：Vue Router 导航守卫执行顺序图解。
 * 展示一次导航的守卫链路：全局前置 → 路由独享 → 组件内 → 全局解析 → 全局后置。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VjpRouterGuardDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Vue Router 导航守卫执行顺序图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Vue Router 导航守卫执行顺序
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从「点击链接」到「渲染完成」的守卫链路，可中断、可重定向、可取消
          </text>

          {/* 起点 */}
          <rect x="280" y="64" width="180" height="40" rx="20" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="370" y="89" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">导航触发 router.push</text>

          <text x="370" y="118" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 1 全局前置 */}
          <rect x="60" y="128" width="620" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="148" fontSize="12" fontWeight="600" fill="var(--success)">1. router.beforeEach</text>
          <text x="80" y="164" fontSize="10" fill="var(--text-secondary)">全局前置：鉴权、登录态校验。next(false) 取消 / next('/login') 重定向</text>

          <text x="370" y="186" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 2 路由独享 */}
          <rect x="60" y="196" width="620" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="80" y="216" fontSize="12" fontWeight="600" fill="var(--warning)">2. beforeEnter（路由独享）</text>
          <text x="80" y="232" fontSize="10" fill="var(--text-secondary)">配置在 routes 上，只在进入该路由时触发，适合路由级权限/数据预取</text>

          <text x="370" y="254" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 3 组件内守卫 */}
          <rect x="60" y="264" width="620" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="80" y="284" fontSize="12" fontWeight="600" fill="var(--accent)">3. 组件内 beforeRouteEnter → beforeRouteUpdate</text>
          <text x="80" y="300" fontSize="10" fill="var(--text-secondary)">beforeRouteEnter 在组件创建前（拿不到 this，用 next(vm =&gt; ...) 回调）</text>

          <text x="370" y="322" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 4 全局解析 */}
          <rect x="60" y="332" width="620" height="44" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="80" y="352" fontSize="12" fontWeight="600" fill="var(--danger)">4. router.beforeResolve</text>
          <text x="80" y="368" fontSize="10" fill="var(--text-secondary)">全局解析：所有组件内守卫与异步组件加载完成后，导航即将确认</text>

          <text x="370" y="390" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 5 全局后置 + 完成 */}
          <rect x="60" y="400" width="300" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="420" fontSize="12" fontWeight="600" fill="var(--success)">5. router.afterEach</text>
          <text x="80" y="436" fontSize="10" fill="var(--text-secondary)">全局后置：无 next，不可改导航</text>

          <rect x="380" y="400" width="300" height="44" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="530" y="420" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">导航完成 · DOM 更新</text>
          <text x="530" y="436" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">触发组件挂载与渲染</text>

          <text x={620} y="455" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">← 埋点、改标题等副作用</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Vue Router 导航守卫执行顺序——前置、独享、组件内、解析、后置五道关卡
      </figcaption>
    </figure>
  );
}
