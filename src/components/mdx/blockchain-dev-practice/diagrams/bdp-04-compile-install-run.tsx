import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "第4章 以太坊的编译、安装与运行",
  "4.1 在Ubuntu下安装",
  "4.2 在MacOS下安装",
  "4.3 在Windows下安装",
  "4.4 以Docker方式安装",
  "4.5 运行以太坊",
] as const;

export function Bdp04CompileInstallRunFlowLab() {
  return (
    <OfficialBdpBookLab
      title="第4章 以太坊的编译、安装与运行"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bdp04CompileInstallRunExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="第4章 以太坊的编译、安装与运行"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function Bdp04CompileInstallRunEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="第4章 以太坊的编译、安装与运行"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
