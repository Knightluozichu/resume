"use client";

import { useState, useEffect } from "react";

interface Step {
  title: string;
  action: string;
  description: string;
  p1Pos: number | null; // 0, 1, 2, or null
  p2Pos: number | null; // 0, 1, 2, or null
  tailPos: "dummy" | number; // "dummy" or index 0..5 of merged nodes
  mergedCount: number; // 0..6
  highlightMergeArrow: { fromX: number; fromY: number; toX: number; toY: number } | null;
  pointersText: string;
}

const STEPS: Step[] = [
  {
    title: "步骤 0：初始化双指针",
    action: "p1 = headA, p2 = headB, tail = dummy",
    description: "初始化阶段：设定指针 <code>p1</code> 指向链表 A 头节点 <strong>1</strong>，<code>p2</code> 指向链表 B 头节点 <strong>2</strong>。新链表使用哨兵节点 <code>dummy</code> 作为起点，尾指针 <code>tail</code> 初始指向 <code>dummy</code>。",
    p1Pos: 0,
    p2Pos: 0,
    tailPos: "dummy",
    mergedCount: 0,
    highlightMergeArrow: null,
    pointersText: "p1 = 0x10 (Node 1)\np2 = 0x18 (Node 2)\ntail = dummy (0x00)",
  },
  {
    title: "步骤 1：比较并合并节点 1",
    action: "p1.val <= p2.val -> tail.next = p1; p1 = p1.next;",
    description: "比较 <code>p1.val (1)</code> 与 <code>p2.val (2)</code>。因为 1 &le; 2，将 <code>tail.next</code> 指向节点 <strong>1</strong>。随后 <code>p1</code> 前移至节点 <strong>3</strong>，<code>tail</code> 跟着前移至节点 <strong>1</strong>。",
    p1Pos: 1,
    p2Pos: 0,
    tailPos: 0,
    mergedCount: 1,
    highlightMergeArrow: { fromX: 90, fromY: 60, toX: 120, toY: 180 },
    pointersText: "p1 = 0x20 (Node 3)\np2 = 0x18 (Node 2)\ntail = 0x10 (Node 1)",
  },
  {
    title: "步骤 2：比较并合并节点 2",
    action: "p1.val > p2.val -> tail.next = p2; p2 = p2.next;",
    description: "比较 <code>p1.val (3)</code> 与 <code>p2.val (2)</code>。因为 3 &gt; 2，将 <code>tail.next</code> 指向节点 <strong>2</strong>。随后 <code>p2</code> 前移至节点 <strong>4</strong>，<code>tail</code> 前移至节点 <strong>2</strong>。",
    p1Pos: 1,
    p2Pos: 1,
    tailPos: 1,
    mergedCount: 2,
    highlightMergeArrow: { fromX: 90, fromY: 130, toX: 190, toY: 180 },
    pointersText: "p1 = 0x20 (Node 3)\np2 = 0x28 (Node 4)\ntail = 0x18 (Node 2)",
  },
  {
    title: "步骤 3：比较并合并节点 3",
    action: "p1.val <= p2.val -> tail.next = p1; p1 = p1.next;",
    description: "比较 <code>p1.val (3)</code> 与 <code>p2.val (4)</code>。因为 3 &le; 4，将 <code>tail.next</code> 指向节点 <strong>3</strong>。随后 <code>p1</code> 前移至节点 <strong>5</strong>，<code>tail</code> 前移至节点 <strong>3</strong>。",
    p1Pos: 2,
    p2Pos: 1,
    tailPos: 2,
    mergedCount: 3,
    highlightMergeArrow: { fromX: 190, fromY: 60, toX: 260, toY: 180 },
    pointersText: "p1 = 0x30 (Node 5)\np2 = 0x28 (Node 4)\ntail = 0x20 (Node 3)",
  },
  {
    title: "步骤 4：比较并合并节点 4",
    action: "p1.val > p2.val -> tail.next = p2; p2 = p2.next;",
    description: "比较 <code>p1.val (5)</code> 与 <code>p2.val (4)</code>。因为 5 &gt; 4，将 <code>tail.next</code> 指向节点 <strong>4</strong>。随后 <code>p2</code> 前移至节点 <strong>6</strong>，<code>tail</code> 前移至节点 <strong>4</strong>。",
    p1Pos: 2,
    p2Pos: 2,
    tailPos: 3,
    mergedCount: 4,
    highlightMergeArrow: { fromX: 190, fromY: 130, toX: 330, toY: 180 },
    pointersText: "p1 = 0x30 (Node 5)\np2 = 0x38 (Node 6)\ntail = 0x28 (Node 4)",
  },
  {
    title: "步骤 5：比较并合并节点 5",
    action: "p1.val <= p2.val -> tail.next = p1; p1 = p1.next;",
    description: "比较 <code>p1.val (5)</code> 与 <code>p2.val (6)</code>。因为 5 &le; 6，将 <code>tail.next</code> 指向节点 <strong>5</strong>。随后 <code>p1</code> 前移变为 <code>null</code>（链表 A 已耗尽），<code>tail</code> 前移至节点 <strong>5</strong>。",
    p1Pos: null,
    p2Pos: 2,
    tailPos: 4,
    mergedCount: 5,
    highlightMergeArrow: { fromX: 290, fromY: 60, toX: 400, toY: 180 },
    pointersText: "p1 = null (已空)\np2 = 0x38 (Node 6)\ntail = 0x30 (Node 5)",
  },
  {
    title: "步骤 6：A 耗尽，直接链接 B 剩余部分",
    action: "tail.next = (p1 !== null ? p1 : p2)",
    description: "此时检测到 <code>p1 === null</code>，说明链表 A 已经耗尽。直接将 <code>tail.next</code> 指向 <code>p2</code> 所指向的链表 B 剩余节点 <strong>6</strong>。合并链表构建完毕！",
    p1Pos: null,
    p2Pos: null,
    tailPos: 5,
    mergedCount: 6,
    highlightMergeArrow: { fromX: 290, fromY: 130, toX: 470, toY: 180 },
    pointersText: "p1 = null (已空)\np2 = null (全部并入)\ntail = 0x38 (Node 6)\n[合并成功!]",
  },
];

export function MergeSortedListsDiagram() {
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

  // Node configurations
  const nodesA = [
    { id: 0, x: 90, label: "1", addr: "0x10" },
    { id: 1, x: 190, label: "3", addr: "0x20" },
    { id: 2, x: 290, label: "5", addr: "0x30" },
  ];

  const nodesB = [
    { id: 0, x: 90, label: "2", addr: "0x18" },
    { id: 1, x: 190, label: "4", addr: "0x28" },
    { id: 2, x: 290, label: "6", addr: "0x38" },
  ];

  // Merged List layout nodes (dummy + clones of A and B nodes in merging order)
  const mergedOrder = [
    { id: 0, label: "1", addr: "0x10", color: "var(--accent)" },
    { id: 1, label: "2", addr: "0x18", color: "#a855f7" },
    { id: 2, label: "3", addr: "0x20", color: "var(--accent)" },
    { id: 3, label: "4", addr: "0x28", color: "#a855f7" },
    { id: 4, label: "5", addr: "0x30", color: "var(--accent)" },
    { id: 5, label: "6", addr: "0x38", color: "#a855f7" },
  ];

  // Get pointer coordinates
  const getP1X = () => {
    if (currentStepData.p1Pos === null) return -999;
    return nodesA[currentStepData.p1Pos].x;
  };

  const getP2X = () => {
    if (currentStepData.p2Pos === null) return -999;
    return nodesB[currentStepData.p2Pos].x;
  };

  const getTailX = () => {
    if (currentStepData.tailPos === "dummy") return 50;
    return 50 + 70 * (currentStepData.tailPos + 1);
  };

  const p1X = getP1X();
  const p2X = getP2X();
  const tailX = getTailX();

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[620px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        
        {/* SVG visualizer canvas */}
        <svg
          viewBox="0 0 580 320"
          role="img"
          aria-label="合并两个排序链表步骤可视化"
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
              id="arrow-purple"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a855f7" />
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
              id="pointer-arrow-p1"
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
              id="pointer-arrow-p2"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 5 5 L 8.5 0 L 1.5 0 z" fill="#a855f7" />
            </marker>
            <marker
              id="pointer-arrow-tail"
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

          {/* LIST A Label */}
          <text x={15} y={54} fontSize="11px" fontWeight="800" fill="var(--accent)">
            链表 A:
          </text>

          {/* List A Nodes */}
          {nodesA.map((node) => {
            const isP1 = node.id === currentStepData.p1Pos;
            const borderStroke = isP1 ? "var(--accent)" : "var(--border)";
            const borderWeight = isP1 ? 2 : 1.5;

            return (
              <g key={`nodeA-${node.id}`} className="transition-all duration-300">
                <rect
                  x={node.x - 22}
                  y={37}
                  width={44}
                  height={26}
                  rx={4}
                  fill="var(--bg-elevated)"
                  stroke={borderStroke}
                  strokeWidth={borderWeight}
                />
                <text
                  x={node.x}
                  y={54}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={74}
                  textAnchor="middle"
                  fontSize="8px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  {node.addr}
                </text>
              </g>
            );
          })}

          {/* Null A Terminal */}
          <g>
            <rect
              x={368}
              y={37}
              width={44}
              height={26}
              rx={4}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
              strokeDasharray="2 2"
            />
            <text
              x={390}
              y={53}
              textAnchor="middle"
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              null
            </text>
          </g>

          {/* List A Static Arrows */}
          <line x1={112} y1={50} x2={168} y2={50} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          <line x1={212} y1={50} x2={268} y2={50} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          <line x1={312} y1={50} x2={368} y2={50} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />


          {/* LIST B Label */}
          <text x={15} y={124} fontSize="11px" fontWeight="800" fill="#a855f7">
            链表 B:
          </text>

          {/* List B Nodes */}
          {nodesB.map((node) => {
            const isP2 = node.id === currentStepData.p2Pos;
            const borderStroke = isP2 ? "#a855f7" : "var(--border)";
            const borderWeight = isP2 ? 2 : 1.5;

            return (
              <g key={`nodeB-${node.id}`} className="transition-all duration-300">
                <rect
                  x={node.x - 22}
                  y={107}
                  width={44}
                  height={26}
                  rx={4}
                  fill="var(--bg-elevated)"
                  stroke={borderStroke}
                  strokeWidth={borderWeight}
                />
                <text
                  x={node.x}
                  y={124}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={144}
                  textAnchor="middle"
                  fontSize="8px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  {node.addr}
                </text>
              </g>
            );
          })}

          {/* Null B Terminal */}
          <g>
            <rect
              x={368}
              y={107}
              width={44}
              height={26}
              rx={4}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
              strokeDasharray="2 2"
            />
            <text
              x={390}
              y={123}
              textAnchor="middle"
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              null
            </text>
          </g>

          {/* List B Static Arrows */}
          <line x1={112} y1={120} x2={168} y2={120} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          <line x1={212} y1={120} x2={268} y2={120} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />
          <line x1={312} y1={120} x2={368} y2={120} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#arrow-border)" />


          {/* MERGED LIST Label */}
          <text x={15} y={178} fontSize="10px" fontWeight="800" fill="var(--success)">
            合并链表 (Merged):
          </text>

          {/* Dummy Node */}
          <g>
            <rect
              x={28}
              y={187}
              width={44}
              height={26}
              rx={4}
              fill="var(--bg-elevated)"
              stroke={currentStepData.tailPos === "dummy" ? "var(--warning)" : "var(--border)"}
              strokeWidth={currentStepData.tailPos === "dummy" ? 2 : 1.5}
            />
            <text
              x={50}
              y={203}
              textAnchor="middle"
              fontSize="9px"
              fontWeight="700"
              fill="var(--text-secondary)"
            >
              dummy
            </text>
            <text
              x={50}
              y={223}
              textAnchor="middle"
              fontSize="8px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              0x00
            </text>
          </g>

          {/* Merged List Nodes (Dynamically rendered based on mergedCount) */}
          {Array.from({ length: currentStepData.mergedCount }).map((_, idx) => {
            const node = mergedOrder[idx];
            const isTail = currentStepData.tailPos === idx;
            const borderStroke = isTail ? "var(--warning)" : "var(--success)";
            const borderWeight = isTail ? 2.2 : 1.5;

            return (
              <g key={`merged-${idx}`} className="transition-all duration-300">
                <rect
                  x={50 + 70 * (idx + 1) - 22}
                  y={187}
                  width={44}
                  height={26}
                  rx={4}
                  fill="var(--bg-elevated)"
                  stroke={borderStroke}
                  strokeWidth={borderWeight}
                />
                <text
                  x={50 + 70 * (idx + 1)}
                  y={204}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {node.label}
                </text>
                <text
                  x={50 + 70 * (idx + 1)}
                  y={223}
                  textAnchor="middle"
                  fontSize="8px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  {node.addr}
                </text>
              </g>
            );
          })}

          {/* Dynamic Null node in the merged list */}
          <g>
            <rect
              x={50 + 70 * (currentStepData.mergedCount + 1) - 22}
              y={187}
              width={44}
              height={26}
              rx={4}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
              strokeDasharray="2 2"
            />
            <text
              x={50 + 70 * (currentStepData.mergedCount + 1)}
              y={203}
              textAnchor="middle"
              fontSize="9px"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              null
            </text>
          </g>

          {/* Merged List Connecting Arrows */}
          {Array.from({ length: currentStepData.mergedCount + 1 }).map((_, idx) => {
            const fromX = 50 + 70 * idx + 22;
            const toX = 50 + 70 * (idx + 1) - 22;
            return (
              <line
                key={`merged-arrow-${idx}`}
                x1={fromX}
                y1={200}
                x2={toX}
                y2={200}
                stroke={idx < currentStepData.mergedCount ? "var(--success)" : "var(--border)"}
                strokeWidth={idx < currentStepData.mergedCount ? 1.8 : 1.5}
                markerEnd={idx < currentStepData.mergedCount ? "url(#arrow-success)" : "url(#arrow-border)"}
              />
            );
          })}

          {/* p1 Pointer (points down) */}
          {p1X !== -999 && (
            <g
              style={{
                transform: `translateX(${p1X - 45}px)`,
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <text x={45} y={15} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--accent)">
                p1
              </text>
              <line
                x1={45}
                y1={19}
                x2={45}
                y2={29}
                stroke="var(--accent)"
                strokeWidth={1.8}
                markerEnd="url(#pointer-arrow-p1)"
              />
            </g>
          )}

          {/* p2 Pointer (points down) */}
          {p2X !== -999 && (
            <g
              style={{
                transform: `translateX(${p2X - 45}px)`,
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <text x={45} y={85} textAnchor="middle" fontSize="9px" fontWeight="800" fill="#a855f7">
                p2
              </text>
              <line
                x1={45}
                y1={89}
                x2={45}
                y2={99}
                stroke="#a855f7"
                strokeWidth={1.8}
                markerEnd="url(#pointer-arrow-p2)"
              />
            </g>
          )}

          {/* tail Pointer (points up) */}
          <g
            style={{
              transform: `translateX(${tailX - 45}px)`,
              transition: "transform 0.4s ease-in-out",
            }}
          >
            <text x={45} y={252} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--warning)">
              tail
            </text>
            <line
              x1={45}
              y1={242}
              x2={45}
              y2={223}
              stroke="var(--warning)"
              strokeWidth={1.8}
              markerEnd="url(#pointer-arrow-tail)"
            />
          </g>

          {/* Highlight merge animation curved arrow */}
          {currentStepData.highlightMergeArrow && (
            <path
              key={`merge-arrow-${currentStep}`}
              d={`M ${currentStepData.highlightMergeArrow.fromX} ${currentStepData.highlightMergeArrow.fromY} 
                  Q ${(currentStepData.highlightMergeArrow.fromX + currentStepData.highlightMergeArrow.toX) / 2} 165
                  ${currentStepData.highlightMergeArrow.toX} ${currentStepData.highlightMergeArrow.toY}`}
              fill="none"
              stroke="var(--success)"
              strokeWidth={2}
              strokeDasharray="4 3"
              markerEnd="url(#arrow-success)"
              className="animate-pulse"
            />
          )}

          {/* Terminal Panel */}
          <g>
            <rect
              x={405}
              y={10}
              width={165}
              height={148}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            <text x={415} y={28} fontSize="11px" fontWeight="700" fill="var(--text-primary)">
              调试终端 (Terminal)
            </text>
            <line x1={415} y1={34} x2={560} y2={34} stroke="var(--border)" strokeWidth={1} />

            <text x={415} y={48} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              指令操作:
            </text>
            <text x={415} y={62} fontSize="8px" fontWeight="700" fill="var(--success)">
              {currentStepData.action}
            </text>

            <text x={415} y={80} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              指针日志:
            </text>
            
            <text x={415} y={94} fontSize="8.5px" fontWeight="700" fill="var(--accent)">
              {currentStepData.pointersText.split("\n")[0]}
            </text>
            <text x={415} y={105} fontSize="8.5px" fontWeight="700" fill="#a855f7">
              {currentStepData.pointersText.split("\n")[1]}
            </text>
            <text x={415} y={116} fontSize="8.5px" fontWeight="700" fill="var(--warning)">
              {currentStepData.pointersText.split("\n")[2]}
            </text>
            {currentStepData.pointersText.split("\n")[3] && (
              <text x={415} y={130} fontSize="8.5px" fontWeight="700" fill="var(--success)">
                {currentStepData.pointersText.split("\n")[3]}
              </text>
            )}
          </g>

          {/* Description text box below the main graphics area */}
          <g>
            <foreignObject x={10} y={260} width={560} height={55}>
              <div
                className="text-[11px] leading-relaxed font-medium overflow-y-auto h-[50px]"
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
