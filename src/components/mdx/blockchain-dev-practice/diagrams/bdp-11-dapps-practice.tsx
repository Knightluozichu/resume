import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第11章 以太坊DApps应用开发实战",
  "11.1 DApps架构与开发流程",
  "11.1.1 DApps架构VS Web应用架构",
  "11.1.2 DApps开发流程",
  "11.2 案例：去中心化微博",
  "11.2.1 创建项目",
] as const;

export function Bdp11DappsPracticeFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第11章 以太坊DApps应用开发实战"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp11DappsPracticeExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第11章 以太坊DApps应用开发实战"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp11DappsPracticeEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第11章 以太坊DApps应用开发实战"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
