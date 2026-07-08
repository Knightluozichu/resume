/**
 * <UapProcessIpcDiagram>：进程间通信机制对比图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function UapProcessIpcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="进程间通信机制对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            进程间通信——IPC 机制全景对比
          </text>

          {/* 管道 */}
          <rect x="30" y="48" width="330" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">管道（Pipe）</text>

          <rect x="50" y="80" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="115" y="103" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">写端 fd[1]</text>

          <text x="195" y="103" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="210" y="80" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="275" y="103" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">读端 fd[0]</text>

          <text x="50" y="132" fontSize="10" fill="var(--text-secondary)">pipe(fd) 半双工, 需有亲缘关系</text>
          <text x="50" y="146" fontSize="10" fill="var(--text-secondary)">popen/pclose 封装版</text>
          <text x="50" y="160" fontSize="10" fill="var(--text-secondary)">FIFO (mkfifo) 可用于无亲缘进程</text>

          {/* 消息队列 */}
          <rect x="380" y="48" width="330" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">消息队列（Message Queue）</text>

          <rect x="400" y="80" width="130" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="465" y="103" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">msgsnd</text>

          <text x="545" y="103" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="560" y="80" width="130" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="625" y="103" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">msgrcv</text>

          <text x="400" y="132" fontSize="10" fill="var(--text-secondary)">有格式消息（type + data）</text>
          <text x="400" y="146" fontSize="10" fill="var(--text-secondary)">可按 type 选择性接收</text>
          <text x="400" y="160" fontSize="10" fill="var(--text-secondary)">内核维护, 随内核持续</text>

          {/* 共享内存 */}
          <rect x="30" y="180" width="330" height="120" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">共享内存（Shared Memory）</text>

          <rect x="50" y="212" width="130" height="36" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="115" y="235" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">进程A映射</text>

          <rect x="210" y="212" width="130" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="275" y="235" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">共享区域</text>

          <text x="50" y="264" fontSize="10" fill="var(--text-secondary)">shmget/shmat/shmdt/shmctl</text>
          <text x="50" y="278" fontSize="10" fill="var(--text-secondary)">最快IPC: 无内核拷贝开销</text>
          <text x="50" y="292" fontSize="10" fill="var(--text-secondary)">需配合信号量/互斥锁同步</text>

          {/* 信号量 */}
          <rect x="380" y="180" width="330" height="120" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">信号量（Semaphore）</text>

          <rect x="400" y="212" width="130" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="465" y="235" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">P操作 wait</text>

          <rect x="560" y="212" width="130" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="625" y="235" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">V操作 post</text>

          <text x="400" y="264" fontSize="10" fill="var(--text-secondary)">semget/semop/semctl</text>
          <text x="400" y="278" fontSize="10" fill="var(--text-secondary)">用于同步而非数据传输</text>
          <text x="400" y="292" fontSize="10" fill="var(--text-secondary)">可计数: 多个资源同时管理</text>

          {/* 套接字 */}
          <rect x="30" y="312" width="330" height="100" rx="10" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="332" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">套接字（Socket）</text>

          <text x="50" y="352" fontSize="10" fill="var(--text-secondary)">socket/bind/listen/accept/connect</text>
          <text x="50" y="366" fontSize="10" fill="var(--text-secondary)">可用于无亲缘进程/跨主机通信</text>
          <text x="50" y="380" fontSize="10" fill="var(--text-secondary)">AF_UNIX 本机, AF_INET 网络</text>
          <text x="50" y="394" fontSize="10" fill="var(--text-secondary)">全双工, 字节流或数据报</text>

          {/* 存储映射 */}
          <rect x="380" y="312" width="330" height="100" rx="10" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="332" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">存储映射I/O（mmap）</text>

          <text x="400" y="352" fontSize="10" fill="var(--text-secondary)">mmap(addr, len, prot, flags, fd, off)</text>
          <text x="400" y="366" fontSize="10" fill="var(--text-secondary)">文件映射到内存, 读写即文件I/O</text>
          <text x="400" y="380" fontSize="10" fill="var(--text-secondary)">MAP_SHARED 共享, 进程间通信</text>
          <text x="400" y="394" fontSize="10" fill="var(--text-secondary)">msync 同步, munmap 解除</text>

          {/* 对比总结 */}
          <rect x="30" y="424" width="680" height="58" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="444" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">IPC 选择原则</text>
          <text x="370" y="462" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">亲缘进程 → 管道  |  格式消息 → 消息队列  |  大数据 → 共享内存+信号量</text>
          <text x="370" y="476" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨主机 → 套接字  |  文件映射 → mmap</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        IPC全景：管道/消息队列/共享内存/信号量/套接字/mmap——按亲缘关系、数据格式、性能需求选择
      </figcaption>
    </figure>
  );
}
