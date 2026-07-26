/**
 * <DujCompileOptimizeDiagram>：JIT编译优化与逃逸分析图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DujCompileOptimizeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JIT编译优化与逃逸分析图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            编译优化：分层编译 + 逃逸分析
          </text>

          {/* 上半：分层编译 */}
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">分层编译（Tiered Compilation）</text>

          <rect x="30" y="62" width="160" height="56" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="110" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">第 0 层</text>
          <text x="110" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">解释执行</text>
          <text x="110" y="114" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">采集 profile</text>

          <text x="200" y="94" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="215" y="62" width="160" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="295" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">第 1-3 层</text>
          <text x="295" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">C1 编译 + 优化</text>
          <text x="295" y="114" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">带 profiling</text>

          <text x="385" y="94" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="400" y="62" width="160" height="56" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="480" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">第 4 层</text>
          <text x="480" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">C2 编译</text>
          <text x="480" y="114" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">激进优化</text>

          <text x="570" y="94" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="585" y="62" width="125" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="647" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">逆优化</text>
          <text x="647" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">乐观假设失败</text>
          <text x="647" y="114" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">回退重编译</text>

          {/* 中间：核心优化技术 */}
          <text x={VIEW_W / 2} y="152" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">C2 核心优化技术</text>

          <rect x="30" y="164" width="215" height="72" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="137" y="184" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">方法内联（Inlining）</text>
          <text x="137" y="200" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">把目标方法代码复制到调用处</text>
          <text x="137" y="214" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">消除方法调用开销</text>
          <text x="137" y="228" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">为其他优化铺路</text>

          <rect x="262" y="164" width="215" height="72" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="369" y="184" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">循环展开</text>
          <text x="369" y="200" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少循环次数</text>
          <text x="369" y="214" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少分支预测失败</text>
          <text x="369" y="228" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">利于向量化</text>

          <rect x="494" y="164" width="215" height="72" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="601" y="184" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">锁消除 / 锁粗化</text>
          <text x="601" y="200" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">逃逸分析证明无竞争 → 消除</text>
          <text x="601" y="214" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">相邻同步块 → 合并粗化</text>
          <text x="601" y="228" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少 monitorenter/exit</text>

          {/* 下半：逃逸分析 */}
          <text x={VIEW_W / 2} y="264" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">逃逸分析（Escape Analysis）— 对象是否逃逸出方法/线程</text>

          <rect x="30" y="276" width="215" height="88" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="137" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">未逃逸（NoEscape）</text>
          <text x="137" y="314" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">对象仅在方法内使用</text>
          <text x="137" y="330" textAnchor="middle" fontSize="11" fill="var(--danger)">→ 标量替换</text>
          <text x="137" y="346" textAnchor="middle" fontSize="11" fill="var(--danger)">→ 栈上分配</text>
          <text x="137" y="360" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无需堆分配，无 GC</text>

          <rect x="262" y="276" width="215" height="88" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="369" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">方法逃逸（ArgEscape）</text>
          <text x="369" y="314" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">对象被作为参数传递</text>
          <text x="369" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">或被外部方法引用</text>
          <text x="369" y="346" textAnchor="middle" fontSize="11" fill="var(--danger)">→ 堆分配</text>
          <text x="369" y="360" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">但可做部分优化</text>

          <rect x="494" y="276" width="215" height="88" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="601" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">线程逃逸（GlobalEscape）</text>
          <text x="601" y="314" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">对象被其他线程访问</text>
          <text x="601" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">如赋值给静态字段</text>
          <text x="601" y="346" textAnchor="middle" fontSize="11" fill="var(--danger)">→ 堆分配</text>
          <text x="601" y="360" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">需考虑线程安全</text>

          {/* 标量替换说明 */}
          <rect x="30" y="384" width="680" height="80" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="404" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">标量替换（Scalar Replacement）</text>
          <text x="370" y="422" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">将未逃逸的聚合对象拆解为成员变量（标量），分散到寄存器/栈帧</text>
          <text x="370" y="438" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">效果：减少堆分配 → 降低 GC 压力；对象无需真正创建</text>
          <text x="370" y="456" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">-XX:+DoEscapeAnalysis（JDK 8 默认开启）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JIT分层编译（C1→C2）与逃逸分析驱动的标量替换、栈上分配、锁消除优化机制
      </figcaption>
    </figure>
  );
}
