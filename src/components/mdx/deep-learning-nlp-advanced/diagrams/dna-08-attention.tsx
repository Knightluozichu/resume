"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第8章 Attention",
  "8.1 Attention的结构",
  "8.1.1 seq2seq存在的问题",
  "8.1.2 编码器的改进",
  "8.1.3 解码器的改进①",
  "8.1.4 解码器的改进②",
  "8.1.5 解码器的改进③",
  "8.2 带Attention的seq2seq的实现",
] as const;

export function Dna08AttentionMapLab() {
  return (
    <OfficialNlpLab
      title="第8章 Attention"
      concepts={concepts}
      accent="#0369a1"
      view="map"
    />
  );
}

export function Dna08AttentionExperimentLab() {
  return (
    <OfficialNlpLab
      title="第8章 Attention"
      concepts={concepts}
      accent="#0369a1"
      view="experiment"
    />
  );
}

export function Dna08AttentionEvidenceLab() {
  return (
    <OfficialNlpLab
      title="第8章 Attention"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
