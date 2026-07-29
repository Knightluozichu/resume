"use client";

import { AaAgentFiveComponentsDiagram } from "../agent-five-components-diagram";
import { AaAgentAnatomyFlowDiagram } from "../agent-anatomy-flow-diagram";
import { AaAgentMapExplorer } from "../agent-map-explorer";

const courseNodes = [
  "智能体解剖图",
  "模型",
  "指令",
  "工具",
  "状态",
  "运行时",
  "权限边界",
  "可观测轨迹",
];

export function AgentAnatomyModelLab() {
  return (
    <section
      data-visual-kind="aiagent-03-model"
      aria-label="智能体解剖图：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaAgentFiveComponentsDiagram />
    </section>
  );
}

export function AgentAnatomyTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-03-trace"
      aria-label="智能体解剖图：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaAgentAnatomyFlowDiagram />
    </section>
  );
}

export function AgentAnatomyEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-03-evidence"
      aria-label="智能体解剖图：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaAgentMapExplorer />
    </section>
  );
}
