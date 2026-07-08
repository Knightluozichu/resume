/**
 * <DnjAsyncProgrammingDiagram>：异步编程演进图解（callback→Promise→async/await）。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjAsyncProgrammingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="异步编程演进图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            异步编程三阶段演进
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            回调地狱 → Promise 链 → async/await 同步写法
          </text>

          {/* 第一阶段：回调 */}
          <rect x="30" y="64" width="210" height="130" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="135" y="84" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">阶段1：回调</text>
          <text x="135" y="102" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fs.readFile(a, (err, a) =&gt;</text>
          <text x="135" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">  fs.readFile(b, (err, b) =&gt;</text>
          <text x="135" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">    fs.readFile(c, (err, c) =&gt;</text>
          <text x="135" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">      done(err, [a,b,c])</text>
          <text x="135" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">    )</text>
          <text x="135" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">  )</text>
          <text x="135" y="186" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">)</text>

          <text x="245" y="130" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>

          {/* 第二阶段：Promise */}
          <rect x="265" y="64" width="210" height="130" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="84" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">阶段2：Promise</text>
          <text x="370" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">readFile(a)</text>
          <text x="370" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">  .then(a =&gt; readFile(b))</text>
          <text x="370" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">  .then(b =&gt; readFile(c))</text>
          <text x="370" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">  .then(c =&gt; done([a,b,c]))</text>
          <text x="370" y="170" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">  .catch(err =&gt; handler)</text>
          <text x="370" y="186" textAnchor="middle" fontSize="9" fill="var(--warning)">扁平化 + 错误冒泡</text>

          <text x="480" y="130" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>

          {/* 第三阶段：async/await */}
          <rect x="500" y="64" width="210" height="130" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="605" y="84" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">阶段3：async/await</text>
          <text x="605" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">async function read() &#123;</text>
          <text x="605" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">  try &#123;</text>
          <text x="605" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">    const a = await readFile(a)</text>
          <text x="605" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">    const b = await readFile(b)</text>
          <text x="605" y="168" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">    return done([a,b])</text>
          <text x="605" y="184" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">  &#125; catch(e) &#123;&#125;</text>

          {/* Promise 三状态 */}
          <text x={VIEW_W / 2} y="220" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Promise 三状态机</text>

          <rect x="50" y="234" width="130" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="115" y="256" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">pending</text>
          <text x="115" y="274" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">初始态，未决</text>

          <text x="185" y="262" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="185" y="276" textAnchor="middle" fontSize="8" fill="var(--success)">resolve</text>

          <rect x="210" y="234" width="130" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="275" y="256" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">fulfilled</text>
          <text x="275" y="274" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">触发 .then(onF)</text>

          <rect x="370" y="234" width="130" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="435" y="256" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">rejected</text>
          <text x="435" y="274" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">触发 .catch(onR)</text>

          <text x="345" y="262" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="345" y="276" textAnchor="middle" fontSize="8" fill="var(--danger)">reject</text>

          {/* 并发控制 */}
          <text x={VIEW_W / 2} y="314" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">并发控制：Promise.all / Promise.race / Promise.allSettled</text>

          <rect x="50" y="328" width="200" height="64" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Promise.all</text>
          <text x="150" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">全部 fulfilled → fulfilled</text>
          <text x="150" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">任一 rejected → 立即 reject</text>

          <rect x="270" y="328" width="200" height="64" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Promise.race</text>
          <text x="370" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">第一个 settle 的赢</text>
          <text x="370" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">用于超时控制</text>

          <rect x="490" y="328" width="200" height="64" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="590" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Promise.allSettled</text>
          <text x="590" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">等待全部 settle</text>
          <text x="590" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">返回 status+value/reason</text>

          {/* 底部关键洞察 */}
          <rect x="50" y="408" width="640" height="50" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="428" textAnchor="middle" fontSize="10" fill="var(--accent)">
            本质：async/await 是 Promise + Generator 的语法糖，await 暂停函数不阻塞事件循环
          </text>
          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            错误处理用 try/catch；串行用 await 循环，并行用 Promise.all；forEach 中 await 不生效
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异步编程演进——回调地狱到 Promise 链到 async/await，三状态机与并发控制
      </figcaption>
    </figure>
  );
}
