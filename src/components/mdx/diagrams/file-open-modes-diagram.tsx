/**
 * <FileOpenModesDiagram>：fopen 模式 r / w / a / r+ / w+ / a+ 对照表。
 *
 * Server Component，token 色，无阴影。
 */

export function FileOpenModesDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";

  const rows = [
    { mode: "r", read: "✓", write: "—", create: "—", truncate: "—", seek: "✓", note: "文件须已存在" },
    { mode: "w", read: "—", write: "✓", create: "✓", truncate: "✓", seek: "✓", note: "存在则清空" },
    { mode: "a", read: "—", write: "✓", create: "✓", truncate: "—", seek: "追加尾", note: "写总在末尾" },
    { mode: "r+", read: "✓", write: "✓", create: "—", truncate: "—", seek: "✓", note: "须已存在" },
    { mode: "w+", read: "✓", write: "✓", create: "✓", truncate: "✓", seek: "✓", note: "存在则清空" },
    { mode: "a+", read: "✓", write: "✓", create: "✓", truncate: "—", seek: "读任意/写尾", note: "读写混合" },
  ];

  const colX = [24, 72, 130, 188, 246, 304, 380];
  const rowH = 44;
  const startY = 72;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="fopen 六种文本模式：读、写、追加、清空、创建与定位能力对照"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            fopen(path, mode) 模式一览
          </text>
          <text x={24} y={48} fontSize="11" fill={secondary}>
            文本模式；二进制在字母后加 b，如 &quot;rb&quot; &quot;wb&quot; &quot;ab&quot;
          </text>

          {["模式", "读", "写", "创建", "清空", "定位", "说明"].map((h, i) => (
            <text
              key={h}
              x={colX[i]}
              y={startY - 8}
              fontSize="10"
              fontWeight="700"
              fill={secondary}
            >
              {h}
            </text>
          ))}

          {rows.map((r, ri) => {
            const y = startY + ri * rowH;
            const hot = r.mode === "w" || r.mode === "a+";
            return (
              <g key={r.mode}>
                <rect
                  x={20}
                  y={y}
                  width={600}
                  height={rowH - 6}
                  rx="6"
                  fill={hot ? bgEl : bg}
                  stroke={hot ? accent : border}
                  strokeWidth={hot ? 1.5 : 1}
                />
                <text x={colX[0]} y={y + 24} fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">
                  &quot;{r.mode}&quot;
                </text>
                {[r.read, r.write, r.create, r.truncate, r.seek].map((cell, ci) => (
                  <text key={ci} x={colX[ci + 1]} y={y + 24} fontSize="10" fill={primary}>
                    {cell}
                  </text>
                ))}
                <text x={colX[6]} y={y + 24} fontSize="9" fill={secondary}>
                  {r.note}
                </text>
              </g>
            );
          })}

          <text x={24} y={318} fontSize="10" fill={secondary}>
            失败返回 NULL，用 perror 或 strerror(errno) 查原因；成功务必 fclose。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        「w」会截断已有内容；「a」只追加不破坏旧数据；带 + 的模式允许读+写，但 a+ 写入仍定位到文件尾。
      </figcaption>
    </figure>
  );
}
