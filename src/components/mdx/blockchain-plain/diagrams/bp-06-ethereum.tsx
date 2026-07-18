import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "区块链开发平台：以太坊",
  "项目介绍",
  "项目背景",
  "以太坊组成",
  "关键概念",
  "官方钱包使用",
] as const;

export function Bp06EthereumFlowLab() {
  return (
    <OfficialBpBookLab
      title="第6章 区块链开发平台：以太坊"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp06EthereumExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第6章 区块链开发平台：以太坊"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp06EthereumEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第6章 区块链开发平台：以太坊"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
