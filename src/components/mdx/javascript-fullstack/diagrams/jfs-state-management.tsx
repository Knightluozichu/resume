/**
 * <JfsStateManagementDiagram>：状态管理方案对比图解（本地/Context/Redux/Zustand）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function JfsStateManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="状态管理方案对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            状态管理方案对比
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            按规模与频率选型：本地 → Context → Zustand → Redux
          </text>

          {/* prop drilling 痛点 */}
          <rect x="40" y="68" width="660" height="64" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">prop drilling 痛点</text>
          <text x="370" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">顶层 state → 中间组件被迫转发 → 底层使用</text>
          <text x="370" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">层数一深不可维护 → 引入全局状态</text>

          {/* 四列对比 */}
          <rect x="40" y="150" width="160" height="210" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">useState</text>
          <text x="120" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">本地状态</text>
          <text x="120" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">组件内部</text>
          <text x="120" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">零成本</text>
          <text x="120" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不跨组件</text>
          <text x="120" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">适合</text>
          <text x="120" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">表单/开关</text>
          <text x="120" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">短暂局部</text>

          <rect x="210" y="150" width="160" height="210" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Context</text>
          <text x="290" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">依赖注入</text>
          <text x="290" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Provider 包裹</text>
          <text x="290" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无细粒度订阅</text>
          <text x="290" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">value 变全量重渲染</text>
          <text x="290" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">适合</text>
          <text x="290" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">主题/语言</text>
          <text x="290" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">低频全局配置</text>

          <rect x="380" y="150" width="160" height="210" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="460" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Zustand</text>
          <text x="460" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">极简 store</text>
          <text x="460" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无 Provider</text>
          <text x="460" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">selector 订阅切片</text>
          <text x="460" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按粒度重渲染</text>
          <text x="460" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">适合</text>
          <text x="460" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">购物车</text>
          <text x="460" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">中小应用</text>

          <rect x="550" y="150" width="150" height="210" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="625" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Redux</text>
          <text x="625" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单向数据流</text>
          <text x="625" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">action/reducer</text>
          <text x="625" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可时间旅行</text>
          <text x="625" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">样板代码多</text>
          <text x="625" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">适合</text>
          <text x="625" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">大型团队</text>
          <text x="625" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">复杂可追溯</text>

          <text x={VIEW_W / 2} y="386" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            选型原则：本地够用就不上全局；高频细粒度用 selector 库
          </text>
          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            全局 store 变化时所有订阅者参与 reconciliation，滥用致全 app 重渲染
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态管理四方案对比——useState/Context/Zustand/Redux 按规模与变更频率选型
      </figcaption>
    </figure>
  );
}
