import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "自主智能体",
  "演绎推理",
  "实践理性",
  "反应式架构",
  "混合架构",
  "行动",
] as const;

export function MasPart02IntelligentAutonomousAgentsModelLab() {
  return (
    <OfficialMasBookLab
      title="Part II Intelligent Autonomous Agents"
      concepts={concepts}
      accent="#4d7c0f"
      view="pipeline"
    />
  );
}

export function MasPart02IntelligentAutonomousAgentsGameLab() {
  return (
    <OfficialMasBookLab
      title="Part II Intelligent Autonomous Agents"
      concepts={concepts}
      accent="#4d7c0f"
      view="training"
    />
  );
}

export function MasPart02IntelligentAutonomousAgentsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Part II Intelligent Autonomous Agents"
      concepts={concepts}
      accent="#4d7c0f"
      view="evidence"
    />
  );
}
