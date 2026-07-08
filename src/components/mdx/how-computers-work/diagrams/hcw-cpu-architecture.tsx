/**
 * <HcwCpuArchitectureDiagram>：CPU 架构图解——组成、指令周期与流水线。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwCpuArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CPU 架构图解——组成、指令周期与流水线"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CPU 架构：组成、指令周期与流水线
          </text>

          {/* 左侧：CPU 组成 */}
          <text x="180" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">CPU 内部组成</text>
          <rect x="40" y="66" width="280" height="180" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* ALU */}
          <rect x="60" y="82" width="110" height="40" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">运算器 ALU</text>
          <text x="115" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">算术/逻辑运算</text>

          {/* 控制器 */}
          <rect x="190" y="82" width="110" height="40" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="245" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">控制器 CU</text>
          <text x="245" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">取指/译码/控制信号</text>

          {/* 寄存器 */}
          <rect x="60" y="134" width="110" height="40" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="115" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">寄存器组</text>
          <text x="115" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PC/IR/通用寄存器</text>

          {/* 时钟 */}
          <rect x="190" y="134" width="110" height="40" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="245" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">时钟 Clock</text>
          <text x="245" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">节拍信号驱动</text>

          {/* 内部总线 */}
          <line x1="60" y1="195" x2="300" y2="195" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="180" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内部总线（数据/地址/控制）</text>
          <text x="180" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">ALU 管算 · CU 管指挥 · 寄存器管暂存 · 时钟管节奏</text>

          {/* 右侧：指令周期 */}
          <text x="555" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">指令周期（Fetch-Decode-Execute）</text>
          <rect x="380" y="66" width="330" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 取指 */}
          <rect x="400" y="80" width="130" height="36" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.1" />
          <text x="465" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">① 取指 Fetch</text>
          <text x="465" y="111" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PC→地址总线，读指令→IR</text>

          {/* 译码 */}
          <rect x="560" y="80" width="130" height="36" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="625" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">② 译码 Decode</text>
          <text x="625" y="111" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">解析操作码+操作数</text>

          {/* 执行 */}
          <rect x="400" y="130" width="130" height="36" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="465" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">③ 执行 Execute</text>
          <text x="465" y="161" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ALU 运算 / 访存读写</text>

          {/* 写回 */}
          <rect x="560" y="130" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="625" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">④ 写回 Write-back</text>
          <text x="625" y="161" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">结果→寄存器/内存</text>

          {/* 循环箭头 */}
          <path d="M 625 166 L 625 176 L 465 176 L 465 80" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="545" y="190" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">循环往复直到程序结束</text>
          <text x="545" y="208" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PC+1 指向下一条指令</text>
          <text x="545" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">这就是 CPU「跑」程序的本质</text>

          {/* 底部：流水线 */}
          <text x={VIEW_W / 2} y="276" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">流水线（Pipeline）：多条指令不同阶段同时进行</text>

          {/* 流水线表格 */}
          {["取指", "译码", "执行", "访存", "写回"].map((stage, i) => (
            <text key={stage} x={120 + i * 120} y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">{stage}</text>
          ))}

          {/* 指令 1 */}
          <text x="60" y="318" textAnchor="middle" fontSize="10" fill="var(--success)">指令1</text>
          {["var(--success)", "var(--success)", "var(--success)", "var(--success)", "var(--success)"].map((c, i) => (
            <rect key={i} x={80 + i * 120} y="308" width="80" height="20" rx="4" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="0.8" />
          ))}
          {/* 指令 2 */}
          <text x="60" y="346" textAnchor="middle" fontSize="10" fill="var(--warning)">指令2</text>
          {["var(--text-tertiary)", "var(--warning)", "var(--warning)", "var(--warning)", "var(--warning)"].map((c, i) => (
            <rect key={i} x={80 + i * 120} y="336" width="80" height="20" rx="4" fill={i === 0 ? "none" : c} fillOpacity={i === 0 ? "0" : "0.15"} stroke={c} strokeWidth="0.8" strokeDasharray={i === 0 ? "3 2" : "none"} />
          ))}
          {/* 指令 3 */}
          <text x="60" y="374" textAnchor="middle" fontSize="10" fill="var(--danger)">指令3</text>
          {["var(--text-tertiary)", "var(--text-tertiary)", "var(--danger)", "var(--danger)", "var(--danger)"].map((c, i) => (
            <rect key={i} x={80 + i * 120} y="364" width="80" height="20" rx="4" fill={i < 2 ? "none" : c} fillOpacity={i < 2 ? "0" : "0.15"} stroke={c} strokeWidth="0.8" strokeDasharray={i < 2 ? "3 2" : "none"} />
          ))}

          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            理想 5 级流水线 → 5 倍吞吐量 | 冒险：数据依赖 · 分支跳转 · 资源争用
          </text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            寄存器：0-1 周期访问 | 内存：100-300 周期访问 → 先加载到寄存器再运算
          </text>
          <text x={VIEW_W / 2} y="444" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">
            关键洞察：CPU = 运算器 + 控制器 + 寄存器 + 时钟，指令周期循环驱动程序执行
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CPU 架构图解——四大组成、指令周期四阶段、五级流水线并行执行
      </figcaption>
    </figure>
  );
}
