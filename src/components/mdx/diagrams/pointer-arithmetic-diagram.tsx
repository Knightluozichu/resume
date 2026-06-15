/**
 * <PointerArithmeticDiagram>：指针算术 p+1 移动 sizeof(type) 字节。
 *
 * 三步：① p 指向 ar[0] ② p+1 指向 ar[1] ③ p+2 指向 ar[2]
 * 支持 step prop (1-3)。
 */

interface PointerArithmeticDiagramProps {
  step?: 1 | 2 | 3;
}

export function PointerArithmeticDiagram({ step = 3 }: PointerArithmeticDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const values = [10, 20, 30, 40, 50];
  const cellW = 96;
  const startX = 72;
  const memY = 100;
  const cellH = 52;

  const highlight = (s: number) => (step === s ? 1 : step > s ? 0.75 : 0.35);
  const ptrIndex = step === 1 ? 0 : step === 2 ? 1 : 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="指针算术示意图：p+1 不是加 1 字节而是加 sizeof(int) 字节"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            int *p = ar;  /* p 指向 ar[0] */
          </text>

          {values.map((v, i) => (
            <g key={`cell-${i}`} opacity={i <= ptrIndex ? 1 : 0.45}>
              <rect
                x={startX + i * cellW}
                y={memY}
                width={cellW - 4}
                height={cellH}
                rx="6"
                fill={i === ptrIndex ? accent : bg}
                opacity={i === ptrIndex ? 0.18 : 0.08}
                stroke={i === ptrIndex ? accent : border}
                strokeWidth={i === ptrIndex ? 2 : 1.5}
              />
              <text
                x={startX + i * cellW + (cellW - 4) / 2}
                y={memY + 22}
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
                fontFamily="monospace"
              >
                ar[{i}]
              </text>
              <text
                x={startX + i * cellW + (cellW - 4) / 2}
                y={memY + 42}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {v}
              </text>
            </g>
          ))}

          <g opacity={highlight(1)}>
            <rect x={24} y={180} width={180} height={72} rx="8" fill={bg} stroke={step === 1 ? accent : border} strokeWidth={step === 1 ? 2 : 1} />
            <text x={40} y={204} fontSize="12" fontWeight="700" fill={step === 1 ? accent : primary}>
              ① p → ar[0]
            </text>
            <text x={40} y={224} fontSize="11" fill={secondary} fontFamily="monospace">
              *p == 10
            </text>
            <text x={40} y={242} fontSize="10" fill={secondary}>
              地址 0x1000
            </text>
          </g>

          <g opacity={highlight(2)}>
            <rect x={230} y={180} width={180} height={72} rx="8" fill={bg} stroke={step === 2 ? accent : border} strokeWidth={step === 2 ? 2 : 1} />
            <text x={246} y={204} fontSize="12" fontWeight="700" fill={step === 2 ? accent : primary}>
              ② p + 1 → ar[1]
            </text>
            <text x={246} y={224} fontSize="11" fill={secondary} fontFamily="monospace">
              *(p + 1) == 20
            </text>
            <text x={246} y={242} fontSize="10" fill={secondary}>
              地址 0x1004（+4 字节）
            </text>
          </g>

          <g opacity={highlight(3)}>
            <rect x={436} y={180} width={180} height={72} rx="8" fill={bg} stroke={step === 3 ? accent : border} strokeWidth={step === 3 ? 2 : 1} />
            <text x={452} y={204} fontSize="12" fontWeight="700" fill={step === 3 ? accent : primary}>
              ③ p + 2 → ar[2]
            </text>
            <text x={452} y={224} fontSize="11" fill={secondary} fontFamily="monospace">
              *(p + 2) == 30
            </text>
            <text x={452} y={242} fontSize="10" fill={secondary}>
              地址 0x1008（再 +4）
            </text>
          </g>

          <path
            d={`M ${startX + (cellW - 4) / 2} ${memY - 6} L ${startX + ptrIndex * cellW + (cellW - 4) / 2} ${memY - 6}`}
            stroke={accent}
            strokeWidth="2"
            markerEnd="url(#ptrArithArrow)"
          />
          <text x={startX + ptrIndex * cellW + (cellW - 4) / 2} y={memY - 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
            p{step > 1 ? `+${step - 1}` : ""}
          </text>

          <text x={24} y={290} fontSize="12" fontWeight="600" fill={accent}>
            {step === 1 && "① p 保存 ar[0] 的地址"}
            {step === 2 && "② p+1 跳过 1 个 int（4 字节），不是 +1 字节"}
            {step === 3 && "③ p+n 指向 ar[n]；*(p+n) 等价于 ar[n]"}
          </text>
          <text x={24} y={312} fontSize="11" fill={secondary}>
            指针加减的是「元素个数」，编译器自动乘以 sizeof(指向的类型)。
          </text>

          <defs>
            <marker id="ptrArithArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        对 int *p 执行 p+1，地址增加 sizeof(int) 字节，指向数组下一个元素，而非下一个字节。
      </figcaption>
    </figure>
  );
}
