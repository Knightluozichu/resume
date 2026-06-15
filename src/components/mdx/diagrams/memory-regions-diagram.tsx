/**
 * <MemoryRegionsDiagram>：进程内存布局——代码段 / 静态区 / BSS / 堆 / 栈。
 *
 * Server Component，token 色，无阴影。
 */

export function MemoryRegionsDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const codeColor = "rgb(99,179,237)";
  const dataColor = "rgb(237,199,99)";
  const bssColor = "rgb(180,160,120)";
  const heapColor = "rgb(237,137,99)";
  const stackColor = "rgb(99,237,179)";

  const cx = 200;
  const w = 280;
  let y = 40;

  const regions = [
    { label: "代码段 (.text)", sub: "机器指令、只读", h: 56, color: codeColor, example: "main() 函数体" },
    { label: "已初始化静态/全局 (.data)", sub: "有显式初值", h: 48, color: dataColor, example: "int g = 42;" },
    { label: "BSS 段 (.bss)", sub: "未初始化静态/全局 → 0", h: 48, color: bssColor, example: "static int count;" },
    { label: "堆 Heap ↑ 向上增长", sub: "malloc / calloc / free", h: 72, color: heapColor, example: "int *p = malloc(n);" },
    { label: "栈 Stack ↓ 向下增长", sub: "auto 局部变量、函数帧", h: 72, color: stackColor, example: "int local; 参数、返回地址" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 380"
          role="img"
          aria-label="C 程序内存布局：代码段、静态区、BSS、堆、栈"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <text x={24} y={24} fontSize="16" fontWeight="700" fill={primary}>
            典型进程虚拟内存（低地址在上）
          </text>

          {regions.map((r) => {
            const ry = y;
            y += r.h + 6;
            return (
              <g key={r.label}>
                <rect
                  x={cx}
                  y={ry}
                  width={w}
                  height={r.h}
                  rx="8"
                  fill={bg}
                  stroke={r.color}
                  strokeWidth="2"
                />
                <rect x={cx} y={ry} width={w} height={22} rx="8" fill={r.color} opacity="0.15" />
                <text x={cx + 12} y={ry + 16} fontSize="12" fontWeight="700" fill={r.color}>
                  {r.label}
                </text>
                <text x={cx + 12} y={ry + 36} fontSize="10" fill={secondary}>
                  {r.sub}
                </text>
                <text x={cx + 12} y={ry + r.h - 10} fontSize="10" fill={primary} fontFamily="monospace">
                  {r.example}
                </text>
              </g>
            );
          })}

          <path
            d="M 500 200 L 530 200 L 530 280 L 500 280"
            fill="none"
            stroke={heapColor}
            strokeWidth="1.5"
            markerEnd="url(#memHeapArrow)"
          />
          <text x={538} y={245} fontSize="10" fill={heapColor}>
            malloc
          </text>
          <text x={538} y={258} fontSize="10" fill={heapColor}>
            向高地址
          </text>

          <path
            d="M 500 310 L 530 310 L 530 230 L 500 230"
            fill="none"
            stroke={stackColor}
            strokeWidth="1.5"
            markerEnd="url(#memStackArrow)"
          />
          <text x={538} y={275} fontSize="10" fill={stackColor}>
            函数调用
          </text>
          <text x={538} y={288} fontSize="10" fill={stackColor}>
            向低地址
          </text>

          <rect x={24} y={60} width={150} height={100} rx="8" fill={bg} stroke={border} strokeWidth="1" />
          <text x={36} y={82} fontSize="11" fontWeight="600" fill={primary}>
            谁放哪？
          </text>
          <text x={36} y={100} fontSize="10" fill={secondary}>
            · 字符串字面量 → 只读数据
          </text>
          <text x={36} y={116} fontSize="10" fill={secondary}>
            · static / 全局 → .data 或 .bss
          </text>
          <text x={36} y={132} fontSize="10" fill={secondary}>
            · 局部 auto → 栈
          </text>
          <text x={36} y={148} fontSize="10" fill={secondary}>
            · malloc → 堆
          </text>

          <text x={24} y={360} fontSize="11" fill={secondary}>
            栈空间有限；大块或生命周期跨函数的内存应放堆，并记得 free。
          </text>

          <defs>
            <marker id="memHeapArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={heapColor} />
            </marker>
            <marker id="memStackArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={stackColor} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 程序运行时，代码与静态数据在固定区域；堆与栈相向增长。理解布局有助于解释栈溢出、内存泄漏和 static 变量为何「记住」上次值。
      </figcaption>
    </figure>
  );
}
