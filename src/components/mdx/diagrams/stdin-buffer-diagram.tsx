/**
 * <StdinBufferDiagram>：stdin 缓冲区与残留字符问题示意。
 *
 * 三步：① scanf 只吃掉匹配部分 ② 换行符留在缓冲区 ③ 下次 getchar 读到残留
 */

interface StdinBufferDiagramProps {
  step?: 1 | 2 | 3;
}

export function StdinBufferDiagram({ step = 3 }: StdinBufferDiagramProps) {
  const isActive = (st: number) => step >= st;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 380"
          role="img"
          aria-label="stdin 缓冲区残留字符示意图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            stdin 缓冲区与残留字符
          </text>

          {/* 键盘输入 */}
          <g opacity={isActive(1) ? 1 : 0.35}>
            <rect x={40} y={48} width={120} height={40} rx="8" fill={"var(--bg)"} stroke={"var(--border)"} />
            <text x={100} y={74} textAnchor="middle" fontSize="12" fill={"var(--text-primary)"} fontFamily="system-ui">
              ⌨ 用户输入
            </text>
            <rect x={180} y={48} width={200} height={40} rx="6" fill={"var(--bg)"} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={280} y={74} textAnchor="middle" fontSize="13" fill={"var(--accent)"} fontFamily="monospace">
              42↵
            </text>
            <text x={400} y={74} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
              ① 整行进入缓冲区
            </text>
          </g>

          {/* 缓冲区 */}
          <rect x={40} y={108} width={560} height={72} rx="8" fill={"var(--bg-elevated)"} stroke={"var(--border)"} strokeDasharray="6 3" />
          <text x={60} y={130} fontSize="11" fontWeight="700" fill={"var(--text-secondary)"} fontFamily="system-ui">
            stdin 输入缓冲区
          </text>

          <g opacity={isActive(1) ? 1 : 0.35}>
            <rect x={60} y={142} width={48} height={28} rx="4" fill={"var(--accent)"} fillOpacity={isActive(2) ? 0.08 : 0.2} stroke={isActive(2) ? "var(--text-secondary)" : "var(--accent)"} strokeWidth="1.5" />
            <text x={84} y={161} textAnchor="middle" fontSize="12" fontWeight="700" fill={isActive(2) ? "var(--text-secondary)" : "var(--accent)"} fontFamily="monospace">
              4
            </text>
            <rect x={112} y={142} width={48} height={28} rx="4" fill={"var(--accent)"} fillOpacity={isActive(2) ? 0.08 : 0.2} stroke={isActive(2) ? "var(--text-secondary)" : "var(--accent)"} strokeWidth="1.5" />
            <text x={136} y={161} textAnchor="middle" fontSize="12" fontWeight="700" fill={isActive(2) ? "var(--text-secondary)" : "var(--accent)"} fontFamily="monospace">
              2
            </text>
          </g>

          <g opacity={isActive(2) ? 1 : 0.35}>
            <rect x={168} y={142} width={48} height={28} rx="4" fill={"rgb(229,181,103)"} fillOpacity={0.2} stroke={"rgb(229,181,103)"} strokeWidth="2" />
            <text x={192} y={161} textAnchor="middle" fontSize="12" fontWeight="700" fill={"rgb(229,181,103)"} fontFamily="monospace">
              \n
            </text>
            <text x={230} y={161} fontSize="11" fill={"rgb(229,181,103)"} fontFamily="system-ui">
              ② scanf 不消费，残留！
            </text>
          </g>

          {/* scanf 箭头 */}
          <g opacity={isActive(1) ? 1 : 0.35}>
            <rect x={40} y={200} width={220} height={44} rx="8" fill={"var(--bg)"} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={150} y={228} textAnchor="middle" fontSize="12" fill={"var(--accent)"} fontFamily="monospace">
              scanf(&quot;%d&quot;, &amp;n)  → n=42
            </text>
            <line x1={260} y1={222} x2={300} y2={222} stroke={"var(--accent)"} strokeWidth="1.5" markerEnd="url(#sbd-ac)" />
            <text x={310} y={228} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
              只匹配整数部分
            </text>
          </g>

          {/* getchar 陷阱 */}
          <g opacity={isActive(3) ? 1 : 0.35}>
            <rect x={40} y={260} width={220} height={44} rx="8" fill={"var(--bg)"} stroke={"rgb(229,181,103)"} strokeWidth="1.5" />
            <text x={150} y={288} textAnchor="middle" fontSize="12" fill={"rgb(229,181,103)"} fontFamily="monospace">
              ch = getchar();  → &apos;\n&apos;
            </text>
            <text x={280} y={288} fontSize="11" fill={"rgb(229,181,103)"} fontFamily="system-ui">
              ③ 读到残留换行，不是新输入！
            </text>
          </g>

          {/* 清理方案 */}
          <rect x={40} y={318} width={560} height={48} rx="6" fill={"var(--bg)"} stroke={"var(--border)"} />
          <text x={60} y={340} fontSize="11" fontWeight="700" fill={"var(--text-primary)"} fontFamily="system-ui">
            修法：while ((ch = getchar()) != &apos;\n&apos; &amp;&amp; ch != EOF) ;
          </text>
          <text x={60} y={358} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            或 scanf(&quot;%*c&quot;) 吃掉一个字符；混合 scanf 与 getchar 时尤其要注意。
          </text>

          <defs>
            <marker id="sbd-ac" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--accent)"} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        scanf 按格式说明「挑食」——不匹配的部分留在 stdin 缓冲区。下一次字符读取会优先消费这些残留，造成「程序跳过等待输入」的错觉。
      </figcaption>
    </figure>
  );
}
