/**
 * <LkdProcessManagementDiagram>：Linux进程管理与生命周期图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdProcessManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux进程管理与生命周期图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            进程生命周期与task_struct结构
          </text>

          {/* task_struct 结构体 */}
          <rect x="30" y="48" width="240" height="200" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">task_struct</text>
          <text x="45" y="88" fontSize="9" fill="var(--text-secondary)">pid / tgid / uid</text>
          <text x="45" y="103" fontSize="9" fill="var(--text-secondary)">state（运行/睡眠/停止/僵尸）</text>
          <text x="45" y="118" fontSize="9" fill="var(--text-secondary)">mm（地址空间指针）</text>
          <text x="45" y="133" fontSize="9" fill="var(--text-secondary)">fs / files（文件信息）</text>
          <text x="45" y="148" fontSize="9" fill="var(--text-secondary)">signal / pending（信号）</text>
          <text x="45" y="163" fontSize="9" fill="var(--text-secondary)">se（sched_entity）</text>
          <text x="58" y="178" fontSize="9" fill="var(--text-tertiary)">.vruntime（虚拟运行时间）</text>
          <text x="58" y="193" fontSize="9" fill="var(--text-tertiary)">.load（权重）</text>
          <text x="45" y="208" fontSize="9" fill="var(--text-secondary)">parent / children（进程树）</text>
          <text x="45" y="223" fontSize="9" fill="var(--text-secondary)">nsproxy / css_set</text>
          <text x="45" y="238" fontSize="9" fill="var(--text-secondary)">thread（寄存器上下文）</text>

          {/* 生命周期状态图 */}
          <rect x="300" y="48" width="410" height="360" rx="8" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="505" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">进程状态转换</text>

          {/* 运行态 */}
          <rect x="330" y="82" width="120" height="40" rx="20" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1.5" />
          <text x="390" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">TASK_RUNNING</text>
          <text x="390" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">就绪/运行中</text>

          {/* 可中断睡眠 */}
          <rect x="560" y="82" width="120" height="40" rx="20" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="620" y="102" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">INTERRUPTIBLE</text>
          <text x="620" y="115" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可中断睡眠</text>

          {/* 不可中断睡眠 */}
          <rect x="560" y="140" width="120" height="40" rx="20" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="620" y="160" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">UNINTERRUPTIBLE</text>
          <text x="620" y="173" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可中断睡眠</text>

          {/* 停止态 */}
          <rect x="330" y="140" width="120" height="40" rx="20" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="390" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">TASK_STOPPED</text>
          <text x="390" y="173" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">暂停（SIGSTOP）</text>

          {/* 僵尸态 */}
          <rect x="445" y="280" width="120" height="40" rx="20" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="505" y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">EXIT_ZOMBIE</text>
          <text x="505" y="313" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">僵尸态</text>

          {/* 死亡态 */}
          <rect x="445" y="340" width="120" height="40" rx="20" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.5" strokeOpacity="0.5" />
          <text x="505" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">EXIT_DEAD</text>
          <text x="505" y="373" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">已回收</text>

          {/* 转换箭头 */}
          <line x1="450" y1="102" x2="555" y2="102" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr1)" />
          <text x="502" y="96" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">wait/sleep</text>

          <line x1="555" y1="118" x2="450" y2="118" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr1)" />
          <text x="502" y="132" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">唤醒</text>

          <line x1="390" y1="122" x2="390" y2="138" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr1)" />
          <text x="340" y="132" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">SIGSTOP</text>

          <line x1="390" y1="178" x2="390" y2="162" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr1)" />
          <text x="340" y="172" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">SIGCONT</text>

          <line x1="390" y1="122" x2="460" y2="278" stroke="var(--danger)" strokeWidth="1.2" markerEnd="url(#arr1)" />
          <text x="370" y="210" textAnchor="middle" fontSize="8" fill="var(--danger)">exit()</text>

          <line x1="505" y1="320" x2="505" y2="338" stroke="var(--danger)" strokeWidth="1.2" markerEnd="url(#arr1)" />
          <text x="560" y="332" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">父进程wait()</text>

          {/* 箭头标记 */}
          <defs>
            <marker id="arr1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 底部说明 */}
          <rect x="30" y="420" width="680" height="60" rx="6" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="50" y="440" fontSize="10" fontWeight="600" fill="var(--text-primary)">fork() → COW复制 → exec()加载新程序 → 运行 → exit() → 僵尸 → wait()回收</text>
          <text x="50" y="456" fontSize="9" fill="var(--text-secondary)">fork用写时复制避免完整拷贝地址空间；exec替换地址空间加载ELF；exit释放资源变僵尸；wait由父进程回收</text>
          <text x="50" y="470" fontSize="9" fill="var(--text-tertiary)">线程 = 共享mm/files/signal的task_struct（clone系统调用）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linux进程生命周期——task_struct核心字段与状态转换：运行、睡眠、停止、僵尸、死亡
      </figcaption>
    </figure>
  );
}
