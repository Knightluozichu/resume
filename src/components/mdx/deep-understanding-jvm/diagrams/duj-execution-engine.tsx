/**
 * <DujExecutionEngineDiagram>：JVM执行引擎与栈帧结构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DujExecutionEngineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM执行引擎与栈帧结构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JVM执行引擎：解释执行 + JIT 编译
          </text>

          {/* 上半：执行引擎架构 */}
          <rect x="30" y="46" width="680" height="160" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="50" y="60" width="140" height="56" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">字节码</text>
          <text x="120" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">.class 文件</text>

          <text x="205" y="92" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="225" y="60" width="140" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="295" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">解释器</text>
          <text x="295" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">逐条解释执行</text>

          <text x="380" y="92" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="400" y="60" width="140" height="56" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="470" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">JIT 编译器</text>
          <text x="470" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">热点代码 → 本地代码</text>

          <text x="555" y="92" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="575" y="60" width="120" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="635" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">机器码</text>
          <text x="635" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU 直接执行</text>

          <rect x="50" y="130" width="310" height="60" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="205" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">C1 编译器（Client）</text>
          <text x="205" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">快速编译，简单优化</text>
          <text x="205" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">方法内联 / 简单去虚拟化</text>

          <rect x="380" y="130" width="310" height="60" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="535" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">C2 编译器（Server）</text>
          <text x="535" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">耗时编译，激进优化</text>
          <text x="535" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">逃逸分析 / 锁消除 / 循环展开</text>

          {/* 中间：热点探测 */}
          <rect x="200" y="222" width="340" height="44" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="242" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">热点探测（Hot Spot Detection）</text>
          <text x="370" y="258" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">方法调用计数器 + 回边计数器 → 触发 JIT</text>

          {/* 下半：栈帧结构 */}
          <text x={VIEW_W / 2} y="292" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">栈帧结构（Stack Frame）</text>

          <rect x="180" y="304" width="380" height="160" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />

          <rect x="200" y="316" width="340" height="32" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">局部变量表（Local Variable Table）</text>

          <rect x="200" y="354" width="340" height="32" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="374" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">操作数栈（Operand Stack）</text>

          <rect x="200" y="392" width="340" height="32" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">动态链接（Dynamic Linking）— 运行时常量池引用</text>

          <rect x="200" y="430" width="340" height="28" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="448" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">方法返回地址（Return Address）— 正常/异常返回</text>

          <text x={VIEW_W / 2} y="470" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">一个方法调用 = 一个栈帧入栈；方法返回 = 栈帧出栈</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM执行引擎——解释器与JIT编译器协同工作，栈帧含局部变量表、操作数栈、动态链接、返回地址四部分
      </figcaption>
    </figure>
  );
}
