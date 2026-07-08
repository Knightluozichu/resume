/**
 * <CswFlowBfcDiagram>：流与 BFC 图解。
 * 展示正常流、浮动塌陷与 BFC 触发后的隔离效果。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function CswFlowBfcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="流与 BFC 图解：浮动塌陷与 BFC 隔离"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            流与 BFC：浮动塌陷 vs BFC 隔离
          </text>

          {/* 左侧：浮动塌陷 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">问题：浮动导致父容器塌陷</text>
          <rect x="40" y="70" width="280" height="150" rx="8" fill="none" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="180" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">.parent（高度塌陷为 0）</text>

          {/* 浮动子元素 */}
          <rect x="60" y="100" width="100" height="50" rx="4" fill="var(--warning)" fillOpacity="0.25" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="110" y="130" textAnchor="middle" fontSize="11" fill="var(--text-primary)">float:left</text>

          <rect x="180" y="100" width="100" height="50" rx="4" fill="var(--warning)" fillOpacity="0.25" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="230" y="130" textAnchor="middle" fontSize="11" fill="var(--text-primary)">float:left</text>

          {/* 紧随的兄弟元素：文字环绕 */}
          <text x="180" y="180" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">后续文本环绕浮动，布局错乱</text>

          {/* 右侧：BFC 隔离 */}
          <text x="560" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">方案：触发 BFC 包裹浮动</text>
          <rect x="420" y="70" width="280" height="150" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.5" />
          <text x="560" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">.parent &lbrace; overflow:hidden &rbrace;（BFC）</text>

          <rect x="440" y="100" width="100" height="50" rx="4" fill="var(--warning)" fillOpacity="0.25" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="490" y="130" textAnchor="middle" fontSize="11" fill="var(--text-primary)">float:left</text>

          <rect x="560" y="100" width="100" height="50" rx="4" fill="var(--warning)" fillOpacity="0.25" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="610" y="130" textAnchor="middle" fontSize="11" fill="var(--text-primary)">float:left</text>

          <text x="560" y="180" textAnchor="middle" fontSize="10" fill="var(--success)">父容器高度被撑起，浮动被隔离</text>

          {/* 下方：BFC 触发条件 */}
          <rect x="40" y="240" width="660" height="100" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">BFC 触发条件（满足任一即生成独立渲染区域）</text>

          <rect x="60" y="276" width="150" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="135" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">根元素 html</text>
          <text x="135" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">天然 BFC</text>

          <rect x="225" y="276" width="150" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="300" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">float != none</text>
          <text x="300" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">浮动元素自身</text>

          <rect x="390" y="276" width="150" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="465" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">overflow != visible</text>
          <text x="465" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">hidden / auto / scroll</text>

          <rect x="555" y="276" width="125" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="617" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">display:flow-root</text>
          <text x="617" y="312" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无副作用首选</text>

          {/* 底部：BFC 三大特性 */}
          <text x="370" y="370" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">BFC 三大布局特性</text>

          <rect x="60" y="384" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="406" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 包裹浮动</text>
          <text x="160" y="424" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">计算高度时包含浮动子</text>

          <rect x="270" y="384" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="406" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">2. 隔离外边距</text>
          <text x="370" y="424" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">阻止 margin 穿透合并</text>

          <rect x="480" y="384" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="580" y="406" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">3. 不与浮动重叠</text>
          <text x="580" y="424" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">相邻 BFC 避让浮动区</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        流与 BFC——浮动塌陷成因、BFC 触发条件与三大隔离特性
      </figcaption>
    </figure>
  );
}
