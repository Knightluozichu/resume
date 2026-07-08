/**
 * <JdgDomEventsDiagram>：DOM 与事件图解（事件冒泡/委托、MutationObserver）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgDomEventsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="DOM与事件图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrDe" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
            <marker id="arrDe2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--danger)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            DOM 与事件：事件流、委托、Observer
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            捕获 → 目标 → 冒泡 / 事件委托 / 阻止冒泡与默认 / MutationObserver
          </text>

          {/* 顶部：事件流三阶段 */}
          <rect x="30" y="68" width="680" height="150" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">事件流三阶段（DOM 树传播路径）</text>

          <rect x="50" y="100" width="200" height="100" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">1. 捕获阶段</text>
          <text x="150" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">window → document</text>
          <text x="150" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">→ 祖先 → 目标父</text>
          <text x="150" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">addEventListener</text>
          <text x="150" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第三参 true 监听</text>

          <rect x="270" y="100" width="200" height="100" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">2. 目标阶段</text>
          <text x="370" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">事件到达目标元素</text>
          <text x="370" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">event.target = 实际源</text>
          <text x="370" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">event.currentTarget</text>
          <text x="370" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">= 当前监听元素</text>

          <rect x="490" y="100" width="200" height="100" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="590" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">3. 冒泡阶段</text>
          <text x="590" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">目标父 → 祖先</text>
          <text x="590" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">→ document → window</text>
          <text x="590" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">默认在此阶段触发</text>
          <text x="590" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">stopPropagation 阻断</text>

          <path d="M250 150 L 268 150" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrDe)" />
          <path d="M470 150 L 488 150" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrDe)" />

          {/* 中部：事件委托 + 阻止 */}
          <rect x="30" y="234" width="330" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="254" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">事件委托（冒泡的工程利用）</text>
          <text x="50" y="276" fontSize="11" fill="var(--text-secondary)">在父元素注册一个监听器</text>
          <text x="50" y="294" fontSize="11" fill="var(--text-secondary)">利用 event.target 判断实际子元素</text>
          <text x="50" y="312" fontSize="11" fill="var(--text-secondary)">e.target.closest(".item") 精确匹配</text>
          <text x="50" y="330" fontSize="11" fill="var(--text-secondary)">动态增删子元素无需重新绑定</text>
          <text x="50" y="348" fontSize="11" fill="var(--danger)">优势：监听器少，内存与初始化成本低</text>

          <rect x="380" y="234" width="330" height="120" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="254" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阻止与 Observer</text>
          <text x="400" y="276" fontSize="11" fill="var(--text-secondary)">stopPropagation()：停止冒泡/捕获</text>
          <text x="400" y="294" fontSize="11" fill="var(--text-secondary)">preventDefault()：阻止默认行为</text>
          <text x="400" y="312" fontSize="11" fill="var(--text-secondary)">MutationObserver：监听 DOM 变更</text>
          <text x="400" y="330" fontSize="11" fill="var(--text-secondary)">observe(root, &lbrace; childList, subtree &rbrace;)</text>
          <text x="400" y="348" fontSize="11" fill="var(--text-secondary)">disconnect() 停止观察</text>

          {/* 底部：要点 */}
          <rect x="30" y="370" width="680" height="62" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="390" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">工程要点</text>
          <text x="50" y="412" fontSize="11" fill="var(--text-secondary)">事件委托利用冒泡在父节点统一处理，减少监听器数量；target 是事件源，currentTarget 是绑定者</text>
          <text x="50" y="426" fontSize="11" fill="var(--text-secondary)">MutationObserver 异步批量回调 DOM 变更，比 deprecated mutation events 更高效</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事件流经捕获-目标-冒泡三阶段；委托利用冒泡在父节点统一处理；MutationObserver 高效监听 DOM 变更
      </figcaption>
    </figure>
  );
}
