/**
 * <UapProcessEnvDiagram>：进程环境与内存布局图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function UapProcessEnvDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="进程环境与内存布局图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            进程环境——内存布局与启动流程
          </text>

          {/* 进程内存布局 */}
          <rect x="30" y="48" width="340" height="410" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="200" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">进程内存空间布局</text>

          <rect x="60" y="80" width="280" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">命令行参数 argv</text>
          <text x="200" y="113" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">argv[0]..argv[argc-1], NULL</text>

          <rect x="60" y="126" width="280" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">环境变量 environ</text>
          <text x="200" y="159" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PATH=/usr/bin HOME=/home/user ...</text>

          <rect x="60" y="172" width="280" height="52" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="200" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">栈（Stack）</text>
          <text x="200" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">局部变量 / 函数帧 / 返回地址</text>
          <text x="200" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">向下增长（高地址 → 低地址）</text>

          <text x="200" y="240" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&darr; &uarr; 空闲空间</text>

          <rect x="60" y="250" width="280" height="52" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="200" y="268" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">堆（Heap）</text>
          <text x="200" y="284" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">malloc / calloc / realloc 分配</text>
          <text x="200" y="296" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">向上增长（低地址 → 高地址）</text>

          <rect x="60" y="308" width="280" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="326" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">未初始化数据段（BSS）</text>
          <text x="200" y="341" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">全局变量初值为0, kernel清零</text>

          <rect x="60" y="354" width="280" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="372" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">初始化数据段（Data）</text>
          <text x="200" y="387" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">已赋初值的全局/静态变量</text>

          <rect x="60" y="400" width="280" height="40" rx="6" fill="var(--text-primary)" fillOpacity="0.1" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="200" y="418" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">正文段（Text）</text>
          <text x="200" y="433" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU执行的机器指令, 只读共享</text>

          {/* 右侧：启动流程 */}
          <rect x="390" y="48" width="320" height="410" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="550" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">进程启动流程</text>

          <rect x="420" y="82" width="260" height="38" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="550" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">execve(path, argv, envp)</text>
          <text x="550" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">内核加载ELF到内存</text>

          <text x="550" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="420" y="142" width="260" height="38" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="550" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">_start（C运行时入口）</text>
          <text x="550" y="174" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">设置栈, 段寄存器</text>

          <text x="550" y="194" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="420" y="202" width="260" height="38" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="550" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">__libc_start_main</text>
          <text x="550" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">调用 atexit 注册, 初始化 libc</text>

          <text x="550" y="254" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="420" y="262" width="260" height="38" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">main(argc, argv, envp)</text>
          <text x="550" y="294" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">用户代码入口</text>

          <text x="550" y="314" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="420" y="322" width="260" height="38" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">用户代码执行</text>
          <text x="550" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">getenv/setenv 操作环境</text>

          <text x="550" y="374" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="420" y="382" width="260" height="38" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="550" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">exit(status)</text>
          <text x="550" y="414" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">调用 atexit → _exit → 内核回收</text>

          <text x="550" y="434" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="420" y="442" width="260" height="14" rx="4" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="550" y="452" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">内核回收资源, SIGCHLD 通知父进程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        进程环境：内存从高到低为argv/environ/栈/堆/BSS/Data/Text，启动从execve经C运行时到main再到exit
      </figcaption>
    </figure>
  );
}
