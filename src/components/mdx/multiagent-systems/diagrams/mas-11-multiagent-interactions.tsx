import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Multiagent Interactions",
  "Utilities and Preferences",
  "Setting the Scene",
  "Solution Concepts and Solution Properties",
  "Dominant Strategies",
  "Nash Equilibria",
] as const;

export function Mas11MultiagentInteractionsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 11 Multiagent Interactions"
      concepts={concepts}
      accent="#9f1239"
      view="pipeline"
    />
  );
}

export function Mas11MultiagentInteractionsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 11 Multiagent Interactions"
      concepts={concepts}
      accent="#9f1239"
      view="training"
    />
  );
}

export function Mas11MultiagentInteractionsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 11 Multiagent Interactions"
      concepts={concepts}
      accent="#9f1239"
      view="evidence"
    />
  );
}
