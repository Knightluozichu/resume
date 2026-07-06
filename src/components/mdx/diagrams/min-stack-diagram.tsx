"use client";

import { useState } from "react";

const STEPS = [
  {
    title: "初始",
    action: "empty",
    data: [] as number[],
    mins: [] as number[],
    note: "两个栈都为空，min() 不能调用。",
  },
  {
    title: "push(3)",
    action: "3",
    data: [3],
    mins: [3],
    note: "第一个元素入栈，当前最小值就是 3。",
  },
  {
    title: "push(4)",
    action: "4",
    data: [3, 4],
    mins: [3, 3],
    note: "4 比当前最小值 3 大，最小值快照继续保存 3。",
  },
  {
    title: "push(2)",
    action: "2",
    data: [3, 4, 2],
    mins: [3, 3, 2],
    note: "2 成为新的当前最小值，minStack 栈顶更新为 2。",
  },
  {
    title: "push(1)",
    action: "1",
    data: [3, 4, 2, 1],
    mins: [3, 3, 2, 1],
    note: "1 再次刷新最小值，min() 直接读取最小栈栈顶。",
  },
  {
    title: "pop()",
    action: "pop 1",
    data: [3, 4, 2],
    mins: [3, 3, 2],
    note: "两个栈同步弹出，最小值自然回退到上一层快照 2。",
  },
  {
    title: "pop()",
    action: "pop 2",
    data: [3, 4],
    mins: [3, 3],
    note: "弹出 2 后，minStack 栈顶恢复为 3。",
  },
];

function StackView({
  label,
  values,
  accent,
}: {
  label: string;
  values: number[];
  accent: string;
}) {
  const height = 172;
  const bottom = 198;
  const itemHeight = 32;
  const gap = 6;

  return (
    <g>
      <text x={0} y={16} fontSize={13} fontWeight={700} fill="var(--text-primary, #111827)">
        {label}
      </text>
      <path
        d={`M 0 42 V ${bottom} H 94 V 42`}
        fill="none"
        stroke="var(--border, #d1d5db)"
        strokeWidth={2}
      />
      {values.map((value, index) => {
        const y = bottom - (index + 1) * itemHeight - index * gap;
        const isTop = index === values.length - 1;
        return (
          <g key={`${label}-${index}-${value}`}>
            <rect
              x={10}
              y={y}
              width={74}
              height={itemHeight}
              rx={5}
              fill={isTop ? accent : "var(--card, #ffffff)"}
              stroke={accent}
              strokeWidth={isTop ? 2 : 1.5}
            />
            <text
              x={47}
              y={y + 20}
              textAnchor="middle"
              fontSize={14}
              fontWeight={700}
              fill={isTop ? "#ffffff" : "var(--text-primary, #111827)"}
            >
              {value}
            </text>
          </g>
        );
      })}
      <text x={0} y={height + 54} fontSize={11} fill="var(--text-secondary, #6b7280)">
        栈顶在上方，底部是最早入栈元素
      </text>
    </g>
  );
}

export function MinStackDiagram() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const currentMin = current.mins.length ? current.mins[current.mins.length - 1] : "-";

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[720px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 660 310"
          role="img"
          aria-label="包含 min 函数的栈可视化，展示数据栈和最小栈如何同步维护最小值。"
          className="mx-auto block h-auto w-full"
        >
          <g transform="translate(70 34)">
            <StackView label="dataStack" values={current.data} accent="#2563eb" />
          </g>
          <g transform="translate(280 34)">
            <StackView label="minStack" values={current.mins} accent="#059669" />
          </g>

          <g transform="translate(500 62)">
            <rect
              x={0}
              y={0}
              width={118}
              height={80}
              rx={8}
              fill="var(--card, #ffffff)"
              stroke="var(--border, #d1d5db)"
            />
            <text x={16} y={28} fontSize={13} fill="var(--text-secondary, #6b7280)">
              当前 min()
            </text>
            <text x={16} y={60} fontSize={28} fontWeight={800} fill="#059669">
              {currentMin}
            </text>
          </g>

          <g transform="translate(500 166)">
            <rect
              x={0}
              y={0}
              width={118}
              height={54}
              rx={8}
              fill="#f8fafc"
              stroke="#dbeafe"
            />
            <text x={16} y={23} fontSize={12} fill="#475569">
              当前操作
            </text>
            <text x={16} y={42} fontSize={15} fontWeight={700} fill="#2563eb">
              {current.action}
            </text>
          </g>

          <text x={70} y={278} fontSize={13} fill="var(--text-secondary, #6b7280)">
            {current.note}
          </text>
        </svg>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setStep((value) => Math.max(0, value - 1))}
            disabled={step === 0}
            className="rounded-md border border-border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <div className="flex gap-1.5" aria-label="步骤选择">
            {STEPS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`跳转到 ${item.title}`}
                onClick={() => setStep(index)}
                className={`h-2.5 w-2.5 rounded-full ${
                  index === step ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep((value) => Math.min(STEPS.length - 1, value + 1))}
            disabled={step === STEPS.length - 1}
            className="rounded-md border border-border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </figure>
  );
}
