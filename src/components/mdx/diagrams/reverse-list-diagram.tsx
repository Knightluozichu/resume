"use client";

import { useState, useEffect } from "react";

interface Step {
  title: string;
  action: string;
  description: string;
  prevPos: number | "null-left" | null; // index 0..3, "null-left", or null
  currPos: number | "null-right" | null; // index 0..3, "null-right", or null
  nextPos: number | "null-right" | null; // index 0..3, "null-right", or null
  arrows: Array<{
    id: string;
    fromX: number;
    toX: number;
    isReversed: boolean;
    isHighlighted: boolean;
  }>;
  highlightResult: boolean;
  pointersText: string;
}

const STEPS: Step[] = [
  {
    title: "步骤 0：初始化双指针",
    action: "prev = null, curr = head",
    description: "初始化阶段：设定前驱指针 <code>prev = null</code>，当前处理指针 <code>curr</code> 指向头节点 <strong>1</strong>（地址 0x10）。此时 <code>next</code> 尚未分配。",
    prevPos: "null-left",
    currPos: 0,
    nextPos: null,
    arrows: [
      { id: "1-2", fromX: 132, toX: 188, isReversed: false, isHighlighted: false },
      { id: "2-3", fromX: 232, toX: 288, isReversed: false, isHighlighted: false },
      { id: "3-4", fromX: 332, toX: 388, isReversed: false, isHighlighted: false },
      { id: "4-null", fromX: 432, toX: 473, isReversed: false, isHighlighted: false },
    ],
    highlightResult: false,
    pointersText: "prev = null\ncurr = 0x10 (Node 1)\nnext = null (未分配)",
  },
  {
    title: "步骤 1：暂存后继节点 next",
    action: "next = curr.next",
    description: "由于即将断开并修改 <code>curr</code> 的指向，必须先用 <code>next</code> 指针暂存后继节点 <strong>2</strong>（地址 0x18），防止丢失对链表剩余部分的联系。",
    prevPos: "null-left",
    currPos: 0,
    nextPos: 1,
    arrows: [
      { id: "1-2", fromX: 132, toX: 188, isReversed: false, isHighlighted: false },
      { id: "2-3", fromX: 232, toX: 288, isReversed: false, isHighlighted: false },
      { id: "3-4", fromX: 332, toX: 388, isReversed: false, isHighlighted: false },
      { id: "4-null", fromX: 432, toX: 473, isReversed: false, isHighlighted: false },
    ],
    highlightResult: false,
    pointersText: "prev = null\ncurr = 0x10 (Node 1)\nnext = 0x18 (Node 2)",
  },
  {
    title: "步骤 2：反转当前节点指向",
    action: "curr.next = prev",
    description: "执行反转：将节点 <strong>1</strong> 的 <code>next</code> 指向其前驱 <code>prev</code>（此时为 <code>null</code>）。此时原首节点的箭头被重画，指向左侧的 <code>null</code>。",
    prevPos: "null-left",
    currPos: 0,
    nextPos: 1,
    arrows: [
      { id: "1-null", fromX: 88, toX: 47, isReversed: true, isHighlighted: true },
      { id: "2-3", fromX: 232, toX: 288, isReversed: false, isHighlighted: false },
      { id: "3-4", fromX: 332, toX: 388, isReversed: false, isHighlighted: false },
      { id: "4-null", fromX: 432, toX: 473, isReversed: false, isHighlighted: false },
    ],
    highlightResult: false,
    pointersText: "prev = null\ncurr = 0x10 (Node 1)\nnext = 0x18 (Node 2)",
  },
  {
    title: "步骤 3：前移指针 prev 和 curr",
    action: "prev = curr, curr = next",
    description: "节点 1 的反转已完成。现在将 <code>prev</code> 移动到当前节点 <strong>1</strong>，将 <code>curr</code> 移动到先前暂存的后继节点 <code>next</code>（即节点 <strong>2</strong>）。准备进行下一轮迭代。",
    prevPos: 0,
    currPos: 1,
    nextPos: null,
    arrows: [
      { id: "1-null", fromX: 88, toX: 47, isReversed: true, isHighlighted: false },
      { id: "2-3", fromX: 232, toX: 288, isReversed: false, isHighlighted: false },
      { id: "3-4", fromX: 332, toX: 388, isReversed: false, isHighlighted: false },
      { id: "4-null", fromX: 432, toX: 473, isReversed: false, isHighlighted: false },
    ],
    highlightResult: false,
    pointersText: "prev = 0x10 (Node 1)\ncurr = 0x18 (Node 2)\nnext = null (等待赋值)",
  },
  {
    title: "步骤 4：迭代处理节点 2 并移位",
    action: "next = curr.next; curr.next = prev; prev = curr; curr = next;",
    description: "进入第二轮迭代。暂存 <code>next = 3</code>，并将节点 <strong>2</strong> 的指针反向指向 <code>prev</code>（即节点 <strong>1</strong>）。随后指针前移，<code>prev</code> 到达 <strong>2</strong>，<code>curr</code> 到达 <strong>3</strong>。",
    prevPos: 1,
    currPos: 2,
    nextPos: 2,
    arrows: [
      { id: "1-null", fromX: 88, toX: 47, isReversed: true, isHighlighted: false },
      { id: "2-1", fromX: 188, toX: 132, isReversed: true, isHighlighted: true },
      { id: "3-4", fromX: 332, toX: 388, isReversed: false, isHighlighted: false },
      { id: "4-null", fromX: 432, toX: 473, isReversed: false, isHighlighted: false },
    ],
    highlightResult: false,
    pointersText: "prev = 0x18 (Node 2)\ncurr = 0x20 (Node 3)\nnext = 0x20 (Node 3)",
  },
  {
    title: "步骤 5：迭代处理节点 3 并移位",
    action: "next = curr.next; curr.next = prev; prev = curr; curr = next;",
    description: "进入第三轮迭代。暂存 <code>next = 4</code>，并将节点 <strong>3</strong> 的指针反向指向 <code>prev</code>（即节点 <strong>2</strong>）。随后指针前移，<code>prev</code> 到达 <strong>3</strong>，<code>curr</code> 到达 <strong>4</strong>。",
    prevPos: 2,
    currPos: 3,
    nextPos: 3,
    arrows: [
      { id: "1-null", fromX: 88, toX: 47, isReversed: true, isHighlighted: false },
      { id: "2-1", fromX: 188, toX: 132, isReversed: true, isHighlighted: false },
      { id: "3-2", fromX: 288, toX: 232, isReversed: true, isHighlighted: true },
      { id: "4-null", fromX: 432, toX: 473, isReversed: false, isHighlighted: false },
    ],
    highlightResult: false,
    pointersText: "prev = 0x20 (Node 3)\ncurr = 0x28 (Node 4)\nnext = 0x28 (Node 4)",
  },
  {
    title: "步骤 6：迭代处理尾节点 4 并移位",
    action: "next = curr.next; curr.next = prev; prev = curr; curr = next;",
    description: "第四轮迭代处理尾节点 <strong>4</strong>。暂存 <code>next = null</code>，将节点 <strong>4</strong> 反向指向 <code>prev</code>（即节点 <strong>3</strong>）。随后指针前移，<code>prev</code> 到达 <strong>4</strong>，<code>curr</code> 变为 <code>null</code>。",
    prevPos: 3,
    currPos: "null-right",
    nextPos: "null-right",
    arrows: [
      { id: "1-null", fromX: 88, toX: 47, isReversed: true, isHighlighted: false },
      { id: "2-1", fromX: 188, toX: 132, isReversed: true, isHighlighted: false },
      { id: "3-2", fromX: 288, toX: 232, isReversed: true, isHighlighted: false },
      { id: "4-3", fromX: 388, toX: 332, isReversed: true, isHighlighted: true },
    ],
    highlightResult: false,
    pointersText: "prev = 0x28 (Node 4)\ncurr = null\nnext = null",
  },
  {
    title: "步骤 7：curr 为空，返回新头节点 prev",
    action: "return prev",
    description: "此时 <code>curr === null</code>，迭代终止。<code>prev</code> 正好指向原链表的最后一个节点（新头节点 <strong>4</strong>）。返回 <code>prev</code>，链表彻底反转成功！",
    prevPos: 3,
    currPos: null,
    nextPos: null,
    arrows: [
      { id: "1-null", fromX: 88, toX: 47, isReversed: true, isHighlighted: false },
      { id: "2-1", fromX: 188, toX: 132, isReversed: true, isHighlighted: false },
      { id: "3-2", fromX: 288, toX: 232, isReversed: true, isHighlighted: false },
      { id: "4-3", fromX: 388, toX: 332, isReversed: true, isHighlighted: false },
    ],
    highlightResult: true,
    pointersText: "prev = 0x28 (Node 4)\ncurr = null\nnext = null\n[反转成功!]",
  },
];

export function ReverseListDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepCount = STEPS.length;
  const currentStepData = STEPS[currentStep];

  // Auto-play timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= stepCount - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, stepCount]);

  const prevStep = () => {
    setIsPlaying(false);
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    setIsPlaying(false);
    if (currentStep < stepCount - 1) setCurrentStep(currentStep + 1);
  };

  const togglePlay = () => {
    if (currentStep === stepCount - 1 && !isPlaying) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const resetStep = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const nodes = [
    { id: 0, x: 110, label: "1", addr: "0x10" },
    { id: 1, x: 210, label: "2", addr: "0x18" },
    { id: 2, x: 310, label: "3", addr: "0x20" },
    { id: 3, x: 410, label: "4", addr: "0x28" },
  ];

  // Resolve X-coordinate for pointer locations
  const getPointerX = (pos: number | "null-left" | "null-right" | null) => {
    if (pos === null) return -999;
    if (pos === "null-left") return 25;
    if (pos === "null-right") return 495;
    return nodes[pos].x;
  };

  const prevX = getPointerX(currentStepData.prevPos);
  const currX = getPointerX(currentStepData.currPos);
  const nextX = getPointerX(currentStepData.nextPos);

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[620px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        
        {/* SVG Visualizer Canvas */}
        <svg
          viewBox="0 0 580 300"
          role="img"
          aria-label="迭代法反转单向链表步骤可视化"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="arrow-border"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--border)" />
            </marker>
            <marker
              id="arrow-accent"
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
              id="arrow-success"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--success)" />
            </marker>
            <marker
              id="pointer-arrow-curr"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 5 5 L 8.5 0 L 1.5 0 z" fill="var(--accent)" />
            </marker>
            <marker
              id="pointer-arrow-prev"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 5 5 L 8.5 0 L 1.5 0 z" fill="var(--warning)" />
            </marker>
            <marker
              id="pointer-arrow-next"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 5 0 L 8.5 5 L 1.5 5 z" fill="#a855f7" />
            </marker>
          </defs>

          {/* Null (Left) Terminal Node */}
          <g>
            <rect
              x={3}
              y={85}
              width={44}
              height={26}
              rx={4}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
              strokeDasharray="2 2"
            />
            <text
              x={25}
              y={101}
              textAnchor="middle"
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              null
            </text>
          </g>

          {/* Linked List Nodes */}
          {nodes.map((node) => {
            const isCurr = node.id === currentStepData.currPos;
            const isPrev = node.id === currentStepData.prevPos;
            const isNext = node.id === currentStepData.nextPos;

            let borderStroke = "var(--border)";
            let borderWeight = 1.5;
            let valColor = "var(--text-primary)";

            if (isCurr) {
              borderStroke = "var(--accent)";
              borderWeight = 2;
            } else if (isPrev) {
              borderStroke = "var(--warning)";
              borderWeight = 2;
            } else if (isNext) {
              borderStroke = "#a855f7";
              borderWeight = 2;
            }

            return (
              <g key={`node-${node.id}`} className="transition-all duration-300">
                {/* Node Box */}
                <rect
                  x={node.x - 22}
                  y={85}
                  width={44}
                  height={26}
                  rx={4}
                  fill="var(--bg-elevated)"
                  stroke={borderStroke}
                  strokeWidth={borderWeight}
                  className="transition-colors duration-300"
                />
                {/* Value Text */}
                <text
                  x={node.x}
                  y={102}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill={valColor}
                >
                  {node.label}
                </text>
                {/* Memory Address Text */}
                <text
                  x={node.x}
                  y={124}
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

          {/* Null (Right) Terminal Node */}
          <g>
            <rect
              x={473}
              y={85}
              width={44}
              height={26}
              rx={4}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
              strokeDasharray="2 2"
            />
            <text
              x={495}
              y={101}
              textAnchor="middle"
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              null
            </text>
          </g>

          {/* Dynamic Link Arrows */}
          {currentStepData.arrows.map((arrow) => {
            const strokeColor = arrow.isHighlighted
              ? "var(--success)"
              : "var(--border)";
            const strokeWidth = arrow.isHighlighted ? 2.2 : 1.5;
            const markerEnd = arrow.isHighlighted
              ? "url(#arrow-success)"
              : "url(#arrow-border)";

            return (
              <line
                key={`arrow-${arrow.id}`}
                x1={arrow.fromX}
                y1={98}
                x2={arrow.toX}
                y2={98}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                markerEnd={markerEnd}
                className="transition-all duration-300"
              />
            );
          })}

          {/* curr Pointer (above nodes, points down) */}
          {currentStepData.currPos !== null && currX !== -999 && (
            <g
              style={{
                transform: `translateX(${currX - 45}px)`,
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <text x={45} y={35} textAnchor="middle" fontSize="9.5px" fontWeight="800" fill="var(--accent)">
                curr
              </text>
              <line
                x1={45}
                y1={40}
                x2={45}
                y2={77}
                stroke="var(--accent)"
                strokeWidth={1.8}
                markerEnd="url(#pointer-arrow-curr)"
              />
            </g>
          )}

          {/* prev Pointer (above nodes, points down, offset from curr) */}
          {currentStepData.prevPos !== null && prevX !== -999 && (
            <g
              style={{
                transform: `translateX(${prevX - 45}px)`,
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <text x={45} y={15} textAnchor="middle" fontSize="9.5px" fontWeight="800" fill="var(--warning)">
                prev
              </text>
              <line
                x1={45}
                y1={20}
                x2={45}
                y2={77}
                stroke="var(--warning)"
                strokeWidth={1.8}
                markerEnd="url(#pointer-arrow-prev)"
              />
            </g>
          )}

          {/* next Pointer (below nodes, points up) */}
          {currentStepData.nextPos !== null && nextX !== -999 && (
            <g
              style={{
                transform: `translateX(${nextX - 45}px)`,
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <text x={45} y={192} textAnchor="middle" fontSize="9.5px" fontWeight="800" fill="#a855f7">
                next
              </text>
              <line
                x1={45}
                y1={180}
                x2={45}
                y2={137}
                stroke="#a855f7"
                strokeWidth={1.8}
                markerEnd="url(#pointer-arrow-next)"
              />
            </g>
          )}

          {/* Highlight new head Node 4 when reversed */}
          {currentStepData.highlightResult && (
            <g className="animate-pulse">
              <rect
                x={384}
                y={76}
                width={52}
                height={57}
                rx={6}
                fill="none"
                stroke="var(--success)"
                strokeWidth={2}
                strokeDasharray="3 3"
              />
              <text x={410} y={67} textAnchor="middle" fontSize="8.5px" fontWeight="800" fill="var(--success)">
                新 Head 节点
              </text>
            </g>
          )}

          {/* Debugging Terminal Panel */}
          <g>
            <rect
              x={398}
              y={140}
              width={172}
              height={148}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            <text x={410} y={158} fontSize="11px" fontWeight="700" fill="var(--text-primary)">
              调试终端 (Terminal)
            </text>
            <line x1={410} y1={164} x2={560} y2={164} stroke="var(--border)" strokeWidth={1} />

            <text x={410} y={178} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              指令操作:
            </text>
            <text x={455} y={178} fontSize="9px" fontWeight="700" fill="var(--success)">
              {currentStepData.action}
            </text>

            <text x={410} y={192} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              指针日志:
            </text>
            
            <text x={410} y={204} fontSize="8.5px" fontWeight="700" fill="var(--warning)" xmlSpace="preserve">
              {currentStepData.pointersText.split("\n")[0]}
            </text>
            <text x={410} y={214} fontSize="8.5px" fontWeight="700" fill="var(--accent)" xmlSpace="preserve">
              {currentStepData.pointersText.split("\n")[1]}
            </text>
            <text x={410} y={224} fontSize="8.5px" fontWeight="700" fill="#a855f7" xmlSpace="preserve">
              {currentStepData.pointersText.split("\n")[2] || (currentStepData.pointersText.split("\n")[3] ? "next = null" : "")}
            </text>
            {currentStepData.pointersText.split("\n")[3] && (
              <text x={410} y={234} fontSize="8.5px" fontWeight="700" fill="var(--success)">
                {currentStepData.pointersText.split("\n")[3]}
              </text>
            )}
          </g>

          {/* Description text box below the main graphics area */}
          <g>
            <foreignObject x={10} y={220} width={370} height={70}>
              <div
                className="text-[11px] leading-relaxed font-medium overflow-y-auto h-[60px]"
                style={{ color: "var(--text-primary)" }}
                dangerouslySetInnerHTML={{
                  __html: currentStepData.description,
                }}
              />
            </foreignObject>
          </g>
        </svg>

        {/* Play/Pause Control Panel */}
        <div className="mt-4 flex items-center justify-between px-1">
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              title="上一步"
              className="flex items-center justify-center rounded-control border border-border bg-bg p-2 text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              title={isPlaying ? "暂停" : "自动播放"}
              className="flex items-center justify-center rounded-control border border-border bg-bg p-2 text-primary transition hover:bg-hover"
            >
              {isPlaying ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M18 19V5h-4v14h4zm-6 0V5H8v14h4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M8 5v14l11-7z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === stepCount - 1}
              title="下一步"
              className="flex items-center justify-center rounded-control border border-border bg-bg p-2 text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={resetStep}
              title="重置"
              className="flex items-center justify-center rounded-control border border-border bg-bg p-2 text-primary transition hover:bg-hover"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
              </svg>
            </button>
          </div>

          {/* Stepper Dot Indicators */}
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(i);
                }}
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

          {/* Current Step Label */}
          <div className="text-xs font-semibold text-secondary">
            {currentStep + 1} / {stepCount} 步
          </div>
        </div>
      </div>

      <figcaption className="mt-2 text-center text-sm text-secondary">
        {currentStepData.title}
      </figcaption>
    </figure>
  );
}
