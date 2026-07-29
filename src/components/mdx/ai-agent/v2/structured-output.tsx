"use client";

import { AaStructuredOutputFlowDiagram } from "../structured-output-flow-diagram";
import { AaJsonSchemaDiagram } from "../json-schema-diagram";
import { AaSchemaParsePlayground } from "../schema-parse-playground";

const courseNodes = [
  "结构化输出",
  "JSON 语法",
  "JSON Schema",
  "类型校验",
  "业务语义",
  "有限修复",
  "失败返回",
  "原始响应存证",
];

export function StructuredOutputModelLab() {
  return (
    <section
      data-visual-kind="aiagent-06-model"
      aria-label="结构化输出：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaStructuredOutputFlowDiagram />
    </section>
  );
}

export function StructuredOutputTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-06-trace"
      aria-label="结构化输出：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaJsonSchemaDiagram />
    </section>
  );
}

export function StructuredOutputEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-06-evidence"
      aria-label="结构化输出：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaSchemaParsePlayground />
    </section>
  );
}
