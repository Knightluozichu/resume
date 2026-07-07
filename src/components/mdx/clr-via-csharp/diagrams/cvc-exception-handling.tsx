/**
 * <CvcExceptionHandlingDiagram>：CLR 异常处理——栈展开与 catch 匹配。
 *
 * 上半：调用栈中的 try/catch/finally 结构与异常传播路径。
 * 下半：throw vs throw ex 的栈追踪差异。
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

export function CvcExceptionHandlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CLR 异常处理。上半展示调用栈中 try/catch/finally 的结构与异常传播路径。下半对比 throw 和 throw ex 的栈追踪差异。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            CLR 异常处理：栈展开与 catch 匹配
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            异常沿调用栈向上搜索 · finally 保证执行 · throw 保留原始栈
          </text>

          {/* 上半：调用栈 */}
          <text x={VIEW_W / 2} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            栈展开：异常从抛出点向上搜索 catch
          </text>

          {/* 栈帧 3：Main（顶层） */}
          <rect x={50} y={90} width={500} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={70} y={108} fontSize="11" fontWeight="700" fill={primary} fontFamily="monospace">Main()</text>
          <text x={70} y={122} fontSize="10" fill={secondary}>try {`{`} processor.Process(input) {`}`} catch (Exception) {`{ ... }`}</text>
          <rect x={490} y={98} width={50} height={24} rx="4" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={515} y={114} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>catch</text>

          {/* 栈帧 2：Process */}
          <rect x={80} y={138} width={440} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={100} y={156} fontSize="11" fontWeight="700" fill={primary} fontFamily="monospace">Process()</text>
          <text x={100} y={170} fontSize="10" fill={secondary}>try {`{`} Transform(input) {`}`} catch (ArgumentException) {`{ throw; }`} finally {`{ Cleanup(); }`}</text>
          <rect x={430} y={146} width={50} height={24} rx="4" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1" />
          <text x={455} y={162} textAnchor="middle" fontSize="10" fontWeight="600" fill={warning}>catch</text>
          <rect x={465} y={146} width={50} height={24} rx="4" fill={secondary} fillOpacity="0.1" stroke={secondary} strokeWidth="1" />
          <text x={490} y={162} textAnchor="middle" fontSize="10" fontWeight="600" fill={secondary}>finally</text>

          {/* 栈帧 1：Transform（抛出点） */}
          <rect x={110} y={186} width={380} height={40} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" />
          <text x={130} y={204} fontSize="11" fontWeight="700" fill={danger} fontFamily="monospace">Transform()</text>
          <text x={130} y={218} fontSize="10" fill={danger}>throw new ArgumentException("Invalid state")</text>
          <rect x={430} y={194} width="50" height="24" rx="4" fill={danger} fillOpacity="0.15" stroke={danger} strokeWidth="1" />
          <text x={455} y={210} textAnchor="middle" fontSize="10" fontWeight="600" fill={danger}>throw!</text>

          {/* 异常传播箭头 */}
          <path d="M 460 186 L 460 178 L 460 170" fill="none" stroke={danger} strokeWidth="1.4" markerEnd="url(#cvc-eh-red)" />
          <text x={475} y={180} fontSize="10" fill={danger}>1. 搜索 catch</text>

          <path d="M 460 138 L 460 130 L 460 122" fill="none" stroke={danger} strokeWidth="1.4" markerEnd="url(#cvc-eh-red)" />
          <text x={475} y={132} fontSize="10" fill={danger}>2. 执行 finally</text>

          {/* 说明文字 */}
          <text x={300} y={244} textAnchor="middle" fontSize="10" fill={secondary}>
            栈展开：Transform 抛出 → Process 执行 finally+catch(rethrow) → Main 执行 catch
          </text>

          {/* 分隔线 */}
          <line x1={32} y1={258} x2={VIEW_W - 32} y2={258} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：throw vs throw ex */}
          <text x={VIEW_W / 2} y={280} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            throw; vs throw ex;：栈追踪差异
          </text>

          {/* throw; */}
          <rect x={50} y={294} width={300} height={100} rx="8" fill={elevated} stroke={success} strokeWidth="1.2" />
          <text x={200} y={314} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">
            throw;
          </text>
          <text x={200} y={332} textAnchor="middle" fontSize="10" fill={secondary}>保留原始 StackTrace</text>
          <text x={70} y={350} fontSize="10" fill={primary} fontFamily="monospace">at Transform() line 42</text>
          <text x={70} y={366} fontSize="10" fill={primary} fontFamily="monospace">at Process() line 28</text>
          <text x={70} y={382} fontSize="10" fill={primary} fontFamily="monospace">at Main() line 15</text>
          <text x={200} y={396} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>能看到原始抛出位置</text>

          {/* throw ex; */}
          <rect x={370} y={294} width={300} height={100} rx="8" fill={elevated} stroke={danger} strokeWidth="1.2" />
          <text x={520} y={314} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger} fontFamily="monospace">
            throw ex;
          </text>
          <text x={520} y={332} textAnchor="middle" fontSize="10" fill={secondary}>重置 StackTrace</text>
          <text x={390} y={350} fontSize="10" fill={secondary} fontFamily="monospace">at Process() line 30</text>
          <text x={390} y={366} fontSize="10" fill={secondary} fontFamily="monospace">at Main() line 15</text>
          <text x={390} y={382} fontSize="10" fill={secondary} fontFamily="monospace">{`(Transform 的栈丢失!)`}</text>
          <text x={520} y={396} textAnchor="middle" fontSize="10" fontWeight="600" fill={danger}>丢失原始抛出位置</text>

          <defs>
            <marker id="cvc-eh-red" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={danger} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异常沿调用栈向上搜索 catch 块，finally 保证执行，throw 保留原始栈追踪而 throw ex 重置。
      </figcaption>
    </figure>
  );
}
