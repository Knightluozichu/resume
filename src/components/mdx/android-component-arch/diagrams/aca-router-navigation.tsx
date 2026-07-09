/**
 * <AcaRouterNavigationDiagram>：路由与导航——ARouter路由原理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function AcaRouterNavigationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="ARouter路由原理与导航流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            ARouter 路由原理与导航流程
          </text>

          {/* 编译期 */}
          <rect x="30" y="50" width="200" height="220" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="130" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">编译期</text>

          <rect x="50" y="88" width="160" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Route 注解</text>

          <text x="130" y="140" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="150" width="160" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">APT 注解处理器</text>

          <text x="130" y="202" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="212" width="160" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="234" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生成路由表</text>
          <text x="130" y="248" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">groups / providers</text>

          {/* 运行期 */}
          <rect x="270" y="50" width="440" height="220" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="490" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">运行期</text>

          <rect x="290" y="88" width="180" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="380" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ARouter.init() 初始化</text>

          <rect x="490" y="88" width="200" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="590" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">加载路由表到内存</text>

          <text x="490" y="140" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="290" y="150" width="400" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="490" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ARouter.getInstance().build(path).navigation()</text>

          <text x="490" y="202" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="290" y="212" width="190" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="385" y="234" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">path 匹配路由表</text>

          <rect x="500" y="212" width="190" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="595" y="234" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">startActivity 跳转</text>

          {/* 底部：导航能力 */}
          <rect x="30" y="290" width="680" height="170" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="314" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">ARouter 核心能力</text>

          <rect x="50" y="328" width="150" height="56" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="350" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">页面跳转</text>
          <text x="125" y="366" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">path / URI</text>
          <text x="125" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">参数传递 / 拦截器</text>

          <rect x="215" y="328" width="150" height="56" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="290" y="350" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">服务发现</text>
          <text x="290" y="366" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IProvider</text>
          <text x="290" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">跨组件接口调用</text>

          <rect x="380" y="328" width="150" height="56" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="455" y="350" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">拦截器</text>
          <text x="455" y="366" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IInterceptor</text>
          <text x="455" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">登录校验 / 埋点</text>

          <rect x="545" y="328" width="150" height="56" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="350" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">降级策略</text>
          <text x="620" y="366" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">DegradeService</text>
          <text x="620" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">目标不存在兜底</text>

          <text x="370" y="418" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">@Route(path = "/order/detail")  →  ARouter.build("/order/detail").navigation()</text>
          <text x="370" y="438" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">编译期注解生成路由表，运行期查表跳转，解耦组件间页面依赖</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ARouter路由原理——编译期APT生成路由表，运行期查表完成跨组件页面跳转与服务发现
      </figcaption>
    </figure>
  );
}
