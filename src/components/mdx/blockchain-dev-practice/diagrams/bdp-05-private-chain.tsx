import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第5章 以太坊私有链的搭建与运行",
  "5.1 搭建一个私有链",
  "5.2 以太坊JavaScript控制台命令",
  "5.3 以太坊CLI控制台命令",
  "5.3.1 账户管理",
  "5.3.2 区块数据管理",
] as const;

export function Bdp05PrivateChainFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第5章 以太坊私有链的搭建与运行"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp05PrivateChainExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第5章 以太坊私有链的搭建与运行"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp05PrivateChainEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第5章 以太坊私有链的搭建与运行"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
