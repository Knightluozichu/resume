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

export function DnaOfficialLearningMapMapLab() {
  return (
    <OfficialNlpLab
      title="《深度学习进阶：自然语言处理》权威学习地图"
      concepts={concepts}
      accent="#2563eb"
      view="map"
    />
  );
}

export function DnaOfficialLearningMapExperimentLab() {
  return (
    <OfficialNlpLab
      title="《深度学习进阶：自然语言处理》权威学习地图"
      concepts={concepts}
      accent="#2563eb"
      view="experiment"
    />
  );
}

export function DnaOfficialLearningMapEvidenceLab() {
  return (
    <OfficialNlpLab
      title="《深度学习进阶：自然语言处理》权威学习地图"
      concepts={concepts}
      accent="#2563eb"
      view="evidence"
    />
  );
}
