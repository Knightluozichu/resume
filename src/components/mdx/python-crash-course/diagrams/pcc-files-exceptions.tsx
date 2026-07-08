/**
 * <PccFilesExceptionsDiagram>：Python 文件读写与异常处理。
 *
 * 文件操作三步（open→read/write→close）、with 语句自动关闭、
 * try-except-else-finally 异常处理结构。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function PccFilesExceptionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 文件操作与异常处理：文件读写流程、with 语句自动关闭、try-except-else-finally 异常处理结构。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            文件读写与异常处理
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            with 自动管理资源 · try-except 捕获异常 · finally 保证清理
          </text>

          {/* 左侧：文件操作流程 */}
          <text x={160} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            文件操作三步
          </text>

          <rect x={60} y={92} width={200} height={32} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={160} y={112} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>1. open("file.txt", "r")</text>

          <line x1={160} y1={124} x2={160} y2={140} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-fe-arrow)" />

          <rect x={60} y={144} width={200} height={32} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={160} y={164} textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>2. read() / write()</text>

          <line x1={160} y1={176} x2={160} y2={192} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-fe-arrow)" />

          <rect x={60} y={196} width={200} height={32} rx="6" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={160} y={216} textAnchor="middle" fontSize="12" fontWeight="600" fill={warning}>3. close()</text>

          {/* with 语句 */}
          <rect x={40} y={248} width={240} height={52} rx="8" fill={elevated} stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={160} y={268} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>with 语句（推荐）</text>
          <text x={160} y={288} textAnchor="middle" fontSize="11" fill={secondary}>自动 close()，即使出错也关闭</text>

          {/* 文件模式 */}
          <text x={160} y={320} textAnchor="middle" fontSize="11" fill={secondary}>模式：r 读 / w 写 / a 追加</text>
          <text x={160} y={338} textAnchor="middle" fontSize="11" fill={secondary}>r+ 读写 / b 二进制（如 rb）</text>

          {/* 分隔线 */}
          <line x1={300} y1={70} x2={300} y2={360} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 右侧：异常处理结构 */}
          <text x={510} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            try-except-else-finally
          </text>

          <rect x={340} y={92} width={340} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={352} y={110} fontSize="12" fontWeight="600" fill={accent}>try:</text>
          <text x={400} y={110} fontSize="11" fill={secondary}>可能出错的代码</text>

          <rect x={340} y={128} width={340} height={28} rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          <text x={352} y={146} fontSize="12" fontWeight="600" fill={danger}>except ValueError:</text>
          <text x={490} y={146} fontSize="11" fill={secondary}>捕获特定异常</text>

          <rect x={340} y={164} width={340} height={28} rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          <text x={352} y={182} fontSize="12" fontWeight="600" fill={danger}>except Exception:</text>
          <text x={490} y={182} fontSize="11" fill={secondary}>捕获其他异常</text>

          <rect x={340} y={200} width={340} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={352} y={218} fontSize="12" fontWeight="600" fill={success}>else:</text>
          <text x={400} y={218} fontSize="11" fill={secondary}>无异常时执行</text>

          <rect x={340} y={236} width={340} height={28} rx="4" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" strokeOpacity="0.5" />
          <text x={352} y={254} fontSize="12" fontWeight="600" fill={warning}>finally:</text>
          <text x={410} y={254} fontSize="11" fill={secondary}>无论是否异常都执行（清理）</text>

          {/* 常见异常类型 */}
          <line x1={320} y1={280} x2={VIEW_W - 32} y2={280} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={510} y={300} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>常见内置异常</text>

          <rect x={340} y={310} width={100} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={390} y={326} textAnchor="middle" fontSize="11" fill={primary}>FileNotFoundError</text>

          <rect x={450} y={310} width={100} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={500} y={326} textAnchor="middle" fontSize="11" fill={primary}>ValueError</text>

          <rect x={560} y={310} width={100} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={610} y={326} textAnchor="middle" fontSize="11" fill={primary}>TypeError</text>

          <rect x={340} y={342} width={100} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={390} y={358} textAnchor="middle" fontSize="11" fill={primary}>ZeroDivisionError</text>

          <rect x={450} y={342} width={100} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={500} y={358} textAnchor="middle" fontSize="11" fill={primary}>IndexError</text>

          <rect x={560} y={342} width={100} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={610} y={358} textAnchor="middle" fontSize="11" fill={primary}>KeyError</text>

          <text x={510} y={386} textAnchor="middle" fontSize="11" fill={secondary}>
            捕获从具体到一般：先 except 具体异常，最后 except Exception
          </text>

          <defs>
            <marker id="pcc-fe-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        with 语句自动管理文件资源，try-except-else-finally 结构化处理异常。
      </figcaption>
    </figure>
  );
}
