import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = ["效用", "均衡", "社会选择", "联盟", "机制", "逻辑"] as const;

export function MasPart04MultiagentDecisionMakingModelLab() {
  return (
    <OfficialMasBookLab
      title="Part IV Multiagent Decision Making"
      concepts={concepts}
      accent="#166534"
      view="pipeline"
    />
  );
}

export function MasPart04MultiagentDecisionMakingGameLab() {
  return (
    <OfficialMasBookLab
      title="Part IV Multiagent Decision Making"
      concepts={concepts}
      accent="#166534"
      view="training"
    />
  );
}

export function MasPart04MultiagentDecisionMakingEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Part IV Multiagent Decision Making"
      concepts={concepts}
      accent="#166534"
      view="evidence"
    />
  );
}
