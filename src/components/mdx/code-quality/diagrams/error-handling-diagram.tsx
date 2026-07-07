/**
 * <ErrorHandlingDiagram>：辅图——「错误处理策略对比图」。
 *
 * 三种策略：
 *  上方「异常 / try-catch」（accent 紫）：正常流程与错误流程分离。
 *  左下「返回码」（warning 黄）：C 风格，调用方容易忘记检查。
 *  右下「Optional / Result 类型」（success 绿）：Rust 风格，编译器强制处理。
 *
 * 每种策略标注优缺点。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const TOP_X = 160;
const TOP_W = 400;
const TOP_Y = 100;
const TOP_H = 104;

const BL_X = 40;
const BL_W = 300;
const BL_Y = 244;
const BL_H = 160;

const BR_X = 380;
const BR_W = 300;
const BR_Y = 244;
const BR_H = 160;

export function ErrorHandlingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="错误处理策略对比图。上方异常即 try-catch 策略，用紫色标注，优点是正常流程与错误流程分离，缺点是性能开销且易遗漏 catch。左下返回码策略，用黄色标注，C 风格函数返回整数，缺点是调用方容易忘记检查。右下 Optional 或 Result 类型策略，用绿色标注，Rust 风格，编译器强制处理。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            错误处理：三种策略对比
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            从「容易遗漏」到「编译器兜底」——错误处理的演进
          </text>

          {/* ===== 上方：异常 ===== */}
          <rect
            x={TOP_X}
            y={TOP_Y}
            width={TOP_W}
            height={TOP_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text x={TOP_X + TOP_W / 2} y={TOP_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">
            异常（try-catch）
          </text>
          <text x={TOP_X + TOP_W / 2} y={TOP_Y + 52} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            正常流程与错误流程分离
          </text>
          <text x={TOP_X + 24} y={TOP_Y + 78} fontSize="11" fill="var(--success)">
            + 优雅清晰，不污染主流程
          </text>
          <text x={TOP_X + 24} y={TOP_Y + 96} fontSize="11" fill="var(--danger)">
            − 性能开销、容易遗漏 catch
          </text>

          {/* 连接线 */}
          <line x1={VIEW_W / 2 - 60} y1={TOP_Y + TOP_H} x2={BL_X + BL_W / 2} y2={BL_Y} stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1={VIEW_W / 2 + 60} y1={TOP_Y + TOP_H} x2={BR_X + BR_W / 2} y2={BR_Y} stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* ===== 左下：返回码 ===== */}
          <rect
            x={BL_X}
            y={BL_Y}
            width={BL_W}
            height={BL_H}
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text x={BL_X + BL_W / 2} y={BL_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">
            返回码
          </text>
          <text x={BL_X + BL_W / 2} y={BL_Y + 50} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            C 风格：函数返回 int
          </text>
          <text x={BL_X + 20} y={BL_Y + 78} fontSize="11" fill="var(--success)">
            + 简单直接，无额外机制
          </text>
          <text x={BL_X + 20} y={BL_Y + 98} fontSize="11" fill="var(--danger)">
            − 调用方容易忘记检查
          </text>
          <text x={BL_X + 20} y={BL_Y + 118} fontSize="11" fill="var(--danger)">
            − 错误被静默吞掉
          </text>
          <text x={BL_X + 20} y={BL_Y + 140} fontSize="11" fill="var(--text-secondary)">
            int result = doSomething();
          </text>

          {/* ===== 右下：Optional / Result ===== */}
          <rect
            x={BR_X}
            y={BR_Y}
            width={BR_W}
            height={BR_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text x={BR_X + BR_W / 2} y={BR_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">
            Optional / Result 类型
          </text>
          <text x={BR_X + BR_W / 2} y={BR_Y + 50} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            Rust 风格：类型即可能出错
          </text>
          <text x={BR_X + 20} y={BR_Y + 78} fontSize="11" fill="var(--success)">
            + 编译器强制处理错误
          </text>
          <text x={BR_X + 20} y={BR_Y + 98} fontSize="11" fill="var(--success)">
            + 在编译期消灭遗漏
          </text>
          <text x={BR_X + 20} y={BR_Y + 118} fontSize="11" fill="var(--danger)">
            − 语法稍复杂
          </text>
          <text x={BR_X + 20} y={BR_Y + 140} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            Result&lt;T, E&gt; = Ok(T) | Err(E)
          </text>

          {/* 底部总结 */}
          <line x1={40} y1={424} x2={VIEW_W - 40} y2={424} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={448} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            错误处理的核心：不遗漏、不吞掉、让失败路径显式可见
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异常将正常流程与错误流程分离但容易遗漏 catch；返回码简单但调用方常常忘记检查；
        Optional/Result 类型让错误成为类型系统的一部分，编译器强制你处理，是从源头消灭遗漏的方式。
      </figcaption>
    </figure>
  );
}
