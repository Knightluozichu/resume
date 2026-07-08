/**
 * <VjpComponentDesignDiagram>：Vue 组件设计模式与通信关系图解。
 * 展示 props 向下、emit 向上、slots 内容分发、provide/inject 跨层。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VjpComponentDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Vue 组件设计模式与通信关系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Vue 组件通信：props / emit / slots / provide-inject
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            父子用 props+emit 单向流；内容用 slots 分发；跨层用 provide/inject
          </text>

          {/* 父组件 */}
          <rect x="60" y="68" width="620" height="120" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="90" y="90" fontSize="13" fontWeight="600" fill="var(--accent)">父组件 Parent</text>
          <text x="90" y="108" fontSize="10" fill="var(--text-secondary)">const count = ref(0)</text>
          <text x="90" y="124" fontSize="10" fill="var(--text-secondary)">&lt;Child :value="count" @add="n =&gt; count = n" /&gt;</text>

          {/* 子组件 */}
          <rect x="200" y="210" width="340" height="110" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="230" y="232" fontSize="13" fontWeight="600" fill="var(--success)">子组件 Child</text>
          <text x="230" y="250" fontSize="10" fill="var(--text-secondary)">props: &lbrace; value: number &rbrace;</text>
          <text x="230" y="266" fontSize="10" fill="var(--text-secondary)">emits: &lbrace; add: [n] &rbrace;</text>
          <text x="230" y="282" fontSize="10" fill="var(--text-secondary)">&lt;button @click="emit('add', value+1)"&gt;+1&lt;/button&gt;</text>
          <text x="230" y="300" fontSize="10" fill="var(--text-secondary)">&lt;slot name="footer" /&gt;</text>

          {/* props 向下箭头（左） */}
          <line x1="180" y1="150" x2="220" y2="208" stroke="var(--warning)" strokeWidth="2" />
          <text x="150" y="188" fontSize="11" fontWeight="600" fill="var(--warning)">props &darr;</text>
          <text x="150" y="202" fontSize="10" fill="var(--text-secondary)">单向数据流</text>

          {/* emit 向上箭头（右） */}
          <line x1="520" y1="208" x2="560" y2="150" stroke="var(--danger)" strokeWidth="2" />
          <text x="560" y="188" fontSize="11" fontWeight="600" fill="var(--danger)">&uarr; emit</text>
          <text x="560" y="202" fontSize="10" fill="var(--text-secondary)">事件冒泡</text>

          {/* slots 内容分发 */}
          <rect x="60" y="345" width="280" height="90" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="90" y="367" fontSize="13" fontWeight="600" fill="var(--warning)">插槽 slots</text>
          <text x="90" y="387" fontSize="10" fill="var(--text-secondary)">父组件把内容投递到子组件占位</text>
          <text x="90" y="403" fontSize="10" fill="var(--text-secondary)">默认插槽 / 具名插槽 / 作用域插槽</text>
          <text x="90" y="419" fontSize="10" fill="var(--text-secondary)">子组件把数据通过 slot 回传父</text>
          <text x="200" y="345" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr;</text>

          {/* provide/inject 跨层 */}
          <rect x="400" y="345" width="280" height="90" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="430" y="367" fontSize="13" fontWeight="600" fill="var(--danger)">provide / inject</text>
          <text x="430" y="387" fontSize="10" fill="var(--text-secondary)">祖先 provide(key, value)</text>
          <text x="430" y="403" fontSize="10" fill="var(--text-secondary)">任意后代 inject(key)</text>
          <text x="430" y="419" fontSize="10" fill="var(--text-secondary)">跨层注入，避免逐层透传 props</text>
          <line x1="540" y1="320" x2="540" y2="345" stroke="var(--danger)" strokeWidth="1.4" strokeDasharray="4 3" />

          <text x={VIEW_W / 2} y="452" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：组件是「带契约的黑箱」——props 是入参，emit 是回调，slot 是内容扩展点
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Vue 组件设计模式——父子 props/emit 单向数据流、slots 内容分发、provide/inject 跨层依赖注入
      </figcaption>
    </figure>
  );
}
