"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第4章 word2vec的高速化",
  "4.1 word2vec的改进①",
  "4.1.1 Embedding层",
  "4.1.2 Embedding层的实现",
  "4.2 word2vec的改进②",
  "4.2.1 中间层之后的计算问题",
  "4.2.2 从多分类到二分类",
  "4.2.3 sigmoid函数和交叉熵误差",
] as const;

export function Dna04Word2vecAccelerationMapLab() {
  return (
    <OfficialNlpLab
      title="第4章 word2vec的高速化"
      concepts={concepts}
      accent="#047857"
      view="map"
    />
  );
}

export function Dna04Word2vecAccelerationExperimentLab() {
  return (
    <OfficialNlpLab
      title="第4章 word2vec的高速化"
      concepts={concepts}
      accent="#047857"
      view="experiment"
    />
  );
}

export function Dna04Word2vecAccelerationEvidenceLab() {
  return (
    <OfficialNlpLab
      title="第4章 word2vec的高速化"
      concepts={concepts}
      accent="#047857"
      view="evidence"
    />
  );
}
