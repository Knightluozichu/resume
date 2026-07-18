import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第10章 Truffle详解",
  "10.1 什么是Truffle",
  "10.2 安装Truffle",
  "10.3 创建并初始化项目",
  "10.4 创建合约",
  "10.5 编译合约",
] as const;

export function Bdp10TruffleFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第10章 Truffle详解"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp10TruffleExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第10章 Truffle详解"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp10TruffleEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第10章 Truffle详解"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
