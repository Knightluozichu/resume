import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第1章 全面认识区块链",
  "1.1 区块链技术的起源和解释",
  "1.2 区块链的核心技术及其特性",
  "1.2.1 区块链技术的特性",
  "1.2.2 区块链的分布式存储技术特性",
  "1.2.3 区块链的密码学技术特性",
] as const;

export function Bdp01UnderstandBlockchainFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第1章 全面认识区块链"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp01UnderstandBlockchainExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第1章 全面认识区块链"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp01UnderstandBlockchainEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第1章 全面认识区块链"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
