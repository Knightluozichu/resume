"use client";

import { useState, useEffect } from "react";

interface Step {
  title: string;
  action: string;
  description: string;
  fastPos: number; // 0 to 4
  slowPos: number; // 0 to 4
  highlightResult: boolean;
  phase: "init" | "spacing" | "sliding" | "done";
  pointersText: string;
}

const STEPS: Step[] = [
  {
    title: "步骤 0：初始化双指针",
    action: "fast = head, slow = head",
    description: "初始化阶段，快指针 <code>fast</code> 和慢指针 <code>slow</code> 同时指向链表的头节点 <strong>1</strong>。此时设定参数 $k = 2$。我们需要通过这两个指针一次遍历找出倒数第 2 个节点。",
    fastPos: 0,
    slowPos: 0,
    highlightResult: false,
    phase: "init",
    pointersText: "fast = 0x10 (Node 1)\nslow = 0x10 (Node 1)",
  },
  {
    title: "步骤 1：快指针先行拉开间距",
    action: "fast = fast.next",
    description: "我们需要让两指针之间拉开 $k-1 = 1$ 步的间距。快指针 <code>fast</code> 向前移动 1 步，到达节点 <strong>2</strong>（地址 0x18）。慢指针 <code>slow</code> 仍在头节点保持不动，此时『滑尺』间距恰好可以跨越 $k=2$ 个节点。",
    fastPos: 1,
    slowPos: 0,
    highlightResult: false,
    phase: "spacing",
    pointersText: "fast = 0x18 (Node 2)\nslow = 0x10 (Node 1)",
  },
  {
    title: "步骤 2：同步向前滑动第一步",
    action: "fast = fast.next, slow = slow.next",
    description: "间距已经拉开。检查 <code>fast.next</code>（指向节点 3）不为 null，快慢指针以相同速度同步向前滑动 1 步。快指针 <code>fast</code> 移动到节点 <strong>3</strong>，慢指针 <code>slow</code> 移动到节点 <strong>2</strong>。",
    fastPos: 2,
    slowPos: 1,
    highlightResult: false,
    phase: "sliding",
    pointersText: "fast = 0x20 (Node 3)\nslow = 0x18 (Node 2)",
  },
  {
    title: "步骤 3：同步向前滑动第二步",
    action: "fast = fast.next, slow = slow.next",
    description: "继续滑动。检查 <code>fast.next</code>（指向节点 4）不为 null，快慢指针同步向前滑动 1 步。快指针 <code>fast</code> 到达节点 <strong>4</strong>，慢指针 <code>slow</code> 到达节点 <strong>3</strong>。",
    fastPos: 3,
    slowPos: 2,
    highlightResult: false,
    phase: "sliding",
    pointersText: "fast = 0x28 (Node 4)\nslow = 0x20 (Node 3)",
  },
  {
    title: "步骤 4：快指针到达尾节点",
    action: "fast = fast.next, slow = slow.next",
    description: "快慢指针同步向前滑动最后 1 步：快指针 <code>fast</code> 到达尾节点 <strong>5</strong>（地址 0x30），慢指针 <code>slow</code> 移动到节点 <strong>4</strong>。此时 <code>fast.next === null</code>，符合循环终止条件。",
    fastPos: 4,
    slowPos: 3,
    highlightResult: false,
    phase: "sliding",
    pointersText: "fast = 0x30 (Node 5)\nslow = 0x28 (Node 4)",
  },
  {
    title: "步骤 5：定位倒数第 k 个节点并返回",
    action: "return slow",
    description: "由于快指针 <code>fast</code> 已经到达尾节点，滑动停止。根据相对间距关系，慢指针 <code>slow</code> 此时刚好指向倒数第 $k=2$ 个节点，即节点 <strong>4</strong>。返回该节点指针，查找成功！",
    fastPos: 4,
    slowPos: 3,
    highlightResult: true,
    phase: "done",
    pointersText: "fast = 0x30 (Node 5)\nslow = 0x28 (Node 4)\n[结果已锁定!]",
  },
];

export function KthFromEndDiagram() {
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
      }, 2000);
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
      // Loop back to start if clicking play at final step
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
    { id: 0, x: 45, label: "1", addr: "0x10" },
    { id: 1, x: 105, label: "2", addr: "0x18" },
    { id: 2, x: 165, label: "3", addr: "0x20" },
    { id: 3, x: 225, label: "4", addr: "0x28" },
    { id: 4, x: 285, label: "5", addr: "0x30" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[600px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        
        {/* SVG Visualization Canvas */}
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label="快慢指针寻找链表中倒数第k个节点步骤可视化"
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
              id="pointer-arrow-fast"
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
              id="pointer-arrow-slow"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 5 0 L 8.5 5 L 1.5 5 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* Linked List Nodes */}
          {nodes.map((node) => {
            const isSlow = node.id === currentStepData.slowPos;
            const isFast = node.id === currentStepData.fastPos;
            const isHighlighted = isSlow && currentStepData.highlightResult;

            let borderStroke = "var(--border)";
            let borderWeight = 1.5;
            let valColor = "var(--text-primary)";

            if (isHighlighted) {
              borderStroke = "var(--success)";
              borderWeight = 2.5;
              valColor = "var(--success)";
            } else if (isSlow) {
              borderStroke = "var(--warning)";
              borderWeight = 2;
            } else if (isFast) {
              borderStroke = "var(--accent)";
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

          {/* Null Terminal Node */}
          <g>
            <rect
              x={323}
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
              x={345}
              y={101}
              textAnchor="middle"
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              null
            </text>
          </g>

          {/* Link Arrows */}
          {nodes.map((node, i) => {
            const nextX = i === nodes.length - 1 ? 323 : nodes[i + 1].x - 22;
            const startX = node.x + 22;
            
            return (
              <line
                key={`arrow-${node.id}`}
                x1={startX}
                y1={98}
                x2={nextX}
                y2={98}
                stroke="var(--border)"
                strokeWidth={1.5}
                markerEnd="url(#arrow-border)"
              />
            );
          })}

          {/* fast Pointer (above nodes, points down) */}
          <g
            style={{
              transform: `translateX(${nodes[currentStepData.fastPos].x - 45}px)`,
              transition: "transform 0.4s ease-in-out",
            }}
          >
            <text x={45} y={35} textAnchor="middle" fontSize="9.5px" fontWeight="800" fill="var(--accent)">
              fast
            </text>
            <line
              x1={45}
              y1={40}
              x2={45}
              y2={77}
              stroke="var(--accent)"
              strokeWidth={1.8}
              markerEnd="url(#pointer-arrow-fast)"
            />
          </g>

          {/* slow Pointer (below nodes, points up) */}
          <g
            style={{
              transform: `translateX(${nodes[currentStepData.slowPos].x - 45}px)`,
              transition: "transform 0.4s ease-in-out",
            }}
          >
            <text x={45} y={188} textAnchor="middle" fontSize="9.5px" fontWeight="800" fill="var(--warning)">
              slow
            </text>
            <line
              x1={45}
              y1={177}
              x2={45}
              y2={121}
              stroke="var(--warning)"
              strokeWidth={1.8}
              markerEnd="url(#pointer-arrow-slow)"
            />
          </g>

          {/* Result Highlight Box around the target (Node 4) when search is complete */}
          {currentStepData.highlightResult && (
            <g className="animate-pulse">
              <rect
                x={201}
                y={76}
                width={48}
                height={57}
                rx={6}
                fill="none"
                stroke="var(--success)"
                strokeWidth={2}
                strokeDasharray="3 3"
              />
              <text x={225} y={67} textAnchor="middle" fontSize="8.5px" fontWeight="800" fill="var(--success)">
                倒数第 2 个节点
              </text>
            </g>
          )}

          {/* Debugging Terminal Panel (Right side) */}
          <g>
            <rect
              x={398}
              y={20}
              width={146}
              height={260}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            {/* Terminal Title */}
            <text x={410} y={42} fontSize="11px" fontWeight="700" fill="var(--text-primary)">
              调试终端 (Terminal)
            </text>
            <line x1={410} y1={49} x2={532} y2={49} stroke="var(--border)" strokeWidth={1} />

            {/* Pointers Address Log */}
            <text x={410} y={64} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              指针当前指向:
            </text>
            <text x={410} y={76} fontSize="9px" fontWeight="700" fill="var(--accent)" xmlSpace="preserve">
              fast = {currentStepData.pointersText.split("\n")[0].split("=")[1].trim()}
            </text>
            <text x={410} y={88} fontSize="9px" fontWeight="700" fill="var(--warning)" xmlSpace="preserve">
              slow = {currentStepData.pointersText.split("\n")[1].split("=")[1].trim()}
            </text>

            {/* Pointer Spacing status */}
            <text x={410} y={108} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              相对步长间距:
            </text>
            <text
              x={410}
              y={120}
              fontSize="9px"
              fontWeight="800"
              fill={currentStepData.phase === "spacing" ? "var(--warning)" : "var(--success)"}
            >
              {currentStepData.fastPos - currentStepData.slowPos} 步 (k-1 = 1)
            </text>

            <line x1={410} y1={130} x2={532} y2={130} stroke="var(--border)" strokeWidth={1} strokeDasharray="2 2" />

            {/* Step Description */}
            <text x={410} y={146} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              执行逻辑说明:
            </text>
            <foreignObject x={410} y={152} width={122} height={120}>
              <div
                className="text-[8.5px] leading-normal text-primary font-medium overflow-y-auto h-[100px]"
                style={{ color: "var(--text-primary)" }}
                dangerouslySetInnerHTML={{
                  __html: currentStepData.description,
                }}
              />
            </foreignObject>
          </g>
        </svg>

        {/* Play/Pause Control panel */}
        <div className="mt-4 flex items-center justify-between px-1">
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              title="上一步"
              className="flex items-center justify-center rounded-control border border-border bg-bg p-2 text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              {/* Skip Back SVG */}
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
                /* Pause SVG */
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M18 19V5h-4v14h4zm-6 0V5H8v14h4z" clipRule="evenodd" />
                </svg>
              ) : (
                /* Play SVG */
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
              {/* Skip Forward SVG */}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={resetStep}
              title="重置"
              className="flex items-center justify-center rounded-control border border-border bg-bg p-2 text-primary transition hover:bg-hover"
            >
              {/* Reset / Loop Back SVG */}
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
