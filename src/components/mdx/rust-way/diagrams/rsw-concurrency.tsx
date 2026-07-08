/**
 * <RswConcurrencyDiagram>：线程同步与 Send/Sync 守护。
 *
 * 展示 Mutex/RwLock 共享数据、Send/Sync 标记 trait 的编译期线程安全保证。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function RswConcurrencyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="并发模型：多线程通过 Mutex 共享数据，Send/Sync 在编译期守护线程安全。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            并发：线程同步与 Send/Sync 守护
          </text>

          {/* 线程 */}
          <rect x={36} y={60} width={120} height={48} rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.4" />
          <text x={96} y={82} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Thread A</text>
          <text x={96} y={98} textAnchor="middle" fontSize="9" fill={secondary}>spawn</text>
          <rect x={36} y={120} width={120} height={48} rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.4" />
          <text x={96} y={142} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Thread B</text>
          <text x={96} y={158} textAnchor="middle" fontSize="9" fill={secondary}>spawn</text>

          {/* Mutex */}
          <rect x={220} y={78} width={180} height={120} rx="10" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.6" />
          <text x={310} y={102} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>Mutex&lt;T&gt;</text>
          <rect x={250} y={116} width={120} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={310} y={134} textAnchor="middle" fontSize="10" fill={primary}>lock().unwrap()</text>
          <text x={310} y={148} textAnchor="middle" fontSize="9" fill={secondary}>获取锁 → MutexGuard</text>
          <text x={310} y={176} textAnchor="middle" fontSize="10" fill={warning}>同一时刻只一个线程进入</text>
          <text x={310} y={190} textAnchor="middle" fontSize="9" fill={secondary}>guard 离开作用域自动释放</text>

          <line x1={156} y1={84} x2={220} y2={120} stroke={secondary} strokeWidth="1.2" markerEnd="url(#rsw-cc-arrow)" />
          <line x1={156} y1={144} x2={220} y2={156} stroke={secondary} strokeWidth="1.2" markerEnd="url(#rsw-cc-arrow)" />

          {/* 共享数据 */}
          <rect x={440} y={108} width={120} height={60} rx="8" fill={elevated} stroke={border} />
          <text x={500} y={132} textAnchor="middle" fontSize="11" fill={primary}>Arc&lt;T&gt;</text>
          <text x={500} y={150} textAnchor="middle" fontSize="9" fill={secondary}>原子引用计数</text>
          <line x1={400} y1={138} x2={440} y2={138} stroke={warning} strokeWidth="1.4" markerEnd="url(#rsw-cc-arrow)" />

          {/* Send / Sync */}
          <line x1={36} y1={222} x2={684} y2={222} stroke={border} strokeWidth="1" />
          <text x={360} y={246} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>编译期线程安全标记 trait</text>

          <rect x={60} y={264} width={290} height={108} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={205} y={286} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Send</text>
          <text x={205} y={306} textAnchor="middle" fontSize="10" fill={secondary}>类型 T 的所有权可安全地</text>
          <text x={205} y={322} textAnchor="middle" fontSize="10" fill={secondary}>在线程间转移</text>
          <text x={205} y={346} textAnchor="middle" fontSize="10" fill={success}>Rc 不 Send → 不能跨线程</text>
          <text x={205} y={362} textAnchor="middle" fontSize="10" fill={secondary}>Arc 是 Send → 可以</text>

          <rect x={370} y={264} width={290} height={108} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={515} y={286} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Sync</text>
          <text x={515} y={306} textAnchor="middle" fontSize="10" fill={secondary}>&amp;T 可安全地被多线程共享</text>
          <text x={515} y={322} textAnchor="middle" fontSize="10" fill={secondary}>（即 &amp;T 是 Send）</text>
          <text x={515} y={346} textAnchor="middle" fontSize="10" fill={accent}>RefCell 不 Sync → 不能共享</text>
          <text x={515} y={362} textAnchor="middle" fontSize="11" fill={secondary}>Mutex&lt;T&gt; 让 T 变 Sync</text>

          <text x={360} y={392} textAnchor="middle" fontSize="11" fill={secondary}>
            「无畏并发」——编译器在编译期就阻止数据竞争，而非运行时崩溃
          </text>

          <defs>
            <marker id="rsw-cc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Mutex 守护运行时互斥，Send/Sync 在编译期阻止错误共享——Rust 的无畏并发。
      </figcaption>
    </figure>
  );
}
