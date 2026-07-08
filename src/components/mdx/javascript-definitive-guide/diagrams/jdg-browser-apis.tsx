/**
 * <JdgBrowserApisDiagram>：浏览器 API 图解（Fetch、Storage、WebWorker）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgBrowserApisDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="浏览器API图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrBa" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            浏览器 API：网络、存储、多线程
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Fetch / localStorage / sessionStorage / IndexedDB / Web Worker
          </text>

          {/* 顶部：Fetch */}
          <rect x="30" y="68" width="680" height="110" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Fetch API（基于 Promise 的现代网络请求）</text>
          <text x="50" y="110" fontSize="11" fill="var(--text-secondary)">const res = await fetch(url, &lbrace; method, headers, body &rbrace;); const data = await res.json();</text>
          <text x="50" y="128" fontSize="11" fill="var(--text-secondary)">res.ok 检查状态码（200-299）；res.status 读取 HTTP 状态</text>
          <text x="50" y="146" fontSize="11" fill="var(--text-secondary)">Fetch 只在网络层出错才 reject；4xx/5xx 不 reject（需手动抛错）</text>
          <text x="50" y="164" fontSize="11" fill="var(--danger)">AbortController 实现超时/取消：const ctrl = new AbortController(); fetch(url, &lbrace; signal: ctrl.signal &rbrace;)</text>

          {/* 中部：存储三兄弟 */}
          <rect x="30" y="194" width="680" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="214" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">客户端存储（三种方案对比）</text>

          <rect x="50" y="226" width="200" height="76" rx="6" fill="var(--elevated)" stroke="var(--warning)" strokeWidth="1" />
          <text x="150" y="246" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">localStorage</text>
          <text x="64" y="264" fontSize="10" fill="var(--text-secondary)">持久存储，手动才清除</text>
          <text x="64" y="280" fontSize="10" fill="var(--text-secondary)">同步 API，约 5-10MB</text>
          <text x="64" y="296" fontSize="10" fill="var(--text-secondary)">setItem / getItem 字符串</text>

          <rect x="270" y="226" width="200" height="76" rx="6" fill="var(--elevated)" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="246" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">sessionStorage</text>
          <text x="284" y="264" fontSize="10" fill="var(--text-secondary)">标签页会话级，关闭清除</text>
          <text x="284" y="280" fontSize="10" fill="var(--text-secondary)">同步 API，同源同标签</text>
          <text x="284" y="296" fontSize="10" fill="var(--text-secondary)">不跨标签页共享</text>

          <rect x="490" y="226" width="200" height="76" rx="6" fill="var(--elevated)" stroke="var(--warning)" strokeWidth="1" />
          <text x="590" y="246" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">IndexedDB</text>
          <text x="504" y="264" fontSize="10" fill="var(--text-secondary)">异步事务型 NoSQL 数据库</text>
          <text x="504" y="280" fontSize="10" fill="var(--text-secondary)">容量大（数百 MB+）</text>
          <text x="504" y="296" fontSize="10" fill="var(--text-secondary)">存对象/文件/Blob</text>

          {/* 底部：Web Worker */}
          <rect x="30" y="330" width="680" height="102" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="350" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Web Worker（主线程外的并行线程）</text>
          <text x="50" y="372" fontSize="11" fill="var(--text-secondary)">const w = new Worker("worker.js"); w.postMessage(data); w.onmessage = e =&gt; &lbrace; ... &rbrace;</text>
          <text x="50" y="390" fontSize="11" fill="var(--text-secondary)">Worker 独立全局作用域，不能操作 DOM/window，通过消息传递通信（结构化克隆）</text>
          <text x="50" y="408" fontSize="11" fill="var(--text-secondary)">用途：CPU 密集计算（加密/图像处理/大数据）不阻塞主线程 UI</text>
          <text x="50" y="424" fontSize="11" fill="var(--text-secondary)">SharedWorker 跨标签页共享；Service Worker 离线缓存与推送的底座</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Fetch 是 Promise 化网络请求；localStorage/sessionStorage/IndexedDB 按持久性与容量选型；Worker 卸载 CPU 密集计算
      </figcaption>
    </figure>
  );
}
