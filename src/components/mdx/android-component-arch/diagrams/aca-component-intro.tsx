/**
 * <AcaComponentIntroDiagram>：组件化概述——单体架构 vs 组件化架构对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function AcaComponentIntroDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="单体架构与组件化架构对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            单体架构 vs 组件化架构
          </text>

          {/* 左侧：单体架构 */}
          <rect x="30" y="50" width="330" height="450" rx="12" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">单体架构（Monolithic）</text>

          <rect x="50" y="92" width="290" height="40" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">UI 层——所有页面耦合在一起</text>

          <rect x="50" y="142" width="290" height="40" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="166" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Business 层——直接互相依赖</text>

          <rect x="50" y="192" width="290" height="40" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="216" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Data 层——全局共享</text>

          <text x="195" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">痛点</text>
          <text x="60" y="280" fontSize="10" fill="var(--text-secondary)">&#x2716; 编译慢：全量编译数分钟</text>
          <text x="60" y="298" fontSize="10" fill="var(--text-secondary)">&#x2716; 耦合高：模块互相直接依赖</text>
          <text x="60" y="316" fontSize="10" fill="var(--text-secondary)">&#x2716; 团队冲突：多人改同一模块</text>
          <text x="60" y="334" fontSize="10" fill="var(--text-secondary)">&#x2716; 无法独立测试</text>
          <text x="60" y="352" fontSize="10" fill="var(--text-secondary)">&#x2716; 无法独立部署</text>
          <text x="60" y="370" fontSize="10" fill="var(--text-secondary)">&#x2716; 复用困难</text>

          {/* 右侧：组件化架构 */}
          <rect x="380" y="50" width="330" height="450" rx="12" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">组件化架构（Componentized）</text>

          <rect x="400" y="92" width="290" height="40" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">壳工程（Shell App）——空壳入口</text>

          <rect x="400" y="142" width="88" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="444" y="166" textAnchor="middle" fontSize="10" fill="var(--accent)">首页组件</text>

          <rect x="496" y="142" width="88" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="540" y="166" textAnchor="middle" fontSize="10" fill="var(--accent)">登录组件</text>

          <rect x="592" y="142" width="88" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="636" y="166" textAnchor="middle" fontSize="10" fill="var(--accent)">订单组件</text>

          <rect x="400" y="192" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="216" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">公共组件库（Common SDK）</text>

          <text x="545" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">优势</text>
          <text x="410" y="280" fontSize="10" fill="var(--text-secondary)">&#x2714; 编译快：单组件独立编译</text>
          <text x="410" y="298" fontSize="10" fill="var(--text-secondary)">&#x2714; 解耦：组件间无直接依赖</text>
          <text x="410" y="316" fontSize="10" fill="var(--text-secondary)">&#x2714; 团队并行：各组件独立开发</text>
          <text x="410" y="334" fontSize="10" fill="var(--text-secondary)">&#x2714; 可独立测试</text>
          <text x="410" y="352" fontSize="10" fill="var(--text-secondary)">&#x2714; 可独立部署/插件化</text>
          <text x="410" y="370" fontSize="10" fill="var(--text-secondary)">&#x2714; 组件可复用</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        单体架构痛点（编译慢、耦合高、团队冲突）与组件化架构优势（解耦、并行、独立部署）对比
      </figcaption>
    </figure>
  );
}
