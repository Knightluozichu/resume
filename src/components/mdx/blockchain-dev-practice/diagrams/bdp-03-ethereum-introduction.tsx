import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第3章 以太坊介绍",
  "3.1 了解以太坊",
  "3.2 以太坊发展路线",
  "3.3 以太坊内置货币",
  "3.4 以太坊交易吞吐量",
  "3.5 以太坊账户",
] as const;

export function Bdp03EthereumIntroductionFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第3章 以太坊介绍"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp03EthereumIntroductionExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第3章 以太坊介绍"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp03EthereumIntroductionEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第3章 以太坊介绍"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
