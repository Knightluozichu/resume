/**
 * <CvcAsyncClrDiagram>：async/await 的状态机与异步执行流。
 *
 * 上半：同步 vs 异步的线程利用对比。
 * 下半：编译器状态机转换 + SynchronizationContext 回调路径。
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

export function CvcAsyncClrDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="async/await 状态机。上半对比同步阻塞与异步非阻塞的线程利用。下半展示编译器将 async 方法转换为状态机，及 SynchronizationContext 的回调路径。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            async/await：状态机与异步执行流
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            同步阻塞浪费线程 · 异步交还控制权 · 编译器生成状态机
          </text>

          {/* 上半：同步 vs 异步 */}
          {/* 同步 */}
          <rect x={50} y={72} width={300} height={56} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" />
          <text x={200} y={90} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            同步：线程阻塞等待
          </text>
          <text x={200} y={108} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
            var data = Download(url);  // 线程空转
          </text>
          <text x={200} y={122} textAnchor="middle" fontSize="10" fill={danger}>
            等待期间线程被阻塞 · 无法处理其他请求
          </text>

          {/* 异步 */}
          <rect x={370} y={72} width={300} height={56} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" />
          <text x={520} y={90} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            异步：交还控制权
          </text>
          <text x={520} y={108} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
            var data = await DownloadAsync(url);
          </text>
          <text x={520} y={122} textAnchor="middle" fontSize="10" fill={success}>
            等待期间线程可处理其他请求 · 完成后恢复
          </text>

          {/* 分隔线 */}
          <line x1={32} y1={144} x2={VIEW_W - 32} y2={144} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：状态机转换 */}
          <text x={VIEW_W / 2} y={166} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            编译器将 async 方法转换为状态机
          </text>

          {/* 你写的代码 */}
          <rect x={50} y={180} width={260} height={110} rx="8" fill={elevated} stroke={accent} strokeWidth="1.2" />
          <text x={180} y={200} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            你写的 async 方法
          </text>
          <text x={70} y={218} fontSize="10" fill={primary} fontFamily="monospace">async Task&lt;string&gt; Fetch()</text>
          <text x={70} y={234} fontSize="10" fill={primary} fontFamily="monospace">{"{"}</text>
          <text x={80} y={250} fontSize="10" fill={secondary} fontFamily="monospace">var json = await GetAsync();</text>
          <text x={80} y={266} fontSize="10" fill={secondary} fontFamily="monospace">var data = Parse(json);</text>
          <text x={80} y={282} fontSize="10" fill={secondary} fontFamily="monospace">return data.Name;</text>
          <text x={70} y={288} fontSize="10" fill={primary} fontFamily="monospace">{"}"}</text>

          {/* 箭头 */}
          <line x1={310} y1={235} x2={360} y2={235} stroke={warning} strokeWidth="1.4" markerEnd="url(#cvc-ac-warn)" />
          <text x={335} y={227} textAnchor="middle" fontSize="10" fill={warning}>编译器</text>
          <text x={335} y={248} textAnchor="middle" fontSize="10" fill={warning}>转换</text>

          {/* 状态机 */}
          <rect x={360} y={180} width={310} height={110} rx="8" fill={elevated} stroke={warning} strokeWidth="1.2" />
          <text x={515} y={200} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>
            生成的状态机
          </text>
          <text x={375} y={218} fontSize="10" fill={primary} fontFamily="monospace">struct StateMachine : IAsyncStateMachine</text>
          <text x={375} y={234} fontSize="10" fill={secondary} fontFamily="monospace">{"{"}</text>
          <text x={385} y={250} fontSize="10" fill={warning} fontFamily="monospace">int state;  // -1, 0, 1</text>
          <text x={385} y={266} fontSize="10" fill={warning} fontFamily="monospace">string json;  // 局部变量→字段</text>
          <text x={385} y={282} fontSize="10" fill={warning} fontFamily="monospace">{"void MoveNext() { ... }"}</text>
          <text x={375} y={288} fontSize="10" fill={secondary} fontFamily="monospace">{"}"}</text>

          {/* 分隔线 */}
          <line x1={32} y1={306} x2={VIEW_W - 32} y2={306} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* SynchronizationContext 回调路径 */}
          <text x={VIEW_W / 2} y={326} textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>
            SynchronizationContext：await 后的代码在哪执行？
          </text>

          <rect x={50} y={340} width={300} height={56} rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x={200} y={358} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>
            UI 应用（WPF / WinForms）
          </text>
          <text x={200} y={374} textAnchor="middle" fontSize="10" fill={secondary}>await 后回到 UI 线程</text>
          <text x={200} y={388} textAnchor="middle" fontSize="10" fill={secondary}>可安全更新 UI 控件</text>

          <rect x={370} y={340} width={300} height={56} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" />
          <text x={520} y={358} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
            控制台 / ASP.NET Core
          </text>
          <text x={520} y={374} textAnchor="middle" fontSize="10" fill={secondary}>无 SynchronizationContext</text>
          <text x={520} y={388} textAnchor="middle" fontSize="10" fill={secondary}>await 后在线程池任意线程</text>

          <defs>
            <marker id="cvc-ac-warn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编译器将 async 方法转换为状态机，await 暂停并交还控制权，SynchronizationContext 决定恢复线程。
      </figcaption>
    </figure>
  );
}
