/**
 * <VdiFinalReviewDiagram>：全书总复习知识图谱。
 * 串联响应式 → 渲染器 → 组件 → 编译器 → 内置组件五大主题的关联。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VdiFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Vue.js设计与实现全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱：从数据到视图的完整链路
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            响应式驱动渲染，编译器优化渲染，组件组织渲染，内置组件调度渲染
          </text>

          {/* 中心：完整链路 */}
          <rect x="30" y="66" width="680" height="240" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 五大主题节点 */}
          <rect x="50" y="86" width="120" height="70" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
          <text x="110" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">响应式系统</text>
          <text x="110" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Proxy / track /</text>
          <text x="110" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">trigger / effect</text>

          <rect x="195" y="86" width="120" height="70" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="255" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">渲染器</text>
          <text x="255" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">mount / patch /</text>
          <text x="255" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Diff / 自定义</text>

          <rect x="340" y="86" width="120" height="70" rx="8" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="400" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">组件模型</text>
          <text x="400" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">setup / props /</text>
          <text x="400" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">emit / slots</text>

          <rect x="485" y="86" width="120" height="70" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="545" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">编译器</text>
          <text x="545" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Parse / Transform /</text>
          <text x="545" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Generate / 优化</text>

          <rect x="50" y="200" width="180" height="70" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="224" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">副作用与调度</text>
          <text x="140" y="242" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">computed 懒求值</text>
          <text x="140" y="254" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">watch 侦听 / scheduler</text>

          <rect x="255" y="200" width="180" height="70" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="345" y="224" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">异步组件</text>
          <text x="345" y="242" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">defineAsyncComponent</text>
          <text x="345" y="254" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">状态机 / 懒加载</text>

          <rect x="460" y="200" width="220" height="70" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="570" y="224" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">内置组件</text>
          <text x="570" y="242" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">KeepAlive 缓存 / Teleport 传送</text>
          <text x="570" y="254" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Suspense 协调异步</text>

          {/* 连接箭头 */}
          <text x="177" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="322" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="467" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="615" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="110" y="190" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="345" y="190" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="570" y="190" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 下方：关联洞察 */}
          <rect x="30" y="320" width="680" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="342" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">核心关联：一条数据的旅程</text>

          <rect x="50" y="356" width="150" height="70" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="125" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">数据变化</text>
          <text x="125" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">trigger 派发 effect</text>
          <text x="125" y="408" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">组件 render 重跑</text>

          <text x="210" y="392" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="225" y="356" width="150" height="70" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="300" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">编译优化</text>
          <text x="300" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">patchFlag 标记动态</text>
          <text x="300" y="408" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">只 diff 动态节点</text>

          <text x="385" y="392" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="400" y="356" width="150" height="70" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="475" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">渲染更新</text>
          <text x="475" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">patch 新旧 VNode</text>
          <text x="475" y="408" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Diff 最小化 DOM 操作</text>

          <text x="560" y="392" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="575" y="356" width="120" height="70" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="635" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">视图呈现</text>
          <text x="635" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">DOM 更新完成</text>
          <text x="635" y="408" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">用户看到新界面</text>

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：理解设计动机比记住 API 更重要——每个机制都在解决一个具体问题
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习知识图谱——响应式、渲染器、组件、编译器、内置组件五大主题串联成完整数据到视图链路
      </figcaption>
    </figure>
  );
}
