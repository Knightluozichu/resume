"use client";

import { OfficialNlpLab } from "./official-nlp-lab";

const concepts = [
  "第6章 Gated RNN",
  "6.1 RNN的问题",
  "6.1.1 RNN的复习",
  "6.1.2 梯度消失和梯度爆炸",
  "6.1.3 梯度消失和梯度爆炸的原因",
  "6.1.4 梯度爆炸的对策",
  "6.2 梯度消失和LSTM",
  "6.2.1 LSTM的接口",
] as const;

export function Dna06GatedRnnMapLab() {
  return (
    <OfficialNlpLab
      title="第6章 Gated RNN"
      concepts={concepts}
      accent="#a16207"
      view="map"
    />
  );
}

export function Dna06GatedRnnExperimentLab() {
  return (
    <OfficialNlpLab
      title="第6章 Gated RNN"
      concepts={concepts}
      accent="#a16207"
      view="experiment"
    />
  );
}

export function Dna06GatedRnnEvidenceLab() {
  return (
    <OfficialNlpLab
      title="第6章 Gated RNN"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
