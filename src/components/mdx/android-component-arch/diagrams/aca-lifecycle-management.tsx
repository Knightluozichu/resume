/**
 * <AcaLifecycleManagementDiagram>：生命周期管理——组件生命周期图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function AcaLifecycleManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="组件生命周期管理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            组件化生命周期管理
          </text>

          {/* 左侧：App 全局生命周期 */}
          <rect x="30" y="50" width="330" height="430" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">App 全局生命周期</text>

          <rect x="50" y="88" width="290" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Application.onCreate()</text>

          <text x="195" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="148" width="290" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="170" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">注册 ActivityLifecycleCallbacks</text>

          <text x="195" y="198" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="208" width="290" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">统计 Activity 数量</text>

          <text x="195" y="258" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="268" width="135" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="117" y="290" textAnchor="middle" fontSize="10" fill="var(--success)">count = 0</text>
          <text x="117" y="300" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">进入后台</text>

          <rect x="205" y="268" width="135" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="272" y="290" textAnchor="middle" fontSize="10" fill="var(--warning)">count = 1</text>
          <text x="272" y="300" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">进入前台</text>

          <text x="195" y="328" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="338" width="290" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="360" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">通知各组件 onForeground/onBackground</text>

          <text x="195" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SPI 机制分发状态</text>
          <text x="195" y="410" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">IAppLifecycle 接口</text>
          <text x="195" y="430" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">各组件注册监听</text>
          <text x="195" y="452" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">推流暂停 / 统计上报</text>

          {/* 右侧：组件生命周期 */}
          <rect x="380" y="50" width="330" height="430" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">组件生命周期</text>

          <rect x="400" y="88" width="290" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">组件初始化（init）</text>

          <text x="545" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="148" width="290" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="170" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">注册路由 / 注册服务</text>

          <text x="545" y="198" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="208" width="290" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">运行期响应前后台</text>

          <text x="545" y="258" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="268" width="290" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">资源回收（destroy）</text>

          <text x="545" y="328" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">生命周期任务</text>

          <text x="410" y="352" fontSize="10" fill="var(--text-secondary)">&#x2022; 懒加载：首次进入才初始化</text>
          <text x="410" y="372" fontSize="10" fill="var(--text-secondary)">&#x2022; 前台：启动推流 / 刷新数据</text>
          <text x="410" y="392" fontSize="10" fill="var(--text-secondary)">&#x2022; 后台：暂停推流 / 释放资源</text>
          <text x="410" y="412" fontSize="10" fill="var(--text-secondary)">&#x2022; 低内存：清理缓存</text>
          <text x="410" y="432" fontSize="10" fill="var(--text-secondary)">&#x2022; 退出：注销注册</text>
          <text x="410" y="458" fontSize="9" fill="var(--text-tertiary)">ApplicationLifecycle 驱动</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        组件化生命周期管理——App全局生命周期通过Activity计数判断前后台，SPI分发至各组件
      </figcaption>
    </figure>
  );
}
