"use client";

import { useState, useEffect } from "react";

interface Step {
  title: string;
  action: string;
  description: string;
  fastPos: number; // 0 to 6
  slowPos: number; // 0 to 6
  phase: "init" | "detecting" | "meet" | "reset" | "finding" | "done";
  pointersText: string;
}

const STEPS: Step[] = [
  {
    title: "步骤 0：初始化双指针",
    action: "fast = head, slow = head",
    description: "快慢指针均初始化指向头节点 <strong>1</strong>（地址 0x10）。快指针 <code>fast</code> 与慢指针 <code>slow</code> 当前完全重合。",
    fastPos: 0,
    slowPos: 0,
    phase: "init",
    pointersText: "fast = 0x10 (Node 1)\nslow = 0x10 (Node 1)",
  },
  {
    title: "步骤 1：快慢指针开始追击",
    action: "fast = fast.next.next, slow = slow.next",
    description: "进入环检测阶段。快指针 <code>fast</code> 每次向前移动两步，直接到达节点 <strong>3</strong>（0x20）；慢指针 <code>slow</code> 每次移动一步，到达节点 <strong>2</strong>（0x18）。",
    fastPos: 2,
    slowPos: 1,
    phase: "detecting",
    pointersText: "fast = 0x20 (Node 3)\nslow = 0x18 (Node 2)",
  },
  {
    title: "步骤 2：指针继续以 2:1 的速度前进",
    action: "fast = fast.next.next, slow = slow.next",
    description: "快指针 <code>fast</code> 再次移动两步到达节点 <strong>5</strong>（0x30），慢指针 <code>slow</code> 移动一步到达节点 <strong>3</strong>（0x20）。",
    fastPos: 4,
    slowPos: 2,
    phase: "detecting",
    pointersText: "fast = 0x30 (Node 5)\nslow = 0x20 (Node 3)",
  },
  {
    title: "步骤 3：慢指针进入环的入口",
    action: "fast = fast.next.next, slow = slow.next",
    description: "慢指针 <code>slow</code> 进入环的入口节点 <strong>4</strong>（0x28）。快指针 <code>fast</code> 在环内转弯移动两步到达节点 <strong>7</strong>（0x40）。",
    fastPos: 6,
    slowPos: 3,
    phase: "detecting",
    pointersText: "fast = 0x40 (Node 7)\nslow = 0x28 (Node 4)",
  },
  {
    title: "步骤 4：快慢指针在环中相遇",
    action: "fast === slow ?",
    description: "慢指针 <code>slow</code> 前进到节点 <strong>5</strong>（0x30），快指针 <code>fast</code> 在环内跨过入口（7 &rarr; 4 &rarr; 5）同样到达节点 <strong>5</strong>。<strong>两者相遇！</strong>证实了环的存在。节点 5 被标记为<strong>相遇点</strong>。",
    fastPos: 4,
    slowPos: 4,
    phase: "meet",
    pointersText: "fast = 0x30 (Node 5)\nslow = 0x30 (Node 5)",
  },
  {
    title: "步骤 5：重置慢指针至头节点",
    action: "slow = head",
    description: "根据 Floyd 证明，保持快指针 <code>fast</code> 留在相遇点 <strong>5</strong>（0x30）不动，将慢指针 <code>slow</code> 重新指向链表头节点 <strong>1</strong>（0x10）。后续它们将每次以 1 步的等速同步向前移动。",
    fastPos: 4,
    slowPos: 0,
    phase: "reset",
    pointersText: "fast = 0x30 (Node 5)\nslow = 0x10 (Node 1)",
  },
  {
    title: "步骤 6：两指针以等速同步移动 1 步",
    action: "fast = fast.next, slow = slow.next",
    description: "慢指针 <code>slow</code> 从 1 移动到 <strong>2</strong>（0x18）；快指针 <code>fast</code> 在环中从 5 移动到 <strong>6</strong>（0x38）。它们距离环入口的剩余步数同步递减。",
    fastPos: 5,
    slowPos: 1,
    phase: "finding",
    pointersText: "fast = 0x38 (Node 6)\nslow = 0x18 (Node 2)",
  },
  {
    title: "步骤 7：两指针继续等速向前",
    action: "fast = fast.next, slow = slow.next",
    description: "慢指针 <code>slow</code> 移动到节点 <strong>3</strong>（0x20）；快指针 <code>fast</code> 移动到节点 <strong>7</strong>（0x40）。此时，两个指针均距离入口节点 4 仅剩 1 步。",
    fastPos: 6,
    slowPos: 2,
    phase: "finding",
    pointersText: "fast = 0x40 (Node 7)\nslow = 0x20 (Node 3)",
  },
  {
    title: "步骤 8：在入口处相遇，算法结束",
    action: "slow === fast",
    description: "慢指针 <code>slow</code> 前进到节点 <strong>4</strong>，快指针 <code>fast</code> 在环中从 7 也前进一步进入 <strong>4</strong>。<strong>两者在环的入口处精准相遇！</strong>返回该节点，查找完成。",
    fastPos: 3,
    slowPos: 3,
    phase: "done",
    pointersText: "fast = 0x28 (Node 4)\nslow = 0x28 (Node 4)\n[入口定位成功!]",
  },
];

export function ListCycleEntranceDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepCount = STEPS.length;
  const currentStepData = STEPS[currentStep];

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
      }, 2200);
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
    { id: 0, x: 40, y: 140, label: "1", addr: "0x10" },
    { id: 1, x: 100, y: 140, label: "2", addr: "0x18" },
    { id: 2, x: 160, y: 140, label: "3", addr: "0x20" },
    { id: 3, x: 220, y: 140, label: "4", addr: "0x28", isEntrance: true },
    { id: 4, x: 295, y: 90, label: "5", addr: "0x30", isMeeting: true },
    { id: 5, x: 370, y: 140, label: "6", addr: "0x38" },
    { id: 6, x: 295, y: 190, label: "7", addr: "0x40" },
  ];

  const slowX = nodes[currentStepData.slowPos].x;
  const slowY = nodes[currentStepData.slowPos].y;
  const fastX = nodes[currentStepData.fastPos].x;
  const fastY = nodes[currentStepData.fastPos].y;

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[620px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        
        {/* SVG Canvas */}
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label="快慢指针寻找链表中环入口节点可视化"
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
            
            // Highlight nodes dynamically based on step
            let isHighlighted = false;
            let borderStroke = "var(--border)";
            let borderWeight = 1.5;
            let valColor = "var(--text-primary)";

            if (node.isEntrance && currentStepData.phase === "done") {
              isHighlighted = true;
              borderStroke = "var(--success)";
              borderWeight = 2.5;
              valColor = "var(--success)";
            } else if (node.isMeeting && currentStepData.phase === "meet") {
              isHighlighted = true;
              borderStroke = "var(--info)";
              borderWeight = 2.5;
              valColor = "var(--info)";
            } else if (isSlow && isFast) {
              borderStroke = "url(#dual-gradient)"; // Mixed
              borderWeight = 2.5;
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
                  y={node.y - 13}
                  width={44}
                  height={26}
                  rx={4}
                  fill="var(--bg-elevated)"
                  stroke={borderStroke === "url(#dual-gradient)" ? "var(--accent)" : borderStroke}
                  strokeWidth={borderWeight}
                  className="transition-colors duration-300"
                />
                {/* Value Text */}
                <text
                  x={node.x}
                  y={node.y + 4}
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
                  y={node.y + 25}
                  textAnchor="middle"
                  fontSize="8.5px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  {node.addr}
                </text>
              </g>
            );
          })}

          {/* Symmetrical arrows between nodes */}
          {/* 1 -> 2 -> 3 -> 4 */}
          <line x1={62} y1={140} x2={78} y2={140} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          <line x1={122} y1={140} x2={138} y2={140} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          <line x1={182} y1={140} x2={198} y2={140} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />

          {/* 4 -> 5 */}
          <line x1={242} y1={127} x2={273} y2={103} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          {/* 5 -> 6 */}
          <line x1={317} y1={103} x2={348} y2={127} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          {/* 6 -> 7 */}
          <line x1={348} y1={153} x2={317} y2={177} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          {/* 7 -> 4 */}
          <line x1={273} y1={177} x2={242} y2={153} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />

          {/* fast Pointer */}
          <g
            style={{
              transform: `translate(${fastX}px, ${fastY}px)`,
              transition: "transform 0.4s ease-in-out",
            }}
          >
            <text x={0} y={-32} textAnchor="middle" fontSize="9.5px" fontWeight="800" fill="var(--accent)">
              fast
            </text>
            <line
              x1={0}
              y1={-28}
              x2={0}
              y2={-14}
              stroke="var(--accent)"
              strokeWidth={1.8}
              markerEnd="url(#pointer-arrow-fast)"
            />
          </g>

          {/* slow Pointer */}
          <g
            style={{
              transform: `translate(${slowX}px, ${slowY}px)`,
              transition: "transform 0.4s ease-in-out",
            }}
          >
            <text x={0} y={32} textAnchor="middle" fontSize="9.5px" fontWeight="800" fill="var(--warning)">
              slow
            </text>
            <line
              x1={0}
              y1={28}
              x2={0}
              y2={14}
              stroke="var(--warning)"
              strokeWidth={1.8}
              markerEnd="url(#pointer-arrow-slow)"
            />
          </g>

          {/* Step annotations inside canvas */}
          {currentStepData.phase === "meet" && (
            <g className="animate-pulse">
              <circle cx={295} cy={90} r={32} fill="none" stroke="var(--info)" strokeWidth={1.5} strokeDasharray="3 3" />
              <text x={295} y={48} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--info)">
                相遇点 (Meeting Point)
              </text>
            </g>
          )}

          {currentStepData.phase === "done" && (
            <g className="animate-pulse">
              <circle cx={220} cy={140} r={32} fill="none" stroke="var(--success)" strokeWidth={1.5} strokeDasharray="3 3" />
              <text x={220} y={98} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--success)">
                环入口 (Loop Entrance)
              </text>
            </g>
          )}

          {/* Debug Console Panel */}
          <g>
            <rect
              x={408}
              y={20}
              width={140}
              height={260}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            <text x={418} y={42} fontSize="11px" fontWeight="700" fill="var(--text-primary)">
              调试终端 (Terminal)
            </text>
            <line x1={418} y1={49} x2={538} y2={49} stroke="var(--border)" strokeWidth={1} />

            <text x={418} y={66} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              当前指针变量:
            </text>
            <text x={418} y={80} fontSize="9px" fontWeight="700" fill="var(--accent)" xmlSpace="preserve">
              fast = {currentStepData.pointersText.split("\n")[0].split("=")[1]?.trim() || ""}
            </text>
            <text x={418} y={94} fontSize="9px" fontWeight="700" fill="var(--warning)" xmlSpace="preserve">
              slow = {currentStepData.pointersText.split("\n")[1].split("=")[1]?.trim() || ""}
            </text>

            <text x={418} y={114} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              当前算法状态:
            </text>
            <text
              x={418}
              y={128}
              fontSize="9px"
              fontWeight="800"
              fill={
                currentStepData.phase === "done"
                  ? "var(--success)"
                  : currentStepData.phase === "meet"
                  ? "var(--info)"
                  : "var(--warning)"
              }
            >
              {currentStepData.phase === "init" && "初始化"}
              {currentStepData.phase === "detecting" && "寻找相遇点 (2x 追击)"}
              {currentStepData.phase === "meet" && "已相遇 (存在环)"}
              {currentStepData.phase === "reset" && "重置 slow 到起点"}
              {currentStepData.phase === "finding" && "等速前行查找入口"}
              {currentStepData.phase === "done" && "成功定位环入口"}
            </text>

            <line x1={418} y1={140} x2={538} y2={140} stroke="var(--border)" strokeWidth={1} strokeDasharray="2 2" />

            <text x={418} y={156} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              执行步骤说明:
            </text>
            <foreignObject x={418} y={162} width={120} height={110}>
              <div
                className="text-[8.5px] leading-relaxed text-primary font-medium overflow-y-auto h-[95px]"
                style={{ color: "var(--text-primary)" }}
                dangerouslySetInnerHTML={{
                  __html: currentStepData.description,
                }}
              />
            </foreignObject>
          </g>
        </svg>

        {/* Play/Pause controls */}
        <div className="mt-4 flex items-center justify-between px-1">
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
