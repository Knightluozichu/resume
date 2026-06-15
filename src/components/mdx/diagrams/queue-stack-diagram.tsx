/**
 * <QueueStackDiagram>：队列 FIFO vs 栈 LIFO 对比。
 */

export function QueueStackDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const success = "#3FB97F";
  const warn = "#E5B567";

  const drawStack = (x: number, items: string[], highlight: "top" | "bottom") => (
    <g>
      {items.map((item, i) => {
        const y = 200 - i * 36;
        const isHighlight =
          (highlight === "top" && i === items.length - 1) ||
          (highlight === "bottom" && i === 0);
        return (
          <rect
            key={item}
            x={x}
            y={y}
            width={88}
            height={32}
            rx="6"
            fill={isHighlight ? "var(--bg-elevated)" : bg}
            stroke={isHighlight ? accent : border}
            strokeWidth={isHighlight ? 2 : 1.5}
          />
        );
      })}
      {items.map((item, i) => {
        const y = 200 - i * 36;
        return (
          <text
            key={`t-${item}`}
            x={x + 44}
            y={y + 21}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill={primary}
          >
            {item}
          </text>
        );
      })}
    </g>
  );

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="队列先进先出 FIFO 与栈后进先出 LIFO 对比"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* Queue side */}
          <text x={160} y={28} textAnchor="middle" fontSize="14" fontWeight="700" fill={success}>
            队列 Queue · FIFO
          </text>
          <text x={160} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            First In, First Out · 先进先出
          </text>

          <rect x={40} y={72} width={240} height={48} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={56} y={92} fontSize="10" fill={secondary}>
            front（队头·出队 dequeue）
          </text>
          <text x={200} y={92} fontSize="10" fill={secondary}>
            rear（队尾·入队 enqueue）
          </text>

          {["1", "2", "3"].map((n, i) => (
            <g key={`q-${n}`}>
              <rect
                x={56 + i * 72}
                y={104}
                width={56}
                height={40}
                rx="6"
                fill={i === 0 ? "var(--bg-elevated)" : bg}
                stroke={i === 0 ? success : i === 2 ? warn : border}
                strokeWidth={i === 0 || i === 2 ? 2 : 1.5}
              />
              <text x={84 + i * 72} y={130} textAnchor="middle" fontSize="14" fontWeight="600" fill={primary}>
                {n}
              </text>
            </g>
          ))}

          <text x={56} y={168} fontSize="10" fill={success}>
            ← 出队取 1（最早进入）
          </text>
          <text x={200} y={168} fontSize="10" fill={warn}>
            入队 4 →
          </text>

          <text x={160} y={200} textAnchor="middle" fontSize="11" fill={secondary}>
            像排队买票：先来的先服务
          </text>

          {/* Stack side */}
          <text x={480} y={28} textAnchor="middle" fontSize="14" fontWeight="700" fill={accent}>
            栈 Stack · LIFO
          </text>
          <text x={480} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            Last In, First Out · 后进先出
          </text>

          <text x={436} y={88} fontSize="10" fill={accent}>
            top（栈顶·push/pop）
          </text>
          {drawStack(436, ["1", "2", "3"], "top")}

          <text x={480} y={228} textAnchor="middle" fontSize="10" fill={accent}>
            ↑ push 入栈 / pop 出栈都在 top
          </text>
          <text x={480} y={248} textAnchor="middle" fontSize="11" fill={secondary}>
            像一摞盘子：最后放上的最先拿走
          </text>

          {/* divider */}
          <line x1={320} y1={56} x2={320} y2={280} stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* summary */}
          <rect x={24} y={288} width={592} height={44} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={320} y={308} textAnchor="middle" fontSize="11" fill={primary}>
            两者都可用数组 + 下标或链表实现；C 无内置容器，需手写或用库
          </text>
          <text x={320} y={324} textAnchor="middle" fontSize="10" fill={secondary}>
            队列：BFS、任务调度 · 栈：表达式求值、函数调用栈、撤销操作
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        队列从队尾入、队头出；栈在同一端 push 与 pop。约束「谁先谁后」是 ADT 的核心规则。
      </figcaption>
    </figure>
  );
}
