"use client";

import { useState, useEffect } from "react";

interface NodePosition {
  x: number;
  y: number;
}

interface StepData {
  title: string;
  action: string;
  description: string;
  activeNodes: string[];
  comparedPair: [string, string] | null;
  successNodes: string[];
  errorNodes: string[];
  logs: string[];
}

const POSITIONS: Record<string, NodePosition> = {
  Root: { x: 270, y: 45 },
  Left: { x: 170, y: 105 },
  Right: { x: 370, y: 105 },
  LeftLeft: { x: 110, y: 170 },
  LeftRight: { x: 230, y: 170 },
  RightLeft: { x: 310, y: 170 },
  RightRight: { x: 430, y: 170 },
};

const SYMMETRIC_STEPS: StepData[] = [
  {
    title: "步骤 0：根节点自检",
    action: "isSymmetric(root) -> check(root.left, root.right)",
    description:
      "<strong>初始检查</strong>：算法自根节点 <code>8</code> 开始。首先检查根节点是否为空（<code>8 == 8</code> 存在，非空）。接着，启动双指针 <code>p1</code> 指向左子树，<code>p2</code> 指向右子树，开始进行递归对称性校验。",
    activeNodes: ["Root"],
    comparedPair: null,
    successNodes: ["Root"],
    errorNodes: [],
    logs: [
      "isSymmetric(root) called",
      "Root: 8 (valid)",
      "Initiating double-pointer comparison",
    ],
  },
  {
    title: "步骤 1：子树根节点比较",
    action: "p1.val === p2.val",
    description:
      "<strong>子根节点比对</strong>：比较左子树根节点 <code>p1</code> (值为 <code>6</code>) 和右子树根节点 <code>p2</code> (值为 <code>6</code>)。检测到两个节点值相等且均存在，结构及值对称。继续递归对比它们的下层孩子节点。",
    activeNodes: ["Left", "Right"],
    comparedPair: ["Left", "Right"],
    successNodes: ["Root", "Left", "Right"],
    errorNodes: [],
    logs: [
      "Comparing p1 (6) and p2 (6)",
      "p1.val === p2.val (6 === 6)",
      "Symmetric at level 1. Recurse down...",
    ],
  },
  {
    title: "步骤 2：外侧节点对称比对",
    action: "check(p1.left, p2.right)",
    description:
      "<strong>外侧对称校验</strong>：递归比较左子树的左孩子 <code>p1->left</code> (节点 <code>LL: 5</code>) 与右子树的右孩子 <code>p2->right</code> (节点 <code>RR: 5</code>)。两端的值都是 <code>5</code>，对称匹配！",
    activeNodes: ["LeftLeft", "RightRight"],
    comparedPair: ["LeftLeft", "RightRight"],
    successNodes: ["Root", "Left", "Right", "LeftLeft", "RightRight"],
    errorNodes: [],
    logs: [
      "Check outer: check(p1.left, p2.right)",
      "Comparing LL (5) and RR (5)",
      "Match! 5 === 5",
    ],
  },
  {
    title: "步骤 3：内侧节点对称比对",
    action: "check(p1.right, p2.left)",
    description:
      "<strong>内侧对称校验</strong>：递归比较左子树的右孩子 <code>p1->right</code> (节点 <code>LR: 7</code>) 与右子树的左孩子 <code>p2->left</code> (节点 <code>RL: 7</code>)。两端的值都是 <code>7</code>，再次完美匹配！",
    activeNodes: ["LeftRight", "RightLeft"],
    comparedPair: ["LeftRight", "RightLeft"],
    successNodes: [
      "Root",
      "Left",
      "Right",
      "LeftLeft",
      "RightRight",
      "LeftRight",
      "RightLeft",
    ],
    errorNodes: [],
    logs: [
      "Check inner: check(p1.right, p2.left)",
      "Comparing LR (7) and RL (7)",
      "Match! 7 === 7",
    ],
  },
  {
    title: "步骤 4：对称性最终评判",
    action: "isSymmetric(root) -> true",
    description:
      "<strong>最终判定</strong>：由于所有对称比对对（子树根节点对 <code>6</code>、外侧节点对 <code>5</code>、内侧节点对 <code>7</code>）的值和结构完全符合镜像规则，算法最终返回 <code>true</code>。这棵树是<strong>对称二叉树</strong>。",
    activeNodes: [],
    comparedPair: null,
    successNodes: [
      "Root",
      "Left",
      "Right",
      "LeftLeft",
      "RightRight",
      "LeftRight",
      "RightLeft",
    ],
    errorNodes: [],
    logs: [
      "All recursive checks completed.",
      "Tree is structurally mirrored.",
      "isSymmetric returns: true",
    ],
  },
];

const ASYMMETRIC_STEPS: StepData[] = [
  {
    title: "步骤 0：根节点自检",
    action: "isSymmetric(root) -> check(root.left, root.right)",
    description:
      "<strong>初始检查</strong>：算法自根节点 <code>8</code> 开始。根节点存在且不为空，初始化两个移动指针 <code>p1</code> (指向左子节点) 和 <code>p2</code> (指向右子节点) 开始进行镜像对比。",
    activeNodes: ["Root"],
    comparedPair: null,
    successNodes: ["Root"],
    errorNodes: [],
    logs: [
      "isSymmetric(root) called",
      "Root: 8 (valid)",
      "Initiating double-pointer comparison",
    ],
  },
  {
    title: "步骤 1：子树根节点比较",
    action: "p1.val === p2.val",
    description:
      "<strong>子根节点比对</strong>：比较左子树根节点 <code>p1</code> (值为 <code>6</code>) 和右子树根节点 <code>p2</code> (值为 <code>6</code>)。值相等 (<code>6 === 6</code>)，暂时对称，递归对比子节点。",
    activeNodes: ["Left", "Right"],
    comparedPair: ["Left", "Right"],
    successNodes: ["Root", "Left", "Right"],
    errorNodes: [],
    logs: [
      "Comparing p1 (6) and p2 (6)",
      "p1.val === p2.val (6 === 6)",
      "Symmetric at level 1. Recurse down...",
    ],
  },
  {
    title: "步骤 2：外侧节点对称比对",
    action: "check(p1.left, p2.right)",
    description:
      "<strong>外侧对称校验</strong>：比较左子树的左孩子 <code>p1->left</code> (节点 <code>LL: 5</code>) 与右子树的右孩子 <code>p2->right</code> (节点 <code>RR: 7</code>)。<strong>检测到值不相等（5 ≠ 7）！</strong> 外侧镜像冲突。",
    activeNodes: ["LeftLeft", "RightRight"],
    comparedPair: ["LeftLeft", "RightRight"],
    successNodes: ["Root", "Left", "Right"],
    errorNodes: ["LeftLeft", "RightRight"],
    logs: [
      "Check outer: check(p1.left, p2.right)",
      "Comparing LL (5) and RR (7)",
      "MISMATCH! 5 !== 7",
    ],
  },
  {
    title: "步骤 3：内侧节点对称比对",
    action: "check(p1.right, p2.left)",
    description:
      "<strong>内侧对称校验</strong>：比较左子树的右孩子 <code>p1->right</code> (节点 <code>LR: 7</code>) 与右子树的左孩子 <code>p2->left</code> (节点 <code>RL: 5</code>)。<strong>再次检测到值不相等（7 ≠ 5）！</strong> 内侧亦不对称。",
    activeNodes: ["LeftRight", "RightLeft"],
    comparedPair: ["LeftRight", "RightLeft"],
    successNodes: ["Root", "Left", "Right"],
    errorNodes: ["LeftLeft", "RightRight", "LeftRight", "RightLeft"],
    logs: [
      "Check inner: check(p1.right, p2.left)",
      "Comparing LR (7) and RL (5)",
      "MISMATCH! 7 !== 5",
    ],
  },
  {
    title: "步骤 4：非对称判定",
    action: "isSymmetric(root) -> false",
    description:
      "<strong>最终判定</strong>：由于在外侧比对（<code>5 != 7</code>）与内侧比对（<code>7 != 5</code>）中发现不对称节点，判定镜像对称关系破裂，算法最终返回 <code>false</code>。这棵树**非对称**。",
    activeNodes: [],
    comparedPair: null,
    successNodes: ["Root", "Left", "Right"],
    errorNodes: ["LeftLeft", "RightRight", "LeftRight", "RightLeft"],
    logs: [
      "Symmetric recursive checks failed.",
      "Structural alignment mismatch.",
      "isSymmetric returns: false",
    ],
  },
];

export function SymmetricBinaryTreeDiagram() {
  const [treeType, setTreeType] = useState<"symmetric" | "asymmetric">("symmetric");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = treeType === "symmetric" ? SYMMETRIC_STEPS : ASYMMETRIC_STEPS;
  const stepCount = steps.length;
  const stepData = steps[currentStep];

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

  const staticEdges = [
    { from: POSITIONS.Root, to: POSITIONS.Left },
    { from: POSITIONS.Root, to: POSITIONS.Right },
    { from: POSITIONS.Left, to: POSITIONS.LeftLeft },
    { from: POSITIONS.Left, to: POSITIONS.LeftRight },
    { from: POSITIONS.Right, to: POSITIONS.RightLeft },
    { from: POSITIONS.Right, to: POSITIONS.RightRight },
  ];

  // Symmetric values
  const symVals: Record<string, number> = {
    Root: 8,
    Left: 6,
    Right: 6,
    LeftLeft: 5,
    LeftRight: 7,
    RightLeft: 7,
    RightRight: 5,
  };

  // Asymmetric values
  const asymVals: Record<string, number> = {
    Root: 8,
    Left: 6,
    Right: 6,
    LeftLeft: 5,
    LeftRight: 7,
    RightLeft: 5,
    RightRight: 7,
  };

  const currentVals = treeType === "symmetric" ? symVals : asymVals;

  const getNodeStyles = (nodeId: string) => {
    const isActive = stepData.activeNodes.includes(nodeId);
    const isSuccess = stepData.successNodes.includes(nodeId);
    const isError = stepData.errorNodes.includes(nodeId);

    let stroke = "var(--border)";
    let fill = "var(--bg-elevated)";
    let strokeWidth = 1.5;

    if (isError) {
      stroke = "var(--error)";
      strokeWidth = 2.5;
      fill = "rgba(248, 81, 73, 0.15)";
    } else if (isActive) {
      stroke = "var(--accent)";
      strokeWidth = 2.5;
      fill = "rgba(100, 150, 255, 0.1)";
    } else if (isSuccess) {
      stroke = "var(--success)";
      strokeWidth = 2;
      fill = "rgba(63, 185, 127, 0.15)";
    }

    return { stroke, fill, strokeWidth };
  };

  return (
    <figure className="my-6">
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        {/* Tab switcher */}
        <div className="flex border-b border-border mb-4">
          <button
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              treeType === "symmetric"
                ? "border-accent text-accent"
                : "border-transparent text-secondary hover:text-primary"
            }`}
            onClick={() => {
              setTreeType("symmetric");
              setCurrentStep(0);
              setIsPlaying(false);
            }}
          >
            对称二叉树 (Symmetric)
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              treeType === "asymmetric"
                ? "border-accent text-accent"
                : "border-transparent text-secondary hover:text-primary"
            }`}
            onClick={() => {
              setTreeType("asymmetric");
              setCurrentStep(0);
              setIsPlaying(false);
            }}
          >
            非对称二叉树 (Asymmetric)
          </button>
        </div>

        <svg
          viewBox="0 0 540 300"
          className="w-full h-auto select-none rounded bg-elevated"
          style={{ maxHeight: "360px" }}
        >
          <defs>
            {/* Arrow marker for pointer */}
            <marker
              id="ptr-arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="10"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 0 L 5 10 z" fill="var(--accent)" />
            </marker>
            {/* Markers for comparison curves */}
            <marker
              id="compare-arrow-end"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--warning)" />
            </marker>
            <marker
              id="compare-arrow-start"
              viewBox="0 0 10 10"
              refX="2"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 8 1.5 L 0 5 L 8 8.5 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* STATIC TREE EDGES */}
          {staticEdges.map((edge, idx) => (
            <line
              key={`edge-${idx}`}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke="var(--border)"
              strokeWidth={1.5}
              className="opacity-50"
            />
          ))}

          {/* DYNAMIC COMPARISON BRIDGES */}
          {stepData.comparedPair && (
            <g>
              {stepData.comparedPair[0] === "Left" &&
              stepData.comparedPair[1] === "Right" ? (
                // Level 1: Subroot nodes comparison bridge
                <path
                  d="M 195 105 L 345 105"
                  fill="none"
                  stroke={stepData.errorNodes.length > 0 ? "var(--error)" : "var(--warning)"}
                  strokeWidth={2}
                  strokeDasharray="4,4"
                  className="animate-pulse"
                />
              ) : stepData.comparedPair[0] === "LeftLeft" &&
                stepData.comparedPair[1] === "RightRight" ? (
                // Level 2 Outer: Left-Left vs Right-Right (Outer bridge)
                <path
                  d="M 110 170 Q 270 230 430 170"
                  fill="none"
                  stroke={stepData.errorNodes.length > 0 ? "var(--error)" : "var(--warning)"}
                  strokeWidth={2}
                  strokeDasharray="4,4"
                  className="animate-pulse"
                  markerStart="url(#compare-arrow-start)"
                  markerEnd="url(#compare-arrow-end)"
                />
              ) : stepData.comparedPair[0] === "LeftRight" &&
                stepData.comparedPair[1] === "RightLeft" ? (
                // Level 2 Inner: Left-Right vs Right-Left (Inner bridge)
                <path
                  d="M 230 170 Q 270 195 310 170"
                  fill="none"
                  stroke={stepData.errorNodes.length > 0 ? "var(--error)" : "var(--warning)"}
                  strokeWidth={2}
                  strokeDasharray="4,4"
                  className="animate-pulse"
                  markerStart="url(#compare-arrow-start)"
                  markerEnd="url(#compare-arrow-end)"
                />
              ) : null}

              {/* Mismatch indicator text */}
              {stepData.errorNodes.length > 0 && (
                <g>
                  {stepData.comparedPair[0] === "LeftLeft" ? (
                    <text
                      x={270}
                      y={225}
                      textAnchor="middle"
                      fontSize="9px"
                      fontWeight="bold"
                      fill="var(--error)"
                      className="animate-bounce"
                    >
                      不对称！(5 ≠ 7)
                    </text>
                  ) : stepData.comparedPair[0] === "LeftRight" ? (
                    <text
                      x={270}
                      y={200}
                      textAnchor="middle"
                      fontSize="9px"
                      fontWeight="bold"
                      fill="var(--error)"
                      className="animate-bounce"
                    >
                      不对称！(7 ≠ 5)
                    </text>
                  ) : null}
                </g>
              )}
            </g>
          )}

          {/* TREE NODES */}
          {Object.entries(POSITIONS).map(([nodeId, pos]) => {
            const val = currentVals[nodeId];
            const { stroke, fill, strokeWidth } = getNodeStyles(nodeId);

            return (
              <g
                key={nodeId}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  transition: "transform 0.4s ease",
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={15}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={0}
                  y={4}
                  textAnchor="middle"
                  fontSize="11px"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {val}
                </text>

                {/* Node labels for clarity */}
                <text
                  x={18}
                  y={-5}
                  fontSize="8px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                  opacity={0.7}
                >
                  {nodeId === "LeftLeft"
                    ? "LL"
                    : nodeId === "LeftRight"
                      ? "LR"
                      : nodeId === "RightLeft"
                        ? "RL"
                        : nodeId === "RightRight"
                          ? "RR"
                          : nodeId}
                </text>
              </g>
            );
          })}

          {/* POINTERS p1 & p2 */}
          {currentStep > 0 && currentStep < 4 && (
            <g>
              {/* Pointer p1 */}
              {(() => {
                const activeId = stepData.activeNodes[0];
                const pos = POSITIONS[activeId];
                if (!pos) return null;
                return (
                  <g
                    style={{
                      transform: `translate(${pos.x - 22}px, ${pos.y - 22}px)`,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      fontSize="9px"
                      fontWeight="bold"
                      fill="var(--accent)"
                    >
                      p1
                    </text>
                  </g>
                );
              })()}
              {/* Pointer p2 */}
              {(() => {
                const activeId = stepData.activeNodes[1];
                const pos = POSITIONS[activeId];
                if (!pos) return null;
                return (
                  <g
                    style={{
                      transform: `translate(${pos.x + 22}px, ${pos.y - 22}px)`,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      fontSize="9px"
                      fontWeight="bold"
                      fill="var(--accent)"
                    >
                      p2
                    </text>
                  </g>
                );
              })()}
            </g>
          )}

          {/* CONSOLE LOGGER */}
          <g>
            <rect
              x={15}
              y={215}
              width={210}
              height={75}
              rx={5}
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={25}
              y={228}
              fontSize="8.5px"
              fontWeight="800"
              fill="var(--text-secondary)"
            >
              递归跟踪 (Recursive Trace)
            </text>
            <line
              x1={25}
              y1={232}
              x2={215}
              y2={232}
              stroke="var(--border)"
              strokeWidth={0.8}
            />

            {stepData.logs.map((log, lIdx) => {
              let logColor = "var(--text-primary)";
              if (log.includes("Match!") || log.includes("true")) {
                logColor = "var(--success)";
              } else if (log.includes("MISMATCH") || log.includes("false")) {
                logColor = "var(--error)";
              } else if (log.includes("Comparing") || log.includes("Check")) {
                logColor = "var(--accent)";
              }
              return (
                <text
                  key={`log-${lIdx}`}
                  x={25}
                  y={244 + lIdx * 10}
                  fontSize="7.5px"
                  fontFamily="var(--font-mono)"
                  fill={logColor}
                >
                  {`> ${log}`}
                </text>
              );
            })}
          </g>

          {/* STEP EXPLANATION TEXT */}
          <foreignObject x={240} y={215} width={285} height={75}>
            <div
              className="text-[10px] sm:text-[11px] leading-relaxed overflow-y-auto h-[70px] pr-1"
              style={{ color: "var(--text-primary)" }}
              dangerouslySetInnerHTML={{
                __html: stepData.description,
              }}
            />
          </foreignObject>
        </svg>

        {/* Action Controls */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              title="上一步"
              className="flex items-center justify-center rounded border border-border bg-bg p-1.5 text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              title={isPlaying ? "暂停" : "自动播放"}
              className="flex items-center justify-center rounded border border-border bg-bg p-1.5 text-primary transition hover:bg-hover"
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
              className="flex items-center justify-center rounded border border-border bg-bg p-1.5 text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={resetStep}
              title="重置"
              className="flex items-center justify-center rounded border border-border bg-bg p-1.5 text-primary transition hover:bg-hover"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17"
                />
              </svg>
            </button>
          </div>

          {/* Stepper dots */}
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? "w-4 bg-accent"
                    : steps[i].errorNodes.length > 0
                      ? "w-1.5 bg-error"
                      : i < currentStep
                        ? "w-1.5 bg-success"
                        : "w-1.5 bg-border"
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
      <figcaption className="mt-2 text-center text-xs text-secondary font-medium">
        动画：{stepData.title}
      </figcaption>
    </figure>
  );
}
