/**
 * <CtcFinalReviewDiagram>：总复习——十大特性因果链与知识图谱。
 *
 * 四层金字塔布局：地基层（类型系统）→ 架构层（泛型+委托）→ 能力层（异步+并行）→ 表现层（模式匹配+Record+源生成器）。
 * 每层用不同颜色区分，层间箭头表示依赖关系。
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

export function CtcFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 10 核心技术指南总复习。四层金字塔：地基层（类型系统，值/引用类型、装箱、NRT）、架构层（泛型深入、委托与事件）、能力层（异步深入、并行与 TPL）、表现层（模式匹配、Record 与结构体、源生成器）。层间箭头表示依赖关系，底部总结三大设计理念。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 10 核心技术 · 知识图谱
          </text>

          {/* === 金字塔四层 === */}

          {/* 表现层（顶） */}
          <rect x="180" y="44" width="360" height="56" rx="8" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>表现层 · 现代特性</text>
          <text x={360} y="82" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
            模式匹配 ｜ Record 与结构体 ｜ 源生成器
          </text>
          <text x={360} y="96" textAnchor="middle" fontSize="9" fill={secondary}>声明式条件 · 值语义数据 · 编译时编程</text>

          {/* 箭头 */}
          <path d="M 360 104 L 360 112" fill="none" stroke={secondary} strokeWidth="1.4" markerEnd="url(#ctc-fr-arrow)" />

          {/* 能力层 */}
          <rect x="140" y="116" width="440" height="56" rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y="136" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>能力层 · 异步并发</text>
          <text x={360} y="154" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
            异步深入（async/await 状态机） ｜ 并行与 TPL（Parallel/PLINQ）
          </text>
          <text x={360} y="168" textAnchor="middle" fontSize="9" fill={secondary}>不阻塞线程 · 利用多核 · Task 共同抽象</text>

          {/* 箭头 */}
          <path d="M 360 176 L 360 184" fill="none" stroke={secondary} strokeWidth="1.4" markerEnd="url(#ctc-fr-arrow)" />

          {/* 架构层 */}
          <rect x="100" y="188" width="520" height="56" rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y="208" textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>架构层 · 类型系统机制</text>
          <text x={360} y="226" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
            泛型深入（类型参数化 · 协变逆变） ｜ 委托与事件（类型安全回调 · event 封装）
          </text>
          <text x={360} y="240" textAnchor="middle" fontSize="9" fill={secondary}>消除装箱 · 签名检查 · 多播 · Action/Func</text>

          {/* 箭头 */}
          <path d="M 360 248 L 360 256" fill="none" stroke={secondary} strokeWidth="1.4" markerEnd="url(#ctc-fr-arrow)" />

          {/* 地基层（底） */}
          <rect x="60" y="260" width="600" height="56" rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y="280" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>地基层 · 类型系统总览</text>
          <text x={360} y="298" textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
            值类型 vs 引用类型 ｜ 装箱与拆箱 ｜ 可空引用类型 ｜ record struct
          </text>
          <text x={360} y="312" textAnchor="middle" fontSize="9" fill={secondary}>栈 vs 堆 · GC 压力 · 编译时 null 安全</text>

          {/* 三大设计理念 */}
          <line x1="32" y1="332" x2={VIEW_W - 32} y2="332" stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            三大设计理念
          </text>

          <rect x="60" y="360" width="190" height="36" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="155" y="376" textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>类型安全优先</text>
          <text x="155" y="390" textAnchor="middle" fontSize="9" fill={secondary}>编译时捕获错误</text>

          <rect x="265" y="360" width="190" height="36" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="376" textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>多范式融合</text>
          <text x="360" y="390" textAnchor="middle" fontSize="9" fill={secondary}>OOP + 函数式 + 命令式</text>

          <rect x="470" y="360" width="190" height="36" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="565" y="376" textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>性能不妥协</text>
          <text x="565" y="390" textAnchor="middle" fontSize="9" fill={secondary}>安全与速度兼得</text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y="412" textAnchor="middle" fontSize="10" fill={secondary}>
            每个特性建立在前一个基础上 · 因果链不可打乱 · 组合使用发挥全部威力
          </text>

          <defs>
            <marker id="ctc-fr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        十大特性构成四层金字塔：类型系统是地基，泛型与委托是架构，异步与并发是能力，模式匹配/Record/源生成器是表现。三大设计理念贯穿全书。
      </figcaption>
    </figure>
  );
}
