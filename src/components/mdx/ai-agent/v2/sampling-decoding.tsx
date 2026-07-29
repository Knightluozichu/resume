"use client";

import { AaSamplingStepsDiagram } from "../sampling-steps-diagram";
import { AaTemperatureCompareDiagram } from "../temperature-compare-diagram";
import { AaSamplingExplorer } from "../sampling-explorer";

const courseNodes = [
  "采样与解码",
  "logits",
  "softmax",
  "温度",
  "top-p",
  "top-k",
  "随机种子",
  "分布评测",
];

export function SamplingDecodingModelLab() {
  return (
    <section
      data-visual-kind="aiagent-05-model"
      aria-label="采样与解码：模型与结构"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaSamplingStepsDiagram />
    </section>
  );
}

export function SamplingDecodingTraceLab() {
  return (
    <section
      data-visual-kind="aiagent-05-trace"
      aria-label="采样与解码：状态与轨迹"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaTemperatureCompareDiagram />
    </section>
  );
}

export function SamplingDecodingEvidenceLab() {
  return (
    <section
      data-visual-kind="aiagent-05-evidence"
      aria-label="采样与解码：实验与证据"
    >
      <span className="sr-only">{courseNodes.join("、")}</span>
      <AaSamplingExplorer />
    </section>
  );
}
