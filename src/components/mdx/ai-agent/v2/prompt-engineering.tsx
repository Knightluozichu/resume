"use client";

import { AaPromptAnatomyDiagram } from "../prompt-anatomy-diagram";
import { AaPromptComparePlayground } from "../prompt-compare-playground";
import { AaPromptAssemblyDiagram } from "../prompt-assembly-diagram";

const courseNodes = [
  "提示工程基础",
  "系统指令",
  "用户输入",
  "任务合同",
  "上下文",
  "示例",
  "输出约束",
  "提示评测",
];

export function PromptEngineeringModelLab() {
  return (
    <section
      data-visual-kind="aiagent-04-model"
      aria-label="提示工程基础：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaPromptAnatomyDiagram />
    </section>
  );
}

export function PromptEngineeringTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-04-trace"
      aria-label="提示工程基础：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaPromptComparePlayground />
    </section>
  );
}

export function PromptEngineeringEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-04-evidence"
      aria-label="提示工程基础：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaPromptAssemblyDiagram />
    </section>
  );
}
