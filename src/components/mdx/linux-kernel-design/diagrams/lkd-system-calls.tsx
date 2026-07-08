/**
 * <LkdSystemCallsDiagram>：系统调用执行全流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdSystemCallsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="系统调用执行全流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            系统调用执行全流程——从用户态到内核态
          </text>

          {/* 用户态区域 */}
          <rect x="30" y="46" width="680" height="90" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="50" y="66" fontSize="11" fontWeight="600" fill="var(--success)">用户态（Ring 3）</text>

          <rect x="50" y="76" width="180" height="48" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="94" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">用户程序</text>
          <text x="140" y="110" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">read(fd, buf, 4096)</text>

          <rect x="250" y="76" width="180" height="48" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="340" y="94" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">libc 包装函数</text>
          <text x="340" y="110" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">rax=__NR_read</text>
          <text x="340" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">rdi=fd, rsi=buf, rdx=n</text>

          <rect x="450" y="76" width="240" height="48" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="570" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--warning)">syscall 指令</text>
          <text x="570" y="110" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU切换到 Ring 0</text>
          <text x="570" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">跳转 entry_SYSCALL_64</text>

          {/* 箭头 */}
          <line x1="230" y1="100" x2="248" y2="100" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr2)" />
          <line x1="430" y1="100" x2="448" y2="100" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr2)" />

          {/* 特权级切换分界线 */}
          <line x1="30" y1="148" x2="710" y2="148" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="6,3" />
          <text x="370" y="142" textAnchor="middle" fontSize="9" fill="var(--warning)">--- 特权级切换 / 栈切换 / 上下文保存 ---</text>

          {/* 内核态区域 */}
          <rect x="30" y="156" width="680" height="250" rx="8" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="50" y="176" fontSize="11" fontWeight="600" fill="var(--danger)">内核态（Ring 0）</text>

          {/* 内核步骤 */}
          <rect x="50" y="188" width="190" height="52" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="145" y="206" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">entry_SYSCALL_64</text>
          <text x="145" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">保存上下文到 pt_regs</text>
          <text x="145" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">切换到内核栈</text>

          <rect x="260" y="188" width="190" height="52" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="355" y="206" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">查 sys_call_table</text>
          <text x="355" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">rax = 系统调用号</text>
          <text x="355" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ sys_read 函数指针</text>

          <rect x="470" y="188" width="220" height="52" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="580" y="206" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">参数校验</text>
          <text x="580" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">access_ok(buf)</text>
          <text x="580" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">copy_from_user 安全拷贝</text>

          <line x1="240" y1="214" x2="258" y2="214" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr2)" />
          <line x1="450" y1="214" x2="468" y2="214" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr2)" />

          {/* sys_read 执行 */}
          <rect x="50" y="252" width="640" height="60" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">sys_read 核心逻辑</text>
          <text x="370" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fd → file → file.f_op-&gt;read_iter → VFS路由到具体文件系统</text>
          <text x="370" y="302" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Page Cache命中? copy_to_user返回 : 提交I/O, 进程睡眠等待中断唤醒</text>

          {/* 返回路径 */}
          <rect x="50" y="324" width="300" height="60" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="344" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">返回值放入 rax</text>
          <text x="200" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">sysret / iret 指令</text>
          <text x="200" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">恢复用户态上下文</text>

          <rect x="370" y="324" width="320" height="60" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="530" y="344" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">libc 从 rax 取返回值</text>
          <text x="530" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">返回给用户程序</text>
          <text x="530" y="374" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">用户程序继续执行（read返回字节数）</text>

          <line x1="350" y1="354" x2="368" y2="354" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr2)" />

          {/* 底部安全提示 */}
          <rect x="30" y="420" width="680" height="60" rx="6" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="50" y="440" fontSize="10" fontWeight="600" fill="var(--text-primary)">安全要点: 内核绝不直接解引用用户指针</text>
          <text x="50" y="456" fontSize="9" fill="var(--text-secondary)">copy_from_user/copy_to_user 内部处理缺页（异常表修复）; SMAP阻止内核直接访问用户内存</text>
          <text x="50" y="470" fontSize="9" fill="var(--text-tertiary)">系统调用是用户程序进入内核的唯一合法入口, 是安全边界的守护者</text>

          <defs>
            <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        系统调用全流程——用户态syscall指令触发特权级切换，内核保存上下文、查表分发、校验参数、执行后返回
      </figcaption>
    </figure>
  );
}
