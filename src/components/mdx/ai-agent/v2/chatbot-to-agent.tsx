"use client";

import { AaChatbotWorkflowAgentDiagram } from "../chatbot-workflow-agent-diagram";
import { AaAgentLoopDiagram } from "../agent-loop-diagram";
import { AaTaskFitExplorer } from "../task-fit-explorer";

const courseNodes = [
  "从聊天机器人到智能体",
  "单次模型调用",
  "预定义工作流",
  "模型自主智能体",
  "环境反馈",
  "工具使用",
  "停止条件",
  "成本与延迟权衡",
];

export function ChatbotToAgentModelLab() {
  return (
    <section
      data-visual-kind="aiagent-01-model"
      aria-label="从聊天机器人到智能体：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaChatbotWorkflowAgentDiagram />
    </section>
  );
}

export function ChatbotToAgentTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-01-trace"
      aria-label="从聊天机器人到智能体：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaAgentLoopDiagram />
    </section>
  );
}

export function ChatbotToAgentEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-01-evidence"
      aria-label="从聊天机器人到智能体：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaTaskFitExplorer />
    </section>
  );
}
