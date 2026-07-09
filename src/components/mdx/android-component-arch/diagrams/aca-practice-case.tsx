/**
 * <AcaPracticeCaseDiagram>：实战案例——电商App组件化拆分图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function AcaPracticeCaseDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="电商App组件化实战拆分图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            电商 App 组件化拆分实战
          </text>

          {/* 上层：拆分前 */}
          <rect x="30" y="50" width="680" height="60" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">拆分前：单体 App</text>
          <text x="370" y="94" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">首页 / 登录 / 商品 / 购物车 / 订单 / 支付 / 用户中心——全部耦合在一个 module</text>

          <text x="370" y="128" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 组件化拆分</text>

          {/* 中层：拆分后 */}
          <rect x="30" y="140" width="680" height="240" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="164" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">拆分后：组件化架构</text>

          {/* 壳工程 */}
          <rect x="250" y="178" width="240" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="370" y="200" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">壳工程（app）</text>

          {/* 业务组件层 */}
          <rect x="40" y="226" width="100" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="90" y="246" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">首页</text>
          <text x="90" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-home</text>

          <rect x="150" y="226" width="100" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="246" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">登录</text>
          <text x="200" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-login</text>

          <rect x="260" y="226" width="100" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="310" y="246" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">商品</text>
          <text x="310" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-product</text>

          <rect x="370" y="226" width="100" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="420" y="246" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">购物车</text>
          <text x="420" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-cart</text>

          <rect x="480" y="226" width="100" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="530" y="246" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">订单</text>
          <text x="530" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-order</text>

          <rect x="590" y="226" width="110" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="645" y="246" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">用户中心</text>
          <text x="645" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">module-user</text>

          {/* 公共层 */}
          <rect x="100" y="284" width="260" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="230" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">common-biz: 支付 / 推送 / 分享</text>

          <rect x="380" y="284" width="260" height="36" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="510" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">common-core: 网络 / 路由 / DI</text>

          {/* 路由路径 */}
          <text x="370" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">跨组件交互示例</text>
          <text x="370" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">首页 &rarr; 路由 &rarr; 商品详情 &rarr; 路由 &rarr; 购物车 &rarr; 路由 &rarr; 订单 &rarr; DI &rarr; 支付</text>

          {/* 下层：拆分效果 */}
          <rect x="30" y="400" width="680" height="100" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="424" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">拆分效果</text>

          <rect x="50" y="438" width="150" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">编译时间</text>
          <text x="125" y="472" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">8min &rarr; 2min</text>

          <rect x="215" y="438" width="150" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="290" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">团队效率</text>
          <text x="290" y="472" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">6人并行开发</text>

          <rect x="380" y="438" width="150" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="455" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">组件复用</text>
          <text x="455" y="472" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">登录组件复用3个App</text>

          <rect x="545" y="438" width="150" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">可测试性</text>
          <text x="620" y="472" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单组件独立单测</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        电商App组件化拆分实战——从单体到6个业务组件+公共层，编译时间降低75%，支持并行开发
      </figcaption>
    </figure>
  );
}
