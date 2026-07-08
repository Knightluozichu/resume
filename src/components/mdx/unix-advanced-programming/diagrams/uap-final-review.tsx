/**
 * <UapFinalReviewDiagram>：全书知识串联图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function UapFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="APUE全书知识串联图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            UNIX环境高级编程——全书知识串联
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            一次「Web服务器并发处理请求」串联全书知识点
          </text>

          {/* 场景：客户端请求 */}
          <rect x="30" y="62" width="680" height="56" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">场景：多客户端并发请求 Web 服务器</text>
          <text x="370" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">socket → bind → listen → accept → read → 处理 → write → close</text>

          <text x="370" y="134" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第一层：文件I/O */}
          <rect x="50" y="142" width="640" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="80" y="162" fontSize="12" fontWeight="600" fill="var(--warning)">第1-2章</text>
          <text x="80" y="180" fontSize="10" fill="var(--text-secondary)">文件I/O</text>
          <text x="280" y="162" fontSize="10" fill="var(--text-secondary)">socket() 创建fd → accept() 返回新fd</text>
          <text x="280" y="180" fontSize="10" fill="var(--text-secondary)">read(fd) 读请求 / write(fd) 发响应</text>
          <text x="550" y="162" fontSize="10" fill="var(--text-secondary)">open/read/write/close</text>
          <text x="550" y="180" fontSize="10" fill="var(--text-secondary)">fcntl/lseek</text>

          <text x="370" y="214" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二层：文件目录 */}
          <rect x="50" y="222" width="640" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="80" y="242" fontSize="12" fontWeight="600" fill="var(--accent)">第3-4章</text>
          <text x="80" y="260" fontSize="10" fill="var(--text-secondary)">文件与目录</text>
          <text x="280" y="242" fontSize="10" fill="var(--text-secondary)">stat() 获取静态文件大小/权限</text>
          <text x="280" y="260" fontSize="10" fill="var(--text-secondary)">opendir/readdir 列目录资源</text>
          <text x="550" y="242" fontSize="10" fill="var(--text-secondary)">进程环境/environ</text>
          <text x="550" y="260" fontSize="10" fill="var(--text-secondary)">getenv/setenv</text>

          <text x="370" y="294" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三层：进程控制+信号 */}
          <rect x="50" y="302" width="640" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="80" y="322" fontSize="12" fontWeight="600" fill="var(--danger)">第5-6章</text>
          <text x="80" y="340" fontSize="10" fill="var(--text-secondary)">进程控制+信号</text>
          <text x="280" y="322" fontSize="10" fill="var(--text-secondary)">fork() 创建子进程处理请求</text>
          <text x="280" y="340" fontSize="10" fill="var(--text-secondary)">SIGCHLD 回收僵尸 / SIGPIPE 处理断连</text>
          <text x="550" y="322" fontSize="10" fill="var(--text-secondary)">fork/exec/wait</text>
          <text x="550" y="340" fontSize="10" fill="var(--text-secondary)">sigaction/kill</text>

          <text x="370" y="374" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四层：IPC+线程 */}
          <rect x="50" y="382" width="640" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="402" fontSize="12" fontWeight="600" fill="var(--success)">第7-8章</text>
          <text x="80" y="420" fontSize="10" fill="var(--text-secondary)">IPC+线程</text>
          <text x="280" y="402" fontSize="10" fill="var(--text-secondary)">线程模型: 主线程accept, 工作线程处理</text>
          <text x="280" y="420" fontSize="10" fill="var(--text-secondary)">互斥锁保护共享数据/条件变量通知</text>
          <text x="550" y="402" fontSize="10" fill="var(--text-secondary)">pthread/mutex/rwlock</text>
          <text x="550" y="420" fontSize="10" fill="var(--text-secondary)">cond_wait/signal</text>

          <text x="370" y="454" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五层：高级I/O */}
          <rect x="50" y="462" width="640" height="48" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="80" y="482" fontSize="12" fontWeight="600" fill="var(--text-primary)">第9-10章</text>
          <text x="80" y="500" fontSize="10" fill="var(--text-secondary)">高级I/O</text>
          <text x="280" y="482" fontSize="10" fill="var(--text-secondary)">epoll 单线程管理数万连接</text>
          <text x="280" y="500" fontSize="10" fill="var(--text-secondary)">非阻塞I/O + ET边缘触发 + readv/writev</text>
          <text x="550" y="482" fontSize="10" fill="var(--text-secondary)">epoll/epoll_ctl</text>
          <text x="550" y="500" fontSize="10" fill="var(--text-secondary)">mmap/sendfile</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书串联：一次Web请求从socket创建到epoll多路转接，文件I/O→进程控制→信号→线程→高级I/O全链路参与
      </figcaption>
    </figure>
  );
}
