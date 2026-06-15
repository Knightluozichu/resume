/**
 * <BufferedIODiagram>：行缓冲 vs 全缓冲 vs 无缓冲示意。
 *
 * 三步对比：① 行缓冲（stdout 终端）② 全缓冲（文件流）③ 无缓冲（stderr）
 */

interface BufferedIODiagramProps {
  step?: 1 | 2 | 3;
}

export function BufferedIODiagram({ step = 3 }: BufferedIODiagramProps) {
  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 400"
          role="img"
          aria-label="行缓冲、全缓冲与无缓冲对比图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            三种缓冲模式
          </text>

          {/* ① 行缓冲 */}
          <g opacity={isActive(1) ? 1 : 0.35}>
            <rect x={24} y={48} width={592} height={96} rx="8" fill={"var(--accent)"} fillOpacity={0.08} stroke={isActive(1) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" />
            <text x={44} y={72} fontSize="13" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
              ① 行缓冲（line buffered）
            </text>
            <text x={44} y={94} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
              典型：stdout 连到终端时。攒到遇到换行符 \n 或缓冲区满才刷新到设备。
            </text>
            <rect x={44} y={104} width={200} height={28} rx="6" fill={"var(--bg)"} stroke={"var(--border)"} />
            <text x={144} y={123} textAnchor="middle" fontSize="11" fill={"var(--text-primary)"} fontFamily="monospace">
              printf(&quot;Hi&quot;);  /* 可能不立刻显示 */
            </text>
            <text x={260} y={123} fontSize="14" fill={"var(--accent)"} fontFamily="system-ui">
              →
            </text>
            <rect x={280} y={104} width={200} height={28} rx="6" fill={"var(--bg)"} stroke={"var(--accent)"} strokeDasharray="4 3" />
            <text x={380} y={123} textAnchor="middle" fontSize="11" fill={"var(--accent)"} fontFamily="monospace">
              printf(&quot;\n&quot;);  /* 刷新一行 */
            </text>
            <text x={500} y={123} fontSize="14" fill={"var(--accent)"} fontFamily="system-ui">
              → 屏幕
            </text>
          </g>

          {/* ② 全缓冲 */}
          <g opacity={isActive(2) ? 1 : 0.35}>
            <rect x={24} y={156} width={592} height={96} rx="8" fill={"var(--bg)"} stroke={isActive(2) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" />
            <text x={44} y={180} fontSize="13" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ② 全缓冲（fully buffered）
            </text>
            <text x={44} y={202} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
              典型：stdout 重定向到文件、或 fopen 打开的文件流。缓冲区满或 fflush/ fclose 时才写出。
            </text>
            <rect x={44} y={212} width={160} height={28} rx="6" fill={"var(--bg-elevated)"} stroke={"var(--border)"} />
            <text x={124} y={231} textAnchor="middle" fontSize="11" fill={"var(--text-primary)"} fontFamily="monospace">
              fprintf(fp, ...)
            </text>
            <text x={220} y={231} fontSize="14" fill={"var(--text-secondary)"} fontFamily="system-ui">
              →
            </text>
            <rect x={240} y={212} width={180} height={28} rx="6" fill={"var(--bg-elevated)"} stroke={"var(--border)"} strokeDasharray="4 3" />
            <text x={330} y={231} textAnchor="middle" fontSize="11" fill={"var(--text-secondary)"} fontFamily="monospace">
              大块缓冲区
            </text>
            <text x={440} y={231} fontSize="14" fill={"var(--text-secondary)"} fontFamily="system-ui">
              → 磁盘文件
            </text>
          </g>

          {/* ③ 无缓冲 */}
          <g opacity={isActive(3) ? 1 : 0.35}>
            <rect x={24} y={264} width={592} height={96} rx="8" fill={"var(--bg)"} stroke={isActive(3) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" />
            <text x={44} y={288} fontSize="13" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ③ 无缓冲（unbuffered）
            </text>
            <text x={44} y={310} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
              典型：stderr。每条输出立刻送到设备，适合错误信息——不能等缓冲区满才显示。
            </text>
            <rect x={44} y={320} width={200} height={28} rx="6" fill={"var(--bg-elevated)"} stroke={"rgb(229,181,103)"} />
            <text x={144} y={339} textAnchor="middle" fontSize="11" fill={"rgb(229,181,103)"} fontFamily="monospace">
              fprintf(stderr, ...)
            </text>
            <text x={260} y={339} fontSize="14" fill={"rgb(229,181,103)"} fontFamily="system-ui">
              → 立即
            </text>
            <text x={320} y={339} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
              不经中转，直接到终端
            </text>
          </g>

          <text x={24} y={384} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            getchar/putchar 工作在字符层；底层仍受 stdin/stdout 缓冲策略影响——这就是为什么有时 printf 后要 fflush(stdout) 才能和 scanf 配合。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        标准 I/O 流按连接对象不同采用不同缓冲策略。理解缓冲有助于解释「输出延迟」和「输入被跳过」两类经典问题。
      </figcaption>
    </figure>
  );
}
