/**
 * <CtcTypesOverviewDiagram>：C# 10 类型系统总览。
 *
 * 上半：值类型（栈）vs 引用类型（堆）的内存模型对比。
 * 下半：装箱过程与可空引用类型的编译时检查。
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

export function CtcTypesOverviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 10 类型系统总览。上半展示值类型（栈上直接存储，赋值复制）与引用类型（堆上存储，赋值复制引用）的内存模型对比。下半展示装箱过程（值类型从栈复制到堆）和可空引用类型的编译时检查。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 10 类型系统：值类型与引用类型
          </text>

          {/* === 上半：内存模型对比 === */}
          <text x={180} y={58} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            值类型（栈）
          </text>
          <text x={540} y={58} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            引用类型（堆）
          </text>

          {/* 值类型：栈上独立副本 */}
          <rect x={50} y={72} width={260} height={100} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={180} y={92} textAnchor="middle" fontSize="11" fontWeight="600" fill={success} fontFamily="monospace">
            int a = 42; int b = a;
          </text>
          {/* 栈格子 */}
          <rect x={70} y={100} width={100} height="28" rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={120} y={118} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">a = 42</text>
          <rect x={190} y={100} width={100} height="28" rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={240} y={118} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">b = 42</text>
          <text x={180} y={148} textAnchor="middle" fontSize="11" fill={secondary}>独立副本 · 修改 b 不影响 a</text>

          {/* 引用类型：堆上共享引用 */}
          <rect x={410} y={72} width={260} height={100} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={540} y={92} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
            var p2 = p1; (class Person)
          </text>
          {/* 引用变量 */}
          <rect x={430} y={100} width={80} height="28" rx="4" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x={470} y={118} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">p1 →</text>
          <rect x={520} y={100} width={80} height="28" rx="4" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x={560} y={118} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">p2 →</text>
          {/* 堆对象 */}
          <rect x={430} y={138} width={200} height="22" rx="4" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" />
          <text x={530} y={153} textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">堆: Person("Alice")</text>
          <text x={540} y={166} textAnchor="middle" fontSize="11" fill={secondary}>共享引用 · 修改 p2 影响 p1</text>

          {/* 分隔线 */}
          <line x1={32} y1={188} x2={VIEW_W - 32} y2={188} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 下半：装箱与可空 === */}
          <text x={180} y={212} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            装箱（Boxing）
          </text>
          <text x={540} y={212} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
            可空引用类型（NRT）
          </text>

          {/* 装箱过程 */}
          <rect x={50} y={226} width={260} height={130} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          {/* 栈：int */}
          <rect x={70} y={240} width={80} height="26" rx="4" fill={elevated} stroke={warning} strokeWidth="1" />
          <text x={110} y={257} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">int 42</text>
          <text x={110} y={278} textAnchor="middle" fontSize="10" fill={secondary}>栈</text>
          {/* 箭头 */}
          <path d="M 150 253 L 210 253" fill="none" stroke={warning} strokeWidth="1.4" markerEnd="url(#ctc-to-warn)" />
          <text x={180} y={248} textAnchor="middle" fontSize="10" fill={warning}>装箱</text>
          {/* 堆：object */}
          <rect x={210} y={240} width={80} height="26" rx="4" fill={warning} fillOpacity="0.12" stroke={warning} strokeWidth="1" />
          <text x={250} y={257} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">object</text>
          <text x={250} y={278} textAnchor="middle" fontSize="10" fill={secondary}>堆</text>
          <text x={180} y={300} textAnchor="middle" fontSize="11" fill={secondary}>堆分配 + 数据复制</text>
          <text x={180} y={316} textAnchor="middle" fontSize="11" fill={secondary}>频繁装箱 → GC 压力</text>
          <text x={180} y={340} textAnchor="middle" fontSize="11" fontWeight="600" fill={success} fontFamily="monospace">
            {"List<int> 零装箱"}
          </text>

          {/* 可空引用类型 */}
          <rect x={410} y={226} width={260} height={130} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={540} y={246} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger} fontFamily="monospace">
            {"string name = null;"}
          </text>
          <text x={540} y={262} textAnchor="middle" fontSize="10" fill={danger}>
            编译警告！string 不可空
          </text>
          <rect x={430} y={272} width={220} height="22" rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={540} y={287} textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">
            {"string? name = null;  ✓"}
          </text>
          <text x={540} y={308} textAnchor="middle" fontSize="11" fill={secondary}>编译时流分析追踪 null 状态</text>
          <text x={540} y={324} textAnchor="middle" fontSize="11" fill={secondary}>解引用前必须检查 null</text>
          <text x={540} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>
            运行时无区别 · 纯编译时检查
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={372} x2={VIEW_W - 32} y2={372} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="11" fill={secondary}>
            值类型栈上复制 · 引用类型堆上共享 · 装箱是值→堆的开销 · 泛型消除装箱
          </text>
          <text x={VIEW_W / 2} y={408} textAnchor="middle" fontSize="11" fill={secondary}>
            可空引用类型是编译时安全特性 · record struct 是值类型 + 值语义
          </text>

          <defs>
            <marker id="ctc-to-warn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值类型在栈上独立存储，引用类型在堆上共享引用。装箱将值类型复制到堆上产生 GC 开销，泛型消除装箱。可空引用类型在编译时追踪 null 状态。
      </figcaption>
    </figure>
  );
}
