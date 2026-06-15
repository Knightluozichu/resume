/**
 * <IOMemoryBufferDiagram>：printf / scanf 与缓冲区、控制台的关系示意图。
 *
 * 展示：
 * - 左侧：printf 把格式化后的数据写入输出缓冲区 → 控制台/显示器
 * - 右侧：用户键盘输入 → 输入缓冲区 → scanf 读取并解析
 * - 底部：缓冲区的作用——缓冲输入输出，提升效率，减少系统调用
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色。
 */
export function IOMemoryBufferDiagram() {
  const token = {
    accent: "var(--accent)",
    border: "var(--border)",
    bg: "var(--bg)",
    bgElevated: "var(--bg-elevated)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 700 390"
          role="img"
          aria-label="printf/scanf 与输出/输入缓冲区、控制台的关系图"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* 标题 */}
          <text x="350" y="24" fontSize="14" fontWeight="700" fill={token.textPrimary} textAnchor="middle">
            printf / scanf 与缓冲区的关系
          </text>

          {/* ===== 左侧：printf → 输出缓冲区 → 控制台 ===== */}
          {/* 程序 printf */}
          <rect x="40" y="52" width="220" height="48" rx="8" fill={token.bg} stroke={token.accent} strokeWidth="2" />
          <text x="150" y="74" fontSize="12" fill={token.accent} textAnchor="middle" fontFamily="monospace">
            printf("Hello, %d", 42)
          </text>
          <text x="150" y="90" fontSize="10" fill={token.textSecondary} textAnchor="middle">
            格式化 → 写入输出缓冲区
          </text>

          {/* 箭头 → 输出缓冲区 */}
          <line x1="260" y1="76" x2="300" y2="76" stroke={token.accent} strokeWidth="2" markerEnd="url(#arrowAc)" />

          {/* 输出缓冲区 */}
          <rect x="310" y="46" width="170" height="60" rx="6" fill={token.bg} stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 3" />
          <text x="395" y="68" fontSize="11" fontWeight="700" fill={token.textSecondary} textAnchor="middle">
            输出缓冲区
          </text>
          <text x="395" y="86" fontSize="10" fill={token.textSecondary} textAnchor="middle">
            stdout buffer
          </text>
          <text x="395" y="100" fontSize="9" fill={token.textSecondary} opacity="0.6" textAnchor="middle">
            遇到 \n 或满时刷新
          </text>

          {/* 箭头 → 控制台 */}
          <line x1="480" y1="76" x2="520" y2="76" stroke={token.accent} strokeWidth="2" markerEnd="url(#arrowAc)" />

          {/* 控制台 */}
          <rect x="530" y="52" width="140" height="48" rx="8" fill={token.bg} stroke={token.border} />
          <text x="600" y="75" fontSize="12" fill={token.textPrimary} textAnchor="middle">
            🖥 控制台
          </text>
          <text x="600" y="91" fontSize="10" fill={token.textSecondary} textAnchor="middle">
            显示 Hello, 42
          </text>

          {/* ===== 右侧：键盘 → 输入缓冲区 → scanf ===== */}
          {/* 键盘 */}
          <rect x="530" y="130" width="140" height="48" rx="8" fill={token.bg} stroke={token.border} />
          <text x="600" y="153" fontSize="12" fill={token.textPrimary} textAnchor="middle">
            ⌨ 键盘
          </text>
          <text x="600" y="169" fontSize="10" fill={token.textSecondary} textAnchor="middle">
            用户输入 42↵
          </text>

          {/* 箭头 → 输入缓冲区 */}
          <line x1="525" y1="154" x2="485" y2="154" stroke="rgb(99,179,237)" strokeWidth="2" markerEnd="url(#arrowAcB)" />

          {/* 输入缓冲区 */}
          <rect x="310" y="124" width="170" height="60" rx="6" fill={token.bg} stroke="rgb(99,179,237)" strokeWidth="1" strokeDasharray="6 3" />
          <text x="395" y="146" fontSize="11" fontWeight="700" fill={token.textSecondary} textAnchor="middle">
            输入缓冲区
          </text>
          <text x="395" y="164" fontSize="10" fill={token.textSecondary} textAnchor="middle">
            stdin buffer
          </text>
          <text x="395" y="178" fontSize="9" fill={token.textSecondary} opacity="0.6" textAnchor="middle">
            暂存键盘输入的全部字符
          </text>

          {/* 箭头 → scanf */}
          <line x1="305" y1="154" x2="265" y2="154" stroke="rgb(99,179,237)" strokeWidth="2" markerEnd="url(#arrowAcB)" />

          {/* scanf */}
          <rect x="40" y="130" width="220" height="48" rx="8" fill={token.bg} stroke="rgb(99,179,237)" strokeWidth="2" />
          <text x="150" y="152" fontSize="12" fill="rgb(99,179,237)" textAnchor="middle" fontFamily="monospace">
            scanf("%d", &n)
          </text>
          <text x="150" y="168" fontSize="10" fill={token.textSecondary} textAnchor="middle">
            从缓冲区读取 → 存入变量 n
          </text>

          {/* ===== 底部解释区 ===== */}
          <rect x="40" y="210" width="630" height="84" rx="6" fill={token.bg} stroke={token.border} />
          <text x="60" y="234" fontSize="12" fontWeight="700" fill={token.textPrimary}>
            "缓冲"是什么意思？为什么不直接从键盘读？
          </text>
          <text x="60" y="250" fontSize="11" fill={token.textSecondary}>
            缓冲 = 程序和硬件之间的中转站。键盘逐字符送来，缓冲区攒够再一起处理，
          </text>
          <text x="60" y="264" fontSize="11" fill={token.textSecondary}>
            避免 scanf("%d") 每次都跟键盘交互一次。
          </text>
          <text x="60" y="278" fontSize="11" fill={token.textSecondary}>
            输出缓冲区攒着 printf 内容，遇到换行符或缓冲区满才刷到控制台。
          </text>

          {/* ===== 缓冲区残留提醒 ===== */}
          <rect x="40" y="310" width="630" height="60" rx="6" fill="rgb(229,181,103)" opacity="0.08" stroke="rgb(229,181,103)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="60" y="330" fontSize="11" fontWeight="700" fill="rgb(229,181,103)">
            ⚠ 重要：输入缓冲区残留问题
          </text>
          <text x="60" y="348" fontSize="11" fill="rgb(229,181,103)">
            scanf 只吃掉匹配内容——换行符等留在缓冲区，下次读取会意外读到"剩菜"。
          </text>

          {/* 箭头标记 */}
          <defs>
            <marker id="arrowAc" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={token.accent} />
            </marker>
            <marker id="arrowAcB" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgb(99,179,237)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        printf 和 scanf 都不直接跟硬件打交道——它们通过缓冲区这个中转站来往于程序和设备之间。缓冲区的存在让输入输出高效有序，但也是 C 初学者「输入被跳过」类 bug 的根源。
      </figcaption>
    </figure>
  );
}
