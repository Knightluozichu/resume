/**
 * <StringPointerVsArrayDiagram>：char s[] vs char *s 区别。
 *
 * 左：数组在栈上可修改；右：指针指向只读字面量，修改未定义。
 */

export function StringPointerVsArrayDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const danger = "rgb(229,103,103)";
  const ok = "rgb(63,185,127)";

  const cellW = 44;
  const chars = ["H", "i", "\\0"];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="char 数组与 char 指针存储字符串的区别"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 左：char ar[] */}
          <text x={48} y={32} fontSize="13" fontWeight="700" fill={ok} fontFamily="monospace">
            char ar[] = "Hi";
          </text>
          <text x={48} y={52} fontSize="10" fill={secondary}>
            数组在栈上，内容可修改
          </text>

          <rect x={48} y={68} width={200} height={80} rx="8" fill={bg} stroke={ok} strokeWidth="1.5" />
          <text x={60} y={88} fontSize="10" fill={secondary}>
            栈 memory
          </text>
          {chars.map((ch, i) => (
            <g key={`ar-${i}`}>
              <rect
                x={60 + i * cellW}
                y={96}
                width={cellW - 4}
                height={36}
                rx="4"
                fill={accent}
                opacity={0.15}
                stroke={accent}
              />
              <text x={60 + i * cellW + (cellW - 4) / 2} y={118} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">
                {ch}
              </text>
            </g>
          ))}
          <text x={48} y={168} fontSize="10" fill={ok}>
            ar[0] = 'h';  ✓ 合法
          </text>
          <text x={48} y={186} fontSize="10" fill={secondary}>
            sizeof(ar) = 3（含 \\0）
          </text>

          {/* 右：char *ptr */}
          <text x={360} y={32} fontSize="13" fontWeight="700" fill={danger} fontFamily="monospace">
            char *ptr = "Hi";
          </text>
          <text x={360} y={52} fontSize="10" fill={secondary}>
            指针变量在栈，指向只读字面量
          </text>

          <rect x={360} y={68} width={56} height={48} rx="6" fill={accent} opacity={0.12} stroke={accent} />
          <text x={388} y={98} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
            ptr
          </text>
          <text x={388} y={130} textAnchor="middle" fontSize="9" fill={secondary}>
            栈
          </text>

          <path d="M 420 92 L 470 92" stroke={accent} strokeWidth="2" markerEnd="url(#strPtrArrow)" />

          <rect x={478} y={68} width={140} height={80} rx="8" fill={bg} stroke={danger} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={490} y={88} fontSize="10" fill={danger}>
            只读数据段
          </text>
          {chars.map((ch, i) => (
            <g key={`lit-${i}`}>
              <rect
                x={490 + i * cellW}
                y={96}
                width={cellW - 4}
                height={36}
                rx="4"
                fill={danger}
                opacity={0.12}
                stroke={danger}
              />
              <text x={490 + i * cellW + (cellW - 4) / 2} y={118} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">
                {ch}
              </text>
            </g>
          ))}
          <text x={360} y={168} fontSize="10" fill={danger}>
            ptr[0] = 'h';  ✗ 未定义行为
          </text>
          <text x={360} y={186} fontSize="10" fill={secondary}>
            sizeof(ptr) = 指针大小（8 或 4）
          </text>

          <rect x={24} y={220} width={592} height={120} rx="8" fill={bg} stroke={border} />
          <text x={40} y={246} fontSize="12" fontWeight="700" fill={primary}>
            记忆口诀
          </text>
          <text x={40} y={270} fontSize="11" fill={secondary}>
            • char ar[] = "..." → 在栈上分配字符数组，**可改**
          </text>
          <text x={40} y={290} fontSize="11" fill={secondary}>
            • char *p = "..." → p 存字面量地址，字面量**只读**；要可改请写 char ar[] 或 malloc
          </text>
          <text x={40} y={310} fontSize="11" fill={secondary}>
            • 函数参数 char s[] 与 char *s 等价——都接收指针，但调用方传入的若是字面量则仍不可改
          </text>

          <defs>
            <marker id="strPtrArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        数组版拥有可写副本；指针版指向编译器放在只读区的字面量——修改会崩溃或静默失败。
      </figcaption>
    </figure>
  );
}
