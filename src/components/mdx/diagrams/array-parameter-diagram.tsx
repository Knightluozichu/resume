/**
 * <ArrayParameterDiagram>：数组形参退化示意图。
 *
 * 展示「数组作为函数形参时退化为指针」的核心机制：
 * 函数内部无法知道数组长度——因为传入的只是一个指向首元素的指针。
 * 分三栏：数组声明 → 函数形参中退化 → 后果（sizeof 失效、必须单独传长度）
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function ArrayParameterDiagram() {
  const marginL = 24;
  const colW = 180;
  const gap = 20;
  const col1 = marginL;
  const col2 = col1 + colW + gap;
  const col3 = col2 + colW + gap;

  const topY = 48;
  const blockH = 210;

  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const cx = (x: number) => x + colW / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 400"
          role="img"
          aria-label="数组形参退化示意图：数组在函数形参中自动退化为指针。int[10] 在调用方是一组连续的整数盒子，传进函数后变成只指向首元素的指针——函数不知道数组有多长。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ═══════ 栏一：调用方的数组 ═══════ */}
          <text x={cx(col1)} y={topY} textAnchor="middle" fontSize="16" fontWeight="700" fill={accent} fontFamily="monospace">
            调用方：数组
          </text>

          <rect x={col1} y={topY + 12} width={colW} height={blockH} rx="10" fill={bg} stroke={border} strokeWidth="1.5" />

          {/* 数组元素图示 */}
          <text x={col1 + 12} y={topY + 42} fontSize="11" fill={secondary} fontFamily="monospace">
            int arr[5] = {'{'}1,2,3,4,5{'}'};
          </text>

          {/* 5 个小格子 */}
          {[1, 2, 3, 4, 5].map((v, i) => (
            <rect
              key={i}
              x={col1 + 12 + i * 33}
              y={topY + 56}
              width={30}
              height={30}
              rx="4"
              fill={bg}
              stroke={accent}
              strokeWidth="1.5"
            />
          ))}
          {[1, 2, 3, 4, 5].map((v, i) => (
            <text
              key={i}
              x={col1 + 27 + i * 33}
              y={topY + 76}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              {v}
            </text>
          ))}

          {/* sizeof 有效 */}
          <text x={col1 + 12} y={topY + 114} fontSize="11" fill={primary} fontFamily="monospace">
            sizeof(arr) = 20
          </text>
          <text x={col1 + 12} y={topY + 136} fontSize="10" fill={secondary}>
            (5 × 4 字节 = 20)
          </text>

          {/* 知道长度 */}
          <text x={col1 + 12} y={topY + 164} fontSize="11" fill={primary} fontFamily="monospace">
            sizeof(arr)/sizeof(arr[0])
          </text>
          <text x={col1 + 12} y={topY + 186} fontSize="10" fill={secondary}>
            = 20/4 = 5 ✓ 长度可知
          </text>

          {/* ═══════ 栏二：退化 ═══════ */}
          <text x={cx(col2)} y={topY} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            函数形参：退化为指针
          </text>

          <rect x={col2} y={topY + 12} width={colW} height={blockH} rx="10" fill={bg} stroke={accent} strokeWidth="2" />

          <text x={col2 + 12} y={topY + 42} fontSize="11" fill={secondary} fontFamily="monospace">
            这四种写法完全等价：
          </text>

          {/* 四种等价声明 */}
          <rect x={col2 + 8} y={topY + 50} width={colW - 16} height={80} rx="6" fill={bg} stroke={border} strokeWidth="1" />

          <text x={col2 + 16} y={topY + 68} fontSize="10" fill={primary} fontFamily="monospace">
            void f(int arr[10]);
          </text>
          <text x={col2 + 16} y={topY + 84} fontSize="10" fill={primary} fontFamily="monospace">
            void f(int arr[]);
          </text>
          <text x={col2 + 16} y={topY + 100} fontSize="10" fill={primary} fontFamily="monospace">
            void f(int arr[5]);
          </text>
          <text x={col2 + 16} y={topY + 116} fontSize="10" fontWeight="700" fill={accent} fontFamily="monospace">
            void f(int *arr);
          </text>

          {/* 指针示意图 */}
          <text x={col2 + 12} y={topY + 152} fontSize="11" fill={accent} fontFamily="monospace">
            函数内只拿到一个指针
          </text>

          {/* 指针盒子 */}
          <rect x={col2 + 40} y={topY + 160} width={100} height={28} rx="4" fill={accent} opacity={0.12} stroke={accent} strokeWidth="1.5" />
          <text x={col2 + 90} y={topY + 180} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
            int* arr
          </text>

          {/* 指针指向首元素 */}
          <line x1={col2 + 90} y1={topY + 160} x2={col2 + 58} y2={topY + 88} stroke={accent} strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowHeadAccent)" />
          <text x={col2 + 52} y={topY + 108} fontSize="9" fill={accent}>
            指向 arr[0]
          </text>

          {/* ═══════ 栏三：后果 ═══════ */}
          <text x={cx(col3)} y={topY} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            函数内：长度丢失
          </text>

          <rect x={col3} y={topY + 12} width={colW} height={blockH} rx="10" fill={bg} stroke={border} strokeWidth="1.5" />

          {/* sizeof 失效 */}
          <text x={col3 + 12} y={topY + 42} fontSize="11" fill={secondary} fontFamily="monospace">
            sizeof(arr) = ?
          </text>
          <text x={col3 + 12} y={topY + 64} fontSize="10" fill={accent} fontWeight="600" fontFamily="monospace">
            = 8 （64 位上指针大小）
          </text>
          <text x={col3 + 12} y={topY + 82} fontSize="10" fill={secondary}>
            不是 20！完全不知道长度
          </text>

          {/* 解决方案 */}
          <rect x={col3 + 8} y={topY + 96} width={colW - 16} height={66} rx="6" fill={accent} opacity={0.08} stroke={accent} strokeWidth="1" />

          <text x={col3 + 16} y={topY + 114} fontSize="10" fontWeight="700" fill={accent}>
            必须单独传长度：
          </text>
          <text x={col3 + 16} y={topY + 134} fontSize="10" fill={primary} fontFamily="monospace">
            void f(int *arr, int n)
          </text>
          <text x={col3 + 16} y={topY + 152} fontSize="10" fill={secondary}>
            或传首/尾后指针（begin/end）
          </text>

          {/* ═══════ 底部总结条 ═══════ */}
          <rect x={marginL} y={topY + blockH + 32} width={640 - marginL * 2} height={36} rx="6" fill={accent} opacity={0.08} stroke={accent} strokeWidth="1" />
          <text x={marginL + 14} y={topY + blockH + 56} fontSize="13" fontWeight="600" fill={accent} fontFamily="monospace">
            数组形参 = 指针形参（完全等价）—— 编译器不管你在 [] 里写什么数，都当成 T* 处理。函数里永远不知道数组长度。
          </text>

          {/* 底部注释 */}
          <text x={marginL + 10} y={topY + blockH + 90} fontSize="11" fill={secondary} fontFamily="monospace">
            例外：void f(int (&arr)[10]); —— 带括号的引用可以保留数组长度信息，但极少用。
          </text>
          <text x={marginL + 10} y={topY + blockH + 112} fontSize="11" fill={secondary} fontFamily="monospace">
            实践法则：凡是函数需要知道数组长度，一律把长度作为第二个参数传进去。
          </text>

          <defs>
            <marker id="arrowHeadAccent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        把数组传给函数时，传递的不是整个数组，而是指向第一个元素的指针。函数内部 `sizeof(arr)` 返回的是指针大小而不是数组大小——这是 C++ 新手最高频的惊愕之一。
      </figcaption>
    </figure>
  );
}
