/**
 * <CtcAsyncDeepDiagram>：async/await 状态机、Task/ValueTask 与死锁。
 *
 * 上半：同步阻塞 vs 异步状态机的时间线对比。
 * 下半：Task vs ValueTask 的分配差异，以及 ConfigureAwait 死锁原理。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CtcAsyncDeepDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="异步深入。上半展示同步阻塞（线程等待）与异步状态机（线程释放+恢复）的时间线对比。下半展示 Task 堆分配与 ValueTask 零分配的差异，以及 ConfigureAwait(false) 避免死锁的原理。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            async/await：状态机 · Task/ValueTask · 死锁
          </text>

          {/* === 上半：同步 vs 异步时间线 === */}
          <text x={180} y={50} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            同步：线程阻塞
          </text>
          <text x={540} y={50} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            异步：状态机挂起
          </text>

          {/* 同步时间线 */}
          <rect x={40} y={60} width={280} height={80} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <line x1={60} y1={80} x2={300} y2={80} stroke={danger} strokeWidth="2" />
          <text x={60} y={74} textAnchor="start" fontSize="10" fill={secondary}>t=0</text>
          <text x={300} y={74} textAnchor="end" fontSize="10" fill={secondary}>t=2s</text>
          <rect x={60} y={76} width={240} height="8" fill={danger} fillOpacity="0.3" />
          <text x={180} y={100} textAnchor="middle" fontSize="10" fill={danger}>线程阻塞等待 I/O</text>
          <text x={180} y={116} textAnchor="middle" fontSize="10" fill={secondary}>GetData() → 线程被占用 2 秒</text>
          <text x={180} y={132} textAnchor="middle" fontSize="10" fill={secondary}>无法做其他事 · 线程池耗尽</text>

          {/* 异步时间线 */}
          <rect x={400} y={60} width={280} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <line x1={420} y1={80} x2={660} y2={80} stroke={success} strokeWidth="2" />
          <text x={420} y={74} textAnchor="start" fontSize="10" fill={secondary}>t=0</text>
          <text x={660} y={74} textAnchor="end" fontSize="10" fill={secondary}>t=2s</text>
          {/* 线程工作段 */}
          <rect x={420} y={76} width="40" height="8" fill={success} fillOpacity="0.6" />
          <rect x={620} y={76} width="40" height="8" fill={success} fillOpacity="0.6" />
          {/* 释放段 */}
          <rect x={460} y={76} width="160" height="8" fill={success} fillOpacity="0.15" />
          <text x={540} y={100} textAnchor="middle" fontSize="10" fill={success}>await → 线程释放</text>
          <text x={540} y={116} textAnchor="middle" fontSize="10" fill={secondary}>GetDataAsync() → 状态机挂起</text>
          <text x={540} y={132} textAnchor="middle" fontSize="10" fill={secondary}>线程做别的事 · I/O 完成后恢复</text>

          {/* 分隔线 */}
          <line x1={32} y1={156} x2={VIEW_W - 32} y2={156} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 下半左：Task vs ValueTask === */}
          <text x={180} y={176} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>
            Task vs ValueTask
          </text>

          <rect x={40} y={188} width={280} height={130} rx="8" fill={warning} fillOpacity="0.04" stroke={warning} strokeWidth="1.4" strokeOpacity="0.4" />
          {/* Task */}
          <rect x={56} y={200} width={120} height="26" rx="4" fill={danger} fillOpacity="0.12" stroke={danger} strokeWidth="1" />
          <text x={116} y={217} textAnchor="middle" fontSize="10" fill={danger} fontFamily="monospace">{"Task<int>"}</text>
          <text x={190} y={217} textAnchor="start" fontSize="10" fill={secondary}>引用类型 · 堆分配</text>
          {/* ValueTask */}
          <rect x={56} y={232} width={120} height="26" rx="4" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1" />
          <text x={116} y={249} textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">{"ValueTask<int>"}</text>
          <text x={190} y={249} textAnchor="start" fontSize="10" fill={secondary}>值类型 · 零分配</text>

          <text x={56} y={276} textAnchor="start" fontSize="10" fill={secondary}>同步完成场景：</text>
          <text x={56} y={292} textAnchor="start" fontSize="10" fill={success} fontFamily="monospace">{"  ValueTask.FromResult(42)  零分配"}</text>
          <text x={56} y={308} textAnchor="start" fontSize="10" fill={danger} fontFamily="monospace">{"  Task.FromResult(42)       堆分配"}</text>

          {/* === 下半右：死锁 === */}
          <text x={540} y={176} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            死锁陷阱与 ConfigureAwait
          </text>

          <rect x={400} y={188} width={280} height={130} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.4" strokeOpacity="0.4" />
          {/* 死锁场景 */}
          <rect x={416} y={200} width={120} height="24" rx="4" fill={elevated} stroke={danger} strokeWidth="1" />
          <text x={476} y={216} textAnchor="middle" fontSize="10" fill={danger}>UI 线程 .Wait()</text>
          <rect x={556} y={200} width={120} height="24" rx="4" fill={elevated} stroke={danger} strokeWidth="1" />
          <text x={616} y={216} textAnchor="middle" fontSize="10" fill={danger}>continuation 等 UI</text>
          <path d="M 536 212 L 556 212" fill="none" stroke={danger} strokeWidth="1.4" markerEnd="url(#ctc-ad-danger)" />
          <path d="M 556 206 L 536 206" fill="none" stroke={danger} strokeWidth="1.4" markerEnd="url(#ctc-ad-danger)" />
          <text x={540} y={238} textAnchor="middle" fontSize="10" fill={danger}>互相等待 → 死锁</text>

          {/* 解法 */}
          <rect x={416} y={248} width={248} height="56" rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x={540} y={266} textAnchor="middle" fontSize="10" fontWeight="600" fill={success} fontFamily="monospace">
            ConfigureAwait(false)
          </text>
          <text x={540} y={282} textAnchor="middle" fontSize="10" fill={secondary}>continuation 不回 UI 线程</text>
          <text x={540} y={296} textAnchor="middle" fontSize="10" fill={secondary}>库代码应始终使用</text>

          {/* 底部总结 */}
          <line x1={32} y1={338} x2={VIEW_W - 32} y2={338} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={358} textAnchor="middle" fontSize="11" fill={secondary}>
            await 不阻塞线程 · 状态机在挂起点返回 · 异步完成后 continuation 恢复
          </text>
          <text x={VIEW_W / 2} y={374} textAnchor="middle" fontSize="11" fill={secondary}>
            ValueTask 适合同步完成场景 · ConfigureAwait(false) 避免死锁 · async 全链路
          </text>
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
            async void 只用于事件处理器 · 其余场景禁用
          </text>

          <defs>
            <marker id="ctc-ad-danger" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={danger} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        async/await 将方法转换为状态机，await 处线程释放不阻塞。ValueTask 在同步完成时零分配。ConfigureAwait(false) 避免 UI 线程死锁。async 全链路不用 .Result/.Wait()。
      </figcaption>
    </figure>
  );
}
