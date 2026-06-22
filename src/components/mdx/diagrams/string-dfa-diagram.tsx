"use client";

import React, { useState, useEffect } from "react";

// 定义状态类型与字符类型
type CharType = "space" | "sign" | "digit" | "dot" | "exponent" | "other";

// 映射字符分类
function getCharType(ch: string): CharType {
  if (ch === " ") return "space";
  if (ch === "+" || ch === "-") return "sign";
  if (ch >= "0" && ch <= "9") return "digit";
  if (ch === ".") return "dot";
  if (ch === "e" || ch === "E") return "exponent";
  return "other";
}

// 状态名称与短标签
const getStateName = (state: number): string => {
  const names: Record<number, string> = {
    0: "Start (起始/前导空格)",
    1: "Sign (基数正负号)",
    2: "Integer (整数部分)",
    3: "DotWithoutInt (无前导数字小数点)",
    4: "DotWithInt (有前导数字小数点)",
    5: "Decimal (小数部分)",
    6: "Exponent (指数标志 e/E)",
    7: "ExpSign (指数正负号)",
    8: "ExpInteger (指数整数)",
    9: "EndSpace (尾随空格)",
  };
  return names[state] ?? "Rejected (拒绝状态)";
};

const getStateLabel = (state: number): string => {
  const labels: Record<number, string> = {
    0: "Start",
    1: "Sign",
    2: "Integer",
    3: "Dot (No Int)",
    4: "Dot (Int)",
    5: "Decimal",
    6: "Exponent",
    7: "Exp Sign",
    8: "Exp Int",
    9: "End Space",
  };
  return labels[state] ?? "Rejected";
};

// DFA 转移表
const transferTable: Record<number, Partial<Record<CharType, number>>> = {
  0: { space: 0, sign: 1, digit: 2, dot: 3 },
  1: { digit: 2, dot: 3 },
  2: { digit: 2, dot: 4, exponent: 6, space: 9 },
  3: { digit: 5 },
  4: { digit: 5, exponent: 6, space: 9 },
  5: { digit: 5, exponent: 6, space: 9 },
  6: { sign: 7, digit: 8 },
  7: { digit: 8 },
  8: { digit: 8, space: 9 },
  9: { space: 9 },
};

// 合法结束状态
const validEndStates = new Set([2, 4, 5, 8, 9]);

interface Step {
  char: string;
  fromState: number;
  toState: number;
  charIndex: number;
  description: string;
  explanation: string;
  status: "valid" | "invalid" | "pending";
}

// 预定义节点坐标 (viewBox 0 0 1000 420)
interface NodePos {
  id: number;
  label: string;
  x: number;
  y: number;
  isAccept: boolean;
}

const stateNodes: NodePos[] = [
  { id: 0, label: "Start", x: 70, y: 210, isAccept: false },
  { id: 1, label: "Sign", x: 190, y: 110, isAccept: false },
  { id: 2, label: "Integer", x: 310, y: 210, isAccept: true },
  { id: 3, label: "Dot (No Int)", x: 190, y: 310, isAccept: false },
  { id: 4, label: "Dot (Int)", x: 450, y: 110, isAccept: true },
  { id: 5, label: "Decimal", x: 450, y: 310, isAccept: true },
  { id: 6, label: "Exponent", x: 590, y: 210, isAccept: false },
  { id: 7, label: "Exp Sign", x: 710, y: 110, isAccept: false },
  { id: 8, label: "Exp Int", x: 830, y: 210, isAccept: true },
  { id: 9, label: "End Space", x: 950, y: 310, isAccept: true },
];

interface Edge {
  from: number;
  to: number;
  label: string;
  type: "straight" | "curve-up" | "curve-down" | "self";
}

const edges: Edge[] = [
  { from: 0, to: 0, label: "space", type: "self" },
  { from: 0, to: 1, label: "+/-", type: "straight" },
  { from: 0, to: 2, label: "digit", type: "straight" },
  { from: 0, to: 3, label: ".", type: "straight" },
  { from: 1, to: 2, label: "digit", type: "straight" },
  { from: 1, to: 3, label: ".", type: "straight" },
  { from: 2, to: 2, label: "digit", type: "self" },
  { from: 2, to: 4, label: ".", type: "straight" },
  { from: 2, to: 6, label: "e/E", type: "straight" },
  { from: 2, to: 9, label: "space", type: "curve-down" },
  { from: 3, to: 5, label: "digit", type: "straight" },
  { from: 4, to: 5, label: "digit", type: "straight" },
  { from: 4, to: 6, label: "e/E", type: "straight" },
  { from: 4, to: 9, label: "space", type: "curve-up" },
  { from: 5, to: 5, label: "digit", type: "self" },
  { from: 5, to: 6, label: "e/E", type: "straight" },
  { from: 5, to: 9, label: "space", type: "straight" },
  { from: 6, to: 7, label: "+/-", type: "straight" },
  { from: 6, to: 8, label: "digit", type: "straight" },
  { from: 7, to: 8, label: "digit", type: "straight" },
  { from: 8, to: 8, label: "digit", type: "self" },
  { from: 8, to: 9, label: "space", type: "straight" },
  { from: 9, to: 9, label: "space", type: "self" },
];

export function StringDfaDiagram() {
  const [inputVal, setInputVal] = useState("+1.2e-3");
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 动态生成状态机的每一个步骤
  const generateSteps = (str: string): Step[] => {
    const stepsList: Step[] = [];
    // 初始 Step 0
    stepsList.push({
      char: "",
      fromState: 0,
      toState: 0,
      charIndex: -1,
      description: "初始化",
      explanation: `状态机置于起始状态 Start (0)，准备输入 "${str}"。`,
      status: "valid",
    });

    let currentState = 0;
    let isRejected = false;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (isRejected) {
        stepsList.push({
          char,
          fromState: -1,
          toState: -1,
          charIndex: i,
          description: `忽略 '${char}'`,
          explanation: `状态机已在之前的字符出错，处于拒绝态。`,
          status: "invalid",
        });
        continue;
      }

      const type = getCharType(char);
      const nextState = transferTable[currentState]?.[type];

      if (nextState === undefined) {
        isRejected = true;
        stepsList.push({
          char,
          fromState: currentState,
          toState: -1,
          charIndex: i,
          description: `非法字符 '${char}'`,
          explanation: `在状态 ${getStateLabel(currentState)} (${currentState}) 无法处理字符 '${char}' (类型: ${type})。状态机进入拒绝态。`,
          status: "invalid",
        });
      } else {
        const from = currentState;
        currentState = nextState;
        stepsList.push({
          char,
          fromState: from,
          toState: nextState,
          charIndex: i,
          description: `读取 '${char}'`,
          explanation: `读入字符 '${char}' (类型: ${type})，从 ${getStateLabel(from)} 转移到 ${getStateLabel(nextState)}。`,
          status: "valid",
        });
      }
    }

    return stepsList;
  };

  const steps = generateSteps(inputVal);
  const currentStep = steps[currentStepIdx] || steps[0];
  const currentState = currentStep.toState;

  // 定时器自动播放
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handleTogglePlay = () => {
    if (currentStepIdx >= steps.length - 1) {
      setCurrentStepIdx(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handleSelectExample = (ex: string) => {
    setInputVal(ex);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  // 绘制 SVG 边的路径
  const getEdgePath = (edge: Edge) => {
    const fromNode = stateNodes.find((n) => n.id === edge.from)!;
    const toNode = stateNodes.find((n) => n.id === edge.to)!;
    const r = 24; // 节点圆半径

    if (edge.type === "self") {
      // 向上自环
      const x1 = fromNode.x - 12;
      const y1 = fromNode.y - 20;
      const x2 = fromNode.x + 12;
      const y2 = fromNode.y - 20;
      return `M ${x1} ${y1} C ${fromNode.x - 30} ${fromNode.y - 55}, ${fromNode.x + 30} ${fromNode.y - 55}, ${x2} ${y2}`;
    }

    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;

    if (edge.type === "straight") {
      const startX = fromNode.x + r * ux;
      const startY = fromNode.y + r * uy;
      const endX = toNode.x - r * ux;
      const endY = toNode.y - r * uy;
      return `M ${startX} ${startY} L ${endX} ${endY}`;
    }

    if (edge.type === "curve-down") {
      // 向下弯曲的贝塞尔曲线
      const startX = fromNode.x + r * 0.7;
      const startY = fromNode.y + r * 0.7;
      const endX = toNode.x - r * 0.7;
      const endY = toNode.y - r * 0.7;
      const cx = (fromNode.x + toNode.x) / 2;
      const cy = Math.max(fromNode.y, toNode.y) + 100;
      return `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;
    }

    if (edge.type === "curve-up") {
      // 向上弯曲的贝塞尔曲线
      const startX = fromNode.x + r * 0.7;
      const startY = fromNode.y - r * 0.7;
      const endX = toNode.x - r * 0.7;
      const endY = toNode.y - r * 0.7;
      const cx = (fromNode.x + toNode.x) / 2;
      const cy = Math.min(fromNode.y, toNode.y) - 60;
      return `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;
    }

    return "";
  };

  // 检查一条边是否是当前的激活转移
  const isEdgeActive = (edge: Edge) => {
    if (currentStepIdx === 0) return false;
    return edge.from === currentStep.fromState && edge.to === currentStep.toState;
  };

  const isStringValid = validEndStates.has(steps[steps.length - 1].toState);

  return (
    <figure className="mdx-figure mx-auto my-6 w-full max-w-[960px]">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5 shadow-lg">
        {/* 顶部交互条 */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-accent px-2 py-1 rounded bg-accent-glow">⚡ 可交互</span>
            <span className="text-sm font-semibold text-text-primary">表示数值的字符串 DFA 可视化</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSelectExample("+1.2e-3")}
              className="px-2 py-1 text-xs rounded border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
            >
              示例: +1.2e-3
            </button>
            <button
              onClick={() => handleSelectExample("1.")}
              className="px-2 py-1 text-xs rounded border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
            >
              示例: 1.
            </button>
            <button
              onClick={() => handleSelectExample(".1")}
              className="px-2 py-1 text-xs rounded border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
            >
              示例: .1
            </button>
            <button
              onClick={() => handleSelectExample("2e+6")}
              className="px-2 py-1 text-xs rounded border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
            >
              示例: 2e+6
            </button>
            <button
              onClick={() => handleSelectExample("1e")}
              className="px-2 py-1 text-xs rounded border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
            >
              非法: 1e
            </button>
          </div>
        </div>

        {/* 输入框和播放控制 */}
        <div className="mb-5 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
          <div className="md:col-span-6 flex flex-col gap-1">
            <label className="text-xs text-text-secondary font-medium">测试输入字符串：</label>
            <input
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              placeholder="请输入要验证的字符串..."
              className="w-full rounded border border-border bg-bg px-3 py-1.5 text-sm font-mono text-text-primary outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="md:col-span-6 flex flex-col gap-1 items-start md:items-end">
            <label className="text-xs text-text-secondary font-medium">&nbsp;</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-bg border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
              >
                重置
              </button>
              <button
                onClick={handlePrev}
                disabled={currentStepIdx === 0}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-bg border border-border text-text-secondary hover:text-text-primary hover:border-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-secondary transition-colors"
              >
                上一步
              </button>
              <button
                onClick={handleTogglePlay}
                className="px-4 py-1.5 text-xs font-semibold rounded bg-accent text-text-primary hover:bg-opacity-90 shadow-sm transition-colors"
              >
                {isPlaying ? "暂停" : currentStepIdx >= steps.length - 1 ? "重新播放" : "自动播放"}
              </button>
              <button
                onClick={handleNext}
                disabled={currentStepIdx === steps.length - 1}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-bg border border-border text-text-secondary hover:text-text-primary hover:border-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-secondary transition-colors"
              >
                下一步
              </button>
            </div>
          </div>
        </div>

        {/* 字符串字符格子显示 */}
        <div className="mb-6 flex flex-col items-center gap-2 rounded bg-bg p-3 border border-border">
          <div className="text-xs text-text-secondary font-medium">处理字符序列进度:</div>
          <div className="flex items-center gap-1 font-mono text-base">
            <span
              className={`flex items-center justify-center w-8 h-8 rounded border text-xs font-semibold ${
                currentStepIdx === 0
                  ? "bg-accent-glow border-accent text-text-primary font-bold scale-105"
                  : "bg-elevated border-border text-text-secondary"
              }`}
            >
              Start
            </span>
            {inputVal.split("").map((char, idx) => {
              let cellClass = "bg-elevated border-border text-text-secondary opacity-60";
              const stepForChar = steps.find((s) => s.charIndex === idx);

              if (idx < currentStepIdx) {
                // 已处理字符
                cellClass =
                  stepForChar?.status === "invalid"
                    ? "bg-red-500 bg-opacity-20 border-red-500 text-red-400 font-bold"
                    : "bg-accent bg-opacity-10 border-accent text-accent font-bold";
              } else if (idx === currentStepIdx - 1) {
                // 当前处理中的字符
                cellClass =
                  currentStep.status === "invalid"
                    ? "bg-red-500 bg-opacity-30 border-red-500 text-red-300 font-extrabold scale-110 shadow-glow"
                    : "bg-accent bg-opacity-30 border-accent text-text-primary font-extrabold scale-110 shadow-glow";
              }

              return (
                <span
                  key={idx}
                  className={`flex items-center justify-center w-8 h-8 rounded border transition-all duration-300 ${cellClass}`}
                >
                  {char === " " ? "␣" : char}
                </span>
              );
            })}
          </div>

          <div className="mt-2 text-xs font-semibold">
            验证结果:{" "}
            {currentStepIdx < steps.length - 1 ? (
              <span className="text-yellow-500">正在分析中...</span>
            ) : isStringValid ? (
              <span className="text-green-500">✓ 合法数值字符串 (SUCCESS)</span>
            ) : (
              <span className="text-red-500">✗ 非法数值字符串 (REJECTED)</span>
            )}
          </div>
        </div>

        {/* DFA SVG 可视化核心 */}
        <div className="relative border border-border rounded bg-bg overflow-x-auto p-2">
          <svg viewBox="0 0 1020 400" className="mx-auto block min-w-[960px] h-auto w-full">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-secondary)" opacity="0.6" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* 绘制所有的转移路径 (Edges) */}
            {edges.map((edge, idx) => {
              const pathD = getEdgePath(edge);
              const active = isEdgeActive(edge);
              const fromNode = stateNodes.find((n) => n.id === edge.from)!;
              const toNode = stateNodes.find((n) => n.id === edge.to)!;

              // 计算标签位置
              let labelX = (fromNode.x + toNode.x) / 2;
              let labelY = (fromNode.y + toNode.y) / 2 - 8;

              if (edge.type === "self") {
                labelX = fromNode.x;
                labelY = fromNode.y - 40;
              } else if (edge.type === "curve-down") {
                labelX = (fromNode.x + toNode.x) / 2;
                labelY = Math.max(fromNode.y, toNode.y) + 60;
              } else if (edge.type === "curve-up") {
                labelX = (fromNode.x + toNode.x) / 2;
                labelY = Math.min(fromNode.y, toNode.y) - 35;
              }

              return (
                <g key={idx}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={active ? "var(--accent)" : "var(--border)"}
                    strokeWidth={active ? "3" : "1.5"}
                    markerEnd={active ? "url(#arrow-active)" : "url(#arrow)"}
                    className="transition-all duration-300"
                    strokeDasharray={active ? "none" : undefined}
                  />
                  {active && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="6"
                      opacity="0.25"
                      className="animate-pulse"
                    />
                  )}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="monospace"
                    fill={active ? "var(--accent)" : "var(--text-secondary)"}
                    fontWeight={active ? "bold" : "normal"}
                    className="bg-bg px-1 transition-colors duration-300"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* 绘制状态节点 (Nodes) */}
            {stateNodes.map((node) => {
              const active = currentState === node.id;
              const isAccepted = node.isAccept;

              return (
                <g key={node.id} className="cursor-pointer">
                  {/* 外发光 */}
                  {active && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="28"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      opacity="0.4"
                      className="animate-ping"
                    />
                  )}

                  {/* 节点背景 */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="24"
                    fill={active ? "var(--accent-glow)" : "var(--bg-elevated)"}
                    stroke={active ? "var(--accent)" : "var(--border)"}
                    strokeWidth={active ? "2.5" : "1.5"}
                    className="transition-all duration-300"
                  />

                  {/* 双圈 (代表有效接收状态) */}
                  {isAccepted && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="20"
                      fill="none"
                      stroke={active ? "var(--accent)" : "var(--border)"}
                      strokeWidth="1"
                      opacity={active ? "1" : "0.7"}
                      className="transition-all duration-300"
                    />
                  )}

                  {/* 状态编号标签 */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill={active ? "var(--text-primary)" : "var(--text-secondary)"}
                    className="transition-colors duration-300"
                  >
                    S{node.id}
                  </text>

                  {/* 状态名称 */}
                  <text
                    x={node.x}
                    y={node.y + 38}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill={active ? "var(--accent)" : "var(--text-secondary)"}
                    fontWeight={active ? "600" : "normal"}
                    className="transition-colors duration-300"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 步骤详细解析 */}
        <div className="mt-4 border border-border rounded bg-bg p-4 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              步骤 {currentStepIdx} / {steps.length - 1}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              currentStep.status === "invalid"
                ? "bg-red-500 bg-opacity-20 text-red-400"
                : "bg-accent-glow text-accent"
            }`}>
              {currentStep.description}
            </span>
          </div>

          <p className="text-sm font-semibold text-text-primary mb-1">
            当前状态: {currentState === -1 ? (
              <span className="text-red-500">Rejected (拒绝接收)</span>
            ) : (
              <span>
                S{currentState} - {getStateName(currentState)}
              </span>
            )}
          </p>

          <p className="text-xs text-text-secondary leading-relaxed">
            {currentStep.explanation}
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-text-secondary">
        ⚡ 可交互 DFA 数值校验状态机：支持单步调试与自动播放，可通过右上角切换常见测试用例，或在文本框中输入任意字符实时观察状态流转与接收判定。双圆环节点表示合法的接收状态。
      </figcaption>
    </figure>
  );
}
