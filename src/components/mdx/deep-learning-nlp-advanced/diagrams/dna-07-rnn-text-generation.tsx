"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第7章 基于RNN生成文本",
  "7.1 使用语言模型生成文本",
  "7.1.1 使用RNN生成文本的步骤",
  "7.1.2 文本生成的实现",
  "7.1.3 更好的文本生成",
  "7.2 seq2seq模型",
  "7.2.1 seq2seq的原理",
  "7.2.2 时序数据转换的简单尝试",
] as const;

export function Dna07RnnTextGenerationMapLab() {
  return (
    <OfficialNlpLab
      title="第7章 基于RNN生成文本"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}

export function Dna07RnnTextGenerationExperimentLab() {
  return (
    <OfficialNlpLab
      title="第7章 基于RNN生成文本"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}

export function Dna07RnnTextGenerationEvidenceLab() {
  return (
    <OfficialNlpLab
      title="第7章 基于RNN生成文本"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
