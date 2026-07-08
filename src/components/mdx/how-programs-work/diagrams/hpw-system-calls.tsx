/**
 * <HpwSystemCallsDiagram>：系统调用图解（用户态/内核态 + 调用流程 + 常见调用）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwSystemCallsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="系统调用图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            系统调用：用户态与内核态的受控通道
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            程序不能直接碰硬件，必须经系统调用请内核代办
          </text>

          {/* 用户态区 */}
          <rect x="40" y="68" width="660" height="90" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="60" y="90" fontSize="13" fontWeight="600" fill="var(--success)">用户态（ring 3，低特权）</text>
          <text x="60" y="108" fontSize="10" fill="var(--text-secondary)">不能直接执行特权指令（读写 I/O、改页表、关中断），不能访问内核内存</text>
          <rect x="60" y="118" width="180" height="30" rx="5" fill="var(--bg-secondary)" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="138" textAnchor="middle" fontSize="11" fill="var(--text-primary)">printf / fopen / malloc</text>
          <text x="260" y="138" fontSize="10" fill="var(--text-tertiary)">库函数（用户态封装 + 缓冲）</text>

          {/* 系统调用通道 */}
          <rect x="280" y="166" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.6" />
          <text x="370" y="188" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">系统调用通道</text>
          <text x="370" y="204" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">syscall 指令 / int 0x80</text>
          <text x="370" y="216" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">陷入内核 + 切换栈</text>
          <path d="M 240 133 L 280 180" stroke="var(--accent)" strokeWidth="1.4" fill="none" markerEnd="url(#scArrow)" />
          <path d="M 460 180 L 500 133" stroke="var(--accent)" strokeWidth="1.4" fill="none" markerEnd="url(#scArrow)" />
          <defs>
            <marker id="scArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 内核态区 */}
          <rect x="40" y="232" width="660" height="90" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="60" y="254" fontSize="13" fontWeight="600" fill="var(--danger)">内核态（ring 0，高特权）</text>
          <text x="60" y="272" fontSize="10" fill="var(--text-secondary)">可访问一切硬件和内存，代用户程序执行特权操作后返回</text>
          <rect x="60" y="282" width="180" height="30" rx="5" fill="var(--bg-secondary)" stroke="var(--danger)" strokeWidth="1" />
          <text x="150" y="302" textAnchor="middle" fontSize="11" fill="var(--text-primary)">read / write / fork</text>
          <text x="260" y="302" fontSize="10" fill="var(--text-tertiary)">内核系统调用处理函数</text>

          {/* 调用流程 */}
          <text x="60" y="346" fontSize="13" fontWeight="600" fill="var(--warning)">系统调用执行流程</text>
          {[
            { x: 60, step: "①", desc: "调用号+参数放寄存器" },
            { x: 200, step: "②", desc: "执行 syscall 陷入内核" },
            { x: 360, step: "③", desc: "内核查号执行特权操作" },
            { x: 520, step: "④", desc: "返回值放寄存器，回用户态" },
          ].map((s) => (
            <g key={s.step}>
              <rect x={s.x} y="356" width="150" height="40" rx="5" fill="var(--bg-secondary)" stroke="var(--warning)" strokeWidth="1" />
              <text x={s.x + 10} y="374" fontSize="11" fontWeight="600" fill="var(--warning)">{s.step}</text>
              <text x={s.x + 30} y="374" fontSize="10" fill="var(--text-secondary)">{s.desc.split("，")[0]}</text>
              <text x={s.x + 30} y="388" fontSize="10" fill="var(--text-tertiary)">{s.desc.split("，")[1] ?? ""}</text>
            </g>
          ))}

          <text x={VIEW_W / 2} y="416" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            有上下文切换开销 → printf 带缓冲：攒满再一次 write，把 1000 次调用降到 1 次
          </text>
          <text x={VIEW_W / 2} y="438" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：库函数 = 缓冲 + 系统调用封装，strlen 极快（不陷内核），write 慢得多
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        系统调用——用户态/内核态特权隔离与调用流程
      </figcaption>
    </figure>
  );
}
