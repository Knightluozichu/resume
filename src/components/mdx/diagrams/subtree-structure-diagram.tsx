"use client";

import { useState, useEffect } from "react";

interface Step {
  title: string;
  action: string;
  description: string;
  // Node states for Tree A
  highlightA: string[];   // Nodes being currently compared in Tree A (yellow/accent border)
  matchA: string[];       // Verified matching nodes in Tree A (green border/bg)
  mismatchA: string[];    // Mismatched nodes in Tree A (red border/bg)
  // Node states for Tree B
  highlightB: string[];   // Nodes being currently compared in Tree B (yellow/accent border)
  matchB: string[];       // Verified matching nodes in Tree B (green border/bg)
  mismatchB: string[];    // Mismatched nodes in Tree B (red border/bg)
  // Pointer labels
  pointerA: string | null; // Node ID where Pointer A is pointing (e.g. "A0")
  pointerB: string | null; // Node ID where Pointer B is pointing (e.g. "B0")
  // Terminal log lines
  logs: string[];
}

const STEPS: Step[] = [
  {
    title: "步骤 0：初始化并开始遍历",
    action: "isSubStructure(rootA, rootB)",
    description: "<strong>初始化阶段</strong>：主函数 <code>isSubStructure</code> 开始在树 A 中寻找可能匹配的子树根节点。首先指针指向树 A 和树 B 的根节点。比较根节点 <code>A0 (8)</code> 和 <code>B0 (8)</code>，值相等。调用辅助函数 <code>doesTree1HaveTree2</code> 进行递归子结构匹配。",
    highlightA: ["A0"],
    matchA: [],
    mismatchA: [],
    highlightB: ["B0"],
    matchB: [],
    mismatchB: [],
    pointerA: "A0",
    pointerB: "B0",
    logs: [
      "isSubStructure(A, B) called",
      "Compare Root values: A.val = 8, B.val = 8",
      "Values match! Triggering recursive match: doesTree1HaveTree2(A, B)..."
    ],
  },
  {
    title: "步骤 1：第一轮递归比对失败 (子结构不匹配)",
    action: "doesTree1HaveTree2(A, B) -> false",
    description: "<strong>递归校验</strong>：在以 <code>A0 (8)</code> 为根的子结构校验中，主函数递归检验子节点。比较 A 的左子节点 <code>A1 (8)</code> 与 B 的左子节点 <code>B1 (9)</code>。由于二者值不相等（<code>8 != 9</code>），本次递归匹配直接失败。判定以 A0 为根的子结构不匹配树 B。",
    highlightA: ["A0", "A1"],
    matchA: [],
    mismatchA: ["A1"],
    highlightB: ["B0", "B1"],
    matchB: [],
    mismatchB: ["B1"],
    pointerA: "A1",
    pointerB: "B1",
    logs: [
      "doesTree1HaveTree2(A, B) -> verifying children",
      "Compare left children: A1.val = 8, B1.val = 9",
      "Mismatch found: 8 != 9!",
      "doesTree1HaveTree2(A, B) returns false"
    ],
  },
  {
    title: "步骤 2：主函数遍历指针移至左子节点",
    action: "isSubStructure(A.left, B)",
    description: "<strong>继续遍历树 A</strong>：由于在 A 根节点处的匹配宣告失败，主函数继续在 A 的子节点中进行前序遍历。指针移到树 A 的左子节点 <code>A1 (8)</code>，比较 <code>A1.val (8)</code> 与树 B 根节点 <code>B0.val (8)</code>，值相等。再次触发递归子结构匹配 <code>doesTree1HaveTree2(A.left, B)</code>。",
    highlightA: ["A1"],
    matchA: [],
    mismatchA: [],
    highlightB: ["B0"],
    matchB: [],
    mismatchB: [],
    pointerA: "A1",
    pointerB: "B0",
    logs: [
      "isSubStructure(A, B) -> root match failed",
      "Recursively calling isSubStructure(A.left, B)...",
      "A1.val = 8, B.val = 8 (match)",
      "Calling doesTree1HaveTree2(A1, B)..."
    ],
  },
  {
    title: "步骤 3：第二轮递归校验全部匹配",
    action: "doesTree1HaveTree2(A.left, B) -> true",
    description: "<strong>同步递归校验</strong>：以 <code>A1 (8)</code> 为起点开展匹配校验：<br/>1. 比较 <code>A1 (8)</code> 与 <code>B0 (8)</code> -> 匹配；<br/>2. 比较 A1 的左子节点 <code>A3 (9)</code> 与 B 的左子节点 <code>B1 (9)</code> -> 匹配；<br/>3. 比较 A1 的右子节点 <code>A4 (2)</code> 与 B 的右子节点 <code>B2 (2)</code> -> 匹配。<br/>树 B 所有节点校验完毕，匹配成功！",
    highlightA: ["A1", "A3", "A4"],
    matchA: ["A1", "A3", "A4"],
    mismatchA: [],
    highlightB: ["B0", "B1", "B2"],
    matchB: ["B0", "B1", "B2"],
    mismatchB: [],
    pointerA: null,
    pointerB: null,
    logs: [
      "doesTree1HaveTree2(A1, B) called",
      "Compare A1 (8) vs B0 (8) -> match",
      "Compare A3 (9) vs B1 (9) -> match",
      "Compare A4 (2) vs B2 (2) -> match",
      "All nodes in Tree B matched successfully!"
    ],
  },
  {
    title: "步骤 4：匹配成功，返回结果",
    action: "isSubStructure(A, B) -> true",
    description: "<strong>算法顺利结束</strong>：在以 <code>A1 (8)</code> 为子根的匹配中，所有子孙节点均得到满足，且树 B 顺利遍历完毕。树 A 以绿色高亮标出该匹配子结构所在的区域。算法最终返回 <code>true</code>。",
    highlightA: [],
    matchA: ["A1", "A3", "A4"],
    mismatchA: [],
    highlightB: [],
    matchB: ["B0", "B1", "B2"],
    mismatchB: [],
    pointerA: null,
    pointerB: null,
    logs: [
      "doesTree1HaveTree2(A1, B) = true",
      "isSubStructure(A.left, B) = true",
      "isSubStructure(A, B) = true",
      "Match verified! Done."
    ],
  },
];

export function SubtreeStructureDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepCount = STEPS.length;
  const stepData = STEPS[currentStep];

  // Auto-play timer
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
      }, 3000);
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

  // Node geometries for Tree A
  const nodesA = [
    { id: "A0", val: "8", x: 150, y: 40 },
    { id: "A1", val: "8", x: 90, y: 95 },
    { id: "A2", val: "7", x: 210, y: 95 },
    { id: "A3", val: "9", x: 50, y: 150 },
    { id: "A4", val: "2", x: 130, y: 150 },
    { id: "A5", val: "4", x: 95, y: 205 },
    { id: "A6", val: "7", x: 165, y: 205 },
  ];

  // Edges for Tree A
  const edgesA = [
    { from: "A0", to: "A1" },
    { from: "A0", to: "A2" },
    { from: "A1", to: "A3" },
    { from: "A1", to: "A4" },
    { from: "A4", to: "A5" },
    { from: "A4", to: "A6" },
  ];

  // Node geometries for Tree B
  const nodesB = [
    { id: "B0", val: "8", x: 420, y: 40 },
    { id: "B1", val: "9", x: 370, y: 95 },
    { id: "B2", val: "2", x: 470, y: 95 },
  ];

  // Edges for Tree B
  const edgesB = [
    { from: "B0", to: "B1" },
    { from: "B0", to: "B2" },
  ];

  // Get status color for a node in Tree A
  const getNodeColorA = (id: string) => {
    if (stepData.matchA.includes(id)) return "var(--success)";
    if (stepData.mismatchA.includes(id)) return "var(--danger)";
    if (stepData.highlightA.includes(id)) return "var(--warning)";
    return "var(--border)";
  };

  // Get status color for a node in Tree B
  const getNodeColorB = (id: string) => {
    if (stepData.matchB.includes(id)) return "var(--success)";
    if (stepData.mismatchB.includes(id)) return "var(--danger)";
    if (stepData.highlightB.includes(id)) return "var(--warning)";
    return "var(--border)";
  };

  // Check if an edge in Tree A is part of the matching sub-structure
  const getEdgeColorA = (from: string, to: string) => {
    if (stepData.matchA.includes(from) && stepData.matchA.includes(to)) {
      return "var(--success)";
    }
    if (stepData.mismatchA.includes(to) && stepData.highlightA.includes(from)) {
      return "var(--danger)";
    }
    if (stepData.highlightA.includes(from) && stepData.highlightA.includes(to)) {
      return "var(--warning)";
    }
    return "var(--border)";
  };

  // Check if an edge in Tree B is active or matching
  const getEdgeColorB = (from: string, to: string) => {
    if (stepData.matchB.includes(from) && stepData.matchB.includes(to)) {
      return "var(--success)";
    }
    if (stepData.mismatchB.includes(to) && stepData.highlightB.includes(from)) {
      return "var(--danger)";
    }
    if (stepData.highlightB.includes(from) && stepData.highlightB.includes(to)) {
      return "var(--warning)";
    }
    return "var(--border)";
  };

  const getPointerCoord = (nodeId: string | null, nodes: typeof nodesA) => {
    if (!nodeId) return null;
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return null;
    return { x: node.x, y: node.y };
  };

  const ptrA = getPointerCoord(stepData.pointerA, nodesA);
  const ptrB = getPointerCoord(stepData.pointerB, nodesB);

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[620px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        
        {/* SVG visualizer canvas */}
        <svg
          viewBox="0 0 580 290"
          role="img"
          aria-label="树的子结构递归校验过程可视化"
          className="mx-auto block h-auto w-full"
        >
          {/* DEFINITIONS FOR SVG */}
          <defs>
            <marker
              id="ptr-arrow-a"
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
              id="ptr-arrow-b"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 5 5 L 8.5 0 L 1.5 0 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* BACKGROUND SPLIT LINE */}
          <line
            x1={310}
            y1={10}
            x2={310}
            y2={230}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* TREE A LABEL */}
          <text x={20} y={20} fontSize="11px" fontWeight="800" fill="var(--text-primary)">
            树 A (源二叉树)
          </text>

          {/* TREE B LABEL */}
          <text x={330} y={20} fontSize="11px" fontWeight="800" fill="var(--text-primary)">
            树 B (目标子结构)
          </text>

          {/* TREE A EDGES */}
          {edgesA.map((edge, idx) => {
            const fromNode = nodesA.find((n) => n.id === edge.from)!;
            const toNode = nodesA.find((n) => n.id === edge.to)!;
            const color = getEdgeColorA(edge.from, edge.to);
            const isMatching = color === "var(--success)";
            const strokeWidth = color !== "var(--border)" ? 2.2 : 1.2;

            return (
              <line
                key={`edgeA-${idx}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={color}
                strokeWidth={strokeWidth}
                className="transition-all duration-300"
                strokeDasharray={isMatching ? "0" : "0"}
              />
            );
          })}

          {/* TREE B EDGES */}
          {edgesB.map((edge, idx) => {
            const fromNode = nodesB.find((n) => n.id === edge.from)!;
            const toNode = nodesB.find((n) => n.id === edge.to)!;
            const color = getEdgeColorB(edge.from, edge.to);
            const strokeWidth = color !== "var(--border)" ? 2.2 : 1.2;

            return (
              <line
                key={`edgeB-${idx}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={color}
                strokeWidth={strokeWidth}
                className="transition-all duration-300"
              />
            );
          })}

          {/* TREE A NODES */}
          {nodesA.map((node) => {
            const color = getNodeColorA(node.id);
            const isHighlighted = stepData.highlightA.includes(node.id);
            const isMatched = stepData.matchA.includes(node.id);
            const isMismatched = stepData.mismatchA.includes(node.id);
            const isPointer = stepData.pointerA === node.id;

            // Render node circles
            let strokeWidth = 1.5;
            if (isHighlighted || isMismatched || isPointer) strokeWidth = 2.5;
            else if (isMatched) strokeWidth = 2;

            let fill = "var(--bg-elevated)";
            if (isMatched) fill = "rgba(63, 185, 127, 0.15)";
            else if (isMismatched) fill = "rgba(229, 103, 92, 0.15)";

            return (
              <g key={`nodeA-${node.id}`} className="transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={14}
                  fill={fill}
                  stroke={color}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {node.val}
                </text>
                {/* Small indicator label */}
                <text
                  x={node.x + 18}
                  y={node.y - 10}
                  fontSize="7.5px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  {node.id}
                </text>
              </g>
            );
          })}

          {/* TREE B NODES */}
          {nodesB.map((node) => {
            const color = getNodeColorB(node.id);
            const isHighlighted = stepData.highlightB.includes(node.id);
            const isMatched = stepData.matchB.includes(node.id);
            const isMismatched = stepData.mismatchB.includes(node.id);
            const isPointer = stepData.pointerB === node.id;

            let strokeWidth = 1.5;
            if (isHighlighted || isMismatched || isPointer) strokeWidth = 2.5;
            else if (isMatched) strokeWidth = 2;

            let fill = "var(--bg-elevated)";
            if (isMatched) fill = "rgba(63, 185, 127, 0.15)";
            else if (isMismatched) fill = "rgba(229, 103, 92, 0.15)";

            return (
              <g key={`nodeB-${node.id}`} className="transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={14}
                  fill={fill}
                  stroke={color}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {node.val}
                </text>
                <text
                  x={node.x + 18}
                  y={node.y - 10}
                  fontSize="7.5px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  {node.id}
                </text>
              </g>
            );
          })}

          {/* POINTER A ARROW */}
          {ptrA && (
            <g
              style={{
                transform: `translate(${ptrA.x}px, ${ptrA.y - 32}px)`,
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <text x={0} y={-4} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--accent)">
                ptrA
              </text>
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={10}
                stroke="var(--accent)"
                strokeWidth={1.8}
                markerEnd="url(#ptr-arrow-a)"
              />
            </g>
          )}

          {/* POINTER B ARROW */}
          {ptrB && (
            <g
              style={{
                transform: `translate(${ptrB.x}px, ${ptrB.y - 32}px)`,
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <text x={0} y={-4} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--warning)">
                ptrB
              </text>
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={10}
                stroke="var(--warning)"
                strokeWidth={1.8}
                markerEnd="url(#ptr-arrow-b)"
              />
            </g>
          )}

          {/* TERMINAL PANEL / CONSOLE LOG */}
          <g>
            <rect
              x={330}
              y={140}
              width={230}
              height={85}
              rx={6}
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            <text x={340} y={155} fontSize="9px" fontWeight="800" fill="var(--text-secondary)">
              执行控制台 (Console Output)
            </text>
            <line x1={340} y1={160} x2={550} y2={160} stroke="var(--border)" strokeWidth={1} />
            
            {stepData.logs.map((log, lIdx) => {
              let logColor = "var(--text-primary)";
              if (log.includes("failed") || log.includes("Mismatch")) {
                logColor = "var(--danger)";
              } else if (log.includes("success") || log.includes("true") || log.includes("Done")) {
                logColor = "var(--success)";
              } else if (log.includes("calling") || log.includes("doesTree1HaveTree2")) {
                logColor = "var(--accent)";
              }
              return (
                <text
                  key={`log-${lIdx}`}
                  x={340}
                  y={173 + lIdx * 11}
                  fontSize="8px"
                  fontFamily="var(--font-mono)"
                  fill={logColor}
                >
                  {`> ${log}`}
                </text>
              );
            })}
          </g>

          {/* HTML Description text area */}
          <g>
            <foreignObject x={15} y={232} width={550} height={55}>
              <div
                className="text-[11px] leading-relaxed font-medium overflow-y-auto h-[50px]"
                style={{ color: "var(--text-primary)" }}
                dangerouslySetInnerHTML={{
                  __html: stepData.description,
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
        {stepData.title}
      </figcaption>
    </figure>
  );
}
