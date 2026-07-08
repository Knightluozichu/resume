/**
 * <NdbgDevtoolsDiagram>：DevTools 断点暂停时四大面板图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function NdbgDevtoolsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="DevTools 断点暂停时四大面板图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            DevTools 断点暂停时四大面板
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            断点命中 → 冻结执行上下文 → 四个面板从不同角度检查
          </text>

          {/* Sources 面板 - 顶部 */}
          <rect x="40" y="62" width="660" height="72" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="82" fontSize="12" fontWeight="600" fill="var(--accent)">Sources 面板（源代码 + 断点）</text>
          <rect x="60" y="92" width="620" height="32" rx="5" fill="var(--bg-primary)" fillOpacity="0.4" />
          <text x="70" y="108" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">7│    debugger; // &lt;- 断点命中</text>
          <text x="70" y="120" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">8│    return item.trim().toUpperCase();</text>
          <circle cx="64" cy="105" r="4" fill="var(--danger)" />

          {/* Scope 面板 - 左下 */}
          <rect x="40" y="146" width="210" height="140" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="55" y="166" fontSize="12" fontWeight="600" fill="var(--success)">Scope 面板</text>
          <text x="55" y="184" fontSize="10" fontWeight="600" fill="var(--text-secondary)">Local:</text>
          <text x="65" y="198" fontSize="9" fill="var(--text-tertiary)">item = &quot;a&quot;</text>
          <text x="65" y="210" fontSize="9" fill="var(--text-tertiary)">index = 0</text>
          <text x="65" y="222" fontSize="9" fill="var(--text-tertiary)">this = undefined</text>
          <text x="55" y="238" fontSize="10" fontWeight="600" fill="var(--text-secondary)">Closure:</text>
          <text x="65" y="252" fontSize="9" fill="var(--text-tertiary)">items = [&quot;a&quot;,&quot; b&quot;,&quot; c&quot;]</text>
          <text x="65" y="264" fontSize="9" fill="var(--text-tertiary)">results = undefined</text>
          <text x="55" y="280" fontSize="10" fontWeight="600" fill="var(--text-secondary)">Global:</text>
          <text x="65" y="293" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">process, console, require</text>

          {/* Watch 面板 - 中下 */}
          <rect x="265" y="146" width="210" height="140" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="280" y="166" fontSize="12" fontWeight="600" fill="var(--warning)">Watch 面板</text>
          <text x="280" y="184" fontSize="10" fontWeight="600" fill="var(--text-secondary)">手动监视表达式：</text>
          <text x="290" y="202" fontSize="9" fill="var(--text-tertiary)">item.trim().length</text>
          <text x="430" y="202" textAnchor="end" fontSize="9" fill="var(--success)">1</text>
          <text x="290" y="218" fontSize="9" fill="var(--text-tertiary)">items.length</text>
          <text x="430" y="218" textAnchor="end" fontSize="9" fill="var(--success)">3</text>
          <text x="290" y="234" fontSize="9" fill="var(--text-tertiary)">index &lt; items.length</text>
          <text x="430" y="234" textAnchor="end" fontSize="9" fill="var(--success)">true</text>
          <text x="280" y="256" fontSize="10" fontWeight="600" fill="var(--text-secondary)">三种断点：</text>
          <text x="290" y="270" fontSize="9" fill="var(--text-tertiary)">普通 / 条件 / 日志</text>

          {/* Call Stack 面板 - 右下 */}
          <rect x="490" y="146" width="210" height="140" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="505" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">Call Stack 面板</text>
          <text x="505" y="184" fontSize="10" fontWeight="600" fill="var(--text-secondary)">调用栈（顶→底）：</text>
          <rect x="505" y="190" width="180" height="22" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="515" y="204" fontSize="9" fill="var(--text-secondary)">processData (server.js:7)</text>
          <rect x="505" y="216" width="180" height="22" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="515" y="230" fontSize="9" fill="var(--text-tertiary)">&lt;anonymous&gt; (server.js:12)</text>
          <text x="505" y="252" fontSize="9" fill="var(--text-tertiary)">点击栈帧切换上下文</text>
          <text x="505" y="268" fontSize="9" fill="var(--text-tertiary)">检查每层变量状态</text>

          {/* Console 面板 - 底部 */}
          <rect x="40" y="300" width="660" height="100" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="60" y="320" fontSize="12" fontWeight="600" fill="var(--danger)">Console 面板（断点上下文中执行表达式）</text>
          <text x="60" y="340" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">&gt; item</text>
          <text x="280" y="340" fontSize="10" fill="var(--success)" fontFamily="monospace">&larr; &quot;a&quot;</text>
          <text x="60" y="356" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">&gt; items.map(i =&gt; i.trim())</text>
          <text x="280" y="356" fontSize="10" fill="var(--success)" fontFamily="monospace">&larr; [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</text>
          <text x="60" y="372" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">&gt; item = null</text>
          <text x="280" y="372" fontSize="10" fill="var(--warning)" fontFamily="monospace">&larr; 修改变量测试分支</text>
          <text x="60" y="388" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">&gt; Object.getPrototypeOf(items)</text>
          <text x="280" y="388" fontSize="10" fill="var(--success)" fontFamily="monospace">&larr; 检查原型链</text>

          <text x={VIEW_W / 2} y="422" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：断点暂停时 Console 处于断点作用域，相当于代码中间状态的完整 REPL
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DevTools 断点暂停时四大面板——Sources、Scope、Watch、Call Stack、Console
      </figcaption>
    </figure>
  );
}
