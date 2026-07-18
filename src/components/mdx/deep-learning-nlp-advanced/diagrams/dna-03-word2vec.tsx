"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第3章 word2vec",
  "3.1 基于推理的方法和神经网络",
  "3.1.1 基于计数的方法的问题",
  "3.1.2 基于推理的方法的概要",
  "3.1.3 神经网络中单词的处理方法",
  "3.2 简单的word2vec",
  "3.2.1 CBOW模型的推理",
  "3.2.2 CBOW模型的学习",
] as const;

export function Dna03Word2vecMapLab() {
  return (
    <OfficialNlpLab
      title="第3章 word2vec"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}

export function Dna03Word2vecExperimentLab() {
  return (
    <OfficialNlpLab
      title="第3章 word2vec"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}

export function Dna03Word2vecEvidenceLab() {
  return (
    <OfficialNlpLab
      title="第3章 word2vec"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
