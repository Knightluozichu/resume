import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "附录A 比特币的原理和运行方式",
  "A.1 比特币简介",
  "A.2 比特币的特征",
  "A.3 比特币技术原理",
  "A.4 编译和安装",
  "A.5 比特币的核心模块及其使用方法",
] as const;

export function BdpAppendixABitcoinPrinciplesFlowLab() {
  return (
    <OfficialBdpBookLab
      title="附录A 比特币的原理和运行方式"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function BdpAppendixABitcoinPrinciplesExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="附录A 比特币的原理和运行方式"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function BdpAppendixABitcoinPrinciplesEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="附录A 比特币的原理和运行方式"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
