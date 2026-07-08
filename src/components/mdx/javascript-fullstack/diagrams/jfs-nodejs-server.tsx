/**
 * <JfsNodejsServerDiagram>：Node.js 事件循环六阶段与非阻塞 I/O 图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JfsNodejsServerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Node.js 事件循环六阶段图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Node.js 事件循环六阶段
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            单线程执行栈清空后，依次轮询六个阶段，阶段间清空微任务
          </text>

          {/* 主线程 */}
          <rect x="40" y="68" width="660" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">主线程（单线程执行栈）—— 同步代码 + 微任务清空</text>

          <text x="370" y="124" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 六阶段环形 */}
          <rect x="40" y="138" width="200" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">1. timers</text>
          <text x="140" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">setTimeout/setInterval</text>

          <rect x="270" y="138" width="200" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">2. pending callbacks</text>
          <text x="370" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">系统级回调</text>

          <rect x="500" y="138" width="200" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">3. poll</text>
          <text x="600" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">取新 I/O 事件</text>

          <rect x="40" y="210" width="200" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">4. check</text>
          <text x="140" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">setImmediate</text>

          <rect x="270" y="210" width="200" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">5. close callbacks</text>
          <text x="370" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">close 事件</text>

          <rect x="500" y="210" width="200" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">微任务穿插</text>
          <text x="600" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">nextTick &gt; Promise</text>

          {/* libuv 线程池 */}
          <text x="370" y="290" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <rect x="120" y="304" width="500" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="370" y="326" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">libuv 线程池（默认 4 线程）</text>
          <text x="370" y="344" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">异步 I/O 实际工作在此完成 → 回调入队列 → poll 阶段执行</text>

          {/* 关键洞察 */}
          <rect x="40" y="376" width="660" height="64" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">关键洞察</text>
          <text x="370" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单线程执行 + 多线程 I/O + 事件循环调度 = 高并发</text>
          <text x="370" y="430" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">代价：CPU 密集任务阻塞主线程 → 用 cluster / Worker Threads</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Node.js 事件循环六阶段——timers/pending/poll/check/close 加微任务穿插，libuv线程池处理异步I/O
      </figcaption>
    </figure>
  );
}
