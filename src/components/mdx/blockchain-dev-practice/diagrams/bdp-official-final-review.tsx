import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "前言",
  "第1章 全面认识区块链",
  "第2章 实战准备",
  "第3章 以太坊介绍",
  "第4章 以太坊的编译、安装与运行",
  "第5章 以太坊私有链的搭建与运行",
] as const;

export function BdpOfficialFinalReviewFlowLab() {
  return (
    <OfficialBdpBookLab
      title="《区块链开发实战》2018版全书总复习"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function BdpOfficialFinalReviewExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="《区块链开发实战》2018版全书总复习"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function BdpOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="《区块链开发实战》2018版全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
