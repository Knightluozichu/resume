/**
 * <HpwMachineInstructionsDiagram>：机器指令图解（指令周期 + 语句展开 + 寻址方式）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwMachineInstructionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="机器指令图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            机器指令：CPU 唯一能执行的语言
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            操作码（做什么） + 操作数（对谁做）
          </text>

          {/* 上半：指令周期四阶段 */}
          <text x="60" y="76" fontSize="13" fontWeight="600" fill="var(--accent)">指令周期（fetch-decode-execute）</text>
          {[
            { x: 60, label: "取指 Fetch", desc: "PC → 地址总线\n从内存读指令到 IR", color: "var(--success)" },
            { x: 220, label: "译码 Decode", desc: "解析操作码/操作数\n产生控制信号", color: "var(--warning)" },
            { x: 380, label: "执行 Execute", desc: "ALU 运算\n或访存读写", color: "var(--accent)" },
            { x: 540, label: "写回 Write-back", desc: "结果写回\n寄存器/内存", color: "var(--danger)" },
          ].map((stage, i) => (
            <g key={stage.label}>
              <rect x={stage.x} y="86" width="140" height="64" rx="6" fill={stage.color} fillOpacity="0.12" stroke={stage.color} strokeWidth="1.2" />
              <text x={stage.x + 70} y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill={stage.color}>{stage.label}</text>
              {stage.desc.split("\n").map((line, j) => (
                <text key={j} x={stage.x + 70} y={124 + j * 14} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{line}</text>
              ))}
              {i < 3 && (
                <text x={stage.x + 150} y="122" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
              )}
            </g>
          ))}
          <text x="370" y="168" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">循环往复，直到程序结束 —— CPU「跑」程序的本质</text>

          {/* 中间：c = a + b 展开成多条指令 */}
          <rect x="50" y="182" width="640" height="160" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="60" y="204" fontSize="13" fontWeight="600" fill="var(--success)">一条 C 语句展开成多条机器指令</text>
          <text x="60" y="222" fontSize="11" fill="var(--text-secondary)">源代码：  c = a + b;</text>
          <text x="250" y="222" fontSize="10" fill="var(--text-tertiary)">（CPU 不能直接对内存里的数做运算，要先入寄存器）</text>

          {[
            { y: 240, asm: "MOV  EAX, [a]", desc: "从内存读 a 到寄存器 EAX", color: "var(--accent)" },
            { y: 260, asm: "MOV  EBX, [b]", desc: "从内存读 b 到寄存器 EBX", color: "var(--accent)" },
            { y: 280, asm: "ADD  EAX, EBX", desc: "ALU 做加法，结果在 EAX", color: "var(--warning)" },
            { y: 300, asm: "MOV  [c], EAX", desc: "把结果写回内存的 c", color: "var(--danger)" },
          ].map((row) => (
            <g key={row.asm}>
              <rect x="70" y={row.y - 2} width="200" height="18" rx="3" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="0.8" />
              <text x="80" y={row.y + 11} fontSize="11" fontFamily="monospace" fill={row.color}>{row.asm}</text>
              <text x="290" y={row.y + 11} fontSize="10" fill="var(--text-secondary)">{row.desc}</text>
            </g>
          ))}
          <text x="60" y="332" fontSize="10" fill="var(--text-tertiary)">少一次内存访问就少约 100 个周期 —— 这就是不同写法性能差异的根源</text>

          {/* 下半：寻址方式 */}
          <text x="60" y="362" fontSize="13" fontWeight="600" fill="var(--warning)">常见寻址方式</text>
          {[
            { x: 60, label: "立即寻址", desc: "MOV EAX, 5" },
            { x: 220, label: "寄存器寻址", desc: "MOV EAX, EBX" },
            { x: 380, label: "直接寻址", desc: "MOV EAX, [0x1000]" },
            { x: 540, label: "间接寻址", desc: "MOV EAX, [EBX]" },
          ].map((m) => (
            <g key={m.label}>
              <rect x={m.x} y="372" width="140" height="44" rx="5" fill="var(--bg-secondary)" stroke="var(--warning)" strokeWidth="1" />
              <text x={m.x + 70} y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">{m.label}</text>
              <text x={m.x + 70} y="406" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">{m.desc}</text>
            </g>
          ))}
          <text x="370" y="436" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">指针底层 = 寄存器间接寻址；数组/结构体成员 = 基址+偏移寻址</text>

          <text x={VIEW_W / 2} y="454" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：高级语句 → 多条机器指令，循环/分支/调用底层都是跳转
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        机器指令——指令周期四阶段、语句展开与寻址方式
      </figcaption>
    </figure>
  );
}
