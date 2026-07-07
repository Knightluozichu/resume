/**
 * <KrcUnixFileIoDiagram>：UNIX 文件描述符与系统调用。
 *
 * 对比展示低级 I/O（系统调用）与标准 I/O（FILE*）：
 *   - 左：文件描述符表（fd 0/1/2 预留 + fd 3+ 用户文件）
 *   - 中：系统调用 open/read/write/close 生命周期
 *   - 右：fd（整数）vs FILE*（带缓冲的结构体指针）对比
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

export function KrcUnixFileIoDiagram() {
  const fdEntries = [
    { fd: "0", stream: "stdin",  desc: "标准输入",  color: "var(--accent)" },
    { fd: "1", stream: "stdout", desc: "标准输出",  color: "var(--success)" },
    { fd: "2", stream: "stderr", desc: "标准错误",  color: "var(--warning)" },
    { fd: "3", stream: "(用户)", desc: "open 返回", color: "var(--text-primary)" },
    { fd: "4", stream: "(用户)", desc: "open 返回", color: "var(--text-primary)" },
  ];

  const syscalls = [
    { fn: "open",   args: "path, flags",   ret: "返回 fd（≥0）", color: "var(--accent)" },
    { fn: "read",   args: "fd, buf, n",    ret: "返回读取字节数", color: "var(--success)" },
    { fn: "write",  args: "fd, buf, n",    ret: "返回写入字节数", color: "var(--success)" },
    { fn: "close",  args: "fd",            ret: "0 成功 / -1 失败", color: "var(--warning)" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="UNIX 文件描述符与系统调用。左侧文件描述符表 fd 0 到 4，中间 open/read/write/close 系统调用生命周期，右侧 fd 与 FILE* 对比。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="krc-ui-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            UNIX 文件描述符与低级 I/O
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            文件描述符是进程级的小整数；系统调用直接操作内核，无缓冲
          </text>

          {/* ── 左面板：文件描述符表 ── */}
          <text x={40} y={92} fontSize="13" fontWeight="700" fill="var(--accent)">① 文件描述符表（每进程）</text>
          <rect x={40} y={104} width={200} height={176} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x={140} y={122} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)" fontFamily="monospace">fd │ 对应流</text>
          <line x1={50} y1={128} x2={230} y2={128} stroke="var(--border)" strokeWidth="1" />

          {fdEntries.map((e, i) => {
            const y = 146 + i * 28;
            return (
              <g key={e.fd}>
                <rect x={52} y={y - 12} width={36} height={22} rx="4" fill={e.color} fillOpacity="0.1" stroke={e.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={70} y={y + 3} textAnchor="middle" fontSize="12" fontWeight="600" fill={e.color} fontFamily="monospace">{e.fd}</text>
                <text x={96} y={y + 3} fontSize="11" fill="var(--text-primary)" fontFamily="monospace">{e.stream}</text>
                <text x={178} y={y + 3} fontSize="11" fill="var(--text-secondary)">{e.desc}</text>
              </g>
            );
          })}
          <text x={140} y={268} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">fd = 内核文件表索引</text>

          {/* ── 中面板：系统调用生命周期 ── */}
          <text x={270} y={92} fontSize="13" fontWeight="700" fill="var(--success)">② 系统调用生命周期</text>
          {syscalls.map((sc, i) => {
            const y = 108 + i * 50;
            return (
              <g key={sc.fn}>
                <rect x={270} y={y} width={220} height={42} rx="8" fill={sc.color} fillOpacity="0.06" stroke={sc.color} strokeWidth="1.2" strokeOpacity="0.5" />
                <text x={284} y={y + 18} fontSize="13" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">{sc.fn}()</text>
                <text x={284} y={y + 34} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">参数: {sc.args}</text>
                <text x={480} y={y + 18} fontSize="11" fill="var(--text-secondary)">{sc.ret}</text>
                {i < syscalls.length - 1 && (
                  <line x1={380} y1={y + 42} x2={380} y2={y + 50} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-ui-arrow)" strokeOpacity="0.4" />
                )}
              </g>
            );
          })}

          {/* ── 右面板：fd vs FILE* ── */}
          <text x={510} y={92} fontSize="13" fontWeight="700" fill="var(--warning)">③ fd vs FILE*</text>

          {/* fd box */}
          <rect x={510} y={104} width={180} height={78} rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={600} y={124} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)" fontFamily="monospace">fd (int)</text>
          <text x={600} y={142} textAnchor="middle" fontSize="11" fill="var(--text-primary)">• 小整数，内核索引</text>
          <text x={600} y={158} textAnchor="middle" fontSize="11" fill="var(--text-primary)">• 无缓冲，直接系统调用</text>
          <text x={600} y={174} textAnchor="middle" fontSize="11" fill="var(--text-primary)">• open/read/write/close</text>

          {/* FILE* box */}
          <rect x={510} y={196} width={180} height={84} rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={600} y={216} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)" fontFamily="monospace">FILE *</text>
          <text x={600} y={234} textAnchor="middle" fontSize="11" fill="var(--text-primary)">• 结构体指针，含 fd</text>
          <text x={600} y={250} textAnchor="middle" fontSize="11" fill="var(--text-primary)">• 带缓冲区，减少系统调用</text>
          <text x={600} y={266} textAnchor="middle" fontSize="11" fill="var(--text-primary)">• fopen/fread/fwrite</text>
          <text x={600} y={280} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">fileno(fp) 可取 fd</text>

          {/* 底部说明 */}
          <line x1={32} y1={312} x2={VIEW_W - 32} y2={312} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={32} y={334} fontSize="11" fill="var(--text-secondary)">
            open() 的 flags：O_RDONLY（只读）、O_WRONLY（只写）、O_RDWR（读写）、O_CREAT（不存在则创建）、O_APPEND（追加）。
          </text>
          <text x={32} y={352} fontSize="11" fill="var(--text-secondary)">
            read/write 返回值 &lt; 请求字节数不一定是错误：可能到达文件末尾（read）或内核缓冲区暂满（write）。
          </text>
          <text x={32} y={370} fontSize="11" fill="var(--text-secondary)">
            进程控制：fork() 创建子进程（返回两次），exec() 替换当前进程映像，wait() 等待子进程结束。
          </text>
          <text x={32} y={388} fontSize="11" fill="var(--text-secondary)">
            文件描述符是有限资源（默认 1024），泄漏会导致打不开新文件；close() 释放。
          </text>
          <text x={32} y={406} fontSize="11" fill="var(--text-secondary)">
            K&R 第八章核心：标准 I/O 封装在低级 I/O 之上，理解 fd 才能理解 FILE* 的底层行为。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UNIX 文件描述符表（fd 0/1/2 预留标准流）、open/read/write/close 系统调用生命周期，以及 fd（无缓冲整数）与 FILE*（带缓冲封装）的对比。
      </figcaption>
    </figure>
  );
}
