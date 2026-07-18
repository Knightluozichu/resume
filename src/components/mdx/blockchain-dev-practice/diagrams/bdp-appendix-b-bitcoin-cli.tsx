import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "附录B 比特币的bitcoin-cli模块详解",
  "B.1 bitcoin-cli模块常用命令",
  "B.1.1 bitcoin-cli初探",
  "B.1.2 bitcoin-cli的命令及其选项",
  "B.2 bitcoin-cli发起交易",
  "B.3 本章小结",
] as const;

export function BdpAppendixBBitcoinCliFlowLab() {
  return (
    <OfficialBdpBookLab
      title="附录B 比特币的bitcoin-cli模块详解"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function BdpAppendixBBitcoinCliExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="附录B 比特币的bitcoin-cli模块详解"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function BdpAppendixBBitcoinCliEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="附录B 比特币的bitcoin-cli模块详解"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
