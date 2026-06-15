/**
 * <StructPointerAccessDiagram>：结构体变量 . 与指针 -> 访问成员（step 1-3）。
 *
 * step 1: 结构体变量 + 点号访问
 * step 2: 取地址赋给结构体指针
 * step 3: 箭头运算符 -> 访问成员
 */

interface StructPointerAccessDiagramProps {
  step?: 1 | 2 | 3;
}

export function StructPointerAccessDiagram({ step = 3 }: StructPointerAccessDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";

  const highlight = (s: number) => (step === s ? 1 : step > s ? 0.75 : 0.35);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 300"
          role="img"
          aria-label="结构体点号与箭头运算符访问成员的三步示意"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            . 与 -&gt; 访问结构体成员
          </text>

          {/* Step 1: struct variable */}
          <g opacity={highlight(1)}>
            <rect
              x={40}
              y={50}
              width={180}
              height={110}
              rx="8"
              fill={step === 1 ? bgEl : bg}
              stroke={step === 1 ? accent : border}
              strokeWidth={step === 1 ? 2.5 : 1.5}
            />
            <text x={130} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill={step === 1 ? accent : secondary}>
              ① 结构体变量
            </text>
            <text x={130} y={94} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
              struct Book b;
            </text>
            <text x={130} y={114} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
              b.price = 29.9;
            </text>
            <text x={130} y={134} textAnchor="middle" fontSize="9" fill={secondary}>
              变量名 . 成员
            </text>
            <rect x={70} y={142} width={120} height={12} rx="3" fill={accent} opacity={0.15} />
          </g>

          {/* Step 2: pointer assignment */}
          <g opacity={highlight(2)}>
            <rect
              x={230}
              y={50}
              width={180}
              height={110}
              rx="8"
              fill={step === 2 ? bgEl : bg}
              stroke={step === 2 ? accent : border}
              strokeWidth={step === 2 ? 2.5 : 1.5}
            />
            <text x={320} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill={step === 2 ? accent : secondary}>
              ② 取地址
            </text>
            <text x={320} y={94} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
              struct Book *pb;
            </text>
            <text x={320} y={114} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
              pb = &amp;b;
            </text>
            <text x={320} y={134} textAnchor="middle" fontSize="9" fill={secondary}>
              pb 指向 b 的首地址
            </text>
          </g>

          {/* Step 3: arrow access */}
          <g opacity={highlight(3)}>
            <rect
              x={420}
              y={50}
              width={180}
              height={110}
              rx="8"
              fill={step === 3 ? bgEl : bg}
              stroke={step === 3 ? accent : border}
              strokeWidth={step === 3 ? 2.5 : 1.5}
            />
            <text x={510} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill={step === 3 ? accent : secondary}>
              ③ 箭头访问
            </text>
            <text x={510} y={94} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
              pb-&gt;price = 19.9;
            </text>
            <text x={510} y={114} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
              (*pb).price 等价
            </text>
            <text x={510} y={134} textAnchor="middle" fontSize="9" fill={secondary}>
              指针名 -&gt; 成员
            </text>
          </g>

          {/* Memory visual */}
          <rect x={120} y={185} width={400} height={56} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={140} y={208} fontSize="10" fontWeight="600" fill={secondary}>
            struct Book b 在内存中
          </text>
          <rect x={140} y={218} width={80} height={18} rx="4" fill={accent} opacity={0.2} stroke={accent} strokeWidth="1" />
          <text x={180} y={231} textAnchor="middle" fontSize="9" fill={primary} fontFamily="monospace">
            title
          </text>
          <rect x={230} y={218} width={60} height={18} rx="4" fill={accent} opacity={step >= 1 ? 0.35 : 0.15} stroke={accent} strokeWidth="1" />
          <text x={260} y={231} textAnchor="middle" fontSize="9" fill={primary} fontFamily="monospace">
            price
          </text>
          <rect x={300} y={218} width={50} height={18} rx="4" fill={accent} opacity={0.2} stroke={accent} strokeWidth="1" />
          <text x={325} y={231} textAnchor="middle" fontSize="9" fill={primary} fontFamily="monospace">
            pages
          </text>

          {step >= 2 && (
            <>
              <line x1={320} y1={175} x2={260} y2={218} stroke={accent} strokeWidth="1.5" markerEnd="url(#spaArrow)" />
              <text x={300} y={168} fontSize="9" fill={accent} fontFamily="monospace">
                pb →
              </text>
            </>
          )}

          <text x={320} y={278} textAnchor="middle" fontSize="10" fill={secondary}>
            {step === 1 && "b.price：直接通过变量名访问成员"}
            {step === 2 && "pb = &b：指针保存结构体起始地址；可用 (*pb).member"}
            {step === 3 && "pb->price 是 (*pb).price 的语法糖；函数参数常用 struct T * 避免拷贝"}
          </text>

          <defs>
            <marker id="spaArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        结构体变量用点号访问成员；指向结构体的指针用箭头（或先解引用再点号）。传 struct 指针进函数可避免整结构体拷贝。
      </figcaption>
    </figure>
  );
}
