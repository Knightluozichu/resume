/**
 * <JvtMemoryLeakDiagram>：内存泄漏排查图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function JvtMemoryLeakDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存泄漏排查图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内存泄漏排查：Shallow/Retained + MAT 流程 + 泄漏场景
          </text>

          {/* Shallow vs Retained */}
          <text x="40" y="54" fontSize="13" fontWeight="600" fill="var(--warning)">Shallow Heap vs Retained Heap</text>

          <rect x="40" y="62" width="320" height="80" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Shallow Heap（浅堆）</text>
          <text x="200" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象自身占用内存</text>
          <text x="200" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象头 + 实例数据 + 对齐</text>
          <text x="200" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不含引用对象</text>

          <rect x="380" y="62" width="320" height="80" rx="8" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Retained Heap（深堆）</text>
          <text x="540" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象被回收后释放的总内存</text>
          <text x="540" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Shallow + 独占引用链</text>
          <text x="540" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">排查泄漏看这个！</text>

          <text x="370" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">static Map 自身 Shallow 几十字节，但 Retained 可能几百 MB（含全部条目）</text>

          {/* MAT 分析流程 */}
          <text x="40" y="190" fontSize="13" fontWeight="600" fill="var(--accent)">MAT 定位泄漏流程</text>

          <rect x="40" y="198" width="120" height="60" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="100" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">1. jmap dump</text>
          <text x="100" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">导出 .hprof</text>
          <text x="100" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">或 OOM 自动 dump</text>

          <text x="170" y="230" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="185" y="198" width="120" height="60" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="245" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">2. Leak Suspects</text>
          <text x="245" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">自动泄漏报告</text>
          <text x="245" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">嫌疑对象+引用链</text>

          <text x="315" y="230" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="330" y="198" width="120" height="60" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="390" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">3. Dominator Tree</text>
          <text x="390" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Retained 降序</text>
          <text x="390" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">找内存大户</text>

          <text x="460" y="230" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="475" y="198" width="120" height="60" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">4. GC Roots 路径</text>
          <text x="535" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">谁持有泄漏对象</text>
          <text x="535" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">static/线程栈</text>

          <text x="605" y="230" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="620" y="198" width="80" height="60" rx="6" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1.2" />
          <text x="660" y="218" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">5. 修代码</text>
          <text x="660" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">限大小/弱引用</text>
          <text x="660" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">定期清理</text>

          {/* 泄漏场景 */}
          <text x="40" y="284" fontSize="13" fontWeight="600" fill="var(--danger)">常见内存泄漏场景</text>

          <rect x="40" y="292" width="160" height="76" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="120" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">静态集合</text>
          <text x="120" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">static Map 缓存</text>
          <text x="120" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">只 put 不 remove</text>
          <text x="120" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">修：Caffeine maxSize</text>

          <rect x="210" y="292" width="160" height="76" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="290" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">ThreadLocal</text>
          <text x="290" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">线程池复用线程</text>
          <text x="290" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">value 强引用不释放</text>
          <text x="290" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">修：finally remove()</text>

          <rect x="380" y="292" width="160" height="76" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="460" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">监听器未注销</text>
          <text x="460" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">注册到事件源</text>
          <text x="460" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">用完不 unregister</text>
          <text x="460" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">修：及时注销</text>

          <rect x="550" y="292" width="150" height="76" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="625" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">资源未关闭</text>
          <text x="625" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">连接/流/句柄</text>
          <text x="625" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">持有 native 资源</text>
          <text x="625" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">修：try-with-resources</text>

          {/* ThreadLocal 泄漏机制 */}
          <rect x="40" y="386" width="660" height="78" rx="8" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="408" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">ThreadLocal 泄漏机制</text>
          <text x="370" y="426" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Thread 持有 ThreadLocalMap：key=弱引用（ThreadLocal 回收后变 null）</text>
          <text x="370" y="442" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">value=强引用（永不释放） &rarr; 线程池复用导致 value 累积泄漏</text>
          <text x="370" y="458" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">根本解决：finally 中 threadLocal.remove()，每次用完必清理</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存泄漏排查——Shallow vs Retained Heap、MAT 五步定位流程、静态集合/ThreadLocal/监听器/资源泄漏四大场景
      </figcaption>
    </figure>
  );
}
