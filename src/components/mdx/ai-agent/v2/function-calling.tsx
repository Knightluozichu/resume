"use client";

import { AaFunctionCallTurnDiagram } from "../function-call-turn-diagram";
import { AaToolSchemaDiagram } from "../tool-schema-diagram";
import { AaToolPickerPlayground } from "../tool-picker-playground";

const courseNodes = [
  "函数调用原理",
  "工具 schema",
  "工具选择",
  "参数对象",
  "注册表分发",
  "工具结果",
  "调用标识",
  "执行权限",
];

export function FunctionCallingModelLab() {
  return (
    <section
      data-visual-kind="aiagent-07-model"
      aria-label="函数调用原理：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaFunctionCallTurnDiagram />
    </section>
  );
}

export function FunctionCallingTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-07-trace"
      aria-label="函数调用原理：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaToolSchemaDiagram />
    </section>
  );
}

export function FunctionCallingEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-07-evidence"
      aria-label="函数调用原理：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaToolPickerPlayground />
    </section>
  );
}
