/**
 * <DcsAsyncInternalsDiagram>：async/await 状态机与 SynchronizationContext。
 *
 * 上半：async 方法被编译器转换为状态机，await 暂停-恢复流程。
 * 下半：SynchronizationContext 对 await 恢复线程的影响 + ConfigureAwait。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
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

const BOX_W = 130;
const BOX_H = 50;

export function DcsAsyncInternalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="async/await 状态机与 SynchronizationContext。上半展示 await 暂停-恢复流程：调用异步操作、未完成则注册 continuation 并返回 Task、IO 完成后恢复执行。下半展示 SynchronizationContext 对恢复线程的影响：默认回到原线程，ConfigureAwait(false) 在线程池恢复。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            async/await 状态机与 SynchronizationContext
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            编译器生成状态机 · await 暂停-恢复 · SynchronizationContext 控制恢复线程
          </text>

          {/* 上半：await 流程 */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            await 暂停-恢复流程
          </text>

          {/* 步骤1: 调用异步操作 */}
          <rect x={40} y={94} width={BOX_W} height={BOX_H} rx="6" fill={elevated} stroke={accent} strokeWidth="1.2" />
          <text x={40 + BOX_W / 2} y={114} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>await 操作</text>
          <text x={40 + BOX_W / 2} y={132} textAnchor="middle" fontSize="10" fill={secondary}>GetStringAsync</text>

          {/* 步骤2: 检查是否完成 */}
          <line x1={170} y1={119} x2={200} y2={119} stroke={secondary} strokeWidth="1.2" markerEnd="url(#dcs-ai-arrow)" />
          <rect x={200} y={94} width={BOX_W} height={BOX_H} rx="6" fill={elevated} stroke={warning} strokeWidth="1.2" />
          <text x={200 + BOX_W / 2} y={114} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>IsCompleted?</text>
          <text x={200 + BOX_W / 2} y={132} textAnchor="middle" fontSize="10" fill={secondary}>检查 Task 状态</text>

          {/* 步骤3a: 未完成 - 注册 continuation */}
          <line x1={330} y1={119} x2={360} y2={119} stroke={secondary} strokeWidth="1.2" markerEnd="url(#dcs-ai-arrow)" />
          <text x={345} y={111} textAnchor="middle" fontSize="10" fill={danger}>No</text>
          <rect x={360} y={94} width={BOX_W + 20} height={BOX_H} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" />
          <text x={360 + (BOX_W + 20) / 2} y={114} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>注册 continuation</text>
          <text x={360 + (BOX_W + 20) / 2} y={132} textAnchor="middle" fontSize="10" fill={secondary}>返回 Task · 不阻塞</text>

          {/* 步骤4: IO 完成恢复 */}
          <line x1={420} y1={144} x2={420} y2={172} stroke={danger} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#dcs-ai-reddown)" />
          <rect x={360} y={172} width={BOX_W + 20} height={BOX_H} rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" />
          <text x={360 + (BOX_W + 20) / 2} y={192} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>IO 完成</text>
          <text x={360 + (BOX_W + 20) / 2} y={210} textAnchor="middle" fontSize="10" fill={secondary}>MoveNext 恢复执行</text>

          {/* 步骤3b: 已完成 - 同步继续 */}
          <text x={265} y={165} textAnchor="middle" fontSize="10" fill={success}>Yes</text>
          <path d="M 265 144 Q 265 172 330 196" fill="none" stroke={success} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#dcs-ai-green)" />

          {/* 分隔线 */}
          <line x1={32} y1={244} x2={VIEW_W - 32} y2={244} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：SynchronizationContext */}
          <text x={VIEW_W / 2} y={268} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            SynchronizationContext 与 ConfigureAwait
          </text>

          {/* 默认行为（左） */}
          <rect x={40} y={284} width={300} height={96} rx="8" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.2" />
          <text x={190} y={304} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>默认：捕获 SynchronizationContext</text>
          <text x={54} y={324} fontSize="11" fill={primary}>await httpClient.GetAsync(url);</text>
          <text x={54} y={342} fontSize="11" fill={secondary}>UI 线程：恢复后回到 UI 线程</text>
          <text x={54} y={360} fontSize="11" fill={danger}>风险：.Result 在 UI 线程会死锁</text>
          <text x={54} y={376} fontSize="10" fill={secondary}>continuation 通过 SC.Post 投递</text>

          {/* ConfigureAwait(false)（右） */}
          <rect x={380} y={284} width={300} height={96} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.2" />
          <text x={530} y={304} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>ConfigureAwait(false)</text>
          <text x={394} y={324} fontSize="11" fill={primary}>await httpClient.GetAsync(url)</text>
          <text x={394} y={342} fontSize="11" fill={primary}>{"  .ConfigureAwait(false);"}</text>
          <text x={394} y={360} fontSize="11" fill={success}>线程池线程恢复 · 不回原线程</text>
          <text x={394} y={376} fontSize="10" fill={secondary}>避免死锁 · 库代码必须加</text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={402} textAnchor="middle" fontSize="11" fill={secondary}>
            async/await = 编译器状态机 + 委托回调 · UI 层可不加 ConfigureAwait · 库代码必须加
          </text>
          <text x={VIEW_W / 2} y={418} textAnchor="middle" fontSize="11" fill={secondary}>
            全栈异步：混用 async 和 .Result 是死锁根源
          </text>

          <defs>
            <marker id="dcs-ai-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="dcs-ai-reddown" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
              <path d="M0 0 L6 0 L3 6 z" fill={danger} />
            </marker>
            <marker id="dcs-ai-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        async/await 状态机暂停-恢复流程与 SynchronizationContext 的影响。
      </figcaption>
    </figure>
  );
}
