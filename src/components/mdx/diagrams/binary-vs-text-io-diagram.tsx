/**
 * <BinaryVsTextIODiagram>：文本模式 vs 二进制模式存储差异。
 *
 * Server Component，token 色，无阴影。
 */

export function BinaryVsTextIODiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";

  const textBytes = ["'H'", "'i'", "'\\n'", "'1'", "'0'", "'\\n'"];
  const binBytes = ["0x48", "0x00", "0x00", "0x00", "0x0A", "0xFF"];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="文本 I/O 与换行转换对比二进制 I/O 按字节原样读写"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary}>
            文本 vs 二进制 I/O
          </text>
          <text x={24} y={48} fontSize="11" fill={secondary}>
            同一 int 值 72，两种 fopen 模式写入磁盘的字节可能不同
          </text>

          {/* 文本侧 */}
          <rect x={24} y={68} width={280} height={200} rx="10" fill={bgEl} stroke={accent} strokeWidth="1.5" />
          <text x={40} y={92} fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">
            文本模式 &quot;r&quot; / &quot;w&quot;
          </text>
          <text x={40} y={112} fontSize="10" fill={secondary}>
            fprintf / fscanf · fgets / fputs
          </text>
          <text x={40} y={136} fontSize="10" fill={primary}>
            换行：\n ↔ \r\n（Windows）
          </text>
          <text x={40} y={156} fontSize="10" fill={primary}>
            人类可读 · 适合日志、配置
          </text>
          <text x={40} y={180} fontSize="9" fontWeight="600" fill={secondary}>
            磁盘字节示意（文本行）
          </text>
          {textBytes.map((b, i) => (
            <rect
              key={i}
              x={40 + i * 38}
              y={192}
              width={34}
              height={28}
              rx="4"
              fill={bg}
              stroke={border}
              strokeWidth="1"
            />
          ))}
          {textBytes.map((b, i) => (
            <text key={`t${i}`} x={57 + i * 38} y={210} textAnchor="middle" fontSize="8" fill={primary} fontFamily="monospace">
              {b}
            </text>
          ))}
          <text x={40} y={248} fontSize="9" fill={secondary}>
            EOF 由文本结束或 feof 检测
          </text>

          {/* 二进制侧 */}
          <rect x={336} y={68} width={280} height={200} rx="10" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={352} y={92} fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">
            二进制 &quot;rb&quot; / &quot;wb&quot;
          </text>
          <text x={352} y={112} fontSize="10" fill={secondary}>
            fread / fwrite · 结构体整块写
          </text>
          <text x={352} y={136} fontSize="10" fill={primary}>
            无换行转换 · 字节原样落盘
          </text>
          <text x={352} y={156} fontSize="10" fill={primary}>
            紧凑 · 适合 struct / 数组快照
          </text>
          <text x={352} y={180} fontSize="9" fontWeight="600" fill={secondary}>
            磁盘字节示意（原始）
          </text>
          {binBytes.map((b, i) => (
            <rect
              key={i}
              x={352 + i * 38}
              y={192}
              width={34}
              height={28}
              rx="4"
              fill={bgEl}
              stroke={accent}
              strokeWidth={i === 1 ? 2 : 1}
            />
          ))}
          {binBytes.map((b, i) => (
            <text key={`b${i}`} x={369 + i * 38} y={210} textAnchor="middle" fontSize="8" fill={primary} fontFamily="monospace">
              {b}
            </text>
          ))}
          <text x={352} y={248} fontSize="9" fill={secondary}>
            int 72 可能占 4 字节 0x48 0x00…
          </text>

          <text x={24} y={296} fontSize="10" fill={secondary}>
            跨平台共享二进制文件时注意 struct 对齐与字节序；文本更便携但体积大、解析慢。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        保存游戏存档、图像头、浮点数组快照用二进制；给人看的配置与报表用文本。混用模式读同一文件会得到乱码或错位。
      </figcaption>
    </figure>
  );
}
