/**
 * <CapExceptionalControlDiagram>：异常控制流图解（异常四类/进程切换/fork-exec/信号）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapExceptionalControlDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="异常控制流图解：异常四类、进程上下文切换、fork/exec/wait、信号机制"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            异常控制流（ECF）
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            异常四类 · 进程与上下文切换 · fork/exec/wait · 信号机制
          </text>

          {/* 异常四类 */}
          <text x={VIEW_W / 2} y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">异常四类（CPU 查异常表跳处理程序）</text>
          <rect x="30" y="86" width="165" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="112" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">中断 interrupt</text>
          <text x="112" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">异步·外部硬件</text>
          <text x="112" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">定时器/网卡/键盘</text>
          <text x="112" y="160" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">返回下一条指令</text>
          <text x="112" y="176" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">对程序透明</text>

          <rect x="205" y="86" width="165" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="287" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">陷阱 trap</text>
          <text x="287" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">同步·有意</text>
          <text x="287" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">syscall 指令</text>
          <text x="287" y="160" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">返回下一条指令</text>
          <text x="287" y="176" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">系统调用机制</text>

          <rect x="380" y="86" width="165" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="462" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">故障 fault</text>
          <text x="462" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">同步·无意可恢复</text>
          <text x="462" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">缺页/除零</text>
          <text x="462" y="160" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">可修复→重执行</text>
          <text x="462" y="176" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不可修→终止进程</text>

          <rect x="555" y="86" width="155" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="632" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">终止 abort</text>
          <text x="632" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可恢复</text>
          <text x="632" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">硬件错误</text>
          <text x="632" y="160" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">直接杀进程</text>
          <text x="632" y="176" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不返回</text>

          {/* 进程与上下文切换 */}
          <rect x="30" y="202" width="335" height="140" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="197" y="224" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">进程与上下文切换</text>
          <text x="197" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">两个抽象：</text>
          <rect x="50" y="252" width="140" height="22" rx="4" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="267" textAnchor="middle" fontSize="10" fill="var(--success)">逻辑控制流（独占CPU）</text>
          <rect x="200" y="252" width="140" height="22" rx="4" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="270" y="267" textAnchor="middle" fontSize="10" fill="var(--success)">私有地址空间（独占内存）</text>
          <text x="197" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">上下文切换：</text>
          <text x="197" y="308" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">保存寄存器/PC/栈指针到 PCB</text>
          <text x="197" y="324" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">加载下一进程上下文跳转</text>
          <text x="197" y="338" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">定时器中断抢占/主动让出·切换是纯开销</text>

          {/* fork/exec/wait */}
          <rect x="380" y="202" width="330" height="140" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="224" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">fork / exec / wait 三件套</text>
          <rect x="400" y="236" width="290" height="22" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="251" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--danger)">fork()：复制映像，父返PID/子返0</text>
          <rect x="400" y="262" width="290" height="22" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="277" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent)">execve()：换程序，PID 不变</text>
          <rect x="400" y="288" width="290" height="22" rx="4" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="303" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--success)">wait()：父等子结束回收资源</text>
          <text x="545" y="324" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">僵尸进程：子结束父未wait，PCB残留</text>
          <text x="545" y="338" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">fork+exec 启动新程序的经典模式</text>

          {/* 信号机制 */}
          <rect x="30" y="356" width="680" height="76" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="378" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">信号：异步通知机制</text>
          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">发送（kill/内核事件）→ 接收（返回用户态检查）→ 处理（默认动作或自定义 handler）</text>
          <text x={VIEW_W / 2} y="416" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">陷阱：handler 须异步信号安全（禁 printf/malloc）· 同类不排队 · 全局变量用 volatile sig_atomic_t</text>
          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：ECF 是操作系统的根基——系统调用、进程切换、信号、缺页都基于它
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异常控制流——异常四类、进程上下文切换、fork/exec/wait、信号机制
      </figcaption>
    </figure>
  );
}
