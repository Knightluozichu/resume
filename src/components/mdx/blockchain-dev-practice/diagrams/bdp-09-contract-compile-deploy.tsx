import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第9章 Solidity合约编译、部署",
  "9.1 编译合约",
  "9.1.1 安装solc编译工具",
  "9.1.2 开始编译合约",
  "9.2 部署合约",
  "9.2.1 启动以太坊geth节点",
] as const;

export function Bdp09ContractCompileDeployFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第9章 Solidity合约编译、部署"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp09ContractCompileDeployExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第9章 Solidity合约编译、部署"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp09ContractCompileDeployEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第9章 Solidity合约编译、部署"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
