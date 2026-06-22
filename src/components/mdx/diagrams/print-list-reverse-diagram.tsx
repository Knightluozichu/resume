"use client";

import { useState } from "react";

interface StepData {
  title: string;
  ptrIndex: number; // 0: Node 1, 1: Node 2, 2: Node 3, 3: nullptr, -1: none
  ptrLabel: string; // "Node 1", "Node 2", etc.
  stack: string[];
  output: number[];
  activeNode: number; // Node index to highlight (0, 1, 2)
  action: string;
  description: string;
  addr: string;
  stackAction: string;
  isPush: boolean;
  isPop: boolean;
}

const RECURSION_STEPS: StepData[] = [
  {
    title: "步骤 0：初始化第一层递归",
    ptrIndex: 0,
    ptrLabel: "Node 1",
    stack: [],
    output: [],
    activeNode: 0,
    action: "递归调用 printListReverse(Node 2)",
    description: "递归从头节点开始。调用 <code>printListReverse(Node 1)</code>。当前 <code>curr</code> 指向节点 1（地址 0x101）。在打印当前节点前，我们需要先递归调用以处理后继节点。",
    addr: "0x101",
    stackAction: "无 (准备 PUSH 状态)",
    isPush: false,
    isPop: false,
  },
  {
    title: "步骤 1：进入第二层递归",
    ptrIndex: 1,
    ptrLabel: "Node 2",
    stack: ["print(Node 1)"],
    output: [],
    activeNode: 1,
    action: "递归调用 printListReverse(Node 3)",
    description: "调用 <code>printListReverse(Node 2)</code>，当前 <code>curr</code> 指向节点 2（地址 0x102）。系统在栈中压入了上一层函数状态 <code>print(Node 1)</code>，用于回溯时执行未完的打印指令。",
    addr: "0x102",
    stackAction: "PUSH: print(Node 1)",
    isPush: true,
    isPop: false,
  },
  {
    title: "步骤 2：进入第三层递归",
    ptrIndex: 2,
    ptrLabel: "Node 3",
    stack: ["print(Node 1)", "print(Node 2)"],
    output: [],
    activeNode: 2,
    action: "递归调用 printListReverse(nullptr)",
    description: "调用 <code>printListReverse(Node 3)</code>，当前 <code>curr</code> 指向节点 3（地址 0x103）。系统栈中已保存了前两层未完成的调用状态。",
    addr: "0x103",
    stackAction: "PUSH: print(Node 2)",
    isPush: true,
    isPop: false,
  },
  {
    title: "步骤 3：到达链表尾端，触发基准条件",
    ptrIndex: 3,
    ptrLabel: "nullptr",
    stack: ["print(Node 1)", "print(Node 2)", "print(Node 3)"],
    output: [],
    activeNode: -1,
    action: "返回上一层调用 (Node 3 层)",
    description: "调用 <code>printListReverse(nullptr)</code>。当前指针为 <code>nullptr</code>（地址 0x0）。触发递归终止基准条件，该层函数直接返回（Return），不执行打印。系统栈此时达到最大深度。",
    addr: "0x0",
    stackAction: "PUSH: print(Node 3)",
    isPush: true,
    isPop: false,
  },
  {
    title: "步骤 4：回溯至 Node 3，打印并返回",
    ptrIndex: 2,
    ptrLabel: "Node 3",
    stack: ["print(Node 1)", "print(Node 2)"],
    output: [3],
    activeNode: 2,
    action: "返回上一层调用 (Node 2 层)",
    description: "递归开始回溯。系统栈弹出 <code>print(Node 3)</code> 恢复上下文。当前 <code>curr</code> 指向节点 3，继续执行本层未完的指令：打印当前节点值 <strong>3</strong>。",
    addr: "0x103",
    stackAction: "POP: print(Node 3)",
    isPush: false,
    isPop: true,
  },
  {
    title: "步骤 5：回溯至 Node 2，打印并返回",
    ptrIndex: 1,
    ptrLabel: "Node 2",
    stack: ["print(Node 1)"],
    output: [3, 2],
    activeNode: 1,
    action: "返回上一层调用 (Node 1 层)",
    description: "递归继续回溯。系统栈弹出 <code>print(Node 2)</code> 恢复上下文。当前 <code>curr</code> 指向节点 2，执行打印当前节点值 <strong>2</strong>。",
    addr: "0x102",
    stackAction: "POP: print(Node 2)",
    isPush: false,
    isPop: true,
  },
  {
    title: "步骤 6：回溯至 Node 1，打印并返回",
    ptrIndex: 0,
    ptrLabel: "Node 1",
    stack: [],
    output: [3, 2, 1],
    activeNode: 0,
    action: "首层执行完毕，退出程序",
    description: "递归回溯到最外层。系统栈弹出 <code>print(Node 1)</code>。当前 <code>curr</code> 指向节点 1，执行打印当前节点值 <strong>1</strong>。此时系统栈变空。",
    addr: "0x101",
    stackAction: "POP: print(Node 1)",
    isPush: false,
    isPop: true,
  },
  {
    title: "步骤 7：递归彻底返回，结束",
    ptrIndex: -1,
    ptrLabel: "N/A",
    stack: [],
    output: [3, 2, 1],
    activeNode: -1,
    action: "无 (执行结束)",
    description: "所有递归调用都已成功返回，主程序运行结束。屏幕已成功逆序输出链表节点值：<strong>3, 2, 1</strong>。",
    addr: "N/A",
    stackAction: "无",
    isPush: false,
    isPop: false,
  },
];

const STACK_STEPS: StepData[] = [
  {
    title: "步骤 0：初始化显式栈与指针",
    ptrIndex: 0,
    ptrLabel: "Node 1",
    stack: [],
    output: [],
    activeNode: 0,
    action: "压入 1 到显式栈，指针后移",
    description: "准备进行显式栈迭代。创建空辅助栈 <code>stack</code>。指针 <code>curr</code> 初始化指向链表头节点 1（地址 0x101）。",
    addr: "0x101",
    stackAction: "无",
    isPush: false,
    isPop: false,
  },
  {
    title: "步骤 1：遍历节点 1，值入栈",
    ptrIndex: 1,
    ptrLabel: "Node 2",
    stack: ["1"],
    output: [],
    activeNode: 1,
    action: "压入 2 到显式栈，指针后移",
    description: "将当前节点值 <strong>1</strong> 压入辅助栈。指针 <code>curr</code> 移动到下一个节点 2（地址 0x102）。",
    addr: "0x102",
    stackAction: "PUSH: 1",
    isPush: true,
    isPop: false,
  },
  {
    title: "步骤 2：遍历节点 2，值入栈",
    ptrIndex: 2,
    ptrLabel: "Node 3",
    stack: ["1", "2"],
    output: [],
    activeNode: 2,
    action: "压入 3 到显式栈，指针后移",
    description: "将当前节点值 <strong>2</strong> 压入辅助栈。指针 <code>curr</code> 移动到下一个节点 3（地址 0x103）。",
    addr: "0x103",
    stackAction: "PUSH: 2",
    isPush: true,
    isPop: false,
  },
  {
    title: "步骤 3：遍历节点 3，值入栈，遍历结束",
    ptrIndex: 3,
    ptrLabel: "nullptr",
    stack: ["1", "2", "3"],
    output: [],
    activeNode: -1,
    action: "开始执行循环出栈打印",
    description: "将当前节点值 <strong>3</strong> 压入辅助栈。指针 <code>curr</code> 移动到 <code>nullptr</code>（地址 0x0），循环遍历结束。准备开始依次弹出并打印栈内数据。",
    addr: "0x0",
    stackAction: "PUSH: 3",
    isPush: true,
    isPop: false,
  },
  {
    title: "步骤 4：弹出栈顶 3 并输出",
    ptrIndex: 3,
    ptrLabel: "nullptr",
    stack: ["1", "2"],
    output: [3],
    activeNode: -1,
    action: "继续弹出栈顶元素",
    description: "辅助栈不为空，弹出栈顶元素 <strong>3</strong> 并追加到输出数组。当前栈中还剩 2 个元素。",
    addr: "0x0",
    stackAction: "POP: 3",
    isPush: false,
    isPop: true,
  },
  {
    title: "步骤 5：弹出栈顶 2 并输出",
    ptrIndex: 3,
    ptrLabel: "nullptr",
    stack: ["1"],
    output: [3, 2],
    activeNode: -1,
    action: "继续弹出栈顶元素",
    description: "弹出栈顶元素 <strong>2</strong> 并追加到输出数组。当前栈中还剩 1 个元素。",
    addr: "0x0",
    stackAction: "POP: 2",
    isPush: false,
    isPop: true,
  },
  {
    title: "步骤 6：弹出栈顶 1 并输出，结束",
    ptrIndex: 3,
    ptrLabel: "nullptr",
    stack: [],
    output: [3, 2, 1],
    activeNode: -1,
    action: "栈空，算法运行结束",
    description: "弹出最后一个元素 <strong>1</strong> 并输出。辅助栈已为空，打印完成。结果为 <strong>3, 2, 1</strong>。",
    addr: "0x0",
    stackAction: "POP: 1",
    isPush: false,
    isPop: true,
  },
];

export function PrintListReverseDiagram() {
  const [method, setMethod] = useState<"recursion" | "stack">("recursion");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = method === "recursion" ? RECURSION_STEPS : STACK_STEPS;
  const step = steps[currentStep] || steps[0];

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleMethodChange = (newMethod: "recursion" | "stack") => {
    setMethod(newMethod);
    setCurrentStep(0);
  };

  // Node locations
  const nodes = [
    { id: 0, x: 60, label: "1", addr: "0x101" },
    { id: 1, x: 150, label: "2", addr: "0x102" },
    { id: 2, x: 240, label: "3", addr: "0x103" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[580px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        {/* Method Toggle Selector */}
        <div className="mb-5 flex border-b border-border text-center">
          <button
            onClick={() => handleMethodChange("recursion")}
            className={`flex-1 pb-2.5 text-xs font-bold transition-all duration-200 ${
              method === "recursion"
                ? "border-b-2 border-accent text-accent"
                : "text-secondary hover:text-primary"
            }`}
          >
            方法 1：递归调用（系统栈）
          </button>
          <button
            onClick={() => handleMethodChange("stack")}
            className={`flex-1 pb-2.5 text-xs font-bold transition-all duration-200 ${
              method === "stack"
                ? "border-b-2 border-accent text-accent"
                : "text-secondary hover:text-primary"
            }`}
          >
            方法 2：显式栈（辅助数组）
          </button>
        </div>

        {/* SVG Visualization */}
        <svg
          viewBox="0 0 540 320"
          role="img"
          aria-label="从尾到头打印链表算法步骤可视化。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent)" />
            </marker>
            <marker
              id="pointer-arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="8"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 5 10 L 1.5 5 L 8.5 5 z" fill="var(--warning)" />
            </marker>
            <marker
              id="push-arrow-head"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--success)" />
            </marker>
            <marker
              id="pop-arrow-head"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--error)" />
            </marker>
          </defs>

          {/* Draw Link List Nodes */}
          {nodes.map((node) => {
            const isActive = step.activeNode === node.id;
            let strokeColor = "var(--border)";
            const fillColor = "var(--bg-elevated)";
            let strokeWidth = 1.5;

            if (isActive) {
              strokeColor = "var(--accent)";
              strokeWidth = 2.5;
            }

            return (
              <g key={`node-${node.id}`} className="transition-all duration-300">
                {/* Node Box */}
                <rect
                  x={node.x - 25}
                  y={47}
                  width={50}
                  height={26}
                  rx={4}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                {/* Node Value */}
                <text
                  x={node.x}
                  y={64}
                  textAnchor="middle"
                  fontSize="12px"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {node.label}
                </text>
                {/* Node Address */}
                <text
                  x={node.x}
                  y={88}
                  textAnchor="middle"
                  fontSize="9px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  {node.addr}
                </text>
              </g>
            );
          })}

          {/* nullptr Node */}
          <g className="transition-all duration-300">
            <rect
              x={295}
              y={47}
              width={55}
              height={26}
              rx={4}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
            <text
              x={322.5}
              y={64}
              textAnchor="middle"
              fontSize="10px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              nullptr
            </text>
            <text
              x={322.5}
              y={88}
              textAnchor="middle"
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              0x0
            </text>
          </g>

          {/* Draw Link List Arrows */}
          <line x1={85} y1={60} x2={119} y2={60} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow)" />
          <line x1={175} y1={60} x2={209} y2={60} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow)" />
          <line x1={265} y1={60} x2={289} y2={60} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow)" />

          {/* Pointer curr */}
          {step.ptrIndex >= 0 && (
            <g
              style={{
                transform: `translateX(${step.ptrIndex * 90}px)`,
                transition: "transform 0.3s ease-in-out"
              }}
            >
              <text
                x={60}
                y={22}
                textAnchor="middle"
                fontSize="10px"
                fontWeight="800"
                fill="var(--warning)"
              >
                curr
              </text>
              <line
                x1={60}
                y1={27}
                x2={60}
                y2={41}
                stroke="var(--warning)"
                strokeWidth="1.5"
                markerEnd="url(#pointer-arrow)"
              />
            </g>
          )}

          {/* Stack Container representation */}
          <g>
            {/* Draw Stack Bucket */}
            <path
              d="M 120 145 L 120 235 L 240 235 L 240 145"
              fill="none"
              stroke="var(--border)"
              strokeWidth={2}
            />
            {/* Label inside stack */}
            <text
              x={180}
              y={136}
              textAnchor="middle"
              fontSize="10px"
              fontWeight="700"
              fill="var(--text-secondary)"
            >
              {method === "recursion" ? "系统栈 (Call Stack)" : "显式栈 (stack)"}
            </text>

            {/* Stack elements */}
            {step.stack.map((item, index) => {
              // elements grow from bottom up
              const yPos = 235 - 20 - index * 24;
              return (
                <g key={`stack-${index}`} className="transition-all duration-300">
                  <rect
                    x={124}
                    y={yPos}
                    width={112}
                    height={20}
                    rx={3}
                    fill={index === step.stack.length - 1 ? "var(--accent)" : "var(--bg-elevated)"}
                    fillOpacity={index === step.stack.length - 1 ? 0.15 : 0.8}
                    stroke={index === step.stack.length - 1 ? "var(--accent)" : "var(--border)"}
                    strokeWidth={1.5}
                  />
                  <text
                    x={180}
                    y={yPos + 13}
                    textAnchor="middle"
                    fontSize="9px"
                    fontWeight="700"
                    fill={index === step.stack.length - 1 ? "var(--accent)" : "var(--text-primary)"}
                  >
                    {item}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Push or Pop Visual Animation Arrows */}
          {step.isPush && (
            <g className="transition-all duration-300">
              {/* Curve arrow pointing into the stack */}
              <path
                d="M 90 155 Q 100 135 125 150"
                fill="none"
                stroke="var(--success)"
                strokeWidth={1.5}
                strokeDasharray="2 2"
                markerEnd="url(#push-arrow-head)"
              />
              <text x={78} y={145} fontSize="9px" fontWeight="700" fill="var(--success)">PUSH</text>
            </g>
          )}

          {step.isPop && (
            <g className="transition-all duration-300">
              {/* Curve arrow pointing out of the stack */}
              <path
                d="M 125 160 Q 100 145 90 170"
                fill="none"
                stroke="var(--error)"
                strokeWidth={1.5}
                strokeDasharray="2 2"
                markerEnd="url(#pop-arrow-head)"
              />
              <text x={78} y={150} fontSize="9px" fontWeight="700" fill="var(--error)">POP</text>
            </g>
          )}

          {/* Printed Output Array */}
          <g>
            <text
              x={35}
              y={283}
              fontSize="11px"
              fontWeight="700"
              fill="var(--text-secondary)"
            >
              打印输出:
            </text>

            {/* Empty array bracket representation */}
            {step.output.length === 0 && (
              <text
                x={100}
                y={283}
                fontSize="11px"
                fontWeight="500"
                fill="var(--text-secondary)"
                fontStyle="italic"
              >
                (暂无输出)
              </text>
            )}

            {/* Render printed elements in boxes */}
            {step.output.map((val, index) => {
              const xPos = 100 + index * 30;
              return (
                <g key={`out-${index}`} className="transition-all duration-300">
                  <rect
                    x={xPos}
                    y={268}
                    width={22}
                    height={22}
                    rx={3}
                    fill="var(--accent)"
                    fillOpacity={0.12}
                    stroke="var(--accent)"
                    strokeWidth={1.2}
                  />
                  <text
                    x={xPos + 11}
                    y={283}
                    textAnchor="middle"
                    fontSize="11px"
                    fontWeight="800"
                    fill="var(--accent)"
                  >
                    {val}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Right Info Panel */}
          <g>
            <rect
              x={365}
              y={30}
              width={160}
              height={260}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            {/* Title */}
            <text
              x={380}
              y={52}
              fontSize="11px"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              运行状态 (Step {currentStep})
            </text>
            <line x1={380} y1={60} x2={510} y2={60} stroke="var(--border)" strokeWidth={1} />

            {/* curr Pointer Value */}
            <text x={380} y={76} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              指针 curr:
            </text>
            <text
              x={440}
              y={76}
              fontSize="9px"
              fontWeight="700"
              fill={step.ptrIndex !== -1 ? "var(--warning)" : "var(--text-secondary)"}
            >
              {step.ptrLabel} {step.addr !== "N/A" && `(${step.addr})`}
            </text>

            {/* Stack Action */}
            <text x={380} y={94} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              栈操作:
            </text>
            <text
              x={440}
              y={94}
              fontSize="9px"
              fontWeight="700"
              fill={step.isPush ? "var(--success)" : step.isPop ? "var(--error)" : "var(--text-secondary)"}
            >
              {step.stackAction}
            </text>

            <line x1={380} y1={104} x2={510} y2={104} stroke="var(--border)" strokeWidth={1} strokeDasharray="2 2" />

            {/* Step Description */}
            <text x={380} y={122} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              当前说明:
            </text>
            <foreignObject x={380} y={130} width={130} height={85}>
              <div
                className="text-[9px] leading-normal text-primary font-medium overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </foreignObject>

            <line x1={380} y1={224} x2={510} y2={224} stroke="var(--border)" strokeWidth={1} strokeDasharray="2 2" />

            {/* Next Action */}
            <text x={380} y={240} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              下一步动作:
            </text>
            <foreignObject x={380} y={246} width={130} height={35}>
              <div className="text-[8.5px] leading-tight text-accent font-bold">
                {step.action}
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* Stepper Navigation Buttons */}
        <div className="mt-4 flex items-center justify-between px-1">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            上一步 (Prev)
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-6 bg-accent"
                    : i < currentStep
                      ? "w-2 bg-success"
                      : "w-2 bg-border"
                }`}
                aria-label={`跳转到第 ${i} 步`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            下一步 (Next)
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {step.title}
      </figcaption>
    </figure>
  );
}
