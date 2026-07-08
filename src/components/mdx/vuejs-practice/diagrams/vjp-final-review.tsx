/**
 * <VjpFinalReviewDiagram>：Vue.js从入门到项目实战 全书知识图谱图解。
 * 以「一次用户操作从输入到上线」为主线串联十章知识点。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function VjpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Vue.js从入门到项目实战 全书知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱：一次操作贯穿十章
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从「用户点击」到「页面更新」到「上线交付」，每章都在其中扮演角色
          </text>

          {/* 中心主线 */}
          <rect x="30" y="64" width="680" height="360" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一层：基础 */}
          <rect x="50" y="80" width="640" height="70" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="100" fontSize="12" fontWeight="600" fill="var(--success)">基础层</text>
          <text x="80" y="118" fontSize="10" fill="var(--text-secondary)">① 响应式系统：点击触发 state.count++，Proxy.set 拦截 → trigger 派发</text>
          <text x="80" y="134" fontSize="10" fill="var(--text-secondary)">② 模板语法：&lbrace;&lbrace; count &rbrace;&rbrace; 插值经编译生成 render，新 VNode 经 patch 更新 DOM</text>

          <text x="370" y="164" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二层：组件 */}
          <rect x="50" y="170" width="640" height="70" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="80" y="190" fontSize="12" fontWeight="600" fill="var(--warning)">组件层</text>
          <text x="80" y="208" fontSize="10" fill="var(--text-secondary)">③ 组件设计：点击在 Child 组件内，emit('add') 冒泡到 Parent 改 state</text>
          <text x="80" y="224" fontSize="10" fill="var(--text-secondary)">④ Composition API：计数逻辑抽成 useCounter()，跨组件复用，setup 中组装</text>

          <text x="370" y="254" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三层：状态路由 */}
          <rect x="50" y="260" width="640" height="70" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="80" y="280" fontSize="12" fontWeight="600" fill="var(--accent)">状态路由层</text>
          <text x="80" y="298" fontSize="10" fill="var(--text-secondary)">⑤ 状态管理：用户信息存 Pinia store，多组件共享，action 提交持久化</text>
          <text x="80" y="314" fontSize="10" fill="var(--text-secondary)">⑥ 路由守卫：跳转详情页前 beforeEach 鉴权，未登录重定向 /login</text>

          <text x="370" y="344" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四层：工程化 */}
          <rect x="50" y="350" width="640" height="70" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="80" y="370" fontSize="12" fontWeight="600" fill="var(--danger)">工程化层</text>
          <text x="80" y="388" fontSize="10" fill="var(--text-secondary)">⑦ SSR/SSG：详情页用 SSR 首屏直出利于 SEO，Nuxt 统一抽象 hydration</text>
          <text x="80" y="404" fontSize="10" fill="var(--text-secondary)">⑧ 构建部署：Vite 打包分包，路由懒加载，产物上 CDN，CI/CD 自动发布</text>

          <text x={VIEW_W / 2} y="444" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            学习地图（第 1 章）+ 总复习（第 10 章）串联以上八章，形成闭环
          </text>
          <text x={VIEW_W / 2} y="462" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：每一章都在「从点击到上线」的旅程中承担一个角色，没有孤立的知识点
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Vue.js从入门到项目实战全书知识图谱——一次用户操作贯穿响应式、模板、组件、状态、路由、SSR、构建十章
      </figcaption>
    </figure>
  );
}
