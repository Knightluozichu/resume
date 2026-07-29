"use client";

import { AaToolDesignContrastDiagram } from "../tool-design-contrast-diagram";
import { AaToolInvokeSafetyDiagram } from "../tool-invoke-safety-diagram";
import { AaToolSafetyPlayground } from "../tool-safety-playground";

const courseNodes = [
  "工具设计与安全执行",
  "工具边界",
  "参数防错",
  "结构化返回",
  "错误分类",
  "最小权限",
  "沙箱执行",
  "工具评测",
];

export function ToolDesignModelLab() {
  return (
    <section
      data-visual-kind="aiagent-09-model"
      aria-label="工具设计与安全执行：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaToolDesignContrastDiagram />
    </section>
  );
}

export function ToolDesignTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-09-trace"
      aria-label="工具设计与安全执行：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaToolInvokeSafetyDiagram />
    </section>
  );
}

export function ToolDesignEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-09-evidence"
      aria-label="工具设计与安全执行：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaToolSafetyPlayground />
    </section>
  );
}
