"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第2章 自然语言和单词的分布式表示",
  "2.1 什么是自然语言处理",
  "2.1.1 单词的含义",
  "2.2 同义词词典",
  "2.2.1 WordNet",
  "2.2.2 同义词词典的问题",
  "2.3 基于计数的方法",
  "2.3.1 基于Python的语料库的预处理",
] as const;

export function Dna02DistributedWordRepresentationsMapLab() {
  return (
    <OfficialNlpLab
      title="第2章 自然语言和单词的分布式表示"
      concepts={concepts}
      accent="#d97706"
      view="map"
    />
  );
}

export function Dna02DistributedWordRepresentationsExperimentLab() {
  return (
    <OfficialNlpLab
      title="第2章 自然语言和单词的分布式表示"
      concepts={concepts}
      accent="#d97706"
      view="experiment"
    />
  );
}

export function Dna02DistributedWordRepresentationsEvidenceLab() {
  return (
    <OfficialNlpLab
      title="第2章 自然语言和单词的分布式表示"
      concepts={concepts}
      accent="#d97706"
      view="evidence"
    />
  );
}
