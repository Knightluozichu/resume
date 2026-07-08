/**
 * <VjpVuexPiniaDiagram>：Vuex 与 Pinia 状态管理架构对比图解。
 * 展示 Vuex 的 mutation/同步约束 vs Pinia 的简化模型与 composition 风格。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VjpVuexPiniaDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Vuex 与 Pinia 状态管理架构对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Vuex vs Pinia：状态管理架构对比
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Vuex 五要素 + 同步约束；Pinia 去掉 mutation，更贴合 Composition API
          </text>

          {/* 左：Vuex */}
          <rect x="30" y="68" width="330" height="330" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="195" y="92" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--warning)">Vuex</text>
          <text x="195" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">集中式 store + 严格单向流</text>

          <rect x="50" y="122" width="290" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="65" y="146" fontSize="11" fontWeight="600" fill="var(--success)">state</text>
          <text x="200" y="146" fontSize="10" fill="var(--text-secondary)">唯一数据源，响应式</text>

          <text x="195" y="170" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr; 只读</text>

          <rect x="50" y="180" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="65" y="204" fontSize="11" fontWeight="600" fill="var(--accent)">getters</text>
          <text x="200" y="204" fontSize="10" fill="var(--text-secondary)">派生状态（类似 computed）</text>

          <text x="195" y="228" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr; commit</text>

          <rect x="50" y="238" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1" />
          <text x="65" y="262" fontSize="11" fontWeight="600" fill="var(--warning)">mutations（同步）</text>
          <text x="230" y="262" fontSize="10" fill="var(--text-secondary)">唯一可改 state</text>

          <text x="195" y="286" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr; dispatch</text>

          <rect x="50" y="296" width="290" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="65" y="320" fontSize="11" fontWeight="600" fill="var(--danger)">actions（可异步）</text>
          <text x="230" y="320" fontSize="10" fill="var(--text-secondary)">提交 mutation</text>

          <text x="195" y="358" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">必须走 mutation 才能改 state</text>
          <text x="195" y="376" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">模块嵌套深，命名空间易冲突</text>

          {/* 右：Pinia */}
          <rect x="380" y="68" width="330" height="330" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
          <text x="545" y="92" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--success)">Pinia</text>
          <text x="545" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扁平 store，无 mutation</text>

          <rect x="400" y="122" width="290" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="415" y="142" fontSize="11" fontWeight="600" fill="var(--success)">state</text>
          <text x="415" y="160" fontSize="10" fill="var(--text-secondary)">return &lbrace; count, user &rbrace;（函数式）</text>

          <rect x="400" y="182" width="290" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="415" y="202" fontSize="11" fontWeight="600" fill="var(--accent)">getters</text>
          <text x="415" y="220" fontSize="10" fill="var(--text-secondary)">double: (s) =&gt; s.count * 2</text>

          <rect x="400" y="242" width="290" height="50" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="415" y="262" fontSize="11" fontWeight="600" fill="var(--danger)">actions（同步/异步均可）</text>
          <text x="415" y="280" fontSize="10" fill="var(--text-secondary)">直接 this.count++ 修改 state</text>

          <rect x="400" y="302" width="290" height="80" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="415" y="322" fontSize="11" fontWeight="600" fill="var(--accent)">特性</text>
          <text x="415" y="340" fontSize="10" fill="var(--text-secondary)">无 mutation，TS 友好，无嵌套模块</text>
          <text x="415" y="356" fontSize="10" fill="var(--text-secondary)">支持 setup store 与 options store</text>
          <text x="415" y="372" fontSize="10" fill="var(--text-secondary)">DevTools + 持久化插件生态</text>

          <text x={VIEW_W / 2} y="422" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：Pinia 删掉 mutation 层，action 直接改 state——约束换来了简洁
          </text>
          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            两者都解决「跨组件共享状态」，但 Pinia 更贴近 Vue 3 的组合式心智
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Vuex 与 Pinia 架构对比——Vuex 的 mutation 同步约束与 Pinia 的简化组合式模型
      </figcaption>
    </figure>
  );
}
