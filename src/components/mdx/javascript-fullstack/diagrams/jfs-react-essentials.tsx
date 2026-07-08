/**
 * <JfsReactEssentialsDiagram>：React 声明式渲染与虚拟 DOM 流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function JfsReactEssentialsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="React 声明式渲染与虚拟DOM流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            React 声明式渲染流程
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            state 变化 → 新虚拟DOM → diff → 最小变更集 → 真实DOM
          </text>

          {/* 第一行：state → 虚拟DOM */}
          <rect x="40" y="70" width="160" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="96" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">setState</text>
          <text x="120" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">状态变化触发</text>

          <text x="220" y="104" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="240" y="70" width="180" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="330" y="96" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">新虚拟DOM树</text>
          <text x="330" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内存中 JS 对象树</text>

          <text x="440" y="104" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="460" y="70" width="180" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="550" y="96" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">diff 对比</text>
          <text x="550" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">新旧树同层比较 + key</text>

          {/* 第二行：diff → 最小变更 → 真实DOM */}
          <text x="550" y="150" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="460" y="164" width="180" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="550" y="190" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">最小变更集</text>
          <text x="550" y="208" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">批量提交真实DOM</text>

          <text x="440" y="198" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&larr;</text>

          <rect x="240" y="164" width="180" height="60" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="330" y="190" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">真实 DOM 更新</text>
          <text x="330" y="208" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">重排重绘</text>

          {/* Hooks 区 */}
          <rect x="40" y="250" width="660" height="120" rx="10" fill="var(--text-tertiary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="274" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">核心 Hooks 职责</text>

          <rect x="60" y="290" width="190" height="60" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="155" y="312" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">useState</text>
          <text x="155" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">本地状态，更新触发重渲染</text>

          <rect x="270" y="290" width="190" height="60" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="365" y="312" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">useEffect</text>
          <text x="365" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">副作用，依赖数组控制执行</text>

          <rect x="480" y="290" width="190" height="60" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="575" y="312" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">useMemo</text>
          <text x="575" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缓存计算，依赖不变复用</text>

          <text x={VIEW_W / 2} y="396" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：开发者只描述状态，React 算 diff 并批量更新 DOM
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        React 声明式渲染——状态变化经虚拟DOM diff 后批量提交真实DOM，核心Hooks各司其职
      </figcaption>
    </figure>
  );
}
