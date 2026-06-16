/**
 * <ScanfInputDiagram step={1|2|3}>：scanf 从输入缓冲区读取数据的流程示意。
 *
 * Step 1: 用户键盘输入 "42 3.14\n" → 进入输入缓冲区
 * Step 2: scanf("%d %f", &n, &f) 从缓冲区读取，匹配 %d=42 存入 &n、%f=3.14 存入 &f
 * Step 3: 缓冲区残留（\n 等未匹配字符留在缓冲区，影响下一次输入）
 *
 * Server Component（纯展示，静态 SVG）。支持 step prop 控制展示阶段。token 色。
 */

interface ScanfInputDiagramProps {
  step?: 1 | 2 | 3;
}

export function ScanfInputDiagram({ step = 1 }: ScanfInputDiagramProps) {
  const token = {
    accent: "var(--accent)",
    border: "var(--border)",
    bg: "var(--bg)",
    bgElevated: "var(--bg-elevated)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
  };

  const showAll = step >= 3;
  const showMatch = step >= 2;
  const showInput = step >= 1;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 680 420"
          role="img"
          aria-label={`scanf 输入流程——第 ${step} 步`}
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* 标题 */}
          <text x="340" y="24" fontSize="14" fontWeight="700" fill={token.textPrimary} textAnchor="middle" fontFamily="monospace">
            scanf 输入流程
          </text>

          {/* ===== Step 1: 键盘输入 ===== */}
          <g opacity={showInput ? 1 : 0.3}>
            {/* 键盘图标 */}
            <rect x="40" y="48" width="120" height="44" rx="8" fill={token.bg} stroke={token.border} />
            <text x="100" y="75" fontSize="12" fill={token.textPrimary} textAnchor="middle">
              ⌨ 键盘
            </text>

            {/* 用户输入文字 */}
            <rect x="180" y="48" width="280" height="44" rx="6" fill={token.bg} stroke={step === 1 ? token.accent : token.border} strokeWidth={step === 1 ? "2" : "1"} />
            <text x="320" y="75" fontSize="13" fill={step === 1 ? token.accent : token.textSecondary} textAnchor="middle" fontFamily="monospace">
              {"42 3.14↵"}
            </text>

            {/* 箭头 */}
            <line x1="160" y1="70" x2="175" y2="70" stroke={token.accent} strokeWidth="2" markerEnd="url(#arrowAc)" />

            {/* Step 1 标记 */}
            {step === 1 && (
              <text x="472" y="75" fontSize="12" fontWeight="700" fill={token.accent}>
                ← 第一步：用户输入
              </text>
            )}
          </g>

          {/* ===== 输入缓冲区 ===== */}
          <g opacity={showInput ? 1 : 0.3}>
            <rect x="40" y="110" width="600" height={92} rx="6" fill={token.bg} stroke={token.border} />
            <text x="60" y="128" fontSize="11" fill={token.textSecondary}>
              输入缓冲区（stdin buffer）
            </text>

            {/* 缓冲区里的数据 */}
            {showInput && (
              <>
                <rect x="60" y="140" width={42} height={26} rx="4" fill={token.accent} opacity={showMatch ? 0.18 : 0.25} stroke={showMatch ? token.accent : token.border} strokeWidth={showMatch ? "2" : "1"} />
                <text x="81" y="158" fontSize="12" fontWeight="700" fill={token.accent} textAnchor="middle" fontFamily="monospace">4</text>
                <rect x="104" y="140" width={42} height={26} rx="4" fill={token.accent} opacity={showMatch ? 0.18 : 0.25} stroke={showMatch ? token.accent : token.border} strokeWidth={showMatch ? "2" : "1"} />
                <text x="125" y="158" fontSize="12" fontWeight="700" fill={token.accent} textAnchor="middle" fontFamily="monospace">2</text>
                <rect x="148" y="140" width={42} height={26} rx="4" fill={token.border} opacity={0.4} stroke={token.border} />
                <text x="169" y="158" fontSize="12" fill={token.textSecondary} textAnchor="middle" fontFamily="monospace"> </text>
                <rect x="192" y="140" width={42} height={26} rx="4" fill="rgb(99,179,237)" opacity={showMatch ? 0.18 : 0.25} stroke={showMatch ? "rgb(99,179,237)" : token.border} strokeWidth={showMatch ? "2" : "1"} />
                <text x="213" y="158" fontSize="12" fontWeight="700" fill="rgb(99,179,237)" textAnchor="middle" fontFamily="monospace">3</text>
                <rect x="236" y="140" width={42} height={26} rx="4" fill="rgb(99,179,237)" opacity={showMatch ? 0.18 : 0.25} stroke={showMatch ? "rgb(99,179,237)" : token.border} strokeWidth={showMatch ? "2" : "1"} />
                <text x="257" y="158" fontSize="12" fontWeight="700" fill="rgb(99,179,237)" textAnchor="middle" fontFamily="monospace">.</text>
                <rect x="280" y="140" width={42} height={26} rx="4" fill="rgb(99,179,237)" opacity={showMatch ? 0.18 : 0.25} stroke={showMatch ? "rgb(99,179,237)" : token.border} strokeWidth={showMatch ? "2" : "1"} />
                <text x="301" y="158" fontSize="12" fontWeight="700" fill="rgb(99,179,237)" textAnchor="middle" fontFamily="monospace">1</text>
                <rect x="324" y="140" width={42} height={26} rx="4" fill="rgb(99,179,237)" opacity={showMatch ? 0.18 : 0.25} stroke={showMatch ? "rgb(99,179,237)" : token.border} strokeWidth={showMatch ? "2" : "1"} />
                <text x="345" y="158" fontSize="12" fontWeight="700" fill="rgb(99,179,237)" textAnchor="middle" fontFamily="monospace">4</text>
                <rect x="368" y="140" width={42} height={26} rx="4" fill="rgb(229,181,103)" opacity={showAll ? 0.35 : 0.1} stroke={showAll ? "rgb(229,181,103)" : token.border} strokeWidth={showAll ? "2" : "1"} />
                <text x="389" y="158" fontSize="12" fontWeight="700" fill={showAll ? "rgb(229,181,103)" : token.textSecondary} textAnchor="middle" fontFamily="monospace">↵</text>
              </>
            )}

            {/* 残留警告 */}
            {showAll && (
              <text x="430" y="184" fontSize="11" fill="rgb(229,181,103)">
                ← \n 残留在缓冲区！
              </text>
            )}
          </g>

          {/* ===== Step 2: scanf 匹配 ===== */}
          <g opacity={showMatch ? 1 : 0.2}>
            <text x="340" y="230" fontSize="12" fontWeight="700" fill={token.accent} textAnchor="middle" fontFamily="monospace">
              scanf("%d %f", &n, &f);
            </text>
            <text x="340" y="248" fontSize="10" fill={showMatch ? token.textSecondary : token.border} textAnchor="middle">
              格式串告诉 scanf：先读一个整数 → 再读一个浮点数
            </text>
          </g>

          {/* ===== 变量接收 ===== */}
          <g opacity={showMatch ? 1 : 0.2}>
            {/* n 变量 */}
            <rect x="80" y="276" width="200" height={60} rx="6" fill={token.bg} stroke={token.accent} strokeWidth="2" />
            <text x="180" y="300" fontSize="13" fontWeight="700" fill={token.accent} textAnchor="middle" fontFamily="monospace">
              n = 42
            </text>
            <text x="180" y="320" fontSize="10" fill={token.textSecondary} textAnchor="middle">
              int n; &n = 0x...
            </text>

            {/* f 变量 */}
            <rect x="360" y="276" width="200" height={60} rx="6" fill={token.bg} stroke="rgb(99,179,237)" strokeWidth="2" />
            <text x="460" y="300" fontSize="13" fontWeight="700" fill="rgb(99,179,237)" textAnchor="middle" fontFamily="monospace">
              f = 3.14
            </text>
            <text x="460" y="320" fontSize="10" fill={token.textSecondary} textAnchor="middle">
              float f; &f = 0x...
            </text>

            {/* 箭头：缓冲区 → n */}
            <line x1="220" y1="204" x2="220" y2="271" stroke={token.accent} strokeWidth="2" markerEnd="url(#arrowAc)" />
            {/* 箭头：缓冲区 → f */}
            <line x1="420" y1="204" x2="420" y2="271" stroke="rgb(99,179,237)" strokeWidth="2" markerEnd="url(#arrowAc2)" />
          </g>

          {/* ===== Step 3: 缓冲区残留 ===== */}
          {showAll && (
            <g>
              <rect x="80" y="354" width="500" height={48} rx="6" fill="rgb(229,181,103)" opacity="0.08" stroke="rgb(229,181,103)" strokeWidth="1" strokeDasharray="4 3" />
              <text x="330" y="374" fontSize="11" fill="rgb(229,181,103)" textAnchor="middle">
                ⚠ 残留的 \n 会喂给下一个 scanf / getchar，造成"输入被跳过"的经典 bug
              </text>
              <text x="330" y="391" fontSize="10" fill={token.textSecondary} textAnchor="middle">
                解决：scanf 后加 getchar() 吃掉换行，或用 fgets() 替代 scanf
              </text>
            </g>
          )}

          {/* 箭头标记定义 */}
          <defs>
            <marker id="arrowAc" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={token.accent} />
            </marker>
            <marker id="arrowAc2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgb(99,179,237)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "第一步：用户输入的内容先进入键盘缓冲区，scanf 从这里读而不是直接从键盘读。"}
        {step === 2 && "第二步：scanf 按格式串从缓冲区匹配数据——%d 读整数、%f 读浮点数——用 & 取变量地址写入。"}
        {step === 3 && '第三步：scanf 格式串之外未匹配的字符（如换行符 \\n）残留在缓冲区——下一次输入会被干扰，这是 C 初学者最容易遇到的\u201c输入失灵\u201dbug。'}
      </figcaption>
    </figure>
  );
}
