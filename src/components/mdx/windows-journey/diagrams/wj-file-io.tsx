/**
 * <WjFileIoDiagram>：Windows 文件 I/O 体系图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function WjFileIoDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Windows 文件 I/O 体系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Windows 文件 I/O 体系
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            同步 I/O → 异步 I/O → 完成端口（IOCP）
          </text>

          {/* I/O 模型演进 */}
          <rect x="30" y="68" width="210" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="135" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">同步 I/O</text>
          <text x="135" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ReadFile / WriteFile</text>
          <text x="135" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">阻塞直到完成</text>

          <text x="250" y="96" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="265" y="68" width="210" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">异步 I/O（Overlapped）</text>
          <text x="370" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">OVERLAPPED 结构</text>
          <text x="370" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">立即返回，后台完成</text>

          <text x="485" y="96" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="68" width="210" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="605" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">完成端口 IOCP</text>
          <text x="605" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CreateIoCompletionPort</text>
          <text x="605" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">高并发线程池模型</text>

          {/* 文件操作 API */}
          <rect x="30" y="148" width="340" height="160" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">文件操作 API</text>
          <line x1="50" y1="180" x2="350" y2="180" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="50" y="198" fontSize="10" fill="var(--text-secondary)">CreateFile</text>
          <text x="200" y="198" fontSize="10" fill="var(--text-tertiary)">打开/创建（返回 HANDLE）</text>
          <text x="50" y="214" fontSize="10" fill="var(--text-secondary)">ReadFile / WriteFile</text>
          <text x="200" y="214" fontSize="10" fill="var(--text-tertiary)">读/写（同步或异步）</text>
          <text x="50" y="230" fontSize="10" fill="var(--text-secondary)">SetFilePointer</text>
          <text x="200" y="230" fontSize="10" fill="var(--text-tertiary)">移动文件指针</text>
          <text x="50" y="246" fontSize="10" fill="var(--text-secondary)">FlushFileBuffers</text>
          <text x="200" y="246" fontSize="10" fill="var(--text-tertiary)">刷新缓冲区到磁盘</text>
          <text x="50" y="262" fontSize="10" fill="var(--text-secondary)">LockFile / UnlockFile</text>
          <text x="200" y="262" fontSize="10" fill="var(--text-tertiary)">文件区域锁定</text>
          <text x="50" y="278" fontSize="10" fill="var(--text-secondary)">FindFirstFile / FindNextFile</text>
          <text x="200" y="278" fontSize="10" fill="var(--text-tertiary)">目录遍历</text>
          <text x="50" y="294" fontSize="10" fill="var(--text-secondary)">GetFileSize / GetFileTime</text>
          <text x="200" y="294" fontSize="10" fill="var(--text-tertiary)">文件属性查询</text>

          {/* 异步 I/O 完成通知 */}
          <rect x="390" y="148" width="320" height="160" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="550" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">异步完成通知方式</text>
          <line x1="410" y1="180" x2="690" y2="180" stroke="var(--warning)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="410" y="198" fontSize="10" fill="var(--text-secondary)">1. 轮询</text>
          <text x="520" y="198" fontSize="10" fill="var(--text-tertiary)">GetOverlappedResult</text>
          <text x="410" y="214" fontSize="10" fill="var(--text-secondary)">2. 事件对象</text>
          <text x="520" y="214" fontSize="10" fill="var(--text-tertiary)">OVERLAPPED.hEvent</text>
          <text x="410" y="230" fontSize="10" fill="var(--text-secondary)">3. APC 回调</text>
          <text x="520" y="230" fontSize="10" fill="var(--text-tertiary)">QueueUserAPC + 回调</text>
          <text x="410" y="246" fontSize="10" fill="var(--text-secondary)">4. 完成端口</text>
          <text x="520" y="246" fontSize="10" fill="var(--text-tertiary)">GetQueuedCompletionStatus</text>
          <text x="410" y="266" fontSize="9" fill="var(--text-tertiary)">IOCP 最适合高并发服务器：</text>
          <text x="410" y="280" fontSize="9" fill="var(--text-tertiary)">少量线程处理海量 I/O</text>
          <text x="410" y="294" fontSize="9" fill="var(--text-tertiary)">线程池 + 完成队列自动负载均衡</text>

          {/* 内存映射文件 */}
          <rect x="30" y="328" width="680" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">内存映射文件（Memory-Mapped File）</text>
          <text x="370" y="368" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CreateFileMapping + MapViewOfFile —— 文件直接映射到进程地址空间，像访问内存一样读写文件</text>

          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：IOCP = 异步 I/O + 线程池，是 Windows 高并发服务器的核心模型
          </text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            CreateFile 不只是打开文件——设备、管道、控制台都是 HANDLE
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Windows 文件 I/O 体系——同步/异步/完成端口三层演进与内存映射文件
      </figcaption>
    </figure>
  );
}
