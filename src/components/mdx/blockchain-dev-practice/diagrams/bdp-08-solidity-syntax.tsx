import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第8章 Solidity语法详解",
  "8.1 注释",
  "8.2 整型和布尔型",
  "8.2.1 整型",
  "8.2.2 布尔型",
  "8.3 地址",
] as const;

export function Bdp08SoliditySyntaxFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第8章 Solidity语法详解"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp08SoliditySyntaxExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第8章 Solidity语法详解"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp08SoliditySyntaxEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第8章 Solidity语法详解"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
