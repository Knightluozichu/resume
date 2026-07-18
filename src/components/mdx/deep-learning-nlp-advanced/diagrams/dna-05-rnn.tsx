"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第5章 RNN",
  "5.1 概率和语言模型",
  "5.1.1 概率视角下的word2vec",
  "5.1.2 语言模型",
  "5.1.3 将CBOW模型用作语言模型？",
  "5.2 RNN",
  "5.2.1 循环的神经网络",
  "5.2.2 展开循环",
] as const;

export function Dna05RnnMapLab() {
  return (
    <OfficialNlpLab
      title="第5章 RNN"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}

export function Dna05RnnExperimentLab() {
  return (
    <OfficialNlpLab
      title="第5章 RNN"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}

export function Dna05RnnEvidenceLab() {
  return (
    <OfficialNlpLab
      title="第5章 RNN"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
