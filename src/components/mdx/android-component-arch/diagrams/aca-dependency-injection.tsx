/**
 * <AcaDependencyInjectionDiagram>：依赖注入——DI原理与组件解耦图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function AcaDependencyInjectionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="依赖注入原理与组件解耦图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            依赖注入（DI）——从硬编码到注入
          </text>

          {/* 上半部分：硬编码依赖 */}
          <rect x="30" y="50" width="680" height="180" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">硬编码依赖（紧耦合）</text>

          <rect x="100" y="90" width="200" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">OrderActivity</text>
          <text x="200" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">val repo = OrderRepo()</text>

          <text x="340" y="118" textAnchor="middle" fontSize="14" fill="var(--danger)">&rarr; 直接 new</text>

          <rect x="440" y="90" width="200" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="540" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">OrderRepo</text>
          <text x="540" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">val api = ApiService()</text>

          <text x="370" y="170" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">OrderActivity 直接依赖 OrderRepo 具体实现</text>
          <text x="370" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无法替换 / 无法测试 / 无法跨组件复用</text>
          <text x="370" y="206" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">&#x2716; 耦合度高 &#x2716; 不符合依赖倒置 &#x2716; 难以单测</text>

          {/* 下半部分：依赖注入 */}
          <rect x="30" y="250" width="680" height="230" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="274" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">依赖注入（解耦）</text>

          <rect x="60" y="290" width="180" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">OrderActivity</text>
          <text x="150" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">@Inject repo: IOrderRepo</text>

          <text x="270" y="318" textAnchor="middle" fontSize="10" fill="var(--success)">&rarr; 接口</text>

          <rect x="330" y="290" width="160" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="410" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">IOrderRepo</text>
          <text x="410" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">interface</text>

          <text x="510" y="318" textAnchor="middle" fontSize="10" fill="var(--success)">&larr; 实现</text>

          <rect x="540" y="290" width="160" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="620" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">OrderRepoImpl</text>
          <text x="620" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">@Inject constructor()</text>

          {/* DI容器 */}
          <rect x="180" y="360" width="380" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="382" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">DI 容器（Dagger2 Component）</text>
          <text x="370" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译期生成工厂代码 &rarr; 运行期注入依赖</text>

          <text x="150" y="385" textAnchor="middle" fontSize="9" fill="var(--success)">&uarr;</text>
          <text x="620" y="385" textAnchor="middle" fontSize="9" fill="var(--accent)">&uarr;</text>

          <text x="370" y="432" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Activity 只依赖接口，DI 容器负责创建并注入实现</text>
          <text x="370" y="450" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可替换实现 / 可 Mock 测试 / 跨组件通过接口暴露</text>
          <text x="370" y="468" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">&#x2714; 解耦 &#x2714; 依赖倒置 &#x2714; 可测试 &#x2714; 可复用</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        依赖注入原理——从硬编码直接依赖到通过DI容器注入接口实现，实现组件解耦与可测试性
      </figcaption>
    </figure>
  );
}
