/**
 * <AcaArchitectureDesignDiagram>：架构设计——分层架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function AcaArchitectureDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="组件化分层架构设计图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            组件化分层架构设计
          </text>

          {/* 第1层：壳工程 */}
          <rect x="120" y="50" width="500" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">壳工程（app shell）</text>
          <text x="370" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Application 初始化 / 集成各组件 / 无业务逻辑</text>

          <text x="370" y="118" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第2层：业务组件层 */}
          <rect x="30" y="130" width="110" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="85" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">首页组件</text>
          <text x="85" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-home</text>

          <rect x="150" y="130" width="110" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">登录组件</text>
          <text x="205" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-login</text>

          <rect x="270" y="130" width="110" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="325" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">订单组件</text>
          <text x="325" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-order</text>

          <rect x="390" y="130" width="110" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="445" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">用户组件</text>
          <text x="445" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-user</text>

          <rect x="510" y="130" width="110" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="565" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">商品组件</text>
          <text x="565" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-product</text>

          <text x="370" y="210" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">各业务组件之间无直接依赖，通过路由/通信框架交互</text>

          <text x="370" y="232" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第3层：公共业务层 */}
          <rect x="80" y="244" width="580" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="266" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">公共业务层（common-business）</text>
          <text x="370" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分享 / 支付 / 推送 / 统计——多组件共享的业务能力</text>

          <text x="370" y="310" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第4层：基础架构层 */}
          <rect x="80" y="322" width="580" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="344" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">基础架构层（common-core）</text>
          <text x="370" y="360" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">网络 / 存储 / 工具类 / Base类 / 路由框架 / DI框架</text>

          <text x="370" y="388" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第5层：SDK层 */}
          <rect x="80" y="400" width="580" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="422" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">第三方 SDK 层</text>
          <text x="370" y="438" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">AndroidX / OkHttp / Retrofit / Glide / ARouter / Dagger2</text>

          {/* 右侧依赖方向标注 */}
          <text x="700" y="75" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第1层</text>
          <text x="700" y="160" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第2层</text>
          <text x="700" y="269" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第3层</text>
          <text x="700" y="347" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第4层</text>
          <text x="700" y="425" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第5层</text>

          <text x="700" y="470" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">依赖方向：&darr;</text>
          <text x="700" y="485" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">上层依赖下层</text>
          <text x="700" y="500" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">禁止反向依赖</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        组件化五层架构——壳工程、业务组件、公共业务、基础架构、第三方SDK，上层依赖下层禁止反向
      </figcaption>
    </figure>
  );
}
