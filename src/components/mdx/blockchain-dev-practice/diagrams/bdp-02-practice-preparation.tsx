import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第2章 实战准备",
  "2.1 开发环境准备",
  "2.1.1 操作系统的配置",
  "2.1.2 Docker的使用",
  "2.1.3 Git的使用",
  "2.2 开发语言",
] as const;

export function Bdp02PracticePreparationFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第2章 实战准备"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp02PracticePreparationExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第2章 实战准备"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp02PracticePreparationEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第2章 实战准备"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
