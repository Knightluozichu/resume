const STEPS = [
  { op: "push 1", stack: [1], next: 4 },
  { op: "push 2", stack: [1, 2], next: 4 },
  { op: "push 3", stack: [1, 2, 3], next: 4 },
  { op: "push 4", stack: [1, 2, 3, 4], next: 4 },
  { op: "pop 4", stack: [1, 2, 3], next: 5 },
  { op: "push 5", stack: [1, 2, 3, 5], next: 5 },
  { op: "pop 5, 3, 2, 1", stack: [], next: null },
];

export function StackPushPopOrderDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[760px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 760 300"
          role="img"
          aria-label="栈的压入弹出序列模拟。示例压入序列为 1 2 3 4 5，弹出序列为 4 5 3 2 1。"
          className="mx-auto block h-auto w-full"
        >
          <text x="24" y="30" fontSize="15" fontWeight="700" fill="var(--text-primary, #111827)">
            pushed: [1, 2, 3, 4, 5] / popped: [4, 5, 3, 2, 1]
          </text>

          {STEPS.map((step, index) => {
            const x = 24 + index * 104;
            return (
              <g key={step.op} transform={`translate(${x} 58)`}>
                <text x="0" y="0" fontSize="12" fontWeight="700" fill="#2563eb">
                  {step.op}
                </text>
                <path
                  d="M 0 22 V 162 H 64 V 22"
                  fill="none"
                  stroke="var(--border, #d1d5db)"
                  strokeWidth="2"
                />
                {step.stack.map((value, itemIndex) => {
                  const y = 132 - itemIndex * 28;
                  const top = itemIndex === step.stack.length - 1;
                  return (
                    <g key={`${step.op}-${value}-${itemIndex}`}>
                      <rect
                        x="8"
                        y={y}
                        width="48"
                        height="24"
                        rx="5"
                        fill={top ? "#2563eb" : "var(--card, #ffffff)"}
                        stroke="#2563eb"
                      />
                      <text
                        x="32"
                        y={y + 16}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill={top ? "#ffffff" : "var(--text-primary, #111827)"}
                      >
                        {value}
                      </text>
                    </g>
                  );
                })}
                <text x="0" y="186" fontSize="11" fill="var(--text-secondary, #6b7280)">
                  next pop: {step.next ?? "done"}
                </text>
              </g>
            );
          })}

          <text x="24" y="278" fontSize="13" fill="var(--text-secondary, #6b7280)">
            栈顶等于下一个目标弹出值时立即弹出；最终辅助栈为空，说明序列合法。
          </text>
        </svg>
      </div>
    </figure>
  );
}
