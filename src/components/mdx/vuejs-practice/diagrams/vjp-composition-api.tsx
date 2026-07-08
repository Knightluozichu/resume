/**
 * <VjpCompositionApiDiagram>：Composition API 与 Options API 对比图解。
 * 展示 Options API 选项分散 vs Composition API 按逻辑聚合 + Hooks 复用。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VjpCompositionApiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Composition API 与 Options API 对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Options API vs Composition API：逻辑如何组织
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            选项型按「选项类型」分组；组合型按「功能」聚合，逻辑可抽成 Hooks
          </text>

          {/* 左：Options API */}
          <rect x="30" y="68" width="330" height="300" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="195" y="92" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--warning)">Options API</text>
          <text x="195" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">逻辑按选项类型分散</text>

          <rect x="50" y="122" width="290" height="48" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="65" y="140" fontSize="11" fontWeight="600" fill="var(--text-primary)">data()</text>
          <text x="65" y="158" fontSize="10" fill="var(--text-secondary)">count, user, list（搜索+计数混在一起）</text>

          <rect x="50" y="178" width="290" height="48" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="65" y="196" fontSize="11" fontWeight="600" fill="var(--text-primary)">computed</text>
          <text x="65" y="214" fontSize="10" fill="var(--text-secondary)">doubleCount, filteredList（跨功能）</text>

          <rect x="50" y="234" width="290" height="48" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="65" y="252" fontSize="11" fontWeight="600" fill="var(--text-primary)">methods</text>
          <text x="65" y="270" fontSize="10" fill="var(--text-secondary)">increment, search, reset（混排）</text>

          <rect x="50" y="290" width="290" height="48" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="65" y="308" fontSize="11" fontWeight="600" fill="var(--text-primary)">mounted / watch</text>
          <text x="65" y="326" fontSize="10" fill="var(--text-secondary)">fetchList, watchKeyword（跨功能）</text>

          <text x="195" y="356" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">同一功能的代码散落在 4 个选项里</text>

          {/* 右：Composition API */}
          <rect x="380" y="68" width="330" height="300" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
          <text x="545" y="92" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--success)">Composition API</text>
          <text x="545" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">逻辑按功能聚合到 setup</text>

          <rect x="400" y="122" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="415" y="140" fontSize="11" fontWeight="600" fill="var(--text-primary)">useCounter() 功能块</text>
          <text x="415" y="158" fontSize="10" fill="var(--text-secondary)">count, double, increment 一处</text>

          <rect x="400" y="178" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="415" y="196" fontSize="11" fontWeight="600" fill="var(--text-primary)">useSearch(list) 功能块</text>
          <text x="415" y="214" fontSize="10" fill="var(--text-secondary)">keyword, filteredList, reset</text>

          <rect x="400" y="234" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="415" y="252" fontSize="11" fontWeight="600" fill="var(--text-primary)">useUser() 功能块</text>
          <text x="415" y="270" fontSize="10" fill="var(--text-secondary)">user, fetchUser, watch</text>

          <rect x="400" y="290" width="290" height="48" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="415" y="308" fontSize="11" fontWeight="600" fill="var(--accent)">可抽成独立文件复用</text>
          <text x="415" y="326" fontSize="10" fill="var(--text-secondary)">export function useCounter() &lbrace;...&rbrace;</text>

          <text x="545" y="356" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">同功能代码聚一处，可跨组件复用</text>

          <text x={VIEW_W / 2} y="394" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            setup() 执行时机：组件创建之初，props 解析后、beforeCreate 之前
          </text>
          <text x={VIEW_W / 2} y="414" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            ref/reactive 在 setup 中创建并 return，模板可直接使用
          </text>
          <text x={VIEW_W / 2} y="434" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「按选项切分」到「按功能切分」——复用单位从 mixin 变成 Hooks 函数
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Composition API 与 Options API 对比——按功能聚合逻辑并抽成可复用 Hooks
      </figcaption>
    </figure>
  );
}
