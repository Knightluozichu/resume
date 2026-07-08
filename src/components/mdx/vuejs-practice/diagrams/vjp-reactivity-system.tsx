/**
 * <VjpReactivitySystemDiagram>：Vue 3 响应式系统原理图解。
 * 展示 Proxy 拦截 → track 收集依赖 → effect 调度 → trigger 触发更新 → 渲染。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VjpReactivitySystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Vue 3 响应式系统原理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Vue 3 响应式系统：Proxy 拦截与依赖收集
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            读属性触发 track 收集依赖，写属性触发 trigger 重新执行 effect
          </text>

          {/* 左侧：状态对象 + Proxy */}
          <rect x="30" y="70" width="200" height="150" rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">reactive(obj)</text>
          <text x="130" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原始对象 state</text>
          <text x="130" y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">&lbrace; count: 0, name: 'vue' &rbrace;</text>
          <line x1="50" y1="148" x2="210" y2="148" stroke="var(--border)" strokeWidth="1" />
          <text x="130" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Proxy 代理层</text>
          <text x="130" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">get(target, key)</text>
          <text x="130" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">set(target, key, val)</text>

          {/* 中间：依赖映射 */}
          <rect x="270" y="70" width="200" height="150" rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">targetMap</text>
          <text x="370" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">key → Dep(Set&lt;effect&gt;)</text>
          <text x="370" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">state.count → [effect]</text>
          <text x="370" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">state.name → [effect2]</text>
          <line x1="290" y1="168" x2="450" y2="168" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="188" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">track（读）</text>
          <text x="370" y="206" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">trigger（写）</text>

          {/* 右侧：effect / 渲染 */}
          <rect x="510" y="70" width="200" height="150" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="610" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">activeEffect</text>
          <text x="610" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">副作用函数 effect()</text>
          <text x="610" y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">组件 render 函数</text>
          <line x1="530" y1="148" x2="690" y2="148" stroke="var(--border)" strokeWidth="1" />
          <text x="610" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">重新执行</text>
          <text x="610" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生成新 VNode</text>
          <text x="610" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">patch → 更新 DOM</text>

          {/* 箭头连接 */}
          <text x="245" y="150" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="485" y="150" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 下方：流程时序 */}
          <rect x="30" y="250" width="680" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="272" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">一次更新的完整时序</text>

          <rect x="50" y="288" width="140" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 首次渲染</text>
          <text x="120" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">effect 执行读取</text>
          <text x="120" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">track 记录依赖</text>

          <text x="200" y="322" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="220" y="288" width="140" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="290" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">2. 数据变更</text>
          <text x="290" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">state.count = 1</text>
          <text x="290" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Proxy.set 拦截</text>

          <text x="370" y="322" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="390" y="288" width="140" height="60" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="460" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">3. trigger 派发</text>
          <text x="460" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">取出 Dep 中 effect</text>
          <text x="460" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">加入调度队列</text>

          <text x="540" y="322" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="560" y="288" width="140" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="630" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">4. 异步刷新</text>
          <text x="630" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">微任务去重合并</text>
          <text x="630" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">patch 更新视图</text>

          <text x="370" y="380" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            ref 用 .value 包裹：访问时才触发 get/set；reactive 深层代理对象
          </text>
          <text x="370" y="400" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：响应式 = 拦截读写 + 自动登记「谁用了这个属性」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Vue 3 响应式系统——Proxy 拦截读写、track 收集依赖、trigger 派发更新、effect 重新渲染
      </figcaption>
    </figure>
  );
}
