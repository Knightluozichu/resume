/**
 * <UcnCppServerBaseDiagram>：C++ 服务器基础——epoll/IOCP 事件驱动模型图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UcnCppServerBaseDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 服务器基础 epoll 与 IOCP 事件驱动模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            epoll vs IOCP：两种事件驱动 I/O 模型
          </text>

          {/* 左半：epoll (Linux) */}
          <rect x="30" y="50" width="330" height="370" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">epoll（Linux）</text>
          <text x="195" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Reactor 模式 · 边沿/水平触发</text>

          <rect x="55" y="105" width="280" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. epoll_create() 创建内核事件表</text>
          <text x="195" y="137" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每个 fd 注册 EPOLLIN / EPOLLOUT 事件</text>

          <text x="195" y="162" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="55" y="170" width="280" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="187" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">2. epoll_wait() 阻塞等待就绪事件</text>
          <text x="195" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回就绪 fd 列表（O(1) 复杂度）</text>

          <text x="195" y="227" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="55" y="235" width="280" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">3. 遍历就绪 fd，执行 read/write</text>
          <text x="195" y="267" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">非阻塞 I/O · 业务逻辑回调</text>

          <text x="195" y="292" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="55" y="300" width="280" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="317" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">4. 回到 epoll_wait() 继续循环</text>
          <text x="195" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">事件循环（Event Loop）</text>

          <text x="195" y="365" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">特点：同步非阻塞 · 就绪通知 · 适合海量连接</text>
          <text x="195" y="382" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">LT 水平触发：只要可读就通知</text>
          <text x="195" y="399" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">ET 边沿触发：状态变化时通知一次（需读到 EAGAIN）</text>

          {/* 右半：IOCP (Windows) */}
          <rect x="380" y="50" width="330" height="370" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">IOCP（Windows）</text>
          <text x="545" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Proactor 模式 · 完成通知</text>

          <rect x="405" y="105" width="280" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">1. CreateIoCompletionPort() 关联</text>
          <text x="545" y="137" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Socket 与完成端口绑定</text>

          <text x="545" y="162" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="405" y="170" width="280" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="187" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2. WSARecv() 发起异步读（投递</text>
          <text x="545" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">立即返回 · 内核负责完成 I/O</text>

          <text x="545" y="227" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="405" y="235" width="280" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">3. GetQueuedCompletionStatus() 取回</text>
          <text x="545" y="267" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">I/O 已完成 · 数据已在缓冲区</text>

          <text x="545" y="292" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="405" y="300" width="280" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="317" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">4. 处理数据 → 再次投递 WSARecv</text>
          <text x="545" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">工作线程池从完成端口取任务</text>

          <text x="545" y="365" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">特点：异步完成 · 内核负责实际 I/O</text>
          <text x="545" y="382" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">数据拷贝由内核完成，通知时数据就绪</text>
          <text x="545" y="399" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">线程池按 CPU 核心数配置，避免上下文切换</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        epoll（Reactor 同步就绪通知）与 IOCP（Proactor 异步完成通知）的对比——Linux 与 Windows 服务器 I/O 模型的核心差异
      </figcaption>
    </figure>
  );
}
