/**
 * <KdgCoroutinesDiagram>：协程核心概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgCoroutinesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin协程核心概念图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            协程：轻量级并发
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            suspend / launch / async / 结构化并发 / Flow
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 左列：协程构建器 */}
          <rect x="50" y="80" width="320" height="140" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">协程构建器</text>
          <text x="65" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// launch: 启动不返回结果</text>
          <text x="65" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">GlobalScope.launch &lbrace;</text>
          <text x="65" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  delay(1000)</text>
          <text x="65" y="178" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="65" y="198" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// async: 启动并返回结果</text>
          <text x="65" y="216" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val deferred = async &lbrace; fetch() &rbrace;</text>

          {/* 右列：suspend 挂起函数 */}
          <rect x="390" y="80" width="320" height="140" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">suspend 挂起函数</text>
          <text x="405" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">suspend fun fetchData(): Data &lbrace;</text>
          <text x="405" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  delay(500)  // 非阻塞挂起</text>
          <text x="405" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  return api.get()  // 挂起点</text>
          <text x="405" y="178" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="405" y="198" fontSize="10" fill="var(--text-tertiary)">suspend 函数只能在协程中调用</text>
          <text x="405" y="216" fontSize="10" fill="var(--text-tertiary)">挂起时不阻塞线程，释放给其他协程</text>

          {/* 左列：结构化并发 */}
          <rect x="50" y="240" width="320" height="140" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">结构化并发</text>
          <text x="65" y="284" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">coroutineScope &lbrace;</text>
          <text x="65" y="302" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  launch &lbrace; taskA() &rbrace;</text>
          <text x="65" y="320" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  launch &lbrace; taskB() &rbrace;</text>
          <text x="65" y="338" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;  // 等待所有子协程完成</text>
          <text x="65" y="358" fontSize="10" fill="var(--text-tertiary)">父协程取消 → 子协程全部取消</text>
          <text x="65" y="376" fontSize="10" fill="var(--text-tertiary)">子协程异常 → 父协程感知</text>

          {/* 右列：Flow 异步流 */}
          <rect x="390" y="240" width="320" height="140" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Flow 异步流</text>
          <text x="405" y="284" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun countdown() = flow &lbrace;</text>
          <text x="405" y="302" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  for (i in 5 downTo 1) &lbrace;</text>
          <text x="405" y="320" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">    emit(i)  // 发射值</text>
          <text x="405" y="338" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">    delay(500)</text>
          <text x="405" y="356" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  &rbrace;</text>
          <text x="405" y="376" fontSize="10" fill="var(--text-tertiary)">Flow = 协程版的冷数据流</text>

          {/* 底部：调度器 */}
          <rect x="50" y="400" width="660" height="80" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="422" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">调度器（Dispatcher）</text>
          <text x="65" y="444" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">Dispatchers.Main       // UI 线程（Android）</text>
          <text x="340" y="444" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">Dispatchers.IO       // 网络/磁盘 IO</text>
          <text x="65" y="464" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">Dispatchers.Default    // CPU 密集型</text>
          <text x="340" y="464" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">withContext(IO)&lbrace;...&rbrace; // 切换线程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin协程——launch/async构建器、suspend挂起函数、结构化并发、Flow异步流与调度器
      </figcaption>
    </figure>
  );
}
