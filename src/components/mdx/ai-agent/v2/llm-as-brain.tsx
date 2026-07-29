"use client";

import { AaTokenizerPlayground } from "../tokenizer-playground";
import { AaContextWindowDiagram } from "../context-window-diagram";
import { AaNextTokenDiagram } from "../next-token-diagram";

const courseNodes = [
  "大模型：智能体的大脑",
  "token 化",
  "上下文窗口",
  "逐 token 生成",
  "消息历史",
  "工具结果",
  "上下文裁剪",
  "外部状态",
];

export function LlmAsBrainModelLab() {
  return (
    <section
      data-visual-kind="aiagent-02-model"
      aria-label="大模型：智能体的大脑：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaTokenizerPlayground />
    </section>
  );
}

export function LlmAsBrainTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-02-trace"
      aria-label="大模型：智能体的大脑：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaContextWindowDiagram />
    </section>
  );
}

export function LlmAsBrainEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-02-evidence"
      aria-label="大模型：智能体的大脑：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaNextTokenDiagram />
    </section>
  );
}
