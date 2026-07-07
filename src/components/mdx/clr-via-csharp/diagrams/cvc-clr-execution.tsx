/**
 * <CvcClrExecutionDiagram>：CLR 执行模型——从源码到机器码的完整链路。
 *
 * 三阶段流水线：C# 源码 → IL（程序集）→ JIT 机器码。
 * 附加程序集加载与 CLR 运行时管理示意。
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

const BOX_W = 160;
const BOX_H = 72;

export function CvcClrExecutionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CLR 执行模型：C# 源码经编译器生成 IL 程序集（含元数据），CLR 加载程序集后 JIT 将 IL 按需编译为机器码，CLR 全程管理内存、异常和线程。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            CLR 执行模型：源码 → IL → 机器码
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            编译期生成 IL · 加载期读取元数据 · 执行期 JIT 按需编译
          </text>

          {/* 三阶段流水线 */}
          {/* 阶段 1：C# 源码 */}
          <rect x={40} y={86} width={BOX_W} height={BOX_H} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={120} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            C# 源码
          </text>
          <text x={120} y={126} textAnchor="middle" fontSize="11" fill={secondary}>
            .cs 文件
          </text>
          <text x={120} y={142} textAnchor="middle" fontSize="10" fill={secondary}>
            人类可读的代码
          </text>

          {/* 箭头 1→2 */}
          <line x1={200} y1={122} x2={250} y2={122} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-ce-arrow)" />
          <text x={225} y={114} textAnchor="middle" fontSize="10" fill={secondary}>csc 编译</text>

          {/* 阶段 2：IL 程序集 */}
          <rect x={250} y={86} width={BOX_W} height={BOX_H} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={330} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            IL 程序集
          </text>
          <text x={330} y={126} textAnchor="middle" fontSize="11" fill={secondary}>
            .dll / .exe
          </text>
          <text x={330} y={142} textAnchor="middle" fontSize="10" fill={secondary}>
            IL 代码 + 元数据
          </text>

          {/* 箭头 2→3 */}
          <line x1={410} y1={122} x2={460} y2={122} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-ce-arrow)" />
          <text x={435} y={114} textAnchor="middle" fontSize="10" fill={secondary}>JIT 编译</text>

          {/* 阶段 3：机器码 */}
          <rect x={460} y={86} width={BOX_W} height={BOX_H} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={540} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>
            本地机器码
          </text>
          <text x={540} y={126} textAnchor="middle" fontSize="11" fill={secondary}>
            x64 / ARM 指令
          </text>
          <text x={540} y={142} textAnchor="middle" fontSize="10" fill={secondary}>
            内存中缓存
          </text>

          {/* 分隔线 */}
          <line x1={32} y1={190} x2={VIEW_W - 32} y2={190} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：CLR 管理 */}
          <text x={VIEW_W / 2} y={214} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            CLR 运行时全程管理
          </text>

          {/* 四个管理模块 */}
          <rect x={50} y={232} width={140} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={120} y={254} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            程序集加载器
          </text>
          <text x={120} y={272} textAnchor="middle" fontSize="10" fill={secondary}>
            定位 · 验证 · 读取元数据
          </text>

          <rect x={210} y={232} width={140} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={280} y={254} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            GC 内存管理
          </text>
          <text x={280} y={272} textAnchor="middle" fontSize="10" fill={secondary}>
            分配 · 回收 · 压缩
          </text>

          <rect x={370} y={232} width={140} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={440} y={254} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            异常处理
          </text>
          <text x={440} y={272} textAnchor="middle" fontSize="10" fill={secondary}>
            抛出 · 传播 · 捕获
          </text>

          <rect x={530} y={232} width={140} height={60} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={600} y={254} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            线程调度
          </text>
          <text x={600} y={272} textAnchor="middle" fontSize="10" fill={secondary}>
            线程池 · 同步原语
          </text>

          {/* JIT 按需编译说明 */}
          <line x1={32} y1={316} x2={VIEW_W - 32} y2={316} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={340} textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>
            JIT 按需编译（懒编译）
          </text>

          {/* 按需编译示意 */}
          <rect x={80} y={356} width={120} height={40} rx="6" fill={elevated} stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={140} y={372} textAnchor="middle" fontSize="10" fill={secondary}>方法 A</text>
          <text x={140} y={388} textAnchor="middle" fontSize="10" fill={success}>首次调用 → 编译</text>

          <line x1={200} y1={376} x2={240} y2={376} stroke={border} strokeWidth="1" />

          <rect x={240} y={356} width={120} height={40} rx="6" fill={elevated} stroke={secondary} strokeWidth="1" strokeDasharray="3 2" />
          <text x={300} y={372} textAnchor="middle" fontSize="10" fill={secondary}>方法 B</text>
          <text x={300} y={388} textAnchor="middle" fontSize="10" fill={secondary}>未调用 → 未编译</text>

          <line x1={360} y1={376} x2={400} y2={376} stroke={border} strokeWidth="1" />

          <rect x={400} y={356} width={120} height={40} rx="6" fill={elevated} stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={460} y={372} textAnchor="middle" fontSize="10" fill={secondary}>方法 C</text>
          <text x={460} y={388} textAnchor="middle" fontSize="10" fill={success}>首次调用 → 编译</text>

          <line x1={520} y1={376} x2={560} y2={376} stroke={border} strokeWidth="1" />

          <rect x={560} y={356} width={100} height={40} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={610} y={372} textAnchor="middle" fontSize="10" fill={secondary}>方法 A</text>
          <text x={610} y={388} textAnchor="middle" fontSize="10" fill={success}>再次调用 → 缓存命中</text>

          <defs>
            <marker id="cvc-ce-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C# 源码经编译器生成 IL 程序集，CLR 加载后 JIT 按需编译为机器码，全程由 CLR 管理内存、异常和线程。
      </figcaption>
    </figure>
  );
}
