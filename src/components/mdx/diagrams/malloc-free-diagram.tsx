/**
 * <MallocFreeDiagram>：malloc → 使用 → free 生命周期（step 1-4）。
 *
 * step 1: malloc 向堆申请
 * step 2: 通过指针读写
 * step 3: free 归还
 * step 4: 忘记 free → 内存泄漏
 */

interface MallocFreeDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function MallocFreeDiagram({ step = 4 }: MallocFreeDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const heapColor = "rgb(237,137,99)";
  const leakColor = "rgb(229,103,103)";

  const highlight = (s: number) => (step === s ? 1 : step > s ? 0.7 : 0.35);

  const heapY = 100;
  const blockX = 280;
  const blockW = 120;
  const blockH = 48;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="malloc 分配、使用、free 释放与内存泄漏四步生命周期"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            int *p = malloc(n * sizeof(int));
          </text>

          {/* 堆区域 */}
          <rect x={200} y={heapY - 20} width={280} height={100} rx="10" fill={bg} stroke={heapColor} strokeWidth="2" />
          <text x={212} y={heapY - 4} fontSize="11" fontWeight="600" fill={heapColor}>
            堆 Heap
          </text>

          {/* 已分配块 */}
          <rect
            x={blockX}
            y={heapY + 16}
            width={blockW}
            height={blockH}
            rx="6"
            fill={step === 3 ? bg : heapColor}
            opacity={step === 3 ? 0.2 : step === 4 ? 0.5 : 0.15}
            stroke={step === 4 ? leakColor : heapColor}
            strokeWidth={step >= 2 && step !== 3 ? 2 : 1.5}
            strokeDasharray={step === 3 ? "4 3" : undefined}
          />
          <text
            x={blockX + blockW / 2}
            y={heapY + 44}
            textAnchor="middle"
            fontSize="11"
            fill={step === 3 ? secondary : primary}
            fontFamily="monospace"
          >
            {step === 3 ? "已释放" : step === 4 ? "泄漏块" : "n × int"}
          </text>

          {/* 指针 p */}
          <rect x={80} y={heapY + 28} width={80} height={32} rx="6" fill={bg} stroke={accent} strokeWidth="1.5" />
          <text x={120} y={heapY + 48} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
            p
          </text>
          {step >= 1 && step !== 3 && (
            <line
              x1={160}
              y1={heapY + 44}
              x2={blockX}
              y2={heapY + 40}
              stroke={step === 4 ? leakColor : accent}
              strokeWidth="2"
              markerEnd="url(#mfArrow)"
            />
          )}
          {step === 3 && (
            <text x={120} y={heapY + 78} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
              p 仍存旧地址（悬空）
            </text>
          )}

          {/* 四步说明卡 */}
          <g opacity={highlight(1)}>
            <rect x={24} y={200} width={136} height={64} rx="8" fill={bg} stroke={step === 1 ? accent : border} strokeWidth={step === 1 ? 2 : 1} />
            <text x={40} y={222} fontSize="11" fontWeight="700" fill={step === 1 ? accent : primary}>
              ① malloc
            </text>
            <text x={40} y={240} fontSize="10" fill={secondary}>
              堆上划 n×sizeof(int)
            </text>
            <text x={40} y={254} fontSize="10" fill={secondary}>
              返回 void* → 赋给 p
            </text>
          </g>

          <g opacity={highlight(2)}>
            <rect x={176} y={200} width={136} height={64} rx="8" fill={bg} stroke={step === 2 ? accent : border} strokeWidth={step === 2 ? 2 : 1} />
            <text x={192} y={222} fontSize="11" fontWeight="700" fill={step === 2 ? accent : primary}>
              ② 使用
            </text>
            <text x={192} y={240} fontSize="10" fill={secondary} fontFamily="monospace">
              p[i] = ...
            </text>
            <text x={192} y={254} fontSize="10" fill={secondary}>
              读写堆内存
            </text>
          </g>

          <g opacity={highlight(3)}>
            <rect x={328} y={200} width={136} height={64} rx="8" fill={bg} stroke={step === 3 ? accent : border} strokeWidth={step === 3 ? 2 : 1} />
            <text x={344} y={222} fontSize="11" fontWeight="700" fill={step === 3 ? accent : primary}>
              ③ free(p)
            </text>
            <text x={344} y={240} fontSize="10" fill={secondary}>
              归还堆块
            </text>
            <text x={344} y={254} fontSize="10" fill={secondary}>
              之后勿再解引用 p
            </text>
          </g>

          <g opacity={highlight(4)}>
            <rect x={480} y={200} width={136} height={64} rx="8" fill={bg} stroke={step === 4 ? leakColor : border} strokeWidth={step === 4 ? 2 : 1} />
            <text x={496} y={222} fontSize="11" fontWeight="700" fill={step === 4 ? leakColor : primary}>
              ④ 泄漏
            </text>
            <text x={496} y={240} fontSize="10" fill={secondary}>
              只 malloc 不 free
            </text>
            <text x={496} y={254} fontSize="10" fill={secondary}>
              堆越用越少
            </text>
          </g>

          <text x={24} y={290} fontSize="12" fontWeight="600" fill={step === 4 ? leakColor : accent}>
            {step === 1 && "① malloc 成功时返回可用指针；失败返回 NULL，必须检查。"}
            {step === 2 && "② 通过 p 访问堆内存；p 的类型应 cast 成 int*。"}
            {step === 3 && "③ free 后块还给堆；继续 *p 是 use-after-free（未定义行为）。"}
            {step === 4 && "④ 丢失唯一指针却不 free → 内存泄漏，长跑程序会耗尽堆。"}
          </text>

          <defs>
            <marker id="mfArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={step === 4 ? leakColor : accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        动态内存三件套：malloc 申请、使用、free 释放。谁分配谁释放；成对出现，否则泄漏。
      </figcaption>
    </figure>
  );
}
