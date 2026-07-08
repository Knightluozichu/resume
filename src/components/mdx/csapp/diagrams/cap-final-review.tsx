/**
 * <CapFinalReviewDiagram>：全书总复习图解（hello 程序的一生八层串联）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习图解：hello 程序的一生串联八层"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            hello 程序的一生：全书八层串联
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            printf("hello\n") 从源码到屏幕，依次穿过八章
          </text>

          {/* 八层流程，左列章右列作用，箭头向下 */}
          {/* 第2章 信息表示 */}
          <rect x="40" y="64" width="60" height="40" rx="6" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="70" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">第2章</text>
          <text x="70" y="96" textAnchor="middle" fontSize="9" fill="var(--warning)">信息表示</text>
          <rect x="110" y="64" width="590" height="40" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="82" fontSize="11" fill="var(--text-secondary)">字符 'h' 'e' 'l' 'l' 'o' '\n' 按 ASCII 编码成字节</text>
          <text x="130" y="98" fontSize="10" fontFamily="monospace" fill="var(--text-tertiary)">0x68 0x65 0x6c 0x6c 0x6f 0x0a</text>
          <text x="100" y="112" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第3章 机器级表示 */}
          <rect x="40" y="116" width="60" height="40" rx="6" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="70" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">第3章</text>
          <text x="70" y="148" textAnchor="middle" fontSize="9" fill="var(--warning)">机器级表示</text>
          <rect x="110" y="116" width="590" height="40" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="134" fontSize="11" fill="var(--text-secondary)">编译器把 printf 调用翻译成汇编</text>
          <text x="130" y="150" fontSize="10" fontFamily="monospace" fill="var(--text-tertiary)">call printf@plt → 机器码 e8 xx xx xx xx</text>
          <text x="100" y="164" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第4章 处理器架构 */}
          <rect x="40" y="168" width="60" height="40" rx="6" fill="var(--accent)" fillOpacity="0.20" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="70" y="186" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">第4章</text>
          <text x="70" y="200" textAnchor="middle" fontSize="9" fill="var(--accent)">处理器架构</text>
          <rect x="110" y="168" width="590" height="40" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="186" fontSize="11" fill="var(--text-secondary)">CPU 流水线取指译码执行 call 指令</text>
          <text x="130" y="202" fontSize="10" fontFamily="monospace" fill="var(--text-tertiary)">IF → ID → EX → MEM → WB，分支预测成功不停顿</text>
          <text x="100" y="216" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第5章 存储器层次 */}
          <rect x="40" y="220" width="60" height="40" rx="6" fill="var(--accent)" fillOpacity="0.20" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="70" y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">第5章</text>
          <text x="70" y="252" textAnchor="middle" fontSize="9" fill="var(--accent)">存储器层次</text>
          <rect x="110" y="220" width="590" height="40" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="238" fontSize="11" fill="var(--text-secondary)">指令和数据命中 L1 缓存（局部性原理）</text>
          <text x="130" y="254" fontSize="10" fontFamily="monospace" fill="var(--text-tertiary)">缓存行 64B 命中，避免访存延迟</text>
          <text x="100" y="268" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第6章 链接加载 */}
          <rect x="40" y="272" width="60" height="40" rx="6" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="70" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">第6章</text>
          <text x="70" y="304" textAnchor="middle" fontSize="9" fill="var(--danger)">链接加载</text>
          <rect x="110" y="272" width="590" height="40" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="290" fontSize="11" fill="var(--text-secondary)">链接器把 hello.o 与 libc.so 动态链接</text>
          <text x="130" y="306" fontSize="10" fontFamily="monospace" fill="var(--text-tertiary)">加载器 execve 把 ELF 映射进内存，跳 _start→main</text>
          <text x="100" y="320" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第7章 异常控制流 */}
          <rect x="40" y="324" width="60" height="40" rx="6" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="70" y="342" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">第7章</text>
          <text x="70" y="356" textAnchor="middle" fontSize="9" fill="var(--danger)">异常控制流</text>
          <rect x="110" y="324" width="590" height="40" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="342" fontSize="11" fill="var(--text-secondary)">printf 内部 syscall 指令触发陷阱异常</text>
          <text x="130" y="358" fontSize="10" fontFamily="monospace" fill="var(--text-tertiary)">陷阱（trap）→ 陷入内核态处理系统调用</text>
          <text x="100" y="372" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第8章 虚拟内存 */}
          <rect x="40" y="376" width="60" height="40" rx="6" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1.2" />
          <text x="70" y="394" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">第8章</text>
          <text x="70" y="408" textAnchor="middle" fontSize="9" fill="var(--success)">虚拟内存</text>
          <rect x="110" y="376" width="590" height="40" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="394" fontSize="11" fill="var(--text-secondary)">内核缓冲区虚拟地址经页表翻译成物理地址</text>
          <text x="130" y="410" fontSize="10" fontFamily="monospace" fill="var(--text-tertiary)">VPN→PFN（TLB 加速）→ 物理地址</text>
          <text x="100" y="424" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第9章 系统级 I/O */}
          <rect x="40" y="428" width="660" height="36" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="70" y="446" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">第9章</text>
          <text x="70" y="460" textAnchor="middle" fontSize="9" fill="var(--success)">系统级I/O</text>
          <text x="130" y="446" fontSize="11" fill="var(--text-secondary)">write(1, buf, 6) 经 fd=1（stdout）把字节写到终端设备文件 → 屏幕显示 hello</text>
          <text x="130" y="460" fontSize="10" fontFamily="monospace" fill="var(--text-tertiary)">一次 printf，八层全部参与——这就是「系统视角」</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——hello 程序的一生串联信息表示、汇编、处理器、存储、链接、异常控制流、虚拟内存、I/O 八层
      </figcaption>
    </figure>
  );
}
