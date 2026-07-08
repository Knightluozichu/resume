/**
 * <NdbgAsyncTracingDiagram>：AsyncHooks 异步调用树与 AsyncLocalStorage 图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function NdbgAsyncTracingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="AsyncHooks 异步调用树与 AsyncLocalStorage 图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            AsyncHooks：异步调用树与上下文传递
          </text>

          {/* 左侧：异步调用树 */}
          <text x="180" y="56" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">异步调用树（asyncId → triggerAsyncId）</text>

          {/* 根节点 */}
          <rect x="110" y="66" width="140" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="180" y="84" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">HTTP 回调</text>
          <text x="180" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">asyncId=5, trigger=1</text>

          {/* 连线 */}
          <line x1="180" y1="108" x2="100" y2="128" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="180" y1="108" x2="260" y2="128" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 子节点1：fs.readFile */}
          <rect x="30" y="128" width="140" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="100" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">fs.readFile</text>
          <text x="100" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">asyncId=9, trigger=5</text>

          {/* 子节点2：db.query */}
          <rect x="190" y="128" width="140" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="260" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">db.query</text>
          <text x="260" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">asyncId=10, trigger=5</text>

          {/* 连线 */}
          <line x1="100" y1="170" x2="100" y2="190" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="260" y1="170" x2="260" y2="190" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 孙节点：Promise */}
          <rect x="30" y="190" width="140" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="100" y="208" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Promise</text>
          <text x="100" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">asyncId=11, trigger=9</text>

          <rect x="190" y="190" width="140" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="260" y="208" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Promise</text>
          <text x="260" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">asyncId=12, trigger=10</text>

          {/* 调用链追溯标注 */}
          <rect x="20" y="244" width="320" height="28" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="180" y="262" textAnchor="middle" fontSize="9" fill="var(--danger)">追溯: 11 → 9 → 5 → 1（Promise 由 HTTP 请求触发）</text>

          {/* 生命周期回调标注 */}
          <text x="180" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">createHook 四回调</text>
          <rect x="30" y="298" width="70" height="24" rx="4" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="65" y="314" textAnchor="middle" fontSize="9" fill="var(--success)">init</text>
          <rect x="110" y="298" width="70" height="24" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="145" y="314" textAnchor="middle" fontSize="9" fill="var(--warning)">before</text>
          <rect x="190" y="298" width="70" height="24" rx="4" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="225" y="314" textAnchor="middle" fontSize="9" fill="var(--accent)">after</text>
          <rect x="270" y="298" width="70" height="24" rx="4" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="305" y="314" textAnchor="middle" fontSize="9" fill="var(--danger)">destroy</text>

          <text x="180" y="340" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">init: 创建 | before: 回调前 | after: 回调后 | destroy: 销毁</text>
          <text x="180" y="356" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">全量 hooks 开销 5-15% | AsyncLocalStorage 约 1-3%</text>

          {/* 右侧：AsyncLocalStorage */}
          <rect x="380" y="66" width="320" height="300" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="540" y="86" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">AsyncLocalStorage</text>
          <text x="540" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨异步边界传递请求上下文</text>

          <rect x="400" y="114" width="280" height="44" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="540" y="130" textAnchor="middle" fontSize="9" fill="var(--success)">als.run(&lbrace;requestId&rbrace;, callback)</text>
          <text x="540" y="144" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">绑定上下文到当前 asyncId</text>

          <line x1="540" y1="160" x2="540" y2="180" stroke="var(--text-tertiary)" strokeWidth="1" />
          <polygon points="535,176 545,176 540,184" fill="var(--text-tertiary)" />

          <rect x="400" y="186" width="280" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="540" y="202" textAnchor="middle" fontSize="9" fill="var(--warning)">asyncOp1() → asyncOp2() → ...</text>
          <text x="540" y="214" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">异步操作自动继承 store</text>

          <line x1="540" y1="224" x2="540" y2="244" stroke="var(--text-tertiary)" strokeWidth="1" />
          <polygon points="535,240 545,240 540,248" fill="var(--text-tertiary)" />

          <rect x="400" y="250" width="280" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="540" y="266" textAnchor="middle" fontSize="9" fill="var(--danger)">als.getStore()</text>
          <text x="540" y="278" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">任意深层回调中获取 &lbrace;requestId&rbrace;</text>

          <rect x="400" y="298" width="280" height="56" rx="6" fill="var(--bg-primary)" fillOpacity="0.4" stroke="var(--border)" strokeWidth="0.8" />
          <text x="540" y="316" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">vs 手动参数透传</text>
          <text x="540" y="330" textAnchor="middle" fontSize="9" fill="var(--success)">非侵入式（不改函数签名）</text>
          <text x="540" y="344" textAnchor="middle" fontSize="9" fill="var(--success)">不遗漏（自动传递不断链）</text>

          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：AsyncHooks 重建异步调用树 | AsyncLocalStorage 自动传递请求上下文
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AsyncHooks 异步调用树——asyncId/triggerAsyncId 父子关系与 AsyncLocalStorage 跨边界上下文传递
      </figcaption>
    </figure>
  );
}
