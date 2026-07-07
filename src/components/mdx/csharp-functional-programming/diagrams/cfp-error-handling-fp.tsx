/**
 * <CfpErrorHandlingFpDiagram>：函数式错误处理。
 *
 * 上半：try-catch（异常作为控制流）vs Result<T>（错误作为数据）。
 * 下半：Result 链式传播——Ok 继续，Error 短路。
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

export function CfpErrorHandlingFpDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数式错误处理。上半展示try-catch异常控制流 vs Result类型错误作为数据。下半展示Result链式：Ok继续传播，Error短路。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            函数式错误处理：Result 类型
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            错误作为数据 · 链式传播 · 类型安全 · 无异常控制流
          </text>

          {/* 上半：try-catch vs Result */}
          <text x={VIEW_W / 2} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            try-catch（控制流）vs Result（数据流）
          </text>

          {/* try-catch（左） */}
          <rect x={40} y={94} width={305} height={104} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={192} y={114} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>try-catch：异常即控制流</text>
          <text x={54} y={134} fontSize="11" fill={primary} fontFamily="monospace">{"try {"}</text>
          <text x={54} y={150} fontSize="11" fill={primary} fontFamily="monospace">{"  var r = Parse(s);"}</text>
          <text x={54} y={166} fontSize="11" fill={primary} fontFamily="monospace">{"} catch (Exception e) {"}</text>
          <text x={54} y={182} fontSize="11" fill={primary} fontFamily="monospace">{"  log(e); return null;"}</text>
          <text x={54} y={194} fontSize="10" fill={danger}>错误是隐式的 · 签名不体现</text>

          {/* Result（右） */}
          <rect x={375} y={94} width={305} height={104} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={527} y={114} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>Result：错误即数据</text>
          <text x={389} y={134} fontSize="11" fill={primary} fontFamily="monospace">{"Result<int> r = Parse(s);"}</text>
          <text x={389} y={150} fontSize="11" fill={primary} fontFamily="monospace">{"// r 是 Ok(42) 或 Error(\"...\")"}</text>
          <text x={389} y={166} fontSize="11" fill={success} fontFamily="monospace">{"r.Match("}</text>
          <text x={389} y={182} fontSize="11" fill={success} fontFamily="monospace">{"  ok => Use(ok),"}</text>
          <text x={389} y={194} fontSize="10" fill={success}>错误是显式的 · 签名体现</text>

          {/* 分隔线 */}
          <line x1={32} y1={218} x2={VIEW_W - 32} y2={218} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：Result 链式 */}
          <text x={VIEW_W / 2} y={244} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Result 链式：Ok 继续，Error 短路
          </text>

          {/* Ok 路径 */}
          <rect x={40} y={256} width={640} height={50} rx="6" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1" />
          <text x={56} y={274} fontSize="11" fontWeight="700" fill={success}>Ok 路径：</text>
          <rect x={130} y={264} width={80} height={30} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={170} y={284} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">Ok("42")</text>
          <line x1={215} y1={279} x2={235} y2={279} stroke={success} strokeWidth="1.2" markerEnd="url(#cfp-eh-arrow)" />
          <rect x={240} y={264} width={80} height={30} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={280} y={284} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">Ok(42)</text>
          <line x1={325} y1={279} x2={345} y2={279} stroke={success} strokeWidth="1.2" markerEnd="url(#cfp-eh-arrow)" />
          <rect x={350} y={264} width={80} height={30} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={390} y={284} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">Ok(84)</text>
          <line x1={435} y1={279} x2={455} y2={279} stroke={success} strokeWidth="1.2" markerEnd="url(#cfp-eh-arrow)" />
          <rect x={460} y={264} width={100} height={30} rx="4" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.4" />
          <text x={510} y={284} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">Ok("84")</text>
          <text x={590} y={284} fontSize="10" fill={secondary}>全链执行</text>

          {/* Error 路径 */}
          <rect x={40} y={316} width={640} height={50} rx="6" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1" />
          <text x={56} y={334} fontSize="11" fontWeight="700" fill={danger}>Error 路径：</text>
          <rect x={130} y={324} width={80} height={30} rx="4" fill={elevated} stroke={danger} strokeWidth="1" />
          <text x={170} y={344} textAnchor="middle" fontSize="11" fill={danger} fontFamily="monospace">Ok("ab")</text>
          <line x1={215} y1={339} x2={235} y2={339} stroke={danger} strokeWidth="1.2" markerEnd="url(#cfp-eh-arrow)" />
          <rect x={240} y={324} width={80} height={30} rx="4" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="3 2" />
          <text x={280} y={344} textAnchor="middle" fontSize="10" fill={danger} fontFamily="monospace">Err(解析)</text>
          <line x1={325} y1={339} x2={345} y2={339} stroke={danger} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#cfp-eh-arrow)" />
          <rect x={350} y={324} width={80} height={30} rx="4" fill={elevated} stroke={danger} strokeWidth="1" strokeDasharray="3 2" />
          <text x={390} y={344} textAnchor="middle" fontSize="10" fill={danger} fontFamily="monospace">Err(解析)</text>
          <line x1={435} y1={339} x2={455} y2={339} stroke={danger} strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#cfp-eh-arrow)" />
          <rect x={460} y={324} width={100} height={30} rx="4" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.4" strokeDasharray="3 2" />
          <text x={510} y={344} textAnchor="middle" fontSize="10" fill={danger} fontFamily="monospace">Err(解析)</text>
          <text x={590} y={344} fontSize="10" fill={danger}>短路传播</text>

          {/* 底部总结 */}
          <line x1={32} y1={382} x2={VIEW_W - 32} y2={382} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={400} textAnchor="middle" fontSize="11" fill={secondary}>
            Result&lt;T, E&gt; = Ok(T) | Error(E) · Bind 链式 · Ok 传播 / Error 短路
          </text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="10" fill={secondary}>
            错误是值不是异常 · 签名体现可失败性 · 编译器强制处理错误分支
          </text>

          <defs>
            <marker id="cfp-eh-arrow" markerWidth="6" markerHeight="6" refX="5" refY="2" orient="auto">
              <path d="M0 0 L5 2 L0 4 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Result 类型把错误变成数据，Ok 链式传播，Error 短路，消除 try-catch。
      </figcaption>
    </figure>
  );
}
