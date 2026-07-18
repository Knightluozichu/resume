"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第1章 神经网络的复习",
  "第2章 自然语言和单词的分布式表示",
  "第3章 word2vec",
  "第4章 word2vec的高速化",
  "第5章 RNN",
  "第6章 Gated RNN",
  "第7章 基于RNN生成文本",
  "第8章 Attention",
] as const;

export function DnaOfficialFinalReviewMapLab() {
  return (
    <OfficialNlpLab
      title="《深度学习进阶：自然语言处理》全书总复习"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}

export function DnaOfficialFinalReviewExperimentLab() {
  return (
    <OfficialNlpLab
      title="《深度学习进阶：自然语言处理》全书总复习"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}

export function DnaOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialNlpLab
      title="《深度学习进阶：自然语言处理》全书总复习"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
