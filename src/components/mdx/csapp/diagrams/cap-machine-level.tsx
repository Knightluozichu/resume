/**
 * <CapMachineLevelDiagram>：机器级表示图解（寄存器/寻址/栈帧/条件码）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapMachineLevelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="机器级表示图解：寄存器、寻址、栈帧、条件码"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            机器级表示（x86-64）
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            编译器把 C 代码翻译成汇编：寄存器 · 寻址 · 栈帧 · 条件码
          </text>

          {/* 寄存器与调用约定 */}
          <rect x="30" y="64" width="340" height="180" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="200" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">寄存器与调用约定</text>
          <text x="200" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">前6个整数参数 / 返回值</text>
          <rect x="50" y="116" width="300" height="26" rx="4" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="200" y="133" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--success)">参数：%rdi %rsi %rdx %rcx %r8 %r9</text>
          <rect x="50" y="148" width="300" height="26" rx="4" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="200" y="165" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--warning)">返回值：%rax</text>
          <text x="200" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">被调用者保存：调用前后不变</text>
          <rect x="50" y="200" width="300" height="24" rx="4" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="216" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--danger)">%rbx %rbp %r12 %r13 %r14 %r15</text>
          <text x="200" y="236" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">调用者保存：%rax %rcx %rdx %rsi %rdi %r8-%r11</text>

          {/* 寻址与 lea */}
          <rect x="390" y="64" width="320" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="550" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">寻址公式 D(Rb, Ri, S)</text>
          <rect x="410" y="100" width="280" height="30" rx="4" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="550" y="120" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--warning)">Mem[Reg[Rb] + Reg[Ri]*S + D]</text>
          <text x="550" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">S ∈ &#123;1, 2, 4, 8&#125;（比例因子）</text>
          <text x="550" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">lea：算地址但不访存</text>
          <rect x="410" y="176" width="280" height="24" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="192" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--accent)">lea (%rax,%rax,2),%rax → rax*=3</text>
          <text x="550" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">单周期、不影响条件码</text>
          <text x="550" y="230" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">编译器优化算术首选</text>

          {/* 栈帧 */}
          <rect x="30" y="260" width="340" height="160" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="200" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">栈帧（向低地址增长）</text>
          <rect x="80" y="294" width="240" height="22" rx="3" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="309" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--danger)">返回地址（call 压入）</text>
          <rect x="80" y="318" width="240" height="22" rx="3" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="200" y="333" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--warning)">保存的 %rbp（旧栈帧基址）</text>
          <rect x="80" y="342" width="240" height="22" rx="3" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="357" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent)">局部变量区</text>
          <text x="200" y="382" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">序言：push %rbp; mov %rsp,%rbp</text>
          <text x="200" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">结语：leave; ret（恢复+返回）</text>
          <text x="200" y="414" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">递归靠独立栈帧工作，过深则栈溢出</text>

          {/* 条件码与控制流 */}
          <rect x="390" y="260" width="320" height="160" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="550" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">条件码与控制流</text>
          <rect x="410" y="294" width="280" height="26" rx="4" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="311" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--success)">CF ZF SF OF（算术指令隐式设）</text>
          <text x="550" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">cmp 减法只设条件码 · test 与运算只设</text>
          <text x="550" y="354" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">jcc 据条件码跳转 · cmov 条件移动</text>
          <rect x="410" y="366" width="280" height="26" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="383" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--accent)">if/while/for → cmp + jcc</text>
          <text x="550" y="406" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">cmov 把控制依赖转数据依赖，避预测失败</text>

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：汇编是程序员与硬件的通用语，读懂它就能调试与优化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        机器级表示——寄存器调用约定、寻址与 lea、栈帧、条件码控制流
      </figcaption>
    </figure>
  );
}
