import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第7章 Solidity IDE和Solidity快速入门",
  "7.1 三种Solidity IDE",
  "7.1.1 browser-solidity",
  "7.1.2 Atom",
  "7.1.3 IntelliJ IDEA",
  "7.2 Solidity快速入门：编写一个简单的银行合约案例",
] as const;

export function Bdp07SolidityIdeQuickstartFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第7章 Solidity IDE和Solidity快速入门"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp07SolidityIdeQuickstartExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第7章 Solidity IDE和Solidity快速入门"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp07SolidityIdeQuickstartEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第7章 Solidity IDE和Solidity快速入门"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
