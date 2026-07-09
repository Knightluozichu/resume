/**
 * <KiaConcurrencyDiagram>：Kotlin实战 第8章 并发与协程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function KiaConcurrencyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发与协程——suspend、launch/async、Flow图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            并发与协程
          </text>

          {/* 左上：协程核心概念 */}
          <rect x="30" y="50" width="330" height="230" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">协程核心概念</text>

          <rect x="50" y="90" width="290" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">suspend挂起函数</text>
          <text x="195" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">暂停执行不阻塞线程，稍后恢复</text>

          <rect x="50" y="132" width="290" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="150" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">launch——启动协程（fire-and-forget）</text>
          <text x="195" y="164" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">返回Job，不等待结果</text>

          <rect x="50" y="174" width="290" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="192" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">async——启动协程（带结果）</text>
          <text x="195" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">返回Deferred，await获取结果</text>

          <rect x="50" y="216" width="290" height="36" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="234" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">coroutineScope——结构化并发</text>
          <text x="195" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">子协程全部完成父协程才完成</text>

          <rect x="50" y="258" width="290" height="16" rx="6" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="195" y="270" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Dispatcher：Main / IO / Default / Unconfined</text>

          {/* 右上：协程vs线程 */}
          <rect x="380" y="50" width="330" height="230" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">协程 vs 线程 vs 回调</text>

          <text x="400" y="98" fontSize="10" fontWeight="600" fill="var(--text-secondary)">维度</text>
          <text x="480" y="98" fontSize="10" fontWeight="600" fill="var(--text-secondary)">回调</text>
          <text x="560" y="98" fontSize="10" fontWeight="600" fill="var(--text-secondary)">线程</text>
          <text x="650" y="98" fontSize="10" fontWeight="600" fill="var(--text-secondary)">协程</text>
          <line x1="395" y1="104" x2="695" y2="104" stroke="var(--border)" strokeWidth="1" />

          <text x="400" y="120" fontSize="9" fill="var(--text-primary)">开销</text>
          <text x="480" y="120" fontSize="9" fill="var(--text-secondary)">低</text>
          <text x="560" y="120" fontSize="9" fill="var(--text-secondary)">高（1MB栈）</text>
          <text x="650" y="120" fontSize="9" fill="var(--success)">极低（~KB）</text>

          <text x="400" y="138" fontSize="9" fill="var(--text-primary)">数量</text>
          <text x="480" y="138" fontSize="9" fill="var(--text-secondary)">无限制</text>
          <text x="560" y="138" fontSize="9" fill="var(--text-secondary)">数百</text>
          <text x="650" y="138" fontSize="9" fill="var(--success)">十万级</text>

          <text x="400" y="156" fontSize="9" fill="var(--text-primary)">可读性</text>
          <text x="480" y="156" fontSize="9" fill="var(--text-secondary)">差（回调地狱）</text>
          <text x="560" y="156" fontSize="9" fill="var(--text-secondary)">好</text>
          <text x="650" y="156" fontSize="9" fill="var(--success)">好（同步风格）</text>

          <text x="400" y="174" fontSize="9" fill="var(--text-primary)">取消</text>
          <text x="480" y="174" fontSize="9" fill="var(--text-secondary)">困难</text>
          <text x="560" y="174" fontSize="9" fill="var(--text-secondary)">interrupt</text>
          <text x="650" y="174" fontSize="9" fill="var(--success)">结构化取消</text>

          <text x="400" y="192" fontSize="9" fill="var(--text-primary)">异常</text>
          <text x="480" y="192" fontSize="9" fill="var(--text-secondary)">丢失</text>
          <text x="560" y="192" fontSize="9" fill="var(--text-secondary)">Thread.uncaught</text>
          <text x="650" y="192" fontSize="9" fill="var(--success)">CoroutineExceptionHandler</text>

          <text x="400" y="210" fontSize="9" fill="var(--text-primary)">上下文</text>
          <text x="480" y="210" fontSize="9" fill="var(--text-secondary)">无</text>
          <text x="560" y="210" fontSize="9" fill="var(--text-secondary)">ThreadLocal</text>
          <text x="650" y="210" fontSize="9" fill="var(--success)">CoroutineContext</text>

          <rect x="400" y="226" width="290" height="46" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">核心理念</text>
          <text x="545" y="258" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">协程是「轻量级线程」——在用户态调度</text>
          <text x="545" y="268" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不阻塞线程，用suspend暂停/恢复</text>

          {/* 底部：Flow异步流 */}
          <rect x="30" y="300" width="680" height="240" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">Flow异步流与协程实战</text>

          <rect x="50" y="340" width="310" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Flow——冷流</text>
          <text x="205" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">flow {'{'} emit(1); emit(2) {'}'}</text>
          <text x="205" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">每次collect才执行（冷流）</text>
          <text x="205" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">支持取消/背压/组合</text>

          <rect x="380" y="340" width="310" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">协程实战模式</text>
          <text x="535" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">suspend fun fetch(): Data</text>
          <text x="535" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">coroutineScope {'{'} async {'{'} fetch() {'}'} {'}'}</text>
          <text x="535" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">withContext(Dispatchers.IO) {'{'} ... {'}'}</text>

          {/* Flow操作链 */}
          <text x={VIEW_W / 2} y="445" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Flow操作链</text>

          <rect x="50" y="455" width="120" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="110" y="473" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">flow {'{'} emit {'}'}</text>
          <text x="110" y="487" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">生产</text>

          <text x="180" y="478" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="200" y="455" width="120" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="260" y="473" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">.map {'{'} {'}'}</text>
          <text x="260" y="487" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">变换</text>

          <text x="330" y="478" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="350" y="455" width="120" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="410" y="473" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">.filter {'{'} {'}'}</text>
          <text x="410" y="487" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">过滤</text>

          <text x="480" y="478" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="455" width="120" height="40" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="560" y="473" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">.collect {'{'} {'}'}</text>
          <text x="560" y="487" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">消费</text>

          <rect x="50" y="505" width="640" height="30" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="524" textAnchor="middle" fontSize="10" fill="var(--text-primary)">结构化并发：父协程取消时所有子协程自动取消——避免泄漏，替代手动管理线程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发与协程——suspend挂起函数、launch/async构建器、结构化并发、协程vs线程对比、Flow异步流操作链
      </figcaption>
    </figure>
  );
}
