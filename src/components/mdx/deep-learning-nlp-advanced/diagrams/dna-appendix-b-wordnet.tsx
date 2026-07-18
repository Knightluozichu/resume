"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "附录B 运行WordNet",
  "B.1 NLTK的安装",
  "B.2 使用WordNet获得同义词",
  "B.3 WordNet和单词网络",
  "B.4 基于WordNet的语义相似度",
] as const;

export function DnaAppendixBWordnetMapLab() {
  return (
    <OfficialNlpLab
      title="附录B 运行WordNet"
      concepts={concepts}
      accent="#c2410c"
      view="map"
    />
  );
}

export function DnaAppendixBWordnetExperimentLab() {
  return (
    <OfficialNlpLab
      title="附录B 运行WordNet"
      concepts={concepts}
      accent="#c2410c"
      view="experiment"
    />
  );
}

export function DnaAppendixBWordnetEvidenceLab() {
  return (
    <OfficialNlpLab
      title="附录B 运行WordNet"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
