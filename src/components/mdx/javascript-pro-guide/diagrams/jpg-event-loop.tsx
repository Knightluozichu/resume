/**
 * <JpgEventLoopDiagram>：事件循环与异步编程模型图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgEventLoopDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="事件循环与异步编程模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            事件循环：调用栈 → 微任务 → 渲染 → 宏任务
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            JS 单线程，靠事件循环调度异步回调；每轮先清空微任务再取一个宏任务
          </text>

          <defs>
            <marker id="arrE" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 调用栈 */}
          <rect x="40" y="70" width="160" height="200" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">调用栈</text>
          <text x="120" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">（同步执行）</text>
          <rect x="56" y="120" width="128" height="26" rx="4" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="120" y="137" textAnchor="middle" fontSize="10" fill="var(--text-primary)">console.log()</text>
          <rect x="56" y="150" width="128" height="26" rx="4" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="120" y="167" textAnchor="middle" fontSize="10" fill="var(--text-primary)">main() 主入口</text>
          <text x="120" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">栈空时</text>
          <text x="120" y="214" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">进入事件循环</text>
          <text x="120" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LIFO 后进先出</text>

          {/* 堆 */}
          <rect x="40" y="290" width="160" height="60" rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="120" y="312" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">堆（Heap）</text>
          <text x="120" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">对象/闭包分配区</text>

          {/* Web API */}
          <rect x="230" y="70" width="160" height="200" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="310" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Web API</text>
          <text x="310" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">（浏览器提供）</text>
          <text x="310" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">setTimeout</text>
          <text x="310" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">setInterval</text>
          <text x="310" y="170" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">fetch / XHR</text>
          <text x="310" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DOM 事件</text>
          <text x="310" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MutationObserver</text>
          <text x="310" y="244" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">异步完成后</text>
          <text x="310" y="258" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">回调推入队列</text>

          {/* 微任务队列 */}
          <rect x="420" y="70" width="140" height="120" rx="10" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="490" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">微任务队列</text>
          <text x="490" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">高优先级</text>
          <text x="490" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Promise.then</text>
          <text x="490" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">queueMicrotask</text>
          <text x="490" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">MutationObserver</text>
          <text x="490" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">每轮全部清空</text>

          {/* 宏任务队列 */}
          <rect x="580" y="70" width="140" height="120" rx="10" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="650" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">宏任务队列</text>
          <text x="650" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">低优先级</text>
          <text x="650" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">setTimeout cb</text>
          <text x="650" y="148" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">setInterval cb</text>
          <text x="650" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">I/O / UI 事件</text>
          <text x="650" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">每轮只取一个</text>

          {/* 渲染 */}
          <rect x="500" y="210" width="220" height="60" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="610" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">渲染（Render）</text>
          <text x="610" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">requestAnimationFrame →</text>
          <text x="610" y="264" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">布局 → 绘制（约 16.6ms/帧）</text>

          {/* 循环箭头 */}
          <path d="M200 170 L 228 170" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrE)" />
          <text x="214" y="162" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">注册</text>
          <path d="M390 130 L 418 130" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrE)" />
          <text x="404" y="122" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">微</text>
          <path d="M390 170 L 578 170" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrE)" />
          <text x="484" y="162" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">宏</text>
          <path d="M490 190 C 490 300, 120 300, 120 272" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrE)" />
          <path d="M650 190 C 650 320, 120 320, 120 272" stroke="var(--danger)" strokeWidth="1.4" strokeDasharray="4 3" fill="none" markerEnd="url(#arrE)" />

          {/* 执行顺序说明 */}
          <rect x="40" y="362" width="680" height="80" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="60" y="382" fontSize="11" fontWeight="600" fill="var(--accent)">每轮事件循环顺序：</text>
          <text x="60" y="402" fontSize="10" fill="var(--text-secondary)">① 取一个宏任务执行 → ② 清空所有微任务 → ③ 必要时渲染（rAF + paint）→ ④ 回到 ①</text>
          <text x="60" y="422" fontSize="10" fill="var(--text-tertiary)">关键：微任务总在下一个宏任务前全部跑完，这就是 Promise.then 比 setTimeout 先执行的原因</text>
          <text x="60" y="438" fontSize="10" fill="var(--text-tertiary)">await 之后的代码 = .then 回调，属微任务，在当前同步代码后、下一个宏任务前执行</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事件循环单轮：一个宏任务 → 清空全部微任务 → 渲染；微任务优先级高于宏任务
      </figcaption>
    </figure>
  );
}
