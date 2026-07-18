import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "区块链扩展：扩容、侧链和闪电网络",
  "比特币区块扩容",
  "侧链技术",
  "闪电网络的设计",
  "多链：区块链应用的扩展交互",
  "知识点导图",
] as const;

export function Bp05ScalingSidechainsLightningFlowLab() {
  return (
    <OfficialBpBookLab
      title="第5章 区块链扩展：扩容、侧链和闪电网络"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp05ScalingSidechainsLightningExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第5章 区块链扩展：扩容、侧链和闪电网络"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp05ScalingSidechainsLightningEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第5章 区块链扩展：扩容、侧链和闪电网络"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
