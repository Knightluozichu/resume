/**
 * <YdkAsyncPerformanceDiagram>：异步与性能图解（Promise 队列、并发模式）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkAsyncPerformanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="异步与性能并发模式图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            异步与性能：串行 vs 并发与 Promise 队列
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            顺序无关用 Promise.all 并发；有依赖才用 then 链串行
          </text>

          {/* 左：串行（顺序依赖） */}
          <rect x="30" y="72" width="330" height="176" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">串行：then 链（有依赖时）</text>

          <rect x="50" y="104" width="290" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="195" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">fetch(a) → 用 a 结果请求 b → 用 b 结果请求 c</text>

          <rect x="50" y="152" width="80" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="90" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">a 200ms</text>
          <rect x="145" y="152" width="80" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">b 200ms</text>
          <rect x="240" y="152" width="90" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="285" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">c 200ms</text>
          <text x="195" y="208" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">总耗时 ≈ 600ms（累加）</text>
          <text x="195" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">reduce 串联 Promise 是通用串行模式</text>

          {/* 右：并发（顺序无关） */}
          <rect x="380" y="72" width="330" height="176" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">并发：Promise.all（无依赖时）</text>

          <rect x="400" y="104" width="290" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="545" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">三个独立请求同时发出，等最慢的完成</text>

          <rect x="400" y="152" width="90" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="445" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">a 200ms</text>
          <rect x="500" y="152" width="90" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">b 200ms</text>
          <rect x="600" y="152" width="90" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="645" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">c 200ms</text>
          <text x="545" y="208" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">总耗时 ≈ 200ms（取最大）</text>
          <text x="545" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">任一 reject 整体拒绝，结果顺序稳定</text>

          {/* 中下：并发控制 */}
          <rect x="30" y="262" width="330" height="156" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">并发控制：限流池</text>
          <text x="50" y="304" fontSize="11" fill="var(--text-secondary)">N 个任务同时跑，超过并发数排队</text>
          <text x="50" y="324" fontSize="10" fill="var(--text-secondary)">手写 pool：维护进行中 Set，每完成一个补一个</text>
          <text x="50" y="344" fontSize="10" fill="var(--text-secondary)">Promise.all 一次全发会压垮下游/触发限流</text>
          <text x="50" y="364" fontSize="10" fill="var(--text-secondary)">p-limit 等库封装了此模式</text>
          <text x="50" y="386" fontSize="11" fill="var(--accent)">AllSettled 等全部落定（含失败），不因一个 reject 丢其余</text>
          <text x="50" y="404" fontSize="11" fill="var(--accent)">race 取最快落定（常用于超时熔断）</text>

          {/* 右下：微任务与性能 */}
          <rect x="380" y="262" width="330" height="156" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">微任务顺序与性能要点</text>
          <text x="400" y="304" fontSize="11" fill="var(--text-secondary)">Promise 回调进微任务队列</text>
          <text x="400" y="324" fontSize="10" fill="var(--text-secondary)">每个宏任务后清空全部微任务，再下一宏任务</text>
          <text x="400" y="344" fontSize="10" fill="var(--text-secondary)">微任务密集会饿死宏任务（渲染/IO 延迟）</text>
          <text x="400" y="364" fontSize="10" fill="var(--text-secondary)">长任务拆分：用 await 让出主线程，避免掉帧</text>
          <text x="400" y="386" fontSize="11" fill="var(--danger)">CPU 密集用 Web Worker 拆出主线程</text>
          <text x="400" y="404" fontSize="11" fill="var(--danger)">requestIdleCallback 处理低优先级任务</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        无依赖用 Promise.all 并发取最大耗时，有依赖用 then 链串行；微任务密集需主动让出主线程
      </figcaption>
    </figure>
  );
}
