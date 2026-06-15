/**
 * <FilePointerDiagram>：FILE* 与标准 I/O 流的概念。
 *
 * Server Component，token 色，无阴影。
 */

export function FilePointerDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="FILE 指针连接程序与磁盘文件，经缓冲区实现流式读写"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            FILE *fp — 流（stream）是桥梁
          </text>
          <text x={24} y={48} fontSize="11" fill={secondary}>
            程序不直接碰硬盘扇区；通过 FILE 结构体 + 缓冲区按字节/行读写
          </text>

          {/* 程序 */}
          <rect x={40} y={80} width={140} height={200} rx="10" fill={bgEl} stroke={accent} strokeWidth="2" />
          <text x={110} y={108} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            你的程序
          </text>
          <text x={110} y={132} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
            fprintf(fp, ...)
          </text>
          <text x={110} y={150} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
            fgets(buf, n, fp)
          </text>
          <text x={110} y={168} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
            fread(ptr, sz, n, fp)
          </text>
          <rect x={70} y={190} width={80} height={36} rx="6" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={110} y={212} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
            FILE *fp
          </text>
          <text x={110} y={248} textAnchor="middle" fontSize="9" fill={secondary}>
            指向流对象
          </text>

          {/* 箭头 程序 → 缓冲 */}
          <line x1={180} y1={208} x2={248} y2={208} stroke={accent} strokeWidth="2" markerEnd="url(#fpArrow)" />
          <text x={214} y={198} textAnchor="middle" fontSize="9" fill={secondary}>
            读写
          </text>

          {/* 标准 I/O 层 */}
          <rect x={250} y={100} width={140} height={160} rx="10" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={320} y={124} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            stdio 缓冲
          </text>
          <text x={320} y={148} textAnchor="middle" fontSize="9" fill={secondary}>
            行缓冲 / 全缓冲
          </text>
          <text x={320} y={168} textAnchor="middle" fontSize="9" fill={secondary}>
            当前读写位置
          </text>
          <text x={320} y={188} textAnchor="middle" fontSize="9" fill={secondary}>
            EOF / 错误标志
          </text>
          <text x={320} y={212} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={primary}>
            stdin stdout stderr
          </text>
          <text x={320} y={232} textAnchor="middle" fontSize="9" fill={secondary}>
            也是 FILE*
          </text>

          <line x1={390} y1={180} x2={458} y2={180} stroke={accent} strokeWidth="2" markerEnd="url(#fpArrow)" />

          {/* 磁盘文件 */}
          <rect x={460} y={80} width={140} height={200} rx="10" fill={bgEl} stroke={border} strokeWidth="1.5" />
          <text x={530} y={108} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            磁盘文件
          </text>
          <rect x={490} y={125} width={80} height={100} rx="4" fill={bg} stroke={border} strokeWidth="1" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={500}
              y1={140 + i * 16}
              x2={560}
              y2={140 + i * 16}
              stroke={border}
              strokeWidth="1"
            />
          ))}
          <text x={530} y={248} textAnchor="middle" fontSize="9" fill={secondary} fontFamily="monospace">
            scores.dat
          </text>
          <text x={530} y={264} textAnchor="middle" fontSize="9" fill={secondary}>
            持久化字节序列
          </text>

          {/* 预定义流 */}
          <text x={24} y={310} fontSize="11" fontWeight="600" fill={primary}>
            预定义流
          </text>
          <text x={24} y={328} fontSize="10" fill={secondary} fontFamily="monospace">
            stdin → 键盘 · stdout → 屏幕 · stderr → 诊断输出
          </text>
          <text x={24} y={346} fontSize="10" fill={secondary}>
            fopen 成功后 fp 与它们一样，都是指向 FILE 的指针；fclose 断开连接并刷新缓冲。
          </text>

          <defs>
            <marker id="fpArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        FILE* 是程序与外部文件之间的「句柄」：stdio 在内存中缓冲数据，批量与磁盘交换，你只需对 fp 调用读写函数。
      </figcaption>
    </figure>
  );
}
