/**
 * <NdbgMemoryLeaksDiagram>：内存泄漏 retainer 链追溯图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 400;

export function NdbgMemoryLeaksDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存泄漏 retainer 链追溯图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内存泄漏：retainer 链追溯
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            从泄漏对象出发 → 沿引用链 → 追溯到 GC Root → 切断不该存在的引用
          </text>

          {/* GC Root */}
          <rect x="280" y="64" width="180" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="370" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">GC Root</text>
          <text x="370" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">global / 活跃栈帧</text>
          <text x="370" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Timer / EventEmitter</text>

          {/* 箭头 */}
          <line x1="370" y1="124" x2="370" y2="152" stroke="var(--danger)" strokeWidth="1.5" />
          <polygon points="365,148 375,148 370,158" fill="var(--danger)" />
          <text x="385" y="140" fontSize="9" fill="var(--text-tertiary)">引用</text>

          {/* 全局 cache */}
          <rect x="260" y="158" width="220" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="178" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">global cache = Map()</text>
          <text x="370" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每个请求新增条目，从不删除</text>

          {/* 箭头 */}
          <line x1="370" y1="212" x2="370" y2="238" stroke="var(--warning)" strokeWidth="1.5" />
          <polygon points="365,234 375,234 370,244" fill="var(--warning)" />
          <text x="385" y="228" fontSize="9" fill="var(--text-tertiary)">key</text>

          {/* Map entry */}
          <rect x="260" y="244" width="220" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="262" textAnchor="middle" fontSize="11" fill="var(--accent)">cache.set(userId, data)</text>
          <text x="370" y="278" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">data 持有大对象</text>

          {/* 箭头 */}
          <line x1="370" y1="292" x2="370" y2="318" stroke="var(--accent)" strokeWidth="1.5" />
          <polygon points="365,314 375,314 370,324" fill="var(--accent)" />
          <text x="385" y="308" fontSize="9" fill="var(--text-tertiary)">引用</text>

          {/* 泄漏对象 */}
          <rect x="240" y="324" width="260" height="50" rx="8" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="370" y="344" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">泄漏对象：hugeArray (8MB)</text>
          <text x="370" y="360" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从 GC Root 可达 → 无法回收</text>

          {/* 左侧：四类泄漏模式 */}
          <rect x="30" y="64" width="200" height="310" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="130" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">四类常见泄漏模式</text>
          <text x="40" y="104" fontSize="10" fill="var(--danger)">① 全局变量缓存</text>
          <text x="50" y="118" fontSize="9" fill="var(--text-tertiary)">cache[key] = data 不删</text>
          <text x="40" y="138" fontSize="10" fill="var(--warning)">② 闭包引用</text>
          <text x="50" y="152" fontSize="9" fill="var(--text-tertiary)">闭包捕获大对象</text>
          <text x="40" y="172" fontSize="10" fill="var(--accent)">③ 事件监听器堆积</text>
          <text x="50" y="186" fontSize="9" fill="var(--text-tertiary)">emitter.on 不 off</text>
          <text x="40" y="206" fontSize="10" fill="var(--success)">④ Timer 未清理</text>
          <text x="50" y="220" fontSize="9" fill="var(--text-tertiary)">setInterval 不 clear</text>
          <text x="40" y="246" fontSize="9" fill="var(--text-secondary)">共性：长生命周期对象</text>
          <text x="40" y="260" fontSize="9" fill="var(--text-secondary)">持有短生命周期对象引用</text>
          <text x="40" y="274" fontSize="9" fill="var(--text-secondary)">阻止 GC 回收</text>

          {/* 右侧：修复方法 */}
          <rect x="510" y="64" width="200" height="310" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="610" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">修复方法</text>
          <text x="520" y="104" fontSize="10" fill="var(--success)">→ LRU 淘汰 + 大小限制</text>
          <text x="520" y="138" fontSize="10" fill="var(--success)">→ 只闭包需要的值</text>
          <text x="520" y="172" fontSize="10" fill="var(--success)">→ once / 手动 off</text>
          <text x="520" y="206" fontSize="10" fill="var(--success)">→ clearInterval 清理</text>
          <text x="520" y="250" fontSize="10" fontWeight="600" fill="var(--text-primary)">判断方法：</text>
          <text x="520" y="266" fontSize="9" fill="var(--text-tertiary)">heapUsed GC 后低点</text>
          <text x="520" y="280" fontSize="9" fill="var(--text-tertiary)">单调上升 = 泄漏</text>

          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：切断 retainer 链上「不该存在的引用」→ 对象变不可达 → GC 回收
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存泄漏 retainer 链追溯——从泄漏对象到 GC Root 的引用路径与四类泄漏模式
      </figcaption>
    </figure>
  );
}
