/**
 * <RswAsyncRuntimeDiagram>：async/await 与运行时调度。
 *
 * 展示 Future 状态机、执行器轮询、async vs 线程的对比。
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

export function RswAsyncRuntimeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="async 运行时：Future 状态机由执行器轮询，await 处交出控制权，零成本协程。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            async/await：编译期状态机 + 运行时调度
          </text>

          {/* Future 状态机 */}
          <rect x={36} y={56} width={340} height={150} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={206} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>async fn → Future 状态机</text>
          <rect x={56} y={94} width={80} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={96} y={118} textAnchor="middle" fontSize="10" fill={primary}>Start</text>
          <line x1={136} y1={114} x2={156} y2={114} stroke={accent} strokeWidth="1.4" markerEnd="url(#rsw-ar-a)" />
          <text x={146} y={106} textAnchor="middle" fontSize="8" fill={secondary}>poll</text>
          <rect x={156} y={94} width={80} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={196} y={112} textAnchor="middle" fontSize="9" fill={primary}>await</text>
          <text x={196} y={126} textAnchor="middle" fontSize="8" fill={warning}>Pending</text>
          <line x1={236} y1={114} x2={256} y2={114} stroke={accent} strokeWidth="1.4" markerEnd="url(#rsw-ar-a)" />
          <rect x={256} y={94} width={100} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={306} y={112} textAnchor="middle" fontSize="9" fill={primary}>resume</text>
          <text x={306} y={126} textAnchor="middle" fontSize="8" fill={success}>Ready</text>
          <text x={206} y={156} textAnchor="middle" fontSize="10" fill={secondary}>编译器把 async fn 编译成实现 Future 的状态机</text>
          <text x={206} y={174} textAnchor="middle" fontSize="10" fill={secondary}>每个 .await 是一个挂起点（保存/恢复寄存器由编译器生成）</text>
          <text x={206} y={192} textAnchor="middle" fontSize="10" fill={success}>零堆分配 · 无 GC · 栈空间极小</text>

          {/* 执行器 */}
          <rect x={396} y={56} width={288} height={150} rx="10" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={540} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>执行器（Runtime）</text>
          <rect x={416} y={94} width={248} height={36} rx="6" fill={elevated} stroke={border} />
          <text x={540} y={116} textAnchor="middle" fontSize="10" fill={primary}>任务队列（就绪 Future）</text>
          <rect x={416} y={140} width={248} height={30} rx="6" fill={elevated} stroke={border} />
          <text x={540} y={159} textAnchor="middle" fontSize="10" fill={primary}>poll → Pending? 注册 Waker</text>
          <text x={540} y={184} textAnchor="middle" fontSize="10" fill={warning}>I/O 完成后 Waker 唤醒 → 重新入队</text>
          <text x={540} y={200} textAnchor="middle" fontSize="9" fill={secondary}>tokio / async-std 提供 reactor + executor</text>

          {/* 对比 */}
          <line x1={36} y1={226} x2={684} y2={226} stroke={border} strokeWidth="1" />
          <text x={360} y={248} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>OS 线程 vs async 任务</text>
          <g>
            <rect x={60} y={264} width={290} height={108} rx="10" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={205} y={286} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>OS 线程</text>
            <text x={205} y={306} textAnchor="middle" fontSize="10" fill={secondary}>每线程 ~2MB 栈 · 内核调度</text>
            <text x={205} y={322} textAnchor="middle" fontSize="10" fill={secondary}>阻塞式 I/O（线程挂起）</text>
            <text x={205} y={342} textAnchor="middle" fontSize="10" fill={secondary}>万级线程已是上限</text>
            <text x={205} y={360} textAnchor="middle" fontSize="10" fill={secondary}>适合 CPU 密集任务</text>
          </g>
          <g>
            <rect x={370} y={264} width={290} height={108} rx="10" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={515} y={286} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>async 任务</text>
            <text x={515} y={306} textAnchor="middle" fontSize="10" fill={secondary}>每任务 ~百字节 · 用户态调度</text>
            <text x={515} y={322} textAnchor="middle" fontSize="10" fill={secondary}>非阻塞 I/O（await 让出）</text>
            <text x={515} y={342} textAnchor="middle" fontSize="10" fill={secondary}>百万级任务轻松承载</text>
            <text x={515} y={360} textAnchor="middle" fontSize="10" fill={secondary}>适合 I/O 密集 + 高并发</text>
          </g>
          <text x={360} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            async fn 不自动执行——必须有执行器驱动 poll，Future 才会推进
          </text>

          <defs>
            <marker id="rsw-ar-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        async fn 编译成 Future 状态机，执行器通过 poll/Waker 调度，以极低开销承载海量并发。
      </figcaption>
    </figure>
  );
}
