/**
 * <Ec7AsyncAwaitDiagram>：async/await 异步状态机。
 *
 * 上半：时间线对比
 *   - 同步：调用 → 阻塞等待 → 返回（线程空转）
 *   - 异步：调用 → await 挂起 → 线程释放 → 完成回调 → 恢复 → 返回
 * 下半：Task 生命周期与状态
 *
 * 纯静态展示，无交互。Server Component。
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

export function Ec7AsyncAwaitDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="async/await 异步状态机。上半部分时间线对比：同步调用阻塞等待线程空转，异步调用 await 挂起释放线程，完成后回调恢复。下半部分 Task 生命周期：Created 等待运行、Running 运行中、RanToCompletion 成功完成、Faulted 出错、Canceled 取消。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            async/await：异步状态机
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            不阻塞线程 · 编译器生成状态机 · await 挂起与恢复
          </text>

          {/* 同步时间线 */}
          <g>
            <text x={36} y={80} fontSize="11.5" fontWeight="700" fill={danger}>同步（阻塞）</text>
            <rect x={36} y={88} width={120} height={26} rx="6" fill={danger} fillOpacity="0.12" stroke={danger} strokeWidth="1.2" />
            <text x={96} y={106} textAnchor="middle" fontSize="10" fill={danger}>调用方法</text>
            <rect x={156} y={88} width={200} height={26} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeDasharray="4 3" />
            <text x={256} y={106} textAnchor="middle" fontSize="10" fill={secondary}>阻塞等待（线程空转）</text>
            <rect x={356} y={88} width={100} height={26} rx="6" fill={danger} fillOpacity="0.12" stroke={danger} strokeWidth="1.2" />
            <text x={406} y={106} textAnchor="middle" fontSize="10" fill={danger}>返回结果</text>
          </g>

          {/* 异步时间线 */}
          <g>
            <text x={36} y={136} fontSize="11.5" fontWeight="700" fill={success}>异步（async/await）</text>
            <rect x={36} y={144} width={100} height={26} rx="6" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1.2" />
            <text x={86} y={162} textAnchor="middle" fontSize="10" fill={success}>调用</text>
            <rect x={136} y={144} width={80} height={26} rx="6" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.2" />
            <text x={176} y={162} textAnchor="middle" fontSize="10" fill={accent}>await 挂起</text>
            <rect x={216} y={144} width={180} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1.2" strokeDasharray="4 3" />
            <text x={306} y={162} textAnchor="middle" fontSize="10" fill={secondary}>线程释放（做其他事）</text>
            <rect x={396} y={144} width={80} height={26} rx="6" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.2" />
            <text x={436} y={162} textAnchor="middle" fontSize="10" fill={accent}>回调恢复</text>
            <rect x={476} y={144} width={80} height={26} rx="6" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1.2" />
            <text x={516} y={162} textAnchor="middle" fontSize="10" fill={success}>返回</text>
          </g>

          {/* 箭头 */}
          <text x={620} y={162} fontSize="10" fill={success}>不阻塞！</text>

          {/* 代码示例 */}
          <line x1={32} y1={190} x2={VIEW_W - 32} y2={190} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <g>
            <rect x={40} y={202} width={640} height={70} rx="8" fill={elevated} stroke={border} strokeWidth="1.2" />
            <text x={55} y={222} fontSize="11" fontFamily="monospace" fill={accent}>{"async Task<string> GetDataAsync()"}</text>
            <text x={55} y={240} fontSize="11" fontFamily="monospace" fill={primary}>{"{"}</text>
            <text x={70} y={258} fontSize="11" fontFamily="monospace" fill={success}>{"  var data = await httpClient.GetStringAsync(url);"}</text>
            <text x={70} y={268} fontSize="11" fontFamily="monospace" fill={primary}>{"  return data.ToUpper();"}</text>
            <text x={55} y={270} fontSize="11" fontFamily="monospace" fill={primary}></text>
          </g>

          {/* Task 状态 */}
          <text x={VIEW_W / 2} y={296} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            Task 生命周期状态
          </text>
          <g>
            <rect x={36} y={308} width={110} height={30} rx="6" fill={secondary} fillOpacity="0.12" stroke={secondary} strokeWidth="1.2" />
            <text x={91} y={328} textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>Created</text>
            <line x1={146} y1={323} x2={168} y2={323} stroke={secondary} strokeWidth="1.2" markerEnd="url(#ec7-async-arr)" />
            <rect x={172} y={308} width={110} height={30} rx="6" fill={warning} fillOpacity="0.12" stroke={warning} strokeWidth="1.2" />
            <text x={227} y={328} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>Running</text>
            <line x1={282} y1={323} x2={304} y2={323} stroke={secondary} strokeWidth="1.2" markerEnd="url(#ec7-async-arr)" />
            <rect x={308} y={308} width={110} height={30} rx="6" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1.2" />
            <text x={363} y={328} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>Completed</text>
            <rect x={440} y={308} width={110} height={30} rx="6" fill={danger} fillOpacity="0.12" stroke={danger} strokeWidth="1.2" />
            <text x={495} y={328} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>Faulted</text>
            <rect x={572} y={308} width={110} height={30} rx="6" fill={warning} fillOpacity="0.12" stroke={warning} strokeWidth="1.2" />
            <text x={627} y={328} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>Canceled</text>
          </g>
          <defs>
            <marker id="ec7-async-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 底部说明 */}
          <line x1={32} y1={360} x2={VIEW_W - 32} y2={360} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={382} textAnchor="middle" fontSize="11" fill={secondary}>
            async 标记方法 · await 挂起等待不阻塞 · 返回 Task 表示"未来的结果"
          </text>
          <text x={VIEW_W / 2} y={402} textAnchor="middle" fontSize="11" fill={secondary}>
            编译器把 async 方法编译成状态机 · await 后的代码是回调 continuation
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同步方法阻塞线程等待；async/await 在 await 处挂起、释放线程，完成后回调恢复执行。编译器生成状态机管理挂起与恢复。
      </figcaption>
    </figure>
  );
}
