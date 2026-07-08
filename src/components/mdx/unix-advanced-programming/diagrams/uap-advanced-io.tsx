/**
 * <UapAdvancedIoDiagram>：高级I/O与多路转接图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function UapAdvancedIoDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级I/O与多路转接图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级I/O——非阻塞与多路转接
          </text>

          {/* 阻塞 vs 非阻塞 */}
          <rect x="30" y="48" width="330" height="100" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阻塞I/O</text>
          <text x="50" y="88" fontSize="10" fill="var(--text-secondary)">read(fd, buf, n) → 阻塞直到有数据</text>
          <text x="50" y="102" fontSize="10" fill="var(--text-secondary)">整个进程挂起, 不能做其他事</text>
          <text x="50" y="116" fontSize="10" fill="var(--text-secondary)">多连接 → 每个连接一个进程/线程</text>
          <text x="50" y="130" fontSize="10" fill="var(--text-secondary)">简单但扩展性差</text>

          <rect x="380" y="48" width="330" height="100" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">非阻塞I/O</text>
          <text x="400" y="88" fontSize="10" fill="var(--text-secondary)">O_NONBLOCK 标志设置</text>
          <text x="400" y="102" fontSize="10" fill="var(--text-secondary)">read → 无数据返回 EAGAIN/EWOULDBLOCK</text>
          <text x="400" y="116" fontSize="10" fill="var(--text-secondary)">轮询(polling)消耗CPU</text>
          <text x="400" y="130" fontSize="10" fill="var(--text-secondary)">单独使用效率低</text>

          {/* select */}
          <rect x="30" y="162" width="220" height="130" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="140" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">select</text>
          <text x="50" y="202" fontSize="10" fill="var(--text-secondary)">FD_SET 设定关注的fd</text>
          <text x="50" y="216" fontSize="10" fill="var(--text-secondary)">select(maxfd, rset, wset, ...)</text>
          <text x="50" y="230" fontSize="10" fill="var(--text-secondary)">返回就绪fd数目</text>
          <text x="50" y="244" fontSize="10" fill="var(--text-secondary)">用 FD_ISSET 逐个检查</text>
          <text x="50" y="262" fontSize="10" fill="var(--danger)">限制: FD_SETSIZE (通常1024)</text>
          <text x="50" y="276" fontSize="10" fill="var(--danger)">每次需重建fd_set</text>
          <text x="50" y="290" fontSize="10" fill="var(--danger)">O(n) 遍历检查</text>

          {/* poll */}
          <rect x="270" y="162" width="220" height="130" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">poll</text>
          <text x="290" y="202" fontSize="10" fill="var(--text-secondary)">struct pollfd fds[n]</text>
          <text x="290" y="216" fontSize="10" fill="var(--text-secondary)">poll(fds, nfds, timeout)</text>
          <text x="290" y="230" fontSize="10" fill="var(--text-secondary)">返回就绪fd数目</text>
          <text x="290" y="244" fontSize="10" fill="var(--text-secondary)">检查 revents 标志</text>
          <text x="290" y="262" fontSize="10" fill="var(--danger)">无fd数量限制</text>
          <text x="290" y="276" fontSize="10" fill="var(--danger)">仍需 O(n) 遍历</text>
          <text x="290" y="290" fontSize="10" fill="var(--danger)">每次需拷贝全部结构</text>

          {/* epoll */}
          <rect x="510" y="162" width="200" height="130" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="610" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">epoll（Linux特有）</text>
          <text x="530" y="202" fontSize="10" fill="var(--text-secondary)">epoll_create 创建实例</text>
          <text x="530" y="216" fontSize="10" fill="var(--text-secondary)">epoll_ctl 注册/修改/删除</text>
          <text x="530" y="230" fontSize="10" fill="var(--text-secondary)">epoll_wait 等待就绪事件</text>
          <text x="530" y="244" fontSize="10" fill="var(--text-secondary)">只返回就绪的fd</text>
          <text x="530" y="262" fontSize="10" fill="var(--success)">O(1) 就绪检查</text>
          <text x="530" y="276" fontSize="10" fill="var(--success)">内核维护就绪表</text>
          <text x="530" y="290" fontSize="10" fill="var(--success)">支持百万连接</text>

          {/* epoll 触发模式 */}
          <rect x="30" y="306" width="330" height="76" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="326" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">LT 水平触发（默认）</text>
          <text x="50" y="344" fontSize="10" fill="var(--text-secondary)">只要fd有数据可读, 就一直通知</text>
          <text x="50" y="358" fontSize="10" fill="var(--text-secondary)">可以不一次读完, 下次继续通知</text>
          <text x="50" y="372" fontSize="10" fill="var(--text-secondary)">编程简单, 不易遗漏事件</text>

          <rect x="380" y="306" width="330" height="76" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="326" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">ET 边缘触发（EPOLLET）</text>
          <text x="400" y="344" fontSize="10" fill="var(--text-secondary)">状态变化时通知一次, 之后不再通知</text>
          <text x="400" y="358" fontSize="10" fill="var(--text-secondary)">必须一次性读完(EAGAIN), 需非阻塞</text>
          <text x="400" y="372" fontSize="10" fill="var(--text-secondary)">效率高但编程复杂</text>

          {/* 其他高级I/O */}
          <rect x="30" y="396" width="330" height="86" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="416" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">readv/writev（散射/聚集I/O）</text>
          <text x="50" y="436" fontSize="10" fill="var(--text-secondary)">一次调用读写多个不连续缓冲区</text>
          <text x="50" y="450" fontSize="10" fill="var(--text-secondary)">struct iovec 数组指定各缓冲</text>
          <text x="50" y="464" fontSize="10" fill="var(--text-secondary)">减少系统调用次数</text>
          <text x="50" y="478" fontSize="10" fill="var(--text-secondary)">原子性写入</text>

          <rect x="380" y="396" width="330" height="86" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="416" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">内存映射与异步I/O</text>
          <text x="400" y="436" fontSize="10" fill="var(--text-secondary)">mmap: 文件映射到内存直接读写</text>
          <text x="400" y="450" fontSize="10" fill="var(--text-secondary)">sendfile: 内核空间直接拷贝(零拷贝)</text>
          <text x="400" y="464" fontSize="10" fill="var(--text-secondary)">splice: 管道间数据传输</text>
          <text x="400" y="478" fontSize="10" fill="var(--text-secondary)">aio_read/aio_write: 异步I/O</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高级I/O：从阻塞到非阻塞，从select/poll的O(n)遍历到epoll的O(1)就绪通知，配合散射I/O和零拷贝优化
      </figcaption>
    </figure>
  );
}
