/**
 * <CapSystemLevelIoDiagram>：系统级 I/O 图解（fd/系统调用/缓冲层次/重定向管道）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapSystemLevelIoDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="系统级 I/O 图解：文件描述符、系统调用、缓冲层次、重定向与管道"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            系统级 I/O
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            一切皆文件 · 文件描述符 · 三层缓冲 · 重定向与管道
          </text>

          {/* 文件描述符 + 系统调用 */}
          <rect x="30" y="64" width="335" height="180" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="197" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">文件描述符 + 四大系统调用</text>
          <text x="197" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每进程独立 fd 表，open 返回最小可用整数</text>
          <rect x="50" y="116" width="90" height="22" rx="4" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1" />
          <text x="95" y="131" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--success)">fd 0 stdin</text>
          <rect x="145" y="116" width="90" height="22" rx="4" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1" />
          <text x="190" y="131" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--warning)">fd 1 stdout</text>
          <rect x="240" y="116" width="90" height="22" rx="4" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="285" y="131" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--danger)">fd 2 stderr</text>
          <rect x="50" y="146" width="135" height="26" rx="4" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1" />
          <text x="117" y="163" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--success)">open → 返回 fd</text>
          <rect x="190" y="146" width="140" height="26" rx="4" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="260" y="163" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--warning)">read(返回实读数)</text>
          <rect x="50" y="176" width="135" height="26" rx="4" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="117" y="193" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--danger)">write(返回实写数)</text>
          <rect x="190" y="176" width="140" height="26" rx="4" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1" />
          <text x="260" y="193" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent)">close(释放 fd)</text>
          <rect x="50" y="210" width="280" height="24" rx="4" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1" />
          <text x="190" y="226" textAnchor="middle" fontSize="10" fill="var(--danger)">陷阱：短读短写须循环包裹</text>
          <text x="197" y="240" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">read 返回 0 = EOF，-1 = 错误查 errno</text>

          {/* 三层缓冲 */}
          <rect x="380" y="64" width="330" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">三层缓冲（为什么 printf 不立即显示）</text>
          <rect x="400" y="100" width="290" height="34" rx="5" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">①用户态缓冲</text>
          <text x="545" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">printf/fwrite → FILE 缓冲，fflush 刷内核</text>
          <text x="545" y="142" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <rect x="400" y="148" width="290" height="34" rx="5" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="164" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">②内核缓冲（page cache）</text>
          <text x="545" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">write 到 page cache，fsync 强制落盘</text>
          <text x="545" y="190" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <rect x="400" y="196" width="290" height="34" rx="5" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">③设备缓冲</text>
          <text x="545" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">磁盘控制器缓存，断电会丢数据</text>
          <text x="545" y="240" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">write 返回只到内核缓冲，持久化需 fsync</text>

          {/* 重定向 */}
          <rect x="30" y="258" width="335" height="140" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="197" y="280" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">重定向 `&gt;` 底层</text>
          <text x="197" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">shell fork 子进程后：</text>
          <rect x="50" y="310" width="280" height="22" rx="4" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="190" y="325" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--danger)">close(1);  open(file, O_WRONLY)</text>
          <text x="197" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最小可用 fd 原则：新 fd 复用 1</text>
          <text x="197" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">stdout 指向文件，printf 写到文件</text>
          <text x="197" y="380" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--accent)">dup2(oldfd, newfd) 通用形式</text>
          <text x="197" y="394" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">newfd 指向 oldfd 同一打开文件表项</text>

          {/* 管道 */}
          <rect x="380" y="258" width="330" height="140" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="280" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">管道 `|` 底层</text>
          <rect x="400" y="294" width="135" height="26" rx="4" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1" />
          <text x="467" y="311" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--warning)">cmd1 stdout</text>
          <rect x="540" y="294" width="40" height="26" rx="4" fill="var(--accent)" fillOpacity="0.22" stroke="var(--accent)" strokeWidth="1" />
          <text x="560" y="311" textAnchor="middle" fontSize="10" fill="var(--accent)">|&gt;</text>
          <rect x="585" y="294" width="105" height="26" rx="4" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="637" y="311" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--danger)">cmd2 stdin</text>
          <text x="545" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">pipe(fds) 创建读端 fds[0] 写端 fds[1]</text>
          <text x="545" y="352" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内核环形缓冲区，左写右读</text>
          <text x="545" y="370" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">dup2(fds[1],1) / dup2(fds[0],0)</text>
          <text x="545" y="388" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">两端须 close 不用方向，否则死锁/不EOF</text>

          <text x={VIEW_W / 2} y="418" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">fork 继承 fd 表副本，指向同一打开文件表项，父子共享文件偏移量</text>
          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：write 返回只到内核缓冲，断电会丢——持久化必须 fsync
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        系统级 I/O——文件描述符、四大系统调用、三层缓冲、重定向与管道
      </figcaption>
    </figure>
  );
}
