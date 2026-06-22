"use client";

import { useState } from "react";

interface ScenarioAStep {
  title: string;
  action: string;
  description: string;
  pointerChanges: string;
  memoryState: string;
  complexity: string;
  node2Value: string;
  node3State: "normal" | "detached" | "faded";
  arrowDest: "node3" | "null";
  node2Highlight: boolean;
  node3Highlight: boolean;
  showNode3: boolean;
  toBeDeletedPos: number; // 0: Node 1, 1: Node 2, 2: Node 3
  nextNodePos: number;    // 0: Node 1, 1: Node 2, 2: Node 3, -1: none
}

const SCENARIO_A_STEPS: ScenarioAStep[] = [
  {
    title: "步骤 0：定位待删除节点",
    action: "定位待删除节点 toBeDeleted",
    description: "当前待删除目标为<strong>节点 2</strong>（地址 0x7fa8，值 2）。由于单向链表没有 <code>prev</code> 指针，我们无法直接获取节点 1，因此无法像常规方式那样直接让节点 1 指向节点 3。",
    pointerChanges: "toBeDeleted = 0x7fa8",
    memoryState: "Node 2 值: 2, next: 0x7fb0",
    complexity: "复杂度: O(1)",
    node2Value: "2",
    node3State: "normal",
    arrowDest: "node3",
    node2Highlight: true,
    node3Highlight: false,
    showNode3: true,
    toBeDeletedPos: 1,
    nextNodePos: -1,
  },
  {
    title: "步骤 1：复制后继节点的值",
    action: "值覆盖：node.val = node.next.val",
    description: "这是 O(1) 删除的核心秘密。我们将后继节点（节点 3）的值 <strong>3</strong> 复制覆盖到当前节点 2。此时逻辑上节点 2 的值变为了 3，相当于间接删除了原节点 2 的值。",
    pointerChanges: "toBeDeleted.val = 3",
    memoryState: "Node 2 值覆盖为 3",
    complexity: "复杂度: O(1)",
    node2Value: "3",
    node3State: "normal",
    arrowDest: "node3",
    node2Highlight: true,
    node3Highlight: true,
    showNode3: true,
    toBeDeletedPos: 1,
    nextNodePos: 2,
  },
  {
    title: "步骤 2：绕过并断开后继节点",
    action: "指针重定向：node.next = nextNode.next",
    description: "修改待删除节点的 <code>next</code> 指针，指向后继节点的下一个节点（此处为 null）。此时，原先的后继节点（物理上的节点 3）已经从链表中断开脱钩。",
    pointerChanges: "toBeDeleted.next = nullptr",
    memoryState: "Node 2.next 指向 null",
    complexity: "复杂度: O(1)",
    node2Value: "3",
    node3State: "detached",
    arrowDest: "null",
    node2Highlight: true,
    node3Highlight: false,
    showNode3: true,
    toBeDeletedPos: 1,
    nextNodePos: 2,
  },
  {
    title: "步骤 3：释放断开的节点内存",
    action: "回收内存：delete nextNode",
    description: "此时，被脱钩的孤立节点（0x7fb0）已无用。在 C++ 中需要显式调用 <code>delete</code> 释放内存；在 JS/TS 中，该节点不可达，将被垃圾回收（GC）自动清理。链表变更为 <code>1 -> 3 -> null</code>。",
    pointerChanges: "nextNode 悬空释放",
    memoryState: "0x7fb0 物理内存已释放",
    complexity: "复杂度: O(1)",
    node2Value: "3",
    node3State: "faded",
    arrowDest: "null",
    node2Highlight: false,
    node3Highlight: false,
    showNode3: false,
    toBeDeletedPos: 1,
    nextNodePos: -1,
  },
];

interface ScenarioBStep {
  title: string;
  action: string;
  description: string;
  pointerChanges: string;
  memoryState: string;
  complexity: string;
  prePos: number; // 0: dummy, 1: 1, 2: 2a, 3: 2b, 4: 3
  curPos: number; // 0: dummy, 1: 1, 2: 2a, 3: 2b, 4: 3, 5: null
  nodeStates: ("normal" | "duplicate" | "bypassed" | "faded")[];
  arrowConfig: "normal" | "bypassed";
}

const SCENARIO_B_STEPS: ScenarioBStep[] = [
  {
    title: "步骤 0：初始化哨兵与双指针",
    action: "对比检测 cur 与 cur.next",
    description: "引入哨兵节点 <code>dummy</code>，其 <code>next</code> 指向头节点，以防头节点被删除。初始化 <code>pre = dummy</code>（指向 0x5d00），<code>cur = head</code>（指向节点 1，0x5d08）。节点 1 与后继节点值不同，不重复。",
    pointerChanges: "pre = dummy, cur = Node 1",
    memoryState: "dummy.next = Node 1",
    complexity: "复杂度: O(1)",
    prePos: 0,
    curPos: 1,
    nodeStates: ["normal", "normal", "normal", "normal", "normal"],
    arrowConfig: "normal",
  },
  {
    title: "步骤 1：无重复时，双指针平移",
    action: "双指针同频前移",
    description: "既然节点 1 无重复，我们让 <code>pre</code> 和 <code>cur</code> 各自向前平移一位。此时 <code>pre = Node 1</code>，<code>cur = Node 2(a)</code>。接下来检查 <code>cur</code> 与 <code>cur.next</code> 是否重复。",
    pointerChanges: "pre = Node 1, cur = Node 2(a)",
    memoryState: "pre = 0x5d08, cur = 0x5d10",
    complexity: "复杂度: O(1)",
    prePos: 1,
    curPos: 2,
    nodeStates: ["normal", "normal", "normal", "normal", "normal"],
    arrowConfig: "normal",
  },
  {
    title: "步骤 2：检测到重复节点区间",
    action: "记录重复值，启动去重扫描",
    description: "检测到 <code>cur.val(2) === cur.next.val(2)</code>。说明我们碰到了重复的值。我们将重复值记为 <strong>2</strong>。此时 <code>pre</code>（节点 1）保持不动，准备通过移动 <code>cur</code> 来跳过这个重复区间。",
    pointerChanges: "duplicateVal = 2",
    memoryState: "发现连续重复值 2",
    complexity: "复杂度: O(1)",
    prePos: 1,
    curPos: 2,
    nodeStates: ["normal", "normal", "duplicate", "duplicate", "normal"],
    arrowConfig: "normal",
  },
  {
    title: "步骤 3：循环跳过所有重复节点",
    action: "扫描指针 cur 推进越过重复区",
    description: "利用 <code>while</code> 循环，只要 <code>cur</code> 的值等于 2，就将 <code>cur</code> 向后移动。最终 <code>cur</code> 越过了 2(a) 和 2(b)，指向了第一个不重复的节点——<strong>节点 3</strong>（0x5d20）。",
    pointerChanges: "cur = Node 3 (0x5d20)",
    memoryState: "cur 越过重复区至不等于 2 处",
    complexity: "复杂度: O(k) 扫描",
    prePos: 1,
    curPos: 4,
    nodeStates: ["normal", "normal", "bypassed", "bypassed", "normal"],
    arrowConfig: "normal",
  },
  {
    title: "步骤 4：前驱重连，绕过重复节点",
    action: "指针修改：pre.next = cur",
    description: "我们将前驱 <code>pre</code>（节点 1）的 <code>next</code> 指针直接修改为当前的 <code>cur</code>（节点 3）。这样，原先的值为 2 的两个重复节点就被同时绕过，脱离了链表主干。",
    pointerChanges: "pre.next = cur (Node 3)",
    memoryState: "Node 1.next 重定向至 Node 3",
    complexity: "复杂度: O(1)",
    prePos: 1,
    curPos: 4,
    nodeStates: ["normal", "normal", "bypassed", "bypassed", "normal"],
    arrowConfig: "bypassed",
  },
  {
    title: "步骤 5：物理回收，链表去重完毕",
    action: "断开重复节点内存回收",
    description: "脱钩的两个节点 2(a) 和 2(b) 彻底失去所有引用。垃圾回收机制会自动释放它们的内存。链表成功变更为 <code>dummy -> 1 -> 3 -> null</code>，完成了这一局部的去重操作。",
    pointerChanges: "pre = Node 1, cur = Node 3",
    memoryState: "重复节点物理内存已释放",
    complexity: "整体时间复杂度: O(n)",
    prePos: 1,
    curPos: 4,
    nodeStates: ["normal", "normal", "faded", "faded", "normal"],
    arrowConfig: "bypassed",
  },
];

export function DeleteNodeDiagram() {
  const [scenario, setScenario] = useState<"A" | "B">("A");
  const [currentStep, setCurrentStep] = useState(0);

  const handleScenarioChange = (scen: "A" | "B") => {
    setScenario(scen);
    setCurrentStep(0);
  };

  const stepsA = SCENARIO_A_STEPS;
  const stepsB = SCENARIO_B_STEPS;
  const stepCount = scenario === "A" ? stepsA.length : stepsB.length;

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const nextStep = () => {
    if (currentStep < stepCount - 1) setCurrentStep(currentStep + 1);
  };

  // Node geometries for Scenario A
  const nodesA = [
    { id: 0, x: 70, label: "1", addr: "0x7fa0" },
    { id: 1, x: 170, label: "2", addr: "0x7fa8" },
    { id: 2, x: 270, label: "3", addr: "0x7fb0" },
  ];

  // Node geometries for Scenario B
  const nodesB = [
    { id: 0, x: 45, label: "dummy", addr: "0x5d00" },
    { id: 1, x: 115, label: "1", addr: "0x5d08" },
    { id: 2, x: 185, label: "2", addr: "0x5d10" },
    { id: 3, x: 255, label: "2", addr: "0x5d18" },
    { id: 4, x: 325, label: "3", addr: "0x5d20" },
  ];

  const currentStepDataA = stepsA[currentStep] || stepsA[0];
  const currentStepDataB = stepsB[currentStep] || stepsB[0];

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-[600px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        {/* Scenario Toggle Selector */}
        <div className="mb-5 flex border-b border-border text-center">
          <button
            onClick={() => handleScenarioChange("A")}
            className={`flex-1 pb-2.5 text-xs font-bold transition-all duration-200 ${
              scenario === "A"
                ? "border-b-2 border-accent text-accent"
                : "text-secondary hover:text-primary"
            }`}
          >
            场景 A：O(1) 删除指定节点
          </button>
          <button
            onClick={() => handleScenarioChange("B")}
            className={`flex-1 pb-2.5 text-xs font-bold transition-all duration-200 ${
              scenario === "B"
                ? "border-b-2 border-accent text-accent"
                : "text-secondary hover:text-primary"
            }`}
          >
            场景 B：删除链表中的重复节点
          </button>
        </div>

        {/* SVG Drawing Area */}
        <svg
          viewBox="0 0 560 320"
          role="img"
          aria-label="删除链表节点算法步骤可视化"
          className="mx-auto block h-auto w-full"
        >
          <defs>
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
              id="arrow-grey"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-secondary)" opacity="0.4" />
            </marker>
            <marker
              id="pointer-arrow-warning"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 5 0 L 8.5 5 L 1.5 5 z" fill="var(--warning)" />
            </marker>
            <marker
              id="pointer-arrow-success"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 5 0 L 8.5 5 L 1.5 5 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* ---------------------------------------------------- */}
          {/* SCENARIO A DRAWING                                   */}
          {/* ---------------------------------------------------- */}
          {scenario === "A" && (
            <g>
              {/* Nodes */}
              {nodesA.map((node) => {
                let nodeState = "normal";
                if (node.id === 1 && currentStepDataA.node2Highlight) {
                  nodeState = "highlight";
                } else if (node.id === 2) {
                  if (currentStepDataA.node3State === "detached") nodeState = "detached";
                  else if (currentStepDataA.node3State === "faded") nodeState = "faded";
                  else if (currentStepDataA.node3Highlight) nodeState = "highlight";
                }

                if (nodeState === "faded") return null;

                const isHighlight = nodeState === "highlight";
                const isDetached = nodeState === "detached";

                return (
                  <g key={`nodeA-${node.id}`} className="transition-all duration-300">
                    <rect
                      x={node.x - 22}
                      y={85}
                      width={44}
                      height={26}
                      rx={4}
                      fill="var(--bg-elevated)"
                      stroke={isHighlight ? "var(--accent)" : "var(--border)"}
                      strokeWidth={isHighlight ? 2.5 : 1.5}
                      strokeDasharray={isDetached ? "3 3" : undefined}
                      opacity={isDetached ? 0.4 : 1}
                    />
                    <text
                      x={node.x}
                      y={102}
                      textAnchor="middle"
                      fontSize="11px"
                      fontWeight="700"
                      fill={isHighlight ? "var(--accent)" : "var(--text-primary)"}
                      opacity={isDetached ? 0.4 : 1}
                    >
                      {node.id === 1 ? currentStepDataA.node2Value : node.label}
                    </text>
                    <text
                      x={node.x}
                      y={124}
                      textAnchor="middle"
                      fontSize="9px"
                      fontWeight="600"
                      fill="var(--text-secondary)"
                      opacity={isDetached ? 0.4 : 1}
                    >
                      {node.addr}
                    </text>
                  </g>
                );
              })}

              {/* Nullptr Node */}
              <g className="transition-all duration-300">
                <rect
                  x={338}
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
                  x={360}
                  y={101}
                  textAnchor="middle"
                  fontSize="9px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  null
                </text>
              </g>

              {/* Arrows */}
              {/* Arrow 1: Node 1 -> Node 2 */}
              <line
                x1={92}
                y1={98}
                x2={142}
                y2={98}
                stroke="var(--border)"
                strokeWidth={1.5}
                markerEnd="url(#arrow-border)"
              />

              {/* Arrow 2: Node 2 -> Node 3 / Null */}
              {currentStepDataA.arrowDest === "node3" && (
                <line
                  x1={192}
                  y1={98}
                  x2={242}
                  y2={98}
                  stroke={currentStepDataA.node3Highlight ? "var(--accent)" : "var(--border)"}
                  strokeWidth={currentStepDataA.node3Highlight ? 2 : 1.5}
                  markerEnd={currentStepDataA.node3Highlight ? "url(#arrow-accent)" : "url(#arrow-border)"}
                  className="transition-all duration-300"
                />
              )}

              {currentStepDataA.arrowDest === "null" && (
                <g className="transition-all duration-300">
                  {/* Curved arrow bypassing Node 3 */}
                  <path
                    d="M 192 90 Q 265 45 332 90"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    markerEnd="url(#arrow-accent)"
                  />
                </g>
              )}

              {/* Arrow 3: Node 3 -> Null */}
              {currentStepDataA.showNode3 && (
                <line
                  x1={292}
                  y1={98}
                  x2={332}
                  y2={98}
                  stroke="var(--border)"
                  strokeWidth={1.5}
                  strokeDasharray={currentStepDataA.node3State === "detached" ? "3 3" : undefined}
                  opacity={currentStepDataA.node3State === "detached" ? 0.4 : 1}
                  markerEnd={currentStepDataA.node3State === "detached" ? "url(#arrow-grey)" : "url(#arrow-border)"}
                  className="transition-all duration-300"
                />
              )}

              {/* Pointers */}
              {/* head -> Node 1 */}
              <g>
                <text x={70} y={45} textAnchor="middle" fontSize="9px" fontWeight="700" fill="var(--text-secondary)">
                  head
                </text>
                <line
                  x1={70}
                  y1={49}
                  x2={70}
                  y2={77}
                  stroke="var(--border)"
                  strokeWidth={1.5}
                  markerEnd="url(#arrow-border)"
                />
              </g>

              {/* toBeDeleted Pointer (Node 2) */}
              {currentStepDataA.toBeDeletedPos !== -1 && (
                <g
                  style={{
                    transform: `translateX(${(currentStepDataA.toBeDeletedPos - 1) * 100}px)`,
                    transition: "transform 0.4s ease-in-out"
                  }}
                >
                  <text x={170} y={185} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--warning)">
                    toBeDeleted
                  </text>
                  <line
                    x1={170}
                    y1={174}
                    x2={170}
                    y2={122}
                    stroke="var(--warning)"
                    strokeWidth={1.5}
                    markerEnd="url(#pointer-arrow-warning)"
                  />
                </g>
              )}

              {/* nextNode Pointer (Node 3) */}
              {currentStepDataA.nextNodePos !== -1 && (
                <g
                  style={{
                    transform: `translateX(${(currentStepDataA.nextNodePos - 2) * 100}px)`,
                    transition: "transform 0.4s ease-in-out"
                  }}
                >
                  <text x={270} y={235} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--success)">
                    nextNode (node.next)
                  </text>
                  <line
                    x1={270}
                    y1={224}
                    x2={270}
                    y2={122}
                    stroke="var(--success)"
                    strokeWidth={1.5}
                    markerEnd="url(#pointer-arrow-success)"
                  />
                </g>
              )}
            </g>
          )}

          {/* ---------------------------------------------------- */}
          {/* SCENARIO B DRAWING                                   */}
          {/* ---------------------------------------------------- */}
          {scenario === "B" && (
            <g>
              {/* Nodes */}
              {nodesB.map((node) => {
                const state = currentStepDataB.nodeStates[node.id];
                if (state === "faded") return null;

                const isHighlight = state === "duplicate";
                const isBypassed = state === "bypassed";

                return (
                  <g key={`nodeB-${node.id}`} className="transition-all duration-300">
                    <rect
                      x={node.x - 22}
                      y={85}
                      width={44}
                      height={26}
                      rx={4}
                      fill="var(--bg-elevated)"
                      stroke={isHighlight ? "var(--warning)" : isBypassed ? "var(--border)" : "var(--border)"}
                      strokeWidth={isHighlight ? 2.5 : 1.5}
                      strokeDasharray={isBypassed ? "3 3" : undefined}
                      opacity={isBypassed ? 0.35 : 1}
                    />
                    <text
                      x={node.x}
                      y={102}
                      textAnchor="middle"
                      fontSize="10px"
                      fontWeight="700"
                      fill={isHighlight ? "var(--warning)" : "var(--text-primary)"}
                      opacity={isBypassed ? 0.35 : 1}
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x}
                      y={124}
                      textAnchor="middle"
                      fontSize="8px"
                      fontWeight="600"
                      fill="var(--text-secondary)"
                      opacity={isBypassed ? 0.35 : 1}
                    >
                      {node.addr}
                    </text>
                  </g>
                );
              })}

              {/* Nullptr Node */}
              <g className="transition-all duration-300">
                <rect
                  x={378}
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
                  x={400}
                  y={101}
                  textAnchor="middle"
                  fontSize="9px"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  null
                </text>
              </g>

              {/* Arrows */}
              {/* Dummy -> Node 1 */}
              <line
                x1={67}
                y1={98}
                x2={87}
                y2={98}
                stroke="var(--border)"
                strokeWidth={1.5}
                markerEnd="url(#arrow-border)"
              />

              {/* Arrow configurations */}
              {currentStepDataB.arrowConfig === "normal" && (
                <g>
                  {/* Node 1 -> Node 2a */}
                  {currentStepDataB.nodeStates[2] !== "faded" && (
                    <line
                      x1={137}
                      y1={98}
                      x2={157}
                      y2={98}
                      stroke="var(--border)"
                      strokeWidth={1.5}
                      markerEnd="url(#arrow-border)"
                    />
                  )}
                  {/* Node 2a -> Node 2b */}
                  {currentStepDataB.nodeStates[3] !== "faded" && (
                    <line
                      x1={207}
                      y1={98}
                      x2={227}
                      y2={98}
                      stroke={currentStepDataB.nodeStates[2] === "duplicate" ? "var(--warning)" : "var(--border)"}
                      strokeWidth={currentStepDataB.nodeStates[2] === "duplicate" ? 2 : 1.5}
                      markerEnd={currentStepDataB.nodeStates[2] === "duplicate" ? "url(#pointer-arrow-warning)" : "url(#arrow-border)"}
                    />
                  )}
                  {/* Node 2b -> Node 3 */}
                  {currentStepDataB.nodeStates[3] !== "faded" && (
                    <line
                      x1={277}
                      y1={98}
                      x2={297}
                      y2={98}
                      stroke="var(--border)"
                      strokeWidth={1.5}
                      markerEnd="url(#arrow-border)"
                    />
                  )}
                </g>
              )}

              {currentStepDataB.arrowConfig === "bypassed" && (
                <g className="transition-all duration-300">
                  {/* Curved Arrow: Node 1 -> Node 3 */}
                  <path
                    d="M 137 90 Q 220 40 302 90"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    markerEnd="url(#arrow-accent)"
                  />

                  {/* Bypassed dashed arrows */}
                  {currentStepDataB.nodeStates[2] !== "faded" && (
                    <line
                      x1={137}
                      y1={98}
                      x2={157}
                      y2={98}
                      stroke="var(--border)"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      opacity={0.3}
                      markerEnd="url(#arrow-grey)"
                    />
                  )}
                  {currentStepDataB.nodeStates[3] !== "faded" && (
                    <line
                      x1={207}
                      y1={98}
                      x2={227}
                      y2={98}
                      stroke="var(--border)"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      opacity={0.3}
                      markerEnd="url(#arrow-grey)"
                    />
                  )}
                  {currentStepDataB.nodeStates[3] !== "faded" && (
                    <line
                      x1={277}
                      y1={98}
                      x2={297}
                      y2={98}
                      stroke="var(--border)"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      opacity={0.3}
                      markerEnd="url(#arrow-grey)"
                    />
                  )}
                </g>
              )}

              {/* Node 3 -> Null */}
              <line
                x1={347}
                y1={98}
                x2={372}
                y2={98}
                stroke="var(--border)"
                strokeWidth={1.5}
                markerEnd="url(#arrow-border)"
              />

              {/* pre Pointer */}
              <g
                style={{
                  transform: `translateX(${currentStepDataB.prePos * 70}px)`,
                  transition: "transform 0.4s ease-in-out"
                }}
              >
                <text x={45} y={185} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--warning)">
                  pre
                </text>
                <line
                  x1={45}
                  y1={174}
                  x2={45}
                  y2={122}
                  stroke="var(--warning)"
                  strokeWidth={1.5}
                  markerEnd="url(#pointer-arrow-warning)"
                />
              </g>

              {/* cur Pointer */}
              {currentStepDataB.curPos !== -1 && (
                <g
                  style={{
                    transform: `translateX(${currentStepDataB.curPos * 70}px)`,
                    transition: "transform 0.4s ease-in-out"
                  }}
                >
                  <text x={45} y={235} textAnchor="middle" fontSize="9px" fontWeight="800" fill="var(--success)">
                    cur
                  </text>
                  <line
                    x1={45}
                    y1={224}
                    x2={45}
                    y2={122}
                    stroke="var(--success)"
                    strokeWidth={1.5}
                    markerEnd="url(#pointer-arrow-success)"
                  />
                </g>
              )}
            </g>
          )}

          {/* ---------------------------------------------------- */}
          {/* DETAIL PANEL (RIGHT SIDE)                            */}
          {/* ---------------------------------------------------- */}
          <g>
            <rect
              x={398}
              y={20}
              width={146}
              height={280}
              rx={6}
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth={1.5}
            />
            {/* Panel Title */}
            <text x={410} y={42} fontSize="11px" fontWeight="700" fill="var(--text-primary)">
              调试终端 (Terminal)
            </text>
            <line x1={410} y1={49} x2={532} y2={49} stroke="var(--border)" strokeWidth={1} />

            {/* Pointer Changes */}
            <text x={410} y={64} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              指针变化:
            </text>
            <text
              x={410}
              y={76}
              fontSize="9px"
              fontWeight="700"
              fill="var(--warning)"
            >
              {scenario === "A" ? currentStepDataA.pointerChanges : currentStepDataB.pointerChanges}
            </text>

            {/* Memory State */}
            <text x={410} y={94} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              堆内存变化:
            </text>
            <text
              x={410}
              y={106}
              fontSize="9px"
              fontWeight="700"
              fill="var(--success)"
            >
              {scenario === "A" ? currentStepDataA.memoryState : currentStepDataB.memoryState}
            </text>

            <line x1={410} y1={116} x2={532} y2={116} stroke="var(--border)" strokeWidth={1} strokeDasharray="2 2" />

            {/* Step Description */}
            <text x={410} y={132} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              运行步骤说明:
            </text>
            <foreignObject x={410} y={138} width={122} height={105}>
              <div
                className="text-[8.5px] leading-normal text-primary font-medium overflow-y-auto h-[100px]"
                style={{ color: "var(--text-primary)" }}
                dangerouslySetInnerHTML={{
                  __html: scenario === "A" ? currentStepDataA.description : currentStepDataB.description
                }}
              />
            </foreignObject>

            <line x1={410} y1={252} x2={532} y2={252} stroke="var(--border)" strokeWidth={1} strokeDasharray="2 2" />

            {/* Time / Space Complexity info */}
            <text x={410} y={268} fontSize="9px" fontWeight="600" fill="var(--text-secondary)">
              时间复杂度:
            </text>
            <text
              x={410}
              y={282}
              fontSize="9.5px"
              fontWeight="800"
              fill="var(--accent)"
            >
              {scenario === "A" ? currentStepDataA.complexity : currentStepDataB.complexity}
            </text>
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

          {/* Stepper Dot Indicators */}
          <div className="flex gap-1.5">
            {Array.from({ length: stepCount }).map((_, i) => (
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
            disabled={currentStep === stepCount - 1}
            className="rounded-control border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-hover disabled:opacity-30 disabled:pointer-events-none"
          >
            下一步 (Next)
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {scenario === "A" ? currentStepDataA.title : currentStepDataB.title}
      </figcaption>
    </figure>
  );
}
