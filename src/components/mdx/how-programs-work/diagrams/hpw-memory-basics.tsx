/**
 * <HpwMemoryBasicsDiagram>：程序内存布局图解（代码段/数据段/BSS/堆/栈）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwMemoryBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="程序内存布局图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            程序的内存布局
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从低地址到高地址：代码段 → 数据段 → BSS → 堆 → 栈
          </text>

          {/* 左侧：内存条带（地址从低到高） */}
          {/* 代码段 */}
          <rect x="60" y="68" width="300" height="48" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="90" fontSize="13" fontWeight="600" fill="var(--success)">代码段（Text）</text>
          <text x="80" y="106" fontSize="10" fill="var(--text-secondary)">编译后的机器指令，只读可共享</text>
          <text x="340" y="96" textAnchor="end" fontSize="10" fill="var(--text-tertiary)">低地址 0x0804... &uarr;</text>

          {/* 数据段 */}
          <rect x="60" y="122" width="300" height="48" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="80" y="144" fontSize="13" fontWeight="600" fill="var(--accent)">数据段（Data）</text>
          <text x="80" y="160" fontSize="10" fill="var(--text-secondary)">已初始化全局/静态变量，可读写</text>

          {/* BSS 段 */}
          <rect x="60" y="176" width="300" height="48" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="80" y="198" fontSize="13" fontWeight="600" fill="var(--warning)">BSS 段</text>
          <text x="80" y="214" fontSize="10" fill="var(--text-secondary)">未初始化全局/静态变量，加载时清零</text>

          {/* 堆 */}
          <rect x="60" y="230" width="300" height="56" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="80" y="252" fontSize="13" fontWeight="600" fill="var(--danger)">堆（Heap）</text>
          <text x="80" y="268" fontSize="10" fill="var(--text-secondary)">malloc/new 动态分配</text>
          <text x="80" y="280" fontSize="10" fill="var(--text-tertiary)">向高地址增长 &darr;</text>

          {/* 空闲区 */}
          <rect x="60" y="292" width="300" height="40" rx="6" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="210" y="316" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">空闲区（堆栈相向生长）</text>

          {/* 栈 */}
          <rect x="60" y="338" width="300" height="56" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="360" fontSize="13" fontWeight="600" fill="var(--success)">栈（Stack）</text>
          <text x="80" y="376" fontSize="10" fill="var(--text-secondary)">函数栈帧（局部变量/返回地址）</text>
          <text x="80" y="388" fontSize="10" fill="var(--text-tertiary)">向低地址增长 &uarr;</text>
          <text x="340" y="366" textAnchor="end" fontSize="10" fill="var(--text-tertiary)">高地址 &darr;</text>

          {/* 右侧：字节编址示意 */}
          <rect x="400" y="68" width="300" height="326" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="550" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">字节编址与变量映射</text>

          {/* 储物柜示意 */}
          {[
            { y: 110, addr: "0x1000", val: "0x2A", note: "int a = 42（低字节）" },
            { y: 138, addr: "0x1001", val: "0x00", note: "int a（中字节）" },
            { y: 166, addr: "0x1002", val: "0x00", note: "int a（中字节）" },
            { y: 194, addr: "0x1003", val: "0x00", note: "int a（高字节）" },
            { y: 230, addr: "0x1004", val: "0x41", note: "char c = 'A'" },
          ].map((row) => (
            <g key={row.addr}>
              <rect x="420" y={row.y} width="80" height="24" rx="4" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="1" />
              <text x="460" y={row.y + 16} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{row.val}</text>
              <text x="515" y={row.y + 16} fontSize="10" fill="var(--text-tertiary)">{row.addr}</text>
              <text x="565" y={row.y + 16} fontSize="10" fill="var(--text-secondary)">{row.note}</text>
            </g>
          ))}

          <text x="550" y="282" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            小端序：42 = 0x0000002A
          </text>
          <text x="550" y="300" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            低字节 0x2A 存在低地址 0x1000
          </text>

          {/* 虚拟地址说明 */}
          <rect x="420" y="318" width="260" height="64" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">虚拟地址</text>
          <text x="550" y="354" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MMU 通过页表翻译</text>
          <text x="550" y="368" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">提供隔离 / 保护 / 扩展</text>

          <text x={VIEW_W / 2} y="430" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：变量名是地址的别名，CPU 只认地址
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        程序内存布局——代码段/数据段/BSS/堆/栈的字节编址与虚拟地址
      </figcaption>
    </figure>
  );
}
