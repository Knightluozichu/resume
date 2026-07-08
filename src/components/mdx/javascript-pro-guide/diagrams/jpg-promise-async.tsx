/**
 * <JpgPromiseAsyncDiagram>：Promise 状态机与 async/await 转换图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgPromiseAsyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Promise 状态机与 async/await 转换图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Promise 三态与 async/await 糖语法
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            pending → fulfilled / rejected，状态一经改变不可逆
          </text>

          <defs>
            <marker id="arrPr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 状态机 */}
          <rect x="40" y="64" width="660" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Promise 状态机</text>

          <rect x="270" y="100" width="200" height="60" rx="30" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="370" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">pending</text>
          <text x="370" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">初始态，等待中</text>

          <rect x="80" y="180" width="200" height="60" rx="30" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
          <text x="180" y="204" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">fulfilled</text>
          <text x="180" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">resolve(value) 触发</text>

          <rect x="460" y="180" width="200" height="60" rx="30" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="560" y="204" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">rejected</text>
          <text x="560" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">reject(reason) 触发</text>

          <path d="M300 150 L 220 178" stroke="var(--success)" strokeWidth="1.6" fill="none" markerEnd="url(#arrPr)" />
          <path d="M440 150 L 520 178" stroke="var(--danger)" strokeWidth="1.6" fill="none" markerEnd="url(#arrPr)" />
          <text x="230" y="166" fontSize="9" fill="var(--success)">resolve</text>
          <text x="480" y="166" fontSize="9" fill="var(--danger)">reject</text>

          <text x="370" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不可逆：fulfilled ↔ rejected 不可互转</text>

          {/* 下半：async/await 转换 */}
          <rect x="40" y="260" width="660" height="178" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="280" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">async/await 是 Promise 的语法糖</text>

          <rect x="60" y="294" width="300" height="130" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="210" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">async/await 写法</text>
          <text x="76" y="332" fontSize="10" fill="var(--text-secondary)">async function fetchUser() &lbrace;</text>
          <text x="96" y="350" fontSize="10" fill="var(--text-secondary)">try &lbrace;</text>
          <text x="116" y="368" fontSize="10" fill="var(--text-secondary)">const r = await fetch(url);</text>
          <text x="116" y="386" fontSize="10" fill="var(--text-secondary)">return await r.json();</text>
          <text x="96" y="404" fontSize="10" fill="var(--text-secondary)">&rbrace; catch (e) &lbrace; ... &rbrace;</text>
          <text x="76" y="420" fontSize="10" fill="var(--text-secondary)">&rbrace;</text>

          <rect x="380" y="294" width="300" height="130" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="530" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">等价的 Promise 链</text>
          <text x="396" y="332" fontSize="10" fill="var(--text-secondary)">function fetchUser() &lbrace;</text>
          <text x="416" y="350" fontSize="10" fill="var(--text-secondary)">return fetch(url)</text>
          <text x="436" y="368" fontSize="10" fill="var(--text-secondary)">.then(r =&gt; r.json())</text>
          <text x="436" y="386" fontSize="10" fill="var(--text-secondary)">.then(data =&gt; data)</text>
          <text x="416" y="404" fontSize="10" fill="var(--text-secondary)">.catch(e =&gt; ...);</text>
          <text x="396" y="420" fontSize="10" fill="var(--text-secondary)">&rbrace;</text>

          <text x="370" y="362" textAnchor="middle" fontSize="14" fill="var(--accent)" fontWeight="700">≡</text>

          <text x={VIEW_W / 2} y="445" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            await 暂停 async 函数（不阻塞主线程），等 Promise 落定后恢复；错误用 try/catch 捕获
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Promise 三态不可逆；async/await 把 then 链改写成同步风格，错误用 try/catch 处理
      </figcaption>
    </figure>
  );
}
