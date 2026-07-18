import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第6章 以太坊的编程接口",
  "6.1 web3.js API",
  "6.1.1 安装web3.js并创建实例",
  "6.1.2 账户相关API",
  "6.1.3 交易相关API",
  "6.1.4 区块相关API",
] as const;

export function Bdp06ProgrammingInterfacesFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第6章 以太坊的编程接口"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp06ProgrammingInterfacesExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第6章 以太坊的编程接口"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp06ProgrammingInterfacesEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第6章 以太坊的编程接口"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
