/**
 * <ArrayPointerEquivalenceDiagram>：arr[i] 与 *(arr+i) 等价关系。
 *
 * 左右对照下标写法与指针解引用写法。
 */

export function ArrayPointerEquivalenceDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const i = 2;
  const value = 30;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="数组下标 ar[i] 与指针写法 *(arr+i) 等价示意图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            ar[i]  ≡  *(arr + i)
          </text>

          {/* 左：下标 */}
          <rect x={32} y={52} width={260} height={200} rx="10" fill={bg} stroke={accent} strokeWidth="2" />
          <text x={48} y={78} fontSize="13" fontWeight="700" fill={accent}>
            下标表示法
          </text>
          <text x={48} y={108} fontSize="14" fontWeight="700" fill={primary} fontFamily="monospace">
            ar[{i}]
          </text>
          <text x={48} y={132} fontSize="11" fill={secondary}>
            编译器翻译成：
          </text>
          <text x={48} y={152} fontSize="12" fill={secondary} fontFamily="monospace">
            起始地址 + i × sizeof(int)
          </text>
          <text x={48} y={172} fontSize="12" fill={secondary} fontFamily="monospace">
            再解引用取该地址的值
          </text>
          <rect x={48} y={188} width={120} height={44} rx="6" fill={accent} opacity={0.15} stroke={accent} strokeWidth="1.5" />
          <text x={108} y={216} textAnchor="middle" fontSize="18" fontWeight="700" fill={primary} fontFamily="monospace">
            {value}
          </text>

          {/* 右：指针 */}
          <rect x={348} y={52} width={260} height={200} rx="10" fill={bg} stroke={accent} strokeWidth="2" />
          <text x={364} y={78} fontSize="13" fontWeight="700" fill={accent}>
            指针表示法
          </text>
          <text x={364} y={108} fontSize="14" fontWeight="700" fill={primary} fontFamily="monospace">
            *(arr + {i})
          </text>
          <text x={364} y={132} fontSize="11" fill={secondary}>
            arr 退化为指向首元素的指针
          </text>
          <text x={364} y={152} fontSize="12" fill={secondary} fontFamily="monospace">
            arr + {i} → 第 {i} 个元素地址
          </text>
          <text x={364} y={172} fontSize="12" fill={secondary} fontFamily="monospace">
            * 解引用 → 取出 int 值
          </text>
          <rect x={364} y={188} width={120} height={44} rx="6" fill={accent} opacity={0.15} stroke={accent} strokeWidth="1.5" />
          <text x={424} y={216} textAnchor="middle" fontSize="18" fontWeight="700" fill={primary} fontFamily="monospace">
            {value}
          </text>

          {/* 等价箭头 */}
          <text x={320} y={150} textAnchor="middle" fontSize="28" fill={accent}>
            ⇔
          </text>

          <rect x={24} y={268} width={592} height={40} rx="8" fill={bg} stroke={border} strokeWidth="1" />
          <text x={40} y={294} fontSize="11" fontFamily="monospace" fill={primary}>
            for (i = 0; i &lt; n; i++) ar[i]++;  /* 与 */  for (p = ar; p &lt; ar+n; p++) (*p)++;
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        在大多数表达式里，数组名 ar 代表首元素地址。下标只是指针写法的语法糖。
      </figcaption>
    </figure>
  );
}
