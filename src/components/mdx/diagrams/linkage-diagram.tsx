/**
 * <LinkageDiagram>：内部链接 vs 外部链接（static 文件作用域）。
 *
 * 展示 file_a.c 与 file_b.c 中 static（内部链接）与 extern（外部链接）符号如何被链接器看见。
 */

export function LinkageDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";
  const internalColor = "rgb(180,160,120)";
  const externalColor = "rgb(99,179,237)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="C 内部链接与外部链接：static 仅本文件可见，extern 跨文件共享"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary}>
            两个源文件如何「看见」彼此的名字
          </text>

          {/* file_a.c */}
          <rect x={24} y={48} width={280} height={200} rx="10" fill={bgEl} stroke={border} strokeWidth="1.5" />
          <text x={40} y={72} fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">
            file_a.c
          </text>

          <rect x={40} y={88} width={248} height={36} rx="6" fill={bg} stroke={internalColor} strokeWidth="2" />
          <text x={52} y={110} fontSize="11" fill={internalColor} fontFamily="monospace">
            static int counter = 0;
          </text>
          <text x={52} y={128} fontSize="9" fill={secondary}>
            内部链接 — 仅 file_a.c 可见
          </text>

          <rect x={40} y={140} width={248} height={36} rx="6" fill={bg} stroke={externalColor} strokeWidth="2" />
          <text x={52} y={162} fontSize="11" fill={externalColor} fontFamily="monospace">
            int shared = 100;
          </text>
          <text x={52} y={180} fontSize="9" fill={secondary}>
            外部链接 — 整个程序共享一份
          </text>

          <rect x={40} y={192} width={248} height={36} rx="6" fill={bg} stroke={externalColor} strokeWidth="1.5" strokeDasharray="4 2" />
          <text x={52} y={214} fontSize="11" fill={externalColor} fontFamily="monospace">
            extern int shared;
          </text>
          <text x={52} y={232} fontSize="9" fill={secondary}>
            声明：别处有定义（可写在头文件）
          </text>

          {/* file_b.c */}
          <rect x={336} y={48} width={280} height={200} rx="10" fill={bgEl} stroke={border} strokeWidth="1.5" />
          <text x={352} y={72} fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">
            file_b.c
          </text>

          <rect x={352} y={100} width={248} height={36} rx="6" fill={bg} stroke={externalColor} strokeWidth="2" />
          <text x={364} y={122} fontSize="11" fill={externalColor} fontFamily="monospace">
            extern int shared;
          </text>
          <text x={364} y={140} fontSize="9" fill={secondary}>
            引用 file_a 中的 shared
          </text>

          <rect x={352} y={152} width={248} height={48} rx="6" fill={bg} stroke={border} strokeWidth="1" opacity="0.6" />
          <text x={364} y={172} fontSize="10" fill={secondary} fontFamily="monospace">
            /* counter 不可见 */
          </text>
          <text x={364} y={188} fontSize="9" fill={secondary}>
            写 counter 会链接错误：undefined
          </text>

          {/* 链接器 */}
          <rect x={120} y={268} width={400} height={72} rx="10" fill={bg} stroke={accent} strokeWidth="2" />
          <text x={320} y={292} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            链接器
          </text>
          <text x={320} y={312} textAnchor="middle" fontSize="10" fill={secondary}>
            合并各 .o：外部链接符号全局唯一；内部链接符号各文件各一份、互不影响
          </text>
          <text x={320} y={328} textAnchor="middle" fontSize="10" fill={primary}>
            shared → 一份定义，多处 extern 引用 ✓
          </text>

          {/* 连接线 */}
          <path d="M 288 156 L 336 118" stroke={externalColor} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#linkExtArrow)" />
          <text x={300} y={148} fontSize="9" fill={externalColor}>
            同一符号
          </text>

          <line x1={164} y1="248" x2={164} y2="268" stroke={internalColor} strokeWidth="1.5" />
          <text x={170} y={262} fontSize="9" fill={internalColor}>
            counter 不出本文件
          </text>

          <defs>
            <marker id="linkExtArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={externalColor} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        文件作用域的 static 变量/函数具有内部链接，其他 .c 看不见；全局定义默认外部链接，可用 extern 跨文件共享。头文件里放 extern 声明，.c 里放一次定义。
      </figcaption>
    </figure>
  );
}
