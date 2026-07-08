/**
 * <GsaCoroutineModelDiagram>：协程模型与异步编程图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaCoroutineModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="协程模型与异步编程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            协程：单线程内 I/O 等待时让出执行权
          </text>

          {/* 线程模型 */}
          <rect x="30" y="50" width="340" height="170" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">线程模型：每请求一线程</text>

          <rect x="50" y="86" width="300" height="22" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="70" y="101" fontSize="9" fill="var(--text-secondary)">线程1: QueryDB</text>
          <rect x="200" y="88" width="140" height="18" rx="3" fill="var(--danger)" fillOpacity="0.3" />
          <text x="270" y="101" textAnchor="middle" fontSize="8" fill="var(--danger)">阻塞等待 5ms</text>

          <rect x="50" y="114" width="300" height="22" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="70" y="129" fontSize="9" fill="var(--text-secondary)">线程2: QueryDB</text>
          <rect x="200" y="116" width="140" height="18" rx="3" fill="var(--danger)" fillOpacity="0.3" />
          <text x="270" y="129" textAnchor="middle" fontSize="8" fill="var(--danger)">阻塞等待 5ms</text>

          <rect x="50" y="142" width="300" height="22" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="70" y="157" fontSize="9" fill="var(--text-secondary)">线程N: QueryDB</text>
          <rect x="200" y="144" width="140" height="18" rx="3" fill="var(--danger)" fillOpacity="0.3" />
          <text x="270" y="157" textAnchor="middle" fontSize="8" fill="var(--danger)">阻塞等待 5ms</text>

          <text x="200" y="184" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">1 万请求 → 1 万线程 × 8MB = 80GB</text>
          <text x="200" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">切换陷内核 1-10μs，不可行</text>

          {/* 协程模型 */}
          <rect x="390" y="50" width="320" height="170" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">协程模型：单线程事件循环</text>

          <rect x="410" y="86" width="100" height="22" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.8" />
          <text x="460" y="101" textAnchor="middle" fontSize="8" fill="var(--success)">协程1 await</text>

          <rect x="520" y="86" width="100" height="22" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.8" />
          <text x="570" y="101" textAnchor="middle" fontSize="8" fill="var(--success)">协程2 跑</text>

          <rect x="630" y="86" width="60" height="22" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.8" />
          <text x="660" y="101" textAnchor="middle" fontSize="8" fill="var(--success)">协程3</text>

          <rect x="410" y="114" width="60" height="22" rx="4" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="0.8" />
          <text x="440" y="129" textAnchor="middle" fontSize="8" fill="var(--success)">唤醒1</text>

          <rect x="480" y="114" width="100" height="22" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.8" />
          <text x="530" y="129" textAnchor="middle" fontSize="8" fill="var(--success)">协程2 await</text>

          <rect x="590" y="114" width="100" height="22" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.8" />
          <text x="640" y="129" textAnchor="middle" fontSize="8" fill="var(--success)">协程4 跑</text>

          <text x="550" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">1 万协程跑在 N 线程（N = CPU 核数）</text>
          <text x="550" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每协程几 KB → 内存几十 MB</text>
          <text x="550" y="194" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">切换纯用户态 ~100ns</text>
          <text x="550" y="208" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">I/O 完成时事件循环唤醒对应协程</text>

          {/* 有栈 vs 无栈 */}
          <rect x="30" y="240" width="340" height="120" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">有栈协程</text>
          <text x="200" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每协程独立栈，任意层级挂起</text>
          <text x="200" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">写法接近同步代码</text>
          <text x="200" y="316" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">栈开销几 KB，10 万协程几百 MB</text>
          <text x="200" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">代表：Go goroutine / Lua / boost.fiber</text>

          <rect x="390" y="240" width="320" height="120" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="550" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">无栈协程</text>
          <text x="550" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译器改写为状态机</text>
          <text x="550" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">仅协程函数体内可挂起</text>
          <text x="550" y="316" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">栈开销近零，但协程传染</text>
          <text x="550" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">代表：C++20 co_await / JS async</text>

          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            选型：Go 生态选有栈最省心；C++ 极致性能选无栈
          </text>
          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            实践：网络 I/O 用协程，CPU 密集计算用线程池
          </text>
          <text x={VIEW_W / 2} y="436" textAnchor="middle" fontSize="10" fill="var(--danger)">
            注意：协程消除抢占式中断，但未消除协作式并发下的逻辑竞态
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        协程模型——I/O 等待时让出执行权，单线程扛万级并发，有栈与无栈各有取舍
      </figcaption>
    </figure>
  );
}
