/**
 * <RswErrorHandlingDiagram>：Result/Option 与 ? 传播链。
 *
 * 展示 Recoverable(Result) vs Unrecoverable(panic) 分流，以及 ? 短路传播。
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

export function RswErrorHandlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="错误处理：可恢复错误用 Result 分流，不可恢复错误用 panic 终止，? 操作符短路传播。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            错误处理：可恢复与不可恢复的分流
          </text>

          {/* 错误源 */}
          <rect x={300} y={50} width={120} height={44} rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.4" />
          <text x={360} y={76} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>运行时异常</text>

          {/* 分流箭头 */}
          <line x1={340} y1={94} x2={200} y2={120} stroke={success} strokeWidth="1.6" markerEnd="url(#rsw-eh-s)" />
          <line x1={380} y1={94} x2={520} y2={120} stroke={danger} strokeWidth="1.6" markerEnd="url(#rsw-eh-d)" />
          <text x={250} y={112} textAnchor="middle" fontSize="10" fill={success}>可恢复</text>
          <text x={470} y={112} textAnchor="middle" fontSize="10" fill={danger}>不可恢复</text>

          {/* Result 分支 */}
          <rect x={70} y={124} width={260} height={140} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={200} y={146} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Result&lt;T, E&gt;</text>
          <rect x={90} y={160} width={100} height={36} rx="6" fill={elevated} stroke={success} />
          <text x={140} y={182} textAnchor="middle" fontSize="11" fill={success}>Ok(T)</text>
          <rect x={210} y={160} width={100} height={36} rx="6" fill={elevated} stroke={danger} />
          <text x={260} y={182} textAnchor="middle" fontSize="11" fill={danger}>Err(E)</text>
          <text x={200} y={214} textAnchor="middle" fontSize="10" fill={secondary}>match / map / and_then 处理</text>
          <text x={200} y={232} textAnchor="middle" fontSize="10" fill={accent}>? 操作符：遇 Err 立即返回</text>
          <text x={200} y={250} textAnchor="middle" fontSize="10" fill={secondary}>调用方决定恢复策略</text>

          {/* panic 分支 */}
          <rect x={390} y={124} width={260} height={140} rx="10" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={520} y={146} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>panic!</text>
          <text x={520} y={172} textAnchor="middle" fontSize="10" fill={secondary}>展开调用栈（unwind）</text>
          <text x={520} y={190} textAnchor="middle" fontSize="10" fill={secondary}>或终止进程（abort）</text>
          <text x={520} y={214} textAnchor="middle" fontSize="10" fill={warning}>unwrap / expect 触发</text>
          <text x={520} y={232} textAnchor="middle" fontSize="10" fill={secondary}>数组越界 / 除零 / 不变式破坏</text>
          <text x={520} y={250} textAnchor="middle" fontSize="10" fill={secondary}>表示程序已进入不可修复状态</text>

          {/* ? 传播链 */}
          <line x1={36} y1={284} x2={684} y2={284} stroke={border} strokeWidth="1" />
          <text x={360} y={306} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>? 短路传播链</text>
          <rect x={60} y={322} width={120} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={120} y={340} textAnchor="middle" fontSize="10" fill={primary}>read_file()</text>
          <text x={120} y={356} textAnchor="middle" fontSize="9" fill={secondary}>Result&lt;String&gt;</text>
          <line x1={180} y1={342} x2={210} y2={342} stroke={accent} strokeWidth="1.4" markerEnd="url(#rsw-eh-a)" />
          <text x={195} y={334} textAnchor="middle" fontSize="9" fill={accent}>?</text>
          <rect x={210} y={322} width={120} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={270} y={340} textAnchor="middle" fontSize="10" fill={primary}>parse_line()</text>
          <text x={270} y={356} textAnchor="middle" fontSize="9" fill={secondary}>Result&lt;int&gt;</text>
          <line x1={330} y1={342} x2={360} y2={342} stroke={accent} strokeWidth="1.4" markerEnd="url(#rsw-eh-a)" />
          <text x={345} y={334} textAnchor="middle" fontSize="9" fill={accent}>?</text>
          <rect x={360} y={322} width={120} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={420} y={340} textAnchor="middle" fontSize="10" fill={primary}>compute()</text>
          <text x={420} y={356} textAnchor="middle" fontSize="9" fill={secondary}>Result&lt;T&gt;</text>
          <line x1={480} y1={342} x2={510} y2={342} stroke={accent} strokeWidth="1.4" markerEnd="url(#rsw-eh-a)" />
          <text x={495} y={334} textAnchor="middle" fontSize="9" fill={accent}>?</text>
          <rect x={510} y={322} width={150} height={40} rx="6" fill={success} fillOpacity="0.12" stroke={success} />
          <text x={585} y={340} textAnchor="middle" fontSize="10" fill={success}>main / 顶层处理</text>
          <text x={585} y={356} textAnchor="middle" fontSize="9" fill={secondary}>最终恢复或报告</text>
          <text x={360} y={386} textAnchor="middle" fontSize="11" fill={secondary}>
            任一环节 Err 即短路向上冒泡，Ok 才继续——错误处理零样板
          </text>

          <defs>
            <marker id="rsw-eh-s" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker id="rsw-eh-d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
            <marker id="rsw-eh-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Result 处理可恢复错误，panic 处理不可恢复错误，? 操作符让错误沿调用链优雅传播。
      </figcaption>
    </figure>
  );
}
