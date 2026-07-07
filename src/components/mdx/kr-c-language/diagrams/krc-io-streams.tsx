/**
 * <KrcIoStreamsDiagram>：C 标准 I/O 流架构。
 *
 * 展示标准 I/O 的三层架构：
 *   - 标准流：stdin / stdout / stderr
 *   - FILE* 流操作：fopen / fread / fwrite / fclose
 *   - 缓冲机制：全缓冲 / 行缓冲 / 无缓冲
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

export function KrcIoStreamsDiagram() {
  const stdStreams = [
    { name: "stdin",  fd: "fd 0", desc: "标准输入", color: "var(--accent)" },
    { name: "stdout", fd: "fd 1", desc: "标准输出", color: "var(--success)" },
    { name: "stderr", fd: "fd 2", desc: "标准错误", color: "var(--warning)" },
  ];

  const fileOps = [
    { fn: "fopen",  desc: "打开文件，返回 FILE*" },
    { fn: "fread",  desc: "读数据到缓冲区" },
    { fn: "fwrite", desc: "写缓冲区到流" },
    { fn: "fclose", desc: "刷新并关闭流" },
  ];

  const bufModes = [
    { mode: "全缓冲", desc: "缓冲区满才刷写", example: "磁盘文件", color: "var(--accent)" },
    { mode: "行缓冲", desc: "遇到换行符刷写", example: "stdout（终端）", color: "var(--success)" },
    { mode: "无缓冲", desc: "立即刷写", example: "stderr", color: "var(--warning)" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C 标准 I/O 流架构。三个标准流 stdin/stdout/stderr 连接到 FILE* 流操作 fopen/fread/fwrite/fclose，底层使用三种缓冲模式：全缓冲、行缓冲、无缓冲。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="krc-io-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C 标准 I/O · 流架构
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            FILE* 封装文件描述符，加上缓冲区，减少系统调用次数
          </text>

          {/* ── 第一层：标准流 ── */}
          <text x={40} y={92} fontSize="13" fontWeight="700" fill="var(--accent)">① 三个标准流（程序启动时自动打开）</text>

          {stdStreams.map((s, i) => {
            const x = 80 + i * 200;
            return (
              <g key={s.name}>
                <rect x={x} y={104} width={172} height={52} rx="8" fill={s.color} fillOpacity="0.08" stroke={s.color} strokeWidth="1.4" strokeOpacity="0.6" />
                <text x={x + 86} y={124} textAnchor="middle" fontSize="14" fontWeight="700" fill={s.color} fontFamily="monospace">{s.name}</text>
                <text x={x + 86} y={140} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">{s.fd}</text>
                <text x={x + 86} y={152} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{s.desc}</text>
              </g>
            );
          })}

          {/* 连接箭头到 FILE* 层 */}
          {stdStreams.map((_, i) => {
            const x = 80 + i * 200 + 86;
            return <line key={`a1-${i}`} x1={x} y1={156} x2={x} y2={184} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-io-arrow)" strokeOpacity="0.4" />;
          })}

          {/* ── 第二层：FILE* 流操作 ── */}
          <text x={40} y={182} fontSize="13" fontWeight="700" fill="var(--success)">② FILE* 流操作（带缓冲）</text>

          {fileOps.map((op, i) => {
            const x = 40 + i * 168;
            return (
              <g key={op.fn}>
                <rect x={x} y={196} width={156} height={48} rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.5" />
                <text x={x + 78} y={216} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">{op.fn}()</text>
                <text x={x + 78} y={234} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{op.desc}</text>
              </g>
            );
          })}

          {/* 连接箭头到缓冲层 */}
          <line x1={VIEW_W / 2} y1={244} x2={VIEW_W / 2} y2={268} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-io-arrow)" strokeOpacity="0.4" />

          {/* ── 第三层：缓冲机制 ── */}
          <text x={40} y={266} fontSize="13" fontWeight="700" fill="var(--warning)">③ 缓冲机制（何时刷写到内核）</text>

          {bufModes.map((b, i) => {
            const x = 60 + i * 210;
            return (
              <g key={b.mode}>
                <rect x={x} y={280} width={186} height={62} rx="8" fill={b.color} fillOpacity="0.06" stroke={b.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={x + 93} y={300} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>{b.mode}</text>
                <text x={x + 93} y={318} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{b.desc}</text>
                <text x={x + 93} y={334} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">{b.example}</text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <line x1={32} y1={368} x2={VIEW_W - 32} y2={368} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={32} y={390} fontSize="11" fill="var(--text-secondary)">
            FILE* 是标准库对文件描述符的封装：内部维护缓冲区，攒够一批再调用底层 read/write，减少系统调用开销。
          </text>
          <text x={32} y={408} fontSize="11" fill="var(--text-secondary)">
            fflush() 主动刷写缓冲区；fclose() 先刷写再释放资源。程序正常退出时所有流自动关闭。
          </text>
          <text x={32} y={426} fontSize="11" fill="var(--text-secondary)">
            格式化 I/O：printf/scanf（stdout/stdin）、fprintf/fscanf（指定流）、sprintf/sscanf（字符串）。
          </text>
          <text x={32} y={444} fontSize="11" fill="var(--text-secondary)">
            行 I/O：fgets 读取一行（保留换行符），fputs 写入字符串（不自动加换行）。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C 标准 I/O 三层架构：标准流（stdin/stdout/stderr）→ FILE* 流操作（fopen/fread/fwrite/fclose）→ 缓冲机制（全缓冲/行缓冲/无缓冲）。
      </figcaption>
    </figure>
  );
}
