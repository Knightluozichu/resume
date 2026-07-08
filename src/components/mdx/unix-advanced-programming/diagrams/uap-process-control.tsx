/**
 * <UapProcessControlDiagram>：进程控制生命周期图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function UapProcessControlDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="进程控制生命周期图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            进程控制——fork/exec/wait 生命周期
          </text>

          {/* 父进程 */}
          <rect x="30" y="48" width="300" height="80" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="180" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">父进程（运行中）</text>
          <text x="180" y="86" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">pid = getpid()</text>
          <text x="180" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ppid = getppid()</text>
          <text x="180" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">调用 fork()</text>

          {/* fork 分叉 */}
          <line x1="180" y1="128" x2="180" y2="150" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="120" y1="150" x2="600" y2="150" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="120" y1="150" x2="120" y2="172" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="600" y1="150" x2="600" y2="172" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="100" y="165" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回 pid &gt; 0</text>
          <text x="620" y="165" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回 0</text>

          {/* 父进程继续 */}
          <rect x="30" y="172" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="120" y="192" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">父进程继续</text>
          <text x="120" y="208" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">pid = 子进程ID</text>
          <text x="120" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可继续其他工作</text>

          {/* 子进程 */}
          <rect x="510" y="172" width="180" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="192" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">子进程（副本）</text>
          <text x="600" y="208" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">COW复制地址空间</text>
          <text x="600" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">继承文件描述符表</text>

          <text x="600" y="246" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* exec */}
          <rect x="490" y="256" width="220" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="276" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">execve(newprog, ...)</text>
          <text x="600" y="292" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">替换代码段和数据段</text>
          <text x="600" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PID不变, 代码全新</text>

          <text x="600" y="330" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 子进程运行 */}
          <rect x="490" y="340" width="220" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">新程序运行</text>
          <text x="600" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">执行新代码直到 exit()</text>

          <text x="600" y="404" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* exit */}
          <rect x="490" y="414" width="220" height="40" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="600" y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">exit(status)</text>
          <text x="600" y="446" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">变僵尸(Zombie), 等待回收</text>

          {/* 父进程 wait */}
          <rect x="30" y="256" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="120" y="276" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">父进程调用</text>
          <text x="120" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">wait/waitpid</text>
          <text x="120" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">阻塞直到子进程结束</text>

          <line x1="210" y1="284" x2="490" y2="284" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="350" y="280" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">等待子进程终止</text>

          <text x="120" y="334" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="30" y="344" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="120" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">waitpid 返回</text>
          <text x="120" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">获得子进程退出状态</text>
          <text x="120" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">WIFEXITED/WEXITSTATUS</text>

          <text x="120" y="418" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="30" y="428" width="180" height="40" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="120" y="446" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">内核回收子进程</text>
          <text x="120" y="460" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">task_struct 释放</text>

          {/* 竞态提示 */}
          <rect x="260" y="452" width="200" height="28" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="360" y="470" textAnchor="middle" fontSize="10" fill="var(--danger)">竞态: fork后执行顺序不确定</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        进程控制：fork创建副本，exec替换程序，exit变僵尸，waitpid回收——父进程全生命周期管理
      </figcaption>
    </figure>
  );
}
