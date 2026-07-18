import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "技术审校",
  "前言",
  "初识区块链",
  "区块链应用发展",
  "区块链骨骼：密码算法",
  "区块链灵魂：共识算法",
] as const;

export function BpOfficialFinalReviewFlowLab() {
  return (
    <OfficialBpBookLab
      title="《白话区块链》2017版全书总复习"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function BpOfficialFinalReviewExperimentLab() {
  return (
    <OfficialBpBookLab
      title="《白话区块链》2017版全书总复习"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function BpOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="《白话区块链》2017版全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
