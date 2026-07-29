"use client";

import { AaReactLoopDiagram } from "../react-loop-diagram";
import { AaReactTraceDiagram } from "../react-trace-diagram";
import { AaReactStepThrough } from "../react-step-through";

const courseNodes = [
  "ReAct 循环",
  "决策摘要",
  "Action",
  "Observation",
  "Final Answer",
  "环境反馈",
  "循环预算",
  "人工检查点",
];

export function ReactLoopModelLab() {
  return (
    <section
      data-visual-kind="aiagent-08-model"
      aria-label="ReAct 循环：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaReactLoopDiagram />
    </section>
  );
}

export function ReactLoopTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-08-trace"
      aria-label="ReAct 循环：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaReactTraceDiagram />
    </section>
  );
}

export function ReactLoopEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-08-evidence"
      aria-label="ReAct 循环：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaReactStepThrough />
    </section>
  );
}
