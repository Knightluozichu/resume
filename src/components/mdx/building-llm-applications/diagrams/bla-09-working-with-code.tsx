import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "代码模型",
  "代码理解",
  "代码生成",
  "算法",
  "沙箱",
  "Code Interpreter",
] as const;

export function Bla09WorkingWithCodeFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 9: Working with Code"
      concepts={concepts}
      accent="#a21caf"
      view="pipeline"
    />
  );
}

export function Bla09WorkingWithCodeExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 9: Working with Code"
      concepts={concepts}
      accent="#a21caf"
      view="training"
    />
  );
}

export function Bla09WorkingWithCodeEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 9: Working with Code"
      concepts={concepts}
      accent="#a21caf"
      view="evidence"
    />
  );
}
