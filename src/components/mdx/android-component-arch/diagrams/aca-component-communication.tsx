/**
 * <AcaComponentCommunicationDiagram>：组件通信——跨组件通信方式对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function AcaComponentCommunicationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="跨组件通信方式对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            跨组件通信——四种方式对比
          </text>

          {/* 方式1：接口下沉 */}
          <rect x="30" y="50" width="330" height="200" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">方式一：接口下沉</text>

          <rect x="50" y="88" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="115" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">组件A</text>

          <rect x="200" y="88" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="265" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">组件B</text>

          <text x="185" y="110" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="100" y="140" width="190" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">common 层接口定义</text>

          <text x="195" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">A 定义接口 &rarr; common</text>
          <text x="195" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">B 实现接口 &rarr; ARouter 发现</text>
          <text x="195" y="232" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">同步调用 / 类型安全</text>

          {/* 方式2：事件总线 */}
          <rect x="380" y="50" width="330" height="200" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">方式二：事件总线</text>

          <rect x="400" y="88" width="130" height="36" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="465" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">发布者</text>

          <rect x="560" y="88" width="130" height="36" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="625" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">订阅者</text>

          <text x="535" y="110" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">post</text>
          <text x="555" y="110" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="450" y="140" width="190" height="36" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">EventBus / LiveData Bus</text>

          <text x="545" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">发布 event &rarr; 总线分发</text>
          <text x="545" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">订阅者 onEvent 接收</text>
          <text x="545" y="232" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">异步 / 一对多 / 无类型安全</text>

          {/* 方式3：SharedPreferences */}
          <rect x="30" y="270" width="330" height="200" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="294" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">方式三：SharedPreferences</text>

          <rect x="50" y="308" width="130" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="115" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">组件A 写入</text>

          <rect x="200" y="308" width="130" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="265" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">组件B 读取</text>

          <text x="185" y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="100" y="360" width="190" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="382" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SP / MMKV / DataStore</text>

          <text x="195" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">A 写 key-value &rarr; B 监听变化</text>
          <text x="195" y="434" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">简单数据 / 无类型安全 / 耦合key</text>
          <text x="195" y="452" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">适合少量配置/状态共享</text>

          {/* 方式4：ARouter Provider */}
          <rect x="380" y="270" width="330" height="200" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="294" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">方式四：ARouter Provider</text>

          <rect x="400" y="308" width="130" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="465" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">调用方</text>

          <rect x="560" y="308" width="130" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="625" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IProvider</text>

          <text x="555" y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="450" y="360" width="190" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="382" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">navigation(IProvider)</text>

          <text x="545" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">接口 &rarr; ARouter 注入实现</text>
          <text x="545" y="434" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">同步 / 类型安全 / 框架内置</text>
          <text x="545" y="452" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">推荐：替代接口下沉的轻量方案</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        跨组件通信四种方式——接口下沉、事件总线、SharedPreferences、ARouter Provider 的对比与适用场景
      </figcaption>
    </figure>
  );
}
